import {MessageType} from "../common/MessageTypes";
import ResizeSensor from "./ResizeSensor";
import ChildMessanger from "./ChildMessanger";

export class Child extends ChildMessanger{
    constructor(){
        super();
        this.registerMessages();
        this.startHandshake();
    }

    registerMessages(){
        this.on(MessageType.Acknowledged, this.onReady.bind(this))
    }

    startHandshake(){
        this.send(MessageType.StartHandshake);
    }

    onReady(){
        this.registerResize();
    }

    registerResize(){
        new ResizeSensor(document.body, () => {
            var height = document.body.offsetHeight;
            this.send(MessageType.Resize, height);
        });
    }
}
