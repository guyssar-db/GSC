<script>
    let name = 'name';
    let description = 'description';
    let tags = 'tags';
    let index = '0';
</script>

<div class="flex w-full h-[100px] px-4 py-3 items-center text-center justify-start gap-5">
        <input class="border" type="text" name="" id=""  bind:value={name} >
        <input class="border" type="text" name="" id=""  bind:value={description} >
        <input class="border" type="text" name="" id=""  bind:value={tags} >
        <input class="border" type="text" name="" id=""  bind:value={index} >
</div>


<!-- Output -->
<div class="p-5 bg-sky-50">
    <p class="">title: '{name}' , description: '{description}', tags: ['{tags}'], index:['{index}'] </p>
</div>