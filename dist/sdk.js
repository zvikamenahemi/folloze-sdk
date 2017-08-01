!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Folloze",[],t):"object"==typeof exports?exports.Folloze=t():e.Folloze=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var i=n(1);e.exports=new i.Folloze},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Folloze=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(2),r=n(9),a=n(7);t.Folloze=function(){function e(){i(this,e),this.MessageType={GetLists:a.MessageType.GetLists,SetList:a.MessageType.SetList,CTA:a.MessageType.CTA}}return s(e,[{key:"initChild",value:function(){this._child=new r.Child}},{key:"initHost",value:function(e,t){this._host=new o.Host(e,t)}},{key:"child",get:function(){if(!this._child)throw new Error("Child has not been initialised! Call Folloze.initChild() before attempting to access child.");return this._child}},{key:"host",get:function(){if(!this._host)throw new Error("Host has not been initialised! Call Folloze.initHost() before attempting to access Host.");return this._host}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Host=void 0;var s=n(3);t.Host=function o(e,t){return i(this,o),new s.Widget(e,t)}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Widget=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(4),r=n(7);t.Widget=function(){function e(t,n){i(this,e),this.node=t,this.source=n,this.iframe=document.createElement("iframe"),this.iframe.src=n,this.iframe.style.width="100%",this.iframe.style.border="0",t.appendChild(this.iframe),this.registerMessages()}return s(e,[{key:"registerMessages",value:function(){this.messanger=new o.HostMessanger(this.iframe),this.messanger.on(r.MessageType.StartHandshake,this.onHandshake.bind(this)),this.messanger.on(r.MessageType.Resize,this.setHeight.bind(this))}},{key:"onHandshake",value:function(){this.messanger.send(r.MessageType.Acknowledged)}},{key:"setHeight",value:function(e){this.iframe.style.height=e+"px"}},{key:"setList",value:function(e){this.messanger.send(r.MessageType.SetList,e)}},{key:"on",value:function(e,t){return this.messanger.on(e,t)}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.HostMessanger=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(5),u=n(6);t.HostMessanger=function(e){function t(e){i(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.iframe=e,n}return o(t,e),r(t,[{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=new u.PortMessage(e,t);this.iframe.contentWindow.postMessage(n.getJSON(),"*")}}]),t}(a.Messanger)},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Messanger=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(6),r=n(7),a=n(8);t.Messanger=function(){function e(){i(this,e),this.handlers=new a.MessageHandlers,this.callbackHandlers=new a.MessageHandlers,window.addEventListener("message",this.onMessage.bind(this)),this.on(r.MessageType.Question,this.onQuestion.bind(this)),this.on(r.MessageType.Response,this.onResponse.bind(this))}return s(e,[{key:"on",value:function(e,t){this.handlers.set(e,t)}},{key:"ask",value:function(e,t){var n=this,i=this.callbackHandlers.set(e,function(e){t(e),n.callbackHandlers.unset(i)}),s=new o.PortMessage(e);this.send(r.MessageType.Question,s.getJSON())}},{key:"onMessage",value:function(e){var t=new o.PortMessage;t.fromJSON(e.data),this.handlers.fire(t)}},{key:"onQuestion",value:function(e){var t=this,n=new o.PortMessage;n.fromJSON(e),this.handlers.fire(n,function(e){t.response(n.type,e)})}},{key:"response",value:function(e,t){var n=new o.PortMessage(e,t);this.send(r.MessageType.Response,n.getJSON())}},{key:"onResponse",value:function(e){var t=new o.PortMessage;t.fromJSON(e),this.callbackHandlers.fire(t)}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.PortMessage=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n(this,e),this.type=t,this.data=i}return i(e,[{key:"fromJSON",value:function(e){this.type=e.type,this.data=e.data}},{key:"getJSON",value:function(){return{type:this.type,data:this.data}}}]),e}()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.MessageType=void 0;!function(e){e[e.StartHandshake=0]="StartHandshake",e[e.Acknowledged=1]="Acknowledged",e[e.Resize=2]="Resize",e[e.Question=3]="Question",e[e.Response=4]="Response",e[e.GetLists=5]="GetLists",e[e.SetList=6]="SetList",e[e.CTA=7]="CTA"}(n||(t.MessageType=n={}))},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.MessageHandlers=function(){function e(){n(this,e),this.handlers=new Map}return i(e,[{key:"set",value:function(e,t){return this.handlers.get(e)||this.handlers.set(e,[]),[e,this.handlers.get(e).push(t)]}},{key:"unset",value:function(e){var t=this.handlers.get(e[0]);t&&t.splice(e[1],1)}},{key:"fire",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.handlers.get(e.type).map(function(n){return n(e.data,t)})}}]),e}()},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Child=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(7),l=n(10),c=i(l),f=n(11),h=i(f);t.Child=function(e){function t(){s(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.registerMessages(),e.startHandshake(),e}return r(t,e),a(t,[{key:"getLists",value:function(e){this.ask(u.MessageType.GetLists,e)}},{key:"setList",value:function(e){this.send(u.MessageType.SetList,e)}},{key:"sendCTA",value:function(e){this.send(u.MessageType.CTA,e)}},{key:"registerMessages",value:function(){this.on(u.MessageType.Acknowledged,this.onReady.bind(this))}},{key:"startHandshake",value:function(){this.send(u.MessageType.StartHandshake)}},{key:"onReady",value:function(){this.registerResize()}},{key:"registerResize",value:function(){var e=this;new c["default"](document.body,function(){var t=document.body.offsetHeight;e.send(u.MessageType.Resize,t)}),this.send(u.MessageType.Resize,document.body.offsetHeight)}}]),t}(h["default"])},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return window.setTimeout(e,20)},o=function(){function e(){n(this,e),this.q=[]}return i(e,[{key:"add",value:function(e){this.q.push(e)}},{key:"call",value:function(){this.q.map(function(e){return e.call()})}},{key:"remove",value:function(e){var t=[];this.q.map(function(n){n!==e&&t.push(n)}),this.q=t}},{key:"length",value:function(){return this.q.length}}]),e}(),r=function(){function e(t,i){n(this,e),this.element=t,this.callback=i,this.ttl=5e3,this.attachResizeEvent(t,i),this.getInitialHeight(t,i)}return i(e,[{key:"getInitialHeight",value:function(e,t){var n=this;this.ttl-=20,this.ttl<0||(e.offsetHeight>0?t():setTimeout(function(){return n.getInitialHeight(e,t)},20))}},{key:"getComputedStyle",value:function(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):e.style[t]}},{key:"attachResizeEvent",value:function(e,t){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(t)}else e.resizedAttached=new o,e.resizedAttached.add(t);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var n="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",i="position: absolute; left: 0; top: 0; transition: 0s;";e.resizeSensor.style.cssText=n,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+n+'"><div style="'+i+'"></div></div><div class="resize-sensor-shrink" style="'+n+'"><div style="'+i+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),"static"==getComputedStyle(e,"position").toString()&&(e.style.position="relative");var r=e.resizeSensor.childNodes[0],a=r.childNodes[0],u=e.resizeSensor.childNodes[1],l=function(){a.style.width=1e5+"px",a.style.height=1e5+"px",r.scrollLeft=1e5,r.scrollTop=1e5,u.scrollLeft=1e5,u.scrollTop=1e5};l();var c=!1,f=function b(){e.resizedAttached&&(c&&(e.resizedAttached.call(),c=!1),s(b))};s(f);var h,d,p,y,v=function(){(p=e.offsetWidth)==h&&(y=e.offsetHeight)==d||(c=!0,h=p,d=y),l()},g=function(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n)};g(r,"scroll",v),g(u,"scroll",v)}}]),e}();t["default"]=r},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(5),u=n(6),l=function(e){function t(){return i(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),r(t,[{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;console.log("sending",e,t);var n=new u.PortMessage(e,t);window.parent.postMessage(n.getJSON(),"*")}}]),t}(a.Messanger);t["default"]=l}])});
//# sourceMappingURL=sdk.js.map