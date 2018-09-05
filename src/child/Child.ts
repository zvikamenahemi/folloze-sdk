import {MessageType} from "../common/MessageTypes";
import ResizeSensor from "./ResizeSensor";
import ChildMessanger from "./ChildMessanger";

export class Child extends ChildMessanger{
    private autoResize:boolean = true;

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

    public itemViewerOpened() {
        this.send(MessageType.ItemViewerOpened);
    }

    public itemViewerClosed() {
        this.send(MessageType.ItemViewerClosed);
    }

    public urlChanged(url) {
        this.send(MessageType.UrlChanged, url);
    }

    public setAutoResize(value) {
        this.autoResize = value;
    }

    public resize(){
        new ResizeSensor(document.body, () => {
            if(this.autoResize) {
                var height = document.body.offsetHeight;
                this.send(MessageType.Resize, height);
            }
        });
        this.send(MessageType.Resize, document.body.offsetHeight);
    }

    // Private

    private registerMessages(){
        this.on(MessageType.Acknowledged, this.onReady)
    }

    private startHandshake(){
        this.send(MessageType.StartHandshake);
    }

    private onReady = () => {
        this.resize();
    }
}
