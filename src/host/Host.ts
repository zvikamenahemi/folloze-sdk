import {Widget} from "./Widget";

export class Host {

    constructor(node:HTMLElement, source:string) {
        return new Widget(node, source);
    }
}
