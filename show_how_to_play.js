async function showInstructions() {
    const instructions = `
      <div style="font-size: 24px; line-height: 1.5;">
        <strong>遊戲說明：</strong><br>
        <strong>玩家1 控制：</strong><br>
        - A：向左移動<br>
        - D：向右移動<br>
        - W：跳躍(CD:1sec)<br><br>
        <strong>玩家2 控制：</strong><br>
        - 左方向鍵：向左移動<br>
        - 右方向鍵：向右移動<br>
        - 上方向鍵：跳躍(CD:1sec)<br><br>

        <strong>其他控制：</strong><br>
        - P：暫停/繼續遊戲<br><br>

        <strong>目標：</strong><br>
        - 清除所有磚塊<br>
        - 保持球不落地<br>
        - 磚塊需要被擊中指定次數才會消失
      </div>
    `;

    // 顯示遊戲規則
    await Swal.fire({
        title: '遊戲說明',
        html: instructions, // 使用 html 來顯示格式化的內容
        icon: 'info',
        confirmButtonText: '確認',
        backdrop: false, // 禁用點擊背景關閉彈出框
    });
}

async function showMD() {
    // CSS 設定
    const style = document.createElement('style');
    style.innerHTML = `
            .custom-popup {
                max-width: 800px; /* 設置最大寬度 */
                min-width: 750px; /* 設置最小寬度 */
                overflow-y: auto; /* 如果內容超過高度，顯示滾動條 */
                padding: 20px; /* 添加內邊距 */
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加陰影效果 */
                text-align: left !important;
            }
            .swal2-html-container {
                text-align: left !important;
                line-height: unset !important;
            }
        `;
    document.head.appendChild(style);
    const instructions = `
<h1 id="-">遊戲開發進度追蹤</h1>
<h3 id="-">必要功能 (已完成)</h3>
<ol>
<li><strong>玩家控制的擋板</strong>：使用滑鼠或鍵盤控制擋板左右移動，防止球掉落。</li>
<li><strong>磚塊動態生成</strong>：遊戲開始時生成磚塊。</li>
<li><strong>球的物理運動</strong>：實現球的反彈和運動，碰到擋板或磚塊時改變方向。</li>
<li><strong>分數系統</strong>：擊破磚塊可獲得分數，並顯示當前得分。</li>
<li><strong>遊戲結束判定</strong>：當球掉落到底部時，遊戲結束並顯示結果。</li>
<li><strong>重啟關卡選項</strong>：遊戲結束後允許重新開始當前關卡。</li>
<li><strong>特殊磚塊</strong>：加入需要多次擊打的磚塊，並顯示剩餘擊打次數及顏色區分。</li>
<li><strong>遊戲難度選擇</strong>：<ul>
<li><strong>簡單</strong>：球速較慢，磚塊數量少，磚塊強度最低（一次擊打即可破壞）。</li>
<li><strong>中等</strong>：球速中等，磚塊數量較多，部分磚塊需要多次擊打。</li>
<li><strong>困難</strong>：球速較快，磚塊數量多，包含大量多次擊打的磚塊。</li>
</ul>
</li>
</ol>
<h3 id="-">簡單功能選項</h3>
<ol>
<li><strong>背景音樂和音效</strong>：遊戲加入背景音樂和擊打磚塊的音效。//DONE</li>
<li><strong>背景主題更換</strong>：提供多個背景主題選擇，如夜空、森林等，改變遊戲外觀。//DONE</li>
<li><strong>限制生命次數</strong>：每關提供固定數量的生命，球掉落時減少生命，生命用完遊戲結束。//DONE</li>
<li><strong>球的尾跡效果</strong>：為移動中的球增加尾跡效果，讓球運動過程中留下視覺痕跡，增強動態感。//DONE</li>
<li><strong>簡單的過關動畫</strong>：當所有磚塊被擊破後，顯示過關動畫，並跳轉到下一關卡。//DONE</li>
</ol>
<h3 id="-">中等功能選項</h3>
<ol>
<li><strong>多個關卡</strong>：設計 3-5 個不同關卡，每關有不同的磚塊排列和難度。//DONE</li>
<li><strong>升級和降級道具</strong>：隨機掉落升級道具，如擴大(縮小)擋板、加速(減速)球等，且道具有時效性。//DONE<ul>
<li>在 1~12 秒內隨機掉落道具，包含板子變長、球速變快或變慢，具時效性。</li>
</ul>
</li>
<li><strong>獎勵時間延長</strong>：達到特定分數時，可隨機延長遊戲時間或增加生命。//DONE<ul>
<li>當前關卡達到 100 分時增加 1 點生命。</li>
</ul>
</li>
<li><strong>分數系統進階</strong>：加入連擊加分機制，連續擊破多個磚塊可獲得額外分數。//DONE<ul>
<li>碰撞條件為下一次碰撞為磚塊，撞到牆或板子則結束 combo。</li>
</ul>
</li>
<li><strong>擋板跳躍</strong>：滑鼠或鍵盤點擊擋板可向上移動 30 或 50 像素，冷卻時間 1 秒。//DONE</li>
</ol>
<h3 id="-">困難功能選項</h3>
<ol>
<li><strong>特殊道具</strong>：擊破後可能掉落道具，包含增加時間、增加球數和額外功能（貫穿、分裂球、顏色改變等）。//DONE<ul>
<li>當磚塊被擊破時，有機率掉落方塊，隨機提供板子變長、球速變快或變慢，具時效性。</li>
</ul>
</li>
<li><strong>視覺特效</strong>：磚塊被擊破時呈現爆炸或閃光動畫效果，提升視覺體驗。</li>
<li><strong>遊戲進度記錄</strong>：本地記錄最高分、玩家當前關卡、生命數（球數）、分數、時間等數據（儲存在 cookie 中）。//DONE</li>
</ol>
<h3 id="bonus-">Bonus 功能選項</h3>
<ol>
<li><strong>兩人同時競賽對打</strong>。//DONE</li>
<li><strong>道具保留/過關後隨機抽選道具</strong>：當局完成後，下一局開始前隨機抽選道具並立刻使用。//DONE</li>
<li><strong>磚塊初始生成</strong>：根據使用者選擇的主題圖案生成對應顏色的磚塊。//DONE</li>
</ol>
    `;

    // 顯示遊戲規則
    await Swal.fire({
        title: '完成的項目',
        html: instructions,
        icon: 'info',
        confirmButtonText: '確認',
        backdrop: false,
        customClass: {
            popup: 'custom-popup' // 添加自定義類別
        }
    });
}
