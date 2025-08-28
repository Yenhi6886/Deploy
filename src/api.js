import axios from "axios";

// Dùng mock API json-server hoặc link có sẵn
// ví dụ chạy json-server: json-server --watch db.json --port 3001
// hoặc thay baseURL = "https://my-json-server.typicode.com/codegym-vn/mock-api-contacts"
export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});
