import { r as reactExports, j as jsxRuntimeExports, u as useReactId, R as React__default, c as useFloating, F as FloatingDelayGroup, d as useDelayGroup, e as useInteractions, f as useHover$1, g as useFocus, h as useRole, k as useDismiss } from './vendor-react-BeQHm2Hb.js';
import { r as reactDomExports, R as ReactDOM, o as offset, h as hide, s as shift, l as limitShift, f as flip, i as inline, a as arrow, b as size } from './vendor-react-dom-b1tP6waW.js';
import { c as clsx } from './vendor-utils-B8uxCDj6.js';
import { S as autoUpdate, U as getOverflowAncestors } from './vendor-misc-CQ2gQV2M.js';

function keys(object) {
  return Object.keys(object);
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const result = { ...target };
  const _source = source;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(_source[key])) {
        if (!(key in target)) {
          result[key] = _source[key];
        } else {
          result[key] = deepMerge(result[key], _source[key]);
        }
      } else {
        result[key] = _source[key];
      }
    });
  }
  return result;
}

function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getTransformedScaledValue(value) {
  if (typeof value !== "string" || !value.includes("var(--mantine-scale)")) {
    return value;
  }
  return value.match(/^calc\((.*?)\)$/)?.[1].split("*")[0].trim();
}
function px(value) {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === "number") {
    return transformedValue;
  }
  if (typeof transformedValue === "string") {
    if (transformedValue.includes("calc") || transformedValue.includes("var")) {
      return transformedValue;
    }
    if (transformedValue.includes("px")) {
      return Number(transformedValue.replace("px", ""));
    }
    if (transformedValue.includes("rem")) {
      return Number(transformedValue.replace("rem", "")) * 16;
    }
    if (transformedValue.includes("em")) {
      return Number(transformedValue.replace("em", "")) * 16;
    }
    return Number(transformedValue);
  }
  return NaN;
}

function scaleRem(remValue) {
  if (remValue === "0rem") {
    return "0rem";
  }
  return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
  function converter(value) {
    if (value === 0 || value === "0") {
      return `0${units}`;
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      if (value === "") {
        return value;
      }
      if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) {
        return value;
      }
      if (value.includes(",")) {
        return value.split(",").map((val) => converter(val)).join(",");
      }
      if (value.includes(" ")) {
        return value.split(" ").map((val) => converter(val)).join(" ");
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value;
  }
  return converter;
}
const rem = createConverter("rem", { shouldScale: true });
const em = createConverter("em");

function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

function isNumberLike(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") {
      return true;
    }
    const cssUnitsRegex = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    const values = value.trim().split(/\s+/);
    return values.every((val) => cssUnitsRegex.test(val));
  }
  return false;
}

function isElement(value) {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  if (typeof value === "object") {
    if (value.type === reactExports.Fragment) {
      return false;
    }
    return true;
  }
  return false;
}

function createSafeContext(errorMessage) {
  const Context = reactExports.createContext(null);
  const useSafeContext = () => {
    const ctx = reactExports.useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  return [Provider, useSafeContext];
}

function createOptionalContext(initialValue = null) {
  const Context = reactExports.createContext(initialValue);
  const useOptionalContext = () => reactExports.useContext(Context);
  const Provider = ({ children, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  return [Provider, useOptionalContext];
}

function getSafeId(uid, errorMessage) {
  return (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}

function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector)) {
  }
  return _element;
}

function getPreviousIndex(current, elements, loop) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function getNextIndex(current, elements, loop) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function onSameLevel(target, sibling, parentSelector) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function createScopedKeydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  loop = true,
  activateOnFocus = false,
  dir = "rtl",
  orientation
}) {
  return (event) => {
    onKeyDown?.(event);
    const elements = Array.from(
      findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll(
        siblingSelector
      ) || []
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));
    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, loop);
    const _previousIndex = getPreviousIndex(current, elements, loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          activateOnFocus && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          activateOnFocus && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          activateOnFocus && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          activateOnFocus && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };
}

const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}

const noop = () => {
};

function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }
  return (event) => {
    if (event.key === "Escape") {
      callback(event);
      options.onTrigger?.();
    }
  };
}

function getSize(size, prefix = "size", convertToRem = true) {
  if (size === void 0) {
    return void 0;
  }
  return isNumberLike(size) ? convertToRem ? rem(size) : size : `var(--${prefix}-${size})`;
}
function getSpacing(size) {
  return getSize(size, "mantine-spacing");
}
function getRadius(size) {
  if (size === void 0) {
    return "var(--mantine-radius-default)";
  }
  return getSize(size, "mantine-radius");
}
function getFontSize(size) {
  return getSize(size, "mantine-font-size");
}
function getLineHeight(size) {
  return getSize(size, "mantine-line-height", false);
}
function getShadow(size) {
  if (!size) {
    return void 0;
  }
  return getSize(size, "mantine-shadow", false);
}

function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler?.(event);
    eventHandler?.(event);
  };
}

function getContextItemIndex(elementSelector, parentSelector, node) {
  if (!node) {
    return null;
  }
  return Array.from(
    findElementAncestor(node, parentSelector)?.querySelectorAll(elementSelector) || []
  ).findIndex((element) => element === node);
}

function randomId(prefix = "mantine-") {
  return `${prefix}${Math.random().toString(36).slice(2, 11)}`;
}

const DEFAULT_EVENTS = ["mousedown", "touchstart"];
function useClickOutside(callback, events, nodes) {
  const ref = reactExports.useRef(null);
  const eventsList = events || DEFAULT_EVENTS;
  reactExports.useEffect(() => {
    const listener = (event) => {
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldIgnore = !document.body.contains(target) && target?.tagName !== "HTML";
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
        shouldTrigger && !shouldIgnore && callback(event);
      } else if (ref.current && !ref.current.contains(target)) {
        callback(event);
      }
    };
    eventsList.forEach((fn) => document.addEventListener(fn, listener));
    return () => {
      eventsList.forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, callback, nodes]);
  return ref;
}

function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query, initialValue) {
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}
function useMediaQuery(query, initialValue, { getInitialValueInEffect } = {
  getInitialValueInEffect: true
}) {
  const [matches, setMatches] = reactExports.useState(
    getInitialValueInEffect ? initialValue : getInitialValue(query)
  );
  reactExports.useEffect(() => {
    try {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      return attachMediaListener(mediaQuery, (event) => setMatches(event.matches));
    } catch (e) {
      return void 0;
    }
  }, [query]);
  return matches || false;
}

const useIsomorphicEffect = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;

function useDidUpdate(fn, dependencies) {
  const mounted = reactExports.useRef(false);
  reactExports.useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );
  reactExports.useEffect(() => {
    if (mounted.current) {
      return fn();
    }
    mounted.current = true;
    return void 0;
  }, dependencies);
}

function useFocusReturn({
  opened,
  shouldReturnFocus = true
}) {
  const lastActiveElement = reactExports.useRef(null);
  const returnFocus = () => {
    if (lastActiveElement.current && "focus" in lastActiveElement.current && typeof lastActiveElement.current.focus === "function") {
      lastActiveElement.current?.focus({ preventScroll: true });
    }
  };
  useDidUpdate(() => {
    let timeout = -1;
    const clearFocusTimeout = (event) => {
      if (event.key === "Tab") {
        window.clearTimeout(timeout);
      }
    };
    document.addEventListener("keydown", clearFocusTimeout);
    if (opened) {
      lastActiveElement.current = document.activeElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, 10);
    }
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", clearFocusTimeout);
    };
  }, [opened, shouldReturnFocus]);
  return returnFocus;
}

const TABBABLE_NODES = /input|select|textarea|button|object/;
const FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";
function hidden(element) {
  return element.style.display === "none";
}
function visible(element) {
  const isHidden = element.getAttribute("aria-hidden") || element.getAttribute("hidden") || element.getAttribute("type") === "hidden";
  if (isHidden) {
    return false;
  }
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }
    if (hidden(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode;
  }
  return true;
}
function getElementTabIndex(element) {
  let tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = void 0;
  }
  return parseInt(tabIndex, 10);
}
function focusable(element) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res = (
    // @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition
    TABBABLE_NODES.test(nodeName) && !element.disabled || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN)
  );
  return res && visible(element);
}
function tabbable(element) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}
function findTabbableDescendants(element) {
  return Array.from(element.querySelectorAll(FOCUS_SELECTOR)).filter(tabbable);
}

function scopeTab(node, event) {
  const tabbable = findTabbableDescendants(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const root = node.getRootNode();
  let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
  const activeElement = root.activeElement;
  const activeElementIsRadio = activeElement.tagName === "INPUT" && activeElement.getAttribute("type") === "radio";
  if (activeElementIsRadio) {
    const activeRadioGroup = tabbable.filter(
      (element) => element.getAttribute("type") === "radio" && element.getAttribute("name") === activeElement.getAttribute("name")
    );
    leavingFinalTabbable = activeRadioGroup.includes(finalTabbable);
  }
  if (!leavingFinalTabbable) {
    return;
  }
  event.preventDefault();
  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

function useFocusTrap(active = true) {
  const ref = reactExports.useRef(null);
  const focusNode = (node) => {
    let focusElement = node.querySelector("[data-autofocus]");
    if (!focusElement) {
      const children = Array.from(node.querySelectorAll(FOCUS_SELECTOR));
      focusElement = children.find(tabbable) || children.find(focusable) || null;
      if (!focusElement && focusable(node)) {
        focusElement = node;
      }
    }
    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    }
  };
  const setRef = reactExports.useCallback(
    (node) => {
      if (!active) {
        return;
      }
      if (node === null) {
        return;
      }
      if (ref.current === node) {
        return;
      }
      if (node) {
        setTimeout(() => {
          if (node.getRootNode()) {
            focusNode(node);
          }
        });
        ref.current = node;
      } else {
        ref.current = null;
      }
    },
    [active]
  );
  reactExports.useEffect(() => {
    if (!active) {
      return void 0;
    }
    ref.current && setTimeout(() => focusNode(ref.current));
    const handleKeyDown = (event) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active]);
  return setRef;
}

function useId(staticId) {
  const reactId = useReactId();
  const [uuid, setUuid] = reactExports.useState(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

function assignRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}
function mergeRefs(...refs) {
  const cleanupMap = /* @__PURE__ */ new Map();
  return (node) => {
    refs.forEach((ref) => {
      const cleanup = assignRef(ref, node);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    });
    if (cleanupMap.size > 0) {
      return () => {
        refs.forEach((ref) => {
          const cleanup = cleanupMap.get(ref);
          if (cleanup && typeof cleanup === "function") {
            cleanup();
          } else {
            assignRef(ref, null);
          }
        });
        cleanupMap.clear();
      };
    }
  };
}
function useMergedRef(...refs) {
  return reactExports.useCallback(mergeRefs(...refs), refs);
}

function useUncontrolled({
  value,
  defaultValue,
  finalValue,
  onChange = () => {
  }
}) {
  const [uncontrolledValue, setUncontrolledValue] = reactExports.useState(
    defaultValue !== void 0 ? defaultValue : finalValue
  );
  const handleUncontrolledChange = (val, ...payload) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };
  if (value !== void 0) {
    return [value, onChange, true];
  }
  return [uncontrolledValue, handleUncontrolledChange, false];
}

function useReducedMotion(initialValue, options) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}

function useHover() {
  const [hovered, setHovered] = reactExports.useState(false);
  const previousNode = reactExports.useRef(null);
  const handleMouseEnter = reactExports.useCallback(() => {
    setHovered(true);
  }, []);
  const handleMouseLeave = reactExports.useCallback(() => {
    setHovered(false);
  }, []);
  const ref = reactExports.useCallback(
    (node) => {
      if (previousNode.current) {
        previousNode.current.removeEventListener("mouseenter", handleMouseEnter);
        previousNode.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (node) {
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);
      }
      previousNode.current = node;
    },
    [handleMouseEnter, handleMouseLeave]
  );
  return { ref, hovered };
}

function useDisclosure(initialState = false, options = {}) {
  const [opened, setOpened] = reactExports.useState(initialState);
  const open = reactExports.useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        options.onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [options.onOpen]);
  const close = reactExports.useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        options.onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [options.onClose]);
  const toggle = reactExports.useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);
  return [opened, { open, close, toggle }];
}

function containsRelatedTarget(event) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
}
function useFocusWithin({
  onBlur,
  onFocus
} = {}) {
  const [focused, setFocused] = reactExports.useState(false);
  const focusedRef = reactExports.useRef(false);
  const previousNode = reactExports.useRef(null);
  const _setFocused = reactExports.useCallback((value) => {
    setFocused(value);
    focusedRef.current = value;
  }, []);
  const handleFocusIn = reactExports.useCallback(
    (event) => {
      if (!focusedRef.current) {
        _setFocused(true);
        onFocus?.(event);
      }
    },
    [onFocus]
  );
  const handleFocusOut = reactExports.useCallback(
    (event) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        _setFocused(false);
        onBlur?.(event);
      }
    },
    [onBlur]
  );
  const callbackRef = reactExports.useCallback(
    (node) => {
      if (!node) {
        return;
      }
      if (previousNode.current) {
        previousNode.current.removeEventListener("focusin", handleFocusIn);
        previousNode.current.removeEventListener("focusout", handleFocusOut);
      }
      node.addEventListener("focusin", handleFocusIn);
      node.addEventListener("focusout", handleFocusOut);
      previousNode.current = node;
    },
    [handleFocusIn, handleFocusOut]
  );
  reactExports.useEffect(
    () => () => {
      if (previousNode.current) {
        previousNode.current.removeEventListener("focusin", handleFocusIn);
        previousNode.current.removeEventListener("focusout", handleFocusOut);
      }
    },
    []
  );
  return { ref: callbackRef, focused };
}

function getRefProp(element) {
  const version = React__default.version;
  if (typeof React__default.version !== "string") {
    return element?.ref;
  }
  if (version.startsWith("18.")) {
    return element?.ref;
  }
  return element?.props?.ref;
}

function getSingleElementChild(children) {
  const _children = reactExports.Children.toArray(children);
  if (_children.length !== 1 || !isElement(_children[0])) {
    return null;
  }
  return _children[0];
}

function createVarsResolver(resolver) {
  return resolver;
}

const EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
  const merged = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = clsx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });
  return merged;
}
function resolveClassNames({ theme, classNames, props, stylesCtx }) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(
    (item) => typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES
  );
  return mergeClassNames(resolvedClassNames);
}

function resolveStyles({ theme, styles, props, stylesCtx }) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];
  return arrayStyles.reduce((acc, style) => {
    if (typeof style === "function") {
      return { ...acc, ...style(theme, props, stylesCtx) };
    }
    return { ...acc, ...style };
  }, {});
}

const MantineContext = reactExports.createContext(null);
function useMantineContext() {
  const ctx = reactExports.useContext(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  return ctx;
}
function useMantineCssVariablesResolver() {
  return useMantineContext().cssVariablesResolver;
}
function useMantineClassNamesPrefix() {
  return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
  return useMantineContext().getStyleNonce;
}
function useMantineWithStaticClasses() {
  return useMantineContext().withStaticClasses;
}
function useMantineIsHeadless() {
  return useMantineContext().headless;
}
function useMantineSxTransform() {
  return useMantineContext().stylesTransform?.sx;
}
function useMantineStylesTransform() {
  return useMantineContext().stylesTransform?.styles;
}
function useMantineEnv() {
  return useMantineContext().env || "default";
}

function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  if (hexString.length === 8) {
    const alpha = parseInt(hexString.slice(6, 8), 16) / 255;
    return {
      r: parseInt(hexString.slice(0, 2), 16),
      g: parseInt(hexString.slice(2, 4), 16),
      b: parseInt(hexString.slice(4, 6), 16),
      a: alpha
    };
  }
  const parsed = parseInt(hexString, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r, g, b, a: a === void 0 ? 1 : a };
}
function hslStringToRgba(hslaString) {
  const hslaRegex = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i;
  const matches = hslaString.match(hslaRegex);
  if (!matches) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const h = parseInt(matches[1], 10);
  const s = parseInt(matches[2], 10) / 100;
  const l = parseInt(matches[3], 10) / 100;
  const a = matches[5] ? parseFloat(matches[5]) : void 0;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs(huePrime % 2 - 1));
  const m = l - chroma / 2;
  let r;
  let g;
  let b;
  if (huePrime >= 0 && huePrime < 1) {
    r = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: a || 1
  };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  if (color.startsWith("hsl")) {
    return hslStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

function darken(color, alpha) {
  if (color.startsWith("var(")) {
    return `color-mix(in srgb, ${color}, black ${alpha * 100}%)`;
  }
  const { r, g, b, a } = toRgba(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

function getPrimaryShade(theme, colorScheme) {
  if (typeof theme.primaryShade === "number") {
    return theme.primaryShade;
  }
  if (colorScheme === "dark") {
    return theme.primaryShade.dark;
  }
  return theme.primaryShade.light;
}

function gammaCorrect(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function getLightnessFromOklch(oklchColor) {
  const match = oklchColor.match(/oklch\((.*?)%\s/);
  return match ? parseFloat(match[1]) : null;
}
function luminance(color) {
  if (color.startsWith("oklch(")) {
    return (getLightnessFromOklch(color) || 0) / 100;
  }
  const { r, g, b } = toRgba(color);
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  const rLinear = gammaCorrect(sR);
  const gLinear = gammaCorrect(sG);
  const bLinear = gammaCorrect(sB);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}
function isLightColor(color, luminanceThreshold = 0.179) {
  if (color.startsWith("var(")) {
    return false;
  }
  return luminance(color) > luminanceThreshold;
}

function parseThemeColor({
  color,
  theme,
  colorScheme
}) {
  if (typeof color !== "string") {
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof color}`
    );
  }
  if (color === "bright") {
    return {
      color,
      value: colorScheme === "dark" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  }
  if (color === "dimmed") {
    return {
      color,
      value: colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[7],
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-dimmed"
    };
  }
  if (color === "white" || color === "black") {
    return {
      color,
      value: color === "white" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        color === "white" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: `--mantine-color-${color}`
    };
  }
  const [_color, shade] = color.split(".");
  const colorShade = shade ? Number(shade) : void 0;
  const isThemeColor = _color in theme.colors;
  if (isThemeColor) {
    const colorValue = colorShade !== void 0 ? theme.colors[_color][colorShade] : theme.colors[_color][getPrimaryShade(theme, colorScheme || "light")];
    return {
      color: _color,
      value: colorValue,
      shade: colorShade,
      isThemeColor,
      isLight: isLightColor(colorValue, theme.luminanceThreshold),
      variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
    };
  }
  return {
    color,
    value: color,
    isThemeColor,
    isLight: isLightColor(color, theme.luminanceThreshold),
    shade: colorShade,
    variable: void 0
  };
}

function getThemeColor(color, theme) {
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.variable ? `var(${parsed.variable})` : color;
}

function getGradient(gradient, theme) {
  const merged = {
    from: gradient?.from || theme.defaultGradient.from,
    to: gradient?.to || theme.defaultGradient.to,
    deg: gradient?.deg ?? theme.defaultGradient.deg ?? 0
  };
  const fromColor = getThemeColor(merged.from, theme);
  const toColor = getThemeColor(merged.to, theme);
  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}

function rgba(color, alpha2) {
  if (typeof color !== "string" || alpha2 > 1 || alpha2 < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(")) {
    const mixPercentage = (1 - alpha2) * 100;
    return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`;
  }
  if (color.startsWith("oklch")) {
    if (color.includes("/")) {
      return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha2})`);
    }
    return color.replace(")", ` / ${alpha2})`);
  }
  const { r, g, b } = toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha2})`;
}
const alpha = rgba;

const defaultVariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient,
  autoContrast
}) => {
  const parsed = parseThemeColor({ color, theme });
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
  if (variant === "none") {
    return {
      background: "transparent",
      hover: "transparent",
      color: "inherit",
      border: "none"
    };
  }
  if (variant === "filled") {
    const textColor = _autoContrast ? parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)" : "var(--mantine-color-white)";
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-filled)`,
          hover: `var(--mantine-color-${color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: color,
      hover: darken(color, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "light") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-light)`,
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: rgba(color, 0.1),
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "outline") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-outline-hover)`,
          color: `var(--mantine-color-${color}-outline)`,
          border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
        };
      }
      return {
        background: "transparent",
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.05),
      color,
      border: `${rem(1)} solid ${color}`
    };
  }
  if (variant === "subtle") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: "transparent",
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "transparent") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: "transparent",
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "transparent",
        hover: "transparent",
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: "transparent",
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "white") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "var(--mantine-color-white)",
          hover: darken(theme.white, 0.01),
          color: `var(--mantine-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "var(--mantine-color-white)",
        hover: darken(theme.white, 0.01),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "var(--mantine-color-white)",
      hover: darken(theme.white, 0.01),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "gradient") {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: "var(--mantine-color-white)",
      border: "none"
    };
  }
  if (variant === "default") {
    return {
      background: "var(--mantine-color-default)",
      hover: "var(--mantine-color-default-hover)",
      color: "var(--mantine-color-default-color)",
      border: `${rem(1)} solid var(--mantine-color-default-border)`
    };
  }
  return {};
};

const DEFAULT_COLORS = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#424242",
    "#3b3b3b",
    "#2e2e2e",
    "#242424",
    "#1f1f1f",
    "#141414"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};

const DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const DEFAULT_THEME = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: DEFAULT_COLORS,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: defaultVariantColorsResolver,
  autoContrast: false,
  luminanceThreshold: 0.3,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: false,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: "700",
    textWrap: "wrap",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: "1.3" },
      h2: { fontSize: rem(26), lineHeight: "1.35" },
      h3: { fontSize: rem(22), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.45" },
      h5: { fontSize: rem(16), lineHeight: "1.5" },
      h6: { fontSize: rem(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32)
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
  },
  other: {},
  components: {}
};

function isMantineColorScheme(value) {
  return value === "auto" || value === "dark" || value === "light";
}

function localStorageColorSchemeManager({
  key = "mantine-color-scheme-value"
} = {}) {
  let handleStorageEvent;
  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isMantineColorScheme(storedColorScheme) ? storedColorScheme : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          error
        );
      }
    },
    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };
      window.addEventListener("storage", handleStorageEvent);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },
    clear: () => {
      window.localStorage.removeItem(key);
    }
  };
}

const INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more \u2013 https://mantine.dev/theming/colors/#primary-color";
const INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
  if (shade < 0 || shade > 9) {
    return false;
  }
  return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme) {
  if (!(theme.primaryColor in theme.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR);
  }
  if (typeof theme.primaryShade === "object") {
    if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR);
    }
  }
  if (typeof theme.primaryShade === "number" && !isValidPrimaryShade(theme.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR);
  }
}
function mergeMantineTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    validateMantineTheme(currentTheme);
    return currentTheme;
  }
  const result = deepMerge(currentTheme, themeOverride);
  if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  validateMantineTheme(result);
  return result;
}

const MantineThemeContext = reactExports.createContext(null);
const useSafeMantineTheme = () => reactExports.useContext(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
  const ctx = reactExports.useContext(MantineThemeContext);
  if (!ctx) {
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  }
  return ctx;
}
function MantineThemeProvider({
  theme,
  children,
  inherit = true
}) {
  const parentTheme = useSafeMantineTheme();
  const mergedTheme = reactExports.useMemo(
    () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme),
    [theme, parentTheme, inherit]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MantineThemeContext.Provider, { value: mergedTheme, children });
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";

function MantineClasses() {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const classes = keys(theme.breakpoints).reduce((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes("px");
    const pxValue = px(theme.breakpoints[breakpoint]);
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);
    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.mantine-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.mantine-hidden-from-${breakpoint} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: classes }
    }
  );
}

function cssVariablesObjectToString(variables) {
  return Object.entries(variables).map(([name, value]) => `${name}: ${value};`).join("");
}

function convertCssVariables(input, selectorOverride) {
  const selectors = selectorOverride ? [selectorOverride] : [":root", ":host"];
  const sharedVariables = cssVariablesObjectToString(input.variables);
  const shared = sharedVariables ? `${selectors.join(", ")}{${sharedVariables}}` : "";
  const dark = cssVariablesObjectToString(input.dark);
  const light = cssVariablesObjectToString(input.light);
  const selectorsWithScheme = (scheme) => selectors.map(
    (selector) => selector === ":host" ? `${selector}([data-mantine-color-scheme="${scheme}"])` : `${selector}[data-mantine-color-scheme="${scheme}"]`
  ).join(", ");
  const darkForced = dark ? `${selectorsWithScheme("dark")}{${dark}}` : "";
  const lightForced = light ? `${selectorsWithScheme("light")}{${light}}` : "";
  return `${shared}

${darkForced}

${lightForced}`;
}

function getContrastColor({ color, theme, autoContrast }) {
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
  if (!_autoContrast) {
    return "var(--mantine-color-white)";
  }
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
}
function getPrimaryContrastColor(theme, colorScheme) {
  return getContrastColor({
    color: theme.colors[theme.primaryColor][getPrimaryShade(theme, colorScheme)],
    theme,
    autoContrast: null
  });
}

function getCSSColorVariables({
  theme,
  color,
  colorScheme,
  name = color,
  withColorValues = true
}) {
  if (!theme.colors[color]) {
    return {};
  }
  if (colorScheme === "light") {
    const primaryShade2 = getPrimaryShade(theme, "light");
    const dynamicVariables2 = {
      [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-filled)`,
      [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade2 === 9 ? 8 : primaryShade2 + 1})`,
      [`--mantine-color-${name}-light`]: alpha(theme.colors[color][primaryShade2], 0.1),
      [`--mantine-color-${name}-light-hover`]: alpha(theme.colors[color][primaryShade2], 0.12),
      [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline-hover`]: alpha(theme.colors[color][primaryShade2], 0.05)
    };
    if (!withColorValues) {
      return dynamicVariables2;
    }
    return {
      [`--mantine-color-${name}-0`]: theme.colors[color][0],
      [`--mantine-color-${name}-1`]: theme.colors[color][1],
      [`--mantine-color-${name}-2`]: theme.colors[color][2],
      [`--mantine-color-${name}-3`]: theme.colors[color][3],
      [`--mantine-color-${name}-4`]: theme.colors[color][4],
      [`--mantine-color-${name}-5`]: theme.colors[color][5],
      [`--mantine-color-${name}-6`]: theme.colors[color][6],
      [`--mantine-color-${name}-7`]: theme.colors[color][7],
      [`--mantine-color-${name}-8`]: theme.colors[color][8],
      [`--mantine-color-${name}-9`]: theme.colors[color][9],
      ...dynamicVariables2
    };
  }
  const primaryShade = getPrimaryShade(theme, "dark");
  const dynamicVariables = {
    [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-4)`,
    [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade})`,
    [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade === 9 ? 8 : primaryShade + 1})`,
    [`--mantine-color-${name}-light`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.15
    ),
    [`--mantine-color-${name}-light-hover`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.2
    ),
    [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 5, 0)})`,
    [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 4, 0)})`,
    [`--mantine-color-${name}-outline-hover`]: alpha(
      theme.colors[color][Math.max(primaryShade - 4, 0)],
      0.05
    )
  };
  if (!withColorValues) {
    return dynamicVariables;
  }
  return {
    [`--mantine-color-${name}-0`]: theme.colors[color][0],
    [`--mantine-color-${name}-1`]: theme.colors[color][1],
    [`--mantine-color-${name}-2`]: theme.colors[color][2],
    [`--mantine-color-${name}-3`]: theme.colors[color][3],
    [`--mantine-color-${name}-4`]: theme.colors[color][4],
    [`--mantine-color-${name}-5`]: theme.colors[color][5],
    [`--mantine-color-${name}-6`]: theme.colors[color][6],
    [`--mantine-color-${name}-7`]: theme.colors[color][7],
    [`--mantine-color-${name}-8`]: theme.colors[color][8],
    [`--mantine-color-${name}-9`]: theme.colors[color][9],
    ...dynamicVariables
  };
}

function isVirtualColor(value) {
  return !!value && typeof value === "object" && "mantine-virtual-color" in value;
}

function assignSizeVariables(variables, sizes, name) {
  keys(sizes).forEach(
    (size) => Object.assign(variables, { [`--mantine-${name}-${size}`]: sizes[size] })
  );
}
const defaultCssVariablesResolver = (theme) => {
  const lightPrimaryShade = getPrimaryShade(theme, "light");
  const defaultRadius = theme.defaultRadius in theme.radius ? theme.radius[theme.defaultRadius] : rem(theme.defaultRadius);
  const result = {
    variables: {
      "--mantine-z-index-app": "100",
      "--mantine-z-index-modal": "200",
      "--mantine-z-index-popover": "300",
      "--mantine-z-index-overlay": "400",
      "--mantine-z-index-max": "9999",
      "--mantine-scale": theme.scale.toString(),
      "--mantine-cursor-type": theme.cursorType,
      "--mantine-webkit-font-smoothing": theme.fontSmoothing ? "antialiased" : "unset",
      "--mantine-moz-font-smoothing": theme.fontSmoothing ? "grayscale" : "unset",
      "--mantine-color-white": theme.white,
      "--mantine-color-black": theme.black,
      "--mantine-line-height": theme.lineHeights.md,
      "--mantine-font-family": theme.fontFamily,
      "--mantine-font-family-monospace": theme.fontFamilyMonospace,
      "--mantine-font-family-headings": theme.headings.fontFamily,
      "--mantine-heading-font-weight": theme.headings.fontWeight,
      "--mantine-heading-text-wrap": theme.headings.textWrap,
      "--mantine-radius-default": defaultRadius,
      // Primary colors
      "--mantine-primary-color-filled": `var(--mantine-color-${theme.primaryColor}-filled)`,
      "--mantine-primary-color-filled-hover": `var(--mantine-color-${theme.primaryColor}-filled-hover)`,
      "--mantine-primary-color-light": `var(--mantine-color-${theme.primaryColor}-light)`,
      "--mantine-primary-color-light-hover": `var(--mantine-color-${theme.primaryColor}-light-hover)`,
      "--mantine-primary-color-light-color": `var(--mantine-color-${theme.primaryColor}-light-color)`
    },
    light: {
      "--mantine-color-scheme": "light",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme, "light"),
      "--mantine-color-bright": "var(--mantine-color-black)",
      "--mantine-color-text": theme.black,
      "--mantine-color-body": theme.white,
      "--mantine-color-error": "var(--mantine-color-red-6)",
      "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-${lightPrimaryShade})`,
      "--mantine-color-default": "var(--mantine-color-white)",
      "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
      "--mantine-color-default-color": "var(--mantine-color-black)",
      "--mantine-color-default-border": "var(--mantine-color-gray-4)",
      "--mantine-color-dimmed": "var(--mantine-color-gray-6)",
      "--mantine-color-disabled": "var(--mantine-color-gray-2)",
      "--mantine-color-disabled-color": "var(--mantine-color-gray-5)",
      "--mantine-color-disabled-border": "var(--mantine-color-gray-3)"
    },
    dark: {
      "--mantine-color-scheme": "dark",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme, "dark"),
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": "var(--mantine-color-dark-7)",
      "--mantine-color-error": "var(--mantine-color-red-8)",
      "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-4)`,
      "--mantine-color-default": "var(--mantine-color-dark-6)",
      "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
      "--mantine-color-default-color": "var(--mantine-color-white)",
      "--mantine-color-default-border": "var(--mantine-color-dark-4)",
      "--mantine-color-dimmed": "var(--mantine-color-dark-2)",
      "--mantine-color-disabled": "var(--mantine-color-dark-6)",
      "--mantine-color-disabled-color": "var(--mantine-color-dark-3)",
      "--mantine-color-disabled-border": "var(--mantine-color-dark-4)"
    }
  };
  assignSizeVariables(result.variables, theme.breakpoints, "breakpoint");
  assignSizeVariables(result.variables, theme.spacing, "spacing");
  assignSizeVariables(result.variables, theme.fontSizes, "font-size");
  assignSizeVariables(result.variables, theme.lineHeights, "line-height");
  assignSizeVariables(result.variables, theme.shadows, "shadow");
  assignSizeVariables(result.variables, theme.radius, "radius");
  theme.colors[theme.primaryColor].forEach((_, index) => {
    result.variables[`--mantine-primary-color-${index}`] = `var(--mantine-color-${theme.primaryColor}-${index})`;
  });
  keys(theme.colors).forEach((color) => {
    const value = theme.colors[color];
    if (isVirtualColor(value)) {
      Object.assign(
        result.light,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.light,
          colorScheme: "light",
          withColorValues: true
        })
      );
      Object.assign(
        result.dark,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.dark,
          colorScheme: "dark",
          withColorValues: true
        })
      );
      return;
    }
    value.forEach((shade, index) => {
      result.variables[`--mantine-color-${color}-${index}`] = shade;
    });
    Object.assign(
      result.light,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: "light",
        withColorValues: false
      })
    );
    Object.assign(
      result.dark,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: "dark",
        withColorValues: false
      })
    );
  });
  const headings = theme.headings.sizes;
  keys(headings).forEach((heading) => {
    result.variables[`--mantine-${heading}-font-size`] = headings[heading].fontSize;
    result.variables[`--mantine-${heading}-line-height`] = headings[heading].lineHeight;
    result.variables[`--mantine-${heading}-font-weight`] = headings[heading].fontWeight || theme.headings.fontWeight;
  });
  return result;
};

function getMergedVariables({ theme, generator }) {
  const defaultResolver = defaultCssVariablesResolver(theme);
  const providerGenerator = generator?.(theme);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}

const defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);
function removeDefaultVariables(input) {
  const cleaned = {
    variables: {},
    light: {},
    dark: {}
  };
  keys(input.variables).forEach((key) => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key];
    }
  });
  keys(input.light).forEach((key) => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key];
    }
  });
  keys(input.dark).forEach((key) => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key];
    }
  });
  return cleaned;
}

function getColorSchemeCssVariables(selectorOverride) {
  return convertCssVariables(
    {
      variables: {},
      dark: { "--mantine-color-scheme": "dark" },
      light: { "--mantine-color-scheme": "light" }
    },
    selectorOverride
  );
}
function MantineCssVariables({
  cssVariablesSelector,
  deduplicateCssVariables
}) {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = (cssVariablesSelector === void 0 || cssVariablesSelector === ":root" || cssVariablesSelector === ":host") && deduplicateCssVariables;
  const cleanedVariables = shouldCleanVariables ? removeDefaultVariables(mergedVariables) : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);
  if (css) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "style",
      {
        "data-mantine-styles": true,
        nonce: nonce?.(),
        dangerouslySetInnerHTML: {
          __html: `${css}${shouldCleanVariables ? "" : getColorSchemeCssVariables(cssVariablesSelector)}`
        }
      }
    );
  }
  return null;
}
MantineCssVariables.displayName = "@mantine/CssVariables";

function setColorSchemeAttribute(colorScheme, getRootElement) {
  const hasDarkColorScheme = typeof window !== "undefined" && "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")?.matches;
  const computedColorScheme = colorScheme !== "auto" ? colorScheme : hasDarkColorScheme ? "dark" : "light";
  getRootElement()?.setAttribute("data-mantine-color-scheme", computedColorScheme);
}
function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
  forceColorScheme
}) {
  const media = reactExports.useRef(null);
  const [value, setValue] = reactExports.useState(() => manager.get(defaultColorScheme));
  const colorSchemeValue = forceColorScheme || value;
  const setColorScheme = reactExports.useCallback(
    (colorScheme) => {
      if (!forceColorScheme) {
        setColorSchemeAttribute(colorScheme, getRootElement);
        setValue(colorScheme);
        manager.set(colorScheme);
      }
    },
    [manager.set, colorSchemeValue, forceColorScheme]
  );
  const clearColorScheme = reactExports.useCallback(() => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  }, [manager.clear, defaultColorScheme]);
  reactExports.useEffect(() => {
    manager.subscribe(setColorScheme);
    return manager.unsubscribe;
  }, [manager.subscribe, manager.unsubscribe]);
  useIsomorphicEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  }, []);
  reactExports.useEffect(() => {
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement);
      return () => {
      };
    }
    if (forceColorScheme === void 0) {
      setColorSchemeAttribute(value, getRootElement);
    }
    if (typeof window !== "undefined" && "matchMedia" in window) {
      media.current = window.matchMedia("(prefers-color-scheme: dark)");
    }
    const listener = (event) => {
      if (value === "auto") {
        setColorSchemeAttribute(event.matches ? "dark" : "light", getRootElement);
      }
    };
    media.current?.addEventListener("change", listener);
    return () => media.current?.removeEventListener("change", listener);
  }, [value, forceColorScheme]);
  return { colorScheme: colorSchemeValue, setColorScheme, clearColorScheme };
}

function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement
}) {
  useIsomorphicEffect(() => {
    if (respectReducedMotion) {
      getRootElement()?.setAttribute("data-respect-reduced-motion", "true");
    }
  }, [respectReducedMotion]);
}

function MantineProvider({
  theme,
  children,
  getStyleNonce,
  withStaticClasses = true,
  withGlobalClasses = true,
  deduplicateCssVariables = true,
  withCssVariables = true,
  cssVariablesSelector,
  classNamesPrefix = "mantine",
  colorSchemeManager = localStorageColorSchemeManager(),
  defaultColorScheme = "light",
  getRootElement = () => document.documentElement,
  cssVariablesResolver,
  forceColorScheme,
  stylesTransform,
  env
}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
    defaultColorScheme,
    forceColorScheme,
    manager: colorSchemeManager,
    getRootElement
  });
  useRespectReduceMotion({
    respectReducedMotion: theme?.respectReducedMotion || false,
    getRootElement
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MantineContext.Provider,
    {
      value: {
        colorScheme,
        setColorScheme,
        clearColorScheme,
        getRootElement,
        classNamesPrefix,
        getStyleNonce,
        cssVariablesResolver,
        cssVariablesSelector: cssVariablesSelector ?? ":root",
        withStaticClasses,
        stylesTransform,
        env
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MantineThemeProvider, { theme, children: [
        withCssVariables && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MantineCssVariables,
          {
            cssVariablesSelector,
            deduplicateCssVariables
          }
        ),
        withGlobalClasses && /* @__PURE__ */ jsxRuntimeExports.jsx(MantineClasses, {}),
        children
      ] })
    }
  );
}
MantineProvider.displayName = "@mantine/core/MantineProvider";

function useResolvedStylesApi({
  classNames,
  styles,
  props,
  stylesCtx
}) {
  const theme = useMantineTheme();
  return {
    resolvedClassNames: resolveClassNames({
      theme,
      classNames,
      props,
      stylesCtx: stylesCtx || void 0
    }),
    resolvedStyles: resolveStyles({
      theme,
      styles,
      props,
      stylesCtx: stylesCtx || void 0
    })
  };
}

const FOCUS_CLASS_NAMES = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function getGlobalClassNames({ theme, options, unstyled }) {
  return clsx(
    options?.focusable && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
    options?.active && !unstyled && theme.activeClassName
  );
}

function getOptionsClassNames({
  selector,
  stylesCtx,
  options,
  props,
  theme
}) {
  return resolveClassNames({
    theme,
    classNames: options?.classNames,
    props: options?.props || props,
    stylesCtx
  })[selector];
}

function getResolvedClassNames({
  selector,
  stylesCtx,
  theme,
  classNames,
  props
}) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}

function getRootClassName({ rootSelector, selector, className }) {
  return rootSelector === selector ? className : void 0;
}

function getSelectorClassName({ selector, classes, unstyled }) {
  return unstyled ? void 0 : classes[selector];
}

function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector,
  withStaticClass
}) {
  if (withStaticClass === false) {
    return [];
  }
  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`);
}

function getThemeClassNames({
  themeName,
  theme,
  selector,
  props,
  stylesCtx
}) {
  return themeName.map(
    (n) => resolveClassNames({
      theme,
      classNames: theme.components[n]?.classNames,
      props,
      stylesCtx
    })?.[selector]
  );
}

function getVariantClassName({
  options,
  classes,
  selector,
  unstyled
}) {
  return options?.variant && !unstyled ? classes[`${selector}--${options.variant}`] : void 0;
}

function getClassName({
  theme,
  options,
  themeName,
  selector,
  classNamesPrefix,
  classNames,
  classes,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx,
  withStaticClasses,
  headless,
  transformedStyles
}) {
  return clsx(
    getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
    getThemeClassNames({ theme, themeName, selector, props, stylesCtx }),
    getVariantClassName({ options, classes, selector, unstyled }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames: transformedStyles, props }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes, unstyled: unstyled || headless }),
    withStaticClasses && !headless && getStaticClassNames({
      themeName,
      classNamesPrefix,
      selector,
      withStaticClass: options?.withStaticClass
    }),
    options?.className
  );
}

function getThemeStyles({
  theme,
  themeName,
  props,
  stylesCtx,
  selector
}) {
  return themeName.map(
    (n) => resolveStyles({
      theme,
      styles: theme.components[n]?.styles,
      props,
      stylesCtx
    })[selector]
  ).reduce((acc, val) => ({ ...acc, ...val }), {});
}

function resolveStyle({ style, theme }) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}

function mergeVars(vars) {
  return vars.reduce((acc, current) => {
    if (current) {
      Object.keys(current).forEach((key) => {
        acc[key] = { ...acc[key], ...filterProps(current[key]) };
      });
    }
    return acc;
  }, {});
}

function resolveVars({
  vars,
  varsResolver,
  theme,
  props,
  stylesCtx,
  selector,
  themeName,
  headless
}) {
  return mergeVars([
    headless ? {} : varsResolver?.(theme, props, stylesCtx),
    ...themeName.map((name) => theme.components?.[name]?.vars?.(theme, props, stylesCtx)),
    vars?.(theme, props, stylesCtx)
  ])?.[selector];
}

function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver,
  headless,
  withStylesTransform
}) {
  return {
    ...!withStylesTransform && getThemeStyles({ theme, themeName, props, stylesCtx, selector }),
    ...!withStylesTransform && resolveStyles({ theme, styles, props, stylesCtx })[selector],
    ...!withStylesTransform && resolveStyles({ theme, styles: options?.styles, props: options?.props || props, stylesCtx })[selector],
    ...resolveVars({ theme, props, stylesCtx, vars, varsResolver, selector, themeName, headless }),
    ...rootSelector === selector ? resolveStyle({ style, theme }) : null,
    ...resolveStyle({ style: options?.style, theme })
  };
}

function useStylesTransform({ props, stylesCtx, themeName }) {
  const theme = useMantineTheme();
  const stylesTransform = useMantineStylesTransform()?.();
  const getTransformedStyles = (styles) => {
    if (!stylesTransform) {
      return [];
    }
    const transformedStyles = styles.map(
      (style) => stylesTransform(style, { props, theme, ctx: stylesCtx })
    );
    return [
      ...transformedStyles,
      ...themeName.map(
        (n) => stylesTransform(theme.components[n]?.styles, { props, theme, ctx: stylesCtx })
      )
    ].filter(Boolean);
  };
  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform
  };
}

function useStyles({
  name,
  classes,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root",
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver,
  attributes
}) {
  const theme = useMantineTheme();
  const classNamesPrefix = useMantineClassNamesPrefix();
  const withStaticClasses = useMantineWithStaticClasses();
  const headless = useMantineIsHeadless();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n);
  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props,
    stylesCtx,
    themeName
  });
  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: getTransformedStyles([options?.styles, styles])
    }),
    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver,
      headless,
      withStylesTransform
    }),
    ...attributes?.[selector]
  });
}

function getAutoContrastValue(autoContrast, theme) {
  return typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
}

function useProps(component, defaultProps, props) {
  const theme = useMantineTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}

function cssObjectToString(css) {
  return keys(css).reduce(
    (acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
    ""
  ).trim();
}

function stylesToString({ selector, styles, media, container }) {
  const baseStyles = styles ? cssObjectToString(styles) : "";
  const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
  const containerStyles = !Array.isArray(container) ? [] : container.map(
    (item) => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`
  );
  return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}${containerStyles.join("")}`.trim();
}

function InlineStyles(props) {
  const nonce = useMantineStyleNonce();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: stylesToString(props) }
    }
  );
}

function extractStyleProps(others) {
  const {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bdrs,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx,
    ...rest
  } = others;
  const styleProps = filterProps({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    bdrs,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx
  });
  return { styleProps, rest };
}

const STYlE_PROPS_DATA = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bdrs: { type: "radius", property: "borderRadius" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" }
};

function colorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.color === "dimmed") {
    return "var(--mantine-color-dimmed)";
  }
  if (parsedColor.color === "bright") {
    return "var(--mantine-color-bright)";
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}
function textColorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.isThemeColor && parsedColor.shade === void 0) {
    return `var(--mantine-color-${parsedColor.color}-text)`;
  }
  return colorResolver(color, theme);
}

function borderResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const [size, style, ...colorTuple] = value.split(" ").filter((val) => val.trim() !== "");
    let result = `${rem(size)}`;
    style && (result += ` ${style}`);
    colorTuple.length > 0 && (result += ` ${colorResolver(colorTuple.join(" "), theme)}`);
    return result.trim();
  }
  return value;
}

const values = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function fontFamilyResolver(fontFamily) {
  if (typeof fontFamily === "string" && fontFamily in values) {
    return values[fontFamily];
  }
  return fontFamily;
}

const headings$1 = ["h1", "h2", "h3", "h4", "h5", "h6"];
function fontSizeResolver(value, theme) {
  if (typeof value === "string" && value in theme.fontSizes) {
    return `var(--mantine-font-size-${value})`;
  }
  if (typeof value === "string" && headings$1.includes(value)) {
    return `var(--mantine-${value}-font-size)`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}

function identityResolver(value) {
  return value;
}

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
function lineHeightResolver(value, theme) {
  if (typeof value === "string" && value in theme.lineHeights) {
    return `var(--mantine-line-height-${value})`;
  }
  if (typeof value === "string" && headings.includes(value)) {
    return `var(--mantine-${value}-line-height)`;
  }
  return value;
}

function radiusResolver(value, theme) {
  if (typeof value === "string" && value in theme.radius) {
    return `var(--mantine-radius-${value})`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}

function sizeResolver(value) {
  if (typeof value === "number") {
    return rem(value);
  }
  return value;
}

function spacingResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const mod = value.replace("-", "");
    if (!(mod in theme.spacing)) {
      return rem(value);
    }
    const variable = `--mantine-spacing-${mod}`;
    return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
  }
  return value;
}

const resolvers = {
  color: colorResolver,
  textColor: textColorResolver,
  fontSize: fontSizeResolver,
  spacing: spacingResolver,
  radius: radiusResolver,
  identity: identityResolver,
  size: sizeResolver,
  lineHeight: lineHeightResolver,
  fontFamily: fontFamilyResolver,
  border: borderResolver
};

function replaceMediaQuery(query) {
  return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries({
  media,
  ...props
}) {
  const breakpoints = Object.keys(media);
  const sortedMedia = breakpoints.sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b))).map((query) => ({ query, styles: media[query] }));
  return { ...props, media: sortedMedia };
}

function hasResponsiveStyles(styleProp) {
  if (typeof styleProp !== "object" || styleProp === null) {
    return false;
  }
  const breakpoints = Object.keys(styleProp);
  if (breakpoints.length === 1 && breakpoints[0] === "base") {
    return false;
  }
  return true;
}
function getBaseValue(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getBreakpointKeys(value) {
  if (typeof value === "object" && value !== null) {
    return keys(value).filter((key) => key !== "base");
  }
  return [];
}
function getBreakpointValue(value, breakpoint) {
  if (typeof value === "object" && value !== null && breakpoint in value) {
    return value[breakpoint];
  }
  return value;
}
function parseStyleProps({
  styleProps,
  data,
  theme
}) {
  return sortMediaQueries(
    keys(styleProps).reduce(
      (acc, styleProp) => {
        if (styleProp === "hiddenFrom" || styleProp === "visibleFrom" || styleProp === "sx") {
          return acc;
        }
        const propertyData = data[styleProp];
        const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
        const baseValue = getBaseValue(styleProps[styleProp]);
        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme);
          });
          return acc;
        }
        acc.hasResponsiveStyles = true;
        const breakpoints = getBreakpointKeys(styleProps[styleProp]);
        properties.forEach((property) => {
          if (baseValue != null) {
            acc.styles[property] = resolvers[propertyData.type](baseValue, theme);
          }
          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme.breakpoints[breakpoint]})`;
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue(styleProps[styleProp], breakpoint),
                theme
              )
            };
          });
        });
        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}

function useRandomClassName() {
  const id = reactExports.useId().replace(/[:«»]/g, "");
  return `__m__-${id}`;
}

function getStyleObject(style, theme) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...getStyleObject(item, theme) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}

function createPolymorphicComponent(component) {
  return component;
}

function transformModKey(key) {
  return key.startsWith("data-") ? key : `data-${key}`;
}
function getMod(props) {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    if (value === void 0 || value === "" || value === false || value === null) {
      return acc;
    }
    acc[transformModKey(key)] = props[key];
    return acc;
  }, {});
}
function getBoxMod(mod) {
  if (!mod) {
    return null;
  }
  if (typeof mod === "string") {
    return { [transformModKey(mod)]: true };
  }
  if (Array.isArray(mod)) {
    return [...mod].reduce(
      (acc, value) => ({ ...acc, ...getBoxMod(value) }),
      {}
    );
  }
  return getMod(mod);
}

function mergeStyles(styles, theme) {
  if (Array.isArray(styles)) {
    return [...styles].reduce(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme) }),
      {}
    );
  }
  if (typeof styles === "function") {
    return styles(theme);
  }
  if (styles == null) {
    return {};
  }
  return styles;
}
function getBoxStyle({
  theme,
  style,
  vars,
  styleProps
}) {
  const _style = mergeStyles(style, theme);
  const _vars = mergeStyles(vars, theme);
  return { ..._style, ..._vars, ...styleProps };
}

const _Box = reactExports.forwardRef(
  ({
    component,
    style,
    __vars,
    className,
    variant,
    mod,
    size,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    renderRoot,
    __size,
    ...others
  }, ref) => {
    const theme = useMantineTheme();
    const Element = component || "div";
    const { styleProps, rest } = extractStyleProps(others);
    const useSxTransform = useMantineSxTransform();
    const transformedSx = useSxTransform?.()?.(styleProps.sx);
    const responsiveClassName = useRandomClassName();
    const parsedStyleProps = parseStyleProps({
      styleProps,
      theme,
      data: STYlE_PROPS_DATA
    });
    const props = {
      ref,
      style: getBoxStyle({
        theme,
        style,
        vars: __vars,
        styleProps: parsedStyleProps.inlineStyles
      }),
      className: clsx(className, transformedSx, {
        [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
        "mantine-light-hidden": lightHidden,
        "mantine-dark-hidden": darkHidden,
        [`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
        [`mantine-visible-from-${visibleFrom}`]: visibleFrom
      }),
      "data-variant": variant,
      "data-size": isNumberLike(size) ? void 0 : size || void 0,
      size: __size,
      ...getBoxMod(mod),
      ...rest
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineStyles,
        {
          selector: `.${responsiveClassName}`,
          styles: parsedStyleProps.styles,
          media: parsedStyleProps.media
        }
      ),
      typeof renderRoot === "function" ? renderRoot(props) : /* @__PURE__ */ jsxRuntimeExports.jsx(Element, { ...props })
    ] });
  }
);
_Box.displayName = "@mantine/core/Box";
const Box = createPolymorphicComponent(_Box);

function identity(value) {
  return value;
}
function getWithProps(Component) {
  const _Component = Component;
  return (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_Component, { ...fixedProps, ...props, ref }));
    Extended.extend = _Component.extend;
    Extended.displayName = `WithProps(${_Component.displayName})`;
    return Extended;
  };
}
function factory(ui) {
  const Component = reactExports.forwardRef(ui);
  Component.extend = identity;
  Component.withProps = (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  return Component;
}

function polymorphicFactory(ui) {
  const Component = reactExports.forwardRef(ui);
  Component.withProps = (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  Component.extend = identity;
  return Component;
}

const DirectionContext = reactExports.createContext({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function useDirection() {
  return reactExports.useContext(DirectionContext);
}

var classes$n = {"root":"m_87cf2631"};

const defaultProps$s = {
  __staticSelector: "UnstyledButton"
};
const UnstyledButton = polymorphicFactory(
  (_props, ref) => {
    const props = useProps("UnstyledButton", defaultProps$s, _props);
    const {
      className,
      component = "button",
      __staticSelector,
      unstyled,
      classNames,
      styles,
      style,
      attributes,
      ...others
    } = props;
    const getStyles = useStyles({
      name: __staticSelector,
      props,
      classes: classes$n,
      className,
      style,
      classNames,
      styles,
      unstyled,
      attributes
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...getStyles("root", { focusable: true }),
        component,
        ref,
        type: component === "button" ? "button" : void 0,
        ...others
      }
    );
  }
);
UnstyledButton.classes = classes$n;
UnstyledButton.displayName = "@mantine/core/UnstyledButton";

var classes$m = {"root":"m_515a97f8"};

const VisuallyHidden = factory((_props, ref) => {
  const props = useProps("VisuallyHidden", null, _props);
  const { classNames, className, style, styles, unstyled, vars, attributes, ...others } = props;
  const getStyles = useStyles({
    name: "VisuallyHidden",
    classes: classes$m,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ref, ...getStyles("root"), ...others });
});
VisuallyHidden.classes = classes$m;
VisuallyHidden.displayName = "@mantine/core/VisuallyHidden";

var classes$l = {"root":"m_1b7284a3"};

const varsResolver$t = createVarsResolver((_, { radius, shadow }) => ({
  root: {
    "--paper-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--paper-shadow": getShadow(shadow)
  }
}));
const Paper = polymorphicFactory((_props, ref) => {
  const props = useProps("Paper", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    withBorder,
    vars,
    radius,
    shadow,
    variant,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Paper",
    props,
    classes: classes$l,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$t
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ "data-with-border": withBorder }, mod],
      ...getStyles("root"),
      variant,
      ...others
    }
  );
});
Paper.classes = classes$l;
Paper.displayName = "@mantine/core/Paper";

function horizontalSide(placement, arrowY, arrowOffset, arrowPosition) {
  if (placement === "center" || arrowPosition === "center") {
    return { top: arrowY };
  }
  if (placement === "end") {
    return { bottom: arrowOffset };
  }
  if (placement === "start") {
    return { top: arrowOffset };
  }
  return {};
}
function verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir) {
  if (placement === "center" || arrowPosition === "center") {
    return { left: arrowX };
  }
  if (placement === "end") {
    return { [dir === "ltr" ? "right" : "left"]: arrowOffset };
  }
  if (placement === "start") {
    return { [dir === "ltr" ? "left" : "right"]: arrowOffset };
  }
  return {};
}
const radiusByFloatingSide = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function getArrowPositionStyles({
  position,
  arrowSize,
  arrowOffset,
  arrowRadius,
  arrowPosition,
  arrowX,
  arrowY,
  dir
}) {
  const [side, placement = "center"] = position.split("-");
  const baseStyles = {
    width: arrowSize,
    height: arrowSize,
    transform: "rotate(45deg)",
    position: "absolute",
    [radiusByFloatingSide[side]]: arrowRadius
  };
  const arrowPlacement = -arrowSize / 2;
  if (side === "left") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      right: arrowPlacement,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      clipPath: "polygon(100% 0, 0 0, 100% 100%)"
    };
  }
  if (side === "right") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      left: arrowPlacement,
      borderRightColor: "transparent",
      borderTopColor: "transparent",
      clipPath: "polygon(0 100%, 0 0, 100% 100%)"
    };
  }
  if (side === "top") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      bottom: arrowPlacement,
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
    };
  }
  if (side === "bottom") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      top: arrowPlacement,
      borderBottomColor: "transparent",
      borderRightColor: "transparent",
      clipPath: "polygon(0 100%, 0 0, 100% 0)"
    };
  }
  return {};
}

const FloatingArrow = reactExports.forwardRef(
  ({
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    visible,
    arrowX,
    arrowY,
    style,
    ...others
  }, ref) => {
    const { dir } = useDirection();
    if (!visible) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ...others,
        ref,
        style: {
          ...style,
          ...getArrowPositionStyles({
            position,
            arrowSize,
            arrowOffset,
            arrowRadius,
            arrowPosition,
            dir,
            arrowX,
            arrowY
          })
        }
      }
    );
  }
);
FloatingArrow.displayName = "@mantine/core/FloatingArrow";

function getFloatingPosition(dir, position) {
  if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
    const [side, placement] = position.split("-");
    const flippedPosition = side === "right" ? "left" : "right";
    return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}

var classes$k = {"root":"m_9814e45f"};

const defaultProps$r = {
  zIndex: getDefaultZIndex("modal")
};
const varsResolver$s = createVarsResolver(
  (_, { gradient, color, backgroundOpacity, blur, radius, zIndex }) => ({
    root: {
      "--overlay-bg": gradient || (color !== void 0 || backgroundOpacity !== void 0) && rgba(color || "#000", backgroundOpacity ?? 0.6) || void 0,
      "--overlay-filter": blur ? `blur(${rem(blur)})` : void 0,
      "--overlay-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--overlay-z-index": zIndex?.toString()
    }
  })
);
const Overlay = polymorphicFactory((_props, ref) => {
  const props = useProps("Overlay", defaultProps$r, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    fixed,
    center,
    children,
    radius,
    zIndex,
    gradient,
    blur,
    color,
    backgroundOpacity,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Overlay",
    props,
    classes: classes$k,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$s
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), mod: [{ center, fixed }, mod], ...others, children });
});
Overlay.classes = classes$k;
Overlay.displayName = "@mantine/core/Overlay";

function createPortalNode(props) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  typeof props.className === "string" && node.classList.add(...props.className.split(" ").filter(Boolean));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}
function getTargetNode({ target, reuseTargetNode, ...others }) {
  if (target) {
    if (typeof target === "string") {
      return document.querySelector(target) || createPortalNode(others);
    }
    return target;
  }
  if (reuseTargetNode) {
    const existingNode = document.querySelector("[data-mantine-shared-portal-node]");
    if (existingNode) {
      return existingNode;
    }
    const node = createPortalNode(others);
    node.setAttribute("data-mantine-shared-portal-node", "true");
    document.body.appendChild(node);
    return node;
  }
  return createPortalNode(others);
}
const defaultProps$q = {
  reuseTargetNode: true
};
const Portal = factory((props, ref) => {
  const { children, target, reuseTargetNode, ...others } = useProps("Portal", defaultProps$q, props);
  const [mounted, setMounted] = reactExports.useState(false);
  const nodeRef = reactExports.useRef(null);
  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others });
    assignRef(ref, nodeRef.current);
    if (!target && !reuseTargetNode && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }
    return () => {
      if (!target && !reuseTargetNode && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);
  if (!mounted || !nodeRef.current) {
    return null;
  }
  return reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children }), nodeRef.current);
});
Portal.displayName = "@mantine/core/Portal";

const OptionalPortal = factory(
  ({ withinPortal = true, children, ...others }, ref) => {
    const env = useMantineEnv();
    if (env === "test" || !withinPortal) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ref, ...others, children });
  }
);
OptionalPortal.displayName = "@mantine/core/OptionalPortal";

const popIn = (from) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${from === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
});
const transitions = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  "fade-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-30px)" },
    transitionProperty: "opacity, transform"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: {
    ...popIn("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...popIn("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...popIn("top"),
    common: { transformOrigin: "top right" }
  }
};

const transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction
}) {
  const shared = {
    WebkitBackfaceVisibility: "hidden",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction
  };
  if (typeof transition === "string") {
    if (!(transition in transitions)) {
      return {};
    }
    return {
      transitionProperty: transitions[transition].transitionProperty,
      ...shared,
      ...transitions[transition].common,
      ...transitions[transition][transitionStatuses[state]]
    };
  }
  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]]
  };
}

function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited,
  enterDelay,
  exitDelay
}) {
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const [transitionDuration, setTransitionDuration] = reactExports.useState(reduceMotion ? 0 : duration);
  const [transitionStatus, setStatus] = reactExports.useState(mounted ? "entered" : "exited");
  const transitionTimeoutRef = reactExports.useRef(-1);
  const delayTimeoutRef = reactExports.useRef(-1);
  const rafRef = reactExports.useRef(-1);
  function clearAllTimeouts() {
    window.clearTimeout(transitionTimeoutRef.current);
    window.clearTimeout(delayTimeoutRef.current);
    cancelAnimationFrame(rafRef.current);
  }
  const handleStateChange = (shouldMount) => {
    clearAllTimeouts();
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;
    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
    setTransitionDuration(newTransitionDuration);
    if (newTransitionDuration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      rafRef.current = requestAnimationFrame(() => {
        ReactDOM.flushSync(() => {
          setStatus(shouldMount ? "pre-entering" : "pre-exiting");
        });
        rafRef.current = requestAnimationFrame(() => {
          typeof preHandler === "function" && preHandler();
          setStatus(shouldMount ? "entering" : "exiting");
          transitionTimeoutRef.current = window.setTimeout(() => {
            typeof handler === "function" && handler();
            setStatus(shouldMount ? "entered" : "exited");
          }, newTransitionDuration);
        });
      });
    }
  };
  const handleTransitionWithDelay = (shouldMount) => {
    clearAllTimeouts();
    const delay = shouldMount ? enterDelay : exitDelay;
    if (typeof delay !== "number") {
      handleStateChange(shouldMount);
      return;
    }
    delayTimeoutRef.current = window.setTimeout(
      () => {
        handleStateChange(shouldMount);
      },
      shouldMount ? enterDelay : exitDelay
    );
  };
  useDidUpdate(() => {
    handleTransitionWithDelay(mounted);
  }, [mounted]);
  reactExports.useEffect(
    () => () => {
      clearAllTimeouts();
    },
    []
  );
  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || "ease"
  };
}

function Transition({
  keepMounted,
  transition = "fade",
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction = "ease",
  onExit,
  onEntered,
  onEnter,
  onExited,
  enterDelay,
  exitDelay
}) {
  const env = useMantineEnv();
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited,
    enterDelay,
    exitDelay
  });
  if (transitionDuration === 0 || env === "test") {
    return mounted ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children({}) }) : keepMounted ? children({ display: "none" }) : null;
  }
  return transitionStatus === "exited" ? keepMounted ? children({ display: "none" }) : null : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children(
    getTransitionStyles({
      transition,
      duration: transitionDuration,
      state: transitionStatus,
      timingFunction: transitionTimingFunction
    })
  ) });
}
Transition.displayName = "@mantine/core/Transition";

const [PopoverContextProvider, usePopoverContext] = createSafeContext(
  "Popover component was not found in the tree"
);

function FocusTrap({
  children,
  active = true,
  refProp = "ref",
  innerRef
}) {
  const focusTrapRef = useFocusTrap(active);
  const ref = useMergedRef(focusTrapRef, innerRef);
  const child = getSingleElementChild(children);
  if (!child) {
    return children;
  }
  return reactExports.cloneElement(child, { [refProp]: ref });
}
function FocusTrapInitialFocus(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHidden, { tabIndex: -1, "data-autofocus": true, ...props });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";
FocusTrapInitialFocus.displayName = "@mantine/core/FocusTrapInitialFocus";
FocusTrap.InitialFocus = FocusTrapInitialFocus;

var classes$j = {"dropdown":"m_38a85659","arrow":"m_a31dc6c1","overlay":"m_3d7bc908"};

const PopoverDropdown = factory((_props, ref) => {
  const props = useProps("PopoverDropdown", null, _props);
  const {
    className,
    style,
    vars,
    children,
    onKeyDownCapture,
    variant,
    classNames,
    styles,
    ...others
  } = props;
  const ctx = usePopoverContext();
  const returnFocus = useFocusReturn({
    opened: ctx.opened,
    shouldReturnFocus: ctx.returnFocus
  });
  const accessibleProps = ctx.withRoles ? {
    "aria-labelledby": ctx.getTargetId(),
    id: ctx.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {};
  const mergedRef = useMergedRef(ref, ctx.floating);
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...ctx.portalProps, withinPortal: ctx.withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Transition,
    {
      mounted: ctx.opened,
      ...ctx.transitionProps,
      transition: ctx.transitionProps?.transition || "fade",
      duration: ctx.transitionProps?.duration ?? 150,
      keepMounted: ctx.keepMounted,
      exitDuration: typeof ctx.transitionProps?.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps?.duration,
      children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: ctx.trapFocus && ctx.opened, innerRef: mergedRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Box,
        {
          ...accessibleProps,
          ...others,
          variant,
          onKeyDownCapture: closeOnEscape(
            () => {
              ctx.onClose?.();
              ctx.onDismiss?.();
            },
            {
              active: ctx.closeOnEscape,
              onTrigger: returnFocus,
              onKeyDown: onKeyDownCapture
            }
          ),
          "data-position": ctx.placement,
          "data-fixed": ctx.floatingStrategy === "fixed" || void 0,
          ...ctx.getStyles("dropdown", {
            className,
            props,
            classNames,
            styles,
            style: [
              {
                ...transitionStyles,
                zIndex: ctx.zIndex,
                top: ctx.y ?? 0,
                left: ctx.x ?? 0,
                width: ctx.width === "target" ? void 0 : rem(ctx.width),
                ...ctx.referenceHidden ? { display: "none" } : null
              },
              ctx.resolvedStyles.dropdown,
              styles?.dropdown,
              style
            ]
          }),
          children: [
            children,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingArrow,
              {
                ref: ctx.arrowRef,
                arrowX: ctx.arrowX,
                arrowY: ctx.arrowY,
                visible: ctx.withArrow,
                position: ctx.placement,
                arrowSize: ctx.arrowSize,
                arrowRadius: ctx.arrowRadius,
                arrowOffset: ctx.arrowOffset,
                arrowPosition: ctx.arrowPosition,
                ...ctx.getStyles("arrow", {
                  props,
                  classNames,
                  styles
                })
              }
            )
          ]
        }
      ) })
    }
  ) });
});
PopoverDropdown.classes = classes$j;
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";

const defaultProps$p = {
  refProp: "ref",
  popupType: "dialog"
};
const PopoverTarget = factory((props, ref) => {
  const { children, refProp, popupType, ...others } = useProps(
    "PopoverTarget",
    defaultProps$p,
    props
  );
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const forwardedProps = others;
  const ctx = usePopoverContext();
  const targetRef = useMergedRef(ctx.reference, getRefProp(child), ref);
  const accessibleProps = ctx.withRoles ? {
    "aria-haspopup": popupType,
    "aria-expanded": ctx.opened,
    "aria-controls": ctx.getDropdownId(),
    id: ctx.getTargetId()
  } : {};
  const childProps = child.props;
  return reactExports.cloneElement(child, {
    ...forwardedProps,
    ...accessibleProps,
    ...ctx.targetProps,
    className: clsx(ctx.targetProps.className, forwardedProps.className, childProps.className),
    [refProp]: targetRef,
    ...!ctx.controlled ? {
      onClick: () => {
        ctx.onToggle();
        childProps.onClick?.();
      }
    } : null
  });
});
PopoverTarget.displayName = "@mantine/core/PopoverTarget";

function getDefaultMiddlewares$1(middlewares) {
  if (middlewares === void 0) {
    return { shift: true, flip: true };
  }
  const result = { ...middlewares };
  if (middlewares.shift === void 0) {
    result.shift = true;
  }
  if (middlewares.flip === void 0) {
    result.flip = true;
  }
  return result;
}
function getPopoverMiddlewares(options, getFloating, env) {
  const middlewaresOptions = getDefaultMiddlewares$1(options.middlewares);
  const middlewares = [offset(options.offset), hide()];
  if (options.dropdownVisible && env !== "test" && options.preventPositionChangeWhenVisible) {
    middlewaresOptions.flip = false;
  }
  if (middlewaresOptions.shift) {
    middlewares.push(
      shift(
        typeof middlewaresOptions.shift === "boolean" ? { limiter: limitShift(), padding: 5 } : { limiter: limitShift(), padding: 5, ...middlewaresOptions.shift }
      )
    );
  }
  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip)
    );
  }
  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline)
    );
  }
  middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }));
  if (middlewaresOptions.size || options.width === "target") {
    middlewares.push(
      size({
        ...typeof middlewaresOptions.size === "boolean" ? {} : middlewaresOptions.size,
        apply({ rects, availableWidth, availableHeight, ...rest }) {
          const floating = getFloating();
          const styles = floating.refs.floating.current?.style ?? {};
          if (middlewaresOptions.size) {
            if (typeof middlewaresOptions.size === "object" && !!middlewaresOptions.size.apply) {
              middlewaresOptions.size.apply({ rects, availableWidth, availableHeight, ...rest });
            } else {
              Object.assign(styles, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`
              });
            }
          }
          if (options.width === "target") {
            Object.assign(styles, {
              width: `${rects.reference.width}px`
            });
          }
        }
      })
    );
  }
  return middlewares;
}
function usePopover(options) {
  const env = useMantineEnv();
  const [_opened, setOpened] = useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange
  });
  const previouslyOpened = reactExports.useRef(_opened);
  const onClose = () => {
    if (_opened && !options.disabled) {
      setOpened(false);
    }
  };
  const onToggle = () => {
    if (!options.disabled) {
      setOpened(!_opened);
    }
  };
  const floating = useFloating({
    strategy: options.strategy,
    placement: options.preventPositionChangeWhenVisible ? options.positionRef.current : options.position,
    middleware: getPopoverMiddlewares(options, () => floating, env),
    whileElementsMounted: !options.keepMounted ? autoUpdate : void 0
  });
  reactExports.useEffect(() => {
    if (!floating.refs.reference.current || !floating.refs.floating.current) {
      return;
    }
    if (_opened) {
      return autoUpdate(
        floating.refs.reference.current,
        floating.refs.floating.current,
        floating.update
      );
    }
  }, [_opened, floating.update]);
  useDidUpdate(() => {
    options.onPositionChange?.(floating.placement);
    options.positionRef.current = floating.placement;
  }, [floating.placement, options.preventPositionChangeWhenVisible]);
  useDidUpdate(() => {
    if (_opened !== previouslyOpened.current) {
      if (!_opened) {
        options.onClose?.();
      } else {
        options.onOpen?.();
      }
    }
    previouslyOpened.current = _opened;
  }, [_opened, options.onClose, options.onOpen]);
  useIsomorphicEffect(() => {
    let timeout = -1;
    if (_opened) {
      timeout = window.setTimeout(() => options.setDropdownVisible(true), 4);
    }
    return () => {
      window.clearTimeout(timeout);
    };
  }, [_opened, options.position]);
  return {
    floating,
    controlled: typeof options.opened === "boolean",
    opened: _opened,
    onClose,
    onToggle
  };
}

const defaultProps$o = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: true,
  withinPortal: true,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  withOverlay: false,
  hideDetached: true,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: getDefaultZIndex("popover"),
  __staticSelector: "Popover",
  width: "max-content"
};
const varsResolver$r = createVarsResolver((_, { radius, shadow }) => ({
  dropdown: {
    "--popover-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--popover-shadow": getShadow(shadow)
  }
}));
function Popover(_props) {
  const props = useProps("Popover", defaultProps$o, _props);
  const {
    children,
    position,
    offset,
    onPositionChange,
    // Scheduled for removal in 9.0
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionDependencies,
    opened,
    transitionProps,
    onExitTransitionEnd,
    onEnterTransitionEnd,
    width,
    middlewares,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    unstyled,
    classNames,
    styles,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    closeOnEscape,
    clickOutsideEvents,
    trapFocus,
    onClose,
    onDismiss,
    onOpen,
    onChange,
    zIndex,
    radius,
    shadow,
    id,
    defaultOpened,
    __staticSelector,
    withRoles,
    disabled,
    returnFocus,
    variant,
    keepMounted,
    vars,
    floatingStrategy,
    withOverlay,
    overlayProps,
    hideDetached,
    attributes,
    preventPositionChangeWhenVisible,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector,
    props,
    classes: classes$j,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "dropdown",
    vars,
    varsResolver: varsResolver$r
  });
  const { resolvedStyles } = useResolvedStylesApi({ classNames, styles, props });
  const [dropdownVisible, setDropdownVisible] = reactExports.useState(opened ?? defaultOpened ?? false);
  const positionRef = reactExports.useRef(position);
  const arrowRef = reactExports.useRef(null);
  const [targetNode, setTargetNode] = reactExports.useState(null);
  const [dropdownNode, setDropdownNode] = reactExports.useState(null);
  const { dir } = useDirection();
  const env = useMantineEnv();
  const uid = useId(id);
  const popover = usePopover({
    middlewares,
    width,
    position: getFloatingPosition(dir, position),
    offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
    arrowRef,
    arrowOffset,
    onPositionChange,
    positionDependencies,
    opened,
    defaultOpened,
    onChange,
    onOpen,
    onClose,
    onDismiss,
    strategy: floatingStrategy,
    dropdownVisible,
    setDropdownVisible,
    positionRef,
    disabled,
    preventPositionChangeWhenVisible,
    keepMounted
  });
  useClickOutside(
    () => {
      if (closeOnClickOutside) {
        popover.onClose();
        onDismiss?.();
      }
    },
    clickOutsideEvents,
    [targetNode, dropdownNode]
  );
  const reference = reactExports.useCallback(
    (node) => {
      setTargetNode(node);
      popover.floating.refs.setReference(node);
    },
    [popover.floating.refs.setReference]
  );
  const floating = reactExports.useCallback(
    (node) => {
      setDropdownNode(node);
      popover.floating.refs.setFloating(node);
    },
    [popover.floating.refs.setFloating]
  );
  const onExited = reactExports.useCallback(() => {
    transitionProps?.onExited?.();
    onExitTransitionEnd?.();
    setDropdownVisible(false);
    if (!preventPositionChangeWhenVisible) {
      positionRef.current = position;
    }
  }, [transitionProps?.onExited, onExitTransitionEnd, preventPositionChangeWhenVisible, position]);
  const onEntered = reactExports.useCallback(() => {
    transitionProps?.onEntered?.();
    onEnterTransitionEnd?.();
  }, [transitionProps?.onEntered, onEnterTransitionEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PopoverContextProvider,
    {
      value: {
        returnFocus,
        disabled,
        controlled: popover.controlled,
        reference,
        floating,
        x: popover.floating.x,
        y: popover.floating.y,
        arrowX: popover.floating?.middlewareData?.arrow?.x,
        arrowY: popover.floating?.middlewareData?.arrow?.y,
        opened: popover.opened,
        arrowRef,
        transitionProps: { ...transitionProps, onExited, onEntered },
        width,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        placement: popover.floating.placement,
        trapFocus,
        withinPortal,
        portalProps,
        zIndex,
        radius,
        shadow,
        closeOnEscape,
        onDismiss,
        onClose: popover.onClose,
        onToggle: popover.onToggle,
        getTargetId: () => `${uid}-target`,
        getDropdownId: () => `${uid}-dropdown`,
        withRoles,
        targetProps: others,
        __staticSelector,
        classNames,
        styles,
        unstyled,
        variant,
        keepMounted,
        getStyles,
        resolvedStyles,
        floatingStrategy,
        referenceHidden: hideDetached && env !== "test" ? popover.floating.middlewareData.hide?.referenceHidden : false
      },
      children: [
        children,
        withOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Transition,
          {
            transition: "fade",
            mounted: popover.opened,
            duration: transitionProps?.duration || 250,
            exitDuration: transitionProps?.exitDuration || 250,
            children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Overlay,
              {
                ...overlayProps,
                ...getStyles("overlay", {
                  className: overlayProps?.className,
                  style: [transitionStyles, overlayProps?.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = "@mantine/core/Popover";
Popover.extend = (input) => input;

var classes$i = {"root":"m_5ae2e3c","barsLoader":"m_7a2bd4cd","bar":"m_870bb79","bars-loader-animation":"m_5d2b3b9d","dotsLoader":"m_4e3f22d7","dot":"m_870c4af","loader-dots-animation":"m_aac34a1","ovalLoader":"m_b34414df","oval-loader-animation":"m_f8e89c4b"};

const Bars = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "span", className: clsx(classes$i.barsLoader, className), ...others, ref, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.bar }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.bar }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.bar })
] }));
Bars.displayName = "@mantine/core/Bars";

const Dots = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "span", className: clsx(classes$i.dotsLoader, className), ...others, ref, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.dot }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.dot }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$i.dot })
] }));
Dots.displayName = "@mantine/core/Dots";

const Oval = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", className: clsx(classes$i.ovalLoader, className), ...others, ref }));
Oval.displayName = "@mantine/core/Oval";

const defaultLoaders = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
const defaultProps$n = {
  loaders: defaultLoaders,
  type: "oval"
};
const varsResolver$q = createVarsResolver((theme, { size, color }) => ({
  root: {
    "--loader-size": getSize(size, "loader-size"),
    "--loader-color": color ? getThemeColor(color, theme) : void 0
  }
}));
const Loader = factory((_props, ref) => {
  const props = useProps("Loader", defaultProps$n, _props);
  const {
    size,
    color,
    type,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    loaders,
    variant,
    children,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Loader",
    props,
    classes: classes$i,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$q
  });
  if (children) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), ref, ...others, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      ref,
      component: loaders[type],
      variant,
      size,
      ...others
    }
  );
});
Loader.defaultLoaders = defaultLoaders;
Loader.classes = classes$i;
Loader.displayName = "@mantine/core/Loader";

var classes$h = {"root":"m_8d3f4000","icon":"m_8d3afb97","loader":"m_302b9fb1","group":"m_1a0f1b21","groupSection":"m_437b6484"};

const defaultProps$m = {
  orientation: "horizontal"
};
const varsResolver$p = createVarsResolver((_, { borderWidth }) => ({
  group: { "--ai-border-width": rem(borderWidth) }
}));
const ActionIconGroup = factory((_props, ref) => {
  const props = useProps("ActionIconGroup", defaultProps$m, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("ActionIconGroup", defaultProps$m, _props);
  const getStyles = useStyles({
    name: "ActionIconGroup",
    props,
    classes: classes$h,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$p,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("group"),
      ref,
      variant,
      mod: [{ "data-orientation": orientation }, mod],
      role: "group",
      ...others
    }
  );
});
ActionIconGroup.classes = classes$h;
ActionIconGroup.displayName = "@mantine/core/ActionIconGroup";

const varsResolver$o = createVarsResolver(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      groupSection: {
        "--section-height": getSize(size, "section-height"),
        "--section-padding-x": getSize(size, "section-padding-x"),
        "--section-fz": getFontSize(size),
        "--section-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--section-bg": color || variant ? colors.background : void 0,
        "--section-color": colors.color,
        "--section-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ActionIconGroupSection = factory((_props, ref) => {
  const props = useProps("ActionIconGroupSection", null, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    variant,
    gradient,
    radius,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "ActionIconGroupSection",
    props,
    classes: classes$h,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$o,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("groupSection"), ref, variant, ...others });
});
ActionIconGroupSection.classes = classes$h;
ActionIconGroupSection.displayName = "@mantine/core/ActionIconGroupSection";

const varsResolver$n = createVarsResolver(
  (theme, { size, radius, variant, gradient, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--ai-size": getSize(size, "ai-size"),
        "--ai-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--ai-bg": color || variant ? colors.background : void 0,
        "--ai-hover": color || variant ? colors.hover : void 0,
        "--ai-hover-color": color || variant ? colors.hoverColor : void 0,
        "--ai-color": colors.color,
        "--ai-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ActionIcon = polymorphicFactory((_props, ref) => {
  const props = useProps("ActionIcon", null, _props);
  const {
    className,
    unstyled,
    variant,
    classNames,
    styles,
    style,
    loading,
    loaderProps,
    size,
    color,
    radius,
    __staticSelector,
    gradient,
    vars,
    children,
    disabled,
    "data-disabled": dataDisabled,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["ActionIcon", __staticSelector],
    props,
    className,
    style,
    classes: classes$h,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$n
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
      ...others,
      unstyled,
      variant,
      size,
      disabled: disabled || loading,
      ref,
      mod: [{ loading, disabled: disabled || dataDisabled }, mod],
      children: [
        typeof loading === "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { mounted: loading, transition: "slide-down", duration: 150, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("loader", { style: transitionStyles }), "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "var(--ai-color)", size: "calc(var(--ai-size) * 0.55)", ...loaderProps }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { loading }, ...getStyles("icon"), children })
      ]
    }
  );
});
ActionIcon.classes = classes$h;
ActionIcon.displayName = "@mantine/core/ActionIcon";
ActionIcon.Group = ActionIconGroup;
ActionIcon.GroupSection = ActionIconGroupSection;

const CloseIcon = reactExports.forwardRef(
  ({ size = "var(--cb-icon-size, 70%)", style, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: size, height: size },
      ref,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  )
);
CloseIcon.displayName = "@mantine/core/CloseIcon";

var classes$g = {"root":"m_86a44da5","root--subtle":"m_220c80f2"};

const defaultProps$l = {
  variant: "subtle"
};
const varsResolver$m = createVarsResolver((_, { size, radius, iconSize }) => ({
  root: {
    "--cb-size": getSize(size, "cb-size"),
    "--cb-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--cb-icon-size": rem(iconSize)
  }
}));
const CloseButton = polymorphicFactory((_props, ref) => {
  const props = useProps("CloseButton", defaultProps$l, _props);
  const {
    iconSize,
    children,
    vars,
    radius,
    className,
    classNames,
    style,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    disabled,
    variant,
    icon,
    mod,
    attributes,
    __staticSelector,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "CloseButton",
    props,
    className,
    style,
    classes: classes$g,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$m
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ref,
      ...others,
      unstyled,
      variant,
      disabled,
      mod: [{ disabled: disabled || dataDisabled }, mod],
      ...getStyles("root", { variant, active: !disabled && !dataDisabled }),
      children: [
        icon || /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {}),
        children
      ]
    }
  );
});
CloseButton.classes = classes$g;
CloseButton.displayName = "@mantine/core/CloseButton";

function filterFalsyChildren(children) {
  return reactExports.Children.toArray(children).filter(Boolean);
}

var classes$f = {"root":"m_4081bf90"};

const defaultProps$k = {
  preventGrowOverflow: true,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
};
const varsResolver$l = createVarsResolver(
  (_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      "--group-child-width": grow && preventGrowOverflow ? childWidth : void 0,
      "--group-gap": getSpacing(gap),
      "--group-align": align,
      "--group-justify": justify,
      "--group-wrap": wrap
    }
  })
);
const Group = factory((_props, ref) => {
  const props = useProps("Group", defaultProps$k, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    children,
    gap,
    align,
    justify,
    wrap,
    grow,
    preventGrowOverflow,
    vars,
    variant,
    __size,
    mod,
    attributes,
    ...others
  } = props;
  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const resolvedGap = getSpacing(gap ?? "md");
  const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;
  const stylesCtx = { childWidth };
  const getStyles = useStyles({
    name: "Group",
    props,
    stylesCtx,
    className,
    style,
    classes: classes$f,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$l
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      ref,
      variant,
      mod: [{ grow }, mod],
      size: __size,
      ...others,
      children: filteredChildren
    }
  );
});
Group.classes = classes$f;
Group.displayName = "@mantine/core/Group";

const [InputContext, useInputContext] = createOptionalContext({
  size: "sm"
});

const InputClearButton = factory((_props, ref) => {
  const props = useProps("InputClearButton", null, _props);
  const { size, variant, vars, classNames, styles, ...others } = props;
  const ctx = useInputContext();
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CloseButton,
    {
      variant: variant || "transparent",
      ref,
      size: size || ctx?.size || "sm",
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: "InputClearButton",
      style: { pointerEvents: "all", background: "var(--input-bg)", ...others.style },
      ...others
    }
  );
});
InputClearButton.displayName = "@mantine/core/InputClearButton";

const clearSectionOffset = {
  xs: 7,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 15
};
function InputClearSection({
  __clearable,
  __clearSection,
  rightSection,
  __defaultRightSection,
  size = "sm"
}) {
  const clearSection = __clearable && __clearSection;
  if (clearSection && (rightSection || __defaultRightSection)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-combined-clear-section": true,
        style: {
          display: "flex",
          gap: 2,
          alignItems: "center",
          paddingInlineEnd: clearSectionOffset[size]
        },
        children: [
          clearSection,
          rightSection || __defaultRightSection
        ]
      }
    );
  }
  return rightSection === null ? null : rightSection || clearSection || __defaultRightSection;
}

const [InputWrapperProvider, useInputWrapperContext] = createOptionalContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});

var classes$e = {"wrapper":"m_6c018570","input":"m_8fb7ebe7","section":"m_82577fc2","placeholder":"m_88bacfd0","root":"m_46b77525","label":"m_8fdc1311","required":"m_78a94662","error":"m_8f816625","description":"m_fe47ce59"};

const varsResolver$k = createVarsResolver((_, { size }) => ({
  description: {
    "--input-description-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})`
  }
}));
const InputDescription = factory((_props, ref) => {
  const props = useProps("InputDescription", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    __staticSelector,
    __inheritStyles = true,
    attributes,
    variant,
    ...others
  } = useProps("InputDescription", null, props);
  const ctx = useInputWrapperContext();
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "description",
    vars,
    varsResolver: varsResolver$k
  });
  const getStyles = __inheritStyles && ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "p",
      ref,
      variant,
      size,
      ...getStyles("description", ctx?.getStyles ? { className, style } : void 0),
      ...others
    }
  );
});
InputDescription.classes = classes$e;
InputDescription.displayName = "@mantine/core/InputDescription";

const varsResolver$j = createVarsResolver((_, { size }) => ({
  error: {
    "--input-error-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})`
  }
}));
const InputError = factory((_props, ref) => {
  const props = useProps("InputError", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    attributes,
    __staticSelector,
    __inheritStyles = true,
    variant,
    ...others
  } = props;
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "error",
    vars,
    varsResolver: varsResolver$j
  });
  const ctx = useInputWrapperContext();
  const getStyles = __inheritStyles && ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "p",
      ref,
      variant,
      size,
      ...getStyles("error", ctx?.getStyles ? { className, style } : void 0),
      ...others
    }
  );
});
InputError.classes = classes$e;
InputError.displayName = "@mantine/core/InputError";

const defaultProps$j = {
  labelElement: "label"
};
const varsResolver$i = createVarsResolver((_, { size }) => ({
  label: {
    "--input-label-size": getFontSize(size),
    "--input-asterisk-color": void 0
  }
}));
const InputLabel = factory((_props, ref) => {
  const props = useProps("InputLabel", defaultProps$j, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    labelElement,
    size,
    required,
    htmlFor,
    onMouseDown,
    children,
    __staticSelector,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("InputLabel", defaultProps$j, props);
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "label",
    vars,
    varsResolver: varsResolver$i
  });
  const ctx = useInputWrapperContext();
  const getStyles = ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...getStyles("label", ctx?.getStyles ? { className, style } : void 0),
      component: labelElement,
      variant,
      size,
      ref,
      htmlFor: labelElement === "label" ? htmlFor : void 0,
      mod: [{ required }, mod],
      onMouseDown: (event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      },
      ...others,
      children: [
        children,
        required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("required"), "aria-hidden": true, children: " *" })
      ]
    }
  );
});
InputLabel.classes = classes$e;
InputLabel.displayName = "@mantine/core/InputLabel";

const InputPlaceholder = factory((_props, ref) => {
  const props = useProps("InputPlaceholder", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    variant,
    error,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["InputPlaceholder", __staticSelector],
    props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("placeholder"),
      mod: [{ error: !!error }, mod],
      component: "span",
      variant,
      ref,
      ...others
    }
  );
});
InputPlaceholder.classes = classes$e;
InputPlaceholder.displayName = "@mantine/core/InputPlaceholder";

function getInputOffsets(inputWrapperOrder, { hasDescription, hasError }) {
  const inputIndex = inputWrapperOrder.findIndex((part) => part === "input");
  const aboveInput = inputWrapperOrder.slice(0, inputIndex);
  const belowInput = inputWrapperOrder.slice(inputIndex + 1);
  const offsetTop = hasDescription && aboveInput.includes("description") || hasError && aboveInput.includes("error");
  const offsetBottom = hasDescription && belowInput.includes("description") || hasError && belowInput.includes("error");
  return { offsetBottom, offsetTop };
}

const defaultProps$i = {
  labelElement: "label",
  inputContainer: (children) => children,
  inputWrapperOrder: ["label", "description", "input", "error"]
};
const varsResolver$h = createVarsResolver((_, { size }) => ({
  label: {
    "--input-label-size": getFontSize(size),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})`
  },
  description: {
    "--input-description-size": size === void 0 ? void 0 : `calc(${getFontSize(size)} - ${rem(2)})`
  }
}));
const InputWrapper = factory((_props, ref) => {
  const props = useProps("InputWrapper", defaultProps$i, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    variant,
    __staticSelector,
    inputContainer,
    inputWrapperOrder,
    label,
    error,
    description,
    labelProps,
    descriptionProps,
    errorProps,
    labelElement,
    children,
    withAsterisk,
    id,
    required,
    __stylesApiProps,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$h
  });
  const sharedProps = {
    size,
    variant,
    __staticSelector
  };
  const idBase = useId(id);
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = errorProps?.id || `${idBase}-error`;
  const descriptionId = descriptionProps?.id || `${idBase}-description`;
  const inputId = idBase;
  const hasError = !!error && typeof error !== "boolean";
  const hasDescription = !!description;
  const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const labelId = labelProps?.id || `${idBase}-label`;
  const _label = label && /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputLabel,
    {
      labelElement,
      id: labelId,
      htmlFor: inputId,
      required: isRequired,
      ...sharedProps,
      ...labelProps,
      children: label
    },
    "label"
  );
  const _description = hasDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputDescription,
    {
      ...descriptionProps,
      ...sharedProps,
      size: descriptionProps?.size || sharedProps.size,
      id: descriptionProps?.id || descriptionId,
      children: description
    },
    "description"
  );
  const _input = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: inputContainer(children) }, "input");
  const _error = hasError && /* @__PURE__ */ reactExports.createElement(
    InputError,
    {
      ...errorProps,
      ...sharedProps,
      size: errorProps?.size || sharedProps.size,
      key: "error",
      id: errorProps?.id || errorId
    },
    error
  );
  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputWrapperProvider,
    {
      value: {
        getStyles,
        describedBy,
        inputId,
        labelId,
        ...getInputOffsets(inputWrapperOrder, { hasDescription, hasError })
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          ref,
          variant,
          size,
          mod: [{ error: !!error }, mod],
          ...getStyles("root"),
          ...others,
          children: content
        }
      )
    }
  );
});
InputWrapper.classes = classes$e;
InputWrapper.displayName = "@mantine/core/InputWrapper";

const defaultProps$h = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: true,
  withErrorStyles: true,
  size: "sm"
};
const varsResolver$g = createVarsResolver((_, props, ctx) => ({
  wrapper: {
    "--input-margin-top": ctx.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": ctx.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": getSize(props.size, "input-height"),
    "--input-fz": getFontSize(props.size),
    "--input-radius": props.radius === void 0 ? void 0 : getRadius(props.radius),
    "--input-left-section-width": props.leftSectionWidth !== void 0 ? rem(props.leftSectionWidth) : void 0,
    "--input-right-section-width": props.rightSectionWidth !== void 0 ? rem(props.rightSectionWidth) : void 0,
    "--input-padding-y": props.multiline ? getSize(props.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": props.leftSectionPointerEvents,
    "--input-right-section-pointer-events": props.rightSectionPointerEvents
  }
}));
const Input = polymorphicFactory((_props, ref) => {
  const props = useProps("Input", defaultProps$h, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    required,
    __staticSelector,
    __stylesApiProps,
    size,
    wrapperProps,
    error,
    disabled,
    leftSection,
    leftSectionProps,
    leftSectionWidth,
    rightSection,
    rightSectionProps,
    rightSectionWidth,
    rightSectionPointerEvents,
    leftSectionPointerEvents,
    variant,
    vars,
    pointer,
    multiline,
    radius,
    id,
    withAria,
    withErrorStyles,
    mod,
    inputSize,
    attributes,
    __clearSection,
    __clearable,
    __defaultRightSection,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const ctx = useInputWrapperContext();
  const stylesCtx = { offsetBottom: ctx?.offsetBottom, offsetTop: ctx?.offsetTop };
  const getStyles = useStyles({
    name: ["Input", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes$e,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    stylesCtx,
    rootSelector: "wrapper",
    vars,
    varsResolver: varsResolver$g
  });
  const ariaAttributes = withAria ? {
    required,
    disabled,
    "aria-invalid": !!error,
    "aria-describedby": ctx?.describedBy,
    id: ctx?.inputId || id
  } : {};
  const _rightSection = InputClearSection({
    __clearable,
    __clearSection,
    rightSection,
    __defaultRightSection,
    size
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputContext, { value: { size: size || "sm" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...getStyles("wrapper"),
      ...styleProps,
      ...wrapperProps,
      mod: [
        {
          error: !!error && withErrorStyles,
          pointer,
          disabled,
          multiline,
          "data-with-right-section": !!_rightSection,
          "data-with-left-section": !!leftSection
        },
        mod
      ],
      variant,
      size,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ...leftSectionProps,
            "data-position": "left",
            ...getStyles("section", {
              className: leftSectionProps?.className,
              style: leftSectionProps?.style
            }),
            children: leftSection
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            component: "input",
            ...rest,
            ...ariaAttributes,
            ref,
            required,
            mod: { disabled, error: !!error && withErrorStyles },
            variant,
            __size: inputSize,
            ...getStyles("input")
          }
        ),
        _rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ...rightSectionProps,
            "data-position": "right",
            ...getStyles("section", {
              className: rightSectionProps?.className,
              style: rightSectionProps?.style
            }),
            children: _rightSection
          }
        )
      ]
    }
  ) });
});
Input.classes = classes$e;
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Description = InputDescription;
Input.Placeholder = InputPlaceholder;
Input.ClearButton = InputClearButton;
Input.displayName = "@mantine/core/Input";

function useInputProps(component, defaultProps, _props) {
  const props = useProps(component, defaultProps, _props);
  const {
    label,
    description,
    error,
    required,
    classNames,
    styles,
    className,
    unstyled,
    __staticSelector,
    __stylesApiProps,
    errorProps,
    labelProps,
    descriptionProps,
    wrapperProps: _wrapperProps,
    id,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    vars,
    mod,
    attributes,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const wrapperProps = {
    label,
    description,
    error,
    required,
    classNames,
    className,
    __staticSelector,
    __stylesApiProps: __stylesApiProps || props,
    errorProps,
    labelProps,
    descriptionProps,
    unstyled,
    styles,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    id,
    mod,
    attributes,
    ..._wrapperProps
  };
  return {
    ...rest,
    classNames,
    styles,
    unstyled,
    wrapperProps: { ...wrapperProps, ...styleProps },
    inputProps: {
      required,
      classNames,
      styles,
      unstyled,
      size,
      __staticSelector,
      __stylesApiProps: __stylesApiProps || props,
      error,
      variant,
      id,
      attributes
    }
  };
}

const defaultProps$g = {
  __staticSelector: "InputBase",
  withAria: true,
  size: "sm"
};
const InputBase = polymorphicFactory((props, ref) => {
  const { inputProps, wrapperProps, ...others } = useInputProps("InputBase", defaultProps$g, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Wrapper, { ...wrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...inputProps, ...others, ref }) });
});
InputBase.classes = { ...Input.classes, ...Input.Wrapper.classes };
InputBase.displayName = "@mantine/core/InputBase";

const FLEX_STYLE_PROPS_DATA = {
  gap: { type: "spacing", property: "gap" },
  rowGap: { type: "spacing", property: "rowGap" },
  columnGap: { type: "spacing", property: "columnGap" },
  align: { type: "identity", property: "alignItems" },
  justify: { type: "identity", property: "justifyContent" },
  wrap: { type: "identity", property: "flexWrap" },
  direction: { type: "identity", property: "flexDirection" }
};

var classes$d = {"root":"m_8bffd616"};

const Flex = polymorphicFactory((_props, ref) => {
  const props = useProps("Flex", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    wrap,
    direction,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Flex",
    classes: classes$d,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });
  const theme = useMantineTheme();
  const responsiveClassName = useRandomClassName();
  const parsedStyleProps = parseStyleProps({
    styleProps: { gap, rowGap, columnGap, align, justify, wrap, direction },
    theme,
    data: FLEX_STYLE_PROPS_DATA
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InlineStyles,
      {
        selector: `.${responsiveClassName}`,
        styles: parsedStyleProps.styles,
        media: parsedStyleProps.media
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ref,
        ...getStyles("root", {
          className: responsiveClassName,
          style: filterProps(parsedStyleProps.inlineStyles)
        }),
        ...others
      }
    )
  ] });
});
Flex.classes = classes$d;
Flex.displayName = "@mantine/core/Flex";

function useDelayedHover({ open, close, openDelay, closeDelay }) {
  const openTimeout = reactExports.useRef(-1);
  const closeTimeout = reactExports.useRef(-1);
  const clearTimeouts = () => {
    window.clearTimeout(openTimeout.current);
    window.clearTimeout(closeTimeout.current);
  };
  const openDropdown = () => {
    clearTimeouts();
    if (openDelay === 0 || openDelay === void 0) {
      open();
    } else {
      openTimeout.current = window.setTimeout(open, openDelay);
    }
  };
  const closeDropdown = () => {
    clearTimeouts();
    if (closeDelay === 0 || closeDelay === void 0) {
      close();
    } else {
      closeTimeout.current = window.setTimeout(close, closeDelay);
    }
  };
  reactExports.useEffect(() => clearTimeouts, []);
  return { openDropdown, closeDropdown };
}

function AccordionChevron({ style, size = 16, ...others }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: rem(size), height: rem(size), display: "block" },
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
AccordionChevron.displayName = "@mantine/core/AccordionChevron";

var classes$c = {"root":"m_b6d8b162"};

function getTextTruncate(truncate) {
  if (truncate === "start") {
    return "start";
  }
  if (truncate === "end" || truncate) {
    return "end";
  }
  return void 0;
}
const defaultProps$f = {
  inherit: false
};
const varsResolver$f = createVarsResolver(
  // Will be removed in 9.0
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (theme, { variant, lineClamp, gradient, size, color }) => ({
    root: {
      "--text-fz": getFontSize(size),
      "--text-lh": getLineHeight(size),
      "--text-gradient": variant === "gradient" ? getGradient(gradient, theme) : void 0,
      "--text-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0,
      "--text-color": color ? getThemeColor(color, theme) : void 0
    }
  })
);
const Text = polymorphicFactory((_props, ref) => {
  const props = useProps("Text", defaultProps$f, _props);
  const {
    lineClamp,
    truncate,
    inline,
    inherit,
    gradient,
    span,
    __staticSelector,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    variant,
    mod,
    size,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["Text", __staticSelector],
    props,
    classes: classes$c,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$f
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root", { focusable: true }),
      ref,
      component: span ? "span" : "p",
      variant,
      mod: [
        {
          "data-truncate": getTextTruncate(truncate),
          "data-line-clamp": typeof lineClamp === "number",
          "data-inline": inline,
          "data-inherit": inherit
        },
        mod
      ],
      size,
      ...others
    }
  );
});
Text.classes = classes$c;
Text.displayName = "@mantine/core/Text";

function CheckIcon({ size, style, ...others }) {
  const _style = size !== void 0 ? { width: rem(size), height: rem(size), ...style } : style;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: _style,
      "aria-hidden": true,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}

const AvatarGroupContext = reactExports.createContext(null);
const AvatarGroupProvider = AvatarGroupContext.Provider;
function useAvatarGroupContext() {
  const ctx = reactExports.useContext(AvatarGroupContext);
  return { withinGroup: !!ctx };
}

var classes$b = {"group":"m_11def92b","root":"m_f85678b6","image":"m_11f8ac07","placeholder":"m_104cd71f"};

const varsResolver$e = createVarsResolver((_, { spacing }) => ({
  group: {
    "--ag-spacing": getSpacing(spacing)
  }
}));
const AvatarGroup = factory((_props, ref) => {
  const props = useProps("AvatarGroup", null, _props);
  const { classNames, className, style, styles, unstyled, vars, spacing, attributes, ...others } = props;
  const getStyles = useStyles({
    name: "AvatarGroup",
    classes: classes$b,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$e,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarGroupProvider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("group"), ...others }) });
});
AvatarGroup.classes = classes$b;
AvatarGroup.displayName = "@mantine/core/AvatarGroup";

function AvatarPlaceholderIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      ...props,
      "data-avatar-placeholder-icon": true,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}

function hashCode(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
const defaultColors = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet"
];
function getInitialsColor(name, colors = defaultColors) {
  const hash = hashCode(name);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function getInitials(name, limit = 2) {
  const splitted = name.split(" ");
  if (splitted.length === 1) {
    return name.slice(0, limit).toUpperCase();
  }
  return splitted.map((word) => word[0]).slice(0, limit).join("").toUpperCase();
}

const varsResolver$d = createVarsResolver(
  (theme, { size, radius, variant, gradient, color, autoContrast, name, allowedInitialsColors }) => {
    const _color = color === "initials" && typeof name === "string" ? getInitialsColor(name, allowedInitialsColors) : color;
    const colors = theme.variantColorResolver({
      color: _color || "gray",
      theme,
      gradient,
      variant: variant || "light",
      autoContrast
    });
    return {
      root: {
        "--avatar-size": getSize(size, "avatar-size"),
        "--avatar-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--avatar-bg": _color || variant ? colors.background : void 0,
        "--avatar-color": _color || variant ? colors.color : void 0,
        "--avatar-bd": _color || variant ? colors.border : void 0
      }
    };
  }
);
const Avatar = polymorphicFactory((_props, ref) => {
  const props = useProps("Avatar", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    src,
    alt,
    radius,
    color,
    gradient,
    imageProps,
    children,
    autoContrast,
    mod,
    name,
    allowedInitialsColors,
    attributes,
    ...others
  } = props;
  const ctx = useAvatarGroupContext();
  const [error, setError] = reactExports.useState(!src);
  const getStyles = useStyles({
    name: "Avatar",
    props,
    classes: classes$b,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$d
  });
  reactExports.useEffect(() => setError(!src), [src]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      mod: [{ "within-group": ctx.withinGroup }, mod],
      ref,
      ...others,
      children: error || !src ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("placeholder"), title: alt, children: children || typeof name === "string" && getInitials(name) || /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPlaceholderIcon, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          ...imageProps,
          ...getStyles("image"),
          src,
          alt,
          onError: (event) => {
            setError(true);
            imageProps?.onError?.(event);
          }
        }
      )
    }
  );
});
Avatar.classes = classes$b;
Avatar.displayName = "@mantine/core/Avatar";
Avatar.Group = AvatarGroup;

var classes$a = {"root":"m_347db0ec","root--dot":"m_fbd81e3d","label":"m_5add502a","section":"m_91fdda9b"};

const varsResolver$c = createVarsResolver(
  (theme, { radius, color, gradient, variant, size, autoContrast, circle }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--badge-height": getSize(size, "badge-height"),
        "--badge-padding-x": getSize(size, "badge-padding-x"),
        "--badge-fz": getSize(size, "badge-fz"),
        "--badge-radius": circle || radius === void 0 ? void 0 : getRadius(radius),
        "--badge-bg": color || variant ? colors.background : void 0,
        "--badge-color": color || variant ? colors.color : void 0,
        "--badge-bd": color || variant ? colors.border : void 0,
        "--badge-dot-color": variant === "dot" ? getThemeColor(color, theme) : void 0
      }
    };
  }
);
const Badge = polymorphicFactory((_props, ref) => {
  const props = useProps("Badge", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    radius,
    color,
    gradient,
    leftSection,
    rightSection,
    children,
    variant,
    fullWidth,
    autoContrast,
    circle,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Badge",
    props,
    classes: classes$a,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$c
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      variant,
      mod: [
        {
          block: fullWidth,
          circle,
          "with-right-section": !!rightSection,
          "with-left-section": !!leftSection
        },
        mod
      ],
      ...getStyles("root", { variant }),
      ref,
      ...others,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("section"), "data-position": "left", children: leftSection }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("label"), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("section"), "data-position": "right", children: rightSection })
      ]
    }
  );
});
Badge.classes = classes$a;
Badge.displayName = "@mantine/core/Badge";

var classes$9 = {"root":"m_77c9d27d","inner":"m_80f1301b","label":"m_811560b9","section":"m_a74036a","loader":"m_a25b86ee","group":"m_80d6d844","groupSection":"m_70be2a01"};

const defaultProps$e = {
  orientation: "horizontal"
};
const varsResolver$b = createVarsResolver((_, { borderWidth }) => ({
  group: { "--button-border-width": rem(borderWidth) }
}));
const ButtonGroup = factory((_props, ref) => {
  const props = useProps("ButtonGroup", defaultProps$e, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("ButtonGroup", defaultProps$e, _props);
  const getStyles = useStyles({
    name: "ButtonGroup",
    props,
    classes: classes$9,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$b,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("group"),
      ref,
      variant,
      mod: [{ "data-orientation": orientation }, mod],
      role: "group",
      ...others
    }
  );
});
ButtonGroup.classes = classes$9;
ButtonGroup.displayName = "@mantine/core/ButtonGroup";

const varsResolver$a = createVarsResolver(
  (theme, { radius, color, gradient, variant, autoContrast, size }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      groupSection: {
        "--section-height": getSize(size, "section-height"),
        "--section-padding-x": getSize(size, "section-padding-x"),
        "--section-fz": size?.includes("compact") ? getFontSize(size.replace("compact-", "")) : getFontSize(size),
        "--section-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--section-bg": color || variant ? colors.background : void 0,
        "--section-color": colors.color,
        "--section-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ButtonGroupSection = factory((_props, ref) => {
  const props = useProps("ButtonGroupSection", null, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    variant,
    gradient,
    radius,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "ButtonGroupSection",
    props,
    classes: classes$9,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$a,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("groupSection"), ref, variant, ...others });
});
ButtonGroupSection.classes = classes$9;
ButtonGroupSection.displayName = "@mantine/core/ButtonGroupSection";

const loaderTransition = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
  out: { opacity: 0, transform: "translate(-50%, -200%)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity"
};
const varsResolver$9 = createVarsResolver(
  (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--button-justify": justify,
        "--button-height": getSize(size, "button-height"),
        "--button-padding-x": getSize(size, "button-padding-x"),
        "--button-fz": size?.includes("compact") ? getFontSize(size.replace("compact-", "")) : getFontSize(size),
        "--button-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--button-bg": color || variant ? colors.background : void 0,
        "--button-hover": color || variant ? colors.hover : void 0,
        "--button-color": colors.color,
        "--button-bd": color || variant ? colors.border : void 0,
        "--button-hover-color": color || variant ? colors.hoverColor : void 0
      }
    };
  }
);
const Button = polymorphicFactory((_props, ref) => {
  const props = useProps("Button", null, _props);
  const {
    style,
    vars,
    className,
    color,
    disabled,
    children,
    leftSection,
    rightSection,
    fullWidth,
    variant,
    radius,
    loading,
    loaderProps,
    gradient,
    classNames,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Button",
    props,
    classes: classes$9,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$9
  });
  const hasLeftSection = !!leftSection;
  const hasRightSection = !!rightSection;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ref,
      ...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
      unstyled,
      variant,
      disabled: disabled || loading,
      mod: [
        {
          disabled: disabled || dataDisabled,
          loading,
          block: fullWidth,
          "with-left-section": hasLeftSection,
          "with-right-section": hasRightSection
        },
        mod
      ],
      ...others,
      children: [
        typeof loading === "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { mounted: loading, transition: loaderTransition, duration: 150, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("loader", { style: transitionStyles }), "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Loader,
          {
            color: "var(--button-color)",
            size: "calc(var(--button-height) / 1.8)",
            ...loaderProps
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ...getStyles("inner"), children: [
          leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("section"), mod: { position: "left" }, children: leftSection }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { loading }, ...getStyles("label"), children }),
          rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("section"), mod: { position: "right" }, children: rightSection })
        ] })
      ]
    }
  );
});
Button.classes = classes$9;
Button.displayName = "@mantine/core/Button";
Button.Group = ButtonGroup;
Button.GroupSection = ButtonGroupSection;

const [CardProvider, useCardContext] = createSafeContext(
  "Card component was not found in tree"
);

var classes$8 = {"root":"m_e615b15f","section":"m_599a2148"};

const CardSection = polymorphicFactory((_props, ref) => {
  const props = useProps("CardSection", null, _props);
  const { classNames, className, style, styles, vars, withBorder, inheritPadding, mod, ...others } = props;
  const ctx = useCardContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ "with-border": withBorder, "inherit-padding": inheritPadding }, mod],
      ...ctx.getStyles("section", { className, style, styles, classNames }),
      ...others
    }
  );
});
CardSection.classes = classes$8;
CardSection.displayName = "@mantine/core/CardSection";

const varsResolver$8 = createVarsResolver((_, { padding }) => ({
  root: {
    "--card-padding": getSpacing(padding)
  }
}));
const Card = polymorphicFactory((_props, ref) => {
  const props = useProps("Card", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    padding,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Card",
    props,
    classes: classes$8,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$8
  });
  const _children = reactExports.Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === "object" && child && "type" in child && child.type === CardSection) {
      return reactExports.cloneElement(child, {
        "data-first-section": index === 0 || void 0,
        "data-last-section": index === _children.length - 1 || void 0
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CardProvider, { value: { getStyles }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { ref, unstyled, ...getStyles("root"), ...others, children: content }) });
});
Card.classes = classes$8;
Card.displayName = "@mantine/core/Card";
Card.Section = CardSection;

const [ChipGroupProvider, useChipGroupContext] = createOptionalContext();

function ChipGroup(props) {
  const { value, defaultValue, onChange, multiple, children } = useProps("ChipGroup", null, props);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange
  });
  const isChipSelected = (val) => Array.isArray(_value) ? _value.includes(val) : val === _value;
  const handleChange = (event) => {
    const val = event.currentTarget.value;
    if (Array.isArray(_value)) {
      setValue(_value.includes(val) ? _value.filter((v) => v !== val) : [..._value, val]);
    } else {
      setValue(val);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChipGroupProvider, { value: { isChipSelected, onChange: handleChange, multiple }, children });
}
ChipGroup.displayName = "@mantine/core/ChipGroup";

var classes$7 = {"root":"m_f59ffda3","label":"m_be049a53","label--outline":"m_3904c1af","label--filled":"m_fa109255","label--light":"m_f7e165c3","iconWrapper":"m_9ac86df9","checkIcon":"m_d6d72580","input":"m_bde07329"};

const defaultProps$d = {
  type: "checkbox"
};
const varsResolver$7 = createVarsResolver(
  (theme, { size, radius, variant, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--chip-fz": getFontSize(size),
        "--chip-size": getSize(size, "chip-size"),
        "--chip-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--chip-checked-padding": getSize(size, "chip-checked-padding"),
        "--chip-padding": getSize(size, "chip-padding"),
        "--chip-icon-size": getSize(size, "chip-icon-size"),
        "--chip-bg": color || variant ? colors.background : void 0,
        "--chip-hover": color || variant ? colors.hover : void 0,
        "--chip-color": color || variant ? colors.color : void 0,
        "--chip-bd": color || variant ? colors.border : void 0,
        "--chip-spacing": getSize(size, "chip-spacing")
      }
    };
  }
);
const Chip = factory((_props, ref) => {
  const props = useProps("Chip", defaultProps$d, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    id,
    checked,
    defaultChecked,
    onChange,
    value,
    wrapperProps,
    type,
    disabled,
    children,
    size,
    variant,
    icon,
    rootRef,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Chip",
    classes: classes$7,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$7
  });
  const ctx = useChipGroupContext();
  const uuid = useId(id);
  const { styleProps, rest } = extractStyleProps(others);
  const [_value, setValue] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  });
  const contextProps = ctx ? {
    checked: ctx.isChipSelected(value),
    onChange: (event) => {
      ctx.onChange(event);
      onChange?.(event.currentTarget.checked);
    },
    type: ctx.multiple ? "checkbox" : "radio"
  } : {};
  const _checked = contextProps.checked || _value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      size,
      variant,
      ref: rootRef,
      mod,
      ...getStyles("root"),
      ...styleProps,
      ...wrapperProps,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type,
            ...getStyles("input"),
            checked: _checked,
            onChange: (event) => setValue(event.currentTarget.checked),
            id: uuid,
            disabled,
            ref,
            value,
            ...contextProps,
            ...rest
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: uuid,
            "data-checked": _checked || void 0,
            "data-disabled": disabled || void 0,
            ...getStyles("label", { variant: variant || "filled" }),
            children: [
              _checked && icon !== null && icon !== false && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("iconWrapper"), children: icon === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { ...getStyles("checkIcon") }) : icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children })
            ]
          }
        )
      ]
    }
  );
});
Chip.classes = classes$7;
Chip.displayName = "@mantine/core/Chip";
Chip.Group = ChipGroup;

var classes$6 = {"root":"m_3eebeb36","label":"m_9e365f20"};

const defaultProps$c = {
  orientation: "horizontal"
};
const varsResolver$6 = createVarsResolver((theme, { color, variant, size }) => ({
  root: {
    "--divider-color": color ? getThemeColor(color, theme) : void 0,
    "--divider-border-style": variant,
    "--divider-size": getSize(size, "divider-size")
  }
}));
const Divider = factory((_props, ref) => {
  const props = useProps("Divider", defaultProps$c, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    orientation,
    label,
    labelPosition,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Divider",
    classes: classes$6,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$6
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ orientation, "with-label": !!label }, mod],
      ...getStyles("root"),
      ...others,
      role: "separator",
      children: label && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { position: labelPosition }, ...getStyles("label"), children: label })
    }
  );
});
Divider.classes = classes$6;
Divider.displayName = "@mantine/core/Divider";

const defaultProps$b = {
  multiple: false
};
const FileButton = reactExports.forwardRef(
  (props, ref) => {
    const {
      onChange,
      children,
      multiple,
      accept,
      name,
      form,
      resetRef,
      disabled,
      capture,
      inputProps,
      ...others
    } = useProps("FileButton", defaultProps$b, props);
    const inputRef = reactExports.useRef(null);
    const onClick = () => {
      !disabled && inputRef.current?.click();
    };
    const handleChange = (event) => {
      if (event.currentTarget.files === null) {
        return onChange(multiple ? [] : null);
      }
      if (multiple) {
        onChange(Array.from(event.currentTarget.files));
      } else {
        onChange(event.currentTarget.files[0] || null);
      }
    };
    const reset = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };
    assignRef(resetRef, reset);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          style: { display: "none" },
          type: "file",
          accept,
          multiple,
          onChange: handleChange,
          ref: useMergedRef(ref, inputRef),
          name,
          form,
          capture,
          ...inputProps
        }
      ),
      children({ onClick, ...others })
    ] });
  }
);
FileButton.displayName = "@mantine/core/FileButton";

const DefaultValue = ({ value }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: Array.isArray(value) ? value.map((file) => file.name).join(", ") : value?.name });
const defaultProps$a = {
  valueComponent: DefaultValue
};
const _FileInput = factory((_props, ref) => {
  const props = useProps("FileInput", defaultProps$a, _props);
  const {
    unstyled,
    vars,
    onChange,
    value,
    defaultValue,
    multiple,
    accept,
    name,
    form,
    valueComponent: ValueComponent,
    clearable,
    clearButtonProps,
    readOnly,
    capture,
    fileInputProps,
    rightSection,
    size,
    placeholder,
    component,
    resetRef: resetRefProp,
    classNames,
    styles,
    attributes,
    ...others
  } = props;
  const resetRef = reactExports.useRef(null);
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: multiple ? [] : null
  });
  const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null;
  const _rightSection = rightSection || (clearable && hasValue && !readOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    CloseButton,
    {
      ...clearButtonProps,
      variant: "subtle",
      onClick: () => setValue(multiple ? [] : null),
      size,
      unstyled
    }
  ) : null);
  reactExports.useEffect(() => {
    if (Array.isArray(_value) && _value.length === 0 || _value === null) {
      resetRef.current?.();
    }
  }, [_value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileButton,
    {
      onChange: setValue,
      multiple,
      accept,
      name,
      form,
      resetRef: useMergedRef(resetRef, resetRefProp),
      disabled: readOnly,
      capture,
      inputProps: fileInputProps,
      children: (fileButtonProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputBase,
        {
          component: component || "button",
          ref,
          rightSection: _rightSection,
          ...fileButtonProps,
          ...others,
          __staticSelector: "FileInput",
          multiline: true,
          type: "button",
          pointer: true,
          __stylesApiProps: props,
          unstyled,
          size,
          classNames,
          styles,
          attributes,
          children: !hasValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input.Placeholder,
            {
              __staticSelector: "FileInput",
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              attributes,
              children: placeholder
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ValueComponent, { value: _value })
        }
      )
    }
  );
});
_FileInput.classes = InputBase.classes;
_FileInput.displayName = "@mantine/core/FileInput";
const FileInput = _FileInput;

var classes$5 = {"root":"m_6e45937b","loader":"m_e8eb006c","overlay":"m_df587f17"};

const defaultProps$9 = {
  transitionProps: { transition: "fade", duration: 0 },
  overlayProps: { backgroundOpacity: 0.75 },
  zIndex: getDefaultZIndex("overlay")
};
const varsResolver$5 = createVarsResolver((_, { zIndex }) => ({
  root: {
    "--lo-z-index": zIndex?.toString()
  }
}));
const LoadingOverlay = factory((_props, ref) => {
  const props = useProps("LoadingOverlay", defaultProps$9, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    transitionProps,
    loaderProps,
    overlayProps,
    visible,
    zIndex,
    attributes,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles = useStyles({
    name: "LoadingOverlay",
    classes: classes$5,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$5
  });
  const _overlayProps = { ...defaultProps$9.overlayProps, ...overlayProps };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { transition: "fade", ...transitionProps, mounted: !!visible, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("root", { style: transitionStyles }), ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { ...getStyles("loader"), unstyled, ...loaderProps }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Overlay,
      {
        ..._overlayProps,
        ...getStyles("overlay"),
        darkHidden: true,
        unstyled,
        color: overlayProps?.color || theme.white
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Overlay,
      {
        ..._overlayProps,
        ...getStyles("overlay"),
        lightHidden: true,
        unstyled,
        color: overlayProps?.color || theme.colors.dark[5]
      }
    )
  ] }) });
});
LoadingOverlay.classes = classes$5;
LoadingOverlay.displayName = "@mantine/core/LoadingOverlay";

const [MenuContextProvider, useMenuContext] = createSafeContext(
  "Menu component was not found in the tree"
);

var classes$4 = {"dropdown":"m_dc9b7c9f","label":"m_9bfac126","divider":"m_efdf90cb","item":"m_99ac2aa1","itemLabel":"m_5476e0d3","itemSection":"m_8b75e504","chevron":"m_b85b0bed"};

const MenuDivider = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuDivider",
    null,
    props
  );
  const ctx = useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("divider", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuDivider.classes = classes$4;
MenuDivider.displayName = "@mantine/core/MenuDivider";

const MenuDropdown = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    children,
    ...others
  } = useProps("MenuDropdown", null, props);
  const wrapperRef = reactExports.useRef(null);
  const ctx = useMenuContext();
  const handleKeyDown = createEventHandler(onKeyDown, (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      wrapperRef.current?.querySelectorAll("[data-menu-item]:not(:disabled)")[0]?.focus();
    }
  });
  const handleMouseEnter = createEventHandler(
    onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const handleMouseLeave = createEventHandler(
    onMouseLeave,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.closeDropdown()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Popover.Dropdown,
    {
      ...others,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      role: "menu",
      "aria-orientation": "vertical",
      ref: useMergedRef(ref, wrapperRef),
      ...ctx.getStyles("dropdown", {
        className,
        style,
        styles,
        classNames,
        withStaticClass: false
      }),
      tabIndex: -1,
      "data-menu-dropdown": true,
      onKeyDown: handleKeyDown,
      children: [
        ctx.withInitialFocusPlaceholder && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { tabIndex: -1, "data-autofocus": true, "data-mantine-stop-propagation": true, style: { outline: 0 } }),
        children
      ]
    }
  );
});
MenuDropdown.classes = classes$4;
MenuDropdown.displayName = "@mantine/core/MenuDropdown";

const [SubMenuProvider, useSubMenuContext] = createOptionalContext();

const MenuItem = polymorphicFactory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    color,
    closeMenuOnClick,
    leftSection,
    rightSection,
    children,
    disabled,
    "data-disabled": dataDisabled,
    ...others
  } = useProps("MenuItem", null, props);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = reactExports.useRef(null);
  const _others = others;
  const handleClick = createEventHandler(_others.onClick, () => {
    if (dataDisabled) {
      return;
    }
    if (typeof closeMenuOnClick === "boolean") {
      closeMenuOnClick && ctx.closeDropdownImmediately();
    } else {
      ctx.closeOnItemClick && ctx.closeDropdownImmediately();
    }
  });
  const colors = color ? theme.variantColorResolver({ color, theme, variant: "light" }) : void 0;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;
  const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
    if (event.key === "ArrowLeft" && subCtx) {
      subCtx.close();
      subCtx.focusParentItem();
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      onMouseDown: (event) => event.preventDefault(),
      ...others,
      unstyled: ctx.unstyled,
      tabIndex: ctx.menuItemTabIndex,
      ...ctx.getStyles("item", { className, style, styles, classNames }),
      ref: useMergedRef(itemRef, ref),
      role: "menuitem",
      disabled,
      "data-menu-item": true,
      "data-disabled": disabled || dataDisabled || void 0,
      "data-mantine-stop-propagation": true,
      onClick: handleClick,
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: "vertical",
        onKeyDown: handleKeydown
      }),
      __vars: {
        "--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
        "--menu-item-hover": colors?.hover
      },
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemLabel", { styles, classNames }), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "right", children: rightSection })
      ]
    }
  );
});
MenuItem.classes = classes$4;
MenuItem.displayName = "@mantine/core/MenuItem";

const MenuLabel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuLabel",
    null,
    props
  );
  const ctx = useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("label", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuLabel.classes = classes$4;
MenuLabel.displayName = "@mantine/core/MenuLabel";

const MenuSubDropdown = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    children,
    ...others
  } = useProps("MenuSubDropdown", null, props);
  const wrapperRef = reactExports.useRef(null);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const handleMouseEnter = createEventHandler(onMouseEnter, subCtx?.open);
  const handleMouseLeave = createEventHandler(onMouseLeave, subCtx?.close);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover.Dropdown,
    {
      ...others,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      role: "menu",
      "aria-orientation": "vertical",
      ref: useMergedRef(ref, wrapperRef),
      ...ctx.getStyles("dropdown", {
        className,
        style,
        styles,
        classNames,
        withStaticClass: false
      }),
      tabIndex: -1,
      "data-menu-dropdown": true,
      children
    }
  );
});
MenuSubDropdown.classes = classes$4;
MenuSubDropdown.displayName = "@mantine/core/MenuSubDropdown";

const MenuSubItem = polymorphicFactory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    color,
    leftSection,
    rightSection,
    children,
    disabled,
    "data-disabled": dataDisabled,
    closeMenuOnClick,
    ...others
  } = useProps("MenuSubItem", null, props);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = reactExports.useRef(null);
  const _others = others;
  const colors = color ? theme.variantColorResolver({ color, theme, variant: "light" }) : void 0;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;
  const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
    if (event.key === "ArrowRight") {
      subCtx?.open();
      subCtx?.focusFirstItem();
    }
    if (event.key === "ArrowLeft" && subCtx?.parentContext) {
      subCtx.parentContext.close();
      subCtx.parentContext.focusParentItem();
    }
  });
  const handleClick = createEventHandler(_others.onClick, () => {
    if (!dataDisabled && closeMenuOnClick) {
      ctx.closeDropdownImmediately();
    }
  });
  const handleMouseEnter = createEventHandler(_others.onMouseEnter, subCtx?.open);
  const handleMouseLeave = createEventHandler(_others.onMouseLeave, subCtx?.close);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      onMouseDown: (event) => event.preventDefault(),
      ...others,
      unstyled: ctx.unstyled,
      tabIndex: ctx.menuItemTabIndex,
      ...ctx.getStyles("item", { className, style, styles, classNames }),
      ref: useMergedRef(itemRef, ref),
      role: "menuitem",
      disabled,
      "data-menu-item": true,
      "data-sub-menu-item": true,
      "data-disabled": disabled || dataDisabled || void 0,
      "data-mantine-stop-propagation": true,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: "vertical",
        onKeyDown: handleKeydown
      }),
      __vars: {
        "--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
        "--menu-item-hover": colors?.hover
      },
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemLabel", { styles, classNames }), children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "right", children: rightSection || /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionChevron, { ...ctx.getStyles("chevron"), size: 14 }) })
      ]
    }
  );
});
MenuSubItem.classes = classes$4;
MenuSubItem.displayName = "@mantine/core/MenuSubItem";

function MenuSubTarget({ children, refProp }) {
  if (!isElement(children)) {
    throw new Error(
      "Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { refProp, popupType: "menu", children });
}
MenuSubTarget.displayName = "@mantine/core/MenuSubTarget";

const defaultProps$8 = {
  offset: 0,
  position: "right-start",
  transitionProps: { duration: 0 },
  openDelay: 0,
  middlewares: {
    shift: {
      // Enable crossAxis shift to keep submenu dropdown within viewport bounds when positioned horizontally
      crossAxis: true
    }
  }
};
function MenuSub(_props) {
  const { children, closeDelay, openDelay, ...others } = useProps("MenuSub", defaultProps$8, _props);
  const id = useId();
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = useSubMenuContext();
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    closeDelay,
    openDelay
  });
  const focusFirstItem = () => window.setTimeout(() => {
    document.getElementById(`${id}-dropdown`)?.querySelectorAll("[data-menu-item]:not([data-disabled])")[0]?.focus();
  }, 16);
  const focusParentItem = () => window.setTimeout(() => {
    document.getElementById(`${id}-target`)?.focus();
  }, 16);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SubMenuProvider,
    {
      value: {
        opened,
        close: closeDropdown,
        open: openDropdown,
        focusFirstItem,
        focusParentItem,
        parentContext: ctx
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popover, { opened, withinPortal: false, withArrow: false, id, ...others, children })
    }
  );
}
MenuSub.extend = (input) => input;
MenuSub.displayName = "@mantine/core/MenuSub";
MenuSub.Target = MenuSubTarget;
MenuSub.Dropdown = MenuSubDropdown;
MenuSub.Item = MenuSubItem;

const defaultProps$7 = {
  refProp: "ref"
};
const MenuTarget = reactExports.forwardRef((props, ref) => {
  const { children, refProp, ...others } = useProps("MenuTarget", defaultProps$7, props);
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useMenuContext();
  const _childProps = child.props;
  const onClick = createEventHandler(_childProps.onClick, () => {
    if (ctx.trigger === "click") {
      ctx.toggleDropdown();
    } else if (ctx.trigger === "click-hover") {
      ctx.setOpenedViaClick(true);
      if (!ctx.opened) {
        ctx.openDropdown();
      }
    }
  });
  const onMouseEnter = createEventHandler(
    _childProps.onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const onMouseLeave = createEventHandler(_childProps.onMouseLeave, () => {
    if (ctx.trigger === "hover") {
      ctx.closeDropdown();
    } else if (ctx.trigger === "click-hover" && !ctx.openedViaClick) {
      ctx.closeDropdown();
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { refProp, popupType: "menu", ref, ...others, children: reactExports.cloneElement(child, {
    onClick,
    onMouseEnter,
    onMouseLeave,
    "data-expanded": ctx.opened ? true : void 0
  }) });
});
MenuTarget.displayName = "@mantine/core/MenuTarget";

const defaultProps$6 = {
  trapFocus: true,
  closeOnItemClick: true,
  withInitialFocusPlaceholder: true,
  clickOutsideEvents: ["mousedown", "touchstart", "keydown"],
  loop: true,
  trigger: "click",
  openDelay: 0,
  closeDelay: 100,
  menuItemTabIndex: -1
};
function Menu(_props) {
  const props = useProps("Menu", defaultProps$6, _props);
  const {
    children,
    onOpen,
    onClose,
    opened,
    defaultOpened,
    trapFocus,
    onChange,
    closeOnItemClick,
    loop,
    closeOnEscape,
    trigger,
    openDelay,
    closeDelay,
    classNames,
    styles,
    unstyled,
    variant,
    vars,
    menuItemTabIndex,
    keepMounted,
    withInitialFocusPlaceholder,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Menu",
    classes: classes$4,
    props,
    classNames,
    styles,
    unstyled,
    attributes
  });
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const [openedViaClick, setOpenedViaClick] = reactExports.useState(false);
  const close = () => {
    setOpened(false);
    setOpenedViaClick(false);
    _opened && onClose?.();
  };
  const open = () => {
    setOpened(true);
    !_opened && onOpen?.();
  };
  const toggleDropdown = () => {
    _opened ? close() : open();
  };
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay, openDelay });
  const getItemIndex = (node) => getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuContextProvider,
    {
      value: {
        getStyles,
        opened: _opened,
        toggleDropdown,
        getItemIndex,
        openedViaClick,
        setOpenedViaClick,
        closeOnItemClick,
        closeDropdown: trigger === "click" ? close : closeDropdown,
        openDropdown: trigger === "click" ? open : openDropdown,
        closeDropdownImmediately: close,
        loop,
        trigger,
        unstyled,
        menuItemTabIndex,
        withInitialFocusPlaceholder
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popover,
        {
          returnFocus: true,
          ...others,
          opened: _opened,
          onChange: toggleDropdown,
          defaultOpened,
          trapFocus: keepMounted ? false : trapFocus,
          closeOnEscape,
          __staticSelector: "Menu",
          classNames: resolvedClassNames,
          styles: resolvedStyles,
          unstyled,
          variant,
          keepMounted,
          children
        }
      )
    }
  );
}
Menu.extend = (input) => input;
Menu.withProps = getWithProps(Menu);
Menu.classes = classes$4;
Menu.displayName = "@mantine/core/Menu";
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;
Menu.Sub = MenuSub;

const defaultTransition = {
  duration: 100,
  transition: "fade"
};
function getTransitionProps(transitionProps, componentTransition) {
  return { ...defaultTransition, ...componentTransition, ...transitionProps };
}

function useFloatingTooltip({
  offset,
  position,
  defaultOpened
}) {
  const [opened, setOpened] = reactExports.useState(defaultOpened);
  const boundaryRef = reactExports.useRef(null);
  const { x, y, elements, refs, update, placement } = useFloating({
    placement: position,
    middleware: [
      shift({
        crossAxis: true,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  });
  const horizontalOffset = placement.includes("right") ? offset : position.includes("left") ? offset * -1 : 0;
  const verticalOffset = placement.includes("bottom") ? offset : position.includes("top") ? offset * -1 : 0;
  const handleMouseMove = reactExports.useCallback(
    ({ clientX, clientY }) => {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            left: clientX + horizontalOffset,
            top: clientY + verticalOffset,
            right: clientX,
            bottom: clientY
          };
        }
      });
    },
    [elements.reference]
  );
  reactExports.useEffect(() => {
    if (refs.floating.current) {
      const boundary = boundaryRef.current;
      boundary.addEventListener("mousemove", handleMouseMove);
      const parents = getOverflowAncestors(refs.floating.current);
      parents.forEach((parent) => {
        parent.addEventListener("scroll", update);
      });
      return () => {
        boundary.removeEventListener("mousemove", handleMouseMove);
        parents.forEach((parent) => {
          parent.removeEventListener("scroll", update);
        });
      };
    }
    return void 0;
  }, [elements.reference, refs.floating.current, update, handleMouseMove, opened]);
  return { handleMouseMove, x, y, opened, setOpened, boundaryRef, floating: refs.setFloating };
}

var classes$3 = {"tooltip":"m_1b3c8819","arrow":"m_f898399f"};

const defaultProps$5 = {
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: getDefaultZIndex("popover")
};
const varsResolver$4 = createVarsResolver((theme, { radius, color }) => ({
  tooltip: {
    "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--tooltip-bg": color ? getThemeColor(color, theme) : void 0,
    "--tooltip-color": color ? "var(--mantine-color-white)" : void 0
  }
}));
const TooltipFloating = factory((_props, ref) => {
  const props = useProps("TooltipFloating", defaultProps$5, _props);
  const {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset,
    position,
    multiline,
    zIndex,
    disabled,
    defaultOpened,
    variant,
    vars,
    portalProps,
    attributes,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles = useStyles({
    name: "TooltipFloating",
    props,
    classes: classes$3,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver$4
  });
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset,
    position,
    defaultOpened
  });
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = useMergedRef(boundaryRef, getRefProp(child), ref);
  const childProps = child.props;
  const onMouseEnter = (event) => {
    childProps.onMouseEnter?.(event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    childProps.onMouseLeave?.(event);
    setOpened(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...others,
        ...getStyles("tooltip", {
          style: {
            ...getStyleObject(style, theme),
            zIndex,
            display: !disabled && opened ? "block" : "none",
            top: (y && Math.round(y)) ?? "",
            left: (x && Math.round(x)) ?? ""
          }
        }),
        variant,
        ref: floating,
        mod: { multiline },
        children: label
      }
    ) }),
    reactExports.cloneElement(child, {
      ...childProps,
      [refProp]: targetRef,
      onMouseEnter,
      onMouseLeave
    })
  ] });
});
TooltipFloating.classes = classes$3;
TooltipFloating.displayName = "@mantine/core/TooltipFloating";

const TooltipGroupContext = reactExports.createContext(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => reactExports.useContext(TooltipGroupContext);

const defaultProps$4 = {
  openDelay: 0,
  closeDelay: 0
};
function TooltipGroup(props) {
  const { openDelay, closeDelay, children } = useProps("TooltipGroup", defaultProps$4, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipGroupProvider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingDelayGroup, { delay: { open: openDelay, close: closeDelay }, children }) });
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";
TooltipGroup.extend = (c) => c;

function getDefaultMiddlewares(middlewares) {
  if (middlewares === void 0) {
    return { shift: true, flip: true };
  }
  const result = { ...middlewares };
  if (middlewares.shift === void 0) {
    result.shift = true;
  }
  if (middlewares.flip === void 0) {
    result.flip = true;
  }
  return result;
}
function getTooltipMiddlewares(settings) {
  const middlewaresOptions = getDefaultMiddlewares(settings.middlewares);
  const middlewares = [offset(settings.offset)];
  if (middlewaresOptions.shift) {
    middlewares.push(
      shift(
        typeof middlewaresOptions.shift === "boolean" ? { padding: 8 } : { padding: 8, ...middlewaresOptions.shift }
      )
    );
  }
  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip)
    );
  }
  middlewares.push(arrow({ element: settings.arrowRef, padding: settings.arrowOffset }));
  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline)
    );
  } else if (settings.inline) {
    middlewares.push(inline());
  }
  return middlewares;
}
function useTooltip(settings) {
  const [uncontrolledOpened, setUncontrolledOpened] = reactExports.useState(settings.defaultOpened);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = useTooltipGroupContext();
  const uid = useId();
  const onChange = reactExports.useCallback(
    (_opened) => {
      setUncontrolledOpened(_opened);
      if (_opened) {
        setCurrentId(uid);
      }
    },
    [uid]
  );
  const {
    x,
    y,
    context,
    refs,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    strategy: settings.strategy,
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: getTooltipMiddlewares(settings),
    whileElementsMounted: autoUpdate
  });
  const { delay: groupDelay, currentId, setCurrentId } = useDelayGroup(context, { id: uid });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover$1(context, {
      enabled: settings.events?.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events?.touch
    }),
    useFocus(context, { enabled: settings.events?.focus, visibleOnly: true }),
    useRole(context, { role: "tooltip" }),
    // Cannot be used with controlled tooltip, page jumps
    useDismiss(context, { enabled: typeof settings.opened === "undefined" })
  ]);
  useDidUpdate(() => {
    settings.onPositionChange?.(placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference: refs.setReference,
    floating: refs.setFloating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}

const defaultProps$3 = {
  position: "top",
  refProp: "ref",
  withinPortal: true,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: [],
  middlewares: { flip: true, shift: true, inline: false }
};
const varsResolver$3 = createVarsResolver(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      theme,
      color: color || theme.primaryColor,
      autoContrast,
      variant: variant || "filled"
    });
    return {
      tooltip: {
        "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--tooltip-bg": color ? colors.background : void 0,
        "--tooltip-color": color ? colors.color : void 0
      }
    };
  }
);
const Tooltip = factory((_props, ref) => {
  const props = useProps("Tooltip", defaultProps$3, _props);
  const {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    defaultOpened,
    withinPortal,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset,
    transitionProps,
    multiline,
    events,
    zIndex,
    disabled,
    // Scheduled for removal in 9.0
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline,
    variant,
    keepMounted,
    vars,
    portalProps,
    mod,
    floatingStrategy,
    middlewares,
    autoContrast,
    attributes,
    target,
    ...others
  } = useProps("Tooltip", defaultProps$3, props);
  const { dir } = useDirection();
  const arrowRef = reactExports.useRef(null);
  const tooltip = useTooltip({
    position: getFloatingPosition(dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    defaultOpened,
    events,
    arrowRef,
    arrowOffset,
    offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
    positionDependencies: [...positionDependencies, target ?? children],
    inline,
    strategy: floatingStrategy,
    middlewares
  });
  reactExports.useEffect(() => {
    const targetNode = target instanceof HTMLElement ? target : typeof target === "string" ? document.querySelector(target) : target?.current || null;
    if (targetNode) {
      tooltip.reference(targetNode);
    }
  }, [target, tooltip]);
  const getStyles = useStyles({
    name: "Tooltip",
    props,
    classes: classes$3,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver$3
  });
  const child = getSingleElementChild(children);
  if (!target && !child) {
    return null;
  }
  if (target) {
    const transition2 = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        ...transition2,
        keepMounted,
        mounted: !disabled && !!tooltip.opened,
        duration: tooltip.isGroupPhase ? 10 : transition2.duration,
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            ...others,
            "data-fixed": floatingStrategy === "fixed" || void 0,
            variant,
            mod: [{ multiline }, mod],
            ...tooltip.getFloatingProps({
              ref: tooltip.floating,
              className: getStyles("tooltip").className,
              style: {
                ...getStyles("tooltip").style,
                ...transitionStyles,
                zIndex,
                top: tooltip.y ?? 0,
                left: tooltip.x ?? 0
              }
            }),
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FloatingArrow,
                {
                  ref: arrowRef,
                  arrowX: tooltip.arrowX,
                  arrowY: tooltip.arrowY,
                  visible: withArrow,
                  position: tooltip.placement,
                  arrowSize,
                  arrowOffset,
                  arrowRadius,
                  arrowPosition,
                  ...getStyles("arrow")
                }
              )
            ]
          }
        )
      }
    ) }) });
  }
  const childProps = child.props;
  const targetRef = useMergedRef(tooltip.reference, getRefProp(child), ref);
  const transition = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        ...transition,
        keepMounted,
        mounted: !disabled && !!tooltip.opened,
        duration: tooltip.isGroupPhase ? 10 : transition.duration,
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            ...others,
            "data-fixed": floatingStrategy === "fixed" || void 0,
            variant,
            mod: [{ multiline }, mod],
            ...tooltip.getFloatingProps({
              ref: tooltip.floating,
              className: getStyles("tooltip").className,
              style: {
                ...getStyles("tooltip").style,
                ...transitionStyles,
                zIndex,
                top: tooltip.y ?? 0,
                left: tooltip.x ?? 0
              }
            }),
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FloatingArrow,
                {
                  ref: arrowRef,
                  arrowX: tooltip.arrowX,
                  arrowY: tooltip.arrowY,
                  visible: withArrow,
                  position: tooltip.placement,
                  arrowSize,
                  arrowOffset,
                  arrowRadius,
                  arrowPosition,
                  ...getStyles("arrow")
                }
              )
            ]
          }
        )
      }
    ) }),
    reactExports.cloneElement(
      child,
      tooltip.getReferenceProps({
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove: props.onMouseMove,
        onPointerDown: props.onPointerDown,
        onPointerEnter: props.onPointerEnter,
        ...childProps,
        className: clsx(className, childProps.className),
        [refProp]: targetRef
      })
    )
  ] });
});
Tooltip.classes = classes$3;
Tooltip.displayName = "@mantine/core/Tooltip";
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;

var classes$2 = {"root":"m_18320242","skeleton-fade":"m_299c329c"};

const defaultProps$2 = {
  visible: true,
  animate: true
};
const varsResolver$2 = createVarsResolver(
  (_, { width, height, radius, circle }) => ({
    root: {
      "--skeleton-height": rem(height),
      "--skeleton-width": circle ? rem(height) : rem(width),
      "--skeleton-radius": circle ? "1000px" : radius === void 0 ? void 0 : getRadius(radius)
    }
  })
);
const Skeleton = factory((_props, ref) => {
  const props = useProps("Skeleton", defaultProps$2, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    width,
    height,
    circle,
    visible,
    radius,
    animate,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Skeleton",
    classes: classes$2,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), mod: [{ visible, animate }, mod], ...others });
});
Skeleton.classes = classes$2;
Skeleton.displayName = "@mantine/core/Skeleton";

var classes$1 = {"root":"m_6d731127"};

const defaultProps$1 = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
};
const varsResolver$1 = createVarsResolver((_, { gap, align, justify }) => ({
  root: {
    "--stack-gap": getSpacing(gap),
    "--stack-align": align,
    "--stack-justify": justify
  }
}));
const Stack = factory((_props, ref) => {
  const props = useProps("Stack", defaultProps$1, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    align,
    justify,
    gap,
    variant,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Stack",
    props,
    classes: classes$1,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$1
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), variant, ...others });
});
Stack.classes = classes$1;
Stack.displayName = "@mantine/core/Stack";

const [TabsProvider, useTabsContext] = createSafeContext(
  "Tabs component was not found in the tree"
);

var classes = {"root":"m_89d60db1","list--default":"m_576c9d4","list":"m_89d33d6d","tab":"m_4ec4dce6","panel":"m_b0c91715","tabSection":"m_fc420b1f","tabLabel":"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};

const TabsList = factory((_props, ref) => {
  const props = useProps("TabsList", null, _props);
  const { children, className, grow, justify, classNames, styles, style, mod, ...others } = props;
  const ctx = useTabsContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...others,
      ...ctx.getStyles("list", {
        className,
        style,
        classNames,
        styles,
        props,
        variant: ctx.variant
      }),
      ref,
      role: "tablist",
      variant: ctx.variant,
      mod: [
        {
          grow,
          orientation: ctx.orientation,
          placement: ctx.orientation === "vertical" && ctx.placement,
          inverted: ctx.inverted
        },
        mod
      ],
      "aria-orientation": ctx.orientation,
      __vars: { "--tabs-justify": justify },
      children
    }
  );
});
TabsList.classes = classes;
TabsList.displayName = "@mantine/core/TabsList";

const TabsPanel = factory((_props, ref) => {
  const props = useProps("TabsPanel", null, _props);
  const { children, className, value, classNames, styles, style, mod, keepMounted, ...others } = props;
  const ctx = useTabsContext();
  const active = ctx.value === value;
  const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...ctx.getStyles("panel", {
        className,
        classNames,
        styles,
        style: [style, !active ? { display: "none" } : void 0],
        props
      }),
      ref,
      mod: [{ orientation: ctx.orientation }, mod],
      role: "tabpanel",
      id: ctx.getPanelId(value),
      "aria-labelledby": ctx.getTabId(value),
      ...others,
      children: content
    }
  );
});
TabsPanel.classes = classes;
TabsPanel.displayName = "@mantine/core/TabsPanel";

const TabsTab = factory((_props, ref) => {
  const props = useProps("TabsTab", null, _props);
  const {
    className,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    style,
    classNames,
    styles,
    vars,
    mod,
    tabIndex,
    ...others
  } = props;
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const ctx = useTabsContext();
  const active = value === ctx.value;
  const activateTab = (event) => {
    ctx.onChange(ctx.allowTabDeactivation ? value === ctx.value ? null : value : value);
    onClick?.(event);
  };
  const stylesApiProps = { classNames, styles, props };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ...ctx.getStyles("tab", { className, style, variant: ctx.variant, ...stylesApiProps }),
      disabled,
      unstyled: ctx.unstyled,
      variant: ctx.variant,
      mod: [
        {
          active,
          disabled,
          orientation: ctx.orientation,
          inverted: ctx.inverted,
          placement: ctx.orientation === "vertical" && ctx.placement
        },
        mod
      ],
      ref,
      role: "tab",
      id: ctx.getTabId(value),
      "aria-selected": active,
      tabIndex: tabIndex !== void 0 ? tabIndex : active || ctx.value === null ? 0 : -1,
      "aria-controls": ctx.getPanelId(value),
      onClick: activateTab,
      __vars: { "--tabs-color": color ? getThemeColor(color, theme) : void 0 },
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboard,
        loop: ctx.loop,
        orientation: ctx.orientation || "horizontal",
        dir,
        onKeyDown
      }),
      ...others,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabLabel", stylesApiProps), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "right", children: rightSection })
      ]
    }
  );
});
TabsTab.classes = classes;
TabsTab.displayName = "@mantine/core/TabsTab";

const VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
const defaultProps = {
  keepMounted: true,
  orientation: "horizontal",
  loop: true,
  activateTabWithKeyboard: true,
  variant: "default",
  placement: "left"
};
const varsResolver = createVarsResolver((theme, { radius, color, autoContrast }) => ({
  root: {
    "--tabs-radius": getRadius(radius),
    "--tabs-color": getThemeColor(color, theme),
    "--tabs-text-color": getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
  }
}));
const Tabs = factory((_props, ref) => {
  const props = useProps("Tabs", defaultProps, _props);
  const {
    defaultValue,
    value,
    onChange,
    orientation,
    children,
    loop,
    id,
    activateTabWithKeyboard,
    allowTabDeactivation,
    variant,
    color,
    radius,
    inverted,
    placement,
    keepMounted,
    classNames,
    styles,
    unstyled,
    className,
    style,
    vars,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const getStyles = useStyles({
    name: "Tabs",
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabsProvider,
    {
      value: {
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        color,
        radius,
        inverted,
        keepMounted,
        unstyled,
        getStyles
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          ref,
          id: uid,
          variant,
          mod: [
            {
              orientation,
              inverted: orientation === "horizontal" && inverted,
              placement: orientation === "vertical" && placement
            },
            mod
          ],
          ...getStyles("root"),
          ...others,
          children
        }
      )
    }
  );
});
Tabs.classes = classes;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;

const TextInput = factory((props, ref) => {
  const _props = useProps("TextInput", null, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputBase, { component: "input", ref, ..._props, __staticSelector: "TextInput" });
});
TextInput.classes = InputBase.classes;
TextInput.displayName = "@mantine/core/TextInput";

export { ActionIcon as A, Button as B, Card as C, Divider as D, Flex as F, Group as G, Loader as L, MantineContext as M, PopoverDropdown as P, Stack as S, Text as T, MantineProvider as a, Menu as b, CheckIcon as c, Tooltip as d, useFocusWithin as e, useFocusTrap as f, PopoverTarget as g, Popover as h, TextInput as i, Badge as j, FileInput as k, Tabs as l, mergeRefs as m, LoadingOverlay as n, Skeleton as o, Avatar as p, Chip as q, useHover as u };
