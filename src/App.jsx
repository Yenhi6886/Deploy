// Import Routes và Route từ react-router-dom để cấu hình routing
import { Routes, Route } from "react-router-dom";
// Import các page components
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact.jsx";

// App component chính - nơi cấu hình routing cho toàn bộ ứng dụng
function App() {
  return (
    // Routes container chứa tất cả các route định nghĩa
    <Routes>
      {/* Route cho trang chủ - hiển thị danh sách contacts */}
      <Route path="/" element={<Contacts />} />
      {/* Route cho trang thêm contact mới */}
      <Route path="/add" element={<AddContact />} />
      {/* Route cho trang chỉnh sửa contact, :id là dynamic parameter */}
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}

// Export default App component để sử dụng ở main.jsx
export default App;
