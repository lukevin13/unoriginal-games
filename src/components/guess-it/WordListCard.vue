<script setup lang="ts">
import type { WordList } from './word-lists';

defineProps<{
  wordList: WordList
}>()
</script>

<template>
  <button class="inline-block border rounded-md px-6 py-3 m-2 text-center">
    <h1 class="text-lg font-semibold">{{ wordList.name }}</h1>
  </button>
</template>