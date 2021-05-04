import React, { ComponentClass, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

/**
 * Check an invariant
 * @param {Boolean} assert - true if an invariant is hold, false otherwise
 * @param {String} error - an error to be used if an invariant is broken
 * @throws {Error} if an ivariant is broken
 */
const invariant = (assert: boolean, error: string) => {
  if (!assert) {
    console.error(error);
    throw new Error(error);
  }
};

/**
 * The handler which intercepts an object's setter
 * @param {Object} target - an intercepted object
 * @param {String} prop - a changed object property
 * @param {Object} value - a new value of an object propery
 * @param {Object} receiver - an object's receiver
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set}
 */
const setHandler = function (
  this: any,
  target: object,
  prop: string,
  value: object,
  receiver: object,
) {
  // const [prop, value, receiver] = args;
  try {
    const valueOrProxy = isPropProxying(value)
      ? createProxy(value, this)
      : value;
    this.propertyChangedCallback(
      receiver,
      prop,
      receiver[prop],
      valueOrProxy,
      () => Reflect.set(target, prop, value, receiver),
    );
  } finally {
    return true;
  }
};

// function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;

/**
 * The handler which intercepts an object's delete operation
 * @param {Object} target - an intercepted object
 * @param {String} prop - a deleted object property
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty}
 */
const deleteHandler = function (
  this: any,
  receiver: any,
  target: object,
  prop: string,
) {
  try {
    this.propertyChangedCallback(
      receiver,
      prop,
      target[prop],
      undefined,
      (target: object, prop: string) => delete target[prop],
    );
  } finally {
    return true;
  }
};

/**
 * Create a proxy
 * @param {Object} object - an object to be proxied
 * @param {Object} proxyContext - a proxy context
 */
const createProxy = (object, proxyContext) => {
  const proxyHandlers: any = {
    set: setHandler.bind(proxyContext),
  };
  const proxy = new Proxy(object, proxyHandlers);
  proxyHandlers.deleteProperty = deleteHandler.bind(proxyContext, proxy);
  return proxy;
};

/**
 * Check if a property's value has to be proxied
 * @param {Object} propValue - a property value
 * @return {Boolean} true if a property's value has to be proxied, false otherwise
 */
const isPropProxying = (propValue: object): boolean => {
  const isNotNullOrUndefined = propValue !== null && propValue !== undefined;
  const isObject = typeof propValue === 'object';
  const isMapOrSet = propValue instanceof Map || propValue instanceof Set;
  return isNotNullOrUndefined && isObject && !isMapOrSet;
};

/**
 * Wrap arrays and objects into proxies
 * @param {Object|null} props - component's properties
 * @param {Object} proxyContext - proxy's context
 * @return {Proxy|null} proxied component's properties
 */
const proxyProps = (
  props: object | null,
  proxyContext: object,
): object | null => {
  if (props) {
    const clonedProps =
      props instanceof Array ? Array.from(props) : { ...props };
    Object.getOwnPropertyNames(clonedProps)
      .filter(propName => isPropProxying(clonedProps[propName]))
      .forEach(
        propName =>
          (clonedProps[propName] = proxyProps(
            clonedProps[propName],
            proxyContext,
          )),
      );
    return createProxy(clonedProps, proxyContext);
  }

  return null;
};

/**
 * Clone component properties
 * @param {Object} source - an object to be cloned
 * @param {Object} target - an object a change has been happened in
 * @param {String} prop - a property's name a change has been happened for
 * @param {Object} value - a new property's value
 * @param {Function} propModifier - a property's modifier
 * @param {Object} proxyContext - a proxy context
 * @param {Function} applyOtherChanges - apply other changes for a cloned object
 * @return {Object} cloned props
 */
const cloneProps = (
  source: object | null,
  target: object,
  prop: string,
  value: object,
  propModifier: (...args: any[]) => object,
  proxyContext: object,
  applyOtherChanges: Function,
) => {
  const cloneHelper = (
    source: object | null,
    prop: string,
    value: object,
    propModifier = (object: object, prop: string, value: object) =>
      (object[prop] = value),
  ) => {
    const clone = source instanceof Array ? Array.from(source) : { ...source };
    propModifier(clone, prop, value);
    applyOtherChanges(source, clone);
    return createProxy(clone, proxyContext);
  };

  if (source === target) {
    return cloneHelper(source, prop, value, propModifier);
  }

  const entries = source
    ? Object.entries(source).filter(
        ([, value]) => value !== null && typeof value === 'object',
      )
    : [];

  const entry = entries.find(([, value]) => value === target);

  if (entry) {
    const [entryProp, entryValue] = entry;

    return cloneHelper(
      source,
      entryProp,
      cloneHelper(entryValue, prop, value, propModifier),
    );
  }

  for (const entry of entries) {
    const [entryProp, entryValue] = entry;
    const entryClone = cloneProps(
      entryValue,
      target,
      prop,
      value,
      propModifier,
      proxyContext,
      applyOtherChanges,
    );
    if (entryClone) {
      return cloneHelper(source, entryProp, entryClone);
    }
  }

  return source;
};

/**
 * Wrap a React component into a Web component
 * @param {String} webComponentName - a Web component name
 * @param {Function} ReactComponent - a React component to be wrapped
 * @param {Array} webComponentObservableAttributes - Web component attributes to be observed
 * @param {Array} webComponentStyles - an array of styles for a Web component
 */
export const wrapReactComponent = (
  webComponentName: string,
  ReactComponent: string | ComponentClass<any, any> | FunctionComponent<any>,
  webComponentObservableAttributes = [],
  webComponentStyles = [`${webComponentName}.css`],
  withShadowDOM = true,
) => {
  if (customElements.get(webComponentName)) return;
  /**
   * The Web component wrapper for a React component
   */
  class WebComponentReactWrapper extends HTMLElement {
    ShadowView!: ({
      container,
      children,
    }: {
      container: any;
      children: any;
    }) => React.ReactPortal;
    shadowViewProps!: { container: ShadowRoot } | { container?: any };
    shadowViewChildren: any;
    private _connected: boolean;
    private _propChanges: any[];
    private _reactProps!: object | null;
    private _reactChildren!: object;
    timeoutId: any;
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks}
     */
    static get observedAttributes() {
      return webComponentObservableAttributes;
    }

    /**
     * Construct an instance of a Web component
     */
    constructor() {
      super();

      if (this.attachShadow) {
        this.ShadowView = ({ container, children }) =>
          ReactDOM.createPortal(children, container);
        this.shadowViewProps = withShadowDOM
          ? {
              container: this.attachShadow({ mode: 'open' }),
            }
          : {};
        this.shadowViewChildren = webComponentStyles.map(href =>
          React.createElement('link', { rel: 'stylesheet', href }),
        );
      }

      this._connected = false;
      this._propChanges = [];
    }

    /**
     * Get React component properties
     * @return {Object} - the React component properties
     */
    get reactProps(): object | null {
      return this._reactProps;
    }

    /**
     * Set React component properties
     * @param {Object} props - the React component properties to be set
     */
    set reactProps(props: object | null) {
      invariant(
        typeof props === 'object',
        'React properties should be an object.',
      );

      // Do not proxy the target DOM node reference.
      const { target, ...rest }: any = props;

      this._reactProps = {
        ...proxyProps(
          Array.from(this.attributes).reduce(
            (rest, { name, value }) => {
              rest[name] = value;
              return rest;
            },
            { ...rest },
          ),
          this,
        ),
        target,
      };
      this.render();
    }

    /**
     * Get React component children
     * @return {Object} - the React component children
     */
    get reactChildren(): object {
      return this._reactChildren;
    }

    /**
     * Set React component children
     * @param {Object} children - the component's children to be set
     */
    set reactChildren(children: object) {
      this._reactChildren = children;
      this.render();
    }

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks}
     */
    connectedCallback() {
      this._connected = true;

      if (withShadowDOM) {
        this.setAttribute('shadowRoot', 'true');
      }
    }

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks}
     */
    disconnectedCallback() {
      this._connected = false;
      ReactDOM.unmountComponentAtNode(this);
    }

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks}
     */
    attributeChangedCallback(name, _, newValue) {
      this.reactProps && (this.reactProps[name] = newValue);
    }

    /**
     * A property is changed
     * @param {Object} target - an object a property has been changed in
     * @param {String} name - a property name
     * @param {Object} oldValue - an old value of a property
     * @param {Object} newValue - a new value of a property
     * @param {Function} propModifier - a property modifier
     */
    propertyChangedCallback(
      target: object,
      name: string,
      _: object,
      newValue: object,
      propModifier: Function,
    ) {
      this._propChanges.push({ target, name, newValue, propModifier });
      if (!this.timeoutId) {
        const postponedRender = () => {
          try {
            do {
              const applyOtherChanges = (origin, clone) =>
                this._propChanges
                  .filter(({ target }) => target === origin)
                  .forEach(change => {
                    const { name, newValue, propModifier } = change;
                    propModifier(clone, name, newValue);
                    change.processed = true;
                  });
              const {
                target,
                name,
                newValue,
                propModifier,
                processed,
              } = this._propChanges.shift();
              if (!processed) {
                this._reactProps = cloneProps(
                  this.reactProps,
                  target,
                  name,
                  newValue,
                  propModifier,
                  this,
                  applyOtherChanges,
                );
              }
            } while (this._propChanges.length);
            this.render();
          } finally {
            delete this.timeoutId;
            this._propChanges = [];
          }
        };
        this.timeoutId = setTimeout(postponedRender, 0);
      }
    }

    /**
     * Render a React component
     */
    render() {
      if (this._connected && this.reactProps !== undefined) {
        const origComponent = React.createElement(
          ReactComponent,
          { ...this.reactProps, target: this.shadowViewProps.container },
          this.reactChildren,
        );
        const renderingComponent =
          withShadowDOM && this.ShadowView
            ? React.createElement(this.ShadowView, this.shadowViewProps, [
                ...this.shadowViewChildren,
                origComponent,
              ])
            : origComponent;
        ReactDOM.render(renderingComponent, this);
      }
    }
  }

  // Register a Web component
  customElements.define(webComponentName, WebComponentReactWrapper);
};
