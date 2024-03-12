export enum ObservationEventType {
    ADD,
    REMOVE
}

export interface ObservationEvent<T>{
    readonly type: ObservationEventType;
    readonly value: T;
}

export interface ArraySubscribtion<T>{
    obj: object;
    callback: (event: ObservationEvent<T>) => void;
}

export class ObservableArray<T>{
    private value: Array<T> = [];
    private subscribers: Array<ArraySubscribtion<T>> = [];

    public get(): Array<T> {
        return this.value;
    }
    
    public push(value: T){
        this.value.push(value);
        this.subscribers.forEach(subscriber => {
            subscriber.callback({type: ObservationEventType.ADD, value});
        })
    }

    public remove(value: T){
        this.value = this.value.filter(item => item!== value);
        this.subscribers.forEach(subscriber => {
            subscriber.callback({type: ObservationEventType.REMOVE, value});
        })
    }

    public subscribe(obj: object, callback: (value: ObservationEvent<T>) => void){
        this.subscribers.push({obj, callback});
    }
      
    public unsubscribe(obj: object){
        this.subscribers = this.subscribers.filter(subscriber => subscriber.obj!== obj);
    }
} 
