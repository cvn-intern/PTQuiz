<script lang="ts">
	import type { IQuiz } from '../routes/(user)/(quiz)/dashboard/quizzes/[[page]]/quiz.type';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let totalQuizzes: number;
	export let quizzes: IQuiz[];
	export let nameCategory: string;
	export let data: any;

	nameCategory = nameCategory.toLowerCase();

	let isShow = true;
	const quizzesPerPage = 5;

	const numberOfPages = Math.ceil(totalQuizzes / quizzesPerPage);

	if (numberOfPages <= 1) {
		isShow = false;
	}

	function transformQuizData(quizzes: any[]): any[] {
		const categories: { [key: string]: quiz[] } = {};

		for (let quizData of quizzes) {
			const categoryName = quizData.category.name;
			if (!categories[categoryName]) {
				categories[categoryName] = [];
			}
			categories[categoryName].push(quizData);
		}

		const output = Object.keys(categories).map((categoryName) => {
			return [
				{
					category: categoryName,
					quizzes: categories[categoryName]
				}
			];
		});

		return [output];
	}

	async function fetchQuizzes(page: number) {
		currentPage = page;
		const response = await fetch(`/api/quizzes/discovery/${nameCategory}/${page}`);
		const result = await response.json();
		if (response.status === 200) {
			if (result.length < 1) {
				const dataParse = transformQuizData(result.quizzes);
				quizzes = dataParse.quizzes;
				totalQuizzes = result.totalQuizzes;
				data = {
					quizzes: quizzes,
					totalQuizzes: totalQuizzes
				};
			} else {
				quizzes = result;
				data = {
					quizzes: quizzes
				};
			}
		} else {
			quizzes = [];
		}
		return data;
	}

	async function handlePageChange(page: number) {
		currentPage = page;
		data = await fetchQuizzes(currentPage);
		goto(`/discovery/${nameCategory}/${page}`);
	}

	$: currentPage = parseInt($page?.params?.page) || 1;

	$: if ($page.params.categoryName === 'all') {
		currentPage = 1;
	}
</script>

{#if isShow}
	<nav aria-label="Page navigation example">
		<ul class="flex items-center -space-x-px h-8 text-sm">
			<li>
				<a
					href="#"
					on:click={(e) => {
						e.preventDefault();
						if (currentPage <= 1) return;
						handlePageChange(currentPage - 1);
					}}
					class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">Previous</span>
					<svg
						class="w-2.5 h-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 1 1 5l4 4"
						/>
					</svg>
				</a>
			</li>
			{#each Array(numberOfPages) as _, i}
				<li>
					<a
						href="#"
						on:click={(e) => {
							e.preventDefault();
							handlePageChange(i + 1);
						}}
						aria-current="page"
						class="z-10 flex items-center justify-center px-3 h-8 leading {currentPage ===
						i + 1
							? 'tight text-white border border-secondary bg-secondary hover:bg-darkGreen hover:text-white'
							: 'tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}"
						>{i + 1}</a
					>
				</li>
			{/each}

			<li>
				<a
					href="#"
					on:click={(e) => {
						e.preventDefault();
						if (currentPage >= numberOfPages) return;
						handlePageChange(currentPage + 1);
					}}
					class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">Next</span>
					<svg
						class="w-2.5 h-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 9 4-4-4-4"
						/>
					</svg>
				</a>
			</li>
		</ul>
	</nav>
{/if}
