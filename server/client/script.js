const socket = io("https://github.com/Drufatum/bow/commit/d29307fede3dd551be2244ebc1751e86b860b701");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 30;
let vx = 0;
let vy = 0;

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const dx = e.clientX - rect.left - x;
  const dy = e.clientY - rect.top - y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  vx = dx / dist * 5;
  vy = dy / dist * 5;
});

socket.on("move", (data) => {
  // Receive other player's ball position
  otherBall = data;
});

let otherBall = { x: 400, y: 300 };

function update() {
  x += vx;
  y += vy;

  // Simple bounce
  if (x < radius || x > canvas.width - radius) vx = -vx;
  if (y < radius || y > canvas.height - radius) vy = -vy;

  // Send current position
  socket.emit("move", { x, y });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw your ball
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();

  // Draw other ball
  ctx.beginPath();
  ctx.arc(otherBall.x, otherBall.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
