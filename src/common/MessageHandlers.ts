import {MessageType} from "./MessageTypes";
import {PortMessage} from "./PortMessage";

export class MessageHandlers {
    private handlers:Map<MessageType, Array<any>> = new Map();

    set(type:MessageType, handler):[MessageType, number]{
        if(!this.handlers.get(type))
            this.handlers.set(type, []);

        return [ type, this.handlers.get(type).push(handler) ];
    }

    unset(id:[ MessageType, number ]){
        let handlersArr = this.handlers.get(id[0]);
        handlersArr && handlersArr.splice(id[1], 1);
    }

    fire(message:PortMessage, response = null){
        const handler = this.handlers.get(message.type)

        if(handler){
            handler.map( (handler) => handler(message.data, response) );
        }
    }
}
