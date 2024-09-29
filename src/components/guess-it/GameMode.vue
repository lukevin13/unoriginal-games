<script setup lang="ts">
import { shuffle } from '@/utils';
import { type WordList } from './word-lists'
import { ref, computed } from 'vue'

const emit = defineEmits([
  'end-game'
])
const props = defineProps<{
  wordList: WordList
}>()

const shuffledWords = shuffle(props.wordList.words)
const currentWord = ref(shuffledWords.pop())

function nextWord () {
  currentWord.value = shuffledWords.pop()
}

function endGame () {
  emit('end-game')
}

const bgGreen = ref(false)
const bgRed = ref(false)
const inTransition = computed(() => {
  return bgGreen.value || bgRed.value
})
function correct () {
  if (inTransition.value) {
    return
  }
  bgGreen.value = true
  setTimeout(() => {
    bgGreen.value = false
    nextWord()
  }, 500)
}
function skip () {
  if (inTransition.value) {
    return
  }
  bgRed.value = true
  setTimeout(() => {
    bgRed.value = false
    nextWord()
  }, 500)
}

</script>

<template>
  <div
    class="static grid h-screen place-items-center"
    :class="{
      'bg-blue-100': !bgGreen && !bgRed,
      'bg-green-300': bgGreen,
      'bg-red-400': bgRed,
    }"
  >
    <div class="font-semibold main-word px-4">{{ currentWord }}</div>
  </div>
  <div class="absolute top-0 left-0 p-2">
    <button class="border border-black rounded-md px-2 py-1" @click="endGame">End Game</button>
  </div>
  <div class="absolute top-0 right-0 p-2 grid grid-cols-1 gap-2">
    <button class="border border-black rounded-md bg-green-300 px-2 py-1" @click="correct">Correct</button>
    <button class="border border-black rounded-md bg-red-400 px-2 py-1" @click="skip">Skip</button>
  </div>
</template>

<style scoped>
.main-word {
  font-size: 3.5rem;
  text-align: center;
}
</style>