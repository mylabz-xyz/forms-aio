// a safe wrapper around observers
export default class Subscriber {
  private observer;
  private closed;
  private subscription;

  constructor(_observer: any, _subscription: any) {
    this.observer = _observer;
    this.closed = false;
    this.subscription = _subscription;
    // 1. add an Observer completion logic to the Subscription container
    this.subscription.add(() => (this.closed = true)); // <- first function inside the subscription
  }
  next(value: any) {
    if (!this.closed) {
      this.observer.next(value);
    }
  }
  error(err:any) {
    if (!this.closed) {
      this.closed = true;
      this.observer.error(err);
      // 2. enable the Subscriber to call `unsubscribe` on completion
      this.subscription.unsubscribe(); // <- unsubscribe on error
    }
  }
  complete() {
    if (!this.closed) {
      this.closed = true;
      this.observer.complete();
      this.subscription.unsubscribe(); // <- unsubscribe on completion
    }
  }
}
