const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-misc-CQ2gQV2M.js","assets/vendor-utils-B8uxCDj6.js","assets/vendor-react-BeQHm2Hb.js","assets/vendor-react-dom-b1tP6waW.js","assets/vendor-export-COR0N_gy.js","assets/vendor-radix-BjF_gpzx.js","assets/vendor-i18n-BRT6rIp6.js","assets/vendor-tiptap-tuOT8GNt.js","assets/vendor-prosemirror-l_ukq4jw.js","assets/vendor-yjs-BarRwqAh.js","assets/vendor-datefns-Cgc6WLhj.js","assets/vendor-syncfusion-B9hbBizT.js","assets/vendor-syncfusion-DcifYHAj.css","assets/vendor-ketcher-B9jnF8te.js","assets/vendor-react-ChcLc0k7.css","assets/vendor-misc-BdE-jilM.css"])))=>i.map(i=>d[i]);
import { D as D$2, W as Wr$1, r as reactExports, j as jsxRuntimeExports, S as Sn$2, E as El, Y as Yo, a as So, b as jl, K as Ko, T as Tt$4, y as y$1, R as React__default } from './vendor-react-BeQHm2Hb.js';
import { P as Plugin, a as PluginKey, S as Slice, F as Fragment, D as DOMParser, b as DecorationSet, c as createHighlightPlugin, d as Decoration, T as TextSelection, e as TableMap, R as ReplaceStep, C as CellSelection, f as DOMSerializer, g as createParser, h as columnResizing, t as tableEditing, i as goToNextCell, j as TableView, k as dropCursor, N as Node, u as undoCommand, r as redoCommand, l as undo, m as redo, y as ySyncPlugin, n as yUndoPlugin, o as yCursorPlugin, p as yUndoPluginKey, q as yCursorPluginKey, s as ySyncPluginKey, v as getRelativeSelection, w as addRowBefore, x as addRowAfter, z as addColumnBefore, A as addColumnAfter, B as deleteRow, E as deleteColumn, G as mergeCells, H as splitCell, I as NodeSelection, J as absolutePositionToRelativePosition, K as relativePositionToAbsolutePosition, L as ReplaceAroundStep, M as Selection, O as Mapping, Q as defaultSelectionBuilder } from './vendor-prosemirror-l_ukq4jw.js';
import { E as Extension, c as combineTransactionSteps, g as getChangedRanges, f as findChildrenInRange, M as Mark, N as Node3, a as callOrReturn, b as getExtensionField, m as mergeAttributes, i as index_default, d as index_default$1, e as index_default$2, h as index_default$3, j as index_default$4, I as InputRule, k as getSchema, l as createDocument, n as Editor, o as isNodeSelection, p as posToDOMRect, q as getMarkRange, r as extensions_exports, G as Gapcursor, T as Text, L as Link, U as UndoRedo, s as findParentNode, t as findChildren, u as selectionToInsertionEnd, v as isTextSelection } from './vendor-tiptap-tuOT8GNt.js';
import { v as v4, A as Ao, u as unified, r as remarkParse, a as remarkGfm, b as remarkRehype, h as handlers, c as rehypeStringify, d as rehypeParse, e as rehypeRemark, f as remarkStringify, g as visit, i as fromDom } from './vendor-misc-CQ2gQV2M.js';
import { Y as YXmlFragment, f as findIndexSS, D as Doc, a as applyUpdate, e as encodeStateAsUpdate, b as encodeStateVector, c as YXmlElement } from './vendor-yjs-BarRwqAh.js';
import { M as MantineContext, a as MantineProvider, D as Divider, T as Text$1, C as Card, u as useHover, G as Group, b as Menu, B as Button, c as CheckIcon, A as ActionIcon, d as Tooltip, e as useFocusWithin, f as useFocusTrap, m as mergeRefs, F as Flex, P as PopoverDropdown, g as PopoverTarget, h as Popover, i as TextInput, L as Loader, S as Stack, j as Badge, k as FileInput, l as Tabs, n as LoadingOverlay, o as Skeleton, p as Avatar, q as Chip } from './vendor-mantine-CpjnkULY.js';

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (true && deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};

function pt$2(t, o = JSON.stringify) {
  const r = {};
  return t.filter((n) => {
    const e = o(n);
    return Object.prototype.hasOwnProperty.call(r, e) ? false : r[e] = true;
  });
}
function dt$3(t) {
  const o = t.filter(
    (n, e) => t.indexOf(n) !== e
  );
  return pt$2(o);
}
const Q$1 = Extension.create({
  name: "uniqueID",
  // we’ll set a very high priority to make sure this runs first
  // and is compatible with `appendTransaction` hooks of other extensions
  priority: 1e4,
  addOptions() {
    return {
      attributeName: "id",
      types: [],
      setIdAttribute: false,
      generateID: () => {
        if (typeof window < "u" && window.__TEST_OPTIONS) {
          const t = window.__TEST_OPTIONS;
          return t.mockID === void 0 ? t.mockID = 0 : t.mockID++, t.mockID.toString();
        }
        return v4();
      },
      filterTransaction: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (t) => t.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (t) => {
              const o = {
                [`data-${this.options.attributeName}`]: t[this.options.attributeName]
              };
              return this.options.setIdAttribute ? {
                ...o,
                id: t[this.options.attributeName]
              } : o;
            }
          }
        }
      }
    ];
  },
  // check initial content for missing ids
  // onCreate() {
  //   // Don’t do this when the collaboration extension is active
  //   // because this may update the content, so Y.js tries to merge these changes.
  //   // This leads to empty block nodes.
  //   // See: https://github.com/ueberdosis/tiptap/issues/2400
  //   if (
  //     this.editor.extensionManager.extensions.find(
  //       (extension) => extension.name === "collaboration"
  //     )
  //   ) {
  //     return;
  //   }
  //   const { view, state } = this.editor;
  //   const { tr, doc } = state;
  //   const { types, attributeName, generateID } = this.options;
  //   const nodesWithoutId = findChildren(doc, (node) => {
  //     return (
  //       types.includes(node.type.name) && node.attrs[attributeName] === null
  //     );
  //   });
  //   nodesWithoutId.forEach(({ node, pos }) => {
  //     tr.setNodeMarkup(pos, undefined, {
  //       ...node.attrs,
  //       [attributeName]: generateID(),
  //     });
  //   });
  //   tr.setMeta("addToHistory", false);
  //   view.dispatch(tr);
  // },
  addProseMirrorPlugins() {
    let t = null, o = false;
    return [
      new Plugin({
        key: new PluginKey("uniqueID"),
        appendTransaction: (r, n, e) => {
          const s = r.some((g) => g.docChanged) && !n.doc.eq(e.doc), i = this.options.filterTransaction && r.some((g) => {
            var C, d;
            return !((d = (C = this.options).filterTransaction) != null && d.call(C, g));
          });
          if (!s || i)
            return;
          const { tr: l } = e, { types: a, attributeName: c, generateID: h } = this.options, f = combineTransactionSteps(
            n.doc,
            r
          ), { mapping: p } = f;
          if (getChangedRanges(f).forEach(({ newRange: g }) => {
            const C = findChildrenInRange(
              e.doc,
              g,
              (y) => a.includes(y.type.name)
            ), d = C.map(({ node: y }) => y.attrs[c]).filter((y) => y !== null), w = dt$3(d);
            C.forEach(({ node: y, pos: m }) => {
              var z;
              const b = (z = l.doc.nodeAt(m)) == null ? void 0 : z.attrs[c];
              if (b === null) {
                const U = n.doc.type.createAndFill().content;
                if (n.doc.content.findDiffStart(U) === null) {
                  const q = JSON.parse(
                    JSON.stringify(e.doc.toJSON())
                  );
                  if (q.content[0].content[0].attrs.id = "initialBlockId", JSON.stringify(q.content) === JSON.stringify(U.toJSON())) {
                    l.setNodeMarkup(m, void 0, {
                      ...y.attrs,
                      [c]: "initialBlockId"
                    });
                    return;
                  }
                }
                l.setNodeMarkup(m, void 0, {
                  ...y.attrs,
                  [c]: h()
                });
                return;
              }
              const { deleted: k } = p.invert().mapResult(m);
              k && w.includes(b) && l.setNodeMarkup(m, void 0, {
                ...y.attrs,
                [c]: h()
              });
            });
          }), !!l.steps.length)
            return l.setMeta("uniqueID", true), l;
        },
        // we register a global drag handler to track the current drag source element
        view(r) {
          const n = (e) => {
            let s;
            t = !((s = r.dom.parentElement) === null || s === void 0) && s.contains(e.target) ? r.dom.parentElement : null;
          };
          return window.addEventListener("dragstart", n), {
            destroy() {
              window.removeEventListener("dragstart", n);
            }
          };
        },
        props: {
          // `handleDOMEvents` is called before `transformPasted` so we can do
          // some checks before. However, `transformPasted` only runs when
          // editor content is pasted - not external content.
          handleDOMEvents: {
            // only create new ids for dropped content while holding `alt`
            // or content is dragged from another editor
            drop: (r, n) => {
              let e;
              return t !== r.dom.parentElement || ((e = n.dataTransfer) === null || e === void 0 ? void 0 : e.effectAllowed) === "copy" ? o = true : o = false, t = null, false;
            },
            // always create new ids on pasted content
            paste: () => (o = true, false)
          },
          // we’ll remove ids for every pasted node
          // so we can create a new one within `appendTransaction`
          transformPasted: (r) => {
            if (!o)
              return r;
            const { types: n, attributeName: e } = this.options, s = (i) => {
              const l = [];
              return i.forEach((a) => {
                if (a.isText) {
                  l.push(a);
                  return;
                }
                if (!n.includes(a.type.name)) {
                  l.push(a.copy(s(a.content)));
                  return;
                }
                const c = a.type.create(
                  {
                    ...a.attrs,
                    [e]: null
                  },
                  s(a.content),
                  a.marks
                );
                l.push(c);
              }), Fragment.from(l);
            };
            return o = false, new Slice(
              s(r.content),
              r.openStart,
              r.openEnd
            );
          }
        }
      })
    ];
  }
});
function K$2(t) {
  return t.type === "link";
}
function X$1(t) {
  return typeof t != "string" && t.type === "link";
}
function B$1(t) {
  return typeof t != "string" && t.type === "text";
}
function S(t) {
  var o, r, n, e, s;
  return R(t) ? { ...t } : v$1(t) ? {
    type: "tableCell",
    content: [].concat(t.content),
    props: {
      backgroundColor: ((o = t.props) == null ? void 0 : o.backgroundColor) ?? "default",
      textColor: ((r = t.props) == null ? void 0 : r.textColor) ?? "default",
      textAlignment: ((n = t.props) == null ? void 0 : n.textAlignment) ?? "left",
      colspan: ((e = t.props) == null ? void 0 : e.colspan) ?? 1,
      rowspan: ((s = t.props) == null ? void 0 : s.rowspan) ?? 1
    }
  } : {
    type: "tableCell",
    content: [].concat(t),
    props: {
      backgroundColor: "default",
      textColor: "default",
      textAlignment: "left",
      colspan: 1,
      rowspan: 1
    }
  };
}
function v$1(t) {
  return t != null && typeof t != "string" && !Array.isArray(t) && t.type === "tableCell";
}
function R(t) {
  return v$1(t) && t.props !== void 0 && t.content !== void 0;
}
function A$1(t) {
  return R(t) ? t.props.colspan ?? 1 : 1;
}
function D$1(t) {
  return R(t) ? t.props.rowspan ?? 1 : 1;
}
let O$1 = class O extends Error {
  constructor(o) {
    super(`Unreachable case: ${o}`);
  }
};
function At$2(t, o = true) {
  const { "data-test": r, ...n } = t;
  if (Object.keys(n).length > 0 && o)
    throw new Error("Object must be empty " + JSON.stringify(t));
}
function Y(t, o) {
  const r = t.resolve(o);
  if (r.nodeAfter && r.nodeAfter.type.isInGroup("bnBlock"))
    return {
      posBeforeNode: r.pos,
      node: r.nodeAfter
    };
  let n = r.depth, e = r.node(n);
  for (; n > 0; ) {
    if (e.type.isInGroup("bnBlock"))
      return {
        posBeforeNode: r.before(n),
        node: e
      };
    n--, e = r.node(n);
  }
  const s = [];
  t.descendants((l, a) => {
    l.type.isInGroup("bnBlock") && s.push(a);
  }), console.warn(`Position ${o} is not within a blockContainer node.`);
  const i = t.resolve(
    s.find((l) => l >= o) || s[s.length - 1]
  );
  return {
    posBeforeNode: i.pos,
    node: i.nodeAfter
  };
}
function $(t, o) {
  if (!t.type.isInGroup("bnBlock"))
    throw new Error(
      `Attempted to get bnBlock node at position but found node of different type ${t.type.name}`
    );
  const r = t, n = o, e = n + r.nodeSize, s = {
    node: r,
    beforePos: n,
    afterPos: e
  };
  if (r.type.name === "blockContainer") {
    let i, l;
    if (r.forEach((a, c) => {
      if (a.type.spec.group === "blockContent") {
        const h = a, f = n + c + 1, p = f + a.nodeSize;
        i = {
          node: h,
          beforePos: f,
          afterPos: p
        };
      } else if (a.type.name === "blockGroup") {
        const h = a, f = n + c + 1, p = f + a.nodeSize;
        l = {
          node: h,
          beforePos: f,
          afterPos: p
        };
      }
    }), !i)
      throw new Error(
        `blockContainer node does not contain a blockContent node in its children: ${r}`
      );
    return {
      isBlockContainer: true,
      bnBlock: s,
      blockContent: i,
      childContainer: l,
      blockNoteType: i.node.type.name
    };
  } else {
    if (!s.node.type.isInGroup("childContainer"))
      throw new Error(
        `bnBlock node is not in the childContainer group: ${s.node}`
      );
    return {
      isBlockContainer: false,
      bnBlock: s,
      childContainer: s,
      blockNoteType: s.node.type.name
    };
  }
}
function Z(t) {
  return $(t.node, t.posBeforeNode);
}
function It$2(t) {
  if (!t.nodeAfter)
    throw new Error(
      `Attempted to get blockContainer node at position ${t.pos} but a node at this position does not exist`
    );
  return $(t.nodeAfter, t.pos);
}
function Tt$3(t) {
  const o = Y(t.doc, t.selection.anchor);
  return Z(o);
}
function Ot$2(t) {
  const o = Y(t.doc, t.selection.anchor);
  return Z(o);
}
function ht$3(t) {
  return "doc" in t ? t.doc.type.schema : t.type.schema;
}
function G$2(t) {
  return t.cached.blockNoteEditor;
}
function J(t) {
  return G$2(t).schema;
}
function _$2(t) {
  return J(t).blockSchema;
}
function H$2(t) {
  return J(t).inlineContentSchema;
}
function N(t) {
  return J(t).styleSchema;
}
function j$2(t) {
  return G$2(t).blockCache;
}
function gt$2(t, o, r) {
  var s, i;
  const n = {
    type: "tableContent",
    columnWidths: [],
    headerRows: void 0,
    headerCols: void 0,
    rows: []
  }, e = [];
  t.content.forEach((l, a, c) => {
    const h = {
      cells: []
    };
    c === 0 && l.content.forEach((f) => {
      let p = f.attrs.colwidth;
      p == null && (p = new Array(f.attrs.colspan ?? 1).fill(void 0)), n.columnWidths.push(...p);
    }), h.cells = l.content.content.map((f, p) => (e[c] || (e[c] = []), e[c][p] = f.type.name === "tableHeader", {
      type: "tableCell",
      content: f.content.content.map(
        (g) => F$2(g, o, r)
      ).reduce(
        (g, C) => {
          if (!g.length)
            return C;
          const d = g[g.length - 1], w = C[0];
          return w && B$1(d) && B$1(w) && JSON.stringify(d.styles) === JSON.stringify(w.styles) ? (d.text += `
` + w.text, g.push(...C.slice(1)), g) : (g.push(...C), g);
        },
        []
      ),
      props: {
        colspan: f.attrs.colspan,
        rowspan: f.attrs.rowspan,
        backgroundColor: f.attrs.backgroundColor,
        textColor: f.attrs.textColor,
        textAlignment: f.attrs.textAlignment
      }
    })), n.rows.push(h);
  });
  for (let l = 0; l < e.length; l++)
    (s = e[l]) != null && s.every((a) => a) && (n.headerRows = (n.headerRows ?? 0) + 1);
  for (let l = 0; l < ((i = e[0]) == null ? void 0 : i.length); l++)
    e != null && e.every((a) => a[l]) && (n.headerCols = (n.headerCols ?? 0) + 1);
  return n;
}
function F$2(t, o, r) {
  const n = [];
  let e;
  return t.content.forEach((s) => {
    if (s.type.name === "hardBreak") {
      if (e)
        if (B$1(e))
          e.text += `
`;
        else if (K$2(e))
          e.content[e.content.length - 1].text += `
`;
        else
          throw new Error("unexpected");
      else
        e = {
          type: "text",
          text: `
`,
          styles: {}
        };
      return;
    }
    if (s.type.name !== "link" && s.type.name !== "text") {
      if (!o[s.type.name]) {
        console.warn("unrecognized inline content type", s.type.name);
        return;
      }
      e && (n.push(e), e = void 0), n.push(
        wt$2(s, o, r)
      );
      return;
    }
    const i = {};
    let l;
    for (const a of s.marks)
      if (a.type.name === "link")
        l = a;
      else {
        const c = r[a.type.name];
        if (!c) {
          if (a.type.spec.blocknoteIgnore)
            continue;
          throw new Error(`style ${a.type.name} not found in styleSchema`);
        }
        if (c.propSchema === "boolean")
          i[c.type] = true;
        else if (c.propSchema === "string")
          i[c.type] = a.attrs.stringValue;
        else
          throw new O$1(c.propSchema);
      }
    e ? B$1(e) ? l ? (n.push(e), e = {
      type: "link",
      href: l.attrs.href,
      content: [
        {
          type: "text",
          text: s.textContent,
          styles: i
        }
      ]
    }) : JSON.stringify(e.styles) === JSON.stringify(i) ? e.text += s.textContent : (n.push(e), e = {
      type: "text",
      text: s.textContent,
      styles: i
    }) : K$2(e) && (l ? e.href === l.attrs.href ? JSON.stringify(
      e.content[e.content.length - 1].styles
    ) === JSON.stringify(i) ? e.content[e.content.length - 1].text += s.textContent : e.content.push({
      type: "text",
      text: s.textContent,
      styles: i
    }) : (n.push(e), e = {
      type: "link",
      href: l.attrs.href,
      content: [
        {
          type: "text",
          text: s.textContent,
          styles: i
        }
      ]
    }) : (n.push(e), e = {
      type: "text",
      text: s.textContent,
      styles: i
    })) : l ? e = {
      type: "link",
      href: l.attrs.href,
      content: [
        {
          type: "text",
          text: s.textContent,
          styles: i
        }
      ]
    } : e = {
      type: "text",
      text: s.textContent,
      styles: i
    };
  }), e && n.push(e), n;
}
function wt$2(t, o, r) {
  if (t.type.name === "text" || t.type.name === "link")
    throw new Error("unexpected");
  const n = {}, e = o[t.type.name];
  for (const [l, a] of Object.entries(t.attrs)) {
    if (!e)
      throw Error("ic node is of an unrecognized type: " + t.type.name);
    const c = e.propSchema;
    l in c && (n[l] = a);
  }
  let s;
  return e.content === "styled" ? s = F$2(
    t,
    o,
    r
  ) : s = void 0, {
    type: t.type.name,
    props: n,
    content: s
  };
}
function L(t, o, r = _$2(o), n = H$2(o), e = N(o), s = j$2(o)) {
  var C;
  if (!t.type.isInGroup("bnBlock"))
    throw Error("Node should be a bnBlock, but is instead: " + t.type.name);
  const i = s == null ? void 0 : s.get(t);
  if (i)
    return i;
  const l = $(t, 0);
  let a = l.bnBlock.node.attrs.id;
  a === null && (a = Q$1.options.generateID());
  const c = r[l.blockNoteType];
  if (!c)
    throw Error("Block is of an unrecognized type: " + l.blockNoteType);
  const h = {};
  for (const [d, w] of Object.entries({
    ...t.attrs,
    ...l.isBlockContainer ? l.blockContent.node.attrs : {}
  })) {
    const y = c.propSchema;
    d in y && !(y[d].default === void 0 && w === void 0) && (h[d] = w);
  }
  const f = r[l.blockNoteType], p = [];
  (C = l.childContainer) == null || C.node.forEach((d) => {
    p.push(
      L(
        d,
        o,
        r,
        n,
        e,
        s
      )
    );
  });
  let u;
  if (f.content === "inline") {
    if (!l.isBlockContainer)
      throw new Error("impossible");
    u = F$2(
      l.blockContent.node,
      n,
      e
    );
  } else if (f.content === "table") {
    if (!l.isBlockContainer)
      throw new Error("impossible");
    u = gt$2(
      l.blockContent.node,
      n,
      e
    );
  } else if (f.content === "none")
    u = void 0;
  else
    throw new O$1(f.content);
  const g = {
    id: a,
    type: f.type,
    props: h,
    content: u,
    children: p
  };
  return s == null || s.set(t, g), g;
}
function St$3(t, o = ht$3(t), r = _$2(o), n = H$2(o), e = N(o), s = j$2(o)) {
  const i = [];
  return t.firstChild && t.firstChild.descendants((l) => (i.push(
    L(
      l,
      o,
      r,
      n,
      e,
      s
    )
  ), false)), i;
}
function Dt$2(t, o, r = _$2(o), n = H$2(o), e = N(o), s = j$2(o)) {
  function i(l, a, c) {
    if (l.type.name !== "blockGroup")
      throw new Error("unexpected");
    const h = [];
    let f, p;
    return l.forEach((u, g, C) => {
      if (u.type.name !== "blockContainer")
        throw new Error("unexpected");
      if (u.childCount === 0)
        return;
      if (u.childCount === 0 || u.childCount > 2)
        throw new Error(
          "unexpected, blockContainer.childCount: " + u.childCount
        );
      const d = C === 0, w = C === l.childCount - 1;
      if (u.firstChild.type.name === "blockGroup") {
        if (!d)
          throw new Error("unexpected");
        const k = i(
          u.firstChild,
          Math.max(0, a - 1),
          w ? Math.max(0, c - 1) : 0
        );
        f = k.blockCutAtStart, w && (p = k.blockCutAtEnd), h.push(...k.blocks);
        return;
      }
      const y = L(
        u,
        o,
        r,
        n,
        e,
        s
      ), m = u.childCount > 1 ? u.child(1) : void 0;
      let b = [];
      if (m) {
        const k = i(
          m,
          0,
          // TODO: can this be anything other than 0?
          w ? Math.max(0, c - 1) : 0
        );
        b = k.blocks, w && (p = k.blockCutAtEnd);
      }
      w && !m && c > 1 && (p = y.id), d && a > 1 && (f = y.id), h.push({
        ...y,
        children: b
      });
    }), { blocks: h, blockCutAtStart: f, blockCutAtEnd: p };
  }
  if (t.content.childCount === 0)
    return {
      blocks: [],
      blockCutAtStart: void 0,
      blockCutAtEnd: void 0
    };
  if (t.content.childCount !== 1)
    throw new Error(
      "slice must be a single block, did you forget includeParents=true?"
    );
  return i(
    t.content.firstChild,
    Math.max(t.openStart - 1, 0),
    Math.max(t.openEnd - 1, 0)
  );
}
function x$1(t) {
  const { height: o, width: r } = tt$2(t), n = new Array(o).fill(false).map(() => new Array(r).fill(null)), e = (s, i) => {
    for (let l = s; l < o; l++)
      for (let a = i; a < r; a++)
        if (!n[l][a])
          return { row: l, col: a };
    throw new Error(
      "Unable to create occupancy grid for table, no more available cells"
    );
  };
  for (let s = 0; s < t.content.rows.length; s++)
    for (let i = 0; i < t.content.rows[s].cells.length; i++) {
      const l = S(t.content.rows[s].cells[i]), a = D$1(l), c = A$1(l), { row: h, col: f } = e(s, i);
      for (let p = h; p < h + a; p++)
        for (let u = f; u < f + c; u++) {
          if (n[p][u])
            throw new Error(
              `Unable to create occupancy grid for table, cell at ${p},${u} is already occupied`
            );
          n[p][u] = {
            row: s,
            col: i,
            rowspan: a,
            colspan: c,
            cell: l
          };
        }
    }
  return n;
}
function I$2(t) {
  const o = /* @__PURE__ */ new Set();
  return t.map((r) => ({
    cells: r.map((n) => o.has(n.row + ":" + n.col) ? false : (o.add(n.row + ":" + n.col), n.cell)).filter((n) => n !== false)
  }));
}
function E(t, o, r = x$1(o)) {
  for (let n = 0; n < r.length; n++)
    for (let e = 0; e < r[n].length; e++) {
      const s = r[n][e];
      if (s.row === t.row && s.col === t.col)
        return { row: n, col: e, cell: s.cell };
    }
  throw new Error(
    `Unable to resolve relative table cell indices for table, cell at ${t.row},${t.col} is not occupied`
  );
}
function tt$2(t) {
  const o = t.content.rows.length;
  let r = 0;
  return t.content.rows.forEach((n) => {
    let e = 0;
    n.cells.forEach((s) => {
      e += A$1(s);
    }), r = Math.max(r, e);
  }), { height: o, width: r };
}
function et$2(t, o, r = x$1(o)) {
  var e;
  const n = (e = r[t.row]) == null ? void 0 : e[t.col];
  if (n)
    return {
      row: n.row,
      col: n.col,
      cell: n.cell
    };
}
function yt$2(t, o) {
  var s;
  const r = x$1(t);
  if (o < 0 || o >= r.length)
    return [];
  let n = 0;
  for (let i = 0; i < o; i++) {
    const l = (s = r[n]) == null ? void 0 : s[0];
    if (!l)
      return [];
    n += l.rowspan;
  }
  const e = new Array(r[0].length).fill(false).map((i, l) => et$2(
    { row: n, col: l },
    t,
    r
  )).filter(
    (i) => i !== void 0
  );
  return e.filter((i, l) => e.findIndex((a) => a.row === i.row && a.col === i.col) === l);
}
function Ct$2(t, o) {
  var s;
  const r = x$1(t);
  if (o < 0 || o >= r[0].length)
    return [];
  let n = 0;
  for (let i = 0; i < o; i++) {
    const l = (s = r[0]) == null ? void 0 : s[n];
    if (!l)
      return [];
    n += l.colspan;
  }
  const e = new Array(r.length).fill(false).map((i, l) => et$2(
    { row: l, col: n },
    t,
    r
  )).filter(
    (i) => i !== void 0
  );
  return e.filter((i, l) => e.findIndex((a) => a.row === i.row && a.col === i.col) === l);
}
function Mt$2(t, o, r, n = x$1(t)) {
  const { col: e } = E(
    {
      row: 0,
      col: o
    },
    t,
    n
  ), { col: s } = E(
    {
      row: 0,
      col: r
    },
    t,
    n
  );
  return n.forEach((i) => {
    const [l] = i.splice(e, 1);
    i.splice(s, 0, l);
  }), I$2(n);
}
function Pt$3(t, o, r, n = x$1(t)) {
  const { row: e } = E(
    {
      row: o,
      col: 0
    },
    t,
    n
  ), { row: s } = E(
    {
      row: r,
      col: 0
    },
    t,
    n
  ), [i] = n.splice(e, 1);
  return n.splice(s, 0, i), I$2(n);
}
function M$2(t) {
  return t ? v$1(t) ? M$2(t.content) : typeof t == "string" ? t.length === 0 : Array.isArray(t) ? t.every(
    (o) => typeof o == "string" ? o.length === 0 : B$1(o) ? o.text.length === 0 : X$1(o) ? typeof o.content == "string" ? o.content.length === 0 : o.content.every((r) => r.text.length === 0) : false
  ) : false : true;
}
function Rt$2(t, o, r = x$1(t)) {
  if (o === "columns") {
    let s = 0;
    for (let i = r[0].length - 1; i >= 0 && r.every(
      (a) => M$2(a[i].cell) && a[i].colspan === 1
    ); i--)
      s++;
    for (let i = r.length - 1; i >= 0; i--) {
      const l = Math.max(
        r[i].length - s,
        1
      );
      r[i] = r[i].slice(0, l);
    }
    return I$2(r);
  }
  let n = 0;
  for (let s = r.length - 1; s >= 0 && r[s].every(
    (l) => M$2(l.cell) && l.rowspan === 1
  ); s--)
    n++;
  const e = Math.min(n, r.length - 1);
  return r.splice(r.length - e, e), I$2(r);
}
function $t$2(t, o, r, n = x$1(t)) {
  const { width: e, height: s } = tt$2(t);
  if (o === "columns")
    n.forEach((i, l) => {
      if (r >= 0)
        for (let a = 0; a < r; a++)
          i.push({
            row: l,
            col: Math.max(...i.map((c) => c.col)) + 1,
            rowspan: 1,
            colspan: 1,
            cell: S("")
          });
      else
        i.splice(e + r, -1 * r);
    });
  else if (r > 0)
    for (let i = 0; i < r; i++) {
      const l = new Array(e).fill(null).map((a, c) => ({
        row: s + i,
        col: c,
        rowspan: 1,
        colspan: 1,
        cell: S("")
      }));
      n.push(l);
    }
  else r < 0 && n.splice(s + r, -1 * r);
  return I$2(n);
}
function Jt$2(t, o, r) {
  const n = yt$2(t, r);
  if (!n.some((a) => D$1(a.cell) > 1))
    return true;
  let s = r, i = r;
  return n.forEach((a) => {
    const c = D$1(a.cell);
    s = Math.max(s, a.row + c - 1), i = Math.min(i, a.row);
  }), o < r ? r === s : r === i;
}
function _t$2(t, o, r) {
  const n = Ct$2(t, r);
  if (!n.some((a) => A$1(a.cell) > 1))
    return true;
  let s = r, i = r;
  return n.forEach((a) => {
    const c = A$1(a.cell);
    s = Math.max(s, a.col + c - 1), i = Math.min(i, a.col);
  }), o < r ? r === s : r === i;
}
function Ht$2(t, o, r) {
  const n = E(t, r), e = E(o, r);
  return n.col === e.col;
}
function V$2(t, o, r, n) {
  const e = [];
  for (const [i, l] of Object.entries(t.styles || {})) {
    const a = r[i];
    if (!a)
      throw new Error(`style ${i} not found in styleSchema`);
    if (a.propSchema === "boolean")
      l && e.push(o.mark(i));
    else if (a.propSchema === "string")
      l && e.push(o.mark(i, { stringValue: l }));
    else
      throw new O$1(a.propSchema);
  }
  return !n || !o.nodes[n].spec.code ? t.text.split(/(\n)/g).filter((i) => i.length > 0).map((i) => i === `
` ? o.nodes.hardBreak.createChecked() : o.text(i, e)) : t.text.length > 0 ? [o.text(t.text, e)] : [];
}
function mt$2(t, o, r) {
  const n = o.marks.link.create({
    href: t.href
  });
  return P(t.content, o, r).map(
    (e) => {
      if (e.type.name === "text")
        return e.mark([...e.marks, n]);
      if (e.type.name === "hardBreak")
        return e;
      throw new Error("unexpected node type");
    }
  );
}
function P(t, o, r, n) {
  const e = [];
  if (typeof t == "string")
    return e.push(
      ...V$2(
        { text: t, styles: {} },
        o,
        r,
        n
      )
    ), e;
  for (const s of t)
    e.push(
      ...V$2(s, o, r, n)
    );
  return e;
}
function T$1(t, o, r, n = N(o)) {
  const e = [];
  for (const s of t)
    typeof s == "string" ? e.push(
      ...P(s, o, n, r)
    ) : X$1(s) ? e.push(...mt$2(s, o, n)) : B$1(s) ? e.push(
      ...P([s], o, n, r)
    ) : e.push(
      nt$2(s, o, n)
    );
  return e;
}
function kt$2(t, o, r = N(o)) {
  const n = [], e = new Array(t.headerRows ?? 0).fill(true), s = new Array(t.headerCols ?? 0).fill(true), i = t.columnWidths ?? [];
  for (let l = 0; l < t.rows.length; l++) {
    const a = t.rows[l], c = [], h = e[l];
    for (let p = 0; p < a.cells.length; p++) {
      const u = a.cells[p], g = s[p], C = void 0;
      let d = null;
      const w = E(
        {
          row: l,
          col: p
        },
        { content: t }
      );
      let y = i[w.col] ? [i[w.col]] : null;
      if (u) if (typeof u == "string")
        d = o.text(u);
      else if (v$1(u)) {
        u.content && (d = T$1(
          u.content,
          o,
          "tableParagraph",
          r
        ));
        const b = A$1(u);
        b > 1 && (y = new Array(b).fill(false).map((k, W) => i[w.col + W] ?? void 0));
      } else
        d = T$1(
          u,
          o,
          "tableParagraph",
          r
        );
      const m = o.nodes[g || h ? "tableHeader" : "tableCell"].createChecked(
        {
          ...v$1(u) ? u.props : {},
          colwidth: y
        },
        o.nodes.tableParagraph.createChecked(C, d)
      );
      c.push(m);
    }
    const f = o.nodes.tableRow.createChecked({}, c);
    n.push(f);
  }
  return n;
}
function nt$2(t, o, r) {
  let n, e = t.type;
  if (e === void 0 && (e = "paragraph"), !o.nodes[e])
    throw new Error(`node type ${e} not found in schema`);
  if (!t.content)
    n = o.nodes[e].createChecked(t.props);
  else if (typeof t.content == "string") {
    const s = T$1(
      [t.content],
      o,
      e,
      r
    );
    n = o.nodes[e].createChecked(t.props, s);
  } else if (Array.isArray(t.content)) {
    const s = T$1(
      t.content,
      o,
      e,
      r
    );
    n = o.nodes[e].createChecked(t.props, s);
  } else if (t.content.type === "tableContent") {
    const s = kt$2(t.content, o, r);
    n = o.nodes[e].createChecked(t.props, s);
  } else
    throw new O$1(t.content.type);
  return n;
}
function bt$2(t, o, r = N(o)) {
  let n = t.id;
  n === void 0 && (n = Q$1.options.generateID());
  const e = [];
  if (t.children)
    for (const i of t.children)
      e.push(bt$2(i, o, r));
  if (!t.type || // can happen if block.type is not defined (this should create the default node)
  o.nodes[t.type].isInGroup("blockContent")) {
    const i = nt$2(
      t,
      o,
      r
    ), l = e.length > 0 ? o.nodes.blockGroup.createChecked({}, e) : void 0;
    return o.nodes.blockContainer.createChecked(
      {
        id: n,
        ...t.props
      },
      l ? [i, l] : i
    );
  } else {
    if (o.nodes[t.type].isInGroup("bnBlock"))
      return o.nodes[t.type].createChecked(
        {
          id: n,
          ...t.props
        },
        e
      );
    throw new Error(
      `block type ${t.type} doesn't match blockContent or bnBlock group`
    );
  }
}

var Oe = Object.defineProperty;
var De$2 = (e, t, n) => t in e ? Oe(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var C = (e, t, n) => De$2(e, typeof t != "symbol" ? t + "" : t, n);
const ct$2 = () => typeof navigator < "u" && (/Mac/.test(navigator.platform) || /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent));
function M$1(e, t = "Ctrl") {
  return ct$2() ? e.replace("Mod", "⌘") : e.replace("Mod", t);
}
function I$1(...e) {
  return [
    // Converts to & from set to remove duplicates.
    ...new Set(
      e.filter((t) => t).join(" ").split(" ")
    )
  ].join(" ");
}
const eo = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
function it$2(e, t, n, o) {
  const r = document.createElement("div");
  r.className = I$1(
    "bn-block-content",
    n.class
  ), r.setAttribute("data-content-type", e);
  for (const [s, c] of Object.entries(n))
    s !== "class" && r.setAttribute(s, c);
  const a = document.createElement(t);
  a.className = I$1(
    "bn-inline-content",
    o.class
  );
  for (const [s, c] of Object.entries(
    o
  ))
    s !== "class" && a.setAttribute(s, c);
  return r.appendChild(a), {
    dom: r,
    contentDOM: a
  };
}
const re = (e, t) => {
  let n = bt$2(e, t.pmSchema);
  n.type.name === "blockContainer" && (n = n.firstChild);
  const o = t.pmSchema.nodes[n.type.name].spec.toDOM;
  if (o === void 0)
    throw new Error(
      "This block has no default HTML serialization as its corresponding TipTap node doesn't implement `renderHTML`."
    );
  const r = o(n);
  if (typeof r != "object" || !("dom" in r))
    throw new Error(
      "Cannot use this block's default HTML serialization as its corresponding TipTap node's `renderHTML` function does not return an object with the `dom` property."
    );
  return r;
};
function lt$2(e, t = "<br>") {
  const n = e.querySelectorAll("p");
  if (n.length > 1) {
    const o = n[0];
    for (let r = 1; r < n.length; r++) {
      const a = n[r];
      o.innerHTML += t + a.innerHTML, a.remove();
    }
  }
}
function V$1(e) {
  return "data-" + e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function to(e) {
  const t = e.split("/");
  return !t.length || // invalid?
  t[t.length - 1] === "" ? e : t[t.length - 1];
}
function no(e) {
  var n;
  const t = [
    "mp4",
    "webm",
    "ogg",
    "mov",
    "mkv",
    "flv",
    "avi",
    "wmv",
    "m4v"
  ];
  try {
    const r = ((n = new URL(e).pathname.split(".").pop()) == null ? void 0 : n.toLowerCase()) || "";
    return t.includes(r);
  } catch {
    return false;
  }
}
function dt$2(e) {
  const t = {};
  return Object.entries(e).forEach(([n, o]) => {
    t[n] = {
      default: o.default,
      keepOnSplit: true,
      // Props are displayed in kebab-case as HTML attributes. If a prop's
      // value is the same as its default, we don't display an HTML
      // attribute for it.
      parseHTML: (r) => {
        const a = r.getAttribute(V$1(n));
        if (a === null)
          return null;
        if (o.default === void 0 && o.type === "boolean" || o.default !== void 0 && typeof o.default == "boolean")
          return a === "true" ? true : a === "false" ? false : null;
        if (o.default === void 0 && o.type === "number" || o.default !== void 0 && typeof o.default == "number") {
          const s = parseFloat(a);
          return !Number.isNaN(s) && Number.isFinite(s) ? s : null;
        }
        return a;
      },
      renderHTML: (r) => r[n] !== o.default ? {
        [V$1(n)]: r[n]
      } : {}
    };
  }), t;
}
function ut$1(e, t, n, o) {
  const r = e();
  if (r === void 0)
    throw new Error("Cannot find node position");
  const s = n.state.doc.resolve(r).node().attrs.id;
  if (!s)
    throw new Error("Block doesn't have id");
  const c = t.getBlock(s);
  if (c.type !== o)
    throw new Error("Block type does not match");
  return c;
}
function G$1(e, t, n, o, r = false, a) {
  const s = document.createElement("div");
  if (a !== void 0)
    for (const [c, l] of Object.entries(a))
      c !== "class" && s.setAttribute(c, l);
  s.className = I$1(
    "bn-block-content",
    (a == null ? void 0 : a.class) || ""
  ), s.setAttribute("data-content-type", t);
  for (const [c, l] of Object.entries(n)) {
    const u = o[c].default;
    l !== u && s.setAttribute(V$1(c), l);
  }
  return r && s.setAttribute("data-file-block", ""), s.appendChild(e.dom), e.contentDOM && (e.contentDOM.className = I$1(
    "bn-inline-content",
    e.contentDOM.className
  )), {
    ...e,
    dom: s
  };
}
function pt$1(e, t, n) {
  return {
    config: {
      type: e.type,
      content: e.content,
      propSchema: t
    },
    implementation: {
      node: e.node,
      render: re,
      toExternalHTML: re
    },
    extensions: n
  };
}
function ft$1(e, t) {
  e.stopEvent = (n) => (n.type === "mousedown" && setTimeout(() => {
    t.view.dom.blur();
  }, 10), true);
}
function mt$1(e, t) {
  const n = [
    {
      tag: "[data-content-type=" + e.type + "]",
      contentElement: ".bn-inline-content"
    }
  ];
  return t.parse && n.push({
    tag: "*",
    getAttrs(o) {
      var a;
      if (typeof o == "string")
        return false;
      const r = (a = t.parse) == null ? void 0 : a.call(t, o);
      return r === void 0 ? false : r;
    },
    getContent: e.content === "inline" || e.content === "none" ? (o, r) => {
      var a;
      if (t.parseContent)
        return t.parseContent({
          el: o,
          schema: r
        });
      if (e.content === "inline") {
        const c = o.cloneNode(true);
        return lt$2(
          c,
          (a = t.meta) != null && a.code ? `
` : "<br>"
        ), DOMParser.fromSchema(r).parse(c, {
          topNode: r.nodes.paragraph.create()
        }).content;
      }
      return Fragment.empty;
    } : void 0
  }), n;
}
function ht$2(e, t, n, o) {
  var a, s, c, l;
  const r = t.node || Node3.create({
    name: e.type,
    content: e.content === "inline" ? "inline*" : e.content === "none" ? "" : e.content,
    group: "blockContent",
    selectable: ((a = t.meta) == null ? void 0 : a.selectable) ?? true,
    isolating: ((s = t.meta) == null ? void 0 : s.isolating) ?? true,
    code: ((c = t.meta) == null ? void 0 : c.code) ?? false,
    defining: ((l = t.meta) == null ? void 0 : l.defining) ?? true,
    priority: o,
    addAttributes() {
      return dt$2(e.propSchema);
    },
    parseHTML() {
      return mt$1(e, t);
    },
    renderHTML({ HTMLAttributes: i }) {
      var d;
      const u = document.createElement("div");
      return G$1(
        {
          dom: u,
          contentDOM: e.content === "inline" ? u : void 0
        },
        e.type,
        {},
        e.propSchema,
        ((d = t.meta) == null ? void 0 : d.fileBlockAccept) !== void 0,
        i
      );
    },
    addNodeView() {
      return (i) => {
        var f, S;
        const u = this.options.editor, d = ut$1(
          i.getPos,
          u,
          this.editor,
          e.type
        ), p = ((f = this.options.domAttributes) == null ? void 0 : f.blockContent) || {}, h = t.render.call(
          { blockContentDOMAttributes: p, props: i, renderType: "nodeView" },
          d,
          u
        );
        return ((S = t.meta) == null ? void 0 : S.selectable) === false && ft$1(h, this.editor), h;
      };
    }
  });
  if (r.name !== e.type)
    throw new Error(
      "Node name does not match block type. This is a bug in BlockNote."
    );
  return {
    config: e,
    implementation: {
      ...t,
      node: r,
      render(i, u) {
        var p;
        const d = ((p = r.options.domAttributes) == null ? void 0 : p.blockContent) || {};
        return t.render.call(
          {
            blockContentDOMAttributes: d,
            props: void 0,
            renderType: "dom"
          },
          i,
          u
        );
      },
      // TODO: this should not have wrapInBlockStructure and generally be a lot simpler
      // post-processing in externalHTMLExporter should not be necessary
      toExternalHTML: (i, u) => {
        var p, h;
        const d = ((p = r.options.domAttributes) == null ? void 0 : p.blockContent) || {};
        return ((h = t.toExternalHTML) == null ? void 0 : h.call(
          { blockContentDOMAttributes: d },
          i,
          u
        )) ?? t.render.call(
          { blockContentDOMAttributes: d, renderType: "dom", props: void 0 },
          i,
          u
        );
      }
    },
    extensions: n
  };
}
function v(e, t, n) {
  return (o = {}) => {
    const r = typeof e == "function" ? e(o) : e, a = typeof t == "function" ? t(o) : t, s = n ? typeof n == "function" ? n(o) : n : void 0;
    return {
      config: r,
      implementation: {
        ...a,
        // TODO: this should not have wrapInBlockStructure and generally be a lot simpler
        // post-processing in externalHTMLExporter should not be necessary
        toExternalHTML(c, l) {
          var u, d;
          const i = (u = a.toExternalHTML) == null ? void 0 : u.call(
            { blockContentDOMAttributes: this.blockContentDOMAttributes },
            c,
            l
          );
          if (i !== void 0)
            return G$1(
              i,
              c.type,
              c.props,
              r.propSchema,
              ((d = a.meta) == null ? void 0 : d.fileBlockAccept) !== void 0
            );
        },
        render(c, l) {
          var d;
          const i = a.render.call(
            {
              blockContentDOMAttributes: this.blockContentDOMAttributes,
              renderType: this.renderType,
              props: this.props
            },
            c,
            l
          );
          return G$1(
            i,
            c.type,
            c.props,
            r.propSchema,
            ((d = a.meta) == null ? void 0 : d.fileBlockAccept) !== void 0,
            this.blockContentDOMAttributes
          );
        }
      },
      extensions: s
    };
  };
}
function ro(e, t, n, o) {
  return e.dom.setAttribute("data-inline-content-type", t), Object.entries(n).filter(([r, a]) => {
    const s = o[r];
    return a !== s.default;
  }).map(([r, a]) => [V$1(r), a]).forEach(([r, a]) => e.dom.setAttribute(r, a)), e.contentDOM && e.contentDOM.setAttribute("data-editable", ""), e;
}
function ao(e) {
  return {
    Backspace: ({ editor: t }) => {
      const n = t.state.selection.$from;
      return t.state.selection.empty && n.node().type.name === e.type && n.parentOffset === 0;
    }
  };
}
function gt$1(e, t) {
  return {
    config: e,
    implementation: t
  };
}
function ye(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [t, n.config])
  );
}
function bt$1(e) {
  return e === "boolean" ? {} : {
    stringValue: {
      default: void 0,
      keepOnSplit: true,
      parseHTML: (t) => t.getAttribute("data-value"),
      renderHTML: (t) => t.stringValue !== void 0 ? {
        "data-value": t.stringValue
      } : {}
    }
  };
}
function _$1(e, t, n, o) {
  return e.dom.setAttribute("data-style-type", t), o === "string" && e.dom.setAttribute("data-value", n), e.contentDOM && e.contentDOM.setAttribute("data-editable", ""), e;
}
function ve(e, t) {
  return {
    config: e,
    implementation: t
  };
}
function H$1(e, t) {
  return ve(
    {
      type: e.name,
      propSchema: t
    },
    {
      mark: e,
      render(n, o) {
        const r = o.pmSchema.marks[e.name].spec.toDOM;
        if (r === void 0)
          throw new Error(
            "This block has no default HTML serialization as its corresponding TipTap node doesn't implement `renderHTML`."
          );
        const a = o.pmSchema.mark(e.name, {
          stringValue: n
        }), s = DOMSerializer.renderSpec(
          document,
          r(a, true)
        );
        if (typeof s != "object" || !("dom" in s))
          throw new Error(
            "Cannot use this block's default HTML serialization as its corresponding TipTap mark's `renderHTML` function does not return an object with the `dom` property."
          );
        return s;
      },
      toExternalHTML(n, o) {
        const r = o.pmSchema.marks[e.name].spec.toDOM;
        if (r === void 0)
          throw new Error(
            "This block has no default HTML serialization as its corresponding TipTap node doesn't implement `renderHTML`."
          );
        const a = o.pmSchema.mark(e.name, {
          stringValue: n
        }), s = DOMSerializer.renderSpec(
          document,
          r(a, true)
        );
        if (typeof s != "object" || !("dom" in s))
          throw new Error(
            "Cannot use this block's default HTML serialization as its corresponding TipTap mark's `renderHTML` function does not return an object with the `dom` property."
          );
        return s;
      }
    }
  );
}
function Se(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => [t, n.config])
  );
}
function kt$1(e, t) {
  const n = [
    {
      tag: `[data-style-type="${e.type}"]`,
      contentElement: (o) => {
        const r = o;
        return r.matches("[data-editable]") ? r : r.querySelector("[data-editable]") || r;
      }
    }
  ];
  return t && n.push({
    tag: "*",
    // By default, styles can overlap each other, so the rules should not
    // completely consume the element they parse (which can have multiple
    // styles).
    consuming: false,
    getAttrs(o) {
      if (typeof o == "string")
        return false;
      const r = t == null ? void 0 : t(o);
      return r === void 0 ? false : { stringValue: r };
    }
  }), n;
}
function Ee$2(e, t) {
  const n = Mark.create({
    name: e.type,
    addAttributes() {
      return bt$1(e.propSchema);
    },
    parseHTML() {
      return kt$1(e, t.parse);
    },
    renderHTML({ mark: o }) {
      const r = (t.toExternalHTML || t.render)(o.attrs.stringValue);
      return _$1(
        r,
        e.type,
        o.attrs.stringValue,
        e.propSchema
      );
    },
    addMarkView() {
      return ({ mark: o }) => {
        const r = t.render(o.attrs.stringValue);
        return _$1(
          r,
          e.type,
          o.attrs.stringValue,
          e.propSchema
        );
      };
    }
  });
  return ve(e, {
    ...t,
    mark: n,
    render: (o) => {
      const r = t.render(o);
      return _$1(
        r,
        e.type,
        o,
        e.propSchema
      );
    },
    toExternalHTML: (o) => {
      const r = (t.toExternalHTML || t.render)(o);
      return _$1(
        r,
        e.type,
        o,
        e.propSchema
      );
    }
  });
}
function Ct$1(e) {
  const t = vt$1(e);
  let { roots: n, nonRoots: o } = ae(t);
  const r = [];
  for (; n.size; ) {
    r.push(n);
    const a = /* @__PURE__ */ new Set();
    for (const s of n) {
      const c = e.get(s);
      if (c)
        for (const l of c) {
          const i = t.get(l);
          if (i === void 0)
            continue;
          const u = i - 1;
          t.set(l, u), u === 0 && a.add(l);
        }
    }
    n = a;
  }
  if (o = ae(t).nonRoots, o.size)
    throw new Error(
      `Cycle(s) detected; toposort only works on acyclic graphs. Cyclic nodes: ${Array.from(o).join(", ")}`
    );
  return r;
}
function yt$1(e) {
  const t = St$2(e);
  return Ct$1(t);
}
function vt$1(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, o] of e.entries()) {
    t.has(n) || t.set(n, 0);
    for (const r of o) {
      const a = t.get(r) ?? 0;
      t.set(r, a + 1);
    }
  }
  return t;
}
function ae(e) {
  const t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
  for (const [o, r] of e.entries())
    r === 0 ? t.add(o) : n.add(o);
  return { roots: t, nonRoots: n };
}
function St$2(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, o] of e.entries()) {
    t.has(n) || t.set(n, /* @__PURE__ */ new Set());
    for (const r of o)
      t.has(r) || t.set(r, /* @__PURE__ */ new Set()), t.get(r).add(n);
  }
  return t;
}
function Et$1() {
  return /* @__PURE__ */ new Map();
}
function se$1(e) {
  return e && Object.fromEntries(
    Object.entries(e).filter(([, t]) => t !== void 0)
  );
}
let wt$1 = class wt {
  constructor(t) {
    C(this, "BlockNoteEditor", "only for types");
    C(this, "Block", "only for types");
    C(this, "PartialBlock", "only for types");
    C(this, "inlineContentSpecs");
    C(this, "styleSpecs");
    C(this, "blockSpecs");
    C(this, "blockSchema");
    C(this, "inlineContentSchema");
    C(this, "styleSchema");
    this.opts = t;
    const {
      blockSpecs: n,
      inlineContentSpecs: o,
      styleSpecs: r,
      blockSchema: a,
      inlineContentSchema: s,
      styleSchema: c
    } = this.init();
    this.blockSpecs = n, this.styleSpecs = r, this.styleSchema = c, this.inlineContentSpecs = o, this.blockSchema = a, this.inlineContentSchema = s;
  }
  init() {
    var i;
    const t = Et$1(), n = /* @__PURE__ */ new Set();
    t.set("default", n);
    for (const [u, d] of Object.entries({
      ...this.opts.blockSpecs,
      ...this.opts.inlineContentSpecs,
      ...this.opts.styleSpecs
    }))
      (i = d.implementation) != null && i.runsBefore ? t.set(u, new Set(d.implementation.runsBefore)) : n.add(u);
    const o = yt$1(t), r = o.findIndex((u) => u.has("default")), a = (u) => 91 + (o.findIndex((p) => p.has(u)) + r) * 10, s = Object.fromEntries(
      Object.entries(this.opts.blockSpecs).map(([u, d]) => [
        u,
        ht$2(
          d.config,
          d.implementation,
          d.extensions,
          a(u)
        )
      ])
    ), c = Object.fromEntries(
      Object.entries(this.opts.inlineContentSpecs).map(
        ([u, d]) => {
          var p;
          return typeof d.config != "object" ? [u, d] : [
            u,
            {
              ...d,
              implementation: {
                ...d.implementation,
                node: (p = d.implementation) == null ? void 0 : p.node.extend({
                  priority: a(u)
                })
              }
            }
          ];
        }
      )
    ), l = Object.fromEntries(
      Object.entries(this.opts.styleSpecs).map(([u, d]) => {
        var p;
        return [
          u,
          {
            ...d,
            implementation: {
              ...d.implementation,
              mark: (p = d.implementation) == null ? void 0 : p.mark.extend({
                priority: a(u)
              })
            }
          }
        ];
      })
    );
    return {
      blockSpecs: s,
      blockSchema: Object.fromEntries(
        Object.entries(s).map(([u, d]) => [u, d.config])
      ),
      inlineContentSpecs: se$1(c),
      styleSpecs: se$1(l),
      inlineContentSchema: ye(
        c
      ),
      styleSchema: Se(l)
    };
  }
  /**
   * Adds additional block specs to the current schema in a builder pattern.
   * This method allows extending the schema after it has been created.
   *
   * @param additionalBlockSpecs - Additional block specs to add to the schema
   * @returns The current schema instance for chaining
   */
  extend(t) {
    Object.assign(this.opts.blockSpecs, t.blockSpecs), Object.assign(this.opts.inlineContentSpecs, t.inlineContentSpecs), Object.assign(this.opts.styleSpecs, t.styleSpecs);
    const {
      blockSpecs: n,
      inlineContentSpecs: o,
      styleSpecs: r,
      blockSchema: a,
      inlineContentSchema: s,
      styleSchema: c
    } = this.init();
    return this.blockSpecs = n, this.styleSpecs = r, this.styleSchema = c, this.inlineContentSpecs = o, this.blockSchema = a, this.inlineContentSchema = s, this;
  }
};
function xt$2(e, t) {
  let n, o;
  if (t.firstChild.descendants((r, a) => n ? false : !Lt$1(r) || r.attrs.id !== e ? true : (n = r, o = a + 1, false)), !(n === void 0 || o === void 0))
    return {
      node: n,
      posBeforeNode: o
    };
}
function Lt$1(e) {
  return e.type.isInGroup("bnBlock");
}
const co = (e, t) => ({
  tr: n,
  dispatch: o
}) => (o && q(n, e, t), true);
function q(e, t, n, o, r) {
  const a = It$2(e.doc.resolve(t));
  let s = null;
  a.blockNoteType === "table" && (s = Bt$1(e));
  const c = ht$3(e);
  const l = c.nodes[a.blockNoteType], i = c.nodes[n.type || a.blockNoteType], u = i.isInGroup("bnBlock") ? i : c.nodes.blockContainer;
  if (a.isBlockContainer && i.isInGroup("blockContent")) {
    ce$1(n, e, a), Mt$1(
      n,
      e,
      l,
      i,
      a);
  } else if (!a.isBlockContainer && i.isInGroup("bnBlock"))
    ce$1(n, e, a);
  else {
    const d = L(a.bnBlock.node, c);
    e.replaceWith(
      a.bnBlock.beforePos,
      a.bnBlock.afterPos,
      bt$2(
        {
          children: d.children,
          // if no children are passed in, use existing children
          ...n
        },
        c
      )
    );
    return;
  }
  e.setNodeMarkup(a.bnBlock.beforePos, u, {
    ...a.bnBlock.node.attrs,
    ...n.props
  }), s && Tt$2(e, a, s);
}
function Mt$1(e, t, n, o, r, a, s) {
  const c = ht$3(t);
  let l = "keep";
  if (e.content)
    if (typeof e.content == "string")
      l = T$1(
        [e.content],
        c,
        o.name
      );
    else if (Array.isArray(e.content))
      l = T$1(e.content, c, o.name);
    else if (e.content.type === "tableContent")
      l = kt$2(e.content, c);
    else
      throw new O$1(e.content.type);
  else
    n.spec.content === "" || o.spec.content !== n.spec.content && (l = []);
  if (l === "keep")
    t.setNodeMarkup(r.blockContent.beforePos, o, {
      ...r.blockContent.node.attrs,
      ...e.props
    });
  else t.replaceWith(
      r.blockContent.beforePos,
      r.blockContent.afterPos,
      o.createChecked(
        {
          ...r.blockContent.node.attrs,
          ...e.props
        },
        l
      )
    );
}
function ce$1(e, t, n) {
  const o = ht$3(t);
  if (e.children !== void 0 && e.children.length > 0) {
    const r = e.children.map((a) => bt$2(a, o));
    if (n.childContainer)
      t.step(
        new ReplaceStep(
          n.childContainer.beforePos + 1,
          n.childContainer.afterPos - 1,
          new Slice(Fragment.from(r), 0, 0)
        )
      );
    else {
      if (!n.isBlockContainer)
        throw new Error("impossible");
      t.insert(
        n.blockContent.afterPos,
        o.nodes.blockGroup.createChecked({}, r)
      );
    }
  }
}
function io(e, t, n, o, r) {
  const a = typeof t == "string" ? t : t.id, s = xt$2(a, e.doc);
  if (!s)
    throw new Error(`Block with ID ${a} not found`);
  q(
    e,
    s.posBeforeNode,
    n);
  const c = e.doc.resolve(s.posBeforeNode + 1).node(), l = ht$3(e);
  return L(c, l);
}
function Bt$1(e) {
  const t = "selection" in e ? e.selection : null;
  if (!(t instanceof TextSelection))
    return null;
  const n = e.doc.resolve(t.head);
  let o = -1, r = -1;
  for (let x = n.depth; x >= 0; x--) {
    const E = n.node(x).type.name;
    if (o < 0 && (E === "tableCell" || E === "tableHeader") && (o = x), E === "table") {
      r = x;
      break;
    }
  }
  if (o < 0 || r < 0)
    return null;
  const a = n.before(o), s = n.before(r), c = e.doc.nodeAt(s);
  if (!c || c.type.name !== "table")
    return null;
  const l = TableMap.get(c), i = a - (s + 1), u = l.map.indexOf(i);
  if (u < 0)
    return null;
  const d = Math.floor(u / l.width), p = u % l.width, f = a + 1 + 1, S = Math.max(0, t.head - f);
  return { row: d, col: p, offset: S };
}
function Tt$2(e, t, n) {
  var x;
  if (t.blockNoteType !== "table")
    return false;
  let o = -1;
  if (t.isBlockContainer)
    o = e.mapping.map(t.blockContent.beforePos);
  else {
    const E = e.mapping.map(t.bnBlock.beforePos), A = E + (((x = e.doc.nodeAt(E)) == null ? void 0 : x.nodeSize) || 0);
    e.doc.nodesBetween(E, A, (g, L) => g.type.name === "table" ? (o = L, false) : true);
  }
  const r = o >= 0 ? e.doc.nodeAt(o) : null;
  if (!r || r.type.name !== "table")
    return false;
  const a = TableMap.get(r), s = Math.max(0, Math.min(n.row, a.height - 1)), c = Math.max(0, Math.min(n.col, a.width - 1)), l = s * a.width + c, i = a.map[l];
  if (i == null)
    return false;
  const d = o + 1 + i + 1, p = e.doc.nodeAt(d), h = d + 1, f = p ? p.content.size : 0, S = h + Math.max(0, Math.min(n.offset, f));
  return "selection" in e && e.setSelection(TextSelection.create(e.doc, S)), true;
}
const B = {
  gray: {
    text: "#9b9a97",
    background: "#ebeced"
  },
  brown: {
    text: "#64473a",
    background: "#e9e5e3"
  },
  red: {
    text: "#e03e3e",
    background: "#fbe4e4"
  },
  orange: {
    text: "#d9730d",
    background: "#f6e9d9"
  },
  yellow: {
    text: "#dfab01",
    background: "#fbf3db"
  },
  green: {
    text: "#4d6461",
    background: "#ddedea"
  },
  blue: {
    text: "#0b6e99",
    background: "#ddebf1"
  },
  purple: {
    text: "#6940a5",
    background: "#eae4f2"
  },
  pink: {
    text: "#ad1a72",
    background: "#f4dfeb"
  }
}, m = {
  backgroundColor: {
    default: "default"
  },
  textColor: {
    default: "default"
  },
  textAlignment: {
    default: "left",
    values: ["left", "center", "right", "justify"]
  }
}, y = (e) => {
  const t = {};
  return e.hasAttribute("data-background-color") ? t.backgroundColor = e.getAttribute("data-background-color") : e.style.backgroundColor && (t.backgroundColor = e.style.backgroundColor), e.hasAttribute("data-text-color") ? t.textColor = e.getAttribute("data-text-color") : e.style.color && (t.textColor = e.style.color), t.textAlignment = m.textAlignment.values.includes(
    e.style.textAlign
  ) ? e.style.textAlign : void 0, t;
}, T = (e, t) => {
  e.backgroundColor && e.backgroundColor !== m.backgroundColor.default && (t.style.backgroundColor = e.backgroundColor in B ? B[e.backgroundColor].background : e.backgroundColor), e.textColor && e.textColor !== m.textColor.default && (t.style.color = e.textColor in B ? B[e.textColor].text : e.textColor), e.textAlignment && e.textAlignment !== m.textAlignment.default && (t.style.textAlign = e.textAlignment);
}, uo = (e = "backgroundColor") => ({
  default: m.backgroundColor.default,
  parseHTML: (t) => t.hasAttribute("data-background-color") ? t.getAttribute("data-background-color") : t.style.backgroundColor ? t.style.backgroundColor : m.backgroundColor.default,
  renderHTML: (t) => t[e] === m.backgroundColor.default ? {} : {
    "data-background-color": t[e]
  }
}), po = (e = "textColor") => ({
  default: m.textColor.default,
  parseHTML: (t) => t.hasAttribute("data-text-color") ? t.getAttribute("data-text-color") : t.style.color ? t.style.color : m.textColor.default,
  renderHTML: (t) => t[e] === m.textColor.default ? {} : {
    "data-text-color": t[e]
  }
}), W = (e, t) => {
  const n = e.querySelector(
    t
  );
  if (!n)
    return;
  const o = e.querySelector("figcaption"), r = (o == null ? void 0 : o.textContent) ?? void 0;
  return { targetElement: n, caption: r };
}, At$1 = (e, t, n) => {
  const o = document.createElement("div");
  o.className = "bn-add-file-button";
  const r = document.createElement("div");
  r.className = "bn-add-file-button-icon", n ? r.appendChild(n) : r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8ZM10 4V9H5V20H19V4H10Z"></path></svg>', o.appendChild(r);
  const a = document.createElement("p");
  a.className = "bn-add-file-button-text", a.innerHTML = e.type in t.dictionary.file_blocks.add_button_text ? t.dictionary.file_blocks.add_button_text[e.type] : t.dictionary.file_blocks.add_button_text.file, o.appendChild(a);
  const s = (l) => {
    l.preventDefault();
  }, c = () => {
    t.transact(
      (l) => l.setMeta(t.filePanel.plugins[0], {
        block: e
      })
    );
  };
  return o.addEventListener(
    "mousedown",
    s,
    true
  ), o.addEventListener("click", c, true), {
    dom: o,
    destroy: () => {
      o.removeEventListener(
        "mousedown",
        s,
        true
      ), o.removeEventListener(
        "click",
        c,
        true
      );
    }
  };
}, Nt$2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8ZM10 4V9H5V20H19V4H10Z"></path></svg>', Ht$1 = (e) => {
  const t = document.createElement("div");
  t.className = "bn-file-name-with-icon";
  const n = document.createElement("div");
  n.className = "bn-file-icon", n.innerHTML = Nt$2, t.appendChild(n);
  const o = document.createElement("p");
  return o.className = "bn-file-name", o.textContent = e.props.name, t.appendChild(o), {
    dom: t
  };
}, X = (e, t, n, o) => {
  const r = document.createElement("div");
  if (r.className = "bn-file-block-content-wrapper", e.props.url === "") {
    const s = At$1(e, t, o);
    r.appendChild(s.dom);
    const c = t.onUploadStart((l) => {
      if (l === e.id) {
        r.removeChild(s.dom);
        const i = document.createElement("div");
        i.className = "bn-file-loading-preview", i.textContent = "Loading...", r.appendChild(i);
      }
    });
    return {
      dom: r,
      destroy: () => {
        c(), s.destroy();
      }
    };
  }
  const a = { dom: r };
  if (e.props.showPreview === false || !n) {
    const s = Ht$1(e);
    r.appendChild(s.dom), a.destroy = () => {
      var c;
      (c = s.destroy) == null || c.call(s);
    };
  } else
    r.appendChild(n.dom);
  if (e.props.caption) {
    const s = document.createElement("p");
    s.className = "bn-file-caption", s.textContent = e.props.caption, r.appendChild(s);
  }
  return a;
}, K$1 = (e, t) => {
  const n = document.createElement("figure"), o = document.createElement("figcaption");
  return o.textContent = t, n.appendChild(e), n.appendChild(o), { dom: n };
}, F$1 = (e, t) => {
  const n = document.createElement("div"), o = document.createElement("p");
  return o.textContent = t, n.appendChild(e), n.appendChild(o), {
    dom: n
  };
}, ie = (e) => ({ url: e.src || void 0 }), It$1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path></svg>', Pt$2 = (e) => ({
  type: "audio",
  propSchema: {
    backgroundColor: m.backgroundColor,
    // File name.
    name: {
      default: ""
    },
    // File url.
    url: {
      default: ""
    },
    // File caption.
    caption: {
      default: ""
    },
    showPreview: {
      default: true
    }
  },
  content: "none"
}), Ot$1 = (e = {}) => (t) => {
  if (t.tagName === "AUDIO") {
    if (t.closest("figure"))
      return;
    const { backgroundColor: n } = y(t);
    return {
      ...ie(t),
      backgroundColor: n
    };
  }
  if (t.tagName === "FIGURE") {
    const n = W(t, "audio");
    if (!n)
      return;
    const { targetElement: o, caption: r } = n, { backgroundColor: a } = y(t);
    return {
      ...ie(o),
      backgroundColor: a,
      caption: r
    };
  }
}, Dt$1 = (e = {}) => (t, n) => {
  const o = document.createElement("div");
  o.innerHTML = e.icon ?? It$1;
  const r = document.createElement("audio");
  return r.className = "bn-audio", n.resolveFileUrl ? n.resolveFileUrl(t.props.url).then((a) => {
    r.src = a;
  }) : r.src = t.props.url, r.controls = true, r.contentEditable = "false", r.draggable = false, X(
    t,
    n,
    { dom: r },
    o.firstElementChild
  );
}, _t$1 = (e = {}) => (t, n) => {
  if (!t.props.url) {
    const r = document.createElement("p");
    return r.textContent = "Add audio", {
      dom: r
    };
  }
  let o;
  return t.props.showPreview ? (o = document.createElement("audio"), o.src = t.props.url) : (o = document.createElement("a"), o.href = t.props.url, o.textContent = t.props.name || t.props.url), t.props.caption ? t.props.showPreview ? K$1(o, t.props.caption) : F$1(o, t.props.caption) : {
    dom: o
  };
}, Vt$1 = v(
  Pt$2,
  (e) => ({
    meta: {
      fileBlockAccept: ["audio/*"]
    },
    parse: Ot$1(e),
    render: Dt$1(e),
    toExternalHTML: _t$1(e),
    runsBefore: ["file"]
  })
);
let Rt$1 = class Rt {
  constructor() {
    C(this, "callbacks", {});
  }
  on(t, n) {
    return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(n), () => this.off(t, n);
  }
  emit(t, ...n) {
    const o = this.callbacks[t];
    o && o.forEach((r) => r.apply(this, n));
  }
  off(t, n) {
    const o = this.callbacks[t];
    o && (n ? this.callbacks[t] = o.filter((r) => r !== n) : delete this.callbacks[t]);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
};
class Wt extends Rt$1 {
  // eslint-disable-next-line
  constructor(...n) {
    super();
    C(this, "plugins", []);
    C(this, "inputRules");
    C(this, "keyboardShortcuts");
    C(this, "tiptapExtensions");
  }
  static key() {
    throw new Error("You must implement the key method in your extension");
  }
  addProsemirrorPlugin(n) {
    this.plugins.push(n);
  }
  get priority() {
  }
}
function w(e) {
  const t = Object.create(Wt.prototype);
  return t.key = e.key, t.inputRules = e.inputRules, t.keyboardShortcuts = e.keyboardShortcuts, t.plugins = e.plugins ?? [], t.tiptapExtensions = e.tiptapExtensions, t;
}
const le$1 = Symbol.for("blocknote.shikiParser"), U = Symbol.for(
  "blocknote.shikiHighlighterPromise"
);
function Ft$2(e) {
  const t = globalThis;
  let n, o;
  return createHighlightPlugin({
    parser: (s) => {
      if (!e.createHighlighter)
        return [];
      if (!n)
        return t[U] = t[U] || e.createHighlighter(), t[U].then(
          (l) => {
            n = l;
          }
        );
      const c = we(e, s.language);
      return !c || c === "text" || c === "none" || c === "plaintext" || c === "txt" ? [] : n.getLoadedLanguages().includes(c) ? (o || (o = t[le$1] || createParser(n), t[le$1] = o), o(s)) : n.loadLanguage(c);
    },
    languageExtractor: (s) => s.attrs.language,
    nodeTypes: ["codeBlock"]
  });
}
const jt$1 = ({ defaultLanguage: e = "text" }) => ({
  type: "codeBlock",
  propSchema: {
    language: {
      default: e
    }
  },
  content: "inline"
}), Ut$1 = v(
  jt$1,
  (e) => ({
    meta: {
      code: true,
      defining: true,
      isolating: false
    },
    parse: (t) => {
      var r, a;
      if (t.tagName !== "PRE" || t.childElementCount !== 1 || ((r = t.firstElementChild) == null ? void 0 : r.tagName) !== "CODE")
        return;
      const n = t.firstElementChild;
      return { language: n.getAttribute("data-language") || ((a = n.className.split(" ").find((s) => s.includes("language-"))) == null ? void 0 : a.replace("language-", "")) };
    },
    parseContent: ({ el: t, schema: n }) => {
      const o = DOMParser.fromSchema(n), r = t.firstElementChild;
      return o.parse(r, {
        preserveWhitespace: "full",
        topNode: n.nodes.codeBlock.create()
      }).content;
    },
    render(t, n) {
      const o = document.createDocumentFragment(), r = document.createElement("pre"), a = document.createElement("code");
      r.appendChild(a);
      let s;
      if (e.supportedLanguages) {
        const c = document.createElement("select");
        Object.entries(e.supportedLanguages ?? {}).forEach(
          ([u, { name: d }]) => {
            const p = document.createElement("option");
            p.value = u, p.text = d, c.appendChild(p);
          }
        ), c.value = t.props.language || e.defaultLanguage || "text";
        const l = (u) => {
          const d = u.target.value;
          n.updateBlock(t.id, { props: { language: d } });
        };
        c.addEventListener("change", l), s = () => c.removeEventListener("change", l);
        const i = document.createElement("div");
        i.contentEditable = "false", i.appendChild(c), o.appendChild(i);
      }
      return o.appendChild(r), {
        dom: o,
        contentDOM: a,
        destroy: () => {
          s == null || s();
        }
      };
    },
    toExternalHTML(t) {
      const n = document.createElement("pre"), o = document.createElement("code");
      return o.className = `language-${t.props.language}`, o.dataset.language = t.props.language, n.appendChild(o), {
        dom: n,
        contentDOM: o
      };
    }
  }),
  (e) => [
    w({
      key: "code-block-highlighter",
      plugins: [Ft$2(e)]
    }),
    w({
      key: "code-block-keyboard-shortcuts",
      keyboardShortcuts: {
        Delete: ({ editor: t }) => t.transact((n) => {
          const { block: o } = t.getTextCursorPosition();
          if (o.type !== "codeBlock")
            return false;
          const { $from: r } = n.selection;
          return r.parent.textContent ? false : (t.removeBlocks([o]), true);
        }),
        Tab: ({ editor: t }) => e.indentLineWithTab === false ? false : t.transact((n) => {
          const { block: o } = t.getTextCursorPosition();
          return o.type === "codeBlock" ? (n.insertText("  "), true) : false;
        }),
        Enter: ({ editor: t }) => t.transact((n) => {
          const { block: o, nextBlock: r } = t.getTextCursorPosition();
          if (o.type !== "codeBlock")
            return false;
          const { $from: a } = n.selection, s = a.parentOffset === a.parent.nodeSize - 2, c = a.parent.textContent.endsWith(`

`);
          if (s && c) {
            if (n.delete(a.pos - 2, a.pos), r)
              return t.setTextCursorPosition(r, "start"), true;
            const [l] = t.insertBlocks(
              [{ type: "paragraph" }],
              o,
              "after"
            );
            return t.setTextCursorPosition(l, "start"), true;
          }
          return n.insertText(`
`), true;
        }),
        "Shift-Enter": ({ editor: t }) => t.transact(() => {
          const { block: n } = t.getTextCursorPosition();
          if (n.type !== "codeBlock")
            return false;
          const [o] = t.insertBlocks(
            // insert a new paragraph
            [{ type: "paragraph" }],
            n,
            "after"
          );
          return t.setTextCursorPosition(o, "start"), true;
        })
      },
      inputRules: [
        {
          find: /^```(.*?)\s$/,
          replace: ({ match: t }) => {
            const n = t[1].trim();
            return {
              type: "codeBlock",
              props: {
                language: {
                  language: we(e, n) ?? n
                }.language
              },
              content: []
            };
          }
        }
      ]
    })
  ]
);
function we(e, t) {
  var n;
  return (n = Object.entries(e.supportedLanguages ?? {}).find(
    ([o, { aliases: r }]) => (r == null ? void 0 : r.includes(t)) || o === t
  )) == null ? void 0 : n[0];
}
const $t$1 = () => ({
  type: "divider",
  propSchema: {},
  content: "none"
}), Gt$1 = v(
  $t$1,
  {
    meta: {
      isolating: false
    },
    parse(e) {
      if (e.tagName === "HR")
        return {};
    },
    render() {
      return {
        dom: document.createElement("hr")
      };
    }
  },
  [
    w({
      key: "divider-block-shortcuts",
      inputRules: [
        {
          find: new RegExp("^---$"),
          replace() {
            return { type: "divider", props: {}, content: [] };
          }
        }
      ]
    })
  ]
), de$1 = (e) => ({ url: e.src || void 0 }), Zt = () => ({
  type: "file",
  propSchema: {
    backgroundColor: m.backgroundColor,
    // File name.
    name: {
      default: ""
    },
    // File url.
    url: {
      default: ""
    },
    // File caption.
    caption: {
      default: ""
    }
  },
  content: "none"
}), zt$1 = () => (e) => {
  if (e.tagName === "EMBED") {
    if (e.closest("figure"))
      return;
    const { backgroundColor: t } = y(e);
    return {
      ...de$1(e),
      backgroundColor: t
    };
  }
  if (e.tagName === "FIGURE") {
    const t = W(e, "embed");
    if (!t)
      return;
    const { targetElement: n, caption: o } = t, { backgroundColor: r } = y(e);
    return {
      ...de$1(n),
      backgroundColor: r,
      caption: o
    };
  }
}, qt = v(Zt, {
  meta: {
    fileBlockAccept: ["*/*"]
  },
  parse: zt$1(),
  render(e, t) {
    return X(e, t);
  },
  toExternalHTML(e) {
    if (!e.props.url) {
      const n = document.createElement("p");
      return n.textContent = "Add file", {
        dom: n
      };
    }
    const t = document.createElement("a");
    return t.href = e.props.url, t.textContent = e.props.name || e.props.url, e.props.caption ? F$1(t, e.props.caption) : {
      dom: t
    };
  }
}), Xt$1 = {
  set: (e, t) => window.localStorage.setItem(
    `toggle-${e.id}`,
    t ? "true" : "false"
  ),
  get: (e) => window.localStorage.getItem(`toggle-${e.id}`) === "true"
}, xe$1 = (e, t, n, o = Xt$1) => {
  if ("isToggleable" in e.props && !e.props.isToggleable)
    return {
      dom: n
    };
  const r = document.createElement("div"), a = document.createElement("div");
  a.className = "bn-toggle-wrapper";
  const s = document.createElement("button");
  s.className = "bn-toggle-button", s.type = "button", s.innerHTML = // https://fonts.google.com/icons?selected=Material+Symbols+Rounded:chevron_right:FILL@0;wght@700;GRAD@0;opsz@24&icon.query=chevron&icon.style=Rounded&icon.size=24&icon.color=%23e8eaed
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="CURRENTCOLOR"><path d="M320-200v-560l440 280-440 280Z"/></svg>';
  const c = (f) => f.preventDefault();
  s.addEventListener("mousedown", c);
  const l = () => {
    var f;
    a.getAttribute("data-show-children") === "true" ? (a.setAttribute("data-show-children", "false"), o.set(t.getBlock(e), false), r.contains(i) && r.removeChild(i)) : (a.setAttribute("data-show-children", "true"), o.set(t.getBlock(e), true), ((f = t.getBlock(e)) == null ? void 0 : f.children.length) === 0 && !r.contains(i) && r.appendChild(i));
  };
  s.addEventListener("click", l), a.appendChild(s), a.appendChild(n);
  const i = document.createElement("button");
  i.className = "bn-toggle-add-block-button", i.type = "button", i.textContent = t.dictionary.toggle_blocks.add_block_button;
  const u = (f) => f.preventDefault();
  i.addEventListener(
    "mousedown",
    u
  );
  const d = () => {
    t.transact(() => {
      const f = t.updateBlock(e, {
        // Single empty block with default type.
        children: [{}]
      });
      t.setTextCursorPosition(f.children[0].id, "end"), t.focus();
    });
  };
  i.addEventListener("click", d), r.appendChild(a);
  let p = e.children.length;
  const h = t.onChange(() => {
    var S;
    const f = ((S = t.getBlock(e)) == null ? void 0 : S.children.length) ?? 0;
    f > p ? (a.getAttribute("data-show-children") === "false" && (a.setAttribute("data-show-children", "true"), o.set(t.getBlock(e), true)), r.contains(i) && r.removeChild(i)) : f === 0 && f < p && (a.getAttribute("data-show-children") === "true" && (a.setAttribute("data-show-children", "false"), o.set(t.getBlock(e), false)), r.contains(i) && r.removeChild(i)), p = f;
  });
  return o.get(e) ? (a.setAttribute("data-show-children", "true"), e.children.length === 0 && r.appendChild(i)) : a.setAttribute("data-show-children", "false"), {
    dom: r,
    // Prevents re-renders when the toggle button is clicked.
    ignoreMutation: (f) => f instanceof MutationRecord && // We want to prevent re-renders when the view changes, so we ignore
    // all mutations where the `data-show-children` attribute is changed
    // or the "add block" button is added/removed.
    (f.type === "attributes" && f.target === a && f.attributeName === "data-show-children" || f.type === "childList" && (f.addedNodes[0] === i || f.removedNodes[0] === i)),
    destroy: () => {
      s.removeEventListener("mousedown", c), s.removeEventListener("click", l), i.removeEventListener(
        "mousedown",
        u
      ), i.removeEventListener(
        "click",
        d
      ), h == null || h();
    }
  };
}, Le$2 = [1, 2, 3, 4, 5, 6], Kt$1 = ({
  defaultLevel: e = 1,
  levels: t = Le$2,
  allowToggleHeadings: n = true
} = {}) => ({
  type: "heading",
  propSchema: {
    ...m,
    level: { default: e, values: t },
    ...n ? { isToggleable: { default: false, optional: true } } : {}
  },
  content: "inline"
}), Qt = v(
  Kt$1,
  ({ allowToggleHeadings: e = true } = {}) => ({
    meta: {
      isolating: false
    },
    parse(t) {
      let n;
      switch (t.tagName) {
        case "H1":
          n = 1;
          break;
        case "H2":
          n = 2;
          break;
        case "H3":
          n = 3;
          break;
        case "H4":
          n = 4;
          break;
        case "H5":
          n = 5;
          break;
        case "H6":
          n = 6;
          break;
        default:
          return;
      }
      return {
        ...y(t),
        level: n
      };
    },
    render(t, n) {
      const o = document.createElement(`h${t.props.level}`);
      return e ? { ...xe$1(t, n, o), contentDOM: o } : {
        dom: o,
        contentDOM: o
      };
    },
    toExternalHTML(t) {
      const n = document.createElement(`h${t.props.level}`);
      return T(t.props, n), {
        dom: n,
        contentDOM: n
      };
    }
  }),
  ({ levels: e = Le$2 } = {}) => [
    w({
      key: "heading-shortcuts",
      keyboardShortcuts: Object.fromEntries(
        e.map((t) => [
          `Mod-Alt-${t}`,
          ({ editor: n }) => {
            const o = n.getTextCursorPosition();
            return n.schema.blockSchema[o.block.type].content !== "inline" ? false : (n.updateBlock(o.block, {
              type: "heading",
              props: {
                level: t
              }
            }), true);
          }
        ]) ?? []
      ),
      inputRules: e.map((t) => ({
        find: new RegExp(`^(#{${t}})\\s$`),
        replace({ match: n }) {
          return {
            type: "heading",
            props: {
              level: n[1].length
            }
          };
        }
      }))
    })
  ]
), Me = (e, t, n, o, r) => {
  const { dom: a, destroy: s } = X(
    e,
    t,
    n,
    r
  ), c = a;
  c.style.position = "relative", e.props.url && e.props.showPreview && (e.props.previewWidth ? c.style.width = `${e.props.previewWidth}px` : c.style.width = "fit-content");
  const l = document.createElement("div");
  l.className = "bn-resize-handle", l.style.left = "4px";
  const i = document.createElement("div");
  i.className = "bn-resize-handle", i.style.right = "4px";
  const u = document.createElement("div");
  u.style.position = "absolute", u.style.height = "100%", u.style.width = "100%";
  let d, p = e.props.previewWidth;
  const h = (g) => {
    var Y, J;
    if (!d) {
      !t.isEditable && o.contains(l) && o.contains(i) && (o.removeChild(l), o.removeChild(i));
      return;
    }
    let L;
    const D = "touches" in g ? g.touches[0].clientX : g.clientX;
    e.props.textAlignment === "center" ? d.handleUsed === "left" ? L = d.initialWidth + (d.initialClientX - D) * 2 : L = d.initialWidth + (D - d.initialClientX) * 2 : d.handleUsed === "left" ? L = d.initialWidth + d.initialClientX - D : L = d.initialWidth + D - d.initialClientX, p = Math.min(
      Math.max(L, 64),
      ((J = (Y = t.domElement) == null ? void 0 : Y.firstElementChild) == null ? void 0 : J.clientWidth) || Number.MAX_VALUE
    ), c.style.width = `${p}px`;
  }, f = (g) => {
    (!g.target || !c.contains(g.target) || !t.isEditable) && o.contains(l) && o.contains(i) && (o.removeChild(l), o.removeChild(i)), d && (d = void 0, c.contains(u) && c.removeChild(u), t.updateBlock(e, {
      props: {
        previewWidth: p
      }
    }));
  }, S = () => {
    t.isEditable && (o.appendChild(l), o.appendChild(i));
  }, x = (g) => {
    g.relatedTarget === l || g.relatedTarget === i || d || t.isEditable && o.contains(l) && o.contains(i) && (o.removeChild(l), o.removeChild(i));
  }, E = (g) => {
    g.preventDefault(), c.contains(u) || c.appendChild(u);
    const L = "touches" in g ? g.touches[0].clientX : g.clientX;
    d = {
      handleUsed: "left",
      initialWidth: c.clientWidth,
      initialClientX: L
    };
  }, A = (g) => {
    g.preventDefault(), c.contains(u) || c.appendChild(u);
    const L = "touches" in g ? g.touches[0].clientX : g.clientX;
    d = {
      handleUsed: "right",
      initialWidth: c.clientWidth,
      initialClientX: L
    };
  };
  return window.addEventListener("mousemove", h), window.addEventListener("touchmove", h), window.addEventListener("mouseup", f), window.addEventListener("touchend", f), c.addEventListener("mouseenter", S), c.addEventListener("mouseleave", x), l.addEventListener(
    "mousedown",
    E
  ), l.addEventListener(
    "touchstart",
    E
  ), i.addEventListener(
    "mousedown",
    A
  ), i.addEventListener(
    "touchstart",
    A
  ), {
    dom: c,
    destroy: () => {
      s == null || s(), window.removeEventListener("mousemove", h), window.removeEventListener("touchmove", h), window.removeEventListener("mouseup", f), window.removeEventListener("touchend", f), c.removeEventListener("mouseenter", S), c.removeEventListener("mouseleave", x), l.removeEventListener(
        "mousedown",
        E
      ), l.removeEventListener(
        "touchstart",
        E
      ), i.removeEventListener(
        "mousedown",
        A
      ), i.removeEventListener(
        "touchstart",
        A
      );
    }
  };
}, ue = (e) => {
  const t = e.src || void 0, n = e.width || void 0, o = e.alt || void 0;
  return { url: t, previewWidth: n, name: o };
}, Yt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z"></path></svg>', Jt$1 = (e = {}) => ({
  type: "image",
  propSchema: {
    textAlignment: m.textAlignment,
    backgroundColor: m.backgroundColor,
    // File name.
    name: {
      default: ""
    },
    // File url.
    url: {
      default: ""
    },
    // File caption.
    caption: {
      default: ""
    },
    showPreview: {
      default: true
    },
    // File preview width in px.
    previewWidth: {
      default: void 0,
      type: "number"
    }
  },
  content: "none"
}), en = (e = {}) => (t) => {
  if (t.tagName === "IMG") {
    if (t.closest("figure"))
      return;
    const { backgroundColor: n } = y(t);
    return {
      ...ue(t),
      backgroundColor: n
    };
  }
  if (t.tagName === "FIGURE") {
    const n = W(t, "img");
    if (!n)
      return;
    const { targetElement: o, caption: r } = n, { backgroundColor: a } = y(t);
    return {
      ...ue(o),
      backgroundColor: a,
      caption: r
    };
  }
}, tn = (e = {}) => (t, n) => {
  const o = document.createElement("div");
  o.innerHTML = e.icon ?? Yt;
  const r = document.createElement("div");
  r.className = "bn-visual-media-wrapper";
  const a = document.createElement("img");
  return a.className = "bn-visual-media", n.resolveFileUrl ? n.resolveFileUrl(t.props.url).then((s) => {
    a.src = s;
  }) : a.src = t.props.url, a.alt = t.props.name || t.props.caption || "BlockNote image", a.contentEditable = "false", a.draggable = false, r.appendChild(a), Me(
    t,
    n,
    { dom: r },
    r,
    o.firstElementChild
  );
}, nn = (e = {}) => (t, n) => {
  if (!t.props.url) {
    const r = document.createElement("p");
    return r.textContent = "Add image", {
      dom: r
    };
  }
  let o;
  return t.props.showPreview ? (o = document.createElement("img"), o.src = t.props.url, o.alt = t.props.name || t.props.caption || "BlockNote image", t.props.previewWidth && (o.width = t.props.previewWidth)) : (o = document.createElement("a"), o.href = t.props.url, o.textContent = t.props.name || t.props.url), t.props.caption ? t.props.showPreview ? K$1(o, t.props.caption) : F$1(o, t.props.caption) : {
    dom: o
  };
}, on = v(
  Jt$1,
  (e) => ({
    meta: {
      fileBlockAccept: ["image/*"]
    },
    parse: en(e),
    render: tn(e),
    toExternalHTML: nn(e),
    runsBefore: ["file"]
  })
), mo = (e, t, n) => ({
  state: o,
  dispatch: r
}) => r ? Be$1(o.tr, e, t, n) : true, Be$1 = (e, t, n, o) => {
  const r = Y(e.doc, t), a = Z(r);
  if (!a.isBlockContainer)
    return false;
  const s = ht$3(e), c = [
    {
      type: a.bnBlock.node.type,
      // always keep blockcontainer type
      attrs: o ? { ...a.bnBlock.node.attrs, id: void 0 } : {}
    },
    {
      type: n ? a.blockContent.node.type : s.nodes.paragraph,
      attrs: o ? { ...a.blockContent.node.attrs } : {}
    }
  ];
  return e.split(t, 2, c), true;
}, j$1 = (e, t) => {
  const { blockInfo: n, selectionEmpty: o } = e.transact((s) => ({
    blockInfo: Ot$2(s),
    selectionEmpty: s.selection.anchor === s.selection.head
  }));
  if (!n.isBlockContainer)
    return false;
  const { bnBlock: r, blockContent: a } = n;
  return a.node.type.name !== t || !o ? false : a.node.childCount === 0 ? (e.transact((s) => {
    q(s, r.beforePos, {
      type: "paragraph",
      props: {}
    });
  }), true) : a.node.childCount > 0 ? e.transact((s) => (s.deleteSelection(), Be$1(s, s.selection.from, true))) : false;
};
function Q(e, t, n) {
  var d, p, h;
  const o = DOMParser.fromSchema(t), r = e, a = document.createElement("div");
  a.setAttribute("data-node-type", "blockGroup");
  for (const f of Array.from(r.childNodes))
    a.appendChild(f.cloneNode(true));
  let s = o.parse(a, {
    topNode: t.nodes.blockGroup.create()
  });
  ((p = (d = s.firstChild) == null ? void 0 : d.firstChild) == null ? void 0 : p.type.name) === "checkListItem" && (s = s.copy(
    s.content.cut(
      s.firstChild.firstChild.nodeSize + 2
    )
  ));
  const c = (h = s.firstChild) == null ? void 0 : h.firstChild;
  if (!(c != null && c.isTextblock))
    return Fragment.from(s);
  const l = t.nodes[n].create(
    {},
    c.content
  ), i = s.content.cut(
    // +2 for the `blockGroup` node's start and end markers
    c.nodeSize + 2
  );
  if (i.size > 0) {
    const f = s.copy(i);
    return l.content.addToEnd(f);
  }
  return l.content;
}
const rn = () => ({
  type: "bulletListItem",
  propSchema: {
    ...m
  },
  content: "inline"
}), an = v(
  rn,
  {
    meta: {
      isolating: false
    },
    parse(e) {
      var n;
      if (e.tagName !== "LI")
        return;
      const t = e.parentElement;
      if (t !== null && (t.tagName === "UL" || t.tagName === "DIV" && ((n = t.parentElement) == null ? void 0 : n.tagName) === "UL"))
        return y(e);
    },
    // As `li` elements can contain multiple paragraphs, we need to merge their contents
    // into a single one so that ProseMirror can parse everything correctly.
    parseContent: ({ el: e, schema: t }) => Q(e, t, "bulletListItem"),
    render() {
      const e = document.createElement("p");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML(e) {
      const t = document.createElement("li"), n = document.createElement("p");
      return T(e.props, t), t.appendChild(n), {
        dom: t,
        contentDOM: n
      };
    }
  },
  [
    w({
      key: "bullet-list-item-shortcuts",
      keyboardShortcuts: {
        Enter: ({ editor: e }) => j$1(e, "bulletListItem"),
        "Mod-Shift-8": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "bulletListItem",
            props: {}
          }), true);
        }
      },
      inputRules: [
        {
          find: new RegExp("^[-+*]\\s$"),
          replace({ editor: e }) {
            if (Tt$3(
              e.prosemirrorState
            ).blockNoteType !== "heading")
              return {
                type: "bulletListItem",
                props: {}
              };
          }
        }
      ]
    })
  ]
), sn = () => ({
  type: "checkListItem",
  propSchema: {
    ...m,
    checked: { default: false, type: "boolean" }
  },
  content: "inline"
}), cn = v(
  sn,
  {
    meta: {
      isolating: false
    },
    parse(e) {
      var n;
      if (e.tagName === "input")
        return e.closest("[data-content-type]") || e.closest("li") ? void 0 : e.type === "checkbox" ? { checked: e.checked } : void 0;
      if (e.tagName !== "LI")
        return;
      const t = e.parentElement;
      if (t !== null && (t.tagName === "UL" || t.tagName === "DIV" && ((n = t.parentElement) == null ? void 0 : n.tagName) === "UL")) {
        const o = e.querySelector("input[type=checkbox]") || null;
        return o === null ? void 0 : { ...y(e), checked: o.checked };
      }
    },
    // As `li` elements can contain multiple paragraphs, we need to merge their contents
    // into a single one so that ProseMirror can parse everything correctly.
    parseContent: ({ el: e, schema: t }) => Q(e, t, "checkListItem"),
    render(e, t) {
      const n = document.createDocumentFragment(), o = document.createElement("input");
      o.type = "checkbox", o.checked = e.props.checked, e.props.checked && o.setAttribute("checked", ""), o.addEventListener("change", () => {
        t.updateBlock(e, { props: { checked: !e.props.checked } });
      });
      const r = document.createElement("p");
      return n.appendChild(o), n.appendChild(r), {
        dom: n,
        contentDOM: r
      };
    },
    toExternalHTML(e) {
      const t = document.createElement("li"), n = document.createElement("input");
      n.type = "checkbox", n.checked = e.props.checked, e.props.checked && n.setAttribute("checked", "");
      const o = document.createElement("p");
      return T(e.props, t), t.appendChild(n), t.appendChild(o), {
        dom: t,
        contentDOM: o
      };
    },
    runsBefore: ["bulletListItem"]
  },
  [
    w({
      key: "check-list-item-shortcuts",
      keyboardShortcuts: {
        Enter: ({ editor: e }) => j$1(e, "checkListItem"),
        "Mod-Shift-9": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "checkListItem",
            props: {}
          }), true);
        }
      },
      inputRules: [
        {
          find: new RegExp("\\[\\s*\\]\\s$"),
          replace() {
            return {
              type: "checkListItem",
              props: {
                checked: false
              },
              content: []
            };
          }
        },
        {
          find: new RegExp("\\[[Xx]\\]\\s$"),
          replace() {
            return {
              type: "checkListItem",
              props: {
                checked: true
              }
            };
          }
        }
      ]
    })
  ]
);
function Te(e, t, n, o) {
  let r = e.firstChild.attrs.start || 1, a = true;
  const s = !!e.firstChild.attrs.start, c = Z({
    posBeforeNode: t,
    node: e
  });
  if (!c.isBlockContainer)
    throw new Error("impossible");
  const l = n.doc.resolve(c.bnBlock.beforePos).nodeBefore, i = l ? o.get(l) : void 0;
  return i !== void 0 ? (r = i + 1, a = false) : l && Z({
    posBeforeNode: c.bnBlock.beforePos - l.nodeSize,
    node: l
  }).blockNoteType === "numberedListItem" && (r = Te(
    l,
    c.bnBlock.beforePos - l.nodeSize,
    n,
    o
  ).index + 1, a = false), o.set(e, r), { index: r, isFirst: a, hasStart: s };
}
function pe(e, t) {
  const n = /* @__PURE__ */ new Map(), o = t.decorations.map(
    e.mapping,
    e.doc
  ), r = [];
  e.doc.nodesBetween(0, e.doc.nodeSize - 2, (s, c) => {
    if (s.type.name === "blockContainer" && s.firstChild.type.name === "numberedListItem") {
      const { index: l, isFirst: i, hasStart: u } = Te(
        s,
        c,
        e,
        n
      );
      if (o.find(
        c,
        c + s.nodeSize,
        (p) => p.index === l && p.isFirst === i && p.hasStart === u
      ).length === 0) {
        const p = e.doc.nodeAt(c + 1);
        r.push(
          // move in by 1 to account for the block container
          Decoration.node(c + 1, c + 1 + p.nodeSize, {
            "data-index": l.toString()
          })
        );
      }
    }
  });
  const a = r.flatMap(
    (s) => o.find(s.from, s.to)
  );
  return {
    decorations: o.remove(a).add(e.doc, r)
  };
}
const ln = () => new Plugin({
  key: new PluginKey("numbered-list-indexing-decorations"),
  state: {
    init(e, t) {
      return pe(t.tr, {
        decorations: DecorationSet.empty
      });
    },
    apply(e, t) {
      return !e.docChanged && !e.selectionSet && t.decorations ? t : pe(e, t);
    }
  },
  props: {
    decorations(e) {
      var t;
      return ((t = this.getState(e)) == null ? void 0 : t.decorations) ?? DecorationSet.empty;
    }
  }
}), dn = () => ({
  type: "numberedListItem",
  propSchema: {
    ...m,
    start: { default: void 0, type: "number" }
  },
  content: "inline"
}), un = v(
  dn,
  {
    meta: {
      isolating: false
    },
    parse(e) {
      var n;
      if (e.tagName !== "LI")
        return;
      const t = e.parentElement;
      if (t !== null && (t.tagName === "OL" || t.tagName === "DIV" && ((n = t.parentElement) == null ? void 0 : n.tagName) === "OL")) {
        const o = parseInt(t.getAttribute("start") || "1"), r = y(e);
        return e.previousElementSibling || o === 1 ? r : {
          ...r,
          start: o
        };
      }
    },
    // As `li` elements can contain multiple paragraphs, we need to merge their contents
    // into a single one so that ProseMirror can parse everything correctly.
    parseContent: ({ el: e, schema: t }) => Q(e, t, "numberedListItem"),
    render() {
      const e = document.createElement("p");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML(e) {
      const t = document.createElement("li"), n = document.createElement("p");
      return T(e.props, t), t.appendChild(n), {
        dom: t,
        contentDOM: n
      };
    }
  },
  [
    w({
      key: "numbered-list-item-shortcuts",
      inputRules: [
        {
          find: new RegExp("^(\\d+)\\.\\s$"),
          replace({ match: e, editor: t }) {
            if (Tt$3(
              t.prosemirrorState
            ).blockNoteType === "heading")
              return;
            const o = parseInt(e[1]);
            return {
              type: "numberedListItem",
              props: {
                start: o !== 1 ? o : void 0
              }
            };
          }
        }
      ],
      keyboardShortcuts: {
        Enter: ({ editor: e }) => j$1(e, "numberedListItem"),
        "Mod-Shift-7": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "numberedListItem",
            props: {}
          }), true);
        }
      },
      plugins: [ln()]
    })
  ]
), pn = () => ({
  type: "toggleListItem",
  propSchema: {
    ...m
  },
  content: "inline"
}), fn$1 = v(
  pn,
  {
    meta: {
      isolating: false
    },
    render(e, t) {
      const n = document.createElement("p");
      return { ...xe$1(
        e,
        t,
        n
      ), contentDOM: n };
    },
    toExternalHTML(e) {
      const t = document.createElement("li"), n = document.createElement("p");
      return T(e.props, t), t.appendChild(n), {
        dom: t,
        contentDOM: n
      };
    }
  },
  [
    w({
      key: "toggle-list-item-shortcuts",
      keyboardShortcuts: {
        Enter: ({ editor: e }) => j$1(e, "toggleListItem"),
        "Mod-Shift-6": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "toggleListItem",
            props: {}
          }), true);
        }
      }
    })
  ]
), gn$1 = () => ({
  type: "paragraph",
  propSchema: m,
  content: "inline"
}), bn$1 = v(
  gn$1,
  {
    meta: {
      isolating: false
    },
    parse: (e) => {
      var t;
      if (e.tagName === "P" && (t = e.textContent) != null && t.trim())
        return y(e);
    },
    render: () => {
      const e = document.createElement("p");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML: (e) => {
      const t = document.createElement("p");
      return T(e.props, t), {
        dom: t,
        contentDOM: t
      };
    },
    runsBefore: ["default"]
  },
  [
    w({
      key: "paragraph-shortcuts",
      keyboardShortcuts: {
        "Mod-Alt-0": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "paragraph",
            props: {}
          }), true);
        }
      }
    })
  ]
), kn$1 = () => ({
  type: "quote",
  propSchema: {
    backgroundColor: m.backgroundColor,
    textColor: m.textColor
  },
  content: "inline"
}), Cn$1 = v(
  kn$1,
  {
    meta: {
      isolating: false
    },
    parse(e) {
      if (e.tagName === "BLOCKQUOTE") {
        const { backgroundColor: t, textColor: n } = y(e);
        return { backgroundColor: t, textColor: n };
      }
    },
    render() {
      const e = document.createElement("blockquote");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML(e) {
      const t = document.createElement("blockquote");
      return T(e.props, t), {
        dom: t,
        contentDOM: t
      };
    }
  },
  [
    w({
      key: "quote-block-shortcuts",
      keyboardShortcuts: {
        "Mod-Alt-q": ({ editor: e }) => {
          const t = e.getTextCursorPosition();
          return e.schema.blockSchema[t.block.type].content !== "inline" ? false : (e.updateBlock(t.block, {
            type: "quote",
            props: {}
          }), true);
        }
      },
      inputRules: [
        {
          find: new RegExp("^>\\s$"),
          replace() {
            return {
              type: "quote",
              props: {}
            };
          }
        }
      ]
    })
  ]
), yn$1 = 35, Ae$2 = 120, go = 31, vn$1 = Extension.create({
  name: "BlockNoteTableExtension",
  addProseMirrorPlugins: () => [
    columnResizing({
      cellMinWidth: yn$1,
      defaultCellMinWidth: Ae$2,
      // We set this to null as we implement our own node view in the table
      // block content. This node view is the same as what's used by default,
      // but is wrapped in a `blockContent` HTML element.
      View: null
    }),
    tableEditing()
  ],
  addKeyboardShortcuts() {
    return {
      // Makes enter create a new line within the cell.
      Enter: () => this.editor.state.selection.empty && this.editor.state.selection.$head.parent.type.name === "tableParagraph" ? (this.editor.commands.insertContent({ type: "hardBreak" }), true) : false,
      // Ensures that backspace won't delete the table if the text cursor is at
      // the start of a cell and the selection is empty.
      Backspace: () => {
        const e = this.editor.state.selection, t = e.empty, n = e.$head.parentOffset === 0, o = e.$head.node().type.name === "tableParagraph";
        return t && n && o;
      },
      // Enables navigating cells using the tab key.
      Tab: () => this.editor.commands.command(
        ({ state: e, dispatch: t, view: n }) => goToNextCell(1)(e, t, n)
      ),
      "Shift-Tab": () => this.editor.commands.command(
        ({ state: e, dispatch: t, view: n }) => goToNextCell(-1)(e, t, n)
      )
    };
  },
  extendNodeSchema(e) {
    const t = {
      name: e.name,
      options: e.options,
      storage: e.storage
    };
    return {
      tableRole: callOrReturn(
        getExtensionField(e, "tableRole", t)
      )
    };
  }
}), Sn$1 = {
  textColor: m.textColor
}, En$1 = Node3.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  /**
   * We allow table headers and cells to have multiple tableContent nodes because
   * when merging cells, prosemirror-tables will concat the contents of the cells naively.
   * This would cause that content to overflow into other cells when prosemirror tries to enforce the cell structure.
   *
   * So, we manually fix this up when reading back in the `nodeToBlock` and only ever place a single tableContent back into the cell.
   */
  content: "tableContent+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("colwidth");
          return t ? t.split(",").map((o) => parseInt(o, 10)) : null;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: true,
  parseHTML() {
    return [
      {
        tag: "th",
        // As `th` elements can contain multiple paragraphs, we need to merge their contents
        // into a single one so that ProseMirror can parse everything correctly.
        getContent: (e, t) => Ne(e, t)
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return [
      "th",
      mergeAttributes(this.options.HTMLAttributes, e),
      0
    ];
  }
}), wn$1 = Node3.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "tableContent+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (e) => {
          const t = e.getAttribute("colwidth");
          return t ? t.split(",").map((o) => parseInt(o, 10)) : null;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: true,
  parseHTML() {
    return [
      {
        tag: "td",
        // As `td` elements can contain multiple paragraphs, we need to merge their contents
        // into a single one so that ProseMirror can parse everything correctly.
        getContent: (e, t) => Ne(e, t)
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return [
      "td",
      mergeAttributes(this.options.HTMLAttributes, e),
      0
    ];
  }
}), xn$1 = Node3.create({
  name: "table",
  content: "tableRow+",
  group: "blockContent",
  tableRole: "table",
  marks: "deletion insertion modification",
  isolating: true,
  parseHTML() {
    return [
      {
        tag: "table"
      }
    ];
  },
  renderHTML({ node: e, HTMLAttributes: t }) {
    var r, a, s;
    const n = it$2(
      this.name,
      "table",
      {
        ...((r = this.options.domAttributes) == null ? void 0 : r.blockContent) || {},
        ...t
      },
      ((a = this.options.domAttributes) == null ? void 0 : a.inlineContent) || {}
    ), o = document.createElement("colgroup");
    for (const c of e.children[0].children)
      if (c.attrs.colwidth)
        for (const i of c.attrs.colwidth) {
          const u = document.createElement("col");
          i && (u.style = `width: ${i}px`), o.appendChild(u);
        }
      else
        o.appendChild(document.createElement("col"));
    return (s = n.dom.firstChild) == null || s.appendChild(o), n;
  },
  // This node view is needed for the `columnResizing` plugin. By default, the
  // plugin adds its own node view, which overrides how the node is rendered vs
  // `renderHTML`. This means that the wrapping `blockContent` HTML element is
  // no longer rendered. The `columnResizing` plugin uses the `TableView` as its
  // default node view. `BlockNoteTableView` extends it by wrapping it in a
  // `blockContent` element, so the DOM structure is consistent with other block
  // types.
  addNodeView() {
    return ({ node: e, HTMLAttributes: t }) => {
      var o;
      class n extends TableView {
        constructor(a, s, c) {
          super(a, s), this.node = a, this.cellMinWidth = s, this.blockContentHTMLAttributes = c;
          const l = document.createElement("div");
          l.className = I$1(
            "bn-block-content",
            c.class
          ), l.setAttribute("data-content-type", "table");
          for (const [p, h] of Object.entries(
            c
          ))
            p !== "class" && l.setAttribute(p, h);
          const i = this.dom, u = document.createElement("div");
          u.className = "tableWrapper-inner", u.appendChild(i.firstChild), i.appendChild(u), l.appendChild(i);
          const d = document.createElement("div");
          d.className = "table-widgets-container", d.style.position = "relative", i.appendChild(d), this.dom = l;
        }
        ignoreMutation(a) {
          return !a.target.closest(".tableWrapper-inner") || super.ignoreMutation(a);
        }
      }
      return new n(e, Ae$2, {
        ...((o = this.options.domAttributes) == null ? void 0 : o.blockContent) || {},
        ...t
      });
    };
  }
}), Ln$1 = Node3.create({
  name: "tableParagraph",
  group: "tableContent",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "p",
        getAttrs: (e) => {
          if (typeof e == "string" || !e.textContent || !e.closest("[data-content-type]"))
            return false;
          const t = e.parentElement;
          return t === null ? false : t.tagName === "TD" || t.tagName === "TH" ? {} : false;
        },
        node: "tableParagraph"
      }
    ];
  },
  renderHTML({ HTMLAttributes: e }) {
    return ["p", e, 0];
  }
}), Mn$1 = Node3.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)+",
  tableRole: "row",
  marks: "deletion insertion modification",
  parseHTML() {
    return [{ tag: "tr" }];
  },
  renderHTML({ HTMLAttributes: e }) {
    return [
      "tr",
      mergeAttributes(this.options.HTMLAttributes, e),
      0
    ];
  }
});
function Ne(e, t) {
  const o = DOMParser.fromSchema(t).parse(e, {
    topNode: t.nodes.blockGroup.create()
  }), r = [];
  return o.content.descendants((a) => {
    if (a.isInline)
      return r.push(a), false;
  }), Fragment.fromArray(r);
}
const Bn$1 = () => pt$1(
  { node: xn$1, type: "table", content: "table" },
  Sn$1,
  [
    w({
      key: "table-extensions",
      tiptapExtensions: [
        vn$1,
        Ln$1,
        En$1,
        wn$1,
        Mn$1
      ]
    }),
    // Extension for keyboard shortcut which deletes the table if it's empty
    // and all cells are selected. Uses a separate extension as it needs
    // priority over keyboard handlers in the `TableExtension`'s
    // `tableEditing` plugin.
    w({
      key: "table-keyboard-delete",
      keyboardShortcuts: {
        Backspace: ({ editor: e }) => {
          if (!(e.prosemirrorState.selection instanceof CellSelection))
            return false;
          const t = e.getTextCursorPosition().block, n = t.content;
          let o = 0;
          for (const a of n.rows)
            for (const s of a.cells) {
              if ("type" in s && s.content.length > 0 || !("type" in s) && s.length > 0)
                return false;
              o++;
            }
          let r = 0;
          return e.prosemirrorState.selection.forEachCell(() => {
            r++;
          }), r < o ? false : (e.transact(() => {
            (e.getPrevBlock(t) || e.getNextBlock(t)) && e.setTextCursorPosition(t), e.removeBlocks([t]);
          }), true);
        }
      }
    })
  ]
), fe$1 = (e) => {
  const t = e.src || void 0, n = e.width || void 0;
  return { url: t, previewWidth: n };
}, Tn$1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 5V19H16V5H8ZM4 5V7H6V5H4ZM18 5V7H20V5H18ZM4 9V11H6V9H4ZM18 9V11H20V9H18ZM4 13V15H6V13H4ZM18 13V15H20V13H18ZM4 17V19H6V17H4ZM18 17V19H20V17H18Z"></path></svg>', An$1 = (e) => ({
  type: "video",
  propSchema: {
    textAlignment: m.textAlignment,
    backgroundColor: m.backgroundColor,
    name: { default: "" },
    url: { default: "" },
    caption: { default: "" },
    showPreview: { default: true },
    previewWidth: { default: void 0, type: "number" }
  },
  content: "none"
}), Nn$1 = (e) => (t) => {
  if (t.tagName === "VIDEO") {
    if (t.closest("figure"))
      return;
    const { backgroundColor: n } = y(t);
    return {
      ...fe$1(t),
      backgroundColor: n
    };
  }
  if (t.tagName === "FIGURE") {
    const n = W(t, "video");
    if (!n)
      return;
    const { targetElement: o, caption: r } = n, { backgroundColor: a } = y(t);
    return {
      ...fe$1(o),
      backgroundColor: a,
      caption: r
    };
  }
}, Hn$1 = v(
  An$1,
  (e) => ({
    meta: {
      fileBlockAccept: ["video/*"]
    },
    parse: Nn$1(),
    render(t, n) {
      const o = document.createElement("div");
      o.innerHTML = e.icon ?? Tn$1;
      const r = document.createElement("div");
      r.className = "bn-visual-media-wrapper";
      const a = document.createElement("video");
      return a.className = "bn-visual-media", n.resolveFileUrl ? n.resolveFileUrl(t.props.url).then((s) => {
        a.src = s;
      }) : a.src = t.props.url, a.controls = true, a.contentEditable = "false", a.draggable = false, a.width = t.props.previewWidth, r.appendChild(a), Me(
        t,
        n,
        { dom: r },
        r,
        o.firstElementChild
      );
    },
    toExternalHTML(t) {
      if (!t.props.url) {
        const o = document.createElement("p");
        return o.textContent = "Add video", {
          dom: o
        };
      }
      let n;
      return t.props.showPreview ? (n = document.createElement("video"), n.src = t.props.url, t.props.previewWidth && (n.width = t.props.previewWidth)) : (n = document.createElement("a"), n.href = t.props.url, n.textContent = t.props.name || t.props.url), t.props.caption ? t.props.showPreview ? K$1(n, t.props.caption) : F$1(n, t.props.caption) : {
        dom: n
      };
    },
    runsBefore: ["file"]
  })
);
function k(e, t, n) {
  if (!(t in e.schema.blockSpecs))
    return false;
  if (!n)
    return true;
  for (const [o, r] of Object.entries(n)) {
    if (!(o in e.schema.blockSpecs[t].config.propSchema))
      return false;
    if (typeof r == "string") {
      if (e.schema.blockSpecs[t].config.propSchema[o].default !== void 0 && typeof e.schema.blockSpecs[t].config.propSchema[o].default !== r || e.schema.blockSpecs[t].config.propSchema[o].type !== void 0 && e.schema.blockSpecs[t].config.propSchema[o].type !== r)
        return false;
    } else {
      if (e.schema.blockSpecs[t].config.propSchema[o].default !== r.default || e.schema.blockSpecs[t].config.propSchema[o].default === void 0 && r.default === void 0 && e.schema.blockSpecs[t].config.propSchema[o].type !== r.type || typeof e.schema.blockSpecs[t].config.propSchema[o].values != typeof r.values)
        return false;
      if (typeof e.schema.blockSpecs[t].config.propSchema[o].values == "object" && typeof r.values == "object") {
        for (const a of r.values)
          if (!e.schema.blockSpecs[t].config.propSchema[o].values.includes(a))
            return false;
      }
    }
  }
  return true;
}
function ko(e, t, n, o) {
  return k(t, n, o) && e.type === n;
}
function Co(e) {
  return e instanceof CellSelection;
}
function In$1(e) {
  let t = e.getTextCursorPosition().block, n = e.schema.blockSchema[t.type].content;
  for (; n === "none"; ) {
    if (t = e.getTextCursorPosition().nextBlock, t === void 0)
      return;
    n = e.schema.blockSchema[t.type].content, e.setTextCursorPosition(t, "end");
  }
}
function b(e, t) {
  const n = e.getTextCursorPosition().block;
  if (n.content === void 0)
    throw new Error("Slash Menu open in a block that doesn't contain content.");
  let o;
  return Array.isArray(n.content) && (n.content.length === 1 && B$1(n.content[0]) && n.content[0].type === "text" && n.content[0].text === "/" || n.content.length === 0) ? (o = e.updateBlock(n, t), e.setTextCursorPosition(o)) : (o = e.insertBlocks([t], n, "after")[0], e.setTextCursorPosition(e.getTextCursorPosition().nextBlock)), In$1(e), o;
}
function yo(e) {
  const t = [];
  return k(e, "heading", { level: "number" }) && t.push(
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 1 }
        });
      },
      badge: M$1("Mod-Alt-1"),
      key: "heading",
      ...e.dictionary.slash_menu.heading
    },
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 2 }
        });
      },
      badge: M$1("Mod-Alt-2"),
      key: "heading_2",
      ...e.dictionary.slash_menu.heading_2
    },
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 3 }
        });
      },
      badge: M$1("Mod-Alt-3"),
      key: "heading_3",
      ...e.dictionary.slash_menu.heading_3
    }
  ), k(e, "quote") && t.push({
    onItemClick: () => {
      b(e, {
        type: "quote"
      });
    },
    key: "quote",
    ...e.dictionary.slash_menu.quote
  }), k(e, "toggleListItem") && t.push({
    onItemClick: () => {
      b(e, {
        type: "toggleListItem"
      });
    },
    badge: M$1("Mod-Shift-6"),
    key: "toggle_list",
    ...e.dictionary.slash_menu.toggle_list
  }), k(e, "numberedListItem") && t.push({
    onItemClick: () => {
      b(e, {
        type: "numberedListItem"
      });
    },
    badge: M$1("Mod-Shift-7"),
    key: "numbered_list",
    ...e.dictionary.slash_menu.numbered_list
  }), k(e, "bulletListItem") && t.push({
    onItemClick: () => {
      b(e, {
        type: "bulletListItem"
      });
    },
    badge: M$1("Mod-Shift-8"),
    key: "bullet_list",
    ...e.dictionary.slash_menu.bullet_list
  }), k(e, "checkListItem") && t.push({
    onItemClick: () => {
      b(e, {
        type: "checkListItem"
      });
    },
    badge: M$1("Mod-Shift-9"),
    key: "check_list",
    ...e.dictionary.slash_menu.check_list
  }), k(e, "paragraph") && t.push({
    onItemClick: () => {
      b(e, {
        type: "paragraph"
      });
    },
    badge: M$1("Mod-Alt-0"),
    key: "paragraph",
    ...e.dictionary.slash_menu.paragraph
  }), k(e, "codeBlock") && t.push({
    onItemClick: () => {
      b(e, {
        type: "codeBlock"
      });
    },
    badge: M$1("Mod-Alt-c"),
    key: "code_block",
    ...e.dictionary.slash_menu.code_block
  }), k(e, "divider") && t.push({
    onItemClick: () => {
      b(e, { type: "divider" });
    },
    key: "divider",
    ...e.dictionary.slash_menu.divider
  }), k(e, "table") && t.push({
    onItemClick: () => {
      b(e, {
        type: "table",
        content: {
          type: "tableContent",
          rows: [
            {
              cells: ["", "", ""]
            },
            {
              cells: ["", "", ""]
            }
          ]
        }
      });
    },
    badge: void 0,
    key: "table",
    ...e.dictionary.slash_menu.table
  }), k(e, "image", { url: "string" }) && t.push({
    onItemClick: () => {
      const n = b(e, {
        type: "image"
      });
      e.transact(
        (o) => o.setMeta(e.filePanel.plugins[0], {
          block: n
        })
      );
    },
    key: "image",
    ...e.dictionary.slash_menu.image
  }), k(e, "video", { url: "string" }) && t.push({
    onItemClick: () => {
      const n = b(e, {
        type: "video"
      });
      e.transact(
        (o) => o.setMeta(e.filePanel.plugins[0], {
          block: n
        })
      );
    },
    key: "video",
    ...e.dictionary.slash_menu.video
  }), k(e, "audio", { url: "string" }) && t.push({
    onItemClick: () => {
      const n = b(e, {
        type: "audio"
      });
      e.transact(
        (o) => o.setMeta(e.filePanel.plugins[0], {
          block: n
        })
      );
    },
    key: "audio",
    ...e.dictionary.slash_menu.audio
  }), k(e, "file", { url: "string" }) && t.push({
    onItemClick: () => {
      const n = b(e, {
        type: "file"
      });
      e.transact(
        (o) => o.setMeta(e.filePanel.plugins[0], {
          block: n
        })
      );
    },
    key: "file",
    ...e.dictionary.slash_menu.file
  }), k(e, "heading", {
    level: "number",
    isToggleable: "boolean"
  }) && t.push(
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 1, isToggleable: true }
        });
      },
      key: "toggle_heading",
      ...e.dictionary.slash_menu.toggle_heading
    },
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 2, isToggleable: true }
        });
      },
      key: "toggle_heading_2",
      ...e.dictionary.slash_menu.toggle_heading_2
    },
    {
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: 3, isToggleable: true }
        });
      },
      key: "toggle_heading_3",
      ...e.dictionary.slash_menu.toggle_heading_3
    }
  ), k(e, "heading", { level: "number" }) && (e.schema.blockSchema.heading.propSchema.level.values || []).filter((n) => n > 3).forEach((n) => {
    t.push({
      onItemClick: () => {
        b(e, {
          type: "heading",
          props: { level: n }
        });
      },
      key: `heading_${n}`,
      ...e.dictionary.slash_menu[`heading_${n}`]
    });
  }), t.push({
    onItemClick: () => {
      e.openSuggestionMenu(":", {
        deleteTriggerCharacter: true,
        ignoreQueryLength: true
      });
    },
    key: "emoji",
    ...e.dictionary.slash_menu.emoji
  }), t;
}
function vo(e, t) {
  return e.filter(
    ({ title: n, aliases: o }) => n.toLowerCase().includes(t.toLowerCase()) || o && o.filter(
      (r) => r.toLowerCase().includes(t.toLowerCase())
    ).length !== 0
  );
}
const On$1 = {
  audio: Vt$1(),
  bulletListItem: an(),
  checkListItem: cn(),
  codeBlock: Ut$1(),
  divider: Gt$1(),
  file: qt(),
  heading: Qt(),
  image: on(),
  numberedListItem: un(),
  paragraph: bn$1(),
  quote: Cn$1(),
  table: Bn$1(),
  toggleListItem: fn$1(),
  video: Hn$1()
}, Dn$1 = Ee$2(
  {
    type: "textColor",
    propSchema: "string"
  },
  {
    render: () => {
      const e = document.createElement("span");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML: (e) => {
      const t = document.createElement("span");
      return e !== m.textColor.default && (t.style.color = e in B ? B[e].text : e), {
        dom: t,
        contentDOM: t
      };
    },
    parse: (e) => {
      if (e.tagName === "SPAN" && e.style.color)
        return e.style.color;
    }
  }
), _n$1 = Ee$2(
  {
    type: "backgroundColor",
    propSchema: "string"
  },
  {
    render: () => {
      const e = document.createElement("span");
      return {
        dom: e,
        contentDOM: e
      };
    },
    toExternalHTML: (e) => {
      const t = document.createElement("span");
      return e !== m.backgroundColor.default && (t.style.backgroundColor = e in B ? B[e].background : e), {
        dom: t,
        contentDOM: t
      };
    },
    parse: (e) => {
      if (e.tagName === "SPAN" && e.style.backgroundColor)
        return e.style.backgroundColor;
    }
  }
), He$1 = {
  bold: H$1(index_default$4, "boolean"),
  italic: H$1(index_default$3, "boolean"),
  underline: H$1(index_default$2, "boolean"),
  strike: H$1(index_default$1, "boolean"),
  code: H$1(index_default, "boolean"),
  textColor: Dn$1,
  backgroundColor: _n$1
}; Se(He$1); const Ie$2 = {
  text: { config: "text", implementation: {} },
  link: { config: "link", implementation: {} }
}, wo = ye(
  Ie$2
);
class Pe extends wt$1 {
  static create(t) {
    return new Pe({
      blockSpecs: (t == null ? void 0 : t.blockSpecs) ?? On$1,
      inlineContentSpecs: (t == null ? void 0 : t.inlineContentSpecs) ?? Ie$2,
      styleSpecs: (t == null ? void 0 : t.styleSpecs) ?? He$1
    });
  }
}

const i = {
  slash_menu: {
    heading: {
      title: "Heading 1",
      subtext: "Top-level heading",
      aliases: ["h", "heading1", "h1"],
      group: "Headings"
    },
    heading_2: {
      title: "Heading 2",
      subtext: "Key section heading",
      aliases: ["h2", "heading2", "subheading"],
      group: "Headings"
    },
    heading_3: {
      title: "Heading 3",
      subtext: "Subsection and group heading",
      aliases: ["h3", "heading3", "subheading"],
      group: "Headings"
    },
    heading_4: {
      title: "Heading 4",
      subtext: "Minor subsection heading",
      aliases: ["h4", "heading4", "subheading4"],
      group: "Subheadings"
    },
    heading_5: {
      title: "Heading 5",
      subtext: "Small subsection heading",
      aliases: ["h5", "heading5", "subheading5"],
      group: "Subheadings"
    },
    heading_6: {
      title: "Heading 6",
      subtext: "Lowest-level heading",
      aliases: ["h6", "heading6", "subheading6"],
      group: "Subheadings"
    },
    toggle_heading: {
      title: "Toggle Heading 1",
      subtext: "Toggleable top-level heading",
      aliases: ["h", "heading1", "h1", "collapsable"],
      group: "Subheadings"
    },
    toggle_heading_2: {
      title: "Toggle Heading 2",
      subtext: "Toggleable key section heading",
      aliases: ["h2", "heading2", "subheading", "collapsable"],
      group: "Subheadings"
    },
    toggle_heading_3: {
      title: "Toggle Heading 3",
      subtext: "Toggleable subsection and group heading",
      aliases: ["h3", "heading3", "subheading", "collapsable"],
      group: "Subheadings"
    },
    quote: {
      title: "Quote",
      subtext: "Quote or excerpt",
      aliases: ["quotation", "blockquote", "bq"],
      group: "Basic blocks"
    },
    toggle_list: {
      title: "Toggle List",
      subtext: "List with hideable sub-items",
      aliases: ["li", "list", "toggleList", "toggle list", "collapsable list"],
      group: "Basic blocks"
    },
    numbered_list: {
      title: "Numbered List",
      subtext: "List with ordered items",
      aliases: ["ol", "li", "list", "numberedlist", "numbered list"],
      group: "Basic blocks"
    },
    bullet_list: {
      title: "Bullet List",
      subtext: "List with unordered items",
      aliases: ["ul", "li", "list", "bulletlist", "bullet list"],
      group: "Basic blocks"
    },
    check_list: {
      title: "Check List",
      subtext: "List with checkboxes",
      aliases: [
        "ul",
        "li",
        "list",
        "checklist",
        "check list",
        "checked list",
        "checkbox"
      ],
      group: "Basic blocks"
    },
    paragraph: {
      title: "Paragraph",
      subtext: "The body of your document",
      aliases: ["p", "paragraph"],
      group: "Basic blocks"
    },
    code_block: {
      title: "Code Block",
      subtext: "Code block with syntax highlighting",
      aliases: ["code", "pre"],
      group: "Basic blocks"
    },
    page_break: {
      title: "Page Break",
      subtext: "Page separator",
      aliases: ["page", "break", "separator"],
      group: "Basic blocks"
    },
    table: {
      title: "Table",
      subtext: "Table with editable cells",
      aliases: ["table"],
      group: "Advanced"
    },
    image: {
      title: "Image",
      subtext: "Resizable image with caption",
      aliases: [
        "image",
        "imageUpload",
        "upload",
        "img",
        "picture",
        "media",
        "url"
      ],
      group: "Media"
    },
    video: {
      title: "Video",
      subtext: "Resizable video with caption",
      aliases: [
        "video",
        "videoUpload",
        "upload",
        "mp4",
        "film",
        "media",
        "url"
      ],
      group: "Media"
    },
    audio: {
      title: "Audio",
      subtext: "Embedded audio with caption",
      aliases: [
        "audio",
        "audioUpload",
        "upload",
        "mp3",
        "sound",
        "media",
        "url"
      ],
      group: "Media"
    },
    file: {
      title: "File",
      subtext: "Embedded file",
      aliases: ["file", "upload", "embed", "media", "url"],
      group: "Media"
    },
    emoji: {
      title: "Emoji",
      subtext: "Search for and insert an emoji",
      aliases: ["emoji", "emote", "emotion", "face"],
      group: "Others"
    },
    divider: {
      title: "Divider",
      subtext: "Visually divide blocks",
      aliases: ["divider", "hr", "line", "horizontal rule"],
      group: "Basic blocks"
    }
  },
  placeholders: {
    default: "Enter text or type '/' for commands",
    heading: "Heading",
    toggleListItem: "Toggle",
    bulletListItem: "List",
    numberedListItem: "List",
    checkListItem: "List",
    emptyDocument: void 0,
    new_comment: "Write a comment...",
    edit_comment: "Edit comment...",
    comment_reply: "Add comment..."
  },
  file_blocks: {
    add_button_text: {
      image: "Add image",
      video: "Add video",
      audio: "Add audio",
      file: "Add file"
    }
  },
  toggle_blocks: {
    add_block_button: "Empty toggle. Click to add a block."
  },
  // from react package:
  side_menu: {
    add_block_label: "Add block",
    drag_handle_label: "Open block menu"
  },
  drag_handle: {
    delete_menuitem: "Delete",
    colors_menuitem: "Colors",
    header_row_menuitem: "Header row",
    header_column_menuitem: "Header column"
  },
  table_handle: {
    delete_column_menuitem: "Delete column",
    delete_row_menuitem: "Delete row",
    add_left_menuitem: "Add column left",
    add_right_menuitem: "Add column right",
    add_above_menuitem: "Add row above",
    add_below_menuitem: "Add row below",
    split_cell_menuitem: "Split cell",
    merge_cells_menuitem: "Merge cells",
    background_color_menuitem: "Background color"
  },
  suggestion_menu: {
    no_items_title: "No items found"
  },
  color_picker: {
    text_title: "Text",
    background_title: "Background",
    colors: {
      default: "Default",
      gray: "Gray",
      brown: "Brown",
      red: "Red",
      orange: "Orange",
      yellow: "Yellow",
      green: "Green",
      blue: "Blue",
      purple: "Purple",
      pink: "Pink"
    }
  },
  formatting_toolbar: {
    bold: {
      tooltip: "Bold",
      secondary_tooltip: "Mod+B"
    },
    italic: {
      tooltip: "Italic",
      secondary_tooltip: "Mod+I"
    },
    underline: {
      tooltip: "Underline",
      secondary_tooltip: "Mod+U"
    },
    strike: {
      tooltip: "Strike",
      secondary_tooltip: "Mod+Shift+S"
    },
    code: {
      tooltip: "Code",
      secondary_tooltip: ""
    },
    colors: {
      tooltip: "Colors"
    },
    link: {
      tooltip: "Create link",
      secondary_tooltip: "Mod+K"
    },
    file_caption: {
      tooltip: "Edit caption",
      input_placeholder: "Edit caption"
    },
    file_replace: {
      tooltip: {
        image: "Replace image",
        video: "Replace video",
        audio: "Replace audio",
        file: "Replace file"
      }
    },
    file_rename: {
      tooltip: {
        image: "Rename image",
        video: "Rename video",
        audio: "Rename audio",
        file: "Rename file"
      },
      input_placeholder: {
        image: "Rename image",
        video: "Rename video",
        audio: "Rename audio",
        file: "Rename file"
      }
    },
    file_download: {
      tooltip: {
        image: "Download image",
        video: "Download video",
        audio: "Download audio",
        file: "Download file"
      }
    },
    file_delete: {
      tooltip: {
        image: "Delete image",
        video: "Delete video",
        audio: "Delete audio",
        file: "Delete file"
      }
    },
    file_preview_toggle: {
      tooltip: "Toggle preview"
    },
    nest: {
      tooltip: "Nest block",
      secondary_tooltip: "Tab"
    },
    unnest: {
      tooltip: "Unnest block",
      secondary_tooltip: "Shift+Tab"
    },
    align_left: {
      tooltip: "Align text left"
    },
    align_center: {
      tooltip: "Align text center"
    },
    align_right: {
      tooltip: "Align text right"
    },
    align_justify: {
      tooltip: "Justify text"
    },
    table_cell_merge: {
      tooltip: "Merge cells"
    },
    comment: {
      tooltip: "Add comment"
    }
  },
  file_panel: {
    upload: {
      title: "Upload",
      file_placeholder: {
        image: "Upload image",
        video: "Upload video",
        audio: "Upload audio",
        file: "Upload file"
      },
      upload_error: "Error: Upload failed"
    },
    embed: {
      title: "Embed",
      embed_button: {
        image: "Embed image",
        video: "Embed video",
        audio: "Embed audio",
        file: "Embed file"
      },
      url_placeholder: "Enter URL"
    }
  },
  link_toolbar: {
    delete: {
      tooltip: "Remove link"
    },
    edit: {
      text: "Edit link",
      tooltip: "Edit"
    },
    open: {
      tooltip: "Open in new tab"
    },
    form: {
      title_placeholder: "Edit title",
      url_placeholder: "Edit URL"
    }
  },
  comments: {
    edited: "edited",
    save_button_text: "Save",
    cancel_button_text: "Cancel",
    actions: {
      add_reaction: "Add reaction",
      resolve: "Resolve",
      edit_comment: "Edit comment",
      delete_comment: "Delete comment",
      more_actions: "More actions"
    },
    reactions: {
      reacted_by: "Reacted by"
    },
    sidebar: {
      marked_as_resolved: "Marked as resolved",
      more_replies: (e) => `${e} more replies`
    }
  },
  generic: {
    ctrl_shortcut: "Ctrl"
  }
};

var Xt = Object.defineProperty;
var Jt = (n, t, e) => t in n ? Xt(n, t, { enumerable: true, configurable: true, writable: true, value: e }) : n[t] = e;
var d = (n, t, e) => Jt(n, typeof t != "symbol" ? t + "" : t, e);
function fn(n, t) {
  const e = [
    {
      tag: `[data-inline-content-type="${n.type}"]`,
      contentElement: (o) => {
        const r = o;
        return r.matches("[data-editable]") ? r : r.querySelector("[data-editable]") || r;
      }
    }
  ];
  return t && e.push({
    tag: "*",
    getAttrs(o) {
      if (typeof o == "string")
        return false;
      const r = t == null ? void 0 : t(o);
      return r === void 0 ? false : r;
    }
  }), e;
}
function gn(n, t, e, o = "before") {
  const r = typeof e == "string" ? e : e.id, s = ht$3(n), i = t.map(
    (h) => bt$2(h, s)
  ), c = xt$2(r, n.doc);
  if (!c)
    throw new Error(`Block with ID ${r} not found`);
  let a = c.posBeforeNode;
  return o === "after" && (a += c.node.nodeSize), n.step(
    new ReplaceStep(a, a, new Slice(Fragment.from(i), 0, 0))
  ), i.map(
    (h) => L(h, s)
  );
}
function xe(n) {
  if (!n || n.type.name !== "column")
    throw new Error("Invalid columnPos: does not point to column node.");
  const t = n.firstChild;
  if (!t)
    throw new Error("Invalid column: does not have child node.");
  const e = t.firstChild;
  if (!e)
    throw new Error("Invalid blockContainer: does not have child node.");
  return n.childCount === 1 && t.childCount === 1 && e.type.name === "paragraph" && e.content.content.length === 0;
}
function kn(n, t) {
  const e = n.doc.resolve(t), o = e.nodeAfter;
  if (!o || o.type.name !== "columnList")
    throw new Error(
      "Invalid columnListPos: does not point to columnList node."
    );
  for (let r = o.childCount - 1; r >= 0; r--) {
    const s = n.doc.resolve(e.pos + 1).posAtIndex(r), c = n.doc.resolve(s).nodeAfter;
    if (!c || c.type.name !== "column")
      throw new Error("Invalid columnPos: does not point to column node.");
    xe(c) && n.delete(s, s + c.nodeSize);
  }
}
function Ie$1(n, t) {
  kn(n, t);
  const o = n.doc.resolve(t).nodeAfter;
  if (!o || o.type.name !== "columnList")
    throw new Error(
      "Invalid columnListPos: does not point to columnList node."
    );
  if (o.childCount > 2)
    return;
  if (o.childCount < 2)
    throw new Error("Invalid columnList: contains fewer than two children.");
  const r = t + 1, i = n.doc.resolve(r).nodeAfter, c = t + o.nodeSize - 1, l = n.doc.resolve(c).nodeBefore;
  if (!i || !l)
    throw new Error("Invalid columnList: does not contain children.");
  const h = xe(i), u = xe(l);
  if (h && u) {
    n.delete(t, t + o.nodeSize);
    return;
  }
  if (h) {
    n.step(
      new ReplaceAroundStep(
        // Replaces `columnList`.
        t,
        t + o.nodeSize,
        // Replaces with content of last `column`.
        c - l.nodeSize + 1,
        c - 1,
        // Doesn't append anything.
        Slice.empty,
        0,
        false
      )
    );
    return;
  }
  if (u) {
    n.step(
      new ReplaceAroundStep(
        // Replaces `columnList`.
        t,
        t + o.nodeSize,
        // Replaces with content of first `column`.
        r + 1,
        r + i.nodeSize - 1,
        // Doesn't append anything.
        Slice.empty,
        0,
        false
      )
    );
    return;
  }
}
function Ze$1(n, t, e) {
  const o = ht$3(n), r = e.map(
    (u) => bt$2(u, o)
  ), s = new Set(
    t.map(
      (u) => typeof u == "string" ? u : u.id
    )
  ), i = [], c = /* @__PURE__ */ new Set(), a = typeof t[0] == "string" ? t[0] : t[0].id;
  let l = 0;
  if (n.doc.descendants((u, f) => {
    if (s.size === 0)
      return false;
    if (!u.type.isInGroup("bnBlock") || !s.has(u.attrs.id))
      return true;
    if (i.push(L(u, o)), s.delete(u.attrs.id), e.length > 0 && u.attrs.id === a) {
      const k = n.doc.nodeSize;
      n.insert(f, r);
      const b = n.doc.nodeSize;
      l += k - b;
    }
    const m = n.doc.nodeSize, g = n.doc.resolve(f - l);
    g.node().type.name === "column" ? c.add(g.before(-1)) : g.node().type.name === "columnList" && c.add(g.before()), g.node().type.name === "blockGroup" && g.node(g.depth - 1).type.name !== "doc" && g.node().childCount === 1 ? n.delete(g.before(), g.after()) : n.delete(f - l, f - l + u.nodeSize);
    const p = n.doc.nodeSize;
    return l += m - p, false;
  }), s.size > 0) {
    const u = [...s].join(`
`);
    throw Error(
      "Blocks with the following IDs could not be found in the editor: " + u
    );
  }
  return c.forEach((u) => Ie$1(n, u)), { insertedBlocks: r.map(
    (u) => L(u, o)
  ), removedBlocks: i };
}
function St$1(n) {
  const t = Array.from(n.classList).filter(
    (e) => !e.startsWith("bn-")
  ) || [];
  t.length > 0 ? n.className = t.join(" ") : n.removeAttribute("class");
}
function Et(n, t, e, o) {
  var c;
  let r;
  if (t)
    if (typeof t == "string")
      r = T$1([t], n.pmSchema);
    else if (Array.isArray(t))
      r = T$1(t, n.pmSchema);
    else if (t.type === "tableContent")
      r = kt$2(t, n.pmSchema);
    else
      throw new O$1(t.type);
  else throw new Error("blockContent is required");
  const i = ((o == null ? void 0 : o.document) ?? document).createDocumentFragment();
  for (const a of r)
    if (a.type.name !== "text" && n.schema.inlineContentSchema[a.type.name]) {
      const l = n.schema.inlineContentSpecs[a.type.name].implementation;
      if (l) {
        const h = wt$2(
          a,
          n.schema.inlineContentSchema,
          n.schema.styleSchema
        ), u = l.toExternalHTML ? l.toExternalHTML(
          h,
          n
        ) : l.render.call(
          {
            renderType: "dom",
            props: void 0
          },
          h,
          () => {
          },
          n
        );
        if (u) {
          if (i.appendChild(u.dom), u.contentDOM) {
            const f = e.serializeFragment(
              a.content,
              o
            );
            u.contentDOM.dataset.editable = "", u.contentDOM.appendChild(f);
          }
          continue;
        }
      }
    } else if (a.type.name === "text") {
      let l = document.createTextNode(
        a.textContent
      );
      for (const h of a.marks.toReversed())
        if (h.type.name in n.schema.styleSpecs) {
          const u = (n.schema.styleSpecs[h.type.name].implementation.toExternalHTML ?? n.schema.styleSpecs[h.type.name].implementation.render)(h.attrs.stringValue, n);
          u.contentDOM.appendChild(l), l = u.dom;
        } else {
          const u = h.type.spec.toDOM(h, true), f = DOMSerializer.renderSpec(document, u);
          f.contentDOM.appendChild(l), l = f.dom;
        }
      i.appendChild(l);
    } else {
      const l = e.serializeFragment(
        Fragment.from([a]),
        o
      );
      i.appendChild(l);
    }
  return i.childNodes.length === 1 && ((c = i.firstChild) == null ? void 0 : c.nodeType) === 1 && St$1(i.firstChild), i;
}
function bn(n, t, e, o, r, s, i) {
  var k, b, w, D, F, J, Q, Z, ee;
  const c = (i == null ? void 0 : i.document) ?? document, a = t.pmSchema.nodes.blockContainer, l = e.props || {};
  for (const [v, M] of Object.entries(
    t.schema.blockSchema[e.type].propSchema
  ))
    !(v in l) && M.default !== void 0 && (l[v] = M.default);
  const h = (b = (k = a.spec) == null ? void 0 : k.toDOM) == null ? void 0 : b.call(
    k,
    a.create({
      id: e.id,
      ...l
    })
  ), u = Array.from(h.dom.attributes), f = t.blockImplementations[e.type].implementation, m = ((w = f.toExternalHTML) == null ? void 0 : w.call(
    {},
    { ...e, props: l },
    t
  )) || f.render.call(
    {},
    { ...e, props: l },
    t
  ), g = c.createDocumentFragment();
  if (m.dom.classList.contains("bn-block-content")) {
    const v = [
      ...u,
      ...Array.from(m.dom.attributes)
    ].filter(
      (M) => M.name.startsWith("data") && M.name !== "data-content-type" && M.name !== "data-file-block" && M.name !== "data-node-view-wrapper" && M.name !== "data-node-type" && M.name !== "data-id" && M.name !== "data-editable"
    );
    for (const M of v)
      m.dom.firstChild.setAttribute(M.name, M.value);
    St$1(m.dom.firstChild), g.append(...Array.from(m.dom.childNodes));
  } else
    g.append(m.dom);
  if (m.contentDOM && e.content) {
    const v = Et(
      t,
      e.content,
      // TODO
      o,
      i
    );
    m.contentDOM.appendChild(v);
  }
  let p;
  if (r.has(e.type) ? p = "OL" : s.has(e.type) && (p = "UL"), p) {
    if (((D = n.lastChild) == null ? void 0 : D.nodeName) !== p) {
      const v = c.createElement(p);
      p === "OL" && "start" in l && l.start && (l == null ? void 0 : l.start) !== 1 && v.setAttribute("start", l.start + ""), n.append(v);
    }
    n.lastChild.appendChild(g);
  } else
    n.append(g);
  if (e.children && e.children.length > 0) {
    const v = c.createDocumentFragment();
    if (Bt(
      v,
      t,
      e.children,
      o,
      r,
      s,
      i
    ), ((F = n.lastChild) == null ? void 0 : F.nodeName) === "UL" || ((J = n.lastChild) == null ? void 0 : J.nodeName) === "OL")
      for (; ((Q = v.firstChild) == null ? void 0 : Q.nodeName) === "UL" || ((Z = v.firstChild) == null ? void 0 : Z.nodeName) === "OL"; )
        n.lastChild.lastChild.appendChild(v.firstChild);
    t.pmSchema.nodes[e.type].isInGroup("blockContent") ? n.append(v) : (ee = m.contentDOM) == null || ee.append(v);
  }
}
const Bt = (n, t, e, o, r, s, i) => {
  for (const c of e)
    bn(
      n,
      t,
      c,
      o,
      r,
      s,
      i
    );
}, wn = (n, t, e, o, r, s) => {
  const c = ((s == null ? void 0 : s.document) ?? document).createDocumentFragment();
  return Bt(
    c,
    n,
    t,
    e,
    o,
    r,
    s
  ), c;
}, Ce = (n, t) => {
  const e = DOMSerializer.fromSchema(n);
  return {
    exportBlocks: (o, r) => {
      const s = wn(
        t,
        o,
        e,
        /* @__PURE__ */ new Set(["numberedListItem"]),
        /* @__PURE__ */ new Set(["bulletListItem", "checkListItem", "toggleListItem"]),
        r
      ), i = document.createElement("div");
      return i.append(s), i.innerHTML;
    },
    exportInlineContent: (o, r) => {
      const s = Et(
        t,
        o,
        e,
        r
      ), i = document.createElement("div");
      return i.append(s.cloneNode(true)), i.innerHTML;
    }
  };
};
function yn(n, t, e, o, r) {
  let s;
  if (t)
    if (typeof t == "string")
      s = T$1([t], n.pmSchema, o);
    else if (Array.isArray(t))
      s = T$1(t, n.pmSchema, o);
    else if (t.type === "tableContent")
      s = kt$2(t, n.pmSchema);
    else
      throw new O$1(t.type);
  else throw new Error("blockContent is required");
  const c = ((r == null ? void 0 : r.document) ?? document).createDocumentFragment();
  for (const a of s)
    if (a.type.name !== "text" && n.schema.inlineContentSchema[a.type.name]) {
      const l = n.schema.inlineContentSpecs[a.type.name].implementation;
      if (l) {
        const h = wt$2(
          a,
          n.schema.inlineContentSchema,
          n.schema.styleSchema
        ), u = l.render.call(
          {
            renderType: "dom",
            props: void 0
          },
          h,
          () => {
          },
          n
        );
        if (u) {
          if (c.appendChild(u.dom), u.contentDOM) {
            const f = e.serializeFragment(
              a.content,
              r
            );
            u.contentDOM.dataset.editable = "", u.contentDOM.appendChild(f);
          }
          continue;
        }
      }
    } else if (a.type.name === "text") {
      let l = document.createTextNode(
        a.textContent
      );
      for (const h of a.marks.toReversed())
        if (h.type.name in n.schema.styleSpecs) {
          const u = n.schema.styleSpecs[h.type.name].implementation.render(h.attrs.stringValue, n);
          u.contentDOM.appendChild(l), l = u.dom;
        } else {
          const u = h.type.spec.toDOM(h, true), f = DOMSerializer.renderSpec(document, u);
          f.contentDOM.appendChild(l), l = f.dom;
        }
      c.appendChild(l);
    } else {
      const l = e.serializeFragment(
        Fragment.from([a]),
        r
      );
      c.appendChild(l);
    }
  return c;
}
function Cn(n, t, e, o) {
  var u, f, m, g, p;
  const r = n.pmSchema.nodes.blockContainer, s = t.props || {};
  for (const [k, b] of Object.entries(
    n.schema.blockSchema[t.type].propSchema
  ))
    !(k in s) && b.default !== void 0 && (s[k] = b.default);
  const i = t.children || [], a = n.blockImplementations[t.type].implementation.render.call(
    {
      renderType: "dom",
      props: void 0
    },
    { ...t, props: s, children: i },
    n
  );
  if (a.contentDOM && t.content) {
    const k = yn(
      n,
      t.content,
      // TODO
      e,
      t.type,
      o
    );
    a.contentDOM.appendChild(k);
  }
  if (n.pmSchema.nodes[t.type].isInGroup("bnBlock")) {
    if (t.children && t.children.length > 0) {
      const k = Mt(
        n,
        t.children,
        e,
        o
      );
      (u = a.contentDOM) == null || u.append(k);
    }
    return a.dom;
  }
  const h = (m = (f = r.spec) == null ? void 0 : f.toDOM) == null ? void 0 : m.call(
    f,
    r.create({
      id: t.id,
      ...s
    })
  );
  return (g = h.contentDOM) == null || g.appendChild(a.dom), t.children && t.children.length > 0 && ((p = h.contentDOM) == null || p.appendChild(
    Pt$1(n, t.children, e, o)
  )), h.dom;
}
function Mt(n, t, e, o) {
  const s = ((o == null ? void 0 : o.document) ?? document).createDocumentFragment();
  for (const i of t) {
    const c = Cn(n, i, e, o);
    s.appendChild(c);
  }
  return s;
}
const Pt$1 = (n, t, e, o) => {
  var c;
  const r = n.pmSchema.nodes.blockGroup, s = r.spec.toDOM(r.create({})), i = Mt(n, t, e, o);
  return (c = s.contentDOM) == null || c.appendChild(i), s.dom;
}, vn = (n, t) => {
  const e = DOMSerializer.fromSchema(n);
  return {
    serializeBlocks: (o, r) => Pt$1(t, o, e, r).outerHTML
  };
};
function Sn(n, t) {
  if (t === 0)
    return;
  const e = n.resolve(t);
  for (let o = e.depth; o > 0; o--) {
    const r = e.node(o);
    if (Lt$1(r))
      return r.attrs.id;
  }
}
function En(n) {
  return n.getMeta("paste") ? { type: "paste" } : n.getMeta("uiEvent") === "drop" ? { type: "drop" } : n.getMeta("history$") ? {
    type: n.getMeta("history$").redo ? "redo" : "undo"
  } : n.getMeta("y-sync$") ? n.getMeta("y-sync$").isUndoRedoOperation ? { type: "undo-redo" } : { type: "yjs-remote" } : { type: "local" };
}
function et$1(n) {
  const t = "__root__", e = {}, o = {}, r = ht$3(n);
  return n.descendants((s, i) => {
    if (!Lt$1(s))
      return true;
    const c = Sn(n, i), a = c ?? t;
    o[a] || (o[a] = []);
    const l = L(s, r);
    return e[s.attrs.id] = { block: l, parentId: c }, o[a].push(s.attrs.id), true;
  }), { byId: e, childrenByParent: o };
}
function Bn(n, t) {
  const e = /* @__PURE__ */ new Set();
  if (!n || !t)
    return e;
  const o = new Set(n), r = t.filter((p) => o.has(p)), s = n.filter(
    (p) => r.includes(p)
  );
  if (s.length <= 1 || r.length <= 1)
    return e;
  const i = {};
  for (let p = 0; p < s.length; p++)
    i[s[p]] = p;
  const c = r.map((p) => i[p]), a = c.length, l = [], h = [], u = new Array(a).fill(-1), f = (p, k) => {
    let b = 0, w = p.length;
    for (; b < w; ) {
      const D = b + w >>> 1;
      p[D] < k ? b = D + 1 : w = D;
    }
    return b;
  };
  for (let p = 0; p < a; p++) {
    const k = c[p], b = f(l, k);
    b > 0 && (u[p] = h[b - 1]), b === l.length ? (l.push(k), h.push(p)) : (l[b] = k, h[b] = p);
  }
  const m = /* @__PURE__ */ new Set();
  let g = h[h.length - 1] ?? -1;
  for (; g !== -1; )
    m.add(g), g = u[g];
  for (let p = 0; p < r.length; p++)
    m.has(p) || e.add(r[p]);
  return e;
}
function Tt$1(n, t = []) {
  const e = En(n), o = combineTransactionSteps(n.before, [
    n,
    ...t
  ]), r = et$1(
    o.before
  ), s = et$1(
    o.doc
  ), i = [], c = /* @__PURE__ */ new Set();
  Object.keys(s.byId).filter((m) => !(m in r.byId)).forEach((m) => {
    i.push({
      type: "insert",
      block: s.byId[m].block,
      source: e,
      prevBlock: void 0
    }), c.add(m);
  }), Object.keys(r.byId).filter((m) => !(m in s.byId)).forEach((m) => {
    i.push({
      type: "delete",
      block: r.byId[m].block,
      source: e,
      prevBlock: void 0
    }), c.add(m);
  }), Object.keys(s.byId).filter((m) => m in r.byId).forEach((m) => {
    var b, w;
    const g = r.byId[m], p = s.byId[m];
    g.parentId !== p.parentId ? (i.push({
      type: "move",
      block: p.block,
      prevBlock: g.block,
      source: e,
      prevParent: g.parentId ? (b = r.byId[g.parentId]) == null ? void 0 : b.block : void 0,
      currentParent: p.parentId ? (w = s.byId[p.parentId]) == null ? void 0 : w.block : void 0
    }), c.add(m)) : Ao(
      { ...g.block, children: void 0 },
      { ...p.block, children: void 0 }
    ) || (i.push({
      type: "update",
      block: p.block,
      prevBlock: g.block,
      source: e
    }), c.add(m));
  });
  const a = r.childrenByParent, l = s.childrenByParent, h = "__root__", u = /* @__PURE__ */ new Set([
    ...Object.keys(a),
    ...Object.keys(l)
  ]), f = /* @__PURE__ */ new Set();
  return u.forEach((m) => {
    const g = Bn(
      a[m],
      l[m]
    );
    g.size !== 0 && g.forEach((p) => {
      var D, F;
      const k = r.byId[p], b = s.byId[p];
      !k || !b || k.parentId !== b.parentId || c.has(p) || (k.parentId ?? h) !== m || f.has(p) || (f.add(p), i.push({
        type: "move",
        block: b.block,
        prevBlock: k.block,
        source: e,
        prevParent: k.parentId ? (D = r.byId[k.parentId]) == null ? void 0 : D.block : void 0,
        currentParent: b.parentId ? (F = s.byId[b.parentId]) == null ? void 0 : F.block : void 0
      }), c.add(p));
    });
  }), i;
}
const Ue$1 = [
  "vscode-editor-data",
  "blocknote/html",
  "text/markdown",
  "text/html",
  "text/plain",
  "Files"
];
function Mn(n, t) {
  if (!n.startsWith(".") || !t.startsWith("."))
    throw new Error("The strings provided are not valid file extensions.");
  return n === t;
}
function Pn(n, t) {
  const e = n.split("/"), o = t.split("/");
  if (e.length !== 2)
    throw new Error(`The string ${n} is not a valid MIME type.`);
  if (o.length !== 2)
    throw new Error(`The string ${t} is not a valid MIME type.`);
  return e[1] === "*" || o[1] === "*" ? e[0] === o[0] : (e[0] === "*" || o[0] === "*" || e[0] === o[0]) && e[1] === o[1];
}
function tt$1(n, t, e, o = "after") {
  let r;
  return Array.isArray(t.content) && t.content.length === 0 ? r = n.updateBlock(t, e).id : r = n.insertBlocks(
    [e],
    t,
    o
  )[0].id, r;
}
async function xt$1(n, t) {
  var s;
  if (!t.uploadFile) {
    console.warn(
      "Attempted ot insert file, but uploadFile is not set in the BlockNote editor options"
    );
    return;
  }
  const e = "dataTransfer" in n ? n.dataTransfer : n.clipboardData;
  if (e === null)
    return;
  let o = null;
  for (const i of Ue$1)
    if (e.types.includes(i)) {
      o = i;
      break;
    }
  if (o !== "Files")
    return;
  const r = e.items;
  if (r) {
    n.preventDefault();
    for (let i = 0; i < r.length; i++) {
      let c = "file";
      for (const l of Object.values(t.schema.blockSpecs))
        for (const h of ((s = l.implementation.meta) == null ? void 0 : s.fileBlockAccept) || []) {
          const u = h.startsWith("."), f = r[i].getAsFile();
          if (f && (!u && f.type && Pn(r[i].type, h) || u && Mn(
            "." + f.name.split(".").pop(),
            h
          ))) {
            c = l.config.type;
            break;
          }
        }
      const a = r[i].getAsFile();
      if (a) {
        const l = {
          type: c,
          props: {
            name: a.name
          }
        };
        let h;
        if (n.type === "paste") {
          const m = t.getTextCursorPosition().block;
          h = tt$1(t, m, l);
        } else if (n.type === "drop") {
          const m = {
            left: n.clientX,
            top: n.clientY
          }, g = t.prosemirrorView.posAtCoords(m);
          if (!g)
            return;
          h = t.transact((p) => {
            const k = Y(p.doc, g.pos), b = t.prosemirrorView.dom.querySelector(
              `[data-id="${k.node.attrs.id}"]`
            ), w = b == null ? void 0 : b.getBoundingClientRect();
            return tt$1(
              t,
              t.getBlock(k.node.attrs.id),
              l,
              w && (w.top + w.bottom) / 2 > m.top ? "before" : "after"
            );
          });
        } else
          return;
        const u = await t.uploadFile(a, h), f = typeof u == "string" ? {
          props: {
            url: u
          }
        } : { ...u };
        t.updateBlock(h, f);
      }
    }
  }
}
const Tn = (n) => Extension.create({
  name: "dropFile",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(t, e) {
              if (!n.isEditable)
                return;
              let o = null;
              for (const r of Ue$1)
                if (e.dataTransfer.types.includes(r)) {
                  o = r;
                  break;
                }
              return o === null ? true : o === "Files" ? (xt$1(e, n), true) : false;
            }
          }
        }
      })
    ];
  }
}), xn = /(^|\n) {0,3}#{1,6} {1,8}[^\n]{1,64}\r?\n\r?\n\s{0,32}\S/, In = /(_|__|\*|\*\*|~~|==|\+\+)(?!\s)(?:[^\s](?:.{0,62}[^\s])?|\S)(?=\1)/, Ln = /\[[^\]]{1,128}\]\(https?:\/\/\S{1,999}\)/, An = /(?:\s|^)`(?!\s)(?:[^\s`](?:[^`]{0,46}[^\s`])?|[^\s`])`([^\w]|$)/, Dn = /(?:^|\n)\s{0,5}-\s{1}[^\n]+\n\s{0,15}-\s/, On = /(?:^|\n)\s{0,5}\d+\.\s{1}[^\n]+\n\s{0,15}\d+\.\s/, _n = /\n{2} {0,3}-{2,48}\n{2}/, Nn = /(?:\n|^)(```|~~~|\$\$)(?!`|~)[^\s]{0,64} {0,64}[^\n]{0,64}\n[\s\S]{0,9999}?\s*\1 {0,64}(?:\n+|$)/, Hn = /(?:\n|^)(?!\s)\w[^\n]{0,64}\r?\n(-|=)\1{0,64}\n\n\s{0,64}(\w|$)/, Un = /(?:^|(\r?\n\r?\n))( {0,3}>[^\n]{1,333}\n){1,999}($|(\r?\n))/, Rn = /^\s*\|(.+\|)+\s*$/m, Vn = /^\s*\|(\s*[-:]+[-:]\s*\|)+\s*$/m, $n = /^\s*\|(.+\|)+\s*$/m, Fn = (n) => xn.test(n) || In.test(n) || Ln.test(n) || An.test(n) || Dn.test(n) || On.test(n) || _n.test(n) || Nn.test(n) || Hn.test(n) || Un.test(n) || Rn.test(n) || Vn.test(n) || $n.test(n);
async function zn(n, t) {
  const { schema: e } = t.state;
  if (!n.clipboardData)
    return false;
  const o = n.clipboardData.getData("text/plain");
  if (!o)
    return false;
  if (!e.nodes.codeBlock)
    return t.pasteText(o), true;
  const r = n.clipboardData.getData("vscode-editor-data"), s = r ? JSON.parse(r) : void 0, i = s == null ? void 0 : s.mode;
  return i ? (t.pasteHTML(
    `<pre><code class="language-${i}">${o.replace(
      /\r\n?/g,
      `
`
    )}</code></pre>`
  ), true) : false;
}
function Gn({
  event: n,
  editor: t,
  prioritizeMarkdownOverHTML: e,
  plainTextAsMarkdown: o
}) {
  var c;
  if (t.transact(
    (a) => a.selection.$from.parent.type.spec.code && a.selection.$to.parent.type.spec.code
  )) {
    const a = (c = n.clipboardData) == null ? void 0 : c.getData("text/plain");
    if (a)
      return t.pasteText(a), true;
  }
  let s;
  for (const a of Ue$1)
    if (n.clipboardData.types.includes(a)) {
      s = a;
      break;
    }
  if (!s)
    return true;
  if (s === "vscode-editor-data")
    return zn(n, t.prosemirrorView), true;
  if (s === "Files")
    return xt$1(n, t), true;
  const i = n.clipboardData.getData(s);
  if (s === "blocknote/html")
    return t.pasteHTML(i, true), true;
  if (s === "text/markdown")
    return t.pasteMarkdown(i), true;
  if (e) {
    const a = n.clipboardData.getData("text/plain");
    if (Fn(a))
      return t.pasteMarkdown(a), true;
  }
  return s === "text/html" ? (t.pasteHTML(i), true) : o ? (t.pasteMarkdown(i), true) : (t.pasteText(i), true);
}
const jn = (n, t) => Extension.create({
  name: "pasteFromClipboard",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            paste(e, o) {
              if (o.preventDefault(), !!n.isEditable)
                return t({
                  event: o,
                  editor: n,
                  defaultPasteHandler: ({
                    prioritizeMarkdownOverHTML: r = true,
                    plainTextAsMarkdown: s = true
                  } = {}) => Gn({
                    event: o,
                    editor: n,
                    prioritizeMarkdownOverHTML: r,
                    plainTextAsMarkdown: s
                  })
                });
            }
          }
        }
      })
    ];
  }
});
function Kn() {
  const n = (t) => {
    let e = t.children.length;
    for (let o = 0; o < e; o++) {
      const r = t.children[o];
      if (r.type === "element" && (n(r), r.tagName === "u"))
        if (r.children.length > 0) {
          t.children.splice(o, 1, ...r.children);
          const s = r.children.length - 1;
          e += s, o += s;
        } else
          t.children.splice(o, 1), e--, o--;
    }
  };
  return n;
}
function qn() {
  const n = (t) => {
    var e;
    if (t.children && "length" in t.children && t.children.length)
      for (let o = t.children.length - 1; o >= 0; o--) {
        const r = t.children[o], s = o + 1 < t.children.length ? t.children[o + 1] : void 0;
        r.type === "element" && r.tagName === "input" && ((e = r.properties) == null ? void 0 : e.type) === "checkbox" && (s == null ? void 0 : s.type) === "element" && s.tagName === "p" ? (s.tagName = "span", s.children.splice(
          0,
          0,
          fromDom(document.createTextNode(" "))
        )) : n(r);
      }
  };
  return n;
}
function Yn() {
  return (n) => {
    visit(n, "element", (t, e, o) => {
      var r, s, i, c;
      if (o && t.tagName === "video") {
        const a = ((r = t.properties) == null ? void 0 : r.src) || ((s = t.properties) == null ? void 0 : s["data-url"]) || "", l = ((i = t.properties) == null ? void 0 : i.title) || ((c = t.properties) == null ? void 0 : c["data-name"]) || "";
        o.children[e] = {
          type: "text",
          value: `![${l}](${a})`
        };
      }
    });
  };
}
function Re$1(n) {
  return unified().use(rehypeParse, { fragment: true }).use(Yn).use(Kn).use(qn).use(rehypeRemark).use(remarkGfm).use(remarkStringify, {
    handlers: { text: (e) => e.value }
  }).processSync(n).value;
}
function Wn(n, t, e, o) {
  const s = Ce(t, e).exportBlocks(n, o);
  return Re$1(s);
}
function It(n) {
  const t = [];
  return n.descendants((e) => {
    var r, s;
    const o = ht$3(e);
    return e.type.name === "blockContainer" && ((r = e.firstChild) == null ? void 0 : r.type.name) === "blockGroup" ? true : e.type.name === "columnList" && e.childCount === 1 ? ((s = e.firstChild) == null || s.forEach((i) => {
      t.push(L(i, o));
    }), false) : e.type.isInGroup("bnBlock") ? (t.push(L(e, o)), false) : true;
  }), t;
}
function Xn(n, t, e) {
  var c;
  let o = false;
  const r = n.state.selection instanceof CellSelection;
  if (!r) {
    const a = n.state.doc.slice(
      n.state.selection.from,
      n.state.selection.to,
      false
    ).content, l = [];
    for (let h = 0; h < a.childCount; h++)
      l.push(a.child(h));
    o = l.find(
      (h) => h.type.isInGroup("bnBlock") || h.type.name === "blockGroup" || h.type.spec.group === "blockContent"
    ) === void 0, o && (t = a);
  }
  let s;
  const i = Ce(
    n.state.schema,
    e
  );
  if (r) {
    ((c = t.firstChild) == null ? void 0 : c.type.name) === "table" && (t = t.firstChild.content);
    const a = gt$2(
      t,
      e.schema.inlineContentSchema,
      e.schema.styleSchema
    );
    s = `<table>${i.exportInlineContent(
      a,
      {}
    )}</table>`;
  } else if (o) {
    const a = F$2(
      t,
      e.schema.inlineContentSchema,
      e.schema.styleSchema
    );
    s = i.exportInlineContent(a, {});
  } else {
    const a = It(t);
    s = i.exportBlocks(a, {});
  }
  return s;
}
function Lt(n, t) {
  "node" in n.state.selection && n.state.selection.node.type.spec.group === "blockContent" && t.transact(
    (i) => i.setSelection(
      new NodeSelection(i.doc.resolve(n.state.selection.from - 1))
    )
  );
  const e = n.serializeForClipboard(
    n.state.selection.content()
  ).dom.innerHTML, o = n.state.selection.content().content, r = Xn(
    n,
    o,
    t
  ), s = Re$1(r);
  return { clipboardHTML: e, externalHTML: r, markdown: s };
}
const ot$1 = () => {
  const n = window.getSelection();
  if (!n || n.isCollapsed)
    return true;
  let t = n.focusNode;
  for (; t; ) {
    if (t instanceof HTMLElement && t.getAttribute("contenteditable") === "false")
      return true;
    t = t.parentElement;
  }
  return false;
}, nt$1 = (n, t, e) => {
  e.preventDefault(), e.clipboardData.clearData();
  const { clipboardHTML: o, externalHTML: r, markdown: s } = Lt(
    t,
    n
  );
  e.clipboardData.setData("blocknote/html", o), e.clipboardData.setData("text/html", r), e.clipboardData.setData("text/plain", s);
}, Jn = (n) => Extension.create({
  name: "copyToClipboard",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            copy(t, e) {
              return ot$1() || nt$1(n, t, e), true;
            },
            cut(t, e) {
              return ot$1() || (nt$1(n, t, e), t.editable && t.dispatch(t.state.tr.deleteSelection())), true;
            },
            // This is for the use-case in which only a block without content
            // is selected, e.g. an image block, and dragged (not using the
            // drag handle).
            dragstart(t, e) {
              if (!("node" in t.state.selection) || t.state.selection.node.type.spec.group !== "blockContent")
                return;
              n.transact(
                (i) => i.setSelection(
                  new NodeSelection(
                    i.doc.resolve(t.state.selection.from - 1)
                  )
                )
              ), e.preventDefault(), e.dataTransfer.clearData();
              const { clipboardHTML: o, externalHTML: r, markdown: s } = Lt(t, n);
              return e.dataTransfer.setData("blocknote/html", o), e.dataTransfer.setData("text/html", r), e.dataTransfer.setData("text/plain", s), true;
            }
          }
        }
      })
    ];
  }
}), Qn = Extension.create({
  name: "blockBackgroundColor",
  addGlobalAttributes() {
    return [
      {
        types: ["tableCell", "tableHeader"],
        attributes: {
          backgroundColor: uo()
        }
      }
    ];
  }
});
class Zn extends Wt {
  constructor() {
    super();
    d(this, "beforeChangeCallbacks", []);
    this.addProsemirrorPlugin(
      new Plugin({
        key: new PluginKey("blockChange"),
        filterTransaction: (e) => {
          let o;
          return this.beforeChangeCallbacks.reduce((r, s) => r === false ? r : s({
            getChanges() {
              return o || (o = Tt$1(e), o);
            },
            tr: e
          }) !== false, true);
        }
      })
    );
  }
  static key() {
    return "blockChange";
  }
  subscribe(e) {
    return this.beforeChangeCallbacks.push(e), () => {
      this.beforeChangeCallbacks = this.beforeChangeCallbacks.filter(
        (o) => o !== e
      );
    };
  }
}
const j = class j2 extends Wt {
  constructor(e) {
    super();
    d(this, "provider");
    d(this, "recentlyUpdatedCursors");
    d(this, "renderCursor", (e2, o) => {
      let r = this.recentlyUpdatedCursors.get(o);
      if (!r) {
        const s = (this.collaboration.renderCursor ?? j2.defaultCursorRender)(e2);
        this.collaboration.showCursorLabels !== "always" && (s.addEventListener("mouseenter", () => {
          const i = this.recentlyUpdatedCursors.get(o);
          i.element.setAttribute("data-active", ""), i.hideTimeout && (clearTimeout(i.hideTimeout), this.recentlyUpdatedCursors.set(o, {
            element: i.element,
            hideTimeout: void 0
          }));
        }), s.addEventListener("mouseleave", () => {
          const i = this.recentlyUpdatedCursors.get(o);
          this.recentlyUpdatedCursors.set(o, {
            element: i.element,
            hideTimeout: setTimeout(() => {
              i.element.removeAttribute("data-active");
            }, 2e3)
          });
        })), r = {
          element: s,
          hideTimeout: void 0
        }, this.recentlyUpdatedCursors.set(o, r);
      }
      return r.element;
    });
    d(this, "updateUser", (e2) => {
      this.provider.awareness.setLocalStateField("user", e2);
    });
    this.collaboration = e, this.provider = e.provider, this.recentlyUpdatedCursors = /* @__PURE__ */ new Map(), this.provider.awareness.setLocalStateField("user", e.user), e.showCursorLabels !== "always" && this.provider.awareness.on(
      "change",
      ({
        updated: o
      }) => {
        for (const r of o) {
          const s = this.recentlyUpdatedCursors.get(r);
          s && (s.element.setAttribute("data-active", ""), s.hideTimeout && clearTimeout(s.hideTimeout), this.recentlyUpdatedCursors.set(r, {
            element: s.element,
            hideTimeout: setTimeout(() => {
              s.element.removeAttribute("data-active");
            }, 2e3)
          }));
        }
      }
    ), this.addProsemirrorPlugin(
      yCursorPlugin(this.provider.awareness, {
        selectionBuilder: defaultSelectionBuilder,
        cursorBuilder: this.renderCursor
      })
    );
  }
  static key() {
    return "yCursorPlugin";
  }
  get priority() {
    return 999;
  }
  /**
   * Determine whether the foreground color should be white or black based on a provided background color
   * Inspired by: https://stackoverflow.com/a/3943023
   *
   */
  static isDarkColor(e) {
    const o = e.charAt(0) === "#" ? e.substring(1, 7) : e, r = parseInt(o.substring(0, 2), 16), s = parseInt(o.substring(2, 4), 16), i = parseInt(o.substring(4, 6), 16), a = [r / 255, s / 255, i / 255].map((h) => h <= 0.03928 ? h / 12.92 : Math.pow((h + 0.055) / 1.055, 2.4));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2] <= 0.179;
  }
};
d(j, "defaultCursorRender", (e) => {
  const o = document.createElement("span");
  o.classList.add("bn-collaboration-cursor__base");
  const r = document.createElement("span");
  r.setAttribute("contentedEditable", "false"), r.classList.add("bn-collaboration-cursor__caret"), r.setAttribute(
    "style",
    `background-color: ${e.color}; color: ${j.isDarkColor(e.color) ? "white" : "black"}`
  );
  const s = document.createElement("span");
  return s.classList.add("bn-collaboration-cursor__label"), s.setAttribute(
    "style",
    `background-color: ${e.color}; color: ${j.isDarkColor(e.color) ? "white" : "black"}`
  ), s.insertBefore(document.createTextNode(e.name), null), r.insertBefore(s, null), o.insertBefore(document.createTextNode("⁠"), null), o.insertBefore(r, null), o.insertBefore(document.createTextNode("⁠"), null), o;
});
let se = j;
class fe extends Wt {
  static key() {
    return "ySyncPlugin";
  }
  constructor(t) {
    super(), this.addProsemirrorPlugin(ySyncPlugin(t));
  }
  get priority() {
    return 1001;
  }
}
class ge extends Wt {
  static key() {
    return "yUndoPlugin";
  }
  constructor({ editor: t }) {
    super(), this.addProsemirrorPlugin(yUndoPlugin({ trackedOrigins: [t] }));
  }
  get priority() {
    return 1e3;
  }
}
class At extends Wt {
  constructor({
    editor: e,
    collaboration: o
  }) {
    super(e);
    d(this, "editor");
    d(this, "collaboration");
    d(this, "forkedState");
    this.editor = e, this.collaboration = o;
  }
  static key() {
    return "ForkYDocPlugin";
  }
  /**
   * To find a fragment in another ydoc, we need to search for it.
   */
  findTypeInOtherYdoc(e, o) {
    const r = e.doc;
    if (e._item === null) {
      const s = Array.from(r.share.keys()).find(
        (i) => r.share.get(i) === e
      );
      if (s == null)
        throw new Error("type does not exist in other ydoc");
      return o.get(s, e.constructor);
    } else {
      const s = e._item, i = o.store.clients.get(s.id.client) ?? [], c = findIndexSS(i, s.id.clock);
      return i[c].content.type;
    }
  }
  /**
   * Whether the editor is editing a forked document,
   * preserving a reference to the original document and the forked document.
   */
  get isForkedFromRemote() {
    return this.forkedState !== void 0;
  }
  /**
   * Fork the Y.js document from syncing to the remote,
   * allowing modifications to the document without affecting the remote.
   * These changes can later be rolled back or applied to the remote.
   */
  fork() {
    var s;
    if (this.isForkedFromRemote)
      return;
    const e = (s = this.collaboration) == null ? void 0 : s.fragment;
    if (!e)
      throw new Error("No fragment to fork from");
    const o = new Doc();
    applyUpdate(o, encodeStateAsUpdate(e.doc));
    const r = this.findTypeInOtherYdoc(e, o);
    this.forkedState = {
      undoStack: yUndoPluginKey.getState(this.editor.prosemirrorState).undoManager.undoStack,
      originalFragment: e,
      forkedFragment: r
    }, this.editor._tiptapEditor.unregisterPlugin([
      yCursorPluginKey,
      yUndoPluginKey,
      ySyncPluginKey
    ]), this.editor._tiptapEditor.registerPlugin(
      new fe(r).plugins[0]
    ), this.editor._tiptapEditor.registerPlugin(
      new ge({ editor: this.editor }).plugins[0]
    ), this.emit("forked", true);
  }
  /**
   * Resume syncing the Y.js document to the remote
   * If `keepChanges` is true, any changes that have been made to the forked document will be applied to the original document.
   * Otherwise, the original document will be restored and the changes will be discarded.
   */
  merge({ keepChanges: e }) {
    if (!this.forkedState)
      return;
    this.editor._tiptapEditor.unregisterPlugin(ySyncPluginKey), this.editor._tiptapEditor.unregisterPlugin(yUndoPluginKey);
    const { originalFragment: o, forkedFragment: r, undoStack: s } = this.forkedState;
    if (this.editor.extensions.ySyncPlugin = new fe(o), this.editor.extensions.yCursorPlugin = new se(
      this.collaboration
    ), this.editor.extensions.yUndoPlugin = new ge({
      editor: this.editor
    }), this.editor._tiptapEditor.registerPlugin(
      this.editor.extensions.ySyncPlugin.plugins[0]
    ), this.editor._tiptapEditor.registerPlugin(
      this.editor.extensions.yCursorPlugin.plugins[0]
    ), this.editor._tiptapEditor.registerPlugin(
      this.editor.extensions.yUndoPlugin.plugins[0]
    ), yUndoPluginKey.getState(
      this.editor.prosemirrorState
    ).undoManager.undoStack = s, e) {
      const i = encodeStateAsUpdate(
        r.doc,
        encodeStateVector(o.doc)
      );
      applyUpdate(o.doc, i, this.editor);
    }
    this.forkedState = void 0, this.emit("forked", false);
  }
}
const Dt = (n, t) => {
  t(n), n.forEach((e) => {
    e instanceof YXmlElement && Dt(e, t);
  });
}, er = (n, t) => {
  const e = /* @__PURE__ */ new Map();
  return n.forEach((o) => {
    o instanceof YXmlElement && Dt(o, (r) => {
      if (r.nodeName === "blockContainer" && r.hasAttribute("id")) {
        const s = r.getAttribute("textColor"), i = r.getAttribute("backgroundColor"), c = {
          textColor: s === m.textColor.default ? void 0 : s,
          backgroundColor: i === m.backgroundColor.default ? void 0 : i
        };
        (c.textColor || c.backgroundColor) && e.set(r.getAttribute("id"), c);
      }
    });
  }), e.size === 0 ? false : (t.doc.descendants((o, r) => {
    if (o.type.name === "blockContainer" && e.has(o.attrs.id)) {
      const s = t.doc.nodeAt(r + 1);
      if (!s)
        throw new Error("No element found");
      t.setNodeMarkup(r + 1, void 0, {
        // preserve existing attributes
        ...s.attrs,
        // add the textColor and backgroundColor attributes
        ...e.get(o.attrs.id)
      });
    }
  }), true);
}, tr = [er];
let Ve$1 = class Ve extends Wt {
  constructor(e) {
    const o = new PluginKey(Ve.key());
    super();
    d(this, "migrationDone", false);
    this.addProsemirrorPlugin(
      new Plugin({
        key: o,
        appendTransaction: (r, s, i) => {
          if (this.migrationDone || // If any of the transactions are not due to a yjs sync, we don't need to run the migration
          !r.some((a) => a.getMeta("y-sync$")) || // If none of the transactions result in a document change, we don't need to run the migration
          r.every((a) => !a.docChanged) || // If the fragment is still empty, we can't run the migration (since it has not yet been applied to the Y.Doc)
          !e.firstChild)
            return;
          const c = i.tr;
          for (const a of tr)
            a(e, c);
          if (this.migrationDone = true, !!c.docChanged)
            return c;
        }
      })
    );
  }
  static key() {
    return "schemaMigrationPlugin";
  }
};
const ke = Mark.create({
  name: "comment",
  excludes: "",
  inclusive: false,
  keepOnSplit: true,
  addAttributes() {
    return {
      // orphans are marks that currently don't have an active thread. It could be
      // that users have resolved the thread. Resolved threads by default are not shown in the document,
      // but we need to keep the mark (positioning) data so we can still "revive" it when the thread is unresolved
      // or we enter a "comments" view that includes resolved threads.
      orphan: {
        parseHTML: (n) => !!n.getAttribute("data-orphan"),
        renderHTML: (n) => n.orphan ? {
          "data-orphan": "true"
        } : {},
        default: false
      },
      threadId: {
        parseHTML: (n) => n.getAttribute("data-bn-thread-id"),
        renderHTML: (n) => ({
          "data-bn-thread-id": n.threadId
        }),
        default: ""
      }
    };
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "span",
      mergeAttributes(n, {
        class: "bn-thread-mark"
      })
    ];
  },
  parseHTML() {
    return [{ tag: "span.bn-thread-mark" }];
  },
  extendMarkSchema(n) {
    return n.name === "comment" ? {
      blocknoteIgnore: true
    } : {};
  }
});
class or extends Rt$1 {
  constructor(e) {
    super();
    d(this, "userCache", /* @__PURE__ */ new Map());
    d(this, "loadingUsers", /* @__PURE__ */ new Set());
    this.resolveUsers = e;
  }
  /**
   * Load information about users based on an array of user ids.
   */
  async loadUsers(e) {
    const o = e.filter(
      (r) => !this.userCache.has(r) && !this.loadingUsers.has(r)
    );
    if (o.length !== 0) {
      for (const r of o)
        this.loadingUsers.add(r);
      try {
        const r = await this.resolveUsers(o);
        for (const s of r)
          this.userCache.set(s.id, s);
        this.emit("update", this.userCache);
      } finally {
        for (const r of o)
          this.loadingUsers.delete(r);
      }
    }
  }
  /**
   * Retrieve information about a user based on their id, if cached.
   *
   * The user will have to be loaded via `loadUsers` first
   */
  getUser(e) {
    return this.userCache.get(e);
  }
  /**
   * Subscribe to changes in the user store.
   *
   * @param cb - The callback to call when the user store changes.
   * @returns A function to unsubscribe from the user store.
   */
  subscribe(e) {
    return this.on("update", e);
  }
}
const ce = new PluginKey("blocknote-comments"), nr = "SET_SELECTED_THREAD_ID";
function rr(n, t) {
  const e = /* @__PURE__ */ new Map();
  return n.descendants((o, r) => {
    o.marks.forEach((s) => {
      if (s.type.name === t) {
        const i = s.attrs.threadId;
        if (!i)
          return;
        const c = r, a = c + o.nodeSize, l = e.get(i) ?? {
          from: 1 / 0,
          to: 0
        };
        e.set(i, {
          from: Math.min(c, l.from),
          to: Math.max(a, l.to)
        });
      }
    });
  }), e;
}
class Ot extends Wt {
  constructor(e, o, r, s, i) {
    super();
    d(this, "userStore");
    d(this, "pendingComment", false);
    d(this, "selectedThreadId");
    d(this, "threadPositions", /* @__PURE__ */ new Map());
    d(this, "updateMarksFromThreads", (e2) => {
      this.editor.transact((o2) => {
        o2.doc.descendants((r2, s2) => {
          r2.marks.forEach((i2) => {
            if (i2.type.name === this.markType) {
              const c2 = i2.type, a = i2.attrs.threadId, l = e2.get(a), h = !!(!l || l.resolved || l.deletedAt);
              if (h !== i2.attrs.orphan) {
                const u = Math.max(s2, 0), f = Math.min(
                  s2 + r2.nodeSize,
                  o2.doc.content.size - 1,
                  o2.doc.content.size - 1
                );
                o2.removeMark(u, f, i2), o2.addMark(
                  u,
                  f,
                  c2.create({
                    ...i2.attrs,
                    orphan: h
                  })
                ), h && this.selectedThreadId === a && (this.selectedThreadId = void 0, this.emitStateUpdate());
              }
            }
          });
        });
      });
    });
    if (this.editor = e, this.threadStore = o, this.markType = r, this.resolveUsers = s, this.commentEditorSchema = i, !s)
      throw new Error("resolveUsers is required for comments");
    this.userStore = new or(s), this.threadStore.subscribe(this.updateMarksFromThreads), e.onCreate(() => {
      this.updateMarksFromThreads(this.threadStore.getThreads()), e.onSelectionChange(() => {
        this.pendingComment && (this.pendingComment = false, this.emitStateUpdate());
      });
    });
    const c = this;
    this.addProsemirrorPlugin(
      new Plugin({
        key: ce,
        state: {
          init() {
            return {
              decorations: DecorationSet.empty
            };
          },
          apply(a, l) {
            const h = a.getMeta(ce);
            if (!a.docChanged && !h)
              return l;
            const u = a.docChanged ? rr(a.doc, c.markType) : c.threadPositions;
            (u.size > 0 || c.threadPositions.size > 0) && (c.threadPositions = u, c.emitStateUpdate());
            const f = [];
            if (c.selectedThreadId) {
              const m = u.get(
                c.selectedThreadId
              );
              m && f.push(
                Decoration.inline(
                  m.from,
                  m.to,
                  {
                    class: "bn-thread-mark-selected"
                  }
                )
              );
            }
            return {
              decorations: DecorationSet.create(a.doc, f)
            };
          }
        },
        props: {
          decorations(a) {
            var l;
            return ((l = ce.getState(a)) == null ? void 0 : l.decorations) ?? DecorationSet.empty;
          },
          /**
           * Handle click on a thread mark and mark it as selected
           */
          handleClick: (a, l, h) => {
            var k;
            if (h.button !== 0)
              return;
            const u = a.state.doc.nodeAt(l);
            if (!u) {
              c.selectThread(void 0);
              return;
            }
            const f = a.state.schema.marks[r], m = a.state.doc.resolve(l), g = (k = u.marks.filter(
              (b) => b.type.name === r && b.attrs.orphan !== true
            ).map((b) => {
              const w = getMarkRange(
                m,
                f,
                b.attrs
              );
              return {
                mark: b,
                // calculate how far the mark is from the click position
                distance: (Math.abs(w.from - l) + Math.abs(w.to - l)) / 2,
                // calculate the length of text the mark spans
                length: w.to - w.from
              };
            }).sort((b, w) => b.distance !== w.distance ? b.distance - w.distance : b.length - w.length)[0]) == null ? void 0 : k.mark, p = g == null ? void 0 : g.attrs.threadId;
            c.selectThread(p);
          }
        }
      })
    );
  }
  static key() {
    return "comments";
  }
  emitStateUpdate() {
    this.emit("update", {
      selectedThreadId: this.selectedThreadId,
      pendingComment: this.pendingComment,
      threadPositions: this.threadPositions
    });
  }
  /**
   * Subscribe to state updates
   */
  onUpdate(e) {
    return this.on("update", e);
  }
  /**
   * Set the selected thread
   */
  selectThread(e) {
    var o, r;
    if (this.selectedThreadId !== e && (this.selectedThreadId = e, this.emitStateUpdate(), this.editor.transact(
      (s) => s.setMeta(ce, {
        name: nr
      })
    ), e)) {
      const s = this.threadPositions.get(e);
      if (!s)
        return;
      (r = (o = this.editor.prosemirrorView) == null ? void 0 : o.domAtPos(s.from).node) == null || r.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }
  /**
   * Start a pending comment (e.g.: when clicking the "Add comment" button)
   */
  startPendingComment() {
    this.pendingComment = true, this.emitStateUpdate();
  }
  /**
   * Stop a pending comment (e.g.: user closes the comment composer)
   */
  stopPendingComment() {
    this.pendingComment = false, this.emitStateUpdate();
  }
  /**
   * Create a thread at the current selection
   */
  async createThread(e) {
    const o = await this.threadStore.createThread(e);
    if (this.threadStore.addThreadToDocument) {
      const r = this.editor.prosemirrorView, s = r.state.selection, i = ySyncPluginKey.getState(r.state), c = {
        prosemirror: {
          head: s.head,
          anchor: s.anchor
        },
        yjs: i ? getRelativeSelection(i.binding, r.state) : void 0
        // if we're not using yjs
      };
      await this.threadStore.addThreadToDocument({
        threadId: o.id,
        selection: c
      });
    } else
      this.editor._tiptapEditor.commands.setMark(this.markType, {
        orphan: false,
        threadId: o.id
      });
  }
}
class sr {
  constructor(t, e, o, r) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "mouseDownHandler", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    d(this, "dragstartHandler", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    d(this, "scrollHandler", () => {
      var t2;
      if ((t2 = this.state) != null && t2.show) {
        const e2 = this.pmView.root.querySelector(
          `[data-node-type="blockContainer"][data-id="${this.state.block.id}"]`
        );
        if (!e2)
          return;
        this.state.referencePos = e2.getBoundingClientRect(), this.emitUpdate();
      }
    });
    d(this, "closeMenu", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    this.editor = t, this.pluginKey = e, this.pmView = o, this.emitUpdate = () => {
      if (!this.state)
        throw new Error("Attempting to update uninitialized file panel");
      r(this.state);
    }, o.dom.addEventListener("mousedown", this.mouseDownHandler), o.dom.addEventListener("dragstart", this.dragstartHandler), o.root.addEventListener("scroll", this.scrollHandler, true);
  }
  update(t, e) {
    var c, a;
    const o = this.pluginKey.getState(t.state), r = this.pluginKey.getState(e);
    if (!((c = this.state) != null && c.show) && (o != null && o.block) && this.editor.isEditable) {
      const l = this.pmView.root.querySelector(
        `[data-node-type="blockContainer"][data-id="${o.block.id}"]`
      );
      if (!l)
        return;
      this.state = {
        show: true,
        referencePos: l.getBoundingClientRect(),
        block: o.block
      }, this.emitUpdate();
      return;
    }
    const s = (o == null ? void 0 : o.block) && !(r != null && r.block), i = !(o != null && o.block) && (r == null ? void 0 : r.block);
    s && this.state && !this.state.show && (this.state.show = true, this.emitUpdate()), i && ((a = this.state) != null && a.show) && (this.state.show = false, this.emitUpdate());
  }
  destroy() {
    this.pmView.dom.removeEventListener("mousedown", this.mouseDownHandler), this.pmView.dom.removeEventListener("dragstart", this.dragstartHandler), this.pmView.root.removeEventListener("scroll", this.scrollHandler, true);
  }
}
const Ee$1 = new PluginKey(
  "FilePanelPlugin"
);
class ir extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "closeMenu", () => {
      var e2;
      return (e2 = this.view) == null ? void 0 : e2.closeMenu();
    });
    this.addProsemirrorPlugin(
      new Plugin({
        key: Ee$1,
        view: (o) => (this.view = new sr(
          e,
          Ee$1,
          o,
          (r) => {
            this.emit("update", r);
          }
        ), this.view),
        props: {
          handleKeyDown: (o, r) => {
            var s;
            return r.key === "Escape" && this.shown ? ((s = this.view) == null || s.closeMenu(), true) : false;
          }
        },
        state: {
          init: () => ({
            block: void 0
          }),
          apply: (o, r) => {
            const s = o.getMeta(Ee$1);
            return s || (!o.getMeta(ySyncPluginKey) && (o.selectionSet || o.docChanged) ? { block: void 0 } : r);
          }
        }
      })
    );
  }
  static key() {
    return "filePanel";
  }
  get shown() {
    var e, o;
    return ((o = (e = this.view) == null ? void 0 : e.state) == null ? void 0 : o.show) || false;
  }
  onUpdate(e) {
    return this.on("update", e);
  }
}
class ar {
  constructor(t, e, o) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "preventHide", false);
    d(this, "preventShow", false);
    d(this, "shouldShow", ({ view: t2, state: e2, from: o2, to: r }) => {
      const { doc: s, selection: i } = e2, { empty: c } = i, a = !s.textBetween(o2, r).length && isTextSelection(e2.selection);
      if (i.$from.parent.type.spec.code || isNodeSelection(i) && i.node.type.spec.code || c || a)
        return false;
      const l = document.activeElement;
      return !(!this.isElementWithinEditorWrapper(l) && t2.editable);
    });
    d(this, "blurHandler", (t2) => {
      var o2;
      if (this.preventHide) {
        this.preventHide = false;
        return;
      }
      const e2 = this.pmView.dom.parentElement;
      t2 && t2.relatedTarget && // Element is inside the editor.
      (e2 === t2.relatedTarget || e2.contains(t2.relatedTarget) || t2.relatedTarget.matches(
        ".bn-ui-container, .bn-ui-container *"
      )) || (o2 = this.state) != null && o2.show && (this.state.show = false, this.emitUpdate());
    });
    d(this, "isElementWithinEditorWrapper", (t2) => {
      if (!t2)
        return false;
      const e2 = this.pmView.dom.parentElement;
      return e2 ? e2.contains(t2) : false;
    });
    d(this, "viewMousedownHandler", (t2) => {
      (!this.isElementWithinEditorWrapper(t2.target) || t2.button === 0) && (this.preventShow = true);
    });
    d(this, "mouseupHandler", () => {
      this.preventShow && (this.preventShow = false, setTimeout(() => this.update(this.pmView)));
    });
    d(this, "dragHandler", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    d(this, "scrollHandler", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.referencePos = this.getSelectionBoundingBox(), this.emitUpdate());
    });
    d(this, "closeMenu", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    this.editor = t, this.pmView = e, this.emitUpdate = () => {
      if (!this.state)
        throw new Error(
          "Attempting to update uninitialized formatting toolbar"
        );
      o(this.state);
    }, e.dom.addEventListener("mousedown", this.viewMousedownHandler), e.root.addEventListener("mouseup", this.mouseupHandler), e.dom.addEventListener("dragstart", this.dragHandler), e.dom.addEventListener("dragover", this.dragHandler), e.dom.addEventListener("blur", this.blurHandler), e.root.addEventListener("scroll", this.scrollHandler, true);
  }
  update(t, e) {
    var m, g, p;
    const { state: o, composing: r } = t, { doc: s, selection: i } = o, c = e && e.doc.eq(s) && e.selection.eq(i);
    if (r || c)
      return;
    const { ranges: a } = i, l = Math.min(...a.map((k) => k.$from.pos)), h = Math.max(...a.map((k) => k.$to.pos)), u = this.shouldShow({
      view: t,
      state: o,
      from: l,
      to: h
    }), f = typeof Range.prototype.getClientRects > "u";
    if (!this.preventShow && (u || this.preventHide) && !f) {
      const k = this.getSelectionBoundingBox();
      if (k.height === 0 && k.width === 0) {
        queueMicrotask(() => {
          const w = {
            show: true,
            referencePos: this.getSelectionBoundingBox()
          };
          this.state = w, this.emitUpdate(), t.dispatch(
            t.state.tr.setSelection(
              TextSelection.create(
                t.state.doc,
                t.state.selection.from + 1,
                t.state.selection.to
              )
            )
          ), t.dispatch(
            t.state.tr.setSelection(
              TextSelection.create(
                t.state.doc,
                t.state.selection.from - 1,
                t.state.selection.to
              )
            )
          );
        });
        return;
      }
      const b = {
        show: true,
        referencePos: this.getSelectionBoundingBox()
      };
      (b.show !== ((m = this.state) == null ? void 0 : m.show) || b.referencePos.toJSON() !== ((g = this.state) == null ? void 0 : g.referencePos.toJSON())) && (this.state = b, this.emitUpdate());
      return;
    }
    if ((p = this.state) != null && p.show && !this.preventHide && (!u || this.preventShow || !this.editor.isEditable)) {
      this.state.show = false, this.emitUpdate();
      return;
    }
  }
  destroy() {
    this.pmView.dom.removeEventListener("mousedown", this.viewMousedownHandler), this.pmView.root.removeEventListener("mouseup", this.mouseupHandler), this.pmView.dom.removeEventListener("dragstart", this.dragHandler), this.pmView.dom.removeEventListener("dragover", this.dragHandler), this.pmView.dom.removeEventListener("blur", this.blurHandler), this.pmView.root.removeEventListener("scroll", this.scrollHandler, true);
  }
  getSelectionBoundingBox() {
    const { state: t } = this.pmView, { selection: e } = t, { ranges: o } = e, r = Math.min(...o.map((i) => i.$from.pos)), s = Math.max(...o.map((i) => i.$to.pos));
    if (isNodeSelection(e)) {
      const i = this.pmView.nodeDOM(r);
      if (i)
        return i.getBoundingClientRect();
    }
    return posToDOMRect(this.pmView, r, s);
  }
}
const cr = new PluginKey(
  "FormattingToolbarPlugin"
);
class lr extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "closeMenu", () => this.view.closeMenu());
    this.addProsemirrorPlugin(
      new Plugin({
        key: cr,
        view: (o) => (this.view = new ar(e, o, (r) => {
          this.emit("update", r);
        }), this.view),
        props: {
          handleKeyDown: (o, r) => r.key === "Escape" && this.shown ? (this.view.closeMenu(), true) : false
        }
      })
    );
  }
  static key() {
    return "formattingToolbar";
  }
  get shown() {
    var e, o;
    return ((o = (e = this.view) == null ? void 0 : e.state) == null ? void 0 : o.show) || false;
  }
  onUpdate(e) {
    return this.on("update", e);
  }
}
const dr = Node3.create({
  name: "hardBreak",
  inline: true,
  group: "inline",
  selectable: false,
  linebreakReplacement: true,
  priority: 10,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", mergeAttributes(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  }
}), Le$1 = (n, t) => {
  const e = n.resolve(t), o = e.index();
  if (o === 0)
    return;
  const r = e.posAtIndex(o - 1);
  return It$2(
    n.resolve(r)
  );
}, _t = (n, t) => {
  for (; t.childContainer; ) {
    const e = t.childContainer.node, o = n.resolve(t.childContainer.beforePos + 1).posAtIndex(e.childCount - 1);
    t = It$2(n.resolve(o));
  }
  return t;
}, hr = (n, t) => n.isBlockContainer && n.blockContent.node.type.spec.content === "inline*" && n.blockContent.node.childCount > 0 && t.isBlockContainer && t.blockContent.node.type.spec.content === "inline*", ur = (n, t, e, o) => {
  if (!o.isBlockContainer)
    throw new Error(
      `Attempted to merge block at position ${o.bnBlock.beforePos} into previous block at position ${e.bnBlock.beforePos}, but next block is not a block container`
    );
  if (o.childContainer) {
    const r = n.doc.resolve(
      o.childContainer.beforePos + 1
    ), s = n.doc.resolve(
      o.childContainer.afterPos - 1
    ), i = r.blockRange(s);
    if (t) {
      const c = n.doc.resolve(o.bnBlock.beforePos);
      n.tr.lift(i, c.depth);
    }
  }
  if (t) {
    if (!e.isBlockContainer)
      throw new Error(
        `Attempted to merge block at position ${o.bnBlock.beforePos} into previous block at position ${e.bnBlock.beforePos}, but previous block is not a block container`
      );
    t(
      n.tr.delete(
        e.blockContent.afterPos - 1,
        o.blockContent.beforePos + 1
      )
    );
  }
  return true;
}, rt$1 = (n) => ({
  state: t,
  dispatch: e
}) => {
  const o = t.doc.resolve(n), r = It$2(o), s = Le$1(
    t.doc,
    r.bnBlock.beforePos
  );
  if (!s)
    return false;
  const i = _t(
    t.doc,
    s
  );
  return hr(i, r) ? ur(t, e, i, r) : false;
};
function pr(n, t, e) {
  const { $from: o, $to: r } = n.selection, s = o.blockRange(
    r,
    (g) => g.childCount > 0 && (g.type.name === "blockGroup" || g.type.name === "column")
    // change necessary to not look at first item child type
  );
  if (!s)
    return false;
  const i = s.startIndex;
  if (i === 0)
    return false;
  const a = s.parent.child(i - 1);
  if (a.type !== t)
    return false;
  const l = a.lastChild && a.lastChild.type === e, h = Fragment.from(l ? t.create() : null), u = new Slice(
    Fragment.from(
      t.create(null, Fragment.from(e.create(null, h)))
      // change necessary to create "groupType" instead of parent.type
    ),
    l ? 3 : 1,
    0
  ), f = s.start, m = s.end;
  return n.step(
    new ReplaceAroundStep(
      f - (l ? 3 : 1),
      m,
      f,
      m,
      u,
      1,
      true
    )
  ).scrollIntoView(), true;
}
function Nt$1(n) {
  return n.transact((t) => pr(
    t,
    n.pmSchema.nodes.blockContainer,
    n.pmSchema.nodes.blockGroup
  ));
}
function mr(n) {
  n._tiptapEditor.commands.liftListItem("blockContainer");
}
function fr(n) {
  return n.transact((t) => {
    const { bnBlock: e } = Ot$2(t);
    return t.doc.resolve(e.beforePos).nodeBefore !== null;
  });
}
function gr(n) {
  return n.transact((t) => {
    const { bnBlock: e } = Ot$2(t);
    return t.doc.resolve(e.beforePos).depth > 1;
  });
}
const kr = Extension.create({
  priority: 50,
  // TODO: The shortcuts need a refactor. Do we want to use a command priority
  //  design as there is now, or clump the logic into a single function?
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ chain: o, commands: r }) => [
      // Deletes the selection if it's not empty.
      () => r.deleteSelection(),
      // Undoes an input rule if one was triggered in the last editor state change.
      () => r.undoInputRule(),
      // Reverts block content type to a paragraph if the selection is at the start of the block.
      () => r.command(({ state: s }) => {
        const i = Tt$3(s);
        if (!i.isBlockContainer)
          return false;
        const c = s.selection.from === i.blockContent.beforePos + 1, a = i.blockContent.node.type.name === "paragraph";
        return c && !a ? r.command(
          co(i.bnBlock.beforePos, {
            type: "paragraph",
            props: {}
          })
        ) : false;
      }),
      // Removes a level of nesting if the block is indented if the selection is at the start of the block.
      () => r.command(({ state: s }) => {
        const i = Tt$3(s);
        if (!i.isBlockContainer)
          return false;
        const { blockContent: c } = i;
        return s.selection.from === c.beforePos + 1 ? r.liftListItem("blockContainer") : false;
      }),
      // Merges block with the previous one if it isn't indented, and the selection is at the start of the
      // block. The target block for merging must contain inline content.
      () => r.command(({ state: s }) => {
        const i = Tt$3(s);
        if (!i.isBlockContainer)
          return false;
        const { bnBlock: c, blockContent: a } = i, l = s.selection.from === a.beforePos + 1, h = s.selection.empty, u = c.beforePos;
        return l && h ? o().command(rt$1(u)).scrollIntoView().run() : false;
      }),
      () => r.command(({ state: s, tr: i, dispatch: c }) => {
        const a = Tt$3(s);
        if (!a.isBlockContainer || !(i.selection.from === a.blockContent.beforePos + 1))
          return false;
        const h = i.doc.resolve(a.bnBlock.beforePos);
        if (h.nodeBefore || h.node().type.name !== "column")
          return false;
        const m = i.doc.resolve(a.bnBlock.beforePos), g = i.doc.resolve(m.before()), p = g.before();
        if (c) {
          const k = i.doc.slice(
            a.bnBlock.beforePos,
            a.bnBlock.afterPos
          ).content;
          i.delete(
            a.bnBlock.beforePos,
            a.bnBlock.afterPos
          ), g.index() === 0 ? (Ie$1(i, p), i.insert(p, k), i.setSelection(
            TextSelection.near(i.doc.resolve(p))
          )) : (i.insert(g.pos - 1, k), i.setSelection(
            TextSelection.near(i.doc.resolve(g.pos - 1))
          ), Ie$1(i, p));
        }
        return true;
      }),
      // Deletes the current block if it's an empty block with inline content,
      // and moves the selection to the previous block.
      () => r.command(({ state: s }) => {
        const i = Tt$3(s);
        if (!i.isBlockContainer)
          return false;
        if (i.blockContent.node.childCount === 0 && i.blockContent.node.type.spec.content === "inline*") {
          const a = Le$1(
            s.doc,
            i.bnBlock.beforePos
          );
          if (!a || !a.isBlockContainer)
            return false;
          let l = o();
          if (a.blockContent.node.type.spec.content === "tableRow+") {
            const g = i.bnBlock.beforePos - 1 - 1 - 1 - 1 - 1;
            l = l.setTextSelection(
              g
            );
          } else if (a.blockContent.node.type.spec.content === "") {
            const h = a.blockContent.afterPos - a.blockContent.node.nodeSize;
            l = l.setNodeSelection(
              h
            );
          } else {
            const h = a.blockContent.afterPos - a.blockContent.node.nodeSize;
            l = l.setTextSelection(h);
          }
          return l.deleteRange({
            from: i.bnBlock.beforePos,
            to: i.bnBlock.afterPos
          }).scrollIntoView().run();
        }
        return false;
      }),
      // Deletes previous block if it contains no content and isn't a table,
      // when the selection is empty and at the start of the block. Moves the
      // current block into the deleted block's place.
      () => r.command(({ state: s }) => {
        const i = Tt$3(s);
        if (!i.isBlockContainer)
          throw new Error("todo");
        const c = s.selection.from === i.blockContent.beforePos + 1, a = s.selection.empty, l = Le$1(
          s.doc,
          i.bnBlock.beforePos
        );
        if (l && c && a) {
          const h = _t(
            s.doc,
            l
          );
          if (!h.isBlockContainer)
            throw new Error("todo");
          if (h.blockContent.node.type.spec.content === "" || h.blockContent.node.type.spec.content === "inline*" && h.blockContent.node.childCount === 0)
            return o().cut(
              {
                from: i.bnBlock.beforePos,
                to: i.bnBlock.afterPos
              },
              h.bnBlock.afterPos
            ).deleteRange({
              from: h.bnBlock.beforePos,
              to: h.bnBlock.afterPos
            }).run();
        }
        return false;
      })
    ]), t = () => this.editor.commands.first(({ commands: o }) => [
      // Deletes the selection if it's not empty.
      () => o.deleteSelection(),
      // Merges block with the next one (at the same nesting level or lower),
      // if one exists, the block has no children, and the selection is at the
      // end of the block.
      () => o.command(({ state: r }) => {
        const s = Tt$3(r);
        if (!s.isBlockContainer)
          return false;
        const {
          bnBlock: i,
          blockContent: c,
          childContainer: a
        } = s, { depth: l } = r.doc.resolve(i.beforePos), h = i.afterPos === r.doc.nodeSize - 3, u = r.selection.from === c.afterPos - 1, f = r.selection.empty;
        if (!h && u && f && !(a !== void 0)) {
          let g = l, p = i.afterPos + 1, k = r.doc.resolve(p).depth;
          for (; k < g; )
            g = k, p += 2, k = r.doc.resolve(p).depth;
          return o.command(rt$1(p - 1));
        }
        return false;
      })
    ]), e = (o = false) => this.editor.commands.first(({ commands: r, tr: s }) => [
      // Removes a level of nesting if the block is empty & indented, while the selection is also empty & at the start
      // of the block.
      () => r.command(({ state: i }) => {
        const c = Tt$3(i);
        if (!c.isBlockContainer)
          return false;
        const { bnBlock: a, blockContent: l } = c, { depth: h } = i.doc.resolve(a.beforePos), u = i.selection.$anchor.parentOffset === 0, f = i.selection.anchor === i.selection.head, m = l.node.childCount === 0, g = h > 1;
        return u && f && m && g ? r.liftListItem("blockContainer") : false;
      }),
      // Creates a hard break if block is configured to do so.
      () => r.command(({ state: i }) => {
        var l;
        const c = Tt$3(i), a = ((l = this.options.editor.schema.blockSchema[c.blockNoteType].meta) == null ? void 0 : l.hardBreakShortcut) ?? "shift+enter";
        if (a === "none")
          return false;
        if (
          // If shortcut is not configured, or is configured as "shift+enter",
          // create a hard break for shift+enter, but not for enter.
          a === "shift+enter" && o || // If shortcut is configured as "enter", create a hard break for
          // both enter and shift+enter.
          a === "enter"
        ) {
          const h = s.storedMarks || s.selection.$head.marks().filter(
            (u) => this.editor.extensionManager.splittableMarks.includes(
              u.type.name
            )
          );
          return s.insert(
            s.selection.head,
            s.doc.type.schema.nodes.hardBreak.create()
          ).ensureMarks(h), true;
        }
        return false;
      }),
      // Creates a new block and moves the selection to it if the current one is empty, while the selection is also
      // empty & at the start of the block.
      () => r.command(({ state: i, dispatch: c }) => {
        const a = Tt$3(i);
        if (!a.isBlockContainer)
          return false;
        const { bnBlock: l, blockContent: h } = a, u = i.selection.$anchor.parentOffset === 0, f = i.selection.anchor === i.selection.head, m = h.node.childCount === 0;
        if (u && f && m) {
          const g = l.afterPos, p = g + 2;
          if (c) {
            const k = i.schema.nodes.blockContainer.createAndFill();
            i.tr.insert(g, k).scrollIntoView(), i.tr.setSelection(
              new TextSelection(i.doc.resolve(p))
            );
          }
          return true;
        }
        return false;
      }),
      // Splits the current block, moving content inside that's after the cursor to a new text block below. Also
      // deletes the selection beforehand, if it's not empty.
      () => r.command(({ state: i, chain: c }) => {
        const a = Tt$3(i);
        if (!a.isBlockContainer)
          return false;
        const { blockContent: l } = a, h = i.selection.$anchor.parentOffset === 0;
        return l.node.childCount === 0 ? false : (c().deleteSelection().command(
          mo(
            i.selection.from,
            h,
            h
          )
        ).run(), true);
      })
    ]);
    return {
      Backspace: n,
      Delete: t,
      Enter: () => e(),
      "Shift-Enter": () => e(true),
      // Always returning true for tab key presses ensures they're not captured by the browser. Otherwise, they blur the
      // editor since the browser will try to use tab for keyboard navigation.
      Tab: () => {
        var o, r, s;
        return this.options.tabBehavior !== "prefer-indent" && ((o = this.options.editor.formattingToolbar) != null && o.shown || (r = this.options.editor.linkToolbar) != null && r.shown || (s = this.options.editor.filePanel) != null && s.shown) ? false : Nt$1(this.options.editor);
      },
      "Shift-Tab": () => {
        var o, r, s;
        return this.options.tabBehavior !== "prefer-indent" && ((o = this.options.editor.formattingToolbar) != null && o.shown || (r = this.options.editor.linkToolbar) != null && r.shown || (s = this.options.editor.filePanel) != null && s.shown) ? false : (this.editor.commands.liftListItem("blockContainer"), true);
      },
      "Shift-Mod-ArrowUp": () => (this.options.editor.moveBlocksUp(), true),
      "Shift-Mod-ArrowDown": () => (this.options.editor.moveBlocksDown(), true),
      "Mod-z": () => this.options.editor.undo(),
      "Mod-y": () => this.options.editor.redo(),
      "Shift-Mod-z": () => this.options.editor.redo()
    };
  }
});
class br {
  constructor(t, e, o) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "menuUpdateTimer");
    d(this, "startMenuUpdateTimer");
    d(this, "stopMenuUpdateTimer");
    d(this, "mouseHoveredLinkMark");
    d(this, "mouseHoveredLinkMarkRange");
    d(this, "keyboardHoveredLinkMark");
    d(this, "keyboardHoveredLinkMarkRange");
    d(this, "linkMark");
    d(this, "linkMarkRange");
    d(this, "mouseOverHandler", (t2) => {
      if (this.mouseHoveredLinkMark = void 0, this.mouseHoveredLinkMarkRange = void 0, this.stopMenuUpdateTimer(), t2.target instanceof HTMLAnchorElement && t2.target.nodeName === "A") {
        const e2 = t2.target, o2 = this.pmView.posAtDOM(e2, 0) + 1, r = this.pmView.state.doc.resolve(o2), s = r.marks();
        for (const i of s)
          if (i.type.name === this.pmView.state.schema.mark("link").type.name) {
            this.mouseHoveredLinkMark = i, this.mouseHoveredLinkMarkRange = getMarkRange(r, i.type, i.attrs) || void 0;
            break;
          }
      }
      return this.startMenuUpdateTimer(), false;
    });
    d(this, "clickHandler", (t2) => {
      var o2;
      const e2 = this.pmView.dom.parentElement;
      this.linkMark && // An element is clicked.
      t2 && t2.target && // The clicked element is not the editor.
      !(e2 === t2.target || e2.contains(t2.target)) && (o2 = this.state) != null && o2.show && (this.state.show = false, this.emitUpdate());
    });
    d(this, "scrollHandler", () => {
      var t2;
      this.linkMark !== void 0 && (t2 = this.state) != null && t2.show && (this.state.referencePos = posToDOMRect(
        this.pmView,
        this.linkMarkRange.from,
        this.linkMarkRange.to
      ), this.emitUpdate());
    });
    d(this, "closeMenu", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.show = false, this.emitUpdate());
    });
    this.editor = t, this.pmView = e, this.emitUpdate = () => {
      if (!this.state)
        throw new Error("Attempting to update uninitialized link toolbar");
      o(this.state);
    }, this.startMenuUpdateTimer = () => {
      this.menuUpdateTimer = setTimeout(() => {
        this.update(this.pmView, void 0, true);
      }, 250);
    }, this.stopMenuUpdateTimer = () => (this.menuUpdateTimer && (clearTimeout(this.menuUpdateTimer), this.menuUpdateTimer = void 0), false), this.pmView.dom.addEventListener("mouseover", this.mouseOverHandler), this.pmView.root.addEventListener(
      "click",
      this.clickHandler,
      true
    ), this.pmView.root.addEventListener("scroll", this.scrollHandler, true);
  }
  editLink(t, e) {
    var o;
    this.editor.transact((r) => {
      const s = ht$3(r);
      r.insertText(e, this.linkMarkRange.from, this.linkMarkRange.to), r.addMark(
        this.linkMarkRange.from,
        this.linkMarkRange.from + e.length,
        s.mark("link", { href: t })
      );
    }), this.pmView.focus(), (o = this.state) != null && o.show && (this.state.show = false, this.emitUpdate());
  }
  deleteLink() {
    var t;
    this.editor.transact(
      (e) => e.removeMark(
        this.linkMarkRange.from,
        this.linkMarkRange.to,
        this.linkMark.type
      ).setMeta("preventAutolink", true)
    ), this.pmView.focus(), (t = this.state) != null && t.show && (this.state.show = false, this.emitUpdate());
  }
  update(t, e, o = false) {
    var c;
    const { state: r } = t;
    if (e && e.selection.from === r.selection.from && e.selection.to === r.selection.to || !this.pmView.hasFocus())
      return;
    const i = this.linkMark;
    if (this.linkMark = void 0, this.linkMarkRange = void 0, this.keyboardHoveredLinkMark = void 0, this.keyboardHoveredLinkMarkRange = void 0, this.pmView.state.selection.empty) {
      const a = this.pmView.state.selection.$from.marks();
      for (const l of a)
        if (l.type.name === this.pmView.state.schema.mark("link").type.name) {
          this.keyboardHoveredLinkMark = l, this.keyboardHoveredLinkMarkRange = getMarkRange(
            this.pmView.state.selection.$from,
            l.type,
            l.attrs
          ) || void 0;
          break;
        }
    }
    if (this.mouseHoveredLinkMark && o && (this.linkMark = this.mouseHoveredLinkMark, this.linkMarkRange = this.mouseHoveredLinkMarkRange), this.keyboardHoveredLinkMark && (this.linkMark = this.keyboardHoveredLinkMark, this.linkMarkRange = this.keyboardHoveredLinkMarkRange), this.linkMark && this.editor.isEditable) {
      this.state = {
        show: true,
        referencePos: posToDOMRect(
          this.pmView,
          this.linkMarkRange.from,
          this.linkMarkRange.to
        ),
        url: this.linkMark.attrs.href,
        text: this.pmView.state.doc.textBetween(
          this.linkMarkRange.from,
          this.linkMarkRange.to
        )
      }, this.emitUpdate();
      return;
    }
    if ((c = this.state) != null && c.show && i && (!this.linkMark || !this.editor.isEditable)) {
      this.state.show = false, this.emitUpdate();
      return;
    }
  }
  destroy() {
    this.pmView.dom.removeEventListener("mouseover", this.mouseOverHandler), this.pmView.root.removeEventListener("scroll", this.scrollHandler, true), this.pmView.root.removeEventListener(
      "click",
      this.clickHandler,
      true
    );
  }
}
const wr = new PluginKey("LinkToolbarPlugin");
class yr extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "editLink", (e2, o) => {
      this.view.editLink(e2, o);
    });
    d(this, "deleteLink", () => {
      this.view.deleteLink();
    });
    d(this, "startHideTimer", () => {
      this.view.startMenuUpdateTimer();
    });
    d(this, "stopHideTimer", () => {
      this.view.stopMenuUpdateTimer();
    });
    d(this, "closeMenu", () => this.view.closeMenu());
    this.addProsemirrorPlugin(
      new Plugin({
        key: wr,
        view: (o) => (this.view = new br(e, o, (r) => {
          this.emit("update", r);
        }), this.view),
        props: {
          handleKeyDown: (o, r) => r.key === "Escape" && this.shown ? (this.view.closeMenu(), true) : false
        }
      })
    );
  }
  static key() {
    return "linkToolbar";
  }
  onUpdate(e) {
    return this.on("update", e);
  }
  get shown() {
    var e, o;
    return ((o = (e = this.view) == null ? void 0 : e.state) == null ? void 0 : o.show) || false;
  }
}
const Cr = [
  "http",
  "https",
  "ftp",
  "ftps",
  "mailto",
  "tel",
  "callto",
  "sms",
  "cid",
  "xmpp"
], vr = "https", Sr = new PluginKey("node-selection-keyboard");
class Er extends Wt {
  static key() {
    return "nodeSelectionKeyboard";
  }
  constructor() {
    super(), this.addProsemirrorPlugin(
      new Plugin({
        key: Sr,
        props: {
          handleKeyDown: (t, e) => {
            if ("node" in t.state.selection) {
              if (e.ctrlKey || e.metaKey)
                return false;
              if (e.key.length === 1)
                return e.preventDefault(), true;
              if (e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
                const o = t.state.tr;
                return t.dispatch(
                  o.insert(
                    t.state.tr.selection.$to.after(),
                    t.state.schema.nodes.paragraph.createChecked()
                  ).setSelection(
                    new TextSelection(
                      o.doc.resolve(t.state.tr.selection.$to.after() + 1)
                    )
                  )
                ), true;
              }
            }
            return false;
          }
        }
      })
    );
  }
}
const Br = new PluginKey("blocknote-placeholder");
class Mr extends Wt {
  static key() {
    return "placeholder";
  }
  constructor(t, e) {
    super(), this.addProsemirrorPlugin(
      new Plugin({
        key: Br,
        view: (o) => {
          const r = `placeholder-selector-${v4()}`;
          o.dom.classList.add(r);
          const s = document.createElement("style"), i = t._tiptapEditor.options.injectNonce;
          i && s.setAttribute("nonce", i), o.root instanceof window.ShadowRoot ? o.root.append(s) : o.root.head.appendChild(s);
          const c = s.sheet, a = (l = "") => `.${r} .bn-block-content${l} .bn-inline-content:has(> .ProseMirror-trailingBreak:only-child):before`;
          try {
            const {
              default: l,
              emptyDocument: h,
              ...u
            } = e;
            for (const [g, p] of Object.entries(u)) {
              const k = `[data-content-type="${g}"]`;
              c.insertRule(
                `${a(k)} { content: ${JSON.stringify(
                  p
                )}; }`
              );
            }
            const f = "[data-is-only-empty-block]", m = "[data-is-empty-and-focused]";
            c.insertRule(
              `${a(f)} { content: ${JSON.stringify(
                h
              )}; }`
            ), c.insertRule(
              `${a(m)} { content: ${JSON.stringify(
                l
              )}; }`
            );
          } catch (l) {
            console.warn(
              "Failed to insert placeholder CSS rule - this is likely due to the browser not supporting certain CSS pseudo-element selectors (:has, :only-child:, or :before)",
              l
            );
          }
          return {
            destroy: () => {
              o.root instanceof window.ShadowRoot ? o.root.removeChild(s) : o.root.head.removeChild(s);
            }
          };
        },
        props: {
          decorations: (o) => {
            const { doc: r, selection: s } = o;
            if (!t.isEditable || !s.empty || s.$from.parent.type.spec.code)
              return;
            const i = [];
            o.doc.content.size === 6 && i.push(
              Decoration.node(2, 4, {
                "data-is-only-empty-block": "true"
              })
            );
            const c = s.$anchor, a = c.parent;
            if (a.content.size === 0) {
              const l = c.before();
              i.push(
                Decoration.node(l, l + a.nodeSize, {
                  "data-is-empty-and-focused": "true"
                })
              );
            }
            return DecorationSet.create(r, i);
          }
        }
      })
    );
  }
}
const st$1 = new PluginKey("previous-blocks"), Pr = {
  // Numbered List Items
  index: "index",
  // Headings
  level: "level",
  // All Blocks
  type: "type",
  depth: "depth",
  "depth-change": "depth-change"
};
class Tr extends Wt {
  static key() {
    return "previousBlockType";
  }
  constructor() {
    super();
    let t;
    this.addProsemirrorPlugin(
      new Plugin({
        key: st$1,
        view(e) {
          return {
            update: async (o, r) => {
              var s;
              ((s = this.key) == null ? void 0 : s.getState(o.state).updatedBlocks.size) > 0 && (t = setTimeout(() => {
                o.dispatch(
                  o.state.tr.setMeta(st$1, { clearUpdate: true })
                );
              }, 0));
            },
            destroy: () => {
              t && clearTimeout(t);
            }
          };
        },
        state: {
          init() {
            return {
              // Block attributes, by block ID, from just before the previous transaction.
              prevTransactionOldBlockAttrs: {},
              // Block attributes, by block ID, from just before the current transaction.
              currentTransactionOldBlockAttrs: {},
              // Set of IDs of blocks whose attributes changed from the current transaction.
              updatedBlocks: /* @__PURE__ */ new Set()
            };
          },
          apply(e, o, r, s) {
            if (o.currentTransactionOldBlockAttrs = {}, o.updatedBlocks.clear(), !e.docChanged || r.doc.eq(s.doc))
              return o;
            const i = {}, c = findChildren(
              r.doc,
              (h) => h.attrs.id
            ), a = new Map(
              c.map((h) => [h.node.attrs.id, h])
            ), l = findChildren(
              s.doc,
              (h) => h.attrs.id
            );
            for (const h of l) {
              const u = a.get(h.node.attrs.id), f = u == null ? void 0 : u.node.firstChild, m = h.node.firstChild;
              if (u && f && m) {
                const g = {
                  index: m.attrs.index,
                  level: m.attrs.level,
                  type: m.type.name,
                  depth: s.doc.resolve(h.pos).depth
                }, p = {
                  index: f.attrs.index,
                  level: f.attrs.level,
                  type: f.type.name,
                  depth: r.doc.resolve(u.pos).depth
                };
                i[h.node.attrs.id] = p, o.currentTransactionOldBlockAttrs[h.node.attrs.id] = p, JSON.stringify(p) !== JSON.stringify(g) && (p["depth-change"] = p.depth - g.depth, o.updatedBlocks.add(h.node.attrs.id));
              }
            }
            return o.prevTransactionOldBlockAttrs = i, o;
          }
        },
        props: {
          decorations(e) {
            const o = this.getState(e);
            if (o.updatedBlocks.size === 0)
              return;
            const r = [];
            return e.doc.descendants((s, i) => {
              if (!s.attrs.id || !o.updatedBlocks.has(s.attrs.id))
                return;
              const c = o.currentTransactionOldBlockAttrs[s.attrs.id], a = {};
              for (const [h, u] of Object.entries(c))
                a["data-prev-" + Pr[h]] = u || "none";
              const l = Decoration.node(i, i + s.nodeSize, {
                ...a
              });
              r.push(l);
            }), DecorationSet.create(e.doc, r);
          }
        }
      })
    );
  }
}
const it$1 = new PluginKey("blocknote-show-selection");
class xr extends Wt {
  constructor(e) {
    super();
    d(this, "enabled", false);
    this.editor = e, this.addProsemirrorPlugin(
      new Plugin({
        key: it$1,
        props: {
          decorations: (o) => {
            const { doc: r, selection: s } = o;
            if (!this.enabled)
              return DecorationSet.empty;
            const i = Decoration.inline(s.from, s.to, {
              "data-show-selection": "true"
            });
            return DecorationSet.create(r, [i]);
          }
        }
      })
    );
  }
  static key() {
    return "showSelection";
  }
  setEnabled(e) {
    this.enabled !== e && (this.enabled = e, this.editor.transact((o) => o.setMeta(it$1, {})));
  }
  getEnabled() {
    return this.enabled;
  }
}
function Ht(n, t) {
  var e, o;
  for (; n && n.parentElement && n.parentElement !== t.dom && ((e = n.getAttribute) == null ? void 0 : e.call(n, "data-node-type")) !== "blockContainer"; )
    n = n.parentElement;
  if (((o = n.getAttribute) == null ? void 0 : o.call(n, "data-node-type")) === "blockContainer")
    return { node: n, id: n.getAttribute("data-id") };
}
class G extends Selection {
  constructor(e, o) {
    super(e, o);
    d(this, "nodes");
    const r = e.node();
    this.nodes = [], e.doc.nodesBetween(e.pos, o.pos, (s, i, c) => {
      if (c !== null && c.eq(r))
        return this.nodes.push(s), false;
    });
  }
  static create(e, o, r = o) {
    return new G(e.resolve(o), e.resolve(r));
  }
  content() {
    return new Slice(Fragment.from(this.nodes), 0, 0);
  }
  eq(e) {
    if (!(e instanceof G) || this.nodes.length !== e.nodes.length || this.from !== e.from || this.to !== e.to)
      return false;
    for (let o = 0; o < this.nodes.length; o++)
      if (!this.nodes[o].eq(e.nodes[o]))
        return false;
    return true;
  }
  map(e, o) {
    const r = o.mapResult(this.from), s = o.mapResult(this.to);
    return s.deleted ? Selection.near(e.resolve(r.pos)) : r.deleted ? Selection.near(e.resolve(s.pos)) : new G(
      e.resolve(r.pos),
      e.resolve(s.pos)
    );
  }
  toJSON() {
    return { type: "multiple-node", anchor: this.anchor, head: this.head };
  }
}
Selection.jsonID("multiple-node", G);
let H;
function Ir(n, t) {
  let e, o;
  const r = t.resolve(n.from).node().type.spec.group === "blockContent", s = t.resolve(n.to).node().type.spec.group === "blockContent", i = Math.min(n.$anchor.depth, n.$head.depth);
  if (r && s) {
    const c = n.$from.start(i - 1), a = n.$to.end(i - 1);
    e = t.resolve(c - 1).pos, o = t.resolve(a + 1).pos;
  } else
    e = n.from, o = n.to;
  return { from: e, to: o };
}
function at$1(n, t, e = t) {
  t === e && (e += n.state.doc.resolve(t + 1).node().nodeSize);
  const o = n.domAtPos(t).node.cloneNode(true), r = n.domAtPos(t).node, s = (u, f) => Array.prototype.indexOf.call(u.children, f), i = s(
    r,
    // Expects from position to be just before the first selected block.
    n.domAtPos(t + 1).node.parentElement
  ), c = s(
    r,
    // Expects to position to be just after the last selected block.
    n.domAtPos(e - 1).node.parentElement
  );
  for (let u = r.childElementCount - 1; u >= 0; u--)
    (u > c || u < i) && o.removeChild(o.children[u]);
  Ut(n.root), H = o;
  const a = H.getElementsByTagName("iframe");
  for (let u = 0; u < a.length; u++) {
    const f = a[u], m = f.parentElement;
    m && m.removeChild(f);
  }
  const h = n.dom.className.split(" ").filter(
    (u) => u !== "ProseMirror" && u !== "bn-root" && u !== "bn-editor"
  ).join(" ");
  H.className = H.className + " bn-drag-preview " + h, n.root instanceof ShadowRoot ? n.root.appendChild(H) : n.root.body.appendChild(H);
}
function Ut(n) {
  H !== void 0 && (n instanceof ShadowRoot ? n.removeChild(H) : n.body.removeChild(H), H = void 0);
}
function Lr(n, t, e) {
  if (!n.dataTransfer || e.headless)
    return;
  const o = e.prosemirrorView, r = xt$2(t.id, o.state.doc);
  if (!r)
    throw new Error(`Block with ID ${t.id} not found`);
  const s = r.posBeforeNode;
  if (s != null) {
    const i = o.state.selection, c = o.state.doc, { from: a, to: l } = Ir(i, c), h = a <= s && s < l, u = i.$anchor.node() !== i.$head.node() || i instanceof G;
    h && u ? (o.dispatch(
      o.state.tr.setSelection(G.create(c, a, l))
    ), at$1(o, a, l)) : (o.dispatch(
      o.state.tr.setSelection(NodeSelection.create(o.state.doc, s))
    ), at$1(o, s));
    const f = o.state.selection.content(), m = e.pmSchema, g = o.serializeForClipboard(f).dom.innerHTML, p = Ce(m, e), k = It(f.content), b = p.exportBlocks(k, {}), w = Re$1(b);
    n.dataTransfer.clearData(), n.dataTransfer.setData("blocknote/html", g), n.dataTransfer.setData("text/html", b), n.dataTransfer.setData("text/plain", w), n.dataTransfer.effectAllowed = "move", n.dataTransfer.setDragImage(H, 0, 0);
  }
}
const ct$1 = 250;
function Ae$1(n, t, e = true) {
  const o = n.root.elementsFromPoint(t.left, t.top);
  for (const r of o)
    if (n.dom.contains(r))
      return e && r.closest("[data-node-type=columnList]") ? Ae$1(
        n,
        {
          // TODO can we do better than this?
          left: t.left + 50,
          // bit hacky, but if we're inside a column, offset x position to right to account for the width of sidemenu itself
          top: t.top
        },
        false
      ) : Ht(r, n);
}
function Ar(n, t) {
  if (!t.dom.firstChild)
    return;
  const e = t.dom.firstChild.getBoundingClientRect(), o = {
    // Clamps the x position to the editor's bounding box.
    left: Math.min(
      Math.max(e.left + 10, n.x),
      e.right - 10
    ),
    top: n.y
  }, r = Ae$1(t, o);
  if (!r)
    return;
  const s = r.node.getBoundingClientRect();
  return Ae$1(
    t,
    {
      left: s.right - 10,
      top: n.y
    },
    false
  );
}
class Dr {
  constructor(t, e, o) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "mousePos");
    d(this, "hoveredBlock");
    d(this, "menuFrozen", false);
    d(this, "isDragOrigin", false);
    d(this, "updateState", (t2) => {
      this.state = t2, this.emitUpdate(this.state);
    });
    d(this, "updateStateFromMousePos", () => {
      var o2, r, s, i, c;
      if (this.menuFrozen || !this.mousePos)
        return;
      const t2 = this.findClosestEditorElement({
        clientX: this.mousePos.x,
        clientY: this.mousePos.y
      });
      if ((t2 == null ? void 0 : t2.element) !== this.pmView.dom || t2.distance > ct$1) {
        (o2 = this.state) != null && o2.show && (this.state.show = false, this.updateState(this.state));
        return;
      }
      const e2 = Ar(this.mousePos, this.pmView);
      if (!e2 || !this.editor.isEditable) {
        (r = this.state) != null && r.show && (this.state.show = false, this.updateState(this.state));
        return;
      }
      if (!((s = this.state) != null && s.show && ((i = this.hoveredBlock) != null && i.hasAttribute("data-id")) && ((c = this.hoveredBlock) == null ? void 0 : c.getAttribute("data-id")) === e2.id) && (this.hoveredBlock = e2.node, this.editor.isEditable)) {
        const a = e2.node.getBoundingClientRect(), l = e2.node.closest("[data-node-type=column]");
        this.state = {
          show: true,
          referencePos: new DOMRect(
            l ? (
              // We take the first child as column elements have some default
              // padding. This is a little weird since this child element will
              // be the first block, but since it's always non-nested and we
              // only take the x coordinate, it's ok.
              l.firstElementChild.getBoundingClientRect().x
            ) : this.pmView.dom.firstChild.getBoundingClientRect().x,
            a.y,
            a.width,
            a.height
          ),
          block: this.editor.getBlock(
            this.hoveredBlock.getAttribute("data-id")
          )
        }, this.updateState(this.state);
      }
    });
    d(this, "onDragStart", (t2) => {
      var i;
      const e2 = (i = t2.dataTransfer) == null ? void 0 : i.getData("blocknote/html");
      if (!e2 || this.pmView.dragging)
        return;
      const o2 = document.createElement("div");
      o2.innerHTML = e2;
      const s = DOMParser.fromSchema(this.pmView.state.schema).parse(o2, {
        topNode: this.pmView.state.schema.nodes.blockGroup.create()
      });
      this.pmView.dragging = {
        slice: new Slice(s.content, 0, 0),
        move: true
      };
    });
    d(this, "findClosestEditorElement", (t2) => {
      const e2 = Array.from(this.pmView.root.querySelectorAll(".bn-editor"));
      if (e2.length === 0)
        return null;
      let o2 = e2[0], r = Number.MAX_VALUE;
      return e2.forEach((s) => {
        const i = s.querySelector(".bn-block-group").getBoundingClientRect(), c = t2.clientX < i.left ? i.left - t2.clientX : t2.clientX > i.right ? t2.clientX - i.right : 0, a = t2.clientY < i.top ? i.top - t2.clientY : t2.clientY > i.bottom ? t2.clientY - i.bottom : 0, l = Math.sqrt(
          Math.pow(c, 2) + Math.pow(a, 2)
        );
        l < r && (r = l, o2 = s);
      }), {
        element: o2,
        distance: r
      };
    });
    d(this, "onDragOver", (t2) => {
      if (t2.synthetic)
        return;
      const e2 = this.getDragEventContext(t2);
      if (!e2 || !e2.isDropPoint) {
        this.closeDropCursor();
        return;
      }
      e2.isDropPoint && !e2.isDropWithinEditorBounds && this.dispatchSyntheticEvent(t2);
    });
    d(this, "closeDropCursor", () => {
      const t2 = new Event("dragleave", { bubbles: false });
      t2.synthetic = true, this.pmView.dom.dispatchEvent(t2);
    });
    d(this, "getDragEventContext", (t2) => {
      var a;
      const e2 = !((a = t2.dataTransfer) != null && a.types.includes("blocknote/html")) && !!this.pmView.dragging, o2 = !!this.isDragOrigin, r = e2 || o2, s = this.findClosestEditorElement(t2);
      if (!s || s.distance > ct$1)
        return;
      const i = s.element === this.pmView.dom, c = i && s.distance === 0;
      if (!(!i && !r))
        return {
          isDropPoint: i,
          isDropWithinEditorBounds: c,
          isDragOrigin: r
        };
    });
    d(this, "onDrop", (t2) => {
      if (t2.synthetic)
        return;
      const e2 = this.getDragEventContext(t2);
      if (!e2) {
        this.closeDropCursor();
        return;
      }
      const { isDropPoint: o2, isDropWithinEditorBounds: r, isDragOrigin: s } = e2;
      if (!r && o2 && this.dispatchSyntheticEvent(t2), o2) {
        if (this.pmView.dragging)
          return;
        this.pmView.dispatch(
          this.pmView.state.tr.setSelection(
            TextSelection.create(
              this.pmView.state.tr.doc,
              this.pmView.state.tr.selection.anchor
            )
          )
        );
        return;
      } else if (s) {
        setTimeout(
          () => this.pmView.dispatch(this.pmView.state.tr.deleteSelection()),
          0
        );
        return;
      }
    });
    d(this, "onDragEnd", (t2) => {
      t2.synthetic || (this.pmView.dragging = null);
    });
    d(this, "onKeyDown", (t2) => {
      var e2;
      (e2 = this.state) != null && e2.show && this.editor.isFocused() && (this.state.show = false, this.emitUpdate(this.state));
    });
    d(this, "onMouseMove", (t2) => {
      var s;
      if (this.menuFrozen)
        return;
      this.mousePos = { x: t2.clientX, y: t2.clientY };
      const e2 = this.pmView.dom.getBoundingClientRect(), o2 = this.mousePos.x > e2.left && this.mousePos.x < e2.right && this.mousePos.y > e2.top && this.mousePos.y < e2.bottom, r = this.pmView.dom.parentElement;
      if (
        // Cursor is within the editor area
        o2 && // An element is hovered
        t2 && t2.target && // Element is outside the editor
        !(r === t2.target || r.contains(t2.target))
      ) {
        (s = this.state) != null && s.show && (this.state.show = false, this.emitUpdate(this.state));
        return;
      }
      this.updateStateFromMousePos();
    });
    d(this, "onScroll", () => {
      var t2;
      (t2 = this.state) != null && t2.show && (this.state.referencePos = this.hoveredBlock.getBoundingClientRect(), this.emitUpdate(this.state)), this.updateStateFromMousePos();
    });
    this.editor = t, this.pmView = e, this.emitUpdate = () => {
      if (!this.state)
        throw new Error("Attempting to update uninitialized side menu");
      o(this.state);
    }, this.pmView.root.addEventListener(
      "dragstart",
      this.onDragStart
    ), this.pmView.root.addEventListener(
      "dragover",
      this.onDragOver
    ), this.pmView.root.addEventListener(
      "drop",
      this.onDrop,
      true
    ), this.pmView.root.addEventListener(
      "dragend",
      this.onDragEnd,
      true
    ), this.pmView.root.addEventListener(
      "mousemove",
      this.onMouseMove,
      true
    ), this.pmView.root.addEventListener(
      "keydown",
      this.onKeyDown,
      true
    ), e.root.addEventListener("scroll", this.onScroll, true);
  }
  dispatchSyntheticEvent(t) {
    const e = new Event(t.type, t), o = this.pmView.dom.firstChild.getBoundingClientRect();
    e.clientX = t.clientX, e.clientY = t.clientY, e.clientX = Math.min(
      Math.max(t.clientX, o.left),
      o.left + o.width
    ), e.clientY = Math.min(
      Math.max(t.clientY, o.top),
      o.top + o.height
    ), e.dataTransfer = t.dataTransfer, e.preventDefault = () => t.preventDefault(), e.synthetic = true, this.pmView.dom.dispatchEvent(e);
  }
  // Needed in cases where the editor state updates without the mouse cursor
  // moving, as some state updates can require a side menu update. For example,
  // adding a button to the side menu which removes the block can cause the
  // block below to jump up into the place of the removed block when clicked,
  // allowing the user to click the button again without moving the cursor. This
  // would otherwise not update the side menu, and so clicking the button again
  // would attempt to remove the same block again, causing an error.
  update(t, e) {
    var r;
    !e.doc.eq(this.pmView.state.doc) && ((r = this.state) != null && r.show) && this.updateStateFromMousePos();
  }
  destroy() {
    var t;
    (t = this.state) != null && t.show && (this.state.show = false, this.emitUpdate(this.state)), this.pmView.root.removeEventListener(
      "mousemove",
      this.onMouseMove,
      true
    ), this.pmView.root.removeEventListener(
      "dragstart",
      this.onDragStart
    ), this.pmView.root.removeEventListener(
      "dragover",
      this.onDragOver
    ), this.pmView.root.removeEventListener(
      "drop",
      this.onDrop,
      true
    ), this.pmView.root.removeEventListener(
      "dragend",
      this.onDragEnd,
      true
    ), this.pmView.root.removeEventListener(
      "keydown",
      this.onKeyDown,
      true
    ), this.pmView.root.removeEventListener("scroll", this.onScroll, true);
  }
}
const Or = new PluginKey("SideMenuPlugin");
class _r extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "blockDragStart", (e2, o) => {
      this.view && (this.view.isDragOrigin = true), Lr(e2, o, this.editor);
    });
    d(this, "blockDragEnd", () => {
      Ut(this.editor.prosemirrorView.root), this.view && (this.view.isDragOrigin = false), this.editor.blur();
    });
    d(this, "freezeMenu", () => {
      this.view.menuFrozen = true, this.view.state.show = true, this.view.emitUpdate(this.view.state);
    });
    d(this, "unfreezeMenu", () => {
      this.view.menuFrozen = false, this.view.state.show = false, this.view.emitUpdate(this.view.state);
    });
    this.editor = e, this.addProsemirrorPlugin(
      new Plugin({
        key: Or,
        view: (o) => (this.view = new Dr(e, o, (r) => {
          this.emit("update", r);
        }), this.view)
      })
    );
  }
  static key() {
    return "sideMenu";
  }
  onUpdate(e) {
    return this.on("update", e);
  }
}
const le = /* @__PURE__ */ new Map();
function Nr(n) {
  if (le.has(n))
    return le.get(n);
  const t = new Mapping();
  return n._tiptapEditor.on("transaction", ({ transaction: e }) => {
    t.appendMapping(e.mapping);
  }), n._tiptapEditor.on("destroy", () => {
    le.delete(n);
  }), le.set(n, t), t;
}
function Hr(n, t, e = "left") {
  const o = ySyncPluginKey.getState(n.prosemirrorState);
  if (!o) {
    const s = Nr(n), i = s.maps.length;
    return () => s.slice(i).map(t, e === "left" ? -1 : 1);
  }
  const r = absolutePositionToRelativePosition(
    // Track the position after the position if we are on the right side
    t + (e === "right" ? 1 : -1),
    o.binding.type,
    o.binding.mapping
  );
  return () => {
    const s = ySyncPluginKey.getState(
      n.prosemirrorState
    ), i = relativePositionToAbsolutePosition(
      s.doc,
      s.binding.type,
      r,
      s.binding.mapping
    );
    if (i === null)
      throw new Error("Position not found, cannot track positions");
    return i + (e === "right" ? -1 : 1);
  };
}
const Ur = findParentNode((n) => n.type.name === "blockContainer");
class Rr {
  constructor(t, e, o) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "rootEl");
    d(this, "pluginState");
    d(this, "handleScroll", () => {
      var t2, e2;
      if ((t2 = this.state) != null && t2.show) {
        const o2 = (e2 = this.rootEl) == null ? void 0 : e2.querySelector(
          `[data-decoration-id="${this.pluginState.decorationId}"]`
        );
        if (!o2)
          return;
        this.state.referencePos = o2.getBoundingClientRect(), this.emitUpdate(this.pluginState.triggerCharacter);
      }
    });
    d(this, "closeMenu", () => {
      this.editor.transact((t2) => t2.setMeta(K, null));
    });
    d(this, "clearQuery", () => {
      this.pluginState !== void 0 && this.editor._tiptapEditor.chain().focus().deleteRange({
        from: this.pluginState.queryStartPos() - (this.pluginState.deleteTriggerCharacter ? this.pluginState.triggerCharacter.length : 0),
        to: this.editor.transact((t2) => t2.selection.from)
      }).run();
    });
    var r;
    this.editor = t, this.pluginState = void 0, this.emitUpdate = (s) => {
      var i;
      if (!this.state)
        throw new Error("Attempting to update uninitialized suggestions menu");
      e(s, {
        ...this.state,
        ignoreQueryLength: (i = this.pluginState) == null ? void 0 : i.ignoreQueryLength
      });
    }, this.rootEl = o.root, (r = this.rootEl) == null || r.addEventListener("scroll", this.handleScroll, true);
  }
  update(t, e) {
    var l;
    const o = K.getState(e), r = K.getState(
      t.state
    ), s = o === void 0 && r !== void 0, i = o !== void 0 && r === void 0;
    if (!s && !(o !== void 0 && r !== void 0) && !i)
      return;
    if (this.pluginState = i ? o : r, i || !this.editor.isEditable) {
      this.state && (this.state.show = false), this.emitUpdate(this.pluginState.triggerCharacter);
      return;
    }
    const a = (l = this.rootEl) == null ? void 0 : l.querySelector(
      `[data-decoration-id="${this.pluginState.decorationId}"]`
    );
    this.editor.isEditable && a && (this.state = {
      show: true,
      referencePos: a.getBoundingClientRect(),
      query: this.pluginState.query
    }, this.emitUpdate(this.pluginState.triggerCharacter));
  }
  destroy() {
    var t;
    (t = this.rootEl) == null || t.removeEventListener("scroll", this.handleScroll, true);
  }
}
const K = new PluginKey("SuggestionMenuPlugin");
class Vr extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "triggerCharacters", []);
    d(this, "addTriggerCharacter", (e2) => {
      this.triggerCharacters.push(e2);
    });
    d(this, "removeTriggerCharacter", (e2) => {
      this.triggerCharacters = this.triggerCharacters.filter(
        (o2) => o2 !== e2
      );
    });
    d(this, "closeMenu", () => this.view.closeMenu());
    d(this, "clearQuery", () => this.view.clearQuery());
    const o = this.triggerCharacters;
    this.addProsemirrorPlugin(
      new Plugin({
        key: K,
        view: (r) => (this.view = new Rr(
          e,
          (s, i) => {
            this.emit(`update ${s}`, i);
          },
          r
        ), this.view),
        state: {
          // Initialize the plugin's internal state.
          init() {
          },
          // Apply changes to the plugin state from an editor transaction.
          apply: (r, s, i, c) => {
            if (r.selection.$from.parent.type.spec.code)
              return s;
            const a = r.getMeta(K);
            if (typeof a == "object" && a !== null) {
              s && this.closeMenu();
              const h = Hr(
                e,
                c.selection.from - // Need to account for the trigger char that was inserted, so we offset the position by the length of the trigger character.
                a.triggerCharacter.length
              );
              return {
                triggerCharacter: a.triggerCharacter,
                deleteTriggerCharacter: a.deleteTriggerCharacter !== false,
                // When reading the queryStartPos, we offset the result by the length of the trigger character, to make it easy on the caller
                queryStartPos: () => h() + a.triggerCharacter.length,
                query: "",
                decorationId: `id_${Math.floor(Math.random() * 4294967295)}`,
                ignoreQueryLength: a == null ? void 0 : a.ignoreQueryLength
              };
            }
            if (s === void 0)
              return s;
            if (
              // Highlighting text should hide the menu.
              c.selection.from !== c.selection.to || // Transactions with plugin metadata should hide the menu.
              a === null || // Certain mouse events should hide the menu.
              // TODO: Change to global mousedown listener.
              r.getMeta("focus") || r.getMeta("blur") || r.getMeta("pointer") || // Moving the caret before the character which triggered the menu should hide it.
              s.triggerCharacter !== void 0 && c.selection.from < s.queryStartPos() || // Moving the caret to a new block should hide the menu.
              !c.selection.$from.sameParent(
                c.doc.resolve(s.queryStartPos())
              )
            )
              return;
            const l = { ...s };
            return l.query = c.doc.textBetween(
              s.queryStartPos(),
              c.selection.from
            ), l;
          }
        },
        props: {
          handleTextInput(r, s, i, c) {
            if (s === i) {
              const a = r.state.doc;
              for (const l of o) {
                const h = l.length > 1 ? a.textBetween(s - l.length, s) + c : c;
                if (l === h)
                  return r.dispatch(r.state.tr.insertText(c)), r.dispatch(
                    r.state.tr.setMeta(K, {
                      triggerCharacter: h
                    }).scrollIntoView()
                  ), true;
              }
            }
            return false;
          },
          // Setup decorator on the currently active suggestion.
          decorations(r) {
            const s = this.getState(r);
            if (s === void 0)
              return null;
            if (!s.deleteTriggerCharacter) {
              const i = Ur(r.selection);
              if (i)
                return DecorationSet.create(r.doc, [
                  Decoration.node(
                    i.pos,
                    i.pos + i.node.nodeSize,
                    {
                      nodeName: "span",
                      class: "bn-suggestion-decorator",
                      "data-decoration-id": s.decorationId
                    }
                  )
                ]);
            }
            return DecorationSet.create(r.doc, [
              Decoration.inline(
                s.queryStartPos() - s.triggerCharacter.length,
                s.queryStartPos(),
                {
                  nodeName: "span",
                  class: "bn-suggestion-decorator",
                  "data-decoration-id": s.decorationId
                }
              )
            ]);
          }
        }
      })
    );
  }
  static key() {
    return "suggestionMenu";
  }
  onUpdate(e, o) {
    return this.triggerCharacters.includes(e) || this.addTriggerCharacter(e), this.on(`update ${e}`, o);
  }
  get shown() {
    var e, o;
    return ((o = (e = this.view) == null ? void 0 : e.state) == null ? void 0 : o.show) || false;
  }
}
const $r = Mark.create({
  name: "insertion",
  inclusive: false,
  excludes: "deletion modification insertion",
  addAttributes() {
    return {
      id: { default: null, validate: "number" }
      // note: validate is supported in prosemirror but not in tiptap, so this doesn't actually work (considered not critical)
    };
  },
  extendMarkSchema(n) {
    return n.name !== "insertion" ? {} : {
      blocknoteIgnore: true,
      inclusive: false,
      toDOM(t, e) {
        return [
          "ins",
          {
            "data-id": String(t.attrs.id),
            "data-inline": String(e),
            ...!e && { style: "display: contents" }
            // changed to "contents" to make this work for table rows
          },
          0
        ];
      },
      parseDOM: [
        {
          tag: "ins",
          getAttrs(t) {
            return t.dataset.id ? {
              id: parseInt(t.dataset.id, 10)
            } : false;
          }
        }
      ]
    };
  }
}), Fr = Mark.create({
  name: "deletion",
  inclusive: false,
  excludes: "insertion modification deletion",
  addAttributes() {
    return {
      id: { default: null, validate: "number" }
      // note: validate is supported in prosemirror but not in tiptap
    };
  },
  extendMarkSchema(n) {
    return n.name !== "deletion" ? {} : {
      blocknoteIgnore: true,
      inclusive: false,
      // attrs: {
      //   id: { validate: "number" },
      // },
      toDOM(t, e) {
        return [
          "del",
          {
            "data-id": String(t.attrs.id),
            "data-inline": String(e),
            ...!e && { style: "display: contents" }
            // changed to "contents" to make this work for table rows
          },
          0
        ];
      },
      parseDOM: [
        {
          tag: "del",
          getAttrs(t) {
            return t.dataset.id ? {
              id: parseInt(t.dataset.id, 10)
            } : false;
          }
        }
      ]
    };
  }
}), zr = Mark.create({
  name: "modification",
  inclusive: false,
  excludes: "deletion insertion",
  addAttributes() {
    return {
      id: { default: null, validate: "number" },
      type: { validate: "string" },
      attrName: { default: null, validate: "string|null" },
      previousValue: { default: null },
      newValue: { default: null }
    };
  },
  extendMarkSchema(n) {
    return n.name !== "modification" ? {} : {
      blocknoteIgnore: true,
      inclusive: false,
      // attrs: {
      //   id: { validate: "number" },
      //   type: { validate: "string" },
      //   attrName: { default: null, validate: "string|null" },
      //   previousValue: { default: null },
      //   newValue: { default: null },
      // },
      toDOM(t, e) {
        return [
          e ? "span" : "div",
          {
            "data-type": "modification",
            "data-id": String(t.attrs.id),
            "data-mod-type": t.attrs.type,
            "data-mod-prev-val": JSON.stringify(t.attrs.previousValue),
            // TODO: Try to serialize marks with toJSON?
            "data-mod-new-val": JSON.stringify(t.attrs.newValue)
          },
          0
        ];
      },
      parseDOM: [
        {
          tag: "span[data-type='modification']",
          getAttrs(t) {
            return t.dataset.id ? {
              id: parseInt(t.dataset.id, 10),
              type: t.dataset.modType,
              previousValue: t.dataset.modPrevVal,
              newValue: t.dataset.modNewVal
            } : false;
          }
        },
        {
          tag: "div[data-type='modification']",
          getAttrs(t) {
            return t.dataset.id ? {
              id: parseInt(t.dataset.id, 10),
              type: t.dataset.modType,
              previousValue: t.dataset.modPrevVal
            } : false;
          }
        }
      ]
    };
  }
});
let x;
function lt$1(n) {
  x || (x = document.createElement("div"), x.innerHTML = "_", x.style.opacity = "0", x.style.height = "1px", x.style.width = "1px", n instanceof Document ? n.body.appendChild(x) : n.appendChild(x));
}
function Gr(n) {
  x && (n instanceof Document ? n.body.removeChild(x) : n.removeChild(x), x = void 0);
}
function de(n) {
  return Array.prototype.indexOf.call(n.parentElement.childNodes, n);
}
function jr(n) {
  let t = n;
  for (; t && t.nodeName !== "TD" && t.nodeName !== "TH" && !t.classList.contains("tableWrapper"); ) {
    if (t.classList.contains("ProseMirror"))
      return;
    const e = t.parentNode;
    if (!e || !(e instanceof Element))
      return;
    t = e;
  }
  return t.nodeName === "TD" || t.nodeName === "TH" ? {
    type: "cell",
    domNode: t,
    tbodyNode: t.closest("tbody")
  } : {
    type: "wrapper",
    domNode: t,
    tbodyNode: t.querySelector("tbody")
  };
}
function Kr(n, t) {
  const e = t.querySelectorAll(n);
  for (let o = 0; o < e.length; o++)
    e[o].style.visibility = "hidden";
}
class qr {
  constructor(t, e, o) {
    d(this, "state");
    d(this, "emitUpdate");
    d(this, "tableId");
    d(this, "tablePos");
    d(this, "tableElement");
    d(this, "menuFrozen", false);
    d(this, "mouseState", "up");
    d(this, "prevWasEditable", null);
    d(this, "viewMousedownHandler", () => {
      this.mouseState = "down";
    });
    d(this, "mouseUpHandler", (t2) => {
      this.mouseState = "up", this.mouseMoveHandler(t2);
    });
    d(this, "mouseMoveHandler", (t2) => {
      var l, h, u, f, m, g, p;
      if (this.menuFrozen || this.mouseState === "selecting" || !(t2.target instanceof Element) || !this.pmView.dom.contains(t2.target))
        return;
      const e2 = jr(t2.target);
      if ((e2 == null ? void 0 : e2.type) === "cell" && this.mouseState === "down" && !((l = this.state) != null && l.draggingState)) {
        this.mouseState = "selecting", (h = this.state) != null && h.show && (this.state.show = false, this.state.showAddOrRemoveRowsButton = false, this.state.showAddOrRemoveColumnsButton = false, this.emitUpdate());
        return;
      }
      if (!e2 || !this.editor.isEditable) {
        (u = this.state) != null && u.show && (this.state.show = false, this.state.showAddOrRemoveRowsButton = false, this.state.showAddOrRemoveColumnsButton = false, this.emitUpdate());
        return;
      }
      if (!e2.tbodyNode)
        return;
      const o2 = e2.tbodyNode.getBoundingClientRect(), r = Ht(e2.domNode, this.pmView);
      if (!r)
        return;
      this.tableElement = r.node;
      let s;
      const i = this.editor.transact(
        (k) => xt$2(r.id, k.doc)
      );
      if (!i)
        throw new Error(`Block with ID ${r.id} not found`);
      const c = L(
        i.node,
        this.editor.pmSchema,
        this.editor.schema.blockSchema,
        this.editor.schema.inlineContentSchema,
        this.editor.schema.styleSchema
      );
      if (k(this.editor, "table") && (this.tablePos = i.posBeforeNode + 1, s = c), !s)
        return;
      this.tableId = r.id;
      const a = (f = e2.domNode.closest(".tableWrapper")) == null ? void 0 : f.querySelector(".table-widgets-container");
      if ((e2 == null ? void 0 : e2.type) === "wrapper") {
        const k = t2.clientY >= o2.bottom - 1 && // -1 to account for fractions of pixels in "bottom"
        t2.clientY < o2.bottom + 20, b = t2.clientX >= o2.right - 1 && t2.clientX < o2.right + 20, w = t2.clientX > o2.right || t2.clientY > o2.bottom;
        this.state = {
          ...this.state,
          show: true,
          showAddOrRemoveRowsButton: k,
          showAddOrRemoveColumnsButton: b,
          referencePosTable: o2,
          block: s,
          widgetContainer: a,
          colIndex: w || (m = this.state) == null ? void 0 : m.colIndex,
          rowIndex: w || (g = this.state) == null ? void 0 : g.rowIndex,
          referencePosCell: w || (p = this.state) == null ? void 0 : p.referencePosCell
        };
      } else {
        const k = de(e2.domNode), b = de(e2.domNode.parentElement), w = e2.domNode.getBoundingClientRect();
        if (this.state !== void 0 && this.state.show && this.tableId === r.id && this.state.rowIndex === b && this.state.colIndex === k)
          return;
        this.state = {
          show: true,
          showAddOrRemoveColumnsButton: k === s.content.rows[0].cells.length - 1,
          showAddOrRemoveRowsButton: b === s.content.rows.length - 1,
          referencePosTable: o2,
          block: s,
          draggingState: void 0,
          referencePosCell: w,
          colIndex: k,
          rowIndex: b,
          widgetContainer: a
        };
      }
      return this.emitUpdate(), false;
    });
    d(this, "dragOverHandler", (t2) => {
      var f;
      if (((f = this.state) == null ? void 0 : f.draggingState) === void 0)
        return;
      t2.preventDefault(), t2.dataTransfer.dropEffect = "move", Kr(
        ".prosemirror-dropcursor-block, .prosemirror-dropcursor-inline",
        this.pmView.root
      );
      const e2 = {
        left: Math.min(
          Math.max(t2.clientX, this.state.referencePosTable.left + 1),
          this.state.referencePosTable.right - 1
        ),
        top: Math.min(
          Math.max(t2.clientY, this.state.referencePosTable.top + 1),
          this.state.referencePosTable.bottom - 1
        )
      }, o2 = this.pmView.root.elementsFromPoint(e2.left, e2.top).filter(
        (m) => m.tagName === "TD" || m.tagName === "TH"
      );
      if (o2.length === 0)
        return;
      const r = o2[0];
      let s = false;
      const i = de(r.parentElement), c = de(r), a = this.state.draggingState.draggedCellOrientation === "row" ? this.state.rowIndex : this.state.colIndex, h = (this.state.draggingState.draggedCellOrientation === "row" ? i : c) !== a;
      (this.state.rowIndex !== i || this.state.colIndex !== c) && (this.state.rowIndex = i, this.state.colIndex = c, this.state.referencePosCell = r.getBoundingClientRect(), s = true);
      const u = this.state.draggingState.draggedCellOrientation === "row" ? e2.top : e2.left;
      this.state.draggingState.mousePos !== u && (this.state.draggingState.mousePos = u, s = true), s && this.emitUpdate(), h && this.editor.transact((m) => m.setMeta(oe$1, true));
    });
    d(this, "dropHandler", (t2) => {
      if (this.mouseState = "up", this.state === void 0 || this.state.draggingState === void 0)
        return false;
      if (this.state.rowIndex === void 0 || this.state.colIndex === void 0)
        throw new Error(
          "Attempted to drop table row or column, but no table block was hovered prior."
        );
      t2.preventDefault();
      const { draggingState: e2, colIndex: o2, rowIndex: r } = this.state, s = this.state.block.content.columnWidths;
      if (e2.draggedCellOrientation === "row") {
        if (!Jt$2(
          this.state.block,
          e2.originalIndex,
          r
        ))
          return false;
        const i = Pt$3(
          this.state.block,
          e2.originalIndex,
          r
        );
        this.editor.updateBlock(this.state.block, {
          type: "table",
          content: {
            ...this.state.block.content,
            rows: i
          }
        });
      } else {
        if (!_t$2(
          this.state.block,
          e2.originalIndex,
          o2
        ))
          return false;
        const i = Mt$2(
          this.state.block,
          e2.originalIndex,
          o2
        ), [c] = s.splice(e2.originalIndex, 1);
        s.splice(o2, 0, c), this.editor.updateBlock(this.state.block, {
          type: "table",
          content: {
            ...this.state.block.content,
            columnWidths: s,
            rows: i
          }
        });
      }
      return this.editor.setTextCursorPosition(this.state.block.id), true;
    });
    this.editor = t, this.pmView = e, this.emitUpdate = () => {
      if (!this.state)
        throw new Error("Attempting to update uninitialized image toolbar");
      o(this.state);
    }, e.dom.addEventListener("mousemove", this.mouseMoveHandler), e.dom.addEventListener("mousedown", this.viewMousedownHandler), window.addEventListener("mouseup", this.mouseUpHandler), e.root.addEventListener(
      "dragover",
      this.dragOverHandler
    ), e.root.addEventListener(
      "drop",
      this.dropHandler
    );
  }
  // Updates drag handles when the table is modified or removed.
  update() {
    var r;
    if (!this.state || !this.state.show)
      return;
    if (this.state.block = this.editor.getBlock(this.state.block.id), !this.state.block || this.state.block.type !== "table" || // when collaborating, the table element might be replaced and out of date
    // because yjs replaces the element when for example you change the color via the side menu
    !((r = this.tableElement) != null && r.isConnected)) {
      this.state.show = false, this.state.showAddOrRemoveRowsButton = false, this.state.showAddOrRemoveColumnsButton = false, this.emitUpdate();
      return;
    }
    const { height: t, width: e } = tt$2(
      this.state.block
    );
    this.state.rowIndex !== void 0 && this.state.colIndex !== void 0 && (this.state.rowIndex >= t && (this.state.rowIndex = t - 1), this.state.colIndex >= e && (this.state.colIndex = e - 1));
    const o = this.tableElement.querySelector("tbody");
    if (!o)
      throw new Error(
        "Table block does not contain a 'tbody' HTML element. This should never happen."
      );
    if (this.state.rowIndex !== void 0 && this.state.colIndex !== void 0) {
      const i = o.children[this.state.rowIndex].children[this.state.colIndex];
      i ? this.state.referencePosCell = i.getBoundingClientRect() : (this.state.rowIndex = void 0, this.state.colIndex = void 0);
    }
    this.state.referencePosTable = o.getBoundingClientRect(), this.emitUpdate();
  }
  destroy() {
    this.pmView.dom.removeEventListener("mousemove", this.mouseMoveHandler), window.removeEventListener("mouseup", this.mouseUpHandler), this.pmView.dom.removeEventListener("mousedown", this.viewMousedownHandler), this.pmView.root.removeEventListener(
      "dragover",
      this.dragOverHandler
    ), this.pmView.root.removeEventListener(
      "drop",
      this.dropHandler
    );
  }
}
const oe$1 = new PluginKey("TableHandlesPlugin");
class Yr extends Wt {
  constructor(e) {
    super();
    d(this, "view");
    d(this, "colDragStart", (e2) => {
      if (this.view.state === void 0 || this.view.state.colIndex === void 0)
        throw new Error(
          "Attempted to drag table column, but no table block was hovered prior."
        );
      this.view.state.draggingState = {
        draggedCellOrientation: "col",
        originalIndex: this.view.state.colIndex,
        mousePos: e2.clientX
      }, this.view.emitUpdate(), this.editor.transact(
        (o) => o.setMeta(oe$1, {
          draggedCellOrientation: this.view.state.draggingState.draggedCellOrientation,
          originalIndex: this.view.state.colIndex,
          newIndex: this.view.state.colIndex,
          tablePos: this.view.tablePos
        })
      ), !this.editor.headless && (lt$1(this.editor.prosemirrorView.root), e2.dataTransfer.setDragImage(x, 0, 0), e2.dataTransfer.effectAllowed = "move");
    });
    d(this, "rowDragStart", (e2) => {
      if (this.view.state === void 0 || this.view.state.rowIndex === void 0)
        throw new Error(
          "Attempted to drag table row, but no table block was hovered prior."
        );
      this.view.state.draggingState = {
        draggedCellOrientation: "row",
        originalIndex: this.view.state.rowIndex,
        mousePos: e2.clientY
      }, this.view.emitUpdate(), this.editor.transact(
        (o) => o.setMeta(oe$1, {
          draggedCellOrientation: this.view.state.draggingState.draggedCellOrientation,
          originalIndex: this.view.state.rowIndex,
          newIndex: this.view.state.rowIndex,
          tablePos: this.view.tablePos
        })
      ), !this.editor.headless && (lt$1(this.editor.prosemirrorView.root), e2.dataTransfer.setDragImage(x, 0, 0), e2.dataTransfer.effectAllowed = "copyMove");
    });
    d(this, "dragEnd", () => {
      if (this.view.state === void 0)
        throw new Error(
          "Attempted to drag table row, but no table block was hovered prior."
        );
      this.view.state.draggingState = void 0, this.view.emitUpdate(), this.editor.transact((e2) => e2.setMeta(oe$1, null)), !this.editor.headless && Gr(this.editor.prosemirrorView.root);
    });
    d(this, "freezeHandles", () => {
      this.view.menuFrozen = true;
    });
    d(this, "unfreezeHandles", () => {
      this.view.menuFrozen = false;
    });
    d(this, "getCellsAtRowHandle", (e2, o) => yt$2(e2, o));
    d(this, "getCellsAtColumnHandle", (e2, o) => Ct$2(e2, o));
    d(this, "setCellSelection", (e2, o, r = o) => {
      const s = this.view;
      if (!s)
        throw new Error("Table handles view not initialized");
      const i = e2.doc.resolve(s.tablePos + 1), c = e2.doc.resolve(
        i.posAtIndex(o.row) + 1
      ), a = e2.doc.resolve(
        // No need for +1, since CellSelection expects the position before the cell
        c.posAtIndex(o.col)
      ), l = e2.doc.resolve(
        i.posAtIndex(r.row) + 1
      ), h = e2.doc.resolve(
        // No need for +1, since CellSelection expects the position before the cell
        l.posAtIndex(r.col)
      ), u = e2.tr;
      return u.setSelection(
        new CellSelection(a, h)
      ), e2.apply(u);
    });
    d(this, "addRowOrColumn", (e2, o) => {
      this.editor.exec((r, s) => {
        const i = this.setCellSelection(
          r,
          o.orientation === "row" ? { row: e2, col: 0 } : { row: 0, col: e2 }
        );
        return o.orientation === "row" ? o.side === "above" ? addRowBefore(i, s) : addRowAfter(i, s) : o.side === "left" ? addColumnBefore(i, s) : addColumnAfter(i, s);
      });
    });
    d(this, "removeRowOrColumn", (e2, o) => o === "row" ? this.editor.exec((r, s) => {
      const i = this.setCellSelection(r, {
        row: e2,
        col: 0
      });
      return deleteRow(i, s);
    }) : this.editor.exec((r, s) => {
      const i = this.setCellSelection(r, {
        row: 0,
        col: e2
      });
      return deleteColumn(i, s);
    }));
    d(this, "mergeCells", (e2) => this.editor.exec((o, r) => {
      const s = e2 ? this.setCellSelection(
        o,
        e2.relativeStartCell,
        e2.relativeEndCell
      ) : o;
      return mergeCells(s, r);
    }));
    d(this, "splitCell", (e2) => this.editor.exec((o, r) => {
      const s = e2 ? this.setCellSelection(o, e2) : o;
      return splitCell(s, r);
    }));
    d(this, "getCellSelection", () => this.editor.transact((e2) => {
      const o = e2.selection;
      let r = o.$from, s = o.$to;
      if (Co(o)) {
        const { ranges: g } = o;
        g.forEach((p) => {
          r = p.$from.min(r ?? p.$from), s = p.$to.max(s ?? p.$to);
        });
      } else if (r = e2.doc.resolve(
        o.$from.pos - o.$from.parentOffset - 1
      ), s = e2.doc.resolve(
        o.$to.pos - o.$to.parentOffset - 1
      ), r.pos === 0 || s.pos === 0)
        return;
      const i = e2.doc.resolve(
        r.pos - r.parentOffset - 1
      ), c = e2.doc.resolve(s.pos - s.parentOffset - 1), a = e2.doc.resolve(i.pos - i.parentOffset - 1), l = r.index(i.depth), h = i.index(a.depth), u = s.index(c.depth), f = c.index(a.depth), m = [];
      for (let g = h; g <= f; g++)
        for (let p = l; p <= u; p++)
          m.push({ row: g, col: p });
      return {
        from: {
          row: h,
          col: l
        },
        to: {
          row: f,
          col: u
        },
        cells: m
      };
    }));
    d(this, "getMergeDirection", (e2) => this.editor.transact((o) => {
      const r = Co(o.selection) ? o.selection : void 0;
      if (!r || !e2 || // Only offer the merge button if there is more than one cell selected.
      r.ranges.length <= 1)
        return;
      const s = this.getCellSelection();
      if (s)
        return Ht$2(s.from, s.to, e2) ? "vertical" : "horizontal";
    }));
    d(this, "cropEmptyRowsOrColumns", (e2, o) => Rt$2(e2, o));
    d(this, "addRowsOrColumns", (e2, o, r) => $t$2(e2, o, r));
    this.editor = e, this.addProsemirrorPlugin(
      new Plugin({
        key: oe$1,
        view: (o) => (this.view = new qr(e, o, (r) => {
          this.emit("update", r);
        }), this.view),
        // We use decorations to render the drop cursor when dragging a table row
        // or column. The decorations are updated in the `dragOverHandler` method.
        props: {
          decorations: (o) => {
            if (this.view === void 0 || this.view.state === void 0 || this.view.state.draggingState === void 0 || this.view.tablePos === void 0)
              return;
            const r = this.view.state.draggingState.draggedCellOrientation === "row" ? this.view.state.rowIndex : this.view.state.colIndex;
            if (r === void 0)
              return;
            const s = [], { block: i, draggingState: c } = this.view.state, { originalIndex: a, draggedCellOrientation: l } = c;
            if (r === a || !i || l === "row" && !Jt$2(i, a, r) || l === "col" && !_t$2(i, a, r))
              return DecorationSet.create(o.doc, s);
            const h = o.doc.resolve(this.view.tablePos + 1);
            return this.view.state.draggingState.draggedCellOrientation === "row" ? yt$2(
              this.view.state.block,
              r
            ).forEach(({ row: f, col: m }) => {
              const g = o.doc.resolve(
                h.posAtIndex(f) + 1
              ), p = o.doc.resolve(
                g.posAtIndex(m) + 1
              ), k = p.node(), b = p.pos + (r > a ? k.nodeSize - 2 : 0);
              s.push(
                // The widget is a small bar which spans the width of the cell.
                Decoration.widget(b, () => {
                  const w = document.createElement("div");
                  return w.className = "bn-table-drop-cursor", w.style.left = "0", w.style.right = "0", r > a ? w.style.bottom = "-2px" : w.style.top = "-3px", w.style.height = "4px", w;
                })
              );
            }) : Ct$2(
              this.view.state.block,
              r
            ).forEach(({ row: f, col: m }) => {
              const g = o.doc.resolve(
                h.posAtIndex(f) + 1
              ), p = o.doc.resolve(
                g.posAtIndex(m) + 1
              ), k = p.node(), b = p.pos + (r > a ? k.nodeSize - 2 : 0);
              s.push(
                // The widget is a small bar which spans the height of the cell.
                Decoration.widget(b, () => {
                  const w = document.createElement("div");
                  return w.className = "bn-table-drop-cursor", w.style.top = "0", w.style.bottom = "0", r > a ? w.style.right = "-2px" : w.style.left = "-3px", w.style.width = "4px", w;
                })
              );
            }), DecorationSet.create(o.doc, s);
          }
        }
      })
    );
  }
  static key() {
    return "tableHandles";
  }
  onUpdate(e) {
    return this.on("update", e);
  }
}
const Wr = Extension.create({
  name: "textAlignment",
  addGlobalAttributes() {
    return [
      {
        // Generally text alignment is handled through props using the custom
        // blocks API. Tables are the only blocks that are created as TipTap
        // nodes and ported to blocks, so we need to add text alignment in a
        // separate extension.
        types: ["tableCell", "tableHeader"],
        attributes: {
          textAlignment: {
            default: "left",
            parseHTML: (n) => n.getAttribute("data-text-alignment"),
            renderHTML: (n) => n.textAlignment === "left" ? {} : {
              "data-text-alignment": n.textAlignment
            }
          }
        }
      }
    ];
  }
}), Xr = Extension.create({
  name: "blockTextColor",
  addGlobalAttributes() {
    return [
      {
        types: ["table", "tableCell", "tableHeader"],
        attributes: {
          textColor: po()
        }
      }
    ];
  }
}), Jr = Extension.create({
  name: "trailingNode",
  addProseMirrorPlugins() {
    const n = new PluginKey(this.name);
    return [
      new Plugin({
        key: n,
        appendTransaction: (t, e, o) => {
          const { doc: r, tr: s, schema: i } = o, c = n.getState(o), a = r.content.size - 2, l = i.nodes.blockContainer, h = i.nodes.paragraph;
          if (c)
            return s.insert(
              a,
              l.create(void 0, h.create())
            );
        },
        state: {
          init: (t, e) => {
          },
          apply: (t, e) => {
            if (!t.docChanged)
              return e;
            let o = t.doc.lastChild;
            if (!o || o.type.name !== "blockGroup")
              throw new Error("Expected blockGroup");
            if (o = o.lastChild, !o || o.type.name !== "blockContainer")
              return true;
            const r = o.firstChild;
            if (!r)
              throw new Error("Expected blockContent");
            return o.nodeSize > 4 || r.type.spec.content !== "inline*";
          }
        }
      })
    ];
  }
}), Qr = {
  blockColor: "data-block-color",
  blockStyle: "data-block-style",
  id: "data-id",
  depth: "data-depth",
  depthChange: "data-depth-change"
}, Zr = Node3.create({
  name: "blockContainer",
  group: "blockGroupChild bnBlock",
  // A block always contains content, and optionally a blockGroup which contains nested blocks
  content: "blockContent blockGroup?",
  // Ensures content-specific keyboard handlers trigger first.
  priority: 50,
  defining: true,
  marks: "insertion modification deletion",
  parseHTML() {
    return [
      {
        tag: "div[data-node-type=" + this.name + "]",
        getAttrs: (n) => {
          if (typeof n == "string")
            return false;
          const t = {};
          for (const [e, o] of Object.entries(Qr))
            n.getAttribute(o) && (t[e] = n.getAttribute(o));
          return t;
        }
      },
      // Ignore `blockOuter` divs, but parse the `blockContainer` divs inside them.
      {
        tag: 'div[data-node-type="blockOuter"]',
        skip: true
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    var r;
    const t = document.createElement("div");
    t.className = "bn-block-outer", t.setAttribute("data-node-type", "blockOuter");
    for (const [s, i] of Object.entries(n))
      s !== "class" && t.setAttribute(s, i);
    const e = {
      ...((r = this.options.domAttributes) == null ? void 0 : r.block) || {},
      ...n
    }, o = document.createElement("div");
    o.className = I$1("bn-block", e.class), o.setAttribute("data-node-type", this.name);
    for (const [s, i] of Object.entries(e))
      s !== "class" && o.setAttribute(s, i);
    return t.appendChild(o), {
      dom: t,
      contentDOM: o
    };
  }
}), es = Node3.create({
  name: "blockGroup",
  group: "childContainer",
  content: "blockGroupChild+",
  marks: "deletion insertion modification",
  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (n) => typeof n == "string" ? false : n.getAttribute("data-node-type") === "blockGroup" ? null : false
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    var o;
    const t = {
      ...((o = this.options.domAttributes) == null ? void 0 : o.blockGroup) || {},
      ...n
    }, e = document.createElement("div");
    e.className = I$1(
      "bn-block-group",
      t.class
    ), e.setAttribute("data-node-type", "blockGroup");
    for (const [r, s] of Object.entries(t))
      r !== "class" && e.setAttribute(r, s);
    return {
      dom: e,
      contentDOM: e
    };
  }
}), ts = Node3.create({
  name: "doc",
  topNode: true,
  content: "blockGroup",
  marks: "insertion modification deletion"
}), os = (n) => {
  var r;
  const t = {}, e = ns(n);
  for (const s of e)
    t[s.name] = s;
  n.collaboration && (t.ySyncPlugin = new fe(n.collaboration.fragment), t.yUndoPlugin = new ge({ editor: n.editor }), (r = n.collaboration.provider) != null && r.awareness && (t.yCursorPlugin = new se(n.collaboration)), t.forkYDocPlugin = new At({
    editor: n.editor,
    collaboration: n.collaboration
  }), t.schemaMigrationPlugin = new Ve$1(
    n.collaboration.fragment
  )), t.formattingToolbar = new lr(
    n.editor
  ), t.linkToolbar = new yr(n.editor), t.sideMenu = new _r(n.editor), t.suggestionMenus = new Vr(n.editor), t.filePanel = new ir(n.editor), t.placeholder = new Mr(n.editor, n.placeholders), (n.animations ?? true) && (t.animations = new Tr()), n.tableHandles && (t.tableHandles = new Yr(n.editor)), t.nodeSelectionKeyboard = new Er(), t.blockChange = new Zn(), t.showSelection = new xr(n.editor), n.comments && (t.comments = new Ot(
    n.editor,
    n.comments.threadStore,
    ke.name,
    n.comments.resolveUsers,
    n.comments.schema
  ));
  const o = n.disableExtensions || [];
  for (const s of o)
    delete t[s];
  return t;
};
let dt$1 = false;
const ns = (n) => {
  const t = [
    extensions_exports.ClipboardTextSerializer,
    extensions_exports.Commands,
    extensions_exports.Editable,
    extensions_exports.FocusEvents,
    extensions_exports.Tabindex,
    // DevTools,
    Gapcursor,
    // DropCursor,
    Extension.create({
      name: "dropCursor",
      addProseMirrorPlugins: () => [
        n.dropCursor({
          width: 5,
          color: "#ddeeff",
          editor: n.editor
        })
      ]
    }),
    Q$1.configure({
      // everything from bnBlock group (nodes that represent a BlockNote block should have an id)
      types: ["blockContainer", "columnList", "column"],
      setIdAttribute: n.setIdAttribute
    }),
    dr,
    // Comments,
    // basics:
    Text,
    // marks:
    $r,
    Fr,
    zr,
    Link.extend({
      inclusive: false
    }).configure({
      defaultProtocol: vr,
      // only call this once if we have multiple editors installed. Or fix https://github.com/ueberdosis/tiptap/issues/5450
      protocols: dt$1 ? [] : Cr
    }),
    ...Object.values(n.styleSpecs).map((e) => e.implementation.mark.configure({
      editor: n.editor
    })),
    Xr,
    Qn,
    Wr,
    // make sure escape blurs editor, so that we can tab to other elements in the host page (accessibility)
    Extension.create({
      name: "OverrideEscape",
      addKeyboardShortcuts() {
        return {
          Escape: () => n.editor.suggestionMenus.shown ? false : this.editor.commands.blur()
        };
      }
    }),
    // nodes
    ts,
    Zr.configure({
      editor: n.editor,
      domAttributes: n.domAttributes
    }),
    kr.configure({
      editor: n.editor,
      tabBehavior: n.tabBehavior
    }),
    es.configure({
      domAttributes: n.domAttributes
    }),
    ...Object.values(n.inlineContentSpecs).filter((e) => e.config !== "link" && e.config !== "text").map((e) => e.implementation.node.configure({
      editor: n.editor
    })),
    ...Object.values(n.blockSpecs).flatMap((e) => [
      // the node extension implementations
      ..."node" in e.implementation ? [
        e.implementation.node.configure({
          editor: n.editor,
          domAttributes: n.domAttributes
        })
      ] : []
    ]),
    Jn(n.editor),
    jn(
      n.editor,
      n.pasteHandler || ((e) => e.defaultPasteHandler())
    ),
    Tn(n.editor),
    // This needs to be at the bottom of this list, because Key events (such as enter, when selecting a /command),
    // should be handled before Enter handlers in other components like splitListItem
    ...n.trailingBlock === void 0 || n.trailingBlock ? [Jr] : [],
    ...n.comments ? [ke] : []
  ];
  return dt$1 = true, n.collaboration || t.push(UndoRedo), t;
};
function rs(n) {
  return n.transact((t) => {
    const e = Y(t.doc, t.selection.anchor);
    if (t.selection instanceof CellSelection)
      return {
        type: "cell",
        anchorBlockId: e.node.attrs.id,
        anchorCellOffset: t.selection.$anchorCell.pos - e.posBeforeNode,
        headCellOffset: t.selection.$headCell.pos - e.posBeforeNode
      };
    if (t.selection instanceof NodeSelection)
      return {
        type: "node",
        anchorBlockId: e.node.attrs.id
      };
    {
      const o = Y(t.doc, t.selection.head);
      return {
        type: "text",
        anchorBlockId: e.node.attrs.id,
        headBlockId: o.node.attrs.id,
        anchorOffset: t.selection.anchor - e.posBeforeNode,
        headOffset: t.selection.head - o.posBeforeNode
      };
    }
  });
}
function ss(n, t) {
  var r, s;
  const e = (r = xt$2(t.anchorBlockId, n.doc)) == null ? void 0 : r.posBeforeNode;
  if (e === void 0)
    throw new Error(
      `Could not find block with ID ${t.anchorBlockId} to update selection`
    );
  let o;
  if (t.type === "cell")
    o = CellSelection.create(
      n.doc,
      e + t.anchorCellOffset,
      e + t.headCellOffset
    );
  else if (t.type === "node")
    o = NodeSelection.create(n.doc, e + 1);
  else {
    const i = (s = xt$2(t.headBlockId, n.doc)) == null ? void 0 : s.posBeforeNode;
    if (i === void 0)
      throw new Error(
        `Could not find block with ID ${t.headBlockId} to update selection`
      );
    o = TextSelection.create(
      n.doc,
      e + t.anchorOffset,
      i + t.headOffset
    );
  }
  n.setSelection(o);
}
function De$1(n) {
  return n.map((t) => t.type === "columnList" ? t.children.map((e) => De$1(e.children)).flat() : {
    ...t,
    children: De$1(t.children)
  }).flat();
}
function Rt(n, t, e) {
  n.transact((o) => {
    var i;
    const r = ((i = n.getSelection()) == null ? void 0 : i.blocks) || [
      n.getTextCursorPosition().block
    ], s = rs(n);
    n.removeBlocks(r), n.insertBlocks(De$1(r), t, e), ss(o, s);
  });
}
function Vt(n) {
  return !n || n.type !== "columnList";
}
function $t(n, t, e) {
  let o, r;
  if (t ? t.children.length > 0 ? (o = t.children[t.children.length - 1], r = "after") : (o = t, r = "before") : e && (o = e, r = "before"), !o || !r)
    return;
  const s = n.getParentBlock(o);
  return Vt(s) ? { referenceBlock: o, placement: r } : $t(
    n,
    r === "after" ? o : n.getPrevBlock(o),
    s
  );
}
function Ft$1(n, t, e) {
  let o, r;
  if (t ? t.children.length > 0 ? (o = t.children[0], r = "before") : (o = t, r = "after") : e && (o = e, r = "after"), !o || !r)
    return;
  const s = n.getParentBlock(o);
  return Vt(s) ? { referenceBlock: o, placement: r } : Ft$1(
    n,
    r === "before" ? o : n.getNextBlock(o),
    s
  );
}
function is(n) {
  n.transact(() => {
    const t = n.getSelection(), e = (t == null ? void 0 : t.blocks[0]) || n.getTextCursorPosition().block, o = $t(
      n,
      n.getPrevBlock(e),
      n.getParentBlock(e)
    );
    o && Rt(
      n,
      o.referenceBlock,
      o.placement
    );
  });
}
function as(n) {
  n.transact(() => {
    const t = n.getSelection(), e = (t == null ? void 0 : t.blocks[(t == null ? void 0 : t.blocks.length) - 1]) || n.getTextCursorPosition().block, o = Ft$1(
      n,
      n.getNextBlock(e),
      n.getParentBlock(e)
    );
    o && Rt(
      n,
      o.referenceBlock,
      o.placement
    );
  });
}
function cs(n, t) {
  const e = typeof t == "string" ? t : t.id, o = ht$3(n), r = xt$2(e, n);
  if (r)
    return L(r.node, o);
}
function ls(n, t) {
  const e = typeof t == "string" ? t : t.id, o = xt$2(e, n), r = ht$3(n);
  if (!o)
    return;
  const i = n.resolve(o.posBeforeNode).nodeBefore;
  if (i)
    return L(i, r);
}
function ds(n, t) {
  const e = typeof t == "string" ? t : t.id, o = xt$2(e, n), r = ht$3(n);
  if (!o)
    return;
  const i = n.resolve(
    o.posBeforeNode + o.node.nodeSize
  ).nodeAfter;
  if (i)
    return L(i, r);
}
function hs(n, t) {
  const e = typeof t == "string" ? t : t.id, o = ht$3(n), r = xt$2(e, n);
  if (!r)
    return;
  const s = n.resolve(r.posBeforeNode), i = s.node(), c = s.node(-1), a = c.type.name !== "doc" ? i.type.name === "blockGroup" ? c : i : void 0;
  if (a)
    return L(a, o);
}
class us {
  constructor(t) {
    this.editor = t;
  }
  /**
   * Gets a snapshot of all top-level (non-nested) blocks in the editor.
   * @returns A snapshot of all top-level (non-nested) blocks in the editor.
   */
  get document() {
    return this.editor.transact((t) => St$3(t.doc, this.editor.pmSchema));
  }
  /**
   * Gets a snapshot of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block that should be
   * retrieved.
   * @returns The block that matches the identifier, or `undefined` if no
   * matching block was found.
   */
  getBlock(t) {
    return this.editor.transact((e) => cs(e.doc, t));
  }
  /**
   * Gets a snapshot of the previous sibling of an existing block from the
   * editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * previous sibling should be retrieved.
   * @returns The previous sibling of the block that matches the identifier.
   * `undefined` if no matching block was found, or it's the first child/block
   * in the document.
   */
  getPrevBlock(t) {
    return this.editor.transact((e) => ls(e.doc, t));
  }
  /**
   * Gets a snapshot of the next sibling of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * next sibling should be retrieved.
   * @returns The next sibling of the block that matches the identifier.
   * `undefined` if no matching block was found, or it's the last child/block in
   * the document.
   */
  getNextBlock(t) {
    return this.editor.transact((e) => ds(e.doc, t));
  }
  /**
   * Gets a snapshot of the parent of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * parent should be retrieved.
   * @returns The parent of the block that matches the identifier. `undefined`
   * if no matching block was found, or the block isn't nested.
   */
  getParentBlock(t) {
    return this.editor.transact(
      (e) => hs(e.doc, t)
    );
  }
  /**
   * Traverses all blocks in the editor depth-first, and executes a callback for each.
   * @param callback The callback to execute for each block. Returning `false` stops the traversal.
   * @param reverse Whether the blocks should be traversed in reverse order.
   */
  forEachBlock(t, e = false) {
    const o = this.document.slice();
    e && o.reverse();
    function r(s) {
      for (const i of s) {
        if (t(i) === false)
          return false;
        const c = e ? i.children.slice().reverse() : i.children;
        if (!r(c))
          return false;
      }
      return true;
    }
    r(o);
  }
  /**
   * Inserts new blocks into the editor. If a block's `id` is undefined, BlockNote generates one automatically. Throws an
   * error if the reference block could not be found.
   * @param blocksToInsert An array of partial blocks that should be inserted.
   * @param referenceBlock An identifier for an existing block, at which the new blocks should be inserted.
   * @param placement Whether the blocks should be inserted just before, just after, or nested inside the
   * `referenceBlock`.
   */
  insertBlocks(t, e, o = "before") {
    return this.editor.transact(
      (r) => gn(r, t, e, o)
    );
  }
  /**
   * Updates an existing block in the editor. Since updatedBlock is a PartialBlock object, some fields might not be
   * defined. These undefined fields are kept as-is from the existing block. Throws an error if the block to update could
   * not be found.
   * @param blockToUpdate The block that should be updated.
   * @param update A partial block which defines how the existing block should be changed.
   */
  updateBlock(t, e) {
    return this.editor.transact((o) => io(o, t, e));
  }
  /**
   * Removes existing blocks from the editor. Throws an error if any of the blocks could not be found.
   * @param blocksToRemove An array of identifiers for existing blocks that should be removed.
   */
  removeBlocks(t) {
    return this.editor.transact(
      (e) => Ze$1(e, t, []).removedBlocks
    );
  }
  /**
   * Replaces existing blocks in the editor with new blocks. If the blocks that should be removed are not adjacent or
   * are at different nesting levels, `blocksToInsert` will be inserted at the position of the first block in
   * `blocksToRemove`. Throws an error if any of the blocks to remove could not be found.
   * @param blocksToRemove An array of blocks that should be replaced.
   * @param blocksToInsert An array of partial blocks to replace the old ones with.
   */
  replaceBlocks(t, e) {
    return this.editor.transact(
      (o) => Ze$1(o, t, e)
    );
  }
  /**
   * Checks if the block containing the text cursor can be nested.
   */
  canNestBlock() {
    return fr(this.editor);
  }
  /**
   * Nests the block containing the text cursor into the block above it.
   */
  nestBlock() {
    Nt$1(this.editor);
  }
  /**
   * Checks if the block containing the text cursor is nested.
   */
  canUnnestBlock() {
    return gr(this.editor);
  }
  /**
   * Lifts the block containing the text cursor out of its parent.
   */
  unnestBlock() {
    mr(this.editor);
  }
  /**
   * Moves the selected blocks up. If the previous block has children, moves
   * them to the end of its children. If there is no previous block, but the
   * current blocks share a common parent, moves them out of & before it.
   */
  moveBlocksUp() {
    return is(this.editor);
  }
  /**
   * Moves the selected blocks down. If the next block has children, moves
   * them to the start of its children. If there is no next block, but the
   * current blocks share a common parent, moves them out of & after it.
   */
  moveBlocksDown() {
    return as(this.editor);
  }
}
class ps {
  constructor(t, e) {
    d(this, "editor");
    d(this, "options");
    d(this, "_commentsPlugin");
    d(this, "_forkYDocPlugin");
    d(this, "_syncPlugin");
    d(this, "_undoPlugin");
    d(this, "_cursorPlugin");
    this.editor = t, this.options = e;
  }
  /**
   * Get the sync plugin instance
   */
  get syncPlugin() {
    return this._syncPlugin;
  }
  /**
   * Get the undo plugin instance
   */
  get undoPlugin() {
    return this._undoPlugin;
  }
  /**
   * Get the cursor plugin instance
   */
  get cursorPlugin() {
    return this._cursorPlugin;
  }
  /**
   * Get the fork YDoc plugin instance
   */
  get forkYDocPlugin() {
    return this._forkYDocPlugin;
  }
  // Initialize collaboration plugins
  initExtensions() {
    var e;
    const t = {};
    if (this._syncPlugin = new fe(this.options.fragment), t.ySyncPlugin = this._syncPlugin, this._undoPlugin = new ge({ editor: this.editor }), t.yUndoPlugin = this._undoPlugin, (e = this.options.provider) != null && e.awareness && (this._cursorPlugin = new se(this.options), t.yCursorPlugin = this._cursorPlugin), this._forkYDocPlugin = new At({
      editor: this.editor,
      collaboration: this.options
    }), t.forkYDocPlugin = this._forkYDocPlugin, this.options.comments) {
      if (!this.options.resolveUsers)
        throw new Error("resolveUsers is required when using comments");
      this._commentsPlugin = new Ot(
        this.editor,
        this.options.comments.threadStore,
        ke.name,
        this.options.resolveUsers,
        this.options.comments.schema
      ), t.comments = this._commentsPlugin, t.commentMark = ke;
    }
    return t;
  }
  /**
   * Update the user info for the current user that's shown to other collaborators
   */
  updateUserInfo(t) {
    const e = this.cursorPlugin;
    if (!e)
      throw new Error(
        "Cannot update collaboration user info when collaboration is disabled."
      );
    e.updateUser(t);
  }
  /**
   * Get the collaboration undo command
   */
  getUndoCommand() {
    return undoCommand;
  }
  /**
   * Get the collaboration redo command
   */
  getRedoCommand() {
    return redoCommand;
  }
  /**
   * Check if initial content should be avoided due to collaboration
   */
  shouldAvoidInitialContent() {
    return !!this.options.provider;
  }
  /**
   * Get the collaboration options
   */
  getOptions() {
    return this.options;
  }
  /**
   * Get the comments plugin if available
   */
  get comments() {
    return this._commentsPlugin;
  }
  /**
   * Check if comments are enabled
   */
  get hasComments() {
    return !!this.options.comments;
  }
  /**
   * Get the resolveUsers function
   */
  get resolveUsers() {
    return this.options.resolveUsers;
  }
}
class ms extends Rt$1 {
  constructor(t) {
    super(), this.editor = t, t.onCreate(() => {
      t._tiptapEditor.on(
        "update",
        ({ transaction: e, appendedTransactions: o }) => {
          this.emit("onChange", t, {
            getChanges() {
              return Tt$1(
                e,
                o
              );
            }
          });
        }
      ), t._tiptapEditor.on("selectionUpdate", ({ transaction: e }) => {
        this.emit("onSelectionChange", { editor: t, transaction: e });
      }), t._tiptapEditor.on("mount", () => {
        this.emit("onMount", { editor: t });
      }), t._tiptapEditor.on("unmount", () => {
        this.emit("onUnmount", { editor: t });
      });
    });
  }
  /**
   * Register a callback that will be called when the editor changes.
   */
  onChange(t) {
    return this.on("onChange", t), () => {
      this.off("onChange", t);
    };
  }
  /**
   * Register a callback that will be called when the selection changes.
   */
  onSelectionChange(t, e = false) {
    const o = (r) => {
      r.transaction.getMeta("$y-sync") && !e || t(this.editor);
    };
    return this.on("onSelectionChange", o), () => {
      this.off("onSelectionChange", o);
    };
  }
  /**
   * Register a callback that will be called when the editor is mounted.
   */
  onMount(t) {
    return this.on("onMount", t), () => {
      this.off("onMount", t);
    };
  }
  /**
   * Register a callback that will be called when the editor is unmounted.
   */
  onUnmount(t) {
    return this.on("onUnmount", t), () => {
      this.off("onUnmount", t);
    };
  }
}
function fs(n) {
  return Array.prototype.indexOf.call(n.parentElement.childNodes, n);
}
function gs(n) {
  return n.nodeType === 3 && !/\S/.test(n.nodeValue || "");
}
function ks(n) {
  n.querySelectorAll("li > ul, li > ol").forEach((t) => {
    const e = fs(t), o = t.parentElement, r = Array.from(o.childNodes).slice(
      e + 1
    );
    t.remove(), r.forEach((s) => {
      s.remove();
    }), o.insertAdjacentElement("afterend", t), r.reverse().forEach((s) => {
      if (gs(s))
        return;
      const i = document.createElement("li");
      i.append(s), t.insertAdjacentElement("afterend", i);
    }), o.childNodes.length === 0 && o.remove();
  });
}
function bs(n) {
  n.querySelectorAll("li + ul, li + ol").forEach((t) => {
    var s, i;
    const e = t.previousElementSibling, o = document.createElement("div");
    e.insertAdjacentElement("afterend", o), o.append(e);
    const r = document.createElement("div");
    for (r.setAttribute("data-node-type", "blockGroup"), o.append(r); ((s = o.nextElementSibling) == null ? void 0 : s.nodeName) === "UL" || ((i = o.nextElementSibling) == null ? void 0 : i.nodeName) === "OL"; )
      r.append(o.nextElementSibling);
  });
}
let ht$1 = null;
function ws() {
  return ht$1 || (ht$1 = document.implementation.createHTMLDocument("title"));
}
function ys(n) {
  if (typeof n == "string") {
    const t = ws().createElement("div");
    t.innerHTML = n, n = t;
  }
  return ks(n), bs(n), n;
}
function zt(n, t) {
  const e = ys(n), r = DOMParser.fromSchema(t).parse(e, {
    topNode: t.nodes.blockGroup.create()
  }), s = [];
  for (let i = 0; i < r.childCount; i++)
    s.push(L(r.child(i), t));
  return s;
}
function Cs(n, t) {
  const e = t.value ? t.value : "", o = {};
  t.lang && (o["data-language"] = t.lang);
  let r = {
    type: "element",
    tagName: "code",
    properties: o,
    children: [{ type: "text", value: e }]
  };
  return t.meta && (r.data = { meta: t.meta }), n.patch(t, r), r = n.applyData(t, r), r = {
    type: "element",
    tagName: "pre",
    properties: {},
    children: [r]
  }, n.patch(t, r), r;
}
function vs(n, t) {
  var s;
  const e = String((t == null ? void 0 : t.url) || ""), o = t != null && t.title ? String(t.title) : void 0;
  let r = {
    type: "element",
    tagName: "video",
    properties: {
      src: e,
      "data-name": o,
      "data-url": e,
      controls: true
    },
    children: []
  };
  return (s = n.patch) == null || s.call(n, t, r), r = n.applyData ? n.applyData(t, r) : r, r;
}
function Gt(n) {
  return unified().use(remarkParse).use(remarkGfm).use(remarkRehype, {
    handlers: {
      ...handlers,
      image: (e, o) => {
        const r = String((o == null ? void 0 : o.url) || "");
        return no(r) ? vs(e, o) : handlers.image(e, o);
      },
      code: Cs
    }
  }).use(rehypeStringify).processSync(n).value;
}
function Ss(n, t) {
  const e = Gt(n);
  return zt(e, t);
}
class Es {
  constructor(t) {
    this.editor = t;
  }
  /**
   * Exports blocks into a simplified HTML string. To better conform to HTML standards, children of blocks which aren't list
   * items are un-nested in the output HTML.
   *
   * @param blocks An array of blocks that should be serialized into HTML.
   * @returns The blocks, serialized as an HTML string.
   */
  blocksToHTMLLossy(t = this.editor.document) {
    return Ce(
      this.editor.pmSchema,
      this.editor
    ).exportBlocks(t, {});
  }
  /**
   * Serializes blocks into an HTML string in the format that would normally be rendered by the editor.
   *
   * Use this method if you want to server-side render HTML (for example, a blog post that has been edited in BlockNote)
   * and serve it to users without loading the editor on the client (i.e.: displaying the blog post)
   *
   * @param blocks An array of blocks that should be serialized into HTML.
   * @returns The blocks, serialized as an HTML string.
   */
  blocksToFullHTML(t = this.editor.document) {
    return vn(
      this.editor.pmSchema,
      this.editor
    ).serializeBlocks(t, {});
  }
  /**
   * Parses blocks from an HTML string. Tries to create `Block` objects out of any HTML block-level elements, and
   * `InlineNode` objects from any HTML inline elements, though not all element types are recognized. If BlockNote
   * doesn't recognize an HTML element's tag, it will parse it as a paragraph or plain text.
   * @param html The HTML string to parse blocks from.
   * @returns The blocks parsed from the HTML string.
   */
  tryParseHTMLToBlocks(t) {
    return zt(t, this.editor.pmSchema);
  }
  /**
   * Serializes blocks into a Markdown string. The output is simplified as Markdown does not support all features of
   * BlockNote - children of blocks which aren't list items are un-nested and certain styles are removed.
   * @param blocks An array of blocks that should be serialized into Markdown.
   * @returns The blocks, serialized as a Markdown string.
   */
  blocksToMarkdownLossy(t = this.editor.document) {
    return Wn(t, this.editor.pmSchema, this.editor, {});
  }
  /**
   * Creates a list of blocks from a Markdown string. Tries to create `Block` and `InlineNode` objects based on
   * Markdown syntax, though not all symbols are recognized. If BlockNote doesn't recognize a symbol, it will parse it
   * as text.
   * @param markdown The Markdown string to parse blocks from.
   * @returns The blocks parsed from the Markdown string.
   */
  tryParseMarkdownToBlocks(t) {
    return Ss(t, this.editor.pmSchema);
  }
  /**
   * Paste HTML into the editor. Defaults to converting HTML to BlockNote HTML.
   * @param html The HTML to paste.
   * @param raw Whether to paste the HTML as is, or to convert it to BlockNote HTML.
   */
  pasteHTML(t, e = false) {
    var r;
    let o = t;
    if (!e) {
      const s = this.tryParseHTMLToBlocks(t);
      o = this.blocksToFullHTML(s);
    }
    o && ((r = this.editor.prosemirrorView) == null || r.pasteHTML(o));
  }
  /**
   * Paste text into the editor. Defaults to interpreting text as markdown.
   * @param text The text to paste.
   */
  pasteText(t) {
    var e;
    return (e = this.editor.prosemirrorView) == null ? void 0 : e.pasteText(t);
  }
  /**
   * Paste markdown into the editor.
   * @param markdown The markdown to paste.
   */
  pasteMarkdown(t) {
    const e = Gt(t);
    return this.pasteHTML(e);
  }
}
class Bs {
  constructor(t) {
    this.editor = t;
  }
  /**
   * Shorthand to get a typed extension from the editor, by
   * just passing in the extension class.
   *
   * @param ext - The extension class to get
   * @param key - optional, the key of the extension in the extensions object (defaults to the extension name)
   * @returns The extension instance
   */
  extension(t, e = t.key()) {
    const o = this.editor.extensions[e];
    if (!o)
      throw new Error(`Extension ${e} not found`);
    return o;
  }
  /**
   * Get all extensions
   */
  getExtensions() {
    return this.editor.extensions;
  }
  /**
   * Get a specific extension by key
   */
  getExtension(t) {
    return this.editor.extensions[t];
  }
  /**
   * Check if an extension exists
   */
  hasExtension(t) {
    return t in this.editor.extensions;
  }
  // Plugin getters - these provide access to the core BlockNote plugins
  /**
   * Get the formatting toolbar plugin
   */
  get formattingToolbar() {
    return this.editor.extensions.formattingToolbar;
  }
  /**
   * Get the link toolbar plugin
   */
  get linkToolbar() {
    return this.editor.extensions.linkToolbar;
  }
  /**
   * Get the side menu plugin
   */
  get sideMenu() {
    return this.editor.extensions.sideMenu;
  }
  /**
   * Get the suggestion menus plugin
   */
  get suggestionMenus() {
    return this.editor.extensions.suggestionMenus;
  }
  /**
   * Get the file panel plugin (if available)
   */
  get filePanel() {
    return this.editor.extensions.filePanel;
  }
  /**
   * Get the table handles plugin (if available)
   */
  get tableHandles() {
    return this.editor.extensions.tableHandles;
  }
  /**
   * Get the show selection plugin
   */
  get showSelectionPlugin() {
    return this.editor.extensions.showSelection;
  }
  /**
   * Check if collaboration is enabled (Yjs or Liveblocks)
   */
  get isCollaborationEnabled() {
    return this.hasExtension("ySyncPlugin") || this.hasExtension("liveblocksExtension");
  }
}
function Ms(n) {
  const t = ht$3(n);
  if (n.selection.empty || "node" in n.selection)
    return;
  const e = n.doc.resolve(
    Y(n.doc, n.selection.from).posBeforeNode
  ), o = n.doc.resolve(
    Y(n.doc, n.selection.to).posBeforeNode
  ), r = (l, h) => {
    const u = e.posAtIndex(l, h), f = n.doc.resolve(u).nodeAfter;
    if (!f)
      throw new Error(
        `Error getting selection - node not found at position ${u}`
      );
    return L(f, t);
  }, s = [], i = e.sharedDepth(o.pos), c = e.index(i), a = o.index(i);
  if (e.depth > i) {
    s.push(L(e.nodeAfter, t));
    for (let l = e.depth; l > i; l--)
      if (e.node(l).type.isInGroup("childContainer")) {
        const u = e.index(l) + 1, f = e.node(l).childCount;
        for (let m = u; m < f; m++)
          s.push(r(m, l));
      }
  } else
    s.push(r(c, i));
  for (let l = c + 1; l <= a; l++)
    s.push(r(l, i));
  if (s.length === 0)
    throw new Error(
      `Error getting selection - selection doesn't span any blocks (${n.selection})`
    );
  return {
    blocks: s
  };
}
function Ps(n, t, e) {
  const o = typeof t == "string" ? t : t.id, r = typeof e == "string" ? e : e.id, s = ht$3(n), i = J(s);
  if (o === r)
    throw new Error(
      `Attempting to set selection with the same anchor and head blocks (id ${o})`
    );
  const c = xt$2(o, n.doc);
  if (!c)
    throw new Error(`Block with ID ${o} not found`);
  const a = xt$2(r, n.doc);
  if (!a)
    throw new Error(`Block with ID ${r} not found`);
  const l = Z(c), h = Z(a), u = i.blockSchema[l.blockNoteType], f = i.blockSchema[h.blockNoteType];
  if (!l.isBlockContainer || u.content === "none")
    throw new Error(
      `Attempting to set selection anchor in block without content (id ${o})`
    );
  if (!h.isBlockContainer || f.content === "none")
    throw new Error(
      `Attempting to set selection anchor in block without content (id ${r})`
    );
  let m, g;
  if (u.content === "table") {
    const p = TableMap.get(l.blockContent.node);
    m = l.blockContent.beforePos + p.positionAt(0, 0, l.blockContent.node) + 1 + 2;
  } else
    m = l.blockContent.beforePos + 1;
  if (f.content === "table") {
    const p = TableMap.get(h.blockContent.node), k = h.blockContent.beforePos + p.positionAt(
      p.height - 1,
      p.width - 1,
      h.blockContent.node
    ) + 1, b = n.doc.resolve(k).nodeAfter.nodeSize;
    g = k + b - 2;
  } else
    g = h.blockContent.afterPos - 1;
  n.setSelection(TextSelection.create(n.doc, m, g));
}
function Ts(n) {
  const t = ht$3(n);
  let e = n.selection.$from, o = n.selection.$to;
  for (; o.parentOffset >= o.parent.nodeSize - 2 && o.depth > 0; )
    o = n.doc.resolve(o.pos + 1);
  for (; o.parentOffset === 0 && o.depth > 0; )
    o = n.doc.resolve(o.pos - 1);
  for (; e.parentOffset === 0 && e.depth > 0; )
    e = n.doc.resolve(e.pos - 1);
  for (; e.parentOffset >= e.parent.nodeSize - 2 && e.depth > 0; )
    e = n.doc.resolve(e.pos + 1);
  const r = Dt$2(
    n.doc.slice(e.pos, o.pos, true),
    t
  );
  return {
    _meta: {
      startPos: e.pos,
      endPos: o.pos
    },
    ...r
  };
}
function xs(n) {
  const { bnBlock: t } = Ot$2(n), e = ht$3(n.doc), o = n.doc.resolve(t.beforePos), r = o.nodeBefore, s = n.doc.resolve(t.afterPos).nodeAfter;
  let i;
  return o.depth > 1 && (i = o.node(), i.type.isInGroup("bnBlock") || (i = o.node(o.depth - 1))), {
    block: L(t.node, e),
    prevBlock: r === null ? void 0 : L(r, e),
    nextBlock: s === null ? void 0 : L(s, e),
    parentBlock: i === void 0 ? void 0 : L(i, e)
  };
}
function jt(n, t, e = "start") {
  const o = typeof t == "string" ? t : t.id, r = ht$3(n.doc), s = J(r), i = xt$2(o, n.doc);
  if (!i)
    throw new Error(`Block with ID ${o} not found`);
  const c = Z(i), a = s.blockSchema[c.blockNoteType].content;
  if (c.isBlockContainer) {
    const l = c.blockContent;
    if (a === "none") {
      n.setSelection(NodeSelection.create(n.doc, l.beforePos));
      return;
    }
    if (a === "inline")
      e === "start" ? n.setSelection(
        TextSelection.create(n.doc, l.beforePos + 1)
      ) : n.setSelection(
        TextSelection.create(n.doc, l.afterPos - 1)
      );
    else if (a === "table")
      e === "start" ? n.setSelection(
        TextSelection.create(n.doc, l.beforePos + 4)
      ) : n.setSelection(
        TextSelection.create(n.doc, l.afterPos - 4)
      );
    else
      throw new O$1(a);
  } else {
    const l = e === "start" ? c.childContainer.node.firstChild : c.childContainer.node.lastChild;
    jt(n, l.attrs.id, e);
  }
}
class Is {
  constructor(t) {
    this.editor = t;
  }
  /**
   * Gets a snapshot of the current selection. This contains all blocks (included nested blocks)
   * that the selection spans across.
   *
   * If the selection starts / ends halfway through a block, the returned data will contain the entire block.
   */
  getSelection() {
    return this.editor.transact((t) => Ms(t));
  }
  /**
   * Gets a snapshot of the current selection. This contains all blocks (included nested blocks)
   * that the selection spans across.
   *
   * If the selection starts / ends halfway through a block, the returned block will be
   * only the part of the block that is included in the selection.
   */
  getSelectionCutBlocks() {
    return this.editor.transact((t) => Ts(t));
  }
  /**
   * Sets the selection to a range of blocks.
   * @param startBlock The identifier of the block that should be the start of the selection.
   * @param endBlock The identifier of the block that should be the end of the selection.
   */
  setSelection(t, e) {
    return this.editor.transact((o) => Ps(o, t, e));
  }
  /**
   * Gets a snapshot of the current text cursor position.
   * @returns A snapshot of the current text cursor position.
   */
  getTextCursorPosition() {
    return this.editor.transact((t) => xs(t));
  }
  /**
   * Sets the text cursor position to the start or end of an existing block. Throws an error if the target block could
   * not be found.
   * @param targetBlock The identifier of an existing block that the text cursor should be moved to.
   * @param placement Whether the text cursor should be placed at the start or end of the block.
   */
  setTextCursorPosition(t, e = "start") {
    return this.editor.transact(
      (o) => jt(o, t, e)
    );
  }
  /**
   * Gets the bounding box of the current selection.
   */
  getSelectionBoundingBox() {
    if (!this.editor.prosemirrorView)
      return;
    const { selection: t } = this.editor.prosemirrorState, { ranges: e } = t, o = Math.min(...e.map((s) => s.$from.pos)), r = Math.max(...e.map((s) => s.$to.pos));
    if (isNodeSelection(t)) {
      const s = this.editor.prosemirrorView.nodeDOM(o);
      if (s)
        return s.getBoundingClientRect();
    }
    return posToDOMRect(this.editor.prosemirrorView, o, r);
  }
}
class Ls {
  constructor(t, e) {
    d(this, "activeTransaction", null);
    d(this, "isInCan", false);
    this.editor = t, this.options = e;
  }
  /**
   * For any command that can be executed, you can check if it can be executed by calling `editor.can(command)`.
   * @example
   * ```ts
   * if (editor.can(editor.undo)) {
   *   // show button
   * } else {
   *   // hide button
   * }
   */
  can(t) {
    try {
      return this.isInCan = true, t();
    } finally {
      this.isInCan = false;
    }
  }
  /**
   * Execute a prosemirror command. This is mostly for backwards compatibility with older code.
   *
   * @note You should prefer the {@link transact} method when possible, as it will automatically handle the dispatching of the transaction and work across blocknote transactions.
   *
   * @example
   * ```ts
   * editor.exec((state, dispatch, view) => {
   *   dispatch(state.tr.insertText("Hello, world!"));
   * });
   * ```
   */
  exec(t) {
    if (this.activeTransaction)
      throw new Error(
        "`exec` should not be called within a `transact` call, move the `exec` call outside of the `transact` call"
      );
    if (this.isInCan)
      return this.canExec(t);
    const e = this.prosemirrorState, o = this.prosemirrorView;
    return t(e, (s) => this.prosemirrorView.dispatch(s), o);
  }
  /**
   * Check if a command can be executed. A command should return `false` if it is not valid in the current state.
   *
   * @example
   * ```ts
   * if (editor.canExec(command)) {
   *   // show button
   * } else {
   *   // hide button
   * }
   * ```
   */
  canExec(t) {
    if (this.activeTransaction)
      throw new Error(
        "`canExec` should not be called within a `transact` call, move the `canExec` call outside of the `transact` call"
      );
    const e = this.prosemirrorState, o = this.prosemirrorView;
    return t(e, void 0, o);
  }
  /**
   * Execute a function within a "blocknote transaction".
   * All changes to the editor within the transaction will be grouped together, so that
   * we can dispatch them as a single operation (thus creating only a single undo step)
   *
   * @note There is no need to dispatch the transaction, as it will be automatically dispatched when the callback is complete.
   *
   * @example
   * ```ts
   * // All changes to the editor will be grouped together
   * editor.transact((tr) => {
   *   tr.insertText("Hello, world!");
   * // These two operations will be grouped together in a single undo step
   *   editor.transact((tr) => {
   *     tr.insertText("Hello, world!");
   *   });
   * });
   * ```
   */
  transact(t) {
    if (this.activeTransaction)
      return t(this.activeTransaction);
    try {
      this.activeTransaction = this.editor._tiptapEditor.state.tr;
      const e = t(this.activeTransaction), o = this.activeTransaction;
      return this.activeTransaction = null, o && // Only dispatch if the transaction was actually modified in some way
      (o.docChanged || o.selectionSet || o.scrolledIntoView || o.storedMarksSet || !o.isGeneric) && this.prosemirrorView.dispatch(o), e;
    } finally {
      this.activeTransaction = null;
    }
  }
  /**
   * Get the underlying prosemirror state
   * @note Prefer using `editor.transact` to read the current editor state, as that will ensure the state is up to date
   * @see https://prosemirror.net/docs/ref/#state.EditorState
   */
  get prosemirrorState() {
    if (this.activeTransaction)
      throw new Error(
        "`prosemirrorState` should not be called within a `transact` call, move the `prosemirrorState` call outside of the `transact` call or use `editor.transact` to read the current editor state"
      );
    return this.editor._tiptapEditor.state;
  }
  /**
   * Get the underlying prosemirror view
   * @see https://prosemirror.net/docs/ref/#view.EditorView
   */
  get prosemirrorView() {
    return this.editor._tiptapEditor.view;
  }
  isFocused() {
    var t;
    return ((t = this.prosemirrorView) == null ? void 0 : t.hasFocus()) || false;
  }
  focus() {
    var t;
    (t = this.prosemirrorView) == null || t.focus();
  }
  /**
   * Checks if the editor is currently editable, or if it's locked.
   * @returns True if the editor is editable, false otherwise.
   */
  get isEditable() {
    if (!this.editor._tiptapEditor) {
      if (!this.editor.headless)
        throw new Error("no editor, but also not headless?");
      return false;
    }
    return this.editor._tiptapEditor.isEditable === void 0 ? true : this.editor._tiptapEditor.isEditable;
  }
  /**
   * Makes the editor editable or locks it, depending on the argument passed.
   * @param editable True to make the editor editable, or false to lock it.
   */
  set isEditable(t) {
    if (!this.editor._tiptapEditor) {
      if (!this.editor.headless)
        throw new Error("no editor, but also not headless?");
      return;
    }
    this.editor._tiptapEditor.options.editable !== t && this.editor._tiptapEditor.setEditable(t);
  }
  /**
   * Undo the last action.
   */
  undo() {
    var t;
    return this.exec(((t = this.options) == null ? void 0 : t.undo) ?? undo);
  }
  /**
   * Redo the last action.
   */
  redo() {
    var t;
    return this.exec(((t = this.options) == null ? void 0 : t.redo) ?? redo);
  }
}
function As(n, t, e, o = { updateSelection: true }) {
  let { from: r, to: s } = typeof t == "number" ? { from: t, to: t } : { from: t.from, to: t.to }, i = true, c = true, a = "";
  if (e.forEach((l) => {
    l.check(), i && l.isText && l.marks.length === 0 ? a += l.text : i = false, c = c ? l.isBlock : false;
  }), r === s && c) {
    const { parent: l } = n.doc.resolve(r);
    l.isTextblock && !l.type.spec.code && !l.childCount && (r -= 1, s += 1);
  }
  return i ? n.insertText(a, r, s) : n.replaceWith(r, s, e), o.updateSelection && selectionToInsertionEnd(n, n.steps.length - 1, -1), true;
}
class Ds {
  constructor(t) {
    this.editor = t;
  }
  /**
   * Insert a piece of content at the current cursor position.
   *
   * @param content can be a string, or array of partial inline content elements
   */
  insertInlineContent(t, { updateSelection: e = false } = {}) {
    const o = T$1(t, this.editor.pmSchema);
    this.editor.transact((r) => {
      As(
        r,
        {
          from: r.selection.from,
          to: r.selection.to
        },
        o,
        {
          updateSelection: e
        }
      );
    });
  }
  /**
   * Gets the active text styles at the text cursor position or at the end of the current selection if it's active.
   */
  getActiveStyles() {
    return this.editor.transact((t) => {
      const e = {}, o = t.selection.$to.marks();
      for (const r of o) {
        const s = this.editor.schema.styleSchema[r.type.name];
        if (!s) {
          r.type.name !== "link" && // "blocknoteIgnore" tagged marks (such as comments) are also not considered BlockNote "styles"
          !r.type.spec.blocknoteIgnore && console.warn("mark not found in styleschema", r.type.name);
          continue;
        }
        s.propSchema === "boolean" ? e[s.type] = true : e[s.type] = r.attrs.stringValue;
      }
      return e;
    });
  }
  /**
   * Adds styles to the currently selected content.
   * @param styles The styles to add.
   */
  addStyles(t) {
    for (const [e, o] of Object.entries(t)) {
      const r = this.editor.schema.styleSchema[e];
      if (!r)
        throw new Error(`style ${e} not found in styleSchema`);
      if (r.propSchema === "boolean")
        this.editor._tiptapEditor.commands.setMark(e);
      else if (r.propSchema === "string")
        this.editor._tiptapEditor.commands.setMark(e, {
          stringValue: o
        });
      else
        throw new O$1(r.propSchema);
    }
  }
  /**
   * Removes styles from the currently selected content.
   * @param styles The styles to remove.
   */
  removeStyles(t) {
    for (const e of Object.keys(t))
      this.editor._tiptapEditor.commands.unsetMark(e);
  }
  /**
   * Toggles styles on the currently selected content.
   * @param styles The styles to toggle.
   */
  toggleStyles(t) {
    for (const [e, o] of Object.entries(t)) {
      const r = this.editor.schema.styleSchema[e];
      if (!r)
        throw new Error(`style ${e} not found in styleSchema`);
      if (r.propSchema === "boolean")
        this.editor._tiptapEditor.commands.toggleMark(e);
      else if (r.propSchema === "string")
        this.editor._tiptapEditor.commands.toggleMark(e, {
          stringValue: o
        });
      else
        throw new O$1(r.propSchema);
    }
  }
  /**
   * Gets the currently selected text.
   */
  getSelectedText() {
    return this.editor.transact((t) => t.doc.textBetween(t.selection.from, t.selection.to));
  }
  /**
   * Gets the URL of the last link in the current selection, or `undefined` if there are no links in the selection.
   */
  getSelectedLinkUrl() {
    return this.editor._tiptapEditor.getAttributes("link").href;
  }
  /**
   * Creates a new link to replace the selected content.
   * @param url The link URL.
   * @param text The text to display the link with.
   */
  createLink(t, e) {
    if (t === "")
      return;
    const o = this.editor.pmSchema.mark("link", { href: t });
    this.editor.transact((r) => {
      const { from: s, to: i } = r.selection;
      e ? r.insertText(e, s, i).addMark(s, s + e.length, o) : r.setSelection(TextSelection.create(r.doc, i)).addMark(
        s,
        i,
        o
      );
    });
  }
}
function Os(n, t) {
  const e = [];
  return n.forEach((o, r, s) => {
    s !== t && e.push(o);
  }), Fragment.from(e);
}
function _s(n, t) {
  const e = [];
  for (let o = 0; o < n.childCount; o++)
    if (n.child(o).type.name === "tableRow")
      if (e.length > 0 && e[e.length - 1].type.name === "table") {
        const r = e[e.length - 1], s = r.copy(r.content.addToEnd(n.child(o)));
        e[e.length - 1] = s;
      } else {
        const r = t.nodes.table.createChecked(
          void 0,
          n.child(o)
        );
        e.push(r);
      }
    else
      e.push(n.child(o));
  return n = Fragment.from(e), n;
}
function Ns(n, t) {
  let e = Fragment.from(n.content);
  if (e = _s(e, t.state.schema), !Hs(e, t))
    return new Slice(e, n.openStart, n.openEnd);
  for (let o = 0; o < e.childCount; o++)
    if (e.child(o).type.spec.group === "blockContent") {
      const r = [e.child(o)];
      if (o + 1 < e.childCount && e.child(o + 1).type.name === "blockGroup") {
        const i = e.child(o + 1).child(0).child(0);
        (i.type.name === "bulletListItem" || i.type.name === "numberedListItem" || i.type.name === "checkListItem") && (r.push(e.child(o + 1)), e = Os(e, o + 1));
      }
      const s = t.state.schema.nodes.blockContainer.createChecked(
        void 0,
        r
      );
      e = e.replaceChild(o, s);
    }
  return new Slice(e, n.openStart, n.openEnd);
}
function Hs(n, t) {
  var s, i;
  const e = n.childCount === 1, o = ((s = n.firstChild) == null ? void 0 : s.type.spec.content) === "inline*", r = ((i = n.firstChild) == null ? void 0 : i.type.spec.content) === "tableRow+";
  if (e) {
    if (o)
      return false;
    if (r) {
      const c = Tt$3(t.state);
      if (c.isBlockContainer)
        return !(c.blockContent.node.type.spec.content === "tableRow+");
    }
  }
  return true;
}
const Us = {
  enableInputRules: true,
  enablePasteRules: true,
  enableCoreExtensions: false
};
class Kt extends Rt$1 {
  constructor(e) {
    var u, f, m, g, p, k$1, b, w, D, F, J, Q, Z, ee, v, M, $e, Fe, ze;
    super();
    d(this, "pmSchema");
    d(this, "extensions", {});
    d(this, "_tiptapEditor");
    d(this, "elementRenderer", null);
    d(this, "blockCache", /* @__PURE__ */ new WeakMap());
    d(this, "dictionary");
    d(this, "schema");
    d(this, "blockImplementations");
    d(this, "inlineContentImplementations");
    d(this, "styleImplementations");
    d(this, "uploadFile");
    d(this, "onUploadStartCallbacks", []);
    d(this, "onUploadEndCallbacks", []);
    d(this, "resolveFileUrl");
    d(this, "resolveUsers");
    d(this, "settings");
    d(this, "_blockManager");
    d(this, "_collaborationManager");
    d(this, "_eventManager");
    d(this, "_exportManager");
    d(this, "_extensionManager");
    d(this, "_selectionManager");
    d(this, "_stateManager");
    d(this, "_styleManager");
    d(this, "mount", (e2) => {
      this._tiptapEditor.mount({ mount: e2 });
    });
    d(this, "unmount", () => {
      this._tiptapEditor.unmount();
    });
    this.options = e;
    const o = e;
    if (o.onEditorContentChange)
      throw new Error(
        "onEditorContentChange initialization option is deprecated, use <BlockNoteView onChange={...} />, the useEditorChange(...) hook, or editor.onChange(...)"
      );
    if (o.onTextCursorPositionChange)
      throw new Error(
        "onTextCursorPositionChange initialization option is deprecated, use <BlockNoteView onSelectionChange={...} />, the useEditorSelectionChange(...) hook, or editor.onSelectionChange(...)"
      );
    if (o.onEditorReady)
      throw new Error(
        "onEditorReady is deprecated. Editor is immediately ready for use after creation."
      );
    if (o.editable)
      throw new Error(
        "editable initialization option is deprecated, use <BlockNoteView editable={true/false} />, or alternatively editor.isEditable = true/false"
      );
    this.dictionary = e.dictionary || i, this.settings = {
      tables: {
        splitCells: ((u = e == null ? void 0 : e.tables) == null ? void 0 : u.splitCells) ?? false,
        cellBackgroundColor: ((f = e == null ? void 0 : e.tables) == null ? void 0 : f.cellBackgroundColor) ?? false,
        cellTextColor: ((m = e == null ? void 0 : e.tables) == null ? void 0 : m.cellTextColor) ?? false,
        headers: ((g = e == null ? void 0 : e.tables) == null ? void 0 : g.headers) ?? false
      }
    };
    const r = {
      defaultStyles: true,
      schema: e.schema || Pe.create(),
      ...e,
      placeholders: {
        ...this.dictionary.placeholders,
        ...e.placeholders
      }
    };
    if (r.collaboration || r.comments) {
      const y = {
        // Use collaboration options if available, otherwise provide defaults
        fragment: ((p = r.collaboration) == null ? void 0 : p.fragment) || new YXmlFragment(),
        user: ((k$1 = r.collaboration) == null ? void 0 : k$1.user) || {
          name: "User",
          color: "#FF0000"
        },
        provider: ((b = r.collaboration) == null ? void 0 : b.provider) || null,
        renderCursor: (w = r.collaboration) == null ? void 0 : w.renderCursor,
        showCursorLabels: (D = r.collaboration) == null ? void 0 : D.showCursorLabels,
        comments: r.comments,
        resolveUsers: r.resolveUsers
      };
      this._collaborationManager = new ps(
        this,
        y
      );
    } else
      this._collaborationManager = void 0;
    if (r.comments && !r.resolveUsers)
      throw new Error("resolveUsers is required when using comments");
    this.schema = r.schema, this.blockImplementations = r.schema.blockSpecs, this.inlineContentImplementations = r.schema.inlineContentSpecs, this.styleImplementations = r.schema.styleSpecs, this.extensions = {
      ...os({
        editor: this,
        domAttributes: r.domAttributes || {},
        blockSpecs: this.schema.blockSpecs,
        styleSpecs: this.schema.styleSpecs,
        inlineContentSpecs: this.schema.inlineContentSpecs,
        collaboration: r.collaboration,
        trailingBlock: r.trailingBlock,
        disableExtensions: r.disableExtensions,
        setIdAttribute: r.setIdAttribute,
        animations: r.animations ?? true,
        tableHandles: k(this, "table"),
        dropCursor: this.options.dropCursor ?? dropCursor,
        placeholders: r.placeholders,
        tabBehavior: r.tabBehavior,
        pasteHandler: r.pasteHandler
      }),
      ...(F = this._collaborationManager) == null ? void 0 : F.initExtensions()
    }, (((J = r._tiptapOptions) == null ? void 0 : J.extensions) || []).forEach((y) => {
      this.extensions[y.name] = y;
    });
    for (let y of r.extensions || []) {
      typeof y == "function" && (y = y(this));
      const C = y.key ?? y.constructor.key();
      if (!C)
        throw new Error(
          `Extension ${y.constructor.name} does not have a key method`
        );
      if (this.extensions[C])
        throw new Error(
          `Extension ${y.constructor.name} already exists with key ${C}`
        );
      this.extensions[C] = y;
    }
    if (Object.entries(r._extensions || {}).forEach(([y, C]) => {
      const P = typeof C == "function" ? C(this) : C;
      if (!("plugin" in P)) {
        this.extensions[y] = P;
        return;
      }
      this.extensions[y] = new class extends Wt {
        static key() {
          return y;
        }
        constructor() {
          super(), this.addProsemirrorPlugin(P.plugin);
        }
        get priority() {
          return P.priority;
        }
      }();
    }), r.uploadFile) {
      const y = r.uploadFile;
      this.uploadFile = async (C, T) => {
        this.onUploadStartCallbacks.forEach(
          (P) => P.apply(this, [T])
        );
        try {
          return await y(C, T);
        } finally {
          this.onUploadEndCallbacks.forEach(
            (P) => P.apply(this, [T])
          );
        }
      };
    }
    this.resolveFileUrl = r.resolveFileUrl;
    const s = "ySyncPlugin" in this.extensions || "liveblocksExtension" in this.extensions;
    s && r.initialContent && console.warn(
      "When using Collaboration, initialContent might cause conflicts, because changes should come from the collaboration provider"
    );
    const i$1 = Object.fromEntries(
      Object.values(this.schema.blockSpecs).map((y) => y.extensions).filter((y) => y !== void 0).flat().map((y) => [y.key ?? y.constructor.key(), y])
    ), c = [
      ...Object.entries({ ...this.extensions, ...i$1 }).map(
        ([y, C]) => {
          if (C instanceof Extension || C instanceof Node3 || C instanceof Mark)
            return C;
          if (C instanceof Wt)
            return !C.plugins.length && !C.keyboardShortcuts && !C.inputRules && !C.tiptapExtensions ? void 0 : Extension.create({
              name: y,
              priority: C.priority,
              addProseMirrorPlugins: () => C.plugins,
              addExtensions: () => C.tiptapExtensions || [],
              // TODO maybe collect all input rules from all extensions into one plugin
              // TODO consider using the prosemirror-inputrules package instead
              addInputRules: C.inputRules ? () => C.inputRules.map(
                (T) => new InputRule({
                  find: T.find,
                  handler: ({ range: P, match: ve, state: Ge }) => {
                    const je = T.replace({
                      match: ve,
                      range: P,
                      editor: this
                    });
                    if (je) {
                      const qt = this.getTextCursorPosition();
                      if (this.schema.blockSchema[qt.block.type].content !== "inline")
                        return;
                      const Yt = Ot$2(
                        Ge.tr
                      ), Wt = Ge.tr.deleteRange(
                        P.from,
                        P.to
                      );
                      q(
                        Wt,
                        Yt.bnBlock.beforePos,
                        je
                      );
                      return;
                    }
                    return null;
                  }
                })
              ) : void 0,
              addKeyboardShortcuts: C.keyboardShortcuts ? () => Object.fromEntries(
                Object.entries(C.keyboardShortcuts).map(
                  ([T, P]) => [
                    T,
                    () => P({ editor: this })
                  ]
                )
              ) : void 0
            });
        }
      )
    ].filter((y) => y !== void 0), a = {
      ...Us,
      ...r._tiptapOptions,
      element: null,
      autofocus: r.autofocus ?? false,
      extensions: c,
      editorProps: {
        ...(Q = r._tiptapOptions) == null ? void 0 : Q.editorProps,
        attributes: {
          // As of TipTap v2.5.0 the tabIndex is removed when the editor is not
          // editable, so you can't focus it. We want to revert this as we have
          // UI behaviour that relies on it.
          tabIndex: "0",
          ...(ee = (Z = r._tiptapOptions) == null ? void 0 : Z.editorProps) == null ? void 0 : ee.attributes,
          ...(v = r.domAttributes) == null ? void 0 : v.editor,
          class: I$1(
            "bn-editor",
            r.defaultStyles ? "bn-default-styles" : "",
            (($e = (M = r.domAttributes) == null ? void 0 : M.editor) == null ? void 0 : $e.class) || ""
          )
        },
        transformPasted: Ns
      }
    };
    try {
      const y = r.initialContent || (s ? [
        {
          type: "paragraph",
          id: "initialBlockId"
        }
      ] : [
        {
          type: "paragraph",
          id: Q$1.options.generateID()
        }
      ]);
      if (!Array.isArray(y) || y.length === 0)
        throw new Error(
          "initialContent must be a non-empty array of blocks, received: " + y
        );
      const C = getSchema(a.extensions), T = y.map(
        (ve) => bt$2(ve, C, this.schema.styleSchema).toJSON()
      ), P = createDocument(
        {
          type: "doc",
          content: [
            {
              type: "blockGroup",
              content: T
            }
          ]
        },
        C,
        a.parseOptions
      );
      this._tiptapEditor = new Editor({
        ...a,
        content: P.toJSON()
      }), this.pmSchema = this._tiptapEditor.schema;
    } catch (y) {
      throw new Error(
        "Error creating document from blocks passed as `initialContent`",
        { cause: y }
      );
    }
    let l;
    const h = this.pmSchema.nodes.doc.createAndFill;
    this.pmSchema.nodes.doc.createAndFill = (...y) => {
      if (l)
        return l;
      const C = h.apply(this.pmSchema.nodes.doc, y), T = JSON.parse(JSON.stringify(C.toJSON()));
      return T.content[0].content[0].attrs.id = "initialBlockId", l = Node.fromJSON(this.pmSchema, T), l;
    }, this.pmSchema.cached.blockNoteEditor = this, this._blockManager = new us(this), this._eventManager = new ms(this), this._exportManager = new Es(this), this._extensionManager = new Bs(this), this._selectionManager = new Is(this), this._stateManager = new Ls(
      this,
      s ? {
        undo: (Fe = this._collaborationManager) == null ? void 0 : Fe.getUndoCommand(),
        redo: (ze = this._collaborationManager) == null ? void 0 : ze.getRedoCommand()
      } : void 0
    ), this._styleManager = new Ds(this), this.emit("create");
  }
  get formattingToolbar() {
    return this._extensionManager.formattingToolbar;
  }
  get linkToolbar() {
    return this._extensionManager.linkToolbar;
  }
  get sideMenu() {
    return this._extensionManager.sideMenu;
  }
  get suggestionMenus() {
    return this._extensionManager.suggestionMenus;
  }
  get filePanel() {
    return this._extensionManager.filePanel;
  }
  get tableHandles() {
    return this._extensionManager.tableHandles;
  }
  get comments() {
    var e;
    return (e = this._collaborationManager) == null ? void 0 : e.comments;
  }
  get showSelectionPlugin() {
    return this._extensionManager.showSelectionPlugin;
  }
  /**
   * The plugin for forking a document, only defined if in collaboration mode
   */
  get forkYDocPlugin() {
    var e;
    return (e = this._collaborationManager) == null ? void 0 : e.forkYDocPlugin;
  }
  static create(e) {
    return new Kt(e ?? {});
  }
  /**
   * Execute a prosemirror command. This is mostly for backwards compatibility with older code.
   *
   * @note You should prefer the {@link transact} method when possible, as it will automatically handle the dispatching of the transaction and work across blocknote transactions.
   *
   * @example
   * ```ts
   * editor.exec((state, dispatch, view) => {
   *   dispatch(state.tr.insertText("Hello, world!"));
   * });
   * ```
   */
  exec(e) {
    return this._stateManager.exec(e);
  }
  /**
   * Check if a command can be executed. A command should return `false` if it is not valid in the current state.
   *
   * @example
   * ```ts
   * if (editor.canExec(command)) {
   *   // show button
   * } else {
   *   // hide button
   * }
   * ```
   */
  canExec(e) {
    return this._stateManager.canExec(e);
  }
  /**
   * Execute a function within a "blocknote transaction".
   * All changes to the editor within the transaction will be grouped together, so that
   * we can dispatch them as a single operation (thus creating only a single undo step)
   *
   * @note There is no need to dispatch the transaction, as it will be automatically dispatched when the callback is complete.
   *
   * @example
   * ```ts
   * // All changes to the editor will be grouped together
   * editor.transact((tr) => {
   *   tr.insertText("Hello, world!");
   * // These two operations will be grouped together in a single undo step
   *   editor.transact((tr) => {
   *     tr.insertText("Hello, world!");
   *   });
   * });
   * ```
   */
  transact(e) {
    return this._stateManager.transact(e);
  }
  // TO DISCUSS
  /**
   * Shorthand to get a typed extension from the editor, by
   * just passing in the extension class.
   *
   * @param ext - The extension class to get
   * @param key - optional, the key of the extension in the extensions object (defaults to the extension name)
   * @returns The extension instance
   */
  extension(e, o = e.key()) {
    return this._extensionManager.extension(e, o);
  }
  /**
   * Get the underlying prosemirror state
   * @note Prefer using `editor.transact` to read the current editor state, as that will ensure the state is up to date
   * @see https://prosemirror.net/docs/ref/#state.EditorState
   */
  get prosemirrorState() {
    return this._stateManager.prosemirrorState;
  }
  /**
   * Get the underlying prosemirror view
   * @see https://prosemirror.net/docs/ref/#view.EditorView
   */
  get prosemirrorView() {
    return this._stateManager.prosemirrorView;
  }
  get domElement() {
    var e;
    if (!this.headless)
      return (e = this.prosemirrorView) == null ? void 0 : e.dom;
  }
  isFocused() {
    var e;
    return this.headless ? false : ((e = this.prosemirrorView) == null ? void 0 : e.hasFocus()) || false;
  }
  get headless() {
    return !this._tiptapEditor.isInitialized;
  }
  focus() {
    this.headless || this.prosemirrorView.focus();
  }
  blur() {
    this.headless || this.prosemirrorView.dom.blur();
  }
  onUploadStart(e) {
    return this.onUploadStartCallbacks.push(e), () => {
      const o = this.onUploadStartCallbacks.indexOf(e);
      o > -1 && this.onUploadStartCallbacks.splice(o, 1);
    };
  }
  onUploadEnd(e) {
    return this.onUploadEndCallbacks.push(e), () => {
      const o = this.onUploadEndCallbacks.indexOf(e);
      o > -1 && this.onUploadEndCallbacks.splice(o, 1);
    };
  }
  /**
   * @deprecated, use `editor.document` instead
   */
  get topLevelBlocks() {
    return this.document;
  }
  /**
   * Gets a snapshot of all top-level (non-nested) blocks in the editor.
   * @returns A snapshot of all top-level (non-nested) blocks in the editor.
   */
  get document() {
    return this._blockManager.document;
  }
  /**
   * Gets a snapshot of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block that should be
   * retrieved.
   * @returns The block that matches the identifier, or `undefined` if no
   * matching block was found.
   */
  getBlock(e) {
    return this._blockManager.getBlock(e);
  }
  /**
   * Gets a snapshot of the previous sibling of an existing block from the
   * editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * previous sibling should be retrieved.
   * @returns The previous sibling of the block that matches the identifier.
   * `undefined` if no matching block was found, or it's the first child/block
   * in the document.
   */
  getPrevBlock(e) {
    return this._blockManager.getPrevBlock(e);
  }
  /**
   * Gets a snapshot of the next sibling of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * next sibling should be retrieved.
   * @returns The next sibling of the block that matches the identifier.
   * `undefined` if no matching block was found, or it's the last child/block in
   * the document.
   */
  getNextBlock(e) {
    return this._blockManager.getNextBlock(e);
  }
  /**
   * Gets a snapshot of the parent of an existing block from the editor.
   * @param blockIdentifier The identifier of an existing block for which the
   * parent should be retrieved.
   * @returns The parent of the block that matches the identifier. `undefined`
   * if no matching block was found, or the block isn't nested.
   */
  getParentBlock(e) {
    return this._blockManager.getParentBlock(e);
  }
  /**
   * Traverses all blocks in the editor depth-first, and executes a callback for each.
   * @param callback The callback to execute for each block. Returning `false` stops the traversal.
   * @param reverse Whether the blocks should be traversed in reverse order.
   */
  forEachBlock(e, o = false) {
    this._blockManager.forEachBlock(e, o);
  }
  /**
   * Executes a callback whenever the editor's contents change.
   * @param callback The callback to execute.
   *
   * @deprecated use {@link BlockNoteEditor.onChange} instead
   */
  onEditorContentChange(e) {
    this._tiptapEditor.on("update", e);
  }
  /**
   * Executes a callback whenever the editor's selection changes.
   * @param callback The callback to execute.
   *
   * @deprecated use `onSelectionChange` instead
   */
  onEditorSelectionChange(e) {
    this._tiptapEditor.on("selectionUpdate", e);
  }
  /**
   * Gets a snapshot of the current text cursor position.
   * @returns A snapshot of the current text cursor position.
   */
  getTextCursorPosition() {
    return this._selectionManager.getTextCursorPosition();
  }
  /**
   * Sets the text cursor position to the start or end of an existing block. Throws an error if the target block could
   * not be found.
   * @param targetBlock The identifier of an existing block that the text cursor should be moved to.
   * @param placement Whether the text cursor should be placed at the start or end of the block.
   */
  setTextCursorPosition(e, o = "start") {
    return this._selectionManager.setTextCursorPosition(e, o);
  }
  /**
   * Gets a snapshot of the current selection. This contains all blocks (included nested blocks)
   * that the selection spans across.
   *
   * If the selection starts / ends halfway through a block, the returned data will contain the entire block.
   */
  getSelection() {
    return this._selectionManager.getSelection();
  }
  /**
   * Gets a snapshot of the current selection. This contains all blocks (included nested blocks)
   * that the selection spans across.
   *
   * If the selection starts / ends halfway through a block, the returned block will be
   * only the part of the block that is included in the selection.
   */
  getSelectionCutBlocks() {
    return this._selectionManager.getSelectionCutBlocks();
  }
  /**
   * Sets the selection to a range of blocks.
   * @param startBlock The identifier of the block that should be the start of the selection.
   * @param endBlock The identifier of the block that should be the end of the selection.
   */
  setSelection(e, o) {
    return this._selectionManager.setSelection(e, o);
  }
  /**
   * Checks if the editor is currently editable, or if it's locked.
   * @returns True if the editor is editable, false otherwise.
   */
  get isEditable() {
    return this._stateManager.isEditable;
  }
  /**
   * Makes the editor editable or locks it, depending on the argument passed.
   * @param editable True to make the editor editable, or false to lock it.
   */
  set isEditable(e) {
    this._stateManager.isEditable = e;
  }
  /**
   * Inserts new blocks into the editor. If a block's `id` is undefined, BlockNote generates one automatically. Throws an
   * error if the reference block could not be found.
   * @param blocksToInsert An array of partial blocks that should be inserted.
   * @param referenceBlock An identifier for an existing block, at which the new blocks should be inserted.
   * @param placement Whether the blocks should be inserted just before, just after, or nested inside the
   * `referenceBlock`.
   */
  insertBlocks(e, o, r = "before") {
    return this._blockManager.insertBlocks(
      e,
      o,
      r
    );
  }
  /**
   * Updates an existing block in the editor. Since updatedBlock is a PartialBlock object, some fields might not be
   * defined. These undefined fields are kept as-is from the existing block. Throws an error if the block to update could
   * not be found.
   * @param blockToUpdate The block that should be updated.
   * @param update A partial block which defines how the existing block should be changed.
   */
  updateBlock(e, o) {
    return this._blockManager.updateBlock(e, o);
  }
  /**
   * Removes existing blocks from the editor. Throws an error if any of the blocks could not be found.
   * @param blocksToRemove An array of identifiers for existing blocks that should be removed.
   */
  removeBlocks(e) {
    return this._blockManager.removeBlocks(e);
  }
  /**
   * Replaces existing blocks in the editor with new blocks. If the blocks that should be removed are not adjacent or
   * are at different nesting levels, `blocksToInsert` will be inserted at the position of the first block in
   * `blocksToRemove`. Throws an error if any of the blocks to remove could not be found.
   * @param blocksToRemove An array of blocks that should be replaced.
   * @param blocksToInsert An array of partial blocks to replace the old ones with.
   */
  replaceBlocks(e, o) {
    return this._blockManager.replaceBlocks(e, o);
  }
  /**
   * Undo the last action.
   */
  undo() {
    return this._stateManager.undo();
  }
  /**
   * Redo the last action.
   */
  redo() {
    return this._stateManager.redo();
  }
  /**
   * Insert a piece of content at the current cursor position.
   *
   * @param content can be a string, or array of partial inline content elements
   */
  insertInlineContent(e, { updateSelection: o = false } = {}) {
    this._styleManager.insertInlineContent(e, { updateSelection: o });
  }
  /**
   * Gets the active text styles at the text cursor position or at the end of the current selection if it's active.
   */
  getActiveStyles() {
    return this._styleManager.getActiveStyles();
  }
  /**
   * Adds styles to the currently selected content.
   * @param styles The styles to add.
   */
  addStyles(e) {
    this._styleManager.addStyles(e);
  }
  /**
   * Removes styles from the currently selected content.
   * @param styles The styles to remove.
   */
  removeStyles(e) {
    this._styleManager.removeStyles(e);
  }
  /**
   * Toggles styles on the currently selected content.
   * @param styles The styles to toggle.
   */
  toggleStyles(e) {
    this._styleManager.toggleStyles(e);
  }
  /**
   * Gets the currently selected text.
   */
  getSelectedText() {
    return this._styleManager.getSelectedText();
  }
  /**
   * Gets the URL of the last link in the current selection, or `undefined` if there are no links in the selection.
   */
  getSelectedLinkUrl() {
    return this._styleManager.getSelectedLinkUrl();
  }
  /**
   * Creates a new link to replace the selected content.
   * @param url The link URL.
   * @param text The text to display the link with.
   */
  createLink(e, o) {
    this._styleManager.createLink(e, o);
  }
  /**
   * Checks if the block containing the text cursor can be nested.
   */
  canNestBlock() {
    return this._blockManager.canNestBlock();
  }
  /**
   * Nests the block containing the text cursor into the block above it.
   */
  nestBlock() {
    this._blockManager.nestBlock();
  }
  /**
   * Checks if the block containing the text cursor is nested.
   */
  canUnnestBlock() {
    return this._blockManager.canUnnestBlock();
  }
  /**
   * Lifts the block containing the text cursor out of its parent.
   */
  unnestBlock() {
    this._blockManager.unnestBlock();
  }
  /**
   * Moves the selected blocks up. If the previous block has children, moves
   * them to the end of its children. If there is no previous block, but the
   * current blocks share a common parent, moves them out of & before it.
   */
  moveBlocksUp() {
    return this._blockManager.moveBlocksUp();
  }
  /**
   * Moves the selected blocks down. If the next block has children, moves
   * them to the start of its children. If there is no next block, but the
   * current blocks share a common parent, moves them out of & after it.
   */
  moveBlocksDown() {
    return this._blockManager.moveBlocksDown();
  }
  /**
   * Exports blocks into a simplified HTML string. To better conform to HTML standards, children of blocks which aren't list
   * items are un-nested in the output HTML.
   *
   * @param blocks An array of blocks that should be serialized into HTML.
   * @returns The blocks, serialized as an HTML string.
   */
  blocksToHTMLLossy(e = this.document) {
    return this._exportManager.blocksToHTMLLossy(e);
  }
  /**
   * Serializes blocks into an HTML string in the format that would normally be rendered by the editor.
   *
   * Use this method if you want to server-side render HTML (for example, a blog post that has been edited in BlockNote)
   * and serve it to users without loading the editor on the client (i.e.: displaying the blog post)
   *
   * @param blocks An array of blocks that should be serialized into HTML.
   * @returns The blocks, serialized as an HTML string.
   */
  blocksToFullHTML(e = this.document) {
    return this._exportManager.blocksToFullHTML(e);
  }
  /**
   * Parses blocks from an HTML string. Tries to create `Block` objects out of any HTML block-level elements, and
   * `InlineNode` objects from any HTML inline elements, though not all element types are recognized. If BlockNote
   * doesn't recognize an HTML element's tag, it will parse it as a paragraph or plain text.
   * @param html The HTML string to parse blocks from.
   * @returns The blocks parsed from the HTML string.
   */
  tryParseHTMLToBlocks(e) {
    return this._exportManager.tryParseHTMLToBlocks(e);
  }
  /**
   * Serializes blocks into a Markdown string. The output is simplified as Markdown does not support all features of
   * BlockNote - children of blocks which aren't list items are un-nested and certain styles are removed.
   * @param blocks An array of blocks that should be serialized into Markdown.
   * @returns The blocks, serialized as a Markdown string.
   */
  blocksToMarkdownLossy(e = this.document) {
    return this._exportManager.blocksToMarkdownLossy(e);
  }
  /**
   * Creates a list of blocks from a Markdown string. Tries to create `Block` and `InlineNode` objects based on
   * Markdown syntax, though not all symbols are recognized. If BlockNote doesn't recognize a symbol, it will parse it
   * as text.
   * @param markdown The Markdown string to parse blocks from.
   * @returns The blocks parsed from the Markdown string.
   */
  tryParseMarkdownToBlocks(e) {
    return this._exportManager.tryParseMarkdownToBlocks(e);
  }
  /**
   * Updates the user info for the current user that's shown to other collaborators.
   */
  updateCollaborationUserInfo(e) {
    if (!this._collaborationManager)
      throw new Error(
        "Cannot update collaboration user info when collaboration is disabled."
      );
    this._collaborationManager.updateUserInfo(e);
  }
  /**
   * A callback function that runs whenever the editor's contents change.
   *
   * @param callback The callback to execute.
   * @returns A function to remove the callback.
   */
  onChange(e) {
    return this._eventManager.onChange(e);
  }
  /**
   * A callback function that runs whenever the text cursor position or selection changes.
   *
   * @param callback The callback to execute.
   * @returns A function to remove the callback.
   */
  onSelectionChange(e, o) {
    return this._eventManager.onSelectionChange(
      e,
      o
    );
  }
  /**
   * A callback function that runs when the editor has been initialized.
   *
   * This can be useful for plugins to initialize themselves after the editor has been initialized.
   *
   * @param callback The callback to execute.
   * @returns A function to remove the callback.
   */
  onCreate(e) {
    return this.on("create", e), () => {
      this.off("create", e);
    };
  }
  /**
   * A callback function that runs when the editor has been mounted.
   *
   * This can be useful for plugins to initialize themselves after the editor has been mounted.
   *
   * @param callback The callback to execute.
   * @returns A function to remove the callback.
   */
  onMount(e) {
    this._eventManager.onMount(e);
  }
  /**
   * A callback function that runs when the editor has been unmounted.
   *
   * This can be useful for plugins to clean up themselves after the editor has been unmounted.
   *
   * @param callback The callback to execute.
   * @returns A function to remove the callback.
   */
  onUnmount(e) {
    this._eventManager.onUnmount(e);
  }
  /**
   * Gets the bounding box of the current selection.
   * @returns The bounding box of the current selection.
   */
  getSelectionBoundingBox() {
    return this._selectionManager.getSelectionBoundingBox();
  }
  get isEmpty() {
    const e = this.document;
    return e.length === 0 || e.length === 1 && e[0].type === "paragraph" && e[0].content.length === 0;
  }
  openSuggestionMenu(e, o) {
    !this.prosemirrorView || this.headless || (this.focus(), this.transact((r) => {
      o != null && o.deleteTriggerCharacter && r.insertText(e), r.scrollIntoView().setMeta(this.suggestionMenus.plugins[0], {
        triggerCharacter: e,
        deleteTriggerCharacter: (o == null ? void 0 : o.deleteTriggerCharacter) || false,
        ignoreQueryLength: (o == null ? void 0 : o.ignoreQueryLength) || false
      });
    }));
  }
  // `forceSelectionVisible` determines whether the editor selection is shows
  // even when the editor is not focused. This is useful for e.g. creating new
  // links, so the user still sees the affected content when an input field is
  // focused.
  // TODO: Reconsider naming?
  getForceSelectionVisible() {
    return this.showSelectionPlugin.getEnabled();
  }
  setForceSelectionVisible(e) {
    this.showSelectionPlugin.setEnabled(e);
  }
  /**
   * Paste HTML into the editor. Defaults to converting HTML to BlockNote HTML.
   * @param html The HTML to paste.
   * @param raw Whether to paste the HTML as is, or to convert it to BlockNote HTML.
   */
  pasteHTML(e, o = false) {
    this._exportManager.pasteHTML(e, o);
  }
  /**
   * Paste text into the editor. Defaults to interpreting text as markdown.
   * @param text The text to paste.
   */
  pasteText(e) {
    return this._exportManager.pasteText(e);
  }
  /**
   * Paste markdown into the editor.
   * @param markdown The markdown to paste.
   */
  pasteMarkdown(e) {
    return this._exportManager.pasteMarkdown(e);
  }
}
let he;
async function Rs() {
  return he || (he = (async () => {
    const [n, t] = await Promise.all([
      __vitePreload(() => import('./vendor-misc-CQ2gQV2M.js').then(n => n.eO),true?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]):void 0),
      // use a dynamic import to encourage bundle-splitting
      // and a smaller initial client bundle size
      __vitePreload(() => import('./vendor-misc-CQ2gQV2M.js').then(n => n.eP),true?__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]):void 0)
    ]), e = "default" in n ? n.default : n, o = "default" in t ? t.default : t;
    return await e.init({ data: o }), { emojiMart: e, emojiData: o };
  })(), he);
}
async function wi(n, t) {
  if (!("text" in n.schema.inlineContentSchema) || n.schema.inlineContentSchema.text !== wo.text)
    return [];
  const { emojiData: e, emojiMart: o } = await Rs();
  return (t.trim() === "" ? Object.values(e.emojis) : await o.SearchIndex.search(t)).map((s) => ({
    id: s.skins[0].native,
    onItemClick: () => n.insertInlineContent(s.skins[0].native + " ")
  }));
}

const ee = (e, n, t = false) => {
  const o = [];
  function r(i, a = "--bn") {
    for (const l in i) {
      const c = l.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), d = `${a}-${c}`;
      typeof i[l] != "object" ? (typeof i[l] == "number" && (i[l] = `${i[l]}px`), t ? n.style.removeProperty(d) : n.style.setProperty(d, i[l].toString())) : r(i[l], d);
    }
  }
  return r(e), o;
}, A = (e, n) => ee(e, n), De = {
  colors: {
    editor: {
      text: void 0,
      background: void 0
    },
    menu: {
      text: void 0,
      background: void 0
    },
    tooltip: {
      text: void 0,
      background: void 0
    },
    hovered: {
      text: void 0,
      background: void 0
    },
    selected: {
      text: void 0,
      background: void 0
    },
    disabled: {
      text: void 0,
      background: void 0
    },
    shadow: void 0,
    border: void 0,
    sideMenu: void 0,
    highlights: {
      gray: {
        text: void 0,
        background: void 0
      },
      brown: {
        text: void 0,
        background: void 0
      },
      red: {
        text: void 0,
        background: void 0
      },
      orange: {
        text: void 0,
        background: void 0
      },
      yellow: {
        text: void 0,
        background: void 0
      },
      green: {
        text: void 0,
        background: void 0
      },
      blue: {
        text: void 0,
        background: void 0
      },
      purple: {
        text: void 0,
        background: void 0
      },
      pink: {
        text: void 0,
        background: void 0
      }
    }
  },
  borderRadius: void 0,
  fontFamily: void 0
}, Ie = (e) => ee(De, e, true), te = (e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 0, className: "bn-tooltip", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { size: "sm", lineClamp: 5, children: e.mainTooltip }),
  e.secondaryTooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { size: "xs", lineClamp: 5, children: e.secondaryTooltip })
] }), O = reactExports.forwardRef(
  (e, n) => {
    const {
      className: t,
      children: o,
      mainTooltip: r,
      secondaryTooltip: i,
      icon: a,
      isSelected: l,
      isDisabled: c,
      onClick: d,
      label: f,
      variant: b,
      ...S
    } = e;
    At$2(S, false);
    const [x, y] = reactExports.useState(false), P = o ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "aria-label": f,
        className: t,
        onMouseDown: (w) => {
          eo() && w.currentTarget.focus();
        },
        onClick: (w) => {
          y(true), d == null || d(w);
        },
        onPointerLeave: () => y(false),
        "aria-pressed": l,
        "data-selected": l || void 0,
        "data-test": r ? r.slice(0, 1).toLowerCase() + r.replace(/\s+/g, "").slice(1) : void 0,
        size: b === "compact" ? "compact-xs" : "xs",
        disabled: c || false,
        ref: n,
        ...S,
        children: o
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        className: t,
        "aria-label": f,
        onMouseDown: (w) => {
          eo() && w.currentTarget.focus();
        },
        onClick: (w) => {
          y(true), d == null || d(w);
        },
        onPointerLeave: () => y(false),
        "aria-pressed": l,
        "data-selected": l || void 0,
        "data-test": r ? r.slice(0, 1).toLowerCase() + r.replace(/\s+/g, "").slice(1) : void 0,
        size: b === "compact" ? 20 : 30,
        disabled: c || false,
        ref: n,
        ...S,
        children: a
      }
    );
    return r ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        disabled: x,
        withinPortal: false,
        label: /* @__PURE__ */ jsxRuntimeExports.jsx(
          te,
          {
            mainTooltip: r,
            secondaryTooltip: i
          }
        ),
        children: P
      }
    ) : P;
  }
), Re = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    text: o,
    icon: r,
    isSelected: i,
    mainTooltip: a,
    secondaryTooltip: l,
    onClick: c,
    onMouseEnter: d,
    ...f
  } = e;
  At$2(f, false);
  const [b, S] = reactExports.useState(false), x = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Chip,
    {
      className: t,
      checked: i === true,
      wrapperProps: {
        onMouseEnter: d,
        onMouseLeave: () => S(false),
        onClick: (y) => {
          S(true), c == null || c(y);
        }
      },
      variant: "light",
      icon: null,
      ref: n,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o })
      ]
    }
  );
  return !a || b ? x : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tooltip,
    {
      refProp: "rootRef",
      withinPortal: false,
      label: /* @__PURE__ */ jsxRuntimeExports.jsx(
        te,
        {
          mainTooltip: a,
          secondaryTooltip: l
        }
      ),
      children: x
    }
  );
}), ze = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: t, ref: n, children: o });
}), Be = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    headerText: r,
    selected: i,
    onFocus: a,
    onBlur: l,
    tabIndex: c,
    ...d
  } = e;
  return At$2(d, false), /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: I$1(t, i ? "selected" : ""),
      onFocus: a,
      onBlur: l,
      tabIndex: c,
      ref: n,
      children: [
        r && /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { className: "bn-header-text", children: r }),
        o
      ]
    }
  );
}), Ee = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r, false), /* @__PURE__ */ jsxRuntimeExports.jsx(Card.Section, { className: t, ref: n, children: o });
}), Le = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r, false), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Divider,
    {
      className: t,
      label: /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { children: o }),
      ref: n
    }
  );
}), je = reactExports.forwardRef((e, n) => {
  const { authorInfo: t, timeString: o, edited: r, ...i } = e, a = y$1();
  return At$2(i, false), t === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 24, width: 24 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 12, width: 100 }) })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Avatar,
      {
        src: t.avatarUrl,
        alt: t.username,
        radius: "xl",
        size: "sm",
        color: "initials"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text$1, { fz: "sm", fw: "bold", children: [
      t.username,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text$1, { fz: "xs", c: "dimmed", span: true, ml: "xs", children: [
        o,
        " ",
        r && `(${a.comments.edited})`
      ] })
    ] })
  ] });
}), $e = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    showActions: o,
    authorInfo: r,
    timeString: i,
    edited: a,
    actions: l,
    emojiPickerOpen: c,
    children: d,
    ...f
  } = e, { hovered: b, ref: S } = useHover(), x = So([n, S]);
  return At$2(f, false), /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { pos: "relative", ref: x, className: t, children: [
    l && (o === true || o === void 0 || o === "hover" && b || c) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Group,
      {
        style: {
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 10
        },
        children: l
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(je, { ...e }),
    d
  ] });
}), Ae = reactExports.forwardRef((e, n) => {
  const { className: t, autoFocus: o, onFocus: r, onBlur: i, editor: a, editable: l, ...c } = e;
  At$2(c, false);
  const d = D$2();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ft,
    {
      autoFocus: o,
      className: t,
      editor: e.editor,
      sideMenu: false,
      slashMenu: false,
      tableHandles: false,
      filePanel: false,
      formattingToolbar: false,
      editable: l,
      theme: d == null ? void 0 : d.colorSchemePreference,
      ref: n,
      onFocus: r,
      onBlur: i,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Yo,
        {
          formattingToolbar: _e
        }
      )
    }
  );
}), _e = () => {
  const e = Ko([]).filter(
    (n) => n.key !== "nestBlockButton" && n.key !== "unnestBlockButton"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tt$4, { blockTypeSelectItems: [], children: e });
}, Ve = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    name: o,
    label: r,
    variant: i,
    icon: a,
    value: l,
    autoFocus: c,
    placeholder: d,
    disabled: f,
    onKeyDown: b,
    onChange: S,
    onSubmit: x,
    autoComplete: y,
    rightSection: P,
    ...w
  } = e;
  return At$2(w), /* @__PURE__ */ jsxRuntimeExports.jsx(
    TextInput,
    {
      size: "xs",
      className: I$1(
        t || "",
        i === "large" ? "bn-mt-input-large" : ""
      ),
      ref: n,
      name: o,
      label: r,
      leftSection: a,
      value: l,
      autoFocus: c,
      "data-autofocus": c ? "true" : void 0,
      rightSection: P,
      placeholder: d,
      disabled: f,
      onKeyDown: b,
      onChange: S,
      onSubmit: x,
      autoComplete: y
    }
  );
}), Ge = reactExports.createContext(void 0), He = (e) => {
  const { children: n, onOpenChange: t, position: o, sub: r, ...i } = e;
  return At$2(i), r ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu.Sub,
    {
      transitionProps: { duration: 250, exitDelay: 250 },
      withinPortal: false,
      middlewares: { flip: true, shift: true, inline: false, size: true },
      onChange: t,
      position: o,
      children: n
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu,
    {
      withinPortal: false,
      middlewares: { flip: true, shift: true, inline: false, size: true },
      onChange: t,
      position: o,
      children: n
    }
  );
}, Ke = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, icon: r, checked: i, subTrigger: a, onClick: l, ...c } = e;
  return At$2(c, false), a ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu.Sub.Item,
    {
      className: t,
      ref: n,
      leftSection: r,
      rightSection: i ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { size: 10 }) : i === false ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bn-tick-space" }) : null,
      onClick: l,
      ...c,
      children: o
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu.Item,
    {
      className: t,
      ref: n,
      leftSection: r,
      rightSection: i ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { size: 10 }) : i === false ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bn-tick-space" }) : null,
      onClick: l,
      ...c,
      children: o
    }
  );
}), Ue = (e) => {
  const {
    children: n,
    sub: t,
    // unused
    ...o
  } = e;
  return At$2(o), t ? /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Sub.Target, { children: n }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: n });
}, We = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    sub: r,
    //unused
    ...i
  } = e;
  At$2(i);
  const a = reactExports.useContext(Ge);
  return r ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu.Sub.Dropdown,
    {
      className: t,
      ref: n,
      onMouseOver: a == null ? void 0 : a.onMenuMouseOver,
      onMouseLeave: a == null ? void 0 : a.onMenuMouseLeave,
      children: o
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menu.Dropdown,
    {
      className: t,
      ref: n,
      onMouseOver: a == null ? void 0 : a.onMenuMouseOver,
      onMouseLeave: a == null ? void 0 : a.onMenuMouseLeave,
      children: o
    }
  );
}), qe = reactExports.forwardRef((e, n) => {
  const { className: t, ...o } = e;
  return At$2(o), /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, { className: t, ref: n });
}), Ze = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Label, { className: t, ref: n, children: o });
}), Je = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    icon: r,
    onClick: i,
    onDragEnd: a,
    onDragStart: l,
    draggable: c,
    label: d,
    ...f
  } = e;
  return At$2(f, false), r ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ActionIcon,
    {
      size: 24,
      className: t,
      ref: n,
      onClick: i,
      onDragEnd: a,
      onDragStart: l,
      draggable: c,
      "aria-label": d,
      ...f,
      children: r
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      className: t,
      ref: n,
      onClick: i,
      onDragEnd: a,
      onDragStart: l,
      draggable: c,
      "aria-label": d,
      ...f,
      children: o
    }
  );
}), Qe = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    tabs: o,
    defaultOpenTab: r,
    openTab: i,
    setOpenTab: a,
    loading: l,
    ...c
  } = e;
  return At$2(c), /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: t, ref: n, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tabs,
    {
      value: i,
      defaultValue: r,
      onChange: a,
      children: [
        l && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { visible: l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.List, { children: o.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs.Tab,
          {
            "data-test": `${d.name.toLowerCase()}-tab`,
            value: d.name,
            children: d.name
          },
          d.name
        )) }),
        o.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { value: d.name, children: d.tabPanel }, d.name))
      ]
    }
  ) });
}), Xe = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, onClick: r, label: i, ...a } = e;
  return At$2(a), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      size: "xs",
      "aria-label": i,
      className: t,
      ref: n,
      onClick: r,
      ...a,
      children: o
    }
  );
}), Ye = reactExports.forwardRef((e, n) => {
  const { className: t, accept: o, value: r, placeholder: i, onChange: a, ...l } = e;
  return At$2(l), /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileInput,
    {
      size: "xs",
      className: t,
      ref: n,
      accept: o,
      value: r,
      placeholder: i,
      onChange: a,
      ...l
    }
  );
}), et = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: t, ref: n, children: o });
}), tt = reactExports.forwardRef((e, n) => {
  const { className: t, value: o, placeholder: r, onKeyDown: i, onChange: a, ...l } = e;
  return At$2(l), /* @__PURE__ */ jsxRuntimeExports.jsx(
    TextInput,
    {
      size: "xs",
      "data-test": "embed-input",
      className: t,
      ref: n,
      value: o,
      placeholder: r,
      onKeyDown: i,
      onChange: a
    }
  );
}), nt = (e) => {
  const { opened: n, position: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover,
    {
      middlewares: { size: { padding: 20 } },
      withinPortal: false,
      opened: n,
      position: t,
      zIndex: 1e4,
      children: o
    }
  );
}, ot = (e) => {
  const { children: n, ...t } = e;
  return At$2(t), /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTarget, { children: n });
}, rt = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    variant: r,
    // unused
    ...i
  } = e;
  return At$2(i), /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverDropdown, { className: t, ref: n, children: o });
}), st = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r, false), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Group,
    {
      align: "center",
      gap: 0,
      className: t,
      ref: n,
      ...r,
      children: o
    }
  );
}), it = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    icon: r,
    onClick: i,
    onDragEnd: a,
    onDragStart: l,
    draggable: c,
    label: d,
    ...f
  } = e;
  return At$2(f, false), r ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ActionIcon,
    {
      size: 24,
      className: t,
      ref: n,
      onClick: i,
      onDragEnd: a,
      onDragStart: l,
      draggable: c,
      "aria-label": d,
      ...f,
      children: r
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      className: t,
      ref: n,
      onClick: i,
      onDragEnd: a,
      onDragStart: l,
      draggable: c,
      "aria-label": d,
      ...f,
      children: o
    }
  );
}), at = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, id: r, ...i } = e;
  return At$2(i), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Stack,
    {
      gap: 0,
      className: t,
      ref: n,
      id: r,
      role: "listbox",
      children: o
    }
  );
}), lt = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: t, ref: n, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: "bn-mt-suggestion-menu-item-title", children: o }) });
}), ct = reactExports.forwardRef((e, n) => {
  const { className: t, isSelected: o, onClick: r, item: i, id: a, ...l } = e;
  At$2(l);
  const c = reactExports.useRef(null);
  return reactExports.useEffect(() => {
    if (!c.current || !o)
      return;
    const d = jl(
      c.current,
      document.querySelector(".bn-suggestion-menu, #ai-suggestion-menu")
      // TODO
    );
    d === "top" ? c.current.scrollIntoView(true) : d === "bottom" && c.current.scrollIntoView(false);
  }, [o]), /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Group,
    {
      gap: 0,
      className: t,
      ref: mergeRefs(n, c),
      id: a,
      role: "option",
      onMouseDown: (d) => d.preventDefault(),
      onClick: r,
      "aria-selected": o || void 0,
      children: [
        i.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Group,
          {
            className: "bn-mt-suggestion-menu-item-section",
            "data-position": "left",
            children: i.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 0, className: "bn-mt-suggestion-menu-item-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { className: "bn-mt-suggestion-menu-item-title", children: i.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text$1, { className: "bn-mt-suggestion-menu-item-subtitle", children: i.subtext })
        ] }),
        i.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Group,
          {
            "data-position": "right",
            className: "bn-mt-suggestion-menu-item-section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "xs", children: i.badge })
          }
        )
      ]
    }
  );
}), dt = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, ...r } = e;
  return At$2(r), /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: t, ref: n, children: o });
}), ut = reactExports.forwardRef((e, n) => {
  const { className: t, ...o } = e;
  return At$2(o), /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: t, type: "dots", size: 16, ref: n });
}), mt = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, id: r, columns: i, ...a } = e;
  return At$2(a), /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: t,
      style: { gridTemplateColumns: `repeat(${i}, 1fr)` },
      ref: n,
      id: r,
      role: "grid",
      children: o
    }
  );
}), gt = reactExports.forwardRef((e, n) => {
  const { className: t, children: o, columns: r, ...i } = e;
  return At$2(i), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Group,
    {
      className: t,
      style: { gridColumn: `1 / ${r + 1}` },
      ref: n,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: "bn-mt-suggestion-menu-item-title", children: o })
    }
  );
}), ft = reactExports.forwardRef((e, n) => {
  const { className: t, isSelected: o, onClick: r, item: i, id: a, ...l } = e;
  At$2(l);
  const c = reactExports.useRef(null);
  return reactExports.useEffect(() => {
    if (!c.current || !o)
      return;
    const d = jl(
      c.current,
      document.querySelector(".bn-grid-suggestion-menu")
    );
    d === "top" ? c.current.scrollIntoView(true) : d === "bottom" && c.current.scrollIntoView(false);
  }, [o]), /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: t,
      ref: mergeRefs(n, c),
      id: a,
      role: "option",
      onClick: r,
      "aria-selected": o || void 0,
      children: i.icon
    }
  );
}), bt = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    // unused, using "dots" instead
    columns: r,
    ...i
  } = e;
  return At$2(i), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Loader,
    {
      className: t,
      style: { gridColumn: `1 / ${r + 1}` },
      type: "dots",
      ref: n
    }
  );
}), ht = reactExports.forwardRef((e, n) => {
  const { children: t, className: o, onMouseDown: r, onClick: i, ...a } = e;
  return At$2(a, false), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      className: o,
      ref: n,
      onMouseDown: r,
      onClick: i,
      ...a,
      children: t
    }
  );
}), pt = reactExports.forwardRef((e, n) => {
  const {
    className: t,
    children: o,
    draggable: r,
    onDragStart: i,
    onDragEnd: a,
    style: l,
    label: c,
    ...d
  } = e;
  return At$2(d, false), /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      className: t,
      ref: n,
      "aria-label": c,
      draggable: r,
      onDragStart: i,
      onDragEnd: a,
      style: l,
      ...d,
      children: o
    }
  );
}), D = reactExports.forwardRef(
  (e, n) => {
    const {
      className: t,
      children: o,
      onMouseEnter: r,
      onMouseLeave: i,
      variant: a,
      ...l
    } = e;
    At$2(l);
    const { ref: c, focused: d } = useFocusWithin(), f = useFocusTrap(d), b = mergeRefs(n, c, f);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Flex,
      {
        className: t,
        ref: b,
        role: "toolbar",
        onMouseEnter: r,
        onMouseLeave: i,
        gap: a === "action-toolbar" ? 2 : void 0,
        children: o
      }
    );
  }
);
var ne = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, _ = React__default.createContext && /* @__PURE__ */ React__default.createContext(ne), vt = ["attr", "size", "title"];
function St(e, n) {
  if (e == null) return {};
  var t = yt(e, n), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++)
      o = i[r], !(n.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (t[o] = e[o]);
  }
  return t;
}
function yt(e, n) {
  if (e == null) return {};
  var t = {};
  for (var o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      if (n.indexOf(o) >= 0) continue;
      t[o] = e[o];
    }
  return t;
}
function F() {
  return F = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, F.apply(this, arguments);
}
function V(e, n) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    n && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function M(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? arguments[n] : {};
    n % 2 ? V(Object(t), true).forEach(function(o) {
      wt(e, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : V(Object(t)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return e;
}
function wt(e, n, t) {
  return n = xt(n), n in e ? Object.defineProperty(e, n, { value: t, enumerable: true, configurable: true, writable: true }) : e[n] = t, e;
}
function xt(e) {
  var n = Ct(e, "string");
  return typeof n == "symbol" ? n : n + "";
}
function Ct(e, n) {
  if (typeof e != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var o = t.call(e, n);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (n === "string" ? String : Number)(e);
}
function oe(e) {
  return e && e.map((n, t) => /* @__PURE__ */ React__default.createElement(n.tag, M({
    key: t
  }, n.attr), oe(n.child)));
}
function Nt(e) {
  return (n) => /* @__PURE__ */ React__default.createElement(Tt, F({
    attr: M({}, e.attr)
  }, n), oe(e.child));
}
function Tt(e) {
  var n = (t) => {
    var {
      attr: o,
      size: r,
      title: i
    } = e, a = St(e, vt), l = r || t.size || "1em", c;
    return t.className && (c = t.className), e.className && (c = (c ? c + " " : "") + e.className), /* @__PURE__ */ React__default.createElement("svg", F({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, t.attr, o, a, {
      className: c,
      style: M(M({
        color: e.color || t.color
      }, t.style), e.style),
      height: l,
      width: l,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && /* @__PURE__ */ React__default.createElement("title", null, i), e.children);
  };
  return _ !== void 0 ? /* @__PURE__ */ React__default.createElement(_.Consumer, null, (t) => n(t)) : n(ne);
}
function Pt(e) {
  return Nt({ attr: { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, child: [{ tag: "path", attr: { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }, child: [] }] })(e);
}
const I = reactExports.forwardRef((e, n) => {
  const { className: t, items: o, isDisabled: r, ...i } = e;
  At$2(i);
  const a = o.filter((l) => l.isSelected)[0];
  return a ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Menu,
    {
      withinPortal: false,
      transitionProps: {
        exitDuration: 0
      },
      disabled: r,
      middlewares: { flip: true, shift: true, inline: false, size: true },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onMouseDown: (l) => {
              eo() && l.currentTarget.focus();
            },
            leftSection: a.icon,
            rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(Pt, {}),
            size: "xs",
            variant: "subtle",
            disabled: r,
            children: a.text
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Dropdown, { className: t, ref: n, children: o.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            onClick: l.onClick,
            leftSection: l.icon,
            rightSection: l.isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { size: 10, className: "bn-tick-icon" }) : (
              // Ensures space for tick even if item isn't currently selected.
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bn-tick-space" })
            ),
            disabled: l.isDisabled,
            children: l.text
          },
          l.text
        )) })
      ]
    }
  ) : null;
}), kt = {
  FormattingToolbar: {
    Root: D,
    Button: O,
    Select: I
  },
  FilePanel: {
    Root: Qe,
    Button: Xe,
    FileInput: Ye,
    TabPanel: et,
    TextInput: tt
  },
  GridSuggestionMenu: {
    Root: mt,
    Item: ft,
    EmptyItem: gt,
    Loader: bt
  },
  LinkToolbar: {
    Root: D,
    Button: O,
    Select: I
  },
  SideMenu: {
    Root: st,
    Button: it
  },
  SuggestionMenu: {
    Root: at,
    Item: ct,
    EmptyItem: lt,
    Label: dt,
    Loader: ut
  },
  TableHandle: {
    Root: pt,
    ExtendButton: ht
  },
  Generic: {
    Badge: {
      Root: Re,
      Group: ze
    },
    Form: {
      Root: (e) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: e.children }),
      TextInput: Ve
    },
    Menu: {
      Root: He,
      Trigger: Ue,
      Dropdown: We,
      Divider: qe,
      Label: Ze,
      Item: Ke,
      Button: Je
    },
    Popover: {
      Root: nt,
      Trigger: ot,
      Content: rt
    },
    Toolbar: {
      Root: D,
      Button: O,
      Select: I
    }
  },
  Comments: {
    Comment: $e,
    Editor: Ae,
    Card: Be,
    CardSection: Ee,
    ExpandSectionsPrompt: Le
  }
}, Ft = (e) => {
  const { className: n, theme: t, ...o } = e, r = D$2(), i = Wr$1(), a = (r == null ? void 0 : r.colorSchemePreference) || i, l = reactExports.useCallback(
    (b) => {
      if (b && (Ie(b), typeof t == "object")) {
        if ("light" in t && "dark" in t) {
          A(
            t[a === "dark" ? "dark" : "light"],
            b
          );
          return;
        }
        A(t, b);
        return;
      }
    },
    [a, t]
  ), c = reactExports.useContext(MantineContext), d = typeof t == "string" ? t : a !== "no-preference" ? a : "light", f = /* @__PURE__ */ jsxRuntimeExports.jsx(Sn$2.Provider, { value: kt, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    El,
    {
      "data-mantine-color-scheme": d,
      className: I$1("bn-mantine", n || ""),
      theme: typeof t == "object" ? void 0 : t,
      ...o,
      ref: l
    }
  ) });
  return c ? f : /* @__PURE__ */ jsxRuntimeExports.jsx(
    MantineProvider,
    {
      withCssVariables: false,
      getRootElement: () => {
      },
      children: f
    }
  );
};

export { A$1 as A, Co as C, D$1 as D, Ft as F, He$1 as H, I$1 as I, Kt as K, M$1 as M, On$1 as O, Pe as P, R, S, T$1 as T, V$1 as V, __vitePreload as _, _$1 as a, bt$1 as b, ao as c, dt$2 as d, vo as e, fn as f, gt$1 as g, k as h, ko as i, Cr as j, kt$1 as k, vr as l, m, wi as n, Ae$2 as o, go as p, bn$1 as q, ro as r, Ie$2 as s, to as t, ut$1 as u, ve as v, wt$2 as w, v as x, yo as y };
