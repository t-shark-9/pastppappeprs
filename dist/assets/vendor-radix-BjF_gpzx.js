// src/primitive.tsx
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// packages/core/number/src/number.ts
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}

export { clamp as a, composeEventHandlers as c };
