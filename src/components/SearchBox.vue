<template>
  <div class="sou">
    <form class="search" :action="currentEngineUrl" target="_blank">
      <div class="all-search">
        <div class="se" title="点击切换搜索引擎" @click="showEngineList = !showEngineList">
          <i id="icon-se" class="iconfont" :class="currentEngineIcon"></i>
        </div>
        <input 
          class="wd" 
          type="text" 
          :name="currentEngineName" 
          placeholder="想要搜点什么" 
          autocomplete="off"
          v-model="keyword"
          @keyup.enter="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div class="sou-button" @click="handleSearch">
          <div class="s" id="s-button">
            <i id="icon-sou" class="iconfont icon-sousuo"></i>
          </div>
        </div>
      </div>
      <input type="submit" id="search-submit" style="display: none;" />
    </form>
    <div class="search-engine" :class="{ show: showEngineList }">
      <div class="search-engine-list">
        <div 
          v-for="(engine, key) in searchEngines" 
          :key="key"
          class="se-li"
          :class="{ active: key === currentEngine }"
          @click="selectEngine(key)"
        >
          <a class="se-li-text">
            <i class="iconfont" :class="engine.icon"></i>
            <span>{{ engine.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  searchEngines: {
    type: Object,
    required: true
  },
  currentEngine: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select-engine', 'search'])

const keyword = ref('')
const showEngineList = ref(false)

const currentEngineUrl = computed(() => {
  return props.searchEngines[props.currentEngine]?.url || 'https://www.baidu.com/s'
})

const currentEngineName = computed(() => {
  return props.searchEngines[props.currentEngine]?.name || 'wd'
})

const currentEngineIcon = computed(() => {
  return props.searchEngines[props.currentEngine]?.icon || 'icon-baidu'
})

function selectEngine(key) {
  emit('select-engine', key)
  showEngineList.value = false
}

function handleSearch() {
  if (keyword.value.trim()) {
    emit('search', keyword.value.trim())
    keyword.value = ''
  }
}

function handleFocus() {
  document.body.classList.add('onsearch')
}

function handleBlur() {
  setTimeout(() => {
    document.body.classList.remove('onsearch')
  }, 200)
}
</script>

<style scoped>
.sou {
  max-width: 680px;
  width: calc(100% - 60px);
  position: relative;
}

.search,
.wd,
.s {
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: none;
  display: flex;
  justify-content: center;
}

.wd::-webkit-input-placeholder {
  letter-spacing: 2px;
  font-size: 1.05rem;
}

.all-search {
  display: flex;
  align-items: center;
  width: 100%;
  height: 43px;
  border-radius: 30px;
  color: #efefef;
  background-color: #00000040;
  box-shadow: 0 0 20px #0000000d;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: 0.5s ease;
}

.all-search:hover {
  box-shadow: 0 0 20px #00000033;
}

.wd {
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-indent: 4px;
  font-size: 1.25rem;
  color: #333333;
}

.se,
.s {
  width: 40px;
  height: 40px;
  display: flex;
  padding: 10px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

#icon-se,
#icon-sou {
  font-size: 1.25rem;
  color: #efefef;
}

.se {
  transition: 0.3s;
  border-radius: 0px 30px 30px 0px;
}

.se:hover {
  background: #00000040;
  border-radius: 0px 30px 30px 0px;
}

.sou-button {
  transition: 0.3s;
  border-radius: 30px 0px 0px 30px;
}

.sou-button:hover {
  background: #00000040;
  border-radius: 30px 0px 0px 30px;
}

.all-search input::-webkit-input-placeholder {
  color: #ffffff70;
  text-align: center;
}

.search-engine {
  position: absolute;
  margin-top: 10px;
  margin-left: 5px;
  padding: 10px;
  color: #efefef;
  background-color: #00000040;
  box-shadow: 0 0 20px #0000000d;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  display: none;
  z-index: 999;
  width: calc(100% - 30px);
}

.search-engine.show {
  display: block;
  animation: fade 0.5s;
}

.search-engine-list {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  max-height: 152px;
  overflow-y: auto;
  overflow-x: hidden;
}

.se-li {
  flex: 1;
  width: 23%;
  min-width: 23%;
  max-width: 23%;
  padding: 8px 0px;
  margin: 1%;
  border-radius: 8px;
  transition: 0.3s;
  background: #00000040;
  cursor: pointer;
}

.se-li:hover,
.se-li.active {
  background-color: #acacac60;
}

.se-li-text {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
}

.se-li-text span {
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.onsearch .all-search {
  background-color: #efefef;
  transform: translateY(-140%);
}

.onsearch #icon-se,
.onsearch #icon-sou {
  color: #333333;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
