let canjump = [true,true];

function handleJump(playerIndex) {
    // 檢查冷卻時間
    if (jumpCooldown[playerIndex] <= 0 && canjump[playerIndex]) {
        canjump[playerIndex] = false;
        setTimeout(() => {
            canjump[playerIndex] = true;
        }, 1000);
        isJumping[playerIndex] = true; // 開始跳躍
        jumpCooldown[playerIndex] = jumpCooldownTime; // 設定冷卻時間
    }else{
        isJumping[playerIndex] = false; // 開始跳躍
    }
}


function keyDownHandler(e) {
    // 玩家1：A/D控制
    if (e.key === "d" || e.key === "D") {
        rightPressed[0] = true;
    } else if (e.key === "a" || e.key === "A") {
        leftPressed[0] = true;
    }
    // 玩家2：左右方向鍵控制
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed[1] = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed[1] = true;
    }

    // 檢查跳躍
    if (e.key === "W" || e.key === "w") { // 空格或上方向鍵
        handleJump(0); // 玩家 1 跳躍
    } else if (e.key === "ArrowUp") { // 上方向鍵（可根據需要調整）
        handleJump(1); // 玩家 2 跳躍
    }
}

function keyUpHandler(e) {
    // 玩家1
    if (e.key === "d" || e.key === "D") {
        rightPressed[0] = false;
    } else if (e.key === "a" || e.key === "A") {
        leftPressed[0] = false;
    }
    // 玩家2
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed[1] = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed[1] = false;
    }
}

