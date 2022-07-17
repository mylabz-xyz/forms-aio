// a container for functions
export default class Subscription {
  private teardowns!: any;

  constructor() {
    this.teardowns = [];
  }
  add(teardown: any) {
    this.teardowns.push(teardown);
  }
  unsubscribe() {
    this.teardowns.forEach((teardown: any) => teardown());
    this.teardowns = [];
  }
}
