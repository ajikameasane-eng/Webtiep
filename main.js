
import { db } from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

document.getElementById("uploadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  push(ref(db, "stories"), {
    title,
    content,
    date: new Date().toISOString()
  });

  alert("Đăng truyện thành công!");
  e.target.reset();
});
