import { r as reactExports, j as jsxRuntimeExports, dB as Root, dC as Indicator } from './vendor-react-BeQHm2Hb.js';
import { i as cn } from './index-C9tyh6tO.js';

const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;

export { Progress as P };
