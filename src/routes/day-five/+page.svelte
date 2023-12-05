<script lang="ts">
	import { createPagination, melt } from '@melt-ui/svelte';
	import type { TaskType } from './types.js';

	const { data } = $props();
	let default_tasks = [...data.tasks];
	let tasks = $state(data.tasks);

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range }
	} = createPagination({
		count: tasks.length,
		perPage: 15,
		defaultPage: 1,
		siblingCount: 1
	});

	let visible_tasks = $derived(tasks.slice($range.start, $range.end));

	function format_date(d: string) {
		const date = new Date(d);

		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		}).format(date);
	}

	function sort_by_date(direction: 'asc' | 'desc') {
		tasks = tasks.sort((a, b) => {
			const date_a = new Date(a.date);
			const date_b = new Date(b.date);

			return direction === 'asc'
				? date_a.getTime() - date_b.getTime()
				: date_b.getTime() - date_a.getTime();
		});
	}

	function sort_by_elf(direction: 'asc' | 'desc') {
		tasks = tasks.sort((a, b) => {
			if (direction === 'asc') {
				if (a.elf < b.elf) {
					return -1;
				}
				if (a.elf > b.elf) {
					return 1;
				}
				return 0;
			} else {
				if (a.elf > b.elf) {
					return -1;
				}
				if (a.elf < b.elf) {
					return 1;
				}
				return 0;
			}
		});
	}

	function sort_by_task(direction: 'asc' | 'desc') {
		tasks = tasks.sort((a, b) => {
			if (direction === 'asc') {
				if (a.task < b.task) {
					return -1;
				}
				if (a.task > b.task) {
					return 1;
				}
				return 0;
			} else {
				if (a.task > b.task) {
					return -1;
				}
				if (a.task < b.task) {
					return 1;
				}
				return 0;
			}
		});
	}

	function sort_by_minutes_taken(direction: 'asc' | 'desc') {
		tasks = tasks.sort((a, b) => {
			return direction === 'asc'
				? a.minutesTaken - b.minutesTaken
				: b.minutesTaken - a.minutesTaken;
		});
	}

	function filter_by_task(filter: TaskType) {
		tasks = tasks.filter((task) => task.task === filter);
	}

	function reset() {
		tasks = default_tasks;
	}

	let date_sort = $state('asc');
	let elf_sort = $state('asc');
	let task_sort = $state('asc');
	let minutes_taken_sort = $state('asc');
	let filter = $state('all');
</script>

<svelte:head>
	<title>Day five</title>
</svelte:head>

<h1 class="text-center text-3xl font-bold mb-6 font-sans mt-6">Day five</h1>

<div class="join mb-6 mt-6 flex place-content-center">
	<button
		class="btn join-item"
		on:click={() => {
			sort_by_date(date_sort as 'asc' | 'desc');
			date_sort = date_sort === 'asc' ? 'desc' : 'asc';
		}}>sort by date {date_sort}</button
	>
	<button class="btn join-item"
		on:click={() => {
			sort_by_elf(elf_sort as 'asc' | 'desc');
			elf_sort = elf_sort === 'asc' ? 'desc' : 'asc';
		}}
	>sort by elf {elf_sort}</button>
	<button 
	on:click={
		() => {
			sort_by_task(task_sort as 'asc' | 'desc');
			task_sort = task_sort === 'asc' ? 'desc' : 'asc';
		}
	}
	 class="btn join-item">
	sort by task {task_sort}</button>
	<button 
	on:click={
		() => {
			sort_by_minutes_taken(minutes_taken_sort as 'asc' | 'desc');
			minutes_taken_sort = minutes_taken_sort === 'asc' ? 'desc' : 'asc';
		}
	}
	 class="btn join-item">sort by minutes taken {minutes_taken_sort}</button>
	<button
	 class="btn join-item"
	 on:click={() => {
			if (filter === 'all') {
				filter = 'WRAPPED_PRESENT'
				reset();
				filter_by_task(filter as TaskType);
			} else if (filter === 'WRAPPED_PRESENT') {
				filter = 'CREATED_TOY'
				reset();
				filter_by_task(filter as TaskType);
			} else {
				filter = 'all'
				
				reset();
			}
		}}
	 >filter by task {filter}</button>

	<button class="btn join-item" on:click={
		() => {
			

			date_sort = 'asc';
			elf_sort = 'asc';
			task_sort = 'asc';
			minutes_taken_sort = 'asc';
			filter = 'all';

		}
	}>reset</button>
</div>

<div class="overflow-x-auto">
	<table class="table table-zebra">
		<!-- head -->
		<thead>
			<tr>
				<th></th>
				<th>date</th>
				<th>elf</th>
				<th>task</th>
				<th>minutes taken</th>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->

			{#each visible_tasks as task, id}
				<tr class="hover">
					<th>{$range.start + id + 1}</th>
					<th>{format_date(task.date)}</th>
					<td>{task.elf}</td>
					<td>{task.task}</td>
					<td>{task.minutesTaken}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<nav class="grid p-2 gap-4 justify-center mt-6" use:melt={$root}>
	<p class="p-3 text-center">Showing items {$range.start} - {$range.end}</p>
	<div class="flex self-center p-3 w-full gap-16">
		<button class="btn btn-primary disabled:btn-disabled" use:melt={$prevButton}>Prev</button>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<span class="font-bold font-sans self-center text-3xl">...</span>
			{:else}
				<button class="btn btn-primary data-[selected]:btn-secondary" use:melt={$pageTrigger(page)}
					>{page.value}</button
				>
			{/if}
		{/each}
		<button use:melt={$nextButton}>Next</button>
	</div>
</nav>
