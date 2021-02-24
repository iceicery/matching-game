import DataStore from './datastore.js';

class PubSub {
  constructor() {
    this.datastore = DataStore;
    this.subscribers = [];
  }

  subscribe(newInfo, request, parameters, callback) {
    this.subscribers.push({
      newInfo,
      request,
      parameters,
      callback,
    });
  }

  unsubscribe(callback) {
    // TODO implement!
  }

  publish(newInfo, data) {
    // publish the new/changed data
    this.datastore.setRequest({
      newInfo,
      data,
    });

    // alert all susbscribers to new/changed data
    this.subscribers
      .filter((subscriber) => subscriber.newInfo == newInfo)
      .forEach((subscriber) => {
        subscriber.callback(this.datastore.getRequest(subscriber));
      });
  }

  getData(request, data) {
    return this.datastore.getRequest({
      request,
      data,
    });
  }
}

export default new PubSub();
