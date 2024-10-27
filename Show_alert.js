play_level = 1;
async function showWinAlert(i) {
    setHighestScoreInCookie("highestScorePlayer1", highestScorePlayer1); // Update cookie
    setHighestScoreInCookie("highestScorePlayer2", highestScorePlayer2); // Update cookie
    if(play_level==5){
        await Swal.fire({
            title: `遊戲結束`,
            icon: 'success',
            confirmButtonText: '確認',
            backdrop: false, // 禁用點擊背景關閉彈出框
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }
        });
    }else{
        await Swal.fire({
            title: `玩家 ${i + 1} 獲勝！`,
            text: `清除所有磚塊！\n得分：${parseFloat(players[i].score.toFixed(2))}`,
            icon: 'success',
            confirmButtonText: '確認',
            backdrop: false, // 禁用點擊背景關閉彈出框
        }).then((result) => {
            if (result.isConfirmed) {
                powerUps = [];
                backgroundMusic.play();
                clearTimeout(timeout1); // 清除計時器
                clearTimeout(timeout2); // 清除計時器
                startGame(difficulty, brickArray[play_level++],i)
            }
        });
    }
}
// 遊戲結束，顯示雙方分數
async function showGameOverAlert(winner, player1Score, player2Score) {
    setHighestScoreInCookie("highestScorePlayer1", highestScorePlayer1); // Update cookie
    setHighestScoreInCookie("highestScorePlayer2", highestScorePlayer2); // Update cookie
    const isDrawGame = winner === "平局";

    await Swal.fire({
        title: '遊戲結束！',
        html: `
        ${isDrawGame ? "雙方平手！" : winner + "獲勝！"}<br>
        玩家1得分：${parseFloat(player1Score.toFixed(2))}<br>
        玩家2得分：${parseFloat(player2Score.toFixed(2))}
      `,
        icon: isDrawGame ? 'info' : 'success',
        confirmButtonText: '確定',
        confirmButtonColor: '#3085d6',
        background: '#fff',
        customClass: {
            popup: 'game-popup'
        },
        backdrop: false, // 禁用點擊背景關閉彈出框
    });
}
// 單人遊戲結束
async function showSinglePlayerGameOver(playerIndex, score) {
    setHighestScoreInCookie("highestScorePlayer1", highestScorePlayer1); // Update cookie
    setHighestScoreInCookie("highestScorePlayer2", highestScorePlayer2); // Update cookie
    finish = 1;
    await Swal.fire({
        title: `玩家 ${playerIndex + 1} 生命已到達終點`,
        text: `兩人最高得分：${parseFloat(score.toFixed(2))}`,
        icon: 'info',
        confirmButtonText: '重新開始', // 重新開始遊戲
        cancelButtonText: '重載頁面', // 取消按鈕
        showCancelButton: true, // 顯示取消按鈕
        confirmButtonColor: '#3085d6',
        background: '#fff',
        customClass: {
            popup: 'game-popup'
        },
        backdrop: false, // 禁用點擊背景關閉彈出框
    }).then((result) => {
        // 確認按鈕的處理
        if (result.isConfirmed) {
            // 重新開始遊戲
            console.log("II@@")
            powerUps = [];
            clearTimeout(timeout1); // 清除計時器
            clearTimeout(timeout2); // 清除計時器
            startGame(difficulty, brickArray[play_level]);
        } 
        // 取消按鈕的處理
        else if (result.isDismissed) {
            // 重載頁面
            console.log("@@II")
            window.location.reload();
        }
    });
    
    
}
// 遊戲結束，玩家獲勝
async function showPlayerWinAlert(playerIndex, score, clearedAllBlocks = false) {
    setHighestScoreInCookie("highestScorePlayer1", highestScorePlayer1); // Update cookie
    setHighestScoreInCookie("highestScorePlayer2", highestScorePlayer2); // Update cookie
    const message = clearedAllBlocks
        ? `清除所有磚塊！\n得分：${score}`
        : `得分：${parseFloat(score.toFixed(2))}`;

    await Swal.fire({
        title: `玩家 ${playerIndex + 1} 獲勝！`,
        text: message,
        icon: 'success',
        confirmButtonText: '確定',
        confirmButtonColor: '#3085d6',
        background: '#fff',
        customClass: {
            title: 'game-title',
            popup: 'game-popup'
        },
        backdrop: false, // 禁用點擊背景關閉彈出框
    });
}