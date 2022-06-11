import Observable from "./Observable.js";

// THROTTLE TIME operator
const throttleTime = (time:any) => (sourceObservable:any) => {
  let lastEventTime = 0;
  return new Observable((observer:any) => {
    const sourceSubscription = sourceObservable.subscribe({
      next(val:any) {
        // rarefy event emission
        if (Date.now() - lastEventTime > time) {
          lastEventTime = Date.now();
          observer.next(val);
        }
      },
      error: (err:any) => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => sourceSubscription.unsubscribe();
  });
};

// DEBOUNCE TIME operator
const debounceTime = (delay:any) => (sourceObservable:any) => {
  let interval:any;
  return new Observable((observer:any) => {
    const sourceSubscription = sourceObservable.subscribe({
      next: (val:any) => {
        // postpone and group rapid sequences of events
        clearInterval(interval);
        interval = setTimeout(() => observer.next(val), delay);
      },
      error: (err:any) => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => {
      // teardown logic
      clearInterval(interval);
      sourceSubscription.unsubscribe();
    };
  });
};

// map operator
const map = (mapFunc:any) => (sourceObservable:any) => {
  // return a new Observable
  return new Observable((observer:any) => {
    const sourceSubscription = sourceObservable.subscribe({
      next(val:any) {
        let next;
        try {
          next = mapFunc(val);
        } catch (e) {
          this.error(e);
          this.complete();
        }
        observer.next(next);
      },
      error(err:any) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      },
    });
    return () => {
      // --- operator specific TEARDOWN LOGIC
      // when the new Obx is unsubscribed
      // simply unsubscribe from the source Obx
      sourceSubscription.unsubscribe();
    };
  });
};

// TAKE operator
const take = (howMany:any) => (sourceObservable:any) => {
  let counter = 0;
  return new Observable((observer:any) => {
    const sourceSubscription = sourceObservable.subscribe({
      next: (val:any) => {
        counter++;
        observer.next(val);
        if (counter >= howMany) {
          //@ts-ignore
          this.complete();
          sourceSubscription.unsubscribe();
        }
      },
      error: (err:any) => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => sourceSubscription.unsubscribe();
  });
};

// SWITCH MAP operator
const switchMap = (innerObxReturningFunc:any) => (sourceObx:any) => {
  let innerSubscription:any;
  return new Observable((observer:any) => {
    const sourceSubscription = sourceObx.subscribe({
      next(val:any) {
        // unsubscribe from previous subscription if exists
        innerSubscription && innerSubscription.unsubscribe();

        // subscribe to inner Observable
        const innerObx = innerObxReturningFunc(val);
        innerSubscription = innerObx.subscribe({
          // <- start the inner Obx
          next: (_val:any) => observer.next(_val),
          error: (_err:any) => observer.error(_err),
          complete: () => observer.complete(),
        });
      },
      error() {
        // doesn’t care about source Obx errors
      },
      complete() {
        // doesn’t care about source Obx completion
      },
    });
    return () => {
      innerSubscription.unsubscribe();
      sourceSubscription.unsubscribe();
    };
  });
};

export { debounceTime, switchMap, take, throttleTime, map };
