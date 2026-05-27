(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function qd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Os={exports:{}},Wa={},Is={exports:{}},$={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mr=Symbol.for("react.element"),Jd=Symbol.for("react.portal"),Zd=Symbol.for("react.fragment"),eu=Symbol.for("react.strict_mode"),tu=Symbol.for("react.profiler"),nu=Symbol.for("react.provider"),ru=Symbol.for("react.context"),au=Symbol.for("react.forward_ref"),iu=Symbol.for("react.suspense"),ou=Symbol.for("react.memo"),lu=Symbol.for("react.lazy"),Sl=Symbol.iterator;function su(e){return e===null||typeof e!="object"?null:(e=Sl&&e[Sl]||e["@@iterator"],typeof e=="function"?e:null)}var Rs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$s=Object.assign,As={};function Un(e,t,n){this.props=e,this.context=t,this.refs=As,this.updater=n||Rs}Un.prototype.isReactComponent={};Un.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Un.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Fs(){}Fs.prototype=Un.prototype;function Co(e,t,n){this.props=e,this.context=t,this.refs=As,this.updater=n||Rs}var zo=Co.prototype=new Fs;zo.constructor=Co;$s(zo,Un.prototype);zo.isPureReactComponent=!0;var Cl=Array.isArray,Us=Object.prototype.hasOwnProperty,Eo={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Ws(e,t,n){var r,i={},o=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(o=""+t.key),t)Us.call(t,r)&&!Bs.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var c=Array(s),p=0;p<s;p++)c[p]=arguments[p+2];i.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:Mr,type:e,key:o,ref:l,props:i,_owner:Eo.current}}function cu(e,t){return{$$typeof:Mr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function To(e){return typeof e=="object"&&e!==null&&e.$$typeof===Mr}function du(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var zl=/\/+/g;function li(e,t){return typeof e=="object"&&e!==null&&e.key!=null?du(""+e.key):t.toString(36)}function oa(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Mr:case Jd:l=!0}}if(l)return l=e,i=i(l),e=r===""?"."+li(l,0):r,Cl(i)?(n="",e!=null&&(n=e.replace(zl,"$&/")+"/"),oa(i,t,n,"",function(p){return p})):i!=null&&(To(i)&&(i=cu(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(zl,"$&/")+"/")+e)),t.push(i)),1;if(l=0,r=r===""?".":r+":",Cl(e))for(var s=0;s<e.length;s++){o=e[s];var c=r+li(o,s);l+=oa(o,t,n,c,i)}else if(c=su(e),typeof c=="function")for(e=c.call(e),s=0;!(o=e.next()).done;)o=o.value,c=r+li(o,s++),l+=oa(o,t,n,c,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Wr(e,t,n){if(e==null)return e;var r=[],i=0;return oa(e,r,"","",function(o){return t.call(n,o,i++)}),r}function uu(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Te={current:null},la={transition:null},pu={ReactCurrentDispatcher:Te,ReactCurrentBatchConfig:la,ReactCurrentOwner:Eo};function Vs(){throw Error("act(...) is not supported in production builds of React.")}$.Children={map:Wr,forEach:function(e,t,n){Wr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Wr(e,function(){t++}),t},toArray:function(e){return Wr(e,function(t){return t})||[]},only:function(e){if(!To(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$.Component=Un;$.Fragment=Zd;$.Profiler=tu;$.PureComponent=Co;$.StrictMode=eu;$.Suspense=iu;$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pu;$.act=Vs;$.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=$s({},e.props),i=e.key,o=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,l=Eo.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)Us.call(t,c)&&!Bs.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){s=Array(c);for(var p=0;p<c;p++)s[p]=arguments[p+2];r.children=s}return{$$typeof:Mr,type:e.type,key:i,ref:o,props:r,_owner:l}};$.createContext=function(e){return e={$$typeof:ru,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:nu,_context:e},e.Consumer=e};$.createElement=Ws;$.createFactory=function(e){var t=Ws.bind(null,e);return t.type=e,t};$.createRef=function(){return{current:null}};$.forwardRef=function(e){return{$$typeof:au,render:e}};$.isValidElement=To;$.lazy=function(e){return{$$typeof:lu,_payload:{_status:-1,_result:e},_init:uu}};$.memo=function(e,t){return{$$typeof:ou,type:e,compare:t===void 0?null:t}};$.startTransition=function(e){var t=la.transition;la.transition={};try{e()}finally{la.transition=t}};$.unstable_act=Vs;$.useCallback=function(e,t){return Te.current.useCallback(e,t)};$.useContext=function(e){return Te.current.useContext(e)};$.useDebugValue=function(){};$.useDeferredValue=function(e){return Te.current.useDeferredValue(e)};$.useEffect=function(e,t){return Te.current.useEffect(e,t)};$.useId=function(){return Te.current.useId()};$.useImperativeHandle=function(e,t,n){return Te.current.useImperativeHandle(e,t,n)};$.useInsertionEffect=function(e,t){return Te.current.useInsertionEffect(e,t)};$.useLayoutEffect=function(e,t){return Te.current.useLayoutEffect(e,t)};$.useMemo=function(e,t){return Te.current.useMemo(e,t)};$.useReducer=function(e,t,n){return Te.current.useReducer(e,t,n)};$.useRef=function(e){return Te.current.useRef(e)};$.useState=function(e){return Te.current.useState(e)};$.useSyncExternalStore=function(e,t,n){return Te.current.useSyncExternalStore(e,t,n)};$.useTransition=function(){return Te.current.useTransition()};$.version="18.3.1";Is.exports=$;var k=Is.exports;const Lo=qd(k);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fu=k,mu=Symbol.for("react.element"),hu=Symbol.for("react.fragment"),gu=Object.prototype.hasOwnProperty,xu=fu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vu={key:!0,ref:!0,__self:!0,__source:!0};function Hs(e,t,n){var r,i={},o=null,l=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)gu.call(t,r)&&!vu.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:mu,type:e,key:o,ref:l,props:i,_owner:xu.current}}Wa.Fragment=hu;Wa.jsx=Hs;Wa.jsxs=Hs;Os.exports=Wa;var a=Os.exports,Qs={exports:{}},We={},Ys={exports:{}},Ks={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,M){var R=T.length;T.push(M);e:for(;0<R;){var K=R-1>>>1,q=T[K];if(0<i(q,M))T[K]=M,T[R]=q,R=K;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var M=T[0],R=T.pop();if(R!==M){T[0]=R;e:for(var K=0,q=T.length,He=q>>>1;K<He;){var Pe=2*(K+1)-1,yt=T[Pe],et=Pe+1,tt=T[et];if(0>i(yt,R))et<q&&0>i(tt,yt)?(T[K]=tt,T[et]=R,K=et):(T[K]=yt,T[Pe]=R,K=Pe);else if(et<q&&0>i(tt,R))T[K]=tt,T[et]=R,K=et;else break e}}return M}function i(T,M){var R=T.sortIndex-M.sortIndex;return R!==0?R:T.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var l=Date,s=l.now();e.unstable_now=function(){return l.now()-s}}var c=[],p=[],g=1,u=null,h=3,b=!1,w=!1,y=!1,E=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(T){for(var M=n(p);M!==null;){if(M.callback===null)r(p);else if(M.startTime<=T)r(p),M.sortIndex=M.expirationTime,t(c,M);else break;M=n(p)}}function x(T){if(y=!1,f(T),!w)if(n(c)!==null)w=!0,vt(j);else{var M=n(p);M!==null&&Ze(x,M.startTime-T)}}function j(T,M){w=!1,y&&(y=!1,m(P),P=-1),b=!0;var R=h;try{for(f(M),u=n(c);u!==null&&(!(u.expirationTime>M)||T&&!ue());){var K=u.callback;if(typeof K=="function"){u.callback=null,h=u.priorityLevel;var q=K(u.expirationTime<=M);M=e.unstable_now(),typeof q=="function"?u.callback=q:u===n(c)&&r(c),f(M)}else r(c);u=n(c)}if(u!==null)var He=!0;else{var Pe=n(p);Pe!==null&&Ze(x,Pe.startTime-M),He=!1}return He}finally{u=null,h=R,b=!1}}var z=!1,N=null,P=-1,Y=5,O=-1;function ue(){return!(e.unstable_now()-O<Y)}function pe(){if(N!==null){var T=e.unstable_now();O=T;var M=!0;try{M=N(!0,T)}finally{M?Re():(z=!1,N=null)}}else z=!1}var Re;if(typeof d=="function")Re=function(){d(pe)};else if(typeof MessageChannel<"u"){var _=new MessageChannel,H=_.port2;_.port1.onmessage=pe,Re=function(){H.postMessage(null)}}else Re=function(){E(pe,0)};function vt(T){N=T,z||(z=!0,Re())}function Ze(T,M){P=E(function(){T(e.unstable_now())},M)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){w||b||(w=!0,vt(j))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(T){switch(h){case 1:case 2:case 3:var M=3;break;default:M=h}var R=h;h=M;try{return T()}finally{h=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,M){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var R=h;h=T;try{return M()}finally{h=R}},e.unstable_scheduleCallback=function(T,M,R){var K=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?K+R:K):R=K,T){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=R+q,T={id:g++,callback:M,priorityLevel:T,startTime:R,expirationTime:q,sortIndex:-1},R>K?(T.sortIndex=R,t(p,T),n(c)===null&&T===n(p)&&(y?(m(P),P=-1):y=!0,Ze(x,R-K))):(T.sortIndex=q,t(c,T),w||b||(w=!0,vt(j))),T},e.unstable_shouldYield=ue,e.unstable_wrapCallback=function(T){var M=h;return function(){var R=h;h=M;try{return T.apply(this,arguments)}finally{h=R}}}})(Ks);Ys.exports=Ks;var yu=Ys.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bu=k,Be=yu;function C(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gs=new Set,xr={};function fn(e,t){Mn(e,t),Mn(e+"Capture",t)}function Mn(e,t){for(xr[e]=t,e=0;e<t.length;e++)Gs.add(t[e])}var zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Di=Object.prototype.hasOwnProperty,wu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,El={},Tl={};function ju(e){return Di.call(Tl,e)?!0:Di.call(El,e)?!1:wu.test(e)?Tl[e]=!0:(El[e]=!0,!1)}function ku(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Nu(e,t,n,r){if(t===null||typeof t>"u"||ku(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Le(e,t,n,r,i,o,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var we={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){we[e]=new Le(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];we[t]=new Le(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){we[e]=new Le(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){we[e]=new Le(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){we[e]=new Le(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){we[e]=new Le(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){we[e]=new Le(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){we[e]=new Le(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){we[e]=new Le(e,5,!1,e.toLowerCase(),null,!1,!1)});var Po=/[\-:]([a-z])/g;function _o(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Po,_o);we[t]=new Le(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Po,_o);we[t]=new Le(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Po,_o);we[t]=new Le(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){we[e]=new Le(e,1,!1,e.toLowerCase(),null,!1,!1)});we.xlinkHref=new Le("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){we[e]=new Le(e,1,!1,e.toLowerCase(),null,!0,!0)});function Do(e,t,n,r){var i=we.hasOwnProperty(t)?we[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Nu(t,n,i,r)&&(n=null),r||i===null?ju(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Pt=bu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Vr=Symbol.for("react.element"),gn=Symbol.for("react.portal"),xn=Symbol.for("react.fragment"),Mo=Symbol.for("react.strict_mode"),Mi=Symbol.for("react.profiler"),Xs=Symbol.for("react.provider"),qs=Symbol.for("react.context"),Oo=Symbol.for("react.forward_ref"),Oi=Symbol.for("react.suspense"),Ii=Symbol.for("react.suspense_list"),Io=Symbol.for("react.memo"),Ot=Symbol.for("react.lazy"),Js=Symbol.for("react.offscreen"),Ll=Symbol.iterator;function Gn(e){return e===null||typeof e!="object"?null:(e=Ll&&e[Ll]||e["@@iterator"],typeof e=="function"?e:null)}var ae=Object.assign,si;function rr(e){if(si===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);si=t&&t[1]||""}return`
`+si+e}var ci=!1;function di(e,t){if(!e||ci)return"";ci=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var r=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){r=p}e.call(t.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var i=p.stack.split(`
`),o=r.stack.split(`
`),l=i.length-1,s=o.length-1;1<=l&&0<=s&&i[l]!==o[s];)s--;for(;1<=l&&0<=s;l--,s--)if(i[l]!==o[s]){if(l!==1||s!==1)do if(l--,s--,0>s||i[l]!==o[s]){var c=`
`+i[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=s);break}}}finally{ci=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?rr(e):""}function Su(e){switch(e.tag){case 5:return rr(e.type);case 16:return rr("Lazy");case 13:return rr("Suspense");case 19:return rr("SuspenseList");case 0:case 2:case 15:return e=di(e.type,!1),e;case 11:return e=di(e.type.render,!1),e;case 1:return e=di(e.type,!0),e;default:return""}}function Ri(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xn:return"Fragment";case gn:return"Portal";case Mi:return"Profiler";case Mo:return"StrictMode";case Oi:return"Suspense";case Ii:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case qs:return(e.displayName||"Context")+".Consumer";case Xs:return(e._context.displayName||"Context")+".Provider";case Oo:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Io:return t=e.displayName||null,t!==null?t:Ri(e.type)||"Memo";case Ot:t=e._payload,e=e._init;try{return Ri(e(t))}catch{}}return null}function Cu(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ri(t);case 8:return t===Mo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Gt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Zs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function zu(e){var t=Zs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Hr(e){e._valueTracker||(e._valueTracker=zu(e))}function ec(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Zs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function va(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function $i(e,t){var n=t.checked;return ae({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Pl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Gt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function tc(e,t){t=t.checked,t!=null&&Do(e,"checked",t,!1)}function Ai(e,t){tc(e,t);var n=Gt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Fi(e,t.type,n):t.hasOwnProperty("defaultValue")&&Fi(e,t.type,Gt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function _l(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Fi(e,t,n){(t!=="number"||va(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ar=Array.isArray;function En(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Gt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ui(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(C(91));return ae({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Dl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(C(92));if(ar(n)){if(1<n.length)throw Error(C(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Gt(n)}}function nc(e,t){var n=Gt(t.value),r=Gt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ml(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function rc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?rc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Qr,ac=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Qr=Qr||document.createElement("div"),Qr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Qr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function vr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var lr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Eu=["Webkit","ms","Moz","O"];Object.keys(lr).forEach(function(e){Eu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),lr[t]=lr[e]})});function ic(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||lr.hasOwnProperty(e)&&lr[e]?(""+t).trim():t+"px"}function oc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=ic(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Tu=ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Wi(e,t){if(t){if(Tu[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(C(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(C(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(C(61))}if(t.style!=null&&typeof t.style!="object")throw Error(C(62))}}function Vi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hi=null;function Ro(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qi=null,Tn=null,Ln=null;function Ol(e){if(e=Rr(e)){if(typeof Qi!="function")throw Error(C(280));var t=e.stateNode;t&&(t=Ka(t),Qi(e.stateNode,e.type,t))}}function lc(e){Tn?Ln?Ln.push(e):Ln=[e]:Tn=e}function sc(){if(Tn){var e=Tn,t=Ln;if(Ln=Tn=null,Ol(e),t)for(e=0;e<t.length;e++)Ol(t[e])}}function cc(e,t){return e(t)}function dc(){}var ui=!1;function uc(e,t,n){if(ui)return e(t,n);ui=!0;try{return cc(e,t,n)}finally{ui=!1,(Tn!==null||Ln!==null)&&(dc(),sc())}}function yr(e,t){var n=e.stateNode;if(n===null)return null;var r=Ka(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(C(231,t,typeof n));return n}var Yi=!1;if(zt)try{var Xn={};Object.defineProperty(Xn,"passive",{get:function(){Yi=!0}}),window.addEventListener("test",Xn,Xn),window.removeEventListener("test",Xn,Xn)}catch{Yi=!1}function Lu(e,t,n,r,i,o,l,s,c){var p=Array.prototype.slice.call(arguments,3);try{t.apply(n,p)}catch(g){this.onError(g)}}var sr=!1,ya=null,ba=!1,Ki=null,Pu={onError:function(e){sr=!0,ya=e}};function _u(e,t,n,r,i,o,l,s,c){sr=!1,ya=null,Lu.apply(Pu,arguments)}function Du(e,t,n,r,i,o,l,s,c){if(_u.apply(this,arguments),sr){if(sr){var p=ya;sr=!1,ya=null}else throw Error(C(198));ba||(ba=!0,Ki=p)}}function mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function pc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Il(e){if(mn(e)!==e)throw Error(C(188))}function Mu(e){var t=e.alternate;if(!t){if(t=mn(e),t===null)throw Error(C(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Il(i),e;if(o===r)return Il(i),t;o=o.sibling}throw Error(C(188))}if(n.return!==r.return)n=i,r=o;else{for(var l=!1,s=i.child;s;){if(s===n){l=!0,n=i,r=o;break}if(s===r){l=!0,r=i,n=o;break}s=s.sibling}if(!l){for(s=o.child;s;){if(s===n){l=!0,n=o,r=i;break}if(s===r){l=!0,r=o,n=i;break}s=s.sibling}if(!l)throw Error(C(189))}}if(n.alternate!==r)throw Error(C(190))}if(n.tag!==3)throw Error(C(188));return n.stateNode.current===n?e:t}function fc(e){return e=Mu(e),e!==null?mc(e):null}function mc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=mc(e);if(t!==null)return t;e=e.sibling}return null}var hc=Be.unstable_scheduleCallback,Rl=Be.unstable_cancelCallback,Ou=Be.unstable_shouldYield,Iu=Be.unstable_requestPaint,le=Be.unstable_now,Ru=Be.unstable_getCurrentPriorityLevel,$o=Be.unstable_ImmediatePriority,gc=Be.unstable_UserBlockingPriority,wa=Be.unstable_NormalPriority,$u=Be.unstable_LowPriority,xc=Be.unstable_IdlePriority,Va=null,gt=null;function Au(e){if(gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(Va,e,void 0,(e.current.flags&128)===128)}catch{}}var lt=Math.clz32?Math.clz32:Bu,Fu=Math.log,Uu=Math.LN2;function Bu(e){return e>>>=0,e===0?32:31-(Fu(e)/Uu|0)|0}var Yr=64,Kr=4194304;function ir(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ja(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~i;s!==0?r=ir(s):(o&=l,o!==0&&(r=ir(o)))}else l=n&~i,l!==0?r=ir(l):o!==0&&(r=ir(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-lt(t),i=1<<n,r|=e[n],t&=~i;return r}function Wu(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Vu(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-lt(o),s=1<<l,c=i[l];c===-1?(!(s&n)||s&r)&&(i[l]=Wu(s,t)):c<=t&&(e.expiredLanes|=s),o&=~s}}function Gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vc(){var e=Yr;return Yr<<=1,!(Yr&4194240)&&(Yr=64),e}function pi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Or(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-lt(t),e[t]=n}function Hu(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-lt(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function Ao(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-lt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var Q=0;function yc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var bc,Fo,wc,jc,kc,Xi=!1,Gr=[],Ut=null,Bt=null,Wt=null,br=new Map,wr=new Map,Rt=[],Qu="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function $l(e,t){switch(e){case"focusin":case"focusout":Ut=null;break;case"dragenter":case"dragleave":Bt=null;break;case"mouseover":case"mouseout":Wt=null;break;case"pointerover":case"pointerout":br.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":wr.delete(t.pointerId)}}function qn(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Rr(t),t!==null&&Fo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Yu(e,t,n,r,i){switch(t){case"focusin":return Ut=qn(Ut,e,t,n,r,i),!0;case"dragenter":return Bt=qn(Bt,e,t,n,r,i),!0;case"mouseover":return Wt=qn(Wt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return br.set(o,qn(br.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,wr.set(o,qn(wr.get(o)||null,e,t,n,r,i)),!0}return!1}function Nc(e){var t=nn(e.target);if(t!==null){var n=mn(t);if(n!==null){if(t=n.tag,t===13){if(t=pc(n),t!==null){e.blockedOn=t,kc(e.priority,function(){wc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function sa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=qi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Hi=r,n.target.dispatchEvent(r),Hi=null}else return t=Rr(n),t!==null&&Fo(t),e.blockedOn=n,!1;t.shift()}return!0}function Al(e,t,n){sa(e)&&n.delete(t)}function Ku(){Xi=!1,Ut!==null&&sa(Ut)&&(Ut=null),Bt!==null&&sa(Bt)&&(Bt=null),Wt!==null&&sa(Wt)&&(Wt=null),br.forEach(Al),wr.forEach(Al)}function Jn(e,t){e.blockedOn===t&&(e.blockedOn=null,Xi||(Xi=!0,Be.unstable_scheduleCallback(Be.unstable_NormalPriority,Ku)))}function jr(e){function t(i){return Jn(i,e)}if(0<Gr.length){Jn(Gr[0],e);for(var n=1;n<Gr.length;n++){var r=Gr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ut!==null&&Jn(Ut,e),Bt!==null&&Jn(Bt,e),Wt!==null&&Jn(Wt,e),br.forEach(t),wr.forEach(t),n=0;n<Rt.length;n++)r=Rt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Rt.length&&(n=Rt[0],n.blockedOn===null);)Nc(n),n.blockedOn===null&&Rt.shift()}var Pn=Pt.ReactCurrentBatchConfig,ka=!0;function Gu(e,t,n,r){var i=Q,o=Pn.transition;Pn.transition=null;try{Q=1,Uo(e,t,n,r)}finally{Q=i,Pn.transition=o}}function Xu(e,t,n,r){var i=Q,o=Pn.transition;Pn.transition=null;try{Q=4,Uo(e,t,n,r)}finally{Q=i,Pn.transition=o}}function Uo(e,t,n,r){if(ka){var i=qi(e,t,n,r);if(i===null)ji(e,t,r,Na,n),$l(e,r);else if(Yu(i,e,t,n,r))r.stopPropagation();else if($l(e,r),t&4&&-1<Qu.indexOf(e)){for(;i!==null;){var o=Rr(i);if(o!==null&&bc(o),o=qi(e,t,n,r),o===null&&ji(e,t,r,Na,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else ji(e,t,r,null,n)}}var Na=null;function qi(e,t,n,r){if(Na=null,e=Ro(r),e=nn(e),e!==null)if(t=mn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=pc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Na=e,null}function Sc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ru()){case $o:return 1;case gc:return 4;case wa:case $u:return 16;case xc:return 536870912;default:return 16}default:return 16}}var At=null,Bo=null,ca=null;function Cc(){if(ca)return ca;var e,t=Bo,n=t.length,r,i="value"in At?At.value:At.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===i[o-r];r++);return ca=i.slice(e,1<r?1-r:void 0)}function da(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Xr(){return!0}function Fl(){return!1}function Ve(e){function t(n,r,i,o,l){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Xr:Fl,this.isPropagationStopped=Fl,this}return ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Xr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Xr)},persist:function(){},isPersistent:Xr}),t}var Bn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wo=Ve(Bn),Ir=ae({},Bn,{view:0,detail:0}),qu=Ve(Ir),fi,mi,Zn,Ha=ae({},Ir,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zn&&(Zn&&e.type==="mousemove"?(fi=e.screenX-Zn.screenX,mi=e.screenY-Zn.screenY):mi=fi=0,Zn=e),fi)},movementY:function(e){return"movementY"in e?e.movementY:mi}}),Ul=Ve(Ha),Ju=ae({},Ha,{dataTransfer:0}),Zu=Ve(Ju),ep=ae({},Ir,{relatedTarget:0}),hi=Ve(ep),tp=ae({},Bn,{animationName:0,elapsedTime:0,pseudoElement:0}),np=Ve(tp),rp=ae({},Bn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ap=Ve(rp),ip=ae({},Bn,{data:0}),Bl=Ve(ip),op={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=sp[e])?!!t[e]:!1}function Vo(){return cp}var dp=ae({},Ir,{key:function(e){if(e.key){var t=op[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=da(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vo,charCode:function(e){return e.type==="keypress"?da(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?da(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),up=Ve(dp),pp=ae({},Ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wl=Ve(pp),fp=ae({},Ir,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vo}),mp=Ve(fp),hp=ae({},Bn,{propertyName:0,elapsedTime:0,pseudoElement:0}),gp=Ve(hp),xp=ae({},Ha,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),vp=Ve(xp),yp=[9,13,27,32],Ho=zt&&"CompositionEvent"in window,cr=null;zt&&"documentMode"in document&&(cr=document.documentMode);var bp=zt&&"TextEvent"in window&&!cr,zc=zt&&(!Ho||cr&&8<cr&&11>=cr),Vl=" ",Hl=!1;function Ec(e,t){switch(e){case"keyup":return yp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var vn=!1;function wp(e,t){switch(e){case"compositionend":return Tc(t);case"keypress":return t.which!==32?null:(Hl=!0,Vl);case"textInput":return e=t.data,e===Vl&&Hl?null:e;default:return null}}function jp(e,t){if(vn)return e==="compositionend"||!Ho&&Ec(e,t)?(e=Cc(),ca=Bo=At=null,vn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zc&&t.locale!=="ko"?null:t.data;default:return null}}var kp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ql(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kp[e.type]:t==="textarea"}function Lc(e,t,n,r){lc(r),t=Sa(t,"onChange"),0<t.length&&(n=new Wo("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var dr=null,kr=null;function Np(e){Uc(e,0)}function Qa(e){var t=wn(e);if(ec(t))return e}function Sp(e,t){if(e==="change")return t}var Pc=!1;if(zt){var gi;if(zt){var xi="oninput"in document;if(!xi){var Yl=document.createElement("div");Yl.setAttribute("oninput","return;"),xi=typeof Yl.oninput=="function"}gi=xi}else gi=!1;Pc=gi&&(!document.documentMode||9<document.documentMode)}function Kl(){dr&&(dr.detachEvent("onpropertychange",_c),kr=dr=null)}function _c(e){if(e.propertyName==="value"&&Qa(kr)){var t=[];Lc(t,kr,e,Ro(e)),uc(Np,t)}}function Cp(e,t,n){e==="focusin"?(Kl(),dr=t,kr=n,dr.attachEvent("onpropertychange",_c)):e==="focusout"&&Kl()}function zp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Qa(kr)}function Ep(e,t){if(e==="click")return Qa(t)}function Tp(e,t){if(e==="input"||e==="change")return Qa(t)}function Lp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ct=typeof Object.is=="function"?Object.is:Lp;function Nr(e,t){if(ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Di.call(t,i)||!ct(e[i],t[i]))return!1}return!0}function Gl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xl(e,t){var n=Gl(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Gl(n)}}function Dc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Dc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mc(){for(var e=window,t=va();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=va(e.document)}return t}function Qo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Pp(e){var t=Mc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Dc(n.ownerDocument.documentElement,n)){if(r!==null&&Qo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Xl(n,o);var l=Xl(n,r);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var _p=zt&&"documentMode"in document&&11>=document.documentMode,yn=null,Ji=null,ur=null,Zi=!1;function ql(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zi||yn==null||yn!==va(r)||(r=yn,"selectionStart"in r&&Qo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ur&&Nr(ur,r)||(ur=r,r=Sa(Ji,"onSelect"),0<r.length&&(t=new Wo("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=yn)))}function qr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var bn={animationend:qr("Animation","AnimationEnd"),animationiteration:qr("Animation","AnimationIteration"),animationstart:qr("Animation","AnimationStart"),transitionend:qr("Transition","TransitionEnd")},vi={},Oc={};zt&&(Oc=document.createElement("div").style,"AnimationEvent"in window||(delete bn.animationend.animation,delete bn.animationiteration.animation,delete bn.animationstart.animation),"TransitionEvent"in window||delete bn.transitionend.transition);function Ya(e){if(vi[e])return vi[e];if(!bn[e])return e;var t=bn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Oc)return vi[e]=t[n];return e}var Ic=Ya("animationend"),Rc=Ya("animationiteration"),$c=Ya("animationstart"),Ac=Ya("transitionend"),Fc=new Map,Jl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qt(e,t){Fc.set(e,t),fn(t,[e])}for(var yi=0;yi<Jl.length;yi++){var bi=Jl[yi],Dp=bi.toLowerCase(),Mp=bi[0].toUpperCase()+bi.slice(1);qt(Dp,"on"+Mp)}qt(Ic,"onAnimationEnd");qt(Rc,"onAnimationIteration");qt($c,"onAnimationStart");qt("dblclick","onDoubleClick");qt("focusin","onFocus");qt("focusout","onBlur");qt(Ac,"onTransitionEnd");Mn("onMouseEnter",["mouseout","mouseover"]);Mn("onMouseLeave",["mouseout","mouseover"]);Mn("onPointerEnter",["pointerout","pointerover"]);Mn("onPointerLeave",["pointerout","pointerover"]);fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var or="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Op=new Set("cancel close invalid load scroll toggle".split(" ").concat(or));function Zl(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Du(r,t,void 0,e),e.currentTarget=null}function Uc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],c=s.instance,p=s.currentTarget;if(s=s.listener,c!==o&&i.isPropagationStopped())break e;Zl(i,s,p),o=c}else for(l=0;l<r.length;l++){if(s=r[l],c=s.instance,p=s.currentTarget,s=s.listener,c!==o&&i.isPropagationStopped())break e;Zl(i,s,p),o=c}}}if(ba)throw e=Ki,ba=!1,Ki=null,e}function Z(e,t){var n=t[ao];n===void 0&&(n=t[ao]=new Set);var r=e+"__bubble";n.has(r)||(Bc(t,e,2,!1),n.add(r))}function wi(e,t,n){var r=0;t&&(r|=4),Bc(n,e,r,t)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function Sr(e){if(!e[Jr]){e[Jr]=!0,Gs.forEach(function(n){n!=="selectionchange"&&(Op.has(n)||wi(n,!1,e),wi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jr]||(t[Jr]=!0,wi("selectionchange",!1,t))}}function Bc(e,t,n,r){switch(Sc(t)){case 1:var i=Gu;break;case 4:i=Xu;break;default:i=Uo}n=i.bind(null,t,n,e),i=void 0,!Yi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ji(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;l=l.return}for(;s!==null;){if(l=nn(s),l===null)return;if(c=l.tag,c===5||c===6){r=o=l;continue e}s=s.parentNode}}r=r.return}uc(function(){var p=o,g=Ro(n),u=[];e:{var h=Fc.get(e);if(h!==void 0){var b=Wo,w=e;switch(e){case"keypress":if(da(n)===0)break e;case"keydown":case"keyup":b=up;break;case"focusin":w="focus",b=hi;break;case"focusout":w="blur",b=hi;break;case"beforeblur":case"afterblur":b=hi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=Ul;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=Zu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=mp;break;case Ic:case Rc:case $c:b=np;break;case Ac:b=gp;break;case"scroll":b=qu;break;case"wheel":b=vp;break;case"copy":case"cut":case"paste":b=ap;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Wl}var y=(t&4)!==0,E=!y&&e==="scroll",m=y?h!==null?h+"Capture":null:h;y=[];for(var d=p,f;d!==null;){f=d;var x=f.stateNode;if(f.tag===5&&x!==null&&(f=x,m!==null&&(x=yr(d,m),x!=null&&y.push(Cr(d,x,f)))),E)break;d=d.return}0<y.length&&(h=new b(h,w,null,n,g),u.push({event:h,listeners:y}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",h&&n!==Hi&&(w=n.relatedTarget||n.fromElement)&&(nn(w)||w[Et]))break e;if((b||h)&&(h=g.window===g?g:(h=g.ownerDocument)?h.defaultView||h.parentWindow:window,b?(w=n.relatedTarget||n.toElement,b=p,w=w?nn(w):null,w!==null&&(E=mn(w),w!==E||w.tag!==5&&w.tag!==6)&&(w=null)):(b=null,w=p),b!==w)){if(y=Ul,x="onMouseLeave",m="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(y=Wl,x="onPointerLeave",m="onPointerEnter",d="pointer"),E=b==null?h:wn(b),f=w==null?h:wn(w),h=new y(x,d+"leave",b,n,g),h.target=E,h.relatedTarget=f,x=null,nn(g)===p&&(y=new y(m,d+"enter",w,n,g),y.target=f,y.relatedTarget=E,x=y),E=x,b&&w)t:{for(y=b,m=w,d=0,f=y;f;f=hn(f))d++;for(f=0,x=m;x;x=hn(x))f++;for(;0<d-f;)y=hn(y),d--;for(;0<f-d;)m=hn(m),f--;for(;d--;){if(y===m||m!==null&&y===m.alternate)break t;y=hn(y),m=hn(m)}y=null}else y=null;b!==null&&es(u,h,b,y,!1),w!==null&&E!==null&&es(u,E,w,y,!0)}}e:{if(h=p?wn(p):window,b=h.nodeName&&h.nodeName.toLowerCase(),b==="select"||b==="input"&&h.type==="file")var j=Sp;else if(Ql(h))if(Pc)j=Tp;else{j=zp;var z=Cp}else(b=h.nodeName)&&b.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(j=Ep);if(j&&(j=j(e,p))){Lc(u,j,n,g);break e}z&&z(e,h,p),e==="focusout"&&(z=h._wrapperState)&&z.controlled&&h.type==="number"&&Fi(h,"number",h.value)}switch(z=p?wn(p):window,e){case"focusin":(Ql(z)||z.contentEditable==="true")&&(yn=z,Ji=p,ur=null);break;case"focusout":ur=Ji=yn=null;break;case"mousedown":Zi=!0;break;case"contextmenu":case"mouseup":case"dragend":Zi=!1,ql(u,n,g);break;case"selectionchange":if(_p)break;case"keydown":case"keyup":ql(u,n,g)}var N;if(Ho)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else vn?Ec(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(zc&&n.locale!=="ko"&&(vn||P!=="onCompositionStart"?P==="onCompositionEnd"&&vn&&(N=Cc()):(At=g,Bo="value"in At?At.value:At.textContent,vn=!0)),z=Sa(p,P),0<z.length&&(P=new Bl(P,e,null,n,g),u.push({event:P,listeners:z}),N?P.data=N:(N=Tc(n),N!==null&&(P.data=N)))),(N=bp?wp(e,n):jp(e,n))&&(p=Sa(p,"onBeforeInput"),0<p.length&&(g=new Bl("onBeforeInput","beforeinput",null,n,g),u.push({event:g,listeners:p}),g.data=N))}Uc(u,t)})}function Cr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Sa(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=yr(e,n),o!=null&&r.unshift(Cr(e,o,i)),o=yr(e,t),o!=null&&r.push(Cr(e,o,i))),e=e.return}return r}function hn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function es(e,t,n,r,i){for(var o=t._reactName,l=[];n!==null&&n!==r;){var s=n,c=s.alternate,p=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&p!==null&&(s=p,i?(c=yr(n,o),c!=null&&l.unshift(Cr(n,c,s))):i||(c=yr(n,o),c!=null&&l.push(Cr(n,c,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Ip=/\r\n?/g,Rp=/\u0000|\uFFFD/g;function ts(e){return(typeof e=="string"?e:""+e).replace(Ip,`
`).replace(Rp,"")}function Zr(e,t,n){if(t=ts(t),ts(e)!==t&&n)throw Error(C(425))}function Ca(){}var eo=null,to=null;function no(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ro=typeof setTimeout=="function"?setTimeout:void 0,$p=typeof clearTimeout=="function"?clearTimeout:void 0,ns=typeof Promise=="function"?Promise:void 0,Ap=typeof queueMicrotask=="function"?queueMicrotask:typeof ns<"u"?function(e){return ns.resolve(null).then(e).catch(Fp)}:ro;function Fp(e){setTimeout(function(){throw e})}function ki(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),jr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);jr(t)}function Vt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function rs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Wn=Math.random().toString(36).slice(2),ht="__reactFiber$"+Wn,zr="__reactProps$"+Wn,Et="__reactContainer$"+Wn,ao="__reactEvents$"+Wn,Up="__reactListeners$"+Wn,Bp="__reactHandles$"+Wn;function nn(e){var t=e[ht];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Et]||n[ht]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=rs(e);e!==null;){if(n=e[ht])return n;e=rs(e)}return t}e=n,n=e.parentNode}return null}function Rr(e){return e=e[ht]||e[Et],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function wn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(C(33))}function Ka(e){return e[zr]||null}var io=[],jn=-1;function Jt(e){return{current:e}}function ee(e){0>jn||(e.current=io[jn],io[jn]=null,jn--)}function J(e,t){jn++,io[jn]=e.current,e.current=t}var Xt={},Ce=Jt(Xt),Me=Jt(!1),sn=Xt;function On(e,t){var n=e.type.contextTypes;if(!n)return Xt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Oe(e){return e=e.childContextTypes,e!=null}function za(){ee(Me),ee(Ce)}function as(e,t,n){if(Ce.current!==Xt)throw Error(C(168));J(Ce,t),J(Me,n)}function Wc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(C(108,Cu(e)||"Unknown",i));return ae({},n,r)}function Ea(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Xt,sn=Ce.current,J(Ce,e),J(Me,Me.current),!0}function is(e,t,n){var r=e.stateNode;if(!r)throw Error(C(169));n?(e=Wc(e,t,sn),r.__reactInternalMemoizedMergedChildContext=e,ee(Me),ee(Ce),J(Ce,e)):ee(Me),J(Me,n)}var kt=null,Ga=!1,Ni=!1;function Vc(e){kt===null?kt=[e]:kt.push(e)}function Wp(e){Ga=!0,Vc(e)}function Zt(){if(!Ni&&kt!==null){Ni=!0;var e=0,t=Q;try{var n=kt;for(Q=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}kt=null,Ga=!1}catch(i){throw kt!==null&&(kt=kt.slice(e+1)),hc($o,Zt),i}finally{Q=t,Ni=!1}}return null}var kn=[],Nn=0,Ta=null,La=0,Ye=[],Ke=0,cn=null,Nt=1,St="";function en(e,t){kn[Nn++]=La,kn[Nn++]=Ta,Ta=e,La=t}function Hc(e,t,n){Ye[Ke++]=Nt,Ye[Ke++]=St,Ye[Ke++]=cn,cn=e;var r=Nt;e=St;var i=32-lt(r)-1;r&=~(1<<i),n+=1;var o=32-lt(t)+i;if(30<o){var l=i-i%5;o=(r&(1<<l)-1).toString(32),r>>=l,i-=l,Nt=1<<32-lt(t)+i|n<<i|r,St=o+e}else Nt=1<<o|n<<i|r,St=e}function Yo(e){e.return!==null&&(en(e,1),Hc(e,1,0))}function Ko(e){for(;e===Ta;)Ta=kn[--Nn],kn[Nn]=null,La=kn[--Nn],kn[Nn]=null;for(;e===cn;)cn=Ye[--Ke],Ye[Ke]=null,St=Ye[--Ke],Ye[Ke]=null,Nt=Ye[--Ke],Ye[Ke]=null}var Ue=null,Fe=null,te=!1,ot=null;function Qc(e,t){var n=Ge(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function os(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ue=e,Fe=Vt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ue=e,Fe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=cn!==null?{id:Nt,overflow:St}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ge(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ue=e,Fe=null,!0):!1;default:return!1}}function oo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function lo(e){if(te){var t=Fe;if(t){var n=t;if(!os(e,t)){if(oo(e))throw Error(C(418));t=Vt(n.nextSibling);var r=Ue;t&&os(e,t)?Qc(r,n):(e.flags=e.flags&-4097|2,te=!1,Ue=e)}}else{if(oo(e))throw Error(C(418));e.flags=e.flags&-4097|2,te=!1,Ue=e}}}function ls(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ue=e}function ea(e){if(e!==Ue)return!1;if(!te)return ls(e),te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!no(e.type,e.memoizedProps)),t&&(t=Fe)){if(oo(e))throw Yc(),Error(C(418));for(;t;)Qc(e,t),t=Vt(t.nextSibling)}if(ls(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(C(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Fe=Vt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Fe=null}}else Fe=Ue?Vt(e.stateNode.nextSibling):null;return!0}function Yc(){for(var e=Fe;e;)e=Vt(e.nextSibling)}function In(){Fe=Ue=null,te=!1}function Go(e){ot===null?ot=[e]:ot.push(e)}var Vp=Pt.ReactCurrentBatchConfig;function er(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(C(309));var r=n.stateNode}if(!r)throw Error(C(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(l){var s=i.refs;l===null?delete s[o]:s[o]=l},t._stringRef=o,t)}if(typeof e!="string")throw Error(C(284));if(!n._owner)throw Error(C(290,e))}return e}function ta(e,t){throw e=Object.prototype.toString.call(t),Error(C(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ss(e){var t=e._init;return t(e._payload)}function Kc(e){function t(m,d){if(e){var f=m.deletions;f===null?(m.deletions=[d],m.flags|=16):f.push(d)}}function n(m,d){if(!e)return null;for(;d!==null;)t(m,d),d=d.sibling;return null}function r(m,d){for(m=new Map;d!==null;)d.key!==null?m.set(d.key,d):m.set(d.index,d),d=d.sibling;return m}function i(m,d){return m=Kt(m,d),m.index=0,m.sibling=null,m}function o(m,d,f){return m.index=f,e?(f=m.alternate,f!==null?(f=f.index,f<d?(m.flags|=2,d):f):(m.flags|=2,d)):(m.flags|=1048576,d)}function l(m){return e&&m.alternate===null&&(m.flags|=2),m}function s(m,d,f,x){return d===null||d.tag!==6?(d=Pi(f,m.mode,x),d.return=m,d):(d=i(d,f),d.return=m,d)}function c(m,d,f,x){var j=f.type;return j===xn?g(m,d,f.props.children,x,f.key):d!==null&&(d.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Ot&&ss(j)===d.type)?(x=i(d,f.props),x.ref=er(m,d,f),x.return=m,x):(x=xa(f.type,f.key,f.props,null,m.mode,x),x.ref=er(m,d,f),x.return=m,x)}function p(m,d,f,x){return d===null||d.tag!==4||d.stateNode.containerInfo!==f.containerInfo||d.stateNode.implementation!==f.implementation?(d=_i(f,m.mode,x),d.return=m,d):(d=i(d,f.children||[]),d.return=m,d)}function g(m,d,f,x,j){return d===null||d.tag!==7?(d=ln(f,m.mode,x,j),d.return=m,d):(d=i(d,f),d.return=m,d)}function u(m,d,f){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Pi(""+d,m.mode,f),d.return=m,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Vr:return f=xa(d.type,d.key,d.props,null,m.mode,f),f.ref=er(m,null,d),f.return=m,f;case gn:return d=_i(d,m.mode,f),d.return=m,d;case Ot:var x=d._init;return u(m,x(d._payload),f)}if(ar(d)||Gn(d))return d=ln(d,m.mode,f,null),d.return=m,d;ta(m,d)}return null}function h(m,d,f,x){var j=d!==null?d.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return j!==null?null:s(m,d,""+f,x);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Vr:return f.key===j?c(m,d,f,x):null;case gn:return f.key===j?p(m,d,f,x):null;case Ot:return j=f._init,h(m,d,j(f._payload),x)}if(ar(f)||Gn(f))return j!==null?null:g(m,d,f,x,null);ta(m,f)}return null}function b(m,d,f,x,j){if(typeof x=="string"&&x!==""||typeof x=="number")return m=m.get(f)||null,s(d,m,""+x,j);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Vr:return m=m.get(x.key===null?f:x.key)||null,c(d,m,x,j);case gn:return m=m.get(x.key===null?f:x.key)||null,p(d,m,x,j);case Ot:var z=x._init;return b(m,d,f,z(x._payload),j)}if(ar(x)||Gn(x))return m=m.get(f)||null,g(d,m,x,j,null);ta(d,x)}return null}function w(m,d,f,x){for(var j=null,z=null,N=d,P=d=0,Y=null;N!==null&&P<f.length;P++){N.index>P?(Y=N,N=null):Y=N.sibling;var O=h(m,N,f[P],x);if(O===null){N===null&&(N=Y);break}e&&N&&O.alternate===null&&t(m,N),d=o(O,d,P),z===null?j=O:z.sibling=O,z=O,N=Y}if(P===f.length)return n(m,N),te&&en(m,P),j;if(N===null){for(;P<f.length;P++)N=u(m,f[P],x),N!==null&&(d=o(N,d,P),z===null?j=N:z.sibling=N,z=N);return te&&en(m,P),j}for(N=r(m,N);P<f.length;P++)Y=b(N,m,P,f[P],x),Y!==null&&(e&&Y.alternate!==null&&N.delete(Y.key===null?P:Y.key),d=o(Y,d,P),z===null?j=Y:z.sibling=Y,z=Y);return e&&N.forEach(function(ue){return t(m,ue)}),te&&en(m,P),j}function y(m,d,f,x){var j=Gn(f);if(typeof j!="function")throw Error(C(150));if(f=j.call(f),f==null)throw Error(C(151));for(var z=j=null,N=d,P=d=0,Y=null,O=f.next();N!==null&&!O.done;P++,O=f.next()){N.index>P?(Y=N,N=null):Y=N.sibling;var ue=h(m,N,O.value,x);if(ue===null){N===null&&(N=Y);break}e&&N&&ue.alternate===null&&t(m,N),d=o(ue,d,P),z===null?j=ue:z.sibling=ue,z=ue,N=Y}if(O.done)return n(m,N),te&&en(m,P),j;if(N===null){for(;!O.done;P++,O=f.next())O=u(m,O.value,x),O!==null&&(d=o(O,d,P),z===null?j=O:z.sibling=O,z=O);return te&&en(m,P),j}for(N=r(m,N);!O.done;P++,O=f.next())O=b(N,m,P,O.value,x),O!==null&&(e&&O.alternate!==null&&N.delete(O.key===null?P:O.key),d=o(O,d,P),z===null?j=O:z.sibling=O,z=O);return e&&N.forEach(function(pe){return t(m,pe)}),te&&en(m,P),j}function E(m,d,f,x){if(typeof f=="object"&&f!==null&&f.type===xn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Vr:e:{for(var j=f.key,z=d;z!==null;){if(z.key===j){if(j=f.type,j===xn){if(z.tag===7){n(m,z.sibling),d=i(z,f.props.children),d.return=m,m=d;break e}}else if(z.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Ot&&ss(j)===z.type){n(m,z.sibling),d=i(z,f.props),d.ref=er(m,z,f),d.return=m,m=d;break e}n(m,z);break}else t(m,z);z=z.sibling}f.type===xn?(d=ln(f.props.children,m.mode,x,f.key),d.return=m,m=d):(x=xa(f.type,f.key,f.props,null,m.mode,x),x.ref=er(m,d,f),x.return=m,m=x)}return l(m);case gn:e:{for(z=f.key;d!==null;){if(d.key===z)if(d.tag===4&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){n(m,d.sibling),d=i(d,f.children||[]),d.return=m,m=d;break e}else{n(m,d);break}else t(m,d);d=d.sibling}d=_i(f,m.mode,x),d.return=m,m=d}return l(m);case Ot:return z=f._init,E(m,d,z(f._payload),x)}if(ar(f))return w(m,d,f,x);if(Gn(f))return y(m,d,f,x);ta(m,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,d!==null&&d.tag===6?(n(m,d.sibling),d=i(d,f),d.return=m,m=d):(n(m,d),d=Pi(f,m.mode,x),d.return=m,m=d),l(m)):n(m,d)}return E}var Rn=Kc(!0),Gc=Kc(!1),Pa=Jt(null),_a=null,Sn=null,Xo=null;function qo(){Xo=Sn=_a=null}function Jo(e){var t=Pa.current;ee(Pa),e._currentValue=t}function so(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function _n(e,t){_a=e,Xo=Sn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(De=!0),e.firstContext=null)}function qe(e){var t=e._currentValue;if(Xo!==e)if(e={context:e,memoizedValue:t,next:null},Sn===null){if(_a===null)throw Error(C(308));Sn=e,_a.dependencies={lanes:0,firstContext:e}}else Sn=Sn.next=e;return t}var rn=null;function Zo(e){rn===null?rn=[e]:rn.push(e)}function Xc(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Zo(t)):(n.next=i.next,i.next=n),t.interleaved=n,Tt(e,r)}function Tt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var It=!1;function el(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function qc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ct(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ht(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,B&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Tt(e,n)}return i=r.interleaved,i===null?(t.next=t,Zo(r)):(t.next=i.next,i.next=t),r.interleaved=t,Tt(e,n)}function ua(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ao(e,n)}}function cs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Da(e,t,n,r){var i=e.updateQueue;It=!1;var o=i.firstBaseUpdate,l=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,p=c.next;c.next=null,l===null?o=p:l.next=p,l=c;var g=e.alternate;g!==null&&(g=g.updateQueue,s=g.lastBaseUpdate,s!==l&&(s===null?g.firstBaseUpdate=p:s.next=p,g.lastBaseUpdate=c))}if(o!==null){var u=i.baseState;l=0,g=p=c=null,s=o;do{var h=s.lane,b=s.eventTime;if((r&h)===h){g!==null&&(g=g.next={eventTime:b,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var w=e,y=s;switch(h=t,b=n,y.tag){case 1:if(w=y.payload,typeof w=="function"){u=w.call(b,u,h);break e}u=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=y.payload,h=typeof w=="function"?w.call(b,u,h):w,h==null)break e;u=ae({},u,h);break e;case 2:It=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=i.effects,h===null?i.effects=[s]:h.push(s))}else b={eventTime:b,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},g===null?(p=g=b,c=u):g=g.next=b,l|=h;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;h=s,s=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(!0);if(g===null&&(c=u),i.baseState=c,i.firstBaseUpdate=p,i.lastBaseUpdate=g,t=i.shared.interleaved,t!==null){i=t;do l|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);un|=l,e.lanes=l,e.memoizedState=u}}function ds(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(C(191,i));i.call(r)}}}var $r={},xt=Jt($r),Er=Jt($r),Tr=Jt($r);function an(e){if(e===$r)throw Error(C(174));return e}function tl(e,t){switch(J(Tr,t),J(Er,e),J(xt,$r),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bi(t,e)}ee(xt),J(xt,t)}function $n(){ee(xt),ee(Er),ee(Tr)}function Jc(e){an(Tr.current);var t=an(xt.current),n=Bi(t,e.type);t!==n&&(J(Er,e),J(xt,n))}function nl(e){Er.current===e&&(ee(xt),ee(Er))}var ne=Jt(0);function Ma(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Si=[];function rl(){for(var e=0;e<Si.length;e++)Si[e]._workInProgressVersionPrimary=null;Si.length=0}var pa=Pt.ReactCurrentDispatcher,Ci=Pt.ReactCurrentBatchConfig,dn=0,re=null,fe=null,he=null,Oa=!1,pr=!1,Lr=0,Hp=0;function ke(){throw Error(C(321))}function al(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ct(e[n],t[n]))return!1;return!0}function il(e,t,n,r,i,o){if(dn=o,re=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,pa.current=e===null||e.memoizedState===null?Gp:Xp,e=n(r,i),pr){o=0;do{if(pr=!1,Lr=0,25<=o)throw Error(C(301));o+=1,he=fe=null,t.updateQueue=null,pa.current=qp,e=n(r,i)}while(pr)}if(pa.current=Ia,t=fe!==null&&fe.next!==null,dn=0,he=fe=re=null,Oa=!1,t)throw Error(C(300));return e}function ol(){var e=Lr!==0;return Lr=0,e}function mt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return he===null?re.memoizedState=he=e:he=he.next=e,he}function Je(){if(fe===null){var e=re.alternate;e=e!==null?e.memoizedState:null}else e=fe.next;var t=he===null?re.memoizedState:he.next;if(t!==null)he=t,fe=e;else{if(e===null)throw Error(C(310));fe=e,e={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},he===null?re.memoizedState=he=e:he=he.next=e}return he}function Pr(e,t){return typeof t=="function"?t(e):t}function zi(e){var t=Je(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=fe,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var l=i.next;i.next=o.next,o.next=l}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var s=l=null,c=null,p=o;do{var g=p.lane;if((dn&g)===g)c!==null&&(c=c.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var u={lane:g,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};c===null?(s=c=u,l=r):c=c.next=u,re.lanes|=g,un|=g}p=p.next}while(p!==null&&p!==o);c===null?l=r:c.next=s,ct(r,t.memoizedState)||(De=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,re.lanes|=o,un|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ei(e){var t=Je(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var l=i=i.next;do o=e(o,l.action),l=l.next;while(l!==i);ct(o,t.memoizedState)||(De=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Zc(){}function ed(e,t){var n=re,r=Je(),i=t(),o=!ct(r.memoizedState,i);if(o&&(r.memoizedState=i,De=!0),r=r.queue,ll(rd.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||he!==null&&he.memoizedState.tag&1){if(n.flags|=2048,_r(9,nd.bind(null,n,r,i,t),void 0,null),ge===null)throw Error(C(349));dn&30||td(n,t,i)}return i}function td(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=re.updateQueue,t===null?(t={lastEffect:null,stores:null},re.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function nd(e,t,n,r){t.value=n,t.getSnapshot=r,ad(t)&&id(e)}function rd(e,t,n){return n(function(){ad(t)&&id(e)})}function ad(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ct(e,n)}catch{return!0}}function id(e){var t=Tt(e,1);t!==null&&st(t,e,1,-1)}function us(e){var t=mt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Pr,lastRenderedState:e},t.queue=e,e=e.dispatch=Kp.bind(null,re,e),[t.memoizedState,e]}function _r(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=re.updateQueue,t===null?(t={lastEffect:null,stores:null},re.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function od(){return Je().memoizedState}function fa(e,t,n,r){var i=mt();re.flags|=e,i.memoizedState=_r(1|t,n,void 0,r===void 0?null:r)}function Xa(e,t,n,r){var i=Je();r=r===void 0?null:r;var o=void 0;if(fe!==null){var l=fe.memoizedState;if(o=l.destroy,r!==null&&al(r,l.deps)){i.memoizedState=_r(t,n,o,r);return}}re.flags|=e,i.memoizedState=_r(1|t,n,o,r)}function ps(e,t){return fa(8390656,8,e,t)}function ll(e,t){return Xa(2048,8,e,t)}function ld(e,t){return Xa(4,2,e,t)}function sd(e,t){return Xa(4,4,e,t)}function cd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function dd(e,t,n){return n=n!=null?n.concat([e]):null,Xa(4,4,cd.bind(null,t,e),n)}function sl(){}function ud(e,t){var n=Je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&al(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function pd(e,t){var n=Je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&al(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function fd(e,t,n){return dn&21?(ct(n,t)||(n=vc(),re.lanes|=n,un|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,De=!0),e.memoizedState=n)}function Qp(e,t){var n=Q;Q=n!==0&&4>n?n:4,e(!0);var r=Ci.transition;Ci.transition={};try{e(!1),t()}finally{Q=n,Ci.transition=r}}function md(){return Je().memoizedState}function Yp(e,t,n){var r=Yt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hd(e))gd(t,n);else if(n=Xc(e,t,n,r),n!==null){var i=Ee();st(n,e,r,i),xd(n,t,r)}}function Kp(e,t,n){var r=Yt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hd(e))gd(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,s=o(l,n);if(i.hasEagerState=!0,i.eagerState=s,ct(s,l)){var c=t.interleaved;c===null?(i.next=i,Zo(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Xc(e,t,i,r),n!==null&&(i=Ee(),st(n,e,r,i),xd(n,t,r))}}function hd(e){var t=e.alternate;return e===re||t!==null&&t===re}function gd(e,t){pr=Oa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function xd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ao(e,n)}}var Ia={readContext:qe,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useInsertionEffect:ke,useLayoutEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useMutableSource:ke,useSyncExternalStore:ke,useId:ke,unstable_isNewReconciler:!1},Gp={readContext:qe,useCallback:function(e,t){return mt().memoizedState=[e,t===void 0?null:t],e},useContext:qe,useEffect:ps,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,fa(4194308,4,cd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fa(4194308,4,e,t)},useInsertionEffect:function(e,t){return fa(4,2,e,t)},useMemo:function(e,t){var n=mt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=mt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Yp.bind(null,re,e),[r.memoizedState,e]},useRef:function(e){var t=mt();return e={current:e},t.memoizedState=e},useState:us,useDebugValue:sl,useDeferredValue:function(e){return mt().memoizedState=e},useTransition:function(){var e=us(!1),t=e[0];return e=Qp.bind(null,e[1]),mt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=re,i=mt();if(te){if(n===void 0)throw Error(C(407));n=n()}else{if(n=t(),ge===null)throw Error(C(349));dn&30||td(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,ps(rd.bind(null,r,o,e),[e]),r.flags|=2048,_r(9,nd.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=mt(),t=ge.identifierPrefix;if(te){var n=St,r=Nt;n=(r&~(1<<32-lt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Lr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Xp={readContext:qe,useCallback:ud,useContext:qe,useEffect:ll,useImperativeHandle:dd,useInsertionEffect:ld,useLayoutEffect:sd,useMemo:pd,useReducer:zi,useRef:od,useState:function(){return zi(Pr)},useDebugValue:sl,useDeferredValue:function(e){var t=Je();return fd(t,fe.memoizedState,e)},useTransition:function(){var e=zi(Pr)[0],t=Je().memoizedState;return[e,t]},useMutableSource:Zc,useSyncExternalStore:ed,useId:md,unstable_isNewReconciler:!1},qp={readContext:qe,useCallback:ud,useContext:qe,useEffect:ll,useImperativeHandle:dd,useInsertionEffect:ld,useLayoutEffect:sd,useMemo:pd,useReducer:Ei,useRef:od,useState:function(){return Ei(Pr)},useDebugValue:sl,useDeferredValue:function(e){var t=Je();return fe===null?t.memoizedState=e:fd(t,fe.memoizedState,e)},useTransition:function(){var e=Ei(Pr)[0],t=Je().memoizedState;return[e,t]},useMutableSource:Zc,useSyncExternalStore:ed,useId:md,unstable_isNewReconciler:!1};function at(e,t){if(e&&e.defaultProps){t=ae({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function co(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ae({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var qa={isMounted:function(e){return(e=e._reactInternals)?mn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=Yt(e),o=Ct(r,i);o.payload=t,n!=null&&(o.callback=n),t=Ht(e,o,i),t!==null&&(st(t,e,i,r),ua(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=Yt(e),o=Ct(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Ht(e,o,i),t!==null&&(st(t,e,i,r),ua(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ee(),r=Yt(e),i=Ct(n,r);i.tag=2,t!=null&&(i.callback=t),t=Ht(e,i,r),t!==null&&(st(t,e,r,n),ua(t,e,r))}};function fs(e,t,n,r,i,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,l):t.prototype&&t.prototype.isPureReactComponent?!Nr(n,r)||!Nr(i,o):!0}function vd(e,t,n){var r=!1,i=Xt,o=t.contextType;return typeof o=="object"&&o!==null?o=qe(o):(i=Oe(t)?sn:Ce.current,r=t.contextTypes,o=(r=r!=null)?On(e,i):Xt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=qa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function ms(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&qa.enqueueReplaceState(t,t.state,null)}function uo(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},el(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=qe(o):(o=Oe(t)?sn:Ce.current,i.context=On(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(co(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&qa.enqueueReplaceState(i,i.state,null),Da(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function An(e,t){try{var n="",r=t;do n+=Su(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Ti(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function po(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Jp=typeof WeakMap=="function"?WeakMap:Map;function yd(e,t,n){n=Ct(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){$a||($a=!0,jo=r),po(e,t)},n}function bd(e,t,n){n=Ct(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){po(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){po(e,t),typeof r!="function"&&(Qt===null?Qt=new Set([this]):Qt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function hs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Jp;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=ff.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function xs(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ct(-1,1),t.tag=2,Ht(n,t,1))),n.lanes|=1),e)}var Zp=Pt.ReactCurrentOwner,De=!1;function ze(e,t,n,r){t.child=e===null?Gc(t,null,n,r):Rn(t,e.child,n,r)}function vs(e,t,n,r,i){n=n.render;var o=t.ref;return _n(t,i),r=il(e,t,n,r,o,i),n=ol(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Lt(e,t,i)):(te&&n&&Yo(t),t.flags|=1,ze(e,t,r,i),t.child)}function ys(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!gl(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,wd(e,t,o,r,i)):(e=xa(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:Nr,n(l,r)&&e.ref===t.ref)return Lt(e,t,i)}return t.flags|=1,e=Kt(o,r),e.ref=t.ref,e.return=t,t.child=e}function wd(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(Nr(o,r)&&e.ref===t.ref)if(De=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(De=!0);else return t.lanes=e.lanes,Lt(e,t,i)}return fo(e,t,n,r,i)}function jd(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},J(zn,Ae),Ae|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,J(zn,Ae),Ae|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,J(zn,Ae),Ae|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,J(zn,Ae),Ae|=r;return ze(e,t,i,n),t.child}function kd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function fo(e,t,n,r,i){var o=Oe(n)?sn:Ce.current;return o=On(t,o),_n(t,i),n=il(e,t,n,r,o,i),r=ol(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Lt(e,t,i)):(te&&r&&Yo(t),t.flags|=1,ze(e,t,n,i),t.child)}function bs(e,t,n,r,i){if(Oe(n)){var o=!0;Ea(t)}else o=!1;if(_n(t,i),t.stateNode===null)ma(e,t),vd(t,n,r),uo(t,n,r,i),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var c=l.context,p=n.contextType;typeof p=="object"&&p!==null?p=qe(p):(p=Oe(n)?sn:Ce.current,p=On(t,p));var g=n.getDerivedStateFromProps,u=typeof g=="function"||typeof l.getSnapshotBeforeUpdate=="function";u||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||c!==p)&&ms(t,l,r,p),It=!1;var h=t.memoizedState;l.state=h,Da(t,r,l,i),c=t.memoizedState,s!==r||h!==c||Me.current||It?(typeof g=="function"&&(co(t,n,g,r),c=t.memoizedState),(s=It||fs(t,n,s,r,h,c,p))?(u||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=p,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,qc(e,t),s=t.memoizedProps,p=t.type===t.elementType?s:at(t.type,s),l.props=p,u=t.pendingProps,h=l.context,c=n.contextType,typeof c=="object"&&c!==null?c=qe(c):(c=Oe(n)?sn:Ce.current,c=On(t,c));var b=n.getDerivedStateFromProps;(g=typeof b=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==u||h!==c)&&ms(t,l,r,c),It=!1,h=t.memoizedState,l.state=h,Da(t,r,l,i);var w=t.memoizedState;s!==u||h!==w||Me.current||It?(typeof b=="function"&&(co(t,n,b,r),w=t.memoizedState),(p=It||fs(t,n,p,r,h,w,c)||!1)?(g||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,w,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,w,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),l.props=r,l.state=w,l.context=c,r=p):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return mo(e,t,n,r,o,i)}function mo(e,t,n,r,i,o){kd(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return i&&is(t,n,!1),Lt(e,t,o);r=t.stateNode,Zp.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Rn(t,e.child,null,o),t.child=Rn(t,null,s,o)):ze(e,t,s,o),t.memoizedState=r.state,i&&is(t,n,!0),t.child}function Nd(e){var t=e.stateNode;t.pendingContext?as(e,t.pendingContext,t.pendingContext!==t.context):t.context&&as(e,t.context,!1),tl(e,t.containerInfo)}function ws(e,t,n,r,i){return In(),Go(i),t.flags|=256,ze(e,t,n,r),t.child}var ho={dehydrated:null,treeContext:null,retryLane:0};function go(e){return{baseLanes:e,cachePool:null,transitions:null}}function Sd(e,t,n){var r=t.pendingProps,i=ne.current,o=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),J(ne,i&1),e===null)return lo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,o?(r=t.mode,o=t.child,l={mode:"hidden",children:l},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=l):o=ei(l,r,0,null),e=ln(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=go(n),t.memoizedState=ho,e):cl(t,l));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return ef(e,t,l,r,s,i,n);if(o){o=r.fallback,l=t.mode,i=e.child,s=i.sibling;var c={mode:"hidden",children:r.children};return!(l&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Kt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?o=Kt(s,o):(o=ln(o,l,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,l=e.child.memoizedState,l=l===null?go(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=e.childLanes&~n,t.memoizedState=ho,r}return o=e.child,e=o.sibling,r=Kt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function cl(e,t){return t=ei({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function na(e,t,n,r){return r!==null&&Go(r),Rn(t,e.child,null,n),e=cl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ef(e,t,n,r,i,o,l){if(n)return t.flags&256?(t.flags&=-257,r=Ti(Error(C(422))),na(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=ei({mode:"visible",children:r.children},i,0,null),o=ln(o,i,l,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Rn(t,e.child,null,l),t.child.memoizedState=go(l),t.memoizedState=ho,o);if(!(t.mode&1))return na(e,t,l,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,o=Error(C(419)),r=Ti(o,r,void 0),na(e,t,l,r)}if(s=(l&e.childLanes)!==0,De||s){if(r=ge,r!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|l)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Tt(e,i),st(r,e,i,-1))}return hl(),r=Ti(Error(C(421))),na(e,t,l,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=mf.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Fe=Vt(i.nextSibling),Ue=t,te=!0,ot=null,e!==null&&(Ye[Ke++]=Nt,Ye[Ke++]=St,Ye[Ke++]=cn,Nt=e.id,St=e.overflow,cn=t),t=cl(t,r.children),t.flags|=4096,t)}function js(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),so(e.return,t,n)}function Li(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function Cd(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(ze(e,t,r.children,n),r=ne.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&js(e,n,t);else if(e.tag===19)js(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(J(ne,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ma(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Li(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ma(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Li(t,!0,n,null,o);break;case"together":Li(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ma(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),un|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(C(153));if(t.child!==null){for(e=t.child,n=Kt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Kt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function tf(e,t,n){switch(t.tag){case 3:Nd(t),In();break;case 5:Jc(t);break;case 1:Oe(t.type)&&Ea(t);break;case 4:tl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;J(Pa,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(J(ne,ne.current&1),t.flags|=128,null):n&t.child.childLanes?Sd(e,t,n):(J(ne,ne.current&1),e=Lt(e,t,n),e!==null?e.sibling:null);J(ne,ne.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Cd(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),J(ne,ne.current),r)break;return null;case 22:case 23:return t.lanes=0,jd(e,t,n)}return Lt(e,t,n)}var zd,xo,Ed,Td;zd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};xo=function(){};Ed=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,an(xt.current);var o=null;switch(n){case"input":i=$i(e,i),r=$i(e,r),o=[];break;case"select":i=ae({},i,{value:void 0}),r=ae({},r,{value:void 0}),o=[];break;case"textarea":i=Ui(e,i),r=Ui(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ca)}Wi(n,r);var l;n=null;for(p in i)if(!r.hasOwnProperty(p)&&i.hasOwnProperty(p)&&i[p]!=null)if(p==="style"){var s=i[p];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(xr.hasOwnProperty(p)?o||(o=[]):(o=o||[]).push(p,null));for(p in r){var c=r[p];if(s=i!=null?i[p]:void 0,r.hasOwnProperty(p)&&c!==s&&(c!=null||s!=null))if(p==="style")if(s){for(l in s)!s.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&s[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(o||(o=[]),o.push(p,n)),n=c;else p==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(o=o||[]).push(p,c)):p==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(p,""+c):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(xr.hasOwnProperty(p)?(c!=null&&p==="onScroll"&&Z("scroll",e),o||s===c||(o=[])):(o=o||[]).push(p,c))}n&&(o=o||[]).push("style",n);var p=o;(t.updateQueue=p)&&(t.flags|=4)}};Td=function(e,t,n,r){n!==r&&(t.flags|=4)};function tr(e,t){if(!te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ne(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function nf(e,t,n){var r=t.pendingProps;switch(Ko(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ne(t),null;case 1:return Oe(t.type)&&za(),Ne(t),null;case 3:return r=t.stateNode,$n(),ee(Me),ee(Ce),rl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ea(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ot!==null&&(So(ot),ot=null))),xo(e,t),Ne(t),null;case 5:nl(t);var i=an(Tr.current);if(n=t.type,e!==null&&t.stateNode!=null)Ed(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(C(166));return Ne(t),null}if(e=an(xt.current),ea(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[ht]=t,r[zr]=o,e=(t.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(i=0;i<or.length;i++)Z(or[i],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":Pl(r,o),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Z("invalid",r);break;case"textarea":Dl(r,o),Z("invalid",r)}Wi(n,o),i=null;for(var l in o)if(o.hasOwnProperty(l)){var s=o[l];l==="children"?typeof s=="string"?r.textContent!==s&&(o.suppressHydrationWarning!==!0&&Zr(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(o.suppressHydrationWarning!==!0&&Zr(r.textContent,s,e),i=["children",""+s]):xr.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&Z("scroll",r)}switch(n){case"input":Hr(r),_l(r,o,!0);break;case"textarea":Hr(r),Ml(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Ca)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=rc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[ht]=t,e[zr]=r,zd(e,t,!1,!1),t.stateNode=e;e:{switch(l=Vi(n,r),n){case"dialog":Z("cancel",e),Z("close",e),i=r;break;case"iframe":case"object":case"embed":Z("load",e),i=r;break;case"video":case"audio":for(i=0;i<or.length;i++)Z(or[i],e);i=r;break;case"source":Z("error",e),i=r;break;case"img":case"image":case"link":Z("error",e),Z("load",e),i=r;break;case"details":Z("toggle",e),i=r;break;case"input":Pl(e,r),i=$i(e,r),Z("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ae({},r,{value:void 0}),Z("invalid",e);break;case"textarea":Dl(e,r),i=Ui(e,r),Z("invalid",e);break;default:i=r}Wi(n,i),s=i;for(o in s)if(s.hasOwnProperty(o)){var c=s[o];o==="style"?oc(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&ac(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&vr(e,c):typeof c=="number"&&vr(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(xr.hasOwnProperty(o)?c!=null&&o==="onScroll"&&Z("scroll",e):c!=null&&Do(e,o,c,l))}switch(n){case"input":Hr(e),_l(e,r,!1);break;case"textarea":Hr(e),Ml(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Gt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?En(e,!!r.multiple,o,!1):r.defaultValue!=null&&En(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ca)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ne(t),null;case 6:if(e&&t.stateNode!=null)Td(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(C(166));if(n=an(Tr.current),an(xt.current),ea(t)){if(r=t.stateNode,n=t.memoizedProps,r[ht]=t,(o=r.nodeValue!==n)&&(e=Ue,e!==null))switch(e.tag){case 3:Zr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Zr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ht]=t,t.stateNode=r}return Ne(t),null;case 13:if(ee(ne),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(te&&Fe!==null&&t.mode&1&&!(t.flags&128))Yc(),In(),t.flags|=98560,o=!1;else if(o=ea(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(C(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(C(317));o[ht]=t}else In(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ne(t),o=!1}else ot!==null&&(So(ot),ot=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ne.current&1?me===0&&(me=3):hl())),t.updateQueue!==null&&(t.flags|=4),Ne(t),null);case 4:return $n(),xo(e,t),e===null&&Sr(t.stateNode.containerInfo),Ne(t),null;case 10:return Jo(t.type._context),Ne(t),null;case 17:return Oe(t.type)&&za(),Ne(t),null;case 19:if(ee(ne),o=t.memoizedState,o===null)return Ne(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)tr(o,!1);else{if(me!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Ma(e),l!==null){for(t.flags|=128,tr(o,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return J(ne,ne.current&1|2),t.child}e=e.sibling}o.tail!==null&&le()>Fn&&(t.flags|=128,r=!0,tr(o,!1),t.lanes=4194304)}else{if(!r)if(e=Ma(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),tr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!te)return Ne(t),null}else 2*le()-o.renderingStartTime>Fn&&n!==1073741824&&(t.flags|=128,r=!0,tr(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(n=o.last,n!==null?n.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=le(),t.sibling=null,n=ne.current,J(ne,r?n&1|2:n&1),t):(Ne(t),null);case 22:case 23:return ml(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ae&1073741824&&(Ne(t),t.subtreeFlags&6&&(t.flags|=8192)):Ne(t),null;case 24:return null;case 25:return null}throw Error(C(156,t.tag))}function rf(e,t){switch(Ko(t),t.tag){case 1:return Oe(t.type)&&za(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $n(),ee(Me),ee(Ce),rl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return nl(t),null;case 13:if(ee(ne),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(C(340));In()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(ne),null;case 4:return $n(),null;case 10:return Jo(t.type._context),null;case 22:case 23:return ml(),null;case 24:return null;default:return null}}var ra=!1,Se=!1,af=typeof WeakSet=="function"?WeakSet:Set,D=null;function Cn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){oe(e,t,r)}else n.current=null}function vo(e,t,n){try{n()}catch(r){oe(e,t,r)}}var ks=!1;function of(e,t){if(eo=ka,e=Mc(),Qo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,s=-1,c=-1,p=0,g=0,u=e,h=null;t:for(;;){for(var b;u!==n||i!==0&&u.nodeType!==3||(s=l+i),u!==o||r!==0&&u.nodeType!==3||(c=l+r),u.nodeType===3&&(l+=u.nodeValue.length),(b=u.firstChild)!==null;)h=u,u=b;for(;;){if(u===e)break t;if(h===n&&++p===i&&(s=l),h===o&&++g===r&&(c=l),(b=u.nextSibling)!==null)break;u=h,h=u.parentNode}u=b}n=s===-1||c===-1?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(to={focusedElem:e,selectionRange:n},ka=!1,D=t;D!==null;)if(t=D,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,D=e;else for(;D!==null;){t=D;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var y=w.memoizedProps,E=w.memoizedState,m=t.stateNode,d=m.getSnapshotBeforeUpdate(t.elementType===t.type?y:at(t.type,y),E);m.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(C(163))}}catch(x){oe(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,D=e;break}D=t.return}return w=ks,ks=!1,w}function fr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&vo(t,n,o)}i=i.next}while(i!==r)}}function Ja(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function yo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Ld(e){var t=e.alternate;t!==null&&(e.alternate=null,Ld(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ht],delete t[zr],delete t[ao],delete t[Up],delete t[Bp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Pd(e){return e.tag===5||e.tag===3||e.tag===4}function Ns(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Pd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ca));else if(r!==4&&(e=e.child,e!==null))for(bo(e,t,n),e=e.sibling;e!==null;)bo(e,t,n),e=e.sibling}function wo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(wo(e,t,n),e=e.sibling;e!==null;)wo(e,t,n),e=e.sibling}var ye=null,it=!1;function Mt(e,t,n){for(n=n.child;n!==null;)_d(e,t,n),n=n.sibling}function _d(e,t,n){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(Va,n)}catch{}switch(n.tag){case 5:Se||Cn(n,t);case 6:var r=ye,i=it;ye=null,Mt(e,t,n),ye=r,it=i,ye!==null&&(it?(e=ye,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ye.removeChild(n.stateNode));break;case 18:ye!==null&&(it?(e=ye,n=n.stateNode,e.nodeType===8?ki(e.parentNode,n):e.nodeType===1&&ki(e,n),jr(e)):ki(ye,n.stateNode));break;case 4:r=ye,i=it,ye=n.stateNode.containerInfo,it=!0,Mt(e,t,n),ye=r,it=i;break;case 0:case 11:case 14:case 15:if(!Se&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,l=o.destroy;o=o.tag,l!==void 0&&(o&2||o&4)&&vo(n,t,l),i=i.next}while(i!==r)}Mt(e,t,n);break;case 1:if(!Se&&(Cn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){oe(n,t,s)}Mt(e,t,n);break;case 21:Mt(e,t,n);break;case 22:n.mode&1?(Se=(r=Se)||n.memoizedState!==null,Mt(e,t,n),Se=r):Mt(e,t,n);break;default:Mt(e,t,n)}}function Ss(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new af),t.forEach(function(r){var i=hf.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function rt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:ye=s.stateNode,it=!1;break e;case 3:ye=s.stateNode.containerInfo,it=!0;break e;case 4:ye=s.stateNode.containerInfo,it=!0;break e}s=s.return}if(ye===null)throw Error(C(160));_d(o,l,i),ye=null,it=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(p){oe(i,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Dd(t,e),t=t.sibling}function Dd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(rt(t,e),ft(e),r&4){try{fr(3,e,e.return),Ja(3,e)}catch(y){oe(e,e.return,y)}try{fr(5,e,e.return)}catch(y){oe(e,e.return,y)}}break;case 1:rt(t,e),ft(e),r&512&&n!==null&&Cn(n,n.return);break;case 5:if(rt(t,e),ft(e),r&512&&n!==null&&Cn(n,n.return),e.flags&32){var i=e.stateNode;try{vr(i,"")}catch(y){oe(e,e.return,y)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,l=n!==null?n.memoizedProps:o,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&o.type==="radio"&&o.name!=null&&tc(i,o),Vi(s,l);var p=Vi(s,o);for(l=0;l<c.length;l+=2){var g=c[l],u=c[l+1];g==="style"?oc(i,u):g==="dangerouslySetInnerHTML"?ac(i,u):g==="children"?vr(i,u):Do(i,g,u,p)}switch(s){case"input":Ai(i,o);break;case"textarea":nc(i,o);break;case"select":var h=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var b=o.value;b!=null?En(i,!!o.multiple,b,!1):h!==!!o.multiple&&(o.defaultValue!=null?En(i,!!o.multiple,o.defaultValue,!0):En(i,!!o.multiple,o.multiple?[]:"",!1))}i[zr]=o}catch(y){oe(e,e.return,y)}}break;case 6:if(rt(t,e),ft(e),r&4){if(e.stateNode===null)throw Error(C(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(y){oe(e,e.return,y)}}break;case 3:if(rt(t,e),ft(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{jr(t.containerInfo)}catch(y){oe(e,e.return,y)}break;case 4:rt(t,e),ft(e);break;case 13:rt(t,e),ft(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(pl=le())),r&4&&Ss(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(Se=(p=Se)||g,rt(t,e),Se=p):rt(t,e),ft(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!g&&e.mode&1)for(D=e,g=e.child;g!==null;){for(u=D=g;D!==null;){switch(h=D,b=h.child,h.tag){case 0:case 11:case 14:case 15:fr(4,h,h.return);break;case 1:Cn(h,h.return);var w=h.stateNode;if(typeof w.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(y){oe(r,n,y)}}break;case 5:Cn(h,h.return);break;case 22:if(h.memoizedState!==null){zs(u);continue}}b!==null?(b.return=h,D=b):zs(u)}g=g.sibling}e:for(g=null,u=e;;){if(u.tag===5){if(g===null){g=u;try{i=u.stateNode,p?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(s=u.stateNode,c=u.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=ic("display",l))}catch(y){oe(e,e.return,y)}}}else if(u.tag===6){if(g===null)try{u.stateNode.nodeValue=p?"":u.memoizedProps}catch(y){oe(e,e.return,y)}}else if((u.tag!==22&&u.tag!==23||u.memoizedState===null||u===e)&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===e)break e;for(;u.sibling===null;){if(u.return===null||u.return===e)break e;g===u&&(g=null),u=u.return}g===u&&(g=null),u.sibling.return=u.return,u=u.sibling}}break;case 19:rt(t,e),ft(e),r&4&&Ss(e);break;case 21:break;default:rt(t,e),ft(e)}}function ft(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Pd(n)){var r=n;break e}n=n.return}throw Error(C(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(vr(i,""),r.flags&=-33);var o=Ns(e);wo(e,o,i);break;case 3:case 4:var l=r.stateNode.containerInfo,s=Ns(e);bo(e,s,l);break;default:throw Error(C(161))}}catch(c){oe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function lf(e,t,n){D=e,Md(e)}function Md(e,t,n){for(var r=(e.mode&1)!==0;D!==null;){var i=D,o=i.child;if(i.tag===22&&r){var l=i.memoizedState!==null||ra;if(!l){var s=i.alternate,c=s!==null&&s.memoizedState!==null||Se;s=ra;var p=Se;if(ra=l,(Se=c)&&!p)for(D=i;D!==null;)l=D,c=l.child,l.tag===22&&l.memoizedState!==null?Es(i):c!==null?(c.return=l,D=c):Es(i);for(;o!==null;)D=o,Md(o),o=o.sibling;D=i,ra=s,Se=p}Cs(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,D=o):Cs(e)}}function Cs(e){for(;D!==null;){var t=D;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Se||Ja(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Se)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:at(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&ds(t,o,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ds(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var g=p.memoizedState;if(g!==null){var u=g.dehydrated;u!==null&&jr(u)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(C(163))}Se||t.flags&512&&yo(t)}catch(h){oe(t,t.return,h)}}if(t===e){D=null;break}if(n=t.sibling,n!==null){n.return=t.return,D=n;break}D=t.return}}function zs(e){for(;D!==null;){var t=D;if(t===e){D=null;break}var n=t.sibling;if(n!==null){n.return=t.return,D=n;break}D=t.return}}function Es(e){for(;D!==null;){var t=D;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ja(4,t)}catch(c){oe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){oe(t,i,c)}}var o=t.return;try{yo(t)}catch(c){oe(t,o,c)}break;case 5:var l=t.return;try{yo(t)}catch(c){oe(t,l,c)}}}catch(c){oe(t,t.return,c)}if(t===e){D=null;break}var s=t.sibling;if(s!==null){s.return=t.return,D=s;break}D=t.return}}var sf=Math.ceil,Ra=Pt.ReactCurrentDispatcher,dl=Pt.ReactCurrentOwner,Xe=Pt.ReactCurrentBatchConfig,B=0,ge=null,de=null,be=0,Ae=0,zn=Jt(0),me=0,Dr=null,un=0,Za=0,ul=0,mr=null,_e=null,pl=0,Fn=1/0,jt=null,$a=!1,jo=null,Qt=null,aa=!1,Ft=null,Aa=0,hr=0,ko=null,ha=-1,ga=0;function Ee(){return B&6?le():ha!==-1?ha:ha=le()}function Yt(e){return e.mode&1?B&2&&be!==0?be&-be:Vp.transition!==null?(ga===0&&(ga=vc()),ga):(e=Q,e!==0||(e=window.event,e=e===void 0?16:Sc(e.type)),e):1}function st(e,t,n,r){if(50<hr)throw hr=0,ko=null,Error(C(185));Or(e,n,r),(!(B&2)||e!==ge)&&(e===ge&&(!(B&2)&&(Za|=n),me===4&&$t(e,be)),Ie(e,r),n===1&&B===0&&!(t.mode&1)&&(Fn=le()+500,Ga&&Zt()))}function Ie(e,t){var n=e.callbackNode;Vu(e,t);var r=ja(e,e===ge?be:0);if(r===0)n!==null&&Rl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Rl(n),t===1)e.tag===0?Wp(Ts.bind(null,e)):Vc(Ts.bind(null,e)),Ap(function(){!(B&6)&&Zt()}),n=null;else{switch(yc(r)){case 1:n=$o;break;case 4:n=gc;break;case 16:n=wa;break;case 536870912:n=xc;break;default:n=wa}n=Bd(n,Od.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Od(e,t){if(ha=-1,ga=0,B&6)throw Error(C(327));var n=e.callbackNode;if(Dn()&&e.callbackNode!==n)return null;var r=ja(e,e===ge?be:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Fa(e,r);else{t=r;var i=B;B|=2;var o=Rd();(ge!==e||be!==t)&&(jt=null,Fn=le()+500,on(e,t));do try{uf();break}catch(s){Id(e,s)}while(!0);qo(),Ra.current=o,B=i,de!==null?t=0:(ge=null,be=0,t=me)}if(t!==0){if(t===2&&(i=Gi(e),i!==0&&(r=i,t=No(e,i))),t===1)throw n=Dr,on(e,0),$t(e,r),Ie(e,le()),n;if(t===6)$t(e,r);else{if(i=e.current.alternate,!(r&30)&&!cf(i)&&(t=Fa(e,r),t===2&&(o=Gi(e),o!==0&&(r=o,t=No(e,o))),t===1))throw n=Dr,on(e,0),$t(e,r),Ie(e,le()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(C(345));case 2:tn(e,_e,jt);break;case 3:if($t(e,r),(r&130023424)===r&&(t=pl+500-le(),10<t)){if(ja(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ee(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ro(tn.bind(null,e,_e,jt),t);break}tn(e,_e,jt);break;case 4:if($t(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var l=31-lt(r);o=1<<l,l=t[l],l>i&&(i=l),r&=~o}if(r=i,r=le()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*sf(r/1960))-r,10<r){e.timeoutHandle=ro(tn.bind(null,e,_e,jt),r);break}tn(e,_e,jt);break;case 5:tn(e,_e,jt);break;default:throw Error(C(329))}}}return Ie(e,le()),e.callbackNode===n?Od.bind(null,e):null}function No(e,t){var n=mr;return e.current.memoizedState.isDehydrated&&(on(e,t).flags|=256),e=Fa(e,t),e!==2&&(t=_e,_e=n,t!==null&&So(t)),e}function So(e){_e===null?_e=e:_e.push.apply(_e,e)}function cf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!ct(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $t(e,t){for(t&=~ul,t&=~Za,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-lt(t),r=1<<n;e[n]=-1,t&=~r}}function Ts(e){if(B&6)throw Error(C(327));Dn();var t=ja(e,0);if(!(t&1))return Ie(e,le()),null;var n=Fa(e,t);if(e.tag!==0&&n===2){var r=Gi(e);r!==0&&(t=r,n=No(e,r))}if(n===1)throw n=Dr,on(e,0),$t(e,t),Ie(e,le()),n;if(n===6)throw Error(C(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,tn(e,_e,jt),Ie(e,le()),null}function fl(e,t){var n=B;B|=1;try{return e(t)}finally{B=n,B===0&&(Fn=le()+500,Ga&&Zt())}}function pn(e){Ft!==null&&Ft.tag===0&&!(B&6)&&Dn();var t=B;B|=1;var n=Xe.transition,r=Q;try{if(Xe.transition=null,Q=1,e)return e()}finally{Q=r,Xe.transition=n,B=t,!(B&6)&&Zt()}}function ml(){Ae=zn.current,ee(zn)}function on(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,$p(n)),de!==null)for(n=de.return;n!==null;){var r=n;switch(Ko(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&za();break;case 3:$n(),ee(Me),ee(Ce),rl();break;case 5:nl(r);break;case 4:$n();break;case 13:ee(ne);break;case 19:ee(ne);break;case 10:Jo(r.type._context);break;case 22:case 23:ml()}n=n.return}if(ge=e,de=e=Kt(e.current,null),be=Ae=t,me=0,Dr=null,ul=Za=un=0,_e=mr=null,rn!==null){for(t=0;t<rn.length;t++)if(n=rn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=i,r.next=l}n.pending=r}rn=null}return e}function Id(e,t){do{var n=de;try{if(qo(),pa.current=Ia,Oa){for(var r=re.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Oa=!1}if(dn=0,he=fe=re=null,pr=!1,Lr=0,dl.current=null,n===null||n.return===null){me=1,Dr=t,de=null;break}e:{var o=e,l=n.return,s=n,c=t;if(t=be,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var p=c,g=s,u=g.tag;if(!(g.mode&1)&&(u===0||u===11||u===15)){var h=g.alternate;h?(g.updateQueue=h.updateQueue,g.memoizedState=h.memoizedState,g.lanes=h.lanes):(g.updateQueue=null,g.memoizedState=null)}var b=gs(l);if(b!==null){b.flags&=-257,xs(b,l,s,o,t),b.mode&1&&hs(o,p,t),t=b,c=p;var w=t.updateQueue;if(w===null){var y=new Set;y.add(c),t.updateQueue=y}else w.add(c);break e}else{if(!(t&1)){hs(o,p,t),hl();break e}c=Error(C(426))}}else if(te&&s.mode&1){var E=gs(l);if(E!==null){!(E.flags&65536)&&(E.flags|=256),xs(E,l,s,o,t),Go(An(c,s));break e}}o=c=An(c,s),me!==4&&(me=2),mr===null?mr=[o]:mr.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var m=yd(o,c,t);cs(o,m);break e;case 1:s=c;var d=o.type,f=o.stateNode;if(!(o.flags&128)&&(typeof d.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Qt===null||!Qt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=bd(o,s,t);cs(o,x);break e}}o=o.return}while(o!==null)}Ad(n)}catch(j){t=j,de===n&&n!==null&&(de=n=n.return);continue}break}while(!0)}function Rd(){var e=Ra.current;return Ra.current=Ia,e===null?Ia:e}function hl(){(me===0||me===3||me===2)&&(me=4),ge===null||!(un&268435455)&&!(Za&268435455)||$t(ge,be)}function Fa(e,t){var n=B;B|=2;var r=Rd();(ge!==e||be!==t)&&(jt=null,on(e,t));do try{df();break}catch(i){Id(e,i)}while(!0);if(qo(),B=n,Ra.current=r,de!==null)throw Error(C(261));return ge=null,be=0,me}function df(){for(;de!==null;)$d(de)}function uf(){for(;de!==null&&!Ou();)$d(de)}function $d(e){var t=Ud(e.alternate,e,Ae);e.memoizedProps=e.pendingProps,t===null?Ad(e):de=t,dl.current=null}function Ad(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=rf(n,t),n!==null){n.flags&=32767,de=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{me=6,de=null;return}}else if(n=nf(n,t,Ae),n!==null){de=n;return}if(t=t.sibling,t!==null){de=t;return}de=t=e}while(t!==null);me===0&&(me=5)}function tn(e,t,n){var r=Q,i=Xe.transition;try{Xe.transition=null,Q=1,pf(e,t,n,r)}finally{Xe.transition=i,Q=r}return null}function pf(e,t,n,r){do Dn();while(Ft!==null);if(B&6)throw Error(C(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(C(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Hu(e,o),e===ge&&(de=ge=null,be=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||aa||(aa=!0,Bd(wa,function(){return Dn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Xe.transition,Xe.transition=null;var l=Q;Q=1;var s=B;B|=4,dl.current=null,of(e,n),Dd(n,e),Pp(to),ka=!!eo,to=eo=null,e.current=n,lf(n),Iu(),B=s,Q=l,Xe.transition=o}else e.current=n;if(aa&&(aa=!1,Ft=e,Aa=i),o=e.pendingLanes,o===0&&(Qt=null),Au(n.stateNode),Ie(e,le()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if($a)throw $a=!1,e=jo,jo=null,e;return Aa&1&&e.tag!==0&&Dn(),o=e.pendingLanes,o&1?e===ko?hr++:(hr=0,ko=e):hr=0,Zt(),null}function Dn(){if(Ft!==null){var e=yc(Aa),t=Xe.transition,n=Q;try{if(Xe.transition=null,Q=16>e?16:e,Ft===null)var r=!1;else{if(e=Ft,Ft=null,Aa=0,B&6)throw Error(C(331));var i=B;for(B|=4,D=e.current;D!==null;){var o=D,l=o.child;if(D.flags&16){var s=o.deletions;if(s!==null){for(var c=0;c<s.length;c++){var p=s[c];for(D=p;D!==null;){var g=D;switch(g.tag){case 0:case 11:case 15:fr(8,g,o)}var u=g.child;if(u!==null)u.return=g,D=u;else for(;D!==null;){g=D;var h=g.sibling,b=g.return;if(Ld(g),g===p){D=null;break}if(h!==null){h.return=b,D=h;break}D=b}}}var w=o.alternate;if(w!==null){var y=w.child;if(y!==null){w.child=null;do{var E=y.sibling;y.sibling=null,y=E}while(y!==null)}}D=o}}if(o.subtreeFlags&2064&&l!==null)l.return=o,D=l;else e:for(;D!==null;){if(o=D,o.flags&2048)switch(o.tag){case 0:case 11:case 15:fr(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,D=m;break e}D=o.return}}var d=e.current;for(D=d;D!==null;){l=D;var f=l.child;if(l.subtreeFlags&2064&&f!==null)f.return=l,D=f;else e:for(l=d;D!==null;){if(s=D,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ja(9,s)}}catch(j){oe(s,s.return,j)}if(s===l){D=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,D=x;break e}D=s.return}}if(B=i,Zt(),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(Va,e)}catch{}r=!0}return r}finally{Q=n,Xe.transition=t}}return!1}function Ls(e,t,n){t=An(n,t),t=yd(e,t,1),e=Ht(e,t,1),t=Ee(),e!==null&&(Or(e,1,t),Ie(e,t))}function oe(e,t,n){if(e.tag===3)Ls(e,e,n);else for(;t!==null;){if(t.tag===3){Ls(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Qt===null||!Qt.has(r))){e=An(n,e),e=bd(t,e,1),t=Ht(t,e,1),e=Ee(),t!==null&&(Or(t,1,e),Ie(t,e));break}}t=t.return}}function ff(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ee(),e.pingedLanes|=e.suspendedLanes&n,ge===e&&(be&n)===n&&(me===4||me===3&&(be&130023424)===be&&500>le()-pl?on(e,0):ul|=n),Ie(e,t)}function Fd(e,t){t===0&&(e.mode&1?(t=Kr,Kr<<=1,!(Kr&130023424)&&(Kr=4194304)):t=1);var n=Ee();e=Tt(e,t),e!==null&&(Or(e,t,n),Ie(e,n))}function mf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Fd(e,n)}function hf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(C(314))}r!==null&&r.delete(t),Fd(e,n)}var Ud;Ud=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Me.current)De=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return De=!1,tf(e,t,n);De=!!(e.flags&131072)}else De=!1,te&&t.flags&1048576&&Hc(t,La,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ma(e,t),e=t.pendingProps;var i=On(t,Ce.current);_n(t,n),i=il(null,t,r,e,i,n);var o=ol();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Oe(r)?(o=!0,Ea(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,el(t),i.updater=qa,t.stateNode=i,i._reactInternals=t,uo(t,r,e,n),t=mo(null,t,r,!0,o,n)):(t.tag=0,te&&o&&Yo(t),ze(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ma(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=xf(r),e=at(r,e),i){case 0:t=fo(null,t,r,e,n);break e;case 1:t=bs(null,t,r,e,n);break e;case 11:t=vs(null,t,r,e,n);break e;case 14:t=ys(null,t,r,at(r.type,e),n);break e}throw Error(C(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:at(r,i),fo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:at(r,i),bs(e,t,r,i,n);case 3:e:{if(Nd(t),e===null)throw Error(C(387));r=t.pendingProps,o=t.memoizedState,i=o.element,qc(e,t),Da(t,r,null,n);var l=t.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=An(Error(C(423)),t),t=ws(e,t,r,n,i);break e}else if(r!==i){i=An(Error(C(424)),t),t=ws(e,t,r,n,i);break e}else for(Fe=Vt(t.stateNode.containerInfo.firstChild),Ue=t,te=!0,ot=null,n=Gc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(In(),r===i){t=Lt(e,t,n);break e}ze(e,t,r,n)}t=t.child}return t;case 5:return Jc(t),e===null&&lo(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,l=i.children,no(r,i)?l=null:o!==null&&no(r,o)&&(t.flags|=32),kd(e,t),ze(e,t,l,n),t.child;case 6:return e===null&&lo(t),null;case 13:return Sd(e,t,n);case 4:return tl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Rn(t,null,r,n):ze(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:at(r,i),vs(e,t,r,i,n);case 7:return ze(e,t,t.pendingProps,n),t.child;case 8:return ze(e,t,t.pendingProps.children,n),t.child;case 12:return ze(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,l=i.value,J(Pa,r._currentValue),r._currentValue=l,o!==null)if(ct(o.value,l)){if(o.children===i.children&&!Me.current){t=Lt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){l=o.child;for(var c=s.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=Ct(-1,n&-n),c.tag=2;var p=o.updateQueue;if(p!==null){p=p.shared;var g=p.pending;g===null?c.next=c:(c.next=g.next,g.next=c),p.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),so(o.return,n,t),s.lanes|=n;break}c=c.next}}else if(o.tag===10)l=o.type===t.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(C(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),so(l,n,t),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===t){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}ze(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,_n(t,n),i=qe(i),r=r(i),t.flags|=1,ze(e,t,r,n),t.child;case 14:return r=t.type,i=at(r,t.pendingProps),i=at(r.type,i),ys(e,t,r,i,n);case 15:return wd(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:at(r,i),ma(e,t),t.tag=1,Oe(r)?(e=!0,Ea(t)):e=!1,_n(t,n),vd(t,r,i),uo(t,r,i,n),mo(null,t,r,!0,e,n);case 19:return Cd(e,t,n);case 22:return jd(e,t,n)}throw Error(C(156,t.tag))};function Bd(e,t){return hc(e,t)}function gf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ge(e,t,n,r){return new gf(e,t,n,r)}function gl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xf(e){if(typeof e=="function")return gl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Oo)return 11;if(e===Io)return 14}return 2}function Kt(e,t){var n=e.alternate;return n===null?(n=Ge(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function xa(e,t,n,r,i,o){var l=2;if(r=e,typeof e=="function")gl(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case xn:return ln(n.children,i,o,t);case Mo:l=8,i|=8;break;case Mi:return e=Ge(12,n,t,i|2),e.elementType=Mi,e.lanes=o,e;case Oi:return e=Ge(13,n,t,i),e.elementType=Oi,e.lanes=o,e;case Ii:return e=Ge(19,n,t,i),e.elementType=Ii,e.lanes=o,e;case Js:return ei(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Xs:l=10;break e;case qs:l=9;break e;case Oo:l=11;break e;case Io:l=14;break e;case Ot:l=16,r=null;break e}throw Error(C(130,e==null?e:typeof e,""))}return t=Ge(l,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function ln(e,t,n,r){return e=Ge(7,e,r,t),e.lanes=n,e}function ei(e,t,n,r){return e=Ge(22,e,r,t),e.elementType=Js,e.lanes=n,e.stateNode={isHidden:!1},e}function Pi(e,t,n){return e=Ge(6,e,null,t),e.lanes=n,e}function _i(e,t,n){return t=Ge(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function vf(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pi(0),this.expirationTimes=pi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function xl(e,t,n,r,i,o,l,s,c){return e=new vf(e,t,n,s,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ge(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},el(o),e}function yf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Wd(e){if(!e)return Xt;e=e._reactInternals;e:{if(mn(e)!==e||e.tag!==1)throw Error(C(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Oe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(C(171))}if(e.tag===1){var n=e.type;if(Oe(n))return Wc(e,n,t)}return t}function Vd(e,t,n,r,i,o,l,s,c){return e=xl(n,r,!0,e,i,o,l,s,c),e.context=Wd(null),n=e.current,r=Ee(),i=Yt(n),o=Ct(r,i),o.callback=t??null,Ht(n,o,i),e.current.lanes=i,Or(e,i,r),Ie(e,r),e}function ti(e,t,n,r){var i=t.current,o=Ee(),l=Yt(i);return n=Wd(n),t.context===null?t.context=n:t.pendingContext=n,t=Ct(o,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Ht(i,t,l),e!==null&&(st(e,i,l,o),ua(e,i,l)),l}function Ua(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ps(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function vl(e,t){Ps(e,t),(e=e.alternate)&&Ps(e,t)}function bf(){return null}var Hd=typeof reportError=="function"?reportError:function(e){console.error(e)};function yl(e){this._internalRoot=e}ni.prototype.render=yl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(C(409));ti(e,t,null,null)};ni.prototype.unmount=yl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pn(function(){ti(null,e,null,null)}),t[Et]=null}};function ni(e){this._internalRoot=e}ni.prototype.unstable_scheduleHydration=function(e){if(e){var t=jc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rt.length&&t!==0&&t<Rt[n].priority;n++);Rt.splice(n,0,e),n===0&&Nc(e)}};function bl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ri(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _s(){}function wf(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var p=Ua(l);o.call(p)}}var l=Vd(t,r,e,0,null,!1,!1,"",_s);return e._reactRootContainer=l,e[Et]=l.current,Sr(e.nodeType===8?e.parentNode:e),pn(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var p=Ua(c);s.call(p)}}var c=xl(e,0,!1,null,null,!1,!1,"",_s);return e._reactRootContainer=c,e[Et]=c.current,Sr(e.nodeType===8?e.parentNode:e),pn(function(){ti(t,c,n,r)}),c}function ai(e,t,n,r,i){var o=n._reactRootContainer;if(o){var l=o;if(typeof i=="function"){var s=i;i=function(){var c=Ua(l);s.call(c)}}ti(t,l,e,i)}else l=wf(n,t,e,i,r);return Ua(l)}bc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ir(t.pendingLanes);n!==0&&(Ao(t,n|1),Ie(t,le()),!(B&6)&&(Fn=le()+500,Zt()))}break;case 13:pn(function(){var r=Tt(e,1);if(r!==null){var i=Ee();st(r,e,1,i)}}),vl(e,1)}};Fo=function(e){if(e.tag===13){var t=Tt(e,134217728);if(t!==null){var n=Ee();st(t,e,134217728,n)}vl(e,134217728)}};wc=function(e){if(e.tag===13){var t=Yt(e),n=Tt(e,t);if(n!==null){var r=Ee();st(n,e,t,r)}vl(e,t)}};jc=function(){return Q};kc=function(e,t){var n=Q;try{return Q=e,t()}finally{Q=n}};Qi=function(e,t,n){switch(t){case"input":if(Ai(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Ka(r);if(!i)throw Error(C(90));ec(r),Ai(r,i)}}}break;case"textarea":nc(e,n);break;case"select":t=n.value,t!=null&&En(e,!!n.multiple,t,!1)}};cc=fl;dc=pn;var jf={usingClientEntryPoint:!1,Events:[Rr,wn,Ka,lc,sc,fl]},nr={findFiberByHostInstance:nn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},kf={bundleType:nr.bundleType,version:nr.version,rendererPackageName:nr.rendererPackageName,rendererConfig:nr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Pt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fc(e),e===null?null:e.stateNode},findFiberByHostInstance:nr.findFiberByHostInstance||bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ia=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ia.isDisabled&&ia.supportsFiber)try{Va=ia.inject(kf),gt=ia}catch{}}We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jf;We.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bl(t))throw Error(C(200));return yf(e,t,null,n)};We.createRoot=function(e,t){if(!bl(e))throw Error(C(299));var n=!1,r="",i=Hd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=xl(e,1,!1,null,null,n,!1,r,i),e[Et]=t.current,Sr(e.nodeType===8?e.parentNode:e),new yl(t)};We.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(C(188)):(e=Object.keys(e).join(","),Error(C(268,e)));return e=fc(t),e=e===null?null:e.stateNode,e};We.flushSync=function(e){return pn(e)};We.hydrate=function(e,t,n){if(!ri(t))throw Error(C(200));return ai(null,e,t,!0,n)};We.hydrateRoot=function(e,t,n){if(!bl(e))throw Error(C(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",l=Hd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Vd(t,null,e,1,n??null,i,!1,o,l),e[Et]=t.current,Sr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new ni(t)};We.render=function(e,t,n){if(!ri(t))throw Error(C(200));return ai(null,e,t,!1,n)};We.unmountComponentAtNode=function(e){if(!ri(e))throw Error(C(40));return e._reactRootContainer?(pn(function(){ai(null,null,e,!1,function(){e._reactRootContainer=null,e[Et]=null})}),!0):!1};We.unstable_batchedUpdates=fl;We.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ri(n))throw Error(C(200));if(e==null||e._reactInternals===void 0)throw Error(C(38));return ai(e,t,n,!1,r)};We.version="18.3.1-next-f1338f8080-20240426";function Qd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qd)}catch(e){console.error(e)}}Qd(),Qs.exports=We;var Nf=Qs.exports,Yd,Ds=Nf;Yd=Ds.createRoot,Ds.hydrateRoot;function Sf({currentTab:e,onTabChange:t,showWatchlist:n,showMemories:r,billboardAlertCount:i=0}){return a.jsxs("div",{className:"bottom-tab-bar",children:[a.jsxs("div",{className:`tab-item ${e==="billboard"?"active":""}`,onClick:()=>t("billboard"),children:[a.jsxs("div",{className:"tab-icon",style:{position:"relative"},children:[a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="billboard"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"2.18",ry:"2.18"}),a.jsx("line",{x1:"7",y1:"2",x2:"7",y2:"22"}),a.jsx("line",{x1:"17",y1:"2",x2:"17",y2:"22"}),a.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),a.jsx("line",{x1:"2",y1:"7",x2:"7",y2:"7"}),a.jsx("line",{x1:"2",y1:"17",x2:"7",y2:"17"}),a.jsx("line",{x1:"17",y1:"17",x2:"22",y2:"17"}),a.jsx("line",{x1:"17",y1:"7",x2:"22",y2:"7"})]}),i>0&&a.jsx("span",{className:"tab-alert-badge",title:`${i} película(s) de tu Watchlist en cartelera`,children:i})]}),a.jsx("span",{className:"tab-label",children:"Cartelera"})]}),a.jsxs("div",{className:`tab-item ${e==="upcoming"?"active":""}`,onClick:()=>t("upcoming"),children:[a.jsx("div",{className:"tab-icon",children:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="upcoming"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"2.18",ry:"2.18"}),a.jsx("path",{d:"M12 18h.01"})]})}),a.jsx("span",{className:"tab-label",children:"Estrenos"})]}),n&&a.jsxs("div",{className:`tab-item ${e==="watchlist"?"active":""}`,onClick:()=>t("watchlist"),children:[a.jsx("div",{className:"tab-icon",children:a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="watchlist"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})})}),a.jsx("span",{className:"tab-label",children:"Watchlist"})]}),a.jsxs("div",{className:`tab-item ${e==="social"?"active":""}`,onClick:()=>t("social"),children:[a.jsx("div",{className:"tab-icon",children:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="social"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),a.jsx("circle",{cx:"9",cy:"7",r:"4"}),a.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),a.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}),a.jsx("span",{className:"tab-label",children:"Comunidad"})]}),a.jsxs("div",{className:`tab-item ${e==="stats"?"active":""}`,onClick:()=>t("stats"),children:[a.jsx("div",{className:"tab-icon",children:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="stats"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"10"}),a.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),a.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"14"})]})}),a.jsx("span",{className:"tab-label",children:"Stats"})]}),a.jsxs("div",{className:`tab-item ${e==="my-ratings"?"active":""}`,onClick:()=>t("my-ratings"),children:[a.jsx("div",{className:"tab-icon",children:a.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="my-ratings"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})})}),a.jsx("span",{className:"tab-label",children:"Mi Club"})]}),r&&a.jsxs("div",{className:`tab-item ${e==="memories"?"active":""}`,onClick:()=>t("memories"),children:[a.jsx("div",{className:"tab-icon",children:a.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e==="memories"?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}),a.jsx("circle",{cx:"12",cy:"13",r:"4"})]})}),a.jsx("span",{className:"tab-label",children:"Recuerdos"})]}),a.jsx("style",{jsx:"true",children:`
        .bottom-tab-bar {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          height: 66px;
          background: rgba(13, 17, 28, 0.82);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 42, 95, 0.18);
          border-radius: 24px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 42, 95, 0.05);
          z-index: 200;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* En móvil real: baja la barra para respetar el home indicator de iPhone */
        @media (max-width: 599px) {
          .bottom-tab-bar {
            bottom: max(12px, env(safe-area-inset-bottom, 12px));
          }
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          padding-top: 4px;
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
        }

        .tab-icon {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tab-label {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3px;
          opacity: 0.8;
          transition: all 0.2s ease;
        }

        .tab-item.active {
          color: var(--accent-rose);
        }

        .tab-item.active .tab-icon {
          transform: translateY(-4px) scale(1.15);
          color: var(--accent-rose);
          filter: drop-shadow(0 0 8px rgba(255, 42, 95, 0.6));
        }

        .tab-item.active .tab-label {
          font-weight: 800;
          color: var(--text-primary);
          opacity: 1;
          transform: scale(1.05);
        }

        /* Glowing indicator dot under active tab */
        .tab-item.active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background: var(--accent-rose);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-rose), 0 0 20px var(--accent-rose);
        }

        /* Badge de alerta de estreno */
        .tab-alert-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-gold) 100%);
          color: #fff;
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 900;
          min-width: 15px;
          height: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2px;
          border: 1.5px solid var(--bg-darker);
          box-shadow: 0 0 8px var(--accent-rose);
          animation: badgePulse 2s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(255, 42, 95, 0.7); }
          50% { transform: scale(1.15); box-shadow: 0 0 16px rgba(255, 42, 95, 0.9), 0 0 4px rgba(251, 191, 36, 0.6); }
        }
      `})]})}function Ba({rating:e,onChange:t,interactive:n=!1,size:r=18}){const[i,o]=k.useState(0),l=g=>{n&&t&&t(g)},s=g=>{n&&o(g)},c=()=>{n&&o(0)},p=i||e;return a.jsxs("div",{className:`stars-container ${n?"interactive":""}`,onMouseLeave:c,children:[[1,2,3,4,5].map(g=>a.jsx("span",{className:`star-icon ${g<=p?"active":""} ${g<=i?"hovered":""}`,style:{fontSize:`${r}px`},onClick:()=>l(g),onMouseEnter:()=>s(g),children:"★"},g)),a.jsx("style",{jsx:"true",children:`
        .stars-container {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .star-icon {
          color: rgba(255, 255, 255, 0.15);
          user-select: none;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .stars-container.interactive .star-icon {
          cursor: pointer;
        }

        .star-icon.active {
          color: var(--accent-gold);
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
        }

        .stars-container.interactive .star-icon:active {
          transform: scale(0.85);
        }

        .stars-container.interactive .star-icon.hovered {
          transform: scale(1.2);
          color: #fbbf24;
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.8);
        }
      `})]})}function Cf({movie:e,onClick:t}){const{title:n,poster:r,rating:i,runTime:o,ratingSummary:l}=e,{average:s,count:c}=l||{average:0,count:0};return a.jsxs("div",{className:"movie-card glass-card",onClick:t,children:[a.jsxs("div",{className:"poster-wrapper",children:[a.jsx("img",{src:r||"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=3540&auto=format&fit=crop",alt:n,className:"movie-poster",loading:"lazy"}),c>0?a.jsxs("div",{className:"score-badge",children:[a.jsx("span",{className:"star-symbol",children:"★"}),a.jsx("span",{className:"score-text",children:s})]}):a.jsx("div",{className:"score-badge unrated",children:a.jsx("span",{className:"score-text",children:"NUEVO"})}),a.jsxs("div",{className:"movie-overlay-tags",children:[a.jsx("span",{className:"overlay-tag classification",children:i}),a.jsx("span",{className:"overlay-tag runtime",children:o})]})]}),a.jsxs("div",{className:"card-info",children:[a.jsx("h3",{className:"movie-title",children:n}),a.jsx("div",{className:"card-bottom",children:c>0?a.jsxs("span",{className:"ratings-count",children:[c," ",c===1?"valoración":"valoraciones"]}):a.jsx("span",{className:"ratings-count unrated-text",children:"Sin valoraciones"})})]})]})}function zf({movies:e,onMovieClick:t,isLoading:n,billboardAlerts:r=[]}){const[i,o]=k.useState(""),[l,s]=k.useState("score"),[c,p]=k.useState("all"),[g,u]=k.useState(!1),h=new Set(r),b=k.useMemo(()=>{if(!e)return[];const y=new Set;return e.forEach(E=>{(E.showtimes||[]).forEach(m=>{y.add(m.cinemaName)})}),Array.from(y)},[e]),w=k.useMemo(()=>{if(!e)return[];let y=[...e];if(i.trim()){const E=i.toLowerCase();y=y.filter(m=>m.title.toLowerCase().includes(E)||m.originalTitle&&m.originalTitle.toLowerCase().includes(E)||m.director&&m.director.toLowerCase().includes(E)||m.actors&&m.actors.some(d=>d.toLowerCase().includes(E)))}return c!=="all"&&(y=y.filter(E=>(E.showtimes||[]).some(m=>m.cinemaName===c))),y.sort((E,m)=>{var d,f,x,j;if(l==="score"){const z=((d=E.ratingSummary)==null?void 0:d.average)||0,N=((f=m.ratingSummary)==null?void 0:f.average)||0;return z===N?(((x=m.ratingSummary)==null?void 0:x.count)||0)-(((j=E.ratingSummary)==null?void 0:j.count)||0):N-z}if(l==="runtime"){const z=parseInt(E.runTime)||0;return(parseInt(m.runTime)||0)-z}return l==="alpha"?E.title.localeCompare(m.title):0}),y},[e,i,l,c]);return a.jsxs("div",{className:"billboard-tab-container",children:[a.jsxs("div",{className:"search-filters-panel glass-card",children:[a.jsxs("div",{className:"search-input-wrap",children:[a.jsxs("svg",{className:"search-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),a.jsx("input",{type:"text",className:"search-field",placeholder:"Buscar por película, director o reparto...",value:i,onChange:y=>o(y.target.value)}),i&&a.jsx("button",{className:"clear-btn",onClick:()=>o(""),children:"×"})]}),b.length>0&&a.jsxs("div",{className:"cinema-chips-row horizontal-scroll",children:[a.jsx("button",{type:"button",className:`cinema-chip-btn ${c==="all"?"active":""}`,onClick:()=>p("all"),children:"📍 Todos"}),b.map(y=>a.jsx("button",{type:"button",className:`cinema-chip-btn ${c===y?"active":""}`,onClick:()=>p(y),children:y.replace("Cinépolis ","").replace(" Premium Class","").replace(" Premium","")},y))]}),a.jsx("div",{className:"filters-row",children:a.jsxs("div",{className:"filter-select-wrap full-width",children:[a.jsx("span",{className:"select-icon",children:"⚡"}),a.jsxs("select",{className:"filter-select",value:l,onChange:y=>s(y.target.value),children:[a.jsx("option",{value:"score",children:"Mejor Calificadas"}),a.jsx("option",{value:"runtime",children:"Mayor Duración"}),a.jsx("option",{value:"alpha",children:"Nombre A-Z"})]})]})})]}),r.length>0&&!g&&a.jsxs("div",{className:"alert-banner glass-card",children:[a.jsxs("div",{className:"alert-banner-content",children:[a.jsx("span",{className:"alert-icon",children:"🔔"}),a.jsxs("div",{className:"alert-text",children:[a.jsx("span",{className:"alert-title",children:r.length===1?"¡Una película de tu Watchlist está en cartelera!":`¡${r.length} películas de tu Watchlist están en cartelera!`}),a.jsxs("span",{className:"alert-sub",children:["Desplázate para verla",r.length>1?"s":""," destacada",r.length>1?"s":""," ✨"]})]})]}),a.jsx("button",{className:"alert-dismiss",onClick:()=>u(!0),children:"✕"})]}),a.jsx("div",{className:"movies-grid-scroll-area",children:n?a.jsx("div",{className:"movies-grid",children:[1,2,4,5,6].map(y=>a.jsxs("div",{className:"skeleton-card glass-card",children:[a.jsx("div",{className:"skeleton skeleton-poster"}),a.jsx("div",{className:"skeleton skeleton-title"}),a.jsx("div",{className:"skeleton skeleton-meta"})]},y))}):w.length>0?a.jsx("div",{className:"movies-grid",children:w.map(y=>a.jsxs("div",{style:{position:"relative"},children:[h.has(y.key)&&a.jsx("div",{className:"movie-alert-badge",children:a.jsx("span",{children:"❤️ En tu Watchlist"})}),a.jsx(Cf,{movie:y,onClick:()=>t(y)})]},y.key))}):a.jsxs("div",{className:"empty-movies-container glass-card",children:[a.jsx("span",{className:"empty-emoji",children:"🎬"}),a.jsx("h3",{children:"No se encontraron películas"}),a.jsx("p",{children:"Prueba ajustando los filtros o el término de búsqueda."}),a.jsx("button",{className:"btn-glow btn-glow-cyan reset-filters-btn",onClick:()=>{o(""),s("score")},children:"Limpiar Filtros"})]})})]})}const Ef=Lo.memo(zf),se="";function Tf({movies:e}){const[t,n]=k.useState(null),[r,i]=k.useState(!0),o=async()=>{try{const u=await fetch(`${se}/api/stats`);if(u.ok){const h=await u.json();n(h)}}catch(u){console.error("Error fetching stats:",u)}finally{i(!1)}};if(k.useEffect(()=>{o()},[e]),r)return a.jsxs("div",{className:"stats-loading-pane animate-scale-in",children:[[1,2,3].map(u=>a.jsx("div",{className:"skeleton skeleton-stats-card"},u)),a.jsx("style",{jsx:"true",children:`
          .stats-loading-pane {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .skeleton-stats-card {
            height: 100px;
            border-radius: 16px;
          }
        `})]});if(!t)return a.jsx("div",{className:"empty-stats",children:"No se pudieron cargar estadísticas."});const{totalRatings:l,averageRating:s,globalStars:c,bestMovie:p,totalMovies:g}=t;return a.jsxs("div",{className:"stats-tab-container animate-scale-in",children:[a.jsx("h3",{className:"stats-section-title",children:"Análisis de Cartelera"}),a.jsxs("div",{className:"stats-grid",children:[a.jsxs("div",{className:"stat-card glass-card",children:[a.jsx("span",{className:"stat-icon-emoji",children:"🍿"}),a.jsx("div",{className:"stat-value",children:g}),a.jsx("div",{className:"stat-label",children:"Películas"})]}),a.jsxs("div",{className:"stat-card glass-card",children:[a.jsx("span",{className:"stat-icon-emoji",children:"⭐"}),a.jsx("div",{className:"stat-value",children:l>0?s:"—"}),a.jsx("div",{className:"stat-label",children:"Puntaje Medio"})]}),a.jsxs("div",{className:"stat-card glass-card",children:[a.jsx("span",{className:"stat-icon-emoji",children:"✍️"}),a.jsx("div",{className:"stat-value",children:l}),a.jsx("div",{className:"stat-label",children:"Reseñas"})]})]}),a.jsx("div",{className:"stats-highlights-list",children:p?a.jsxs("div",{className:"highlight-row-card glass-card gold-border",children:[a.jsx("div",{className:"highlight-visual gold",children:"🏆"}),a.jsxs("div",{className:"highlight-content",children:[a.jsx("span",{className:"highlight-category gold",children:"Mejor Valorada por Usuarios"}),a.jsx("h4",{className:"highlight-title",children:p.title}),a.jsxs("div",{className:"highlight-movie-score",children:[a.jsx("span",{className:"gold-star",children:"★"}),a.jsx("strong",{children:p.average}),a.jsxs("span",{className:"votes-count",children:["(",p.count," ",p.count===1?"opinión":"opiniones",")"]})]})]})]}):a.jsxs("div",{className:"highlight-row-card glass-card",children:[a.jsx("div",{className:"highlight-visual",children:"🏆"}),a.jsxs("div",{className:"highlight-content",children:[a.jsx("span",{className:"highlight-category",children:"Mejor Valorada"}),a.jsx("h4",{className:"highlight-title",children:"Aún sin calificaciones"}),a.jsx("p",{className:"highlight-desc",children:"¡Sé el primero en calificar una película para verla coronada aquí!"})]})]})}),l>0&&a.jsxs("div",{className:"stars-distribution-card glass-card",children:[a.jsx("h4",{className:"card-inner-title",children:"Distribución de Calificaciones"}),a.jsx("div",{className:"dist-list",children:[5,4,3,2,1].map(u=>{const h=c[u]||0,b=l>0?h/l*100:0;return a.jsxs("div",{className:"dist-row",children:[a.jsxs("span",{className:"dist-stars-label",children:[u," ★"]}),a.jsx("div",{className:"dist-bar-bg",children:a.jsx("div",{className:"dist-bar-fill",style:{width:`${b}%`}})}),a.jsx("span",{className:"dist-count-label",children:h})]},u)})})]}),a.jsx("style",{jsx:"true",children:`
        .stats-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 30px;
        }

        .stats-section-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
          border-color: rgba(255, 255, 255, 0.02);
          background: rgba(18, 22, 38, 0.35);
        }

        .stat-icon-emoji {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        .stats-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlight-row-card {
          display: flex;
          gap: 16px;
          align-items: center;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(14, 16, 28, 0.45);
          padding: 14px;
        }

        .highlight-row-card.gold-border {
          border-color: rgba(251, 191, 36, 0.35);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.08);
          background: linear-gradient(135deg, rgba(25, 20, 10, 0.5) 0%, rgba(14, 16, 28, 0.5) 100%);
        }

        .highlight-visual {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .highlight-visual.gold {
          background: rgba(251, 191, 36, 0.08);
          border-color: rgba(251, 191, 36, 0.3);
        }

        .highlight-content {
          flex: 1;
        }

        .highlight-category {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 2px;
        }

        .highlight-category.gold {
          color: var(--accent-gold);
        }

        .highlight-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .highlight-desc {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .highlight-movie-score {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .gold-star {
          color: var(--accent-gold);
          font-size: 14px;
        }

        .votes-count {
          font-size: 10px;
          color: var(--text-secondary);
        }

        /* Stars Distribution section */
        .stars-distribution-card {
          border-color: rgba(255, 255, 255, 0.03);
          padding: 14px;
        }

        .card-inner-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .dist-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dist-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dist-stars-label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          width: 24px;
          text-align: right;
        }

        .dist-bar-bg {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .dist-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          transition: width 0.8s ease-in-out;
        }

        .dist-count-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          width: 14px;
        }

        .empty-stats {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          padding: 40px 0;
        }
      `})]})}function Lf({activeProfile:e,movies:t=[],prefilledData:n=null,onClearPrefilledData:r}){const[i,o]=k.useState([]),[l,s]=k.useState(!0),[c,p]=k.useState(!1),[g,u]=k.useState(""),[h,b]=k.useState(""),[w,y]=k.useState(""),[E,m]=k.useState(""),[d,f]=k.useState(""),[x,j]=k.useState(""),[z,N]=k.useState(""),[P,Y]=k.useState(!1),[O,ue]=k.useState(new Date),[pe,Re]=k.useState(null),[_,H]=k.useState([]),vt=L=>{_.includes(L)?H(_.filter(ie=>ie!==L)):H([..._,L])},Ze=async()=>{s(!0);try{const L=await fetch(`${se}/api/appointments`);if(L.ok){const ie=await L.json();o(ie)}}catch(L){console.error("Error cargando citas:",L)}finally{s(!1)}};k.useEffect(()=>{Ze()},[]),k.useEffect(()=>{n&&(u(n.title||""),n.movieKey?b(n.movieKey):(b("custom"),y(n.movieTitle||"")),N(n.notes||""),p(!0),r&&r())},[n]);const T=async L=>{if(L.preventDefault(),!g||!E){alert("Por favor completa los campos obligatorios: Plan y Fecha.");return}Y(!0);let ie="";if(h==="custom")ie=w;else if(h){const dt=t.find(bt=>bt.key===h);ie=dt?dt.title:""}try{if((await fetch(`${se}/api/appointments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.id,title:g,movieTitle:ie,movieKey:h!=="custom"?h:"",date:E,cinemaName:null,menuOption:x,notes:z})})).ok){try{const bt=e.id==="user_palomero"?"user_cinefilo":"user_palomero";await fetch(`${se}/api/notifications`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:bt,senderId:e.id,senderName:e.name,senderAvatar:e.avatar,type:"appointment_created",title:"📅 Nueva Cita Agendada",message:`ha agendado una cita: "${g}" para el ${new Date(E+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short"})} (Fecha Tentativa) 🍿`})})}catch(bt){console.error("Error enviando notificación de cita:",bt)}u(""),b(""),y(""),m(""),f(""),j(""),N(""),p(!1),await Ze()}else alert("Error al agendar la cita.")}catch(dt){console.error("Error guardando cita:",dt)}finally{Y(!1)}},M=new Date;M.setHours(0,0,0,0);const R=i.filter(L=>new Date(L.date+"T12:00:00")>=M),K=i.filter(L=>new Date(L.date+"T12:00:00")<M).reverse(),q=pe?R.filter(L=>L.date===pe):R,He=pe?K.filter(L=>L.date===pe):K,Pe=()=>{ue(new Date(O.getFullYear(),O.getMonth()-1,1))},yt=()=>{ue(new Date(O.getFullYear(),O.getMonth()+1,1))},et=(L,ie)=>new Date(L,ie+1,0).getDate(),tt=(L,ie)=>new Date(L,ie,1).getDay(),ii=()=>{const L=O.getFullYear(),ie=O.getMonth(),dt=et(L,ie),bt=tt(L,ie),Vn=[];for(let $e=0;$e<bt;$e++)Vn.push(a.jsx("div",{className:"calendar-day-cell empty"},`empty-${$e}`));for(let $e=1;$e<=dt;$e++){const Hn=`${L}-${String(ie+1).padStart(2,"0")}-${String($e).padStart(2,"0")}`,Qn=i.filter(Kn=>Kn.date===Hn),wt=Qn.length>0,_t=new Date().toDateString()===new Date(L,ie,$e).toDateString(),Yn=pe===Hn;Vn.push(a.jsxs("div",{className:`calendar-day-cell ${wt?"has-appointment":""} ${_t?"is-today":""} ${Yn?"is-selected":""}`,onClick:()=>Re(Yn?null:Hn),children:[a.jsx("span",{className:"day-number",children:$e}),wt&&a.jsx("div",{className:"apt-indicators",children:Qn.map((Kn,Ar)=>a.jsx("span",{className:"apt-dot",title:Kn.title},Ar))})]},`day-${$e}`))}return Vn},Qe=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];return a.jsxs("div",{className:"appointments-tab animate-fade-in",children:[a.jsxs("div",{className:"tab-header-card glass-card",children:[a.jsx("h3",{className:"tab-header-title",children:"📅 Agenda de Citas Vip"}),a.jsx("p",{className:"tab-header-desc",children:"Planifiquen sus próximas citas al cine, elijan qué comer, dónde verse, y mantengan viva la chispa cinéfila."})]}),!c&&a.jsx("button",{className:"btn-add-apt animate-scale-in",onClick:()=>p(!0),children:a.jsx("span",{children:"➕ Programar Cita de Pareja"})}),c&&a.jsxs("form",{onSubmit:T,className:"appointment-form glass-card animate-scale-in",children:[a.jsxs("div",{className:"form-header",children:[a.jsx("h4",{children:"✨ Nueva Cita Cinéfila"}),a.jsx("button",{type:"button",className:"btn-close-form",onClick:()=>p(!1),children:"Cancelar"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Nombre del Plan *"}),a.jsx("input",{type:"text",placeholder:"Ej: Noche de Terror Extremo 🍿, Cita Especial Aniversario",value:g,onChange:L=>u(L.target.value),required:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Película"}),a.jsxs("select",{value:h,onChange:L=>b(L.target.value),children:[a.jsx("option",{value:"",children:"-- Selecciona una película (opcional) --"}),t.map(L=>a.jsx("option",{value:L.key,children:L.title},L.key)),a.jsx("option",{value:"custom",children:"-- Escribir película personalizada --"})]})]}),h==="custom"&&a.jsxs("div",{className:"form-group animate-slide-up",children:[a.jsx("label",{children:"Título de la Película Personalizada"}),a.jsx("input",{type:"text",placeholder:"Ej: Star Wars, El Padrino...",value:w,onChange:L=>y(L.target.value)})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Fecha Tentativa *"}),a.jsx("input",{type:"date",value:E,onChange:L=>m(L.target.value),onClick:L=>L.target.showPicker&&L.target.showPicker(),required:!0,style:{cursor:"pointer"}})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Sugerencia para comer / Snacks"}),a.jsx("input",{type:"text",placeholder:"Ej: Cabritas mixtas grandes + bebidas o sushi antes 🍣",value:x,onChange:L=>j(L.target.value)})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{children:"Notas especiales o Sorpresas"}),a.jsx("textarea",{placeholder:"Escribe detalles adicionales de la cita aquí...",value:z,onChange:L=>N(L.target.value),rows:"3"})]}),a.jsx("button",{type:"submit",className:"btn-submit-apt",disabled:P,children:P?"Guardando plan...":"✨ Confirmar Cita en Pareja"})]}),l?a.jsxs("div",{className:"apts-loading",children:[a.jsx("span",{className:"spinner-icon",children:"📅"}),a.jsx("p",{children:"Cargando agenda de citas..."})]}):a.jsxs("div",{className:"appointments-list-zone",children:[a.jsxs("div",{className:"calendar-container glass-card animate-scale-in",children:[a.jsxs("div",{className:"calendar-header",children:[a.jsx("button",{type:"button",className:"calendar-nav-btn",onClick:Pe,children:"◀"}),a.jsxs("span",{className:"calendar-month-title",children:[Qe[O.getMonth()]," ",O.getFullYear()]}),a.jsx("button",{type:"button",className:"calendar-nav-btn",onClick:yt,children:"▶"})]}),a.jsxs("div",{className:"calendar-grid-header",children:[a.jsx("div",{children:"Do"}),a.jsx("div",{children:"Lu"}),a.jsx("div",{children:"Ma"}),a.jsx("div",{children:"Mi"}),a.jsx("div",{children:"Ju"}),a.jsx("div",{children:"Vi"}),a.jsx("div",{children:"Sá"})]}),a.jsx("div",{className:"calendar-grid-body",children:ii()})]}),pe&&a.jsxs("div",{className:"calendar-filter-badge glass-card animate-scale-in",children:[a.jsxs("span",{className:"filter-text",children:["📅 Citas para el ",a.jsx("strong",{children:new Date(pe+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})})]}),a.jsx("button",{type:"button",className:"btn-clear-filter",onClick:()=>Re(null),children:"Ver todas ✕"})]}),a.jsxs("div",{className:"apts-section",children:[a.jsxs("h4",{className:"section-title",children:["✨ Próximas Citas (",q.length,")"]}),q.length>0?a.jsx("div",{className:"tickets-container",children:q.map(L=>{const ie=_.includes(L.id);return a.jsxs("div",{className:"ticket-vip glass-card animate-scale-in",children:[a.jsx("div",{className:"ticket-notch left"}),a.jsx("div",{className:"ticket-notch right"}),a.jsxs("div",{className:"ticket-main",children:[a.jsxs("div",{className:"ticket-header",children:[a.jsx("span",{className:"ticket-tag",children:"TICKET VIP CITA"}),a.jsx("button",{type:"button",className:"btn-toggle-expand",onClick:()=>vt(L.id),title:ie?"Contraer info":"Ampliar info",children:ie?"▲ Contraer":"▼ Ampliar"})]}),a.jsx("h3",{className:"ticket-title",children:L.title}),L.movieTitle&&a.jsxs("p",{className:"ticket-movie",children:["🎬 Película: ",a.jsx("span",{children:L.movieTitle})]}),ie&&a.jsxs("div",{className:"ticket-expanded-content animate-slide-down",children:[a.jsxs("div",{className:"ticket-details-grid",children:[a.jsxs("div",{className:"ticket-detail",children:[a.jsx("span",{className:"label",children:"📅 Fecha tentativa"}),a.jsx("span",{className:"value",children:new Date(L.date+"T12:00:00").toLocaleDateString("es-CL",{weekday:"short",day:"numeric",month:"short"})})]}),L.menuOption&&a.jsxs("div",{className:"ticket-detail full-width",children:[a.jsx("span",{className:"label",children:"🍿 Sugerencia para comer"}),a.jsx("span",{className:"value",children:L.menuOption})]}),L.notes&&a.jsxs("div",{className:"ticket-detail full-width notes",children:[a.jsx("span",{className:"label",children:"💡 Notas"}),a.jsxs("span",{className:"value italic",children:['"',L.notes,'"']})]})]}),a.jsx("div",{className:"ticket-barcode-sim"})]})]})]},L.id)})}):a.jsxs("div",{className:"empty-apts glass-card animate-scale-in",children:[a.jsx("span",{className:"empty-icon",children:"🍿"}),a.jsx("h4",{children:"Sin citas en esta vista"}),a.jsx("p",{children:"No hay planes programados. ¡Agreguen uno nuevo presionando el botón superior!"})]})]}),He.length>0&&a.jsxs("div",{className:"apts-section past",children:[a.jsxs("h4",{className:"section-title",children:["📂 Citas Vividas (",He.length,")"]}),a.jsx("div",{className:"past-list",children:He.map(L=>a.jsxs("div",{className:"past-item-card glass-card animate-scale-in",children:[a.jsxs("div",{className:"past-item-left",children:[a.jsx("span",{className:"past-emoji",children:"🎬"}),a.jsxs("div",{children:[a.jsx("h5",{className:"past-title",children:L.title}),L.movieTitle&&a.jsx("p",{className:"past-movie",children:L.movieTitle})]})]}),a.jsx("div",{className:"past-item-right",children:a.jsx("span",{className:"past-date",children:new Date(L.date+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})})})]},L.id))})]})]}),a.jsx("style",{jsx:"true",children:`
        .appointments-tab {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .tab-header-card {
          border-color: rgba(34, 211, 238, 0.2);
          background: rgba(34, 211, 238, 0.02);
          padding: 16px;
          border-radius: 20px;
        }

        .tab-header-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .tab-header-desc {
          font-family: var(--font-sans);
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .btn-add-apt {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          border: none;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          padding: 13px;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 42, 95, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .btn-add-apt:active {
          transform: scale(0.96);
          box-shadow: 0 2px 8px rgba(255, 42, 95, 0.2);
        }

        /* Formulario */
        .appointment-form {
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.65);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-radius: 22px;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 10px;
          margin-bottom: 6px;
        }

        .form-header h4 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-close-form {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-close-form:hover {
          color: #ef4444;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(4, 5, 9, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 11px;
          color: #fff;
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: all 0.3s;
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(100%) saturate(500%) hue-rotate(150deg);
          opacity: 0.8;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent-cyan);
          background: rgba(8, 10, 16, 0.85);
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.2);
        }

        .btn-submit-apt {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          color: #fff;
          border: none;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          padding: 13px;
          border-radius: 14px;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 15px rgba(255, 42, 95, 0.2);
        }

        .btn-submit-apt:active {
          transform: scale(0.97);
        }

        /* Lista de Citas */
        .apts-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px;
          color: var(--text-secondary);
        }

        .spinner-icon {
          font-size: 34px;
          animation: float 2s ease-in-out infinite;
          margin-bottom: 10px;
        }

        .appointments-list-zone {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .apts-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: 0.6px;
          border-left: 3px solid var(--accent-rose);
          padding-left: 8px;
          margin: 0;
        }

        /* Ticket de Cine VIP */
        .tickets-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ticket-vip {
          border: 1px dashed rgba(255, 42, 95, 0.25);
          background: rgba(13, 17, 28, 0.55);
          padding: 13px 14px;
          position: relative;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .ticket-vip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 42, 95, 0.03) 0%, rgba(34, 211, 238, 0.03) 100%);
          pointer-events: none;
        }

        /* Muescas troqueladas de ticket */
        .ticket-notch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 18px;
          background: var(--bg-deep);
          border: 1px dashed rgba(255, 42, 95, 0.2);
          z-index: 10;
          border-radius: 8px;
        }

        .ticket-notch.left {
          left: -6px;
          border-left: none;
          border-radius: 0 8px 8px 0;
        }

        .ticket-notch.right {
          right: -6px;
          border-right: none;
          border-radius: 8px 0 0 8px;
        }

        .ticket-main {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ticket-tag {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-rose);
          letter-spacing: 0.6px;
          border: 1px solid rgba(255, 42, 95, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 42, 95, 0.03);
        }

        .btn-toggle-expand {
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          color: var(--accent-cyan);
          padding: 3px 8px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 8px;
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          z-index: 5;
        }

        .btn-toggle-expand:hover {
          background: rgba(34, 211, 238, 0.15);
          border-color: var(--accent-cyan);
          color: #fff;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
        }

        .btn-toggle-expand:active {
          transform: scale(0.95);
        }

        .ticket-title {
          font-family: var(--font-display);
          font-size: 14.5px;
          font-weight: 800;
          color: #fff;
          margin: 2px 0 0;
          line-height: 1.25;
        }

        .ticket-movie {
          font-size: 10.5px;
          color: var(--text-secondary);
          margin: 0;
          font-family: var(--font-sans);
        }

        .ticket-movie span {
          color: #fff;
          font-weight: 700;
        }

        .ticket-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 8px;
          border-top: 1.5px dashed rgba(255, 42, 95, 0.15);
          padding-top: 8px;
        }

        .ticket-detail {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ticket-detail.full-width {
          grid-column: span 2;
        }

        .ticket-detail.notes {
          background: rgba(0, 0, 0, 0.25);
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
          margin-top: 2px;
        }

        .ticket-detail .label {
          font-family: var(--font-display);
          font-size: 7.5px;
          font-weight: 800;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ticket-detail .value {
          font-size: 11px;
          color: var(--text-primary);
          font-weight: 700;
        }

        .ticket-detail .value.italic {
          font-style: italic;
          font-weight: normal;
          color: var(--text-secondary);
        }

        /* simulated barcode in ticket */
        .ticket-barcode-sim {
          height: 12px;
          background: repeating-linear-gradient(90deg, 
            rgba(255, 255, 255, 0.12), 
            rgba(255, 255, 255, 0.12) 1.5px, 
            transparent 1.5px, 
            transparent 4px, 
            rgba(255, 255, 255, 0.12) 4px, 
            rgba(255, 255, 255, 0.12) 5px, 
            transparent 5px, 
            transparent 7px,
            rgba(255, 255, 255, 0.12) 7px,
            rgba(255, 255, 255, 0.12) 9px,
            transparent 9px,
            transparent 11px
          );
          opacity: 0.4;
          margin-top: 8px;
          border-radius: 2px;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }

        .empty-apts {
          text-align: center;
          padding: 30px 15px;
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.25);
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 28px;
          display: inline-block;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 6px rgba(255, 42, 95, 0.2));
        }

        .empty-apts h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .empty-apts p {
          font-size: 10.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        /* Pasadas */
        .apts-section.past {
          margin-top: 8px;
        }

        .past-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .past-item-card {
          background: rgba(13, 17, 28, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.02);
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          opacity: 0.55;
          border-radius: 12px;
        }

        .past-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .past-emoji {
          font-size: 16px;
        }

        .past-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .past-movie {
          font-size: 9.5px;
          color: var(--text-muted);
          margin: 0;
        }

        .past-date {
          font-size: 9.5px;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ESTILOS DEL CALENDARIO PREMIUM */
        .calendar-container {
          background: rgba(13, 17, 28, 0.65);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 20px;
          padding: 14px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 6px;
        }

        .calendar-month-title {
          font-family: var(--font-display);
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }

        .calendar-nav-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;
          font-size: 9px;
          transition: all 0.2s;
        }

        .calendar-nav-btn:hover {
          background: rgba(34, 211, 238, 0.1);
          border-color: var(--accent-cyan);
        }

        .calendar-grid-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-family: var(--font-display);
          font-size: 8.5px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .calendar-grid-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .calendar-day-cell:hover:not(.empty) {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .calendar-day-cell.empty {
          background: transparent;
          border: none;
          cursor: default;
        }

        .calendar-day-cell.is-today {
          border-color: var(--accent-rose);
          background: rgba(255, 42, 95, 0.06);
        }

        .calendar-day-cell.is-today .day-number {
          color: var(--accent-rose);
          font-weight: bold;
        }

        .calendar-day-cell.has-appointment {
          background: linear-gradient(145deg, rgba(34, 211, 238, 0.1) 0%, rgba(13, 17, 28, 0.3) 100%);
          border-color: rgba(34, 211, 238, 0.4);
          box-shadow: 0 0 6px rgba(34, 211, 238, 0.1);
        }

        .calendar-day-cell.has-appointment .day-number {
          color: var(--accent-cyan);
          font-weight: 800;
        }

        .calendar-day-cell.is-selected {
          border-color: var(--accent-cyan) !important;
          background: rgba(34, 211, 238, 0.18) !important;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.3) !important;
        }

        .day-number {
          font-size: 10px;
          font-family: var(--font-sans);
          color: var(--text-secondary);
        }

        .apt-indicators {
          display: flex;
          gap: 1.5px;
          position: absolute;
          bottom: 2px;
        }

        .apt-dot {
          width: 3px;
          height: 3px;
          background: var(--accent-rose);
          border-radius: 50%;
          box-shadow: 0 0 3px var(--accent-rose);
        }

        /* FILTRO ACTIVO */
        .calendar-filter-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 12px;
          border-color: rgba(34, 211, 238, 0.2);
          background: rgba(34, 211, 238, 0.03);
        }

        .calendar-filter-badge .filter-text {
          font-size: 10.5px;
          color: var(--text-secondary);
        }

        .calendar-filter-badge .filter-text strong {
          color: var(--accent-cyan);
        }

        .btn-clear-filter {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-size: 9px;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear-filter:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `})]})}function Pf({activeProfile:e,onScheduleWithIdea:t}){const[n,r]=k.useState([]),[i,o]=k.useState(!0),[l,s]=k.useState(null),[c,p]=k.useState("closed"),[g,u]=k.useState("active"),h=async()=>{o(!0);try{const x=await fetch(`${se}/api/envelopes?userId=${e.id}`);if(x.ok){const j=await x.json();r(j)}}catch(x){console.error("Error cargando sobres:",x)}finally{o(!1)}};k.useEffect(()=>{h()},[e.id]);const b=x=>{s(x),p("closed"),setTimeout(()=>p("opening"),400),setTimeout(()=>p("open"),1200)},w=()=>{s(null),p("closed")},y=async(x,j,z)=>{try{const N=e.id==="user_palomero"?"user_cinefilo":"user_palomero";await fetch(`${se}/api/notifications`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:N,senderId:e.id,senderName:e.name,senderAvatar:e.avatar,type:x,title:j,message:z})})}catch(N){console.error("Error enviando notificación a la pareja:",N)}},E=async(x,j=!1)=>{try{if((await fetch(`${se}/api/envelopes/${x}/use`,{method:"PUT"})).ok){if(!j){const N=n.find(P=>P.id===x);N&&await y("envelope_used","✉️ Sobre Sorpresa Abierto",`ha consumido el sobre sorpresa: "${N.text}" 🎬`)}await h(),w()}}catch(z){console.error("Error al usar sobre:",z)}},m=async x=>{await y("envelope_scheduled","📅 Cita Agendada con Idea",`ha agendado una cita usando la idea: "${x.text}" 🍿`),t&&t({title:`Cita: ${x.text}`,movieTitle:x.movieTitle||"",movieKey:x.movieKey||"",notes:`Inspirado en la idea sorpresa: "${x.text}". ¡Consejo: ${x.tip}!`,envelopeId:x.id}),await E(x.id,!0)},d=n.filter(x=>!x.isUsed),f=n.filter(x=>x.isUsed);return a.jsxs("div",{className:"saved-envelopes-tab animate-fade-in",children:[a.jsxs("div",{className:"tab-header-card glass-card",children:[a.jsx("h3",{className:"tab-header-title",children:"✉️ Mis Sobres Guardados"}),a.jsx("p",{className:"tab-header-desc",children:"Colecciona los sobres sorpresa que ganas al calificar tus películas. ¡Ábrelos y conviértelos en citas memorables!"})]}),a.jsxs("div",{className:"envelope-subtabs",children:[a.jsxs("button",{className:`subtab-btn ${g==="active"?"active":""}`,onClick:()=>u("active"),children:["Activos (",d.length,")"]}),a.jsxs("button",{className:`subtab-btn ${g==="used"?"active":""}`,onClick:()=>u("used"),children:["Historial Usados (",f.length,")"]})]}),i?a.jsxs("div",{className:"envelope-loading",children:[a.jsx("span",{className:"spinner-icon",children:"✉️"}),a.jsx("p",{children:"Cargando tu colección de sobres..."})]}):g==="active"?d.length>0?a.jsx("div",{className:"envelopes-grid",children:d.map(x=>a.jsxs("div",{className:"envelope-card glass-card animate-scale-in",onClick:()=>b(x),children:[a.jsx("div",{className:"env-card-glow"}),a.jsx("div",{className:"env-card-icon",children:"✉️"}),a.jsxs("div",{className:"env-card-body",children:[a.jsx("span",{className:"env-card-badge",children:"Cita Sorpresa"}),a.jsxs("p",{className:"env-card-movie",children:["De: ",x.movieTitle||"CineGlow"]}),a.jsxs("span",{className:"env-card-date",children:["Ganado: ",new Date(x.receivedAt).toLocaleDateString("es-CL",{day:"numeric",month:"short"})]})]}),a.jsxs("div",{className:"env-card-action",children:[a.jsx("span",{children:"Abrir sobre"}),a.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:a.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]},x.id))}):a.jsxs("div",{className:"empty-envelopes glass-card animate-scale-in",children:[a.jsx("span",{className:"empty-icon",children:"✉️"}),a.jsx("h4",{children:"No tienes sobres activos"}),a.jsx("p",{children:"Ganas un sobre sorpresa cada vez que valoras una película nueva. ¡Ve a la cartelera y califica tu última cita!"})]}):f.length>0?a.jsx("div",{className:"envelopes-grid used",children:f.map(x=>a.jsxs("div",{className:"envelope-card glass-card used animate-scale-in",children:[a.jsx("div",{className:"env-card-icon",children:"✉️"}),a.jsxs("div",{className:"env-card-body",children:[a.jsx("span",{className:"env-card-badge used",children:"Consumido ✓"}),a.jsxs("p",{className:"env-card-text",children:['"',x.text,'"']}),a.jsxs("p",{className:"env-card-movie",children:["Película: ",x.movieTitle]}),a.jsxs("span",{className:"env-card-date",children:["Usado el ",new Date(x.usedAt).toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})]})]})]},x.id))}):a.jsxs("div",{className:"empty-envelopes glass-card animate-scale-in",children:[a.jsx("span",{className:"empty-icon",children:"📂"}),a.jsx("h4",{children:"Historial vacío"}),a.jsx("p",{children:"Aquí aparecerán las ideas de sobres sorpresa que ya hayas agendado o marcado como consumidas."})]}),l&&a.jsx("div",{className:"env-open-overlay",onClick:x=>x.target===x.currentTarget&&w(),children:a.jsxs("div",{className:`env-open-modal ${c}`,children:[a.jsx("button",{className:"modal-close-x",onClick:w,children:"✕"}),a.jsxs("div",{className:"modal-env-header",children:[a.jsx("span",{className:"modal-env-tag",children:"✨ Invitación Exclusiva"}),a.jsxs("p",{className:"modal-env-movie",children:["Inspirado en: ",l.movieTitle]})]}),a.jsxs("div",{className:"modal-env-content-zone",children:[a.jsxs("div",{className:`envelope-body-anim ${c==="open"?"hidden":""}`,children:[a.jsx("div",{className:"envelope-flap-anim"}),a.jsx("div",{className:"envelope-pocket-anim",children:a.jsx("div",{className:"envelope-heart-anim",children:"💌"})})]}),a.jsxs("div",{className:`idea-card-anim ${c==="open"?"visible":""}`,children:[a.jsx("div",{className:"idea-emoji-anim",children:l.emoji||"🍿"}),a.jsx("p",{className:"idea-text-anim",children:l.text}),l.tip&&a.jsxs("p",{className:"idea-tip-anim",children:["💡 ",l.tip]})]})]}),c==="open"&&a.jsxs("div",{className:"modal-env-actions animate-scale-in",children:[a.jsx("button",{className:"btn-action-schedule",onClick:()=>m(l),children:"📅 Agendar Cita con esta idea"}),a.jsx("button",{className:"btn-action-use",onClick:()=>E(l.id),children:"✨ Marcar como Usado (Sin Agendar)"})]})]})}),a.jsx("style",{jsx:"true",children:`
        .saved-envelopes-tab {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tab-header-card {
          border-color: rgba(139, 92, 246, 0.15);
          background: rgba(139, 92, 246, 0.02);
          padding: 14px;
        }

        .tab-header-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .tab-header-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Sub-pestañas */
        .envelope-subtabs {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 3px;
        }

        .subtab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          padding: 8px;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subtab-btn.active {
          color: #fff;
          background: rgba(139, 92, 246, 0.25);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.15);
        }

        /* Grid de sobres */
        .envelopes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 480px) {
          .envelopes-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .envelope-card {
          border-color: rgba(255, 255, 255, 0.04);
          background: rgba(18, 22, 38, 0.4);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .envelope-card:active {
          transform: scale(0.98);
        }

        .envelope-card:hover {
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .env-card-glow {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
          transition: transform 0.5s ease;
        }

        .envelope-card:hover .env-card-glow {
          transform: translate(60px, 40px);
        }

        .env-card-icon {
          font-size: 28px;
          filter: drop-shadow(0 2px 5px rgba(139, 92, 246, 0.3));
        }

        .env-card-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .env-card-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .env-card-badge.used {
          color: #10b981;
        }

        .env-card-movie {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .env-card-text {
          font-size: 11px;
          font-style: italic;
          color: var(--text-primary);
          margin: 2px 0;
        }

        .env-card-date {
          font-size: 8px;
          color: var(--text-muted);
        }

        .env-card-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 8px;
          margin-top: auto;
        }

        /* Usados card styling */
        .envelope-card.used {
          background: rgba(18, 22, 38, 0.2);
          border-color: rgba(255, 255, 255, 0.02);
          cursor: default;
          opacity: 0.7;
        }

        .envelope-card.used:hover {
          box-shadow: none;
          transform: none;
        }

        /* Vacíos / Carga */
        .envelope-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: var(--text-secondary);
        }

        .spinner-icon {
          font-size: 32px;
          animation: float 2s ease-in-out infinite;
          margin-bottom: 12px;
        }

        .empty-envelopes {
          text-align: center;
          padding: 36px 20px;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.25);
        }

        .empty-icon {
          font-size: 40px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .empty-envelopes h4 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-envelopes p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 250px;
          margin: 0 auto;
        }

        /* ── MODAL ANIMADO DE APERTURA ── */
        .env-open-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(16px);
          z-index: 2100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .env-open-modal {
          background: linear-gradient(145deg, rgba(18, 16, 40, 0.98) 0%, rgba(26, 24, 55, 0.98) 100%);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 28px;
          padding: 32px 24px 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
          box-shadow:
            0 0 60px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          position: relative;
          animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .modal-close-x {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .modal-close-x:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.15);
        }

        @keyframes modalPop {
          from { transform: scale(0.7) translateY(40px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-env-header {
          margin-bottom: 20px;
        }

        .modal-env-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: #fff;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 6px;
        }

        .modal-env-movie {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        /* Zona interactiva del sobre animado */
        .modal-env-content-zone {
          position: relative;
          width: 200px;
          height: 160px;
          margin: 0 auto 24px;
        }

        /* Sobre */
        .envelope-body-anim {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.4s ease, transform 0.4s ease;
          opacity: 1;
          transform: scale(1);
        }

        .env-open-modal.closed .envelope-body-anim {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        .envelope-body-anim.hidden {
          opacity: 0;
          transform: scale(0.7);
          pointer-events: none;
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-2px) rotate(-1deg); }
          20%, 80% { transform: translateX(4px) rotate(1deg); }
          30%, 50%, 70% { transform: translateX(-4px) rotate(-1deg); }
          40%, 60% { transform: translateX(4px) rotate(1deg); }
        }

        .envelope-pocket-anim {
          flex: 1;
          background: linear-gradient(160deg, #1e1a4a 0%, #2d2465 100%);
          border-radius: 0 0 16px 16px;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-top: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .envelope-heart-anim {
          font-size: 32px;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .envelope-flap-anim {
          width: 100%;
          height: 50px;
          background: linear-gradient(160deg, #2d2465 0%, #1e1a4a 100%);
          border-radius: 50% 50% 0 0 / 30px 30px 0 0;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-bottom: none;
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        .env-open-modal.opening .envelope-flap-anim,
        .env-open-modal.open .envelope-flap-anim {
          transform: rotateX(180deg);
        }

        /* Tarjeta de Idea */
        .idea-card-anim {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          opacity: 0;
          transform: scale(0.6) translateY(50px);
          transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .idea-card-anim.visible {
          opacity: 1;
          transform: scale(1.15) translateY(0);
          z-index: 10;
        }

        .idea-emoji-anim {
          font-size: 36px;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
          animation: float 2.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .idea-text-anim {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          margin: 0 0 8px;
        }

        .idea-tip-anim {
          font-size: 10px;
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.08);
          border: 1px solid rgba(167, 139, 250, 0.15);
          border-radius: 8px;
          padding: 4px 8px;
          margin: 0;
        }

        /* Acciones del Modal */
        .modal-env-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
        }

        .btn-action-schedule {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: #fff;
          border: none;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 12px;
          padding: 12px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
          transition: all 0.2s ease;
        }

        .btn-action-schedule:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
        }

        .btn-action-use {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-action-use:active {
          background: rgba(255, 255, 255, 0.1);
        }
      `})]})}function _f({activeProfile:e,ratingsList:t,movies:n,onMovieClick:r}){const[i,o]=k.useState("ratings"),[l,s]=k.useState(null),c=t?t.filter(u=>u.userId===e.id).sort((u,h)=>new Date(h.timestamp)-new Date(u.timestamp)):[],p=u=>{const h=n.find(b=>b.key===u);h&&r&&r(h)},g=u=>{s(u),o("calendar")};return a.jsxs("div",{className:"my-ratings-container animate-scale-in",children:[a.jsxs("div",{className:"ratings-subtabs-nav glass-card",children:[a.jsxs("button",{className:`nav-tab-btn ${i==="ratings"?"active":""}`,onClick:()=>o("ratings"),children:[a.jsx("span",{className:"tab-icon",children:"⭐"}),a.jsx("span",{className:"tab-text",children:"Ratings"})]}),a.jsxs("button",{className:`nav-tab-btn ${i==="calendar"?"active":""}`,onClick:()=>o("calendar"),children:[a.jsx("span",{className:"tab-icon",children:"📅"}),a.jsx("span",{className:"tab-text",children:"Calendario"})]}),a.jsxs("button",{className:`nav-tab-btn ${i==="envelopes"?"active":""}`,onClick:()=>o("envelopes"),children:[a.jsx("span",{className:"tab-icon",children:"✉️"}),a.jsx("span",{className:"tab-text",children:"Sobres"})]})]}),a.jsxs("div",{className:"subtab-content-zone",children:[i==="ratings"&&a.jsxs("div",{className:"ratings-history-tab animate-fade-in",children:[a.jsxs("div",{className:"tab-header-card glass-card",children:[a.jsx("h3",{className:"tab-header-title",children:"Historial de Valoraciones"}),a.jsx("p",{className:"tab-header-desc",children:"Aquí se muestran todas tus valoraciones y reseñas de cartelera registradas en tu cuenta."})]}),a.jsx("div",{className:"ratings-history-list",children:c.length>0?c.map(u=>a.jsxs("div",{className:"history-item-card glass-card animate-scale-in",onClick:()=>p(u.movieKey),children:[a.jsxs("div",{className:"history-item-top",children:[a.jsxs("div",{className:"history-movie-details",children:[a.jsx("h4",{className:"history-movie-title",children:u.movieTitle}),a.jsxs("span",{className:"history-timestamp",children:["Calificado el ",new Date(u.timestamp).toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})]})]}),a.jsx("div",{className:"history-stars-wrap",children:a.jsx(Ba,{rating:u.score,size:13})})]}),(u.watchedAt||u.cinemaName||u.menuOption||u.moodOption)&&a.jsxs("div",{className:"history-visit-badge",children:[u.watchedAt&&a.jsxs("span",{className:"visit-pill",children:["📅 ",new Date(u.watchedAt+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})]}),u.cinemaName&&a.jsxs("span",{className:"visit-pill cinema",children:["🎭 ",u.cinemaName]}),u.menuOption&&a.jsxs("span",{className:"visit-pill food",children:["🍿 ",u.menuOption]}),u.moodOption&&a.jsx("span",{className:"visit-pill mood",children:u.moodOption==="Increíble"?"🥰 Increíble":u.moodOption==="Risas"?"😂 Risas":u.moodOption==="Lloramos"?"😢 Lloramos":u.moodOption==="Dormimos"?"😴 Zzz":"🍿 Concentrados"})]}),u.comment?a.jsx("p",{className:"history-comment",children:u.comment}):a.jsx("p",{className:"history-comment empty",children:"Calificado sin comentario escrito."}),u.photos&&u.photos.length>0&&a.jsx("div",{className:"history-photos-grid",children:u.photos.map((h,b)=>a.jsx("div",{className:"history-photo-thumb",children:a.jsx("img",{src:h,alt:`Recuerdo ${b+1}`})},b))}),a.jsxs("div",{className:"history-click-hint",children:[a.jsx("span",{children:"Toca para ver detalles de cartelera e info"}),a.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:a.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]},u.id)):a.jsxs("div",{className:"empty-history glass-card animate-scale-in",children:[a.jsx("span",{className:"history-emoji",children:"⭐"}),a.jsx("h4",{children:"Sin valoraciones registradas"}),a.jsx("p",{children:"Aún no has calificado ninguna película con esta cuenta demo. ¡Visita la Cartelera, selecciona una película y añade tu puntuación!"})]})})]}),i==="calendar"&&a.jsx(Lf,{activeProfile:e,movies:n,prefilledData:l,onClearPrefilledData:()=>s(null)}),i==="envelopes"&&a.jsx(Pf,{activeProfile:e,onScheduleWithIdea:g})]}),a.jsx("style",{jsx:"true",children:`
        .my-ratings-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 30px;
        }

        /* Barra de navegación superior */
        .ratings-subtabs-nav {
          display: flex;
          justify-content: space-around;
          padding: 6px;
          border-color: rgba(255, 255, 255, 0.04);
          background: rgba(18, 22, 38, 0.5);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-tab-btn {
          flex: 1;
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px 4px;
          border-radius: 12px;
          transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .nav-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .nav-tab-btn.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15));
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
        }

        .nav-tab-btn .tab-icon {
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .nav-tab-btn.active .tab-icon {
          transform: scale(1.2);
        }

        .nav-tab-btn .tab-text {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .subtab-content-zone {
          margin-top: 2px;
        }

        /* Estilos de historial (Ratings) */
        .ratings-history-tab {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tab-header-card {
          border-color: rgba(139, 92, 246, 0.15);
          background: rgba(139, 92, 246, 0.02);
          padding: 14px;
        }

        .tab-header-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .tab-header-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .ratings-history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-item-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.35);
          padding: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .history-item-card:active {
          transform: scale(0.98);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .history-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .history-movie-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .history-movie-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .history-timestamp {
          font-size: 8px;
          color: var(--text-muted);
        }

        .history-stars-wrap {
          flex-shrink: 0;
        }

        .history-comment {
          font-size: 11px;
          color: var(--text-primary);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.15);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .history-comment.empty {
          color: var(--text-muted);
          font-style: italic;
        }

        .history-click-hint {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-top: 2px;
        }

        .history-visit-badge {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .visit-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 600;
          color: var(--accent-violet);
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          padding: 3px 9px;
          letter-spacing: 0.01em;
        }

        .visit-pill.cinema {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border-color: rgba(6, 182, 212, 0.2);
        }

        .visit-pill.food {
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.08);
          border-color: rgba(167, 139, 250, 0.18);
        }

        .visit-pill.mood {
          color: #f472b6;
          background: rgba(244, 114, 182, 0.08);
          border-color: rgba(244, 114, 182, 0.18);
        }

        .history-photos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 4px;
        }

        .history-photo-thumb {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .history-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .empty-history {
          text-align: center;
          padding: 36px 20px;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.25);
        }

        .history-emoji {
          font-size: 36px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .empty-history h4 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-history p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `})]})}const gr=[{emoji:"🎭",idea:"¡Elijan una película de un género que nunca han visto juntos!",tip:"Terror, documental, animación… ¡sorpréndanse!"},{emoji:"🍜",idea:'Antes del cine, cenar en ese restorán que siempre dicen "algún día vamos".',tip:"Hagan de la cita algo más que solo la película."},{emoji:"🌙",idea:"Elijan la función más tarde de la noche y salgan a caminar después.",tip:"Las noches post-cine tienen magia propia."},{emoji:"📸",idea:"¡Sácanse una selfie antes de entrar a la sala! Es para el álbum de recuerdos.",tip:'Ya tienen la pestaña "Recuerdos" esperándolos.'},{emoji:"🏆",idea:"Túrnense: esta vez elige tú, la próxima vez elige tu pareja.",tip:"El sistema de rotación más justo del universo."},{emoji:"💌",idea:"Envíenle la tarjeta de invitación antes de ir, aunque ya estén juntos.",tip:"Los detalles pequeños son los más grandes."},{emoji:"🎵",idea:"Escuchen el soundtrack de la película en el camino a casa.",tip:"La música prolonga la magia de lo que vieron."},{emoji:"🗺️",idea:"Exploren un mall o barrio nuevo donde está el cine.",tip:"La cita empieza mucho antes de la sala."},{emoji:"☕",idea:"Café o té después del cine y conversen sobre la película por 30 minutos.",tip:"El análisis post-pelicula es su ritual más bonito."},{emoji:"🍰",idea:"¡Celebren que llevan otra película juntos con un dulce/snack de la dulcería!",tip:"Cada cita compartida es un logro en pareja."}];function Df(e){const t=e%gr.length;return gr[t]}function Mf({ratingCount:e=1,movieTitle:t="",onClose:n}){const[r,i]=k.useState("closed"),o=Df(e);k.useEffect(()=>{const s=setTimeout(()=>i("opening"),600),c=setTimeout(()=>i("open"),1400);return()=>{clearTimeout(s),clearTimeout(c)}},[]);const l=e===1?"¡Primera película juntos! 🎉":e===5?"¡5 películas en pareja! 🌟":e===10?"¡10 citas en el cine! 🏆":e===20?"¡20 películas! ¡Son cinéfilos de élite! 🎬":`Película #${e} en pareja`;return a.jsxs("div",{className:"envelope-overlay",onClick:s=>s.target===s.currentTarget&&n(),children:[a.jsxs("div",{className:`envelope-modal ${r}`,children:[a.jsxs("div",{className:"env-header",children:[a.jsx("span",{className:"env-badge",children:"✨ Sobre Sorpresa"}),a.jsx("p",{className:"env-milestone",children:l}),t&&a.jsxs("p",{className:"env-movie",children:["🎬 ",t]})]}),a.jsxs("div",{className:"env-content-zone",children:[a.jsxs("div",{className:`envelope-body ${r==="open"?"hidden":""}`,children:[a.jsx("div",{className:"envelope-flap"}),a.jsx("div",{className:"envelope-pocket",children:a.jsx("div",{className:"envelope-heart",children:"💌"})})]}),a.jsxs("div",{className:`idea-card ${r==="open"?"visible":""}`,children:[a.jsx("div",{className:"idea-emoji",children:o.emoji}),a.jsx("p",{className:"idea-text",children:o.idea}),a.jsxs("p",{className:"idea-tip",children:["💡 ",o.tip]})]})]}),r==="open"&&a.jsx("button",{className:"env-close-btn",onClick:n,children:"¡Anotado! 💌"})]}),a.jsx("style",{jsx:"true",children:`
        .envelope-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .envelope-modal {
          background: linear-gradient(145deg, rgba(18, 16, 40, 0.97) 0%, rgba(26, 24, 55, 0.97) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 28px;
          padding: 28px 24px 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
          box-shadow:
            0 0 60px rgba(139, 92, 246, 0.25),
            0 0 120px rgba(139, 92, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalPop {
          from { transform: scale(0.7) translateY(40px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* Encabezado */
        .env-header {
          margin-bottom: 20px;
        }

        .env-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: #fff;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .env-milestone {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .env-movie {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        /* ── Zona de contenido: altura fija para que no salte el layout ── */
        .env-content-zone {
          position: relative;
          width: 200px;
          height: 160px;
          margin: 0 auto 20px;
        }

        /* ── Sobre ── */
        .envelope-body {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.4s ease, transform 0.4s ease;
          opacity: 1;
          transform: scale(1);
        }

        /* Shake en fase 'closed' */
        .envelope-modal.closed .envelope-body {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        /* El sobre se encoge y desaparece cuando llega 'open' */
        .envelope-body.hidden {
          opacity: 0;
          transform: scale(0.7);
          pointer-events: none;
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-2px) rotate(-1deg); }
          20%, 80% { transform: translateX(4px) rotate(1deg); }
          30%, 50%, 70% { transform: translateX(-4px) rotate(-1deg); }
          40%, 60% { transform: translateX(4px) rotate(1deg); }
        }

        .envelope-pocket {
          flex: 1;
          background: linear-gradient(160deg, #1e1a4a 0%, #2d2465 100%);
          border-radius: 0 0 16px 16px;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-top: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .envelope-heart {
          font-size: 32px;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .envelope-flap {
          width: 100%;
          height: 50px;
          background: linear-gradient(160deg, #2d2465 0%, #1e1a4a 100%);
          border-radius: 50% 50% 0 0 / 30px 30px 0 0;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-bottom: none;
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        /* Flap se abre en 'opening' y 'open' */
        .envelope-modal.opening .envelope-flap,
        .envelope-modal.open .envelope-flap {
          transform: rotateX(180deg);
        }

        /* ── Tarjeta de idea ── */
        /* Ocupa el mismo espacio que el sobre, empieza invisible */
        .idea-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 18px;
          padding: 16px;
          opacity: 0;
          transform: scale(0.8) translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.2);
        }

        /* Aparece en el mismo lugar cuando está 'visible' */
        .idea-card.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
          box-shadow:
            0 8px 32px rgba(139, 92, 246, 0.35),
            0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .idea-emoji {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .idea-text {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px;
          line-height: 1.45;
        }

        .idea-tip {
          font-family: var(--font-sans);
          font-size: 10px;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
          line-height: 1.4;
        }

        /* ── Botón de cierre ── */
        .env-close-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-violet) 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
          transition: all 0.2s ease;
          animation: fadeInUp 0.4s ease;
        }

        .env-close-btn:active {
          transform: scale(0.97);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `})]})}const Ms=e=>{if(!e)return null;const t=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,n=e.match(t);return n&&n[2].length===11?n[2]:null};function Of({movie:e,onClose:t,activeProfile:n,onAddRating:r,ratingsList:i,onRefreshBillboard:o}){const[l,s]=k.useState("info"),[c,p]=k.useState(0),[g,u]=k.useState(""),[h,b]=k.useState(!1),[w,y]=k.useState([]),[E,m]=k.useState({average:0,count:0,starsDistribution:{}}),[d,f]=k.useState(""),[x,j]=k.useState(""),[z,N]=k.useState(0),P=new Date().toISOString().split("T")[0],[Y,O]=k.useState(P),[ue,pe]=k.useState(""),[Re,_]=k.useState(""),[H,vt]=k.useState(""),[Ze,T]=k.useState([]),[M,R]=k.useState(""),[K,q]=k.useState(""),[He,Pe]=k.useState(!1),[yt,et]=k.useState("¿Me acompañas? 💌"),[tt,ii]=k.useState(""),[Qe,L]=k.useState(null),[ie,dt]=k.useState(!1),[bt,Vn]=k.useState(1),$e=Lo.useRef(null),Hn=["Cinépolis La Reina","Cinépolis Parque Arauco","Cinépolis Mallplaza Egaña","Cinépolis Mallplaza Los Dominicos","Cinépolis Paseo Los Dominicos","Cinépolis Portal La Dehesa","Cinépolis Paseo Los Trapenses","Cinépolis Casa Costanera","Otro"],Qn=()=>{const v=[],S=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],A=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],G=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],V=new Date;for(let F=0;F<7;F++){const U=new Date(V);U.setDate(V.getDate()+F);const I=S[U.getDay()],X=U.getDate(),ce=A[U.getMonth()],je=G[U.getMonth()],xe=`${X} ${ce.substring(0,3)}`,ve=`${X} ${ce}`,Dt=`${String(X).padStart(2,"0")} ${ce}`,ut=`${String(X).padStart(2,"0")} ${ce.substring(0,3)}`,nt=`${X} ${je}`;v.push({index:F,dayName:I,dayNum:X,monthName:je,formats:[xe,ve,Dt,ut,nt].map(Br=>Br.toLowerCase().trim()),dateStr:`${X} ${je}`})}return v};k.useEffect(()=>{e&&e.showtimes&&e.showtimes.length>0?(f(e.showtimes[0].cinemaName),e.showtimes[0].dates&&e.showtimes[0].dates.length>0&&j(e.showtimes[0].dates[0].showtimeDate),N(0),R(""),q("")):(f(""),j(""),N(0),R(""),q(""))},[e]);const{title:wt,originalTitle:_t,rating:Yn,ratingDescription:Kn,runTime:Ar,poster:Fr,director:Kd,gender:wl,actors:oi,distributor:jl,trailer:Ur}=e;k.useEffect(()=>{if(i){const v=i.filter(S=>S.movieKey===e.key);if(y(v.sort((S,A)=>new Date(A.timestamp)-new Date(S.timestamp))),v.length>0){const S=v.reduce((A,G)=>A+G.score,0);m({average:parseFloat((S/v.length).toFixed(1)),count:v.length})}else m({average:0,count:0})}},[i,e.key]);const W=w.find(v=>v.userId===n.id);k.useEffect(()=>{W?(p(W.score),u(W.comment),O(W.watchedAt||P),pe(W.cinemaName||""),_(W.menuOption||""),vt(W.moodOption||""),T(W.photos||[])):(p(0),u(""),O(P),pe(""),_(""),vt(""),T([]))},[W,e.key]);const Gd=async v=>{if(v.preventDefault(),c===0){alert("Por favor selecciona una puntuación de estrellas.");return}b(!0);try{if((await fetch(`${se}/api/ratings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:n.id,movieKey:e.key,movieTitle:e.title,score:c,comment:g,watchedAt:Y||null,cinemaName:ue||null,menuOption:Re||null,moodOption:H||null,photos:Ze})})).ok){const A=await fetch(`${se}/api/ratings`);let G=1;if(A.ok&&(G=(await A.json()).filter(F=>F.userId===n.id).length,Vn(G)),W)o();else{try{const V=(G-1)%gr.length,F=gr[V]||gr[0],U=await fetch(`${se}/api/envelopes`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:n.id,ideaIndex:V,emoji:F.emoji,text:F.idea,tip:F.tip,movieTitle:e.title,movieKey:e.key})});if(!U.ok){const I=await U.json().catch(()=>({}));throw new Error(I.error||`Error HTTP ${U.status}`)}}catch(V){console.error("Error al persistir sobre en la DB:",V)}dt(!0)}}else alert("Error al enviar calificación")}catch(S){console.error(S)}finally{b(!1)}},kl=(v,S)=>{v.fillStyle="#ffffff",v.textAlign="center",v.textBaseline="top",v.font="bold 28px Bricolage Grotesque, Outfit, sans-serif";const G=wt.toUpperCase().split(" ");let V="",F=[];const U=480;for(let pt=0;pt<G.length;pt++){let Nl=V+G[pt]+" ";v.measureText(Nl).width>U&&pt>0?(F.push(V),V=G[pt]+" "):V=Nl}F.push(V);let I=515;F.forEach(pt=>{v.fillText(pt.trim(),S.width/2,I),I+=34}),I+=15,v.strokeStyle="rgba(255, 42, 95, 0.25)",v.setLineDash([5,8]),v.lineWidth=2,v.beginPath(),v.moveTo(30,I),v.lineTo(570,I),v.stroke(),v.setLineDash([]),v.fillStyle="#040509",v.beginPath(),v.arc(0,I,14,0,Math.PI*2),v.fill(),v.beginPath(),v.arc(600,I,14,0,Math.PI*2),v.fill(),v.strokeStyle="rgba(255, 42, 95, 0.15)",v.lineWidth=1.5,v.strokeRect(15,15,S.width-30,S.height-30),I+=28;const X=d.replace("Cinépolis ","").replace(" Premium Class","").replace(" Premium",""),ce=Qn()[z].dateStr.toUpperCase();v.fillStyle="#fbbf24",v.font="bold 15px Bricolage Grotesque, Outfit, sans-serif",v.fillText(`🍿  CLUB PREMIUM  •  ${X.toUpperCase()}`,S.width/2,I),I+=26,v.fillStyle="#22d3ee",v.font="bold 18px Bricolage Grotesque, Outfit, sans-serif",v.fillText(`📅  ${ce}  •  🕒  ${M} HRS`,S.width/2,I),I+=36;const je=yt||"Te invito al cine 💌";v.fillStyle="rgba(255, 42, 95, 0.05)",v.strokeStyle="rgba(255, 42, 95, 0.2)";const xe=80,ve=I,Dt=440,ut=66,nt=14;v.beginPath(),v.moveTo(xe+nt,ve),v.lineTo(xe+Dt-nt,ve),v.quadraticCurveTo(xe+Dt,ve,xe+Dt,ve+nt),v.lineTo(xe+Dt,ve+ut-nt),v.quadraticCurveTo(xe+Dt,ve+ut,xe+Dt-nt,ve+ut),v.lineTo(xe+nt,ve+ut),v.quadraticCurveTo(xe,ve+ut,xe,ve+ut-nt),v.lineTo(xe,ve+nt),v.quadraticCurveTo(xe,ve,xe+nt,ve),v.closePath(),v.fill(),v.stroke(),v.fillStyle="#ff527b",v.font="italic bold 16px Plus Jakarta Sans, Inter, sans-serif",v.fillText(`"${je}"`,S.width/2,I+ut/2-9),I+=ut+22,v.fillStyle="rgba(255, 255, 255, 0.4)",v.font="7px Courier New, monospace",v.fillText("C I N E G L O W - P A S S - 2 0 2 6",S.width/2,I+16),v.fillStyle="rgba(255, 255, 255, 0.15)";let Br=180;[2,4,1,6,2,5,1,2,4,2,1,6,3,2,5,1,2,4,1,6,2,5,1,2,4,2,1,6,3,2,5,1,2].forEach(pt=>{v.fillRect(Br,I-10,pt,20),Br+=pt+2}),ii(S.toDataURL("image/png"))},Xd=()=>{const v=$e.current;if(!v)return;const S=v.getContext("2d");S.clearRect(0,0,v.width,v.height);const A=S.createLinearGradient(0,0,v.width,v.height);A.addColorStop(0,"#040509"),A.addColorStop(.5,"#0b0c16"),A.addColorStop(1,"#020305"),S.fillStyle=A,S.fillRect(0,0,v.width,v.height);const G=S.createRadialGradient(v.width/2,280,50,v.width/2,280,260);G.addColorStop(0,"rgba(255, 42, 95, 0.22)"),G.addColorStop(1,"rgba(255, 42, 95, 0)"),S.fillStyle=G,S.beginPath(),S.arc(v.width/2,280,260,0,Math.PI*2),S.fill();const V=S.createRadialGradient(v.width/2,680,30,v.width/2,680,200);V.addColorStop(0,"rgba(34, 211, 238, 0.16)"),V.addColorStop(1,"rgba(34, 211, 238, 0)"),S.fillStyle=V,S.beginPath(),S.arc(v.width/2,680,200,0,Math.PI*2),S.fill();const F=new Image;F.crossOrigin="anonymous",F.onload=()=>{S.save();const U=150,I=70,X=300,ce=410,je=18;S.beginPath(),S.moveTo(U+je,I),S.lineTo(U+X-je,I),S.quadraticCurveTo(U+X,I,U+X,I+je),S.lineTo(U+X,I+ce-je),S.quadraticCurveTo(U+X,I+ce,U+X-je,I+ce),S.lineTo(U+je,I+ce),S.quadraticCurveTo(U,I+ce,U,I+ce-je),S.lineTo(U,I+je),S.quadraticCurveTo(U,I,U+je,I),S.closePath(),S.clip(),S.drawImage(F,U,I,X,ce),S.restore(),S.strokeStyle="rgba(255, 255, 255, 0.18)",S.lineWidth=3,S.stroke(),S.strokeStyle="rgba(255, 42, 95, 0.35)",S.lineWidth=1,S.stroke(),kl(S,v)},F.onerror=()=>{S.fillStyle="rgba(255, 255, 255, 0.02)",S.fillRect(150,70,300,410),S.strokeStyle="rgba(255, 255, 255, 0.08)",S.strokeRect(150,70,300,410),S.font="72px sans-serif",S.textAlign="center",S.textBaseline="middle",S.fillText("🎬",v.width/2,70+410/2-20),S.fillStyle="rgba(255, 255, 255, 0.35)",S.font="bold 15px Bricolage Grotesque, Outfit, sans-serif",S.fillText("CineGlow Premium Ticket",v.width/2,70+410/2+50),kl(S,v)},F.src=Fr.startsWith("http")?`${se}/api/proxy-image?url=${encodeURIComponent(Fr)}`:Fr};return k.useEffect(()=>{He&&M&&Xd()},[He,yt,M,d,z]),a.jsxs("div",{className:"bottom-sheet-backdrop",children:[ie&&a.jsx(Mf,{ratingCount:bt,movieTitle:e.title,onClose:()=>{dt(!1),o()}}),a.jsx("div",{className:"bottom-sheet-overlay",onClick:t}),a.jsxs("div",{className:"bottom-sheet-wrapper animate-slide-up",children:[a.jsx("div",{className:"drag-handle",onClick:t}),a.jsxs("div",{className:"sheet-quick-header",children:[a.jsx("img",{src:Fr,alt:wt,className:"sheet-poster"}),a.jsxs("div",{className:"sheet-header-details",children:[a.jsx("h2",{className:"sheet-title",children:wt}),_t&&_t!==wt&&a.jsx("span",{className:"sheet-original-title",children:_t}),a.jsxs("div",{className:"sheet-badges",children:[a.jsx("span",{className:"sheet-badge-tag class",children:Yn}),a.jsx("span",{className:"sheet-badge-tag time",children:Ar}),a.jsx("span",{className:"sheet-badge-tag genre",children:wl||"Cine"})]}),E.count>0?a.jsxs("div",{className:"sheet-rating-summary",children:[a.jsx("span",{className:"star-gold",children:"★"}),a.jsx("span",{className:"summary-score",children:E.average}),a.jsxs("span",{className:"summary-count",children:["(",E.count," ",E.count===1?"voto":"votos",")"]})]}):a.jsx("div",{className:"sheet-rating-summary unrated",children:a.jsx("span",{children:"Sin valoraciones"})})]})]}),a.jsxs("div",{className:"sheet-tabs",children:[a.jsx("button",{className:`sheet-tab-btn ${l==="info"?"active":""}`,onClick:()=>s("info"),children:"Ficha Técnica"}),a.jsxs("button",{className:`sheet-tab-btn ${l==="reviews"?"active":""}`,onClick:()=>s("reviews"),children:["Opiniones (",w.length,")"]})]}),a.jsxs("div",{className:"bottom-sheet-content",children:[l==="info"&&a.jsxs("div",{className:"tab-pane info-pane animate-scale-in",children:[a.jsxs("div",{className:"info-section",children:[a.jsx("h4",{className:"info-title",children:"Sinopsis"}),a.jsx("p",{className:"info-text",children:Kn||"No hay descripción disponible para esta película."})]}),a.jsxs("div",{className:"info-section",children:[a.jsx("h4",{className:"info-title",children:"Detalles de la Película"}),a.jsxs("div",{className:"meta-grid",children:[a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Director"}),a.jsx("span",{className:"meta-val",children:Kd||"No disponible"})]}),a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Género"}),a.jsx("span",{className:"meta-val",children:wl||"Cine"})]}),a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Clasificación"}),a.jsx("span",{className:"meta-val",children:Yn||"Todo Espectador (TE)"})]}),a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Duración"}),a.jsx("span",{className:"meta-val",children:Ar||"No disponible"})]}),jl&&a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Distribuidora"}),a.jsx("span",{className:"meta-val",children:jl})]}),_t&&_t!==wt&&a.jsxs("div",{className:"meta-item",children:[a.jsx("span",{className:"meta-label",children:"Título Original"}),a.jsx("span",{className:"meta-val",children:_t})]})]})]}),oi&&oi.length>0&&a.jsxs("div",{className:"info-section",children:[a.jsx("h4",{className:"info-title",children:"Elenco Principal"}),a.jsx("div",{className:"actors-list-wrap",children:oi.map((v,S)=>a.jsx("span",{className:"actor-tag",children:v},S))})]}),e.showtimes&&e.showtimes.length>0?a.jsxs("div",{className:"info-section showtimes-section",children:[a.jsx("h4",{className:"info-title",children:"📍 Funciones en Sector Oriente"}),a.jsx("div",{className:"cinema-selector-row horizontal-scroll",children:e.showtimes.map(v=>a.jsx("button",{type:"button",className:`cinema-selector-btn ${d===v.cinemaName?"active":""}`,onClick:()=>{f(v.cinemaName),v.dates&&v.dates.length>0&&j(v.dates[0].showtimeDate),N(0)},children:v.cinemaName.replace("Cinépolis ","").replace(" Premium Class","").replace(" Premium","")},v.cinemaName))}),(()=>{const v=e.showtimes.find(A=>A.cinemaName===d);if(!v)return null;const S=Qn();return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"date-selector-row horizontal-scroll",children:S.map(A=>{const G=v.dates?v.dates.find(F=>{const U=F.showtimeDate.toLowerCase().trim();return A.formats.some(I=>U.includes(I)||I.includes(U))}):null,V=z===A.index;return a.jsxs("button",{type:"button",className:`calendar-date-btn ${V?"active":""} ${G?"has-showtimes":"empty-showtimes"}`,onClick:()=>N(A.index),children:[a.jsx("span",{className:"calendar-day-name",children:A.index===0?"HOY":A.dayName.toUpperCase()}),a.jsx("span",{className:"calendar-day-num",children:A.dayNum}),a.jsx("span",{className:"calendar-month-name",children:A.monthName}),G&&a.jsx("span",{className:"showtimes-dot-indicator"})]},A.index)})}),(()=>{const A=S[z],G=v.dates?v.dates.find(V=>{const F=V.showtimeDate.toLowerCase().trim();return A.formats.some(U=>F.includes(U)||U.includes(F))}):null;return G?!G.formats||G.formats.length===0?null:a.jsxs("div",{className:"formats-container animate-fade-in",children:[a.jsxs("div",{className:"schedule-status-banner",children:[a.jsx("span",{className:"banner-dot green"}),a.jsx("span",{className:"banner-text",children:"Cartelera Oficial Confirmada"})]}),G.formats.map(V=>a.jsxs("div",{className:"format-group",children:[a.jsx("span",{className:"format-title-tag",children:V.formatName}),a.jsx("div",{className:"times-grid-pills",children:V.times.map(F=>a.jsx("button",{type:"button",className:`time-pill-btn animate-scale-in ${M===F.time&&K===V.formatName?"active":""}`,onClick:()=>{R(F.time),q(V.formatName)},children:F.time},F.id))})]},V.formatName)),M&&a.jsxs("div",{className:"invite-action-card glass-card animate-slide-up",children:[a.jsxs("div",{className:"invite-info",children:[a.jsx("span",{className:"invite-label",children:"Cita Seleccionada:"}),a.jsxs("span",{className:"invite-details",children:["📅 ",A.dateStr," • 🕒 ",M," hrs (",K,")"]})]}),a.jsx("button",{type:"button",className:"btn-glow btn-glow-purple invite-btn",onClick:()=>Pe(!0),children:"💌 Crear Invitación"})]})]}):a.jsxs("div",{className:"no-showtimes-scheduled-card glass-card",children:[a.jsx("span",{className:"schedule-icon",children:"🕒"}),a.jsx("h5",{className:"schedule-title",children:"Funciones no publicadas aún"}),a.jsx("p",{className:"schedule-text",children:"Cinépolis aún no programa funciones oficiales para este día. Las carteleras semanales suelen actualizarse los días miércoles por la tarde."})]})})()]})})()]}):a.jsxs("div",{className:"info-section showtimes-section empty-showtimes",children:[a.jsx("h4",{className:"info-title",children:"📍 Funciones en Sector Oriente"}),a.jsx("p",{className:"no-showtimes-text",children:"No hay funciones programadas para hoy en este sector."})]}),Ur&&a.jsxs("div",{className:"info-section trailer-section",children:[a.jsx("h4",{className:"info-title",children:"Tráiler Oficial"}),Ms(Ur)?a.jsx("div",{className:"trailer-embed-container glass-card",children:a.jsx("iframe",{src:`https://www.youtube.com/embed/${Ms(Ur)}`,title:`${wt} Trailer`,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,className:"trailer-iframe"})}):a.jsxs("a",{href:Ur,target:"_blank",rel:"noopener noreferrer",className:"btn-glow btn-glow-youtube",children:[a.jsx("span",{children:"🎬"}),"Ver Tráiler Oficial en YouTube"]})]})]}),l==="reviews"&&a.jsxs("div",{className:"tab-pane reviews-pane animate-scale-in",children:[a.jsxs("div",{className:"review-form-card glass-card",children:[a.jsx("h4",{className:"form-title",children:W?"Actualiza tu valoración":"Califica esta película"}),a.jsxs("span",{className:"form-subtitle",children:["Evaluando como ",a.jsx("strong",{children:n.name})]}),a.jsxs("form",{onSubmit:Gd,className:"stars-form",children:[a.jsxs("div",{className:"stars-selector-wrap",children:[a.jsx(Ba,{rating:c,onChange:p,interactive:!0,size:32}),c>0&&a.jsx("span",{className:"score-desc-text",children:["Insufrible","Mala","Regular","¡Muy buena!","¡Obra Maestra!"][c-1]})]}),a.jsx("textarea",{className:"review-textarea",placeholder:"Escribe un comentario u opinión sobre la película (opcional)...",value:g,onChange:v=>u(v.target.value),maxLength:300}),W&&(W.watchedAt||W.cinemaName||W.menuOption||W.moodOption)?a.jsxs("div",{className:"visit-locked-section",children:[a.jsx("span",{className:"visit-locked-label",children:"🔒 CÁPSULA DEL TIEMPO (Cita Registrada)"}),a.jsxs("div",{className:"visit-locked-pills",children:[W.watchedAt&&a.jsxs("span",{className:"visit-locked-pill",children:["📅 ",new Date(W.watchedAt+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"long",year:"numeric"})]}),W.cinemaName&&a.jsxs("span",{className:"visit-locked-pill cinema",children:["🎭 ",W.cinemaName]}),W.menuOption&&a.jsxs("span",{className:"visit-locked-pill food",children:["🍿 ",W.menuOption]}),W.moodOption&&a.jsx("span",{className:"visit-locked-pill mood",children:W.moodOption==="Increíble"?"🥰 Increíble":W.moodOption==="Risas"?"😂 Risas y risas":W.moodOption==="Lloramos"?"😢 Lloramos":W.moodOption==="Dormimos"?"😴 Nos dormimos":"🍿 Concentrados"})]}),W.photos&&W.photos.length>0&&a.jsxs("div",{className:"visit-locked-photos-container",style:{marginTop:"12px"},children:[a.jsx("span",{className:"visit-locked-label",style:{fontSize:"10px",display:"block",marginBottom:"6px"},children:"📸 RECUERDOS EN PAREJA"}),a.jsx("div",{className:"locked-photos-grid",children:W.photos.map((v,S)=>a.jsx("div",{className:"locked-photo-thumb",onClick:()=>L({photos:W.photos,index:S}),children:a.jsx("img",{src:v,alt:`Recuerdo ${S+1}`})},S))})]}),a.jsx("span",{className:"visit-locked-hint",children:"Los datos de esta cita están guardados para siempre en su memoria de pareja. Solo puedes actualizar la nota y el comentario."})]}):a.jsxs("div",{className:"visit-register-section",children:[a.jsxs("span",{className:"visit-register-label",children:["📍 ¿Cuándo y dónde la vieron? ",a.jsx("span",{className:"optional-tag",children:"(opcional)"})]}),a.jsxs("div",{className:"visit-field",children:[a.jsx("label",{className:"visit-field-label",children:"📅 Fecha de la visita"}),a.jsx("input",{type:"date",className:"visit-input",value:Y,onChange:v=>O(v.target.value),max:P})]}),a.jsxs("div",{className:"visit-field",children:[a.jsx("label",{className:"visit-field-label",children:"🎭 Cine"}),a.jsx("div",{className:"cinema-pills-grid",children:Hn.map(v=>a.jsx("button",{type:"button",className:`cinema-pill-btn ${ue===v?"selected":""}`,onClick:()=>pe(S=>S===v?"":v),children:v},v))})]}),a.jsxs("div",{className:"visit-field",style:{marginTop:"6px"},children:[a.jsx("label",{className:"visit-field-label",children:"🍿 ¿Qué comieron en la cita?"}),a.jsx("div",{className:"cinema-pills-grid",children:[{val:"Cabritas Dulces",lbl:"Cabritas Dulces 🍿"},{val:"Cabritas Saladas",lbl:"Cabritas Saladas 🍿"},{val:"Cabritas Mixtas",lbl:"Cabritas Mixtas 🍿"},{val:"Nachos con Queso",lbl:"Nachos con Queso 🧀"},{val:"Hot Dog",lbl:"Hot Dog 🌭"},{val:"Solo Bebida",lbl:"Solo Bebida 🥤"},{val:"Ninguno",lbl:"Nada ❌"}].map(v=>a.jsx("button",{type:"button",className:`cinema-pill-btn ${Re===v.val?"selected":""}`,onClick:()=>_(S=>S===v.val?"":v.val),children:v.lbl},v.val))})]}),a.jsxs("div",{className:"visit-field",style:{marginTop:"6px"},children:[a.jsx("label",{className:"visit-field-label",children:"🥰 ¿Cómo lo pasaron?"}),a.jsx("div",{className:"cinema-pills-grid",children:[{val:"Increíble",lbl:"Increíble 🥰"},{val:"Risas",lbl:"Nos reímos mucho 😂"},{val:"Lloramos",lbl:"Lloramos 😢"},{val:"Dormimos",lbl:"Nos dormimos 😴"},{val:"Concentrados",lbl:"Súper concentrados 🍿"}].map(v=>a.jsx("button",{type:"button",className:`cinema-pill-btn ${H===v.val?"selected":""}`,onClick:()=>vt(S=>S===v.val?"":v.val),children:v.lbl},v.val))})]}),a.jsxs("div",{className:"visit-field",style:{marginTop:"12px"},children:[a.jsxs("label",{className:"visit-field-label",children:["📸 Recuerdos de la Cita ",a.jsx("span",{className:"optional-tag",children:"(Máx. 3 fotos)"})]}),a.jsxs("div",{className:"photos-uploader-container",children:[a.jsxs("label",{className:"photo-upload-btn-label",children:[a.jsx("input",{type:"file",accept:"image/*",multiple:!0,className:"photo-file-input",onChange:v=>{const S=Array.from(v.target.files);if(Ze.length+S.length>3){alert("Solo puedes subir un máximo de 3 fotos para esta cita.");return}S.forEach(A=>{const G=new FileReader;G.onload=V=>{const F=new Image;F.onload=()=>{let I=F.width,X=F.height;(I>800||X>800)&&(I>X?(X=Math.round(X*800/I),I=800):(I=Math.round(I*800/X),X=800));const ce=document.createElement("canvas");ce.width=I,ce.height=X,ce.getContext("2d").drawImage(F,0,0,I,X);const xe=ce.toDataURL("image/jpeg",.65);T(ve=>[...ve,xe].slice(0,3))},F.src=V.target.result},G.readAsDataURL(A)})}}),a.jsx("span",{children:"📸 Añadir Fotos"})]}),Ze.length>0&&a.jsx("div",{className:"uploaded-previews-grid",style:{marginTop:"8px"},children:Ze.map((v,S)=>a.jsxs("div",{className:"uploaded-photo-preview",children:[a.jsx("img",{src:v,alt:`Subida ${S+1}`}),a.jsx("button",{type:"button",className:"remove-photo-btn",onClick:()=>T(A=>A.filter((G,V)=>V!==S)),children:"❌"})]},S))})]})]})]}),a.jsx("button",{type:"submit",className:`btn-glow btn-glow-cyan submit-btn ${h?"loading":""}`,disabled:h,children:h?"Guardando...":W?"Actualizar Rating":"Enviar Rating"})]})]}),a.jsxs("div",{className:"reviews-feed",children:[a.jsx("h4",{className:"feed-title",children:"Opiniones de la comunidad"}),w.length>0?a.jsx("div",{className:"feed-list",children:w.map(v=>a.jsxs("div",{className:"feed-item glass-card",children:[a.jsxs("div",{className:"feed-user-row",children:[a.jsx("img",{src:v.avatar,alt:v.author,className:"feed-avatar"}),a.jsxs("div",{className:"feed-user-meta",children:[a.jsx("span",{className:"feed-username",children:v.author}),a.jsx("span",{className:"feed-date",children:new Date(v.timestamp).toLocaleDateString("es-CL",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})})]}),a.jsx("div",{className:"feed-item-stars",children:a.jsx(Ba,{rating:v.score,size:12})})]}),v.comment&&a.jsx("p",{className:"feed-comment",children:v.comment})]},v.id))}):a.jsx("div",{className:"empty-reviews-state",children:"¡Sé el primero en calificar esta película! Selecciona tus estrellas arriba."})]})]})]})]}),a.jsx("canvas",{ref:$e,width:600,height:900,style:{display:"none"}}),He&&a.jsx("div",{className:"sheet-modal-overlay animate-fade-in",onClick:()=>Pe(!1),children:a.jsxs("div",{className:"sheet-modal-content glass-card animate-scale-in",onClick:v=>v.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{className:"modal-title",children:"💌 Tu Tarjeta de Cita"}),a.jsx("button",{className:"btn-close-modal",onClick:()=>Pe(!1),children:"❌"})]}),a.jsx("p",{className:"modal-desc",children:"Personaliza el mensaje y descarga la tarjeta para enviarla por WhatsApp."}),a.jsx("div",{className:"card-preview-container",children:tt?a.jsx("img",{src:tt,alt:"Tarjeta de Cita",className:"date-card-preview-img"}):a.jsx("div",{className:"card-preview-loading",children:a.jsx("span",{children:"🎨 Generando tu tarjeta..."})})}),a.jsxs("div",{className:"input-group",style:{marginTop:"12px",width:"100%"},children:[a.jsx("label",{className:"input-label",style:{fontSize:"11px",color:"var(--text-secondary)"},children:"Escribe una frase romántica o personalizada:"}),a.jsx("input",{type:"text",className:"modal-message-input",value:yt,onChange:v=>et(v.target.value.substring(0,36)),placeholder:"Te invito al cine 💌",style:{width:"100%",background:"rgba(0, 0, 0, 0.25)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"8px",padding:"8px 12px",color:"#fff",fontSize:"13px",marginTop:"4px",outline:"none"}})]}),a.jsxs("div",{className:"modal-actions",style:{display:"flex",gap:"10px",width:"100%",marginTop:"16px"},children:[a.jsx("button",{type:"button",className:"btn-glow btn-glow-purple",style:{flex:1,padding:"10px 0",fontSize:"13px"},onClick:()=>{const v=document.createElement("a");v.download=`Cita_${e.title.replace(/\s+/g,"_")}.png`,v.href=tt,v.click()},disabled:!tt,children:"📥 Descargar PNG"}),a.jsx("button",{type:"button",className:"btn-secondary",style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.05)",borderRadius:"10px",color:"var(--text-primary)",padding:"10px 16px",fontSize:"13px",cursor:"pointer"},onClick:()=>Pe(!1),children:"Cerrar"})]})]})}),Qe&&a.jsxs("div",{className:"sheet-lightbox-overlay",onClick:()=>L(null),children:[a.jsx("button",{className:"sheet-lightbox-close",onClick:()=>L(null),children:a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),Qe.photos.length>1&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"sheet-lightbox-nav prev",onClick:v=>{v.stopPropagation();const S=Qe.photos.length,A=(Qe.index-1+S)%S;L({photos:Qe.photos,index:A})},children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:a.jsx("polyline",{points:"15 18 9 12 15 6"})})}),a.jsx("button",{className:"sheet-lightbox-nav next",onClick:v=>{v.stopPropagation();const S=Qe.photos.length,A=(Qe.index+1)%S;L({photos:Qe.photos,index:A})},children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:a.jsx("polyline",{points:"9 6 15 12 9 18"})})})]}),a.jsx("img",{src:Qe.photos[Qe.index],alt:"Recuerdo en detalle",className:"sheet-lightbox-photo",onClick:v=>v.stopPropagation()})]}),a.jsx("style",{jsx:"true",children:`
        .bottom-sheet-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 500;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .bottom-sheet-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .bottom-sheet-wrapper {
          position: relative;
          background: rgba(10, 12, 22, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-top: 1.5px solid rgba(255, 42, 95, 0.25);
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
          max-height: 85%;
          min-height: 50%;
          display: flex;
          flex-direction: column;
          z-index: 510;
          box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 42, 95, 0.06);
          overflow: hidden;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .drag-handle {
          width: 48px;
          height: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          margin: 12px auto 6px auto;
          cursor: pointer;
          flex-shrink: 0;
        }

        .sheet-quick-header {
          display: flex;
          gap: 16px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        .sheet-poster {
          width: 80px;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
        }

        .sheet-header-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sheet-title {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .sheet-original-title {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .sheet-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }

        .sheet-badge-tag {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 700;
          padding: 2.5px 6px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sheet-badge-tag.class {
          color: var(--accent-cyan);
          border-color: rgba(6, 182, 212, 0.2);
          background: rgba(6, 182, 212, 0.04);
        }

        .sheet-rating-summary {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
        }

        .star-gold {
          color: var(--accent-gold);
          font-size: 16px;
        }

        .summary-score {
          font-weight: 800;
          font-size: 14px;
          color: var(--text-primary);
        }

        .summary-count {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .sheet-rating-summary.unrated {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Tabs inside sheet */
        .sheet-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.01);
          flex-shrink: 0;
        }

        .sheet-tab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          padding: 15px 0;
          cursor: pointer;
          position: relative;
          transition: all 0.25s ease;
        }

        .sheet-tab-btn.active {
          color: var(--text-primary);
          font-weight: 800;
        }

        .sheet-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-rose), var(--accent-cyan));
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          box-shadow: 0 -2px 12px rgba(255, 42, 95, 0.7);
        }

        /* Scrollable Content */
        .bottom-sheet-content {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          -webkit-overflow-scrolling: touch;
        }

        .tab-pane {
          width: 100%;
        }

        /* Dates Horizontal Slider */
        .dates-horizontal-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 14px;
          flex-shrink: 0;
          scrollbar-width: none;
        }

        .dates-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .date-pill-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 12px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .date-pill-btn:active {
          transform: scale(0.95);
        }

        .date-pill-btn.active {
          background: rgba(255, 42, 95, 0.08);
          border-color: rgba(255, 42, 95, 0.35);
          color: var(--accent-rose);
          box-shadow: 0 0 12px rgba(255, 42, 95, 0.2);
        }

        /* Cinemas & Showtimes cards */
        .cinemas-showtimes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 20px;
        }

        .cinema-group-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(16, 20, 35, 0.35);
          padding: 12px;
        }

        .cinema-group-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
          border-left: 3px solid var(--accent-purple);
          padding-left: 8px;
        }

        .formats-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .format-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .format-name-badge {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.5px;
          background: rgba(6, 182, 212, 0.08);
          width: fit-content;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .showtimes-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .showtime-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        /* Ficha Info CSS */
        .info-pane {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .info-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .info-text {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 14px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-item.full-width {
          grid-column: span 2;
        }

        .actors-list-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .actor-tag {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          color: var(--text-primary);
        }

        .trailer-section {
          margin-top: 10px;
        }

        .btn-glow-youtube {
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
          text-decoration: none;
          width: 100%;
        }

        .meta-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-val {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Opinions panel CSS */
        .reviews-pane {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 24px;
        }

        .review-form-card {
          border-color: rgba(6, 182, 212, 0.15);
          background: rgba(6, 182, 212, 0.02);
        }

        .form-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-subtitle {
          font-size: 10px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: block;
        }

        .stars-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stars-selector-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .score-desc-text {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-gold);
        }

        .review-textarea {
          width: 100%;
          height: 70px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12px;
          padding: 8px 12px;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .review-textarea:focus {
          border-color: var(--accent-cyan);
        }

        .submit-btn {
          width: 100%;
          padding: 10px;
          font-size: 13px;
          border-radius: 10px;
        }

        .reviews-feed {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feed-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feed-item {
          padding: 10px;
          border-color: rgba(255, 255, 255, 0.02);
          background: rgba(255, 255, 255, 0.01);
        }

        .feed-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .feed-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1e1b4b;
        }

        .feed-user-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .feed-username {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .feed-date {
          font-size: 8px;
          color: var(--text-muted);
        }

        .feed-comment {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.15);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .empty-reviews-state {
          text-align: center;
          font-size: 11px;
          color: var(--text-muted);
          padding: 20px 0;
          border: 1px dashed rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .empty-state {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          padding: 30px 0;
        }

        /* --- Estilos de Cartelera Interactiva (Idea A) --- */
        .showtimes-section {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 16px;
          margin-top: 8px;
        }

        .empty-showtimes {
          padding: 24px;
          text-align: center;
        }

        .no-showtimes-text {
          font-size: 11px;
          color: var(--text-muted);
        }

        .cinema-selector-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }

        .cinema-selector-row::-webkit-scrollbar {
          display: none;
        }

        .cinema-selector-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 10px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cinema-selector-btn.active {
          background: rgba(6, 182, 212, 0.08);
          border-color: rgba(6, 182, 212, 0.3);
          color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.15);
        }

        .date-selector-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-top: 10px;
          margin-bottom: 12px;
          scrollbar-width: none;
          padding-bottom: 4px;
        }

        .date-selector-row::-webkit-scrollbar {
          display: none;
        }

        /* --- Calendario Semanal (Visual de 7 Días) --- */
        .calendar-date-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          min-width: 58px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .calendar-date-btn.empty-showtimes {
          opacity: 0.55;
        }

        .calendar-date-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
          opacity: 1;
        }

        .calendar-date-btn.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.2);
          opacity: 1;
        }

        .calendar-day-name {
          font-size: 8px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .calendar-date-btn.active .calendar-day-name {
          color: var(--accent-cyan);
        }

        .calendar-day-num {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .calendar-date-btn.active .calendar-day-num {
          color: #fff;
        }

        .calendar-month-name {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: lowercase;
          margin-top: 2px;
        }

        .showtimes-dot-indicator {
          width: 4px;
          height: 4px;
          background-color: var(--accent-cyan);
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          box-shadow: 0 0 6px var(--accent-cyan);
        }

        /* --- Banner y Tarjetas de Horarios --- */
        .schedule-status-banner {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 12px;
          align-self: flex-start;
        }

        .banner-dot.green {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
        }

        .banner-text {
          font-size: 10px;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.02em;
        }

        .no-showtimes-scheduled-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 22px 16px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          gap: 6px;
          margin-top: 4px;
        }

        .schedule-icon {
          font-size: 24px;
          margin-bottom: 2px;
        }

        .schedule-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .schedule-text {
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
          max-width: 290px;
        }

        .formats-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .format-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .format-title-tag {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .times-grid-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .time-pill-btn {
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          padding: 6px 14px;
          border-radius: 8px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .time-pill-btn:hover {
          background: rgba(6, 182, 212, 0.12);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.25);
          transform: translateY(-1px);
        }

        .time-pill-btn:active {
          transform: scale(0.95);
        }

        /* --- Estilo de Tráiler Embebido (Idea C) --- */
        .trailer-embed-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(239, 68, 68, 0.05);
        }

        .trailer-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* --- Registro de Visita (Idea 6) --- */
        .visit-register-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(139, 92, 246, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 12px;
          padding: 12px;
        }

        .visit-register-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-violet);
          letter-spacing: 0.03em;
        }

        .visit-fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .visit-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .visit-field-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visit-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 7px 10px;
          font-size: 11px;
          color: var(--text-primary);
          font-family: var(--font-body);
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s ease;
          color-scheme: dark;
        }

        .visit-input:focus {
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.06);
        }

        /* --- Nuevo Diseño de Botones de Cine (Pills) --- */
        .cinema-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .cinema-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .cinema-pill-btn:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.3);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .cinema-pill-btn.selected {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          border-color: var(--accent-violet);
          color: #fff;
          font-weight: 700;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
        }

        .cinema-pill-btn:active {
          transform: scale(0.96);
        }

        /* --- Modo Lectura (Visita Bloqueada en Actualización) --- */
        .visit-locked-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .visit-locked-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-violet);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visit-locked-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .visit-locked-pill {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: var(--accent-violet);
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .visit-locked-pill.cinema {
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        .visit-locked-pill.food {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: #a78bfa;
        }

        .visit-locked-pill.mood {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.2);
          color: #f472b6;
        }

        .visit-locked-hint {
          font-size: 9px;
          color: var(--text-muted);
          margin-top: 2px;
          display: block;
          font-style: italic;
        }

        /* --- Planificador de Cita e Invitaciones --- */
        .invite-action-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .invite-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .invite-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-violet);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .invite-details {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .invite-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 10px;
          flex-shrink: 0;
        }

        /* --- Modales de Previsualización de Tarjeta --- */
        .sheet-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1000;
        }

        .sheet-modal-content {
          width: 100%;
          max-width: 420px;
          background: rgba(30, 27, 75, 0.6);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 8px;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .btn-close-modal {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
        }

        .modal-desc {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          margin: 0 0 16px 0;
        }

        .card-preview-container {
          width: 100%;
          aspect-ratio: 2/3;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .date-card-preview-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-preview-loading {
          color: var(--text-muted);
          font-size: 12px;
        }

        /* --- Recuerdos / Subida de Fotos --- */
        .photos-uploader-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .photo-upload-btn-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.06);
          border: 1.5px dashed rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 12px;
          color: #a78bfa;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }

        .photo-upload-btn-label:hover {
          background: rgba(139, 92, 246, 0.12);
          border-color: var(--accent-violet);
          color: #fff;
        }

        .photo-file-input {
          display: none;
        }

        .uploaded-previews-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .uploaded-photo-preview {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .uploaded-photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-photo-btn {
          position: absolute;
          top: 2px;
          right: 2px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .remove-photo-btn:hover {
          transform: scale(1.1);
        }

        /* --- Fotos Guardadas en Cita (Cápsula) --- */
        .locked-photos-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .locked-photo-thumb {
          width: 72px;
          height: 72px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .locked-photo-thumb:hover {
          transform: scale(1.05);
          border-color: var(--accent-violet);
        }

        .locked-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- Lightbox de Fotos de la Cita --- */
        .sheet-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.93);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1200;
          animation: fadeIn 0.25s ease-out;
        }

        .sheet-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .sheet-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .sheet-lightbox-photo {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sheet-lightbox-nav {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .sheet-lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .sheet-lightbox-nav.prev {
          left: 20px;
        }

        .sheet-lightbox-nav.next {
          right: 20px;
        }
      `})]})}function If({onLoginSuccess:e}){const[t,n]=k.useState(!0),[r,i]=k.useState(""),[o,l]=k.useState(""),[s,c]=k.useState(""),[p,g]=k.useState(""),[u,h]=k.useState(!1),b=r.trim().toLowerCase(),w=b?`https://api.dicebear.com/7.x/pixel-art/svg?seed=${b}`:"https://api.dicebear.com/7.x/pixel-art/svg?seed=cineglowdefault",y=async E=>{if(E.preventDefault(),g(""),!r.trim()||!o.trim()){g("Por favor, ingresa tu usuario y contraseña.");return}if(!t&&!s.trim()){g("Por favor, ingresa tu nombre.");return}h(!0);const m=t?"/api/auth/login":"/api/auth/register",d=t?{username:r.trim(),password:o.trim()}:{username:r.trim(),password:o.trim(),name:s.trim()};try{const f=await fetch(`${se}${m}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}),x=await f.json();f.ok?(localStorage.setItem("cineglow_user",JSON.stringify(x)),e(x)):g(x.error||"Algo salió mal. Inténtalo de nuevo.")}catch(f){console.error(f),g("Error de conexión. Asegúrate de que el servidor esté encendido.")}finally{h(!1)}};return a.jsxs("div",{className:"auth-screen-container animate-fade-in",children:[a.jsxs("div",{className:"auth-branding-wrap",children:[a.jsxs("h1",{className:"auth-logo",children:["Cine",a.jsx("span",{children:"Glow"})]}),a.jsx("p",{className:"auth-tagline",children:"Puntúa la cartelera de Santiago Oriente"})]}),a.jsxs("div",{className:"auth-card glass-card animate-scale-in",children:[a.jsxs("div",{className:"avatar-preview-section",children:[a.jsx("div",{className:"avatar-ring",children:a.jsx("img",{src:w,alt:"Avatar Preview",className:"dynamic-avatar"})}),!t&&a.jsx("span",{className:"avatar-helper-text",children:"¡Tu avatar dinámico se genera con tu usuario!"})]}),a.jsxs("div",{className:"auth-tabs",children:[a.jsx("button",{className:`auth-tab-btn ${t?"active":""}`,onClick:()=>{n(!0),g("")},children:"Iniciar Sesión"}),a.jsx("button",{className:`auth-tab-btn ${t?"":"active"}`,onClick:()=>{n(!1),g("")},children:"Crear Cuenta"})]}),p&&a.jsxs("div",{className:"auth-error-card",children:[a.jsx("span",{children:"⚠️"}),a.jsx("p",{className:"error-text",children:p})]}),a.jsxs("form",{onSubmit:y,className:"auth-form",children:[!t&&a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{className:"input-label",children:"Nombre Completo"}),a.jsxs("div",{className:"input-field-wrap",children:[a.jsx("span",{className:"input-icon",children:"👤"}),a.jsx("input",{type:"text",className:"auth-input-field",placeholder:"Tu nombre de pantalla",value:s,onChange:E=>c(E.target.value),maxLength:25})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{className:"input-label",children:"Nombre de Usuario"}),a.jsxs("div",{className:"input-field-wrap",children:[a.jsx("span",{className:"input-icon",children:"@"}),a.jsx("input",{type:"text",className:"auth-input-field",placeholder:"ej: joseUribe",value:r,onChange:E=>i(E.target.value),maxLength:15,autoComplete:"username"})]})]}),a.jsxs("div",{className:"form-input-group",children:[a.jsx("label",{className:"input-label",children:"Contraseña"}),a.jsxs("div",{className:"input-field-wrap",children:[a.jsx("span",{className:"input-icon",children:"🔑"}),a.jsx("input",{type:"password",className:"auth-input-field",placeholder:"••••••••",value:o,onChange:E=>l(E.target.value),autoComplete:"current-password"})]})]}),a.jsx("button",{type:"submit",className:`btn-glow btn-glow-cyan auth-submit-btn ${u?"loading":""}`,disabled:u,children:u?"Cargando...":t?"Ingresar a CineGlow":"Registrarse ahora"})]})]}),a.jsx("style",{jsx:"true",children:`
        .auth-screen-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 24px 16px;
          background: radial-gradient(circle at center, #0e111c 0%, #050608 100%);
          overflow-y: auto;
        }

        .auth-branding-wrap {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-logo span {
          background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-tagline {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .auth-card {
          width: 100%;
          max-width: 380px;
          border-color: rgba(139, 92, 246, 0.25);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          padding: 24px 20px;
          background: rgba(12, 14, 23, 0.85);
        }

        /* Dynamic Avatar Section */
        .avatar-preview-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .avatar-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          padding: 3px;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .avatar-ring:hover {
          transform: scale(1.08) rotate(5deg);
        }

        .dynamic-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #141332;
          border: 2px solid #0c0e17;
        }

        .avatar-helper-text {
          font-size: 9px;
          color: var(--accent-cyan);
          font-weight: 600;
          text-align: center;
        }

        /* Tab Switcher */
        .auth-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .auth-tab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          padding: 8px 0;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .auth-tab-btn.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }

        /* Error widget */
        .auth-error-card {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          animation: fadeInUp 0.3s ease;
        }

        .error-text {
          font-size: 11px;
          color: #ef4444;
          line-height: 1.3;
          font-weight: 500;
        }

        /* Input Forms CSS */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
        }

        .input-field-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          font-size: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .auth-input-field {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12px;
          padding: 10px 12px 10px 34px;
          outline: none;
          transition: all 0.2s ease;
        }

        .auth-input-field:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          border-radius: 12px;
          margin-top: 8px;
        }
      `})]})}function Rf({ratingsList:e,movies:t,onMovieClick:n}){const[r,i]=k.useState({});k.useEffect(()=>{if(e){const s={};e.forEach(c=>{const g=(c.id.charCodeAt(c.id.length-1)||0)%12+3;s[c.id]={count:g,liked:!1}}),i(s)}},[e]);const o=(s,c)=>{s.stopPropagation(),i(p=>{const g=p[c]||{count:5,liked:!1};return{...p,[c]:{count:g.liked?g.count-1:g.count+1,liked:!g.liked}}})},l=s=>{const c=t.find(p=>p.key===s);c&&n&&n(c)};return a.jsxs("div",{className:"social-tab-container animate-scale-in",children:[a.jsxs("div",{className:"social-intro-card glass-card",children:[a.jsx("div",{className:"intro-glow-circle",children:"🗣️"}),a.jsxs("div",{className:"intro-text-wrap",children:[a.jsx("h3",{children:"Opiniones de Santiago Oriente"}),a.jsx("p",{children:"Mira lo que los críticos de la zona dicen sobre los últimos estrenos en Cinépolis. ¡Únete a la conversación!"})]})]}),a.jsx("div",{className:"social-feed-list",children:e&&e.length>0?e.map(s=>{const c=r[s.id]||{count:5,liked:!1};return a.jsxs("div",{className:"social-feed-card glass-card animate-scale-in",onClick:()=>l(s.movieKey),children:[a.jsxs("div",{className:"feed-card-header",children:[a.jsx("img",{src:s.avatar,alt:s.author,className:"feed-card-avatar"}),a.jsxs("div",{className:"feed-user-info",children:[a.jsxs("div",{className:"name-row",children:[a.jsx("span",{className:"feed-author-name",children:s.author}),a.jsxs("span",{className:"social-user-level",children:["NV. ",Math.floor(s.id.charCodeAt(s.id.length-1)%4)+1]})]}),a.jsx("span",{className:"feed-timestamp",children:new Date(s.timestamp).toLocaleDateString("es-CL",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})})]}),a.jsx("div",{className:"feed-stars-wrap",children:a.jsx(Ba,{rating:s.score,size:11})})]}),a.jsxs("div",{className:"feed-card-body",children:[a.jsxs("div",{className:"reviewed-movie-tag",children:[a.jsx("span",{children:"🎬"})," ",s.movieTitle]}),(s.watchedAt||s.cinemaName||s.menuOption||s.moodOption)&&a.jsxs("div",{className:"social-visit-pills",children:[s.watchedAt&&a.jsxs("span",{className:"social-visit-pill",children:["📅 ",new Date(s.watchedAt+"T12:00:00").toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"})]}),s.cinemaName&&a.jsxs("span",{className:"social-visit-pill cinema",children:["🎭 ",s.cinemaName]}),s.menuOption&&a.jsxs("span",{className:"social-visit-pill food",children:["🍿 ",s.menuOption]}),s.moodOption&&a.jsx("span",{className:"social-visit-pill mood",children:s.moodOption==="Increíble"?"🥰 Increíble":s.moodOption==="Risas"?"😂 Risas":s.moodOption==="Lloramos"?"😢 Lloramos":s.moodOption==="Dormimos"?"😴 Zzz":"🍿 Concentrados"})]}),s.comment?a.jsxs("p",{className:"feed-comment-text",children:['"',s.comment,'"']}):a.jsxs("p",{className:"feed-comment-text empty",children:["Le dio una puntuación de ",s.score," estrellas sin comentario escrito."]}),s.photos&&s.photos.length>0&&a.jsx("div",{className:"feed-photos-grid",children:s.photos.map((p,g)=>a.jsx("div",{className:"feed-photo-thumb",children:a.jsx("img",{src:p,alt:`Recuerdo ${g+1}`})},g))})]}),a.jsxs("div",{className:"feed-card-footer",children:[a.jsxs("button",{className:`like-social-btn ${c.liked?"liked":""}`,onClick:p=>o(p,s.id),children:[a.jsx("svg",{className:"heart-icon animate-pulse-fast",width:"14",height:"14",viewBox:"0 0 24 24",fill:c.liked?"currentColor":"none",stroke:"currentColor",strokeWidth:"2.5",children:a.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})}),a.jsxs("span",{children:[c.liked?"Te gusta":"Me gusta"," • ",c.count]})]}),a.jsxs("div",{className:"click-to-view-movie-hint",children:[a.jsx("span",{children:"Ver horarios"}),a.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:a.jsx("polyline",{points:"9 18 15 12 9 6"})})]})]})]},s.id)}):a.jsxs("div",{className:"empty-social-feed glass-card",children:[a.jsx("span",{className:"empty-social-emoji",children:"💬"}),a.jsx("h4",{children:"Aún no hay opiniones de la comunidad"}),a.jsx("p",{children:"Sé el primero en calificar una película para ver tu reseña aquí en tiempo real."})]})}),a.jsx("style",{jsx:"true",children:`
        .social-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 30px;
        }

        .social-intro-card {
          border-color: rgba(6, 182, 212, 0.15);
          background: rgba(6, 182, 212, 0.02);
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .intro-glow-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.15);
          flex-shrink: 0;
        }

        .intro-text-wrap h3 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .intro-text-wrap p {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Feed list */
        .social-feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-feed-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.35);
          padding: 14px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s ease;
        }

        .social-feed-card:active {
          transform: scale(0.98);
          border-color: rgba(139, 92, 246, 0.25);
        }

        .feed-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feed-card-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e1b4b;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .feed-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .feed-author-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .social-user-level {
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 800;
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.05);
          padding: 1px 4px;
          border-radius: 4px;
          letter-spacing: 0.2px;
        }

        .feed-timestamp {
          font-size: 8px;
          color: var(--text-muted);
        }

        .feed-stars-wrap {
          flex-shrink: 0;
        }

        /* Body details */
        .feed-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .reviewed-movie-tag {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.12);
          width: fit-content;
          padding: 3px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .feed-comment-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.45;
          font-style: italic;
          background: rgba(0, 0, 0, 0.18);
          padding: 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.01);
        }

        .feed-comment-text.empty {
          color: var(--text-muted);
          font-style: normal;
        }

        /* Footer details */
        .feed-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 10px;
          margin-top: 4px;
        }

        .like-social-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .like-social-btn:hover {
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.05);
          border-color: rgba(244, 63, 94, 0.15);
        }

        .like-social-btn.liked {
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.1);
          border-color: rgba(244, 63, 94, 0.3);
          box-shadow: 0 0 10px rgba(244, 63, 94, 0.15);
        }

        .like-social-btn.liked .heart-icon {
          animation: heartBounce 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes heartBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        .click-to-view-movie-hint {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 700;
          transition: color 0.2s;
        }

        .social-feed-card:hover .click-to-view-movie-hint {
          color: var(--accent-cyan);
        }

        /* Empty state */
        .empty-social-feed {
          text-align: center;
          padding: 60px 20px;
          border-color: rgba(255, 255, 255, 0.04);
        }

        .empty-social-emoji {
          font-size: 40px;
          margin-bottom: 12px;
          display: block;
        }

        .empty-social-feed h4 {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-social-feed p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Pills de visita en el feed social */
        .social-visit-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 4px;
          margin-bottom: 2px;
        }

        .social-visit-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 9.5px;
          font-weight: 600;
          color: rgba(139, 92, 246, 0.9);
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 20px;
          padding: 2px 8px;
        }

        .social-visit-pill.cinema {
          color: rgba(6, 182, 212, 0.9);
          background: rgba(6, 182, 212, 0.07);
          border-color: rgba(6, 182, 212, 0.18);
        }

        .social-visit-pill.food {
          color: #a78bfa;
          background: rgba(139, 92, 246, 0.07);
          border-color: rgba(139, 92, 246, 0.18);
        }

        .social-visit-pill.mood {
          color: #f472b6;
          background: rgba(236, 72, 153, 0.07);
          border-color: rgba(236, 72, 153, 0.18);
        }

        .feed-photos-grid {
          display: flex;
          gap: 6px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .feed-photo-thumb {
          width: 54px;
          height: 54px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.2s ease;
        }

        .feed-photo-thumb:hover {
          transform: scale(1.05);
        }

        .feed-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `})]})}function $f({activeProfile:e,onMovieClick:t,watchlist:n,onRefreshWatchlist:r}){const[i,o]=k.useState([]),[l,s]=k.useState("all"),[c,p]=k.useState(!0),[g,u]=k.useState(!1),[h,b]=k.useState(null),w=async()=>{p(!0);try{const f=await fetch(`${se}/api/upcoming`);if(f.ok){const x=await f.json();o(x)}}catch(f){console.error("Error al cargar estrenos:",f)}finally{p(!1)}};k.useEffect(()=>{w()},[]);const y=async(f,x)=>{try{const j=await fetch(`${se}/api/watchlist/toggle`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.id,movieKey:f})});if(j.ok){const z=await j.json();if(r&&r(),z.isLiked&&z.hasMatch){const N=i.find(P=>P.key===f);b(N),u(!0)}}}catch(j){console.error("Error con watchlist:",j)}},E=()=>{const f={"01":"Enero","02":"Febrero","03":"Marzo","04":"Abril","05":"Mayo","06":"Junio","07":"Julio","08":"Agosto","09":"Septiembre",10:"Octubre",11:"Noviembre",12:"Diciembre"},x=new Set;return i.forEach(j=>{const z=j.releaseDate.split("-")[1];z&&f[z]&&x.add(z)}),Array.from(x).sort().map(j=>({code:j,name:f[j]}))},m=i.filter(f=>l==="all"?!0:f.releaseDate.split("-")[1]===l),d=f=>{const[x,j,z]=f.split("-"),N=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];return`${parseInt(z)} de ${N[parseInt(j)-1]}, ${x}`};return a.jsxs("div",{className:"upcoming-tab-container",children:[a.jsxs("div",{className:"upcoming-header glass-card",children:[a.jsx("div",{className:"header-icon-wrap",children:"🍿"}),a.jsxs("div",{className:"header-info",children:[a.jsx("h3",{children:"Próximos Estrenos"}),a.jsxs("p",{children:["Explora lo que viene a Chile en los siguientes meses. ¡Si a ambos les gusta la misma película, ocurrirá un ",a.jsx("strong",{children:"Cine-Match! 💘"})]})]})]}),!c&&i.length>0&&a.jsxs("div",{className:"month-filters horizontal-scroll",children:[a.jsx("button",{type:"button",className:`month-chip ${l==="all"?"active":""}`,onClick:()=>s("all"),children:"🗓️ Todos"}),E().map(f=>a.jsx("button",{type:"button",className:`month-chip ${l===f.code?"active":""}`,onClick:()=>s(f.code),children:f.name},f.code))]}),a.jsx("div",{className:"upcoming-movies-area",children:c?a.jsx("div",{className:"skeleton-grid",children:[1,2,3].map(f=>a.jsxs("div",{className:"skeleton-card glass-card",children:[a.jsx("div",{className:"skeleton-poster"}),a.jsx("div",{className:"skeleton-info"})]},f))}):m.length>0?a.jsx("div",{className:"upcoming-grid",children:m.map(f=>{const x=n.find(N=>N.userId===e.id&&N.movieKey===f.key),j=n.find(N=>N.userId!==e.id&&N.movieKey===f.key),z=x&&j;return a.jsxs("div",{className:`upcoming-card glass-card ${z?"match-card-glow":""}`,children:[a.jsxs("div",{className:"card-poster-wrap",children:[a.jsx("img",{src:f.poster,alt:f.title,className:"card-poster",onError:N=>{N.target.onerror=null,N.target.style.display="none",N.target.nextSibling.style.display="flex"}}),a.jsxs("div",{className:"poster-fallback-card",children:[a.jsx("span",{children:"🎬"}),a.jsx("p",{children:f.title})]}),z&&a.jsx("div",{className:"match-ribbon",children:a.jsx("span",{children:"💘 CITA MATCH"})})]}),a.jsxs("div",{className:"card-content",children:[a.jsxs("div",{className:"card-top-tags",children:[a.jsxs("span",{className:"release-date-tag",children:["📅 ",d(f.releaseDate)]}),f.genres&&f.genres.slice(0,2).map(N=>a.jsx("span",{className:"genre-tag",children:N},N))]}),a.jsx("h4",{className:"movie-title",children:f.title}),a.jsx("p",{className:"movie-synopsis",children:f.synopsis}),a.jsxs("div",{className:"watchlist-actions-row",children:[a.jsxs("div",{className:"watchlist-action-col",children:[a.jsx("span",{className:"action-label",children:"¿Te tinca verla?"}),a.jsxs("button",{type:"button",className:`heart-btn my-heart ${x?"active":""}`,onClick:()=>y(f.key,f.title),children:[a.jsx("svg",{className:"heart-svg",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"})}),a.jsx("span",{children:x?"¡Me tinca! ❤️":"Quiero ver"})]})]}),a.jsxs("div",{className:"watchlist-action-col",children:[a.jsx("span",{className:"action-label",children:"A tu pareja..."}),a.jsxs("div",{className:`partner-heart-pill ${j?"active":""}`,children:[a.jsx("svg",{className:"heart-svg small-heart",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"})}),a.jsx("span",{children:j?"¡Le tinca! 💖":"Aún no opina"})]})]})]})]})]},f.key)})}):a.jsxs("div",{className:"empty-upcoming-container glass-card",children:[a.jsx("span",{className:"empty-emoji",children:"🗓️"}),a.jsx("h3",{children:"No hay estrenos para este mes"}),a.jsx("p",{children:"Intenta seleccionando otra fecha en los filtros superiores."})]})}),g&&h&&a.jsx("div",{className:"match-modal-backdrop",children:a.jsxs("div",{className:"match-modal-card glass-card animate-scale-in",children:[a.jsxs("div",{className:"match-particles",children:[a.jsx("span",{className:"particle p1",children:"💖"}),a.jsx("span",{className:"particle p2",children:"🍿"}),a.jsx("span",{className:"particle p3",children:"🥰"}),a.jsx("span",{className:"particle p4",children:"💖"}),a.jsx("span",{className:"particle p5",children:"🍿"}),a.jsx("span",{className:"particle p6",children:"🔥"})]}),a.jsxs("div",{className:"match-modal-header",children:[a.jsx("span",{className:"match-sparkle",children:"✨"}),a.jsx("h2",{children:"¡CINE-MATCH!"}),a.jsx("span",{className:"match-sparkle",children:"✨"})]}),a.jsx("p",{className:"match-subtitle",children:"¡Tenemos una cita pendiente! 💘"}),a.jsxs("div",{className:"match-movie-preview",children:[a.jsx("img",{src:h.poster,alt:h.title,className:"match-preview-poster"}),a.jsxs("div",{className:"match-movie-info",children:[a.jsx("h3",{children:h.title}),a.jsxs("span",{className:"match-date-badge",children:["📅 Estreno: ",d(h.releaseDate)]}),a.jsx("p",{children:"Ambos marcaron esta película como favorita. Se guardó automáticamente en la lista de citas pendientes compartidas."})]})]}),a.jsx("button",{type:"button",className:"btn-glow btn-glow-purple match-celebrate-btn",onClick:()=>{u(!1),b(null)},children:"🍿 ¡Genial! A planear la salida"})]})})]})}function Af({activeProfile:e,onMovieClick:t,watchlist:n,onRefreshWatchlist:r}){const[i,o]=k.useState([]),[l,s]=k.useState(!0),c=async()=>{s(!0);try{const y=await fetch(`${se}/api/upcoming`);if(y.ok){const E=await y.json();o(E)}}catch(y){console.error("Error al cargar la watchlist:",y)}finally{s(!1)}};k.useEffect(()=>{c()},[]);const p=async y=>{try{(await fetch(`${se}/api/watchlist/toggle`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e.id,movieKey:y})})).ok&&r&&r()}catch(E){console.error("Error al quitar de la watchlist:",E)}},g=[],u=[],h=[];l||i.forEach(y=>{const E=n.find(d=>d.userId===e.id&&d.movieKey===y.key),m=n.find(d=>d.userId!==e.id&&d.movieKey===y.key);E&&m?g.push(y):E?u.push(y):m&&h.push(y)});const b=y=>{const[E,m,d]=y.split("-"),f=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];return`${parseInt(d)} ${f[parseInt(m)-1]} ${E}`},w=g.length>0||u.length>0||h.length>0;return a.jsxs("div",{className:"watchlist-tab-container",children:[a.jsxs("div",{className:"watchlist-header glass-card",children:[a.jsx("div",{className:"header-icon-wrap",children:"❤️"}),a.jsxs("div",{className:"header-info",children:[a.jsx("h3",{children:"Watchlist Pendiente"}),a.jsx("p",{children:"Organiza tus próximas visitas al cine. Las películas marcadas por ambos se transforman en citas oficiales."})]})]}),l?a.jsxs("div",{className:"watchlist-skeleton-area",children:[a.jsx("div",{className:"skeleton-line"}),a.jsx("div",{className:"skeleton-line"})]}):w?a.jsxs("div",{className:"watchlist-content",children:[g.length>0&&a.jsxs("div",{className:"watchlist-section",children:[a.jsxs("h4",{className:"section-title match-title",children:["🍿 Nuestras Citas Pendientes ",a.jsx("span",{className:"badge-count",children:g.length})]}),a.jsx("div",{className:"watchlist-list matches-list",children:g.map(y=>a.jsxs("div",{className:"watchlist-card glass-card match-card",children:[a.jsx("img",{src:y.poster,alt:y.title,className:"w-card-poster"}),a.jsxs("div",{className:"w-card-info",children:[a.jsxs("span",{className:"w-date-tag",children:["Estreno: ",b(y.releaseDate)]}),a.jsx("h4",{className:"w-title",children:y.title}),a.jsxs("div",{className:"match-partner-row",children:[a.jsx("span",{className:"match-tag-pill active",children:"Tú ❤️"}),a.jsx("span",{className:"match-tag-pill partner",children:"Ella 💖"})]})]}),a.jsx("button",{type:"button",className:"w-remove-btn",onClick:()=>p(y.key),title:"Quitar",children:"❌"})]},y.key))})]}),u.length>0&&a.jsxs("div",{className:"watchlist-section",children:[a.jsxs("h4",{className:"section-title",children:["💖 Mis Antojos ",a.jsx("span",{className:"badge-count",children:u.length})]}),a.jsx("div",{className:"watchlist-list",children:u.map(y=>a.jsxs("div",{className:"watchlist-card glass-card",children:[a.jsx("img",{src:y.poster,alt:y.title,className:"w-card-poster"}),a.jsxs("div",{className:"w-card-info",children:[a.jsxs("span",{className:"w-date-tag sub",children:["Estreno: ",b(y.releaseDate)]}),a.jsx("h4",{className:"w-title",children:y.title}),a.jsx("p",{className:"w-hint-text",children:"Esperando que le dé corazón para hacer match 🤞"})]}),a.jsx("button",{type:"button",className:"w-remove-btn",onClick:()=>p(y.key),title:"Quitar",children:"❌"})]},y.key))})]}),h.length>0&&a.jsxs("div",{className:"watchlist-section",children:[a.jsxs("h4",{className:"section-title partner-title",children:["💕 Sus Antojos ",a.jsx("span",{className:"badge-count",children:h.length})]}),a.jsx("p",{className:"partner-section-hint",children:"A ella le gustaría ver estas películas. ¡Dale ❤️ en la pestaña Estrenos para programar la cita!"}),a.jsx("div",{className:"watchlist-list",children:h.map(y=>a.jsxs("div",{className:"watchlist-card glass-card partner-card",children:[a.jsx("img",{src:y.poster,alt:y.title,className:"w-card-poster"}),a.jsxs("div",{className:"w-card-info",children:[a.jsxs("span",{className:"w-date-tag sub",children:["Estreno: ",b(y.releaseDate)]}),a.jsx("h4",{className:"w-title",children:y.title}),a.jsx("div",{className:"action-hint-pill",children:a.jsx("span",{children:"💡 Haz Match dando ❤️"})})]})]},y.key))})]})]}):a.jsxs("div",{className:"empty-watchlist glass-card",children:[a.jsx("span",{className:"empty-heart-emoji",children:"💔"}),a.jsx("h4",{children:"¡Aún no hay películas pendientes!"}),a.jsxs("p",{children:["Ve a la pestaña de ",a.jsx("strong",{children:"Estrenos"})," y marca con un corazón las películas que te gustaría ver para empezar a acumular citas."]})]}),a.jsx("style",{jsx:"true",children:`
        .watchlist-tab-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
        }

        .watchlist-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
          border: 1px solid rgba(236, 72, 153, 0.15);
          border-radius: 18px;
        }

        .header-icon-wrap {
          font-size: 32px;
          animation: beat 1.2s infinite ease-in-out;
        }

        .header-info h3 {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          font-family: var(--font-display);
        }

        .header-info p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .watchlist-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .watchlist-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .section-title.match-title {
          color: var(--accent-cyan);
        }

        .section-title.partner-title {
          color: #f472b6;
        }

        .partner-section-hint {
          font-size: 9.5px;
          color: var(--text-muted);
          margin: -4px 0 4px 0;
          line-height: 1.35;
        }

        .badge-count {
          font-size: 9px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 2px 7px;
          border-radius: 10px;
        }

        .match-title .badge-count {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        .watchlist-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .watchlist-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 16px;
          position: relative;
          transition: all 0.2s ease;
        }

        .watchlist-card:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .match-card {
          border-color: rgba(6, 182, 212, 0.2) !important;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);
        }

        .partner-card {
          border-color: rgba(236, 72, 153, 0.15) !important;
          opacity: 0.85;
        }

        .w-card-poster {
          width: 44px;
          height: 66px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        .w-card-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 2px;
        }

        .w-date-tag {
          font-size: 8.5px;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .w-date-tag.sub {
          color: var(--text-muted);
        }

        .w-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .w-hint-text {
          font-size: 9px;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
        }

        .match-partner-row {
          display: flex;
          gap: 6px;
          margin-top: 2px;
        }

        .match-tag-pill {
          font-size: 8px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .match-tag-pill.partner {
          background: rgba(236, 72, 153, 0.06);
          border-color: rgba(236, 72, 153, 0.15);
          color: #ec4899;
        }

        .action-hint-pill {
          font-size: 8px;
          font-weight: 700;
          color: #ec4899;
          background: rgba(236, 72, 153, 0.06);
          border: 1px solid rgba(236, 72, 153, 0.15);
          padding: 2px 6px;
          border-radius: 8px;
          align-self: flex-start;
          margin-top: 2px;
        }

        .w-remove-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 10px;
          opacity: 0.4;
          padding: 8px;
          transition: opacity 0.2s;
        }

        .w-remove-btn:hover {
          opacity: 1;
        }

        .empty-watchlist {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          border-radius: 20px;
        }

        .empty-heart-emoji {
          font-size: 32px;
          animation: pulse 2s infinite ease-in-out;
        }

        .empty-watchlist h4 {
          font-size: 14px;
          color: var(--text-primary);
          margin: 12px 0 6px 0;
        }

        .empty-watchlist p {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
          max-width: 250px;
          line-height: 1.4;
        }

        .watchlist-skeleton-area {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .skeleton-line {
          height: 50px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
        }

        @keyframes beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          40% { transform: scale(1); }
          55% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `})]})}const Ff={Increíble:"🥰",Risas:"😂",Lloramos:"😢",Dormimos:"😴",Concentrados:"🍿"};function Uf(e){if(!e)return null;try{return new Date(e+(e.includes("T")?"":"T12:00:00")).toLocaleDateString("es-CL",{day:"numeric",month:"long",year:"numeric"})}catch{return null}}function Bf({ratingsList:e,activeProfile:t}){const[n,r]=k.useState(null),i=k.useMemo(()=>e?e.filter(u=>u.photos&&Array.isArray(u.photos)&&u.photos.length>0).sort((u,h)=>new Date(h.timestamp)-new Date(u.timestamp)):[],[e]),o=(u,h)=>{r({ratingId:u,photoIndex:h})},l=()=>r(null),s=u=>{if(!n)return;const h=i.find(y=>y.id===n.ratingId);if(!h)return;const b=h.photos.length,w=(n.photoIndex+u+b)%b;r({ratingId:n.ratingId,photoIndex:w})},c=n?i.find(u=>u.id===n.ratingId):null,p=c?c.photos[n.photoIndex]:null,g=u=>{const h=[];for(let b=1;b<=5;b++)h.push(a.jsx("span",{className:`mg-star ${b<=u?"filled":""}`,children:"★"},b));return a.jsx("div",{className:"mg-stars-row",children:h})};return a.jsxs("div",{className:"memory-gallery-container animate-scale-in",children:[a.jsxs("div",{className:"mg-header-card glass-card",children:[a.jsx("div",{className:"mg-header-icon",children:"📸"}),a.jsxs("div",{className:"mg-header-text",children:[a.jsx("h3",{children:"Nuestros Recuerdos"}),a.jsx("p",{children:"Un álbum cronológico de sus citas al cine juntos. Cada foto cuenta una historia de amor en la gran pantalla."})]})]}),i.length>0?a.jsxs("div",{className:"mg-timeline",children:[a.jsx("div",{className:"mg-timeline-line"}),i.map((u,h)=>a.jsxs("div",{className:"mg-timeline-entry",style:{animationDelay:`${h*.08}s`},children:[a.jsx("div",{className:"mg-timeline-dot"}),a.jsxs("div",{className:"mg-memory-card glass-card",children:[a.jsx("h4",{className:"mg-movie-title",children:u.movieTitle}),a.jsx("span",{className:"mg-author",children:u.author}),a.jsxs("div",{className:"mg-pills-row",children:[u.watchedAt&&a.jsxs("span",{className:"mg-pill date",children:["📅 ",Uf(u.watchedAt)]}),u.cinemaName&&a.jsxs("span",{className:"mg-pill cinema",children:["🎭 ",u.cinemaName]}),u.menuOption&&a.jsxs("span",{className:"mg-pill food",children:["🍿 ",u.menuOption]}),u.moodOption&&a.jsxs("span",{className:"mg-pill mood",children:[Ff[u.moodOption]||"🍿"," ",u.moodOption]})]}),g(u.score),a.jsx("div",{className:`mg-photo-grid photos-${Math.min(u.photos.length,3)}`,children:u.photos.slice(0,6).map((b,w)=>a.jsxs("div",{className:"mg-photo-thumb",onClick:()=>o(u.id,w),children:[a.jsx("img",{src:b,alt:`Recuerdo ${w+1}`}),w===5&&u.photos.length>6&&a.jsxs("div",{className:"mg-photo-more",children:["+",u.photos.length-6]})]},w))}),u.comment&&a.jsxs("p",{className:"mg-comment",children:['"',u.comment,'"']})]})]},u.id))]}):a.jsxs("div",{className:"mg-empty-state glass-card",children:[a.jsx("span",{className:"mg-empty-emoji",children:"📷"}),a.jsx("h4",{children:"Aún no hay recuerdos"}),a.jsx("p",{children:"Cuando califiques una película y subas fotos de tu cita, aparecerán aquí como un álbum de recuerdos."})]}),n&&c&&p&&a.jsx("div",{className:"mg-lightbox-overlay",onClick:l,children:a.jsxs("div",{className:"mg-lightbox-content",onClick:u=>u.stopPropagation(),children:[a.jsx("button",{className:"mg-lightbox-close",onClick:l,children:a.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[a.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),c.photos.length>1&&a.jsxs(a.Fragment,{children:[a.jsx("button",{className:"mg-lightbox-nav mg-nav-prev",onClick:()=>s(-1),children:a.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:a.jsx("polyline",{points:"15 18 9 12 15 6"})})}),a.jsx("button",{className:"mg-lightbox-nav mg-nav-next",onClick:()=>s(1),children:a.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:a.jsx("polyline",{points:"9 6 15 12 9 18"})})})]}),a.jsx("img",{className:"mg-lightbox-photo",src:p,alt:c.movieTitle}),c.photos.length>1&&a.jsxs("div",{className:"mg-lightbox-counter",children:[n.photoIndex+1," / ",c.photos.length]}),a.jsxs("div",{className:"mg-lightbox-title",children:[a.jsx("span",{className:"mg-lightbox-movie-icon",children:"🎬"}),c.movieTitle]})]})}),a.jsx("style",{jsx:"true",children:`
        .memory-gallery-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 35px;
        }

        /* ── Header Card ── */
        .mg-header-card {
          border-color: rgba(255, 42, 95, 0.2);
          background: rgba(255, 42, 95, 0.02);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-radius: 22px;
        }

        .mg-header-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 42, 95, 0.06);
          border: 1.5px solid var(--accent-rose);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(255, 42, 95, 0.25);
        }

        .mg-header-text h3 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .mg-header-text p {
          font-family: var(--font-sans);
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* ── Timeline ── */
        .mg-timeline {
          position: relative;
          padding-left: 26px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .mg-timeline-line {
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2.5px;
          background: linear-gradient(180deg, var(--accent-rose) 0%, var(--accent-cyan) 50%, var(--accent-rose) 100%);
          border-radius: 2.5px;
          opacity: 0.7;
          box-shadow: 0 0 8px rgba(255, 42, 95, 0.35);
        }

        .mg-timeline-entry {
          position: relative;
          animation: mgFadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mgFadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mg-timeline-dot {
          position: absolute;
          left: -23px;
          top: 18px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--accent-rose);
          border: 2px solid var(--bg-deep);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.75);
          z-index: 2;
        }

        /* ── Memory Card ── */
        .mg-memory-card {
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.45);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 22px;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .mg-memory-card:hover {
          border-color: rgba(255, 42, 95, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45), 0 0 15px rgba(255, 42, 95, 0.08);
          background: rgba(22, 28, 45, 0.6);
        }

        .mg-movie-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .mg-author {
          font-size: 10.5px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* ── Pills ── */
        .mg-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .mg-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9.5px;
          font-weight: 700;
          border-radius: 20px;
          padding: 4px 10px;
          letter-spacing: 0.01em;
          font-family: var(--font-sans);
        }

        .mg-pill.date {
          color: var(--accent-rose);
          background: rgba(255, 42, 95, 0.07);
          border: 1px solid rgba(255, 42, 95, 0.2);
        }

        .mg-pill.cinema {
          color: var(--accent-cyan);
          background: rgba(34, 211, 238, 0.07);
          border: 1px solid rgba(34, 211, 238, 0.2);
        }

        .mg-pill.food {
          color: var(--accent-gold);
          background: rgba(251, 191, 36, 0.07);
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        .mg-pill.mood {
          color: #f472b6;
          background: rgba(236, 72, 153, 0.07);
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        /* ── Stars ── */
        .mg-stars-row {
          display: flex;
          gap: 2px;
        }

        .mg-star {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }

        .mg-star.filled {
          color: var(--accent-gold);
          text-shadow: 0 0 6px var(--accent-gold-glow);
        }

        /* ── Photo Grid ── */
        .mg-photo-grid {
          display: grid;
          gap: 12px;
          border-radius: 12px;
          padding: 6px 0;
        }

        .mg-photo-grid.photos-1 {
          grid-template-columns: 1fr;
        }

        .mg-photo-grid.photos-2 {
          grid-template-columns: 1fr 1fr;
        }

        .mg-photo-grid.photos-3 {
          grid-template-columns: 1fr 1fr;
        }

        .mg-photo-grid.photos-3 .mg-photo-thumb:first-child {
          grid-row: span 2;
        }

        .mg-photo-thumb {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          background: rgba(0, 0, 0, 0.3);
          border: 3.5px solid rgba(255, 255, 255, 0.9); /* Premium polaroid borders */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Polaroid physical tilt scattering effects */
        .mg-photo-grid .mg-photo-thumb:nth-child(odd) {
          transform: rotate(-1.5deg);
        }

        .mg-photo-grid .mg-photo-thumb:nth-child(even) {
          transform: rotate(1.5deg);
        }

        .mg-photo-thumb:hover {
          transform: scale(1.06) rotate(0deg) !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55), 0 0 15px rgba(255, 42, 95, 0.25);
          border-color: #ffffff;
          z-index: 10;
        }

        .mg-photo-thumb:active {
          transform: scale(0.96) rotate(0deg);
        }

        .mg-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .mg-photo-thumb:hover img {
          transform: scale(1.08);
        }

        .mg-photo-more {
          position: absolute;
          inset: 0;
          background: rgba(4, 5, 9, 0.65);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: #fff;
        }

        /* ── Comment ── */
        .mg-comment {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-style: italic;
          background: rgba(4, 5, 9, 0.25);
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          font-family: var(--font-sans);
        }

        /* ── Empty State ── */
        .mg-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 24px;
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.25);
          border-radius: 24px;
        }

        .mg-empty-emoji {
          font-size: 46px;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 0 10px rgba(255, 42, 95, 0.2));
          animation: mgEmptyFloat 3s ease-in-out infinite;
        }

        @keyframes mgEmptyFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .mg-empty-state h4 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .mg-empty-state p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 290px;
        }

        /* ── Lightbox ── */
        .mg-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(3, 4, 6, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: mgLightboxFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes mgLightboxFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .mg-lightbox-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 16px 40px;
          gap: 14px;
        }

        .mg-lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1110;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .mg-lightbox-close:hover {
          background: rgba(255, 42, 95, 0.15);
          border-color: rgba(255, 42, 95, 0.3);
          transform: scale(1.08);
        }

        .mg-lightbox-close:active {
          transform: scale(0.94);
        }

        .mg-lightbox-photo {
          max-width: 100%;
          max-height: 65vh;
          object-fit: contain;
          border-radius: 14px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7);
          animation: mgPhotoZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          border: 4px solid #ffffff; /* Polaroid Lightbox frame */
        }

        @keyframes mgPhotoZoomIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Navigation arrows */
        .mg-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1110;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .mg-nav-prev {
          left: 10px;
        }

        .mg-nav-next {
          right: 10px;
        }

        .mg-lightbox-nav:hover {
          background: rgba(255, 42, 95, 0.15);
          border-color: rgba(255, 42, 95, 0.3);
          box-shadow: 0 0 15px rgba(255, 42, 95, 0.25);
        }

        .mg-lightbox-nav:active {
          transform: translateY(-50%) scale(0.92);
        }

        .mg-lightbox-counter {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 1.2px;
        }

        .mg-lightbox-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(4, 5, 9, 0.4);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mg-lightbox-movie-icon {
          font-size: 16px;
        }
      `})]})}const Wf=Lo.memo(Bf);function Vf(){const[e,t]=k.useState("billboard"),[n,r]=k.useState(null),[i,o]=k.useState([]),[l,s]=k.useState([]),[c,p]=k.useState([]),[g,u]=k.useState(null),[h,b]=k.useState(!0),[w,y]=k.useState([]),[E,m]=k.useState(!1),d=async()=>{if(n)try{const _=await fetch(`${se}/api/notifications?userId=${n.id}`);if(_.ok){const H=await _.json();y(H)}}catch(_){console.error("Error cargando notificaciones:",_)}};k.useEffect(()=>{if(n){d();const _=setInterval(d,8e3);return()=>clearInterval(_)}},[n]);const f=async()=>{if(n)try{(await fetch(`${se}/api/notifications/read`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:n.id})})).ok&&d()}catch(_){console.error("Error marcando notificaciones:",_)}};k.useEffect(()=>{const _=localStorage.getItem("cineglow_user");if(_)try{r(JSON.parse(_))}catch{localStorage.removeItem("cineglow_user")}},[]);const x=async()=>{b(!0);try{const _=await fetch(`${se}/api/billboard`);if(_.ok){const H=await _.json();o(H.movies)}}catch(_){console.error("Error cargando la cartelera:",_)}finally{b(!1)}},j=async()=>{try{const _=await fetch(`${se}/api/ratings`);if(_.ok){const H=await _.json();s(H)}}catch(_){console.error("Error cargando valoraciones:",_)}},z=async()=>{try{const _=await fetch(`${se}/api/watchlist`);if(_.ok){const H=await _.json();p(H)}}catch(_){console.error("Error cargando watchlist:",_)}},N=()=>{if(!c||c.length===0)return!1;const _={};return c.forEach(H=>{_[H.movieKey]||(_[H.movieKey]=new Set),_[H.movieKey].add(H.userId)}),Object.values(_).some(H=>H.size>=2)};k.useEffect(()=>{n&&(x(),j(),z())},[n]);const P=()=>!l||l.length===0?!1:l.some(_=>_.photos&&Array.isArray(_.photos)&&_.photos.length>0);k.useEffect(()=>{e==="watchlist"&&!N()&&t("upcoming"),e==="memories"&&!P()&&t("billboard")},[c,l,e]);const O=(()=>{if(!n||!c||!i||i.length===0)return[];const _=new Set(c.filter(H=>H.userId===n.id).map(H=>H.movieKey));return _.size===0?[]:i.filter(H=>_.has(H.key)).map(H=>H.key)})(),ue=()=>{x(),j(),z()},pe=_=>{r(_),t("billboard")},Re=()=>{localStorage.removeItem("cineglow_user"),r(null),t("billboard"),u(null)};return n?a.jsxs("div",{className:"mobile-app-wrapper animate-fade-in",children:[a.jsxs("div",{className:"app-status-bar-sim",children:[a.jsx("span",{className:"status-time",children:"9:41"}),a.jsxs("div",{className:"status-icons-sim",children:[a.jsx("span",{children:"📶"}),a.jsx("span",{children:"🔋"})]})]}),a.jsxs("header",{className:"app-header",children:[a.jsxs("div",{className:"app-branding",children:[a.jsxs("h1",{className:"app-logo",children:["Cine",a.jsx("span",{children:"Glow"})]}),a.jsx("span",{className:"app-sub-title",children:"Santiago Oriente"})]}),a.jsxs("div",{className:"app-user-row animate-scale-in",children:[a.jsx("img",{src:n.avatar,alt:n.name,className:"header-avatar"}),a.jsxs("div",{className:"username-header-details",children:[a.jsx("span",{className:"header-username",children:n.name}),a.jsxs("span",{className:"header-points-badge",children:["✨ Nivel ",n.level||1]})]}),a.jsxs("div",{className:"notification-bell-container",children:[a.jsxs("button",{className:`btn-notification-bell ${w.some(_=>!_.read)?"has-unread":""}`,onClick:()=>{m(!E),w.some(_=>!_.read)&&f()},title:"Notificaciones de Pareja",children:[a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),a.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),w.some(_=>!_.read)&&a.jsx("span",{className:"bell-badge-pulse"})]}),E&&a.jsxs("div",{className:"notifications-dropdown glass-card animate-scale-in",style:{top:"38px",right:"-48px"},children:[a.jsxs("div",{className:"notif-dropdown-header",children:[a.jsx("h5",{children:"Notificaciones ❤️"}),a.jsx("button",{onClick:()=>m(!1),children:"✕"})]}),a.jsx("div",{className:"notif-dropdown-list",children:w.length>0?w.map(_=>a.jsxs("div",{className:`notif-dropdown-item ${_.read?"read":"unread"}`,children:[a.jsx("img",{src:_.senderAvatar,alt:_.senderName,className:"notif-item-avatar"}),a.jsxs("div",{className:"notif-item-body",children:[a.jsx("p",{className:"notif-item-title",children:_.title}),a.jsxs("p",{className:"notif-item-desc",children:[a.jsx("strong",{children:_.senderName})," ",_.message]}),a.jsx("span",{className:"notif-item-time",children:new Date(_.createdAt).toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"})})]})]},_.id)):a.jsxs("div",{className:"notif-dropdown-empty",children:[a.jsx("span",{children:"🔔"}),a.jsx("p",{children:"Sin notificaciones recientes."}),a.jsx("p",{className:"empty-sub",children:"¡Cuando tu pareja agende citas o abra sobres, las verás aquí!"})]})})]})]}),a.jsxs("button",{className:"btn-logout",onClick:Re,children:[a.jsx("span",{children:"Salir"}),a.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),a.jsx("polyline",{points:"16 17 21 12 16 7"}),a.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]})]})]})]}),a.jsxs("main",{className:"scroll-container",children:[e==="billboard"&&a.jsx(Ef,{movies:i,onMovieClick:u,isLoading:h,billboardAlerts:O}),e==="social"&&a.jsx(Rf,{ratingsList:l,movies:i,onMovieClick:u}),e==="upcoming"&&n&&a.jsx($f,{activeProfile:n,onMovieClick:u,watchlist:c,onRefreshWatchlist:z}),e==="watchlist"&&n&&a.jsx(Af,{activeProfile:n,onMovieClick:u,watchlist:c,onRefreshWatchlist:z}),e==="stats"&&a.jsx(Tf,{movies:i}),e==="my-ratings"&&n&&a.jsx(_f,{activeProfile:n,ratingsList:l,movies:i,onMovieClick:u}),e==="memories"&&n&&a.jsx(Wf,{ratingsList:l,activeProfile:n})]}),g&&n&&a.jsx(Of,{movie:g,onClose:()=>u(null),activeProfile:n,ratingsList:l,onRefreshBillboard:ue}),a.jsx(Sf,{currentTab:e,onTabChange:t,showWatchlist:N(),showMemories:P(),billboardAlertCount:O.length}),a.jsx("style",{jsx:"true",children:`
        .app-status-bar-sim {
          height: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-display);
          background-color: var(--bg-darker);
          z-index: 100;
          flex-shrink: 0;
        }

        .status-icons-sim {
          display: flex;
          gap: 6px;
          font-size: 10px;
        }

        .app-branding {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 0 2px;
        }

        .app-logo {
          font-family: var(--font-display);
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.8px;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .app-logo span {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: 2px;
          text-shadow: 0 0 15px rgba(255, 42, 95, 0.2);
        }

        .app-sub-title {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 1.8px;
          background: rgba(34, 211, 238, 0.08);
          padding: 3px 8px;
          border-radius: 8px;
          border: 1px solid rgba(34, 211, 238, 0.15);
        }

        .app-user-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(13, 17, 28, 0.6);
          border: 1px solid var(--border-glow);
          border-radius: 18px;
          padding: 8px 14px;
          margin-bottom: 10px;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          /* Perforaciones de ticket simuladas en los lados */
          overflow: hidden;
        }

        .app-user-row::before,
        .app-user-row::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 16px;
          background-color: var(--bg-deep);
          border: 1px solid var(--border-glow);
          top: calc(50% - 8px);
        }

        .app-user-row::before {
          left: -4px;
          border-radius: 0 8px 8px 0;
          border-left: none;
        }

        .app-user-row::after {
          right: -4px;
          border-radius: 8px 0 0 8px;
          border-right: none;
        }

        .avatar-header-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .header-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #141332;
          border: 2px solid var(--accent-rose);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.35);
          transition: transform 0.3s ease;
        }

        .app-user-row:hover .header-avatar {
          transform: rotate(6deg) scale(1.05);
        }

        .header-level-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: var(--accent-rose);
          color: #fff;
          font-size: 6px;
          font-weight: 800;
          padding: 1px 3px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-family: var(--font-display);
          line-height: 1;
          letter-spacing: -0.2px;
        }

        .username-header-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
          padding-left: 4px;
        }

        .header-username {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-points-badge {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-gold);
          text-shadow: 0 0 8px rgba(251, 191, 36, 0.2);
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .btn-logout {
          background: none;
          border: none;
          color: #f87171;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .btn-logout:active {
          transform: scale(0.94);
          background: rgba(239, 68, 68, 0.14);
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.15);
        }

        /* Notificaciones de Pareja */
        .notification-bell-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .btn-notification-bell {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-notification-bell:active {
          transform: scale(0.9);
        }

        .btn-notification-bell:hover,
        .btn-notification-bell.has-unread {
          color: var(--accent-rose);
          border-color: rgba(255, 42, 95, 0.35);
          background: rgba(255, 42, 95, 0.06);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.15);
        }

        .bell-badge-pulse {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent-rose);
          box-shadow: 0 0 10px var(--accent-rose);
          animation: pulse-red 1.3s infinite;
        }

        @keyframes pulse-red {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
        }

        /* Dropdown de Notificaciones */
        .notifications-dropdown {
          position: absolute;
          width: 260px;
          max-height: 320px;
          background: rgba(13, 17, 28, 0.95);
          border: 1px solid var(--border-glow-active);
          border-radius: 22px;
          box-shadow: 
            0 15px 45px rgba(0, 0, 0, 0.6),
            0 0 25px rgba(34, 211, 238, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .notif-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .notif-dropdown-header h5 {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .notif-dropdown-header button {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          transition: color 0.2s;
        }

        .notif-dropdown-header button:hover {
          color: #fff;
        }

        .notif-dropdown-list {
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .notif-dropdown-item {
          display: flex;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          transition: background-color 0.2s ease;
        }

        .notif-dropdown-item.unread {
          background: rgba(34, 211, 238, 0.04);
        }

        .notif-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .notif-item-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .notif-item-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .notif-item-title {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          margin: 0;
        }

        .notif-item-desc {
          font-size: 10.5px;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .notif-item-desc strong {
          color: #fff;
        }

        .notif-item-time {
          font-size: 9px;
          color: var(--text-muted);
          margin-top: 3px;
        }

        /* Notificaciones Vacías */
        .notif-dropdown-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 35px 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .notif-dropdown-empty span {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .notif-dropdown-empty p {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .notif-dropdown-empty .empty-sub {
          font-size: 9px;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `})]}):a.jsxs("div",{className:"mobile-app-wrapper",children:[a.jsxs("div",{className:"app-status-bar-sim",children:[a.jsx("span",{className:"status-time",children:"9:41"}),a.jsxs("div",{className:"status-icons-sim",children:[a.jsx("span",{children:"📶"}),a.jsx("span",{children:"🔋"})]})]}),a.jsx(If,{onLoginSuccess:pe}),a.jsx("style",{jsx:"true",children:`
          .app-status-bar-sim {
            height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            color: var(--text-secondary);
            font-size: 11px;
            font-weight: 700;
            font-family: var(--font-display);
            background-color: var(--bg-darker);
            z-index: 100;
            flex-shrink: 0;
          }
          .status-icons-sim {
            display: flex;
            gap: 6px;
            font-size: 10px;
          }
        `})]})}if(typeof window<"u"&&window.location.search.includes("debug=true")){const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/eruda",e.onload=()=>{window.eruda&&window.eruda.init({defaults:{displaySize:50,theme:"Dark"}})},document.body.appendChild(e)}Yd(document.getElementById("root")).render(a.jsx(k.StrictMode,{children:a.jsx(Vf,{})}));
