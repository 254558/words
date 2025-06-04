<template>
  <div class="favorites-app">
    <h1 class="favorites-title">已收藏单词</h1>
    <el-empty v-if="wordStore.favoriteWords.length === 0" description="暂无收藏"></el-empty>
    <div
      v-for="w in wordStore.favoriteWords"
      :key="w.序号"
      class="word-card"
    >
      <div class="card-header">
        <span
          class="word-main"
          @click="speak(w.单词)"
          title="点击朗读"
        >
          {{ w.单词 }}
          <el-icon class="speak-icon">
            <svg viewBox="0 0 1024 1024" width="1.3em" height="1.3em"><path d="M..." fill="#3498db"/></svg>
          </el-icon>
        </span>
        <el-button type="danger" size="small" @click="unFavorite(w)">取消收藏</el-button>
      </div>
      <div class="card-body">
        <p class="meaning"><strong>释义：</strong>{{ w.释义 }}</p>
        <p v-if="w.其他拼写"><strong>其他拼写：</strong>{{ w.其他拼写 }}</p>
        <p class="freq"><strong>词频：</strong>{{ w.词频 }}</p>
      </div>
    </div>
    <router-link to="/">
      <el-button type="primary" class="back-btn">返回单词卡片</el-button>
    </router-link>
  </div>
</template>

<script setup>
import { useWordStore } from '../stores/wordStore'
const wordStore = useWordStore()

function unFavorite(word) {
  const idx = wordStore.words.findIndex(w => w.序号 === word.序号)
  if (idx > -1) wordStore.toggleFavorite(idx)
}
function speak(word) {
  if (!window.speechSynthesis) return
  const utter = new window.SpeechSynthesisUtterance(word)
  utter.lang = 'en-US'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}
</script>

<style scoped>
.favorites-app {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0 0 3em 0;
  background: #f7fafc;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.favorites-title {
  text-align: center;
  font-size: 2.3em;
  font-weight: 700;
  margin: 2rem 0 2.3rem 0;
  color: #1b305e;
  letter-spacing: 0.03em;
}
.word-card {
  width: 92vw;
  margin: 0 auto 1.5em auto;
  border-radius: 1.1em;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: none;
  background: #fff;
  padding: 1.3em 1em 1.1em 1em;
  max-width: 600px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .6em;
}
.word-main {
  cursor: pointer;
  color: #3498db;
  font-size: 2.6em;
  font-weight: bold;
  display: flex;
  align-items: center;
  user-select: none;
}
.speak-icon {
  vertical-align: middle;
  margin-left: 10px;
}
.card-body {
  text-align: left;
  margin-top: 0.8em;
}
.meaning {
  font-size: 1.5em;
  color: #1b305e;
  font-weight: 500;
  margin: 0.2em 0 0.2em 0;
}
.freq {
  color: #888;
  margin: 0.1em 0 0 0;
  font-size: 1em;
}
.back-btn {
  display: block;
  margin: 2em auto 0 auto;
  font-size: 1.1em;
  padding: 0.8em 2.1em;
  letter-spacing: 0.08em;
  box-shadow: none;
  border-radius: 0.7em;
}
.el-card,
.el-card__body {
  border: none !important;
  background: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}
</style>