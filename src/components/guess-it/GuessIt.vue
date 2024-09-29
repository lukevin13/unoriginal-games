<script setup lang="ts">
import GameMode from './GameMode.vue'
import { type WordList, WORD_LISTS } from './word-lists'
import WordListCard from './WordListCard.vue'
import { ref } from 'vue'

const gameIsActive = ref(false)
const selectedWordList = ref(null as unknown as WordList)

function onSelectWordList (wordList : WordList) {
  selectedWordList.value = wordList
  gameIsActive.value = true
}
</script>

<template>
  <div v-if="gameIsActive">
    <GameMode
      :word-list="selectedWordList"
      @end-game="gameIsActive = false"
    />
  </div>
  <div
    v-else
    class="p-2"
  >
    <WordListCard
      v-for="[id, wordList] of Object.entries(WORD_LISTS)"
      :key="id"
      :word-list="wordList"
      @click="onSelectWordList(wordList)"
    />
  </div>
</template>
