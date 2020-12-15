import {MessageType} from "../common/MessageTypes";
import ResizeSensor from "./ResizeSensor";
import ChildMessanger from "./ChildMessanger";

export class Child extends ChildMessanger{
    private autoResize:boolean = true;
    private rootElement:HTMLElement;

    constructor(rootElement:HTMLElement){
        super();
        this.registerMessages();
        this.startHandshake();
        this.rootElement = rootElement;
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

    public ctaOpened() {
        this.send(MessageType.CtaOpened);
    }

    public ctaClosed() {
        this.send(MessageType.CtaClosed);
    }

    public itemViewerOpened() {
        this.send(MessageType.ItemViewerOpened);
    }

    public itemViewerClosed() {
        this.send(MessageType.ItemViewerClosed);
    }

    public registerToScroll() {
        this.send(MessageType.RegisterToScroll);
    }

    public unregisterFromScroll() {
        this.send(MessageType.UnregisterFromScroll);
    }

    public urlChanged(url) {
        this.send(MessageType.UrlChanged, url);
    }

    public closeLiveEvent() {
        this.send(MessageType.CloseLiveEvent);
    }

    public liveEventLoaded() {
        this.send(MessageType.LiveEventLoaded);
    }

    public liveEventError() {
        this.send(MessageType.LiveEventError);
    }

    public setAutoResize(value) {
        this.autoResize = value;
    }

    public scrolledTo(coordinates) {
        this.send(MessageType.ScrolledTo, coordinates);
    }

    public resize(){
        new ResizeSensor(this.rootElement, () => {
            if(this.autoResize) {
                var height = this.rootElement.offsetHeight;
                this.send(MessageType.Resize, height);
            }
        });
        this.send(MessageType.Resize, this.rootElement.offsetHeight || '100%');
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
