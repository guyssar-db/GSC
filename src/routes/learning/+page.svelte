<script>
	let selectedFilter = 'All';
  
	const subjects = ['Math', 'Physics', 'English', 'Thai'];
  
	const cards = [
	  { title: 'อนุกรมเลขคณิต', description: 'เรียนรู้เกี่ยวกับการหาอนุกรมเลขคณิต', tags: ['Math'], index: ['1'], level: ['Normal'] },
	  { title: 'แรงและการเคลื่อนที่', description: 'เข้าใจหลักการพื้นฐานของแรงและกฎการเคลื่อนที่ของนิวตัน', tags: ['Physics'], index: ['1'], level: [''] },
	  { title: 'ทายคำภาษาอังกฤษ', description: 'ฝึกเขียนอย่างมืออาชีพด้วยภาษาอังกฤษ', tags: ['English'], index: ['1'], level: ['Easy'] },
	  { title: 'ฟังก์ชันและกราฟ', description: 'วิเคราะห์พฤติกรรมของฟังก์ชันด้วยกราฟ', tags: ['Math'], index: ['2'], level: [''] },
	  { title: 'เสียงและคลื่น', description: 'ศึกษาธรรมชาติของเสียง การสั่น และคลื่นเสียง', tags: ['Physics'], index: ['2'], level: [''] },
	  { title: 'การฟังเพื่อจับใจความ', description: 'พัฒนาทักษะการฟังภาษาอังกฤษในสถานการณ์จริง', tags: ['English'], index: ['2'], level: [''] },
	  { title: 'การเขียนบทความ', description: 'พัฒนาทักษะการเขียนบทความอย่างถูกต้อง', tags: ['Thai'], index: ['1'], level: [''] },
	  { title: 'การฟังเพื่อจับใจความ', description: 'พัฒนาทักษะการฟังภาษาอังกฤษในสถานการณ์จริง', tags: ['English'], index: ['3'], level: [''] },
	];
  
	$: filteredCards =
	  selectedFilter === 'All'
		? cards
		: cards.filter((card) => card.tags.includes(selectedFilter));
  </script>
  
  <section class="min-h-screen w-full bg-[#006dd2] text-white py-12 px-6 md:px-16">
	<h2 class="text-3xl font-bold mb-6">บทเรียนทั้งหมด</h2>
	
	<div class="flex flex-wrap gap-3 mb-8">
	  <button
		class="px-4 py-2 rounded-md font-semibold transition-all"
		class:bg-[#fdc500]={selectedFilter === 'All'}
		class:bg-[#003f88]={selectedFilter !== 'All'}
		on:click={() => (selectedFilter = 'All')}
	  >
		ทั้งหมด
	  </button>
  
	  {#each subjects as subject}
		<button
		  class="px-4 py-2 rounded-md font-semibold transition-all"
		  class:bg-[#fdc500]={selectedFilter === subject}
		  class:bg-[#003f88]={selectedFilter !== subject}
		  on:click={() => (selectedFilter = subject)}
		>
		  {subject}
		</button>
	  {/each}
	</div>
  
	<div class="grid md:grid-cols-3 gap-6">
	  {#each filteredCards as card}
		<div class="bg-[#003f88] p-6 rounded-lg shadow-md hover:bg-[#00296b] transition">
		  <h3 class="text-xl font-semibold mb-2">{card.title}</h3>
		  <p class="mb-4">{card.description}</p>
		  <div class="flex flex-wrap gap-2 mb-4">
			<span class="mr-2">tags :</span>
			{#each card.tags as tag}
			  <span class="text-sm bg-[#006dd2] text-white px-3 py-1 rounded-full font-semibold">
				{tag}
			  </span>
			{/each}
			<!-- {#each card.index as index}
			  <span class="text-sm bg-[#006dd2] text-white px-3 py-1 rounded-full font-semibold">
				{index}
			  </span>
			{/each} -->
			{#each card.level as level}
			  <span class="text-sm bg-[#006dd2] text-white px-3 py-1 rounded-full font-semibold">
				{level}
			  </span>
			{/each}
		  </div>
  
		  {#each card.index as index}
			<a
			  href={`/learning/${card.tags[0]}${index}`}
			  class="inline-block mt-2 px-4 py-2 w-full text-center bg-[#fdc500] text-black rounded-md font-semibold hover:bg-[#ffc700] transition-all"
			>
			  เริ่มเรียนรู้
			</a>
		  {/each}
		</div>
	  {/each}
	</div>
  </section>
  
  <style>
  </style>
  