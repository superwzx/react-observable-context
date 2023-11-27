(function(){ try {var elementStyle = document.createElement('style'); elementStyle.appendChild(document.createTextNode("")); document.head.appendChild(elementStyle);} catch(e) {console.error('vite-plugin-css-injected-by-js', e);} })();import React, { useContext, useState } from "react";
const contexts = {};
const combineContext = (contextList) => {
  Object.assign(contexts, ...contextList);
  return contexts;
};
const ReactObservableContext = React.createContext(null);
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/** @license React v16.14.0
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = React, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updater: Date.now(),
      ...props.state
    };
  }
  componentDidMount() {
    for (let i in contexts) {
      contexts[i].subscribe(() => {
        this.setState({
          [i]: contexts[i]
        });
      });
    }
  }
  render() {
    return /* @__PURE__ */ jsx(ReactObservableContext.Provider, {
      value: this.state,
      children: this.props.children
    });
  }
}
const connect = (mapContextToProps) => {
  return function(Component) {
    return /* @__PURE__ */ jsx(ReactObservableContext.Consumer, {
      children: (context) => {
        return /* @__PURE__ */ jsx(Component, {
          ...mapContextToProps(context)
        });
      }
    });
  };
};
const subscription = function(target, callback, disposeCallback) {
  this.target = target;
  this.callback = callback;
  this.disposeCallback = disposeCallback;
  this.isDisposed = false;
};
subscription.prototype = {
  dispose() {
    this.isDisposed = true;
    this.disposeCallback();
  }
};
const arrayRemoveItem = (array, itemToRemove) => {
  var index = array.indexOf(itemToRemove);
  if (index > 0)
    array.splice(index, 1);
  else if (index === 0)
    array.shift();
};
const defaultEvent = "change";
const subscribable = function() {
  this.init(this);
};
subscribable.prototype = {
  init(instance) {
    instance._subscriptions = {};
    instance._version = 1;
  },
  subscribe(callback, callbackTarget, event = defaultEvent) {
    const boundCallback = callbackTarget ? callback.bind(callbackTarget) : callback;
    const that = this;
    const subscriptionInstance = new subscription(this, boundCallback, () => {
      arrayRemoveItem(that._subscriptions[event], subscriptionInstance);
      this.afterSubscriptionRemove && this.afterSubscriptionRemove(event);
    });
    this.beforeSubscriptionAdd && this.beforeSubscriptionAdd(event);
    if (!this._subscriptions[event])
      this._subscriptions[event] = [];
    this._subscriptions[event].push(subscriptionInstance);
    return subscriptionInstance;
  },
  notifySubscribers(notifiableValue, event = defaultEvent) {
    if (event === defaultEvent)
      this.updateVersion();
    if (this.hasSubscriptionsForEvent(event)) {
      try {
        this._subscriptions[event].forEach((subscriptionInstance) => {
          if (!subscriptionInstance.isDisabled) {
            subscriptionInstance.callback(notifiableValue);
          }
        });
      } finally {
      }
    }
  },
  getVersion() {
    return this._version;
  },
  hasChanged(needCheckedVersion) {
    return this.getVersion() !== needCheckedVersion;
  },
  updateVersion() {
    ++this._version;
  },
  hasSubscriptionsForEvent(event) {
    return this._subscriptions[event] && this._subscriptions[event].length;
  },
  getSubscriptionsCount(event) {
    if (event) {
      return this._subscriptions[event] && this._subscriptions[event].length || 0;
    } else {
      let total = 0;
      Object.entries(this._subscriptions).forEach(([key, value]) => {
        total += value.length;
      });
      return total;
    }
  }
};
const latestValue = Symbol("_lastValue");
function Observable(initValue) {
  const observable = function() {
    if (arguments.length > 0) {
      const newValue = arguments[0];
      if (observable[latestValue] !== newValue) {
        observable.valueWillChange();
        observable[latestValue] = newValue;
        observable.valueHasChanged();
      }
      return this;
    } else {
      return observable[latestValue];
    }
  };
  observable[latestValue] = initValue;
  Observable.fn.init(observable);
  Object.setPrototypeOf(observable, Observable.fn);
  return observable;
}
Observable.fn = {
  peek() {
    return this[latestValue];
  },
  valueWillChange() {
    this.notifySubscribers(this[latestValue], "beforeChange");
  },
  valueHasChanged() {
    this.notifySubscribers(this[latestValue]);
  }
};
Object.assign(Observable.fn, subscribable.prototype);
const useObservableSelector = (selector) => {
  const state = useContext(ReactObservableContext);
  const [selectedState, setSelectedState] = useState(selector(state));
  return selectedState;
};
export { ContextProvider, Observable, combineContext, connect, useObservableSelector };
