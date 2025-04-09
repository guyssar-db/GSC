<script>
  

	let selectedFilter = 'All';

	const subjects = ['Math', 'Physics', 'English','Thai'];
	const path_subjects = ['Math1', 'Physics2', 'English3',"Math4","Physic5","English6"];// เส้นทางของโฟล์เดอร์เกมเขียนเรียงตามลำดับที่ตั้งเอาไว้่

	const cards = [
		{ title: 'พื้นฐานสมการเชิงเส้น', description: 'เรียนรู้เกี่ยวกับสมการและการแก้สมการเบื้องต้น', tags: ['Math'], index:['1'] },
		{ title: 'แรงและการเคลื่อนที่', description: 'เข้าใจหลักการพื้นฐานของแรงและกฎการเคลื่อนที่ของนิวตัน', tags: ['Physics'] , index:['2'] },
		{ title: 'ทายคำภาษาอังกฤษ', description: 'ฝึกเขียนอย่างมืออาชีพด้วยภาษาอังกฤษ', tags: ['English'] , index:['3'] },
		{ title: 'ฟังก์ชันและกราฟ', description: 'วิเคราะห์พฤติกรรมของฟังก์ชันด้วยกราฟ', tags: ['Math'], index:['4'] },
		{ title: 'เสียงและคลื่น', description: 'ศึกษาธรรมชาติของเสียง การสั่น และคลื่นเสียง', tags: ['Physics'], index:['5']  },
		{ title: 'การฟังเพื่อจับใจความ', description: 'พัฒนาทักษะการฟังภาษาอังกฤษในสถานการณ์จริง', tags: ['English'], index:['6']  },
		{ title: 'การเขียนบทความ', description: 'พัฒนาทักษะการเขียนบทความอย่างถูกต้อง', tags: ['Thai'], index:['7']  },
		{ title: 'การฟังเพื่อจับใจความ', description: 'พัฒนาทักษะการฟังภาษาอังกฤษในสถานการณ์จริง', tags: ['English'], index:['8']  },
	];

	$: filteredCards = selectedFilter === 'All'
		? cards
		: cards.filter(card => card.tags.includes(selectedFilter));
        
</script>

<section class="h-auto bg006dd2 text-white py-12 px-6 md:px-16">
	<h2 class="text-3xl font-bold mb-6">บทเรียนทั้งหมด</h2>

	<div class="flex flex-wrap gap-3 mb-8">
		<button
			class="px-4 py-2 rounded-md font-semibold transition-all"
			class:bgfdc500={selectedFilter === 'All'}
			class:bg003f88={selectedFilter !== 'All'}
			on:click={() => selectedFilter = 'All'}
		>ทั้งหมด</button>


		{#each subjects as subject}
			<button
				class="px-4 py-2 rounded-md font-semibold transition-all"
				class:bgfdc500={selectedFilter === subject}
				class:bg003f88={selectedFilter !== subject}
				on:click={() => selectedFilter = subject}
			>{subject}</button>
		{/each}
	</div>

	<div class="grid md:grid-cols-3 gap-6">
        {#each filteredCards as card}
            <div class="bg003f88 p-6 rounded-lg shadow-md hover:bg00296b transition">
                <h3 class="text-xl font-semibold mb-2">{card.title}</h3>
                <p class="mb-4">{card.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    tags : 

                    <!--  -->
                    {#each card.index as index}
                        <span class="text-sm bg006dd2 text-white px-3 py-1 rounded-full font-semibold">{index}</span>
                    {/each}
                    {#each card.tags as tag}
                        <span class="text-sm bg006dd2 text-white px-3 py-1 rounded-full font-semibold">{tag}</span>
                    {/each}
                </div>
                {#each card.index as index}
                <a
                    href={`/learning/${path_subjects[index-1]}`}
                    class="inline-block mt-2 px-4 py-2 w-full text-center bgfdc500 text-black rounded-md font-semibold hover:bgffc700 transition-all"
                >เริ่มเรียนรู้</a>
                {/each}
            </div>
        {/each}
    </div>
</section>

<style>

</style>
