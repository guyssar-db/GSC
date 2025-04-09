<script>
    let name = 'name';
    let description = 'description';
    let tags = 'Thai';
    let index = '0';
    let ll = "{";
    let rr = "},"
</script>

<div class="flex w-full h-[100px] px-4 py-3 items-center text-center justify-start gap-5">
        <input class="border" type="text" name="" id=""  bind:value={name} >
        <input class="border" type="text" name="" id=""  bind:value={description} >
        <select class="border" name="" id="" bind:value={tags}>
            <option value="Thai">Thai</option>
            <option value="Physics">Physics</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
        </select>
        <input class="border" type="text" name="" id=""  bind:value={index} >
</div>


<!-- Output -->
<div class="p-5 bg-sky-50">
    <p>{ll} title: '{name}' , description: '{description}', tags: ['{tags}'], index:['{index}'] {rr}</p>
</div>