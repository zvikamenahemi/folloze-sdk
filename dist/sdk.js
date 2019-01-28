!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Folloze",[],t):"object"==typeof exports?exports.Folloze=t():e.Folloze=t()}(this,function(){return function(e){function t(s){if(n[s])return n[s].exports;var o=n[s]={exports:{},id:s,loaded:!1};return e[s].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var s=n(1);e.exports=new s.Folloze},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Folloze=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),i=n(2),r=n(9),a=n(7);t.Folloze=function(){function e(){s(this,e),this.MessageType={GetLists:a.MessageType.GetLists,SetList:a.MessageType.SetList,CTA:a.MessageType.CTA,CtaOpened:a.MessageType.CtaOpened,CtaClosed:a.MessageType.CtaClosed,ItemViewerOpened:a.MessageType.ItemViewerOpened,ItemViewerClosed:a.MessageType.ItemViewerClosed,UrlChanged:a.MessageType.UrlChanged,ScrolledToBottom:a.MessageType.ScrolledToBottom,RegisterToScroll:a.MessageType.RegisterToScroll,UnregisterFromScroll:a.MessageType.UnregisterFromScroll,ReportHeight:a.MessageType.ReportHeight,ScrolledTo:a.MessageType.ScrolledTo}}return o(e,[{key:"initChild",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;this._child=new r.Child(e)}},{key:"initHost",value:function(e,t){this._host=new i.Host(e,t)}},{key:"child",get:function(){if(!this._child)throw new Error("Child has not been initialised! Call Folloze.initChild() before attempting to access child.");return this._child}},{key:"host",get:function(){if(!this._host)throw new Error("Host has not been initialised! Call Folloze.initHost() before attempting to access Host.");return this._host}}]),e}()},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Host=void 0;var o=n(3);t.Host=function i(e,t){return s(this,i),new o.Widget(e,t)}},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Widget=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),i=n(4),r=n(7);t.Widget=function(){function e(t,n){s(this,e),this.node=t,this.source=n,this.iframe=document.createElement("iframe"),this.iframe.src=n,this.iframe.style.width="100%",this.iframe.style.border="0",t.appendChild(this.iframe),this.registerMessages(),window.addEventListener("resize",this.onResize.bind(this))}return o(e,[{key:"registerMessages",value:function(){this.messanger=new i.HostMessanger(this.iframe),this.messanger.on(r.MessageType.StartHandshake,this.onHandshake.bind(this)),this.messanger.on(r.MessageType.Resize,this.setHeight.bind(this))}},{key:"onHandshake",value:function(){this.messanger.send(r.MessageType.Acknowledged),this.onResize()}},{key:"onResize",value:function(){this.messanger.send(r.MessageType.ReportHeight,document.documentElement.clientHeight)}},{key:"setHeight",value:function(e){this.iframe.style.height=e+"px"}},{key:"setList",value:function(e){this.messanger.send(r.MessageType.SetList,e)}},{key:"scrolledToBottom",value:function(){this.messanger.send(r.MessageType.ScrolledToBottom)}},{key:"on",value:function(e,t){return this.messanger.on(e,t)}}]),e}()},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.HostMessanger=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),a=n(5),l=n(6);t.HostMessanger=function(e){function t(e){s(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.iframe=e,n}return i(t,e),r(t,[{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=new l.PortMessage(e,t);this.iframe.contentWindow.postMessage(n.getJSON(),"*")}}]),t}(a.Messanger)},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Messanger=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),i=n(6),r=n(7),a=n(8);t.Messanger=function(){function e(){s(this,e),this.handlers=new a.MessageHandlers,this.callbackHandlers=new a.MessageHandlers,window.addEventListener("message",this.onMessage.bind(this)),this.on(r.MessageType.Question,this.onQuestion.bind(this)),this.on(r.MessageType.Response,this.onResponse.bind(this))}return o(e,[{key:"on",value:function(e,t){this.handlers.set(e,t)}},{key:"ask",value:function(e,t){var n=this,s=this.callbackHandlers.set(e,function(e){t(e),n.callbackHandlers.unset(s)}),o=new i.PortMessage(e);this.send(r.MessageType.Question,o.getJSON())}},{key:"onMessage",value:function(e){var t=new i.PortMessage;t.fromJSON(e.data),this.handlers.fire(t)}},{key:"onQuestion",value:function(e){var t=this,n=new i.PortMessage;n.fromJSON(e),this.handlers.fire(n,function(e){t.response(n.type,e)})}},{key:"response",value:function(e,t){var n=new i.PortMessage(e,t);this.send(r.MessageType.Response,n.getJSON())}},{key:"onResponse",value:function(e){var t=new i.PortMessage;t.fromJSON(e),this.callbackHandlers.fire(t)}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}();t.PortMessage=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n(this,e),this.type=t,this.data=s}return s(e,[{key:"fromJSON",value:function(e){this.type=e.type,this.data=e.data}},{key:"getJSON",value:function(){return{type:this.type,data:this.data}}}]),e}()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.MessageType=void 0;!function(e){e[e.StartHandshake=0]="StartHandshake",e[e.Acknowledged=1]="Acknowledged",e[e.Resize=2]="Resize",e[e.Question=3]="Question",e[e.Response=4]="Response",e[e.GetLists=5]="GetLists",e[e.SetList=6]="SetList",e[e.CTA=7]="CTA",e[e.CtaOpened=8]="CtaOpened",e[e.CtaClosed=9]="CtaClosed",e[e.ItemViewerOpened=10]="ItemViewerOpened",e[e.ItemViewerClosed=11]="ItemViewerClosed",e[e.UrlChanged=12]="UrlChanged",e[e.ScrolledToBottom=13]="ScrolledToBottom",e[e.RegisterToScroll=14]="RegisterToScroll",e[e.UnregisterFromScroll=15]="UnregisterFromScroll",e[e.ReportHeight=16]="ReportHeight",e[e.ScrolledTo=17]="ScrolledTo"}(n||(t.MessageType=n={}))},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}();t.MessageHandlers=function(){function e(){n(this,e),this.handlers=new Map}return s(e,[{key:"set",value:function(e,t){return this.handlers.get(e)||this.handlers.set(e,[]),[e,this.handlers.get(e).push(t)]}},{key:"unset",value:function(e){var t=this.handlers.get(e[0]);t&&t.splice(e[1],1)}},{key:"fire",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this.handlers.get(e.type);n&&n.map(function(n){return n(e.data,t)})}}]),e}()},function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Child=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),l=n(7),u=n(10),c=s(u),f=n(11),d=s(f);t.Child=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.autoResize=!0,n.onReady=function(){n.resize()},n.registerMessages(),n.startHandshake(),n.rootElement=e,n}return r(t,e),a(t,[{key:"getLists",value:function(e){this.ask(l.MessageType.GetLists,e)}},{key:"setList",value:function(e){this.send(l.MessageType.SetList,e)}},{key:"sendCTA",value:function(e){this.send(l.MessageType.CTA,e)}},{key:"ctaOpened",value:function(){this.send(l.MessageType.CtaOpened)}},{key:"ctaClosed",value:function(){this.send(l.MessageType.CtaClosed)}},{key:"itemViewerOpened",value:function(){this.send(l.MessageType.ItemViewerOpened)}},{key:"itemViewerClosed",value:function(){this.send(l.MessageType.ItemViewerClosed)}},{key:"registerToScroll",value:function(){this.send(l.MessageType.RegisterToScroll)}},{key:"unregisterFromScroll",value:function(){this.send(l.MessageType.UnregisterFromScroll)}},{key:"urlChanged",value:function(e){this.send(l.MessageType.UrlChanged,e)}},{key:"setAutoResize",value:function(e){this.autoResize=e}},{key:"scrolledTo",value:function(e){this.send(l.MessageType.ScrolledTo,e)}},{key:"resize",value:function(){var e=this;new c["default"](this.rootElement,function(){if(e.autoResize){var t=e.rootElement.offsetHeight;e.send(l.MessageType.Resize,t)}}),this.send(l.MessageType.Resize,this.rootElement.offsetHeight||"100%")}},{key:"registerMessages",value:function(){this.on(l.MessageType.Acknowledged,this.onReady)}},{key:"startHandshake",value:function(){this.send(l.MessageType.StartHandshake)}}]),t}(d["default"])},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),o=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return window.setTimeout(e,20)},i=function(){function e(){n(this,e),this.q=[]}return s(e,[{key:"add",value:function(e){this.q.push(e)}},{key:"call",value:function(){this.q.map(function(e){return e.call()})}},{key:"remove",value:function(e){var t=[];this.q.map(function(n){n!==e&&t.push(n)}),this.q=t}},{key:"length",value:function(){return this.q.length}}]),e}(),r=function(){function e(t,s){n(this,e),this.element=t,this.callback=s,this.ttl=5e3,this.attachResizeEvent(t,s),this.getInitialHeight(t,s)}return s(e,[{key:"getInitialHeight",value:function(e,t){var n=this;this.ttl-=20,this.ttl<0||(e.offsetHeight>0?t():setTimeout(function(){return n.getInitialHeight(e,t)},20))}},{key:"getComputedStyle",value:function(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):e.style[t]}},{key:"attachResizeEvent",value:function(e,t){if(e.resizedAttached){if(e.resizedAttached)return void e.resizedAttached.add(t)}else e.resizedAttached=new i,e.resizedAttached.add(t);e.resizeSensor=document.createElement("div"),e.resizeSensor.className="resize-sensor";var n="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",s="position: absolute; left: 0; top: 0; transition: 0s;";e.resizeSensor.style.cssText=n,e.resizeSensor.innerHTML='<div class="resize-sensor-expand" style="'+n+'"><div style="'+s+'"></div></div><div class="resize-sensor-shrink" style="'+n+'"><div style="'+s+' width: 200%; height: 200%"></div></div>',e.appendChild(e.resizeSensor),"static"==getComputedStyle(e,"position").toString()&&(e.style.position="relative");var r=e.resizeSensor.childNodes[0],a=r.childNodes[0],l=e.resizeSensor.childNodes[1],u=function(){a.style.width=1e5+"px",a.style.height=1e5+"px",r.scrollLeft=1e5,r.scrollTop=1e5,l.scrollLeft=1e5,l.scrollTop=1e5};u();var c=!1,f=function b(){e.resizedAttached&&(c&&(e.resizedAttached.call(),c=!1),o(b))};o(f);var d,h,p,y,g=function(){(p=e.offsetWidth)==d&&(y=e.offsetHeight)==h||(c=!0,d=p,h=y),u()},v=function(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n)};v(r,"scroll",g),v(l,"scroll",g)}}]),e}();t["default"]=r},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),a=n(5),l=n(6),u=function(e){function t(){return s(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),r(t,[{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=new l.PortMessage(e,t);window.parent.postMessage(n.getJSON(),"*")}}]),t}(a.Messanger);t["default"]=u}])});
//# sourceMappingURL=sdk.js.map