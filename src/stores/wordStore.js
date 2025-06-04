import { defineStore } from 'pinia'
import wordListObj from '../assets/netem_full_list.json'

export const useWordStore = defineStore('word', {
  state: () => ({
    words: [],
    currentIndex: 0
  }),
  getters: {
    currentWord(state) {
      return state.words[state.currentIndex] || null
    },
    favoriteWords(state) {
      return state.words.filter(w => w.收藏)
    }
  },
  actions: {
    // 初始化词库，每次随机推荐一个单词
    initWords() {
      // 1. 加载原始单词表
      const arr = wordListObj["5530考研词汇词频排序表"]
      // 2. 从 localStorage 恢复收藏信息
      const favObj = JSON.parse(localStorage.getItem('favorites') || '{}')
      this.words = arr
        ? arr.map(w => ({
            ...w,
            收藏: favObj[w.序号] || false
          }))
        : []
      if (this.words.length > 0) {
        this.currentIndex = Math.floor(Math.random() * this.words.length)
      } else {
        this.currentIndex = 0
      }
    },
    nextWord() {
      if (this.words.length === 0) return
      this.currentIndex = (this.currentIndex + 1) % this.words.length
    },
    toggleFavorite(index) {
      if (this.words[index]) {
        this.words[index].收藏 = !this.words[index].收藏
        // 更新localStorage
        const favObj = {}
        this.words.forEach(w => {
          if (w.收藏) favObj[w.序号] = true
        })
        localStorage.setItem('favorites', JSON.stringify(favObj))
      }
    }
  }
})