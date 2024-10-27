// 添加遊戲說明
async function showInstructions() {
    const instructions = `
      遊戲說明：
      玩家1 控制：
      - A：向左移動
      - D：向右移動

      玩家2 控制：
      - 左方向鍵：向左移動
      - 右方向鍵：向右移動

      其他控制：
      - P：暫停/繼續遊戲

      目標：
      - 清除所有磚塊
      - 保持球不落地
      - 磚塊需要被擊中指定次數才會消失
    `;
    
    // 顯示遊戲規則
    await Swal.fire({
        title: '遊戲說明',
        text: instructions,
        icon: 'info',
        confirmButtonText: '確認',
        backdrop: false, // 禁用點擊背景關閉彈出框
    });
}
// 在開始遊戲前添加說明按鈕
window.onload = function () {
    const instructionButton = document.createElement('button');
    instructionButton.textContent = '遊戲說明';
    instructionButton.onclick = showInstructions;
    document.getElementById('gameMenu').appendChild(instructionButton);
};