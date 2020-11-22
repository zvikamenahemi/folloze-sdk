import {Widget} from "./Widget";

export class Host {

    constructor(node:HTMLElement, source:string, args?:Object) {
        return new Widget(node, source, args);
    }
}
