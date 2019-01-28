import {HostMessanger} from "./HostMessanger";
import {MessageType} from "../common/MessageTypes";

export class Widget {

    private iframe:HTMLIFrameElement;
    private messanger:HostMessanger;

    constructor( private node:HTMLElement, private source:string ){
        this.iframe = document.createElement("iframe");
        this.iframe.src = source;
        this.iframe.style.width = "100%";
        this.iframe.style.border = "0";
        node.appendChild(this.iframe);

        this.registerMessages();
        window.addEventListener('resize', this.onResize.bind(this));
    }

    registerMessages(){
        this.messanger = new HostMessanger(this.iframe);

        this.messanger.on(MessageType.StartHandshake, this.onHandshake.bind(this));
        this.messanger.on(MessageType.Resize, this.setHeight.bind(this));
    }

    onHandshake(){
        // Handshake received. Acknowledged.
        this.messanger.send(MessageType.Acknowledged);
        this.onResize();
    }

    onResize() {
        this.messanger.send(MessageType.ReportHeight, document.documentElement.clientHeight);
    }

    setHeight(height){
        this.iframe.style.height = height + "px";
    }

    setList(listName) {
        this.messanger.send(MessageType.SetList, listName);
    }

    scrolledToBottom() {
        this.messanger.send(MessageType.ScrolledToBottom);
    }

    on(type:MessageType, handler){
        return this.messanger.on(type, handler);
    }

}
