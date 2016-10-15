/*
 * Author: TsaiKoga
 * Comment: Flappy bird运行原理，鸟一直上下移动(flapBird)，
 * 每次不管点不点击，管子随机产生添加到游戏中(generatePipe)，并且向右移动一定位置(movePipes)；
 * 每次点击，删掉一个管子(deletePipe)，与以上同个时间保证引入新管子，剔除旧管子。
 * 判断游戏是否结束（通过判断小鸟是否落地/小鸟是否撞到管子 birdPos）
 * Args: gameState[0: 游戏冻结, 1:按下按钮时, 2:游戏运行中]
 * pipeId [0,1,2...]
 * gapHeight 允许鸟通过的高度
 */
$(function() {
  $canvas = $(".canvas");
  $bird   = $(".bird");
  gameState = 2;
  pipeId = 0;
  gapHeight = 130;

  /* Bird */
  function birdFlap() {
  }

  function gravity() {
  }

  /* Pipe */
  function generatePipe() {
    pipeId++;
    pipeTopHeight = Math.floor(Math.random() * ($canvas.height() - 250)) + 50;
    pipeBottomHeight = $canvas.height() - (pipeTopHeight + gapHeight);
    pipe = '<div class="pipe" pipe-id="' + pipeId + '"><div class="topHalf" style="height: ' + pipeTopHeight + 'px"></div><div class="bottomHalf" style="height: ' + pipeBottomHeight + 'px"></div></div>';
    $canvas.append(pipe);
  }

  function deletePipe() {
    $('.canvas .pipe').first().remove();
  }

  function movePipes() {
    $(".pipe").each(function() {
      $(this).animate({right: '+=160px'}, 1200, 'linear');
    });
  }

  /* Playing */
  $canvas.mousedown(function() {
    birdFlap();
    if (gameState === 2) {
      gameState = 1;
      deleteInterval();
    }
  });

  // 一直运行着,当gameState为1，进行操作
  var int = setInterval(function() {
    if(gameState === 1) {
      generatePipe();
      movePipes();
    }
  }, 1200);

  function deleteInterval() {
    setTimeout(function() {
      var int = setInterval(function() {
        if (gameState === 1 || gameState === 2) {
          deletePipe();
        }
      }, 1200)
    }, 2050)
  }

})
