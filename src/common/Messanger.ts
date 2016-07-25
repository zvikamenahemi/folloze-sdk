import {PortMessage} from "./../common/PortMessage";
import {MessageType} from "./../common/MessageTypes";
import {MessageHandlers} from "../common/MessageHandlers";

export abstract class Messanger {

    public handlers:MessageHandlers = new MessageHandlers();
    public callbackHandlers:MessageHandlers = new MessageHandlers();

    constructor(){
        window.addEventListener("message", this.onMessage.bind(this));

        this.on(MessageType.Question, this.onQuestion.bind(this));
        this.on(MessageType.Response, this.onResponse.bind(this));
    }

    abstract send(type:MessageType, data);

    on(type:MessageType, handler){
        this.handlers.set(type, handler);
    }

    ask(type:MessageType, handler){
        let id = this.callbackHandlers.set(type, (data) => {
            handler(data);
            this.callbackHandlers.unset(id);
        });

        let message = new PortMessage(type);
        this.send(MessageType.Question, message.getJSON() );
    }

    private onMessage(e){
        let message = new PortMessage();
        message.fromJSON(e.data);
        this.handlers.fire(message)
    }

    private onQuestion(e){
        let message = new PortMessage();
        message.fromJSON(e);
        this.handlers.fire(message, (value)=>{
            this.response(message.type, value);
        });
    }

    private response(type:MessageType, value){
        let message = new PortMessage(type, value);
        this.send(MessageType.Response, message.getJSON() );
    }

    private onResponse(e){
        let message = new PortMessage();
        message.fromJSON(e);
        this.callbackHandlers.fire(message)
    }

}
