<script>
  import { onMount } from 'svelte';

  const words = ['APPLE', 'BANANA', 'CAR', 'CAKE', 'COW', 'MOON', 'CUP', 'BOOK', 'BED', 'SPOON'];

  const wordData = {
    APPLE: { reading: 'แอป-เพิล', meaning: 'แอปเปิ้ล' },
    BANANA: { reading: 'บะ-นา-น่า', meaning: 'กล้วย' },
    CAR: { reading: 'คาร์', meaning: 'รถยนต์' },
    CAKE: { reading: 'เค้ก', meaning: 'ขนมเค้ก' },
    COW: { reading: 'คาว', meaning: 'วัว' },
    MOON: { reading: 'มูน', meaning: 'พระจันทร์' },
    CUP: { reading: 'คัพ', meaning: 'ถ้วย' },
    BOOK: { reading: 'บุ๊ค', meaning: 'หนังสือ' },
    BED: { reading: 'เบด', meaning: 'เตียง' },
    SPOON: { reading: 'สปูน', meaning: 'ช้อน' }
  };

  let currentView = 'vocab'; 

  function playSound(word) {
    const audio = new Audio(`/audio/${word}.mp3`);
    audio.play();
  }

  let word = '';
  let wordLetters = [];
  let fakeLetters = [];
  let allUniqueLetters = [];
  let allLetters = [];
  let userInput = [];
  let imagePath = '';
  let score = 0;
  let lives = 5;
  let showNextButton = false;
  let resultMessage = '';
  let letterColors = [];
  let usedWords = [];
  const fullFakePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex],
      ];
    }
    return array;
  }

  function getRandomFakeLetters(count) {
    const filtered = fullFakePool.filter((letter) => !word.includes(letter));
    return shuffle(filtered).slice(0, count);
  }

  function selectLetter(letterObj, index) {
    const firstEmpty = userInput.findIndex((item) => item === null);
    if (firstEmpty !== -1) {
      userInput[firstEmpty] = letterObj;
      allLetters.splice(index, 1);
    }
  }

  function removeLetterFromInput(index) {
    const letterObj = userInput[index];
    if (letterObj) {
      allLetters.push(letterObj);
      userInput[index] = null;
      letterColors[index] = '';
    }
  }

  function resetGame() {
    let randomWord;
    do {
      randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    } while (usedWords.includes(randomWord));
    usedWords.push(randomWord);
    if (usedWords.length === words.length) usedWords = [];

    word = randomWord;
    wordLetters = [...new Set(word.split(''))];
    fakeLetters = getRandomFakeLetters(3);
    allUniqueLetters = [...wordLetters, ...fakeLetters];
    allLetters = shuffle(
      allUniqueLetters.map((l, i) => ({ letter: l, id: i }))
    );
    userInput = Array(word.length).fill(null);
    letterColors = Array(word.length).fill('');
    imagePath = `/images/${word}.webp`;
    resultMessage = '';
    showNextButton = false;
  }

  function checkAnswer() {
    const userWord = userInput.map(l => l?.letter || '').join('');
    if (userWord.length !== word.length) {
      resultMessage = 'กรุณาใส่ตัวอักษรให้ครบทุกช่อง';
      return;
    }

    letterColors = userInput.map((l, i) => {
      const letter = l?.letter;
      if (!letter) return '';
      if (letter === word[i]) return 'bg-green-400 text-black';
      else if (word.includes(letter)) return 'bg-yellow-300 text-black';
      else return 'bg-red-300 text-black';
    });

    if (userWord === word) {
      resultMessage = '✅ ถูกต้อง! เยี่ยมมาก!';
      score += 1;
      showNextButton = true;
    } else {
      resultMessage = '❌ ผิด ลองใหม่อีกครั้ง!';
      lives -= 1;
    }
  }

  function fullRestart() {
    score = 0;
    lives = 5;
    resetGame();
  }

  onMount(() => {
    resetGame();
  });
</script>


<div class="flex justify-center gap-4 mt-6">
  <button
  class="px-4 py-2 rounded-md font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition"
  on:click={() => currentView = 'vocab'}
  >
  📘 คำศัพท์
</button>
<button
class="px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition"
on:click={() => currentView = 'game'}
>
🎮 Minigame
</button>
</div>


{#if currentView === 'vocab'}
  <section class="py-10 px-6 md:px-16">
    <h2 class="text-3xl font-bold text-center text-blue-800 mb-8">คำศัพท์</h2>
    <div class="w-full text-center bg-red-400 p-3 font-bold">
      <p>ยังไม่ใส่เสียง 🔊</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      {#each words as word}
        <div class="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
          <img src={`/images/${word}.webp`} alt={word} class="w-full h-40 object-contain mb-4" />
          <h3 class="text-2xl font-bold text-blue-700 mb-2">{word}</h3>
          <p class="text-lg text-gray-700 mb-1">คำอ่าน: {wordData[word].reading}</p>
          <p class="text-lg text-gray-700 mb-3">คำแปล: {wordData[word].meaning}</p>
          <button
            class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold"
            on:click={() => playSound(word)}
          >
            🔊 ฟังเสียง
          </button>
        </div>
      {/each}
    </div>
  </section>
{/if}

{#if currentView === 'game'}
  <div class="p-8 max-w-xl mx-auto text-center space-y-6">
    <h1 class="text-2xl font-bold">เกมทายคำภาษาอังกฤษ</h1>
    <div class="flex justify-center gap-8 text-lg font-semibold">
      <div>คะแนน: {score}</div>
      <div>❤️ พลังชีวิต: {lives}</div>
    </div>
    <img src={imagePath} alt={word} class="w-40 mx-auto" />
    <div class="flex justify-center gap-3">
      {#each userInput as letterObj, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class={`w-12 h-12 text-xl border-2 border-gray-400 rounded-md flex items-center justify-center cursor-pointer ${letterColors[index] || 'bg-white text-black'}`}
          on:click={() => removeLetterFromInput(index)}
        >
          {letterObj ? letterObj.letter : ''}
        </div>
      {/each}
    </div>
    <div class="flex justify-center gap-3 flex-wrap">
      {#each allLetters as letterObj, index}
        <button
          on:click={() => selectLetter(letterObj, index)}
          class="w-12 h-12 text-xl bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold"
        >
          {letterObj.letter}
        </button>
      {/each}
    </div>
    {#if resultMessage}
      <div class="mt-3 text-lg font-semibold text-gray-800">
        {resultMessage}
        {#if score === 10}
          <p>🎉 ยินดีด้วย! คุณตอบถูกหมดเลย!</p>
          <button on:click={fullRestart} class="mt-4 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">เริ่มใหม่</button>
        {/if}
      </div>
    {/if}
    {#if lives <= 0}
      <div class="text-red-600 font-bold mt-4">😵 หมดพลังชีวิตแล้ว!</div>
      <button on:click={fullRestart} class="mt-4 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">เริ่มใหม่</button>
    {/if}
    {#if lives > 0 && score < 10}
      {#if showNextButton}
        <button on:click={resetGame} class="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">ข้อต่อไป</button>
      {:else}
        <button on:click={checkAnswer} class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">เช็คคำตอบ</button>
      {/if}
    {/if}
  </div>
{/if}
