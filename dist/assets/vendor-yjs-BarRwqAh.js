import { dJ as ObservableV2, dK as uint32, dL as uuidv4, dM as create, dN as from, ae as setIfUndefined, a8 as methodUnimplemented, dO as iteratorMap, dP as forEach, dQ as create$1, dR as createDecoder, dS as readVarUint, dT as IntDiffOptRleDecoder, dU as readVarUint8Array, dV as UintOptRleDecoder, dW as RleDecoder, dX as readUint8, dY as StringDecoder, dZ as readAny, d_ as IntDiffOptRleEncoder, d$ as UintOptRleEncoder, e0 as RleEncoder, e1 as writeUint8, e2 as StringEncoder, e3 as writeVarUint, e4 as writeVarUint8Array, e5 as toUint8Array, e6 as writeUint8Array, e7 as writeAny, e8 as callAll, a6 as max, e9 as print, ea as warn$1, eb as isEmpty, ec as assign, ed as equalFlat, a7 as unexpectedCase, ee as copy, ac as create$2, ef as iteratorFilter, eg as appendTo, eh as createEncoder, ei as writeVarString, a5 as min, ej as floor, ek as any, el as abs, em as last, en as BIT2, eo as BIT4, ep as BIT1, eq as BIT3, er as BITS5, es as BIT8, et as BIT7, eu as BIT6, af as create$3, ev as deepFreeze, ew as getVariable, ex as getUnixTime, ey as isArray, ez as some, eA as RED, eB as UNBOLD, eC as BOLD, eD as ORANGE, eE as id, eF as readVarString, eG as copyUint8Array, eH as Observable, eI as equalityDeep } from './vendor-misc-CQ2gQV2M.js';

class DeleteItem {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(clock, len) {
    this.clock = clock;
    this.len = len;
  }
}
class DeleteSet {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const iterateDeletedStructs = (transaction, ds, f2) => ds.clients.forEach((deletes, clientid) => {
  const structs = (
    /** @type {Array<GC|Item>} */
    transaction.doc.store.clients.get(clientid)
  );
  if (structs != null) {
    const lastStruct = structs[structs.length - 1];
    const clockState = lastStruct.id.clock + lastStruct.length;
    for (let i = 0, del = deletes[i]; i < deletes.length && del.clock < clockState; del = deletes[++i]) {
      iterateStructs(transaction, structs, del.clock, del.len, f2);
    }
  }
});
const findIndexDS = (dis, clock) => {
  let left = 0;
  let right = dis.length - 1;
  while (left <= right) {
    const midindex = floor((left + right) / 2);
    const mid = dis[midindex];
    const midclock = mid.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.len) {
        return midindex;
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  return null;
};
const isDeleted = (ds, id) => {
  const dis = ds.clients.get(id.client);
  return dis !== void 0 && findIndexDS(dis, id.clock) !== null;
};
const sortAndMergeDeleteSet = (ds) => {
  ds.clients.forEach((dels) => {
    dels.sort((a, b) => a.clock - b.clock);
    let i, j;
    for (i = 1, j = 1; i < dels.length; i++) {
      const left = dels[j - 1];
      const right = dels[i];
      if (left.clock + left.len >= right.clock) {
        left.len = max(left.len, right.clock + right.len - left.clock);
      } else {
        if (j < i) {
          dels[j] = right;
        }
        j++;
      }
    }
    dels.length = j;
  });
};
const mergeDeleteSets = (dss) => {
  const merged = new DeleteSet();
  for (let dssI = 0; dssI < dss.length; dssI++) {
    dss[dssI].clients.forEach((delsLeft, client) => {
      if (!merged.clients.has(client)) {
        const dels = delsLeft.slice();
        for (let i = dssI + 1; i < dss.length; i++) {
          appendTo(dels, dss[i].clients.get(client) || []);
        }
        merged.clients.set(client, dels);
      }
    });
  }
  sortAndMergeDeleteSet(merged);
  return merged;
};
const addToDeleteSet = (ds, client, clock, length) => {
  setIfUndefined(ds.clients, client, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new DeleteItem(clock, length));
};
const createDeleteSet = () => new DeleteSet();
const createDeleteSetFromStructStore = (ss) => {
  const ds = createDeleteSet();
  ss.clients.forEach((structs, client) => {
    const dsitems = [];
    for (let i = 0; i < structs.length; i++) {
      const struct = structs[i];
      if (struct.deleted) {
        const clock = struct.id.clock;
        let len = struct.length;
        if (i + 1 < structs.length) {
          for (let next = structs[i + 1]; i + 1 < structs.length && next.deleted; next = structs[++i + 1]) {
            len += next.length;
          }
        }
        dsitems.push(new DeleteItem(clock, len));
      }
    }
    if (dsitems.length > 0) {
      ds.clients.set(client, dsitems);
    }
  });
  return ds;
};
const writeDeleteSet = (encoder, ds) => {
  writeVarUint(encoder.restEncoder, ds.clients.size);
  from(ds.clients.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, dsitems]) => {
    encoder.resetDsCurVal();
    writeVarUint(encoder.restEncoder, client);
    const len = dsitems.length;
    writeVarUint(encoder.restEncoder, len);
    for (let i = 0; i < len; i++) {
      const item = dsitems[i];
      encoder.writeDsClock(item.clock);
      encoder.writeDsLen(item.len);
    }
  });
};
const readDeleteSet = (decoder) => {
  const ds = new DeleteSet();
  const numClients = readVarUint(decoder.restDecoder);
  for (let i = 0; i < numClients; i++) {
    decoder.resetDsCurVal();
    const client = readVarUint(decoder.restDecoder);
    const numberOfDeletes = readVarUint(decoder.restDecoder);
    if (numberOfDeletes > 0) {
      const dsField = setIfUndefined(ds.clients, client, () => (
        /** @type {Array<DeleteItem>} */
        []
      ));
      for (let i2 = 0; i2 < numberOfDeletes; i2++) {
        dsField.push(new DeleteItem(decoder.readDsClock(), decoder.readDsLen()));
      }
    }
  }
  return ds;
};
const readAndApplyDeleteSet = (decoder, transaction, store) => {
  const unappliedDS = new DeleteSet();
  const numClients = readVarUint(decoder.restDecoder);
  for (let i = 0; i < numClients; i++) {
    decoder.resetDsCurVal();
    const client = readVarUint(decoder.restDecoder);
    const numberOfDeletes = readVarUint(decoder.restDecoder);
    const structs = store.clients.get(client) || [];
    const state = getState(store, client);
    for (let i2 = 0; i2 < numberOfDeletes; i2++) {
      const clock = decoder.readDsClock();
      const clockEnd = clock + decoder.readDsLen();
      if (clock < state) {
        if (state < clockEnd) {
          addToDeleteSet(unappliedDS, client, state, clockEnd - state);
        }
        let index = findIndexSS(structs, clock);
        let struct = structs[index];
        if (!struct.deleted && struct.id.clock < clock) {
          structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
          index++;
        }
        while (index < structs.length) {
          struct = structs[index++];
          if (struct.id.clock < clockEnd) {
            if (!struct.deleted) {
              if (clockEnd < struct.id.clock + struct.length) {
                structs.splice(index, 0, splitItem(transaction, struct, clockEnd - struct.id.clock));
              }
              struct.delete(transaction);
            }
          } else {
            break;
          }
        }
      } else {
        addToDeleteSet(unappliedDS, client, clock, clockEnd - clock);
      }
    }
  }
  if (unappliedDS.clients.size > 0) {
    const ds = new UpdateEncoderV2();
    writeVarUint(ds.restEncoder, 0);
    writeDeleteSet(ds, unappliedDS);
    return ds.toUint8Array();
  }
  return null;
};
const generateNewClientId = uint32;
class Doc extends ObservableV2 {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid = uuidv4(), collectionid = null, gc = true, gcFilter = () => true, meta = null, autoLoad = false, shouldLoad = true } = {}) {
    super();
    this.gc = gc;
    this.gcFilter = gcFilter;
    this.clientID = generateNewClientId();
    this.guid = guid;
    this.collectionid = collectionid;
    this.share = /* @__PURE__ */ new Map();
    this.store = new StructStore();
    this._transaction = null;
    this._transactionCleanups = [];
    this.subdocs = /* @__PURE__ */ new Set();
    this._item = null;
    this.shouldLoad = shouldLoad;
    this.autoLoad = autoLoad;
    this.meta = meta;
    this.isLoaded = false;
    this.isSynced = false;
    this.isDestroyed = false;
    this.whenLoaded = create((resolve) => {
      this.on("load", () => {
        this.isLoaded = true;
        resolve(this);
      });
    });
    const provideSyncedPromise = () => create((resolve) => {
      const eventHandler = (isSynced) => {
        if (isSynced === void 0 || isSynced === true) {
          this.off("sync", eventHandler);
          resolve();
        }
      };
      this.on("sync", eventHandler);
    });
    this.on("sync", (isSynced) => {
      if (isSynced === false && this.isSynced) {
        this.whenSynced = provideSyncedPromise();
      }
      this.isSynced = isSynced === void 0 || isSynced === true;
      if (this.isSynced && !this.isLoaded) {
        this.emit("load", [this]);
      }
    });
    this.whenSynced = provideSyncedPromise();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const item = this._item;
    if (item !== null && !this.shouldLoad) {
      transact(
        /** @type {any} */
        item.parent.doc,
        (transaction) => {
          transaction.subdocsLoaded.add(this);
        },
        null,
        true
      );
    }
    this.shouldLoad = true;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(from(this.subdocs).map((doc) => doc.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(f2, origin = null) {
    return transact(this, f2, origin);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(name, TypeConstructor = (
    /** @type {any} */
    AbstractType
  )) {
    const type = setIfUndefined(this.share, name, () => {
      const t = new TypeConstructor();
      t._integrate(this, null);
      return t;
    });
    const Constr = type.constructor;
    if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
      if (Constr === AbstractType) {
        const t = new TypeConstructor();
        t._map = type._map;
        type._map.forEach(
          /** @param {Item?} n */
          (n) => {
            for (; n !== null; n = n.left) {
              n.parent = t;
            }
          }
        );
        t._start = type._start;
        for (let n = t._start; n !== null; n = n.right) {
          n.parent = t;
        }
        t._length = type._length;
        this.share.set(name, t);
        t._integrate(this, null);
        return (
          /** @type {InstanceType<Type>} */
          t
        );
      } else {
        throw new Error(`Type with the name ${name} has already been defined with a different constructor`);
      }
    }
    return (
      /** @type {InstanceType<Type>} */
      type
    );
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(name = "") {
    return (
      /** @type {YArray<T>} */
      this.get(name, YArray)
    );
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(name = "") {
    return this.get(name, YText);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(name = "") {
    return (
      /** @type {YMap<T>} */
      this.get(name, YMap)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement(name = "") {
    return (
      /** @type {YXmlElement<{[key:string]:string}>} */
      this.get(name, YXmlElement)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(name = "") {
    return this.get(name, YXmlFragment);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const doc = {};
    this.share.forEach((value, key) => {
      doc[key] = value.toJSON();
    });
    return doc;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    this.isDestroyed = true;
    from(this.subdocs).forEach((subdoc) => subdoc.destroy());
    const item = this._item;
    if (item !== null) {
      this._item = null;
      const content = (
        /** @type {ContentDoc} */
        item.content
      );
      content.doc = new Doc({ guid: this.guid, ...content.opts, shouldLoad: false });
      content.doc._item = item;
      transact(
        /** @type {any} */
        item.parent.doc,
        (transaction) => {
          const doc = content.doc;
          if (!item.deleted) {
            transaction.subdocsAdded.add(doc);
          }
          transaction.subdocsRemoved.add(this);
        },
        null,
        true
      );
    }
    this.emit("destroyed", [true]);
    this.emit("destroy", [this]);
    super.destroy();
  }
}
class DSDecoderV1 {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(decoder) {
    this.restDecoder = decoder;
  }
  resetDsCurVal() {
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return readVarUint(this.restDecoder);
  }
  /**
   * @return {number}
   */
  readDsLen() {
    return readVarUint(this.restDecoder);
  }
}
class UpdateDecoderV1 extends DSDecoderV1 {
  /**
   * @return {ID}
   */
  readLeftID() {
    return createID(readVarUint(this.restDecoder), readVarUint(this.restDecoder));
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return createID(readVarUint(this.restDecoder), readVarUint(this.restDecoder));
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return readVarUint(this.restDecoder);
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return readUint8(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readString() {
    return readVarString(this.restDecoder);
  }
  /**
   * @return {boolean} isKey
   */
  readParentInfo() {
    return readVarUint(this.restDecoder) === 1;
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readTypeRef() {
    return readVarUint(this.restDecoder);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */
  readLen() {
    return readVarUint(this.restDecoder);
  }
  /**
   * @return {any}
   */
  readAny() {
    return readAny(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return copyUint8Array(readVarUint8Array(this.restDecoder));
  }
  /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */
  readJSON() {
    return JSON.parse(readVarString(this.restDecoder));
  }
  /**
   * @return {string}
   */
  readKey() {
    return readVarString(this.restDecoder);
  }
}
class DSDecoderV2 {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(decoder) {
    this.dsCurrVal = 0;
    this.restDecoder = decoder;
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @return {number}
   */
  readDsClock() {
    this.dsCurrVal += readVarUint(this.restDecoder);
    return this.dsCurrVal;
  }
  /**
   * @return {number}
   */
  readDsLen() {
    const diff = readVarUint(this.restDecoder) + 1;
    this.dsCurrVal += diff;
    return diff;
  }
}
class UpdateDecoderV2 extends DSDecoderV2 {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(decoder) {
    super(decoder);
    this.keys = [];
    readVarUint(decoder);
    this.keyClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
    this.clientDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
    this.leftClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
    this.rightClockDecoder = new IntDiffOptRleDecoder(readVarUint8Array(decoder));
    this.infoDecoder = new RleDecoder(readVarUint8Array(decoder), readUint8);
    this.stringDecoder = new StringDecoder(readVarUint8Array(decoder));
    this.parentInfoDecoder = new RleDecoder(readVarUint8Array(decoder), readUint8);
    this.typeRefDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
    this.lenDecoder = new UintOptRleDecoder(readVarUint8Array(decoder));
  }
  /**
   * @return {ID}
   */
  readLeftID() {
    return new ID(this.clientDecoder.read(), this.leftClockDecoder.read());
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return new ID(this.clientDecoder.read(), this.rightClockDecoder.read());
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return this.clientDecoder.read();
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return (
      /** @type {number} */
      this.infoDecoder.read()
    );
  }
  /**
   * @return {string}
   */
  readString() {
    return this.stringDecoder.read();
  }
  /**
   * @return {boolean}
   */
  readParentInfo() {
    return this.parentInfoDecoder.read() === 1;
  }
  /**
   * @return {number} An unsigned 8-bit integer
   */
  readTypeRef() {
    return this.typeRefDecoder.read();
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */
  readLen() {
    return this.lenDecoder.read();
  }
  /**
   * @return {any}
   */
  readAny() {
    return readAny(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return readVarUint8Array(this.restDecoder);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */
  readJSON() {
    return readAny(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readKey() {
    const keyClock = this.keyClockDecoder.read();
    if (keyClock < this.keys.length) {
      return this.keys[keyClock];
    } else {
      const key = this.stringDecoder.read();
      this.keys.push(key);
      return key;
    }
  }
}
class DSEncoderV1 {
  constructor() {
    this.restEncoder = createEncoder();
  }
  toUint8Array() {
    return toUint8Array(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(clock) {
    writeVarUint(this.restEncoder, clock);
  }
  /**
   * @param {number} len
   */
  writeDsLen(len) {
    writeVarUint(this.restEncoder, len);
  }
}
class UpdateEncoderV1 extends DSEncoderV1 {
  /**
   * @param {ID} id
   */
  writeLeftID(id) {
    writeVarUint(this.restEncoder, id.client);
    writeVarUint(this.restEncoder, id.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(id) {
    writeVarUint(this.restEncoder, id.client);
    writeVarUint(this.restEncoder, id.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(client) {
    writeVarUint(this.restEncoder, client);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(info) {
    writeUint8(this.restEncoder, info);
  }
  /**
   * @param {string} s
   */
  writeString(s) {
    writeVarString(this.restEncoder, s);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(isYKey) {
    writeVarUint(this.restEncoder, isYKey ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(info) {
    writeVarUint(this.restEncoder, info);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(len) {
    writeVarUint(this.restEncoder, len);
  }
  /**
   * @param {any} any
   */
  writeAny(any) {
    writeAny(this.restEncoder, any);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(buf) {
    writeVarUint8Array(this.restEncoder, buf);
  }
  /**
   * @param {any} embed
   */
  writeJSON(embed) {
    writeVarString(this.restEncoder, JSON.stringify(embed));
  }
  /**
   * @param {string} key
   */
  writeKey(key) {
    writeVarString(this.restEncoder, key);
  }
}
class DSEncoderV2 {
  constructor() {
    this.restEncoder = createEncoder();
    this.dsCurrVal = 0;
  }
  toUint8Array() {
    return toUint8Array(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(clock) {
    const diff = clock - this.dsCurrVal;
    this.dsCurrVal = clock;
    writeVarUint(this.restEncoder, diff);
  }
  /**
   * @param {number} len
   */
  writeDsLen(len) {
    if (len === 0) {
      unexpectedCase();
    }
    writeVarUint(this.restEncoder, len - 1);
    this.dsCurrVal += len;
  }
}
class UpdateEncoderV2 extends DSEncoderV2 {
  constructor() {
    super();
    this.keyMap = /* @__PURE__ */ new Map();
    this.keyClock = 0;
    this.keyClockEncoder = new IntDiffOptRleEncoder();
    this.clientEncoder = new UintOptRleEncoder();
    this.leftClockEncoder = new IntDiffOptRleEncoder();
    this.rightClockEncoder = new IntDiffOptRleEncoder();
    this.infoEncoder = new RleEncoder(writeUint8);
    this.stringEncoder = new StringEncoder();
    this.parentInfoEncoder = new RleEncoder(writeUint8);
    this.typeRefEncoder = new UintOptRleEncoder();
    this.lenEncoder = new UintOptRleEncoder();
  }
  toUint8Array() {
    const encoder = createEncoder();
    writeVarUint(encoder, 0);
    writeVarUint8Array(encoder, this.keyClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.clientEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.leftClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.rightClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, toUint8Array(this.infoEncoder));
    writeVarUint8Array(encoder, this.stringEncoder.toUint8Array());
    writeVarUint8Array(encoder, toUint8Array(this.parentInfoEncoder));
    writeVarUint8Array(encoder, this.typeRefEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.lenEncoder.toUint8Array());
    writeUint8Array(encoder, toUint8Array(this.restEncoder));
    return toUint8Array(encoder);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(id) {
    this.clientEncoder.write(id.client);
    this.leftClockEncoder.write(id.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(id) {
    this.clientEncoder.write(id.client);
    this.rightClockEncoder.write(id.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(client) {
    this.clientEncoder.write(client);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(info) {
    this.infoEncoder.write(info);
  }
  /**
   * @param {string} s
   */
  writeString(s) {
    this.stringEncoder.write(s);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(isYKey) {
    this.parentInfoEncoder.write(isYKey ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(info) {
    this.typeRefEncoder.write(info);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(len) {
    this.lenEncoder.write(len);
  }
  /**
   * @param {any} any
   */
  writeAny(any) {
    writeAny(this.restEncoder, any);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(buf) {
    writeVarUint8Array(this.restEncoder, buf);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(embed) {
    writeAny(this.restEncoder, embed);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(key) {
    const clock = this.keyMap.get(key);
    if (clock === void 0) {
      this.keyClockEncoder.write(this.keyClock++);
      this.stringEncoder.write(key);
    } else {
      this.keyClockEncoder.write(clock);
    }
  }
}
const writeStructs = (encoder, structs, client, clock) => {
  clock = max(clock, structs[0].id.clock);
  const startNewStructs = findIndexSS(structs, clock);
  writeVarUint(encoder.restEncoder, structs.length - startNewStructs);
  encoder.writeClient(client);
  writeVarUint(encoder.restEncoder, clock);
  const firstStruct = structs[startNewStructs];
  firstStruct.write(encoder, clock - firstStruct.id.clock);
  for (let i = startNewStructs + 1; i < structs.length; i++) {
    structs[i].write(encoder, 0);
  }
};
const writeClientsStructs = (encoder, store, _sm) => {
  const sm = /* @__PURE__ */ new Map();
  _sm.forEach((clock, client) => {
    if (getState(store, client) > clock) {
      sm.set(client, clock);
    }
  });
  getStateVector(store).forEach((_clock, client) => {
    if (!_sm.has(client)) {
      sm.set(client, 0);
    }
  });
  writeVarUint(encoder.restEncoder, sm.size);
  from(sm.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, clock]) => {
    writeStructs(
      encoder,
      /** @type {Array<GC|Item>} */
      store.clients.get(client),
      client,
      clock
    );
  });
};
const readClientsStructRefs = (decoder, doc) => {
  const clientRefs = create$3();
  const numOfStateUpdates = readVarUint(decoder.restDecoder);
  for (let i = 0; i < numOfStateUpdates; i++) {
    const numberOfStructs = readVarUint(decoder.restDecoder);
    const refs = new Array(numberOfStructs);
    const client = decoder.readClient();
    let clock = readVarUint(decoder.restDecoder);
    clientRefs.set(client, { i: 0, refs });
    for (let i2 = 0; i2 < numberOfStructs; i2++) {
      const info = decoder.readInfo();
      switch (BITS5 & info) {
        case 0: {
          const len = decoder.readLen();
          refs[i2] = new GC(createID(client, clock), len);
          clock += len;
          break;
        }
        case 10: {
          const len = readVarUint(decoder.restDecoder);
          refs[i2] = new Skip(createID(client, clock), len);
          clock += len;
          break;
        }
        default: {
          const cantCopyParentInfo = (info & (BIT7 | BIT8)) === 0;
          const struct = new Item(
            createID(client, clock),
            null,
            // left
            (info & BIT8) === BIT8 ? decoder.readLeftID() : null,
            // origin
            null,
            // right
            (info & BIT7) === BIT7 ? decoder.readRightID() : null,
            // right origin
            cantCopyParentInfo ? decoder.readParentInfo() ? doc.get(decoder.readString()) : decoder.readLeftID() : null,
            // parent
            cantCopyParentInfo && (info & BIT6) === BIT6 ? decoder.readString() : null,
            // parentSub
            readItemContent(decoder, info)
            // item content
          );
          refs[i2] = struct;
          clock += struct.length;
        }
      }
    }
  }
  return clientRefs;
};
const integrateStructs = (transaction, store, clientsStructRefs) => {
  const stack = [];
  let clientsStructRefsIds = from(clientsStructRefs.keys()).sort((a, b) => a - b);
  if (clientsStructRefsIds.length === 0) {
    return null;
  }
  const getNextStructTarget = () => {
    if (clientsStructRefsIds.length === 0) {
      return null;
    }
    let nextStructsTarget = (
      /** @type {{i:number,refs:Array<GC|Item>}} */
      clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1])
    );
    while (nextStructsTarget.refs.length === nextStructsTarget.i) {
      clientsStructRefsIds.pop();
      if (clientsStructRefsIds.length > 0) {
        nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */
        clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
      } else {
        return null;
      }
    }
    return nextStructsTarget;
  };
  let curStructsTarget = getNextStructTarget();
  if (curStructsTarget === null) {
    return null;
  }
  const restStructs = new StructStore();
  const missingSV = /* @__PURE__ */ new Map();
  const updateMissingSv = (client, clock) => {
    const mclock = missingSV.get(client);
    if (mclock == null || mclock > clock) {
      missingSV.set(client, clock);
    }
  };
  let stackHead = (
    /** @type {any} */
    curStructsTarget.refs[
      /** @type {any} */
      curStructsTarget.i++
    ]
  );
  const state = /* @__PURE__ */ new Map();
  const addStackToRestSS = () => {
    for (const item of stack) {
      const client = item.id.client;
      const inapplicableItems = clientsStructRefs.get(client);
      if (inapplicableItems) {
        inapplicableItems.i--;
        restStructs.clients.set(client, inapplicableItems.refs.slice(inapplicableItems.i));
        clientsStructRefs.delete(client);
        inapplicableItems.i = 0;
        inapplicableItems.refs = [];
      } else {
        restStructs.clients.set(client, [item]);
      }
      clientsStructRefsIds = clientsStructRefsIds.filter((c) => c !== client);
    }
    stack.length = 0;
  };
  while (true) {
    if (stackHead.constructor !== Skip) {
      const localClock = setIfUndefined(state, stackHead.id.client, () => getState(store, stackHead.id.client));
      const offset = localClock - stackHead.id.clock;
      if (offset < 0) {
        stack.push(stackHead);
        updateMissingSv(stackHead.id.client, stackHead.id.clock - 1);
        addStackToRestSS();
      } else {
        const missing = stackHead.getMissing(transaction, store);
        if (missing !== null) {
          stack.push(stackHead);
          const structRefs = clientsStructRefs.get(
            /** @type {number} */
            missing
          ) || { refs: [], i: 0 };
          if (structRefs.refs.length === structRefs.i) {
            updateMissingSv(
              /** @type {number} */
              missing,
              getState(store, missing)
            );
            addStackToRestSS();
          } else {
            stackHead = structRefs.refs[structRefs.i++];
            continue;
          }
        } else if (offset === 0 || offset < stackHead.length) {
          stackHead.integrate(transaction, offset);
          state.set(stackHead.id.client, stackHead.id.clock + stackHead.length);
        }
      }
    }
    if (stack.length > 0) {
      stackHead = /** @type {GC|Item} */
      stack.pop();
    } else if (curStructsTarget !== null && curStructsTarget.i < curStructsTarget.refs.length) {
      stackHead = /** @type {GC|Item} */
      curStructsTarget.refs[curStructsTarget.i++];
    } else {
      curStructsTarget = getNextStructTarget();
      if (curStructsTarget === null) {
        break;
      } else {
        stackHead = /** @type {GC|Item} */
        curStructsTarget.refs[curStructsTarget.i++];
      }
    }
  }
  if (restStructs.clients.size > 0) {
    const encoder = new UpdateEncoderV2();
    writeClientsStructs(encoder, restStructs, /* @__PURE__ */ new Map());
    writeVarUint(encoder.restEncoder, 0);
    return { missing: missingSV, update: encoder.toUint8Array() };
  }
  return null;
};
const writeStructsFromTransaction = (encoder, transaction) => writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);
const readUpdateV2 = (decoder, ydoc, transactionOrigin, structDecoder = new UpdateDecoderV2(decoder)) => transact(ydoc, (transaction) => {
  transaction.local = false;
  let retry = false;
  const doc = transaction.doc;
  const store = doc.store;
  const ss = readClientsStructRefs(structDecoder, doc);
  const restStructs = integrateStructs(transaction, store, ss);
  const pending = store.pendingStructs;
  if (pending) {
    for (const [client, clock] of pending.missing) {
      if (clock < getState(store, client)) {
        retry = true;
        break;
      }
    }
    if (restStructs) {
      for (const [client, clock] of restStructs.missing) {
        const mclock = pending.missing.get(client);
        if (mclock == null || mclock > clock) {
          pending.missing.set(client, clock);
        }
      }
      pending.update = mergeUpdatesV2([pending.update, restStructs.update]);
    }
  } else {
    store.pendingStructs = restStructs;
  }
  const dsRest = readAndApplyDeleteSet(structDecoder, transaction, store);
  if (store.pendingDs) {
    const pendingDSUpdate = new UpdateDecoderV2(createDecoder(store.pendingDs));
    readVarUint(pendingDSUpdate.restDecoder);
    const dsRest2 = readAndApplyDeleteSet(pendingDSUpdate, transaction, store);
    if (dsRest && dsRest2) {
      store.pendingDs = mergeUpdatesV2([dsRest, dsRest2]);
    } else {
      store.pendingDs = dsRest || dsRest2;
    }
  } else {
    store.pendingDs = dsRest;
  }
  if (retry) {
    const update = (
      /** @type {{update: Uint8Array}} */
      store.pendingStructs.update
    );
    store.pendingStructs = null;
    applyUpdateV2(transaction.doc, update);
  }
}, transactionOrigin, false);
const applyUpdateV2 = (ydoc, update, transactionOrigin, YDecoder = UpdateDecoderV2) => {
  const decoder = createDecoder(update);
  readUpdateV2(decoder, ydoc, transactionOrigin, new YDecoder(decoder));
};
const applyUpdate = (ydoc, update, transactionOrigin) => applyUpdateV2(ydoc, update, transactionOrigin, UpdateDecoderV1);
const writeStateAsUpdate = (encoder, doc, targetStateVector = /* @__PURE__ */ new Map()) => {
  writeClientsStructs(encoder, doc.store, targetStateVector);
  writeDeleteSet(encoder, createDeleteSetFromStructStore(doc.store));
};
const encodeStateAsUpdateV2 = (doc, encodedTargetStateVector = new Uint8Array([0]), encoder = new UpdateEncoderV2()) => {
  const targetStateVector = decodeStateVector(encodedTargetStateVector);
  writeStateAsUpdate(encoder, doc, targetStateVector);
  const updates = [encoder.toUint8Array()];
  if (doc.store.pendingDs) {
    updates.push(doc.store.pendingDs);
  }
  if (doc.store.pendingStructs) {
    updates.push(diffUpdateV2(doc.store.pendingStructs.update, encodedTargetStateVector));
  }
  if (updates.length > 1) {
    if (encoder.constructor === UpdateEncoderV1) {
      return mergeUpdates(updates.map((update, i) => i === 0 ? update : convertUpdateFormatV2ToV1(update)));
    } else if (encoder.constructor === UpdateEncoderV2) {
      return mergeUpdatesV2(updates);
    }
  }
  return updates[0];
};
const encodeStateAsUpdate = (doc, encodedTargetStateVector) => encodeStateAsUpdateV2(doc, encodedTargetStateVector, new UpdateEncoderV1());
const readStateVector = (decoder) => {
  const ss = /* @__PURE__ */ new Map();
  const ssLength = readVarUint(decoder.restDecoder);
  for (let i = 0; i < ssLength; i++) {
    const client = readVarUint(decoder.restDecoder);
    const clock = readVarUint(decoder.restDecoder);
    ss.set(client, clock);
  }
  return ss;
};
const decodeStateVector = (decodedState) => readStateVector(new DSDecoderV1(createDecoder(decodedState)));
const writeStateVector = (encoder, sv) => {
  writeVarUint(encoder.restEncoder, sv.size);
  from(sv.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, clock]) => {
    writeVarUint(encoder.restEncoder, client);
    writeVarUint(encoder.restEncoder, clock);
  });
  return encoder;
};
const writeDocumentStateVector = (encoder, doc) => writeStateVector(encoder, getStateVector(doc.store));
const encodeStateVectorV2 = (doc, encoder = new DSEncoderV2()) => {
  if (doc instanceof Map) {
    writeStateVector(encoder, doc);
  } else {
    writeDocumentStateVector(encoder, doc);
  }
  return encoder.toUint8Array();
};
const encodeStateVector = (doc) => encodeStateVectorV2(doc, new DSEncoderV1());
class EventHandler {
  constructor() {
    this.l = [];
  }
}
const createEventHandler = () => new EventHandler();
const addEventHandlerListener = (eventHandler, f2) => eventHandler.l.push(f2);
const removeEventHandlerListener = (eventHandler, f2) => {
  const l = eventHandler.l;
  const len = l.length;
  eventHandler.l = l.filter((g) => f2 !== g);
  if (len === eventHandler.l.length) {
    console.error("[yjs] Tried to remove event handler that doesn't exist.");
  }
};
const callEventHandlerListeners = (eventHandler, arg0, arg1) => callAll(eventHandler.l, [arg0, arg1]);
class ID {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(client, clock) {
    this.client = client;
    this.clock = clock;
  }
}
const compareIDs = (a, b) => a === b || a !== null && b !== null && a.client === b.client && a.clock === b.clock;
const createID = (client, clock) => new ID(client, clock);
const findRootTypeKey = (type) => {
  for (const [key, value] of type.doc.share.entries()) {
    if (value === type) {
      return key;
    }
  }
  throw unexpectedCase();
};
const isParentOf = (parent, child) => {
  while (child !== null) {
    if (child.parent === parent) {
      return true;
    }
    child = /** @type {AbstractType<any>} */
    child.parent._item;
  }
  return false;
};
class RelativePosition {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */
  constructor(type, tname, item, assoc = 0) {
    this.type = type;
    this.tname = tname;
    this.item = item;
    this.assoc = assoc;
  }
}
const createRelativePositionFromJSON = (json) => new RelativePosition(json.type == null ? null : createID(json.type.client, json.type.clock), json.tname ?? null, json.item == null ? null : createID(json.item.client, json.item.clock), json.assoc == null ? 0 : json.assoc);
class AbsolutePosition {
  /**
   * @param {AbstractType<any>} type
   * @param {number} index
   * @param {number} [assoc]
   */
  constructor(type, index, assoc = 0) {
    this.type = type;
    this.index = index;
    this.assoc = assoc;
  }
}
const createAbsolutePosition = (type, index, assoc = 0) => new AbsolutePosition(type, index, assoc);
const createRelativePosition = (type, item, assoc) => {
  let typeid = null;
  let tname = null;
  if (type._item === null) {
    tname = findRootTypeKey(type);
  } else {
    typeid = createID(type._item.id.client, type._item.id.clock);
  }
  return new RelativePosition(typeid, tname, item, assoc);
};
const createRelativePositionFromTypeIndex = (type, index, assoc = 0) => {
  let t = type._start;
  if (assoc < 0) {
    if (index === 0) {
      return createRelativePosition(type, null, assoc);
    }
    index--;
  }
  while (t !== null) {
    if (!t.deleted && t.countable) {
      if (t.length > index) {
        return createRelativePosition(type, createID(t.id.client, t.id.clock + index), assoc);
      }
      index -= t.length;
    }
    if (t.right === null && assoc < 0) {
      return createRelativePosition(type, t.lastId, assoc);
    }
    t = t.right;
  }
  return createRelativePosition(type, null, assoc);
};
const getItemWithOffset = (store, id) => {
  const item = getItem(store, id);
  const diff = id.clock - item.id.clock;
  return {
    item,
    diff
  };
};
const createAbsolutePositionFromRelativePosition = (rpos, doc, followUndoneDeletions = true) => {
  const store = doc.store;
  const rightID = rpos.item;
  const typeID = rpos.type;
  const tname = rpos.tname;
  const assoc = rpos.assoc;
  let type = null;
  let index = 0;
  if (rightID !== null) {
    if (getState(store, rightID.client) <= rightID.clock) {
      return null;
    }
    const res = followUndoneDeletions ? followRedone(store, rightID) : getItemWithOffset(store, rightID);
    const right = res.item;
    if (!(right instanceof Item)) {
      return null;
    }
    type = /** @type {AbstractType<any>} */
    right.parent;
    if (type._item === null || !type._item.deleted) {
      index = right.deleted || !right.countable ? 0 : res.diff + (assoc >= 0 ? 0 : 1);
      let n = right.left;
      while (n !== null) {
        if (!n.deleted && n.countable) {
          index += n.length;
        }
        n = n.left;
      }
    }
  } else {
    if (tname !== null) {
      type = doc.get(tname);
    } else if (typeID !== null) {
      if (getState(store, typeID.client) <= typeID.clock) {
        return null;
      }
      const { item } = followUndoneDeletions ? followRedone(store, typeID) : { item: getItem(store, typeID) };
      if (item instanceof Item && item.content instanceof ContentType) {
        type = item.content.type;
      } else {
        return null;
      }
    } else {
      throw unexpectedCase();
    }
    if (assoc >= 0) {
      index = type._length;
    } else {
      index = 0;
    }
  }
  return createAbsolutePosition(type, index, rpos.assoc);
};
const compareRelativePositions = (a, b) => a === b || a !== null && b !== null && a.tname === b.tname && compareIDs(a.item, b.item) && compareIDs(a.type, b.type) && a.assoc === b.assoc;
class Snapshot {
  /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */
  constructor(ds, sv) {
    this.ds = ds;
    this.sv = sv;
  }
}
const createSnapshot = (ds, sm) => new Snapshot(ds, sm);
const snapshot = (doc) => createSnapshot(createDeleteSetFromStructStore(doc.store), getStateVector(doc.store));
const isVisible = (item, snapshot2) => snapshot2 === void 0 ? !item.deleted : snapshot2.sv.has(item.id.client) && (snapshot2.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot2.ds, item.id);
const splitSnapshotAffectedStructs = (transaction, snapshot2) => {
  const meta = setIfUndefined(transaction.meta, splitSnapshotAffectedStructs, create$2);
  const store = transaction.doc.store;
  if (!meta.has(snapshot2)) {
    snapshot2.sv.forEach((clock, client) => {
      if (clock < getState(store, client)) {
        getItemCleanStart(transaction, createID(client, clock));
      }
    });
    iterateDeletedStructs(transaction, snapshot2.ds, (_item) => {
    });
    meta.add(snapshot2);
  }
};
class StructStore {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
    this.pendingStructs = null;
    this.pendingDs = null;
  }
}
const getStateVector = (store) => {
  const sm = /* @__PURE__ */ new Map();
  store.clients.forEach((structs, client) => {
    const struct = structs[structs.length - 1];
    sm.set(client, struct.id.clock + struct.length);
  });
  return sm;
};
const getState = (store, client) => {
  const structs = store.clients.get(client);
  if (structs === void 0) {
    return 0;
  }
  const lastStruct = structs[structs.length - 1];
  return lastStruct.id.clock + lastStruct.length;
};
const addStruct = (store, struct) => {
  let structs = store.clients.get(struct.id.client);
  if (structs === void 0) {
    structs = [];
    store.clients.set(struct.id.client, structs);
  } else {
    const lastStruct = structs[structs.length - 1];
    if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) {
      throw unexpectedCase();
    }
  }
  structs.push(struct);
};
const findIndexSS = (structs, clock) => {
  let left = 0;
  let right = structs.length - 1;
  let mid = structs[right];
  let midclock = mid.id.clock;
  if (midclock === clock) {
    return right;
  }
  let midindex = floor(clock / (midclock + mid.length - 1) * right);
  while (left <= right) {
    mid = structs[midindex];
    midclock = mid.id.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.length) {
        return midindex;
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
    midindex = floor((left + right) / 2);
  }
  throw unexpectedCase();
};
const find$1 = (store, id) => {
  const structs = store.clients.get(id.client);
  return structs[findIndexSS(structs, id.clock)];
};
const getItem = (
  /** @type {function(StructStore,ID):Item} */
  find$1
);
const findIndexCleanStart = (transaction, structs, clock) => {
  const index = findIndexSS(structs, clock);
  const struct = structs[index];
  if (struct.id.clock < clock && struct instanceof Item) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
    return index + 1;
  }
  return index;
};
const getItemCleanStart = (transaction, id) => {
  const structs = (
    /** @type {Array<Item>} */
    transaction.doc.store.clients.get(id.client)
  );
  return structs[findIndexCleanStart(transaction, structs, id.clock)];
};
const getItemCleanEnd = (transaction, store, id) => {
  const structs = store.clients.get(id.client);
  const index = findIndexSS(structs, id.clock);
  const struct = structs[index];
  if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, id.clock - struct.id.clock + 1));
  }
  return struct;
};
const replaceStruct = (store, struct, newStruct) => {
  const structs = (
    /** @type {Array<GC|Item>} */
    store.clients.get(struct.id.client)
  );
  structs[findIndexSS(structs, struct.id.clock)] = newStruct;
};
const iterateStructs = (transaction, structs, clockStart, len, f2) => {
  if (len === 0) {
    return;
  }
  const clockEnd = clockStart + len;
  let index = findIndexCleanStart(transaction, structs, clockStart);
  let struct;
  do {
    struct = structs[index++];
    if (clockEnd < struct.id.clock + struct.length) {
      findIndexCleanStart(transaction, structs, clockEnd);
    }
    f2(struct);
  } while (index < structs.length && structs[index].id.clock < clockEnd);
};
class Transaction {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(doc, origin, local) {
    this.doc = doc;
    this.deleteSet = new DeleteSet();
    this.beforeState = getStateVector(doc.store);
    this.afterState = /* @__PURE__ */ new Map();
    this.changed = /* @__PURE__ */ new Map();
    this.changedParentTypes = /* @__PURE__ */ new Map();
    this._mergeStructs = [];
    this.origin = origin;
    this.meta = /* @__PURE__ */ new Map();
    this.local = local;
    this.subdocsAdded = /* @__PURE__ */ new Set();
    this.subdocsRemoved = /* @__PURE__ */ new Set();
    this.subdocsLoaded = /* @__PURE__ */ new Set();
    this._needFormattingCleanup = false;
  }
}
const writeUpdateMessageFromTransaction = (encoder, transaction) => {
  if (transaction.deleteSet.clients.size === 0 && !any(transaction.afterState, (clock, client) => transaction.beforeState.get(client) !== clock)) {
    return false;
  }
  sortAndMergeDeleteSet(transaction.deleteSet);
  writeStructsFromTransaction(encoder, transaction);
  writeDeleteSet(encoder, transaction.deleteSet);
  return true;
};
const addChangedTypeToTransaction = (transaction, type, parentSub) => {
  const item = type._item;
  if (item === null || item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted) {
    setIfUndefined(transaction.changed, type, create$2).add(parentSub);
  }
};
const tryToMergeWithLefts = (structs, pos) => {
  let right = structs[pos];
  let left = structs[pos - 1];
  let i = pos;
  for (; i > 0; right = left, left = structs[--i - 1]) {
    if (left.deleted === right.deleted && left.constructor === right.constructor) {
      if (left.mergeWith(right)) {
        if (right instanceof Item && right.parentSub !== null && /** @type {AbstractType<any>} */
        right.parent._map.get(right.parentSub) === right) {
          right.parent._map.set(
            right.parentSub,
            /** @type {Item} */
            left
          );
        }
        continue;
      }
    }
    break;
  }
  const merged = pos - i;
  if (merged) {
    structs.splice(pos + 1 - merged, merged);
  }
  return merged;
};
const tryGcDeleteSet = (ds, store, gcFilter) => {
  for (const [client, deleteItems] of ds.clients.entries()) {
    const structs = (
      /** @type {Array<GC|Item>} */
      store.clients.get(client)
    );
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      const endDeleteItemClock = deleteItem.clock + deleteItem.len;
      for (let si = findIndexSS(structs, deleteItem.clock), struct = structs[si]; si < structs.length && struct.id.clock < endDeleteItemClock; struct = structs[++si]) {
        const struct2 = structs[si];
        if (deleteItem.clock + deleteItem.len <= struct2.id.clock) {
          break;
        }
        if (struct2 instanceof Item && struct2.deleted && !struct2.keep && gcFilter(struct2)) {
          struct2.gc(store, false);
        }
      }
    }
  }
};
const tryMergeDeleteSet = (ds, store) => {
  ds.clients.forEach((deleteItems, client) => {
    const structs = (
      /** @type {Array<GC|Item>} */
      store.clients.get(client)
    );
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      const mostRightIndexToCheck = min(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
      for (let si = mostRightIndexToCheck, struct = structs[si]; si > 0 && struct.id.clock >= deleteItem.clock; struct = structs[si]) {
        si -= 1 + tryToMergeWithLefts(structs, si);
      }
    }
  });
};
const cleanupTransactions = (transactionCleanups, i) => {
  if (i < transactionCleanups.length) {
    const transaction = transactionCleanups[i];
    const doc = transaction.doc;
    const store = doc.store;
    const ds = transaction.deleteSet;
    const mergeStructs = transaction._mergeStructs;
    try {
      sortAndMergeDeleteSet(ds);
      transaction.afterState = getStateVector(transaction.doc.store);
      doc.emit("beforeObserverCalls", [transaction, doc]);
      const fs = [];
      transaction.changed.forEach(
        (subs, itemtype) => fs.push(() => {
          if (itemtype._item === null || !itemtype._item.deleted) {
            itemtype._callObserver(transaction, subs);
          }
        })
      );
      fs.push(() => {
        transaction.changedParentTypes.forEach((events, type) => {
          if (type._dEH.l.length > 0 && (type._item === null || !type._item.deleted)) {
            events = events.filter(
              (event) => event.target._item === null || !event.target._item.deleted
            );
            events.forEach((event) => {
              event.currentTarget = type;
              event._path = null;
            });
            events.sort((event1, event2) => event1.path.length - event2.path.length);
            callEventHandlerListeners(type._dEH, events, transaction);
          }
        });
      });
      fs.push(() => doc.emit("afterTransaction", [transaction, doc]));
      callAll(fs, []);
      if (transaction._needFormattingCleanup) {
        cleanupYTextAfterTransaction(transaction);
      }
    } finally {
      if (doc.gc) {
        tryGcDeleteSet(ds, store, doc.gcFilter);
      }
      tryMergeDeleteSet(ds, store);
      transaction.afterState.forEach((clock, client) => {
        const beforeClock = transaction.beforeState.get(client) || 0;
        if (beforeClock !== clock) {
          const structs = (
            /** @type {Array<GC|Item>} */
            store.clients.get(client)
          );
          const firstChangePos = max(findIndexSS(structs, beforeClock), 1);
          for (let i2 = structs.length - 1; i2 >= firstChangePos; ) {
            i2 -= 1 + tryToMergeWithLefts(structs, i2);
          }
        }
      });
      for (let i2 = mergeStructs.length - 1; i2 >= 0; i2--) {
        const { client, clock } = mergeStructs[i2].id;
        const structs = (
          /** @type {Array<GC|Item>} */
          store.clients.get(client)
        );
        const replacedStructPos = findIndexSS(structs, clock);
        if (replacedStructPos + 1 < structs.length) {
          if (tryToMergeWithLefts(structs, replacedStructPos + 1) > 1) {
            continue;
          }
        }
        if (replacedStructPos > 0) {
          tryToMergeWithLefts(structs, replacedStructPos);
        }
      }
      if (!transaction.local && transaction.afterState.get(doc.clientID) !== transaction.beforeState.get(doc.clientID)) {
        print(ORANGE, BOLD, "[yjs] ", UNBOLD, RED, "Changed the client-id because another client seems to be using it.");
        doc.clientID = generateNewClientId();
      }
      doc.emit("afterTransactionCleanup", [transaction, doc]);
      if (doc._observers.has("update")) {
        const encoder = new UpdateEncoderV1();
        const hasContent = writeUpdateMessageFromTransaction(encoder, transaction);
        if (hasContent) {
          doc.emit("update", [encoder.toUint8Array(), transaction.origin, doc, transaction]);
        }
      }
      if (doc._observers.has("updateV2")) {
        const encoder = new UpdateEncoderV2();
        const hasContent = writeUpdateMessageFromTransaction(encoder, transaction);
        if (hasContent) {
          doc.emit("updateV2", [encoder.toUint8Array(), transaction.origin, doc, transaction]);
        }
      }
      const { subdocsAdded, subdocsLoaded, subdocsRemoved } = transaction;
      if (subdocsAdded.size > 0 || subdocsRemoved.size > 0 || subdocsLoaded.size > 0) {
        subdocsAdded.forEach((subdoc) => {
          subdoc.clientID = doc.clientID;
          if (subdoc.collectionid == null) {
            subdoc.collectionid = doc.collectionid;
          }
          doc.subdocs.add(subdoc);
        });
        subdocsRemoved.forEach((subdoc) => doc.subdocs.delete(subdoc));
        doc.emit("subdocs", [{ loaded: subdocsLoaded, added: subdocsAdded, removed: subdocsRemoved }, doc, transaction]);
        subdocsRemoved.forEach((subdoc) => subdoc.destroy());
      }
      if (transactionCleanups.length <= i + 1) {
        doc._transactionCleanups = [];
        doc.emit("afterAllTransactions", [doc, transactionCleanups]);
      } else {
        cleanupTransactions(transactionCleanups, i + 1);
      }
    }
  }
};
const transact = (doc, f2, origin = null, local = true) => {
  const transactionCleanups = doc._transactionCleanups;
  let initialCall = false;
  let result = null;
  if (doc._transaction === null) {
    initialCall = true;
    doc._transaction = new Transaction(doc, origin, local);
    transactionCleanups.push(doc._transaction);
    if (transactionCleanups.length === 1) {
      doc.emit("beforeAllTransactions", [doc]);
    }
    doc.emit("beforeTransaction", [doc._transaction, doc]);
  }
  try {
    result = f2(doc._transaction);
  } finally {
    if (initialCall) {
      const finishCleanup = doc._transaction === transactionCleanups[0];
      doc._transaction = null;
      if (finishCleanup) {
        cleanupTransactions(transactionCleanups, 0);
      }
    }
  }
  return result;
};
class StackItem {
  /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */
  constructor(deletions, insertions) {
    this.insertions = insertions;
    this.deletions = deletions;
    this.meta = /* @__PURE__ */ new Map();
  }
}
const clearUndoManagerStackItem = (tr, um, stackItem) => {
  iterateDeletedStructs(tr, stackItem.deletions, (item) => {
    if (item instanceof Item && um.scope.some((type) => type === tr.doc || isParentOf(
      /** @type {AbstractType<any>} */
      type,
      item
    ))) {
      keepItem(item, false);
    }
  });
};
const popStackItem = (undoManager, stack, eventType) => {
  let _tr = null;
  const doc = undoManager.doc;
  const scope = undoManager.scope;
  transact(doc, (transaction) => {
    while (stack.length > 0 && undoManager.currStackItem === null) {
      const store = doc.store;
      const stackItem = (
        /** @type {StackItem} */
        stack.pop()
      );
      const itemsToRedo = /* @__PURE__ */ new Set();
      const itemsToDelete = [];
      let performedChange = false;
      iterateDeletedStructs(transaction, stackItem.insertions, (struct) => {
        if (struct instanceof Item) {
          if (struct.redone !== null) {
            let { item, diff } = followRedone(store, struct.id);
            if (diff > 0) {
              item = getItemCleanStart(transaction, createID(item.id.client, item.id.clock + diff));
            }
            struct = item;
          }
          if (!struct.deleted && scope.some((type) => type === transaction.doc || isParentOf(
            /** @type {AbstractType<any>} */
            type,
            /** @type {Item} */
            struct
          ))) {
            itemsToDelete.push(struct);
          }
        }
      });
      iterateDeletedStructs(transaction, stackItem.deletions, (struct) => {
        if (struct instanceof Item && scope.some((type) => type === transaction.doc || isParentOf(
          /** @type {AbstractType<any>} */
          type,
          struct
        )) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
        !isDeleted(stackItem.insertions, struct.id)) {
          itemsToRedo.add(struct);
        }
      });
      itemsToRedo.forEach((struct) => {
        performedChange = redoItem(transaction, struct, itemsToRedo, stackItem.insertions, undoManager.ignoreRemoteMapChanges, undoManager) !== null || performedChange;
      });
      for (let i = itemsToDelete.length - 1; i >= 0; i--) {
        const item = itemsToDelete[i];
        if (undoManager.deleteFilter(item)) {
          item.delete(transaction);
          performedChange = true;
        }
      }
      undoManager.currStackItem = performedChange ? stackItem : null;
    }
    transaction.changed.forEach((subProps, type) => {
      if (subProps.has(null) && type._searchMarker) {
        type._searchMarker.length = 0;
      }
    });
    _tr = transaction;
  }, undoManager);
  const res = undoManager.currStackItem;
  if (res != null) {
    const changedParentTypes = _tr.changedParentTypes;
    undoManager.emit("stack-item-popped", [{ stackItem: res, type: eventType, changedParentTypes, origin: undoManager }, undoManager]);
    undoManager.currStackItem = null;
  }
  return res;
};
class UndoManager extends ObservableV2 {
  /**
   * @param {Doc|AbstractType<any>|Array<AbstractType<any>>} typeScope Limits the scope of the UndoManager. If this is set to a ydoc instance, all changes on that ydoc will be undone. If set to a specific type, only changes on that type or its children will be undone. Also accepts an array of types.
   * @param {UndoManagerOptions} options
   */
  constructor(typeScope, {
    captureTimeout = 500,
    captureTransaction = (_tr) => true,
    deleteFilter = () => true,
    trackedOrigins = /* @__PURE__ */ new Set([null]),
    ignoreRemoteMapChanges = false,
    doc = (
      /** @type {Doc} */
      isArray(typeScope) ? typeScope[0].doc : typeScope instanceof Doc ? typeScope : typeScope.doc
    )
  } = {}) {
    super();
    this.scope = [];
    this.doc = doc;
    this.addToScope(typeScope);
    this.deleteFilter = deleteFilter;
    trackedOrigins.add(this);
    this.trackedOrigins = trackedOrigins;
    this.captureTransaction = captureTransaction;
    this.undoStack = [];
    this.redoStack = [];
    this.undoing = false;
    this.redoing = false;
    this.currStackItem = null;
    this.lastChange = 0;
    this.ignoreRemoteMapChanges = ignoreRemoteMapChanges;
    this.captureTimeout = captureTimeout;
    this.afterTransactionHandler = (transaction) => {
      if (!this.captureTransaction(transaction) || !this.scope.some((type) => transaction.changedParentTypes.has(
        /** @type {AbstractType<any>} */
        type
      ) || type === this.doc) || !this.trackedOrigins.has(transaction.origin) && (!transaction.origin || !this.trackedOrigins.has(transaction.origin.constructor))) {
        return;
      }
      const undoing = this.undoing;
      const redoing = this.redoing;
      const stack = undoing ? this.redoStack : this.undoStack;
      if (undoing) {
        this.stopCapturing();
      } else if (!redoing) {
        this.clear(false, true);
      }
      const insertions = new DeleteSet();
      transaction.afterState.forEach((endClock, client) => {
        const startClock = transaction.beforeState.get(client) || 0;
        const len = endClock - startClock;
        if (len > 0) {
          addToDeleteSet(insertions, client, startClock, len);
        }
      });
      const now = getUnixTime();
      let didAdd = false;
      if (this.lastChange > 0 && now - this.lastChange < this.captureTimeout && stack.length > 0 && !undoing && !redoing) {
        const lastOp = stack[stack.length - 1];
        lastOp.deletions = mergeDeleteSets([lastOp.deletions, transaction.deleteSet]);
        lastOp.insertions = mergeDeleteSets([lastOp.insertions, insertions]);
      } else {
        stack.push(new StackItem(transaction.deleteSet, insertions));
        didAdd = true;
      }
      if (!undoing && !redoing) {
        this.lastChange = now;
      }
      iterateDeletedStructs(
        transaction,
        transaction.deleteSet,
        /** @param {Item|GC} item */
        (item) => {
          if (item instanceof Item && this.scope.some((type) => type === transaction.doc || isParentOf(
            /** @type {AbstractType<any>} */
            type,
            item
          ))) {
            keepItem(item, true);
          }
        }
      );
      const changeEvent = [{ stackItem: stack[stack.length - 1], origin: transaction.origin, type: undoing ? "redo" : "undo", changedParentTypes: transaction.changedParentTypes }, this];
      if (didAdd) {
        this.emit("stack-item-added", changeEvent);
      } else {
        this.emit("stack-item-updated", changeEvent);
      }
    };
    this.doc.on("afterTransaction", this.afterTransactionHandler);
    this.doc.on("destroy", () => {
      this.destroy();
    });
  }
  /**
   * Extend the scope.
   *
   * @param {Array<AbstractType<any> | Doc> | AbstractType<any> | Doc} ytypes
   */
  addToScope(ytypes) {
    const tmpSet = new Set(this.scope);
    ytypes = isArray(ytypes) ? ytypes : [ytypes];
    ytypes.forEach((ytype) => {
      if (!tmpSet.has(ytype)) {
        tmpSet.add(ytype);
        if (ytype instanceof AbstractType ? ytype.doc !== this.doc : ytype !== this.doc) warn$1("[yjs#509] Not same Y.Doc");
        this.scope.push(ytype);
      }
    });
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(origin) {
    this.trackedOrigins.add(origin);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(origin) {
    this.trackedOrigins.delete(origin);
  }
  clear(clearUndoStack = true, clearRedoStack = true) {
    if (clearUndoStack && this.canUndo() || clearRedoStack && this.canRedo()) {
      this.doc.transact((tr) => {
        if (clearUndoStack) {
          this.undoStack.forEach((item) => clearUndoManagerStackItem(tr, this, item));
          this.undoStack = [];
        }
        if (clearRedoStack) {
          this.redoStack.forEach((item) => clearUndoManagerStackItem(tr, this, item));
          this.redoStack = [];
        }
        this.emit("stack-cleared", [{ undoStackCleared: clearUndoStack, redoStackCleared: clearRedoStack }]);
      });
    }
  }
  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing() {
    this.lastChange = 0;
  }
  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo() {
    this.undoing = true;
    let res;
    try {
      res = popStackItem(this, this.undoStack, "undo");
    } finally {
      this.undoing = false;
    }
    return res;
  }
  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo() {
    this.redoing = true;
    let res;
    try {
      res = popStackItem(this, this.redoStack, "redo");
    } finally {
      this.redoing = false;
    }
    return res;
  }
  /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */
  canUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */
  canRedo() {
    return this.redoStack.length > 0;
  }
  destroy() {
    this.trackedOrigins.delete(this);
    this.doc.off("afterTransaction", this.afterTransactionHandler);
    super.destroy();
  }
}
function* lazyStructReaderGenerator(decoder) {
  const numOfStateUpdates = readVarUint(decoder.restDecoder);
  for (let i = 0; i < numOfStateUpdates; i++) {
    const numberOfStructs = readVarUint(decoder.restDecoder);
    const client = decoder.readClient();
    let clock = readVarUint(decoder.restDecoder);
    for (let i2 = 0; i2 < numberOfStructs; i2++) {
      const info = decoder.readInfo();
      if (info === 10) {
        const len = readVarUint(decoder.restDecoder);
        yield new Skip(createID(client, clock), len);
        clock += len;
      } else if ((BITS5 & info) !== 0) {
        const cantCopyParentInfo = (info & (BIT7 | BIT8)) === 0;
        const struct = new Item(
          createID(client, clock),
          null,
          // left
          (info & BIT8) === BIT8 ? decoder.readLeftID() : null,
          // origin
          null,
          // right
          (info & BIT7) === BIT7 ? decoder.readRightID() : null,
          // right origin
          // @ts-ignore Force writing a string here.
          cantCopyParentInfo ? decoder.readParentInfo() ? decoder.readString() : decoder.readLeftID() : null,
          // parent
          cantCopyParentInfo && (info & BIT6) === BIT6 ? decoder.readString() : null,
          // parentSub
          readItemContent(decoder, info)
          // item content
        );
        yield struct;
        clock += struct.length;
      } else {
        const len = decoder.readLen();
        yield new GC(createID(client, clock), len);
        clock += len;
      }
    }
  }
}
class LazyStructReader {
  /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */
  constructor(decoder, filterSkips) {
    this.gen = lazyStructReaderGenerator(decoder);
    this.curr = null;
    this.done = false;
    this.filterSkips = filterSkips;
    this.next();
  }
  /**
   * @return {Item | GC | Skip |null}
   */
  next() {
    do {
      this.curr = this.gen.next().value || null;
    } while (this.filterSkips && this.curr !== null && this.curr.constructor === Skip);
    return this.curr;
  }
}
class LazyStructWriter {
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  constructor(encoder) {
    this.currClient = 0;
    this.startClock = 0;
    this.written = 0;
    this.encoder = encoder;
    this.clientStructs = [];
  }
}
const mergeUpdates = (updates) => mergeUpdatesV2(updates, UpdateDecoderV1, UpdateEncoderV1);
const sliceStruct = (left, diff) => {
  if (left.constructor === GC) {
    const { client, clock } = left.id;
    return new GC(createID(client, clock + diff), left.length - diff);
  } else if (left.constructor === Skip) {
    const { client, clock } = left.id;
    return new Skip(createID(client, clock + diff), left.length - diff);
  } else {
    const leftItem = (
      /** @type {Item} */
      left
    );
    const { client, clock } = leftItem.id;
    return new Item(
      createID(client, clock + diff),
      null,
      createID(client, clock + diff - 1),
      null,
      leftItem.rightOrigin,
      leftItem.parent,
      leftItem.parentSub,
      leftItem.content.splice(diff)
    );
  }
};
const mergeUpdatesV2 = (updates, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2) => {
  if (updates.length === 1) {
    return updates[0];
  }
  const updateDecoders = updates.map((update) => new YDecoder(createDecoder(update)));
  let lazyStructDecoders = updateDecoders.map((decoder) => new LazyStructReader(decoder, true));
  let currWrite = null;
  const updateEncoder = new YEncoder();
  const lazyStructEncoder = new LazyStructWriter(updateEncoder);
  while (true) {
    lazyStructDecoders = lazyStructDecoders.filter((dec) => dec.curr !== null);
    lazyStructDecoders.sort(
      /** @type {function(any,any):number} */
      (dec1, dec2) => {
        if (dec1.curr.id.client === dec2.curr.id.client) {
          const clockDiff = dec1.curr.id.clock - dec2.curr.id.clock;
          if (clockDiff === 0) {
            return dec1.curr.constructor === dec2.curr.constructor ? 0 : dec1.curr.constructor === Skip ? 1 : -1;
          } else {
            return clockDiff;
          }
        } else {
          return dec2.curr.id.client - dec1.curr.id.client;
        }
      }
    );
    if (lazyStructDecoders.length === 0) {
      break;
    }
    const currDecoder = lazyStructDecoders[0];
    const firstClient = (
      /** @type {Item | GC} */
      currDecoder.curr.id.client
    );
    if (currWrite !== null) {
      let curr = (
        /** @type {Item | GC | null} */
        currDecoder.curr
      );
      let iterated = false;
      while (curr !== null && curr.id.clock + curr.length <= currWrite.struct.id.clock + currWrite.struct.length && curr.id.client >= currWrite.struct.id.client) {
        curr = currDecoder.next();
        iterated = true;
      }
      if (curr === null || // current decoder is empty
      curr.id.client !== firstClient || // check whether there is another decoder that has has updates from `firstClient`
      iterated && curr.id.clock > currWrite.struct.id.clock + currWrite.struct.length) {
        continue;
      }
      if (firstClient !== currWrite.struct.id.client) {
        writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
        currWrite = { struct: curr, offset: 0 };
        currDecoder.next();
      } else {
        if (currWrite.struct.id.clock + currWrite.struct.length < curr.id.clock) {
          if (currWrite.struct.constructor === Skip) {
            currWrite.struct.length = curr.id.clock + curr.length - currWrite.struct.id.clock;
          } else {
            writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
            const diff = curr.id.clock - currWrite.struct.id.clock - currWrite.struct.length;
            const struct = new Skip(createID(firstClient, currWrite.struct.id.clock + currWrite.struct.length), diff);
            currWrite = { struct, offset: 0 };
          }
        } else {
          const diff = currWrite.struct.id.clock + currWrite.struct.length - curr.id.clock;
          if (diff > 0) {
            if (currWrite.struct.constructor === Skip) {
              currWrite.struct.length -= diff;
            } else {
              curr = sliceStruct(curr, diff);
            }
          }
          if (!currWrite.struct.mergeWith(
            /** @type {any} */
            curr
          )) {
            writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
            currWrite = { struct: curr, offset: 0 };
            currDecoder.next();
          }
        }
      }
    } else {
      currWrite = { struct: (
        /** @type {Item | GC} */
        currDecoder.curr
      ), offset: 0 };
      currDecoder.next();
    }
    for (let next = currDecoder.curr; next !== null && next.id.client === firstClient && next.id.clock === currWrite.struct.id.clock + currWrite.struct.length && next.constructor !== Skip; next = currDecoder.next()) {
      writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
      currWrite = { struct: next, offset: 0 };
    }
  }
  if (currWrite !== null) {
    writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
    currWrite = null;
  }
  finishLazyStructWriting(lazyStructEncoder);
  const dss = updateDecoders.map((decoder) => readDeleteSet(decoder));
  const ds = mergeDeleteSets(dss);
  writeDeleteSet(updateEncoder, ds);
  return updateEncoder.toUint8Array();
};
const diffUpdateV2 = (update, sv, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2) => {
  const state = decodeStateVector(sv);
  const encoder = new YEncoder();
  const lazyStructWriter = new LazyStructWriter(encoder);
  const decoder = new YDecoder(createDecoder(update));
  const reader = new LazyStructReader(decoder, false);
  while (reader.curr) {
    const curr = reader.curr;
    const currClient = curr.id.client;
    const svClock = state.get(currClient) || 0;
    if (reader.curr.constructor === Skip) {
      reader.next();
      continue;
    }
    if (curr.id.clock + curr.length > svClock) {
      writeStructToLazyStructWriter(lazyStructWriter, curr, max(svClock - curr.id.clock, 0));
      reader.next();
      while (reader.curr && reader.curr.id.client === currClient) {
        writeStructToLazyStructWriter(lazyStructWriter, reader.curr, 0);
        reader.next();
      }
    } else {
      while (reader.curr && reader.curr.id.client === currClient && reader.curr.id.clock + reader.curr.length <= svClock) {
        reader.next();
      }
    }
  }
  finishLazyStructWriting(lazyStructWriter);
  const ds = readDeleteSet(decoder);
  writeDeleteSet(encoder, ds);
  return encoder.toUint8Array();
};
const flushLazyStructWriter = (lazyWriter) => {
  if (lazyWriter.written > 0) {
    lazyWriter.clientStructs.push({ written: lazyWriter.written, restEncoder: toUint8Array(lazyWriter.encoder.restEncoder) });
    lazyWriter.encoder.restEncoder = createEncoder();
    lazyWriter.written = 0;
  }
};
const writeStructToLazyStructWriter = (lazyWriter, struct, offset) => {
  if (lazyWriter.written > 0 && lazyWriter.currClient !== struct.id.client) {
    flushLazyStructWriter(lazyWriter);
  }
  if (lazyWriter.written === 0) {
    lazyWriter.currClient = struct.id.client;
    lazyWriter.encoder.writeClient(struct.id.client);
    writeVarUint(lazyWriter.encoder.restEncoder, struct.id.clock + offset);
  }
  struct.write(lazyWriter.encoder, offset);
  lazyWriter.written++;
};
const finishLazyStructWriting = (lazyWriter) => {
  flushLazyStructWriter(lazyWriter);
  const restEncoder = lazyWriter.encoder.restEncoder;
  writeVarUint(restEncoder, lazyWriter.clientStructs.length);
  for (let i = 0; i < lazyWriter.clientStructs.length; i++) {
    const partStructs = lazyWriter.clientStructs[i];
    writeVarUint(restEncoder, partStructs.written);
    writeUint8Array(restEncoder, partStructs.restEncoder);
  }
};
const convertUpdateFormat = (update, blockTransformer, YDecoder, YEncoder) => {
  const updateDecoder = new YDecoder(createDecoder(update));
  const lazyDecoder = new LazyStructReader(updateDecoder, false);
  const updateEncoder = new YEncoder();
  const lazyWriter = new LazyStructWriter(updateEncoder);
  for (let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next()) {
    writeStructToLazyStructWriter(lazyWriter, blockTransformer(curr), 0);
  }
  finishLazyStructWriting(lazyWriter);
  const ds = readDeleteSet(updateDecoder);
  writeDeleteSet(updateEncoder, ds);
  return updateEncoder.toUint8Array();
};
const convertUpdateFormatV2ToV1 = (update) => convertUpdateFormat(update, id, UpdateDecoderV2, UpdateEncoderV1);
const errorComputeChanges = "You must not compute changes after the event-handler fired.";
class YEvent {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(target, transaction) {
    this.target = target;
    this.currentTarget = target;
    this.transaction = transaction;
    this._changes = null;
    this._keys = null;
    this._delta = null;
    this._path = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return this._path || (this._path = getPathTo(this.currentTarget, this.target));
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(struct) {
    return isDeleted(this.transaction.deleteSet, struct.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0) {
        throw create$1(errorComputeChanges);
      }
      const keys = /* @__PURE__ */ new Map();
      const target = this.target;
      const changed = (
        /** @type Set<string|null> */
        this.transaction.changed.get(target)
      );
      changed.forEach((key) => {
        if (key !== null) {
          const item = (
            /** @type {Item} */
            target._map.get(key)
          );
          let action;
          let oldValue;
          if (this.adds(item)) {
            let prev = item.left;
            while (prev !== null && this.adds(prev)) {
              prev = prev.left;
            }
            if (this.deletes(item)) {
              if (prev !== null && this.deletes(prev)) {
                action = "delete";
                oldValue = last(prev.content.getContent());
              } else {
                return;
              }
            } else {
              if (prev !== null && this.deletes(prev)) {
                action = "update";
                oldValue = last(prev.content.getContent());
              } else {
                action = "add";
                oldValue = void 0;
              }
            }
          } else {
            if (this.deletes(item)) {
              action = "delete";
              oldValue = last(
                /** @type {Item} */
                item.content.getContent()
              );
            } else {
              return;
            }
          }
          keys.set(key, { action, oldValue });
        }
      });
      this._keys = keys;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(struct) {
    return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let changes = this._changes;
    if (changes === null) {
      if (this.transaction.doc._transactionCleanups.length === 0) {
        throw create$1(errorComputeChanges);
      }
      const target = this.target;
      const added = create$2();
      const deleted = create$2();
      const delta = [];
      changes = {
        added,
        deleted,
        delta,
        keys: this.keys
      };
      const changed = (
        /** @type Set<string|null> */
        this.transaction.changed.get(target)
      );
      if (changed.has(null)) {
        let lastOp = null;
        const packOp = () => {
          if (lastOp) {
            delta.push(lastOp);
          }
        };
        for (let item = target._start; item !== null; item = item.right) {
          if (item.deleted) {
            if (this.deletes(item) && !this.adds(item)) {
              if (lastOp === null || lastOp.delete === void 0) {
                packOp();
                lastOp = { delete: 0 };
              }
              lastOp.delete += item.length;
              deleted.add(item);
            }
          } else {
            if (this.adds(item)) {
              if (lastOp === null || lastOp.insert === void 0) {
                packOp();
                lastOp = { insert: [] };
              }
              lastOp.insert = lastOp.insert.concat(item.content.getContent());
              added.add(item);
            } else {
              if (lastOp === null || lastOp.retain === void 0) {
                packOp();
                lastOp = { retain: 0 };
              }
              lastOp.retain += item.length;
            }
          }
        }
        if (lastOp !== null && lastOp.retain === void 0) {
          packOp();
        }
      }
      this._changes = changes;
    }
    return (
      /** @type {any} */
      changes
    );
  }
}
const getPathTo = (parent, child) => {
  const path = [];
  while (child._item !== null && child !== parent) {
    if (child._item.parentSub !== null) {
      path.unshift(child._item.parentSub);
    } else {
      let i = 0;
      let c = (
        /** @type {AbstractType<any>} */
        child._item.parent._start
      );
      while (c !== child._item && c !== null) {
        if (!c.deleted && c.countable) {
          i += c.length;
        }
        c = c.right;
      }
      path.unshift(i);
    }
    child = /** @type {AbstractType<any>} */
    child._item.parent;
  }
  return path;
};
const warnPrematureAccess = () => {
  warn$1("Invalid access: Add Yjs type to a document before reading data.");
};
const maxSearchMarker = 80;
let globalSearchMarkerTimestamp = 0;
class ArraySearchMarker {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(p, index) {
    p.marker = true;
    this.p = p;
    this.index = index;
    this.timestamp = globalSearchMarkerTimestamp++;
  }
}
const refreshMarkerTimestamp = (marker) => {
  marker.timestamp = globalSearchMarkerTimestamp++;
};
const overwriteMarker = (marker, p, index) => {
  marker.p.marker = false;
  marker.p = p;
  p.marker = true;
  marker.index = index;
  marker.timestamp = globalSearchMarkerTimestamp++;
};
const markPosition = (searchMarker, p, index) => {
  if (searchMarker.length >= maxSearchMarker) {
    const marker = searchMarker.reduce((a, b) => a.timestamp < b.timestamp ? a : b);
    overwriteMarker(marker, p, index);
    return marker;
  } else {
    const pm = new ArraySearchMarker(p, index);
    searchMarker.push(pm);
    return pm;
  }
};
const findMarker = (yarray, index) => {
  if (yarray._start === null || index === 0 || yarray._searchMarker === null) {
    return null;
  }
  const marker = yarray._searchMarker.length === 0 ? null : yarray._searchMarker.reduce((a, b) => abs(index - a.index) < abs(index - b.index) ? a : b);
  let p = yarray._start;
  let pindex = 0;
  if (marker !== null) {
    p = marker.p;
    pindex = marker.index;
    refreshMarkerTimestamp(marker);
  }
  while (p.right !== null && pindex < index) {
    if (!p.deleted && p.countable) {
      if (index < pindex + p.length) {
        break;
      }
      pindex += p.length;
    }
    p = p.right;
  }
  while (p.left !== null && pindex > index) {
    p = p.left;
    if (!p.deleted && p.countable) {
      pindex -= p.length;
    }
  }
  while (p.left !== null && p.left.id.client === p.id.client && p.left.id.clock + p.left.length === p.id.clock) {
    p = p.left;
    if (!p.deleted && p.countable) {
      pindex -= p.length;
    }
  }
  if (marker !== null && abs(marker.index - pindex) < /** @type {YText|YArray<any>} */
  p.parent.length / maxSearchMarker) {
    overwriteMarker(marker, p, pindex);
    return marker;
  } else {
    return markPosition(yarray._searchMarker, p, pindex);
  }
};
const updateMarkerChanges = (searchMarker, index, len) => {
  for (let i = searchMarker.length - 1; i >= 0; i--) {
    const m = searchMarker[i];
    if (len > 0) {
      let p = m.p;
      p.marker = false;
      while (p && (p.deleted || !p.countable)) {
        p = p.left;
        if (p && !p.deleted && p.countable) {
          m.index -= p.length;
        }
      }
      if (p === null || p.marker === true) {
        searchMarker.splice(i, 1);
        continue;
      }
      m.p = p;
      p.marker = true;
    }
    if (index < m.index || len > 0 && index === m.index) {
      m.index = max(index, m.index + len);
    }
  }
};
const callTypeObservers = (type, transaction, event) => {
  const changedType = type;
  const changedParentTypes = transaction.changedParentTypes;
  while (true) {
    setIfUndefined(changedParentTypes, type, () => []).push(event);
    if (type._item === null) {
      break;
    }
    type = /** @type {AbstractType<any>} */
    type._item.parent;
  }
  callEventHandlerListeners(changedType._eH, event, transaction);
};
class AbstractType {
  constructor() {
    this._item = null;
    this._map = /* @__PURE__ */ new Map();
    this._start = null;
    this.doc = null;
    this._length = 0;
    this._eH = createEventHandler();
    this._dEH = createEventHandler();
    this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(y, item) {
    this.doc = y;
    this._item = item;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw methodUnimplemented();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw methodUnimplemented();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(_encoder) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let n = this._start;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(transaction, _parentSubs) {
    if (!transaction.local && this._searchMarker) {
      this._searchMarker.length = 0;
    }
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(f2) {
    addEventHandlerListener(this._eH, f2);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(f2) {
    addEventHandlerListener(this._dEH, f2);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(f2) {
    removeEventHandlerListener(this._eH, f2);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(f2) {
    removeEventHandlerListener(this._dEH, f2);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const typeListSlice = (type, start, end) => {
  type.doc ?? warnPrematureAccess();
  if (start < 0) {
    start = type._length + start;
  }
  if (end < 0) {
    end = type._length + end;
  }
  let len = end - start;
  const cs = [];
  let n = type._start;
  while (n !== null && len > 0) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      if (c.length <= start) {
        start -= c.length;
      } else {
        for (let i = start; i < c.length && len > 0; i++) {
          cs.push(c[i]);
          len--;
        }
        start = 0;
      }
    }
    n = n.right;
  }
  return cs;
};
const typeListToArray = (type) => {
  type.doc ?? warnPrematureAccess();
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs;
};
const typeListToArraySnapshot = (type, snapshot2) => {
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && isVisible(n, snapshot2)) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs;
};
const typeListForEach = (type, f2) => {
  let index = 0;
  let n = type._start;
  type.doc ?? warnPrematureAccess();
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        f2(c[i], index++, type);
      }
    }
    n = n.right;
  }
};
const typeListMap = (type, f2) => {
  const result = [];
  typeListForEach(type, (c, i) => {
    result.push(f2(c, i, type));
  });
  return result;
};
const typeListCreateIterator = (type) => {
  let n = type._start;
  let currentContent = null;
  let currentContentIndex = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (currentContent === null) {
        while (n !== null && n.deleted) {
          n = n.right;
        }
        if (n === null) {
          return {
            done: true,
            value: void 0
          };
        }
        currentContent = n.content.getContent();
        currentContentIndex = 0;
        n = n.right;
      }
      const value = currentContent[currentContentIndex++];
      if (currentContent.length <= currentContentIndex) {
        currentContent = null;
      }
      return {
        done: false,
        value
      };
    }
  };
};
const typeListGet = (type, index) => {
  type.doc ?? warnPrematureAccess();
  const marker = findMarker(type, index);
  let n = type._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
  }
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        return n.content.getContent()[index];
      }
      index -= n.length;
    }
  }
};
const typeListInsertGenericsAfter = (transaction, parent, referenceItem, content) => {
  let left = referenceItem;
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  const store = doc.store;
  const right = referenceItem === null ? parent._start : referenceItem.right;
  let jsonContent = [];
  const packJsonContent = () => {
    if (jsonContent.length > 0) {
      left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentAny(jsonContent));
      left.integrate(transaction, 0);
      jsonContent = [];
    }
  };
  content.forEach((c) => {
    if (c === null) {
      jsonContent.push(c);
    } else {
      switch (c.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          jsonContent.push(c);
          break;
        default:
          packJsonContent();
          switch (c.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentBinary(new Uint8Array(
                /** @type {Uint8Array} */
                c
              )));
              left.integrate(transaction, 0);
              break;
            case Doc:
              left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentDoc(
                /** @type {Doc} */
                c
              ));
              left.integrate(transaction, 0);
              break;
            default:
              if (c instanceof AbstractType) {
                left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentType(c));
                left.integrate(transaction, 0);
              } else {
                throw new Error("Unexpected content type in insert operation");
              }
          }
      }
    }
  });
  packJsonContent();
};
const lengthExceeded = () => create$1("Length exceeded!");
const typeListInsertGenerics = (transaction, parent, index, content) => {
  if (index > parent._length) {
    throw lengthExceeded();
  }
  if (index === 0) {
    if (parent._searchMarker) {
      updateMarkerChanges(parent._searchMarker, index, content.length);
    }
    return typeListInsertGenericsAfter(transaction, parent, null, content);
  }
  const startIndex = index;
  const marker = findMarker(parent, index);
  let n = parent._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
    if (index === 0) {
      n = n.prev;
      index += n && n.countable && !n.deleted ? n.length : 0;
    }
  }
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index <= n.length) {
        if (index < n.length) {
          getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
        }
        break;
      }
      index -= n.length;
    }
  }
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, startIndex, content.length);
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content);
};
const typeListPushGenerics = (transaction, parent, content) => {
  const marker = (parent._searchMarker || []).reduce((maxMarker, currMarker) => currMarker.index > maxMarker.index ? currMarker : maxMarker, { index: 0, p: parent._start });
  let n = marker.p;
  if (n) {
    while (n.right) {
      n = n.right;
    }
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content);
};
const typeListDelete = (transaction, parent, index, length) => {
  if (length === 0) {
    return;
  }
  const startIndex = index;
  const startLength = length;
  const marker = findMarker(parent, index);
  let n = parent._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
  }
  for (; n !== null && index > 0; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
      }
      index -= n.length;
    }
  }
  while (length > 0 && n !== null) {
    if (!n.deleted) {
      if (length < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length));
      }
      n.delete(transaction);
      length -= n.length;
    }
    n = n.right;
  }
  if (length > 0) {
    throw lengthExceeded();
  }
  if (parent._searchMarker) {
    updateMarkerChanges(
      parent._searchMarker,
      startIndex,
      -startLength + length
      /* in case we remove the above exception */
    );
  }
};
const typeMapDelete = (transaction, parent, key) => {
  const c = parent._map.get(key);
  if (c !== void 0) {
    c.delete(transaction);
  }
};
const typeMapSet = (transaction, parent, key, value) => {
  const left = parent._map.get(key) || null;
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  let content;
  if (value == null) {
    content = new ContentAny([value]);
  } else {
    switch (value.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
      case Date:
      case BigInt:
        content = new ContentAny([value]);
        break;
      case Uint8Array:
        content = new ContentBinary(
          /** @type {Uint8Array} */
          value
        );
        break;
      case Doc:
        content = new ContentDoc(
          /** @type {Doc} */
          value
        );
        break;
      default:
        if (value instanceof AbstractType) {
          content = new ContentType(value);
        } else {
          throw new Error("Unexpected content type");
        }
    }
  }
  new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, null, null, parent, key, content).integrate(transaction, 0);
};
const typeMapGet = (parent, key) => {
  parent.doc ?? warnPrematureAccess();
  const val = parent._map.get(key);
  return val !== void 0 && !val.deleted ? val.content.getContent()[val.length - 1] : void 0;
};
const typeMapGetAll = (parent) => {
  const res = {};
  parent.doc ?? warnPrematureAccess();
  parent._map.forEach((value, key) => {
    if (!value.deleted) {
      res[key] = value.content.getContent()[value.length - 1];
    }
  });
  return res;
};
const typeMapHas = (parent, key) => {
  parent.doc ?? warnPrematureAccess();
  const val = parent._map.get(key);
  return val !== void 0 && !val.deleted;
};
const typeMapGetAllSnapshot = (parent, snapshot2) => {
  const res = {};
  parent._map.forEach((value, key) => {
    let v = value;
    while (v !== null && (!snapshot2.sv.has(v.id.client) || v.id.clock >= (snapshot2.sv.get(v.id.client) || 0))) {
      v = v.left;
    }
    if (v !== null && isVisible(v, snapshot2)) {
      res[key] = v.content.getContent()[v.length - 1];
    }
  });
  return res;
};
const createMapIterator = (type) => {
  type.doc ?? warnPrematureAccess();
  return iteratorFilter(
    type._map.entries(),
    /** @param {any} entry */
    (entry) => !entry[1].deleted
  );
};
class YArrayEvent extends YEvent {
}
class YArray extends AbstractType {
  constructor() {
    super();
    this._prelimContent = [];
    this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(items) {
    const a = new YArray();
    a.push(items);
    return a;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(y, item) {
    super._integrate(y, item);
    this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    );
    this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new YArray();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone() {
    const arr = new YArray();
    arr.insert(0, this.toArray().map(
      (el) => el instanceof AbstractType ? (
        /** @type {typeof el} */
        el.clone()
      ) : el
    ));
    return arr;
  }
  get length() {
    this.doc ?? warnPrematureAccess();
    return this._length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(transaction, parentSubs) {
    super._callObserver(transaction, parentSubs);
    callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(index, content) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeListInsertGenerics(
          transaction,
          this,
          index,
          /** @type {any} */
          content
        );
      });
    } else {
      this._prelimContent.splice(index, 0, ...content);
    }
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(content) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeListPushGenerics(
          transaction,
          this,
          /** @type {any} */
          content
        );
      });
    } else {
      this._prelimContent.push(...content);
    }
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift(content) {
    this.insert(0, content);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      this._prelimContent.splice(index, length);
    }
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(index) {
    return typeListGet(this, index);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return typeListToArray(this);
  }
  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(start = 0, end = this.length) {
    return typeListSlice(this, start, end);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((c) => c instanceof AbstractType ? c.toJSON() : c);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(f2) {
    return typeListMap(
      this,
      /** @type {any} */
      f2
    );
  }
  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(f2) {
    typeListForEach(this, f2);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return typeListCreateIterator(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(encoder) {
    encoder.writeTypeRef(YArrayRefID);
  }
}
const readYArray = (_decoder) => new YArray();
class YMapEvent extends YEvent {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(ymap, transaction, subs) {
    super(ymap, transaction);
    this.keysChanged = subs;
  }
}
class YMap extends AbstractType {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(entries) {
    super();
    this._prelimContent = null;
    if (entries === void 0) {
      this._prelimContent = /* @__PURE__ */ new Map();
    } else {
      this._prelimContent = new Map(entries);
    }
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(y, item) {
    super._integrate(y, item);
    this._prelimContent.forEach((value, key) => {
      this.set(key, value);
    });
    this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new YMap();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone() {
    const map2 = new YMap();
    this.forEach((value, key) => {
      map2.set(key, value instanceof AbstractType ? (
        /** @type {typeof value} */
        value.clone()
      ) : value);
    });
    return map2;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(transaction, parentSubs) {
    callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    this.doc ?? warnPrematureAccess();
    const map2 = {};
    this._map.forEach((item, key) => {
      if (!item.deleted) {
        const v = item.content.getContent()[item.length - 1];
        map2[key] = v instanceof AbstractType ? v.toJSON() : v;
      }
    });
    return map2;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...createMapIterator(this)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return iteratorMap(
      createMapIterator(this),
      /** @param {any} v */
      (v) => v[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values() {
    return iteratorMap(
      createMapIterator(this),
      /** @param {any} v */
      (v) => v[1].content.getContent()[v[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries() {
    return iteratorMap(
      createMapIterator(this),
      /** @param {any} v */
      (v) => (
        /** @type {any} */
        [v[0], v[1].content.getContent()[v[1].length - 1]]
      )
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(f2) {
    this.doc ?? warnPrematureAccess();
    this._map.forEach((item, key) => {
      if (!item.deleted) {
        f2(item.content.getContent()[item.length - 1], key, this);
      }
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(key) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapDelete(transaction, this, key);
      });
    } else {
      this._prelimContent.delete(key);
    }
  }
  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set(key, value) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapSet(
          transaction,
          this,
          key,
          /** @type {any} */
          value
        );
      });
    } else {
      this._prelimContent.set(key, value);
    }
    return value;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(key) {
    return (
      /** @type {any} */
      typeMapGet(this, key)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(key) {
    return typeMapHas(this, key);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        this.forEach(function(_value, key, map2) {
          typeMapDelete(transaction, map2, key);
        });
      });
    } else {
      this._prelimContent.clear();
    }
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(encoder) {
    encoder.writeTypeRef(YMapRefID);
  }
}
const readYMap = (_decoder) => new YMap();
const equalAttrs = (a, b) => a === b || typeof a === "object" && typeof b === "object" && a && b && equalFlat(a, b);
class ItemTextListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(left, right, index, currentAttributes) {
    this.left = left;
    this.right = right;
    this.index = index;
    this.currentAttributes = currentAttributes;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    if (this.right === null) {
      unexpectedCase();
    }
    switch (this.right.content.constructor) {
      case ContentFormat:
        if (!this.right.deleted) {
          updateCurrentAttributes(
            this.currentAttributes,
            /** @type {ContentFormat} */
            this.right.content
          );
        }
        break;
      default:
        if (!this.right.deleted) {
          this.index += this.right.length;
        }
        break;
    }
    this.left = this.right;
    this.right = this.right.right;
  }
}
const findNextPosition = (transaction, pos, count) => {
  while (pos.right !== null && count > 0) {
    switch (pos.right.content.constructor) {
      case ContentFormat:
        if (!pos.right.deleted) {
          updateCurrentAttributes(
            pos.currentAttributes,
            /** @type {ContentFormat} */
            pos.right.content
          );
        }
        break;
      default:
        if (!pos.right.deleted) {
          if (count < pos.right.length) {
            getItemCleanStart(transaction, createID(pos.right.id.client, pos.right.id.clock + count));
          }
          pos.index += pos.right.length;
          count -= pos.right.length;
        }
        break;
    }
    pos.left = pos.right;
    pos.right = pos.right.right;
  }
  return pos;
};
const findPosition = (transaction, parent, index, useSearchMarker) => {
  const currentAttributes = /* @__PURE__ */ new Map();
  const marker = useSearchMarker ? findMarker(parent, index) : null;
  if (marker) {
    const pos = new ItemTextListPosition(marker.p.left, marker.p, marker.index, currentAttributes);
    return findNextPosition(transaction, pos, index - marker.index);
  } else {
    const pos = new ItemTextListPosition(null, parent._start, 0, currentAttributes);
    return findNextPosition(transaction, pos, index);
  }
};
const insertNegatedAttributes = (transaction, parent, currPos, negatedAttributes) => {
  while (currPos.right !== null && (currPos.right.deleted === true || currPos.right.content.constructor === ContentFormat && equalAttrs(
    negatedAttributes.get(
      /** @type {ContentFormat} */
      currPos.right.content.key
    ),
    /** @type {ContentFormat} */
    currPos.right.content.value
  ))) {
    if (!currPos.right.deleted) {
      negatedAttributes.delete(
        /** @type {ContentFormat} */
        currPos.right.content.key
      );
    }
    currPos.forward();
  }
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  negatedAttributes.forEach((val, key) => {
    const left = currPos.left;
    const right = currPos.right;
    const nextFormat = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
    nextFormat.integrate(transaction, 0);
    currPos.right = nextFormat;
    currPos.forward();
  });
};
const updateCurrentAttributes = (currentAttributes, format) => {
  const { key, value } = format;
  if (value === null) {
    currentAttributes.delete(key);
  } else {
    currentAttributes.set(key, value);
  }
};
const minimizeAttributeChanges = (currPos, attributes) => {
  while (true) {
    if (currPos.right === null) {
      break;
    } else if (currPos.right.deleted || currPos.right.content.constructor === ContentFormat && equalAttrs(
      attributes[
        /** @type {ContentFormat} */
        currPos.right.content.key
      ] ?? null,
      /** @type {ContentFormat} */
      currPos.right.content.value
    )) ;
    else {
      break;
    }
    currPos.forward();
  }
};
const insertAttributes = (transaction, parent, currPos, attributes) => {
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  const negatedAttributes = /* @__PURE__ */ new Map();
  for (const key in attributes) {
    const val = attributes[key];
    const currentVal = currPos.currentAttributes.get(key) ?? null;
    if (!equalAttrs(currentVal, val)) {
      negatedAttributes.set(key, currentVal);
      const { left, right } = currPos;
      currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
      currPos.right.integrate(transaction, 0);
      currPos.forward();
    }
  }
  return negatedAttributes;
};
const insertText = (transaction, parent, currPos, text, attributes) => {
  currPos.currentAttributes.forEach((_val, key) => {
    if (attributes[key] === void 0) {
      attributes[key] = null;
    }
  });
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  minimizeAttributeChanges(currPos, attributes);
  const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
  const content = text.constructor === String ? new ContentString(
    /** @type {string} */
    text
  ) : text instanceof AbstractType ? new ContentType(text) : new ContentEmbed(text);
  let { left, right, index } = currPos;
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, currPos.index, content.getLength());
  }
  right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, content);
  right.integrate(transaction, 0);
  currPos.right = right;
  currPos.index = index;
  currPos.forward();
  insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
const formatText = (transaction, parent, currPos, length, attributes) => {
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  minimizeAttributeChanges(currPos, attributes);
  const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
  iterationLoop: while (currPos.right !== null && (length > 0 || negatedAttributes.size > 0 && (currPos.right.deleted || currPos.right.content.constructor === ContentFormat))) {
    if (!currPos.right.deleted) {
      switch (currPos.right.content.constructor) {
        case ContentFormat: {
          const { key, value } = (
            /** @type {ContentFormat} */
            currPos.right.content
          );
          const attr = attributes[key];
          if (attr !== void 0) {
            if (equalAttrs(attr, value)) {
              negatedAttributes.delete(key);
            } else {
              if (length === 0) {
                break iterationLoop;
              }
              negatedAttributes.set(key, value);
            }
            currPos.right.delete(transaction);
          } else {
            currPos.currentAttributes.set(key, value);
          }
          break;
        }
        default:
          if (length < currPos.right.length) {
            getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
          }
          length -= currPos.right.length;
          break;
      }
    }
    currPos.forward();
  }
  if (length > 0) {
    let newlines = "";
    for (; length > 0; length--) {
      newlines += "\n";
    }
    currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), currPos.left, currPos.left && currPos.left.lastId, currPos.right, currPos.right && currPos.right.id, parent, null, new ContentString(newlines));
    currPos.right.integrate(transaction, 0);
    currPos.forward();
  }
  insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
const cleanupFormattingGap = (transaction, start, curr, startAttributes, currAttributes) => {
  let end = start;
  const endFormats = create$3();
  while (end && (!end.countable || end.deleted)) {
    if (!end.deleted && end.content.constructor === ContentFormat) {
      const cf = (
        /** @type {ContentFormat} */
        end.content
      );
      endFormats.set(cf.key, cf);
    }
    end = end.right;
  }
  let cleanups = 0;
  let reachedCurr = false;
  while (start !== end) {
    if (curr === start) {
      reachedCurr = true;
    }
    if (!start.deleted) {
      const content = start.content;
      switch (content.constructor) {
        case ContentFormat: {
          const { key, value } = (
            /** @type {ContentFormat} */
            content
          );
          const startAttrValue = startAttributes.get(key) ?? null;
          if (endFormats.get(key) !== content || startAttrValue === value) {
            start.delete(transaction);
            cleanups++;
            if (!reachedCurr && (currAttributes.get(key) ?? null) === value && startAttrValue !== value) {
              if (startAttrValue === null) {
                currAttributes.delete(key);
              } else {
                currAttributes.set(key, startAttrValue);
              }
            }
          }
          if (!reachedCurr && !start.deleted) {
            updateCurrentAttributes(
              currAttributes,
              /** @type {ContentFormat} */
              content
            );
          }
          break;
        }
      }
    }
    start = /** @type {Item} */
    start.right;
  }
  return cleanups;
};
const cleanupContextlessFormattingGap = (transaction, item) => {
  while (item && item.right && (item.right.deleted || !item.right.countable)) {
    item = item.right;
  }
  const attrs = /* @__PURE__ */ new Set();
  while (item && (item.deleted || !item.countable)) {
    if (!item.deleted && item.content.constructor === ContentFormat) {
      const key = (
        /** @type {ContentFormat} */
        item.content.key
      );
      if (attrs.has(key)) {
        item.delete(transaction);
      } else {
        attrs.add(key);
      }
    }
    item = item.left;
  }
};
const cleanupYTextFormatting = (type) => {
  let res = 0;
  transact(
    /** @type {Doc} */
    type.doc,
    (transaction) => {
      let start = (
        /** @type {Item} */
        type._start
      );
      let end = type._start;
      let startAttributes = create$3();
      const currentAttributes = copy(startAttributes);
      while (end) {
        if (end.deleted === false) {
          switch (end.content.constructor) {
            case ContentFormat:
              updateCurrentAttributes(
                currentAttributes,
                /** @type {ContentFormat} */
                end.content
              );
              break;
            default:
              res += cleanupFormattingGap(transaction, start, end, startAttributes, currentAttributes);
              startAttributes = copy(currentAttributes);
              start = end;
              break;
          }
        }
        end = end.right;
      }
    }
  );
  return res;
};
const cleanupYTextAfterTransaction = (transaction) => {
  const needFullCleanup = /* @__PURE__ */ new Set();
  const doc = transaction.doc;
  for (const [client, afterClock] of transaction.afterState.entries()) {
    const clock = transaction.beforeState.get(client) || 0;
    if (afterClock === clock) {
      continue;
    }
    iterateStructs(
      transaction,
      /** @type {Array<Item|GC>} */
      doc.store.clients.get(client),
      clock,
      afterClock,
      (item) => {
        if (!item.deleted && /** @type {Item} */
        item.content.constructor === ContentFormat && item.constructor !== GC) {
          needFullCleanup.add(
            /** @type {any} */
            item.parent
          );
        }
      }
    );
  }
  transact(doc, (t) => {
    iterateDeletedStructs(transaction, transaction.deleteSet, (item) => {
      if (item instanceof GC || !/** @type {YText} */
      item.parent._hasFormatting || needFullCleanup.has(
        /** @type {YText} */
        item.parent
      )) {
        return;
      }
      const parent = (
        /** @type {YText} */
        item.parent
      );
      if (item.content.constructor === ContentFormat) {
        needFullCleanup.add(parent);
      } else {
        cleanupContextlessFormattingGap(t, item);
      }
    });
    for (const yText of needFullCleanup) {
      cleanupYTextFormatting(yText);
    }
  });
};
const deleteText = (transaction, currPos, length) => {
  const startLength = length;
  const startAttrs = copy(currPos.currentAttributes);
  const start = currPos.right;
  while (length > 0 && currPos.right !== null) {
    if (currPos.right.deleted === false) {
      switch (currPos.right.content.constructor) {
        case ContentType:
        case ContentEmbed:
        case ContentString:
          if (length < currPos.right.length) {
            getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
          }
          length -= currPos.right.length;
          currPos.right.delete(transaction);
          break;
      }
    }
    currPos.forward();
  }
  if (start) {
    cleanupFormattingGap(transaction, start, currPos.right, startAttrs, currPos.currentAttributes);
  }
  const parent = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (currPos.left || currPos.right).parent
  );
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, currPos.index, -startLength + length);
  }
  return currPos;
};
class YTextEvent extends YEvent {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(ytext, transaction, subs) {
    super(ytext, transaction);
    this.childListChanged = false;
    this.keysChanged = /* @__PURE__ */ new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.keysChanged.add(sub);
      }
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const changes = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = changes;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const y = (
        /** @type {Doc} */
        this.target.doc
      );
      const delta = [];
      transact(y, (transaction) => {
        const currentAttributes = /* @__PURE__ */ new Map();
        const oldAttributes = /* @__PURE__ */ new Map();
        let item = this.target._start;
        let action = null;
        const attributes = {};
        let insert = "";
        let retain = 0;
        let deleteLen = 0;
        const addOp = () => {
          if (action !== null) {
            let op = null;
            switch (action) {
              case "delete":
                if (deleteLen > 0) {
                  op = { delete: deleteLen };
                }
                deleteLen = 0;
                break;
              case "insert":
                if (typeof insert === "object" || insert.length > 0) {
                  op = { insert };
                  if (currentAttributes.size > 0) {
                    op.attributes = {};
                    currentAttributes.forEach((value, key) => {
                      if (value !== null) {
                        op.attributes[key] = value;
                      }
                    });
                  }
                }
                insert = "";
                break;
              case "retain":
                if (retain > 0) {
                  op = { retain };
                  if (!isEmpty(attributes)) {
                    op.attributes = assign({}, attributes);
                  }
                }
                retain = 0;
                break;
            }
            if (op) delta.push(op);
            action = null;
          }
        };
        while (item !== null) {
          switch (item.content.constructor) {
            case ContentType:
            case ContentEmbed:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  addOp();
                  action = "insert";
                  insert = item.content.getContent()[0];
                  addOp();
                }
              } else if (this.deletes(item)) {
                if (action !== "delete") {
                  addOp();
                  action = "delete";
                }
                deleteLen += 1;
              } else if (!item.deleted) {
                if (action !== "retain") {
                  addOp();
                  action = "retain";
                }
                retain += 1;
              }
              break;
            case ContentString:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  if (action !== "insert") {
                    addOp();
                    action = "insert";
                  }
                  insert += /** @type {ContentString} */
                  item.content.str;
                }
              } else if (this.deletes(item)) {
                if (action !== "delete") {
                  addOp();
                  action = "delete";
                }
                deleteLen += item.length;
              } else if (!item.deleted) {
                if (action !== "retain") {
                  addOp();
                  action = "retain";
                }
                retain += item.length;
              }
              break;
            case ContentFormat: {
              const { key, value } = (
                /** @type {ContentFormat} */
                item.content
              );
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  const curVal = currentAttributes.get(key) ?? null;
                  if (!equalAttrs(curVal, value)) {
                    if (action === "retain") {
                      addOp();
                    }
                    if (equalAttrs(value, oldAttributes.get(key) ?? null)) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else if (value !== null) {
                    item.delete(transaction);
                  }
                }
              } else if (this.deletes(item)) {
                oldAttributes.set(key, value);
                const curVal = currentAttributes.get(key) ?? null;
                if (!equalAttrs(curVal, value)) {
                  if (action === "retain") {
                    addOp();
                  }
                  attributes[key] = curVal;
                }
              } else if (!item.deleted) {
                oldAttributes.set(key, value);
                const attr = attributes[key];
                if (attr !== void 0) {
                  if (!equalAttrs(attr, value)) {
                    if (action === "retain") {
                      addOp();
                    }
                    if (value === null) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else if (attr !== null) {
                    item.delete(transaction);
                  }
                }
              }
              if (!item.deleted) {
                if (action === "insert") {
                  addOp();
                }
                updateCurrentAttributes(
                  currentAttributes,
                  /** @type {ContentFormat} */
                  item.content
                );
              }
              break;
            }
          }
          item = item.right;
        }
        addOp();
        while (delta.length > 0) {
          const lastOp = delta[delta.length - 1];
          if (lastOp.retain !== void 0 && lastOp.attributes === void 0) {
            delta.pop();
          } else {
            break;
          }
        }
      });
      this._delta = delta;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class YText extends AbstractType {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(string2) {
    super();
    this._pending = string2 !== void 0 ? [() => this.insert(0, string2)] : [];
    this._searchMarker = [];
    this._hasFormatting = false;
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    this.doc ?? warnPrematureAccess();
    return this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(y, item) {
    super._integrate(y, item);
    try {
      this._pending.forEach((f2) => f2());
    } catch (e) {
      console.error(e);
    }
    this._pending = null;
  }
  _copy() {
    return new YText();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone() {
    const text = new YText();
    text.applyDelta(this.toDelta());
    return text;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(transaction, parentSubs) {
    super._callObserver(transaction, parentSubs);
    const event = new YTextEvent(this, transaction, parentSubs);
    callTypeObservers(this, transaction, event);
    if (!transaction.local && this._hasFormatting) {
      transaction._needFormattingCleanup = true;
    }
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    this.doc ?? warnPrematureAccess();
    let str = "";
    let n = this._start;
    while (n !== null) {
      if (!n.deleted && n.countable && n.content.constructor === ContentString) {
        str += /** @type {ContentString} */
        n.content.str;
      }
      n = n.right;
    }
    return str;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {Array<any>} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(delta, { sanitize = true } = {}) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        const currPos = new ItemTextListPosition(null, this._start, 0, /* @__PURE__ */ new Map());
        for (let i = 0; i < delta.length; i++) {
          const op = delta[i];
          if (op.insert !== void 0) {
            const ins = !sanitize && typeof op.insert === "string" && i === delta.length - 1 && currPos.right === null && op.insert.slice(-1) === "\n" ? op.insert.slice(0, -1) : op.insert;
            if (typeof ins !== "string" || ins.length > 0) {
              insertText(transaction, this, currPos, ins, op.attributes || {});
            }
          } else if (op.retain !== void 0) {
            formatText(transaction, this, currPos, op.retain, op.attributes || {});
          } else if (op.delete !== void 0) {
            deleteText(transaction, currPos, op.delete);
          }
        }
      });
    } else {
      this._pending.push(() => this.applyDelta(delta));
    }
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(snapshot2, prevSnapshot, computeYChange) {
    this.doc ?? warnPrematureAccess();
    const ops = [];
    const currentAttributes = /* @__PURE__ */ new Map();
    const doc = (
      /** @type {Doc} */
      this.doc
    );
    let str = "";
    let n = this._start;
    function packStr() {
      if (str.length > 0) {
        const attributes = {};
        let addAttributes = false;
        currentAttributes.forEach((value, key) => {
          addAttributes = true;
          attributes[key] = value;
        });
        const op = { insert: str };
        if (addAttributes) {
          op.attributes = attributes;
        }
        ops.push(op);
        str = "";
      }
    }
    const computeDelta = () => {
      while (n !== null) {
        if (isVisible(n, snapshot2) || prevSnapshot !== void 0 && isVisible(n, prevSnapshot)) {
          switch (n.content.constructor) {
            case ContentString: {
              const cur = currentAttributes.get("ychange");
              if (snapshot2 !== void 0 && !isVisible(n, snapshot2)) {
                if (cur === void 0 || cur.user !== n.id.client || cur.type !== "removed") {
                  packStr();
                  currentAttributes.set("ychange", computeYChange ? computeYChange("removed", n.id) : { type: "removed" });
                }
              } else if (prevSnapshot !== void 0 && !isVisible(n, prevSnapshot)) {
                if (cur === void 0 || cur.user !== n.id.client || cur.type !== "added") {
                  packStr();
                  currentAttributes.set("ychange", computeYChange ? computeYChange("added", n.id) : { type: "added" });
                }
              } else if (cur !== void 0) {
                packStr();
                currentAttributes.delete("ychange");
              }
              str += /** @type {ContentString} */
              n.content.str;
              break;
            }
            case ContentType:
            case ContentEmbed: {
              packStr();
              const op = {
                insert: n.content.getContent()[0]
              };
              if (currentAttributes.size > 0) {
                const attrs = (
                  /** @type {Object<string,any>} */
                  {}
                );
                op.attributes = attrs;
                currentAttributes.forEach((value, key) => {
                  attrs[key] = value;
                });
              }
              ops.push(op);
              break;
            }
            case ContentFormat:
              if (isVisible(n, snapshot2)) {
                packStr();
                updateCurrentAttributes(
                  currentAttributes,
                  /** @type {ContentFormat} */
                  n.content
                );
              }
              break;
          }
        }
        n = n.right;
      }
      packStr();
    };
    if (snapshot2 || prevSnapshot) {
      transact(doc, (transaction) => {
        if (snapshot2) {
          splitSnapshotAffectedStructs(transaction, snapshot2);
        }
        if (prevSnapshot) {
          splitSnapshotAffectedStructs(transaction, prevSnapshot);
        }
        computeDelta();
      }, "cleanup");
    } else {
      computeDelta();
    }
    return ops;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(index, text, attributes) {
    if (text.length <= 0) {
      return;
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, (transaction) => {
        const pos = findPosition(transaction, this, index, !attributes);
        if (!attributes) {
          attributes = {};
          pos.currentAttributes.forEach((v, k) => {
            attributes[k] = v;
          });
        }
        insertText(transaction, this, pos, text, attributes);
      });
    } else {
      this._pending.push(() => this.insert(index, text, attributes));
    }
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(index, embed, attributes) {
    const y = this.doc;
    if (y !== null) {
      transact(y, (transaction) => {
        const pos = findPosition(transaction, this, index, !attributes);
        insertText(transaction, this, pos, embed, attributes || {});
      });
    } else {
      this._pending.push(() => this.insertEmbed(index, embed, attributes || {}));
    }
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(index, length) {
    if (length === 0) {
      return;
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, (transaction) => {
        deleteText(transaction, findPosition(transaction, this, index, true), length);
      });
    } else {
      this._pending.push(() => this.delete(index, length));
    }
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(index, length, attributes) {
    if (length === 0) {
      return;
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, (transaction) => {
        const pos = findPosition(transaction, this, index, false);
        if (pos.right === null) {
          return;
        }
        formatText(transaction, this, pos, length, attributes);
      });
    } else {
      this._pending.push(() => this.format(index, length, attributes));
    }
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(attributeName) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      this._pending.push(() => this.removeAttribute(attributeName));
    }
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      this._pending.push(() => this.setAttribute(attributeName, attributeValue));
    }
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(attributeName) {
    return (
      /** @type {any} */
      typeMapGet(this, attributeName)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return typeMapGetAll(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(encoder) {
    encoder.writeTypeRef(YTextRefID);
  }
}
const readYText = (_decoder) => new YText();
class YXmlTreeWalker {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(root, f2 = () => true) {
    this._filter = f2;
    this._root = root;
    this._currentNode = /** @type {Item} */
    root._start;
    this._firstCall = true;
    root.doc ?? warnPrematureAccess();
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let n = this._currentNode;
    let type = n && n.content && /** @type {any} */
    n.content.type;
    if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) {
      do {
        type = /** @type {any} */
        n.content.type;
        if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) {
          n = type._start;
        } else {
          while (n !== null) {
            const nxt = n.next;
            if (nxt !== null) {
              n = nxt;
              break;
            } else if (n.parent === this._root) {
              n = null;
            } else {
              n = /** @type {AbstractType<any>} */
              n.parent._item;
            }
          }
        }
      } while (n !== null && (n.deleted || !this._filter(
        /** @type {ContentType} */
        n.content.type
      )));
    }
    this._firstCall = false;
    if (n === null) {
      return { value: void 0, done: true };
    }
    this._currentNode = n;
    return { value: (
      /** @type {any} */
      n.content.type
    ), done: false };
  }
}
class YXmlFragment extends AbstractType {
  constructor() {
    super();
    this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const first = this._first;
    return first ? first.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(y, item) {
    super._integrate(y, item);
    this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    );
    this._prelimContent = null;
  }
  _copy() {
    return new YXmlFragment();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone() {
    const el = new YXmlFragment();
    el.insert(0, this.toArray().map((item) => item instanceof AbstractType ? item.clone() : item));
    return el;
  }
  get length() {
    this.doc ?? warnPrematureAccess();
    return this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(filter) {
    return new YXmlTreeWalker(this, filter);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(query) {
    query = query.toUpperCase();
    const iterator2 = new YXmlTreeWalker(this, (element) => element.nodeName && element.nodeName.toUpperCase() === query);
    const next = iterator2.next();
    if (next.done) {
      return null;
    } else {
      return next.value;
    }
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(query) {
    query = query.toUpperCase();
    return from(new YXmlTreeWalker(this, (element) => element.nodeName && element.nodeName.toUpperCase() === query));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(transaction, parentSubs) {
    callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return typeListMap(this, (xml) => xml.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(_document = document, hooks = {}, binding) {
    const fragment = _document.createDocumentFragment();
    if (binding !== void 0) {
      binding._createAssociation(fragment, this);
    }
    typeListForEach(this, (xmlType) => {
      fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
    });
    return fragment;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(index, content) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      this._prelimContent.splice(index, 0, ...content);
    }
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(ref, content) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        const refItem = ref && ref instanceof AbstractType ? ref._item : ref;
        typeListInsertGenericsAfter(transaction, this, refItem, content);
      });
    } else {
      const pc = (
        /** @type {Array<any>} */
        this._prelimContent
      );
      const index = ref === null ? 0 : pc.findIndex((el) => el === ref) + 1;
      if (index === 0 && ref !== null) {
        throw create$1("Reference item not found");
      }
      pc.splice(index, 0, ...content);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      this._prelimContent.splice(index, length);
    }
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return typeListToArray(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(content) {
    this.insert(this.length, content);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift(content) {
    this.insert(0, content);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(index) {
    return typeListGet(this, index);
  }
  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(start = 0, end = this.length) {
    return typeListSlice(this, start, end);
  }
  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(f2) {
    typeListForEach(this, f2);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(encoder) {
    encoder.writeTypeRef(YXmlFragmentRefID);
  }
}
const readYXmlFragment = (_decoder) => new YXmlFragment();
class YXmlElement extends YXmlFragment {
  constructor(nodeName = "UNDEFINED") {
    super();
    this.nodeName = nodeName;
    this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const n = this._item ? this._item.next : null;
    return n ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      n.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const n = this._item ? this._item.prev : null;
    return n ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      n.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(y, item) {
    super._integrate(y, item);
    /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((value, key) => {
      this.setAttribute(key, value);
    });
    this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new YXmlElement(this.nodeName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone() {
    const el = new YXmlElement(this.nodeName);
    const attrs = this.getAttributes();
    forEach(attrs, (value, key) => {
      el.setAttribute(
        key,
        /** @type {any} */
        value
      );
    });
    el.insert(0, this.toArray().map((v) => v instanceof AbstractType ? v.clone() : v));
    return el;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const attrs = this.getAttributes();
    const stringBuilder = [];
    const keys = [];
    for (const key in attrs) {
      keys.push(key);
    }
    keys.sort();
    const keysLen = keys.length;
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i];
      stringBuilder.push(key + '="' + attrs[key] + '"');
    }
    const nodeName = this.nodeName.toLocaleLowerCase();
    const attrsString = stringBuilder.length > 0 ? " " + stringBuilder.join(" ") : "";
    return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(attributeName) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      this._prelimAttrs.delete(attributeName);
    }
  }
  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, (transaction) => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      this._prelimAttrs.set(attributeName, attributeValue);
    }
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute(attributeName) {
    return (
      /** @type {any} */
      typeMapGet(this, attributeName)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(attributeName) {
    return (
      /** @type {any} */
      typeMapHas(this, attributeName)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes(snapshot2) {
    return (
      /** @type {any} */
      snapshot2 ? typeMapGetAllSnapshot(this, snapshot2) : typeMapGetAll(this)
    );
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(_document = document, hooks = {}, binding) {
    const dom = _document.createElement(this.nodeName);
    const attrs = this.getAttributes();
    for (const key in attrs) {
      const value = attrs[key];
      if (typeof value === "string") {
        dom.setAttribute(key, value);
      }
    }
    typeListForEach(this, (yxml) => {
      dom.appendChild(yxml.toDOM(_document, hooks, binding));
    });
    if (binding !== void 0) {
      binding._createAssociation(dom, this);
    }
    return dom;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(encoder) {
    encoder.writeTypeRef(YXmlElementRefID);
    encoder.writeKey(this.nodeName);
  }
}
const readYXmlElement = (decoder) => new YXmlElement(decoder.readKey());
class YXmlEvent extends YEvent {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with which the
   *                                  change was created.
   */
  constructor(target, subs, transaction) {
    super(target, transaction);
    this.childListChanged = false;
    this.attributesChanged = /* @__PURE__ */ new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.attributesChanged.add(sub);
      }
    });
  }
}
class YXmlHook extends YMap {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor(hookName) {
    super();
    this.hookName = hookName;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy() {
    return new YXmlHook(this.hookName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlHook}
   */
  clone() {
    const el = new YXmlHook(this.hookName);
    this.forEach((value, key) => {
      el.set(key, value);
    });
    return el;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(_document = document, hooks = {}, binding) {
    const hook = hooks[this.hookName];
    let dom;
    if (hook !== void 0) {
      dom = hook.createDom(this);
    } else {
      dom = document.createElement(this.hookName);
    }
    dom.setAttribute("data-yjs-hook", this.hookName);
    if (binding !== void 0) {
      binding._createAssociation(dom, this);
    }
    return dom;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(encoder) {
    encoder.writeTypeRef(YXmlHookRefID);
    encoder.writeKey(this.hookName);
  }
}
const readYXmlHook = (decoder) => new YXmlHook(decoder.readKey());
class YXmlText extends YText {
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const n = this._item ? this._item.next : null;
    return n ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      n.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const n = this._item ? this._item.prev : null;
    return n ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      n.content.type
    ) : null;
  }
  _copy() {
    return new YXmlText();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlText}
   */
  clone() {
    const text = new YXmlText();
    text.applyDelta(this.toDelta());
    return text;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(_document = document, hooks, binding) {
    const dom = _document.createTextNode(this.toString());
    if (binding !== void 0) {
      binding._createAssociation(dom, this);
    }
    return dom;
  }
  toString() {
    return this.toDelta().map((delta) => {
      const nestedNodes = [];
      for (const nodeName in delta.attributes) {
        const attrs = [];
        for (const key in delta.attributes[nodeName]) {
          attrs.push({ key, value: delta.attributes[nodeName][key] });
        }
        attrs.sort((a, b) => a.key < b.key ? -1 : 1);
        nestedNodes.push({ nodeName, attrs });
      }
      nestedNodes.sort((a, b) => a.nodeName < b.nodeName ? -1 : 1);
      let str = "";
      for (let i = 0; i < nestedNodes.length; i++) {
        const node = nestedNodes[i];
        str += `<${node.nodeName}`;
        for (let j = 0; j < node.attrs.length; j++) {
          const attr = node.attrs[j];
          str += ` ${attr.key}="${attr.value}"`;
        }
        str += ">";
      }
      str += delta.insert;
      for (let i = nestedNodes.length - 1; i >= 0; i--) {
        str += `</${nestedNodes[i].nodeName}>`;
      }
      return str;
    }).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(encoder) {
    encoder.writeTypeRef(YXmlTextRefID);
  }
}
const readYXmlText = (decoder) => new YXmlText();
class AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(id, length) {
    this.id = id;
    this.length = length;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw methodUnimplemented();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} whether this merged with right
   */
  mergeWith(right) {
    return false;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(encoder, offset, encodingRef) {
    throw methodUnimplemented();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(transaction, offset) {
    throw methodUnimplemented();
  }
}
const structGCRefNumber = 0;
class GC extends AbstractStruct {
  get deleted() {
    return true;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(right) {
    if (this.constructor !== right.constructor) {
      return false;
    }
    this.length += right.length;
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(transaction, offset) {
    if (offset > 0) {
      this.id.clock += offset;
      this.length -= offset;
    }
    addStruct(transaction.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeInfo(structGCRefNumber);
    encoder.writeLen(this.length - offset);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(transaction, store) {
    return null;
  }
}
class ContentBinary {
  /**
   * @param {Uint8Array} content
   */
  constructor(content) {
    this.content = content;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new ContentBinary(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(offset) {
    throw methodUnimplemented();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(right) {
    return false;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
const readContentBinary = (decoder) => new ContentBinary(decoder.readBuf());
class ContentDeleted {
  /**
   * @param {number} len
   */
  constructor(len) {
    this.len = len;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return false;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new ContentDeleted(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(offset) {
    const right = new ContentDeleted(this.len - offset);
    this.len = offset;
    return right;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(right) {
    this.len += right.len;
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
    addToDeleteSet(transaction.deleteSet, item.id.client, item.id.clock, this.len);
    item.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeLen(this.len - offset);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const readContentDeleted = (decoder) => new ContentDeleted(decoder.readLen());
const createDocFromOpts = (guid, opts) => new Doc({ guid, ...opts, shouldLoad: opts.shouldLoad || opts.autoLoad || false });
class ContentDoc {
  /**
   * @param {Doc} doc
   */
  constructor(doc) {
    if (doc._item) {
      console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid.");
    }
    this.doc = doc;
    const opts = {};
    this.opts = opts;
    if (!doc.gc) {
      opts.gc = false;
    }
    if (doc.autoLoad) {
      opts.autoLoad = true;
    }
    if (doc.meta !== null) {
      opts.meta = doc.meta;
    }
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new ContentDoc(createDocFromOpts(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(offset) {
    throw methodUnimplemented();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(right) {
    return false;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
    this.doc._item = item;
    transaction.subdocsAdded.add(this.doc);
    if (this.doc.shouldLoad) {
      transaction.subdocsLoaded.add(this.doc);
    }
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
    if (transaction.subdocsAdded.has(this.doc)) {
      transaction.subdocsAdded.delete(this.doc);
    } else {
      transaction.subdocsRemoved.add(this.doc);
    }
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeString(this.doc.guid);
    encoder.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
const readContentDoc = (decoder) => new ContentDoc(createDocFromOpts(decoder.readString(), decoder.readAny()));
class ContentEmbed {
  /**
   * @param {Object} embed
   */
  constructor(embed) {
    this.embed = embed;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new ContentEmbed(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(offset) {
    throw methodUnimplemented();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(right) {
    return false;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
const readContentEmbed = (decoder) => new ContentEmbed(decoder.readJSON());
class ContentFormat {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return false;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new ContentFormat(this.key, this.value);
  }
  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice(_offset) {
    throw methodUnimplemented();
  }
  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith(_right) {
    return false;
  }
  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate(_transaction, item) {
    const p = (
      /** @type {YText} */
      item.parent
    );
    p._searchMarker = null;
    p._hasFormatting = true;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeKey(this.key);
    encoder.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const readContentFormat = (decoder) => new ContentFormat(decoder.readKey(), decoder.readJSON());
class ContentJSON {
  /**
   * @param {Array<any>} arr
   */
  constructor(arr) {
    this.arr = arr;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentJSON}
   */
  copy() {
    return new ContentJSON(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice(offset) {
    const right = new ContentJSON(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right;
  }
  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith(right) {
    this.arr = this.arr.concat(right.arr);
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    const len = this.arr.length;
    encoder.writeLen(len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      encoder.writeString(c === void 0 ? "undefined" : JSON.stringify(c));
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 2;
  }
}
const readContentJSON = (decoder) => {
  const len = decoder.readLen();
  const cs = [];
  for (let i = 0; i < len; i++) {
    const c = decoder.readString();
    if (c === "undefined") {
      cs.push(void 0);
    } else {
      cs.push(JSON.parse(c));
    }
  }
  return new ContentJSON(cs);
};
const isDevMode = getVariable("node_env") === "development";
class ContentAny {
  /**
   * @param {Array<any>} arr
   */
  constructor(arr) {
    this.arr = arr;
    isDevMode && deepFreeze(arr);
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new ContentAny(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(offset) {
    const right = new ContentAny(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(right) {
    this.arr = this.arr.concat(right.arr);
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    const len = this.arr.length;
    encoder.writeLen(len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      encoder.writeAny(c);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
const readContentAny = (decoder) => {
  const len = decoder.readLen();
  const cs = [];
  for (let i = 0; i < len; i++) {
    cs.push(decoder.readAny());
  }
  return new ContentAny(cs);
};
class ContentString {
  /**
   * @param {string} str
   */
  constructor(str) {
    this.str = str;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new ContentString(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(offset) {
    const right = new ContentString(this.str.slice(offset));
    this.str = this.str.slice(0, offset);
    const firstCharCode = this.str.charCodeAt(offset - 1);
    if (firstCharCode >= 55296 && firstCharCode <= 56319) {
      this.str = this.str.slice(0, offset - 1) + "�";
      right.str = "�" + right.str.slice(1);
    }
    return right;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(right) {
    this.str += right.str;
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeString(offset === 0 ? this.str : this.str.slice(offset));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const readContentString = (decoder) => new ContentString(decoder.readString());
const typeRefs = [
  readYArray,
  readYMap,
  readYText,
  readYXmlElement,
  readYXmlFragment,
  readYXmlHook,
  readYXmlText
];
const YArrayRefID = 0;
const YMapRefID = 1;
const YTextRefID = 2;
const YXmlElementRefID = 3;
const YXmlFragmentRefID = 4;
const YXmlHookRefID = 5;
const YXmlTextRefID = 6;
class ContentType {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(type) {
    this.type = type;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return true;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new ContentType(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(offset) {
    throw methodUnimplemented();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(right) {
    return false;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(transaction, item) {
    this.type._integrate(transaction.doc, item);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(transaction) {
    let item = this.type._start;
    while (item !== null) {
      if (!item.deleted) {
        item.delete(transaction);
      } else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) {
        transaction._mergeStructs.push(item);
      }
      item = item.right;
    }
    this.type._map.forEach((item2) => {
      if (!item2.deleted) {
        item2.delete(transaction);
      } else if (item2.id.clock < (transaction.beforeState.get(item2.id.client) || 0)) {
        transaction._mergeStructs.push(item2);
      }
    });
    transaction.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(store) {
    let item = this.type._start;
    while (item !== null) {
      item.gc(store, true);
      item = item.right;
    }
    this.type._start = null;
    this.type._map.forEach(
      /** @param {Item | null} item */
      (item2) => {
        while (item2 !== null) {
          item2.gc(store, true);
          item2 = item2.left;
        }
      }
    );
    this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    this.type._write(encoder);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const readContentType = (decoder) => new ContentType(typeRefs[decoder.readTypeRef()](decoder));
const followRedone = (store, id) => {
  let nextID = id;
  let diff = 0;
  let item;
  do {
    if (diff > 0) {
      nextID = createID(nextID.client, nextID.clock + diff);
    }
    item = getItem(store, nextID);
    diff = nextID.clock - item.id.clock;
    nextID = item.redone;
  } while (nextID !== null && item instanceof Item);
  return {
    item,
    diff
  };
};
const keepItem = (item, keep) => {
  while (item !== null && item.keep !== keep) {
    item.keep = keep;
    item = /** @type {AbstractType<any>} */
    item.parent._item;
  }
};
const splitItem = (transaction, leftItem, diff) => {
  const { client, clock } = leftItem.id;
  const rightItem = new Item(
    createID(client, clock + diff),
    leftItem,
    createID(client, clock + diff - 1),
    leftItem.right,
    leftItem.rightOrigin,
    leftItem.parent,
    leftItem.parentSub,
    leftItem.content.splice(diff)
  );
  if (leftItem.deleted) {
    rightItem.markDeleted();
  }
  if (leftItem.keep) {
    rightItem.keep = true;
  }
  if (leftItem.redone !== null) {
    rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
  }
  leftItem.right = rightItem;
  if (rightItem.right !== null) {
    rightItem.right.left = rightItem;
  }
  transaction._mergeStructs.push(rightItem);
  if (rightItem.parentSub !== null && rightItem.right === null) {
    rightItem.parent._map.set(rightItem.parentSub, rightItem);
  }
  leftItem.length = diff;
  return rightItem;
};
const isDeletedByUndoStack = (stack, id) => some(
  stack,
  /** @param {StackItem} s */
  (s) => isDeleted(s.deletions, id)
);
const redoItem = (transaction, item, redoitems, itemsToDelete, ignoreRemoteMapChanges, um) => {
  const doc = transaction.doc;
  const store = doc.store;
  const ownClientID = doc.clientID;
  const redone = item.redone;
  if (redone !== null) {
    return getItemCleanStart(transaction, redone);
  }
  let parentItem = (
    /** @type {AbstractType<any>} */
    item.parent._item
  );
  let left = null;
  let right;
  if (parentItem !== null && parentItem.deleted === true) {
    if (parentItem.redone === null && (!redoitems.has(parentItem) || redoItem(transaction, parentItem, redoitems, itemsToDelete, ignoreRemoteMapChanges, um) === null)) {
      return null;
    }
    while (parentItem.redone !== null) {
      parentItem = getItemCleanStart(transaction, parentItem.redone);
    }
  }
  const parentType = parentItem === null ? (
    /** @type {AbstractType<any>} */
    item.parent
  ) : (
    /** @type {ContentType} */
    parentItem.content.type
  );
  if (item.parentSub === null) {
    left = item.left;
    right = item;
    while (left !== null) {
      let leftTrace = left;
      while (leftTrace !== null && /** @type {AbstractType<any>} */
      leftTrace.parent._item !== parentItem) {
        leftTrace = leftTrace.redone === null ? null : getItemCleanStart(transaction, leftTrace.redone);
      }
      if (leftTrace !== null && /** @type {AbstractType<any>} */
      leftTrace.parent._item === parentItem) {
        left = leftTrace;
        break;
      }
      left = left.left;
    }
    while (right !== null) {
      let rightTrace = right;
      while (rightTrace !== null && /** @type {AbstractType<any>} */
      rightTrace.parent._item !== parentItem) {
        rightTrace = rightTrace.redone === null ? null : getItemCleanStart(transaction, rightTrace.redone);
      }
      if (rightTrace !== null && /** @type {AbstractType<any>} */
      rightTrace.parent._item === parentItem) {
        right = rightTrace;
        break;
      }
      right = right.right;
    }
  } else {
    right = null;
    if (item.right && !ignoreRemoteMapChanges) {
      left = item;
      while (left !== null && left.right !== null && (left.right.redone || isDeleted(itemsToDelete, left.right.id) || isDeletedByUndoStack(um.undoStack, left.right.id) || isDeletedByUndoStack(um.redoStack, left.right.id))) {
        left = left.right;
        while (left.redone) left = getItemCleanStart(transaction, left.redone);
      }
      if (left && left.right !== null) {
        return null;
      }
    } else {
      left = parentType._map.get(item.parentSub) || null;
    }
  }
  const nextClock = getState(store, ownClientID);
  const nextId = createID(ownClientID, nextClock);
  const redoneItem = new Item(
    nextId,
    left,
    left && left.lastId,
    right,
    right && right.id,
    parentType,
    item.parentSub,
    item.content.copy()
  );
  item.redone = nextId;
  keepItem(redoneItem, true);
  redoneItem.integrate(transaction, 0);
  return redoneItem;
};
class Item extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(id, left, origin, right, rightOrigin, parent, parentSub, content) {
    super(id, content.getLength());
    this.origin = origin;
    this.left = left;
    this.right = right;
    this.rightOrigin = rightOrigin;
    this.parent = parent;
    this.parentSub = parentSub;
    this.redone = null;
    this.content = content;
    this.info = this.content.isCountable() ? BIT2 : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(isMarked) {
    if ((this.info & BIT4) > 0 !== isMarked) {
      this.info ^= BIT4;
    }
  }
  get marker() {
    return (this.info & BIT4) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & BIT1) > 0;
  }
  set keep(doKeep) {
    if (this.keep !== doKeep) {
      this.info ^= BIT1;
    }
  }
  get countable() {
    return (this.info & BIT2) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & BIT3) > 0;
  }
  set deleted(doDelete) {
    if (this.deleted !== doDelete) {
      this.info ^= BIT3;
    }
  }
  markDeleted() {
    this.info |= BIT3;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(transaction, store) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= getState(store, this.origin.client)) {
      return this.origin.client;
    }
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= getState(store, this.rightOrigin.client)) {
      return this.rightOrigin.client;
    }
    if (this.parent && this.parent.constructor === ID && this.id.client !== this.parent.client && this.parent.clock >= getState(store, this.parent.client)) {
      return this.parent.client;
    }
    if (this.origin) {
      this.left = getItemCleanEnd(transaction, store, this.origin);
      this.origin = this.left.lastId;
    }
    if (this.rightOrigin) {
      this.right = getItemCleanStart(transaction, this.rightOrigin);
      this.rightOrigin = this.right.id;
    }
    if (this.left && this.left.constructor === GC || this.right && this.right.constructor === GC) {
      this.parent = null;
    } else if (!this.parent) {
      if (this.left && this.left.constructor === Item) {
        this.parent = this.left.parent;
        this.parentSub = this.left.parentSub;
      } else if (this.right && this.right.constructor === Item) {
        this.parent = this.right.parent;
        this.parentSub = this.right.parentSub;
      }
    } else if (this.parent.constructor === ID) {
      const parentItem = getItem(store, this.parent);
      if (parentItem.constructor === GC) {
        this.parent = null;
      } else {
        this.parent = /** @type {ContentType} */
        parentItem.content.type;
      }
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(transaction, offset) {
    if (offset > 0) {
      this.id.clock += offset;
      this.left = getItemCleanEnd(transaction, transaction.doc.store, createID(this.id.client, this.id.clock - 1));
      this.origin = this.left.lastId;
      this.content = this.content.splice(offset);
      this.length -= offset;
    }
    if (this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let left = this.left;
        let o;
        if (left !== null) {
          o = left.right;
        } else if (this.parentSub !== null) {
          o = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null;
          while (o !== null && o.left !== null) {
            o = o.left;
          }
        } else {
          o = /** @type {AbstractType<any>} */
          this.parent._start;
        }
        const conflictingItems = /* @__PURE__ */ new Set();
        const itemsBeforeOrigin = /* @__PURE__ */ new Set();
        while (o !== null && o !== this.right) {
          itemsBeforeOrigin.add(o);
          conflictingItems.add(o);
          if (compareIDs(this.origin, o.origin)) {
            if (o.id.client < this.id.client) {
              left = o;
              conflictingItems.clear();
            } else if (compareIDs(this.rightOrigin, o.rightOrigin)) {
              break;
            }
          } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(transaction.doc.store, o.origin))) {
            if (!conflictingItems.has(getItem(transaction.doc.store, o.origin))) {
              left = o;
              conflictingItems.clear();
            }
          } else {
            break;
          }
          o = o.right;
        }
        this.left = left;
      }
      if (this.left !== null) {
        const right = this.left.right;
        this.right = right;
        this.left.right = this;
      } else {
        let r;
        if (this.parentSub !== null) {
          r = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null;
          while (r !== null && r.left !== null) {
            r = r.left;
          }
        } else {
          r = /** @type {AbstractType<any>} */
          this.parent._start;
          this.parent._start = this;
        }
        this.right = r;
      }
      if (this.right !== null) {
        this.right.left = this;
      } else if (this.parentSub !== null) {
        this.parent._map.set(this.parentSub, this);
        if (this.left !== null) {
          this.left.delete(transaction);
        }
      }
      if (this.parentSub === null && this.countable && !this.deleted) {
        this.parent._length += this.length;
      }
      addStruct(transaction.doc.store, this);
      this.content.integrate(transaction, this);
      addChangedTypeToTransaction(
        transaction,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      );
      if (
        /** @type {AbstractType<any>} */
        this.parent._item !== null && /** @type {AbstractType<any>} */
        this.parent._item.deleted || this.parentSub !== null && this.right !== null
      ) {
        this.delete(transaction);
      }
    } else {
      new GC(this.id, this.length).integrate(transaction, 0);
    }
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let n = this.right;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let n = this.left;
    while (n !== null && n.deleted) {
      n = n.left;
    }
    return n;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : createID(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(right) {
    if (this.constructor === right.constructor && compareIDs(right.origin, this.lastId) && this.right === right && compareIDs(this.rightOrigin, right.rightOrigin) && this.id.client === right.id.client && this.id.clock + this.length === right.id.clock && this.deleted === right.deleted && this.redone === null && right.redone === null && this.content.constructor === right.content.constructor && this.content.mergeWith(right.content)) {
      const searchMarker = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      if (searchMarker) {
        searchMarker.forEach((marker) => {
          if (marker.p === right) {
            marker.p = this;
            if (!this.deleted && this.countable) {
              marker.index -= this.length;
            }
          }
        });
      }
      if (right.keep) {
        this.keep = true;
      }
      this.right = right.right;
      if (this.right !== null) {
        this.right.left = this;
      }
      this.length += right.length;
      return true;
    }
    return false;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(transaction) {
    if (!this.deleted) {
      const parent = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (this.countable && this.parentSub === null) {
        parent._length -= this.length;
      }
      this.markDeleted();
      addToDeleteSet(transaction.deleteSet, this.id.client, this.id.clock, this.length);
      addChangedTypeToTransaction(transaction, parent, this.parentSub);
      this.content.delete(transaction);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(store, parentGCd) {
    if (!this.deleted) {
      throw unexpectedCase();
    }
    this.content.gc(store);
    if (parentGCd) {
      replaceStruct(store, this, new GC(this.id, this.length));
    } else {
      this.content = new ContentDeleted(this.length);
    }
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(encoder, offset) {
    const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
    const rightOrigin = this.rightOrigin;
    const parentSub = this.parentSub;
    const info = this.content.getRef() & BITS5 | (origin === null ? 0 : BIT8) | // origin is defined
    (rightOrigin === null ? 0 : BIT7) | // right origin is defined
    (parentSub === null ? 0 : BIT6);
    encoder.writeInfo(info);
    if (origin !== null) {
      encoder.writeLeftID(origin);
    }
    if (rightOrigin !== null) {
      encoder.writeRightID(rightOrigin);
    }
    if (origin === null && rightOrigin === null) {
      const parent = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (parent._item !== void 0) {
        const parentItem = parent._item;
        if (parentItem === null) {
          const ykey = findRootTypeKey(parent);
          encoder.writeParentInfo(true);
          encoder.writeString(ykey);
        } else {
          encoder.writeParentInfo(false);
          encoder.writeLeftID(parentItem.id);
        }
      } else if (parent.constructor === String) {
        encoder.writeParentInfo(true);
        encoder.writeString(parent);
      } else if (parent.constructor === ID) {
        encoder.writeParentInfo(false);
        encoder.writeLeftID(parent);
      } else {
        unexpectedCase();
      }
      if (parentSub !== null) {
        encoder.writeString(parentSub);
      }
    }
    this.content.write(encoder, offset);
  }
}
const readItemContent = (decoder, info) => contentRefs[info & BITS5](decoder);
const contentRefs = [
  () => {
    unexpectedCase();
  },
  // GC is not ItemContent
  readContentDeleted,
  // 1
  readContentJSON,
  // 2
  readContentBinary,
  // 3
  readContentString,
  // 4
  readContentEmbed,
  // 5
  readContentFormat,
  // 6
  readContentType,
  // 7
  readContentAny,
  // 8
  readContentDoc,
  // 9
  () => {
    unexpectedCase();
  }
  // 10 - Skip is not ItemContent
];
const structSkipRefNumber = 10;
class Skip extends AbstractStruct {
  get deleted() {
    return true;
  }
  delete() {
  }
  /**
   * @param {Skip} right
   * @return {boolean}
   */
  mergeWith(right) {
    if (this.constructor !== right.constructor) {
      return false;
    }
    this.length += right.length;
    return true;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(transaction, offset) {
    unexpectedCase();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(encoder, offset) {
    encoder.writeInfo(structSkipRefNumber);
    writeVarUint(encoder.restEncoder, this.length - offset);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(transaction, store) {
    return null;
  }
}
const glo = (
  /** @type {any} */
  typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {}
);
const importIdentifier = "__ $YJS$ __";
if (glo[importIdentifier] === true) {
  console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
}
glo[importIdentifier] = true;

// THIS FILE IS AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY
// See update-tlds.js for encoding/decoding format
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt
const encodedTlds = 'aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2';
// Internationalized domain names containing non-ASCII
const encodedUtlds = 'ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2';

/**
 * Finite State Machine generation utilities
 */

/**
 * @template T
 * @typedef {{ [group: string]: T[] }} Collections
 */

/**
 * @typedef {{ [group: string]: true }} Flags
 */

// Keys in scanner Collections instances
const numeric = 'numeric';
const ascii = 'ascii';
const alpha = 'alpha';
const asciinumeric = 'asciinumeric';
const alphanumeric = 'alphanumeric';
const domain = 'domain';
const emoji = 'emoji';
const scheme = 'scheme';
const slashscheme = 'slashscheme';
const whitespace = 'whitespace';

/**
 * @template T
 * @param {string} name
 * @param {Collections<T>} groups to register in
 * @returns {T[]} Current list of tokens in the given collection
 */
function registerGroup(name, groups) {
  if (!(name in groups)) {
    groups[name] = [];
  }
  return groups[name];
}

/**
 * @template T
 * @param {T} t token to add
 * @param {Collections<T>} groups
 * @param {Flags} flags
 */
function addToGroups(t, flags, groups) {
  if (flags[numeric]) {
    flags[asciinumeric] = true;
    flags[alphanumeric] = true;
  }
  if (flags[ascii]) {
    flags[asciinumeric] = true;
    flags[alpha] = true;
  }
  if (flags[asciinumeric]) {
    flags[alphanumeric] = true;
  }
  if (flags[alpha]) {
    flags[alphanumeric] = true;
  }
  if (flags[alphanumeric]) {
    flags[domain] = true;
  }
  if (flags[emoji]) {
    flags[domain] = true;
  }
  for (const k in flags) {
    const group = registerGroup(k, groups);
    if (group.indexOf(t) < 0) {
      group.push(t);
    }
  }
}

/**
 * @template T
 * @param {T} t token to check
 * @param {Collections<T>} groups
 * @returns {Flags} group flags that contain this token
 */
function flagsForToken(t, groups) {
  const result = {};
  for (const c in groups) {
    if (groups[c].indexOf(t) >= 0) {
      result[c] = true;
    }
  }
  return result;
}

/**
 * @template T
 * @typedef {null | T } Transition
 */

/**
 * Define a basic state machine state. j is the list of character transitions,
 * jr is the list of regex-match transitions, jd is the default state to
 * transition to t is the accepting token type, if any. If this is the terminal
 * state, then it does not emit a token.
 *
 * The template type T represents the type of the token this state accepts. This
 * should be a string (such as of the token exports in `text.js`) or a
 * MultiToken subclass (from `multi.js`)
 *
 * @template T
 * @param {T} [token] Token that this state emits
 */
function State(token = null) {
  // this.n = null; // DEBUG: State name
  /** @type {{ [input: string]: State<T> }} j */
  this.j = {}; // IMPLEMENTATION 1
  // this.j = []; // IMPLEMENTATION 2
  /** @type {[RegExp, State<T>][]} jr */
  this.jr = [];
  /** @type {?State<T>} jd */
  this.jd = null;
  /** @type {?T} t */
  this.t = token;
}

/**
 * Scanner token groups
 * @type Collections<string>
 */
State.groups = {};
State.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(input) {
    const state = this;
    const nextState = state.j[input];
    if (nextState) {
      return nextState;
    }
    for (let i = 0; i < state.jr.length; i++) {
      const regex = state.jr[i][0];
      const nextState = state.jr[i][1]; // note: might be empty to prevent default jump
      if (nextState && regex.test(input)) {
        return nextState;
      }
    }
    // Nowhere left to jump! Return default, if any
    return state.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(input, exactOnly = false) {
    return exactOnly ? input in this.j : !!this.go(input);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(inputs, next, flags, groups) {
    for (let i = 0; i < inputs.length; i++) {
      this.tt(inputs[i], next, flags, groups);
    }
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(regexp, next, flags, groups) {
    groups = groups || State.groups;
    let nextState;
    if (next && next.j) {
      nextState = next;
    } else {
      // Token with maybe token groups
      nextState = new State(next);
      if (flags && groups) {
        addToGroups(next, flags, groups);
      }
    }
    this.jr.push([regexp, nextState]);
    return nextState;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(input, next, flags, groups) {
    let state = this;
    const len = input.length;
    if (!len) {
      return state;
    }
    for (let i = 0; i < len - 1; i++) {
      state = state.tt(input[i]);
    }
    return state.tt(input[len - 1], next, flags, groups);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(input, next, flags, groups) {
    groups = groups || State.groups;
    const state = this;

    // Check if existing state given, just a basic transition
    if (next && next.j) {
      state.j[input] = next;
      return next;
    }
    const t = next;

    // Take the transition with the usual default mechanisms and use that as
    // a template for creating the next state
    let nextState,
      templateState = state.go(input);
    if (templateState) {
      nextState = new State();
      Object.assign(nextState.j, templateState.j);
      nextState.jr.push.apply(nextState.jr, templateState.jr);
      nextState.jd = templateState.jd;
      nextState.t = templateState.t;
    } else {
      nextState = new State();
    }
    if (t) {
      // Ensure newly token is in the same groups as the old token
      if (groups) {
        if (nextState.t && typeof nextState.t === 'string') {
          const allFlags = Object.assign(flagsForToken(nextState.t, groups), flags);
          addToGroups(t, allFlags, groups);
        } else if (flags) {
          addToGroups(t, flags, groups);
        }
      }
      nextState.t = t; // overwrite anything that was previously there
    }
    state.j[input] = nextState;
    return nextState;
  }
};

// Helper functions to improve minification (not exported outside linkifyjs module)

/**
 * @template T
 * @param {State<T>} state
 * @param {string | string[]} input
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const ta = (state, input, next, flags, groups) => state.ta(input, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {RegExp} regexp
 * @param {T | State<T>} [next]
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const tr = (state, regexp, next, flags, groups) => state.tr(regexp, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {string | string[]} input
 * @param {T | State<T>} [next]
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const ts = (state, input, next, flags, groups) => state.ts(input, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {string} input
 * @param {T | State<T>} [next]
 * @param {Collections<T>} [groups]
 * @param {Flags} [flags]
 */
const tt = (state, input, next, flags, groups) => state.tt(input, next, flags, groups);

/******************************************************************************
Text Tokens
Identifiers for token outputs from the regexp scanner
******************************************************************************/

// A valid web domain token
const WORD = 'WORD'; // only contains a-z
const UWORD = 'UWORD'; // contains letters other than a-z, used for IDN
const ASCIINUMERICAL = 'ASCIINUMERICAL'; // contains a-z, 0-9
const ALPHANUMERICAL = 'ALPHANUMERICAL'; // contains numbers and letters other than a-z, used for IDN

// Special case of word
const LOCALHOST = 'LOCALHOST';

// Valid top-level domain, special case of WORD (see tlds.js)
const TLD = 'TLD';

// Valid IDN TLD, special case of UWORD (see tlds.js)
const UTLD = 'UTLD';

// The scheme portion of a web URI protocol. Supported types include: `mailto`,
// `file`, and user-defined custom protocols. Limited to schemes that contain
// only letters
const SCHEME = 'SCHEME';

// Similar to SCHEME, except makes distinction for schemes that must always be
// followed by `://`, not just `:`. Supported types include `http`, `https`,
// `ftp`, `ftps`
const SLASH_SCHEME = 'SLASH_SCHEME';

// Any sequence of digits 0-9
const NUM = 'NUM';

// Any number of consecutive whitespace characters that are not newline
const WS = 'WS';

// New line (unix style)
const NL = 'NL'; // \n

// Opening/closing bracket classes
// TODO: Rename OPEN -> LEFT and CLOSE -> RIGHT in v5 to fit with Unicode names
// Also rename angle brackes to LESSTHAN and GREATER THAN
const OPENBRACE = 'OPENBRACE'; // {
const CLOSEBRACE = 'CLOSEBRACE'; // }
const OPENBRACKET = 'OPENBRACKET'; // [
const CLOSEBRACKET = 'CLOSEBRACKET'; // ]
const OPENPAREN = 'OPENPAREN'; // (
const CLOSEPAREN = 'CLOSEPAREN'; // )
const OPENANGLEBRACKET = 'OPENANGLEBRACKET'; // <
const CLOSEANGLEBRACKET = 'CLOSEANGLEBRACKET'; // >
const FULLWIDTHLEFTPAREN = 'FULLWIDTHLEFTPAREN'; // （
const FULLWIDTHRIGHTPAREN = 'FULLWIDTHRIGHTPAREN'; // ）
const LEFTCORNERBRACKET = 'LEFTCORNERBRACKET'; // 「
const RIGHTCORNERBRACKET = 'RIGHTCORNERBRACKET'; // 」
const LEFTWHITECORNERBRACKET = 'LEFTWHITECORNERBRACKET'; // 『
const RIGHTWHITECORNERBRACKET = 'RIGHTWHITECORNERBRACKET'; // 』
const FULLWIDTHLESSTHAN = 'FULLWIDTHLESSTHAN'; // ＜
const FULLWIDTHGREATERTHAN = 'FULLWIDTHGREATERTHAN'; // ＞

// Various symbols
const AMPERSAND = 'AMPERSAND'; // &
const APOSTROPHE = 'APOSTROPHE'; // '
const ASTERISK = 'ASTERISK'; // *
const AT = 'AT'; // @
const BACKSLASH = 'BACKSLASH'; // \
const BACKTICK = 'BACKTICK'; // `
const CARET = 'CARET'; // ^
const COLON = 'COLON'; // :
const COMMA = 'COMMA'; // ,
const DOLLAR = 'DOLLAR'; // $
const DOT = 'DOT'; // .
const EQUALS = 'EQUALS'; // =
const EXCLAMATION = 'EXCLAMATION'; // !
const HYPHEN = 'HYPHEN'; // -
const PERCENT = 'PERCENT'; // %
const PIPE = 'PIPE'; // |
const PLUS = 'PLUS'; // +
const POUND = 'POUND'; // #
const QUERY = 'QUERY'; // ?
const QUOTE = 'QUOTE'; // "
const FULLWIDTHMIDDLEDOT = 'FULLWIDTHMIDDLEDOT'; // ・

const SEMI = 'SEMI'; // ;
const SLASH = 'SLASH'; // /
const TILDE = 'TILDE'; // ~
const UNDERSCORE = 'UNDERSCORE'; // _

// Emoji symbol
const EMOJI$1 = 'EMOJI';

// Default token - anything that is not one of the above
const SYM = 'SYM';

var tk = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: ALPHANUMERICAL,
	AMPERSAND: AMPERSAND,
	APOSTROPHE: APOSTROPHE,
	ASCIINUMERICAL: ASCIINUMERICAL,
	ASTERISK: ASTERISK,
	AT: AT,
	BACKSLASH: BACKSLASH,
	BACKTICK: BACKTICK,
	CARET: CARET,
	CLOSEANGLEBRACKET: CLOSEANGLEBRACKET,
	CLOSEBRACE: CLOSEBRACE,
	CLOSEBRACKET: CLOSEBRACKET,
	CLOSEPAREN: CLOSEPAREN,
	COLON: COLON,
	COMMA: COMMA,
	DOLLAR: DOLLAR,
	DOT: DOT,
	EMOJI: EMOJI$1,
	EQUALS: EQUALS,
	EXCLAMATION: EXCLAMATION,
	FULLWIDTHGREATERTHAN: FULLWIDTHGREATERTHAN,
	FULLWIDTHLEFTPAREN: FULLWIDTHLEFTPAREN,
	FULLWIDTHLESSTHAN: FULLWIDTHLESSTHAN,
	FULLWIDTHMIDDLEDOT: FULLWIDTHMIDDLEDOT,
	FULLWIDTHRIGHTPAREN: FULLWIDTHRIGHTPAREN,
	HYPHEN: HYPHEN,
	LEFTCORNERBRACKET: LEFTCORNERBRACKET,
	LEFTWHITECORNERBRACKET: LEFTWHITECORNERBRACKET,
	LOCALHOST: LOCALHOST,
	NL: NL,
	NUM: NUM,
	OPENANGLEBRACKET: OPENANGLEBRACKET,
	OPENBRACE: OPENBRACE,
	OPENBRACKET: OPENBRACKET,
	OPENPAREN: OPENPAREN,
	PERCENT: PERCENT,
	PIPE: PIPE,
	PLUS: PLUS,
	POUND: POUND,
	QUERY: QUERY,
	QUOTE: QUOTE,
	RIGHTCORNERBRACKET: RIGHTCORNERBRACKET,
	RIGHTWHITECORNERBRACKET: RIGHTWHITECORNERBRACKET,
	SCHEME: SCHEME,
	SEMI: SEMI,
	SLASH: SLASH,
	SLASH_SCHEME: SLASH_SCHEME,
	SYM: SYM,
	TILDE: TILDE,
	TLD: TLD,
	UNDERSCORE: UNDERSCORE,
	UTLD: UTLD,
	UWORD: UWORD,
	WORD: WORD,
	WS: WS
});

// Note that these two Unicode ones expand into a really big one with Babel
const ASCII_LETTER = /[a-z]/;
const LETTER = /\p{L}/u; // Any Unicode character with letter data type
const EMOJI = /\p{Emoji}/u; // Any Unicode emoji character
const DIGIT = /\d/;
const SPACE = /\s/;

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.
*/

const CR = '\r'; // carriage-return character
const LF = '\n'; // line-feed character
const EMOJI_VARIATION = '\ufe0f'; // Variation selector, follows heart and others
const EMOJI_JOINER = '\u200d'; // zero-width joiner
const OBJECT_REPLACEMENT = '\ufffc'; // whitespace placeholder that sometimes appears in rich text editors

let tlds = null,
  utlds = null; // don't change so only have to be computed once

/**
 * Scanner output token:
 * - `t` is the token name (e.g., 'NUM', 'EMOJI', 'TLD')
 * - `v` is the value of the token (e.g., '123', '❤️', 'com')
 * - `s` is the start index of the token in the original string
 * - `e` is the end index of the token in the original string
 * @typedef {{t: string, v: string, s: number, e: number}} Token
 */

/**
 * @template T
 * @typedef {{ [collection: string]: T[] }} Collections
 */

/**
 * Initialize the scanner character-based state machine for the given start
 * state
 * @param {[string, boolean][]} customSchemes List of custom schemes, where each
 * item is a length-2 tuple with the first element set to the string scheme, and
 * the second element set to `true` if the `://` after the scheme is optional
 */
function init$2(customSchemes = []) {
  // Frequently used states (name argument removed during minification)
  /** @type Collections<string> */
  const groups = {}; // of tokens
  State.groups = groups;
  /** @type State<string> */
  const Start = new State();
  if (tlds == null) {
    tlds = decodeTlds(encodedTlds);
  }
  if (utlds == null) {
    utlds = decodeTlds(encodedUtlds);
  }

  // States for special URL symbols that accept immediately after start
  tt(Start, "'", APOSTROPHE);
  tt(Start, '{', OPENBRACE);
  tt(Start, '}', CLOSEBRACE);
  tt(Start, '[', OPENBRACKET);
  tt(Start, ']', CLOSEBRACKET);
  tt(Start, '(', OPENPAREN);
  tt(Start, ')', CLOSEPAREN);
  tt(Start, '<', OPENANGLEBRACKET);
  tt(Start, '>', CLOSEANGLEBRACKET);
  tt(Start, '（', FULLWIDTHLEFTPAREN);
  tt(Start, '）', FULLWIDTHRIGHTPAREN);
  tt(Start, '「', LEFTCORNERBRACKET);
  tt(Start, '」', RIGHTCORNERBRACKET);
  tt(Start, '『', LEFTWHITECORNERBRACKET);
  tt(Start, '』', RIGHTWHITECORNERBRACKET);
  tt(Start, '＜', FULLWIDTHLESSTHAN);
  tt(Start, '＞', FULLWIDTHGREATERTHAN);
  tt(Start, '&', AMPERSAND);
  tt(Start, '*', ASTERISK);
  tt(Start, '@', AT);
  tt(Start, '`', BACKTICK);
  tt(Start, '^', CARET);
  tt(Start, ':', COLON);
  tt(Start, ',', COMMA);
  tt(Start, '$', DOLLAR);
  tt(Start, '.', DOT);
  tt(Start, '=', EQUALS);
  tt(Start, '!', EXCLAMATION);
  tt(Start, '-', HYPHEN);
  tt(Start, '%', PERCENT);
  tt(Start, '|', PIPE);
  tt(Start, '+', PLUS);
  tt(Start, '#', POUND);
  tt(Start, '?', QUERY);
  tt(Start, '"', QUOTE);
  tt(Start, '/', SLASH);
  tt(Start, ';', SEMI);
  tt(Start, '~', TILDE);
  tt(Start, '_', UNDERSCORE);
  tt(Start, '\\', BACKSLASH);
  tt(Start, '・', FULLWIDTHMIDDLEDOT);
  const Num = tr(Start, DIGIT, NUM, {
    [numeric]: true
  });
  tr(Num, DIGIT, Num);
  const Asciinumeric = tr(Num, ASCII_LETTER, ASCIINUMERICAL, {
    [asciinumeric]: true
  });
  const Alphanumeric = tr(Num, LETTER, ALPHANUMERICAL, {
    [alphanumeric]: true
  });

  // State which emits a word token
  const Word = tr(Start, ASCII_LETTER, WORD, {
    [ascii]: true
  });
  tr(Word, DIGIT, Asciinumeric);
  tr(Word, ASCII_LETTER, Word);
  tr(Asciinumeric, DIGIT, Asciinumeric);
  tr(Asciinumeric, ASCII_LETTER, Asciinumeric);

  // Same as previous, but specific to non-fsm.ascii alphabet words
  const UWord = tr(Start, LETTER, UWORD, {
    [alpha]: true
  });
  tr(UWord, ASCII_LETTER); // Non-accepting
  tr(UWord, DIGIT, Alphanumeric);
  tr(UWord, LETTER, UWord);
  tr(Alphanumeric, DIGIT, Alphanumeric);
  tr(Alphanumeric, ASCII_LETTER); // Non-accepting
  tr(Alphanumeric, LETTER, Alphanumeric); // Non-accepting

  // Whitespace jumps
  // Tokens of only non-newline whitespace are arbitrarily long
  // If any whitespace except newline, more whitespace!
  const Nl = tt(Start, LF, NL, {
    [whitespace]: true
  });
  const Cr = tt(Start, CR, WS, {
    [whitespace]: true
  });
  const Ws = tr(Start, SPACE, WS, {
    [whitespace]: true
  });
  tt(Start, OBJECT_REPLACEMENT, Ws);
  tt(Cr, LF, Nl); // \r\n
  tt(Cr, OBJECT_REPLACEMENT, Ws);
  tr(Cr, SPACE, Ws);
  tt(Ws, CR); // non-accepting state to avoid mixing whitespaces
  tt(Ws, LF); // non-accepting state to avoid mixing whitespaces
  tr(Ws, SPACE, Ws);
  tt(Ws, OBJECT_REPLACEMENT, Ws);

  // Emoji tokens. They are not grouped by the scanner except in cases where a
  // zero-width joiner is present
  const Emoji = tr(Start, EMOJI, EMOJI$1, {
    [emoji]: true
  });
  tt(Emoji, '#'); // no transition, emoji regex seems to match #
  tr(Emoji, EMOJI, Emoji);
  tt(Emoji, EMOJI_VARIATION, Emoji);
  // tt(Start, EMOJI_VARIATION, Emoji); // This one is sketchy

  const EmojiJoiner = tt(Emoji, EMOJI_JOINER);
  tt(EmojiJoiner, '#');
  tr(EmojiJoiner, EMOJI, Emoji);
  // tt(EmojiJoiner, EMOJI_VARIATION, Emoji); // also sketchy

  // Generates states for top-level domains
  // Note that this is most accurate when tlds are in alphabetical order
  const wordjr = [[ASCII_LETTER, Word], [DIGIT, Asciinumeric]];
  const uwordjr = [[ASCII_LETTER, null], [LETTER, UWord], [DIGIT, Alphanumeric]];
  for (let i = 0; i < tlds.length; i++) {
    fastts(Start, tlds[i], TLD, WORD, wordjr);
  }
  for (let i = 0; i < utlds.length; i++) {
    fastts(Start, utlds[i], UTLD, UWORD, uwordjr);
  }
  addToGroups(TLD, {
    tld: true,
    ascii: true
  }, groups);
  addToGroups(UTLD, {
    utld: true,
    alpha: true
  }, groups);

  // Collect the states generated by different protocols. NOTE: If any new TLDs
  // get added that are also protocols, set the token to be the same as the
  // protocol to ensure parsing works as expected.
  fastts(Start, 'file', SCHEME, WORD, wordjr);
  fastts(Start, 'mailto', SCHEME, WORD, wordjr);
  fastts(Start, 'http', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'https', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'ftp', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'ftps', SLASH_SCHEME, WORD, wordjr);
  addToGroups(SCHEME, {
    scheme: true,
    ascii: true
  }, groups);
  addToGroups(SLASH_SCHEME, {
    slashscheme: true,
    ascii: true
  }, groups);

  // Register custom schemes. Assumes each scheme is asciinumeric with hyphens
  customSchemes = customSchemes.sort((a, b) => a[0] > b[0] ? 1 : -1);
  for (let i = 0; i < customSchemes.length; i++) {
    const sch = customSchemes[i][0];
    const optionalSlashSlash = customSchemes[i][1];
    const flags = optionalSlashSlash ? {
      [scheme]: true
    } : {
      [slashscheme]: true
    };
    if (sch.indexOf('-') >= 0) {
      flags[domain] = true;
    } else if (!ASCII_LETTER.test(sch)) {
      flags[numeric] = true; // numbers only
    } else if (DIGIT.test(sch)) {
      flags[asciinumeric] = true;
    } else {
      flags[ascii] = true;
    }
    ts(Start, sch, sch, flags);
  }

  // Localhost token
  ts(Start, 'localhost', LOCALHOST, {
    ascii: true
  });

  // Set default transition for start state (some symbol)
  Start.jd = new State(SYM);
  return {
    start: Start,
    tokens: Object.assign({
      groups
    }, tk)
  };
}

/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {State<string>} start scanner starting state
	@param {string} str input string to scan
	@return {Token[]} list of tokens, each with a type and value
*/
function run$1(start, str) {
  // State machine is not case sensitive, so input is tokenized in lowercased
  // form (still returns regular case). Uses selective `toLowerCase` because
  // lowercasing the entire string causes the length and character position to
  // vary in some non-English strings with V8-based runtimes.
  const iterable = stringToArray(str.replace(/[A-Z]/g, c => c.toLowerCase()));
  const charCount = iterable.length; // <= len if there are emojis, etc
  const tokens = []; // return value

  // cursor through the string itself, accounting for characters that have
  // width with length 2 such as emojis
  let cursor = 0;

  // Cursor through the array-representation of the string
  let charCursor = 0;

  // Tokenize the string
  while (charCursor < charCount) {
    let state = start;
    let nextState = null;
    let tokenLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    let charsSinceAccepts = -1;
    while (charCursor < charCount && (nextState = state.go(iterable[charCursor]))) {
      state = nextState;

      // Keep track of the latest accepting state
      if (state.accepts()) {
        sinceAccepts = 0;
        charsSinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts += iterable[charCursor].length;
        charsSinceAccepts++;
      }
      tokenLength += iterable[charCursor].length;
      cursor += iterable[charCursor].length;
      charCursor++;
    }

    // Roll back to the latest accepting state
    cursor -= sinceAccepts;
    charCursor -= charsSinceAccepts;
    tokenLength -= sinceAccepts;

    // No more jumps, just make a new token from the last accepting one
    tokens.push({
      t: latestAccepting.t,
      // token type/name
      v: str.slice(cursor - tokenLength, cursor),
      // string value
      s: cursor - tokenLength,
      // start index
      e: cursor // end index (excluding)
    });
  }
  return tokens;
}

/**
 * Convert a String to an Array of characters, taking into account that some
 * characters like emojis take up two string indexes.
 *
 * Adapted from core-js (MIT license)
 * https://github.com/zloirock/core-js/blob/2d69cf5f99ab3ea3463c395df81e5a15b68f49d9/packages/core-js/internals/string-multibyte.js
 *
 * @function stringToArray
 * @param {string} str
 * @returns {string[]}
 */
function stringToArray(str) {
  const result = [];
  const len = str.length;
  let index = 0;
  while (index < len) {
    let first = str.charCodeAt(index);
    let second;
    let char = first < 0xd800 || first > 0xdbff || index + 1 === len || (second = str.charCodeAt(index + 1)) < 0xdc00 || second > 0xdfff ? str[index] // single character
    : str.slice(index, index + 2); // two-index characters
    result.push(char);
    index += char.length;
  }
  return result;
}

/**
 * Fast version of ts function for when transition defaults are well known
 * @param {State<string>} state
 * @param {string} input
 * @param {string} t
 * @param {string} defaultt
 * @param {[RegExp, State<string>][]} jr
 * @returns {State<string>}
 */
function fastts(state, input, t, defaultt, jr) {
  let next;
  const len = input.length;
  for (let i = 0; i < len - 1; i++) {
    const char = input[i];
    if (state.j[char]) {
      next = state.j[char];
    } else {
      next = new State(defaultt);
      next.jr = jr.slice();
      state.j[char] = next;
    }
    state = next;
  }
  next = new State(t);
  next.jr = jr.slice();
  state.j[input[len - 1]] = next;
  return next;
}

/**
 * Converts a string of Top-Level Domain names encoded in update-tlds.js back
 * into a list of strings.
 * @param {str} encoded encoded TLDs string
 * @returns {str[]} original TLDs list
 */
function decodeTlds(encoded) {
  const words = [];
  const stack = [];
  let i = 0;
  let digits = '0123456789';
  while (i < encoded.length) {
    let popDigitCount = 0;
    while (digits.indexOf(encoded[i + popDigitCount]) >= 0) {
      popDigitCount++; // encountered some digits, have to pop to go one level up trie
    }
    if (popDigitCount > 0) {
      words.push(stack.join('')); // whatever preceded the pop digits must be a word
      for (let popCount = parseInt(encoded.substring(i, i + popDigitCount), 10); popCount > 0; popCount--) {
        stack.pop();
      }
      i += popDigitCount;
    } else {
      stack.push(encoded[i]); // drop down a level into the trie
      i++;
    }
  }
  return words;
}

/**
 * An object where each key is a valid DOM Event Name such as `click` or `focus`
 * and each value is an event handler function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element#events
 * @typedef {?{ [event: string]: Function }} EventListeners
 */

/**
 * All formatted properties required to render a link, including `tagName`,
 * `attributes`, `content` and `eventListeners`.
 * @typedef {{ tagName: any, attributes: {[attr: string]: any}, content: string,
 * eventListeners: EventListeners }} IntermediateRepresentation
 */

/**
 * Specify either an object described by the template type `O` or a function.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `O`
 * @template O
 * @typedef {O | ((value: string, type: string, token: MultiToken) => O)} OptObj
 */

/**
 * Specify either a function described by template type `F` or an object.
 *
 * Each key in the object should be a link type (`'url'`, `'hashtag`', etc.). Each
 * value should be a function with template type `F` that is called when the
 * corresponding link type is encountered.
 * @template F
 * @typedef {F | { [type: string]: F}} OptFn
 */

/**
 * Specify either a value with template type `V`, a function that returns `V` or
 * an object where each value resolves to `V`.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `V`
 *
 * For the object, each key should be a link type (`'url'`, `'hashtag`', etc.).
 * Each value should either have type `V` or a function that returns V. This
 * function similarly takes a string value and a token.
 *
 * Example valid types for `Opt<string>`:
 *
 * ```js
 * 'hello'
 * (value, type, token) => 'world'
 * { url: 'hello', email: (value, token) => 'world'}
 * ```
 * @template V
 * @typedef {V | ((value: string, type: string, token: MultiToken) => V) | { [type: string]: V | ((value: string, token: MultiToken) => V) }} Opt
 */

/**
 * See available options: https://linkify.js.org/docs/options.html
 * @typedef {{
 * 	defaultProtocol?: string,
 *  events?: OptObj<EventListeners>,
 * 	format?: Opt<string>,
 * 	formatHref?: Opt<string>,
 * 	nl2br?: boolean,
 * 	tagName?: Opt<any>,
 * 	target?: Opt<string>,
 * 	rel?: Opt<string>,
 * 	validate?: Opt<boolean>,
 * 	truncate?: Opt<number>,
 * 	className?: Opt<string>,
 * 	attributes?: OptObj<({ [attr: string]: any })>,
 *  ignoreTags?: string[],
 * 	render?: OptFn<((ir: IntermediateRepresentation) => any)>
 * }} Opts
 */

/**
 * @type Required<Opts>
 */
const defaults = {
  defaultProtocol: 'http',
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: 'a',
  target: null,
  rel: null,
  validate: true,
  truncate: Infinity,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};

/**
 * Utility class for linkify interfaces to apply specified
 * {@link Opts formatting and rendering options}.
 *
 * @param {Opts | Options} [opts] Option value overrides.
 * @param {(ir: IntermediateRepresentation) => any} [defaultRender] (For
 *   internal use) default render function that determines how to generate an
 *   HTML element based on a link token's derived tagName, attributes and HTML.
 *   Similar to render option
 */
function Options(opts, defaultRender = null) {
  let o = Object.assign({}, defaults);
  if (opts) {
    o = Object.assign(o, opts instanceof Options ? opts.o : opts);
  }

  // Ensure all ignored tags are uppercase
  const ignoredTags = o.ignoreTags;
  const uppercaseIgnoredTags = [];
  for (let i = 0; i < ignoredTags.length; i++) {
    uppercaseIgnoredTags.push(ignoredTags[i].toUpperCase());
  }
  /** @protected */
  this.o = o;
  if (defaultRender) {
    this.defaultRender = defaultRender;
  }
  this.ignoreTags = uppercaseIgnoredTags;
}
Options.prototype = {
  o: defaults,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(ir) {
    return ir;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(token) {
    return this.get('validate', token.toString(), token);
  },
  // Private methods

  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(key, operator, token) {
    const isCallable = operator != null;
    let option = this.o[key];
    if (!option) {
      return option;
    }
    if (typeof option === 'object') {
      option = token.t in option ? option[token.t] : defaults[key];
      if (typeof option === 'function' && isCallable) {
        option = option(operator, token);
      }
    } else if (typeof option === 'function' && isCallable) {
      option = option(operator, token.t, token);
    }
    return option;
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(key, operator, token) {
    let obj = this.o[key];
    if (typeof obj === 'function' && operator != null) {
      obj = obj(operator, token.t, token);
    }
    return obj;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(token) {
    const ir = token.render(this); // intermediate representation
    const renderFn = this.get('render', null, token) || this.defaultRender;
    return renderFn(ir, token.t, token);
  }
};
function noop(val) {
  return val;
}

/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/

/**
 * @param {string} value
 * @param {Token[]} tokens
 */
function MultiToken(value, tokens) {
  this.t = 'token';
  this.v = value;
  this.tk = tokens;
}

/**
 * Abstract class used for manufacturing tokens of text tokens. That is rather
 * than the value for a token being a small string of text, it's value an array
 * of text tokens.
 *
 * Used for grouping together URLs, emails, hashtags, and other potential
 * creations.
 * @class MultiToken
 * @property {string} t
 * @property {string} v
 * @property {Token[]} tk
 * @abstract
 */
MultiToken.prototype = {
  isLink: false,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(scheme) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(options) {
    const val = this.toString();
    const truncate = options.get('truncate', val, this);
    const formatted = options.get('format', val, this);
    return truncate && formatted.length > truncate ? formatted.substring(0, truncate) + '…' : formatted;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(options) {
    return options.get('formatHref', this.toHref(options.get('defaultProtocol')), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(protocol = defaults.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(protocol),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(options) {
    return {
      type: this.t,
      value: this.toFormattedString(options),
      isLink: this.isLink,
      href: this.toFormattedHref(options),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(options) {
    return options.get('validate', this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(options) {
    const token = this;
    const href = this.toHref(options.get('defaultProtocol'));
    const formattedHref = options.get('formatHref', href, this);
    const tagName = options.get('tagName', href, token);
    const content = this.toFormattedString(options);
    const attributes = {};
    const className = options.get('className', href, token);
    const target = options.get('target', href, token);
    const rel = options.get('rel', href, token);
    const attrs = options.getObj('attributes', href, token);
    const eventListeners = options.getObj('events', href, token);
    attributes.href = formattedHref;
    if (className) {
      attributes.class = className;
    }
    if (target) {
      attributes.target = target;
    }
    if (rel) {
      attributes.rel = rel;
    }
    if (attrs) {
      Object.assign(attributes, attrs);
    }
    return {
      tagName,
      attributes,
      content,
      eventListeners
    };
  }
};

/**
 * Create a new token that can be emitted by the parser state machine
 * @param {string} type readable type of the token
 * @param {object} props properties to assign or override, including isLink = true or false
 * @returns {new (value: string, tokens: Token[]) => MultiToken} new token class
 */
function createTokenClass(type, props) {
  class Token extends MultiToken {
    constructor(value, tokens) {
      super(value, tokens);
      this.t = type;
    }
  }
  for (const p in props) {
    Token.prototype[p] = props[p];
  }
  Token.t = type;
  return Token;
}

/**
	Represents a list of tokens making up a valid email address
*/
const Email = createTokenClass('email', {
  isLink: true,
  toHref() {
    return 'mailto:' + this.toString();
  }
});

/**
	Represents some plain text
*/
const Text = createTokenClass('text');

/**
	Multi-linebreak token - represents a line break
	@class Nl
*/
const Nl = createTokenClass('nl');

/**
	Represents a list of text tokens making up a valid URL
	@class Url
*/
const Url = createTokenClass('url', {
  isLink: true,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(scheme = defaults.defaultProtocol) {
    // Check if already has a prefix scheme
    return this.hasProtocol() ? this.v : `${scheme}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const tokens = this.tk;
    return tokens.length >= 2 && tokens[0].t !== LOCALHOST && tokens[1].t === COLON;
  }
});

/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/EmailAddress (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main run
*/

const makeState = arg => new State(arg);

/**
 * Generate the parser multi token-based state machine
 * @param {{ groups: Collections<string> }} tokens
 */
function init$1({
  groups
}) {
  // Types of characters the URL can definitely end in
  const qsAccepting = groups.domain.concat([AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, NUM, PERCENT, PIPE, PLUS, POUND, SLASH, SYM, TILDE, UNDERSCORE]);

  // Types of tokens that can follow a URL and be part of the query string
  // but cannot be the very last characters
  // Characters that cannot appear in the URL at all should be excluded
  const qsNonAccepting = [APOSTROPHE, COLON, COMMA, DOT, EXCLAMATION, PERCENT, QUERY, QUOTE, SEMI, OPENANGLEBRACKET, CLOSEANGLEBRACKET, OPENBRACE, CLOSEBRACE, CLOSEBRACKET, OPENBRACKET, OPENPAREN, CLOSEPAREN, FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN, LEFTCORNERBRACKET, RIGHTCORNERBRACKET, LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET, FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN];

  // For addresses without the mailto prefix
  // Tokens allowed in the localpart of the email
  const localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, OPENBRACE, CLOSEBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, UNDERSCORE];

  // The universal starting state.
  /**
   * @type State<Token>
   */
  const Start = makeState();
  const Localpart = tt(Start, TILDE); // Local part of the email address
  ta(Localpart, localpartAccepting, Localpart);
  ta(Localpart, groups.domain, Localpart);
  const Domain = makeState(),
    Scheme = makeState(),
    SlashScheme = makeState();
  ta(Start, groups.domain, Domain); // parsed string ends with a potential domain name (A)
  ta(Start, groups.scheme, Scheme); // e.g., 'mailto'
  ta(Start, groups.slashscheme, SlashScheme); // e.g., 'http'

  ta(Domain, localpartAccepting, Localpart);
  ta(Domain, groups.domain, Domain);
  const LocalpartAt = tt(Domain, AT); // Local part of the email address plus @

  tt(Localpart, AT, LocalpartAt); // close to an email address now

  // Local part of an email address can be e.g. 'http' or 'mailto'
  tt(Scheme, AT, LocalpartAt);
  tt(SlashScheme, AT, LocalpartAt);
  const LocalpartDot = tt(Localpart, DOT); // Local part of the email address plus '.' (localpart cannot end in .)
  ta(LocalpartDot, localpartAccepting, Localpart);
  ta(LocalpartDot, groups.domain, Localpart);
  const EmailDomain = makeState();
  ta(LocalpartAt, groups.domain, EmailDomain); // parsed string starts with local email info + @ with a potential domain name
  ta(EmailDomain, groups.domain, EmailDomain);
  const EmailDomainDot = tt(EmailDomain, DOT); // domain followed by DOT
  ta(EmailDomainDot, groups.domain, EmailDomain);
  const Email$1 = makeState(Email); // Possible email address (could have more tlds)
  ta(EmailDomainDot, groups.tld, Email$1);
  ta(EmailDomainDot, groups.utld, Email$1);
  tt(LocalpartAt, LOCALHOST, Email$1);

  // Hyphen can jump back to a domain name
  const EmailDomainHyphen = tt(EmailDomain, HYPHEN); // parsed string starts with local email info + @ with a potential domain name
  tt(EmailDomainHyphen, HYPHEN, EmailDomainHyphen);
  ta(EmailDomainHyphen, groups.domain, EmailDomain);
  ta(Email$1, groups.domain, EmailDomain);
  tt(Email$1, DOT, EmailDomainDot);
  tt(Email$1, HYPHEN, EmailDomainHyphen);

  // Final possible email states
  const EmailColon = tt(Email$1, COLON); // URL followed by colon (potential port number here)
  /*const EmailColonPort = */
  ta(EmailColon, groups.numeric, Email); // URL followed by colon and port number

  // Account for dots and hyphens. Hyphens are usually parts of domain names
  // (but not TLDs)
  const DomainHyphen = tt(Domain, HYPHEN); // domain followed by hyphen
  const DomainDot = tt(Domain, DOT); // domain followed by DOT
  tt(DomainHyphen, HYPHEN, DomainHyphen);
  ta(DomainHyphen, groups.domain, Domain);
  ta(DomainDot, localpartAccepting, Localpart);
  ta(DomainDot, groups.domain, Domain);
  const DomainDotTld = makeState(Url); // Simplest possible URL with no query string
  ta(DomainDot, groups.tld, DomainDotTld);
  ta(DomainDot, groups.utld, DomainDotTld);
  ta(DomainDotTld, groups.domain, Domain);
  ta(DomainDotTld, localpartAccepting, Localpart);
  tt(DomainDotTld, DOT, DomainDot);
  tt(DomainDotTld, HYPHEN, DomainHyphen);
  tt(DomainDotTld, AT, LocalpartAt);
  const DomainDotTldColon = tt(DomainDotTld, COLON); // URL followed by colon (potential port number here)
  const DomainDotTldColonPort = makeState(Url); // TLD followed by a port number
  ta(DomainDotTldColon, groups.numeric, DomainDotTldColonPort);

  // Long URL with optional port and maybe query string
  const Url$1 = makeState(Url);

  // URL with extra symbols at the end, followed by an opening bracket
  const UrlNonaccept = makeState(); // URL followed by some symbols (will not be part of the final URL)

  // Query strings
  ta(Url$1, qsAccepting, Url$1);
  ta(Url$1, qsNonAccepting, UrlNonaccept);
  ta(UrlNonaccept, qsAccepting, Url$1);
  ta(UrlNonaccept, qsNonAccepting, UrlNonaccept);

  // Become real URLs after `SLASH` or `COLON NUM SLASH`
  // Here works with or without scheme:// prefix
  tt(DomainDotTld, SLASH, Url$1);
  tt(DomainDotTldColonPort, SLASH, Url$1);

  // Note that domains that begin with schemes are treated slighly differently
  const SchemeColon = tt(Scheme, COLON); // e.g., 'mailto:'
  const SlashSchemeColon = tt(SlashScheme, COLON); // e.g., 'http:'
  const SlashSchemeColonSlash = tt(SlashSchemeColon, SLASH); // e.g., 'http:/'

  const UriPrefix = tt(SlashSchemeColonSlash, SLASH); // e.g., 'http://'

  // Scheme states can transition to domain states
  ta(Scheme, groups.domain, Domain);
  tt(Scheme, DOT, DomainDot);
  tt(Scheme, HYPHEN, DomainHyphen);
  ta(SlashScheme, groups.domain, Domain);
  tt(SlashScheme, DOT, DomainDot);
  tt(SlashScheme, HYPHEN, DomainHyphen);

  // Force URL with scheme prefix followed by anything sane
  ta(SchemeColon, groups.domain, Url$1);
  tt(SchemeColon, SLASH, Url$1);
  tt(SchemeColon, QUERY, Url$1);
  ta(UriPrefix, groups.domain, Url$1);
  ta(UriPrefix, qsAccepting, Url$1);
  tt(UriPrefix, SLASH, Url$1);
  const bracketPairs = [[OPENBRACE, CLOSEBRACE],
  // {}
  [OPENBRACKET, CLOSEBRACKET],
  // []
  [OPENPAREN, CLOSEPAREN],
  // ()
  [OPENANGLEBRACKET, CLOSEANGLEBRACKET],
  // <>
  [FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN],
  // （）
  [LEFTCORNERBRACKET, RIGHTCORNERBRACKET],
  // 「」
  [LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET],
  // 『』
  [FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN] // ＜＞
  ];
  for (let i = 0; i < bracketPairs.length; i++) {
    const [OPEN, CLOSE] = bracketPairs[i];
    const UrlOpen = tt(Url$1, OPEN); // URL followed by open bracket

    // Continue not accepting for open brackets
    tt(UrlNonaccept, OPEN, UrlOpen);

    // Closing bracket component. This character WILL be included in the URL
    tt(UrlOpen, CLOSE, Url$1);

    // URL that beings with an opening bracket, followed by a symbols.
    // Note that the final state can still be `UrlOpen` (if the URL has a
    // single opening bracket for some reason).
    const UrlOpenQ = makeState(Url);
    ta(UrlOpen, qsAccepting, UrlOpenQ);
    const UrlOpenSyms = makeState(); // UrlOpen followed by some symbols it cannot end it
    ta(UrlOpen, qsNonAccepting);

    // URL that begins with an opening bracket, followed by some symbols
    ta(UrlOpenQ, qsAccepting, UrlOpenQ);
    ta(UrlOpenQ, qsNonAccepting, UrlOpenSyms);
    ta(UrlOpenSyms, qsAccepting, UrlOpenQ);
    ta(UrlOpenSyms, qsNonAccepting, UrlOpenSyms);

    // Close brace/bracket to become regular URL
    tt(UrlOpenQ, CLOSE, Url$1);
    tt(UrlOpenSyms, CLOSE, Url$1);
  }
  tt(Start, LOCALHOST, DomainDotTld); // localhost is a valid URL state
  tt(Start, NL, Nl); // single new line

  return {
    start: Start,
    tokens: tk
  };
}

/**
 * Run the parser state machine on a list of scanned string-based tokens to
 * create a list of multi tokens, each of which represents a URL, email address,
 * plain text, etc.
 *
 * @param {State<MultiToken>} start parser start state
 * @param {string} input the original input used to generate the given tokens
 * @param {Token[]} tokens list of scanned tokens
 * @returns {MultiToken[]}
 */
function run(start, input, tokens) {
  let len = tokens.length;
  let cursor = 0;
  let multis = [];
  let textTokens = [];
  while (cursor < len) {
    let state = start;
    let secondState = null;
    let nextState = null;
    let multiLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    while (cursor < len && !(secondState = state.go(tokens[cursor].t))) {
      // Starting tokens with nowhere to jump to.
      // Consider these to be just plain text
      textTokens.push(tokens[cursor++]);
    }
    while (cursor < len && (nextState = secondState || state.go(tokens[cursor].t))) {
      // Get the next state
      secondState = null;
      state = nextState;

      // Keep track of the latest accepting state
      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }
      cursor++;
      multiLength++;
    }
    if (sinceAccepts < 0) {
      // No accepting state was found, part of a regular text token add
      // the first text token to the text tokens array and try again from
      // the next
      cursor -= multiLength;
      if (cursor < len) {
        textTokens.push(tokens[cursor]);
        cursor++;
      }
    } else {
      // Accepting state!
      // First close off the textTokens (if available)
      if (textTokens.length > 0) {
        multis.push(initMultiToken(Text, input, textTokens));
        textTokens = [];
      }

      // Roll back to the latest accepting state
      cursor -= sinceAccepts;
      multiLength -= sinceAccepts;

      // Create a new multitoken
      const Multi = latestAccepting.t;
      const subtokens = tokens.slice(cursor - multiLength, cursor);
      multis.push(initMultiToken(Multi, input, subtokens));
    }
  }

  // Finally close off the textTokens (if available)
  if (textTokens.length > 0) {
    multis.push(initMultiToken(Text, input, textTokens));
  }
  return multis;
}

/**
 * Utility function for instantiating a new multitoken with all the relevant
 * fields during parsing.
 * @param {new (value: string, tokens: Token[]) => MultiToken} Multi class to instantiate
 * @param {string} input original input string
 * @param {Token[]} tokens consecutive tokens scanned from input string
 * @returns {MultiToken}
 */
function initMultiToken(Multi, input, tokens) {
  const startIdx = tokens[0].s;
  const endIdx = tokens[tokens.length - 1].e;
  const value = input.slice(startIdx, endIdx);
  return new Multi(value, tokens);
}

const warn = typeof console !== 'undefined' && console && console.warn || (() => {});
const warnAdvice = 'until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.';

// Side-effect initialization state
const INIT = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: false
};

/**
 * @typedef {{
 * 	start: State<string>,
 * 	tokens: { groups: Collections<string> } & typeof tk
 * }} ScannerInit
 */

/**
 * @typedef {{
 * 	start: State<MultiToken>,
 * 	tokens: typeof multi
 * }} ParserInit
 */

/**
 * @typedef {(arg: { scanner: ScannerInit }) => void} TokenPlugin
 */

/**
 * @typedef {(arg: { scanner: ScannerInit, parser: ParserInit }) => void} Plugin
 */

/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */
function reset() {
  State.groups = {};
  INIT.scanner = null;
  INIT.parser = null;
  INIT.tokenQueue = [];
  INIT.pluginQueue = [];
  INIT.customSchemes = [];
  INIT.initialized = false;
  return INIT;
}

/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} scheme
 * @param {boolean} [optionalSlashSlash]
 */
function registerCustomProtocol(scheme, optionalSlashSlash = false) {
  if (INIT.initialized) {
    warn(`linkifyjs: already initialized - will not register custom scheme "${scheme}" ${warnAdvice}`);
  }
  if (!/^[0-9a-z]+(-[0-9a-z]+)*$/.test(scheme)) {
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  }
  INIT.customSchemes.push([scheme, optionalSlashSlash]);
}

/**
 * Initialize the linkify state machine. Called automatically the first time
 * linkify is called on a string, but may be called manually as well.
 */
function init() {
  // Initialize scanner state machine and plugins
  INIT.scanner = init$2(INIT.customSchemes);
  for (let i = 0; i < INIT.tokenQueue.length; i++) {
    INIT.tokenQueue[i][1]({
      scanner: INIT.scanner
    });
  }

  // Initialize parser state machine and plugins
  INIT.parser = init$1(INIT.scanner.tokens);
  for (let i = 0; i < INIT.pluginQueue.length; i++) {
    INIT.pluginQueue[i][1]({
      scanner: INIT.scanner,
      parser: INIT.parser
    });
  }
  INIT.initialized = true;
  return INIT;
}

/**
 * Parse a string into tokens that represent linkable and non-linkable sub-components
 * @param {string} str
 * @return {MultiToken[]} tokens
 */
function tokenize(str) {
  if (!INIT.initialized) {
    init();
  }
  return run(INIT.parser.start, str, run$1(INIT.scanner.start, str));
}
tokenize.scan = run$1; // for testing

/**
 * Find a list of linkable items in the given string.
 * @param {string} str string to find links in
 * @param {string | Opts} [type] either formatting options or specific type of
 * links to find, e.g., 'url' or 'email'
 * @param {Opts} [opts] formatting options for final output. Cannot be specified
 * if opts already provided in `type` argument
 */
function find(str, type = null, opts = null) {
  if (type && typeof type === 'object') {
    if (opts) {
      throw Error(`linkifyjs: Invalid link type ${type}; must be a string`);
    }
    opts = type;
    type = null;
  }
  const options = new Options(opts);
  const tokens = tokenize(str);
  const filtered = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isLink && (!type || token.t === type) && options.check(token)) {
      filtered.push(token.toFormattedObject(options));
    }
  }
  return filtered;
}

/**
 * @module awareness-protocol
 */


const outdatedTimeout = 30000;

/**
 * @typedef {Object} MetaClientState
 * @property {number} MetaClientState.clock
 * @property {number} MetaClientState.lastUpdated unix timestamp
 */

/**
 * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information
 * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of
 * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.
 *
 * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override
 * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is
 * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that
 * a remote client is offline, it may propagate a message with
 * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a
 * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.
 *
 * Before a client disconnects, it should propagate a `null` state with an updated clock.
 *
 * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.
 *
 * @extends {Observable<string>}
 */
class Awareness extends Observable {
  /**
   * @param {Y.Doc} doc
   */
  constructor (doc) {
    super();
    this.doc = doc;
    /**
     * @type {number}
     */
    this.clientID = doc.clientID;
    /**
     * Maps from client id to client state
     * @type {Map<number, Object<string, any>>}
     */
    this.states = new Map();
    /**
     * @type {Map<number, MetaClientState>}
     */
    this.meta = new Map();
    this._checkInterval = /** @type {any} */ (setInterval(() => {
      const now = getUnixTime();
      if (this.getLocalState() !== null && (outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */ (this.meta.get(this.clientID)).lastUpdated)) {
        // renew local clock
        this.setLocalState(this.getLocalState());
      }
      /**
       * @type {Array<number>}
       */
      const remove = [];
      this.meta.forEach((meta, clientid) => {
        if (clientid !== this.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid);
        }
      });
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, 'timeout');
      }
    }, floor(outdatedTimeout / 10)));
    doc.on('destroy', () => {
      this.destroy();
    });
    this.setLocalState({});
  }

  destroy () {
    this.emit('destroy', [this]);
    this.setLocalState(null);
    super.destroy();
    clearInterval(this._checkInterval);
  }

  /**
   * @return {Object<string,any>|null}
   */
  getLocalState () {
    return this.states.get(this.clientID) || null
  }

  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState (state) {
    const clientID = this.clientID;
    const currLocalMeta = this.meta.get(clientID);
    const clock = currLocalMeta === undefined ? 0 : currLocalMeta.clock + 1;
    const prevState = this.states.get(clientID);
    if (state === null) {
      this.states.delete(clientID);
    } else {
      this.states.set(clientID, state);
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: getUnixTime()
    });
    const added = [];
    const updated = [];
    const filteredUpdated = [];
    const removed = [];
    if (state === null) {
      removed.push(clientID);
    } else if (prevState == null) {
      if (state != null) {
        added.push(clientID);
      }
    } else {
      updated.push(clientID);
      if (!equalityDeep(prevState, state)) {
        filteredUpdated.push(clientID);
      }
    }
    if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
      this.emit('change', [{ added, updated: filteredUpdated, removed }, 'local']);
    }
    this.emit('update', [{ added, updated, removed }, 'local']);
  }

  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField (field, value) {
    const state = this.getLocalState();
    if (state !== null) {
      this.setLocalState({
        ...state,
        [field]: value
      });
    }
  }

  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates () {
    return this.states
  }
}

/**
 * Mark (remote) clients as inactive and remove them from the list of active peers.
 * This change will be propagated to remote clients.
 *
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @param {any} origin
 */
const removeAwarenessStates = (awareness, clients, origin) => {
  const removed = [];
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i];
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID);
      if (clientID === awareness.clientID) {
        const curMeta = /** @type {MetaClientState} */ (awareness.meta.get(clientID));
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: getUnixTime()
        });
      }
      removed.push(clientID);
    }
  }
  if (removed.length > 0) {
    awareness.emit('change', [{ added: [], updated: [], removed }, origin]);
    awareness.emit('update', [{ added: [], updated: [], removed }, origin]);
  }
};

export { reset as A, Awareness as B, ContentString as C, Doc as D, mergeUpdates as E, Item as I, RelativePosition as R, Snapshot as S, UndoManager as U, YXmlFragment as Y, applyUpdate as a, encodeStateVector as b, YXmlElement as c, applyUpdateV2 as d, encodeStateAsUpdate as e, findIndexSS as f, createSnapshot as g, isDeleted as h, iterateDeletedStructs as i, YXmlText as j, YText as k, ContentFormat as l, createDeleteSet as m, createRelativePositionFromTypeIndex as n, findRootTypeKey as o, createID as p, createAbsolutePositionFromRelativePosition as q, isParentOf as r, snapshot as s, typeListToArraySnapshot as t, compareRelativePositions as u, createRelativePositionFromJSON as v, ContentType as w, registerCustomProtocol as x, tokenize as y, find as z };
