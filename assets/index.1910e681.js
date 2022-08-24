var $s=Object.defineProperty,Rs=Object.defineProperties;var Ls=Object.getOwnPropertyDescriptors;var Ia=Object.getOwnPropertySymbols;var Ds=Object.prototype.hasOwnProperty,Fs=Object.prototype.propertyIsEnumerable;var Na=(t,e,n)=>e in t?$s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,$a=(t,e)=>{for(var n in e||(e={}))Ds.call(e,n)&&Na(t,n,e[n]);if(Ia)for(var n of Ia(e))Fs.call(e,n)&&Na(t,n,e[n]);return t},Ra=(t,e)=>Rs(t,Ls(e));const js=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}};js();function qr(t,e){const n=Object.create(null),r=t.split(",");for(let a=0;a<r.length;a++)n[r[a]]=!0;return e?a=>!!n[a.toLowerCase()]:a=>!!n[a]}const zs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Hs=qr(zs);function Hi(t){return!!t||t===""}function Vr(t){if(G(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],a=ht(r)?Ys(r):Vr(r);if(a)for(const i in a)e[i]=a[i]}return e}else{if(ht(t))return t;if(mt(t))return t}}const Us=/;(?![^(]*\))/g,Bs=/:(.+)/;function Ys(t){const e={};return t.split(Us).forEach(n=>{if(n){const r=n.split(Bs);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Xr(t){let e="";if(ht(t))e=t;else if(G(t))for(let n=0;n<t.length;n++){const r=Xr(t[n]);r&&(e+=r+" ")}else if(mt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Ze=t=>ht(t)?t:t==null?"":G(t)||mt(t)&&(t.toString===Wi||!J(t.toString))?JSON.stringify(t,Ui,2):String(t),Ui=(t,e)=>e&&e.__v_isRef?Ui(t,e.value):Le(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,a])=>(n[`${r} =>`]=a,n),{})}:Bi(e)?{[`Set(${e.size})`]:[...e.values()]}:mt(e)&&!G(e)&&!Ki(e)?String(e):e,st={},Re=[],Ht=()=>{},Ws=()=>!1,Ks=/^on[^a-z]/,vn=t=>Ks.test(t),Gr=t=>t.startsWith("onUpdate:"),xt=Object.assign,Jr=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},qs=Object.prototype.hasOwnProperty,Z=(t,e)=>qs.call(t,e),G=Array.isArray,Le=t=>Xn(t)==="[object Map]",Bi=t=>Xn(t)==="[object Set]",J=t=>typeof t=="function",ht=t=>typeof t=="string",Zr=t=>typeof t=="symbol",mt=t=>t!==null&&typeof t=="object",Yi=t=>mt(t)&&J(t.then)&&J(t.catch),Wi=Object.prototype.toString,Xn=t=>Wi.call(t),Vs=t=>Xn(t).slice(8,-1),Ki=t=>Xn(t)==="[object Object]",Qr=t=>ht(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Qe=qr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Gn=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Xs=/-(\w)/g,Jt=Gn(t=>t.replace(Xs,(e,n)=>n?n.toUpperCase():"")),Gs=/\B([A-Z])/g,Be=Gn(t=>t.replace(Gs,"-$1").toLowerCase()),Jn=Gn(t=>t.charAt(0).toUpperCase()+t.slice(1)),cr=Gn(t=>t?`on${Jn(t)}`:""),fn=(t,e)=>!Object.is(t,e),ur=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Rn=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Js=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let La;const Zs=()=>La||(La=typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});let qt;class Qs{constructor(e=!1){this.active=!0,this.effects=[],this.cleanups=[],!e&&qt&&(this.parent=qt,this.index=(qt.scopes||(qt.scopes=[])).push(this)-1)}run(e){if(this.active){const n=qt;try{return qt=this,e()}finally{qt=n}}}on(){qt=this}off(){qt=this.parent}stop(e){if(this.active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(this.parent&&!e){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.active=!1}}}function tl(t,e=qt){e&&e.active&&e.effects.push(t)}const ta=t=>{const e=new Set(t);return e.w=0,e.n=0,e},qi=t=>(t.w&me)>0,Vi=t=>(t.n&me)>0,el=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=me},nl=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const a=e[r];qi(a)&&!Vi(a)?a.delete(t):e[n++]=a,a.w&=~me,a.n&=~me}e.length=n}},yr=new WeakMap;let Xe=0,me=1;const wr=30;let Dt;const Ae=Symbol(""),xr=Symbol("");class ea{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,tl(this,r)}run(){if(!this.active)return this.fn();let e=Dt,n=ue;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=Dt,Dt=this,ue=!0,me=1<<++Xe,Xe<=wr?el(this):Da(this),this.fn()}finally{Xe<=wr&&nl(this),me=1<<--Xe,Dt=this.parent,ue=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Dt===this?this.deferStop=!0:this.active&&(Da(this),this.onStop&&this.onStop(),this.active=!1)}}function Da(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let ue=!0;const Xi=[];function Ye(){Xi.push(ue),ue=!1}function We(){const t=Xi.pop();ue=t===void 0?!0:t}function Ct(t,e,n){if(ue&&Dt){let r=yr.get(t);r||yr.set(t,r=new Map);let a=r.get(n);a||r.set(n,a=ta()),Gi(a)}}function Gi(t,e){let n=!1;Xe<=wr?Vi(t)||(t.n|=me,n=!qi(t)):n=!t.has(Dt),n&&(t.add(Dt),Dt.deps.push(t))}function Qt(t,e,n,r,a,i){const o=yr.get(t);if(!o)return;let s=[];if(e==="clear")s=[...o.values()];else if(n==="length"&&G(t))o.forEach((l,c)=>{(c==="length"||c>=r)&&s.push(l)});else switch(n!==void 0&&s.push(o.get(n)),e){case"add":G(t)?Qr(n)&&s.push(o.get("length")):(s.push(o.get(Ae)),Le(t)&&s.push(o.get(xr)));break;case"delete":G(t)||(s.push(o.get(Ae)),Le(t)&&s.push(o.get(xr)));break;case"set":Le(t)&&s.push(o.get(Ae));break}if(s.length===1)s[0]&&_r(s[0]);else{const l=[];for(const c of s)c&&l.push(...c);_r(ta(l))}}function _r(t,e){const n=G(t)?t:[...t];for(const r of n)r.computed&&Fa(r);for(const r of n)r.computed||Fa(r)}function Fa(t,e){(t!==Dt||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const rl=qr("__proto__,__v_isRef,__isVue"),Ji=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Zr)),al=na(),il=na(!1,!0),ol=na(!0),ja=sl();function sl(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=et(this);for(let i=0,o=this.length;i<o;i++)Ct(r,"get",i+"");const a=r[e](...n);return a===-1||a===!1?r[e](...n.map(et)):a}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Ye();const r=et(this)[e].apply(this,n);return We(),r}}),t}function na(t=!1,e=!1){return function(r,a,i){if(a==="__v_isReactive")return!t;if(a==="__v_isReadonly")return t;if(a==="__v_isShallow")return e;if(a==="__v_raw"&&i===(t?e?kl:no:e?eo:to).get(r))return r;const o=G(r);if(!t&&o&&Z(ja,a))return Reflect.get(ja,a,i);const s=Reflect.get(r,a,i);return(Zr(a)?Ji.has(a):rl(a))||(t||Ct(r,"get",a),e)?s:bt(s)?o&&Qr(a)?s:s.value:mt(s)?t?ro(s):ia(s):s}}const ll=Zi(),fl=Zi(!0);function Zi(t=!1){return function(n,r,a,i){let o=n[r];if(cn(o)&&bt(o)&&!bt(a))return!1;if(!t&&!cn(a)&&(kr(a)||(a=et(a),o=et(o)),!G(n)&&bt(o)&&!bt(a)))return o.value=a,!0;const s=G(n)&&Qr(r)?Number(r)<n.length:Z(n,r),l=Reflect.set(n,r,a,i);return n===et(i)&&(s?fn(a,o)&&Qt(n,"set",r,a):Qt(n,"add",r,a)),l}}function cl(t,e){const n=Z(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&Qt(t,"delete",e,void 0),r}function ul(t,e){const n=Reflect.has(t,e);return(!Zr(e)||!Ji.has(e))&&Ct(t,"has",e),n}function dl(t){return Ct(t,"iterate",G(t)?"length":Ae),Reflect.ownKeys(t)}const Qi={get:al,set:ll,deleteProperty:cl,has:ul,ownKeys:dl},ml={get:ol,set(t,e){return!0},deleteProperty(t,e){return!0}},hl=xt({},Qi,{get:il,set:fl}),ra=t=>t,Zn=t=>Reflect.getPrototypeOf(t);function wn(t,e,n=!1,r=!1){t=t.__v_raw;const a=et(t),i=et(e);n||(e!==i&&Ct(a,"get",e),Ct(a,"get",i));const{has:o}=Zn(a),s=r?ra:n?sa:un;if(o.call(a,e))return s(t.get(e));if(o.call(a,i))return s(t.get(i));t!==a&&t.get(e)}function xn(t,e=!1){const n=this.__v_raw,r=et(n),a=et(t);return e||(t!==a&&Ct(r,"has",t),Ct(r,"has",a)),t===a?n.has(t):n.has(t)||n.has(a)}function _n(t,e=!1){return t=t.__v_raw,!e&&Ct(et(t),"iterate",Ae),Reflect.get(t,"size",t)}function za(t){t=et(t);const e=et(this);return Zn(e).has.call(e,t)||(e.add(t),Qt(e,"add",t,t)),this}function Ha(t,e){e=et(e);const n=et(this),{has:r,get:a}=Zn(n);let i=r.call(n,t);i||(t=et(t),i=r.call(n,t));const o=a.call(n,t);return n.set(t,e),i?fn(e,o)&&Qt(n,"set",t,e):Qt(n,"add",t,e),this}function Ua(t){const e=et(this),{has:n,get:r}=Zn(e);let a=n.call(e,t);a||(t=et(t),a=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return a&&Qt(e,"delete",t,void 0),i}function Ba(){const t=et(this),e=t.size!==0,n=t.clear();return e&&Qt(t,"clear",void 0,void 0),n}function kn(t,e){return function(r,a){const i=this,o=i.__v_raw,s=et(o),l=e?ra:t?sa:un;return!t&&Ct(s,"iterate",Ae),o.forEach((c,u)=>r.call(a,l(c),l(u),i))}}function An(t,e,n){return function(...r){const a=this.__v_raw,i=et(a),o=Le(i),s=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=a[t](...r),u=n?ra:e?sa:un;return!e&&Ct(i,"iterate",l?xr:Ae),{next(){const{value:m,done:b}=c.next();return b?{value:m,done:b}:{value:s?[u(m[0]),u(m[1])]:u(m),done:b}},[Symbol.iterator](){return this}}}}function oe(t){return function(...e){return t==="delete"?!1:this}}function pl(){const t={get(i){return wn(this,i)},get size(){return _n(this)},has:xn,add:za,set:Ha,delete:Ua,clear:Ba,forEach:kn(!1,!1)},e={get(i){return wn(this,i,!1,!0)},get size(){return _n(this)},has:xn,add:za,set:Ha,delete:Ua,clear:Ba,forEach:kn(!1,!0)},n={get(i){return wn(this,i,!0)},get size(){return _n(this,!0)},has(i){return xn.call(this,i,!0)},add:oe("add"),set:oe("set"),delete:oe("delete"),clear:oe("clear"),forEach:kn(!0,!1)},r={get(i){return wn(this,i,!0,!0)},get size(){return _n(this,!0)},has(i){return xn.call(this,i,!0)},add:oe("add"),set:oe("set"),delete:oe("delete"),clear:oe("clear"),forEach:kn(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=An(i,!1,!1),n[i]=An(i,!0,!1),e[i]=An(i,!1,!0),r[i]=An(i,!0,!0)}),[t,n,e,r]}const[gl,bl,vl,yl]=pl();function aa(t,e){const n=e?t?yl:vl:t?bl:gl;return(r,a,i)=>a==="__v_isReactive"?!t:a==="__v_isReadonly"?t:a==="__v_raw"?r:Reflect.get(Z(n,a)&&a in r?n:r,a,i)}const wl={get:aa(!1,!1)},xl={get:aa(!1,!0)},_l={get:aa(!0,!1)},to=new WeakMap,eo=new WeakMap,no=new WeakMap,kl=new WeakMap;function Al(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ol(t){return t.__v_skip||!Object.isExtensible(t)?0:Al(Vs(t))}function ia(t){return cn(t)?t:oa(t,!1,Qi,wl,to)}function El(t){return oa(t,!1,hl,xl,eo)}function ro(t){return oa(t,!0,ml,_l,no)}function oa(t,e,n,r,a){if(!mt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=a.get(t);if(i)return i;const o=Ol(t);if(o===0)return t;const s=new Proxy(t,o===2?r:n);return a.set(t,s),s}function De(t){return cn(t)?De(t.__v_raw):!!(t&&t.__v_isReactive)}function cn(t){return!!(t&&t.__v_isReadonly)}function kr(t){return!!(t&&t.__v_isShallow)}function ao(t){return De(t)||cn(t)}function et(t){const e=t&&t.__v_raw;return e?et(e):t}function io(t){return Rn(t,"__v_skip",!0),t}const un=t=>mt(t)?ia(t):t,sa=t=>mt(t)?ro(t):t;function oo(t){ue&&Dt&&(t=et(t),Gi(t.dep||(t.dep=ta())))}function so(t,e){t=et(t),t.dep&&_r(t.dep)}function bt(t){return!!(t&&t.__v_isRef===!0)}function lo(t){return fo(t,!1)}function Sl(t){return fo(t,!0)}function fo(t,e){return bt(t)?t:new Cl(t,e)}class Cl{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:et(e),this._value=n?e:un(e)}get value(){return oo(this),this._value}set value(e){e=this.__v_isShallow?e:et(e),fn(e,this._rawValue)&&(this._rawValue=e,this._value=this.__v_isShallow?e:un(e),so(this))}}function Ln(t){return bt(t)?t.value:t}const Tl={get:(t,e,n)=>Ln(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const a=t[e];return bt(a)&&!bt(n)?(a.value=n,!0):Reflect.set(t,e,n,r)}};function co(t){return De(t)?t:new Proxy(t,Tl)}class Ml{constructor(e,n,r,a){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this._dirty=!0,this.effect=new ea(e,()=>{this._dirty||(this._dirty=!0,so(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!a,this.__v_isReadonly=r}get value(){const e=et(this);return oo(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function Pl(t,e,n=!1){let r,a;const i=J(t);return i?(r=t,a=Ht):(r=t.get,a=t.set),new Ml(r,a,i||!a,n)}function de(t,e,n,r){let a;try{a=r?t(...r):t()}catch(i){Qn(i,e,n)}return a}function Ut(t,e,n,r){if(J(t)){const i=de(t,e,n,r);return i&&Yi(i)&&i.catch(o=>{Qn(o,e,n)}),i}const a=[];for(let i=0;i<t.length;i++)a.push(Ut(t[i],e,n,r));return a}function Qn(t,e,n,r=!0){const a=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,s=n;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](t,o,s)===!1)return}i=i.parent}const l=e.appContext.config.errorHandler;if(l){de(l,null,10,[t,o,s]);return}}Il(t,n,a,r)}function Il(t,e,n,r=!0){console.error(t)}let Dn=!1,Ar=!1;const St=[];let Zt=0;const tn=[];let Ge=null,Me=0;const en=[];let fe=null,Pe=0;const uo=Promise.resolve();let la=null,Or=null;function Nl(t){const e=la||uo;return t?e.then(this?t.bind(this):t):e}function $l(t){let e=Zt+1,n=St.length;for(;e<n;){const r=e+n>>>1;dn(St[r])<t?e=r+1:n=r}return e}function mo(t){(!St.length||!St.includes(t,Dn&&t.allowRecurse?Zt+1:Zt))&&t!==Or&&(t.id==null?St.push(t):St.splice($l(t.id),0,t),ho())}function ho(){!Dn&&!Ar&&(Ar=!0,la=uo.then(go))}function Rl(t){const e=St.indexOf(t);e>Zt&&St.splice(e,1)}function po(t,e,n,r){G(t)?n.push(...t):(!e||!e.includes(t,t.allowRecurse?r+1:r))&&n.push(t),ho()}function Ll(t){po(t,Ge,tn,Me)}function Dl(t){po(t,fe,en,Pe)}function tr(t,e=null){if(tn.length){for(Or=e,Ge=[...new Set(tn)],tn.length=0,Me=0;Me<Ge.length;Me++)Ge[Me]();Ge=null,Me=0,Or=null,tr(t,e)}}function Fn(t){if(tr(),en.length){const e=[...new Set(en)];if(en.length=0,fe){fe.push(...e);return}for(fe=e,fe.sort((n,r)=>dn(n)-dn(r)),Pe=0;Pe<fe.length;Pe++)fe[Pe]();fe=null,Pe=0}}const dn=t=>t.id==null?1/0:t.id;function go(t){Ar=!1,Dn=!0,tr(t),St.sort((n,r)=>dn(n)-dn(r));const e=Ht;try{for(Zt=0;Zt<St.length;Zt++){const n=St[Zt];n&&n.active!==!1&&de(n,null,14)}}finally{Zt=0,St.length=0,Fn(),Dn=!1,la=null,(St.length||tn.length||en.length)&&go(t)}}function Fl(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||st;let a=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:m,trim:b}=r[u]||st;b&&(a=n.map(v=>v.trim())),m&&(a=n.map(Js))}let s,l=r[s=cr(e)]||r[s=cr(Jt(e))];!l&&i&&(l=r[s=cr(Be(e))]),l&&Ut(l,t,6,a);const c=r[s+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[s])return;t.emitted[s]=!0,Ut(c,t,6,a)}}function bo(t,e,n=!1){const r=e.emitsCache,a=r.get(t);if(a!==void 0)return a;const i=t.emits;let o={},s=!1;if(!J(t)){const l=c=>{const u=bo(c,e,!0);u&&(s=!0,xt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!s?(r.set(t,null),null):(G(i)?i.forEach(l=>o[l]=null):xt(o,i),r.set(t,o),o)}function er(t,e){return!t||!vn(e)?!1:(e=e.slice(2).replace(/Once$/,""),Z(t,e[0].toLowerCase()+e.slice(1))||Z(t,Be(e))||Z(t,e))}let Xt=null,vo=null;function jn(t){const e=Xt;return Xt=t,vo=t&&t.type.__scopeId||null,e}function jl(t,e=Xt,n){if(!e||t._n)return t;const r=(...a)=>{r._d&&Qa(-1);const i=jn(e),o=t(...a);return jn(i),r._d&&Qa(1),o};return r._n=!0,r._c=!0,r._d=!0,r}function dr(t){const{type:e,vnode:n,proxy:r,withProxy:a,props:i,propsOptions:[o],slots:s,attrs:l,emit:c,render:u,renderCache:m,data:b,setupState:v,ctx:O,inheritAttrs:j}=t;let D,h;const p=jn(t);try{if(n.shapeFlag&4){const $=a||r;D=Lt(u.call($,$,m,i,v,b,O)),h=l}else{const $=e;D=Lt($.length>1?$(i,{attrs:l,slots:s,emit:c}):$(i,null)),h=e.props?l:zl(l)}}catch($){rn.length=0,Qn($,t,1),D=dt(je)}let T=D;if(h&&j!==!1){const $=Object.keys(h),{shapeFlag:R}=T;$.length&&R&7&&(o&&$.some(Gr)&&(h=Hl(h,o)),T=ze(T,h))}return n.dirs&&(T=ze(T),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&(T.transition=n.transition),D=T,jn(p),D}const zl=t=>{let e;for(const n in t)(n==="class"||n==="style"||vn(n))&&((e||(e={}))[n]=t[n]);return e},Hl=(t,e)=>{const n={};for(const r in t)(!Gr(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Ul(t,e,n){const{props:r,children:a,component:i}=t,{props:o,children:s,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Ya(r,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let m=0;m<u.length;m++){const b=u[m];if(o[b]!==r[b]&&!er(c,b))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===o?!1:r?o?Ya(r,o,c):!0:!!o;return!1}function Ya(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let a=0;a<r.length;a++){const i=r[a];if(e[i]!==t[i]&&!er(n,i))return!0}return!1}function Bl({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const Yl=t=>t.__isSuspense;function yo(t,e){e&&e.pendingBranch?G(t)?e.effects.push(...t):e.effects.push(t):Dl(t)}function Wl(t,e){if(gt){let n=gt.provides;const r=gt.parent&&gt.parent.provides;r===n&&(n=gt.provides=Object.create(r)),n[t]=e}}function Cn(t,e,n=!1){const r=gt||Xt;if(r){const a=r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides;if(a&&t in a)return a[t];if(arguments.length>1)return n&&J(e)?e.call(r.proxy):e}}function Kl(t,e){return fa(t,null,e)}const Wa={};function Tn(t,e,n){return fa(t,e,n)}function fa(t,e,{immediate:n,deep:r,flush:a,onTrack:i,onTrigger:o}=st){const s=gt;let l,c=!1,u=!1;if(bt(t)?(l=()=>t.value,c=kr(t)):De(t)?(l=()=>t,r=!0):G(t)?(u=!0,c=t.some(h=>De(h)||kr(h)),l=()=>t.map(h=>{if(bt(h))return h.value;if(De(h))return Ie(h);if(J(h))return de(h,s,2)})):J(t)?e?l=()=>de(t,s,2):l=()=>{if(!(s&&s.isUnmounted))return m&&m(),Ut(t,s,3,[b])}:l=Ht,e&&r){const h=l;l=()=>Ie(h())}let m,b=h=>{m=D.onStop=()=>{de(h,s,4)}};if(pn)return b=Ht,e?n&&Ut(e,s,3,[l(),u?[]:void 0,b]):l(),Ht;let v=u?[]:Wa;const O=()=>{if(!!D.active)if(e){const h=D.run();(r||c||(u?h.some((p,T)=>fn(p,v[T])):fn(h,v)))&&(m&&m(),Ut(e,s,3,[h,v===Wa?void 0:v,b]),v=h)}else D.run()};O.allowRecurse=!!e;let j;a==="sync"?j=O:a==="post"?j=()=>At(O,s&&s.suspense):j=()=>Ll(O);const D=new ea(l,j);return e?n?O():v=D.run():a==="post"?At(D.run.bind(D),s&&s.suspense):D.run(),()=>{D.stop(),s&&s.scope&&Jr(s.scope.effects,D)}}function ql(t,e,n){const r=this.proxy,a=ht(t)?t.includes(".")?wo(r,t):()=>r[t]:t.bind(r,r);let i;J(e)?i=e:(i=e.handler,n=e);const o=gt;He(this);const s=fa(a,i.bind(r),n);return o?He(o):Oe(),s}function wo(t,e){const n=e.split(".");return()=>{let r=t;for(let a=0;a<n.length&&r;a++)r=r[n[a]];return r}}function Ie(t,e){if(!mt(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),bt(t))Ie(t.value,e);else if(G(t))for(let n=0;n<t.length;n++)Ie(t[n],e);else if(Bi(t)||Le(t))t.forEach(n=>{Ie(n,e)});else if(Ki(t))for(const n in t)Ie(t[n],e);return t}function Wt(t){return J(t)?{setup:t,name:t.name}:t}const nn=t=>!!t.type.__asyncLoader,xo=t=>t.type.__isKeepAlive;function Vl(t,e){_o(t,"a",e)}function Xl(t,e){_o(t,"da",e)}function _o(t,e,n=gt){const r=t.__wdc||(t.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return t()});if(nr(e,r,n),n){let a=n.parent;for(;a&&a.parent;)xo(a.parent.vnode)&&Gl(r,e,n,a),a=a.parent}}function Gl(t,e,n,r){const a=nr(e,t,r,!0);Oo(()=>{Jr(r[e],a)},n)}function nr(t,e,n=gt,r=!1){if(n){const a=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;Ye(),He(n);const s=Ut(e,n,t,o);return Oe(),We(),s});return r?a.unshift(i):a.push(i),i}}const re=t=>(e,n=gt)=>(!pn||t==="sp")&&nr(t,e,n),Jl=re("bm"),ko=re("m"),Zl=re("bu"),Ql=re("u"),Ao=re("bum"),Oo=re("um"),tf=re("sp"),ef=re("rtg"),nf=re("rtc");function rf(t,e=gt){nr("ec",t,e)}function Vt(t,e,n,r){const a=t.dirs,i=e&&e.dirs;for(let o=0;o<a.length;o++){const s=a[o];i&&(s.oldValue=i[o].value);let l=s.dir[r];l&&(Ye(),Ut(l,n,8,[t.el,s,t,e]),We())}}const Eo="components";function _e(t,e){return of(Eo,t,!0,e)||t}const af=Symbol();function of(t,e,n=!0,r=!1){const a=Xt||gt;if(a){const i=a.type;if(t===Eo){const s=Df(i,!1);if(s&&(s===e||s===Jt(e)||s===Jn(Jt(e))))return i}const o=Ka(a[t]||i[t],e)||Ka(a.appContext[t],e);return!o&&r?i:o}}function Ka(t,e){return t&&(t[e]||t[Jt(e)]||t[Jn(Jt(e))])}function So(t,e,n,r){let a;const i=n&&n[r];if(G(t)||ht(t)){a=new Array(t.length);for(let o=0,s=t.length;o<s;o++)a[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){a=new Array(t);for(let o=0;o<t;o++)a[o]=e(o+1,o,void 0,i&&i[o])}else if(mt(t))if(t[Symbol.iterator])a=Array.from(t,(o,s)=>e(o,s,void 0,i&&i[s]));else{const o=Object.keys(t);a=new Array(o.length);for(let s=0,l=o.length;s<l;s++){const c=o[s];a[s]=e(t[c],c,s,i&&i[s])}}else a=[];return n&&(n[r]=a),a}const Er=t=>t?jo(t)?da(t)||t.proxy:Er(t.parent):null,zn=xt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Er(t.parent),$root:t=>Er(t.root),$emit:t=>t.emit,$options:t=>To(t),$forceUpdate:t=>t.f||(t.f=()=>mo(t.update)),$nextTick:t=>t.n||(t.n=Nl.bind(t.proxy)),$watch:t=>ql.bind(t)}),sf={get({_:t},e){const{ctx:n,setupState:r,data:a,props:i,accessCache:o,type:s,appContext:l}=t;let c;if(e[0]!=="$"){const v=o[e];if(v!==void 0)switch(v){case 1:return r[e];case 2:return a[e];case 4:return n[e];case 3:return i[e]}else{if(r!==st&&Z(r,e))return o[e]=1,r[e];if(a!==st&&Z(a,e))return o[e]=2,a[e];if((c=t.propsOptions[0])&&Z(c,e))return o[e]=3,i[e];if(n!==st&&Z(n,e))return o[e]=4,n[e];Sr&&(o[e]=0)}}const u=zn[e];let m,b;if(u)return e==="$attrs"&&Ct(t,"get",e),u(t);if((m=s.__cssModules)&&(m=m[e]))return m;if(n!==st&&Z(n,e))return o[e]=4,n[e];if(b=l.config.globalProperties,Z(b,e))return b[e]},set({_:t},e,n){const{data:r,setupState:a,ctx:i}=t;return a!==st&&Z(a,e)?(a[e]=n,!0):r!==st&&Z(r,e)?(r[e]=n,!0):Z(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:a,propsOptions:i}},o){let s;return!!n[o]||t!==st&&Z(t,o)||e!==st&&Z(e,o)||(s=i[0])&&Z(s,o)||Z(r,o)||Z(zn,o)||Z(a.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Z(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};let Sr=!0;function lf(t){const e=To(t),n=t.proxy,r=t.ctx;Sr=!1,e.beforeCreate&&qa(e.beforeCreate,t,"bc");const{data:a,computed:i,methods:o,watch:s,provide:l,inject:c,created:u,beforeMount:m,mounted:b,beforeUpdate:v,updated:O,activated:j,deactivated:D,beforeDestroy:h,beforeUnmount:p,destroyed:T,unmounted:$,render:R,renderTracked:W,renderTriggered:X,errorCaptured:Y,serverPrefetch:K,expose:q,inheritAttrs:rt,components:_t,directives:F,filters:y}=e;if(c&&ff(c,r,null,t.appContext.config.unwrapInjectedRef),o)for(const k in o){const N=o[k];J(N)&&(r[k]=N.bind(n))}if(a){const k=a.call(n,n);mt(k)&&(t.data=ia(k))}if(Sr=!0,i)for(const k in i){const N=i[k],B=J(N)?N.bind(n,n):J(N.get)?N.get.bind(n,n):Ht,tt=!J(N)&&J(N.set)?N.set.bind(n):Ht,ot=Pt({get:B,set:tt});Object.defineProperty(r,k,{enumerable:!0,configurable:!0,get:()=>ot.value,set:nt=>ot.value=nt})}if(s)for(const k in s)Co(s[k],r,n,k);if(l){const k=J(l)?l.call(n):l;Reflect.ownKeys(k).forEach(N=>{Wl(N,k[N])})}u&&qa(u,t,"c");function P(k,N){G(N)?N.forEach(B=>k(B.bind(n))):N&&k(N.bind(n))}if(P(Jl,m),P(ko,b),P(Zl,v),P(Ql,O),P(Vl,j),P(Xl,D),P(rf,Y),P(nf,W),P(ef,X),P(Ao,p),P(Oo,$),P(tf,K),G(q))if(q.length){const k=t.exposed||(t.exposed={});q.forEach(N=>{Object.defineProperty(k,N,{get:()=>n[N],set:B=>n[N]=B})})}else t.exposed||(t.exposed={});R&&t.render===Ht&&(t.render=R),rt!=null&&(t.inheritAttrs=rt),_t&&(t.components=_t),F&&(t.directives=F)}function ff(t,e,n=Ht,r=!1){G(t)&&(t=Cr(t));for(const a in t){const i=t[a];let o;mt(i)?"default"in i?o=Cn(i.from||a,i.default,!0):o=Cn(i.from||a):o=Cn(i),bt(o)&&r?Object.defineProperty(e,a,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):e[a]=o}}function qa(t,e,n){Ut(G(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Co(t,e,n,r){const a=r.includes(".")?wo(n,r):()=>n[r];if(ht(t)){const i=e[t];J(i)&&Tn(a,i)}else if(J(t))Tn(a,t.bind(n));else if(mt(t))if(G(t))t.forEach(i=>Co(i,e,n,r));else{const i=J(t.handler)?t.handler.bind(n):e[t.handler];J(i)&&Tn(a,i,t)}}function To(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,s=i.get(e);let l;return s?l=s:!a.length&&!n&&!r?l=e:(l={},a.length&&a.forEach(c=>Hn(l,c,o,!0)),Hn(l,e,o)),i.set(e,l),l}function Hn(t,e,n,r=!1){const{mixins:a,extends:i}=e;i&&Hn(t,i,n,!0),a&&a.forEach(o=>Hn(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const s=cf[o]||n&&n[o];t[o]=s?s(t[o],e[o]):e[o]}return t}const cf={data:Va,props:we,emits:we,methods:we,computed:we,beforeCreate:wt,created:wt,beforeMount:wt,mounted:wt,beforeUpdate:wt,updated:wt,beforeDestroy:wt,beforeUnmount:wt,destroyed:wt,unmounted:wt,activated:wt,deactivated:wt,errorCaptured:wt,serverPrefetch:wt,components:we,directives:we,watch:df,provide:Va,inject:uf};function Va(t,e){return e?t?function(){return xt(J(t)?t.call(this,this):t,J(e)?e.call(this,this):e)}:e:t}function uf(t,e){return we(Cr(t),Cr(e))}function Cr(t){if(G(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function wt(t,e){return t?[...new Set([].concat(t,e))]:e}function we(t,e){return t?xt(xt(Object.create(null),t),e):e}function df(t,e){if(!t)return e;if(!e)return t;const n=xt(Object.create(null),t);for(const r in e)n[r]=wt(t[r],e[r]);return n}function mf(t,e,n,r=!1){const a={},i={};Rn(i,rr,1),t.propsDefaults=Object.create(null),Mo(t,e,a,i);for(const o in t.propsOptions[0])o in a||(a[o]=void 0);n?t.props=r?a:El(a):t.type.props?t.props=a:t.props=i,t.attrs=i}function hf(t,e,n,r){const{props:a,attrs:i,vnode:{patchFlag:o}}=t,s=et(a),[l]=t.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let m=0;m<u.length;m++){let b=u[m];if(er(t.emitsOptions,b))continue;const v=e[b];if(l)if(Z(i,b))v!==i[b]&&(i[b]=v,c=!0);else{const O=Jt(b);a[O]=Tr(l,s,O,v,t,!1)}else v!==i[b]&&(i[b]=v,c=!0)}}}else{Mo(t,e,a,i)&&(c=!0);let u;for(const m in s)(!e||!Z(e,m)&&((u=Be(m))===m||!Z(e,u)))&&(l?n&&(n[m]!==void 0||n[u]!==void 0)&&(a[m]=Tr(l,s,m,void 0,t,!0)):delete a[m]);if(i!==s)for(const m in i)(!e||!Z(e,m)&&!0)&&(delete i[m],c=!0)}c&&Qt(t,"set","$attrs")}function Mo(t,e,n,r){const[a,i]=t.propsOptions;let o=!1,s;if(e)for(let l in e){if(Qe(l))continue;const c=e[l];let u;a&&Z(a,u=Jt(l))?!i||!i.includes(u)?n[u]=c:(s||(s={}))[u]=c:er(t.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(i){const l=et(n),c=s||st;for(let u=0;u<i.length;u++){const m=i[u];n[m]=Tr(a,l,m,c[m],t,!Z(c,m))}}return o}function Tr(t,e,n,r,a,i){const o=t[n];if(o!=null){const s=Z(o,"default");if(s&&r===void 0){const l=o.default;if(o.type!==Function&&J(l)){const{propsDefaults:c}=a;n in c?r=c[n]:(He(a),r=c[n]=l.call(null,e),Oe())}else r=l}o[0]&&(i&&!s?r=!1:o[1]&&(r===""||r===Be(n))&&(r=!0))}return r}function Po(t,e,n=!1){const r=e.propsCache,a=r.get(t);if(a)return a;const i=t.props,o={},s=[];let l=!1;if(!J(t)){const u=m=>{l=!0;const[b,v]=Po(m,e,!0);xt(o,b),v&&s.push(...v)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return r.set(t,Re),Re;if(G(i))for(let u=0;u<i.length;u++){const m=Jt(i[u]);Xa(m)&&(o[m]=st)}else if(i)for(const u in i){const m=Jt(u);if(Xa(m)){const b=i[u],v=o[m]=G(b)||J(b)?{type:b}:b;if(v){const O=Za(Boolean,v.type),j=Za(String,v.type);v[0]=O>-1,v[1]=j<0||O<j,(O>-1||Z(v,"default"))&&s.push(m)}}}const c=[o,s];return r.set(t,c),c}function Xa(t){return t[0]!=="$"}function Ga(t){const e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:t===null?"null":""}function Ja(t,e){return Ga(t)===Ga(e)}function Za(t,e){return G(e)?e.findIndex(n=>Ja(n,t)):J(e)&&Ja(e,t)?0:-1}const Io=t=>t[0]==="_"||t==="$stable",ca=t=>G(t)?t.map(Lt):[Lt(t)],pf=(t,e,n)=>{if(e._n)return e;const r=jl((...a)=>ca(e(...a)),n);return r._c=!1,r},No=(t,e,n)=>{const r=t._ctx;for(const a in t){if(Io(a))continue;const i=t[a];if(J(i))e[a]=pf(a,i,r);else if(i!=null){const o=ca(i);e[a]=()=>o}}},$o=(t,e)=>{const n=ca(e);t.slots.default=()=>n},gf=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=et(e),Rn(e,"_",n)):No(e,t.slots={})}else t.slots={},e&&$o(t,e);Rn(t.slots,rr,1)},bf=(t,e,n)=>{const{vnode:r,slots:a}=t;let i=!0,o=st;if(r.shapeFlag&32){const s=e._;s?n&&s===1?i=!1:(xt(a,e),!n&&s===1&&delete a._):(i=!e.$stable,No(e,a)),o=e}else e&&($o(t,e),o={default:1});if(i)for(const s in a)!Io(s)&&!(s in o)&&delete a[s]};function Ro(){return{app:null,config:{isNativeTag:Ws,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let vf=0;function yf(t,e){return function(r,a=null){J(r)||(r=Object.assign({},r)),a!=null&&!mt(a)&&(a=null);const i=Ro(),o=new Set;let s=!1;const l=i.app={_uid:vf++,_component:r,_props:a,_container:null,_context:i,_instance:null,version:jf,get config(){return i.config},set config(c){},use(c,...u){return o.has(c)||(c&&J(c.install)?(o.add(c),c.install(l,...u)):J(c)&&(o.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,m){if(!s){const b=dt(r,a);return b.appContext=i,u&&e?e(b,c):t(b,c,m),s=!0,l._container=c,c.__vue_app__=l,da(b.component)||b.component.proxy}},unmount(){s&&(t(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l}};return l}}function Un(t,e,n,r,a=!1){if(G(t)){t.forEach((b,v)=>Un(b,e&&(G(e)?e[v]:e),n,r,a));return}if(nn(r)&&!a)return;const i=r.shapeFlag&4?da(r.component)||r.component.proxy:r.el,o=a?null:i,{i:s,r:l}=t,c=e&&e.r,u=s.refs===st?s.refs={}:s.refs,m=s.setupState;if(c!=null&&c!==l&&(ht(c)?(u[c]=null,Z(m,c)&&(m[c]=null)):bt(c)&&(c.value=null)),J(l))de(l,s,12,[o,u]);else{const b=ht(l),v=bt(l);if(b||v){const O=()=>{if(t.f){const j=b?u[l]:l.value;a?G(j)&&Jr(j,i):G(j)?j.includes(i)||j.push(i):b?(u[l]=[i],Z(m,l)&&(m[l]=u[l])):(l.value=[i],t.k&&(u[t.k]=l.value))}else b?(u[l]=o,Z(m,l)&&(m[l]=o)):v&&(l.value=o,t.k&&(u[t.k]=o))};o?(O.id=-1,At(O,n)):O()}}}let se=!1;const On=t=>/svg/.test(t.namespaceURI)&&t.tagName!=="foreignObject",En=t=>t.nodeType===8;function wf(t){const{mt:e,p:n,o:{patchProp:r,createText:a,nextSibling:i,parentNode:o,remove:s,insert:l,createComment:c}}=t,u=(h,p)=>{if(!p.hasChildNodes()){n(null,h,p),Fn(),p._vnode=h;return}se=!1,m(p.firstChild,h,null,null,null),Fn(),p._vnode=h,se&&console.error("Hydration completed but contains mismatches.")},m=(h,p,T,$,R,W=!1)=>{const X=En(h)&&h.data==="[",Y=()=>j(h,p,T,$,R,X),{type:K,ref:q,shapeFlag:rt,patchFlag:_t}=p,F=h.nodeType;p.el=h,_t===-2&&(W=!1,p.dynamicChildren=null);let y=null;switch(K){case mn:F!==3?p.children===""?(l(p.el=a(""),o(h),h),y=h):y=Y():(h.data!==p.children&&(se=!0,h.data=p.children),y=i(h));break;case je:F!==8||X?y=Y():y=i(h);break;case Mn:if(F!==1&&F!==3)y=Y();else{y=h;const S=!p.children.length;for(let P=0;P<p.staticCount;P++)S&&(p.children+=y.nodeType===1?y.outerHTML:y.data),P===p.staticCount-1&&(p.anchor=y),y=i(y);return y}break;case Et:X?y=O(h,p,T,$,R,W):y=Y();break;default:if(rt&1)F!==1||p.type.toLowerCase()!==h.tagName.toLowerCase()?y=Y():y=b(h,p,T,$,R,W);else if(rt&6){p.slotScopeIds=R;const S=o(h);if(e(p,S,null,T,$,On(S),W),y=X?D(h):i(h),y&&En(y)&&y.data==="teleport end"&&(y=i(y)),nn(p)){let P;X?(P=dt(Et),P.anchor=y?y.previousSibling:S.lastChild):P=h.nodeType===3?ge(""):dt("div"),P.el=h,p.component.subTree=P}}else rt&64?F!==8?y=Y():y=p.type.hydrate(h,p,T,$,R,W,t,v):rt&128&&(y=p.type.hydrate(h,p,T,$,On(o(h)),R,W,t,m))}return q!=null&&Un(q,null,$,p),y},b=(h,p,T,$,R,W)=>{W=W||!!p.dynamicChildren;const{type:X,props:Y,patchFlag:K,shapeFlag:q,dirs:rt}=p,_t=X==="input"&&rt||X==="option";if(_t||K!==-1){if(rt&&Vt(p,null,T,"created"),Y)if(_t||!W||K&48)for(const y in Y)(_t&&y.endsWith("value")||vn(y)&&!Qe(y))&&r(h,y,null,Y[y],!1,void 0,T);else Y.onClick&&r(h,"onClick",null,Y.onClick,!1,void 0,T);let F;if((F=Y&&Y.onVnodeBeforeMount)&&Mt(F,T,p),rt&&Vt(p,null,T,"beforeMount"),((F=Y&&Y.onVnodeMounted)||rt)&&yo(()=>{F&&Mt(F,T,p),rt&&Vt(p,null,T,"mounted")},$),q&16&&!(Y&&(Y.innerHTML||Y.textContent))){let y=v(h.firstChild,p,h,T,$,R,W);for(;y;){se=!0;const S=y;y=y.nextSibling,s(S)}}else q&8&&h.textContent!==p.children&&(se=!0,h.textContent=p.children)}return h.nextSibling},v=(h,p,T,$,R,W,X)=>{X=X||!!p.dynamicChildren;const Y=p.children,K=Y.length;for(let q=0;q<K;q++){const rt=X?Y[q]:Y[q]=Lt(Y[q]);if(h)h=m(h,rt,$,R,W,X);else{if(rt.type===mn&&!rt.children)continue;se=!0,n(null,rt,T,null,$,R,On(T),W)}}return h},O=(h,p,T,$,R,W)=>{const{slotScopeIds:X}=p;X&&(R=R?R.concat(X):X);const Y=o(h),K=v(i(h),p,Y,T,$,R,W);return K&&En(K)&&K.data==="]"?i(p.anchor=K):(se=!0,l(p.anchor=c("]"),Y,K),K)},j=(h,p,T,$,R,W)=>{if(se=!0,p.el=null,W){const K=D(h);for(;;){const q=i(h);if(q&&q!==K)s(q);else break}}const X=i(h),Y=o(h);return s(h),n(null,p,Y,X,T,$,On(Y),R),X},D=h=>{let p=0;for(;h;)if(h=i(h),h&&En(h)&&(h.data==="["&&p++,h.data==="]")){if(p===0)return i(h);p--}return h};return[u,m]}const At=yo;function xf(t){return Lo(t)}function _f(t){return Lo(t,wf)}function Lo(t,e){const n=Zs();n.__VUE__=!0;const{insert:r,remove:a,patchProp:i,createElement:o,createText:s,createComment:l,setText:c,setElementText:u,parentNode:m,nextSibling:b,setScopeId:v=Ht,cloneNode:O,insertStaticContent:j}=t,D=(f,d,g,x=null,w=null,E=null,M=!1,A=null,C=!!d.dynamicChildren)=>{if(f===d)return;f&&!Ve(f,d)&&(x=$t(f),lt(f,w,E,!0),f=null),d.patchFlag===-2&&(C=!1,d.dynamicChildren=null);const{type:_,ref:z,shapeFlag:L}=d;switch(_){case mn:h(f,d,g,x);break;case je:p(f,d,g,x);break;case Mn:f==null&&T(d,g,x,M);break;case Et:F(f,d,g,x,w,E,M,A,C);break;default:L&1?W(f,d,g,x,w,E,M,A,C):L&6?y(f,d,g,x,w,E,M,A,C):(L&64||L&128)&&_.process(f,d,g,x,w,E,M,A,C,yt)}z!=null&&w&&Un(z,f&&f.ref,E,d||f,!d)},h=(f,d,g,x)=>{if(f==null)r(d.el=s(d.children),g,x);else{const w=d.el=f.el;d.children!==f.children&&c(w,d.children)}},p=(f,d,g,x)=>{f==null?r(d.el=l(d.children||""),g,x):d.el=f.el},T=(f,d,g,x)=>{[f.el,f.anchor]=j(f.children,d,g,x,f.el,f.anchor)},$=({el:f,anchor:d},g,x)=>{let w;for(;f&&f!==d;)w=b(f),r(f,g,x),f=w;r(d,g,x)},R=({el:f,anchor:d})=>{let g;for(;f&&f!==d;)g=b(f),a(f),f=g;a(d)},W=(f,d,g,x,w,E,M,A,C)=>{M=M||d.type==="svg",f==null?X(d,g,x,w,E,M,A,C):q(f,d,w,E,M,A,C)},X=(f,d,g,x,w,E,M,A)=>{let C,_;const{type:z,props:L,shapeFlag:H,transition:V,patchFlag:Q,dirs:at}=f;if(f.el&&O!==void 0&&Q===-1)C=f.el=O(f.el);else{if(C=f.el=o(f.type,E,L&&L.is,L),H&8?u(C,f.children):H&16&&K(f.children,C,null,x,w,E&&z!=="foreignObject",M,A),at&&Vt(f,null,x,"created"),L){for(const ft in L)ft!=="value"&&!Qe(ft)&&i(C,ft,null,L[ft],E,f.children,x,w,vt);"value"in L&&i(C,"value",null,L.value),(_=L.onVnodeBeforeMount)&&Mt(_,x,f)}Y(C,f,f.scopeId,M,x)}at&&Vt(f,null,x,"beforeMount");const it=(!w||w&&!w.pendingBranch)&&V&&!V.persisted;it&&V.beforeEnter(C),r(C,d,g),((_=L&&L.onVnodeMounted)||it||at)&&At(()=>{_&&Mt(_,x,f),it&&V.enter(C),at&&Vt(f,null,x,"mounted")},w)},Y=(f,d,g,x,w)=>{if(g&&v(f,g),x)for(let E=0;E<x.length;E++)v(f,x[E]);if(w){let E=w.subTree;if(d===E){const M=w.vnode;Y(f,M,M.scopeId,M.slotScopeIds,w.parent)}}},K=(f,d,g,x,w,E,M,A,C=0)=>{for(let _=C;_<f.length;_++){const z=f[_]=A?ce(f[_]):Lt(f[_]);D(null,z,d,g,x,w,E,M,A)}},q=(f,d,g,x,w,E,M)=>{const A=d.el=f.el;let{patchFlag:C,dynamicChildren:_,dirs:z}=d;C|=f.patchFlag&16;const L=f.props||st,H=d.props||st;let V;g&&ye(g,!1),(V=H.onVnodeBeforeUpdate)&&Mt(V,g,d,f),z&&Vt(d,f,g,"beforeUpdate"),g&&ye(g,!0);const Q=w&&d.type!=="foreignObject";if(_?rt(f.dynamicChildren,_,A,g,x,Q,E):M||B(f,d,A,null,g,x,Q,E,!1),C>0){if(C&16)_t(A,d,L,H,g,x,w);else if(C&2&&L.class!==H.class&&i(A,"class",null,H.class,w),C&4&&i(A,"style",L.style,H.style,w),C&8){const at=d.dynamicProps;for(let it=0;it<at.length;it++){const ft=at[it],Rt=L[ft],Te=H[ft];(Te!==Rt||ft==="value")&&i(A,ft,Rt,Te,w,f.children,g,x,vt)}}C&1&&f.children!==d.children&&u(A,d.children)}else!M&&_==null&&_t(A,d,L,H,g,x,w);((V=H.onVnodeUpdated)||z)&&At(()=>{V&&Mt(V,g,d,f),z&&Vt(d,f,g,"updated")},x)},rt=(f,d,g,x,w,E,M)=>{for(let A=0;A<d.length;A++){const C=f[A],_=d[A],z=C.el&&(C.type===Et||!Ve(C,_)||C.shapeFlag&70)?m(C.el):g;D(C,_,z,null,x,w,E,M,!0)}},_t=(f,d,g,x,w,E,M)=>{if(g!==x){for(const A in x){if(Qe(A))continue;const C=x[A],_=g[A];C!==_&&A!=="value"&&i(f,A,_,C,M,d.children,w,E,vt)}if(g!==st)for(const A in g)!Qe(A)&&!(A in x)&&i(f,A,g[A],null,M,d.children,w,E,vt);"value"in x&&i(f,"value",g.value,x.value)}},F=(f,d,g,x,w,E,M,A,C)=>{const _=d.el=f?f.el:s(""),z=d.anchor=f?f.anchor:s("");let{patchFlag:L,dynamicChildren:H,slotScopeIds:V}=d;V&&(A=A?A.concat(V):V),f==null?(r(_,g,x),r(z,g,x),K(d.children,g,z,w,E,M,A,C)):L>0&&L&64&&H&&f.dynamicChildren?(rt(f.dynamicChildren,H,g,w,E,M,A),(d.key!=null||w&&d===w.subTree)&&Do(f,d,!0)):B(f,d,g,z,w,E,M,A,C)},y=(f,d,g,x,w,E,M,A,C)=>{d.slotScopeIds=A,f==null?d.shapeFlag&512?w.ctx.activate(d,g,x,M,C):S(d,g,x,w,E,M,C):P(f,d,C)},S=(f,d,g,x,w,E,M)=>{const A=f.component=If(f,x,w);if(xo(f)&&(A.ctx.renderer=yt),Nf(A),A.asyncDep){if(w&&w.registerDep(A,k),!f.el){const C=A.subTree=dt(je);p(null,C,d,g)}return}k(A,f,d,g,w,E,M)},P=(f,d,g)=>{const x=d.component=f.component;if(Ul(f,d,g))if(x.asyncDep&&!x.asyncResolved){N(x,d,g);return}else x.next=d,Rl(x.update),x.update();else d.el=f.el,x.vnode=d},k=(f,d,g,x,w,E,M)=>{const A=()=>{if(f.isMounted){let{next:z,bu:L,u:H,parent:V,vnode:Q}=f,at=z,it;ye(f,!1),z?(z.el=Q.el,N(f,z,M)):z=Q,L&&ur(L),(it=z.props&&z.props.onVnodeBeforeUpdate)&&Mt(it,V,z,Q),ye(f,!0);const ft=dr(f),Rt=f.subTree;f.subTree=ft,D(Rt,ft,m(Rt.el),$t(Rt),f,w,E),z.el=ft.el,at===null&&Bl(f,ft.el),H&&At(H,w),(it=z.props&&z.props.onVnodeUpdated)&&At(()=>Mt(it,V,z,Q),w)}else{let z;const{el:L,props:H}=d,{bm:V,m:Q,parent:at}=f,it=nn(d);if(ye(f,!1),V&&ur(V),!it&&(z=H&&H.onVnodeBeforeMount)&&Mt(z,at,d),ye(f,!0),L&&ie){const ft=()=>{f.subTree=dr(f),ie(L,f.subTree,f,w,null)};it?d.type.__asyncLoader().then(()=>!f.isUnmounted&&ft()):ft()}else{const ft=f.subTree=dr(f);D(null,ft,g,x,f,w,E),d.el=ft.el}if(Q&&At(Q,w),!it&&(z=H&&H.onVnodeMounted)){const ft=d;At(()=>Mt(z,at,ft),w)}(d.shapeFlag&256||at&&nn(at.vnode)&&at.vnode.shapeFlag&256)&&f.a&&At(f.a,w),f.isMounted=!0,d=g=x=null}},C=f.effect=new ea(A,()=>mo(_),f.scope),_=f.update=()=>C.run();_.id=f.uid,ye(f,!0),_()},N=(f,d,g)=>{d.component=f;const x=f.vnode.props;f.vnode=d,f.next=null,hf(f,d.props,x,g),bf(f,d.children,g),Ye(),tr(void 0,f.update),We()},B=(f,d,g,x,w,E,M,A,C=!1)=>{const _=f&&f.children,z=f?f.shapeFlag:0,L=d.children,{patchFlag:H,shapeFlag:V}=d;if(H>0){if(H&128){ot(_,L,g,x,w,E,M,A,C);return}else if(H&256){tt(_,L,g,x,w,E,M,A,C);return}}V&8?(z&16&&vt(_,w,E),L!==_&&u(g,L)):z&16?V&16?ot(_,L,g,x,w,E,M,A,C):vt(_,w,E,!0):(z&8&&u(g,""),V&16&&K(L,g,x,w,E,M,A,C))},tt=(f,d,g,x,w,E,M,A,C)=>{f=f||Re,d=d||Re;const _=f.length,z=d.length,L=Math.min(_,z);let H;for(H=0;H<L;H++){const V=d[H]=C?ce(d[H]):Lt(d[H]);D(f[H],V,g,null,w,E,M,A,C)}_>z?vt(f,w,E,!0,!1,L):K(d,g,x,w,E,M,A,C,L)},ot=(f,d,g,x,w,E,M,A,C)=>{let _=0;const z=d.length;let L=f.length-1,H=z-1;for(;_<=L&&_<=H;){const V=f[_],Q=d[_]=C?ce(d[_]):Lt(d[_]);if(Ve(V,Q))D(V,Q,g,null,w,E,M,A,C);else break;_++}for(;_<=L&&_<=H;){const V=f[L],Q=d[H]=C?ce(d[H]):Lt(d[H]);if(Ve(V,Q))D(V,Q,g,null,w,E,M,A,C);else break;L--,H--}if(_>L){if(_<=H){const V=H+1,Q=V<z?d[V].el:x;for(;_<=H;)D(null,d[_]=C?ce(d[_]):Lt(d[_]),g,Q,w,E,M,A,C),_++}}else if(_>H)for(;_<=L;)lt(f[_],w,E,!0),_++;else{const V=_,Q=_,at=new Map;for(_=Q;_<=H;_++){const Ot=d[_]=C?ce(d[_]):Lt(d[_]);Ot.key!=null&&at.set(Ot.key,_)}let it,ft=0;const Rt=H-Q+1;let Te=!1,Ta=0;const qe=new Array(Rt);for(_=0;_<Rt;_++)qe[_]=0;for(_=V;_<=L;_++){const Ot=f[_];if(ft>=Rt){lt(Ot,w,E,!0);continue}let Kt;if(Ot.key!=null)Kt=at.get(Ot.key);else for(it=Q;it<=H;it++)if(qe[it-Q]===0&&Ve(Ot,d[it])){Kt=it;break}Kt===void 0?lt(Ot,w,E,!0):(qe[Kt-Q]=_+1,Kt>=Ta?Ta=Kt:Te=!0,D(Ot,d[Kt],g,null,w,E,M,A,C),ft++)}const Ma=Te?kf(qe):Re;for(it=Ma.length-1,_=Rt-1;_>=0;_--){const Ot=Q+_,Kt=d[Ot],Pa=Ot+1<z?d[Ot+1].el:x;qe[_]===0?D(null,Kt,g,Pa,w,E,M,A,C):Te&&(it<0||_!==Ma[it]?nt(Kt,g,Pa,2):it--)}}},nt=(f,d,g,x,w=null)=>{const{el:E,type:M,transition:A,children:C,shapeFlag:_}=f;if(_&6){nt(f.component.subTree,d,g,x);return}if(_&128){f.suspense.move(d,g,x);return}if(_&64){M.move(f,d,g,yt);return}if(M===Et){r(E,d,g);for(let L=0;L<C.length;L++)nt(C[L],d,g,x);r(f.anchor,d,g);return}if(M===Mn){$(f,d,g);return}if(x!==2&&_&1&&A)if(x===0)A.beforeEnter(E),r(E,d,g),At(()=>A.enter(E),w);else{const{leave:L,delayLeave:H,afterLeave:V}=A,Q=()=>r(E,d,g),at=()=>{L(E,()=>{Q(),V&&V()})};H?H(E,Q,at):at()}else r(E,d,g)},lt=(f,d,g,x=!1,w=!1)=>{const{type:E,props:M,ref:A,children:C,dynamicChildren:_,shapeFlag:z,patchFlag:L,dirs:H}=f;if(A!=null&&Un(A,null,g,f,!0),z&256){d.ctx.deactivate(f);return}const V=z&1&&H,Q=!nn(f);let at;if(Q&&(at=M&&M.onVnodeBeforeUnmount)&&Mt(at,d,f),z&6)be(f.component,g,x);else{if(z&128){f.suspense.unmount(g,x);return}V&&Vt(f,null,d,"beforeUnmount"),z&64?f.type.remove(f,d,g,w,yt,x):_&&(E!==Et||L>0&&L&64)?vt(_,d,g,!1,!0):(E===Et&&L&384||!w&&z&16)&&vt(C,d,g),x&&It(f)}(Q&&(at=M&&M.onVnodeUnmounted)||V)&&At(()=>{at&&Mt(at,d,f),V&&Vt(f,null,d,"unmounted")},g)},It=f=>{const{type:d,el:g,anchor:x,transition:w}=f;if(d===Et){Nt(g,x);return}if(d===Mn){R(f);return}const E=()=>{a(g),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(f.shapeFlag&1&&w&&!w.persisted){const{leave:M,delayLeave:A}=w,C=()=>M(g,E);A?A(f.el,E,C):C()}else E()},Nt=(f,d)=>{let g;for(;f!==d;)g=b(f),a(f),f=g;a(d)},be=(f,d,g)=>{const{bum:x,scope:w,update:E,subTree:M,um:A}=f;x&&ur(x),w.stop(),E&&(E.active=!1,lt(M,f,d,g)),A&&At(A,d),At(()=>{f.isUnmounted=!0},d),d&&d.pendingBranch&&!d.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===d.pendingId&&(d.deps--,d.deps===0&&d.resolve())},vt=(f,d,g,x=!1,w=!1,E=0)=>{for(let M=E;M<f.length;M++)lt(f[M],d,g,x,w)},$t=f=>f.shapeFlag&6?$t(f.component.subTree):f.shapeFlag&128?f.suspense.next():b(f.anchor||f.el),pt=(f,d,g)=>{f==null?d._vnode&&lt(d._vnode,null,null,!0):D(d._vnode||null,f,d,null,null,null,g),Fn(),d._vnode=f},yt={p:D,um:lt,m:nt,r:It,mt:S,mc:K,pc:B,pbc:rt,n:$t,o:t};let ve,ie;return e&&([ve,ie]=e(yt)),{render:pt,hydrate:ve,createApp:yf(pt,ve)}}function ye({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Do(t,e,n=!1){const r=t.children,a=e.children;if(G(r)&&G(a))for(let i=0;i<r.length;i++){const o=r[i];let s=a[i];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[i]=ce(a[i]),s.el=o.el),n||Do(o,s))}}function kf(t){const e=t.slice(),n=[0];let r,a,i,o,s;const l=t.length;for(r=0;r<l;r++){const c=t[r];if(c!==0){if(a=n[n.length-1],t[a]<c){e[r]=a,n.push(r);continue}for(i=0,o=n.length-1;i<o;)s=i+o>>1,t[n[s]]<c?i=s+1:o=s;c<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const Af=t=>t.__isTeleport,Et=Symbol(void 0),mn=Symbol(void 0),je=Symbol(void 0),Mn=Symbol(void 0),rn=[];let jt=null;function Bt(t=!1){rn.push(jt=t?null:[])}function Of(){rn.pop(),jt=rn[rn.length-1]||null}let hn=1;function Qa(t){hn+=t}function Ef(t){return t.dynamicChildren=hn>0?jt||Re:null,Of(),hn>0&&jt&&jt.push(t),t}function Yt(t,e,n,r,a,i){return Ef(ut(t,e,n,r,a,i,!0))}function Mr(t){return t?t.__v_isVNode===!0:!1}function Ve(t,e){return t.type===e.type&&t.key===e.key}const rr="__vInternal",Fo=({key:t})=>t!=null?t:null,Pn=({ref:t,ref_key:e,ref_for:n})=>t!=null?ht(t)||bt(t)||J(t)?{i:Xt,r:t,k:e,f:!!n}:t:null;function ut(t,e=null,n=null,r=0,a=null,i=t===Et?0:1,o=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Fo(e),ref:e&&Pn(e),scopeId:vo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null};return s?(ua(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=ht(n)?8:16),hn>0&&!o&&jt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&jt.push(l),l}const dt=Sf;function Sf(t,e=null,n=null,r=0,a=null,i=!1){if((!t||t===af)&&(t=je),Mr(t)){const s=ze(t,e,!0);return n&&ua(s,n),hn>0&&!i&&jt&&(s.shapeFlag&6?jt[jt.indexOf(t)]=s:jt.push(s)),s.patchFlag|=-2,s}if(Ff(t)&&(t=t.__vccOpts),e){e=Cf(e);let{class:s,style:l}=e;s&&!ht(s)&&(e.class=Xr(s)),mt(l)&&(ao(l)&&!G(l)&&(l=xt({},l)),e.style=Vr(l))}const o=ht(t)?1:Yl(t)?128:Af(t)?64:mt(t)?4:J(t)?2:0;return ut(t,e,n,r,a,o,i,!0)}function Cf(t){return t?ao(t)||rr in t?xt({},t):t:null}function ze(t,e,n=!1){const{props:r,ref:a,patchFlag:i,children:o}=t,s=e?Tf(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:s,key:s&&Fo(s),ref:e&&e.ref?n&&a?G(a)?a.concat(Pn(e)):[a,Pn(e)]:Pn(e):a,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Et?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ze(t.ssContent),ssFallback:t.ssFallback&&ze(t.ssFallback),el:t.el,anchor:t.anchor}}function ge(t=" ",e=0){return dt(mn,null,t,e)}function Lt(t){return t==null||typeof t=="boolean"?dt(je):G(t)?dt(Et,null,t.slice()):typeof t=="object"?ce(t):dt(mn,null,String(t))}function ce(t){return t.el===null||t.memo?t:ze(t)}function ua(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(G(e))n=16;else if(typeof e=="object")if(r&65){const a=e.default;a&&(a._c&&(a._d=!1),ua(t,a()),a._c&&(a._d=!0));return}else{n=32;const a=e._;!a&&!(rr in e)?e._ctx=Xt:a===3&&Xt&&(Xt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else J(e)?(e={default:e,_ctx:Xt},n=32):(e=String(e),r&64?(n=16,e=[ge(e)]):n=8);t.children=e,t.shapeFlag|=n}function Tf(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const a in r)if(a==="class")e.class!==r.class&&(e.class=Xr([e.class,r.class]));else if(a==="style")e.style=Vr([e.style,r.style]);else if(vn(a)){const i=e[a],o=r[a];o&&i!==o&&!(G(i)&&i.includes(o))&&(e[a]=i?[].concat(i,o):o)}else a!==""&&(e[a]=r[a])}return e}function Mt(t,e,n,r=null){Ut(t,e,7,[n,r])}const Mf=Ro();let Pf=0;function If(t,e,n){const r=t.type,a=(e?e.appContext:t.appContext)||Mf,i={uid:Pf++,vnode:t,type:r,parent:e,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,scope:new Qs(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(a.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Po(r,a),emitsOptions:bo(r,a),emit:null,emitted:null,propsDefaults:st,inheritAttrs:r.inheritAttrs,ctx:st,data:st,props:st,attrs:st,slots:st,refs:st,setupState:st,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Fl.bind(null,i),t.ce&&t.ce(i),i}let gt=null;const He=t=>{gt=t,t.scope.on()},Oe=()=>{gt&&gt.scope.off(),gt=null};function jo(t){return t.vnode.shapeFlag&4}let pn=!1;function Nf(t,e=!1){pn=e;const{props:n,children:r}=t.vnode,a=jo(t);mf(t,n,a,e),gf(t,r);const i=a?$f(t,e):void 0;return pn=!1,i}function $f(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=io(new Proxy(t.ctx,sf));const{setup:r}=n;if(r){const a=t.setupContext=r.length>1?Lf(t):null;He(t),Ye();const i=de(r,t,0,[t.props,a]);if(We(),Oe(),Yi(i)){if(i.then(Oe,Oe),e)return i.then(o=>{ti(t,o,e)}).catch(o=>{Qn(o,t,0)});t.asyncDep=i}else ti(t,i,e)}else zo(t,e)}function ti(t,e,n){J(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:mt(e)&&(t.setupState=co(e)),zo(t,n)}let ei;function zo(t,e,n){const r=t.type;if(!t.render){if(!e&&ei&&!r.render){const a=r.template;if(a){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:s,compilerOptions:l}=r,c=xt(xt({isCustomElement:i,delimiters:s},o),l);r.render=ei(a,c)}}t.render=r.render||Ht}He(t),Ye(),lf(t),We(),Oe()}function Rf(t){return new Proxy(t.attrs,{get(e,n){return Ct(t,"get","$attrs"),e[n]}})}function Lf(t){const e=r=>{t.exposed=r||{}};let n;return{get attrs(){return n||(n=Rf(t))},slots:t.slots,emit:t.emit,expose:e}}function da(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(co(io(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in zn)return zn[n](t)}}))}function Df(t,e=!0){return J(t)?t.displayName||t.name:t.name||e&&t.__name}function Ff(t){return J(t)&&"__vccOpts"in t}const Pt=(t,e)=>Pl(t,e,pn);function Ho(t,e,n){const r=arguments.length;return r===2?mt(e)&&!G(e)?Mr(e)?dt(t,null,[e]):dt(t,e):dt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Mr(n)&&(n=[n]),dt(t,e,n))}const jf="3.2.37",zf="http://www.w3.org/2000/svg",xe=typeof document!="undefined"?document:null,ni=xe&&xe.createElement("template"),Hf={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const a=e?xe.createElementNS(zf,t):xe.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:t=>xe.createTextNode(t),createComment:t=>xe.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>xe.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},cloneNode(t){const e=t.cloneNode(!0);return"_value"in t&&(e._value=t._value),e},insertStaticContent(t,e,n,r,a,i){const o=n?n.previousSibling:e.lastChild;if(a&&(a===i||a.nextSibling))for(;e.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{ni.innerHTML=r?`<svg>${t}</svg>`:t;const s=ni.content;if(r){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}e.insertBefore(s,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function Uf(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function Bf(t,e,n){const r=t.style,a=ht(n);if(n&&!a){for(const i in n)Pr(r,i,n[i]);if(e&&!ht(e))for(const i in e)n[i]==null&&Pr(r,i,"")}else{const i=r.display;a?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const ri=/\s*!important$/;function Pr(t,e,n){if(G(n))n.forEach(r=>Pr(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Yf(t,e);ri.test(n)?t.setProperty(Be(r),n.replace(ri,""),"important"):t[r]=n}}const ai=["Webkit","Moz","ms"],mr={};function Yf(t,e){const n=mr[e];if(n)return n;let r=Jt(e);if(r!=="filter"&&r in t)return mr[e]=r;r=Jn(r);for(let a=0;a<ai.length;a++){const i=ai[a]+r;if(i in t)return mr[e]=i}return e}const ii="http://www.w3.org/1999/xlink";function Wf(t,e,n,r,a){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(ii,e.slice(6,e.length)):t.setAttributeNS(ii,e,n);else{const i=Hs(e);n==null||i&&!Hi(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function Kf(t,e,n,r,a,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,a,i),t[e]=n==null?"":n;return}if(e==="value"&&t.tagName!=="PROGRESS"&&!t.tagName.includes("-")){t._value=n;const l=n==null?"":n;(t.value!==l||t.tagName==="OPTION")&&(t.value=l),n==null&&t.removeAttribute(e);return}let s=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Hi(n):n==null&&l==="string"?(n="",s=!0):l==="number"&&(n=0,s=!0)}try{t[e]=n}catch{}s&&t.removeAttribute(e)}const[Uo,qf]=(()=>{let t=Date.now,e=!1;if(typeof window!="undefined"){Date.now()>document.createEvent("Event").timeStamp&&(t=performance.now.bind(performance));const n=navigator.userAgent.match(/firefox\/(\d+)/i);e=!!(n&&Number(n[1])<=53)}return[t,e]})();let Ir=0;const Vf=Promise.resolve(),Xf=()=>{Ir=0},Gf=()=>Ir||(Vf.then(Xf),Ir=Uo());function Jf(t,e,n,r){t.addEventListener(e,n,r)}function Zf(t,e,n,r){t.removeEventListener(e,n,r)}function Qf(t,e,n,r,a=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[s,l]=tc(e);if(r){const c=i[e]=ec(r,a);Jf(t,s,c,l)}else o&&(Zf(t,s,o,l),i[e]=void 0)}}const oi=/(?:Once|Passive|Capture)$/;function tc(t){let e;if(oi.test(t)){e={};let n;for(;n=t.match(oi);)t=t.slice(0,t.length-n[0].length),e[n[0].toLowerCase()]=!0}return[Be(t.slice(2)),e]}function ec(t,e){const n=r=>{const a=r.timeStamp||Uo();(qf||a>=n.attached-1)&&Ut(nc(r,n.value),e,5,[r])};return n.value=t,n.attached=Gf(),n}function nc(t,e){if(G(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>a=>!a._stopped&&r&&r(a))}else return e}const si=/^on[a-z]/,rc=(t,e,n,r,a=!1,i,o,s,l)=>{e==="class"?Uf(t,r,a):e==="style"?Bf(t,n,r):vn(e)?Gr(e)||Qf(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):ac(t,e,r,a))?Kf(t,e,r,i,o,s,l):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Wf(t,e,r,a))};function ac(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&si.test(e)&&J(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||si.test(e)&&ht(n)?!1:e in t}const Bo=xt({patchProp:rc},Hf);let an,li=!1;function ic(){return an||(an=xf(Bo))}function oc(){return an=li?an:_f(Bo),li=!0,an}const sc=(...t)=>{const e=ic().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=Yo(r);if(!a)return;const i=e._component;!J(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.innerHTML="";const o=n(a,!1,a instanceof SVGElement);return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},e},lc=(...t)=>{const e=oc().createApp(...t),{mount:n}=e;return e.mount=r=>{const a=Yo(r);if(a)return n(a,!0,a instanceof SVGElement)},e};function Yo(t){return ht(t)?document.querySelector(t):t}var fc=Object.defineProperty,fi=Object.getOwnPropertySymbols,cc=Object.prototype.hasOwnProperty,uc=Object.prototype.propertyIsEnumerable,ci=(t,e,n)=>e in t?fc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,dc=(t,e)=>{for(var n in e||(e={}))cc.call(e,n)&&ci(t,n,e[n]);if(fi)for(var n of fi(e))uc.call(e,n)&&ci(t,n,e[n]);return t},Wo="usehead",ui="head:count",hr="data-head-attrs",Ko="data-meta-body",mc=(t,e,n)=>{const r=n.createElement(t);for(const a of Object.keys(e))if(a==="body"&&e.body===!0)r.setAttribute(Ko,"true");else{let i=e[a];if(a==="key"||i===!1)continue;a==="children"?r.textContent=i:r.setAttribute(a,i)}return r};function di(t,e){if(t instanceof HTMLElement&&e instanceof HTMLElement){const n=e.getAttribute("nonce");if(n&&!t.getAttribute("nonce")){const r=e.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===t.nonce&&t.isEqualNode(r)}}return t.isEqualNode(e)}var hc=t=>{const e=["key","id","name","property"];for(const n of e){const r=typeof t.getAttribute=="function"?t.hasAttribute(n)?t.getAttribute(n):void 0:t[n];if(r!==void 0)return{name:n,value:r}}},pc=()=>{const t=Cn(Wo);if(!t)throw new Error("You may forget to apply app.use(head)");return t},gc=["title","meta","link","base","style","script","noscript","htmlAttrs","bodyAttrs"],bc=(t,e)=>t==null?"":typeof t=="string"?t.replace("%s",e!=null?e:""):t(Ln(e)),vc=t=>{const e=[],n=Object.keys(t);for(const r of n)if(t[r]!=null)switch(r){case"title":e.push({tag:r,props:{children:t[r]}});break;case"titleTemplate":break;case"base":e.push({tag:r,props:dc({key:"default"},t[r])});break;default:if(gc.includes(r)){const a=t[r];Array.isArray(a)?a.forEach(i=>{e.push({tag:r,props:i})}):a&&e.push({tag:r,props:a})}break}return e},mi=(t,e)=>{const n=t.getAttribute(hr);if(n)for(const a of n.split(","))a in e||t.removeAttribute(a);const r=[];for(const a in e){const i=e[a];i!=null&&(i===!1?t.removeAttribute(a):t.setAttribute(a,i),r.push(a))}r.length?t.setAttribute(hr,r.join(",")):t.removeAttribute(hr)},yc=(t=window.document,e,n)=>{var r,a;const i=t.head,o=t.body;let s=i.querySelector(`meta[name="${ui}"]`),l=o.querySelectorAll(`[${Ko}]`);const c=s?Number(s.getAttribute("content")):0,u=[],m=[];if(l)for(let v=0;v<l.length;v++)l[v]&&((r=l[v].tagName)==null?void 0:r.toLowerCase())===e&&m.push(l[v]);if(s)for(let v=0,O=s.previousElementSibling;v<c;v++,O=(O==null?void 0:O.previousElementSibling)||null)((a=O==null?void 0:O.tagName)==null?void 0:a.toLowerCase())===e&&u.push(O);else s=t.createElement("meta"),s.setAttribute("name",ui),s.setAttribute("content","0"),i.append(s);let b=n.map(v=>{var O;return{element:mc(v.tag,v.props,t),body:(O=v.props.body)!=null?O:!1}});b=b.filter(v=>{for(let O=0;O<u.length;O++){const j=u[O];if(di(j,v.element))return u.splice(O,1),!1}for(let O=0;O<m.length;O++){const j=m[O];if(di(j,v.element))return m.splice(O,1),!1}return!0}),m.forEach(v=>{var O;return(O=v.parentNode)==null?void 0:O.removeChild(v)}),u.forEach(v=>{var O;return(O=v.parentNode)==null?void 0:O.removeChild(v)}),b.forEach(v=>{v.body===!0?o.insertAdjacentElement("beforeend",v.element):i.insertBefore(v.element,s)}),s.setAttribute("content",""+(c-u.length+b.filter(v=>!v.body).length))},wc=t=>{let e=[],n=new Set;t&&e.push(Sl(t));const r={install(a){a.config.globalProperties.$head=r,a.provide(Wo,r)},get headTags(){const a=[],i=e.map(o=>Ln(o).titleTemplate).reverse().find(o=>o!=null);return e.forEach(o=>{vc(Ln(o)).forEach(l=>{if(l.tag==="meta"||l.tag==="base"||l.tag==="script"){const c=hc(l.props);if(c){let u=-1;for(let m=0;m<a.length;m++){const b=a[m],v=b.props[c.name],O=l.props[c.name];if(b.tag===l.tag&&v===O){u=m;break}}u!==-1&&a.splice(u,1)}}i&&l.tag==="title"&&(l.props.children=bc(i,l.props.children)),a.push(l)})}),a},addHeadObjs(a){e.push(a)},removeHeadObjs(a){e=e.filter(i=>i!==a)},updateDOM(a=window.document){let i,o={},s={};const l={};for(const u of r.headTags){if(u.tag==="title"){i=u.props.children;continue}if(u.tag==="htmlAttrs"){Object.assign(o,u.props);continue}if(u.tag==="bodyAttrs"){Object.assign(s,u.props);continue}l[u.tag]=l[u.tag]||[],l[u.tag].push(u)}i!==void 0&&(a.title=i),mi(a.documentElement,o),mi(a.body,s);const c=new Set([...Object.keys(l),...n]);for(const u of c)yc(a,u,l[u]||[]);n.clear(),Object.keys(l).forEach(u=>n.add(u))}};return r},xc=typeof window!="undefined",_c=t=>{const e=pc(),n=lo(t);e.addHeadObjs(n),xc&&(Kl(()=>{e.updateDOM()}),Ao(()=>{e.removeHeadObjs(n),e.updateDOM()}))};function kc(t){try{return JSON.parse(t||"{}")}catch(e){return console.error("[SSG] On state deserialization -",e,t),{}}}function Ac(t){return document.readyState==="loading"?new Promise(e=>{document.addEventListener("DOMContentLoaded",()=>e(t))}):Promise.resolve(t)}const Oc=Wt({setup(t,{slots:e}){const n=lo(!1);return ko(()=>n.value=!0),()=>n.value&&e.default&&e.default({})}});function Ec(t,e,n={}){const{transformState:r,registerComponents:a=!0,useHead:i=!0,rootContainer:o="#app"}=n,s=typeof window!="undefined";async function l(c=!1){const u=c?sc(t):lc(t);let m;i&&(m=wc(),u.use(m));const b=[],j={app:u,head:m,isClient:s,router:void 0,routes:void 0,initialState:{},onSSRAppRendered:c?()=>{}:h=>b.push(h),triggerOnSSRAppRendered:()=>Promise.all(b.map(h=>h())),transformState:r};a&&u.component("ClientOnly",c?Oc:{render:()=>null}),c&&(await Ac(),j.initialState=(r==null?void 0:r(window.__INITIAL_STATE__||{}))||kc(window.__INITIAL_STATE__)),await(e==null?void 0:e(j));const D=j.initialState;return Ra($a({},j),{initialState:D})}return s&&(async()=>{const{app:c}=await l(!0);c.mount(o,!0)})(),l}var qo=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Vo={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(qo,function(){var n=1e3,r=6e4,a=36e5,i="millisecond",o="second",s="minute",l="hour",c="day",u="week",m="month",b="quarter",v="year",O="date",j="Invalid Date",D=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},T=function(F,y,S){var P=String(F);return!P||P.length>=y?F:""+Array(y+1-P.length).join(S)+F},$={s:T,z:function(F){var y=-F.utcOffset(),S=Math.abs(y),P=Math.floor(S/60),k=S%60;return(y<=0?"+":"-")+T(P,2,"0")+":"+T(k,2,"0")},m:function F(y,S){if(y.date()<S.date())return-F(S,y);var P=12*(S.year()-y.year())+(S.month()-y.month()),k=y.clone().add(P,m),N=S-k<0,B=y.clone().add(P+(N?-1:1),m);return+(-(P+(S-k)/(N?k-B:B-k))||0)},a:function(F){return F<0?Math.ceil(F)||0:Math.floor(F)},p:function(F){return{M:m,y:v,w:u,d:c,D:O,h:l,m:s,s:o,ms:i,Q:b}[F]||String(F||"").toLowerCase().replace(/s$/,"")},u:function(F){return F===void 0}},R="en",W={};W[R]=p;var X=function(F){return F instanceof rt},Y=function F(y,S,P){var k;if(!y)return R;if(typeof y=="string"){var N=y.toLowerCase();W[N]&&(k=N),S&&(W[N]=S,k=N);var B=y.split("-");if(!k&&B.length>1)return F(B[0])}else{var tt=y.name;W[tt]=y,k=tt}return!P&&k&&(R=k),k||!P&&R},K=function(F,y){if(X(F))return F.clone();var S=typeof y=="object"?y:{};return S.date=F,S.args=arguments,new rt(S)},q=$;q.l=Y,q.i=X,q.w=function(F,y){return K(F,{locale:y.$L,utc:y.$u,x:y.$x,$offset:y.$offset})};var rt=function(){function F(S){this.$L=Y(S.locale,null,!0),this.parse(S)}var y=F.prototype;return y.parse=function(S){this.$d=function(P){var k=P.date,N=P.utc;if(k===null)return new Date(NaN);if(q.u(k))return new Date;if(k instanceof Date)return new Date(k);if(typeof k=="string"&&!/Z$/i.test(k)){var B=k.match(D);if(B){var tt=B[2]-1||0,ot=(B[7]||"0").substring(0,3);return N?new Date(Date.UTC(B[1],tt,B[3]||1,B[4]||0,B[5]||0,B[6]||0,ot)):new Date(B[1],tt,B[3]||1,B[4]||0,B[5]||0,B[6]||0,ot)}}return new Date(k)}(S),this.$x=S.x||{},this.init()},y.init=function(){var S=this.$d;this.$y=S.getFullYear(),this.$M=S.getMonth(),this.$D=S.getDate(),this.$W=S.getDay(),this.$H=S.getHours(),this.$m=S.getMinutes(),this.$s=S.getSeconds(),this.$ms=S.getMilliseconds()},y.$utils=function(){return q},y.isValid=function(){return this.$d.toString()!==j},y.isSame=function(S,P){var k=K(S);return this.startOf(P)<=k&&k<=this.endOf(P)},y.isAfter=function(S,P){return K(S)<this.startOf(P)},y.isBefore=function(S,P){return this.endOf(P)<K(S)},y.$g=function(S,P,k){return q.u(S)?this[P]:this.set(k,S)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(S,P){var k=this,N=!!q.u(P)||P,B=q.p(S),tt=function($t,pt){var yt=q.w(k.$u?Date.UTC(k.$y,pt,$t):new Date(k.$y,pt,$t),k);return N?yt:yt.endOf(c)},ot=function($t,pt){return q.w(k.toDate()[$t].apply(k.toDate("s"),(N?[0,0,0,0]:[23,59,59,999]).slice(pt)),k)},nt=this.$W,lt=this.$M,It=this.$D,Nt="set"+(this.$u?"UTC":"");switch(B){case v:return N?tt(1,0):tt(31,11);case m:return N?tt(1,lt):tt(0,lt+1);case u:var be=this.$locale().weekStart||0,vt=(nt<be?nt+7:nt)-be;return tt(N?It-vt:It+(6-vt),lt);case c:case O:return ot(Nt+"Hours",0);case l:return ot(Nt+"Minutes",1);case s:return ot(Nt+"Seconds",2);case o:return ot(Nt+"Milliseconds",3);default:return this.clone()}},y.endOf=function(S){return this.startOf(S,!1)},y.$set=function(S,P){var k,N=q.p(S),B="set"+(this.$u?"UTC":""),tt=(k={},k[c]=B+"Date",k[O]=B+"Date",k[m]=B+"Month",k[v]=B+"FullYear",k[l]=B+"Hours",k[s]=B+"Minutes",k[o]=B+"Seconds",k[i]=B+"Milliseconds",k)[N],ot=N===c?this.$D+(P-this.$W):P;if(N===m||N===v){var nt=this.clone().set(O,1);nt.$d[tt](ot),nt.init(),this.$d=nt.set(O,Math.min(this.$D,nt.daysInMonth())).$d}else tt&&this.$d[tt](ot);return this.init(),this},y.set=function(S,P){return this.clone().$set(S,P)},y.get=function(S){return this[q.p(S)]()},y.add=function(S,P){var k,N=this;S=Number(S);var B=q.p(P),tt=function(lt){var It=K(N);return q.w(It.date(It.date()+Math.round(lt*S)),N)};if(B===m)return this.set(m,this.$M+S);if(B===v)return this.set(v,this.$y+S);if(B===c)return tt(1);if(B===u)return tt(7);var ot=(k={},k[s]=r,k[l]=a,k[o]=n,k)[B]||1,nt=this.$d.getTime()+S*ot;return q.w(nt,this)},y.subtract=function(S,P){return this.add(-1*S,P)},y.format=function(S){var P=this,k=this.$locale();if(!this.isValid())return k.invalidDate||j;var N=S||"YYYY-MM-DDTHH:mm:ssZ",B=q.z(this),tt=this.$H,ot=this.$m,nt=this.$M,lt=k.weekdays,It=k.months,Nt=function(pt,yt,ve,ie){return pt&&(pt[yt]||pt(P,N))||ve[yt].slice(0,ie)},be=function(pt){return q.s(tt%12||12,pt,"0")},vt=k.meridiem||function(pt,yt,ve){var ie=pt<12?"AM":"PM";return ve?ie.toLowerCase():ie},$t={YY:String(this.$y).slice(-2),YYYY:this.$y,M:nt+1,MM:q.s(nt+1,2,"0"),MMM:Nt(k.monthsShort,nt,It,3),MMMM:Nt(It,nt),D:this.$D,DD:q.s(this.$D,2,"0"),d:String(this.$W),dd:Nt(k.weekdaysMin,this.$W,lt,2),ddd:Nt(k.weekdaysShort,this.$W,lt,3),dddd:lt[this.$W],H:String(tt),HH:q.s(tt,2,"0"),h:be(1),hh:be(2),a:vt(tt,ot,!0),A:vt(tt,ot,!1),m:String(ot),mm:q.s(ot,2,"0"),s:String(this.$s),ss:q.s(this.$s,2,"0"),SSS:q.s(this.$ms,3,"0"),Z:B};return N.replace(h,function(pt,yt){return yt||$t[pt]||B.replace(":","")})},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(S,P,k){var N,B=q.p(P),tt=K(S),ot=(tt.utcOffset()-this.utcOffset())*r,nt=this-tt,lt=q.m(this,tt);return lt=(N={},N[v]=lt/12,N[m]=lt,N[b]=lt/3,N[u]=(nt-ot)/6048e5,N[c]=(nt-ot)/864e5,N[l]=nt/a,N[s]=nt/r,N[o]=nt/n,N)[B]||nt,k?lt:q.a(lt)},y.daysInMonth=function(){return this.endOf(m).$D},y.$locale=function(){return W[this.$L]},y.locale=function(S,P){if(!S)return this.$L;var k=this.clone(),N=Y(S,P,!0);return N&&(k.$L=N),k},y.clone=function(){return q.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},F}(),_t=rt.prototype;return K.prototype=_t,[["$ms",i],["$s",o],["$m",s],["$H",l],["$W",c],["$M",m],["$y",v],["$D",O]].forEach(function(F){_t[F[1]]=function(y){return this.$g(y,F[0],F[1])}}),K.extend=function(F,y){return F.$i||(F(y,rt,K),F.$i=!0),K},K.locale=Y,K.isDayjs=X,K.unix=function(F){return K(1e3*F)},K.en=W[R],K.Ls=W,K.p={},K})})(Vo);var Xo=Vo.exports,Go={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(qo,function(){return function(n,r,a){n=n||{};var i=r.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(c,u,m,b){return i.fromToBase(c,u,m,b)}a.en.relativeTime=o,i.fromToBase=function(c,u,m,b,v){for(var O,j,D,h=m.$locale().relativeTime||o,p=n.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],T=p.length,$=0;$<T;$+=1){var R=p[$];R.d&&(O=b?a(c).diff(m,R.d,!0):m.diff(c,R.d,!0));var W=(n.rounding||Math.round)(Math.abs(O));if(D=O>0,W<=R.r||!R.r){W<=1&&$>0&&(R=p[$-1]);var X=h[R.l];v&&(W=v(""+W)),j=typeof X=="string"?X.replace("%d",W):X(W,u,R.l,D);break}}if(u)return j;var Y=D?h.future:h.past;return typeof Y=="function"?Y(j):Y.replace("%s",j)},i.to=function(c,u){return s(c,u,this,!0)},i.from=function(c,u){return s(c,u,this)};var l=function(c){return c.$u?a.utc():a()};i.toNow=function(c){return this.to(l(this),c)},i.fromNow=function(c){return this.from(l(this),c)}}})})(Go);var Sc=Go.exports;const Cc="2017-04-01",Tc="+380731602028",Mc="https://t.me/m_nkv",Pc="max.novikov.work@gmail.com",Ic=t=>Math.sin(t*Math.PI/180);var Nr=(t=>(t.Yellow="#ffcc00",t.Blue="#0066cc",t))(Nr||{}),Ce=(t,e)=>{const n=t.__vccOpts||t;for(const[r,a]of e)n[r]=a;return n};const ma=35,ar=45,Nc=360,ha=1.25,gn=1,hi=Nc/ar,$c=Math.floor(ma/2-1),Ue=4,Jo=ha*2+Ue,Zo=1+Ue,Rc=ma*gn+Jo*2+ha*2+Ue,Lc=ar+Zo*2+Ue,Dc=t=>{const e=[];for(let n=0;n<ma;n++){e[n]=[];for(let r=0;r<ar;r++){const a=hi*t+hi*r;e[n][r]={color:n<=$c?Nr.Blue:Nr.Yellow,x:Zo+r*gn,y:Jo+n*gn+Ic(a)*ha}}}return e},Fc=Wt({data(){return{step:0}},mounted(){this.initializeAnimation()},methods:{initializeAnimation(){this.setCanvasSize(),this.draw(0),this.setAnimation()},setCanvasSize(){const t=this.$refs.canvas,e=t.getContext("2d");t.width=Lc,t.height=Rc;const n=window.devicePixelRatio,r=t.getBoundingClientRect();t.width=r.width*n,t.height=r.height*n,e.scale(n,n),t.style.width=`${r.width}px`,t.style.height=`${r.height}px`},setAnimation(){requestAnimationFrame(()=>{this.step=this.step>=ar?0:this.step+1,this.draw(this.step),setTimeout(this.setAnimation,25)})},draw(t){const e=this.$refs.canvas,n=e.getContext("2d",{alpha:!1});n.clearRect(0,0,e.width,e.height),n.shadowBlur=1,n.shadowColor="rgba(0,0,0, 0.65)",n.shadowOffsetY=Ue,n.shadowOffsetX=Ue,Dc(t).forEach(a=>a.forEach(i=>{n.fillStyle=i.color,n.fillRect(i.x,i.y,gn,gn)}))}}}),jc={ref:"canvas"};function zc(t,e,n,r,a,i){return Bt(),Yt("canvas",jc,null,512)}var Hc=Ce(Fc,[["render",zc]]);const Uc=Wt({setup(){return{PHONE_NUMBER:Tc,TELEGRAM_LINK:Mc,EMAIL_ADDRESS:Pc}}}),Bc={class:"flex items-center gap-x-4"},Yc=ut("strong",null,"My contacts:",-1),Wc=["href"],Kc=["href"],qc=["href"];function Vc(t,e,n,r,a,i){const o=_e("font-awesome-icon");return Bt(),Yt("div",Bc,[Yc,ut("a",{class:"text-red-400",href:`mailto:${t.EMAIL_ADDRESS}`},[dt(o,{icon:"at"})],8,Wc),ut("a",{class:"text-red-400",href:t.TELEGRAM_LINK},[dt(o,{icon:["fa-brands","telegram-plane"]})],8,Kc),ut("a",{class:"text-red-400",href:`tel:${t.PHONE_NUMBER}`},[dt(o,{icon:"phone"})],8,qc)])}var Xc=Ce(Uc,[["render",Vc]]);Xo.extend(Sc);const Gc=Wt({components:{ContactsBlock:Xc,CanvasAnimation:Hc},computed:{startWorkingDate(){return Xo(Cc).fromNow(!0)}}}),Jc={class:"text-5xl font-semibold flex"},Zc=ge(" Hello. "),Qc={class:"content-block__wrapper mt-12"},tu={class:"mb-3"},eu=ge(" My name is "),nu=ut("strong",null,"Maksym Novikov.",-1),ru=ge(" I am a Front-end engineer with "),au={class:"whitespace-nowrap"},iu=ge(" of experience"),ou=ge(" in developing projects of different scales. "),su=ut("p",{class:"mb-3"}," My primary responsibilities are developing projects from scratch and support of existing projects. I also had an experience of team management and working with customers. ",-1),lu=ut("p",null," I dedicate my free time to studying and contributing to open source. ",-1);function fu(t,e,n,r,a,i){const o=_e("canvas-animation"),s=_e("contacts-block");return Bt(),Yt("section",null,[ut("h1",Jc,[Zc,dt(o,{class:"ml-1 mt-1 sm:mt-2.5"})]),ut("div",Qc,[ut("p",tu,[eu,nu,ru,ut("strong",null,[ut("span",au,Ze(t.startWorkingDate),1),iu]),ou]),su,lu]),dt(s,{class:"mt-4"})])}var cu=Ce(Gc,[["render",fu]]);const uu=[{title:"Milan Art Institute | April 2021 - Present",description:"My primary responsibilities is development of social network platform frontend part and admin panel for it from scratch.",techStack:"Vue.js, Nuxt.js, SSR, Composition API, TypeScript, WebSocket, Element UI."},{title:"Kilian business consulting GmbHv | October 2019 - March 2021",description:"Was responsible for development of customer personal cabinet UI, estimating of features development, code review.",techStack:"Vue.js, Vuex, Gridsome, Bootstrap."},{title:"Empat | June 2018 - April 2021",description:"Was responsible for development of CRM systems on Vue.js, development of websites with Drupal/Wordpress CMS systems, estimation of new projects, support of existing projects mentoring of trainee engineers.",techStack:"Vue.js, Nuxt.js, Vuex, Gulp, Webpack, JQuery, PHP, Wordpress."},{title:"Schr\xF6dinger's Cat Laboratory | April 2017 \u2013 June 2018",description:"My primary tasks was development of landing pages, UI part of e-commerce websites, corporative websites.",techStack:"HTML, Grunt, LESS, SCSS, CSS, JS, JQuery."}],du=Wt({computed:{experienceList(){return uu}}}),mu={class:"mt-12"},hu=ut("h2",{class:"text-2xl font-semibold"},"Work experience",-1),pu={class:"mt-6 list-disc pl-4"},gu={class:"font-semibold mb-1"},bu={class:"mb-3"},vu=ut("strong",null,"Tech stack:",-1);function yu(t,e,n,r,a,i){return Bt(),Yt("section",mu,[hu,ut("ul",pu,[(Bt(!0),Yt(Et,null,So(t.experienceList,(o,s)=>(Bt(),Yt("li",{key:s,class:"mb-6"},[ut("p",gu,Ze(o.title),1),ut("p",bu,Ze(o.description),1),ut("p",null,[vu,ge(" "+Ze(o.techStack),1)])]))),128))])])}var wu=Ce(du,[["render",yu]]);const xu=["https://www.milanart.com/","https://akurateco.com/","https://express-tehbud.com/","https://www.csi.org.ua/","https://empat.tech/","https://smartdome.ch/"],_u=Wt({computed:{examplesList(){return xu}}}),ku={class:"mt-12"},Au=ut("h2",{class:"text-2xl font-semibold"},"Examples of my work",-1),Ou={class:"mt-6 list-disc pl-4"},Eu=["href"];function Su(t,e,n,r,a,i){return Bt(),Yt("section",ku,[Au,ut("ul",Ou,[(Bt(!0),Yt(Et,null,So(t.examplesList,o=>(Bt(),Yt("li",{key:o,class:"mb-2"},[ut("a",{href:o,target:"_blank",class:"text-red-400 border-b-2 border-dashed border-red-400"},Ze(o),9,Eu)]))),128))])])}var Cu=Ce(_u,[["render",Su]]);const Tu=()=>{localStorage.theme==="dark"||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.body.classList.add("dark"):document.body.classList.remove("dark")};const Mu=Wt({methods:{onClick(){document.body.classList.contains("dark")?document.body.classList.remove("dark"):document.body.classList.add("dark")}}});function Pu(t,e,n,r,a,i){return Bt(),Yt("button",{onClick:e[0]||(e[0]=(...o)=>t.onClick&&t.onClick(...o))})}var Iu=Ce(Mu,[["render",Pu],["__scopeId","data-v-0f1b4eca"]]);const Nu=Wt({components:{ThemeSwitcher:Iu,ContentBlock:cu,WorkExperience:wu,ExamplesOfWork:Cu},setup(){_c({title:"Maksym Novikov's website",meta:[{name:"description",content:"You can view more info about me on this website."},{property:"og:url",content:"https://maxnvk.github.io/"},{property:"og:title",content:"Maksym Novikov's website"},{property:"og:description",content:"You can view more info about me on this website."},{property:"og:image",content:"/og-image.png"}]})},beforeMount(){Tu()}}),$u={class:"min-h-screen bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-800 px-4 py-10 sm:px-12 sm:py-16"},Ru={class:"wrapper flex-grow w-full"};function Lu(t,e,n,r,a,i){const o=_e("content-block"),s=_e("work-experience"),l=_e("examples-of-work"),c=_e("theme-switcher");return Bt(),Yt("main",$u,[ut("div",Ru,[dt(o),dt(s),dt(l)]),dt(c)])}var Du=Ce(Nu,[["render",Lu],["__scopeId","data-v-0f050fd8"]]);/*!
 * Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */function pi(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?pi(Object(n),!0).forEach(function(r){zu(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):pi(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Bn(t){return Bn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Bn(t)}function Fu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function gi(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ju(t,e,n){return e&&gi(t.prototype,e),n&&gi(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function zu(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function pa(t,e){return Uu(t)||Yu(t,e)||Qo(t,e)||Ku()}function ir(t){return Hu(t)||Bu(t)||Qo(t)||Wu()}function Hu(t){if(Array.isArray(t))return $r(t)}function Uu(t){if(Array.isArray(t))return t}function Bu(t){if(typeof Symbol!="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Yu(t,e){var n=t==null?null:typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,o,s;try{for(n=n.call(t);!(a=(o=n.next()).done)&&(r.push(o.value),!(e&&r.length===e));a=!0);}catch(l){i=!0,s=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw s}}return r}}function Qo(t,e){if(!!t){if(typeof t=="string")return $r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $r(t,e)}}function $r(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Wu(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ku(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var bi=function(){},ga={},ts={},es=null,ns={mark:bi,measure:bi};try{typeof window!="undefined"&&(ga=window),typeof document!="undefined"&&(ts=document),typeof MutationObserver!="undefined"&&(es=MutationObserver),typeof performance!="undefined"&&(ns=performance)}catch{}var qu=ga.navigator||{},vi=qu.userAgent,yi=vi===void 0?"":vi,he=ga,ct=ts,wi=es,Sn=ns;he.document;var ae=!!ct.documentElement&&!!ct.head&&typeof ct.addEventListener=="function"&&typeof ct.createElement=="function",rs=~yi.indexOf("MSIE")||~yi.indexOf("Trident/"),te="___FONT_AWESOME___",Rr=16,as="fa",is="svg-inline--fa",Ee="data-fa-i2svg",Lr="data-fa-pseudo-element",Vu="data-fa-pseudo-element-pending",ba="data-prefix",va="data-icon",xi="fontawesome-i2svg",Xu="async",Gu=["HTML","HEAD","STYLE","SCRIPT"],os=function(){try{return!0}catch{return!1}}(),ya={fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit",fa:"solid"},Yn={solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"},ss={fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},Ju={"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},Zu=/fa[srltdbk]?[\-\ ]/,ls="fa-layers-text",Qu=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,td={900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},fs=[1,2,3,4,5,6,7,8,9,10],ed=fs.concat([11,12,13,14,15,16,17,18,19,20]),nd=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],ke={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},rd=[].concat(ir(Object.keys(Yn)),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",ke.GROUP,ke.SWAP_OPACITY,ke.PRIMARY,ke.SECONDARY]).concat(fs.map(function(t){return"".concat(t,"x")})).concat(ed.map(function(t){return"w-".concat(t)})),cs=he.FontAwesomeConfig||{};function ad(t){var e=ct.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function id(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(ct&&typeof ct.querySelector=="function"){var od=[["data-family-prefix","familyPrefix"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];od.forEach(function(t){var e=pa(t,2),n=e[0],r=e[1],a=id(ad(n));a!=null&&(cs[r]=a)})}var sd={familyPrefix:as,styleDefault:"solid",replacementClass:is,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},on=I(I({},sd),cs);on.autoReplaceSvg||(on.observeMutations=!1);var U={};Object.keys(on).forEach(function(t){Object.defineProperty(U,t,{enumerable:!0,set:function(n){on[t]=n,In.forEach(function(r){return r(U)})},get:function(){return on[t]}})});he.FontAwesomeConfig=U;var In=[];function ld(t){return In.push(t),function(){In.splice(In.indexOf(t),1)}}var le=Rr,Gt={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function fd(t){if(!(!t||!ae)){var e=ct.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=ct.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(r=i)}return ct.head.insertBefore(e,r),t}}var cd="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function bn(){for(var t=12,e="";t-- >0;)e+=cd[Math.random()*62|0];return e}function Ke(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function wa(t){return t.classList?Ke(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function us(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ud(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(us(t[n]),'" ')},"").trim()}function or(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function xa(t){return t.size!==Gt.size||t.x!==Gt.x||t.y!==Gt.y||t.rotate!==Gt.rotate||t.flipX||t.flipY}function dd(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:c}}function md(t){var e=t.transform,n=t.width,r=n===void 0?Rr:n,a=t.height,i=a===void 0?Rr:a,o=t.startCentered,s=o===void 0?!1:o,l="";return s&&rs?l+="translate(".concat(e.x/le-r/2,"em, ").concat(e.y/le-i/2,"em) "):s?l+="translate(calc(-50% + ".concat(e.x/le,"em), calc(-50% + ").concat(e.y/le,"em)) "):l+="translate(".concat(e.x/le,"em, ").concat(e.y/le,"em) "),l+="scale(".concat(e.size/le*(e.flipX?-1:1),", ").concat(e.size/le*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var hd=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function ds(){var t=as,e=is,n=U.familyPrefix,r=U.replacementClass,a=hd;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(r))}return a}var _i=!1;function pr(){U.autoAddCss&&!_i&&(fd(ds()),_i=!0)}var pd={mixout:function(){return{dom:{css:ds,insertCss:pr}}},hooks:function(){return{beforeDOMElementCreation:function(){pr()},beforeI2svg:function(){pr()}}}},ee=he||{};ee[te]||(ee[te]={});ee[te].styles||(ee[te].styles={});ee[te].hooks||(ee[te].hooks={});ee[te].shims||(ee[te].shims=[]);var zt=ee[te],ms=[],gd=function t(){ct.removeEventListener("DOMContentLoaded",t),Wn=1,ms.map(function(e){return e()})},Wn=!1;ae&&(Wn=(ct.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(ct.readyState),Wn||ct.addEventListener("DOMContentLoaded",gd));function bd(t){!ae||(Wn?setTimeout(t,0):ms.push(t))}function yn(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?us(t):"<".concat(e," ").concat(ud(r),">").concat(i.map(yn).join(""),"</").concat(e,">")}function ki(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var vd=function(e,n){return function(r,a,i,o){return e.call(n,r,a,i,o)}},gr=function(e,n,r,a){var i=Object.keys(e),o=i.length,s=a!==void 0?vd(n,a):n,l,c,u;for(r===void 0?(l=1,u=e[i[0]]):(l=0,u=r);l<o;l++)c=i[l],u=s(u,e[c],c,e);return u};function yd(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function Dr(t){var e=yd(t);return e.length===1?e[0].toString(16):null}function wd(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Ai(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function Fr(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Ai(e);typeof zt.hooks.addPack=="function"&&!a?zt.hooks.addPack(t,Ai(e)):zt.styles[t]=I(I({},zt.styles[t]||{}),i),t==="fas"&&Fr("fa",e)}var sn=zt.styles,xd=zt.shims,_d=Object.values(ss),_a=null,hs={},ps={},gs={},bs={},vs={},kd=Object.keys(ya);function Ad(t){return~rd.indexOf(t)}function Od(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!Ad(a)?a:null}var ys=function(){var e=function(i){return gr(sn,function(o,s,l){return o[l]=gr(s,i,{}),o},{})};hs=e(function(a,i,o){if(i[3]&&(a[i[3]]=o),i[2]){var s=i[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){a[l.toString(16)]=o})}return a}),ps=e(function(a,i,o){if(a[o]=o,i[2]){var s=i[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){a[l]=o})}return a}),vs=e(function(a,i,o){var s=i[2];return a[o]=o,s.forEach(function(l){a[l]=o}),a});var n="far"in sn||U.autoFetchSvg,r=gr(xd,function(a,i){var o=i[0],s=i[1],l=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(a.names[o]={prefix:s,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:s,iconName:l}),a},{names:{},unicodes:{}});gs=r.names,bs=r.unicodes,_a=sr(U.styleDefault)};ld(function(t){_a=sr(t.styleDefault)});ys();function ka(t,e){return(hs[t]||{})[e]}function Ed(t,e){return(ps[t]||{})[e]}function Ne(t,e){return(vs[t]||{})[e]}function ws(t){return gs[t]||{prefix:null,iconName:null}}function Sd(t){var e=bs[t],n=ka("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function pe(){return _a}var Aa=function(){return{prefix:null,iconName:null,rest:[]}};function sr(t){var e=ya[t],n=Yn[t]||Yn[e],r=t in zt.styles?t:null;return n||r||null}function lr(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.skipLookups,r=n===void 0?!1:n,a=null,i=t.reduce(function(o,s){var l=Od(U.familyPrefix,s);if(sn[s]?(s=_d.includes(s)?Ju[s]:s,a=s,o.prefix=s):kd.indexOf(s)>-1?(a=s,o.prefix=sr(s)):l?o.iconName=l:s!==U.replacementClass&&o.rest.push(s),!r&&o.prefix&&o.iconName){var c=a==="fa"?ws(o.iconName):{},u=Ne(o.prefix,o.iconName);c.prefix&&(a=null),o.iconName=c.iconName||u||o.iconName,o.prefix=c.prefix||o.prefix,o.prefix==="far"&&!sn.far&&sn.fas&&!U.autoFetchSvg&&(o.prefix="fas")}return o},Aa());return(i.prefix==="fa"||a==="fa")&&(i.prefix=pe()||"fas"),i}var Cd=function(){function t(){Fu(this,t),this.definitions={}}return ju(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var o=a.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=I(I({},n.definitions[s]||{}),o[s]),Fr(s,o[s]);var l=ss[s];l&&Fr(l,o[s]),ys()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var o=a[i],s=o.prefix,l=o.iconName,c=o.icon,u=c[2];n[s]||(n[s]={}),u.length>0&&u.forEach(function(m){typeof m=="string"&&(n[s][m]=c)}),n[s][l]=c}),n}}]),t}(),Oi=[],$e={},Fe={},Td=Object.keys(Fe);function Md(t,e){var n=e.mixoutsTo;return Oi=t,$e={},Object.keys(Fe).forEach(function(r){Td.indexOf(r)===-1&&delete Fe[r]}),Oi.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(o){typeof a[o]=="function"&&(n[o]=a[o]),Bn(a[o])==="object"&&Object.keys(a[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=a[o][s]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(o){$e[o]||($e[o]=[]),$e[o].push(i[o])})}r.provides&&r.provides(Fe)}),n}function jr(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=$e[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(r))}),e}function Se(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=$e[t]||[];a.forEach(function(i){i.apply(null,n)})}function ne(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Fe[t]?Fe[t].apply(null,e):void 0}function zr(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||pe();if(!!e)return e=Ne(n,e)||e,ki(xs.definitions,n,e)||ki(zt.styles,n,e)}var xs=new Cd,Pd=function(){U.autoReplaceSvg=!1,U.observeMutations=!1,Se("noAuto")},Id={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return ae?(Se("beforeI2svg",e),ne("pseudoElements2svg",e),ne("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;U.autoReplaceSvg===!1&&(U.autoReplaceSvg=!0),U.observeMutations=!0,bd(function(){$d({autoReplaceSvgRoot:n}),Se("watch",e)})}},Nd={icon:function(e){if(e===null)return null;if(Bn(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:Ne(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=sr(e[0]);return{prefix:r,iconName:Ne(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(U.familyPrefix,"-"))>-1||e.match(Zu))){var a=lr(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||pe(),iconName:Ne(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=pe();return{prefix:i,iconName:Ne(i,e)||e}}}},Tt={noAuto:Pd,config:U,dom:Id,parse:Nd,library:xs,findIconDefinition:zr,toHtml:yn},$d=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?ct:n;(Object.keys(zt.styles).length>0||U.autoFetchSvg)&&ae&&U.autoReplaceSvg&&Tt.dom.i2svg({node:r})};function fr(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return yn(r)})}}),Object.defineProperty(t,"node",{get:function(){if(!!ae){var r=ct.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function Rd(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,o=t.transform;if(xa(o)&&n.found&&!r.found){var s=n.width,l=n.height,c={x:s/l/2,y:.5};a.style=or(I(I({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function Ld(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(U.familyPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:I(I({},a),{},{id:o}),children:r}]}]}function Oa(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,l=t.title,c=t.maskId,u=t.titleId,m=t.extra,b=t.watchable,v=b===void 0?!1:b,O=r.found?r:n,j=O.width,D=O.height,h=a==="fak",p=[U.replacementClass,i?"".concat(U.familyPrefix,"-").concat(i):""].filter(function(K){return m.classes.indexOf(K)===-1}).filter(function(K){return K!==""||!!K}).concat(m.classes).join(" "),T={children:[],attributes:I(I({},m.attributes),{},{"data-prefix":a,"data-icon":i,class:p,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(j," ").concat(D)})},$=h&&!~m.classes.indexOf("fa-fw")?{width:"".concat(j/D*16*.0625,"em")}:{};v&&(T.attributes[Ee]=""),l&&(T.children.push({tag:"title",attributes:{id:T.attributes["aria-labelledby"]||"title-".concat(u||bn())},children:[l]}),delete T.attributes.title);var R=I(I({},T),{},{prefix:a,iconName:i,main:n,mask:r,maskId:c,transform:o,symbol:s,styles:I(I({},$),m.styles)}),W=r.found&&n.found?ne("generateAbstractMask",R)||{children:[],attributes:{}}:ne("generateAbstractIcon",R)||{children:[],attributes:{}},X=W.children,Y=W.attributes;return R.children=X,R.attributes=Y,s?Ld(R):Rd(R)}function Ei(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,o=t.extra,s=t.watchable,l=s===void 0?!1:s,c=I(I(I({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});l&&(c[Ee]="");var u=I({},o.styles);xa(a)&&(u.transform=md({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var m=or(u);m.length>0&&(c.style=m);var b=[];return b.push({tag:"span",attributes:c,children:[e]}),i&&b.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),b}function Dd(t){var e=t.content,n=t.title,r=t.extra,a=I(I(I({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=or(r.styles);i.length>0&&(a.style=i);var o=[];return o.push({tag:"span",attributes:a,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var br=zt.styles;function Hr(t){var e=t[0],n=t[1],r=t.slice(4),a=pa(r,1),i=a[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(U.familyPrefix,"-").concat(ke.GROUP)},children:[{tag:"path",attributes:{class:"".concat(U.familyPrefix,"-").concat(ke.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(U.familyPrefix,"-").concat(ke.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var Fd={found:!1,width:512,height:512};function jd(t,e){!os&&!U.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Ur(t,e){var n=e;return e==="fa"&&U.styleDefault!==null&&(e=pe()),new Promise(function(r,a){if(ne("missingIconAbstract"),n==="fa"){var i=ws(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&br[e]&&br[e][t]){var o=br[e][t];return r(Hr(o))}jd(t,e),r(I(I({},Fd),{},{icon:U.showMissingIcons&&t?ne("missingIconAbstract")||{}:{}}))})}var Si=function(){},Br=U.measurePerformance&&Sn&&Sn.mark&&Sn.measure?Sn:{mark:Si,measure:Si},Je='FA "6.1.2"',zd=function(e){return Br.mark("".concat(Je," ").concat(e," begins")),function(){return _s(e)}},_s=function(e){Br.mark("".concat(Je," ").concat(e," ends")),Br.measure("".concat(Je," ").concat(e),"".concat(Je," ").concat(e," begins"),"".concat(Je," ").concat(e," ends"))},Ea={begin:zd,end:_s},Nn=function(){};function Ci(t){var e=t.getAttribute?t.getAttribute(Ee):null;return typeof e=="string"}function Hd(t){var e=t.getAttribute?t.getAttribute(ba):null,n=t.getAttribute?t.getAttribute(va):null;return e&&n}function Ud(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(U.replacementClass)}function Bd(){if(U.autoReplaceSvg===!0)return $n.replace;var t=$n[U.autoReplaceSvg];return t||$n.replace}function Yd(t){return ct.createElementNS("http://www.w3.org/2000/svg",t)}function Wd(t){return ct.createElement(t)}function ks(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?Yd:Wd:n;if(typeof t=="string")return ct.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){a.appendChild(ks(o,{ceFn:r}))}),a}function Kd(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var $n={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(ks(a),n)}),n.getAttribute(Ee)===null&&U.keepOriginalSource){var r=ct.createComment(Kd(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~wa(n).indexOf(U.replacementClass))return $n.replace(e);var a=new RegExp("".concat(U.familyPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(s,l){return l===U.replacementClass||l.match(a)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=r.map(function(s){return yn(s)}).join(`
`);n.setAttribute(Ee,""),n.innerHTML=o}};function Ti(t){t()}function As(t,e){var n=typeof e=="function"?e:Nn;if(t.length===0)n();else{var r=Ti;U.mutateApproach===Xu&&(r=he.requestAnimationFrame||Ti),r(function(){var a=Bd(),i=Ea.begin("mutate");t.map(a),i(),n()})}}var Sa=!1;function Os(){Sa=!0}function Yr(){Sa=!1}var Kn=null;function Mi(t){if(!!wi&&!!U.observeMutations){var e=t.treeCallback,n=e===void 0?Nn:e,r=t.nodeCallback,a=r===void 0?Nn:r,i=t.pseudoElementsCallback,o=i===void 0?Nn:i,s=t.observeMutationsRoot,l=s===void 0?ct:s;Kn=new wi(function(c){if(!Sa){var u=pe();Ke(c).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!Ci(m.addedNodes[0])&&(U.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&U.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&Ci(m.target)&&~nd.indexOf(m.attributeName))if(m.attributeName==="class"&&Hd(m.target)){var b=lr(wa(m.target)),v=b.prefix,O=b.iconName;m.target.setAttribute(ba,v||u),O&&m.target.setAttribute(va,O)}else Ud(m.target)&&a(m.target)})}}),ae&&Kn.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function qd(){!Kn||Kn.disconnect()}function Vd(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(r[o]=s.join(":").trim()),r},{})),n}function Xd(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=lr(wa(t));return a.prefix||(a.prefix=pe()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Ed(a.prefix,t.innerText)||ka(a.prefix,Dr(t.innerText))),!a.iconName&&U.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function Gd(t){var e=Ke(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return U.autoA11y&&(n?e["aria-labelledby"]="".concat(U.replacementClass,"-title-").concat(r||bn()):(e["aria-hidden"]="true",e.focusable="false")),e}function Jd(){return{iconName:null,title:null,titleId:null,prefix:null,transform:Gt,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Pi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Xd(t),r=n.iconName,a=n.prefix,i=n.rest,o=Gd(t),s=jr("parseNodeAttributes",{},t),l=e.styleParser?Vd(t):[];return I({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:Gt,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:o}},s)}var Zd=zt.styles;function Es(t){var e=U.autoReplaceSvg==="nest"?Pi(t,{styleParser:!1}):Pi(t);return~e.extra.classes.indexOf(ls)?ne("generateLayersText",t,e):ne("generateSvgReplacementMutation",t,e)}function Ii(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!ae)return Promise.resolve();var n=ct.documentElement.classList,r=function(m){return n.add("".concat(xi,"-").concat(m))},a=function(m){return n.remove("".concat(xi,"-").concat(m))},i=U.autoFetchSvg?Object.keys(ya):Object.keys(Zd);i.includes("fa")||i.push("fa");var o=[".".concat(ls,":not([").concat(Ee,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(Ee,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=Ke(t.querySelectorAll(o))}catch{}if(s.length>0)r("pending"),a("complete");else return Promise.resolve();var l=Ea.begin("onTree"),c=s.reduce(function(u,m){try{var b=Es(m);b&&u.push(b)}catch(v){os||v.name==="MissingIcon"&&console.error(v)}return u},[]);return new Promise(function(u,m){Promise.all(c).then(function(b){As(b,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),l(),u()})}).catch(function(b){l(),m(b)})})}function Qd(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Es(t).then(function(n){n&&As([n],e)})}function tm(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:zr(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:zr(a||{})),t(r,I(I({},n),{},{mask:a}))}}var em=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?Gt:r,i=n.symbol,o=i===void 0?!1:i,s=n.mask,l=s===void 0?null:s,c=n.maskId,u=c===void 0?null:c,m=n.title,b=m===void 0?null:m,v=n.titleId,O=v===void 0?null:v,j=n.classes,D=j===void 0?[]:j,h=n.attributes,p=h===void 0?{}:h,T=n.styles,$=T===void 0?{}:T;if(!!e){var R=e.prefix,W=e.iconName,X=e.icon;return fr(I({type:"icon"},e),function(){return Se("beforeDOMElementCreation",{iconDefinition:e,params:n}),U.autoA11y&&(b?p["aria-labelledby"]="".concat(U.replacementClass,"-title-").concat(O||bn()):(p["aria-hidden"]="true",p.focusable="false")),Oa({icons:{main:Hr(X),mask:l?Hr(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:R,iconName:W,transform:I(I({},Gt),a),symbol:o,title:b,maskId:u,titleId:O,extra:{attributes:p,styles:$,classes:D}})})}},nm={mixout:function(){return{icon:tm(em)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Ii,n.nodeCallback=Qd,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?ct:r,i=n.callback,o=i===void 0?function(){}:i;return Ii(a,o)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,o=r.titleId,s=r.prefix,l=r.transform,c=r.symbol,u=r.mask,m=r.maskId,b=r.extra;return new Promise(function(v,O){Promise.all([Ur(a,s),u.iconName?Ur(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(j){var D=pa(j,2),h=D[0],p=D[1];v([n,Oa({icons:{main:h,mask:p},prefix:s,iconName:a,transform:l,symbol:c,maskId:m,title:i,titleId:o,extra:b,watchable:!0})])}).catch(O)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.transform,s=n.styles,l=or(s);l.length>0&&(a.style=l);var c;return xa(o)&&(c=ne("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),r.push(c||i.icon),{children:r,attributes:a}}}},rm={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return fr({type:"layer"},function(){Se("beforeDOMElementCreation",{assembler:n,params:r});var o=[];return n(function(s){Array.isArray(s)?s.map(function(l){o=o.concat(l.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(U.familyPrefix,"-layers")].concat(ir(i)).join(" ")},children:o}]})}}}},am={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,o=r.classes,s=o===void 0?[]:o,l=r.attributes,c=l===void 0?{}:l,u=r.styles,m=u===void 0?{}:u;return fr({type:"counter",content:n},function(){return Se("beforeDOMElementCreation",{content:n,params:r}),Dd({content:n.toString(),title:i,extra:{attributes:c,styles:m,classes:["".concat(U.familyPrefix,"-layers-counter")].concat(ir(s))}})})}}}},im={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?Gt:a,o=r.title,s=o===void 0?null:o,l=r.classes,c=l===void 0?[]:l,u=r.attributes,m=u===void 0?{}:u,b=r.styles,v=b===void 0?{}:b;return fr({type:"text",content:n},function(){return Se("beforeDOMElementCreation",{content:n,params:r}),Ei({content:n,transform:I(I({},Gt),i),title:s,extra:{attributes:m,styles:v,classes:["".concat(U.familyPrefix,"-layers-text")].concat(ir(c))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,o=r.extra,s=null,l=null;if(rs){var c=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();s=u.width/c,l=u.height/c}return U.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,Ei({content:n.innerHTML,width:s,height:l,transform:i,title:a,extra:o,watchable:!0})])}}},om=new RegExp('"',"ug"),Ni=[1105920,1112319];function sm(t){var e=t.replace(om,""),n=wd(e,0),r=n>=Ni[0]&&n<=Ni[1],a=e.length===2?e[0]===e[1]:!1;return{value:Dr(a?e[0]:e),isSecondary:r||a}}function $i(t,e){var n="".concat(Vu).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=Ke(t.children),o=i.filter(function(W){return W.getAttribute(Lr)===e})[0],s=he.getComputedStyle(t,e),l=s.getPropertyValue("font-family").match(Qu),c=s.getPropertyValue("font-weight"),u=s.getPropertyValue("content");if(o&&!l)return t.removeChild(o),r();if(l&&u!=="none"&&u!==""){var m=s.getPropertyValue("content"),b=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Yn[l[2].toLowerCase()]:td[c],v=sm(m),O=v.value,j=v.isSecondary,D=l[0].startsWith("FontAwesome"),h=ka(b,O),p=h;if(D){var T=Sd(O);T.iconName&&T.prefix&&(h=T.iconName,b=T.prefix)}if(h&&!j&&(!o||o.getAttribute(ba)!==b||o.getAttribute(va)!==p)){t.setAttribute(n,p),o&&t.removeChild(o);var $=Jd(),R=$.extra;R.attributes[Lr]=e,Ur(h,b).then(function(W){var X=Oa(I(I({},$),{},{icons:{main:W,mask:Aa()},prefix:b,iconName:p,extra:R,watchable:!0})),Y=ct.createElement("svg");e==="::before"?t.insertBefore(Y,t.firstChild):t.appendChild(Y),Y.outerHTML=X.map(function(K){return yn(K)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function lm(t){return Promise.all([$i(t,"::before"),$i(t,"::after")])}function fm(t){return t.parentNode!==document.head&&!~Gu.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Lr)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ri(t){if(!!ae)return new Promise(function(e,n){var r=Ke(t.querySelectorAll("*")).filter(fm).map(lm),a=Ea.begin("searchPseudoElements");Os(),Promise.all(r).then(function(){a(),Yr(),e()}).catch(function(){a(),Yr(),n()})})}var cm={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Ri,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?ct:r;U.searchPseudoElements&&Ri(a)}}},Li=!1,um={mixout:function(){return{dom:{unwatch:function(){Os(),Li=!0}}}},hooks:function(){return{bootstrap:function(){Mi(jr("mutationObserverCallbacks",{}))},noAuto:function(){qd()},watch:function(n){var r=n.observeMutationsRoot;Li?Yr():Mi(jr("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Di=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return r.flipX=!0,r;if(o&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(o){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},n)},dm={mixout:function(){return{parse:{transform:function(n){return Di(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Di(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(l," ").concat(c," ").concat(u)},b={transform:"translate(".concat(o/2*-1," -256)")},v={outer:s,inner:m,path:b};return{tag:"g",attributes:I({},v.outer),children:[{tag:"g",attributes:I({},v.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:I(I({},r.icon.attributes),v.path)}]}]}}}},vr={x:0,y:0,width:"100%",height:"100%"};function Fi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function mm(t){return t.tag==="g"?t.children:[t]}var hm={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?lr(a.split(" ").map(function(o){return o.trim()})):Aa();return i.prefix||(i.prefix=pe()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,o=n.mask,s=n.maskId,l=n.transform,c=i.width,u=i.icon,m=o.width,b=o.icon,v=dd({transform:l,containerWidth:m,iconWidth:c}),O={tag:"rect",attributes:I(I({},vr),{},{fill:"white"})},j=u.children?{children:u.children.map(Fi)}:{},D={tag:"g",attributes:I({},v.inner),children:[Fi(I({tag:u.tag,attributes:I(I({},u.attributes),v.path)},j))]},h={tag:"g",attributes:I({},v.outer),children:[D]},p="mask-".concat(s||bn()),T="clip-".concat(s||bn()),$={tag:"mask",attributes:I(I({},vr),{},{id:p,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[O,h]},R={tag:"defs",children:[{tag:"clipPath",attributes:{id:T},children:mm(b)},$]};return r.push(R,{tag:"rect",attributes:I({fill:"currentColor","clip-path":"url(#".concat(T,")"),mask:"url(#".concat(p,")")},vr)}),{children:r,attributes:a}}}},pm={provides:function(e){var n=!1;he.matchMedia&&(n=he.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:I(I({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=I(I({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:I(I({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:I(I({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:I(I({},o),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:I(I({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:I(I({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:I(I({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:I(I({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},gm={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},bm=[pd,nm,rm,am,im,cm,um,dm,hm,pm,gm];Md(bm,{mixoutsTo:Tt});Tt.noAuto;var Ss=Tt.config,vm=Tt.library;Tt.dom;var qn=Tt.parse;Tt.findIconDefinition;Tt.toHtml;var ym=Tt.icon;Tt.layer;var wm=Tt.text;Tt.counter;function ji(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function Ft(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ji(Object(n),!0).forEach(function(r){kt(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ji(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Vn(t){return Vn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Vn(t)}function kt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function xm(t,e){if(t==null)return{};var n={},r=Object.keys(t),a,i;for(i=0;i<r.length;i++)a=r[i],!(e.indexOf(a)>=0)&&(n[a]=t[a]);return n}function _m(t,e){if(t==null)return{};var n=xm(t,e),r,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)r=i[a],!(e.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(t,r)||(n[r]=t[r]))}return n}function Wr(t){return km(t)||Am(t)||Om(t)||Em()}function km(t){if(Array.isArray(t))return Kr(t)}function Am(t){if(typeof Symbol!="undefined"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Om(t,e){if(!!t){if(typeof t=="string")return Kr(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Kr(t,e)}}function Kr(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Em(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Sm=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Cs={exports:{}};(function(t){(function(e){var n=function(h,p,T){if(!c(p)||m(p)||b(p)||v(p)||l(p))return p;var $,R=0,W=0;if(u(p))for($=[],W=p.length;R<W;R++)$.push(n(h,p[R],T));else{$={};for(var X in p)Object.prototype.hasOwnProperty.call(p,X)&&($[h(X,T)]=n(h,p[X],T))}return $},r=function(h,p){p=p||{};var T=p.separator||"_",$=p.split||/(?=[A-Z])/;return h.split($).join(T)},a=function(h){return O(h)?h:(h=h.replace(/[\-_\s]+(.)?/g,function(p,T){return T?T.toUpperCase():""}),h.substr(0,1).toLowerCase()+h.substr(1))},i=function(h){var p=a(h);return p.substr(0,1).toUpperCase()+p.substr(1)},o=function(h,p){return r(h,p).toLowerCase()},s=Object.prototype.toString,l=function(h){return typeof h=="function"},c=function(h){return h===Object(h)},u=function(h){return s.call(h)=="[object Array]"},m=function(h){return s.call(h)=="[object Date]"},b=function(h){return s.call(h)=="[object RegExp]"},v=function(h){return s.call(h)=="[object Boolean]"},O=function(h){return h=h-0,h===h},j=function(h,p){var T=p&&"process"in p?p.process:p;return typeof T!="function"?h:function($,R){return T($,h,R)}},D={camelize:a,decamelize:o,pascalize:i,depascalize:o,camelizeKeys:function(h,p){return n(j(a,p),h)},decamelizeKeys:function(h,p){return n(j(o,p),h,p)},pascalizeKeys:function(h,p){return n(j(i,p),h)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=D:e.humps=D})(Sm)})(Cs);var Cm=Cs.exports,Tm=["class","style"];function Mm(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var r=n.indexOf(":"),a=Cm.camelize(n.slice(0,r)),i=n.slice(r+1).trim();return e[a]=i,e},{})}function Pm(t){return t.split(/\s+/).reduce(function(e,n){return e[n]=!0,e},{})}function Ca(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(l){return Ca(l)}),a=Object.keys(t.attributes||{}).reduce(function(l,c){var u=t.attributes[c];switch(c){case"class":l.class=Pm(u);break;case"style":l.style=Mm(u);break;default:l.attrs[c]=u}return l},{attrs:{},class:{},style:{}});n.class;var i=n.style,o=i===void 0?{}:i,s=_m(n,Tm);return Ho(t.tag,Ft(Ft(Ft({},e),{},{class:a.class,style:Ft(Ft({},a.style),o)},a.attrs),s),r)}var Ts=!1;try{Ts=!0}catch{}function Im(){if(!Ts&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function ln(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?kt({},t,e):{}}function Nm(t){var e,n=(e={"fa-spin":t.spin,"fa-pulse":t.pulse,"fa-fw":t.fixedWidth,"fa-border":t.border,"fa-li":t.listItem,"fa-inverse":t.inverse,"fa-flip":t.flip===!0,"fa-flip-horizontal":t.flip==="horizontal"||t.flip==="both","fa-flip-vertical":t.flip==="vertical"||t.flip==="both"},kt(e,"fa-".concat(t.size),t.size!==null),kt(e,"fa-rotate-".concat(t.rotation),t.rotation!==null),kt(e,"fa-pull-".concat(t.pull),t.pull!==null),kt(e,"fa-swap-opacity",t.swapOpacity),kt(e,"fa-bounce",t.bounce),kt(e,"fa-shake",t.shake),kt(e,"fa-beat",t.beat),kt(e,"fa-fade",t.fade),kt(e,"fa-beat-fade",t.beatFade),kt(e,"fa-flash",t.flash),kt(e,"fa-spin-pulse",t.spinPulse),kt(e,"fa-spin-reverse",t.spinReverse),e);return Object.keys(n).map(function(r){return n[r]?r:null}).filter(function(r){return r})}function zi(t){if(t&&Vn(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(qn.icon)return qn.icon(t);if(t===null)return null;if(Vn(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}var $m=Wt({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(e){return[!0,!1,"horizontal","vertical","both"].indexOf(e)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(e){return["right","left"].indexOf(e)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(e){return[90,180,270].indexOf(Number.parseInt(e,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(e){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(e)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(e,n){var r=n.attrs,a=Pt(function(){return zi(e.icon)}),i=Pt(function(){return ln("classes",Nm(e))}),o=Pt(function(){return ln("transform",typeof e.transform=="string"?qn.transform(e.transform):e.transform)}),s=Pt(function(){return ln("mask",zi(e.mask))}),l=Pt(function(){return ym(a.value,Ft(Ft(Ft(Ft({},i.value),o.value),s.value),{},{symbol:e.symbol,title:e.title}))});Tn(l,function(u){if(!u)return Im("Could not find one or more icon(s)",a.value,s.value)},{immediate:!0});var c=Pt(function(){return l.value?Ca(l.value.abstract[0],{},r):null});return function(){return c.value}}});Wt({name:"FontAwesomeLayers",props:{fixedWidth:{type:Boolean,default:!1}},setup:function(e,n){var r=n.slots,a=Ss.familyPrefix,i=Pt(function(){return["".concat(a,"-layers")].concat(Wr(e.fixedWidth?["".concat(a,"-fw")]:[]))});return function(){return Ho("div",{class:i.value},r.default?r.default():[])}}});Wt({name:"FontAwesomeLayersText",props:{value:{type:[String,Number],default:""},transform:{type:[String,Object],default:null},counter:{type:Boolean,default:!1},position:{type:String,default:null,validator:function(e){return["bottom-left","bottom-right","top-left","top-right"].indexOf(e)>-1}}},setup:function(e,n){var r=n.attrs,a=Ss.familyPrefix,i=Pt(function(){return ln("classes",[].concat(Wr(e.counter?["".concat(a,"-layers-counter")]:[]),Wr(e.position?["".concat(a,"-layers-").concat(e.position)]:[])))}),o=Pt(function(){return ln("transform",typeof e.transform=="string"?qn.transform(e.transform):e.transform)}),s=Pt(function(){var c=wm(e.value.toString(),Ft(Ft({},o.value),i.value)),u=c.abstract;return e.counter&&(u[0].attributes.class=u[0].attributes.class.replace("fa-layers-text","")),u[0]}),l=Pt(function(){return Ca(s.value,{},r)});return function(){return l.value}}});var Ms={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e="fas",n="phone",r=512,a=512,i=[128379,128222],o="f095",s="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z";t.definition={prefix:e,iconName:n,icon:[r,a,i,o,s]},t.faPhone=t.definition,t.prefix=e,t.iconName=n,t.width=r,t.height=a,t.ligatures=i,t.unicode=o,t.svgPathData=s,t.aliases=i})(Ms);var Ps={},Is={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e="fab",n="telegram",r=496,a=512,i=[62462,"telegram-plane"],o="f2c6",s="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z";t.definition={prefix:e,iconName:n,icon:[r,a,i,o,s]},t.faTelegram=t.definition,t.prefix=e,t.iconName=n,t.width=r,t.height=a,t.ligatures=i,t.unicode=o,t.svgPathData=s,t.aliases=i})(Is);(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e=Is;t.definition={prefix:e.prefix,iconName:e.iconName,icon:[e.width,e.height,e.aliases,e.unicode,e.svgPathData]},t.faTelegramPlane=t.definition,t.prefix=e.prefix,t.iconName=e.iconName,t.width=e.width,t.height=e.height,t.ligatures=e.aliases,t.unicode=e.unicode,t.svgPathData=e.svgPathData,t.aliases=e.aliases})(Ps);var Ns={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e="fas",n="at",r=512,a=512,i=[61946],o="40",s="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z";t.definition={prefix:e,iconName:n,icon:[r,a,i,o,s]},t.faAt=t.definition,t.prefix=e,t.iconName=n,t.width=r,t.height=a,t.ligatures=i,t.unicode=o,t.svgPathData=s,t.aliases=i})(Ns);vm.add(Ms.faPhone,Ns.faAt,Ps.faTelegramPlane);Ec(Du,({app:t})=>{t.component("font-awesome-icon",$m)});
