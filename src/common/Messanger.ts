import {PortMessage} from "./../common/PortMessage";
import {MessageType} from "./../common/MessageTypes";
import {MessageHandlers} from "../common/MessageHandlers";

export class Messanger {

    public handlers:MessageHandlers = new MessageHandlers();

    constructor(){
        window.addEventListener("message", this.onMessage.bind(this));
    }

    onMessage(e){
        let message = new PortMessage();
        message.fromJSON(e.data);
        this.handlers.fire(message)
    }

    on(type:MessageType, handler){
        this.handlers.set(type, handler);
    }

}
