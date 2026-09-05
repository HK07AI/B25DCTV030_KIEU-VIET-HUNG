// ======================================
// BÀI THỰC HÀNH 1
// Trang giới thiệu tương tác
// ======================================


// --------------------------------------
// 1. ĐỔI MÀU NỀN
// Sử dụng addEventListener
// --------------------------------------

const changeColorBtn = document.getElementById("changeColorBtn");

changeColorBtn.addEventListener("click", function () {

    // Tạo ngẫu nhiên một màu nền
    const colors = [
        "#f4f7fb",
        "#fff4e6",
        "#eef7ff",
        "#f2fce9",
        "#f8f0ff"
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    document.body.style.backgroundColor = colors[randomIndex];
});


// --------------------------------------
// 2. LỜI CHÀO THEO BUỔI
// Sử dụng đối tượng Date
// --------------------------------------

const greeting = document.getElementById("greeting");
const currentTime = document.getElementById("currentTime");

const now = new Date();

const hour = now.getHours();
const minute = now.getMinutes();

let message;

if (hour >= 5 && hour < 12) {
    message = "🌅 Chào buổi sáng, Kiều Việt Hưng!";
}
else if (hour >= 12 && hour < 18) {
    message = "☀️ Chào buổi chiều, Kiều Việt Hưng!";
}
else {
    message = "🌙 Chào buổi tối, Kiều Việt Hưng!";
}

// Thay đổi nội dung HTML bằng innerText
greeting.innerText = message;

currentTime.innerText =
    "Thời gian hiện tại: " + now.toLocaleString("vi-VN");


// --------------------------------------
// 3. THAO TÁC DOM
// document.getElementById()
// .innerText
// .style
// --------------------------------------

// Ví dụ:
// document.getElementById("greeting").innerText = "Xin chào!";
// document.getElementById("greeting").style.color = "red";
