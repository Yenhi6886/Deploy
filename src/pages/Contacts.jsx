// Import hooks useEffect và useState từ React để quản lý side effects và state
import { useEffect, useState } from "react";
// Import Link từ react-router-dom để tạo liên kết không reload trang
import { Link } from "react-router-dom";
// Import api object để thực hiện các HTTP requests
import { api } from "../api";

// Component Contacts để hiển thị danh sách contacts
export default function Contacts() {
  // State contacts để lưu danh sách contacts, khởi tạo là array rỗng
  const [contacts, setContacts] = useState([]);
  // State loading để hiển thị trạng thái đang tải dữ liệu
  const [loading, setLoading] = useState(true);

  // useEffect chạy một lần khi component mount để tải dữ liệu
  useEffect(() => {
    // Tạo async function bên trong useEffect (vì useEffect không thể là async)
    (async () => {
      try {
        // Gọi API GET để lấy danh sách contacts
        const res = await api.get("/contacts");
        // Cập nhật state contacts với dữ liệu nhận được
        setContacts(res.data);
      } catch {
        // Nếu có lỗi, hiển thị thông báo lỗi
        alert("Lỗi tải danh bạ");
      } finally {
        // Dù thành công hay thất bại, đều set loading = false
        setLoading(false);
      }
    })(); // Gọi immediately invoked function expression (IIFE)
  }, []); // Dependency array rỗng nghĩa là chỉ chạy 1 lần khi mount

  // Hàm xử lý xóa contact
  const handleDelete = async (id) => {
    // Hiển thị dialog xác nhận, nếu user không đồng ý thì dừng
    if (!confirm("Xóa contact này?")) return;
    try {
      // Gọi API DELETE để xóa contact theo id
      const res = await api.delete(`/contacts/${id}`);
      // Hiển thị thông báo xóa thành công
      alert(`Xóa thành công (status ${res.status})`);
      // Cập nhật state contacts, loại bỏ contact vừa xóa khỏi danh sách
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // Nếu có lỗi, hiển thị thông báo lỗi
      alert("Xóa lỗi");
    }
  };

  return (
    // Main container với styling: max width 800px, center align
    <main style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Tiêu đề trang */}
      <h1>Contacts</h1>
      {/* Link đến trang thêm contact */}
      <Link to="/add">
        <button>Add Contact</button>
      </Link>

      {/* Conditional rendering: hiển thị loading hoặc table */}
      {loading ? (
        // Nếu đang loading, hiển thị text "Đang tải..."
        <p>Đang tải...</p>
      ) : (
        // Nếu không loading, hiển thị table với danh sách contacts
        <table width="100%" border="1" cellPadding="8" style={{ marginTop: 16 }}>
          {/* Header của table */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Body của table */}
          <tbody>
            {/* Map qua danh sách contacts để tạo các row */}
            {contacts.map((c) => (
              // Mỗi row với key là id của contact
              <tr key={c.id}>
                <td>
                  {/* Hiển thị hình ảnh nếu có, nếu không thì hiển thị "No Image" */}
                  {c.image ? <img src={c.image} alt="" width="60" /> : "No Image"}
                </td>
                {/* Hiển thị tên contact */}
                <td>{c.name}</td>
                {/* Hiển thị email contact */}
                <td>{c.email}</td>
                {/* Hiển thị phone contact */}
                <td>{c.phone}</td>
                <td>
                  {/* Link đến trang edit contact với id */}
                  <Link to={`/edit/${c.id}`}><button>Edit</button></Link>{" "}
                  {/* Button xóa contact, gọi handleDelete với id */}
                  <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
