  // 重置球的位置
  function resetPlayerBall(playerIndex) {
    const player = players[playerIndex];
    player.x = playerIndex === 0 ? canvas.width / 4 : (canvas.width * 3) / 4;
    player.y = canvas.height - 30;
    player.dx = playerIndex === 0 ? ballSpeed : -ballSpeed;
    player.dy = -ballSpeed;
    player.paddleX = playerIndex === 0 ? 
      (canvas.width / 4 - player.paddleWidth / 2) : 
      (canvas.width * 3 / 4 - player.paddleWidth / 2);
  }