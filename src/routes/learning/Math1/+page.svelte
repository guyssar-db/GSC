<script>
  import { onMount } from "svelte";

  let ball1 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
  let ball2 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
  let ball3 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
  let ball4 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
  let ball5 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };

  let gravity = 0.5;
  let bounce = -0.7;
  let friction = 0.98;

  let ballRadius = 24;
  let targetRadius = 24;

  let floor = 300;
  let centerX = 170;
  let targetY = 150;

  let damagestart;
  let damageplus;
  let numpool = [60, 15, 205, 235, 225];
  let currentNumber = 0;
  let fixcurrentNumber = 0;
  let life = 3;
  let ballcount = 5;
  
  let gameStarted = false;
  let ball2Started = false;
  let ball3Started = false;
  let ball4Started = false;
  let ball5Started = false;

  let resultMessage = "";
  let currentView = 'learning';

  let showNextBall2Btn = false;
  let showNextBall3Btn = false;
  let showNextBall4Btn = false;
  let showNextBall5Btn = false;

  let showHowToPlay = false;
  let n = 'n';

  function animate() {
      ball1.vy += gravity;
      ball1.y += ball1.vy;
      ball1.x += ball1.vx;
      ball1.rotation += ball1.vx * 1.5;

      let dx1 = ball1.x - centerX;
      let dy1 = ball1.y + ballRadius - (targetY + targetRadius);
      let distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      //1
      if (distance1 < ballRadius + targetRadius) {
          if (ball1.vy > 0) {
              ball1.y = targetY - ballRadius * 2 + Math.random() * 2;
              ball1.vy *= bounce;
              currentNumber -= damagestart;
              ballcount--;
              if (Math.abs(ball1.vx) < 0.5) {
                  ball1.vx = dx1 > 0 ? 2 : -2;
              }
              onBallCollision();
          }
      }

      if (ball1.y >= floor) {
          ball1.y = floor;
          ball1.vy *= bounce;
          ball1.vx *= friction;
      }

      if (ball1.x < ballRadius) {
          ball1.x = ballRadius;
          ball1.vx *= -1;
      } else if (ball1.x > 400 - ballRadius) {
          ball1.x = 400 - ballRadius;
          ball1.vx *= -1;
      }

      // 2
      if (ball2Started) {
          ball2.vy += gravity;
          ball2.y += ball2.vy;
          ball2.x += ball2.vx;
          ball2.rotation += ball2.vx * 1.5;

          let dx2 = ball2.x - centerX;
          let dy2 = ball2.y + ballRadius - (targetY + targetRadius);
          let distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < ballRadius + targetRadius) {
              if (ball2.vy > 0) {
                  ball2.y = targetY - ballRadius * 2 + Math.random() * 2;
                  ball2.vy *= bounce;
                  currentNumber -= damagestart + damageplus;
                  ballcount--;
                  if (Math.abs(ball2.vx) < 0.5) {
                      ball2.vx = dx2 > 0 ? 2 : -2;
                  }
                  onBallCollision();
              }
          }

          if (ball2.y >= floor) {
              ball2.y = floor;
              ball2.vy *= bounce;
              ball2.vx *= friction;
          }

          if (ball2.x < ballRadius) {
              ball2.x = ballRadius;
              ball2.vx *= -1;
          } else if (ball2.x > 400 - ballRadius) {
              ball2.x = 400 - ballRadius;
              ball2.vx *= -1;
          }
      }

      // 3
      if (ball3Started) {
          ball3.vy += gravity;
          ball3.y += ball3.vy;
          ball3.x += ball3.vx;
          ball3.rotation += ball3.vx * 1.5;

          let dx3 = ball3.x - centerX;
          let dy3 = ball3.y + ballRadius - (targetY + targetRadius);
          let distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

          if (distance3 < ballRadius + targetRadius) {
              if (ball3.vy > 0) {
                  ball3.y = targetY - ballRadius * 2 + Math.random() * 2;
                  ball3.vy *= bounce;
                  currentNumber -= damagestart + damageplus * 2;
                  ballcount--;
                  if (Math.abs(ball3.vx) < 0.5) {
                      ball3.vx = dx3 > 0 ? 2 : -2;
                  }
                  onBallCollision();
              }
          }

          if (ball3.y >= floor) {
              ball3.y = floor;
              ball3.vy *= bounce;
              ball3.vx *= friction;
          }

          if (ball3.x < ballRadius) {
              ball3.x = ballRadius;
              ball3.vx *= -1;
          } else if (ball3.x > 400 - ballRadius) {
              ball3.x = 400 - ballRadius;
              ball3.vx *= -1;
          }
      }

      // 4
      if (ball4Started) {
          ball4.vy += gravity;
          ball4.y += ball4.vy;
          ball4.x += ball4.vx;
          ball4.rotation += ball4.vx * 1.5;

          let dx4 = ball4.x - centerX;
          let dy4 = ball4.y + ballRadius - (targetY + targetRadius);
          let distance4 = Math.sqrt(dx4 * dx4 + dy4 * dy4);

          if (distance4 < ballRadius + targetRadius) {
              if (ball4.vy > 0) {
                  ball4.y = targetY - ballRadius * 2 + Math.random() * 2;
                  ball4.vy *= bounce;
                  currentNumber -= damagestart + damageplus * 3;
                  ballcount--;
                  if (Math.abs(ball4.vx) < 0.5) {
                      ball4.vx = dx4 > 0 ? 2 : -2;
                  }
                  onBallCollision();
              }
          }

          if (ball4.y >= floor) {
              ball4.y = floor;
              ball4.vy *= bounce;
              ball4.vx *= friction;
          }

          if (ball4.x < ballRadius) {
              ball4.x = ballRadius;
              ball4.vx *= -1;
          } else if (ball4.x > 400 - ballRadius) {
              ball4.x = 400 - ballRadius;
              ball4.vx *= -1;
          }
      }

      // 5
      if (ball5Started) {
          ball5.vy += gravity;
          ball5.y += ball5.vy;
          ball5.x += ball5.vx;
          ball5.rotation += ball5.vx * 1.5;

          let dx5 = ball5.x - centerX;
          let dy5 = ball5.y + ballRadius - (targetY + targetRadius);
          let distance5 = Math.sqrt(dx5 * dx5 + dy5 * dy5);

          if (distance5 < ballRadius + targetRadius) {
              if (ball5.vy > 0) {
                  ball5.y = targetY - ballRadius * 2 + Math.random() * 2;
                  ball5.vy *= bounce;
                  currentNumber -= damagestart + damageplus * 4;
                  ballcount--;
                  if (Math.abs(ball5.vx) < 0.5) {
                      ball5.vx = dx5 > 0 ? 2 : -2;
                  }
                  onBallCollision();
              }
          }

          if (ball5.y >= floor) {
              ball5.y = floor;
              ball5.vy *= bounce;
              ball5.vx *= friction;
          }

          if (ball5.x < ballRadius) {
              ball5.x = ballRadius;
              ball5.vx *= -1;
          } else if (ball5.x > 400 - ballRadius) {
              ball5.x = 400 - ballRadius;
              ball5.vx *= -1;
          }
      }

      if (gameStarted) {
    const balls = [ball1, ball2Started && ball2, ball3Started && ball3, ball4Started && ball4, ball5Started && ball5].filter(Boolean);

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            checkBallCollision(balls[i], balls[j]);
        }
    }
    requestAnimationFrame(animate);
}

  }

  function startGame() {
    if (damagestart != null && damageplus != null) {
      if (fixcurrentNumber == 0) {
        fixcurrentNumber += currentNumber;
      }
      gameStarted = true;
      resultMessage = "";
      animate();

      setTimeout(() => {
        showNextBall2Btn = true;
      }, 2000);
    } else {
      resultMessage = "กรุณาใส่ตัวเลขให้ครบทุกช่อง";
    }
  }

  function startNextBall() {
    ball2Started = true;
    showNextBall2Btn = false;

    setTimeout(() => {
      showNextBall3Btn = true;
    }, 2000);
  }

  function startNextBall3() {
    ball3Started = true;
    showNextBall3Btn = false;

    setTimeout(() => {
      showNextBall4Btn = true;
    }, 2000);
  }

  function startNextBall4() {
    ball4Started = true;
    showNextBall4Btn = false;

    setTimeout(() => {
      showNextBall5Btn = true;
    }, 2000);
  }

  function startNextBall5() {
    ball5Started = true;
    showNextBall5Btn = false;
  }

  function resetGame() {
      ballcount = 5;
      if (currentNumber == 0) {
          fixcurrentNumber = 0;
      }
      currentNumber = fixcurrentNumber;
      gameStarted = false;
      ball2Started = false;
      ball3Started = false;
      ball4Started = false;
      ball5Started = false;
      showNextBall2Btn = false;
      showNextBall3Btn = false;
      showNextBall4Btn = false;
      showNextBall5Btn = false;
      ball1 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
      ball2 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
      ball3 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
      ball4 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
      ball5 = { x: 170, y: 0, vx: 0, vy: 0, rotation: 0 };
      damageplus = null;
      damagestart = null;
      if (currentNumber != 0) {
          life--;
      } else {
          const randomIndex = Math.floor(Math.random() * numpool.length);
          currentNumber = numpool[randomIndex];
      }
      if (life == 0) {
          life = 3;
          const randomIndex = Math.floor(Math.random() * numpool.length);
          currentNumber = numpool[randomIndex];
      }
  }

  function checkBallCollision(ballA, ballB) {
    const dx = ballB.x - ballA.x;
    const dy = ballB.y - ballA.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ballRadius * 2) {
        const angle = Math.atan2(dy, dx);
        const overlap = ballRadius * 2 - distance;
        const halfOverlap = overlap / 2;

        ballA.x -= Math.cos(angle) * halfOverlap;
        ballA.y -= Math.sin(angle) * halfOverlap;
        ballB.x += Math.cos(angle) * halfOverlap;
        ballB.y += Math.sin(angle) * halfOverlap;

        const tempVx = ballA.vx;
        const tempVy = ballA.vy;
        ballA.vx = ballB.vx * friction;
        ballA.vy = ballB.vy * friction;
        ballB.vx = tempVx * friction;
        ballB.vy = tempVy * friction;
    }
}

function onBallCollision() {
    const targetDiv = document.getElementById("target");
    targetDiv.classList.add("scaled");
    setTimeout(() => {
        targetDiv.classList.remove("scaled"); 
    }, 100); 
}

  onMount(() => {
      const randomIndex = Math.floor(Math.random() * numpool.length);
      currentNumber = numpool[randomIndex];
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
      script.async = true;
      document.head.appendChild(script);
      if (window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
    }
  });
</script>
{#if showHowToPlay}
  <!-- พื้นหลังจาง -->
  <div class="fixed inset-0 bg-[#00183e] bg-opacity-50 flex items-center justify-center z-50">
    <!-- กล่อง Modal -->
    <div class="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md relative">
      <button
        class="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        on:click={() => showHowToPlay = false}
      >
      <p class="font-xl font-bold">
        ×
      </p>
      </button>
      <h2 class="text-xl font-bold text-blue-800 mb-4">วิธีเล่นเกม</h2>
      <ul class="list-disc pl-5 text-left space-y-2 text-sm text-gray-700">
        <li>กำหนดจำนวนเริ่มต้น และจำนวนบวกต่อเนื่อง เพื่อทำให้วงกลมตรงกลางมีค่าเป็น 0</li>
        <li>สามารถตอบผิดได้เพียง 3 ครั้งก่อนตัวเลขบนวงกลมสีเทาจะเปลี่ยนไปแบบสุ่ม</li>
        <li>สูตรผลบวกของอนุกรมเลขคณิต
          <span class="font-bold">S<sub>n</sub> = <sup>n</sup>/<sub>2</sub>( 2a + (n-1)d)</span>
        </li>
        <ul class="list-disc pl-5 text-left space-y-2 text-sm text-gray-700 font-bold">
          <li>S<sub>n</sub> = จำนวนที่อยู่ในวงกลมสีเทา</li>
          <li>n = จำนวนบอล</li>
          <li>a = จำนวนเริ่มต้น</li>
          <li>d = จำนวนบวกต่อเนื่อง</li>
        </ul>
      </ul>
      <div class="mt-6 text-center">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          on:click={() => showHowToPlay = false}
        >
          เข้าใจแล้ว!
        </button>
      </div>
    </div>
  </div>
{/if}
<div class="flex justify-center gap-4 mt-6">
  <button
      class="px-4 py-2 rounded-md font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition"
      on:click={() => currentView = 'learning'}
      >📘 Learning</button
      
  >
  <button
      class="px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition"
      on:click={() => currentView = 'game'}
      >🎮 Minigame</button
  >
  {#if currentView === 'game'}
    <button
        class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-semibold"
        on:click={() => showHowToPlay = !showHowToPlay}
        >
          ℹ️ วิธีเล่น
        </button>
  {/if}
</div>


{#if currentView === 'game'}
<h1 class="text-3xl font-bold text-center text-blue-800 my-8">เกมหย่อนบอลให้เป็น 0</h1>
<div class="flex justify-center gap-12 text-lg font-semibold">
  <div class="text-gray-800">🔵 จำนวนบอล: {ballcount}</div>
  <div>❤️ พลังชีวิต: {life}</div>
</div>

<div class="my-10 flex justify-center">
  <div
      class="w-[400px] h-[350px] bg-white border-4 border-gray-300 rounded-xl shadow-lg relative overflow-hidden"
  >
  <div
  class="w-[70px] h-[70px] bg-gray-500 rounded-full absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-white font-bold text-xl target"
  style="top: {targetY}px;"
  id="target"
>
  {currentNumber}
</div>

      {#if gameStarted}
          <div
              class="flex w-12 h-12 bg-blue-500 rounded-full absolute text-center items-center justify-center text-white font-bold text-xl"
              style="top: {ball1.y}px; left: {ball1.x}px; transform: translate(-50%, 0) rotate({ball1.rotation}deg);"
          >
              {damagestart}
          </div>
      {/if}

      {#if ball2Started}
          <div
              class="flex w-12 h-12 bg-green-500 rounded-full absolute text-center items-center justify-center text-white font-bold text-xl"
              style="top: {ball2.y}px; left: {ball2.x}px; transform: translate(-50%, 0) rotate({ball2.rotation}deg);"
          >
              {damagestart + damageplus}
          </div>
      {/if}

      {#if ball3Started}
          <div
              class="flex w-12 h-12 bg-red-500 rounded-full absolute text-center items-center justify-center text-white font-bold text-xl"
              style="top: {ball3.y}px; left: {ball3.x}px; transform: translate(-50%, 0) rotate({ball3.rotation}deg);"
          >
              {damagestart + damageplus * 2}
          </div>
      {/if}

      {#if ball4Started}
          <div
              class="flex w-12 h-12 bg-yellow-500 rounded-full absolute text-center items-center justify-center text-white font-bold text-xl"
              style="top: {ball4.y}px; left: {ball4.x}px; transform: translate(-50%, 0) rotate({ball4.rotation}deg);"
          >
              {damagestart + damageplus * 3}
          </div>
      {/if}

      {#if ball5Started}
          <div
              class="flex w-12 h-12 bg-orange-500 rounded-full absolute text-center items-center justify-center text-white font-bold text-xl"
              style="top: {ball5.y}px; left: {ball5.x}px; transform: translate(-50%, 0) rotate({ball5.rotation}deg);"
          >
              {damagestart + damageplus * 4}
          </div>
      {/if}
  </div>
</div>
{#if resultMessage}
  <div
      class="max-w-md mx-auto bg-red-300 p-6 rounded-xl shadow-md space-y-4 mb-5"
  >
      <div class="mt-3 text-lg font-semibold text-gray-800 text-center">
          {resultMessage}
      </div>
  </div>
{/if}
<div class="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 mb-5">
  <div class="flex gap-3 justify-around">
      <div>
          <p class="block text-gray-700 font-semibold mb-1">
             จำนวนเริ่มต้น : {damagestart}
          </p>
          {#if !gameStarted}
              <input
                  type="number"
                  bind:value={damagestart}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="เช่น 10"
              />
          {/if}
      </div>
      <div>
          <p class="block text-gray-700 font-semibold mb-1">
              จำนวนบวกต่อเนื่อง : {damageplus}
          </p>
          {#if !gameStarted}
              <input
                  type="number"
                  bind:value={damageplus}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="เช่น 2"
              />
          {/if}
      </div>
  </div>
  {#if !gameStarted}
      <button
          class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition"
          on:click={startGame}
      >
          ▶️ เริ่มเกม
      </button>
  {/if}

  {#if gameStarted && !ball2Started && showNextBall2Btn}
      <button
          class="w-full bg-yellow-400 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-md transition"
          on:click={startNextBall}
      >
          ➡️ ถัดไป ลูกที่ 2
      </button>
  {:else if gameStarted && !ball3Started&& showNextBall3Btn}
      <button
          class="w-full bg-yellow-400 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-md transition"
          on:click={startNextBall3}
      >
          ➡️ ถัดไป ลูกที่ 3
      </button>
  {:else if gameStarted && !ball4Started && showNextBall4Btn}
      <button
          class="w-full bg-yellow-400 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-md transition"
          on:click={startNextBall4}
      >
          ➡️ ถัดไป ลูกที่ 4
      </button>
  {:else if gameStarted && !ball5Started && showNextBall5Btn}
      <button
          class="w-full bg-yellow-400 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-md transition"
          on:click={startNextBall5}
      >
          ➡️ ถัดไป ลูกที่ 5
      </button>
  {/if}

  {#if ballcount == 0}
      <button
          class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
          on:click={resetGame}
      >
          เริ่มใหม่
      </button>
  {/if}
</div>
{/if}

