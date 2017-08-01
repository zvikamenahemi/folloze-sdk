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

    public setList(listName){
        this.send(MessageType.SetList, listName);
    }

    public sendCTA(name) {
        this.send(MessageType.CTA, name);
    }

    public resize() {
        this.registerResize()
    }

    // Private

    private registerMessages(){
        this.on(MessageType.Acknowledged, this.onReady.bind(this))
    }

    private startHandshake(){
        this.send(MessageType.StartHandshake);
    }

    private onReady(){
        this.registerResize();
    }

    private registerResize(){
        new ResizeSensor(document.body, () => {
            var height = document.body.offsetHeight;
            this.send(MessageType.Resize, height);
        });

        debugger
        console.log("resize:", document.body.offsetHeight)
        this.send(MessageType.Resize, document.body.offsetHeight);
    }
}
