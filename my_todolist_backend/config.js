export const dbConfig = {
    user: 'Thang',        // Tên đăng nhập SQL Server
    password: 'Thang2004@',// Mật khẩu
    server: 'localhost', // Tên server SQL Server
    database: 'TodoListDB',      // Tên database bạn vừa tạo
    options: {
        instanceName: 'SQLEXPRESS01',
        encrypt: false,            // Đổi thành true nếu sử dụng Azure
        trustServerCertificate: true // Cho development trên local
    }
};
export const jwtSecret = 'your_jwt_secret_key';