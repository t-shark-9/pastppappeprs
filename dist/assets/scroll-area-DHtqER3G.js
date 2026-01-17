import { r as reactExports, j as jsxRuntimeExports, cI as Root, cJ as Viewport, cK as Corner, cL as ScrollAreaScrollbar, cM as ScrollAreaThumb } from './vendor-react-BeQHm2Hb.js';
import { i as cn } from './index-C9tyh6tO.js';

const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { ref, className: cn("relative overflow-hidden", className), ...props, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Viewport, { className: "h-full w-full rounded-[inherit]", children }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
] }));
ScrollArea.displayName = Root.displayName;
const ScrollBar = reactExports.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export { ScrollArea as S };
