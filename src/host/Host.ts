import {Widget} from "./Widget";

class Host {
    static createWidget(node:HTMLElement, source:string){
        return new Widget(node, source);
    }
}

export default Host;
