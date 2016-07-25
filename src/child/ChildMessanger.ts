import {Messanger} from "../common/Messanger";
import {MessageType} from "../common/MessageTypes";
import {PortMessage} from "../common/PortMessage";
import {MessageHandlers} from "../common/MessageHandlers";

export default class ChildMessanger extends Messanger{

    send(type:MessageType, data:any = null){
        let message = new PortMessage(type, data);
        window.parent.postMessage( message.getJSON(), "*");
    }

}
