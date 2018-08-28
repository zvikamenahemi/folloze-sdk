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
        CTA: MessageType.CTA
    };

    private _host:Host;
    private _child:Child;

    initChild(autoDetectResize:boolean = true){
        this._child = new Child(autoDetectResize);
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
