// Import hook useNavigate từ react-router-dom để điều hướng trang
import { useNavigate } from "react-router-dom";
// Import api object để thực hiện các HTTP requests
import { api } from "../api";
// Import component ContactForm để tái sử dụng
import ContactForm from "../components/ContactForm";

// Component AddContact để thêm contact mới
export default function AddContact() {
  // Hook useNavigate để có thể điều hướng sau khi thêm thành công
  const navigate = useNavigate();

  // Hàm xử lý khi thêm contact mới (async function để xử lý API call)
  const handleAdd = async (data) => {
    try {
      // Gọi API POST để tạo contact mới với dữ liệu từ form
      const res = await api.post("/contacts", data);
      // Hiển thị thông báo thành công với status code
      alert(`Tạo contact OK (status ${res.status})`);
      // Điều hướng về trang chủ (danh sách contacts)
      navigate("/");
    } catch {
      // Nếu có lỗi, hiển thị thông báo lỗi
      alert("Tạo lỗi");
    }
  };

  return (
    // Main container của trang
    <main>
      {/* Tiêu đề trang */}
      <h2>Add Contact</h2>
      {/* Sử dụng ContactForm component, truyền handleAdd làm onSubmit prop */}
      <ContactForm onSubmit={handleAdd} />
    </main>
  );
}
