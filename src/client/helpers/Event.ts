interface Subscribtion<T> {
    obj: object;
    callback: (args: T) => void;
}


export default class Event<T> {
    subscribers: Subscribtion<T>[] = [];

    public subscribe(obj: object, callback: (args: T) => void){
        this.subscribers.push({obj, callback});
    }

    public unsubscribe(obj: object){
        this.subscribers = this.subscribers.filter(subscriber => subscriber.obj!== obj);
    }

    public send(args: T){
        this.subscribers.forEach(subscriber => subscriber.callback(args));
    }
}