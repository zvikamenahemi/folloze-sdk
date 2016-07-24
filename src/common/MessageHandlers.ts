import {MessageType} from "./MessageTypes";
import {PortMessage} from "./PortMessage";

export class MessageHandlers {
    private handlers:Map<MessageType, Array<any>> = new Map();

    set(type:MessageType, handler){
        if(!this.handlers.get(type))
            this.handlers.set(type, []);

        this.handlers.get(type).push(handler);
    }

    fire(message:PortMessage){
        this.handlers.get(message.type).map( (handler) => handler(message.data) );
    }

}
