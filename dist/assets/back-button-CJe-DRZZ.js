import { r as reactExports, j as jsxRuntimeExports, aR as ArrowLeft } from './vendor-react-BeQHm2Hb.js';
import { T as Tooltip, c as TooltipTrigger, d as TooltipContent, B as Button } from './index-C9tyh6tO.js';
import { u as useNavigate, a as useLocation } from './vendor-react-router-D-UwvF_4.js';

function BackButton({
  fallbackPath = "/",
  label,
  variant = "ghost",
  size = "icon",
  tooltip,
  className,
  onClick
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationHistoryRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    const currentPath = location.pathname;
    const savedHistory = sessionStorage.getItem("tooessay_nav_history");
    if (savedHistory) {
      try {
        navigationHistoryRef.current = JSON.parse(savedHistory);
      } catch {
        navigationHistoryRef.current = [];
      }
    }
    const lastPath = navigationHistoryRef.current[navigationHistoryRef.current.length - 1];
    if (currentPath !== lastPath) {
      navigationHistoryRef.current.push(currentPath);
      if (navigationHistoryRef.current.length > 10) {
        navigationHistoryRef.current = navigationHistoryRef.current.slice(-10);
      }
      sessionStorage.setItem("tooessay_nav_history", JSON.stringify(navigationHistoryRef.current));
    }
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && e.altKey && !onClick) {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [location.pathname]);
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const currentPath = location.pathname;
    if (currentPath.includes("/draft") || currentPath.includes("/simple-draft")) {
      const assignmentId = currentPath.split("/")[3];
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}/outline`);
        return;
      }
    }
    if (currentPath.includes("/outline")) {
      const assignmentId = currentPath.split("/")[3];
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}/plan`);
        return;
      }
    }
    if (currentPath.includes("/plan")) {
      const assignmentId = currentPath.split("/")[3];
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}?edit=true`);
        return;
      }
    }
    if (currentPath.startsWith("/work/assignment/") && !currentPath.includes("/plan") && !currentPath.includes("/outline") && !currentPath.includes("/draft")) {
      navigate("/work");
      return;
    }
    if (currentPath.startsWith("/work/notes/edit")) {
      navigate("/work/notes");
      return;
    }
    if (currentPath.startsWith("/work/study")) {
      navigate("/work/flashcards");
      return;
    }
    if (currentPath.startsWith("/work/notes") || currentPath.startsWith("/work/books") || currentPath.startsWith("/work/study") || currentPath.startsWith("/work/flashcards") || currentPath.startsWith("/work/assignments") || currentPath.startsWith("/work/past-papers") || currentPath.startsWith("/work/trash") || currentPath.startsWith("/work/settings") || currentPath.startsWith("/work/improvements") || currentPath.startsWith("/work/molecule") || currentPath.startsWith("/work/drawings")) {
      navigate("/work");
      return;
    }
    if (currentPath.startsWith("/homepage/")) {
      const pathParts = currentPath.split("/").filter(Boolean);
      if (pathParts.length > 2) {
        const parentPath = "/" + pathParts.slice(0, -1).join("/");
        navigate(parentPath);
        return;
      }
      if (pathParts.length === 2) {
        navigate("/");
        return;
      }
    }
    const history = navigationHistoryRef.current;
    if (history.length >= 2) {
      history.pop();
      const previousPath = history[history.length - 1];
      if (previousPath && previousPath !== location.pathname) {
        navigate(previousPath);
        return;
      }
    }
    navigate(fallbackPath);
  };
  const button = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant,
      size,
      onClick: handleClick,
      className,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: label ? "h-4 w-4 mr-2" : "h-4 w-4" }),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
      ]
    }
  );
  if (tooltip) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tooltip }) })
    ] });
  }
  return button;
}

export { BackButton as B };
