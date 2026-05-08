<template>
  <div class="mark">
    <div class="tab">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
    <div class="content products">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="mainCont"
        :class="{ selected: activeTab === index }"
      >
        <div class="quick-all">
          <div 
            v-for="(bookmark, key) in getBookmarksByCategory(index)" 
            :key="key"
            class="quick"
          >
            <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a>
          </div>
          <div class="quick" @click="$emit('close')">
            <a id="set-quick"><i class="iconfont icon-tianjia-"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bookmarks: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const tabs = ['常用', '工具', '开发', '娱乐', '学习', '设计']
const activeTab = ref(0)

const categorizedBookmarks = {
  0: ['1', '2'],
  1: ['3', '4', '5', '6', '7', '8'],
  2: ['9', '10', '11', '12'],
  3: ['11'],
  4: ['2', '11'],
  5: ['11']
}

function getBookmarksByCategory(index) {
  const keys = categorizedBookmarks[index] || []
  const result = {}
  keys.forEach(key => {
    if (props.bookmarks[key]) {
      result[key] = props.bookmarks[key]
    }
  })
  return result
}
</script>

<style scoped>
.mark {
  flex-direction: column;
  align-items: center;
  background: #00000040;
  border-radius: 8px;
  height: 400px;
  max-height: 400px;
  width: 80%;
  max-width: 900px;
  position: absolute;
  margin-top: 200px;
  z-index: 2000;
  animation: fade 0.75s;
  display: flex;
}

.tab {
  height: 40px;
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.tab-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.95rem;
  transition: 0.3s;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #efefef;
}

.tab-item:hover {
  border-bottom-color: #efefef80;
}

.tab-item.active {
  border-bottom-color: #efefef;
}

.products {
  width: 100%;
  height: 100%;
}

.mainCont {
  display: none;
  width: 100%;
  flex-wrap: wrap;
}

.mainCont.selected {
  display: flex;
}

.quick-all {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  margin: 0px 20px 20px 20px;
  height: 316px;
  overflow: auto;
}

.quick {
  flex: 1;
  height: 48px;
  background: #00000040;
  cursor: pointer;
  border-radius: 8px;
  width: 18%;
  min-width: 18%;
  max-width: 18%;
  margin: 0% 1% 2% 1%;
  transition: 0.3s;
}

.quick:hover {
  background: #acacac60;
}

.quick:active {
  transform: scale(0.95);
  background: #8a8a8a80;
}

.quick a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  color: #efefef;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
