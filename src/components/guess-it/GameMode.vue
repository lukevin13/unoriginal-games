<script setup lang="ts">
import { shuffle } from '@/utils';
import { type WordList } from './word-lists'
import { ref, computed } from 'vue'

import beepSoftMp3 from './assets/beep-soft.mp3'
// import beepHardMp3 from './assets/beep-hard.mp3'
import correctMp3 from './assets/correct.mp3'
import skipMp3 from './assets/skip.mp3'

const emit = defineEmits([
  'end-game'
])
const props = defineProps<{
  wordList: WordList
}>()

const isPlaying = ref(false)
const shuffledWords = shuffle(props.wordList.words)
const currentWord = ref()
const numCorrect = ref(0)
const numSkipped = ref(0)
const totalWords = computed(() => numCorrect.value + numSkipped.value)

function nextWord () {
  currentWord.value = shuffledWords.pop()
}

function startGame () {
  numCorrect.value = 0
  numSkipped.value = 0
  playAudio(beepSoftMp3)
  isPlaying.value = true
  nextWord()
}

function endGame () {
  emit('end-game')
}

function playAudio(audio: string) {
  const audioCorrect = new Audio(audio)
  audioCorrect.play()
}

const TRANSITION_DURATION_MS = 300
const bgGreen = ref(false)
const bgRed = ref(false)
const inTransition = computed(() => {
  return bgGreen.value || bgRed.value
})
function correct () {
  if (inTransition.value) {
    return
  }
  numCorrect.value++
  playAudio(correctMp3)
  bgGreen.value = true
  setTimeout(() => {
    bgGreen.value = false
    nextWord()
  }, TRANSITION_DURATION_MS)
}
function skip () {
  if (inTransition.value) {
    return
  }
  numSkipped.value++
  playAudio(skipMp3)
  bgRed.value = true
  setTimeout(() => {
    bgRed.value = false
    nextWord()
  }, TRANSITION_DURATION_MS)
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
    <div v-if="isPlaying" class="font-semibold main-word px-4">{{ currentWord }}</div>
    <button v-else class="border border-black rounded-md px-2 py-1" @click="startGame">Start Game</button>
  </div>
  <div v-if="isPlaying" class="absolute top-0 left-0 p-2">
    <button class="border border-black rounded-md px-2 py-1" @click="endGame">End Game</button>
  </div>
  <div v-if="isPlaying" class="absolute top-0 right-0 p-2 grid grid-cols-1 gap-2">
    <button class="border border-black rounded-md bg-green-300 px-2 py-1" @click="correct">Correct</button>
    <button class="border border-black rounded-md bg-red-400 px-2 py-1" @click="skip">Skip</button>
  </div>
  <div class="absolute bottom-0 right-0 p-2 grid grid-cols-1 gap-2">
    {{ numCorrect }} / {{ totalWords }}
  </div>
</template>

<style scoped>
.main-word {
  font-size: 3.5rem;
  text-align: center;
}
</style>