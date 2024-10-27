// 添加暫停功能
let gamePaused = false;
document.addEventListener('keydown', function(e) {
  if (e.key === 'p' || e.key === 'P') {
    gamePaused = !gamePaused;
    if (gamePaused) {
      backgroundMusic.pause();
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "30px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText("遊戲暫停", canvas.width / 2, canvas.height / 2);
      ctx.font = "20px Arial";
      ctx.fillText("按 P 繼續", canvas.width / 2, canvas.height / 2 + 40);
    } else {
      backgroundMusic.play();
      draw();
    }
  }
});