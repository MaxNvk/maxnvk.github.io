true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};

/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  const dep = computed2.dep;
  computed2.flags |= 2;
  if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
    computed2.flags &= -3;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce$1(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce$1(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self, method, wrapValue) {
  const arr = shallowReadArray(self);
  const iter = arr[method]();
  if (arr !== self && !isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !isShallow(self);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce$1(self, method, fn, args) {
  const arr = shallowReadArray(self);
  let wrappedFn = fn;
  if (arr !== self) {
    if (!isShallow(self)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self, method, args) {
  const arr = toRaw(self);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self)[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0);
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
    return hasOwn(rawSetupState, key);
  };
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          ref3.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
let hasLoggedMismatchError = false;
const logMismatchError = () => {
  if (hasLoggedMismatchError) {
    return;
  }
  console.error("Hydration completed but contains mismatches.");
  hasLoggedMismatchError = true;
};
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
const getContainerType = (container) => {
  if (container.nodeType !== 1) return void 0;
  if (isSVGContainer(container)) return "svg";
  if (isMathMLContainer(container)) return "mathml";
  return void 0;
};
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref: ref3, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            logMismatchError();
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            getContainerType(container),
            optimized
          );
          if (isAsyncWrapper(vnode) && !vnode.type.__asyncResolved) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else ;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if (forcePatch || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(
          null,
          // no need check parentSuspense in hydration
          transition
        ) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        while (next) {
          if (!isMismatchAllowed(
            el,
            1
            /* CHILDREN */
          )) {
            logMismatchError();
          }
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        let clientText = vnode.children;
        if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) {
          clientText = clientText.slice(1);
        }
        if (el.textContent !== clientText) {
          if (!isMismatchAllowed(
            el,
            0
            /* TEXT */
          )) {
            logMismatchError();
          }
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if (forcePatch || !optimized || patchFlag & (16 | 32)) {
          const isCustomElement = el.tagName.includes("-");
          for (const key in props) {
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
            key[0] === "." || isCustomElement) {
              patchProp(el, key, null, props[key], void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp(
            el,
            "onClick",
            null,
            props.onClick,
            void 0,
            parentComponent
          );
        } else if (patchFlag & 4 && isReactive(props.style)) {
          for (const key in props.style) props.style[key];
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      const isText = vnode.type === Text;
      if (node) {
        if (isText && !optimized) {
          if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text) {
            insert(
              createText(
                node.data.slice(vnode.children.length)
              ),
              container,
              nextSibling(node)
            );
            node.data = vnode.children;
          }
        }
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (isText && !vnode.children) {
        insert(vnode.el = createText(""), container);
      } else {
        if (!isMismatchAllowed(
          container,
          1
          /* CHILDREN */
        )) {
          logMismatchError();
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      logMismatchError();
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    if (!isMismatchAllowed(
      node.parentElement,
      1
      /* CHILDREN */
    )) {
      logMismatchError();
    }
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    if (parentComponent) {
      parentComponent.vnode.el = vnode.el;
      updateHOCHostEl(parentComponent, vnode.el);
    }
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === open) match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 && node.tagName === "TEMPLATE";
  };
  return [hydrate, hydrateNode];
}
const allowMismatchAttr = "data-allow-mismatch";
const MismatchTypeString = {
  [
    0
    /* TEXT */
  ]: "text",
  [
    1
    /* CHILDREN */
  ]: "children",
  [
    2
    /* CLASS */
  ]: "class",
  [
    3
    /* STYLE */
  ]: "style",
  [
    4
    /* ATTRIBUTE */
  ]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
  if (allowedType === 0 || allowedType === 1) {
    while (el && !el.hasAttribute(allowMismatchAttr)) {
      el = el.parentElement;
    }
  }
  const allowedAttr = el && el.getAttribute(allowMismatchAttr);
  if (allowedAttr == null) {
    return false;
  } else if (allowedAttr === "") {
    return true;
  } else {
    const list = allowedAttr.split(",");
    if (allowedType === 0 && list.includes("children")) {
      return true;
    }
    return allowedAttr.split(",").includes(MismatchTypeString[allowedType]);
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i) ,
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i) 
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data)) ; else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ; else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ; else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) ; else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || key !== "_") {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode && type.__asyncHydrate) {
            type.__asyncHydrate(
              el,
              instance,
              hydrateSubTree
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (root.ce) {
            root.ce._injectChildStyle(type);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h$1(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.5.13";

/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt$1 = typeof window !== "undefined" && window.trustedTypes;
if (tt$1) {
  try {
    policy = /* @__PURE__ */ tt$1.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const vtcKey = Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const CSS_VAR_TEXT = Symbol("");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p$3 = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p$3.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, resolveRootNamespace(container));
    }
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}

const TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
const HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
const TagConfigKeys = /* @__PURE__ */ new Set(["tagPosition", "tagPriority", "tagDuplicateStrategy", "children", "innerHTML", "textContent", "processTemplateParams"]);
const IsBrowser = typeof window !== "undefined";

function defineHeadPlugin(plugin) {
  return plugin;
}

function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  if (tag._h) {
    return tag._h;
  }
  if (tag._d) {
    return hashCode(tag._d);
  }
  let content = `${tag.tag}:${tag.textContent || tag.innerHTML || ""}:`;
  for (const key in tag.props) {
    content += `${key}:${String(tag.props[key])},`;
  }
  return hashCode(content);
}

function thenable(val, thenFn) {
  if (val instanceof Promise) {
    return val.then(thenFn);
  }
  return thenFn(val);
}

function normaliseTag(tagName, input, e, normalizedProps) {
  const props = normalizedProps || normaliseProps(
    // explicitly check for an object
    // @ts-expect-error untyped
    typeof input === "object" && typeof input !== "function" && !(input instanceof Promise) ? { ...input } : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: input },
    tagName === "templateParams" || tagName === "titleTemplate"
  );
  if (props instanceof Promise) {
    return props.then((val) => normaliseTag(tagName, input, e, val));
  }
  const tag = {
    tag: tagName,
    props
  };
  for (const k of TagConfigKeys) {
    const val = tag.props[k] !== void 0 ? tag.props[k] : e[k];
    if (val !== void 0) {
      if (!(k === "innerHTML" || k === "textContent" || k === "children") || TagsWithInnerContent.has(tag.tag)) {
        tag[k === "children" ? "innerHTML" : k] = val;
      }
      delete tag.props[k];
    }
  }
  if (tag.props.body) {
    tag.tagPosition = "bodyClose";
    delete tag.props.body;
  }
  if (tag.tag === "script") {
    if (typeof tag.innerHTML === "object") {
      tag.innerHTML = JSON.stringify(tag.innerHTML);
      tag.props.type = tag.props.type || "application/json";
    }
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normaliseStyleClassProps(key, v) {
  const sep = key === "class" ? " " : ";";
  if (v && typeof v === "object" && !Array.isArray(v)) {
    v = Object.entries(v).filter(([, v2]) => v2).map(([k, v2]) => key === "style" ? `${k}:${v2}` : k);
  }
  return String(Array.isArray(v) ? v.join(sep) : v)?.split(sep).filter((c) => Boolean(c.trim())).join(sep);
}
function nestedNormaliseProps(props, virtual, keys, startIndex) {
  for (let i = startIndex; i < keys.length; i += 1) {
    const k = keys[i];
    if (k === "class" || k === "style") {
      props[k] = normaliseStyleClassProps(k, props[k]);
      continue;
    }
    if (props[k] instanceof Promise) {
      return props[k].then((val) => {
        props[k] = val;
        return nestedNormaliseProps(props, virtual, keys, i);
      });
    }
    if (!virtual && !TagConfigKeys.has(k)) {
      const v = String(props[k]);
      const isDataKey = k.startsWith("data-");
      if (v === "true" || v === "") {
        props[k] = isDataKey ? "true" : true;
      } else if (!props[k]) {
        if (isDataKey && v === "false")
          props[k] = "false";
        else
          delete props[k];
      }
    }
  }
}
function normaliseProps(props, virtual = false) {
  const resolvedProps = nestedNormaliseProps(props, virtual, Object.keys(props), 0);
  if (resolvedProps instanceof Promise) {
    return resolvedProps.then(() => props);
  }
  return props;
}
const TagEntityBits = 10;
function nestedNormaliseEntryTags(headTags, tagPromises, startIndex) {
  for (let i = startIndex; i < tagPromises.length; i += 1) {
    const tags = tagPromises[i];
    if (tags instanceof Promise) {
      return tags.then((val) => {
        tagPromises[i] = val;
        return nestedNormaliseEntryTags(headTags, tagPromises, i);
      });
    }
    if (Array.isArray(tags)) {
      headTags.push(...tags);
    } else {
      headTags.push(tags);
    }
  }
}
function normaliseEntryTags(e) {
  const tagPromises = [];
  const input = e.resolvedInput;
  for (const k in input) {
    if (!Object.prototype.hasOwnProperty.call(input, k)) {
      continue;
    }
    const v = input[k];
    if (v === void 0 || !ValidHeadTags.has(k)) {
      continue;
    }
    if (Array.isArray(v)) {
      for (const props of v) {
        tagPromises.push(normaliseTag(k, props, e));
      }
      continue;
    }
    tagPromises.push(normaliseTag(k, v, e));
  }
  if (tagPromises.length === 0) {
    return [];
  }
  const headTags = [];
  return thenable(nestedNormaliseEntryTags(headTags, tagPromises, 0), () => headTags.map((t, i) => {
    t._e = e._i;
    e.mode && (t._m = e.mode);
    t._p = (e._i << TagEntityBits) + i;
    return t;
  }));
}

const NetworkEvents = /* @__PURE__ */ new Set(["onload", "onerror", "onabort", "onprogress", "onloadstart"]);

const TAG_WEIGHTS = {
  // tags
  base: -10,
  title: 10
};
const TAG_ALIASES = {
  // relative scores to their default values
  critical: -80,
  high: -10,
  low: 20
};
function tagWeight(tag) {
  const priority = tag.tagPriority;
  if (typeof priority === "number")
    return priority;
  let weight = 100;
  if (tag.tag === "meta") {
    if (tag.props["http-equiv"] === "content-security-policy")
      weight = -30;
    else if (tag.props.charset)
      weight = -20;
    else if (tag.props.name === "viewport")
      weight = -15;
  } else if (tag.tag === "link" && tag.props.rel === "preconnect") {
    weight = 20;
  } else if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  }
  if (priority && priority in TAG_ALIASES) {
    return weight + TAG_ALIASES[priority];
  }
  return weight;
}
const SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];

const allowedMetaProperties = ["name", "property", "http-equiv"];
function tagDedupeKey(tag) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.has(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (props.id) {
    return `${tagName}:id:${props.id}`;
  }
  for (const n of allowedMetaProperties) {
    if (props[n] !== void 0) {
      return `${tagName}:${n}:${props[n]}`;
    }
  }
  return false;
}

const sepSub = "%separator";
function sub(p, token, isJson = false) {
  let val;
  if (token === "s" || token === "pageTitle") {
    val = p.pageTitle;
  } else if (token.includes(".")) {
    const dotIndex = token.indexOf(".");
    val = p[token.substring(0, dotIndex)]?.[token.substring(dotIndex + 1)];
  } else {
    val = p[token];
  }
  if (val !== void 0) {
    return isJson ? (val || "").replace(/"/g, '\\"') : val || "";
  }
  return void 0;
}
const sepSubRe = new RegExp(`${sepSub}(?:\\s*${sepSub})*`, "g");
function processTemplateParams(s, p, sep, isJson = false) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = decoded.match(/%\w+(?:\.\w+)?/g);
  if (!tokens) {
    return s;
  }
  const hasSepSub = s.includes(sepSub);
  s = s.replace(/%\w+(?:\.\w+)?/g, (token) => {
    if (token === sepSub || !tokens.includes(token)) {
      return token;
    }
    const re = sub(p, token.slice(1), isJson);
    return re !== void 0 ? re : token;
  }).trim();
  if (hasSepSub) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length);
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length);
    s = s.replace(sepSubRe, sep).trim();
  }
  return s;
}

function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}

async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    const tags = (await head.resolveTags()).map((tag) => ({
      tag,
      id: HasElementTags.has(tag.tag) ? hashTag(tag) : tag.tag,
      shouldRender: true
    }));
    let state = head._dom;
    if (!state) {
      state = {
        elMap: { htmlAttrs: dom.documentElement, bodyAttrs: dom.body }
      };
      const takenDedupeKeys = /* @__PURE__ */ new Set();
      for (const key of ["body", "head"]) {
        const children = dom[key]?.children;
        for (const c of children) {
          const tag = c.tagName.toLowerCase();
          if (!HasElementTags.has(tag)) {
            continue;
          }
          const t = {
            tag,
            props: await normaliseProps(
              c.getAttributeNames().reduce((props, name) => ({ ...props, [name]: c.getAttribute(name) }), {})
            ),
            innerHTML: c.innerHTML
          };
          const dedupeKey = tagDedupeKey(t);
          let d = dedupeKey;
          let i = 1;
          while (d && takenDedupeKeys.has(d))
            d = `${dedupeKey}:${i++}`;
          if (d) {
            t._d = d;
            takenDedupeKeys.add(d);
          }
          state.elMap[c.getAttribute("data-hid") || hashTag(t)] = c;
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track(id, scope, fn) {
      const k = `${id}:${scope}`;
      state.sideEffects[k] = fn;
      delete state.pendingSideEffects[k];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap[id] = $el;
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track(id, "el", () => {
          state.elMap[id]?.remove();
          delete state.elMap[id];
        });
      }
      if (tag._eventHandlers) {
        for (const k in tag._eventHandlers) {
          if (!Object.prototype.hasOwnProperty.call(tag._eventHandlers, k)) {
            continue;
          }
          if ($el.getAttribute(`data-${k}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(
              // onload -> load
              k.substring(2),
              tag._eventHandlers[k].bind($el)
            );
            $el.setAttribute(`data-${k}`, "");
          }
        }
      }
      for (const k in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k)) {
          continue;
        }
        const value = tag.props[k];
        const ck = `attr:${k}`;
        if (k === "class") {
          if (!value) {
            continue;
          }
          for (const c of value.split(" ")) {
            isAttrTag && track(id, `${ck}:${c}`, () => $el.classList.remove(c));
            !$el.classList.contains(c) && $el.classList.add(c);
          }
        } else if (k === "style") {
          if (!value) {
            continue;
          }
          for (const c of value.split(";")) {
            const propIndex = c.indexOf(":");
            const k2 = c.substring(0, propIndex).trim();
            const v = c.substring(propIndex + 1).trim();
            track(id, `${ck}:${k2}`, () => {
              $el.style.removeProperty(k2);
            });
            $el.style.setProperty(k2, v);
          }
        } else {
          $el.getAttribute(k) !== value && $el.setAttribute(k, value === true ? "" : String(value));
          isAttrTag && track(id, ck, () => $el.removeAttribute(k));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: void 0,
      bodyOpen: void 0,
      head: void 0
    };
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        continue;
      }
      ctx.$el = ctx.$el || state.elMap[id];
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (HasElementTags.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k in state.pendingSideEffects) {
      state.pendingSideEffects[k]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = void 0;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}

function debouncedRenderDOMHead(head, options = {}) {
  const fn = options.delayFn || ((fn2) => setTimeout(fn2, 10));
  return head._domDebouncedUpdatePromise = head._domDebouncedUpdatePromise || new Promise((resolve) => fn(() => {
    return renderDOMHead(head, options).then(() => {
      delete head._domDebouncedUpdatePromise;
      resolve();
    });
  }));
}

// @__NO_SIDE_EFFECTS__
function DomPlugin(options) {
  return defineHeadPlugin((head) => {
    const initialPayload = head.resolvedOptions.document?.head.querySelector('script[id="unhead:payload"]')?.innerHTML || false;
    if (initialPayload) {
      head.push(JSON.parse(initialPayload));
    }
    return {
      mode: "client",
      hooks: {
        "entries:updated": (head2) => {
          debouncedRenderDOMHead(head2, options);
        }
      }
    };
  });
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
const DedupePlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.props.hid) {
        tag.key = tag.props.hid;
        delete tag.props.hid;
      }
      if (tag.props.vmid) {
        tag.key = tag.props.vmid;
        delete tag.props.vmid;
      }
      if (tag.props.key) {
        tag.key = tag.props.key;
        delete tag.props.key;
      }
      const generatedKey = tagDedupeKey(tag);
      if (generatedKey && !generatedKey.startsWith("meta:og:") && !generatedKey.startsWith("meta:twitter:")) {
        delete tag.key;
      }
      const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
      if (dedupe)
        tag._d = dedupe;
    },
    "tags:resolve": (ctx) => {
      const deduping = /* @__PURE__ */ Object.create(null);
      for (const tag of ctx.tags) {
        const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || hashTag(tag);
        const dupedTag = deduping[dedupeKey];
        if (dupedTag) {
          let strategy = tag?.tagDuplicateStrategy;
          if (!strategy && UsesMergeStrategy.has(tag.tag))
            strategy = "merge";
          if (strategy === "merge") {
            const oldProps = dupedTag.props;
            if (oldProps.style && tag.props.style) {
              if (oldProps.style[oldProps.style.length - 1] !== ";") {
                oldProps.style += ";";
              }
              tag.props.style = `${oldProps.style} ${tag.props.style}`;
            }
            if (oldProps.class && tag.props.class) {
              tag.props.class = `${oldProps.class} ${tag.props.class}`;
            } else if (oldProps.class) {
              tag.props.class = oldProps.class;
            }
            deduping[dedupeKey].props = {
              ...oldProps,
              ...tag.props
            };
            continue;
          } else if (tag._e === dupedTag._e) {
            dupedTag._duped = dupedTag._duped || [];
            tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
            dupedTag._duped.push(tag);
            continue;
          } else if (tagWeight(tag) > tagWeight(dupedTag)) {
            continue;
          }
        }
        const hasProps = tag.innerHTML || tag.textContent || Object.keys(tag.props).length !== 0;
        if (!hasProps && HasElementTags.has(tag.tag)) {
          delete deduping[dedupeKey];
          continue;
        }
        deduping[dedupeKey] = tag;
      }
      const newTags = [];
      for (const key in deduping) {
        const tag = deduping[key];
        const dupes = tag._duped;
        newTags.push(tag);
        if (dupes) {
          delete tag._duped;
          newTags.push(...dupes);
        }
      }
      ctx.tags = newTags;
      ctx.tags = ctx.tags.filter((t) => !(t.tag === "meta" && (t.props.name || t.props.property) && !t.props.content));
    }
  }
});

const ValidEventTags = /* @__PURE__ */ new Set(["script", "link", "bodyAttrs"]);
const EventHandlersPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (!ValidEventTags.has(tag.tag)) {
          continue;
        }
        const props = tag.props;
        for (const key in props) {
          if (key[0] !== "o" || key[1] !== "n") {
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
            continue;
          }
          const value = props[key];
          if (typeof value !== "function") {
            continue;
          }
          if (head.ssr && NetworkEvents.has(key)) {
            props[key] = `this.dataset.${key}fired = true`;
          } else {
            delete props[key];
          }
          tag._eventHandlers = tag._eventHandlers || {};
          tag._eventHandlers[key] = value;
        }
        if (head.ssr && tag._eventHandlers && (tag.props.src || tag.props.href)) {
          tag.key = tag.key || hashCode(tag.props.src || tag.props.href);
        }
      }
    },
    "dom:renderTag": ({ $el, tag }) => {
      const dataset = $el?.dataset;
      if (!dataset) {
        return;
      }
      for (const k in dataset) {
        if (!k.endsWith("fired")) {
          continue;
        }
        const ek = k.slice(0, -5);
        if (!NetworkEvents.has(ek)) {
          continue;
        }
        tag._eventHandlers?.[ek]?.call($el, new Event(ek.substring(2)));
      }
    }
  }
}));

const DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
const HashKeyedPlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.key && DupeableTags.has(tag.tag)) {
        tag.props["data-hid"] = tag._h = hashCode(tag.key);
      }
    }
  }
});

const PayloadPlugin = defineHeadPlugin({
  mode: "server",
  hooks: {
    "tags:beforeResolve": (ctx) => {
      const payload = {};
      let hasPayload = false;
      for (const tag of ctx.tags) {
        if (tag._m !== "server" || tag.tag !== "titleTemplate" && tag.tag !== "templateParams" && tag.tag !== "title") {
          continue;
        }
        payload[tag.tag] = tag.tag === "title" || tag.tag === "titleTemplate" ? tag.textContent : tag.props;
        hasPayload = true;
      }
      if (hasPayload) {
        ctx.tags.push({
          tag: "script",
          innerHTML: JSON.stringify(payload),
          props: { id: "unhead:payload", type: "application/json" }
        });
      }
    }
  }
});

const SortPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (typeof tag.tagPriority !== "string") {
          continue;
        }
        for (const { prefix, offset } of SortModifiers) {
          if (!tag.tagPriority.startsWith(prefix)) {
            continue;
          }
          const key = tag.tagPriority.substring(prefix.length);
          const position = ctx.tags.find((tag2) => tag2._d === key)?._p;
          if (position !== void 0) {
            tag._p = position + offset;
            break;
          }
        }
      }
      ctx.tags.sort((a, b) => {
        const aWeight = tagWeight(a);
        const bWeight = tagWeight(b);
        if (aWeight < bWeight) {
          return -1;
        } else if (aWeight > bWeight) {
          return 1;
        }
        return a._p - b._p;
      });
    }
  }
});

const SupportedAttrs = {
  meta: "content",
  link: "href",
  htmlAttrs: "lang"
};
const contentAttrs = ["innerHTML", "textContent"];
const TemplateParamsPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let templateParams;
      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag !== "templateParams") {
          continue;
        }
        templateParams = ctx.tags.splice(i, 1)[0].props;
        i -= 1;
      }
      const params = templateParams || {};
      const sep = params.separator || "|";
      delete params.separator;
      params.pageTitle = processTemplateParams(
        // find templateParams
        params.pageTitle || tags.find((tag) => tag.tag === "title")?.textContent || "",
        params,
        sep
      );
      for (const tag of tags) {
        if (tag.processTemplateParams === false) {
          continue;
        }
        const v = SupportedAttrs[tag.tag];
        if (v && typeof tag.props[v] === "string") {
          tag.props[v] = processTemplateParams(tag.props[v], params, sep);
        } else if (tag.processTemplateParams || tag.tag === "titleTemplate" || tag.tag === "title") {
          for (const p of contentAttrs) {
            if (typeof tag[p] === "string")
              tag[p] = processTemplateParams(tag[p], params, sep, tag.tag === "script" && tag.props.type.endsWith("json"));
          }
        }
      }
      head._templateParams = params;
      head._separator = sep;
    },
    "tags:afterResolve": ({ tags }) => {
      let title;
      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag === "title" && tag.processTemplateParams !== false) {
          title = tag;
        }
      }
      if (title?.textContent) {
        title.textContent = processTemplateParams(title.textContent, head._templateParams, head._separator);
      }
    }
  }
}));

const TitleTemplatePlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let titleTag;
      let titleTemplateTag;
      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];
        if (tag.tag === "title") {
          titleTag = tag;
        } else if (tag.tag === "titleTemplate") {
          titleTemplateTag = tag;
        }
      }
      if (titleTemplateTag && titleTag) {
        const newTitle = resolveTitleTemplate(
          titleTemplateTag.textContent,
          titleTag.textContent
        );
        if (newTitle !== null) {
          titleTag.textContent = newTitle || titleTag.textContent;
        } else {
          ctx.tags.splice(ctx.tags.indexOf(titleTag), 1);
        }
      } else if (titleTemplateTag) {
        const newTitle = resolveTitleTemplate(
          titleTemplateTag.textContent
        );
        if (newTitle !== null) {
          titleTemplateTag.textContent = newTitle;
          titleTemplateTag.tag = "title";
          titleTemplateTag = void 0;
        }
      }
      if (titleTemplateTag) {
        ctx.tags.splice(ctx.tags.indexOf(titleTemplateTag), 1);
      }
    }
  }
});

const XSSPlugin = defineHeadPlugin({
  hooks: {
    "tags:afterResolve": (ctx) => {
      for (const tag of ctx.tags) {
        if (typeof tag.innerHTML === "string") {
          if (tag.innerHTML && (tag.props.type === "application/ld+json" || tag.props.type === "application/json")) {
            tag.innerHTML = tag.innerHTML.replace(/</g, "\\u003C");
          } else {
            tag.innerHTML = tag.innerHTML.replace(new RegExp(`</${tag.tag}`, "g"), `<\\/${tag.tag}`);
          }
        }
      }
    }
  }
});

let activeHead;
// @__NO_SIDE_EFFECTS__
function createHead$1(options = {}) {
  const head = createHeadCore(options);
  head.use(DomPlugin());
  return activeHead = head;
}
function filterMode(mode, ssr) {
  return !mode || mode === "server" && ssr || mode === "client" && !ssr;
}
function createHeadCore(options = {}) {
  const hooks = createHooks();
  hooks.addHooks(options.hooks || {});
  options.document = options.document || (IsBrowser ? document : void 0);
  const ssr = !options.document;
  const updated = () => {
    head.dirty = true;
    hooks.callHook("entries:updated", head);
  };
  let entryCount = 0;
  let entries = [];
  const plugins = [];
  const head = {
    plugins,
    dirty: false,
    resolvedOptions: options,
    hooks,
    headEntries() {
      return entries;
    },
    use(p) {
      const plugin = typeof p === "function" ? p(head) : p;
      if (!plugin.key || !plugins.some((p2) => p2.key === plugin.key)) {
        plugins.push(plugin);
        filterMode(plugin.mode, ssr) && hooks.addHooks(plugin.hooks || {});
      }
    },
    push(input, entryOptions) {
      delete entryOptions?.head;
      const entry = {
        _i: entryCount++,
        input,
        ...entryOptions
      };
      if (filterMode(entry.mode, ssr)) {
        entries.push(entry);
        updated();
      }
      return {
        dispose() {
          entries = entries.filter((e) => e._i !== entry._i);
          updated();
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          for (const e of entries) {
            if (e._i === entry._i) {
              e.input = entry.input = input2;
            }
          }
          updated();
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        const resolved = entry.resolvedInput || entry.input;
        entry.resolvedInput = await (entry.transform ? entry.transform(resolved) : resolved);
        if (entry.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry)) {
            const tagCtx = { tag, entry, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:beforeResolve", resolveCtx);
      await hooks.callHook("tags:resolve", resolveCtx);
      await hooks.callHook("tags:afterResolve", resolveCtx);
      return resolveCtx.tags;
    },
    ssr
  };
  [
    DedupePlugin,
    PayloadPlugin,
    EventHandlersPlugin,
    HashKeyedPlugin,
    SortPlugin,
    TemplateParamsPlugin,
    TitleTemplatePlugin,
    XSSPlugin,
    ...options?.plugins || []
  ].forEach((p) => head.use(p));
  head.hooks.callHook("init", head);
  return head;
}

function getActiveHead() {
  return activeHead;
}

const Vue3 = version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createHead(options = {}) {
  options.domDelayFn = options.domDelayFn || ((fn) => nextTick(() => setTimeout(() => fn(), 0)));
  const head = createHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  return head || getActiveHead();
}

function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

function deserializeState(state) {
  try {
    return JSON.parse(state || "{}");
  } catch (error) {
    console.error("[SSG] On state deserialization -", error, state);
    return {};
  }
}

function documentReady(_passThrough) {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", () => resolve(_passThrough));
    });
  }
  return Promise.resolve(_passThrough);
}

const ClientOnly = defineComponent({
  setup(props, { slots }) {
    const mounted = ref(false);
    onMounted(() => mounted.value = true);
    return () => {
      if (!mounted.value)
        return slots.placeholder && slots.placeholder({});
      return slots.default && slots.default({});
    };
  }
});

function ViteSSG(App, fn, options = {}) {
  const {
    transformState,
    registerComponents = true,
    useHead = true,
    rootContainer = "#app"
  } = options;
  const isClient = typeof window !== "undefined";
  async function createApp$1(client = false) {
    const app = client ? createApp(App) : createSSRApp(App);
    let head;
    if (useHead) {
      head = createHead();
      app.use(head);
    }
    const appRenderCallbacks = [];
    const onSSRAppRendered = client ? () => {
    } : (cb) => appRenderCallbacks.push(cb);
    const triggerOnSSRAppRendered = () => {
      return Promise.all(appRenderCallbacks.map((cb) => cb()));
    };
    const context = { app, head, isClient, router: void 0, routes: void 0, initialState: {}, onSSRAppRendered, triggerOnSSRAppRendered, transformState };
    if (registerComponents)
      app.component("ClientOnly", ClientOnly);
    if (client) {
      await documentReady();
      context.initialState = transformState?.(window.__INITIAL_STATE__ || {}) || deserializeState(window.__INITIAL_STATE__);
    }
    await fn?.(context);
    const initialState = context.initialState;
    return {
      ...context,
      initialState
    };
  }
  if (isClient) {
    (async () => {
      const { app } = await createApp$1(true);
      app.mount(rootContainer, true);
    })();
  }
  return createApp$1;
}

var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dayjs_min = {exports: {}};

(function (module, exports) {
	!function(t,e){module.exports=e();}(commonjsGlobal$1,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,true),this.parse(t),this.$x=this.$x||t.x||{},this[p]=true;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,false)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case "YY":return String(e.$y).slice(-2);case "YYYY":return b.s(e.$y,4,"0");case "M":return a+1;case "MM":return b.s(a+1,2,"0");case "MMM":return h(n.monthsShort,a,c,3);case "MMMM":return h(c,a);case "D":return e.$D;case "DD":return b.s(e.$D,2,"0");case "d":return String(e.$W);case "dd":return h(n.weekdaysMin,e.$W,o,2);case "ddd":return h(n.weekdaysShort,e.$W,o,3);case "dddd":return o[e.$W];case "H":return String(s);case "HH":return b.s(s,2,"0");case "h":return d(1);case "hh":return d(2);case "a":return $(s,u,true);case "A":return $(s,u,false);case "m":return String(u);case "mm":return b.s(u,2,"0");case "s":return String(e.$s);case "ss":return b.s(e.$s,2,"0");case "SSS":return b.s(e.$ms,3,"0");case "Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,true);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=true),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
} (dayjs_min));

var dayjs_minExports = dayjs_min.exports;
const dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

var relativeTime$1 = {exports: {}};

(function (module, exports) {
	!function(r,e){module.exports=e();}(commonjsGlobal$1,(function(){return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,true):i.diff(e,y.d,true));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return "function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,true)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)};}})); 
} (relativeTime$1));

var relativeTimeExports = relativeTime$1.exports;
const relativeTime = /*@__PURE__*/getDefaultExportFromCjs(relativeTimeExports);

const WORKING_START_DATE = "2017-04-01";
const TELEGRAM_LINK = "https://t.me/m_nkv";
const EMAIL_ADDRESS = "max.novikov.work@gmail.com";

const getDegreeSin = (degree) => Math.sin(degree * Math.PI / 180);

var ERectColor = /* @__PURE__ */ ((ERectColor2) => {
  ERectColor2["Yellow"] = "#ffcc00";
  ERectColor2["Blue"] = "#0066cc";
  ERectColor2["Black"] = "#000";
  ERectColor2["Red"] = "#fa0202";
  return ERectColor2;
})(ERectColor || {});

const ROWS_COUNT = 35;
const COLS_COUNT = 45;
const CIRCLE_DEGREES = 360;
const WAVE_SIZE = 1.25;
const RECT_SIZE = 1;
const SHADOW_OFFSET = 4;
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CanvasAnimation",
  setup(__props) {
    const DEGREE_STEP = CIRCLE_DEGREES / COLS_COUNT;
    const LAST_ROW_INDEX = Math.floor(ROWS_COUNT / 2 - 1);
    const TOP_POSITION = WAVE_SIZE * 2 + SHADOW_OFFSET;
    const LEFT_POSITION = 1 + SHADOW_OFFSET;
    const IMAGE_HEIGHT = ROWS_COUNT * RECT_SIZE + TOP_POSITION * 2 + WAVE_SIZE * 2 + SHADOW_OFFSET;
    const IMAGE_WIDTH = COLS_COUNT + LEFT_POSITION * 2 + SHADOW_OFFSET;
    const getAnimationState = (offset) => {
      const topColor = (
        /*isDarkMode.value ? ERectColor.Red :*/
        ERectColor.Blue
      );
      const bottomColor = (
        /*isDarkMode.value ? ERectColor.Black :*/
        ERectColor.Yellow
      );
      const matrix = [];
      for (let row = 0; row < ROWS_COUNT; row++) {
        matrix[row] = [];
        for (let col = 0; col < COLS_COUNT; col++) {
          const degree = DEGREE_STEP * offset + DEGREE_STEP * col;
          matrix[row][col] = {
            color: row <= LAST_ROW_INDEX ? topColor : bottomColor,
            x: LEFT_POSITION + col * RECT_SIZE,
            y: TOP_POSITION + row * RECT_SIZE + getDegreeSin(degree) * WAVE_SIZE
          };
        }
      }
      return matrix;
    };
    const step = ref(0);
    const timeout = ref(null);
    const initializeAnimation = () => {
      setCanvasSize();
      draw(0);
      setAnimation();
    };
    onMounted(initializeAnimation);
    onUnmounted(() => {
      clearTimeout(timeout.value);
    });
    const canvas = ref(null);
    const setCanvasSize = () => {
      const ctx = canvas.value.getContext("2d");
      canvas.value.width = IMAGE_WIDTH;
      canvas.value.height = IMAGE_HEIGHT;
      const dpr = window.devicePixelRatio;
      const rect = canvas.value.getBoundingClientRect();
      canvas.value.width = rect.width * dpr;
      canvas.value.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.value.style.width = `${rect.width}px`;
      canvas.value.style.height = `${rect.height}px`;
    };
    const setAnimation = () => {
      requestAnimationFrame(() => {
        step.value = step.value >= COLS_COUNT ? 0 : step.value + 1;
        draw(step.value);
        timeout.value = setTimeout(setAnimation, 25);
      });
    };
    const draw = (offset) => {
      const ctx = canvas.value.getContext("2d", {
        alpha: false
      });
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0,0,0, 0.65)";
      ctx.shadowOffsetY = SHADOW_OFFSET;
      ctx.shadowOffsetX = SHADOW_OFFSET;
      const matrix = getAnimationState(offset);
      matrix.forEach(
        (row) => row.forEach((col) => {
          ctx.fillStyle = col.color;
          ctx.fillRect(col.x, col.y, RECT_SIZE, RECT_SIZE);
        })
      );
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        ref_key: "canvas",
        ref: canvas
      }, null, 512);
    };
  }
});

const _sfc_main$6 = defineComponent({
  setup() {
    return {
      TELEGRAM_LINK,
      EMAIL_ADDRESS
    };
  }
});

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _hoisted_1$5 = { class: "flex items-center gap-x-4" };
const _hoisted_2$4 = ["href"];
const _hoisted_3$3 = ["href"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    _cache[0] || (_cache[0] = createBaseVNode("strong", null, "My contacts:", -1)),
    createBaseVNode("a", {
      class: "text-red-400",
      href: `mailto:${_ctx.EMAIL_ADDRESS}`
    }, [
      createVNode(_component_font_awesome_icon, { icon: "at" })
    ], 8, _hoisted_2$4),
    createBaseVNode("a", {
      class: "text-red-400",
      href: _ctx.TELEGRAM_LINK
    }, [
      createVNode(_component_font_awesome_icon, { icon: ["fa-brands", "telegram-plane"] })
    ], 8, _hoisted_3$3)
  ]);
}
const ContactsBlock = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3]]);

const _hoisted_1$4 = { class: "text-5xl font-semibold flex" };
const _hoisted_2$3 = { class: "content-block__wrapper mt-12" };
const _hoisted_3$2 = { class: "mb-3" };
const _hoisted_4$1 = { class: "whitespace-nowrap" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ContentBlock",
  setup(__props) {
    dayjs.extend(relativeTime);
    const startWorkingDate = computed(() => {
      return dayjs(WORKING_START_DATE).fromNow(true);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", null, [
        createBaseVNode("h1", _hoisted_1$4, [
          _cache[0] || (_cache[0] = createTextVNode(" Hello. ")),
          createVNode(_sfc_main$7, { class: "ml-1 mt-1 sm:mt-2.5" })
        ]),
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("p", _hoisted_3$2, [
            _cache[2] || (_cache[2] = createTextVNode(" My name is ")),
            _cache[3] || (_cache[3] = createBaseVNode("strong", null, "Maksym Novikov.", -1)),
            _cache[4] || (_cache[4] = createTextVNode(" I am a Front-end engineer with ")),
            createBaseVNode("strong", null, [
              createBaseVNode("span", _hoisted_4$1, toDisplayString(startWorkingDate.value), 1),
              _cache[1] || (_cache[1] = createTextVNode(" of experience"))
            ]),
            _cache[5] || (_cache[5] = createTextVNode(" in developing projects of different scales. "))
          ]),
          _cache[6] || (_cache[6] = createBaseVNode("p", { class: "mb-3" }, " My primary responsibilities are developing projects from scratch and support of existing projects. I also had an experience of team management and working with customers. ", -1)),
          _cache[7] || (_cache[7] = createBaseVNode("p", null, " I dedicate my free time to studying and contributing to open source. ", -1))
        ]),
        createVNode(ContactsBlock, { class: "mt-4" })
      ]);
    };
  }
});

const workExperiencesList = [
  {
    title: "14Four | October 2023 - Present",
    description: "Developed creative-focused client-side applications using React (Next) and Vue (Nuxt) for industry-leading brands such as Pepsi, Toyota, and Carmax, etc. Partnered closely with clients to deploy projects seamlessly in their environments, ensuring smooth transitions and providing ongoing support to maintain and optimize their digital platforms.",
    techStack: "Vue.js, Nuxt.js, SSR, Composition API, TypeScript, WebSocket, Element UI, React.js, Next.js."
  },
  {
    title: "Milan Art Institute | April 2021 - October 2023",
    description: "My primary responsibilities is development of social network platform frontend part and admin panel for it from scratch.",
    techStack: "Vue.js, Nuxt.js, SSR, Composition API, TypeScript, WebSocket, Element UI, React.js, Next.js."
  },
  {
    title: "Kilian business consulting GmbHv | October 2019 - March 2021",
    description: "Was responsible for development of customer personal cabinet UI, estimating of features development, code review.",
    techStack: "Vue.js, Vuex, Gridsome, Bootstrap."
  },
  {
    title: "Empat | June 2018 - April 2021",
    description: "Was responsible for development of CRM systems on Vue.js, development of websites with Drupal/Wordpress CMS systems, estimation of new projects, support of existing projects mentoring of trainee engineers.",
    techStack: "Vue.js, Nuxt.js, Vuex, React.js, Next.js, Redux, Gulp, Webpack, JQuery, PHP, Wordpress."
  },
  {
    title: "Schrödinger's Cat Laboratory | April 2017 – June 2018",
    description: "My primary tasks was development of landing pages, UI part of e-commerce websites, corporative websites.",
    techStack: "HTML, Grunt, LESS, SCSS, CSS, JS, JQuery."
  }
];

const _sfc_main$4 = defineComponent({
  computed: {
    experienceList() {
      return workExperiencesList;
    }
  }
});

const _hoisted_1$3 = { class: "mt-12" };
const _hoisted_2$2 = { class: "mt-6 list-disc pl-4" };
const _hoisted_3$1 = { class: "font-semibold mb-1" };
const _hoisted_4 = { class: "mb-3" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$3, [
    _cache[1] || (_cache[1] = createBaseVNode("h2", { class: "text-2xl font-semibold" }, "Work experience", -1)),
    createBaseVNode("ul", _hoisted_2$2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.experienceList, (item, key) => {
        return openBlock(), createElementBlock("li", {
          key,
          class: "mb-6"
        }, [
          createBaseVNode("p", _hoisted_3$1, toDisplayString(item.title), 1),
          createBaseVNode("p", _hoisted_4, toDisplayString(item.description), 1),
          createBaseVNode("p", null, [
            _cache[0] || (_cache[0] = createBaseVNode("strong", null, "Tech stack:", -1)),
            createTextVNode(" " + toDisplayString(item.techStack), 1)
          ])
        ]);
      }), 128))
    ])
  ]);
}
const WorkExperience = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2]]);

const workExamplesList = [
  "https://www.artsocial.com/",
  "https://input.propdo.ai/il/buyer-2",
  "https://akurateco.com/",
  "https://express-tehbud.com/",
  "https://www.csi.org.ua/",
  "https://empat.tech/",
  "https://smartdome.ch/"
];

const _sfc_main$3 = defineComponent({
  computed: {
    examplesList() {
      return workExamplesList;
    }
  }
});

const _hoisted_1$2 = { class: "mt-12" };
const _hoisted_2$1 = { class: "mt-6 list-disc pl-4" };
const _hoisted_3 = ["href"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$2, [
    _cache[0] || (_cache[0] = createBaseVNode("h2", { class: "text-2xl font-semibold" }, "Examples of my work", -1)),
    createBaseVNode("ul", _hoisted_2$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.examplesList, (link) => {
        return openBlock(), createElementBlock("li", {
          key: link,
          class: "mb-2"
        }, [
          createBaseVNode("a", {
            href: link,
            target: "_blank",
            class: "text-red-400 border-b-2 border-dashed border-red-400"
          }, toDisplayString(link), 9, _hoisted_3)
        ]);
      }), 128))
    ])
  ]);
}
const ExamplesOfWork = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);

const setInitialTheme = () => {
  if (localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

const events = {};
function getIdGenerator() {
  let lastId = 0;
  return function getNextUniqueId2() {
    lastId += 1;
    return lastId;
  };
}
const getNextUniqueId = getIdGenerator();
function on$1(eventType, callback) {
  const id = getNextUniqueId();
  if (!events[eventType]) events[eventType] = {};
  events[eventType][id] = callback;
  return {
    off() {
      delete events[eventType][id];
      if (Object.keys(events[eventType]).length === 0) delete events[eventType];
    }
  };
}
function dispatch(eventType, arg) {
  if (!events[eventType]) return;
  Object.keys(events[eventType]).forEach((key) => events[eventType][key](arg));
}
const EventBus = {
  on: on$1,
  dispatch
};

const useLocalStorage = (storageKey, defaultValue) => {
  const eventBusKey = `${storageKey}-change`;
  const offEventBus = ref(null);
  const storageValue = ref(null);
  const getStorageValue = () => {
    const value = localStorage.getItem(storageKey);
    storageValue.value = value;
    return value;
  };
  const rawSetStorageValue = (newVal, triggerBus) => {
    localStorage.setItem(storageKey, newVal);
    storageValue.value = newVal;
    if (!triggerBus) return;
    EventBus.dispatch(eventBusKey);
  };
  const setStorageValue = (newVal) => {
    rawSetStorageValue(newVal, true);
  };
  onMounted(() => {
    const value = getStorageValue();
    if (!value) {
      rawSetStorageValue(defaultValue);
      getStorageValue();
    }
    const { off } = EventBus.on(eventBusKey, () => {
      getStorageValue();
    });
    offEventBus.value = off;
  });
  onUnmounted(() => {
    offEventBus.value?.();
  });
  return { storageValue, setStorageValue };
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ThemeSwitcher",
  setup(__props) {
    const { setStorageValue } = useLocalStorage("theme", "light");
    const onClick = () => {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        setStorageValue("light");
      } else {
        document.body.classList.add("dark");
        setStorageValue("dark");
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", { onClick });
    };
  }
});

const ThemeSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-828acd8f"]]);

var t$2="undefined"!=typeof self?self:{};function e(e,n){t:{for(var r=["CLOSURE_FLAGS"],i=t$2,s=0;s<r.length;s++)if(null==(i=i[r[s]])){r=null;break t}r=i;}return null!=(e=r&&r[e])?e:n}function n(){throw Error("Invalid UTF8")}function r$2(t,e){return e=String.fromCharCode.apply(null,e),null==t?e:t+e}let i,s$1;const o$1="undefined"!=typeof TextDecoder;let a;const h="undefined"!=typeof TextEncoder;function c(t){if(h)t=(a||=new TextEncoder).encode(t);else {let n=0;const r=new Uint8Array(3*t.length);for(let i=0;i<t.length;i++){var e=t.charCodeAt(i);if(e<128)r[n++]=e;else {if(e<2048)r[n++]=e>>6|192;else {if(e>=55296&&e<=57343){if(e<=56319&&i<t.length){const s=t.charCodeAt(++i);if(s>=56320&&s<=57343){e=1024*(e-55296)+s-56320+65536,r[n++]=e>>18|240,r[n++]=e>>12&63|128,r[n++]=e>>6&63|128,r[n++]=63&e|128;continue}i--;}e=65533;}r[n++]=e>>12|224,r[n++]=e>>6&63|128;}r[n++]=63&e|128;}}t=n===r.length?r:r.subarray(0,n);}return t}var u,l=e(610401301,false),f=e(645172343,e(1,true)),d=e(660014094,false);const p$1=t$2.navigator;function g$1(t){return !!l&&(!!u&&u.brands.some((({brand:e})=>e&&-1!=e.indexOf(t))))}function m(e){var n;return (n=t$2.navigator)&&(n=n.userAgent)||(n=""),-1!=n.indexOf(e)}function y(){return !!l&&(!!u&&u.brands.length>0)}function _(){return y()?g$1("Chromium"):(m("Chrome")||m("CriOS"))&&!(!y()&&m("Edge"))||m("Silk")}function v(t){return v[" "](t),t}u=p$1&&p$1.userAgentData||null,v[" "]=function(){};var E=!y()&&(m("Trident")||m("MSIE"));!m("Android")||_(),_(),m("Safari")&&(_()||!y()&&m("Coast")||!y()&&m("Opera")||!y()&&m("Edge")||(y()?g$1("Microsoft Edge"):m("Edg/"))||y()&&g$1("Opera"));var w$1={},T=null;function A$1(t){var e=t.length,n=3*e/4;n%3?n=Math.floor(n):-1!="=.".indexOf(t[e-1])&&(n=-1!="=.".indexOf(t[e-2])?n-2:n-1);var r=new Uint8Array(n),i=0;return function(t,e){function n(e){for(;r<t.length;){var n=t.charAt(r++),i=T[n];if(null!=i)return i;if(!/^[\s\xa0]*$/.test(n))throw Error("Unknown base64 encoding at char: "+n)}return e}b();for(var r=0;;){var i=n(-1),s=n(0),o=n(64),a=n(64);if(64===a&&-1===i)break;e(i<<2|s>>4),64!=o&&(e(s<<4&240|o>>2),64!=a&&e(o<<6&192|a));}}(t,(function(t){r[i++]=t;})),i!==n?r.subarray(0,i):r}function b(){if(!T){T={};for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],n=0;n<5;n++){var r=t.concat(e[n].split(""));w$1[n]=r;for(var i=0;i<r.length;i++){var s=r[i];void 0===T[s]&&(T[s]=i);}}}}var k="undefined"!=typeof Uint8Array,S$1=!E&&"function"==typeof btoa;function x$1(t){if(!S$1){var e;void 0===e&&(e=0),b(),e=w$1[e];var n=Array(Math.floor(t.length/3)),r=e[64]||"";let h=0,c=0;for(;h<t.length-2;h+=3){var i=t[h],s=t[h+1],o=t[h+2],a=e[i>>2];i=e[(3&i)<<4|s>>4],s=e[(15&s)<<2|o>>6],o=e[63&o],n[c++]=a+i+s+o;}switch(a=0,o=r,t.length-h){case 2:o=e[(15&(a=t[h+1]))<<2]||r;case 1:t=t[h],n[c]=e[t>>2]+e[(3&t)<<4|a>>4]+o+r;}return n.join("")}for(e="",n=0,r=t.length-10240;n<r;)e+=String.fromCharCode.apply(null,t.subarray(n,n+=10240));return e+=String.fromCharCode.apply(null,n?t.subarray(n):t),btoa(e)}const L$1=/[-_.]/g,F={"-":"+",_:"/",".":"="};function R(t){return F[t]||""}function M(t){if(!S$1)return A$1(t);L$1.test(t)&&(t=t.replace(L$1,R)),t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function I(t){return k&&null!=t&&t instanceof Uint8Array}var P$1={};let O;function C(t){if(t!==P$1)throw Error("illegal external caller")}function U(){return O||=new D(null,P$1)}function N(t){C(P$1);var e=t.g;return null==(e=null==e||I(e)?e:"string"==typeof e?M(e):null)?e:t.g=e}var D=class{constructor(t,e){if(C(e),this.g=t,null!=t&&0===t.length)throw Error("ByteString should be constructed with non-empty values")}h(){return new Uint8Array(N(this)||0)}};function B(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e;}let G$1;function j(){const e=Error();B(e,"incident"),function(e){t$2.setTimeout((()=>{throw e}),0);}(e);}function V(t){return B(t=Error(t),"warning"),t}function X(){return "function"==typeof BigInt}function H(t){return Array.prototype.slice.call(t)}var W="function"==typeof Symbol&&"symbol"==typeof Symbol();function z(t){return "function"==typeof Symbol&&"symbol"==typeof Symbol()?Symbol():t}var K=z(),Y=z("0di"),$=z("2ex"),q=z("1oa"),Z=W?(t,e)=>{t[K]|=e;}:(t,e)=>{ void 0!==t.g?t.g|=e:Object.defineProperties(t,{g:{value:e,configurable:true,writable:true,enumerable:false}});},Q=W?(t,e)=>{t[K]&=~e;}:(t,e)=>{ void 0!==t.g&&(t.g&=~e);},tt=W?t=>0|t[K]:t=>0|t.g,et=W?t=>t[K]:t=>t.g,nt=W?(t,e)=>{t[K]=e;}:(t,e)=>{ void 0!==t.g?t.g=e:Object.defineProperties(t,{g:{value:e,configurable:true,writable:true,enumerable:false}});};function rt(t){return Z(t,34),t}function it(t,e){nt(e,-14591&(0|t));}function st(t,e){nt(e,-14557&(34|t));}var ot,at={},ht={};function ct(t){return !(!t||"object"!=typeof t||t.Ja!==ht)}function ut(t){return null!==t&&"object"==typeof t&&!Array.isArray(t)&&t.constructor===Object}function lt$1(t,e,n){if(null!=t)if("string"==typeof t)t=t?new D(t,P$1):U();else if(t.constructor!==D)if(I(t))t=t.length?new D(n?t:new Uint8Array(t),P$1):U();else {if(!e)throw Error();t=void 0;}return t}function ft(t){return !(!Array.isArray(t)||t.length)&&!!(1&tt(t))}const dt=[];function pt$1(t){if(2&t)throw Error()}nt(dt,55),ot=Object.freeze(dt);class gt{constructor(t,e,n){this.l=0,this.g=t,this.h=e,this.m=n;}next(){if(this.l<this.g.length){const t=this.g[this.l++];return {done:false,value:this.h?this.h.call(this.m,t):t}}return {done:true,value:void 0}}[Symbol.iterator](){return new gt(this.g,this.h,this.m)}}let mt,yt;function _t(t,e){(e=mt?e[mt]:void 0)&&(t[mt]=H(e));}var vt=Object.freeze({});var Et$1=Object.freeze({});const wt="function"==typeof Uint8Array.prototype.slice;let Tt,At$1=0,bt=0;function kt(t){const e=t>>>0;At$1=e,bt=(t-e)/4294967296>>>0;}function St$1(t){if(t<0){kt(-t);const[e,n]=Pt(At$1,bt);At$1=e>>>0,bt=n>>>0;}else kt(t);}function xt$1(t){const e=Tt||=new DataView(new ArrayBuffer(8));e.setFloat32(0,+t,true),bt=0,At$1=e.getUint32(0,true);}function Lt$1(t,e){return 4294967296*e+(t>>>0)}function Ft$1(t,e){const n=2147483648&e;return n&&(e=~e>>>0,0==(t=1+~t>>>0)&&(e=e+1>>>0)),t=Lt$1(t,e),n?-t:t}function Rt(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else X()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+Mt(n)+Mt(t));return n}function Mt(t){return t=String(t),"0000000".slice(t.length)+t}function It(t){if(t.length<16)St$1(Number(t));else if(X())t=BigInt(t),At$1=Number(t&BigInt(4294967295))>>>0,bt=Number(t>>BigInt(32)&BigInt(4294967295));else {const e=+("-"===t[0]);bt=At$1=0;const n=t.length;for(let r=e,i=(n-e)%6+e;i<=n;r=i,i+=6){const e=Number(t.slice(r,i));bt*=1e6,At$1=1e6*At$1+e,At$1>=4294967296&&(bt+=Math.trunc(At$1/4294967296),bt>>>=0,At$1>>>=0);}if(e){const[t,e]=Pt(At$1,bt);At$1=t,bt=e;}}}function Pt(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}function Ot(t){return t.Qa=true,t}var Ct$1=Ot((t=>"number"==typeof t)),Ut=Ot((t=>"string"==typeof t)),Nt=Ot((t=>"boolean"==typeof t)),Dt="function"==typeof t$2.BigInt&&"bigint"==typeof t$2.BigInt(0),Bt=Ot((t=>Dt?t>=jt&&t<=Xt:"-"===t[0]?Ht(t,Gt):Ht(t,Vt)));const Gt=Number.MIN_SAFE_INTEGER.toString(),jt=Dt?BigInt(Number.MIN_SAFE_INTEGER):void 0,Vt=Number.MAX_SAFE_INTEGER.toString(),Xt=Dt?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Ht(t,e){if(t.length>e.length)return  false;if(t.length<e.length||t===e)return  true;for(let n=0;n<t.length;n++){const r=t[n],i=e[n];if(r>i)return  false;if(r<i)return  true}}function Wt$1(t){return null==t||"number"==typeof t?t:"NaN"===t||"Infinity"===t||"-Infinity"===t?Number(t):void 0}function zt(t){return null==t||"boolean"==typeof t?t:"number"==typeof t?!!t:void 0}const Kt=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Yt$1(t){const e=typeof t;switch(e){case "bigint":return  true;case "number":return Number.isFinite(t)}return "string"===e&&Kt.test(t)}function $t(t){if(null==t)return t;if("string"==typeof t){if(!t)return;t=+t;}return "number"==typeof t&&Number.isFinite(t)?0|t:void 0}function qt(t){if(null==t)return t;if("string"==typeof t){if(!t)return;t=+t;}return "number"==typeof t&&Number.isFinite(t)?t>>>0:void 0}function Jt(t){return "-"!==t[0]&&(t.length<20||20===t.length&&Number(t.substring(0,6))<184467)}function Zt(t){return t=Math.trunc(t),Number.isSafeInteger(t)||(St$1(t),t=Ft$1(At$1,bt)),t}function Qt(t){var e=Math.trunc(Number(t));if(Number.isSafeInteger(e))return String(e);if(-1!==(e=t.indexOf("."))&&(t=t.substring(0,e)),!("-"===t[0]?t.length<20||20===t.length&&Number(t.substring(0,7))>-922337:t.length<19||19===t.length&&Number(t.substring(0,6))<922337))if(It(t),t=At$1,2147483648&(e=bt))if(X())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else {const[n,r]=Pt(t,e);t="-"+Rt(n,r);}else t=Rt(t,e);return t}function te(t){return null==t?t:"bigint"==typeof t?(Bt(t)?t=Number(t):(t=BigInt.asIntN(64,t),t=Bt(t)?Number(t):String(t)),t):Yt$1(t)?"number"==typeof t?Zt(t):Qt(t):void 0}function ee(t){if(null==t)return t;var e=typeof t;if("bigint"===e)return String(BigInt.asUintN(64,t));if(Yt$1(t)){if("string"===e)return e=Math.trunc(Number(t)),Number.isSafeInteger(e)&&e>=0?t=String(e):(-1!==(e=t.indexOf("."))&&(t=t.substring(0,e)),Jt(t)||(It(t),t=Rt(At$1,bt))),t;if("number"===e)return (t=Math.trunc(t))>=0&&Number.isSafeInteger(t)?t:function(t){if(t<0){St$1(t);const e=Rt(At$1,bt);return t=Number(e),Number.isSafeInteger(t)?t:e}return Jt(String(t))?t:(St$1(t),Lt$1(At$1,bt))}(t)}}function ne(t){if("string"!=typeof t)throw Error();return t}function re(t){if(null!=t&&"string"!=typeof t)throw Error();return t}function ie(t){return null==t||"string"==typeof t?t:void 0}function se(t,e,n,r){if(null!=t&&"object"==typeof t&&t.Y===at)return t;if(!Array.isArray(t))return n?2&r?(t=e[Y])?e=t:(rt((t=new e).u),e=e[Y]=t):e=new e:e=void 0,e;let i=n=tt(t);return 0===i&&(i|=32&r),i|=2&r,i!==n&&nt(t,i),new e(t)}function oe(t,e,n){if(e)t:{if(!Yt$1(e=t))throw V("int64");switch(typeof e){case "string":e=Qt(e);break t;case "bigint":if(t=e=BigInt.asIntN(64,e),Ut(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(Ct$1(t)&&!Number.isSafeInteger(t))throw Error(String(t));e=Dt?BigInt(e):Nt(e)?e?"1":"0":Ut(e)?e.trim()||"0":String(e);break t;default:e=Zt(e);}}else e=te(t);return "string"==typeof(n=null==(t=e)?n?0:void 0:t)&&(e=+n,Number.isSafeInteger(e))?e:n}function ae(t){var e=he?.get(t);if(e)return e;if(Math.random()>.01)return t;if(void 0===ue)if("function"!=typeof Proxy)ue=null;else try{ue=-1!==Proxy.toString().indexOf("[native code]")?Proxy:null;}catch{ue=null;}return (e=ue)?(function(t,e){(he||=new WeakMap).set(t,e),(ce||=new WeakMap).set(e,t);}(t,e=new e(t,{set:(t,e,n)=>(j(),t[e]=n,true)})),e):t}let he,ce,ue,le,fe,de;function pe(t){switch(typeof t){case "boolean":return fe||=[0,void 0,true];case "number":return t>0?void 0:0===t?de||=[0,void 0]:[-t,void 0];case "string":return [0,t];case "object":return t}}function ge(t,e){return me(t,e[0],e[1])}function me(t,e,n){if(null==t&&(t=le),le=void 0,null==t){var r=96;n?(t=[n],r|=512):t=[],e&&(r=-16760833&r|(1023&e)<<14);}else {if(!Array.isArray(t))throw Error("narr");if(2048&(r=tt(t)))throw Error("farr");if(64&r)return t;if(r|=64,n&&(r|=512,n!==t[0]))throw Error("mid");t:{const i=(n=t).length;if(i){const t=i-1;if(ut(n[t])){if((e=t-(+!!(512&(r|=256))-1))>=1024)throw Error("pvtlmt");r=-16760833&r|(1023&e)<<14;break t}}if(e){if((e=Math.max(e,i-(+!!(512&r)-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&e)<<14;}}}return nt(t,r),t}const ye={};let _e=function(){try{return v(new class extends Map{constructor(){super();}}),!1}catch{return  true}}();class ve{constructor(){this.g=new Map;}get(t){return this.g.get(t)}set(t,e){return this.g.set(t,e),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size;}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,e){return this.g.forEach(t,e)}[Symbol.iterator](){return this.entries()}}const Ee=_e?(Object.setPrototypeOf(ve.prototype,Map.prototype),Object.defineProperties(ve.prototype,{size:{value:0,configurable:true,enumerable:true,writable:true}}),ve):class extends Map{constructor(){super();}};function we(t){return t}function Te(t){if(2&t.L)throw Error("Cannot mutate an immutable Map")}var Ae=class extends Ee{constructor(t,e,n=we,r=we){super();let i=tt(t);i|=64,nt(t,i),this.L=i,this.V=e,this.S=n,this.aa=this.V?be:r;for(let s=0;s<t.length;s++){const o=t[s],a=n(o[0],false,true);let h=o[1];e?void 0===h&&(h=null):h=r(o[1],false,true,void 0,void 0,i),super.set(a,h);}}oa(t=ke){if(0!==this.size)return this.Z(t)}Z(t=ke){const e=[],n=super.entries();for(var r;!(r=n.next()).done;)(r=r.value)[0]=t(r[0]),r[1]=t(r[1]),e.push(r);return e}clear(){Te(this),super.clear();}delete(t){return Te(this),super.delete(this.S(t,true,false))}entries(){var t=this.na();return new gt(t,Se,this)}keys(){return this.Ia()}values(){var t=this.na();return new gt(t,Ae.prototype.get,this)}forEach(t,e){super.forEach(((n,r)=>{t.call(e,this.get(r),r,this);}));}set(t,e){return Te(this),null==(t=this.S(t,true,false))?this:null==e?(super.delete(t),this):super.set(t,this.aa(e,true,true,this.V,false,this.L))}Oa(t){const e=this.S(t[0],false,true);t=t[1],t=this.V?void 0===t?null:t:this.aa(t,false,true,void 0,false,this.L),super.set(e,t);}has(t){return super.has(this.S(t,false,false))}get(t){t=this.S(t,false,false);const e=super.get(t);if(void 0!==e){var n=this.V;return n?((n=this.aa(e,false,true,n,this.ta,this.L))!==e&&super.set(t,n),n):e}}na(){return Array.from(super.keys())}Ia(){return super.keys()}[Symbol.iterator](){return this.entries()}};function be(t,e,n,r,i,s){return t=se(t,r,n,s),i&&(t=Ue(t)),t}function ke(t){return t}function Se(t){return [t,this.get(t)]}let xe;function Le(){return xe||=new Ae(rt([]),void 0,void 0,void 0,ye)}function Fe(t,e,n,r,i){if(null!=t){if(Array.isArray(t))t=ft(t)?void 0:i&&2&tt(t)?t:Re(t,e,n,void 0!==r,i);else if(ut(t)){const s={};for(let o in t)s[o]=Fe(t[o],e,n,r,i);t=s;}else t=e(t,r);return t}}function Re(t,e,n,r,i){const s=r||n?tt(t):0;r=r?!!(32&s):void 0;const o=H(t);for(let t=0;t<o.length;t++)o[t]=Fe(o[t],e,n,r,i);return n&&(_t(o,t),n(s,o)),o}function Me(t){return Fe(t,Ie,void 0,void 0,false)}function Ie(t){return t.Y===at?t.toJSON():t instanceof Ae?t.oa(Me):function(t){switch(typeof t){case "number":return isFinite(t)?t:String(t);case "bigint":return Bt(t)?Number(t):String(t);case "boolean":return t?1:0;case "object":if(t)if(Array.isArray(t)){if(ft(t))return}else {if(I(t))return x$1(t);if(t instanceof D){const e=t.g;return null==e?"":"string"==typeof e?e:t.g=x$1(e)}if(t instanceof Ae)return t.oa()}}return t}(t)}function Pe(t,e,n=st){if(null!=t){if(k&&t instanceof Uint8Array)return e?t:new Uint8Array(t);if(Array.isArray(t)){var r=tt(t);return 2&r?t:(e&&=0===r||!!(32&r)&&!(64&r||!(16&r)),e?(nt(t,-12293&(34|r)),t):Re(t,Pe,4&r?st:n,true,true))}return t.Y===at?(n=t.u,t=2&(r=et(n))?t:Oe(t,n,r,true)):t instanceof Ae&&!(2&t.L)&&(n=rt(t.Z(Pe)),t=new Ae(n,t.V,t.S,t.aa)),t}}function Oe(t,e,n,r){return t=t.constructor,le=e=Ce(e,n,r),e=new t(e),le=void 0,e}function Ce(t,e,n){const r=n||2&e?st:it,i=!!(32&e);return t=function(t,e,n){const r=H(t);var i=r.length;const s=256&e?r[i-1]:void 0;for(i+=s?-1:0,e=512&e?1:0;e<i;e++)r[e]=n(r[e]);if(s){e=r[e]={};for(const t in s)e[t]=n(s[t]);}return _t(r,t),r}(t,e,(t=>Pe(t,i,r))),Z(t,32|(n?2:0)),t}function Ue(t){const e=t.u,n=et(e);return 2&n?Oe(t,e,n,false):t}function Ne(t,e,n,r){return !(4&e)||null!=n}function De(t,e){return Ge(t=t.u,et(t),e)}function Be(t,e,n,r){if(!((e=r+(+!!(512&e)-1))<0||e>=t.length||e>=n))return t[e]}function Ge(t,e,n,r){if(-1===n)return null;const i=e>>14&1023||536870912;if(!(n>=i)){var s=t.length;return r&&256&e&&null!=(r=t[s-1][n])?(Be(t,e,i,n)&&null!=$&&((e=(t=G$1??={})[$]||0)>=4||(t[$]=e+1,j())),r):Be(t,e,i,n)}return 256&e?t[t.length-1][n]:void 0}function je(t,e,n,r){const i=t.u;let s=et(i);return pt$1(s),Ve(i,s,e,n,r),t}function Ve(t,e,n,r,i){const s=e>>14&1023||536870912;if(n>=s||i&&!f){let o=e;if(256&e)i=t[t.length-1];else {if(null==r)return o;i=t[s+(+!!(512&e)-1)]={},o|=256;}return i[n]=r,n<s&&(t[n+(+!!(512&e)-1)]=void 0),o!==e&&nt(t,o),o}return t[n+(+!!(512&e)-1)]=r,256&e&&(n in(t=t[t.length-1])&&delete t[n]),e}function Xe(t,e,n,r,i){var s=2&e;let o=Ge(t,e,n,i);Array.isArray(o)||(o=ot);const a=!(2&r);r=!(1&r);const h=!!(32&e);let c=tt(o);return 0!==c||!h||s||a?1&c||(c|=1,nt(o,c)):(c|=33,nt(o,c)),s?(t=false,2&c||(rt(o),t=!!(4&c)),(r||t)&&Object.freeze(o)):(s=!!(2&c)||!!(2048&c),r&&s?(o=H(o),r=1,h&&!a&&(r|=32),nt(o,r),Ve(t,e,n,o,i)):a&&32&c&&!s&&Q(o,32)),o}function He(t,e){t=t.u;let n=et(t);const r=Ge(t,n,e),i=Wt$1(r);return null!=i&&i!==r&&Ve(t,n,e,i),i}function We(t){t=t.u;let e=et(t);const n=Ge(t,e,1),r=lt$1(n,true,!!(34&e));return null!=r&&r!==n&&Ve(t,e,1,r),r}function ze(t,e,n){var r=void 0===vt?2:5;const i=t.u;var s=et(i);const o=2&s?1:r;r=Ke(i,s,e);var a=tt(r);if(Ne(t,a,void 0)){(4&a||Object.isFrozen(r))&&(r=H(r),a=fn(a,s),s=Ve(i,s,e,r));let o=t=0;for(;t<r.length;t++){const e=n(r[t]);null!=e&&(r[o++]=e);}o<t&&(r.length=o),a=-4097&(20|(a=Ye(a,s))),nt(r,a&=-8193),2&a&&Object.freeze(r);}let h;return 1===o||4===o&&32&a?$e(a)||(s=a,(a|=2)!==s&&nt(r,a),Object.freeze(r)):(n=5===o&&(!!(32&a)||$e(a)||!!he?.get(r)),(2===o||n)&&$e(a)&&(r=H(r),a=dn(a=fn(a,s),s,false),nt(r,a),s=Ve(i,s,e,r)),$e(a)||(e=a,(a=dn(a,s,false))!==e&&nt(r,a)),n&&(h=ae(r))),h||r}function Ke(t,e,n){return t=Ge(t,e,n),Array.isArray(t)?t:ot}function Ye(t,e){return 0===t&&(t=fn(t,e)),1|t}function $e(t){return !!(2&t)&&!!(4&t)||!!(2048&t)}function qe(t){t=H(t);for(let e=0;e<t.length;e++){const n=t[e]=H(t[e]);Array.isArray(n[1])&&(n[1]=rt(n[1]));}return t}function Je(t,e,n,r){t=t.u;let i=et(t);pt$1(i),Ve(t,i,e,("0"===r?0===Number(n):n===r)?void 0:n);}function Ze(t,e,n,r){const i=et(t);pt$1(i),t=Xe(t,i,e,2),r=n(r,(4&(e=tt(t))?4096&e?4096:8192&e?8192:0:void 0)??0),t.push(r);}function Qe(t){return t}function tn(t,e){var n=_s;return rn(en(t=t.u),t,et(t),n)===e?e:-1}function en(t){if(W)return t[q]??(t[q]=new Map);if(q in t)return t[q];const e=new Map;return Object.defineProperty(t,q,{value:e}),e}function nn(t,e,n,r){const i=en(t),s=rn(i,t,e,n);return s!==r&&(s&&(e=Ve(t,e,s)),i.set(n,r)),e}function rn(t,e,n,r){let i=t.get(r);if(null!=i)return i;i=0;for(let t=0;t<r.length;t++){const s=r[t];null!=Ge(e,n,s)&&(0!==i&&(n=Ve(e,n,i)),i=s);}return t.set(r,i),i}function sn(t,e,n,r){let i=et(t);const s=Ge(t,i,n,r);let o;if(null!=s&&s.Y===at)return (e=Ue(s))!==s&&Ve(t,i,n,e,r),e.u;if(Array.isArray(s)){const t=tt(s);o=2&t?Ce(s,t,false):s,o=ge(o,e);}else o=ge(void 0,e);return o!==s&&Ve(t,i,n,o,r),o}function on(t,e,n,r){t=t.u;let i=et(t);const s=Ge(t,i,n,r);return (e=se(s,e,false,i))!==s&&null!=e&&Ve(t,i,n,e,r),e}function an(t,e,n,r=false){if(null==(e=on(t,e,n,r)))return e;t=t.u;let i=et(t);if(!(2&i)){const s=Ue(e);s!==e&&Ve(t,i,n,e=s,r);}return e}function hn(t,e,n,r,i,s,o){var a=!!(2&e);i=a?1:i,s=!!s,o&&=!a,a=Ke(t,e,r);var h=tt(a),c=!!(4&h);if(!c){var u=a,l=e;const t=!!(2&(h=Ye(h,e)));t&&(l|=2);let r=!t,i=true,s=0,o=0;for(;s<u.length;s++){const e=se(u[s],n,false,l);if(e instanceof n){if(!t){const t=!!(2&tt(e.u));r&&=!t,i&&=t;}u[o++]=e;}}o<s&&(u.length=o),h|=4,h=i?16|h:-17&h,nt(u,h=r?8|h:-9&h),t&&Object.freeze(u);}if(o&&!(8&h||!a.length&&(1===i||4===i&&32&h))){for($e(h)&&(a=H(a),h=fn(h,e),e=Ve(t,e,r,a)),n=a,o=h,u=0;u<n.length;u++)(h=n[u])!==(l=Ue(h))&&(n[u]=l);o|=8,o=n.length?-17&o:16|o,nt(n,o),h=o;}let f;return 1===i||4===i&&32&h?$e(h)||(e=h,(h|=!a.length||16&h&&(!c||32&h)?2:2048)!==e&&nt(a,h),Object.freeze(a)):(c=5===i&&(!!(32&h)||$e(h)||!!he?.get(a)),(2===i||c)&&$e(h)&&(a=H(a),h=dn(h=fn(h,e),e,s),nt(a,h),e=Ve(t,e,r,a)),$e(h)||(t=h,(h=dn(h,e,s))!==t&&nt(a,h)),c&&(f=ae(a))),f||a}function cn(t,e,n){t=t.u;const r=et(t);return hn(t,r,e,n,void 0===vt?2:5,false,!(2&r))}function un(t,e,n,r,i){return null==r&&(r=void 0),je(t,n,r,i)}function ln(t,e,n,r){null==r&&(r=void 0);t:{t=t.u;let i=et(t);if(pt$1(i),null==r){const r=en(t);if(rn(r,t,i,n)!==e)break t;r.set(n,0);}else i=nn(t,i,n,e);Ve(t,i,e,r);}}function fn(t,e){return  -2049&(t=32|(2&e?2|t:-3&t))}function dn(t,e,n){return 32&e&&n||(t&=-33),t}function pn(t,e,n,r){t=t.u;const i=et(t);pt$1(i),e=hn(t,i,n,e,2,true),n=null!=r?r:new n,e.push(n),2&tt(n.u)?Q(e,8):Q(e,16);}function gn(t,e){return t??e}function mn(t,e){return $t(De(t,e))}function yn(t,e){return gn(He(t,e),0)}function _n(t,e){return gn(ie(De(t,e)),"")}function vn(t,e,n){if(null!=n&&"boolean"!=typeof n)throw t=typeof n,Error(`Expected boolean but got ${"object"!=t?t:n?Array.isArray(n)?"array":t:"null"}: ${n}`);je(t,e,n);}function En(t,e,n){if(null!=n){if("number"!=typeof n)throw V("int32");if(!Number.isFinite(n))throw V("int32");n|=0;}je(t,e,n);}function wn(t,e,n){if(null!=n&&"number"!=typeof n)throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);je(t,e,n);}function Tn(t,e,n){{const a=t.u;let h=et(a);if(pt$1(h),null==n)Ve(a,h,e);else {n=ce?.get(n)||n;var r,i=tt(n),s=i,o=!!(2&i)||Object.isFrozen(n);if((r=!o)&&(r=void 0===Et$1||false),Ne(t,i))for(i=21,o&&(n=H(n),s=0,i=dn(i=fn(i,h),h,true)),t=0;t<n.length;t++)n[t]=ne(n[t]);r&&(n=H(n),s=0,i=dn(i=fn(i,h),h,true)),i!==s&&nt(n,i),Ve(a,h,e,n);}}}function An(t,e){return Error(`Invalid wire type: ${t} (at position ${e})`)}function bn(){return Error("Failed to read varint, encoding is invalid.")}function kn(t,e){return Error(`Tried to read past the end of the data ${e} > ${t}`)}function Sn(t){if("string"==typeof t)return {buffer:M(t),N:false};if(Array.isArray(t))return {buffer:new Uint8Array(t),N:false};if(t.constructor===Uint8Array)return {buffer:t,N:false};if(t.constructor===ArrayBuffer)return {buffer:new Uint8Array(t),N:false};if(t.constructor===D)return {buffer:N(t)||new Uint8Array(0),N:true};if(t instanceof Uint8Array)return {buffer:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),N:false};throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers")}function xn(t,e){let n,r=0,i=0,s=0;const o=t.h;let a=t.g;do{n=o[a++],r|=(127&n)<<s,s+=7;}while(s<32&&128&n);for(s>32&&(i|=(127&n)>>4),s=3;s<32&&128&n;s+=7)n=o[a++],i|=(127&n)<<s;if(Cn(t,a),n<128)return e(r>>>0,i>>>0);throw bn()}function Ln(t){let e=0,n=t.g;const r=n+10,i=t.h;for(;n<r;){const r=i[n++];if(e|=r,0==(128&r))return Cn(t,n),!!(127&e)}throw bn()}function Fn(t){const e=t.h;let n=t.g,r=e[n++],i=127&r;if(128&r&&(r=e[n++],i|=(127&r)<<7,128&r&&(r=e[n++],i|=(127&r)<<14,128&r&&(r=e[n++],i|=(127&r)<<21,128&r&&(r=e[n++],i|=r<<28,128&r&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw bn();return Cn(t,n),i}function Rn(t){return Fn(t)>>>0}function Mn(t){var e=t.h;const n=t.g,r=e[n],i=e[n+1],s=e[n+2];return e=e[n+3],Cn(t,t.g+4),(r<<0|i<<8|s<<16|e<<24)>>>0}function In(t){var e=Mn(t);t=2*(e>>31)+1;const n=e>>>23&255;return e&=8388607,255==n?e?NaN:t*(1/0):0==n?t*Math.pow(2,-149)*e:t*Math.pow(2,n-150)*(e+Math.pow(2,23))}function Pn(t){return Fn(t)}function On(t,e,{da:n=false}={}){t.da=n,e&&(e=Sn(e),t.h=e.buffer,t.m=e.N,t.j=0,t.l=t.h.length,t.g=t.j);}function Cn(t,e){if(t.g=e,e>t.l)throw kn(t.l,e)}function Un(t,e){if(e<0)throw Error(`Tried to read a negative byte length: ${e}`);const n=t.g,r=n+e;if(r>t.l)throw kn(e,t.l-n);return t.g=r,n}function Nn(t,e){if(0==e)return U();var n=Un(t,e);return t.da&&t.m?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):wt?t.slice(n,e):new Uint8Array(t.subarray(n,e))),0==n.length?U():new D(n,P$1)}Ae.prototype.toJSON=void 0,Ae.prototype.Ja=ht;var Dn=[];function Bn(t){var e=t.g;if(e.g==e.l)return  false;t.l=t.g.g;var n=Rn(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5))throw An(n,t.l);if(e<1)throw Error(`Invalid field number: ${e} (at position ${t.l})`);return t.m=e,t.h=n,true}function Gn(t){switch(t.h){case 0:0!=t.h?Gn(t):Ln(t.g);break;case 1:Cn(t=t.g,t.g+8);break;case 2:if(2!=t.h)Gn(t);else {var e=Rn(t.g);Cn(t=t.g,t.g+e);}break;case 5:Cn(t=t.g,t.g+4);break;case 3:for(e=t.m;;){if(!Bn(t))throw Error("Unmatched start-group tag: stream EOF");if(4==t.h){if(t.m!=e)throw Error("Unmatched end-group tag");break}Gn(t);}break;default:throw An(t.h,t.l)}}function jn(t,e,n){const r=t.g.l,i=Rn(t.g),s=t.g.g+i;let o=s-r;if(o<=0&&(t.g.l=s,n(e,t,void 0,void 0,void 0),o=s-t.g.g),o)throw Error(`Message parsing ended unexpectedly. Expected to read ${i} bytes, instead read ${i-o} bytes, either the data ended unexpectedly or the message misreported its own length`);return t.g.g=s,t.g.l=r,e}function Vn(t){var e=Rn(t.g),a=Un(t=t.g,e);if(t=t.h,o$1){var h,c=t;(h=s$1)||(h=s$1=new TextDecoder("utf-8",{fatal:true})),e=a+e,c=0===a&&e===c.length?c:c.subarray(a,e);try{var u=h.decode(c);}catch(t){if(void 0===i){try{h.decode(new Uint8Array([128]));}catch(t){}try{h.decode(new Uint8Array([97])),i=!0;}catch(t){i=false;}}throw !i&&(s$1=void 0),t}}else {e=(u=a)+e,a=[];let i,s=null;for(;u<e;){var l=t[u++];l<128?a.push(l):l<224?u>=e?n():(i=t[u++],l<194||128!=(192&i)?(u--,n()):a.push((31&l)<<6|63&i)):l<240?u>=e-1?n():(i=t[u++],128!=(192&i)||224===l&&i<160||237===l&&i>=160||128!=(192&(h=t[u++]))?(u--,n()):a.push((15&l)<<12|(63&i)<<6|63&h)):l<=244?u>=e-2?n():(i=t[u++],128!=(192&i)||i-144+(l<<28)>>30!=0||128!=(192&(h=t[u++]))||128!=(192&(c=t[u++]))?(u--,n()):(l=(7&l)<<18|(63&i)<<12|(63&h)<<6|63&c,l-=65536,a.push(55296+(l>>10&1023),56320+(1023&l)))):n(),a.length>=8192&&(s=r$2(s,a),a.length=0);}u=r$2(s,a);}return u}function Xn(t){const e=Rn(t.g);return Nn(t.g,e)}function Hn(t,e,n){var r=Rn(t.g);for(r=t.g.g+r;t.g.g<r;)n.push(e(t.g));}var Wn=[];let zn;function Kn(t,e,n){e.g?e.m(t,e.g,e.h,n,true):e.m(t,e.h,n,true);}var Yn=class{constructor(t,e){this.u=me(t,e);}toJSON(){return $n(this)}l(){var t=vo;return t.g?t.l(this,t.g,t.h,true):t.l(this,t.h,t.defaultValue,true)}clone(){const t=this.u;return Oe(this,t,et(t),false)}N(){return !!(2&tt(this.u))}};function $n(t){t=zn?t.u:Re(t.u,Ie,void 0,void 0,false);{var e=!zn;let c=t.length;if(c){var n=t[c-1],r=ut(n);r?c--:n=void 0;var i=t;if(r){t:{var s=n,o={};if(r=false,s)for(var a in s){if(isNaN(+a)){o[a]=s[a];continue}let t=s[a];Array.isArray(t)&&(ft(t)||ct(t)&&0===t.size)&&(t=null),null==t&&(r=true),null!=t&&(o[a]=t);}if(r){for(let t in o)break t;o=null;}else o=s;}s=null==o?null!=n:o!==n;}for(;c>0&&(null==(a=i[c-1])||ft(a)||ct(a)&&0===a.size);c--)var h=true;(i!==t||s||h)&&(e?(h||s||o)&&(i.length=c):i=Array.prototype.slice.call(i,0,c),o&&i.push(o)),h=i;}else h=t;}return h}function qn(t){return t?/^\d+$/.test(t)?(It(t),new Jn(At$1,bt)):null:Zn||=new Jn(0,0)}Yn.prototype.Y=at,Yn.prototype.toString=function(){try{return zn=!0,$n(this).toString()}finally{zn=false;}};var Jn=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0;}};let Zn;function Qn(t){return t?/^-?\d+$/.test(t)?(It(t),new tr(At$1,bt)):null:er||=new tr(0,0)}var tr=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0;}};let er;function nr(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e);}function rr(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e);}function ir(t,e){if(e>=0)rr(t,e);else {for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1);}}function sr(t,e){t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255);}function or(t,e){0!==e.length&&(t.l.push(e),t.h+=e.length);}function ar(t,e,n){rr(t.g,8*e+n);}function hr(t,e){return ar(t,e,2),e=t.g.end(),or(t,e),e.push(t.h),e}function cr(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++;}function ur(t,e,n){ar(t,e,2),rr(t.g,n.length),or(t,t.g.end()),or(t,n);}function lr(t,e,n,r){null!=n&&(e=hr(t,e),r(n,t),cr(t,e));}class fr{constructor(t,e,n,r){this.g=t,this.h=e,this.l=n,this.pa=r;}}function dr(t){return Array.isArray(t)?t[0]instanceof fr?t:[gi,t]:[t,void 0]}function pr(t,e){if(Array.isArray(e)){var n=tt(e);if(4&n)return e;for(var r=0,i=0;r<e.length;r++){const n=t(e[r]);null!=n&&(e[i++]=n);}return i<r&&(e.length=i),nt(e,-12289&(5|n)),2&n&&Object.freeze(e),e}}const gr=Symbol();function mr(t){let e=t[gr];if(!e){const n=br(t),r=Ur(t),i=r.l;e=i?(t,e)=>i(t,e,r):(t,e)=>{for(;Bn(e)&&4!=e.h;){var i=e.m;let n=r[i];const a=!n;let h=false;if(!n){var s=r.U;if(s){var o=s[i];o&&(h=s.O?.[i],(!d||h)&&(s=yr(o))&&(n=r[i]=s));}}n&&n(e,t,i)||(i=(s=e).l,Gn(s),s.ia?s=void 0:(o=s.g.g-i,s.g.g=i,s=Nn(s.g,o)),i=t,s&&(mt||=Symbol(),(o=i[mt])?o.push(s):i[mt]=[s])),a&&n&&!h&&Wr++<5&&j();}n===vr||n===Er||n.j||(t[yt||=Symbol()]=n);},t[gr]=e;}return e}function yr(t){const e=(t=dr(t))[0].g;if(t=t[1]){const n=mr(t),r=Ur(t).T;return (t,i,s)=>e(t,i,s,r,n)}return e}class _r{}let vr,Er;const wr=Symbol();function Tr(t,e,n){const r=n[1];let i;if(r){const n=r[wr];i=n?n.T:pe(r[0]),t[e]=n??r;}i&&i===fe?(t.g||(t.g=new Set)).add(e):n[0]&&(t.h||(t.h=new Set)).add(e);}function Ar(t,e){return [t.l,!e||e[0]>0?void 0:e]}function br(t){var e=t[wr];if(e)return e;if(!(e=Sr(t,t[wr]=new _r,Ar,Ar,Tr)).U&&!e.h&&!e.g){let n=true;for(let t in e)isNaN(t)||(n=false);n?(pe(t[0])===fe?Er?e=Er:((e=new _r).T=pe(true),e=Er=e):e=vr||=new _r,e=t[wr]=e):e.j=true;}return e}function kr(t,e,n){t[e]=n;}function Sr(t,e,n,r,i=kr){e.T=pe(t[0]);let s=0;var o=t[++s];o&&o.constructor===Object&&(e.U=o,"function"==typeof(o=t[++s])&&(e.l=o,e.m=t[++s],o=t[++s]));const a={};for(;Array.isArray(o)&&"number"==typeof o[0]&&o[0]>0;){for(var h=0;h<o.length;h++)a[o[h]]=o;o=t[++s];}for(h=1;void 0!==o;){let l;"number"==typeof o&&(h+=o,o=t[++s]);var c=void 0;if(o instanceof fr?l=o:(l=mi,s--),l.pa){o=t[++s],c=t;var u=s;"function"==typeof o&&(o=o(),c[u]=o),c=o;}for(u=h+1,"number"==typeof(o=t[++s])&&o<0&&(u-=o,o=t[++s]);h<u;h++){const t=a[h];i(e,h,c?r(l,c,t):n(l,t));}}return e}const xr=Symbol();function Lr(t){let e=t[xr];if(!e){const n=Ir(t);e=(t,e)=>Br(t,e,n),t[xr]=e;}return e}const Fr=Symbol();function Rr(t){return t.h}function Mr(t,e){let n,r;const i=t.h;return (t,s,o)=>i(t,s,o,r||=Ir(e).T,n||=Lr(e))}function Ir(t){let e=t[Fr];return e||(e=Sr(t,t[Fr]={},Rr,Mr),Nr(t),e)}const Pr=Symbol();function Or(t,e){const n=t.g;return e?(t,r,i)=>n(t,r,i,e):n}function Cr(t,e,n){const r=t.g;let i,s;return (t,o,a)=>r(t,o,a,s||=Ur(e).T,i||=mr(e),n)}function Ur(t){let e=t[Pr];return e||(br(t),e=Sr(t,t[Pr]={},Or,Cr),Nr(t),e)}function Nr(t){Pr in t&&wr in t&&Fr in t&&(t.length=0);}function Dr(t,e){var n=t[e];if(n)return n;if(n=t.U){var r=n[e];if(r){var i=(r=dr(r))[0].h;if(r=r[1],n=n.O?.[e],!d||n){if(r){const e=Lr(r),s=Ir(r).T;n=(n=t.m)?n(s,e):(t,n,r)=>i(t,n,r,s,e);}else n=i;return t[e]=n}}}}function Br(t,e,n){for(var r=et(t),i=+!!(512&r)-1,s=t.length,o=512&r?1:0,a=s+(256&r?-1:0);o<a;o++){const r=t[o];if(null==r)continue;const s=o-i,a=Dr(n,s);if(!a)continue;const h=n.U;h?.[s]&&!h?.O?.[s]&&Wr++<5&&j(),a(e,r,s);}if(256&r){r=t[s-1];for(let t in r)i=+t,!Number.isNaN(i)&&(null!=(s=r[t])&&(a=Dr(n,i)))&&((o=n.U)?.[i]&&!o?.O?.[i]&&Wr++<5&&j(),a(e,s,i));}if(t=mt?t[mt]:void 0)for(or(e,e.g.end()),n=0;n<t.length;n++)or(e,N(t[n])||new Uint8Array(0));}function Gr(t,e){return new fr(t,e,false,false)}function jr(t,e){return new fr(t,e,true,false)}function Vr(t,e){return new fr(t,e,false,true)}function Xr(t,e,n){Ve(t,et(t),e,n);}var Hr=Vr((function(t,e,n,r,i){return 2===t.h&&(t=jn(t,ge([void 0,void 0],r),i),pt$1(r=et(e)),(i=Ge(e,r,n))instanceof Ae?0!=(2&i.L)?((i=i.Z()).push(t),Ve(e,r,n,i)):i.Oa(t):Array.isArray(i)?(2&tt(i)&&Ve(e,r,n,i=qe(i)),i.push(t)):Ve(e,r,n,[t]),true)}),(function(t,e,n,r,i){if(e instanceof Ae)e.forEach(((e,s)=>{lr(t,n,ge([s,e],r),i);}));else if(Array.isArray(e))for(let s=0;s<e.length;s++){const o=e[s];Array.isArray(o)&&lr(t,n,ge(o,r),i);}}));let Wr=0;function zr(t,e,n){e=function(t){if(null==t)return t;const e=typeof t;if("bigint"===e)return String(BigInt.asIntN(64,t));if(Yt$1(t)){if("string"===e)return Qt(t);if("number"===e)return Zt(t)}}(e),null!=e&&("string"==typeof e&&Qn(e),null!=e&&(ar(t,n,0),"number"==typeof e?(t=t.g,St$1(e),nr(t,At$1,bt)):(n=Qn(e),nr(t.g,n.h,n.g))));}function Kr(t,e,n){null!=(e=$t(e))&&null!=e&&(ar(t,n,0),ir(t.g,e));}function Yr(t,e,n){null!=(e=zt(e))&&(ar(t,n,0),t.g.g.push(e?1:0));}function $r(t,e,n){null!=(e=ie(e))&&ur(t,n,c(e));}function qr(t,e,n,r,i){lr(t,n,e instanceof Yn?e.u:Array.isArray(e)?ge(e,r):void 0,i);}function Jr(t,e,n){null!=(e=null==e||"string"==typeof e||I(e)||e instanceof D?e:void 0)&&ur(t,n,Sn(e).buffer);}function Zr(t,e,n){return (5===t.h||2===t.h)&&(e=Xe(e,et(e),n,2,false),2==t.h?Hn(t,In,e):e.push(In(t.g)),true)}var Qr,ti=Gr((function(t,e,n){if(1!==t.h)return  false;var r=t.g;t=Mn(r);const i=Mn(r);r=2*(i>>31)+1;const s=i>>>20&2047;return t=4294967296*(1048575&i)+t,Xr(e,n,2047==s?t?NaN:r*(1/0):0==s?r*Math.pow(2,-1074)*t:r*Math.pow(2,s-1075)*(t+4503599627370496)),true}),(function(t,e,n){null!=(e=Wt$1(e))&&(ar(t,n,1),t=t.g,(n=Tt||=new DataView(new ArrayBuffer(8))).setFloat64(0,+e,true),At$1=n.getUint32(0,true),bt=n.getUint32(4,true),sr(t,At$1),sr(t,bt));})),ei=Gr((function(t,e,n){return 5===t.h&&(Xr(e,n,In(t.g)),true)}),(function(t,e,n){null!=(e=Wt$1(e))&&(ar(t,n,5),t=t.g,xt$1(e),sr(t,At$1));})),ni=jr(Zr,(function(t,e,n){if(null!=(e=pr(Wt$1,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&(ar(r,i,5),r=r.g,xt$1(s),sr(r,At$1));}})),ri=jr(Zr,(function(t,e,n){if(null!=(e=pr(Wt$1,e))&&e.length){ar(t,n,2),rr(t.g,4*e.length);for(let r=0;r<e.length;r++)n=t.g,xt$1(e[r]),sr(n,At$1);}})),ii=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,xn(t.g,Ft$1)),true)}),zr),si=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,0===(t=xn(t.g,Ft$1))?void 0:t),true)}),zr),oi=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,xn(t.g,Lt$1)),true)}),(function(t,e,n){null!=(e=ee(e))&&("string"==typeof e&&qn(e),null!=e&&(ar(t,n,0),"number"==typeof e?(t=t.g,St$1(e),nr(t,At$1,bt)):(n=qn(e),nr(t.g,n.h,n.g))));})),ai=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,Fn(t.g)),true)}),Kr),hi=jr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Xe(e,et(e),n,2,false),2==t.h?Hn(t,Fn,e):e.push(Fn(t.g)),true)}),(function(t,e,n){if(null!=(e=pr($t,e))&&e.length){n=hr(t,n);for(let n=0;n<e.length;n++)ir(t.g,e[n]);cr(t,n);}})),ci=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,0===(t=Fn(t.g))?void 0:t),true)}),Kr),ui=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,Ln(t.g)),true)}),Yr),li=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,false===(t=Ln(t.g))?void 0:t),true)}),Yr),fi=jr((function(t,e,n){return 2===t.h&&(Ze(e,n,Qe,t=Vn(t)),true)}),(function(t,e,n){if(null!=(e=pr(ie,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&ur(r,i,c(s));}})),di=Gr((function(t,e,n){return 2===t.h&&(Xr(e,n,""===(t=Vn(t))?void 0:t),true)}),$r),pi=Gr((function(t,e,n){return 2===t.h&&(Xr(e,n,Vn(t)),true)}),$r),gi=Vr((function(t,e,n,r,i){return 2===t.h&&(jn(t,sn(e,r,n,true),i),true)}),qr),mi=Vr((function(t,e,n,r,i){return 2===t.h&&(jn(t,sn(e,r,n),i),true)}),qr);Qr=new fr((function(t,e,n,r,i){if(2!==t.h)return  false;r=ge(void 0,r);let s=et(e);pt$1(s);let o=Xe(e,s,n,3);return s=et(e),4&tt(o)&&(o=H(o),nt(o,-2079&(1|tt(o))),Ve(e,s,n,o)),o.push(r),jn(t,r,i),true}),(function(t,e,n,r,i){if(Array.isArray(e))for(let s=0;s<e.length;s++)qr(t,e[s],n,r,i);}),true,true);var yi=Vr((function(t,e,n,r,i,s){return 2===t.h&&(nn(e,et(e),s,n),jn(t,e=sn(e,r,n),i),true)}),qr),_i=Gr((function(t,e,n){return 2===t.h&&(Xr(e,n,Xn(t)),true)}),Jr),vi=jr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Xe(e,et(e),n,2,false),2==t.h?Hn(t,Rn,e):e.push(Rn(t.g)),true)}),(function(t,e,n){if(null!=(e=pr(qt,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&(ar(r,i,0),rr(r.g,s));}})),Ei=Gr((function(t,e,n){return 0===t.h&&(Xr(e,n,Fn(t.g)),true)}),(function(t,e,n){null!=(e=$t(e))&&(e=parseInt(e,10),ar(t,n,0),ir(t.g,e));}));class wi{constructor(t,e){this.h=t,this.g=e,this.l=an,this.m=un,this.defaultValue=void 0;}}function Ti(t,e){return new wi(t,e)}function Ai(t,e){return (n,r)=>{if(Wn.length){const t=Wn.pop();t.o(r),On(t.g,n,r),n=t;}else n=new class{constructor(t,e){if(Dn.length){const n=Dn.pop();On(n,t,e),t=n;}else t=new class{constructor(t,e){this.h=null,this.m=false,this.g=this.l=this.j=0,On(this,t,e);}clear(){this.h=null,this.m=false,this.g=this.l=this.j=0,this.da=false;}}(t,e);this.g=t,this.l=this.g.g,this.h=this.m=-1,this.o(e);}o({ia:t=false}={}){this.ia=t;}}(n,r);try{const r=new t,s=r.u;mr(e)(s,n);var i=r;}finally{n.g.clear(),n.m=-1,n.h=-1,Wn.length<100&&Wn.push(n);}return i}}function bi(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[];}length(){return this.g.length}end(){const t=this.g;return this.g=[],t}};}};Br(this.u,e,Ir(t)),or(e,e.g.end());const n=new Uint8Array(e.h),r=e.l,i=r.length;let s=0;for(let t=0;t<i;t++){const e=r[t];n.set(e,s),s+=e.length;}return e.l=[n],n}}var ki=class extends Yn{constructor(t){super(t);}},Si=[0,di,Gr((function(t,e,n){return 2===t.h&&(Xr(e,n,(t=Xn(t))===U()?void 0:t),true)}),(function(t,e,n){if(null!=e){if(e instanceof Yn){const r=e.Ra;return void(r&&(e=r(e),null!=e&&ur(t,n,Sn(e).buffer)))}if(Array.isArray(e))return}Jr(t,e,n);}))],xi=[0,ai,Ei,ui,-1,hi,Ei,-1],Li=class extends Yn{constructor(){super();}},Fi=[0,ui,pi,ui,Ei,-1,jr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Xe(e,et(e),n,2,false),2==t.h?Hn(t,Pn,e):e.push(Fn(t.g)),true)}),(function(t,e,n){if(null!=(e=pr($t,e))&&e.length){n=hr(t,n);for(let n=0;n<e.length;n++)ir(t.g,e[n]);cr(t,n);}})),pi,-1,[0,ui,-1],Ei,ui],Ri=[0,pi,-2],Mi=class extends Yn{constructor(){super();}},Ii=[0],Pi=[0,ai,ui,1,ui,-3],Oi=[0,pi,ui,-1,ai,[0,[1,2,3,4,5,6],yi,Ii,yi,Fi,yi,Ri,yi,Pi,yi,xi,yi,[0,pi,-2]],[0,pi],ui,[0,[1,3],[2,4],yi,[0,hi],-1,yi,[0,fi],-1,Qr,[0,pi,-1]],pi],Ci=class extends Yn{constructor(t){super(t,2);}},Ui={},Ni=Ui.O={};Ui[336783863]=Oi,Ni[336783863]=1;var Di=[0,si,-1,li,-3,si,hi,di,ci,si,-1,li,ci,li,-2,di];function Bi(t,e){Je(t,2,re(e),"");}function Gi(t,e){Ze(t.u,3,ne,e);}function ji(t,e){Ze(t.u,4,ne,e);}var Vi=class extends Yn{constructor(t){super(t,500);}o(t){return un(this,0,7,t)}},Xi=[-1,{O:{}}],Hi=[0,pi,1,Xi],Wi=[0,pi,fi,Xi];function zi(t,e){pn(t,1,Vi,e);}function Ki(t,e){Ze(t.u,10,ne,e);}function Yi(t,e){Ze(t.u,15,ne,e);}var $i=class extends Yn{constructor(t){super(t,500);}o(t){return un(this,0,1001,t)}},qi=[-500,Qr,[-500,di,-1,fi,-3,[-2,Ui,ui],Qr,Si,ci,-1,Hi,Wi,Qr,[0,di,li],di,Di,ci,fi,987,fi],4,Qr,[-500,pi,-1,[-1,{O:{}}],998,pi],Qr,[-500,pi,fi,-1,[-2,{O:{}},ui],997,fi,-1],ci,Qr,[-500,pi,fi,Xi,998,fi],fi,ci,Hi,Wi,Qr,[0,di,-1,Xi],fi,-2,Di,di,-1,li,979,Xi,Qr,Si];$i.prototype.g=bi(qi);var Ji=Ai($i,qi),Zi=class extends Yn{constructor(t){super(t);}},Qi=class extends Yn{constructor(t){super(t);}g(){return cn(this,Zi,1)}},ts=[0,Qr,[0,ai,ei,pi,-1]],es=Ai(Qi,ts),ns=class extends Yn{constructor(t){super(t);}},rs=class extends Yn{constructor(t){super(t);}},is=class extends Yn{constructor(t){super(t);}h(){return an(this,ns,2)}g(){return cn(this,rs,5)}},ss=Ai(class extends Yn{constructor(t){super(t);}},[0,fi,hi,ri,[0,Ei,[0,ai,-3],[0,ei,-3],[0,ai,-1,[0,Qr,[0,ai,-2]]],Qr,[0,ei,-1,pi,ei]],pi,-1,ii,Qr,[0,ai,ei],fi,ii]),os=class extends Yn{constructor(t){super(t);}},as=Ai(class extends Yn{constructor(t){super(t);}},[0,Qr,[0,ei,-4]]),hs=class extends Yn{constructor(t){super(t);}},cs=Ai(class extends Yn{constructor(t){super(t);}},[0,Qr,[0,ei,-4]]),us=class extends Yn{constructor(t){super(t);}},ls=[0,ai,-1,ri,Ei],fs=class extends Yn{constructor(){super();}};fs.prototype.g=bi([0,ei,-4,ii]);var ds=class extends Yn{constructor(t){super(t);}},ps=Ai(class extends Yn{constructor(t){super(t);}},[0,Qr,[0,1,ai,pi,ts],ii]),gs=class extends Yn{constructor(t){super(t);}},ms=class extends Yn{constructor(t){super(t);}qa(){const t=We(this);return null==t?U():t}},ys=class extends Yn{constructor(t){super(t);}},_s=[1,2],vs=Ai(class extends Yn{constructor(t){super(t);}},[0,Qr,[0,_s,yi,[0,ri],yi,[0,_i],ai,pi],ii]),Es=class extends Yn{constructor(t){super(t);}},ws=[0,pi,ai,ei,fi,-1],Ts=class extends Yn{constructor(t){super(t);}},As=[0,ui,-1],bs=class extends Yn{constructor(t){super(t);}},ks=[1,2,3,4,5],Ss=class extends Yn{constructor(t){super(t);}g(){return null!=We(this)}h(){return null!=ie(De(this,2))}},xs=class extends Yn{constructor(t){super(t);}g(){return zt(De(this,2))??false}},Ls=[0,_i,pi,[0,ai,ii,-1],[0,oi,ii]],Fs=[0,Ls,ui,[0,ks,yi,Pi,yi,Fi,yi,xi,yi,Ii,yi,Ri],Ei],Rs=class extends Yn{constructor(t){super(t);}},Ms=[0,Fs,ei,-1,ai],Is=Ti(502141897,Rs);Ui[502141897]=Ms,Ni[502141897]=1;var Ps=[0,Ls];Ui[512499200]=Ps;var Os=[0,Ps];Ui[515723506]=Os;var Cs=Ai(class extends Yn{constructor(t){super(t);}},[0,[0,Ei,-1,ni,vi],ls]),Us=[0,Fs];Ui[508981768]=Us;var Ns=class extends Yn{constructor(t){super(t);}},Ds=class extends Yn{constructor(t){super(t);}},Bs=[0,Fs,ei,Us,ui],Gs=[0,Fs,Ms,Bs,ei,Os];Ui[508968149]=Bs;var js=Ti(508968150,Ds);Ui[508968150]=Gs,Ni[508968150]=1,Ni[508968149]=1;var Vs=class extends Yn{constructor(t){super(t);}},Xs=Ti(513916220,Vs);Ui[513916220]=[0,Fs,Gs,ai],Ni[513916220]=1;var Hs=class extends Yn{constructor(t){super(t);}h(){return an(this,Es,2)}g(){je(this,2);}},Ws=[0,Fs,ws];Ui[478825465]=Ws,Ni[478825465]=1;var zs=[0,Fs];Ui[478825422]=zs;var Ks=class extends Yn{constructor(t){super(t);}},Ys=class extends Yn{constructor(t){super(t);}},$s=class extends Yn{constructor(t){super(t);}},qs=class extends Yn{constructor(t){super(t);}},Js=class extends Yn{constructor(t){super(t);}},Zs=[0,Fs,zs,Ws,-1],Qs=[0,Fs,ei,ai],to=[0,Fs,ei],eo=[0,Fs,Qs,to,ei],no=[0,Fs,eo,Zs];Ui[463370452]=Zs,Ui[464864288]=Qs,Ui[474472470]=to;var ro=Ti(462713202,qs);Ui[462713202]=eo;var io=Ti(479097054,Js);Ui[479097054]=no,Ni[479097054]=1,Ni[463370452]=1,Ni[464864288]=1,Ni[462713202]=1,Ni[474472470]=1;var so=class extends Yn{constructor(t){super(t);}},oo=class extends Yn{constructor(t){super(t);}},ao=class extends Yn{constructor(t){super(t);}},ho=class extends Yn{constructor(){super();}},co=[0,Fs,ei,-1,ai],uo=[0,Fs,ei,ui];ho.prototype.g=bi([0,Fs,to,[0,Fs],Ms,Bs,co,uo]),Ui[514774813]=co,Ui[518928384]=uo;var lo=class extends Yn{constructor(t){super(t);}},fo=Ti(456383383,lo);Ui[456383383]=[0,Fs,ws],Ni[456383383]=1;var po=class extends Yn{constructor(t){super(t);}},go=Ti(476348187,po);Ui[476348187]=[0,Fs,As],Ni[476348187]=1;var mo$1=class mo extends Yn{constructor(t){super(t);}},yo=class extends Yn{constructor(t){super(t);}},_o=[0,Ei,-1],vo=Ti(458105876,class extends Yn{constructor(t){super(t);}g(){var t=this.u;const e=et(t);const n=2&e;return t=function(t,e,n){var r=yo;const i=2&e;let s=false;if(null==n){if(i)return Le();n=[];}else if(n.constructor===Ae){if(0==(2&n.L)||i)return n;n=n.Z();}else Array.isArray(n)?s=!!(2&tt(n)):n=[];if(i){if(!n.length)return Le();s||(s=true,rt(n));}else s&&(s=false,n=qe(n));return s||(64&tt(n)?Q(n,32):32&e&&Z(n,32)),Ve(t,e,2,r=new Ae(n,r,oe,void 0),false),r}(t,e,Ge(t,e,2)),!n&&yo&&(t.ta=true),t}});Ui[458105876]=[0,_o,Hr,[true,ii,[0,pi,-1,fi]]],Ni[458105876]=1;var Eo=class extends Yn{constructor(t){super(t);}},wo=Ti(458105758,Eo);Ui[458105758]=[0,Fs,pi,_o],Ni[458105758]=1;var To=class extends Yn{constructor(t){super(t);}},Ao=Ti(443442058,To);Ui[443442058]=[0,Fs,pi,ai,ei,fi,-1],Ni[443442058]=1,Ni[514774813]=1;var bo=class extends Yn{constructor(t){super(t);}},ko=Ti(516587230,bo);function So(t,e){return e=e?e.clone():new Es,void 0!==t.displayNamesLocale?je(e,1,re(t.displayNamesLocale)):void 0===t.displayNamesLocale&&je(e,1),void 0!==t.maxResults?En(e,2,t.maxResults):"maxResults"in t&&je(e,2),void 0!==t.scoreThreshold?wn(e,3,t.scoreThreshold):"scoreThreshold"in t&&je(e,3),void 0!==t.categoryAllowlist?Tn(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&je(e,4),void 0!==t.categoryDenylist?Tn(e,5,t.categoryDenylist):"categoryDenylist"in t&&je(e,5),e}function xo(t,e=-1,n=""){return {categories:t.map((t=>({index:gn(mn(t,1),0)??-1,score:yn(t,2)??0,categoryName:_n(t,3)??"",displayName:_n(t,4)??""}))),headIndex:e,headName:n}}function Lo(t){var e=ze(t,3,Wt$1),n=ze(t,2,$t),r=ze(t,1,ie),i=ze(t,9,ie);const s={categories:[],keypoints:[]};for(let t=0;t<e.length;t++)s.categories.push({score:e[t],index:n[t]??-1,categoryName:r[t]??"",displayName:i[t]??""});if((e=an(t,is,4)?.h())&&(s.boundingBox={originX:mn(e,1)??0,originY:mn(e,2)??0,width:mn(e,3)??0,height:mn(e,4)??0,angle:0}),an(t,is,4)?.g().length)for(const e of an(t,is,4).g())s.keypoints.push({x:He(e,1)??0,y:He(e,2)??0,score:He(e,4)??0,label:ie(De(e,3))??""});return s}function Fo(t){const e=[];for(const n of cn(t,hs,1))e.push({x:yn(n,1)??0,y:yn(n,2)??0,z:yn(n,3)??0,visibility:yn(n,4)??0});return e}function Ro(t){const e=[];for(const n of cn(t,os,1))e.push({x:yn(n,1)??0,y:yn(n,2)??0,z:yn(n,3)??0,visibility:yn(n,4)??0});return e}function Mo(t){return Array.from(t,(t=>t>127?t-256:t))}function Io(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,r=0,i=0;for(let s=0;s<t.length;s++)n+=t[s]*e[s],r+=t[s]*t[s],i+=e[s]*e[s];if(r<=0||i<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(r*i)}let Po;Ui[516587230]=[0,Fs,co,uo,ei],Ni[516587230]=1,Ni[518928384]=1;const Oo=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Co(){if(void 0===Po)try{await WebAssembly.instantiate(Oo),Po=!0;}catch{Po=false;}return Po}async function Uo(t,e=""){const n=await Co()?"wasm_internal":"wasm_nosimd_internal";return {wasmLoaderPath:`${e}/${t}_${n}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var No=class{};function Do(){var t=navigator;return "undefined"!=typeof OffscreenCanvas&&(!function(t=navigator){return (t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Bo(t){if("function"!=typeof importScripts){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise(((t,n)=>{e.addEventListener("load",(()=>{t();}),false),e.addEventListener("error",(t=>{n(t);}),false),document.body.appendChild(e);}))}importScripts(t.toString());}function Go(t){return void 0!==t.videoWidth?[t.videoWidth,t.videoHeight]:void 0!==t.naturalWidth?[t.naturalWidth,t.naturalHeight]:void 0!==t.displayWidth?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function jo(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e);}function Vo(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,true),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,false);const[r,i]=Go(e);return !t.l||r===t.i.canvas.width&&i===t.i.canvas.height||(t.i.canvas.width=r,t.i.canvas.height=i),[r,i]}function Xo(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const r=new Uint32Array(e.length);for(let n=0;n<e.length;n++)r[n]=t.i.stringToNewUTF8(e[n]);e=t.i._malloc(4*r.length),t.i.HEAPU32.set(r,e>>2),n(e);for(const e of r)t.i._free(e);t.i._free(e);}function Ho(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n;}function Wo(t,e,n){let r=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(t,e,i)=>{e?(n(r,i),r=[]):r.push(t);};}No.forVisionTasks=function(t){return Uo("vision",t)},No.forTextTasks=function(t){return Uo("text",t)},No.forGenAiExperimentalTasks=function(t){return Uo("genai_experimental",t)},No.forGenAiTasks=function(t){return Uo("genai",t)},No.forAudioTasks=function(t){return Uo("audio",t)},No.isSimdSupported=function(){return Co()};async function zo(t,e,n,r){return t=await(async(t,e,n,r,i)=>{if(e&&await Bo(e),!self.ModuleFactory)throw Error("ModuleFactory not set.");if(n&&(await Bo(n),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&i&&((e=self.Module).locateFile=i.locateFile,i.mainScriptUrlOrBlob&&(e.mainScriptUrlOrBlob=i.mainScriptUrlOrBlob)),i=await self.ModuleFactory(self.Module||i),self.ModuleFactory=self.Module=void 0,new t(i,r)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:t=>t.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&t.endsWith(".data")?n.assetBinaryPath.toString():t}),await t.o(r),t}function Ko(t,e){const n=an(t.baseOptions,Ss,1)||new Ss;"string"==typeof e?(je(n,2,re(e)),je(n,1)):e instanceof Uint8Array&&(je(n,1,lt$1(e,false,false)),je(n,2)),un(t.baseOptions,0,1,n);}function Yo(t){try{const e=t.G.length;if(1===e)throw Error(t.G[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.G.map((t=>t.message)).join(", "))}finally{t.G=[];}}function $o(t,e){t.B=Math.max(t.B,e);}function qo(t,e){t.A=new Vi,Bi(t.A,"PassThroughCalculator"),Gi(t.A,"free_memory"),ji(t.A,"free_memory_unused_out"),Ki(e,"free_memory"),zi(e,t.A);}function Jo(t,e){Gi(t.A,e),ji(t.A,e+"_unused_out");}function Zo(t){t.g.addBoolToStream(true,"free_memory",t.B);}var Qo=class{constructor(t){this.g=t,this.G=[],this.B=0,this.g.setAutoRenderToScreen(false);}l(t,e=true){if(e){const e=t.baseOptions||{};if(t.baseOptions?.modelAssetBuffer&&t.baseOptions?.modelAssetPath)throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!(an(this.baseOptions,Ss,1)?.g()||an(this.baseOptions,Ss,1)?.h()||t.baseOptions?.modelAssetBuffer||t.baseOptions?.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(t,e){let n=an(t.baseOptions,bs,3);if(!n){var r=n=new bs,i=new Mi;ln(r,4,ks,i);}"delegate"in e&&("GPU"===e.delegate?(e=n,r=new Li,ln(e,2,ks,r)):(e=n,r=new Mi,ln(e,4,ks,r))),un(t.baseOptions,0,3,n);}(this,e),e.modelAssetPath)return fetch(e.modelAssetPath.toString()).then((t=>{if(t.ok)return t.arrayBuffer();throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`)})).then((t=>{try{this.g.i.FS_unlink("/model.dat");}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(t),true,false,false),Ko(this,"/model.dat"),this.m(),this.I();}));if(e.modelAssetBuffer instanceof Uint8Array)Ko(this,e.modelAssetBuffer);else if(e.modelAssetBuffer)return async function(t){const e=[];for(var n=0;;){const{done:r,value:i}=await t.read();if(r)break;e.push(i),n+=i.length;}if(0===e.length)return new Uint8Array(0);if(1===e.length)return e[0];t=new Uint8Array(n),n=0;for(const r of e)t.set(r,n),n+=r.length;return t}(e.modelAssetBuffer).then((t=>{Ko(this,t),this.m(),this.I();}))}return this.m(),this.I(),Promise.resolve()}I(){}fa(){let t;if(this.g.fa((e=>{t=Ji(e);})),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener(((t,e)=>{this.G.push(Error(e));})),this.g.Ma(),this.g.setGraph(t,e),this.A=void 0,Yo(this);}finishProcessing(){this.g.finishProcessing(),Yo(this);}close(){this.A=void 0,this.g.closeGraph();}};function ta(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}Qo.prototype.close=Qo.prototype.close,function(e,n){e=e.split(".");var r,i=t$2;e[0]in i||void 0===i.execScript||i.execScript("var "+e[0]);for(;e.length&&(r=e.shift());)e.length||void 0===n?i=i[r]&&i[r]!==Object.prototype[r]?i[r]:i[r]={}:i[r]=n;}("TaskRunner",Qo);class ea{constructor(t,e,n,r){this.g=t,this.h=e,this.m=n,this.l=r;}bind(){this.g.bindVertexArray(this.h);}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l);}}function na(t,e,n){const r=t.g;if(n=ta(r.createShader(n),"Failed to create WebGL shader"),r.shaderSource(n,e),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);return r.attachShader(t.h,n),n}function ra(t,e){const n=t.g,r=ta(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(r);const i=ta(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,i),n.enableVertexAttribArray(t.P),n.vertexAttribPointer(t.P,2,n.FLOAT,false,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=ta(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.I),n.vertexAttribPointer(t.I,2,n.FLOAT,false,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new ea(n,r,i,s)}function ia(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e;}function sa(t,e,n,r){return ia(t,e),t.h||(t.m(),t.C()),n?(t.s||(t.s=ra(t,true)),n=t.s):(t.v||(t.v=ra(t,false)),n=t.v),e.useProgram(t.h),n.bind(),t.l(),t=r(),n.g.bindVertexArray(null),t}function oa(t,e,n){return ia(t,e),t=ta(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function aa(t,e,n){ia(t,e),t.A||(t.A=ta(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.A),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);}function ha(t){t.g?.bindFramebuffer(t.g.FRAMEBUFFER,null);}var ca=class{G(){return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n "}m(){const t=this.g;if(this.h=ta(t.createProgram(),"Failed to create WebGL program"),this.ca=na(this,"\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }",t.VERTEX_SHADER),this.ba=na(this,this.G(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.P=t.getAttribLocation(this.h,"aVertex"),this.I=t.getAttribLocation(this.h,"aTex");}C(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.ca),t.deleteShader(this.ba);}this.A&&this.g.deleteFramebuffer(this.A),this.v&&this.v.close(),this.s&&this.s.close();}};var ua$1=class ua extends ca{G(){return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n "}C(){const t=this.g;t.activeTexture(t.TEXTURE1),this.B=oa(this,t,t.LINEAR),t.activeTexture(t.TEXTURE2),this.j=oa(this,t,t.NEAREST);}m(){super.m();const t=this.g;this.K=ta(t.getUniformLocation(this.h,"backgroundTexture"),"Uniform location"),this.W=ta(t.getUniformLocation(this.h,"colorMappingTexture"),"Uniform location"),this.J=ta(t.getUniformLocation(this.h,"maskTexture"),"Uniform location");}l(){super.l();const t=this.g;t.uniform1i(this.J,0),t.uniform1i(this.K,1),t.uniform1i(this.W,2);}close(){this.B&&this.g.deleteTexture(this.B),this.j&&this.g.deleteTexture(this.j),super.close();}},la=class extends ca{G(){return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n "}C(){const t=this.g;t.activeTexture(t.TEXTURE1),this.j=oa(this,t),t.activeTexture(t.TEXTURE2),this.B=oa(this,t);}m(){super.m();const t=this.g;this.J=ta(t.getUniformLocation(this.h,"defaultTexture"),"Uniform location"),this.K=ta(t.getUniformLocation(this.h,"overlayTexture"),"Uniform location"),this.H=ta(t.getUniformLocation(this.h,"maskTexture"),"Uniform location");}l(){super.l();const t=this.g;t.uniform1i(this.H,0),t.uniform1i(this.J,1),t.uniform1i(this.K,2);}close(){this.j&&this.g.deleteTexture(this.j),this.B&&this.g.deleteTexture(this.B),super.close();}};function fa(t,e){switch(e){case 0:return t.g.find((t=>t instanceof Uint8Array));case 1:return t.g.find((t=>t instanceof Float32Array));case 2:return t.g.find((t=>"undefined"!=typeof WebGLTexture&&t instanceof WebGLTexture));default:throw Error(`Type is not supported: ${e}`)}}function da(t){var e=fa(t,1);if(!e){if(e=fa(t,0))e=new Float32Array(e).map((t=>t/255));else {e=new Float32Array(t.width*t.height);const r=ga$1(t);var n=ya(t);if(aa(n,r,pa(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),r.readPixels(0,0,t.width,t.height,r.RGBA,r.FLOAT,n);for(let t=0,r=0;t<e.length;++t,r+=4)e[t]=n[r];}else r.readPixels(0,0,t.width,t.height,r.RED,r.FLOAT,e);}t.g.push(e);}return e}function pa(t){let e=fa(t,2);if(!e){const n=ga$1(t);e=_a(t);const r=da(t),i=ma$1(t);n.texImage2D(n.TEXTURE_2D,0,i,t.width,t.height,0,n.RED,n.FLOAT,r),va(t);}return e}function ga$1(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=ta(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function ma$1(t){if(t=ga$1(t),!Ea)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))Ea=t.R32F;else {if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Ea=t.R16F;}return Ea}function ya(t){return t.l||(t.l=new ca),t.l}function _a(t){const e=ga$1(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=fa(t,2);return n||(n=oa(ya(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=true),e.bindTexture(e.TEXTURE_2D,n),n}function va(t){t.h.bindTexture(t.h.TEXTURE_2D,null);}var Ea,wa$1=class wa{constructor(t,e,n,r,i,s,o){this.g=t,this.m=e,this.j=n,this.canvas=r,this.l=i,this.width=s,this.height=o,this.j&&(0===--Ta&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));}Ha(){return !!fa(this,0)}la(){return !!fa(this,1)}R(){return !!fa(this,2)}ka(){return (e=fa(t=this,0))||(e=da(t),e=new Uint8Array(e.map((t=>255*t))),t.g.push(e)),e;var t,e;}ja(){return da(this)}M(){return pa(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else {if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const t=ga$1(this),e=ya(this);t.activeTexture(t.TEXTURE1),n=oa(e,t,this.m?t.LINEAR:t.NEAREST),t.bindTexture(t.TEXTURE_2D,n);const r=ma$1(this);t.texImage2D(t.TEXTURE_2D,0,r,this.width,this.height,0,t.RED,t.FLOAT,null),t.bindTexture(t.TEXTURE_2D,null),aa(e,t,n),sa(e,t,false,(()=>{_a(this),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),va(this);})),ha(e),va(this);}}t.push(n);}return new wa$1(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&ga$1(this).deleteTexture(fa(this,2)),Ta=-1;}};wa$1.prototype.close=wa$1.prototype.close,wa$1.prototype.clone=wa$1.prototype.clone,wa$1.prototype.getAsWebGLTexture=wa$1.prototype.M,wa$1.prototype.getAsFloat32Array=wa$1.prototype.ja,wa$1.prototype.getAsUint8Array=wa$1.prototype.ka,wa$1.prototype.hasWebGLTexture=wa$1.prototype.R,wa$1.prototype.hasFloat32Array=wa$1.prototype.la,wa$1.prototype.hasUint8Array=wa$1.prototype.Ha;var Ta=250;const Aa={color:"white",lineWidth:4,radius:6};function ba(t){return {...Aa,fillColor:(t=t||{}).color,...t}}function ka(t,e){return t instanceof Function?t(e):t}function Sa(t,e,n){return Math.max(Math.min(e,n),Math.min(Math.max(e,n),t))}function xa(t){if(!t.l)throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");return t.l}function La(t){if(!t.j)throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");return t.j}function Fa(t,e,n){if(e.R())n(e.M());else {const r=e.la()?e.ja():e.ka();t.m=t.m??new ca;const i=La(t);n((t=new wa$1([r],e.m,false,i.canvas,t.m,e.width,e.height)).M()),t.close();}}function Ra(t,e,n,r){const i=function(t){return t.g||(t.g=new ua$1),t.g}(t),s=La(t),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n;sa(i,s,true,(()=>{!function(t,e,n,r){const i=t.g;if(i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,e),i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,t.B),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n),t.H&&function(t,e){if(t!==e)return  false;t=t.entries(),e=e.entries();for(const[r,i]of t){t=r;const s=i;var n=e.next();if(n.done)return  false;const[o,a]=n.value;if(n=a,t!==o||s[0]!==n[0]||s[1]!==n[1]||s[2]!==n[2]||s[3]!==n[3])return  false}return !!e.next().done}(t.H,r))i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,t.j);else {t.H=r;const e=Array(1024).fill(0);r.forEach(((t,n)=>{if(4!==t.length)throw Error(`Color at index ${n} is not a four-channel value.`);e[4*n]=t[0],e[4*n+1]=t[1],e[4*n+2]=t[2],e[4*n+3]=t[3];})),i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,t.j),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,256,1,0,i.RGBA,i.UNSIGNED_BYTE,new Uint8Array(e));}}(i,e,o,r),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_FAN,0,4);const t=i.g;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null);}));}function Ma(t,e,n,r){const i=La(t),s=function(t){return t.h||(t.h=new la),t.h}(t),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n,a=Array.isArray(r)?new ImageData(new Uint8ClampedArray(r),1,1):r;sa(s,i,true,(()=>{var t=s.g;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s.j),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,s.B),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,a),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),i.bindTexture(i.TEXTURE_2D,null),(t=s.g).activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null);}));}var Ia$1=class Ia{constructor(t,e){t instanceof CanvasRenderingContext2D||t instanceof OffscreenCanvasRenderingContext2D?(this.l=t,this.j=e):this.j=t;}Aa(t,e){if(t){var n=xa(this);e=ba(e),n.save();var r=n.canvas,i=0;for(const s of t)n.fillStyle=ka(e.fillColor,{index:i,from:s}),n.strokeStyle=ka(e.color,{index:i,from:s}),n.lineWidth=ka(e.lineWidth,{index:i,from:s}),(t=new Path2D).arc(s.x*r.width,s.y*r.height,ka(e.radius,{index:i,from:s}),0,2*Math.PI),n.fill(t),n.stroke(t),++i;n.restore();}}za(t,e,n){if(t&&e){var r=xa(this);n=ba(n),r.save();var i=r.canvas,s=0;for(const o of e){r.beginPath(),e=t[o.start];const a=t[o.end];e&&a&&(r.strokeStyle=ka(n.color,{index:s,from:e,to:a}),r.lineWidth=ka(n.lineWidth,{index:s,from:e,to:a}),r.moveTo(e.x*i.width,e.y*i.height),r.lineTo(a.x*i.width,a.y*i.height)),++s,r.stroke();}r.restore();}}wa(t,e){const n=xa(this);e=ba(e),n.save(),n.beginPath(),n.lineWidth=ka(e.lineWidth,{}),n.strokeStyle=ka(e.color,{}),n.fillStyle=ka(e.fillColor,{}),n.moveTo(t.originX,t.originY),n.lineTo(t.originX+t.width,t.originY),n.lineTo(t.originX+t.width,t.originY+t.height),n.lineTo(t.originX,t.originY+t.height),n.lineTo(t.originX,t.originY),n.stroke(),n.fill(),n.restore();}xa(t,e,n=[0,0,0,255]){this.l?function(t,e,n,r){const i=La(t);Fa(t,e,(e=>{Ra(t,e,n,r),(e=xa(t)).drawImage(i.canvas,0,0,e.canvas.width,e.canvas.height);}));}(this,t,n,e):Ra(this,t.M(),n,e);}ya(t,e,n){this.l?function(t,e,n,r){const i=La(t);Fa(t,e,(e=>{Ma(t,e,n,r),(e=xa(t)).drawImage(i.canvas,0,0,e.canvas.width,e.canvas.height);}));}(this,t,e,n):Ma(this,t.M(),e,n);}close(){this.g?.close(),this.g=void 0,this.h?.close(),this.h=void 0,this.m?.close(),this.m=void 0;}};function Pa(t,e){switch(e){case 0:return t.g.find((t=>t instanceof ImageData));case 1:return t.g.find((t=>"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap));case 2:return t.g.find((t=>"undefined"!=typeof WebGLTexture&&t instanceof WebGLTexture));default:throw Error(`Type is not supported: ${e}`)}}function Oa(t){var e=Pa(t,0);if(!e){e=Ua(t);const n=Na(t),r=new Uint8Array(t.width*t.height*4);aa(n,e,Ca(t)),e.readPixels(0,0,t.width,t.height,e.RGBA,e.UNSIGNED_BYTE,r),ha(n),e=new ImageData(new Uint8ClampedArray(r.buffer),t.width,t.height),t.g.push(e);}return e}function Ca(t){let e=Pa(t,2);if(!e){const n=Ua(t);e=Da(t);const r=Pa(t,1)||Oa(t);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r),Ba(t);}return e}function Ua(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");return t.h||(t.h=ta(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function Na(t){return t.l||(t.l=new ca),t.l}function Da(t){const e=Ua(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=Pa(t,2);return n||(n=oa(Na(t),e),t.g.push(n),t.m=true),e.bindTexture(e.TEXTURE_2D,n),n}function Ba(t){t.h.bindTexture(t.h.TEXTURE_2D,null);}function Ga(t){const e=Ua(t);return sa(Na(t),e,true,(()=>function(t,e){const n=t.canvas;if(n.width===t.width&&n.height===t.height)return e();const r=n.width,i=n.height;return n.width=t.width,n.height=t.height,t=e(),n.width=r,n.height=i,t}(t,(()=>{if(e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),!(t.canvas instanceof OffscreenCanvas))throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");return t.canvas.transferToImageBitmap()}))))}Ia$1.prototype.close=Ia$1.prototype.close,Ia$1.prototype.drawConfidenceMask=Ia$1.prototype.ya,Ia$1.prototype.drawCategoryMask=Ia$1.prototype.xa,Ia$1.prototype.drawBoundingBox=Ia$1.prototype.wa,Ia$1.prototype.drawConnectors=Ia$1.prototype.za,Ia$1.prototype.drawLandmarks=Ia$1.prototype.Aa,Ia$1.lerp=function(t,e,n,r,i){return Sa(r*(1-(t-e)/(n-e))+i*(1-(n-t)/(n-e)),r,i)},Ia$1.clamp=Sa;var ja=class{constructor(t,e,n,r,i,s,o){this.g=t,this.j=e,this.m=n,this.canvas=r,this.l=i,this.width=s,this.height=o,(this.j||this.m)&&(0===--Va&&console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));}Ga(){return !!Pa(this,0)}ma(){return !!Pa(this,1)}R(){return !!Pa(this,2)}Ea(){return Oa(this)}Da(){var t=Pa(this,1);return t||(Ca(this),Da(this),t=Ga(this),Ba(this),this.g.push(t),this.j=true),t}M(){return Ca(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof ImageData)n=new ImageData(e.data,this.width,this.height);else if(e instanceof WebGLTexture){const t=Ua(this),e=Na(this);t.activeTexture(t.TEXTURE1),n=oa(e,t),t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.width,this.height,0,t.RGBA,t.UNSIGNED_BYTE,null),t.bindTexture(t.TEXTURE_2D,null),aa(e,t,n),sa(e,t,false,(()=>{Da(this),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),Ba(this);})),ha(e),Ba(this);}else {if(!(e instanceof ImageBitmap))throw Error(`Type is not supported: ${e}`);Ca(this),Da(this),n=Ga(this),Ba(this);}t.push(n);}return new ja(t,this.ma(),this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Pa(this,1).close(),this.m&&Ua(this).deleteTexture(Pa(this,2)),Va=-1;}};ja.prototype.close=ja.prototype.close,ja.prototype.clone=ja.prototype.clone,ja.prototype.getAsWebGLTexture=ja.prototype.M,ja.prototype.getAsImageBitmap=ja.prototype.Da,ja.prototype.getAsImageData=ja.prototype.Ea,ja.prototype.hasWebGLTexture=ja.prototype.R,ja.prototype.hasImageBitmap=ja.prototype.ma,ja.prototype.hasImageData=ja.prototype.Ga;var Va=250;function Xa(...t){return t.map((([t,e])=>({start:t,end:e})))}const Ha=function(t){return class extends t{Ma(){this.i._registerModelResourcesGraphService();}}}((Wa=class{constructor(t,e){this.l=true,this.i=t,this.g=null,this.h=0,this.m="function"==typeof this.i._addIntToInputStream,void 0!==e?this.i.canvas=e:Do()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"));}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t);}setGraphFromString(t){this.setGraph((new TextEncoder).encode(t),false);}setGraph(t,e){const n=t.length,r=this.i._malloc(n);this.i.HEAPU8.set(t,r),e?this.i._changeBinaryGraph(n,r):this.i._changeTextGraph(n,r),this.i._free(r);}configureAudio(t,e,n,r,i){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),jo(this,r||"input_audio",(r=>{jo(this,i=i||"audio_header",(i=>{this.i._configureAudio(r,i,t,e,n);}));}));}setAutoResizeCanvas(t){this.l=t;}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t);}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t;}fa(t){Ho(this,"__graph_config__",(e=>{t(e);})),jo(this,"__graph_config__",(t=>{this.i._getGraphConfig(t,void 0);})),delete this.i.simpleListeners.__graph_config__;}attachErrorListener(t){this.i.errorListener=t;}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e;}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n);}addAudioToStreamWithShape(t,e,n,r,i){const s=4*t.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(t,this.g/4),jo(this,r,(t=>{this.i._addAudioToInputStream(this.g,e,n,t,i);}));}addGpuBufferToStream(t,e,n){jo(this,e,(e=>{const[r,i]=Vo(this,t,e);this.i._addBoundTextureToStream(e,r,i,n);}));}addBoolToStream(t,e,n){jo(this,e,(e=>{this.i._addBoolToInputStream(t,e,n);}));}addDoubleToStream(t,e,n){jo(this,e,(e=>{this.i._addDoubleToInputStream(t,e,n);}));}addFloatToStream(t,e,n){jo(this,e,(e=>{this.i._addFloatToInputStream(t,e,n);}));}addIntToStream(t,e,n){jo(this,e,(e=>{this.i._addIntToInputStream(t,e,n);}));}addUintToStream(t,e,n){jo(this,e,(e=>{this.i._addUintToInputStream(t,e,n);}));}addStringToStream(t,e,n){jo(this,e,(e=>{jo(this,t,(t=>{this.i._addStringToInputStream(t,e,n);}));}));}addStringRecordToStream(t,e,n){jo(this,e,(e=>{Xo(this,Object.keys(t),(r=>{Xo(this,Object.values(t),(i=>{this.i._addFlatHashMapToInputStream(r,i,Object.keys(t).length,e,n);}));}));}));}addProtoToStream(t,e,n,r){jo(this,n,(n=>{jo(this,e,(e=>{const i=this.i._malloc(t.length);this.i.HEAPU8.set(t,i),this.i._addProtoToInputStream(i,t.length,e,n,r),this.i._free(i);}));}));}addEmptyPacketToStream(t,e){jo(this,t,(t=>{this.i._addEmptyPacketToInputStream(t,e);}));}addBoolVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateBoolVector(t.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const e of t)this.i._addBoolVectorEntry(r,e);this.i._addBoolVectorToInputStream(r,e,n);}));}addDoubleVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateDoubleVector(t.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const e of t)this.i._addDoubleVectorEntry(r,e);this.i._addDoubleVectorToInputStream(r,e,n);}));}addFloatVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateFloatVector(t.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const e of t)this.i._addFloatVectorEntry(r,e);this.i._addFloatVectorToInputStream(r,e,n);}));}addIntVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateIntVector(t.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const e of t)this.i._addIntVectorEntry(r,e);this.i._addIntVectorToInputStream(r,e,n);}));}addUintVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateUintVector(t.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const e of t)this.i._addUintVectorEntry(r,e);this.i._addUintVectorToInputStream(r,e,n);}));}addStringVectorToStream(t,e,n){jo(this,e,(e=>{const r=this.i._allocateStringVector(t.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const e of t)jo(this,e,(t=>{this.i._addStringVectorEntry(r,t);}));this.i._addStringVectorToInputStream(r,e,n);}));}addBoolToInputSidePacket(t,e){jo(this,e,(e=>{this.i._addBoolToInputSidePacket(t,e);}));}addDoubleToInputSidePacket(t,e){jo(this,e,(e=>{this.i._addDoubleToInputSidePacket(t,e);}));}addFloatToInputSidePacket(t,e){jo(this,e,(e=>{this.i._addFloatToInputSidePacket(t,e);}));}addIntToInputSidePacket(t,e){jo(this,e,(e=>{this.i._addIntToInputSidePacket(t,e);}));}addUintToInputSidePacket(t,e){jo(this,e,(e=>{this.i._addUintToInputSidePacket(t,e);}));}addStringToInputSidePacket(t,e){jo(this,e,(e=>{jo(this,t,(t=>{this.i._addStringToInputSidePacket(t,e);}));}));}addProtoToInputSidePacket(t,e,n){jo(this,n,(n=>{jo(this,e,(e=>{const r=this.i._malloc(t.length);this.i.HEAPU8.set(t,r),this.i._addProtoToInputSidePacket(r,t.length,e,n),this.i._free(r);}));}));}addBoolVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateBoolVector(t.length);if(!n)throw Error("Unable to allocate new bool vector on heap.");for(const e of t)this.i._addBoolVectorEntry(n,e);this.i._addBoolVectorToInputSidePacket(n,e);}));}addDoubleVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateDoubleVector(t.length);if(!n)throw Error("Unable to allocate new double vector on heap.");for(const e of t)this.i._addDoubleVectorEntry(n,e);this.i._addDoubleVectorToInputSidePacket(n,e);}));}addFloatVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateFloatVector(t.length);if(!n)throw Error("Unable to allocate new float vector on heap.");for(const e of t)this.i._addFloatVectorEntry(n,e);this.i._addFloatVectorToInputSidePacket(n,e);}));}addIntVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateIntVector(t.length);if(!n)throw Error("Unable to allocate new int vector on heap.");for(const e of t)this.i._addIntVectorEntry(n,e);this.i._addIntVectorToInputSidePacket(n,e);}));}addUintVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateUintVector(t.length);if(!n)throw Error("Unable to allocate new unsigned int vector on heap.");for(const e of t)this.i._addUintVectorEntry(n,e);this.i._addUintVectorToInputSidePacket(n,e);}));}addStringVectorToInputSidePacket(t,e){jo(this,e,(e=>{const n=this.i._allocateStringVector(t.length);if(!n)throw Error("Unable to allocate new string vector on heap.");for(const e of t)jo(this,e,(t=>{this.i._addStringVectorEntry(n,t);}));this.i._addStringVectorToInputSidePacket(n,e);}));}attachBoolListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachBoolListener(t);}));}attachBoolVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachBoolVectorListener(t);}));}attachIntListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachIntListener(t);}));}attachIntVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachIntVectorListener(t);}));}attachUintListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachUintListener(t);}));}attachUintVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachUintVectorListener(t);}));}attachDoubleListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachDoubleListener(t);}));}attachDoubleVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachDoubleVectorListener(t);}));}attachFloatListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachFloatListener(t);}));}attachFloatVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachFloatVectorListener(t);}));}attachStringListener(t,e){Ho(this,t,e),jo(this,t,(t=>{this.i._attachStringListener(t);}));}attachStringVectorListener(t,e){Wo(this,t,e),jo(this,t,(t=>{this.i._attachStringVectorListener(t);}));}attachProtoListener(t,e,n){Ho(this,t,e),jo(this,t,(t=>{this.i._attachProtoListener(t,n||false);}));}attachProtoVectorListener(t,e,n){Wo(this,t,e),jo(this,t,(t=>{this.i._attachProtoVectorListener(t,n||false);}));}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),Ho(this,t,((t,n)=>{t=new Float32Array(t.buffer,t.byteOffset,t.length/4),e(t,n);})),jo(this,t,(t=>{this.i._attachAudioListener(t,n||false);}));}finishProcessing(){this.i._waitUntilIdle();}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0;}},class extends Wa{get ha(){return this.i}sa(t,e,n){jo(this,e,(e=>{const[r,i]=Vo(this,t,e);this.ha._addBoundTextureAsImageToStream(e,r,i,n);}));}X(t,e){Ho(this,t,e),jo(this,t,(t=>{this.ha._attachImageListener(t);}));}ea(t,e){Wo(this,t,e),jo(this,t,(t=>{this.ha._attachImageVectorListener(t);}));}}));var Wa,za=class extends Ha{};async function Ka(t,e,n){return async function(t,e,n,r){return zo(t,e,n,r)}(t,n.canvas??(Do()?void 0:document.createElement("canvas")),e,n)}function Ya(t,e,n,r){if(t.W){const s=new fs;if(n?.regionOfInterest){if(!t.ra)throw Error("This task doesn't support region-of-interest.");var i=n.regionOfInterest;if(i.left>=i.right||i.top>=i.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(i.left<0||i.top<0||i.right>1||i.bottom>1)throw Error("Expected RectF values to be in [0,1].");wn(s,1,(i.left+i.right)/2),wn(s,2,(i.top+i.bottom)/2),wn(s,4,i.right-i.left),wn(s,3,i.bottom-i.top);}else wn(s,1,.5),wn(s,2,.5),wn(s,4,1),wn(s,3,1);if(n?.rotationDegrees){if(n?.rotationDegrees%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(wn(s,5,-Math.PI*n.rotationDegrees/180),n?.rotationDegrees%180!=0){const[t,r]=Go(e);n=yn(s,3)*r/t,i=yn(s,4)*t/r,wn(s,4,n),wn(s,3,i);}}t.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",t.W,r);}t.g.sa(e,t.ca,r??performance.now()),t.finishProcessing();}function $a(t,e,n){if(t.baseOptions?.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Ya(t,e,n,t.B+1);}function qa(t,e,n,r){if(!t.baseOptions?.g())throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Ya(t,e,n,r);}function Ja(t,e,n,r){var i=e.data;const s=e.width,o=s*(e=e.height);if((i instanceof Uint8Array||i instanceof Float32Array)&&i.length!==o)throw Error("Unsupported channel count: "+i.length/o);return t=new wa$1([i],n,false,t.g.i.canvas,t.P,s,e),r?t.clone():t}var Za=class extends Qo{constructor(t,e,n,r){super(t),this.g=t,this.ca=e,this.W=n,this.ra=r,this.P=new ca;}l(t,e=true){if("runningMode"in t&&vn(this.baseOptions,2,!!t.runningMode&&"IMAGE"!==t.runningMode),void 0!==t.canvas&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.P.close(),super.close();}};Za.prototype.close=Za.prototype.close;var Qa=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect_in",false),this.j={detections:[]},un(t=this.h=new Rs,0,1,e=new xs),wn(this.h,2,.5),wn(this.h,3,.3);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return "minDetectionConfidence"in t&&wn(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&wn(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}D(t,e){return this.j={detections:[]},$a(this,t,e),this.j}F(t,e,n){return this.j={detections:[]},qa(this,t,n,e),this.j}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect_in"),Yi(t,"detections");const e=new Ci;Kn(e,Is,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect_in"),ji(n,"DETECTIONS:detections"),n.o(e),zi(t,n),this.g.attachProtoVectorListener("detections",((t,e)=>{for(const e of t)t=ss(e),this.j.detections.push(Lo(t));$o(this,e);})),this.g.attachEmptyPacketListener("detections",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Qa.prototype.detectForVideo=Qa.prototype.F,Qa.prototype.detect=Qa.prototype.D,Qa.prototype.setOptions=Qa.prototype.o,Qa.createFromModelPath=async function(t,e){return Ka(Qa,t,{baseOptions:{modelAssetPath:e}})},Qa.createFromModelBuffer=function(t,e){return Ka(Qa,t,{baseOptions:{modelAssetBuffer:e}})},Qa.createFromOptions=function(t,e){return Ka(Qa,t,e)};var th=Xa([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),eh=Xa([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),nh=Xa([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),rh=Xa([474,475],[475,476],[476,477],[477,474]),ih=Xa([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),sh=Xa([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),oh=Xa([469,470],[470,471],[471,472],[472,469]),ah=Xa([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),hh=[...th,...eh,...nh,...ih,...sh,...ah],ch=Xa([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function uh(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]};}var lh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",false),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=false,un(t=this.h=new Ds,0,1,e=new xs),this.v=new Ns,un(this.h,0,3,this.v),this.s=new Rs,un(this.h,0,2,this.s),En(this.s,4,1),wn(this.s,2,.5),wn(this.v,2,.5),wn(this.h,4,.5);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return "numFaces"in t&&En(this.s,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&wn(this.s,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&wn(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&wn(this.v,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}D(t,e){return uh(this),$a(this,t,e),this.j}F(t,e,n){return uh(this),qa(this,t,n,e),this.j}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"face_landmarks");const e=new Ci;Kn(e,js,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),zi(t,n),this.g.attachProtoVectorListener("face_landmarks",((t,e)=>{for(const e of t)t=cs(e),this.j.faceLandmarks.push(Fo(t));$o(this,e);})),this.g.attachEmptyPacketListener("face_landmarks",(t=>{$o(this,t);})),this.outputFaceBlendshapes&&(Yi(t,"blendshapes"),ji(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",((t,e)=>{if(this.outputFaceBlendshapes)for(const e of t)t=es(e),this.j.faceBlendshapes.push(xo(t.g()??[]));$o(this,e);})),this.g.attachEmptyPacketListener("blendshapes",(t=>{$o(this,t);}))),this.outputFacialTransformationMatrixes&&(Yi(t,"face_geometry"),ji(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",((t,e)=>{if(this.outputFacialTransformationMatrixes)for(const e of t)(t=an(Cs(e),us,2))&&this.j.facialTransformationMatrixes.push({rows:gn(mn(t,1),0)??0,columns:gn(mn(t,2),0)??0,data:ze(t,3,Wt$1).slice()??[]});$o(this,e);})),this.g.attachEmptyPacketListener("face_geometry",(t=>{$o(this,t);}))),t=t.g(),this.setGraph(new Uint8Array(t),true);}};lh.prototype.detectForVideo=lh.prototype.F,lh.prototype.detect=lh.prototype.D,lh.prototype.setOptions=lh.prototype.o,lh.createFromModelPath=function(t,e){return Ka(lh,t,{baseOptions:{modelAssetPath:e}})},lh.createFromModelBuffer=function(t,e){return Ka(lh,t,{baseOptions:{modelAssetBuffer:e}})},lh.createFromOptions=function(t,e){return Ka(lh,t,e)},lh.FACE_LANDMARKS_LIPS=th,lh.FACE_LANDMARKS_LEFT_EYE=eh,lh.FACE_LANDMARKS_LEFT_EYEBROW=nh,lh.FACE_LANDMARKS_LEFT_IRIS=rh,lh.FACE_LANDMARKS_RIGHT_EYE=ih,lh.FACE_LANDMARKS_RIGHT_EYEBROW=sh,lh.FACE_LANDMARKS_RIGHT_IRIS=oh,lh.FACE_LANDMARKS_FACE_OVAL=ah,lh.FACE_LANDMARKS_CONTOURS=hh,lh.FACE_LANDMARKS_TESSELATION=ch;var fh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",true),un(t=this.j=new Vs,0,1,e=new xs);}get baseOptions(){return an(this.j,xs,1)}set baseOptions(t){un(this.j,0,1,t);}o(t){return super.l(t)}Pa(t,e,n){const r="function"!=typeof e?e:{};if(this.h="function"==typeof e?e:n,$a(this,t,r??{}),!this.h)return this.s}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"stylized_image");const e=new Ci;Kn(e,Xs,this.j);const n=new Vi;Bi(n,"mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"STYLIZED_IMAGE:stylized_image"),n.o(e),zi(t,n),this.g.X("stylized_image",((t,e)=>{var n=!this.h,r=t.data,i=t.width;const s=i*(t=t.height);if(r instanceof Uint8Array)if(r.length===3*s){const e=new Uint8ClampedArray(4*s);for(let t=0;t<s;++t)e[4*t]=r[3*t],e[4*t+1]=r[3*t+1],e[4*t+2]=r[3*t+2],e[4*t+3]=255;r=new ImageData(e,i,t);}else {if(r.length!==4*s)throw Error("Unsupported channel count: "+r.length/s);r=new ImageData(new Uint8ClampedArray(r.buffer,r.byteOffset,r.length),i,t);}else if(!(r instanceof WebGLTexture))throw Error(`Unsupported format: ${r.constructor.name}`);i=new ja([r],false,false,this.g.i.canvas,this.P,i,t),this.s=n=n?i.clone():i,this.h&&this.h(n),$o(this,e);})),this.g.attachEmptyPacketListener("stylized_image",(t=>{this.s=null,this.h&&this.h(null),$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};fh.prototype.stylize=fh.prototype.Pa,fh.prototype.setOptions=fh.prototype.o,fh.createFromModelPath=function(t,e){return Ka(fh,t,{baseOptions:{modelAssetPath:e}})},fh.createFromModelBuffer=function(t,e){return Ka(fh,t,{baseOptions:{modelAssetBuffer:e}})},fh.createFromOptions=function(t,e){return Ka(fh,t,e)};var dh=Xa([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function ph(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[];}function gh(t){return 0===t.gestures.length?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function mh(t,e=true){const n=[];for(const i of t){var r=es(i);t=[];for(const n of r.g())r=e&&null!=mn(n,1)?gn(mn(n,1),0):-1,t.push({score:yn(n,2)??0,index:r,categoryName:_n(n,3)??"",displayName:_n(n,4)??""});n.push(t);}return n}var yh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",false),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],un(t=this.j=new Js,0,1,e=new xs),this.s=new qs,un(this.j,0,2,this.s),this.C=new $s,un(this.s,0,3,this.C),this.v=new Ys,un(this.s,0,2,this.v),this.h=new Ks,un(this.j,0,3,this.h),wn(this.v,2,.5),wn(this.s,4,.5),wn(this.C,2,.5);}get baseOptions(){return an(this.j,xs,1)}set baseOptions(t){un(this.j,0,1,t);}o(t){if(En(this.v,3,t.numHands??1),"minHandDetectionConfidence"in t&&wn(this.v,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&wn(this.s,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&wn(this.C,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new Hs,n=e,r=So(t.cannedGesturesClassifierOptions,an(this.h,Hs,3)?.h());un(n,0,2,r),un(this.h,0,3,e);}else void 0===t.cannedGesturesClassifierOptions&&an(this.h,Hs,3)?.g();return t.customGesturesClassifierOptions?(un(n=e=new Hs,0,2,r=So(t.customGesturesClassifierOptions,an(this.h,Hs,4)?.h())),un(this.h,0,4,e)):void 0===t.customGesturesClassifierOptions&&an(this.h,Hs,4)?.g(),this.l(t)}Ka(t,e){return ph(this),$a(this,t,e),gh(this)}La(t,e,n){return ph(this),qa(this,t,n,e),gh(this)}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"hand_gestures"),Yi(t,"hand_landmarks"),Yi(t,"world_hand_landmarks"),Yi(t,"handedness");const e=new Ci;Kn(e,io,this.j);const n=new Vi;Bi(n,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"HAND_GESTURES:hand_gestures"),ji(n,"LANDMARKS:hand_landmarks"),ji(n,"WORLD_LANDMARKS:world_hand_landmarks"),ji(n,"HANDEDNESS:handedness"),n.o(e),zi(t,n),this.g.attachProtoVectorListener("hand_landmarks",((t,e)=>{for(const e of t){t=cs(e);const n=[];for(const e of cn(t,hs,1))n.push({x:yn(e,1)??0,y:yn(e,2)??0,z:yn(e,3)??0,visibility:yn(e,4)??0});this.landmarks.push(n);}$o(this,e);})),this.g.attachEmptyPacketListener("hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoVectorListener("world_hand_landmarks",((t,e)=>{for(const e of t){t=as(e);const n=[];for(const e of cn(t,os,1))n.push({x:yn(e,1)??0,y:yn(e,2)??0,z:yn(e,3)??0,visibility:yn(e,4)??0});this.worldLandmarks.push(n);}$o(this,e);})),this.g.attachEmptyPacketListener("world_hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoVectorListener("hand_gestures",((t,e)=>{this.gestures.push(...mh(t,false)),$o(this,e);})),this.g.attachEmptyPacketListener("hand_gestures",(t=>{$o(this,t);})),this.g.attachProtoVectorListener("handedness",((t,e)=>{this.handedness.push(...mh(t)),$o(this,e);})),this.g.attachEmptyPacketListener("handedness",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};function _h(t){return {landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}yh.prototype.recognizeForVideo=yh.prototype.La,yh.prototype.recognize=yh.prototype.Ka,yh.prototype.setOptions=yh.prototype.o,yh.createFromModelPath=function(t,e){return Ka(yh,t,{baseOptions:{modelAssetPath:e}})},yh.createFromModelBuffer=function(t,e){return Ka(yh,t,{baseOptions:{modelAssetBuffer:e}})},yh.createFromOptions=function(t,e){return Ka(yh,t,e)},yh.HAND_CONNECTIONS=dh;var vh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",false),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],un(t=this.h=new qs,0,1,e=new xs),this.s=new $s,un(this.h,0,3,this.s),this.j=new Ys,un(this.h,0,2,this.j),En(this.j,3,1),wn(this.j,2,.5),wn(this.s,2,.5),wn(this.h,4,.5);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return "numHands"in t&&En(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&wn(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&wn(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&wn(this.s,2,t.minHandPresenceConfidence??.5),this.l(t)}D(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],$a(this,t,e),_h(this)}F(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],qa(this,t,n,e),_h(this)}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"hand_landmarks"),Yi(t,"world_hand_landmarks"),Yi(t,"handedness");const e=new Ci;Kn(e,ro,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"LANDMARKS:hand_landmarks"),ji(n,"WORLD_LANDMARKS:world_hand_landmarks"),ji(n,"HANDEDNESS:handedness"),n.o(e),zi(t,n),this.g.attachProtoVectorListener("hand_landmarks",((t,e)=>{for(const e of t)t=cs(e),this.landmarks.push(Fo(t));$o(this,e);})),this.g.attachEmptyPacketListener("hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoVectorListener("world_hand_landmarks",((t,e)=>{for(const e of t)t=as(e),this.worldLandmarks.push(Ro(t));$o(this,e);})),this.g.attachEmptyPacketListener("world_hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoVectorListener("handedness",((t,e)=>{var n=this.handedness,r=n.push;const i=[];for(const e of t){t=es(e);const n=[];for(const e of t.g())n.push({score:yn(e,2)??0,index:gn(mn(e,1),0)??-1,categoryName:_n(e,3)??"",displayName:_n(e,4)??""});i.push(n);}r.call(n,...i),$o(this,e);})),this.g.attachEmptyPacketListener("handedness",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};vh.prototype.detectForVideo=vh.prototype.F,vh.prototype.detect=vh.prototype.D,vh.prototype.setOptions=vh.prototype.o,vh.createFromModelPath=function(t,e){return Ka(vh,t,{baseOptions:{modelAssetPath:e}})},vh.createFromModelBuffer=function(t,e){return Ka(vh,t,{baseOptions:{modelAssetBuffer:e}})},vh.createFromOptions=function(t,e){return Ka(vh,t,e)},vh.HAND_CONNECTIONS=dh;var Eh=Xa([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function wh(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]};}function Th(t){try{if(!t.C)return t.h;t.C(t.h);}finally{Zo(t);}}function Ah(t,e){t=cs(t),e.push(Fo(t));}var bh=class extends Za{constructor(t,e){super(new za(t,e),"input_frames_image",null,false),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=false,un(t=this.j=new ho,0,1,e=new xs),this.J=new $s,un(this.j,0,2,this.J),this.ba=new so,un(this.j,0,3,this.ba),this.s=new Rs,un(this.j,0,4,this.s),this.H=new Ns,un(this.j,0,5,this.H),this.v=new oo,un(this.j,0,6,this.v),this.K=new ao,un(this.j,0,7,this.K),wn(this.s,2,.5),wn(this.s,3,.3),wn(this.H,2,.5),wn(this.v,2,.5),wn(this.v,3,.3),wn(this.K,2,.5),wn(this.J,2,.5);}get baseOptions(){return an(this.j,xs,1)}set baseOptions(t){un(this.j,0,1,t);}o(t){return "minFaceDetectionConfidence"in t&&wn(this.s,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&wn(this.s,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&wn(this.H,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&wn(this.v,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&wn(this.v,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&wn(this.K,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&wn(this.J,2,t.minHandLandmarksConfidence??.5),this.l(t)}D(t,e,n){const r="function"!=typeof e?e:{};return this.C="function"==typeof e?e:n,wh(this),$a(this,t,r),Th(this)}F(t,e,n,r){const i="function"!=typeof n?n:{};return this.C="function"==typeof n?n:r,wh(this),qa(this,t,i,e),Th(this)}m(){var t=new $i;Ki(t,"input_frames_image"),Yi(t,"pose_landmarks"),Yi(t,"pose_world_landmarks"),Yi(t,"face_landmarks"),Yi(t,"left_hand_landmarks"),Yi(t,"left_hand_world_landmarks"),Yi(t,"right_hand_landmarks"),Yi(t,"right_hand_world_landmarks");const e=new Ci,n=new ki;Je(n,1,re("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),""),function(t,e){if(null!=e)if(Array.isArray(e))je(t,2,Re(e,Ie,void 0,void 0,false));else {if(!("string"==typeof e||e instanceof D||I(e)))throw Error("invalid value in Any.value field: "+e+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");Je(t,2,lt$1(e,false,false),U());}}(n,this.j.g());const r=new Vi;Bi(r,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),pn(r,8,ki,n),Gi(r,"IMAGE:input_frames_image"),ji(r,"POSE_LANDMARKS:pose_landmarks"),ji(r,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),ji(r,"FACE_LANDMARKS:face_landmarks"),ji(r,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),ji(r,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),ji(r,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),ji(r,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),r.o(e),zi(t,r),qo(this,t),this.g.attachProtoListener("pose_landmarks",((t,e)=>{Ah(t,this.h.poseLandmarks),$o(this,e);})),this.g.attachEmptyPacketListener("pose_landmarks",(t=>{$o(this,t);})),this.g.attachProtoListener("pose_world_landmarks",((t,e)=>{var n=this.h.poseWorldLandmarks;t=as(t),n.push(Ro(t)),$o(this,e);})),this.g.attachEmptyPacketListener("pose_world_landmarks",(t=>{$o(this,t);})),this.outputPoseSegmentationMasks&&(ji(r,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Jo(this,"pose_segmentation_mask"),this.g.X("pose_segmentation_mask",((t,e)=>{this.h.poseSegmentationMasks=[Ja(this,t,true,!this.C)],$o(this,e);})),this.g.attachEmptyPacketListener("pose_segmentation_mask",(t=>{this.h.poseSegmentationMasks=[],$o(this,t);}))),this.g.attachProtoListener("face_landmarks",((t,e)=>{Ah(t,this.h.faceLandmarks),$o(this,e);})),this.g.attachEmptyPacketListener("face_landmarks",(t=>{$o(this,t);})),this.outputFaceBlendshapes&&(Yi(t,"extra_blendshapes"),ji(r,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",((t,e)=>{var n=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(t=es(t),n.push(xo(t.g()??[]))),$o(this,e);})),this.g.attachEmptyPacketListener("extra_blendshapes",(t=>{$o(this,t);}))),this.g.attachProtoListener("left_hand_landmarks",((t,e)=>{Ah(t,this.h.leftHandLandmarks),$o(this,e);})),this.g.attachEmptyPacketListener("left_hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoListener("left_hand_world_landmarks",((t,e)=>{var n=this.h.leftHandWorldLandmarks;t=as(t),n.push(Ro(t)),$o(this,e);})),this.g.attachEmptyPacketListener("left_hand_world_landmarks",(t=>{$o(this,t);})),this.g.attachProtoListener("right_hand_landmarks",((t,e)=>{Ah(t,this.h.rightHandLandmarks),$o(this,e);})),this.g.attachEmptyPacketListener("right_hand_landmarks",(t=>{$o(this,t);})),this.g.attachProtoListener("right_hand_world_landmarks",((t,e)=>{var n=this.h.rightHandWorldLandmarks;t=as(t),n.push(Ro(t)),$o(this,e);})),this.g.attachEmptyPacketListener("right_hand_world_landmarks",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};bh.prototype.detectForVideo=bh.prototype.F,bh.prototype.detect=bh.prototype.D,bh.prototype.setOptions=bh.prototype.o,bh.createFromModelPath=function(t,e){return Ka(bh,t,{baseOptions:{modelAssetPath:e}})},bh.createFromModelBuffer=function(t,e){return Ka(bh,t,{baseOptions:{modelAssetBuffer:e}})},bh.createFromOptions=function(t,e){return Ka(bh,t,e)},bh.HAND_CONNECTIONS=dh,bh.POSE_CONNECTIONS=Eh,bh.FACE_LANDMARKS_LIPS=th,bh.FACE_LANDMARKS_LEFT_EYE=eh,bh.FACE_LANDMARKS_LEFT_EYEBROW=nh,bh.FACE_LANDMARKS_LEFT_IRIS=rh,bh.FACE_LANDMARKS_RIGHT_EYE=ih,bh.FACE_LANDMARKS_RIGHT_EYEBROW=sh,bh.FACE_LANDMARKS_RIGHT_IRIS=oh,bh.FACE_LANDMARKS_FACE_OVAL=ah,bh.FACE_LANDMARKS_CONTOURS=hh,bh.FACE_LANDMARKS_TESSELATION=ch;var kh=class extends Za{constructor(t,e){super(new za(t,e),"input_image","norm_rect",true),this.j={classifications:[]},un(t=this.h=new lo,0,1,e=new xs);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return un(this.h,0,2,So(t,an(this.h,Es,2))),this.l(t)}ua(t,e){return this.j={classifications:[]},$a(this,t,e),this.j}va(t,e,n){return this.j={classifications:[]},qa(this,t,n,e),this.j}m(){var t=new $i;Ki(t,"input_image"),Ki(t,"norm_rect"),Yi(t,"classifications");const e=new Ci;Kn(e,fo,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Gi(n,"IMAGE:input_image"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"CLASSIFICATIONS:classifications"),n.o(e),zi(t,n),this.g.attachProtoListener("classifications",((t,e)=>{this.j=function(t){const e={classifications:cn(t,ds,1).map((t=>xo(an(t,Qi,4)?.g()??[],gn(mn(t,2),0),_n(t,3))))};return null!=te(De(t,2))&&(e.timestampMs=gn(te(De(t,2)),0)),e}(ps(t)),$o(this,e);})),this.g.attachEmptyPacketListener("classifications",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};kh.prototype.classifyForVideo=kh.prototype.va,kh.prototype.classify=kh.prototype.ua,kh.prototype.setOptions=kh.prototype.o,kh.createFromModelPath=function(t,e){return Ka(kh,t,{baseOptions:{modelAssetPath:e}})},kh.createFromModelBuffer=function(t,e){return Ka(kh,t,{baseOptions:{modelAssetBuffer:e}})},kh.createFromOptions=function(t,e){return Ka(kh,t,e)};var Sh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",true),this.h=new po,this.embeddings={embeddings:[]},un(t=this.h,0,1,e=new xs);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){var e=this.h,n=an(this.h,Ts,2);return n=n?n.clone():new Ts,void 0!==t.l2Normalize?vn(n,1,t.l2Normalize):"l2Normalize"in t&&je(n,1),void 0!==t.quantize?vn(n,2,t.quantize):"quantize"in t&&je(n,2),un(e,0,2,n),this.l(t)}Ba(t,e){return $a(this,t,e),this.embeddings}Ca(t,e,n){return qa(this,t,n,e),this.embeddings}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"embeddings_out");const e=new Ci;Kn(e,go,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"EMBEDDINGS:embeddings_out"),n.o(e),zi(t,n),this.g.attachProtoListener("embeddings_out",((t,e)=>{t=vs(t),this.embeddings=function(t){return {embeddings:cn(t,ys,1).map((t=>{const e={headIndex:gn(mn(t,3),0)??-1,headName:_n(t,4)??""};if(void 0!==on(t,gs,tn(t,1)))t=ze(t=an(t,gs,tn(t,1)),1,Wt$1),e.floatEmbedding=t.slice();else {const n=new Uint8Array(0);e.quantizedEmbedding=an(t,ms,tn(t,2))?.qa()?.h()??n;}return e})),timestampMs:gn(te(De(t,2)),0)}}(t),$o(this,e);})),this.g.attachEmptyPacketListener("embeddings_out",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Sh.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=Io(t.floatEmbedding,e.floatEmbedding);else {if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=Io(Mo(t.quantizedEmbedding),Mo(e.quantizedEmbedding));}return t},Sh.prototype.embedForVideo=Sh.prototype.Ca,Sh.prototype.embed=Sh.prototype.Ba,Sh.prototype.setOptions=Sh.prototype.o,Sh.createFromModelPath=function(t,e){return Ka(Sh,t,{baseOptions:{modelAssetPath:e}})},Sh.createFromModelBuffer=function(t,e){return Ka(Sh,t,{baseOptions:{modelAssetBuffer:e}})},Sh.createFromOptions=function(t,e){return Ka(Sh,t,e)};var xh=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n;}close(){this.confidenceMasks?.forEach((t=>{t.close();})),this.categoryMask?.close();}};function Lh(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0;}function Fh(t){try{const e=new xh(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e);}finally{Zo(t);}}xh.prototype.close=xh.prototype.close;var Rh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",false),this.s=[],this.outputCategoryMask=false,this.outputConfidenceMasks=true,this.h=new Eo,this.v=new mo$1,un(this.h,0,3,this.v),un(t=this.h,0,1,e=new xs);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return void 0!==t.displayNamesLocale?je(this.h,2,re(t.displayNamesLocale)):"displayNamesLocale"in t&&je(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??false),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??true),super.l(t)}I(){!function(t){const e=cn(t.fa(),Vi,1).filter((t=>_n(t,1).includes("mediapipe.tasks.TensorsToSegmentationCalculator")));if(t.s=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");1===e.length&&(an(e[0],Ci,7)?.l()?.g()??new Map).forEach(((e,n)=>{t.s[Number(n)]=_n(e,1);}));}(this);}ga(t,e,n){const r="function"!=typeof e?e:{};return this.j="function"==typeof e?e:n,Lh(this),$a(this,t,r),Fh(this)}Na(t,e,n,r){const i="function"!=typeof n?n:{};return this.j="function"==typeof n?n:r,Lh(this),qa(this,t,i,e),Fh(this)}Fa(){return this.s}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect");const e=new Ci;Kn(e,wo,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),n.o(e),zi(t,n),qo(this,t),this.outputConfidenceMasks&&(Yi(t,"confidence_masks"),ji(n,"CONFIDENCE_MASKS:confidence_masks"),Jo(this,"confidence_masks"),this.g.ea("confidence_masks",((t,e)=>{this.confidenceMasks=t.map((t=>Ja(this,t,true,!this.j))),$o(this,e);})),this.g.attachEmptyPacketListener("confidence_masks",(t=>{this.confidenceMasks=[],$o(this,t);}))),this.outputCategoryMask&&(Yi(t,"category_mask"),ji(n,"CATEGORY_MASK:category_mask"),Jo(this,"category_mask"),this.g.X("category_mask",((t,e)=>{this.categoryMask=Ja(this,t,false,!this.j),$o(this,e);})),this.g.attachEmptyPacketListener("category_mask",(t=>{this.categoryMask=void 0,$o(this,t);}))),Yi(t,"quality_scores"),ji(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((t,e)=>{this.qualityScores=t,$o(this,e);})),this.g.attachEmptyPacketListener("quality_scores",(t=>{this.categoryMask=void 0,$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Rh.prototype.getLabels=Rh.prototype.Fa,Rh.prototype.segmentForVideo=Rh.prototype.Na,Rh.prototype.segment=Rh.prototype.ga,Rh.prototype.setOptions=Rh.prototype.o,Rh.createFromModelPath=function(t,e){return Ka(Rh,t,{baseOptions:{modelAssetPath:e}})},Rh.createFromModelBuffer=function(t,e){return Ka(Rh,t,{baseOptions:{modelAssetBuffer:e}})},Rh.createFromOptions=function(t,e){return Ka(Rh,t,e)};var Mh=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n;}close(){this.confidenceMasks?.forEach((t=>{t.close();})),this.categoryMask?.close();}};Mh.prototype.close=Mh.prototype.close;var Ih=class extends Yn{constructor(t){super(t);}},Ph=[0,ai,-2],Oh=[0,ti,-3,ui,ti,-1],Ch=[0,Oh],Uh=[0,Oh,ai,-1],Nh=class extends Yn{constructor(t){super(t);}},Dh=[0,ti,-1,ui],Bh=class extends Yn{constructor(){super();}},Gh=class extends Yn{constructor(t){super(t);}},jh=[1,2,3,4,5,6,7,8,9,10,14,15],Vh=class extends Yn{constructor(){super();}};Vh.prototype.g=bi([0,Qr,[0,jh,yi,Oh,yi,[0,Oh,Ph],yi,Ch,yi,[0,Ch,Ph],yi,Dh,yi,[0,ti,-3,ui,Ei],yi,[0,ti,-3,ui],yi,[0,pi,ti,-2,ui,ai,ui,-1,2,ti,Ph],yi,Uh,yi,[0,Uh,Ph],ti,Ph,pi,yi,[0,ti,-3,ui,Ph,-1],yi,[0,Qr,Dh]],pi,[0,pi,ai,-1,ui]]);var Xh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect_in",false),this.outputCategoryMask=false,this.outputConfidenceMasks=true,this.h=new Eo,this.s=new mo$1,un(this.h,0,3,this.s),un(t=this.h,0,1,e=new xs);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return "outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??false),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??true),super.l(t)}ga(t,e,n,r){const i="function"!=typeof n?n:{};this.j="function"==typeof n?n:r,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.B+1,r=new Vh;const s=new Gh;var o=new Ih;if(En(o,1,255),un(s,0,12,o),e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var a=new Nh;vn(a,3,true),wn(a,1,e.keypoint.x),wn(a,2,e.keypoint.y),ln(s,5,jh,a);}else {if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");for(a of(o=new Bh,e.scribble))vn(e=new Nh,3,true),wn(e,1,a.x),wn(e,2,a.y),pn(o,1,Nh,e);ln(s,15,jh,o);}pn(r,1,Gh,s),this.g.addProtoToStream(r.g(),"drishti.RenderData","roi_in",n),$a(this,t,i);t:{try{const t=new Mh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var h=t;break t}this.j(t);}finally{Zo(this);}h=void 0;}return h}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"roi_in"),Ki(t,"norm_rect_in");const e=new Ci;Kn(e,wo,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"ROI:roi_in"),Gi(n,"NORM_RECT:norm_rect_in"),n.o(e),zi(t,n),qo(this,t),this.outputConfidenceMasks&&(Yi(t,"confidence_masks"),ji(n,"CONFIDENCE_MASKS:confidence_masks"),Jo(this,"confidence_masks"),this.g.ea("confidence_masks",((t,e)=>{this.confidenceMasks=t.map((t=>Ja(this,t,true,!this.j))),$o(this,e);})),this.g.attachEmptyPacketListener("confidence_masks",(t=>{this.confidenceMasks=[],$o(this,t);}))),this.outputCategoryMask&&(Yi(t,"category_mask"),ji(n,"CATEGORY_MASK:category_mask"),Jo(this,"category_mask"),this.g.X("category_mask",((t,e)=>{this.categoryMask=Ja(this,t,false,!this.j),$o(this,e);})),this.g.attachEmptyPacketListener("category_mask",(t=>{this.categoryMask=void 0,$o(this,t);}))),Yi(t,"quality_scores"),ji(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((t,e)=>{this.qualityScores=t,$o(this,e);})),this.g.attachEmptyPacketListener("quality_scores",(t=>{this.categoryMask=void 0,$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Xh.prototype.segment=Xh.prototype.ga,Xh.prototype.setOptions=Xh.prototype.o,Xh.createFromModelPath=function(t,e){return Ka(Xh,t,{baseOptions:{modelAssetPath:e}})},Xh.createFromModelBuffer=function(t,e){return Ka(Xh,t,{baseOptions:{modelAssetBuffer:e}})},Xh.createFromOptions=function(t,e){return Ka(Xh,t,e)};var Hh=class extends Za{constructor(t,e){super(new za(t,e),"input_frame_gpu","norm_rect",false),this.j={detections:[]},un(t=this.h=new To,0,1,e=new xs);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return void 0!==t.displayNamesLocale?je(this.h,2,re(t.displayNamesLocale)):"displayNamesLocale"in t&&je(this.h,2),void 0!==t.maxResults?En(this.h,3,t.maxResults):"maxResults"in t&&je(this.h,3),void 0!==t.scoreThreshold?wn(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&je(this.h,4),void 0!==t.categoryAllowlist?Tn(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&je(this.h,5),void 0!==t.categoryDenylist?Tn(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&je(this.h,6),this.l(t)}D(t,e){return this.j={detections:[]},$a(this,t,e),this.j}F(t,e,n){return this.j={detections:[]},qa(this,t,n,e),this.j}m(){var t=new $i;Ki(t,"input_frame_gpu"),Ki(t,"norm_rect"),Yi(t,"detections");const e=new Ci;Kn(e,Ao,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.ObjectDetectorGraph"),Gi(n,"IMAGE:input_frame_gpu"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"DETECTIONS:detections"),n.o(e),zi(t,n),this.g.attachProtoVectorListener("detections",((t,e)=>{for(const e of t)t=ss(e),this.j.detections.push(Lo(t));$o(this,e);})),this.g.attachEmptyPacketListener("detections",(t=>{$o(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Hh.prototype.detectForVideo=Hh.prototype.F,Hh.prototype.detect=Hh.prototype.D,Hh.prototype.setOptions=Hh.prototype.o,Hh.createFromModelPath=async function(t,e){return Ka(Hh,t,{baseOptions:{modelAssetPath:e}})},Hh.createFromModelBuffer=function(t,e){return Ka(Hh,t,{baseOptions:{modelAssetBuffer:e}})},Hh.createFromOptions=function(t,e){return Ka(Hh,t,e)};var Wh=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n;}close(){this.segmentationMasks?.forEach((t=>{t.close();}));}};function zh(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0;}function Kh(t){try{const e=new Wh(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.s)return e;t.s(e);}finally{Zo(t);}}Wh.prototype.close=Wh.prototype.close;var Yh=class extends Za{constructor(t,e){super(new za(t,e),"image_in","norm_rect",false),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=false,un(t=this.h=new bo,0,1,e=new xs),this.v=new ao,un(this.h,0,3,this.v),this.j=new oo,un(this.h,0,2,this.j),En(this.j,4,1),wn(this.j,2,.5),wn(this.v,2,.5),wn(this.h,4,.5);}get baseOptions(){return an(this.h,xs,1)}set baseOptions(t){un(this.h,0,1,t);}o(t){return "numPoses"in t&&En(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&wn(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&wn(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&wn(this.v,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??false),this.l(t)}D(t,e,n){const r="function"!=typeof e?e:{};return this.s="function"==typeof e?e:n,zh(this),$a(this,t,r),Kh(this)}F(t,e,n,r){const i="function"!=typeof n?n:{};return this.s="function"==typeof n?n:r,zh(this),qa(this,t,i,e),Kh(this)}m(){var t=new $i;Ki(t,"image_in"),Ki(t,"norm_rect"),Yi(t,"normalized_landmarks"),Yi(t,"world_landmarks"),Yi(t,"segmentation_masks");const e=new Ci;Kn(e,ko,this.h);const n=new Vi;Bi(n,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Gi(n,"IMAGE:image_in"),Gi(n,"NORM_RECT:norm_rect"),ji(n,"NORM_LANDMARKS:normalized_landmarks"),ji(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),zi(t,n),qo(this,t),this.g.attachProtoVectorListener("normalized_landmarks",((t,e)=>{this.landmarks=[];for(const e of t)t=cs(e),this.landmarks.push(Fo(t));$o(this,e);})),this.g.attachEmptyPacketListener("normalized_landmarks",(t=>{this.landmarks=[],$o(this,t);})),this.g.attachProtoVectorListener("world_landmarks",((t,e)=>{this.worldLandmarks=[];for(const e of t)t=as(e),this.worldLandmarks.push(Ro(t));$o(this,e);})),this.g.attachEmptyPacketListener("world_landmarks",(t=>{this.worldLandmarks=[],$o(this,t);})),this.outputSegmentationMasks&&(ji(n,"SEGMENTATION_MASK:segmentation_masks"),Jo(this,"segmentation_masks"),this.g.ea("segmentation_masks",((t,e)=>{this.segmentationMasks=t.map((t=>Ja(this,t,true,!this.s))),$o(this,e);})),this.g.attachEmptyPacketListener("segmentation_masks",(t=>{this.segmentationMasks=[],$o(this,t);}))),t=t.g(),this.setGraph(new Uint8Array(t),true);}};Yh.prototype.detectForVideo=Yh.prototype.F,Yh.prototype.detect=Yh.prototype.D,Yh.prototype.setOptions=Yh.prototype.o,Yh.createFromModelPath=function(t,e){return Ka(Yh,t,{baseOptions:{modelAssetPath:e}})},Yh.createFromModelBuffer=function(t,e){return Ka(Yh,t,{baseOptions:{modelAssetBuffer:e}})},Yh.createFromOptions=function(t,e){return Ka(Yh,t,e)},Yh.POSE_CONNECTIONS=Eh;

const _hoisted_1$1 = { class: "relative -scale-x-100" };
const videoWidth = 700;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WebCam",
  setup(__props) {
    const constraints = {
      audio: false,
      video: true
    };
    const faceLandMarker = ref(null);
    const videoRef = ref(null);
    const canvasRef = ref(null);
    const createFaceLandMarker = async () => {
      const filesetResolver = await No.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.15/wasm"
      );
      faceLandMarker.value = await lh.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1
        }
      );
    };
    const faceResults = ref(null);
    const drawingUtils = ref(null);
    const createDrawingUtils = () => {
      const canvasCtx = canvasRef.value.getContext("2d");
      drawingUtils.value = new Ia$1(canvasCtx);
    };
    const lastVideoTime = ref(-1);
    const predictWebcam = async () => {
      if (!faceLandMarker.value || !videoRef.value) {
        console.error("Face Landmarker or Video element not initialized");
        return;
      }
      try {
        const ratio = videoRef.value.videoHeight / videoRef.value.videoWidth;
        videoRef.value.style.width = videoWidth + "px";
        videoRef.value.style.height = videoWidth * ratio + "px";
        canvasRef.value.style.width = videoWidth + "px";
        canvasRef.value.style.height = videoWidth * ratio + "px";
        canvasRef.value.width = videoRef.value.videoWidth;
        canvasRef.value.height = videoRef.value.videoHeight;
        await faceLandMarker.value.setOptions({ runningMode: "VIDEO" });
        const startTimeMs = performance.now();
        if (lastVideoTime.value !== videoRef.value.currentTime) {
          lastVideoTime.value = videoRef.value.currentTime;
          faceResults.value = faceLandMarker.value.detectForVideo(
            videoRef.value,
            startTimeMs
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    const animationFrameId = ref(null);
    const initWebcam = async (videoRef2) => {
      videoRef2.value.srcObject = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      videoRef2.value.addEventListener("loadeddata", predictWebcam);
    };
    onMounted(async () => {
      try {
        await Promise.all([createFaceLandMarker(), initWebcam(videoRef)]);
        createDrawingUtils();
        const loop = async () => {
          await predictWebcam();
          animationFrameId.value = requestAnimationFrame(loop);
        };
        await loop();
      } catch (error) {
        console.error(error);
      }
    });
    onBeforeUnmount(() => {
      if (!animationFrameId.value) return;
      window.cancelAnimationFrame(animationFrameId.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("video", {
          ref_key: "videoRef",
          ref: videoRef,
          autoplay: "",
          playsinline: ""
        }, null, 512),
        createBaseVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef,
          class: "absolute top-0 left-0 w-full h-full"
        }, null, 512)
      ]);
    };
  }
});

const _sfc_main = defineComponent({
  components: {
    WebCam: _sfc_main$1,
    ThemeSwitcher,
    ContentBlock: _sfc_main$5,
    WorkExperience,
    ExamplesOfWork
  },
  setup() {
    useHead({
      title: "Maksym Novikov's website",
      meta: [
        {
          name: "description",
          content: "You can view more info about me on this website."
        },
        {
          property: "og:url",
          content: "https://maxnvk.github.io/"
        },
        {
          property: "og:title",
          content: "Maksym Novikov's website"
        },
        {
          property: "og:description",
          content: "You can view more info about me on this website."
        },
        {
          property: "og:image",
          content: "/og-image.png"
        }
      ]
    });
  },
  beforeMount() {
    setInitialTheme();
  }
});

const _hoisted_1 = { class: "min-h-screen bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-800 px-4 py-10 sm:px-12 sm:py-16" };
const _hoisted_2 = { class: "wrapper flex-grow w-full" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_content_block = resolveComponent("content-block");
  const _component_work_experience = resolveComponent("work-experience");
  const _component_examples_of_work = resolveComponent("examples-of-work");
  const _component_theme_switcher = resolveComponent("theme-switcher");
  return openBlock(), createElementBlock("main", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_content_block),
      createVNode(_component_work_experience),
      createVNode(_component_examples_of_work)
    ]),
    createVNode(_component_theme_switcher)
  ]);
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c2806b9f"]]);

/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */
function _defineProperty$1(e, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e ? Object.defineProperty(e, r2, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r2] = t2, e;
}
function ownKeys$1(e, r2) {
  var t2 = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2$1(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$1(e, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e;
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e = t2[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
const noop = () => {
};
let _WINDOW = {};
let _DOCUMENT = {};
let _MUTATION_OBSERVER = null;
let _PERFORMANCE = {
  mark: noop,
  measure: noop
};
try {
  if (typeof window !== "undefined") _WINDOW = window;
  if (typeof document !== "undefined") _DOCUMENT = document;
  if (typeof MutationObserver !== "undefined") _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== "undefined") _PERFORMANCE = performance;
} catch (e) {
}
const {
  userAgent = ""
} = _WINDOW.navigator || {};
const WINDOW = _WINDOW;
const DOCUMENT = _DOCUMENT;
const MUTATION_OBSERVER = _MUTATION_OBSERVER;
const PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
const IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === "function" && typeof DOCUMENT.createElement === "function";
const IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/");
var p = /fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/, g = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i;
var S = {
  classic: {
    fa: "solid",
    fas: "solid",
    "fa-solid": "solid",
    far: "regular",
    "fa-regular": "regular",
    fal: "light",
    "fa-light": "light",
    fat: "thin",
    "fa-thin": "thin",
    fab: "brands",
    "fa-brands": "brands"
  },
  duotone: {
    fa: "solid",
    fad: "solid",
    "fa-solid": "solid",
    "fa-duotone": "solid",
    fadr: "regular",
    "fa-regular": "regular",
    fadl: "light",
    "fa-light": "light",
    fadt: "thin",
    "fa-thin": "thin"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid",
    fasdr: "regular",
    "fa-regular": "regular",
    fasdl: "light",
    "fa-light": "light",
    fasdt: "thin",
    "fa-thin": "thin"
  }
}, A = {
  GROUP: "duotone-group",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, P = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
var s = "classic", t = "duotone", r = "sharp", o = "sharp-duotone", L = [s, t, r, o];
var G = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  duotone: {
    900: "fad",
    400: "fadr",
    300: "fadl",
    100: "fadt"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds",
    400: "fasdr",
    300: "fasdl",
    100: "fasdt"
  }
};
var lt = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad",
    400: "fadr",
    normal: "fadr",
    300: "fadl",
    100: "fadt"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds",
    400: "fasdr",
    normal: "fasdr",
    300: "fasdl",
    100: "fasdt"
  }
};
var pt = /* @__PURE__ */ new Map([["classic", {
  defaultShortPrefixId: "fas",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin", "brands"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["sharp", {
  defaultShortPrefixId: "fass",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["duotone", {
  defaultShortPrefixId: "fad",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}], ["sharp-duotone", {
  defaultShortPrefixId: "fasds",
  defaultStyleId: "solid",
  styleIds: ["solid", "regular", "light", "thin"],
  futureStyleIds: [],
  defaultFontWeight: 900
}]]), xt = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    brands: "fab"
  },
  duotone: {
    solid: "fad",
    regular: "fadr",
    light: "fadl",
    thin: "fadt"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds",
    regular: "fasdr",
    light: "fasdl",
    thin: "fasdt"
  }
};
var Ft = ["fak", "fa-kit", "fakd", "fa-kit-duotone"], St = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
}, At = ["kit"];
var Ct = {
  kit: {
    "fa-kit": "fak"
  }};
var Lt = ["fak", "fakd"], Wt = {
  kit: {
    fak: "fa-kit"
  }};
var Et = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
};
var t$1 = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, r$1 = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone"];
var bt$1 = ["fak", "fa-kit", "fakd", "fa-kit-duotone"];
var Yt = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
};
var ua = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  duotone: {
    "fa-regular": "fadr",
    "fa-light": "fadl",
    "fa-thin": "fadt"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds",
    "fa-regular": "fasdr",
    "fa-light": "fasdl",
    "fa-thin": "fasdt"
  }
}, I$1 = {
  classic: ["fas", "far", "fal", "fat", "fad"],
  duotone: ["fadr", "fadl", "fadt"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"]
}, ga = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  duotone: {
    fadr: "fa-regular",
    fadl: "fa-light",
    fadt: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid",
    fasdr: "fa-regular",
    fasdl: "fa-light",
    fasdt: "fa-thin"
  }
}, x = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands"], Ia = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", ...r$1, ...x], m$1 = ["solid", "regular", "light", "thin", "duotone", "brands"], c$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], F$1 = c$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), ma = [...Object.keys(I$1), ...m$1, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", t$1.GROUP, t$1.SWAP_OPACITY, t$1.PRIMARY, t$1.SECONDARY].concat(c$1.map((a) => "".concat(a, "x"))).concat(F$1.map((a) => "w-".concat(a)));
var wa = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
};
const NAMESPACE_IDENTIFIER = "___FONT_AWESOME___";
const UNITS_IN_GRID = 16;
const DEFAULT_CSS_PREFIX = "fa";
const DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa";
const DATA_FA_I2SVG = "data-fa-i2svg";
const DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element";
const DATA_FA_PSEUDO_ELEMENT_PENDING = "data-fa-pseudo-element-pending";
const DATA_PREFIX = "data-prefix";
const DATA_ICON = "data-icon";
const HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg";
const MUTATION_APPROACH_ASYNC = "async";
const TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ["HTML", "HEAD", "STYLE", "SCRIPT"];
const PRODUCTION$1 = (() => {
  try {
    return true;
  } catch (e$$1) {
    return false;
  }
})();
function familyProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : target[s];
    }
  });
}
const _PREFIX_TO_STYLE = _objectSpread2$1({}, S);
_PREFIX_TO_STYLE[s] = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  "fa-duotone": "duotone"
}), S[s]), St["kit"]), St["kit-duotone"]);
const PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
const _STYLE_TO_PREFIX = _objectSpread2$1({}, xt);
_STYLE_TO_PREFIX[s] = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  duotone: "fad"
}), _STYLE_TO_PREFIX[s]), Et["kit"]), Et["kit-duotone"]);
const STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
const _PREFIX_TO_LONG_STYLE = _objectSpread2$1({}, ga);
_PREFIX_TO_LONG_STYLE[s] = _objectSpread2$1(_objectSpread2$1({}, _PREFIX_TO_LONG_STYLE[s]), Wt["kit"]);
const PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
const _LONG_STYLE_TO_PREFIX = _objectSpread2$1({}, ua);
_LONG_STYLE_TO_PREFIX[s] = _objectSpread2$1(_objectSpread2$1({}, _LONG_STYLE_TO_PREFIX[s]), Ct["kit"]);
familyProxy(_LONG_STYLE_TO_PREFIX);
const ICON_SELECTION_SYNTAX_PATTERN = p;
const LAYERS_TEXT_CLASSNAME = "fa-layers-text";
const FONT_FAMILY_PATTERN = g;
const _FONT_WEIGHT_TO_PREFIX = _objectSpread2$1({}, G);
familyProxy(_FONT_WEIGHT_TO_PREFIX);
const ATTRIBUTES_WATCHED_FOR_MUTATION = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"];
const DUOTONE_CLASSES = A;
const RESERVED_CLASSES = [...At, ...ma];
const initial = WINDOW.FontAwesomeConfig || {};
function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector("script[" + attr + "]");
  if (element) {
    return element.getAttribute(attr);
  }
}
function coerce(val) {
  if (val === "") return true;
  if (val === "false") return false;
  if (val === "true") return true;
  return val;
}
if (DOCUMENT && typeof DOCUMENT.querySelector === "function") {
  const attrs = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  attrs.forEach((_ref) => {
    let [attr, key] = _ref;
    const val = coerce(getAttrConfig(attr));
    if (val !== void 0 && val !== null) {
      initial[key] = val;
    }
  });
}
const _default = {
  styleDefault: "solid",
  familyDefault: s,
  cssPrefix: DEFAULT_CSS_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: "async",
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};
if (initial.familyPrefix) {
  initial.cssPrefix = initial.familyPrefix;
}
const _config = _objectSpread2$1(_objectSpread2$1({}, _default), initial);
if (!_config.autoReplaceSvg) _config.observeMutations = false;
const config = {};
Object.keys(_default).forEach((key) => {
  Object.defineProperty(config, key, {
    enumerable: true,
    set: function(val) {
      _config[key] = val;
      _onChangeCb.forEach((cb) => cb(config));
    },
    get: function() {
      return _config[key];
    }
  });
});
Object.defineProperty(config, "familyPrefix", {
  enumerable: true,
  set: function(val) {
    _config.cssPrefix = val;
    _onChangeCb.forEach((cb) => cb(config));
  },
  get: function() {
    return _config.cssPrefix;
  }
});
WINDOW.FontAwesomeConfig = config;
const _onChangeCb = [];
function onChange(cb) {
  _onChangeCb.push(cb);
  return () => {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}
const d$2 = UNITS_IN_GRID;
const meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};
function insertCss(css2) {
  if (!css2 || !IS_DOM) {
    return;
  }
  const style = DOCUMENT.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = css2;
  const headChildren = DOCUMENT.head.childNodes;
  let beforeChild = null;
  for (let i = headChildren.length - 1; i > -1; i--) {
    const child = headChildren[i];
    const tagName = (child.tagName || "").toUpperCase();
    if (["STYLE", "LINK"].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }
  DOCUMENT.head.insertBefore(style, beforeChild);
  return css2;
}
const idPool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function nextUniqueId() {
  let size = 12;
  let id = "";
  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }
  return id;
}
function toArray(obj) {
  const array = [];
  for (let i = (obj || []).length >>> 0; i--; ) {
    array[i] = obj[i];
  }
  return array;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute("class") || "").split(" ").filter((i) => i);
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce((acc, attributeName) => {
    return acc + "".concat(attributeName, '="').concat(htmlEscape(attributes[attributeName]), '" ');
  }, "").trim();
}
function joinStyles(styles2) {
  return Object.keys(styles2 || {}).reduce((acc, styleName) => {
    return acc + "".concat(styleName, ": ").concat(styles2[styleName].trim(), ";");
  }, "");
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref) {
  let {
    transform,
    containerWidth,
    iconWidth
  } = _ref;
  const outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  const inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  const path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer,
    inner,
    path
  };
}
function transformForCss(_ref2) {
  let {
    transform,
    width = UNITS_IN_GRID,
    height = UNITS_IN_GRID,
    startCentered = false
  } = _ref2;
  let val = "";
  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
  }
  val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}
var baseStyles = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    animation-delay: -1ms;\n    animation-duration: 1ms;\n    animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    transform: scale(1);\n  }\n  45% {\n    transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(-15deg);\n  }\n  4% {\n    transform: rotate(15deg);\n  }\n  8%, 24% {\n    transform: rotate(-18deg);\n  }\n  12%, 28% {\n    transform: rotate(18deg);\n  }\n  16% {\n    transform: rotate(-22deg);\n  }\n  20% {\n    transform: rotate(22deg);\n  }\n  32% {\n    transform: rotate(-12deg);\n  }\n  36% {\n    transform: rotate(12deg);\n  }\n  40%, 100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}';
function css() {
  const dcp = DEFAULT_CSS_PREFIX;
  const drc = DEFAULT_REPLACEMENT_CLASS;
  const fp = config.cssPrefix;
  const rc = config.replacementClass;
  let s2 = baseStyles;
  if (fp !== dcp || rc !== drc) {
    const dPatt = new RegExp("\\.".concat(dcp, "\\-"), "g");
    const customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), "g");
    const rPatt = new RegExp("\\.".concat(drc), "g");
    s2 = s2.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }
  return s2;
}
let _cssInserted = false;
function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}
var InjectCSS = {
  mixout() {
    return {
      dom: {
        css,
        insertCss: ensureCss
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        ensureCss();
      },
      beforeI2svg() {
        ensureCss();
      }
    };
  }
};
const w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];
const functions = [];
const listener = function() {
  DOCUMENT.removeEventListener("DOMContentLoaded", listener);
  loaded = 1;
  functions.map((fn) => fn());
};
let loaded = false;
if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener("DOMContentLoaded", listener);
}
function domready(fn) {
  if (!IS_DOM) return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}
function toHtml(abstractNodes) {
  const {
    tag,
    attributes = {},
    children = []
  } = abstractNodes;
  if (typeof abstractNodes === "string") {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(""), "</").concat(tag, ">");
  }
}
function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix,
      iconName,
      icon: mapping[prefix][iconName]
    };
  }
}
var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject), length = keys.length, iterator = fn, i, key, result;
  if (initialValue === void 0) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }
  return result;
};
function ucs2decode(string) {
  const output = [];
  let counter2 = 0;
  const length = string.length;
  while (counter2 < length) {
    const value = string.charCodeAt(counter2++);
    if (value >= 55296 && value <= 56319 && counter2 < length) {
      const extra = string.charCodeAt(counter2++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter2--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function toHex(unicode) {
  const decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index) {
  const size = string.length;
  let first = string.charCodeAt(index);
  let second;
  if (first >= 55296 && first <= 56319 && size > index + 1) {
    second = string.charCodeAt(index + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function normalizeIcons(icons) {
  return Object.keys(icons).reduce((acc, iconName) => {
    const icon2 = icons[iconName];
    const expanded = !!icon2.icon;
    if (expanded) {
      acc[icon2.iconName] = icon2.icon;
    } else {
      acc[iconName] = icon2;
    }
    return acc;
  }, {});
}
function defineIcons(prefix, icons) {
  let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks = false
  } = params;
  const normalized = normalizeIcons(icons);
  if (typeof namespace.hooks.addPack === "function" && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = _objectSpread2$1(_objectSpread2$1({}, namespace.styles[prefix] || {}), normalized);
  }
  if (prefix === "fas") {
    defineIcons("fa", icons);
  }
}
const {
  styles,
  shims
} = namespace;
const FAMILY_NAMES = Object.keys(PREFIX_TO_LONG_STYLE);
const PREFIXES_FOR_FAMILY = FAMILY_NAMES.reduce((acc, familyId) => {
  acc[familyId] = Object.keys(PREFIX_TO_LONG_STYLE[familyId]);
  return acc;
}, {});
let _defaultUsablePrefix = null;
let _byUnicode = {};
let _byLigature = {};
let _byOldName = {};
let _byOldUnicode = {};
let _byAlias = {};
function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}
function getIconName(cssPrefix, cls) {
  const parts = cls.split("-");
  const prefix = parts[0];
  const iconName = parts.slice(1).join("-");
  if (prefix === cssPrefix && iconName !== "" && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
const build = () => {
  const lookup = (reducer) => {
    return reduce(styles, (o$$1, style, prefix) => {
      o$$1[prefix] = reduce(style, reducer, {});
      return o$$1;
    }, {});
  };
  _byUnicode = lookup((acc, icon2, iconName) => {
    if (icon2[3]) {
      acc[icon2[3]] = iconName;
    }
    if (icon2[2]) {
      const aliases = icon2[2].filter((a$$1) => {
        return typeof a$$1 === "number";
      });
      aliases.forEach((alias) => {
        acc[alias.toString(16)] = iconName;
      });
    }
    return acc;
  });
  _byLigature = lookup((acc, icon2, iconName) => {
    acc[iconName] = iconName;
    if (icon2[2]) {
      const aliases = icon2[2].filter((a$$1) => {
        return typeof a$$1 === "string";
      });
      aliases.forEach((alias) => {
        acc[alias] = iconName;
      });
    }
    return acc;
  });
  _byAlias = lookup((acc, icon2, iconName) => {
    const aliases = icon2[2];
    acc[iconName] = iconName;
    aliases.forEach((alias) => {
      acc[alias] = iconName;
    });
    return acc;
  });
  const hasRegular = "far" in styles || config.autoFetchSvg;
  const shimLookups = reduce(shims, (acc, shim) => {
    const maybeNameMaybeUnicode = shim[0];
    let prefix = shim[1];
    const iconName = shim[2];
    if (prefix === "far" && !hasRegular) {
      prefix = "fas";
    }
    if (typeof maybeNameMaybeUnicode === "string") {
      acc.names[maybeNameMaybeUnicode] = {
        prefix,
        iconName
      };
    }
    if (typeof maybeNameMaybeUnicode === "number") {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix,
        iconName
      };
    }
    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
    family: config.familyDefault
  });
};
onChange((c$$1) => {
  _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
    family: config.familyDefault
  });
});
build();
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  const oldUnicode = _byOldUnicode[unicode];
  const newUnicode = byUnicode("fas", unicode);
  return oldUnicode || (newUnicode ? {
    prefix: "fas",
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
const emptyCanonicalIcon = () => {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function getFamilyId(values) {
  let family = s;
  const famProps = FAMILY_NAMES.reduce((acc, familyId) => {
    acc[familyId] = "".concat(config.cssPrefix, "-").concat(familyId);
    return acc;
  }, {});
  L.forEach((familyId) => {
    if (values.includes(famProps[familyId]) || values.some((v$$1) => PREFIXES_FOR_FAMILY[familyId].includes(v$$1))) {
      family = familyId;
    }
  });
  return family;
}
function getCanonicalPrefix(styleOrPrefix) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family = s
  } = params;
  const style = PREFIX_TO_STYLE[family][styleOrPrefix];
  if (family === t && !styleOrPrefix) {
    return "fad";
  }
  const prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
  const defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  const result = prefix || defined || null;
  return result;
}
function moveNonFaClassesToRest(classNames) {
  let rest = [];
  let iconName = null;
  classNames.forEach((cls) => {
    const result = getIconName(config.cssPrefix, cls);
    if (result) {
      iconName = result;
    } else if (cls) {
      rest.push(cls);
    }
  });
  return {
    iconName,
    rest
  };
}
function sortedUniqueValues(arr) {
  return arr.sort().filter((value, index, arr2) => {
    return arr2.indexOf(value) === index;
  });
}
function getCanonicalIcon(values) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups = false
  } = params;
  let givenPrefix = null;
  const faCombinedClasses = Ia.concat(bt$1);
  const faStyleOrFamilyClasses = sortedUniqueValues(values.filter((cls) => faCombinedClasses.includes(cls)));
  const nonStyleOrFamilyClasses = sortedUniqueValues(values.filter((cls) => !Ia.includes(cls)));
  const faStyles = faStyleOrFamilyClasses.filter((cls) => {
    givenPrefix = cls;
    return !P.includes(cls);
  });
  const [styleFromValues = null] = faStyles;
  const family = getFamilyId(faStyleOrFamilyClasses);
  const canonical = _objectSpread2$1(_objectSpread2$1({}, moveNonFaClassesToRest(nonStyleOrFamilyClasses)), {}, {
    prefix: getCanonicalPrefix(styleFromValues, {
      family
    })
  });
  return _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, canonical), getDefaultCanonicalPrefix({
    values,
    family,
    styles,
    config,
    canonical,
    givenPrefix
  })), applyShimAndAlias(skipLookups, givenPrefix, canonical));
}
function applyShimAndAlias(skipLookups, givenPrefix, canonical) {
  let {
    prefix,
    iconName
  } = canonical;
  if (skipLookups || !prefix || !iconName) {
    return {
      prefix,
      iconName
    };
  }
  const shim = givenPrefix === "fa" ? byOldName(iconName) : {};
  const aliasIconName = byAlias(prefix, iconName);
  iconName = shim.iconName || aliasIconName || iconName;
  prefix = shim.prefix || prefix;
  if (prefix === "far" && !styles["far"] && styles["fas"] && !config.autoFetchSvg) {
    prefix = "fas";
  }
  return {
    prefix,
    iconName
  };
}
const newCanonicalFamilies = L.filter((familyId) => {
  return familyId !== s || familyId !== t;
});
const newCanonicalStyles = Object.keys(ga).filter((key) => key !== s).map((key) => Object.keys(ga[key])).flat();
function getDefaultCanonicalPrefix(prefixOptions) {
  const {
    values,
    family,
    canonical,
    givenPrefix = "",
    styles: styles2 = {},
    config: config$$1 = {}
  } = prefixOptions;
  const isDuotoneFamily = family === t;
  const valuesHasDuotone = values.includes("fa-duotone") || values.includes("fad");
  const defaultFamilyIsDuotone = config$$1.familyDefault === "duotone";
  const canonicalPrefixIsDuotone = canonical.prefix === "fad" || canonical.prefix === "fa-duotone";
  if (!isDuotoneFamily && (valuesHasDuotone || defaultFamilyIsDuotone || canonicalPrefixIsDuotone)) {
    canonical.prefix = "fad";
  }
  if (values.includes("fa-brands") || values.includes("fab")) {
    canonical.prefix = "fab";
  }
  if (!canonical.prefix && newCanonicalFamilies.includes(family)) {
    const validPrefix = Object.keys(styles2).find((key) => newCanonicalStyles.includes(key));
    if (validPrefix || config$$1.autoFetchSvg) {
      const defaultPrefix = pt.get(family).defaultShortPrefixId;
      canonical.prefix = defaultPrefix;
      canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
    }
  }
  if (canonical.prefix === "fa" || givenPrefix === "fa") {
    canonical.prefix = getDefaultUsablePrefix() || "fas";
  }
  return canonical;
}
class Library {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
      definitions[_key] = arguments[_key];
    }
    const additions = definitions.reduce(this._pullDefinitions, {});
    Object.keys(additions).forEach((key) => {
      this.definitions[key] = _objectSpread2$1(_objectSpread2$1({}, this.definitions[key] || {}), additions[key]);
      defineIcons(key, additions[key]);
      const longPrefix = PREFIX_TO_LONG_STYLE[s][key];
      if (longPrefix) defineIcons(longPrefix, additions[key]);
      build();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(additions, definition) {
    const normalized = definition.prefix && definition.iconName && definition.icon ? {
      0: definition
    } : definition;
    Object.keys(normalized).map((key) => {
      const {
        prefix,
        iconName,
        icon: icon2
      } = normalized[key];
      const aliases = icon2[2];
      if (!additions[prefix]) additions[prefix] = {};
      if (aliases.length > 0) {
        aliases.forEach((alias) => {
          if (typeof alias === "string") {
            additions[prefix][alias] = icon2;
          }
        });
      }
      additions[prefix][iconName] = icon2;
    });
    return additions;
  }
}
let _plugins = [];
let _hooks = {};
const providers = {};
const defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref) {
  let {
    mixoutsTo: obj
  } = _ref;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach((k) => {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });
  _plugins.forEach((plugin) => {
    const mixout = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout).forEach((tk) => {
      if (typeof mixout[tk] === "function") {
        obj[tk] = mixout[tk];
      }
      if (typeof mixout[tk] === "object") {
        Object.keys(mixout[tk]).forEach((sk) => {
          if (!obj[tk]) {
            obj[tk] = {};
          }
          obj[tk][sk] = mixout[tk][sk];
        });
      }
    });
    if (plugin.hooks) {
      const hooks = plugin.hooks();
      Object.keys(hooks).forEach((hook) => {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }
        _hooks[hook].push(hooks[hook]);
      });
    }
    if (plugin.provides) {
      plugin.provides(providers);
    }
  });
  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach((hookFn) => {
    accumulator = hookFn.apply(null, [accumulator, ...args]);
  });
  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  const hookFns = _hooks[hook] || [];
  hookFns.forEach((hookFn) => {
    hookFn.apply(null, args);
  });
  return void 0;
}
function callProvided() {
  const hook = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : void 0;
}
function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === "fa") {
    iconLookup.prefix = "fas";
  }
  let {
    iconName
  } = iconLookup;
  const prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName) return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
const library = new Library();
const noAuto = () => {
  config.autoReplaceSvg = false;
  config.observeMutations = false;
  callHooks("noAuto");
};
const dom = {
  i2svg: function() {
    let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (IS_DOM) {
      callHooks("beforeI2svg", params);
      callProvided("pseudoElements2svg", params);
      return callProvided("i2svg", params);
    } else {
      return Promise.reject(new Error("Operation requires a DOM of some kind."));
    }
  },
  watch: function() {
    let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      autoReplaceSvgRoot
    } = params;
    if (config.autoReplaceSvg === false) {
      config.autoReplaceSvg = true;
    }
    config.observeMutations = true;
    domready(() => {
      autoReplace({
        autoReplaceSvgRoot
      });
      callHooks("watch", params);
    });
  }
};
const parse = {
  icon: (icon2) => {
    if (icon2 === null) {
      return null;
    }
    if (typeof icon2 === "object" && icon2.prefix && icon2.iconName) {
      return {
        prefix: icon2.prefix,
        iconName: byAlias(icon2.prefix, icon2.iconName) || icon2.iconName
      };
    }
    if (Array.isArray(icon2) && icon2.length === 2) {
      const iconName = icon2[1].indexOf("fa-") === 0 ? icon2[1].slice(3) : icon2[1];
      const prefix = getCanonicalPrefix(icon2[0]);
      return {
        prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }
    if (typeof icon2 === "string" && (icon2.indexOf("".concat(config.cssPrefix, "-")) > -1 || icon2.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      const canonicalIcon = getCanonicalIcon(icon2.split(" "), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }
    if (typeof icon2 === "string") {
      const prefix = getDefaultUsablePrefix();
      return {
        prefix,
        iconName: byAlias(prefix, icon2) || icon2
      };
    }
  }
};
const api = {
  noAuto,
  config,
  dom,
  parse,
  library,
  findIconDefinition,
  toHtml
};
const autoReplace = function() {
  let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    autoReplaceSvgRoot = DOCUMENT
  } = params;
  if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
    node: autoReplaceSvgRoot
  });
};
function domVariants(val, abstractCreator) {
  Object.defineProperty(val, "abstract", {
    get: abstractCreator
  });
  Object.defineProperty(val, "html", {
    get: function() {
      return val.abstract.map((a) => toHtml(a));
    }
  });
  Object.defineProperty(val, "node", {
    get: function() {
      if (!IS_DOM) return;
      const container = DOCUMENT.createElement("div");
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}
function asIcon(_ref) {
  let {
    children,
    main,
    mask,
    attributes,
    styles: styles2,
    transform
  } = _ref;
  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    const {
      width,
      height
    } = main;
    const offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes["style"] = joinStyles(_objectSpread2$1(_objectSpread2$1({}, styles2), {}, {
      "transform-origin": "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes,
    children
  }];
}
function asSymbol(_ref) {
  let {
    prefix,
    iconName,
    children,
    attributes,
    symbol
  } = _ref;
  const id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: _objectSpread2$1(_objectSpread2$1({}, attributes), {}, {
        id
      }),
      children
    }]
  }];
}
function makeInlineSvgAbstract(params) {
  const {
    icons: {
      main,
      mask
    },
    prefix,
    iconName,
    transform,
    symbol,
    title,
    maskId,
    titleId,
    extra,
    watchable = false
  } = params;
  const {
    width,
    height
  } = mask.found ? mask : main;
  const isUploadedIcon = Lt.includes(prefix);
  const attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ""].filter((c$$1) => extra.classes.indexOf(c$$1) === -1).filter((c$$1) => c$$1 !== "" || !!c$$1).concat(extra.classes).join(" ");
  let content = {
    children: [],
    attributes: _objectSpread2$1(_objectSpread2$1({}, extra.attributes), {}, {
      "data-prefix": prefix,
      "data-icon": iconName,
      "class": attrClass,
      "role": extra.attributes.role || "img",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 ".concat(width, " ").concat(height)
    })
  };
  const uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf("fa-fw") ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};
  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = "";
  }
  if (title) {
    content.children.push({
      tag: "title",
      attributes: {
        id: content.attributes["aria-labelledby"] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }
  const args = _objectSpread2$1(_objectSpread2$1({}, content), {}, {
    prefix,
    iconName,
    main,
    mask,
    maskId,
    transform,
    symbol,
    styles: _objectSpread2$1(_objectSpread2$1({}, uploadedIconWidthStyle), extra.styles)
  });
  const {
    children,
    attributes
  } = mask.found && main.found ? callProvided("generateAbstractMask", args) || {
    children: [],
    attributes: {}
  } : callProvided("generateAbstractIcon", args) || {
    children: [],
    attributes: {}
  };
  args.children = children;
  args.attributes = attributes;
  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  const {
    content,
    width,
    height,
    transform,
    title,
    extra,
    watchable = false
  } = params;
  const attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    "title": title
  } : {}), {}, {
    "class": extra.classes.join(" ")
  });
  if (watchable) {
    attributes[DATA_FA_I2SVG] = "";
  }
  const styles2 = _objectSpread2$1({}, extra.styles);
  if (transformIsMeaningful(transform)) {
    styles2["transform"] = transformForCss({
      transform,
      startCentered: true,
      width,
      height
    });
    styles2["-webkit-transform"] = styles2["transform"];
  }
  const styleString = joinStyles(styles2);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  const val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
function makeLayersCounterAbstract(params) {
  const {
    content,
    title,
    extra
  } = params;
  const attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    "title": title
  } : {}), {}, {
    "class": extra.classes.join(" ")
  });
  const styleString = joinStyles(extra.styles);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  const val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
const {
  styles: styles$1
} = namespace;
function asFoundIcon(icon2) {
  const width = icon2[0];
  const height = icon2[1];
  const [vectorData] = icon2.slice(4);
  let element = null;
  if (Array.isArray(vectorData)) {
    element = {
      tag: "g",
      attributes: {
        class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: "path",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: "currentColor",
          d: vectorData[0]
        }
      }, {
        tag: "path",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: "currentColor",
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: "path",
      attributes: {
        fill: "currentColor",
        d: vectorData
      }
    };
  }
  return {
    found: true,
    width,
    height,
    icon: element
  };
}
const missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};
function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION$1 && !config.showMissingIcons && iconName) {
    console.error('Icon with name "'.concat(iconName, '" and prefix "').concat(prefix, '" is missing.'));
  }
}
function findIcon(iconName, prefix) {
  let givenPrefix = prefix;
  if (prefix === "fa" && config.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }
  return new Promise((resolve, reject) => {
    if (givenPrefix === "fa") {
      const shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }
    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      const icon2 = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon2));
    }
    maybeNotifyMissing(iconName, prefix);
    resolve(_objectSpread2$1(_objectSpread2$1({}, missingIconResolutionMixin), {}, {
      icon: config.showMissingIcons && iconName ? callProvided("missingIconAbstract") || {} : {}
    }));
  });
}
const noop$1 = () => {
};
const p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
const preamble = 'FA "6.7.2"';
const begin = (name) => {
  p$2.mark("".concat(preamble, " ").concat(name, " begins"));
  return () => end(name);
};
const end = (name) => {
  p$2.mark("".concat(preamble, " ").concat(name, " ends"));
  p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};
var perf = {
  begin,
  end
};
const noop$2 = () => {
};
function isWatched(node) {
  const i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg === "string";
}
function hasPrefixAndIcon(node) {
  const prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  const icon2 = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon2;
}
function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
}
function getMutator() {
  if (config.autoReplaceSvg === true) {
    return mutators.replace;
  }
  const mutator = mutators[config.autoReplaceSvg];
  return mutator || mutators.replace;
}
function createElementNS(tag) {
  return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", tag);
}
function createElement(tag) {
  return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn = abstractObj.tag === "svg" ? createElementNS : createElement
  } = params;
  if (typeof abstractObj === "string") {
    return DOCUMENT.createTextNode(abstractObj);
  }
  const tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function(key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  const children = abstractObj.children || [];
  children.forEach(function(child) {
    tag.appendChild(convertSVG(child, {
      ceFn
    }));
  });
  return tag;
}
function nodeAsComment(node) {
  let comment = " ".concat(node.outerHTML, " ");
  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  return comment;
}
const mutators = {
  replace: function(mutation) {
    const node = mutation[0];
    if (node.parentNode) {
      mutation[1].forEach((abstract) => {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });
      if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
        let comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function(mutation) {
    const node = mutation[0];
    const abstract = mutation[1];
    if (~classArray(node).indexOf(config.replacementClass)) {
      return mutators.replace(mutation);
    }
    const forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
    delete abstract[0].attributes.id;
    if (abstract[0].attributes.class) {
      const splitClasses = abstract[0].attributes.class.split(" ").reduce((acc, cls) => {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }
        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(" ");
      if (splitClasses.toNode.length === 0) {
        node.removeAttribute("class");
      } else {
        node.setAttribute("class", splitClasses.toNode.join(" "));
      }
    }
    const newInnerHTML = abstract.map((a) => toHtml(a)).join("\n");
    node.setAttribute(DATA_FA_I2SVG, "");
    node.innerHTML = newInnerHTML;
  }
};
function performOperationSync(op) {
  op();
}
function perform(mutations, callback) {
  const callbackFunction = typeof callback === "function" ? callback : noop$2;
  if (mutations.length === 0) {
    callbackFunction();
  } else {
    let frame = performOperationSync;
    if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }
    frame(() => {
      const mutator = getMutator();
      const mark = perf.begin("mutate");
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
let disabled = false;
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
let mo = null;
function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }
  if (!config.observeMutations) {
    return;
  }
  const {
    treeCallback = noop$2,
    nodeCallback = noop$2,
    pseudoElementsCallback = noop$2,
    observeMutationsRoot = DOCUMENT
  } = options;
  mo = new MUTATION_OBSERVER((objects) => {
    if (disabled) return;
    const defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach((mutationRecord) => {
      if (mutationRecord.type === "childList" && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }
        treeCallback(mutationRecord.target);
      }
      if (mutationRecord.type === "attributes" && mutationRecord.target.parentNode && config.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }
      if (mutationRecord.type === "attributes" && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === "class" && hasPrefixAndIcon(mutationRecord.target)) {
          const {
            prefix,
            iconName
          } = getCanonicalIcon(classArray(mutationRecord.target));
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM) return;
  mo.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo) return;
  mo.disconnect();
}
function styleParser(node) {
  const style = node.getAttribute("style");
  let val = [];
  if (style) {
    val = style.split(";").reduce((acc, style2) => {
      const styles2 = style2.split(":");
      const prop = styles2[0];
      const value = styles2.slice(1);
      if (prop && value.length > 0) {
        acc[prop] = value.join(":").trim();
      }
      return acc;
    }, {});
  }
  return val;
}
function classParser(node) {
  const existingPrefix = node.getAttribute("data-prefix");
  const existingIconName = node.getAttribute("data-icon");
  const innerText = node.innerText !== void 0 ? node.innerText.trim() : "";
  let val = getCanonicalIcon(classArray(node));
  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }
  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }
  if (val.iconName && val.prefix) {
    return val;
  }
  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }
  if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
    val.iconName = node.firstChild.data;
  }
  return val;
}
function attributesParser(node) {
  const extraAttributes = toArray(node.attributes).reduce((acc, attr) => {
    if (acc.name !== "class" && acc.name !== "style") {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});
  const title = node.getAttribute("title");
  const titleId = node.getAttribute("data-fa-title-id");
  if (config.autoA11y) {
    if (title) {
      extraAttributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes["aria-hidden"] = "true";
      extraAttributes["focusable"] = "false";
    }
  }
  return extraAttributes;
}
function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  let parser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: true
  };
  const {
    iconName,
    prefix,
    rest: extraClasses
  } = classParser(node);
  const extraAttributes = attributesParser(node);
  const pluginMeta = chainHooks("parseNodeAttributes", {}, node);
  let extraStyles = parser.styleParser ? styleParser(node) : [];
  return _objectSpread2$1({
    iconName,
    title: node.getAttribute("title"),
    titleId: node.getAttribute("data-fa-title-id"),
    prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  }, pluginMeta);
}
const {
  styles: styles$2
} = namespace;
function generateMutation(node) {
  const nodeMeta = config.autoReplaceSvg === "nest" ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);
  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided("generateLayersText", node, nodeMeta);
  } else {
    return callProvided("generateSvgReplacementMutation", node, nodeMeta);
  }
}
function getKnownPrefixes() {
  return [...Ft, ...Ia];
}
function onTree(root) {
  let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!IS_DOM) return Promise.resolve();
  const htmlClassList = DOCUMENT.documentElement.classList;
  const hclAdd = (suffix) => htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const hclRemove = (suffix) => htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  const prefixes = config.autoFetchSvg ? getKnownPrefixes() : P.concat(Object.keys(styles$2));
  if (!prefixes.includes("fa")) {
    prefixes.push("fa");
  }
  const prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map((p$$1) => ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])"))).join(", ");
  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }
  let candidates = [];
  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e$$1) {
  }
  if (candidates.length > 0) {
    hclAdd("pending");
    hclRemove("complete");
  } else {
    return Promise.resolve();
  }
  const mark = perf.begin("onTree");
  const mutations = candidates.reduce((acc, node) => {
    try {
      const mutation = generateMutation(node);
      if (mutation) {
        acc.push(mutation);
      }
    } catch (e$$1) {
      if (!PRODUCTION$1) {
        if (e$$1.name === "MissingIcon") {
          console.error(e$$1);
        }
      }
    }
    return acc;
  }, []);
  return new Promise((resolve, reject) => {
    Promise.all(mutations).then((resolvedMutations) => {
      perform(resolvedMutations, () => {
        hclAdd("active");
        hclAdd("complete");
        hclRemove("pending");
        if (typeof callback === "function") callback();
        mark();
        resolve();
      });
    }).catch((e$$1) => {
      mark();
      reject(e$$1);
    });
  });
}
function onNode(node) {
  let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  generateMutation(node).then((mutation) => {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}
function resolveIcons(next) {
  return function(maybeIconDefinition) {
    let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    let {
      mask
    } = params;
    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }
    return next(iconDefinition, _objectSpread2$1(_objectSpread2$1({}, params), {}, {
      mask
    }));
  };
}
const render = function(iconDefinition) {
  let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    transform = meaninglessTransform,
    symbol = false,
    mask = null,
    maskId = null,
    title = null,
    titleId = null,
    classes = [],
    attributes = {},
    styles: styles2 = {}
  } = params;
  if (!iconDefinition) return;
  const {
    prefix,
    iconName,
    icon: icon2
  } = iconDefinition;
  return domVariants(_objectSpread2$1({
    type: "icon"
  }, iconDefinition), () => {
    callHooks("beforeDOMElementCreation", {
      iconDefinition,
      params
    });
    if (config.autoA11y) {
      if (title) {
        attributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes["aria-hidden"] = "true";
        attributes["focusable"] = "false";
      }
    }
    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon2),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix,
      iconName,
      transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
      symbol,
      title,
      maskId,
      titleId,
      extra: {
        attributes,
        styles: styles2,
        classes
      }
    });
  });
};
var ReplaceElements = {
  mixout() {
    return {
      icon: resolveIcons(render)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }
    };
  },
  provides(providers$$1) {
    providers$$1.i2svg = function(params) {
      const {
        node = DOCUMENT,
        callback = () => {
        }
      } = params;
      return onTree(node, callback);
    };
    providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
      const {
        iconName,
        title,
        titleId,
        prefix,
        transform,
        symbol,
        mask,
        maskId,
        extra
      } = nodeMeta;
      return new Promise((resolve, reject) => {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then((_ref) => {
          let [main, mask2] = _ref;
          resolve([node, makeInlineSvgAbstract({
            icons: {
              main,
              mask: mask2
            },
            prefix,
            iconName,
            transform,
            symbol,
            maskId,
            title,
            titleId,
            extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };
    providers$$1.generateAbstractIcon = function(_ref2) {
      let {
        children,
        attributes,
        main,
        transform,
        styles: styles2
      } = _ref2;
      const styleString = joinStyles(styles2);
      if (styleString.length > 0) {
        attributes["style"] = styleString;
      }
      let nextChild;
      if (transformIsMeaningful(transform)) {
        nextChild = callProvided("generateAbstractTransformGrouping", {
          main,
          transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }
      children.push(nextChild || main.icon);
      return {
        children,
        attributes
      };
    };
  }
};
var Layers = {
  mixout() {
    return {
      layer(assembler) {
        let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          classes = []
        } = params;
        return domVariants({
          type: "layer"
        }, () => {
          callHooks("beforeDOMElementCreation", {
            assembler,
            params
          });
          let children = [];
          assembler((args) => {
            Array.isArray(args) ? args.map((a) => {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: "span",
            attributes: {
              class: ["".concat(config.cssPrefix, "-layers"), ...classes].join(" ")
            },
            children
          }];
        });
      }
    };
  }
};
var LayersCounter = {
  mixout() {
    return {
      counter(content) {
        let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          title = null,
          classes = [],
          attributes = {},
          styles: styles2 = {}
        } = params;
        return domVariants({
          type: "counter",
          content
        }, () => {
          callHooks("beforeDOMElementCreation", {
            content,
            params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title,
            extra: {
              attributes,
              styles: styles2,
              classes: ["".concat(config.cssPrefix, "-layers-counter"), ...classes]
            }
          });
        });
      }
    };
  }
};
var LayersText = {
  mixout() {
    return {
      text(content) {
        let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          transform = meaninglessTransform,
          title = null,
          classes = [],
          attributes = {},
          styles: styles2 = {}
        } = params;
        return domVariants({
          type: "text",
          content
        }, () => {
          callHooks("beforeDOMElementCreation", {
            content,
            params
          });
          return makeLayersTextAbstract({
            content,
            transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
            title,
            extra: {
              attributes,
              styles: styles2,
              classes: ["".concat(config.cssPrefix, "-layers-text"), ...classes]
            }
          });
        });
      }
    };
  },
  provides(providers$$1) {
    providers$$1.generateLayersText = function(node, nodeMeta) {
      const {
        title,
        transform,
        extra
      } = nodeMeta;
      let width = null;
      let height = null;
      if (IS_IE) {
        const computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        const boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }
      if (config.autoA11y && !title) {
        extra.attributes["aria-hidden"] = "true";
      }
      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width,
        height,
        transform,
        title,
        extra,
        watchable: true
      })]);
    };
  }
};
const CLEAN_CONTENT_PATTERN = new RegExp('"', "ug");
const SECONDARY_UNICODE_RANGE = [1105920, 1112319];
const _FONT_FAMILY_WEIGHT_TO_PREFIX = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, {
  FontAwesome: {
    normal: "fas",
    400: "fas"
  }
}), lt), wa), Yt);
const FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, key) => {
  acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
  return acc;
}, {});
const FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce((acc, fontFamily) => {
  const weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
  acc[fontFamily] = weights[900] || [...Object.entries(weights)][0][1];
  return acc;
}, {});
function hexValueFromContent(content) {
  const cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
  const codePoint = codePointAt(cleaned, 0);
  const isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  const isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function getPrefix(fontFamily, fontWeight) {
  const fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, "").toLowerCase();
  const fontWeightInteger = parseInt(fontWeight);
  const fontWeightSanitized = isNaN(fontWeightInteger) ? "normal" : fontWeightInteger;
  return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
}
function replaceForPosition(node, position) {
  const pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(":", "-"));
  return new Promise((resolve, reject) => {
    if (node.getAttribute(pendingAttribute) !== null) {
      return resolve();
    }
    const children = toArray(node.children);
    const alreadyProcessedPseudoElement = children.filter((c$$1) => c$$1.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position)[0];
    const styles2 = WINDOW.getComputedStyle(node, position);
    const fontFamily = styles2.getPropertyValue("font-family");
    const fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
    const fontWeight = styles2.getPropertyValue("font-weight");
    const content = styles2.getPropertyValue("content");
    if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamilyMatch && content !== "none" && content !== "") {
      const content2 = styles2.getPropertyValue("content");
      let prefix = getPrefix(fontFamily, fontWeight);
      const {
        value: hexValue,
        isSecondary
      } = hexValueFromContent(content2);
      const isV4 = fontFamilyMatch[0].startsWith("FontAwesome");
      let iconName = byUnicode(prefix, hexValue);
      let iconIdentifier = iconName;
      if (isV4) {
        const iconName4 = byOldUnicode(hexValue);
        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      }
      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);
        if (alreadyProcessedPseudoElement) {
          node.removeChild(alreadyProcessedPseudoElement);
        }
        const meta = blankMeta();
        const {
          extra
        } = meta;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then((main) => {
          const abstract = makeInlineSvgAbstract(_objectSpread2$1(_objectSpread2$1({}, meta), {}, {
            icons: {
              main,
              mask: emptyCanonicalIcon()
            },
            prefix,
            iconName: iconIdentifier,
            extra,
            watchable: true
          }));
          const element = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg");
          if (position === "::before") {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }
          element.outerHTML = abstract.map((a$$1) => toHtml(a$$1)).join("\n");
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}
function replace(node) {
  return Promise.all([replaceForPosition(node, "::before"), replaceForPosition(node, "::after")]);
}
function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== "svg");
}
function searchPseudoElements(root) {
  if (!IS_DOM) return;
  return new Promise((resolve, reject) => {
    const operations = toArray(root.querySelectorAll("*")).filter(processable).map(replace);
    const end2 = perf.begin("searchPseudoElements");
    disableObservation();
    Promise.all(operations).then(() => {
      end2();
      enableObservation();
      resolve();
    }).catch(() => {
      end2();
      enableObservation();
      reject();
    });
  });
}
var PseudoElements = {
  hooks() {
    return {
      mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }
    };
  },
  provides(providers2) {
    providers2.pseudoElements2svg = function(params) {
      const {
        node = DOCUMENT
      } = params;
      if (config.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }
};
let _unwatched = false;
var MutationObserver$1 = {
  mixout() {
    return {
      dom: {
        unwatch() {
          disableObservation();
          _unwatched = true;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        observe(chainHooks("mutationObserverCallbacks", {}));
      },
      noAuto() {
        disconnect();
      },
      watch(params) {
        const {
          observeMutationsRoot
        } = params;
        if (_unwatched) {
          enableObservation();
        } else {
          observe(chainHooks("mutationObserverCallbacks", {
            observeMutationsRoot
          }));
        }
      }
    };
  }
};
const parseTransformString = (transformString) => {
  let transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(" ").reduce((acc, n) => {
    const parts = n.toLowerCase().split("-");
    const first = parts[0];
    let rest = parts.slice(1).join("-");
    if (first && rest === "h") {
      acc.flipX = true;
      return acc;
    }
    if (first && rest === "v") {
      acc.flipY = true;
      return acc;
    }
    rest = parseFloat(rest);
    if (isNaN(rest)) {
      return acc;
    }
    switch (first) {
      case "grow":
        acc.size = acc.size + rest;
        break;
      case "shrink":
        acc.size = acc.size - rest;
        break;
      case "left":
        acc.x = acc.x - rest;
        break;
      case "right":
        acc.x = acc.x + rest;
        break;
      case "up":
        acc.y = acc.y - rest;
        break;
      case "down":
        acc.y = acc.y + rest;
        break;
      case "rotate":
        acc.rotate = acc.rotate + rest;
        break;
    }
    return acc;
  }, transform);
};
var PowerTransforms = {
  mixout() {
    return {
      parse: {
        transform: (transformString) => {
          return parseTransformString(transformString);
        }
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const transformString = node.getAttribute("data-fa-transform");
        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }
        return accumulator;
      }
    };
  },
  provides(providers2) {
    providers2.generateAbstractTransformGrouping = function(_ref) {
      let {
        main,
        transform,
        containerWidth,
        iconWidth
      } = _ref;
      const outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      const innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      const innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      const innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      const inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      const path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      const operations = {
        outer,
        inner,
        path
      };
      return {
        tag: "g",
        attributes: _objectSpread2$1({}, operations.outer),
        children: [{
          tag: "g",
          attributes: _objectSpread2$1({}, operations.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread2$1(_objectSpread2$1({}, main.icon.attributes), operations.path)
          }]
        }]
      };
    };
  }
};
const ALL_SPACE = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function fillBlack(abstract) {
  let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = "black";
  }
  return abstract;
}
function deGroup(abstract) {
  if (abstract.tag === "g") {
    return abstract.children;
  } else {
    return [abstract];
  }
}
var Masks = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const maskData = node.getAttribute("data-fa-mask");
        const mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(" ").map((i) => i.trim()));
        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }
        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute("data-fa-mask-id");
        return accumulator;
      }
    };
  },
  provides(providers2) {
    providers2.generateAbstractMask = function(_ref) {
      let {
        children,
        attributes,
        main,
        mask,
        maskId: explicitMaskId,
        transform
      } = _ref;
      const {
        width: mainWidth,
        icon: mainPath
      } = main;
      const {
        width: maskWidth,
        icon: maskPath
      } = mask;
      const trans = transformForSvg({
        transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      const maskRect = {
        tag: "rect",
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          fill: "white"
        })
      };
      const maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      const maskInnerGroup = {
        tag: "g",
        attributes: _objectSpread2$1({}, trans.inner),
        children: [fillBlack(_objectSpread2$1({
          tag: mainPath.tag,
          attributes: _objectSpread2$1(_objectSpread2$1({}, mainPath.attributes), trans.path)
        }, maskInnerGroupChildrenMixin))]
      };
      const maskOuterGroup = {
        tag: "g",
        attributes: _objectSpread2$1({}, trans.outer),
        children: [maskInnerGroup]
      };
      const maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      const clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      const maskTag = {
        tag: "mask",
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          id: maskId,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [maskRect, maskOuterGroup]
      };
      const defs = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: "rect",
        attributes: _objectSpread2$1({
          fill: "currentColor",
          "clip-path": "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")")
        }, ALL_SPACE)
      });
      return {
        children,
        attributes
      };
    };
  }
};
var MissingIconIndicator = {
  provides(providers2) {
    let reduceMotion = false;
    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    providers2.missingIconAbstract = function() {
      const gChildren = [];
      const FILL = {
        fill: "currentColor"
      };
      const ANIMATION_BASE = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      gChildren.push({
        tag: "path",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      const OPACITY_ANIMATE = _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
        attributeName: "opacity"
      });
      const dot = {
        tag: "circle",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      if (!reduceMotion) {
        dot.children.push({
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
            attributeName: "r",
            values: "28;14;28;28;14;28;"
          })
        }, {
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: "1;0;1;1;0;1;"
          })
        });
      }
      gChildren.push(dot);
      gChildren.push({
        tag: "path",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: reduceMotion ? [] : [{
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      });
      if (!reduceMotion) {
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
            opacity: "0",
            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
          }),
          children: [{
            tag: "animate",
            attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
              values: "0;0;1;1;0;0;"
            })
          }]
        });
      }
      return {
        tag: "g",
        attributes: {
          "class": "missing"
        },
        children: gChildren
      };
    };
  }
};
var SvgSymbols = {
  hooks() {
    return {
      parseNodeAttributes(accumulator, node) {
        const symbolData = node.getAttribute("data-fa-symbol");
        const symbol = symbolData === null ? false : symbolData === "" ? true : symbolData;
        accumulator["symbol"] = symbol;
        return accumulator;
      }
    };
  }
};
var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
registerPlugins(plugins, {
  mixoutsTo: api
});
api.noAuto;
api.config;
const library$1 = api.library;
api.dom;
const parse$1 = api.parse;
api.findIconDefinition;
api.toHtml;
const icon = api.icon;
api.layer;
api.text;
api.counter;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var humps$1 = { exports: {} };
(function(module) {
  (function(global2) {
    var _processKeys = function(convert2, obj, options) {
      if (!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
        return obj;
      }
      var output, i = 0, l = 0;
      if (_isArray(obj)) {
        output = [];
        for (l = obj.length; i < l; i++) {
          output.push(_processKeys(convert2, obj[i], options));
        }
      } else {
        output = {};
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            output[convert2(key, options)] = _processKeys(convert2, obj[key], options);
          }
        }
      }
      return output;
    };
    var separateWords = function(string, options) {
      options = options || {};
      var separator = options.separator || "_";
      var split = options.split || /(?=[A-Z])/;
      return string.split(split).join(separator);
    };
    var camelize = function(string) {
      if (_isNumerical(string)) {
        return string;
      }
      string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : "";
      });
      return string.substr(0, 1).toLowerCase() + string.substr(1);
    };
    var pascalize = function(string) {
      var camelized = camelize(string);
      return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
    };
    var decamelize = function(string, options) {
      return separateWords(string, options).toLowerCase();
    };
    var toString = Object.prototype.toString;
    var _isFunction = function(obj) {
      return typeof obj === "function";
    };
    var _isObject = function(obj) {
      return obj === Object(obj);
    };
    var _isArray = function(obj) {
      return toString.call(obj) == "[object Array]";
    };
    var _isDate = function(obj) {
      return toString.call(obj) == "[object Date]";
    };
    var _isRegExp = function(obj) {
      return toString.call(obj) == "[object RegExp]";
    };
    var _isBoolean = function(obj) {
      return toString.call(obj) == "[object Boolean]";
    };
    var _isNumerical = function(obj) {
      obj = obj - 0;
      return obj === obj;
    };
    var _processor = function(convert2, options) {
      var callback = options && "process" in options ? options.process : options;
      if (typeof callback !== "function") {
        return convert2;
      }
      return function(string, options2) {
        return callback(string, convert2, options2);
      };
    };
    var humps2 = {
      camelize,
      decamelize,
      pascalize,
      depascalize: decamelize,
      camelizeKeys: function(object, options) {
        return _processKeys(_processor(camelize, options), object);
      },
      decamelizeKeys: function(object, options) {
        return _processKeys(_processor(decamelize, options), object, options);
      },
      pascalizeKeys: function(object, options) {
        return _processKeys(_processor(pascalize, options), object);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    if (module.exports) {
      module.exports = humps2;
    } else {
      global2.humps = humps2;
    }
  })(commonjsGlobal);
})(humps$1);
var humps = humps$1.exports;
var _excluded = ["class", "style"];
function styleToObject(style) {
  return style.split(";").map(function(s) {
    return s.trim();
  }).filter(function(s) {
    return s;
  }).reduce(function(output, pair) {
    var idx = pair.indexOf(":");
    var prop = humps.camelize(pair.slice(0, idx));
    var value = pair.slice(idx + 1).trim();
    output[prop] = value;
    return output;
  }, {});
}
function classToObject(classes) {
  return classes.split(/\s+/).reduce(function(output, className) {
    output[className] = true;
    return output;
  }, {});
}
function convert(abstractElement) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof abstractElement === "string") {
    return abstractElement;
  }
  var children = (abstractElement.children || []).map(function(child) {
    return convert(child);
  });
  var mixins = Object.keys(abstractElement.attributes || {}).reduce(function(mixins2, key) {
    var value = abstractElement.attributes[key];
    switch (key) {
      case "class":
        mixins2.class = classToObject(value);
        break;
      case "style":
        mixins2.style = styleToObject(value);
        break;
      default:
        mixins2.attrs[key] = value;
    }
    return mixins2;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  attrs.class;
  var _attrs$style = attrs.style, aStyle = _attrs$style === void 0 ? {} : _attrs$style, otherAttrs = _objectWithoutProperties(attrs, _excluded);
  return h$1(abstractElement.tag, _objectSpread2(_objectSpread2(_objectSpread2({}, props), {}, {
    class: mixins.class,
    style: _objectSpread2(_objectSpread2({}, mixins.style), aStyle)
  }, mixins.attrs), otherAttrs), children);
}
var PRODUCTION = false;
try {
  PRODUCTION = true;
} catch (e) {
}
function log() {
  if (!PRODUCTION && console && typeof console.error === "function") {
    var _console;
    (_console = console).error.apply(_console, arguments);
  }
}
function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}
function classList(props) {
  var _classes;
  var classes = (_classes = {
    "fa-spin": props.spin,
    "fa-pulse": props.pulse,
    "fa-fw": props.fixedWidth,
    "fa-border": props.border,
    "fa-li": props.listItem,
    "fa-inverse": props.inverse,
    "fa-flip": props.flip === true,
    "fa-flip-horizontal": props.flip === "horizontal" || props.flip === "both",
    "fa-flip-vertical": props.flip === "vertical" || props.flip === "both"
  }, _defineProperty(_classes, "fa-".concat(props.size), props.size !== null), _defineProperty(_classes, "fa-rotate-".concat(props.rotation), props.rotation !== null), _defineProperty(_classes, "fa-pull-".concat(props.pull), props.pull !== null), _defineProperty(_classes, "fa-swap-opacity", props.swapOpacity), _defineProperty(_classes, "fa-bounce", props.bounce), _defineProperty(_classes, "fa-shake", props.shake), _defineProperty(_classes, "fa-beat", props.beat), _defineProperty(_classes, "fa-fade", props.fade), _defineProperty(_classes, "fa-beat-fade", props.beatFade), _defineProperty(_classes, "fa-flash", props.flash), _defineProperty(_classes, "fa-spin-pulse", props.spinPulse), _defineProperty(_classes, "fa-spin-reverse", props.spinReverse), _classes);
  return Object.keys(classes).map(function(key) {
    return classes[key] ? key : null;
  }).filter(function(key) {
    return key;
  });
}
function normalizeIconArgs(icon2) {
  if (icon2 && _typeof(icon2) === "object" && icon2.prefix && icon2.iconName && icon2.icon) {
    return icon2;
  }
  if (parse$1.icon) {
    return parse$1.icon(icon2);
  }
  if (icon2 === null) {
    return null;
  }
  if (_typeof(icon2) === "object" && icon2.prefix && icon2.iconName) {
    return icon2;
  }
  if (Array.isArray(icon2) && icon2.length === 2) {
    return {
      prefix: icon2[0],
      iconName: icon2[1]
    };
  }
  if (typeof icon2 === "string") {
    return {
      prefix: "fas",
      iconName: icon2
    };
  }
}
var FontAwesomeIcon = defineComponent({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: false
    },
    flip: {
      type: [Boolean, String],
      default: false,
      validator: function validator(value) {
        return [true, false, "horizontal", "vertical", "both"].indexOf(value) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: true
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: false
    },
    pull: {
      type: String,
      default: null,
      validator: function validator2(value) {
        return ["right", "left"].indexOf(value) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function validator3(value) {
        return [90, 180, 270].indexOf(Number.parseInt(value, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: function validator4(value) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(value) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: false
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: false
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    shake: {
      type: Boolean,
      default: false
    },
    beat: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    beatFade: {
      type: Boolean,
      default: false
    },
    flash: {
      type: Boolean,
      default: false
    },
    spinPulse: {
      type: Boolean,
      default: false
    },
    spinReverse: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var icon$1 = computed(function() {
      return normalizeIconArgs(props.icon);
    });
    var classes = computed(function() {
      return objectWithKey("classes", classList(props));
    });
    var transform = computed(function() {
      return objectWithKey("transform", typeof props.transform === "string" ? parse$1.transform(props.transform) : props.transform);
    });
    var mask = computed(function() {
      return objectWithKey("mask", normalizeIconArgs(props.mask));
    });
    var renderedIcon = computed(function() {
      return icon(icon$1.value, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, classes.value), transform.value), mask.value), {}, {
        symbol: props.symbol,
        title: props.title
      }));
    });
    watch(renderedIcon, function(value) {
      if (!value) {
        return log("Could not find one or more icon(s)", icon$1.value, mask.value);
      }
    }, {
      immediate: true
    });
    var vnode = computed(function() {
      return renderedIcon.value ? convert(renderedIcon.value.abstract[0], {}, attrs) : null;
    });
    return function() {
      return vnode.value;
    };
  }
});

var faPhone = {};

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	var prefix = 'fas';
	var iconName = 'phone';
	var width = 512;
	var height = 512;
	var aliases = [128222,128379];
	var unicode = 'f095';
	var svgPathData = 'M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z';

	exports.definition = {
	  prefix: prefix,
	  iconName: iconName,
	  icon: [
	    width,
	    height,
	    aliases,
	    unicode,
	    svgPathData
	  ]};

	exports.faPhone = exports.definition;
	exports.prefix = prefix;
	exports.iconName = iconName;
	exports.width = width;
	exports.height = height;
	exports.ligatures = aliases;
	exports.unicode = unicode;
	exports.svgPathData = svgPathData;
	exports.aliases = aliases; 
} (faPhone));

var faTelegramPlane = {};

var faTelegram = {};

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	var prefix = 'fab';
	var iconName = 'telegram';
	var width = 496;
	var height = 512;
	var aliases = [62462,"telegram-plane"];
	var unicode = 'f2c6';
	var svgPathData = 'M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z';

	exports.definition = {
	  prefix: prefix,
	  iconName: iconName,
	  icon: [
	    width,
	    height,
	    aliases,
	    unicode,
	    svgPathData
	  ]};

	exports.faTelegram = exports.definition;
	exports.prefix = prefix;
	exports.iconName = iconName;
	exports.width = width;
	exports.height = height;
	exports.ligatures = aliases;
	exports.unicode = unicode;
	exports.svgPathData = svgPathData;
	exports.aliases = aliases; 
} (faTelegram));

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	var source = faTelegram;
	exports.definition = {
	  prefix: source.prefix,
	  iconName: source.iconName,
	  icon: [
	    source.width,
	    source.height,
	    source.aliases,
	    source.unicode,
	    source.svgPathData
	  ]};

	exports.faTelegramPlane = exports.definition;
	exports.prefix = source.prefix;
	exports.iconName = source.iconName;
	exports.width = source.width;
	exports.height = source.height;
	exports.ligatures = source.aliases;
	exports.unicode = source.unicode;
	exports.svgPathData = source.svgPathData;
	exports.aliases = source.aliases; 
} (faTelegramPlane));

var faAt = {};

(function (exports) {
	Object.defineProperty(exports, '__esModule', { value: true });
	var prefix = 'fas';
	var iconName = 'at';
	var width = 512;
	var height = 512;
	var aliases = [61946];
	var unicode = '40';
	var svgPathData = 'M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z';

	exports.definition = {
	  prefix: prefix,
	  iconName: iconName,
	  icon: [
	    width,
	    height,
	    aliases,
	    unicode,
	    svgPathData
	  ]};

	exports.faAt = exports.definition;
	exports.prefix = prefix;
	exports.iconName = iconName;
	exports.width = width;
	exports.height = height;
	exports.ligatures = aliases;
	exports.unicode = unicode;
	exports.svgPathData = svgPathData;
	exports.aliases = aliases; 
} (faAt));

library$1.add(faPhone.faPhone, faAt.faAt, faTelegramPlane.faTelegramPlane);
ViteSSG(App, ({ app }) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
});
//# sourceMappingURL=app-PYtsynUd.js.map
