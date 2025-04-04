 <h1 align="center">Hi 👋, I'm Mob</h1>
<h3 align="center">Join the Cryptocurrency Market, make money from Airdrop - Retroactive with me</h3>

- <p align="left"> <img src="https://komarev.com/ghpvc/?username=mobonchain&label=Profile%20views&color=0e75b6&style=flat" alt="mobonchain" /> <a href="https://github.com/mobonchain"> <img src="https://img.shields.io/github/followers/mobonchain?label=Follow&style=social" alt="Follow" /> </a> </p>

- [![TopAME | Bullish - Cheerful](https://img.shields.io/badge/TopAME%20|%20Bullish-Cheerful-blue?logo=telegram&style=flat)](https://t.me/xTopAME)

# Hướng Dẫn Cài Đặt Auto Tap & Check-in Blink Planet
- **Chức năng:** Tự động **điểm danh** và **Tap** nhận Points $BX
---

## Yêu cầu

- **Proxy** và **Token**
- **Đăng ký : [Blink Planet](https://t.me/xTopAME/2321)**
  - Ấn **F12**, chọn tab **Console** và nhập `localStorage.getItem('token');`
- **Cài Node.js nếu chưa có ( Windows ): https://t.me/ToolboxforAirdrop/4**

---

## Cấu Trúc File Dữ Liệu

1. **proxy.txt**:
   - Mỗi dòng chứa một proxy theo định dạng:
     ```
     https://username1:pass@host:port
     https://username2:pass@host:port
     ```

2. **data.txt**:
   - Mỗi dòng chứa một token theo định dạng
     ```
     eyJhbGciOiJIU.....
     eyJhbGciOiJIU.....
     ```

---

## Cài Đặt Trên Windows

### Bước 1: Tải và Giải Nén File

1. Nhấn vào nút **<> Code"** màu xanh lá cây, sau đó chọn **Download ZIP**.
2. Giải nén file ZIP vào thư mục mà bạn muốn lưu trữ.

### Bước 2: Cấu Hình Proxy, Wallet

1. Mở file `proxy.txt` và nhâp vào danh sách `Proxy` theo cấu trúc dữ liệu phía trên
2. Mở file `data.txt` và nhập vào `Token` theo cấu trúc dữ liệu phía trên

### Bước 3: Cài Đặt Module

1. Mở **Command Prompt (CMD)** hoặc **PowerShell** trong thư mục chứa mã nguồn.
2. Cài đặt các module yêu cầu bằng lệnh:
   ```bash
   npm install
   ```

### Bước 4: Chạy Tool

1. Tự động **Check-in** và **Tap**
   ```bash
   node main.js
   ```

---

## Nếu gặp phải bất kỳ vấn đề nào có thể hỏi thêm tại **[TopAME | Chat - Supports](https://t.me/yTopAME)**
