// Import hooks useEffect và useState từ React để quản lý side effects và state
import { useEffect, useState } from "react";
// Import hooks useNavigate và useParams từ react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// Import api object để thực hiện các HTTP requests
import { api } from "../api";
// Import component ContactForm để tái sử dụng
import ContactForm from "../components/ContactForm";

// Component EditContact để chỉnh sửa contact
export default function EditContact() {
  // useParams để lấy id từ URL params
  const { id } = useParams();
  // useNavigate để điều hướng sau khi cập nhật thành công
  const navigate = useNavigate();
  // State contact để lưu thông tin contact cần edit, khởi tạo là null
  const [contact, setContact] = useState(null);

  // useEffect chạy khi component mount hoặc khi id thay đổi
  useEffect(() => {
    // Tạo async function bên trong useEffect
    (async () => {
      try {
        // Gọi API GET để lấy thông tin contact theo id
        const res = await api.get(`/contacts/${id}`);
        // Cập nhật state contact với dữ liệu nhận được
        setContact(res.data);
      } catch{
        // Nếu có lỗi, hiển thị thông báo lỗi
        alert("Lỗi tải contact");
      }
    })(); // Gọi immediately invoked function expression (IIFE)
  }, [id]); // Dependency array có id, sẽ chạy lại khi id thay đổi

  // Hàm xử lý cập nhật contact
  const handleSave = async (data) => {
    try {
      // Gọi API PUT để cập nhật contact với id và dữ liệu mới
      const res = await api.put(`/contacts/${id}`, data);
      // Hiển thị thông báo cập nhật thành công
      alert(`Cập nhật OK (status ${res.status})`);
      // Điều hướng về trang chủ
      navigate("/");
    } catch {
      // Nếu có lỗi, hiển thị thông báo lỗi
      alert("Update lỗi");
    }
  };

  // Nếu chưa có dữ liệu contact (đang loading), hiển thị loading
  if (!contact) return <p>Đang tải...</p>;

  return (
    // Main container của trang
    <main>
      {/* Tiêu đề trang */}
      <h2>Edit Contact</h2>
      {/* Sử dụng ContactForm component với dữ liệu khởi tạo và hàm onSubmit */}
      <ContactForm initialData={contact} onSubmit={handleSave} />
    </main>
  );
}
