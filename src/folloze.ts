import Host from "./host/Host";
import {Child} from "./child/Child";

/**
 * Create the basic container for the Folloze SDK
 */

class FollozeSDK {

    public host:Host;
    private child: Child;

    constructor(){
        this.host = Host;
    }

    initChild(){
        this.child = new Child();
    }
}

const flz = new FollozeSDK();

window["Folloze"] = flz;

export default flz;
