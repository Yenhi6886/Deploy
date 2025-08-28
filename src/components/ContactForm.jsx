// Import hook useState từ React để quản lý state trong component
import { useState } from "react";

// Component ContactForm nhận 2 props: initialData (dữ liệu ban đầu) và onSubmit (hàm xử lý khi submit)
export default function ContactForm({ initialData, onSubmit }) {
  // State form để lưu trữ dữ liệu form, khởi tạo với initialData hoặc object rỗng
  const [form, setForm] = useState(
    initialData || { image: "", name: "", email: "", phone: "" }
  );
  // State preview để lưu URL hình ảnh để hiển thị preview
  const [preview, setPreview] = useState(initialData?.image || "");

  // Hàm xử lý khi thay đổi giá trị input text (name, email, phone)
  const handleChange = (e) => {
    // Destructuring để lấy name và value từ element được thay đổi
    const { name, value } = e.target;
    // Cập nhật state form, spread operator để giữ các field khác, chỉ update field đang thay đổi
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Hàm xử lý khi chọn file hình ảnh
  const handleImage = (e) => {
    // Lấy file đầu tiên từ danh sách file được chọn
    const file = e.target.files[0];
    // Nếu không có file thì dừng xử lý
    if (!file) return;
    // Tạo URL tạm thời cho file để hiển thị preview
    const url = URL.createObjectURL(file);
    // Set URL này vào state preview để hiển thị hình ảnh
    setPreview(url);
    // Cập nhật field image trong form state với URL này (mock lưu URL local)
    setForm((f) => ({ ...f, image: url })); // mock lưu URL local
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    // Ngăn chặn hành vi mặc định của form (reload trang)
    e.preventDefault();
    // Gọi hàm onSubmit được truyền từ parent component với dữ liệu form
    onSubmit(form);
  };

  return (
    // Form với styling inline: flex column, gap 8px, max width 400px
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
      <div>
        {/* Hiển thị preview hình ảnh nếu có */}
        {preview && <img src={preview} alt="" width="100" />}
        {/* Input file chỉ chấp nhận file hình ảnh */}
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>
      {/* Input cho tên, bind với form.name và gọi handleChange khi thay đổi */}
      <input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      {/* Input cho email, bind với form.email và gọi handleChange khi thay đổi */}
      <input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      {/* Input cho phone, bind với form.phone và gọi handleChange khi thay đổi */}
      <input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
      {/* Button submit form */}
      <button type="submit">Save</button>
    </form>
  );
}
