let canvas, ctx;
let ballRadius = 10;


let isJumping = [false, false]; // 追蹤每個玩家的跳躍狀態
let jumpCooldown = [0, 0]; // 每個玩家的冷卻時間
const jumpHeight = 10; // 跳躍高度
const jumpCooldownTime = 100; // 冷卻時間，單位毫秒



class PowerUp {
    constructor(x, y,color) {
        this.x = x; // 道具的 X 位置
        this.y = y; // 道具的 Y 位置
        this.down_speed = 0.5+Math.random()*2;
        this.size = 20; // 道具大小
        this.color = color; // 道具顏色
        this.isActive = true; // 道具是否活躍
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.y += this.down_speed; // 每幀向下移動 2 像素
    }
}

//---------------
// 為玩家狀態添加軌跡數組
//---------------
let players = [{
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    paddleWidth: 100,
    paddleX: 0,
    paddleY: 0,
    score: 0,
    lives: 0,
    comboCount: 0,
    trailPositions: [],
    additional_lives: true,
},
{
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    paddleWidth: 100,
    paddleX: 0,
    paddleY: 0,
    score: 0,
    lives: 0,
    comboCount: 0,
    trailPositions: [],
    additional_lives: true,
}
];

let paddleHeight = 10;

let rightPressed = [false, false],
    leftPressed = [false, false];
let brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft;
let bricks = [
    [],
    []
]; // 為每個玩家創建獨立的磚塊數組
let difficulty;
let ballSpeed;
let maxLives;


//timeout
let paddletimeout;


//---------------
// 新增軌跡相關參數配置
//---------------
const TRAIL_LENGTH = 10; // 軌跡長度
const TRAIL_INTERVAL = 2; // 每隔幾幀記錄一次位置
let frameCount = 0;

// 音效（保持原有的音效設置）
let backgroundMusic = new Audio('background.mp3');
let hitSound = new Audio('broke.mp3');
let lifeLostSound = new Audio('life_lost.mp3');
let gameOverSound = new Audio('game_over.mp3');
let upgrade = new Audio('upgrade.mp3');
let winSound = new Audio('win.mp3');
async function collisionDetection(playerIndex) {
    const player = players[playerIndex];
    const playerBricks = bricks[playerIndex];
    if (player.score >= 100 && player.additional_lives) {
        player.lives += 1;
        player.additional_lives = false;
    }
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = playerBricks[c][r];
            if (b.strength > 0) {
                // 碰撞檢測
                if (player.x > b.x && player.x < b.x + brickWidth &&
                    player.y > b.y && player.y < b.y + brickHeight) {

                    player.dy = -player.dy; // 反彈
                    b.strength--; // 磚塊強度減少
                    player.comboCount++; // 增加連擊計數
                    // 計算分數
                    let baseScore = 10; // 基本分數
                    let calculatedScore = baseScore * Math.pow(1.1, player.comboCount - 1);
                    player.score += parseFloat(calculatedScore.toFixed(2)); // 將字符串轉回數字
                    // 隨機生成道具
                    if (Math.random() < 0.1) { // 10% 機率生成道具
                        // 使用被打破的磚塊位置來生成道具
                        let powerUpX = b.x + (brickWidth / 2) - 10; // 中心位置
                        let powerUpY = b.y; // 磚塊的 Y 位置
                        powerUps.push(new PowerUp(powerUpX, powerUpY,"#FF0000"));
                    }
                    hitSound.pause();
                    hitSound.currentTime = 0;
                
                    // 播放擊打聲音
                    hitSound.play();
                }
            }
        }
    }
}
function spawnPowerUp() {
    const randomX = Math.floor(Math.random() * 1201); // 0 到 1200
    const powerUpY = 10; // 固定 Y 坐標adw
    powerUps.push(new PowerUp(randomX, powerUpY,"#00FF00"));
    // 設定下一次生成的隨機時間間隔（2到10秒之間）
    const randomInterval = Math.floor(Math.random() * (2000 - 1000 + 1)) + 10000; // 2000ms 到 10000ms
    setTimeout(spawnPowerUp, randomInterval);
}


function allBricksCleared(playerIndex) {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[playerIndex][c][r].strength > 0) {
                return false;
            }
        }
    }
    return true;
}

async function startGame(selectedDifficulty, brick, gamble) {
    spawnPowerUp();
    difficulty = selectedDifficulty;
    canvas = document.getElementById("arkanoid");
    ctx = canvas.getContext("2d");
    canvas.style.display = 'block';
    document.getElementById('gameMenu').style.display = 'none';

    // 根據難度設置遊戲參數
    if (difficulty === 'easy') {
        ballSpeed = 2;
        brickRowCount = 4;
        brickColumnCount = 6;
        maxLives = 5;
    } else if (difficulty === 'medium') {
        ballSpeed = 3;
        brickRowCount = 4;
        brickColumnCount = 6;
        maxLives = 4;
    } else if (difficulty === 'hard') {
        ballSpeed = 4;
        brickRowCount = 4;
        brickColumnCount = 6;
        maxLives = 3;
    }
    // 初始化兩個玩家的遊戲狀態
    for (let i = 0; i < 2; i++) {
        players[i].lives = maxLives;
        players[i].score = 0;
        // 設置初始球位置（左右兩邊）
        players[i].x = (i === 0) ? canvas.width / 4 : (canvas.width * 3) / 4;
        players[i].y = canvas.height - 30;
        players[i].dx = (i === 0) ? ballSpeed : -ballSpeed;
        players[i].dy = -ballSpeed;
        players[i].paddleX = (i === 0) ?
            (canvas.width / 4 - players[i].paddleWidth / 2) :
            (canvas.width * 3 / 4 - players[i].paddleWidth / 2);
        //---------------
        // 初始化軌跡數組
        //---------------
        players[i].trailPositions = [];
    }
    if (gamble === 0 || gamble === 1) {
        for (let i = 0; i < 2; i++) {
            let player = players[i];
            let randomEffect = Math.random() * 100; // 生成 0 - 100 的隨機數
            let effect; // 用於儲存效果類型
            switch (true) {
                case (randomEffect < 20):
                    effect = '加長板板10秒';
                    break; // 20% 機率增加 paddleWidth
                case (randomEffect < 50):
                    effect = '增加生命*1';
                    break; // 30% 機率增加生命
                case (randomEffect < 80):
                    effect = '球速*0.5 10秒';
                    break; // 30% 機率減速
                default:
                    effect = '球速*1.5 10秒';
                    break; // 20% 機率加速
            }
            await Swal.fire({
                title: `玩家 ${i + 1}`,
                text: effect,
                icon: 'success',
                confirmButtonText: '確認',
                backdrop: false, // 禁用點擊背景關閉彈出框
            });
            // 根據效果類型執行相應的行動
            switch (effect) {
                case '加長板板10秒':
                    player.paddleWidth = 200; // 增加到 200 像素
                    // 在 5 秒後重置 paddleWidth
                    clearTimeout(paddletimeout)
                    paddletimeout =  setTimeout(() => {
                        player.paddleWidth = 100; // 重置為 100 像素
                    }, 5000);
                    break;
                case '增加生命*1':
                    player.lives += 1; // 生命增加
                    break;

                case '球速*0.5 10秒':
                    const originalDxDecrease = player.dx; // 保存原始 dx
                    const originalDyDecrease = player.dy; // 保存原始 dy
                    player.dx *= 0.5;
                    player.dy *= 0.5;
                    clearTimeout(timeout1)
                    // 在 10 秒後重置球速
                    timeout1 = setTimeout(() => {
                        player.dx = originalDxDecrease; // 還原原始 dx
                        player.dy = originalDyDecrease; // 還原原始 dy
                    }, 10000);
                    break;

                case '球速*1.5 10秒':
                    const originalDxIncrease = player.dx; // 保存原始 dx
                    const originalDyIncrease = player.dy; // 保存原始 dy
                    player.dx *= 1.5;
                    player.dy *= 1.5;
                    clearTimeout(timeout2)
                    // 在 10 秒後重置球速
                    timeout2 = setTimeout(() => {
                        player.dx = originalDxIncrease; // 還原原始 dx
                        player.dy = originalDyIncrease; // 還原原始 dy
                    }, 10000);
                    break;
            }
        }

    }
    // 初始化磚塊參數
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    initBricks(brick);

    // 添加事件監聽器
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    // 播放背景音樂
    backgroundMusic.loop = true;
    backgroundMusic.play();
    // 開始遊戲循環
    draw();
}

function initBricks(brick) {
    // 為每個玩家初始化磚塊
    for (let p = 0; p < 2; p++) {
        bricks[p] = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[p][c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                // 從 brick1 物件中獲取相應難度的磚塊強度
                const brickStrength = brick[difficulty][r][c];
                bricks[p][c][r] = {
                    x: 0,
                    y: 0,
                    strength: brickStrength
                }; // 每個磚塊的初始屬性
            }
        }
    }
}