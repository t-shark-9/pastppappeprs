// Shim for eventemitter3 to provide a proper default export
// This fixes the "EVe is not a constructor" error in production builds
import EventEmitter from 'eventemitter3';
export default EventEmitter;
export { EventEmitter };
