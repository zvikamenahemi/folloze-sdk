
var requestAnimationFrame = window.requestAnimationFrame ||
    window["mozRequestAnimationFrame"] ||
    window["webkitRequestAnimationFrame"] ||
    function (fn) {
        return window.setTimeout(fn, 20);
    };


class EventQueue {
    private q = [];

    add(ev) {
        this.q.push(ev);
    };

    call() {
        this.q.map((i) => i.call());
    };

    remove(ev) {
        var newQueue = [];
        this.q.map((i) => {
            if(i !== ev) newQueue.push(i);
        });
        this.q = newQueue;
    }

    length() {
        return this.q.length;
    }
}

export default class ResizeSensor{
    private ttl = 5000;

    constructor(private element:HTMLElement, private callback) {
        this.attachResizeEvent(element, callback);
    }

    getInitialHeight(element, callback){
        // For some reason, the first size change is not captured, so timeout:
        this.ttl -= 20;
        if(this.ttl < 0)
            return;
        
        debugger;
        if(element.offsetHeight > 0)
            callback();
        else
            setTimeout( () => this.getInitialHeight(element, callback), 20 );
    }

    getComputedStyle(element, prop) {
        if (element.currentStyle) {
            return element.currentStyle[prop];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(element, null).getPropertyValue(prop);
        } else {
            return element.style[prop];
        }
    }

    attachResizeEvent(element, resized) {
        if (!element.resizedAttached) {
            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);
        } else if (element.resizedAttached) {
            element.resizedAttached.add(resized);
            return;
        }

        element.resizeSensor = document.createElement('div');
        element.resizeSensor.className = 'resize-sensor';
        var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
        var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

        element.resizeSensor.style.cssText = style;
        element.resizeSensor.innerHTML =
            '<div class="resize-sensor-expand" style="' + style + '">' +
            '<div style="' + styleChild + '"></div>' +
            '</div>' +
            '<div class="resize-sensor-shrink" style="' + style + '">' +
            '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
            '</div>';
        element.appendChild(element.resizeSensor);

        if (getComputedStyle(element, 'position').toString() == 'static') {
            element.style.position = 'relative';
        }

        var expand:HTMLElement = <HTMLElement>element.resizeSensor.childNodes[0];
        var expandChild:HTMLElement = <HTMLElement>expand.childNodes[0];
        var shrink = <HTMLElement>element.resizeSensor.childNodes[1];

        var reset = function() {
            expandChild.style.width  = 100000 + 'px';
            expandChild.style.height = 100000 + 'px';

            expand.scrollLeft = 100000;
            expand.scrollTop = 100000;

            shrink.scrollLeft = 100000;
            shrink.scrollTop = 100000;
        };

        reset();
        var dirty = false;

        var dirtyChecking = function() {
            if (!element.resizedAttached) return;

            if (dirty) {
                element.resizedAttached.call();
                dirty = false;
            }

            requestAnimationFrame(dirtyChecking);
        };

        requestAnimationFrame(dirtyChecking);
        var lastWidth, lastHeight;
        var cachedWidth, cachedHeight; //useful to not query offsetWidth twice

        var onScroll = function() {
            if ((cachedWidth = element.offsetWidth) != lastWidth || (cachedHeight = element.offsetHeight) != lastHeight) {
                dirty = true;

                lastWidth = cachedWidth;
                lastHeight = cachedHeight;
            }
            reset();
        };

        var addEvent = function(el, name, cb) {
            if (el.attachEvent) {
                el.attachEvent('on' + name, cb);
            } else {
                el.addEventListener(name, cb);
            }
        };

        addEvent(expand, 'scroll', onScroll);
        addEvent(shrink, 'scroll', onScroll);
    }

}
