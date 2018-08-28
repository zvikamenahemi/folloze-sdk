import {MessageType} from "../common/MessageTypes";
import ResizeSensor from "./ResizeSensor";
import ChildMessanger from "./ChildMessanger";

export class Child extends ChildMessanger{
    autoDetectResize:boolean

    constructor(autoDetectResize:boolean){
        super();
        this.registerMessages();
        this.startHandshake();
        this.autoDetectResize = autoDetectResize;
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

    public resize(){
        if(this.autoDetectResize) {
            new ResizeSensor(document.body, () => {
                var height = document.body.offsetHeight;
                this.send(MessageType.Resize, height);
            });
        }

        this.send(MessageType.Resize, document.body.offsetHeight);
    }

    // Private

    private registerMessages(){
        this.on(MessageType.Acknowledged, this.onReady.bind(this))
    }

    private startHandshake(){
        this.send(MessageType.StartHandshake);
    }

    private onReady(){
        this.resize();
    }
}
