// Shim for eventemitter3 to provide a proper default export
// This fixes the "EVe is not a constructor" error in production builds
// We need to use require to avoid circular dependency with the alias
// @ts-ignore
const EventEmitterModule = require('../../node_modules/eventemitter3/index.js');
const EventEmitter = EventEmitterModule.default || EventEmitterModule;
export default EventEmitter;
export { EventEmitter };
