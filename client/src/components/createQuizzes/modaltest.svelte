<script lang="ts">
    import Icon from '@iconify/svelte';

    interface InputForm {
        label: string;
        name: string;
        type: string;
        required: boolean;
        selectOptionsList?: string[];
    }
    $: isOpenModal = false;
    const handleClick = () => {
        isOpenModal = !isOpenModal;
    };
    const inputFormList: InputForm[] = [
        {
            label: 'Title Quizzes',
            name: 'titleQuizzes',
            type: 'text',
            required: true,
        },
        {
            label: 'Share your Quizzes',
            name: 'shareQuizzes',
            type: 'switch',
            required: true
        },
        {
            label: 'Category',
            name: 'category',
            type: 'select',
            required: true,
            selectOptionsList: [
                'Math',
                'English',
                'Science',
                'History',
                'Geography',
                'Literature',
                'Other'
            ]
        },
        {
            label: 'Level',
            name: 'level',
            type: 'select',
            required: false,
            selectOptionsList: ['Easy', 'Medium', 'Hard']
        },
        {
            label: 'Duration (minutes)',
            name: 'duration',
            type: 'number',
            required: false
        },
        {
            label: 'Date',
            name: 'date',
            type: 'date',
            required: false
        },
        {
            label: 'Thumbnail',
            name: 'thumbnail',
            type: 'file',
            required: false,
        }
    ];
</script>

<button
    on:click={handleClick}
    data-modal-target="inforQuizzes"
    data-modal-toggle="inforQuizzes"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
>
    Open Information your quizzes
</button>

<!-- Main modal -->
<div
    id="inforQuizzes"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full {isOpenModal
        ? 'block'
        : 'hidden'}"
>
    <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
                on:click={handleClick}
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="inforQuizzes"
            >
                <Icon icon={'mdi:cancel-bold'} class="text-xl" />
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Information your quizzes
                </h3>
                <form class="space-y-4" action="">
                    {#each inputFormList as { label, name, type, required, selectOptionsList }}
                        <label
                            for={name}
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >{label} <span class="text-red-600">{required ? '*' : ''}</span>
                        </label>
                        {#if type === 'file'}
                            <input
                                class="block w-full text-sm text-gray-900 border border-graydish rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="file_input_help"
                                id="file_input"
                                {type}
                            />
                            <p
                                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="file_input_help"
                            >
                                SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                        {:else if type === 'switch'}
                            <label class="relative inline-flex items-center mb-4 cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" />
                                <div
                                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-100 dark:peer-focus:ring-secondary dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-graydish after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"
                                />
                                <span
                                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >Private</span
                                >
                            </label>
                        {:else if type === 'select'}
                            <select
                                id={name}
                                class="bg-gray-50 border border-graydish text-gray-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                            >
                                {#if selectOptionsList?.length === 0}
                                    <option>None</option>
                                {:else if selectOptionsList !== undefined}
                                    {#each selectOptionsList as option}
                                        <option>{option}</option>
                                    {/each}
                                {/if}
                            </select>
                        {:else}
                            <div>
                                <input
                                    {type}
                                    {name}
                                    id={name}
                                    class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    {required}
                                />
                            </div>
                        {/if}
                    {/each}
                    <div class="flex gap-4">
                        <button
                            on:click={handleClick}
                            class="w-full text-white bg-reddish hover:bg-reddishHover focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >Save</button
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>