# Multiplayer Ball - 開發環境

本專案包含兩個分支建議：
- `main`: 正式版本（部署到 Render）
- `dev`: 開發用分支（本機測試）

## 🔧 本機啟動方法

```bash
cd server
npm install
node server.js
```

打開瀏覽器：`http://localhost:3000`

## 📂 結構說明

```
server/
├── client/         # 前端 HTML/CSS/JS
├── server.js       # 伺服器主程式
└── package.json    # 套件與啟動資訊
```