<template>
  <div class="word-app" tabindex="0" ref="appRef" @keydown.space.prevent="nextWord">
    <div
      v-if="wordStore.currentWord"
      class="word-card-fullscreen"
      @click="nextWord"
    >
      <div
        class="word-big"
        @click.stop="goToFavorites"
        title="点击进入收藏夹"
      >
        {{ wordStore.currentWord.单词 }}
        <!-- 五角星已移除 -->
      </div>
      <div class="word-desc">
        <p class="meaning">{{ wordStore.currentWord.释义 }}</p>
        <p v-if="wordStore.currentWord.其他拼写"><strong>其他拼写：</strong>{{ wordStore.currentWord.其他拼写 }}</p>
        <el-button
          :type="wordStore.currentWord.收藏 ? 'warning' : 'info'"
          size="small"
          @click.stop="toggleFavorite"
        >
          {{ wordStore.currentWord.收藏 ? '取消收藏' : '收藏' }}
        </el-button>
      </div>
    </div>
    <div v-else>
      <p>没有单词可显示</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWordStore } from '../stores/wordStore'

const wordStore = useWordStore()
const router = useRouter()

function nextWord() {
  wordStore.nextWord()
}
function toggleFavorite() {
  wordStore.toggleFavorite(wordStore.currentIndex)
}
function goToFavorites() {
  router.push('/favorites')
}
// 自动发音
function speak(word) {
  if (!window.speechSynthesis) return
  const utter = new window.SpeechSynthesisUtterance(word)
  utter.lang = 'en-US'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}
watch(
  () => wordStore.currentWord,
  (word) => {
    if (word && word.单词) {
      speak(word.单词)
    }
  },
  { immediate: true }
)
const appRef = ref(null)
onMounted(() => {
  wordStore.initWords()
  appRef.value && appRef.value.focus()
})
</script>

<style scoped>
.word-app {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  background: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word-card-fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  box-shadow: none;
}
.word-big {
  font-size: 6em;
  font-weight: bold;
  color: #222;
  text-align: center;
  margin-bottom: 7vh;
  line-height: 1.05;
  cursor: pointer;
  user-select: none;
  letter-spacing: 0.05em;
  background: none;
  border: none;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  text-shadow: 0 2px 16px rgba(0,0,0,0.15);
  transition: box-shadow 0.2s, text-shadow 0.2s;
}
.word-big:active {
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  text-shadow: 0 1px 8px rgba(0,0,0,0.10);
}
.word-big,
.word-big * {
  background: none !important;
  box-shadow: none !important;
  border: none !important;
}
.word-desc {
  font-size: 1.2em;
  color: #444;
  margin-top: 2vh;
  text-align: center;
  line-height: 1.7;
  max-width: 80vw;
}
.meaning {
  font-size: 2.4em;
  color: #1b305e;
  font-weight: 500;
  margin: 0.5em 0 0.5em 0;
}
.word-app:focus {
  outline: none;
}
.word-desc el-button,
.word-desc .el-button {
  margin-top: 2vh;
}
</style>