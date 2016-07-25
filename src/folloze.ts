import Host from "./host/Host";
import {Child} from "./child/Child";

/**
 * Create the basic container for the Folloze SDK
 */

export class Folloze {

    public host:Host;
    private _child:Child;

    constructor(){
        this.host = Host;
    }

    initChild(){
        this._child = new Child();
    }

    get child(){
        if(!this._child)
            throw new Error("Child has not been initialised! Call Folloze.initChild() before attempting to access child.");

        return this._child;
    }
}
