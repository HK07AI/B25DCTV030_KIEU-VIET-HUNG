// Khởi tạo các phần tử DOM
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// Biến lưu trữ biểu thức thô dùng cho tính toán
let expression = "";

/**
 * Định dạng biểu thức để hiển thị:
 * - Thêm dấu '.' cho hàng nghìn vào phần nguyên
 * - Giữ nguyên các phép toán (+, -, *, /)
 */
function formatExpression(expr) {
    if (!expr) return "0";
    
    // Tìm các chuỗi số nguyên/thập phân để định dạng riêng
    return expr.replace(/\d+(\.\d+)?/g, (numStr) => {
        const parts = numStr.split(".");
        // Thêm dấu chấm ngăn cách hàng nghìn
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.length > 1 ? parts.join(",") : parts[0];
    });
}

/**
 * Cập nhật nội dung màn hình hiển thị
 */
function updateDisplay() {
    display.innerText = formatExpression(expression);
}

// Gán lắng nghe sự kiện click trên từng nút bấm
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");

        // 1. Xóa toàn bộ (AC)
        if (action === "clear") {
            expression = "";
            updateDisplay();
            return;
        }

        // 2. Xóa từng ký tự (DEL)
        if (action === "delete") {
            expression = expression.slice(0, -1);
            updateDisplay();
            return;
        }

        // 3. Tính toán kết quả (=)
        if (action === "calculate") {
            if (!expression) return;

            // Kiểm tra: Không để toán tử nằm ở cuối biểu thức
            const lastChar = expression.slice(-1);
            if (["+", "-", "*", "/"].includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            try {
                // Tính toán an toàn không dùng eval()
                const result = Function(`'use strict'; return (${expression})`)();

                if (Number.isFinite(result)) {
                    // Làm tròn tối đa 8 chữ số thập phân để tránh lỗi dấu phẩy động
                    expression = (Math.round(result * 1e8) / 1e8).toString();
                } else {
                    expression = "Error";
                }
            } catch (err) {
                expression = "Error";
            }

            updateDisplay();
            if (expression === "Error") expression = "";
            return;
        }

        // 4. Nhập số và toán tử
        if (value !== null) {
            const operators = ["+", "-", "*", "/"];
            const lastChar = expression.slice(-1);

            // Nếu người dùng nhập toán tử ngay sau một toán tử khác -> thay thế toán tử cũ
            if (operators.includes(value) && operators.includes(lastChar)) {
                expression = expression.slice(0, -1) + value;
                updateDisplay();
                return;
            }

            // Tránh nhập toán tử đầu tiên khi biểu thức đang rỗng (ngoại trừ số âm)
            if (expression === "" && ["+", "*", "/"].includes(value)) {
                return;
            }

            expression += value;
            updateDisplay();
        }
    });
});