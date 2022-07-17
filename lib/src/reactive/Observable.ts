import Subscriber from './Subscriber';
import Subscription from './Subscription';

const pipe =
  (...fns: any) =>
  (val: any) =>
    fns.reduce((acc: any, f: any) => f(acc), val);

export default class Observable {
  private initFunc;
  constructor(initFunc: any) {
    this.initFunc = initFunc;
  }
  subscribe(observer: any) {
    const subscription = new Subscription();
    const subscriber = new Subscriber(observer, subscription); // <- passed by reference

    const teardown = this.initFunc(subscriber);
    // 3. add the teardown logic to the Subscription instance
    subscription.add(teardown); // <- second function inside the subscription

    return subscription;
  }
  pipe(...fns: any) {
    // provide source Obx to each function returned from pipeable operators,
    // to start the chaining operation provide the current source Obx (this)
    return pipe(...fns)(this);
  }
}
