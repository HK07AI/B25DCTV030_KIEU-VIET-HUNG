// ======================================
// BÀI THỰC HÀNH 1 - CẬP NHẬT
// Kiều Việt Hưng
// ======================================

// --------------------------------------
// 1. ĐỒNG HỒ THEO GIỜ HÀ NỘI CHẠY LIÊN TỤC & LỜI CHÀO
// --------------------------------------
const greeting = document.getElementById("greeting");
const currentTime = document.getElementById("currentTime");

function updateClockAndGreeting() {
    const now = new Date();

    // Lấy giờ hiện tại theo múi giờ Hà Nội (Asia/Bangkok)
    const hanoiHour = parseInt(
        now.toLocaleString("en-US", { timeZone: "Asia/Bangkok", hour: "numeric", hour12: false }),
        10
    );

    // Cập nhật lời chào linh hoạt theo giờ
    let message = "";
    if (hanoiHour >= 5 && hanoiHour < 12) {
        message = "🌅 Chào buổi sáng, Kiều Việt Hưng!";
    } else if (hanoiHour >= 12 && hanoiHour < 18) {
        message = "☀️ Chào buổi chiều, Kiều Việt Hưng!";
    } else {
        message = "🌙 Chào buổi tối, Kiều Việt Hưng!";
    }
    greeting.innerText = message;

    // Định dạng chuỗi ngày - giờ chi tiết theo chuẩn giờ Hà Nội
    const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Bangkok",
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    currentTime.innerText = "Giờ Hà Nội hiện tại: " + timeFormatter.format(now);
}

// Chạy ngay lập tức khi mở trang và lặp lại mỗi giây (1000ms)
updateClockAndGreeting();
setInterval(updateClockAndGreeting, 1000);


// --------------------------------------
// 2. CHUYỂN ĐỔI GIAO DIỆN SÁNG / TỐI (DARK / LIGHT MODE)
// --------------------------------------
const themeToggleBtn = document.getElementById("themeToggleBtn");

themeToggleBtn.addEventListener("click", function () {
    // Thêm hoặc gỡ class 'dark-theme' trên body
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    // Cập nhật nhãn và biểu tượng nút bấm
    if (isDark) {
        themeToggleBtn.innerText = "☀️ Chế độ sáng";
    } else {
        themeToggleBtn.innerText = "🌙 Chế độ tối";
    }
});