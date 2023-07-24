<div class="flex flex-row h-[800] w-full">
	<div class=" h-full w-1/4" />
	<div class="h-full lg:w-3/4 flex flex-col lg:p-6 md:w-full md:p-6">
		<div class="2xl:h-1/2 xl:h-1/2 lg:h-1/2 lg:p-6 md:h-1/2 sm:h-1/2 w-full flex flex-col items-center">
			<input
				type="text"
				class="h-2/6 placeholder-slate-200 2xl:w-3/4 2xl:p-5 2xl:m-1 2xl:text-3xl xl:w-3/4 xl:p-4 xl:m-1 xl:text-2xl lg:w-3/4 lg:p-4 lg:text-[20px] md:w-full md:p-5 md:m-1 md:text-3xl sm:w-3/4 sm:p-5 sm:m-1 sm:text-3xl border border-gray-300 rounded-xl text-center"
				placeholder="Type your question here"
			/><br />

			<div
				class="flex items-center justify-center 2xl:w-2/12 2xl:h-2/12 xl:w-2/12 xl:h-2/12 lg:w-2/12 lg:h-2/3 md:w-1/3 md:h-1/2 sm:w-2/12 sm:h-2/12"
			>
				<label

					for="dropzone-file"
					class="2xl:w-full 2xl:h-full xl:w-full xl:h-full lg:w-full lg:h-16 lg:mb-6 md:w-full md:h-full sm:w-full sm:h-full flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					<div
						class="2xl:pt-5 2xl:pb-6 xl:pt-2 xl:pb-6 lg:pt-1 lg:pb-1 md:pt-8 md:pb-8 sm:pt-5 sm:pb-6flex flex-col items-center justify-center"
					>
						<svg
							class="2xl:w-8 2xl:h-8 xl:w-6 xl:h-6 lg:w-4 lg:h-4 md:w-16 md:h-16 sm:w-8 sm:h-8 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p
							class="2xl:mb-2 2xl:text-sm xl:mb-1 xl:text-sm lg:mb-[5px] lg:text-[10px] md:mb-2 md:text-xl sm:mb-2 sm:text-sm text-gray-500 dark:text-gray-400"
						>
							<span
								class="xl:font-semibold lg:font-semibold md:font-semibold sm:font-semibold"
								>Upload image</span
							>
						</p>
						<p
							class="2xl:text-xs xl:text-xs lg:text-[10px] md:text-xl sm:text-xs text-gray-500 dark:text-gray-400"
						>
							PNG or JPG
						</p>
					</div>
					<input id="dropzone-file" type="file" class="hidden" />
				</label>
			</div>
		</div>
		<div
			class=" grid 2xl:grid-cols-2 2xl:gap-3 2xl:h-1/2 2xl:w-full xl:grid-cols-2 xl:gap-3 xl:h-1/2 xl:w-full lg:grid-cols-2 lg:gap-2 lg:h-1/2 lg:w-full md:grid-cols-2 md:gap-3 md:h-1/2 md:w-full sm:grid-cols-2 sm:gap-3 sm:h-1/2 sm:w-full"
		>
			<div class=" bg-optionA rounded-xl flex flex-row items-center">
				<h1
					class="2xl:mx-8 2xl:text-4xl 2xl:font-semibold xl:mx-6 xl:text-3xl xl:font-semibold lg:mx-5 lg:text-2xl lg:font-semibold md:mx-5 md:text-4xl md:font-semibold sm:mx-8 sm:text-4xl sm:font-semibold"
				>
					A.
				</h1>
				<input
					type="text"
					placeholder="Type your answer here"
					class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl md:placeholder:text-2xl sm:h-full sm:w-2/3 sm:text-3xl placeholder-slate-200 text-center resize-none bg-optionA border-none border-transparent focus:border-transparent focus:ring-0 "
				/>
				<input
					type="radio"
					name="trueAnswer"
					id=""
					class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-2 sm:p-5 sm:ml-5 cursor-pointer"
				/>
			</div>
			<div class=" bg-optionA rounded-xl flex flex-row items-center">
				<h1
					class="2xl:mx-8 2xl:text-4xl 2xl:font-semibold xl:mx-6 xl:text-3xl xl:font-semibold lg:mx-5 lg:text-2xl lg:font-semibold md:mx-5 md:text-4xl md:font-semibold sm:mx-8 sm:text-4xl sm:font-semibold"
				>
					A.
				</h1>
				<input
					type="text"
					placeholder="Type your answer here"
					class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl md:placeholder:text-2xl sm:h-full sm:w-2/3 sm:text-3xl placeholder-slate-200 text-center resize-none bg-optionA border-none border-transparent focus:border-transparent focus:ring-0 "
				/>
				<input
					type="radio"
					name="trueAnswer"
					id=""
					class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-2 sm:p-5 sm:ml-5 cursor-pointer"
				/>
			</div>
			<div class=" bg-optionA rounded-xl flex flex-row items-center">
				<h1
					class="2xl:mx-8 2xl:text-4xl 2xl:font-semibold xl:mx-6 xl:text-3xl xl:font-semibold lg:mx-5 lg:text-2xl lg:font-semibold md:mx-5 md:text-4xl md:font-semibold sm:mx-8 sm:text-4xl sm:font-semibold"
				>
					A.
				</h1>
				<input
					type="text"
					placeholder="Type your answer here"
					class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl md:placeholder:text-2xl sm:h-full sm:w-2/3 sm:text-3xl placeholder-slate-200 text-center resize-none bg-optionA border-none border-transparent focus:border-transparent focus:ring-0 "
				/>
				<input
					type="radio"
					name="trueAnswer"
					id=""
					class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-2 sm:p-5 sm:ml-5 cursor-pointer"
				/>
			</div>
			<div class=" bg-optionA rounded-xl flex flex-row items-center">
				<h1
					class="2xl:mx-8 2xl:text-4xl 2xl:font-semibold xl:mx-6 xl:text-3xl xl:font-semibold lg:mx-5 lg:text-2xl lg:font-semibold md:mx-5 md:text-4xl md:font-semibold sm:mx-8 sm:text-4xl sm:font-semibold"
				>
					A.
				</h1>
				<input
					type="text"
					placeholder="Type your answer here"
					class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl md:placeholder:text-2xl sm:h-full sm:w-2/3 sm:text-3xl placeholder-slate-200 text-center resize-none bg-optionA border-none border-transparent focus:border-transparent focus:ring-0 "
				/>
				<input
					type="radio"
					name="trueAnswer"
					id=""
					class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-2 sm:p-5 sm:ml-5 cursor-pointer"
				/>
			</div>
		</div>
	</div>
</div>
