import { createRoot } from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config"; // Initialize i18n

// Register Syncfusion license
registerLicense("Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf0x0Rnxbf1x2ZF1MYVxbR3NPMyBoS35Rc0RhWn9fcXVUQmZYU01yVEFf");

createRoot(document.getElementById("root")!).render(<App />);
