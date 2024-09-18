<script setup lang="ts">
  import { Player } from '../composables/useTicTacToe'

  const props = defineProps<{
    owner: Player | null
    currentPlayerSymbol: Player['symbol']
    hovered: boolean
  }>()

  const emit = defineEmits(['click', 'hover', 'unhover'])

  const clickEvent = () => {
    if (!props.owner) {
      emit('click')
    }
  }

  const hoverEvent = () => {
    if (!props.owner) {
      emit('hover')
    }
  }

  const unhoverEvent = () => {
    emit('unhover')
  }
</script>

<template>
  <button class="square" @click="clickEvent" @mouseenter="hoverEvent" @mouseleave="unhoverEvent">
    <template v-if="props.owner">
      {{ props.owner.symbol }}
    </template>
    <template v-else-if="hovered">
      <span class="hovered">{{ currentPlayerSymbol }}</span>
    </template>
    <template v-else> &nbsp; </template>
  </button>
</template>

<style scoped>
  .hovered {
    opacity: 50%;
  }

  .square {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
  }
</style>
