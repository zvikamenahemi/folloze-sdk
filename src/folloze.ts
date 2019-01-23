import {Host} from "./host/Host";
import {Child} from "./child/Child";
import {MessageType} from "./common/MessageTypes";

/**
 * Create the basic container for the Folloze SDK
 */

export class Folloze {

    public MessageType = {
        GetLists: MessageType.GetLists,
        SetList: MessageType.SetList,
        CTA: MessageType.CTA,
        CtaOpened: MessageType.CtaOpened,
        CtaClosed: MessageType.CtaClosed,
        ItemViewerOpened: MessageType.ItemViewerOpened,
        ItemViewerClosed: MessageType.ItemViewerClosed,
        UrlChanged: MessageType.UrlChanged,
        ScrolledToBottom: MessageType.ScrolledToBottom,
        RegisterToScroll: MessageType.RegisterToScroll,
        UnregisterFromScroll: MessageType.UnregisterFromScroll,
        ReportHeight: MessageType.ReportHeight,
        ScrolledTo: MessageType.ScrolledTo
    };

    private _host:Host;
    private _child:Child;

    initChild(resizeFactor:number = 0){
        this._child = new Child(resizeFactor);
    }

    initHost(node:HTMLElement, source:string){
        this._host = new Host(node, source);
    }

    get child(){
        if(!this._child)
            throw new Error("Child has not been initialised! Call Folloze.initChild() before attempting to access child.");

        return this._child;
    }

    get host(){
        if(!this._host)
            throw new Error("Host has not been initialised! Call Folloze.initHost() before attempting to access Host.");

        return this._host;
    }
}
