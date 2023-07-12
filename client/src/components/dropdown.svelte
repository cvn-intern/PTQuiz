<script>
    const categoryList = ['Math','Science','Liture','Physical','Music','Draw']
</script>

<div id="dropdown" class="z-10 block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
        {#each categoryList as category,i }
        <li>
            <a href="#" class="block px-4 py-2 hover:bg-primaryColor dark:hover:bg-gray-600 dark:hover:text-white">{category}</a>
          </li>
        {/each}
    </ul>
</div>
