import {MessageType} from "../common/MessageTypes";
import ResizeSensor from "./ResizeSensor";
import ChildMessanger from "./ChildMessanger";

export class Child extends ChildMessanger{
    constructor(){
        super();
        this.registerMessages();
        this.startHandshake();
    }

    public getLists(handler){
        this.ask(MessageType.GetLists, handler);
    }

    private registerMessages(){
        this.on(MessageType.Acknowledged, this.onReady.bind(this))
    }

    private startHandshake(){
        this.send(MessageType.StartHandshake);
    }

    private onReady(){
        this.registerResize();
        this.getLists((lists) => {
            console.log("got lists", lists);
        })
    }

    private registerResize(){
        new ResizeSensor(document.body, () => {
            var height = document.body.offsetHeight;
            this.send(MessageType.Resize, height);
        });
    }
}
