import {Messanger} from "../common/Messanger";
import {MessageType} from "../common/MessageTypes";
import {PortMessage} from "../common/PortMessage";

export class HostMessanger extends Messanger{

    constructor(private iframe:HTMLIFrameElement){
        super();
    }

    send(type:MessageType, data:any = null){
        let message = new PortMessage(type, data);
        console.log("sending message from host", message);
        this.iframe.contentWindow.postMessage( message.getJSON(), "*");
    }

}
