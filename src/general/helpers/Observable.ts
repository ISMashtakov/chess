export interface Subscribtion<T>{
    obj: object;
    callback: (value: T, old: T) => void
}

export class Observable<T>{
    private value: T;
    private subscribers: Array<Subscribtion<T>> = [];
    constructor(value: T){
        this.value = value;
    }

    public get(): T {
        return this.value;
    }

    public set(value: T){
        const oldValue = this.value;
        this.value = value;

        this.subscribers.forEach(subscriber => {
            subscriber.callback(value, oldValue);
        });
    }

    public subscribe(obj: object, callback: (value: T, old: T) => void, notify: boolean = true){
        this.subscribers.push({obj, callback});
        if(notify){
            callback(this.value, this.value);
        }
    }

    public unsubscribe(obj: object){
        this.subscribers = this.subscribers.filter(subscriber => subscriber.obj!== obj);
    }
}