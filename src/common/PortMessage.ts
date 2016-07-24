import {MessageType} from "./MessageTypes";

export class PortMessage {


    constructor(public type:MessageType = null, public data:any = null){}

    fromJSON(obj){
        this.type = <MessageType>obj.type;
        this.data = obj.data;
    }

    getJSON(){
        return { type: this.type, data: this.data }
    }
}
