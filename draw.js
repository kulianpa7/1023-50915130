//---------------
// 修改球的繪製函數，加入軌跡
//---------------
function drawBall(playerIndex) {
    const player = players[playerIndex];
    // 先繪製軌跡
    drawTrail(playerIndex);
    // 再繪製球
    ctx.beginPath();
    ctx.arc(player.x, player.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = playerIndex === 0 ? "#0095DD" : "#DD9500";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(playerIndex) {
    const player = players[playerIndex];

    // 檢查是否在跳躍
    if (isJumping[playerIndex]) {
        player.paddleY -= jumpHeight; // 向上移動
    } else if (player.paddleY <= 0) {
        player.paddleY += jumpHeight; // 向下移動
    }


    ctx.beginPath();
    ctx.rect(player.paddleX, canvas.height - paddleHeight - 10 + player.paddleY,
        player.paddleWidth, paddleHeight);
    ctx.fillStyle = playerIndex === 0 ? "#0095DD" : "#DD9500";
    ctx.fill();
    ctx.closePath();
}

// Draw Paddle Function for Reference
function drawPaddle(playerIndex) {
    const player = players[playerIndex];

    // Update paddle Y-position based on jumping state
    if (isJumping[playerIndex]) {
        player.paddleY -= jumpHeight;
    } else if (player.paddleY <= 0) {
        player.paddleY += jumpHeight;
    }

    ctx.beginPath();
    ctx.rect(player.paddleX, canvas.height - paddleHeight - 10 + player.paddleY,
        player.paddleWidth, paddleHeight);
    ctx.fillStyle = playerIndex === 0 ? "#0095DD" : "#DD9500";
    ctx.fill();
    ctx.closePath();
}

// 白色主題的顏色
const whiteThemeColors = [
    "#FFFFFF", // 白色
    "#D3D3D3", // 淺灰色
    "#A9A9A9"  // 深灰色
];

// 綠色主題的顏色
const greenThemeColors = [
    "#00FF00", // 純綠
    "#32CD32", // 萊姆綠
    "#98FB98"  // 淺綠
];

// 藍色主題的顏色
const blueThemeColors = [
    "#0000FF", // 純藍
    "#1E90FF", // 道奇藍
    "#ADD8E6"  // 淺藍
];
const bricksTheme = {
    "background1.webp": whiteThemeColors,
    "background2.webp": greenThemeColors,
    "background3.webp": blueThemeColors,
}
function drawBricks(playerIndex) {
    const offset = playerIndex === 0 ? 0 : canvas.width / 2;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[playerIndex][c][r].strength > 0) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft + offset;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[playerIndex][c][r].x = brickX;
                bricks[playerIndex][c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // 根據磚塊強度設置顏色
                if (bricks[playerIndex][c][r].strength === 1) {
                    ctx.fillStyle = playerIndex === 0 ? bricksTheme[BGS][0] : bricksTheme[BGS][0];
                } else if (bricks[playerIndex][c][r].strength === 2) {
                    ctx.fillStyle = playerIndex === 0 ? bricksTheme[BGS][1] : bricksTheme[BGS][1];
                } else if (bricks[playerIndex][c][r].strength === 3) {
                    ctx.fillStyle = playerIndex === 0 ? bricksTheme[BGS][2] : bricksTheme[BGS][2];
                }
                ctx.fill();
                ctx.closePath();
                // 顯示剩餘擊打次數
                ctx.fillStyle = "#000000";
                ctx.font = "16px Arial";
                ctx.fillText(bricks[playerIndex][c][r].strength,
                    brickX + brickWidth / 2 - 5,
                    brickY + brickHeight / 2 + 5);
            }
        }
    }
}
// Initialize scores and references to elements
let pre_player1_score = 0,
    pre_player2_score = 0;
let highestScorePlayer1 = getHighestScoreFromCookie("highestScorePlayer1");
let highestScorePlayer2 = getHighestScoreFromCookie("highestScorePlayer2");

// Reference to HTML elements displaying the highest scores
let player1_record = $('.records .player1 .record .player1-record');
let player2_record = $('.records .player2 .record .player2-record');

// Initialize displayed highest scores
player1_record.text(highestScorePlayer1.toFixed(2));
player2_record.text(highestScorePlayer2.toFixed(2));

// Function to set the highest score in a specified cookie
function setHighestScoreInCookie(cookieName, score) {
    document.cookie = `${cookieName}=${score}; path=/; max-age=31536000`; // Expires in 1 year
}

// Function to read the highest score from a specified cookie
function getHighestScoreFromCookie(cookieName) {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return parseFloat(cookie.substring(name.length)) || 0;
        }
    }
    return 0; // Default highest score if no cookie found
}

// Function to draw current and highest scores
function drawScore() {
    // Check if Player 1's score has changed
    if (players[0].score !== pre_player1_score) {
        $(".player1-score").text(players[0].score.toFixed(2));
        pre_player1_score = players[0].score;
    }
    // Check if Player 2's score has changed
    if (players[1].score !== pre_player2_score) {
        $(".player2-score").text(players[1].score.toFixed(2));
        pre_player2_score = players[1].score;
    }

    // Check and update Player 1's highest score if needed
    if (players[0].score > highestScorePlayer1) {
        highestScorePlayer1 = players[0].score;
        setHighestScoreInCookie("highestScorePlayer1", highestScorePlayer1); // Update cookie
        player1_record.text(highestScorePlayer1.toFixed(2)); // Update display
    }

    // Check and update Player 2's highest score if needed
    if (players[1].score > highestScorePlayer2) {
        highestScorePlayer2 = players[1].score;
        setHighestScoreInCookie("highestScorePlayer2", highestScorePlayer2); // Update cookie
        player2_record.text(highestScorePlayer2.toFixed(2)); // Update display
    }
}

function drawLives() {
    $(".player1-health").text(players[0].lives);
    $(".player2-health").text(players[1].lives);
}

// 繪製分隔線
function drawDivider() {
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.setLineDash([]);
}
let finish = 0;
async function draw(effect) {
    if (finish) {
        finish = 0;
        return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDivider();
    drawScore();
    drawLives();

    // 更新每個玩家的跳躍冷卻時間
    for (let i = 0; i < 2; i++) {
        if (jumpCooldown[i] > 0) {
            jumpCooldown[i] -= 1000 / 60; // 每幀減少冷卻時間
        } else {
            isJumping[i] = false;
        }
    }
    //---------------
    // 更新幀計數器
    //---------------
    frameCount++;
    // 為每個玩家更新遊戲狀態
    for (let i = 0; i < 2; i++) {
        const player = players[i];
        const halfWidth = canvas.width / 2;
        const playerHalf = i === 0 ? 0 : halfWidth;

        //---------------
        // 加入軌跡更新
        //---------------
        updateTrail(i);

        drawBall(i);
        drawPaddle(i);
        drawBricks(i);
        collisionDetection(i);
        // 繪製道具
        for (let powerUp of powerUps) {
            if (powerUp.isActive) {
                powerUp.draw(ctx);
                powerUp.update(); // 更新道具位置
                // 碰撞檢測：檢查道具是否與玩家的擋板碰撞
                for (let i = 0; i < 2; i++) {
                    const player = players[i];
                    // 檢查道具的 X 和 Y 是否與擋板重疊
                    if (powerUp.x > player.paddleX &&
                        powerUp.x < player.paddleX + player.paddleWidth &&
                        powerUp.y + powerUp.size > canvas.height - paddleHeight - 10 &&
                        powerUp.y < canvas.height - paddleHeight - 10) {
                        // 隨機生成道具（20% 增加 paddleWidth，30% 增加生命，30% 減速，20% 加速）
                        let randomEffect = Math.random() * 100; // 生成 0 - 100 的隨機數
                        let effect; // 用於儲存效果類型
                        switch (true) {
                            case (randomEffect < 20):
                                effect = 'paddleWidth';
                                break; // 20% 機率增加 paddleWidth
                            case (randomEffect < 50):
                                effect = 'lives';
                                break; // 30% 機率增加生命
                            case (randomEffect < 80):
                                effect = 'decreaseSpeed';
                                break; // 30% 機率減速
                            default:
                                effect = 'increaseSpeed';
                                break; // 20% 機率加速
                        }
                        // 根據效果類型執行相應的行動
                        switch (effect) {
                            case 'paddleWidth':
                                player.paddleWidth = 200; // 增加到 200 像素
                                // 在 5 秒後重置 paddleWidth
                                setTimeout(() => {
                                    player.paddleWidth = 100; // 重置為 100 像素
                                }, 5000);
                                break;

                            case 'lives':
                                player.lives += 1; // 生命增加
                                break;

                            case 'decreaseSpeed':
                                const originalDxDecrease = player.dx; // 保存原始 dx
                                const originalDyDecrease = player.dy; // 保存原始 dy
                                player.dx *= 0.8; // 減少 20%
                                player.dy *= 0.8; // 減少 20%

                                // 在 10 秒後重置球速
                                timeout1 = setTimeout(() => {
                                    player.dx = originalDxDecrease; // 還原原始 dx
                                    player.dy = originalDyDecrease; // 還原原始 dy
                                }, 10000);
                                break;

                            case 'increaseSpeed':
                                const originalDxIncrease = player.dx; // 保存原始 dx
                                const originalDyIncrease = player.dy; // 保存原始 dy
                                player.dx *= 1.2; // 增加 20%
                                player.dy *= 1.2; // 增加 20%

                                // 在 10 秒後重置球速
                                timeout2 = setTimeout(() => {
                                    player.dx = originalDxIncrease; // 還原原始 dx
                                    player.dy = originalDyIncrease; // 還原原始 dy
                                }, 10000);
                                break;
                        }
                        upgrade.pause();
                        upgrade.currentTime = 0;
                        upgrade.play();
                        powerUp.isActive = false; // 標記道具為不活躍
                    }
                }
            }
        }

        // 移除不活躍的道具
        powerUps = powerUps.filter(powerUp => powerUp.isActive && powerUp.y < canvas.height);


        // 水平邊界碰撞
        if (i === 0) {
            if (player.x + player.dx < ballRadius ||
                player.x + player.dx > halfWidth - ballRadius) {
                player.dx = -player.dx;
            }
        } else {
            if (player.x + player.dx < halfWidth + ballRadius ||
                player.x + player.dx > canvas.width - ballRadius) {
                player.dx = -player.dx;
            }
        }

        // 垂直邊界碰撞
        if (player.y + player.dy < ballRadius) {
            player.dy = -player.dy;
        } else if (player.y + player.dy > canvas.height - ballRadius - paddleHeight - 10) {
            if (player.x > player.paddleX && player.x < player.paddleX + player.paddleWidth) {
                player.dy = -player.dy;
                player.comboCount = 0;
                // 根據擊球位置調整反彈角度
                let hitPoint = (player.x - player.paddleX) / player.paddleWidth;
                player.dx = ballSpeed * (hitPoint - 0.5) * 2;
            } else {
                player.lives--;
                player.comboCount = 0;
                //---------------
                // 失去生命時清空軌跡
                //---------------
                player.trailPositions = [];
                lifeLostSound.play();
                if (!player.lives) {
                    gameOverSound.play();
                    // 檢查是否兩個玩家都結束了
                    if (players[(i + 1) % 2].lives === 0) {
                        let winner = players[0].score > players[1].score ? "玩家1" :
                            players[1].score > players[0].score ? "玩家2" : "平局";
                        // 顯示遊戲結束
                        await showGameOverAlert(winner, players[0].score, players[1].score);
                    } else {
                        // 顯示單人遊戲結束
                        await showSinglePlayerGameOver(i,Math.max(players[0].score,players[1].score));
                    }
                } else {
                    resetPlayerBall(i);
                }
            }
        }
        // 更新球的位置
        player.x += player.dx;
        player.y += player.dy;

        // 更新擋板位置
        if (rightPressed[i] && player.paddleX < (i === 0 ? halfWidth - player.paddleWidth : canvas.width - player.paddleWidth)) {
            player.paddleX += 7;
        } else if (leftPressed[i] && player.paddleX > (i === 0 ? 0 : halfWidth)) {
            player.paddleX -= 7;
        }
    }

    // 檢查勝利條件
    await checkWinCondition();

    if (!gamePaused) {
        requestAnimationFrame(draw);
    }
}
// 檢查勝利條件
async function checkWinCondition() {
    for (let i = 0; i < 2; i++) {
        if (allBricksCleared(i)) {
            backgroundMusic.pause();
            winSound.play();
            finish = 1;
            await showWinAlert(i);
        }
    }
}
//---------------
// 新增軌跡繪製函數
//---------------
function drawTrail(playerIndex) {
    const player = players[playerIndex];

    if (difficulty === 'easy') {
        player.trailPositions.forEach((pos, index) => {
            const opacity = (index + 1) / player.trailPositions.length;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, ballRadius * (opacity * 0.8), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${playerIndex === 0 ? '0, 149, 221' : '221, 149, 0'}, ${opacity * 0.5})`;
            ctx.fill();
            ctx.closePath();
        });
    }
}
//---------------
// 新增軌跡更新函數
//---------------
function updateTrail(playerIndex) {
    const player = players[playerIndex];

    if (difficulty === 'easy' && frameCount % TRAIL_INTERVAL === 0) {
        player.trailPositions.push({
            x: player.x,
            y: player.y
        });
        if (player.trailPositions.length > TRAIL_LENGTH) {
            player.trailPositions.shift();
        }
    }
}