<script>
  const words = ['APPLE', 'BANANA','CAR'];

  let word = '';
  let wordLetters = [];
  let fakeLetters = [];
  let allUniqueLetters = [];
  let allLetters = [];
  let userInput = [];
  let imagePath = '';

  const fullFakePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function getRandomFakeLetters(count) {
    const filtered = fullFakePool.filter((letter) => !wordLetters.includes(letter));
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
    }
  }

  function resetGame() {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  wordLetters = [...new Set(word.split(''))];
  fakeLetters = getRandomFakeLetters(3);
  allUniqueLetters = [...wordLetters, ...fakeLetters];
  allLetters = shuffle(
    allUniqueLetters.map((l, i) => ({ letter: l, id: i }))
  );
  userInput = Array(word.length).fill(null);
  imagePath = `/images/${word}.jpeg`;
  resultMessage = '';
}
  let resultMessage = '';

function checkAnswer() {
  const userWord = userInput.map(l => l?.letter || '').join('');
  if (userWord.length !== word.length) {
    resultMessage = 'กรุณาใส่ตัวอักษรให้ครบทุกช่อง';
    return;
  }

  if (userWord === word) {
    resultMessage = '✅ ถูกต้อง! เยี่ยมมาก!';
  } else {
    resultMessage = '❌ ผิด ลองใหม่อีกครั้ง!';
  }
}

  resetGame();
</script>

<div class="p-8 max-w-xl mx-auto text-center space-y-6">
  <h1 class="text-2xl font-bold">ทายคำภาษาอังกฤษ</h1>

  <div>
    <img src={imagePath} alt={word} class="w-40 mx-auto" />
  </div>

  <div class="flex justify-center gap-3">
    {#each userInput as letterObj, index}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="w-12 h-12 text-xl border-2 border-gray-400 rounded-md flex items-center justify-center bg-white text-black cursor-pointer"
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
<div>
  {#if resultMessage}
  <div class="mt-3 text-lg font-semibold text-gray-800">
    {resultMessage}
  </div>
{/if}
</div>

  <button
  on:click={checkAnswer}
  class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
>
  เช็คคำตอบ
</button>
  <button on:click={resetGame} class="mt-4 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
    เริ่มใหม่
  </button>
</div>

<style>
</style>
