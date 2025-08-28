// Import ReactDOM từ react-dom/client để render React app trong DOM
import ReactDOM from "react-dom/client";
// Import App component chính
import App from "./App";
// Import BrowserRouter từ react-router-dom để enable routing
import { BrowserRouter, HashRouter } from "react-router-dom";

// Tạo root React từ element có id="root" trong HTML và render ứng dụng
ReactDOM.createRoot(document.getElementById("root")).render(
  // BrowserRouter bao bọc App để enable client-side routing
  <HashRouter basename="/yenhi6886">
    {/* App component chính chứa toàn bộ ứng dụng */}
    <App />
  </HashRouter>
);
