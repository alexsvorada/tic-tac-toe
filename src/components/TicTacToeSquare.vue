<script setup lang="ts">
	import type { Player } from '../types/ticTacToe'

	defineProps<{
		owner: Player | null
		currentPlayerSymbol: string
		hovered: boolean
		isInActiveBoard: boolean
	}>()

	const emit = defineEmits<{
		(e: 'click'): void
		(e: 'hover'): void
		(e: 'unhover'): void
	}>()
</script>

<template>
	<button
		:class="['square', { clickable: isInActiveBoard }]"
		@click="!owner && emit('click')"
		@mouseenter="!owner && emit('hover')"
		@mouseleave="emit('unhover')">
		<span :class="{ preview: hovered }">
			{{ owner?.symbol || (hovered ? currentPlayerSymbol : '') }}
		</span>
	</button>
</template>

<style scoped>
	.square {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		background-color: #333;
		border: 1px solid black;
		transition: background-color 0.3s ease;
		cursor: default;
	}

	.clickable {
		cursor: pointer;
	}

	.preview {
		opacity: 0.5;
	}
</style>
