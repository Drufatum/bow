const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

const users = {
  alice: { password: "1234", saveData: { x: 100, y: 100 } },
  bob: { password: "abcd", saveData: { x: 300, y: 300 } }
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    res.json({ success: true, saveData: user.saveData });
  } else {
    res.json({ success: false });
  }
});

server.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 運行`);
});