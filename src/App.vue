<template>
  <div class="app-container">
    <LoadingBox v-if="isLoading" @complete="onLoadingComplete" />
    <div class="main-content" :class="{ loaded: !isLoading }">
      <BackgroundImage :src="backgroundUrl" />
      <div class="cover"></div>
      <section id="section" class="section">
        <div id="content">
          <div class="con">
            <ToolBar :time="currentTime" :date="currentDate" :weather="weather" />
            <SearchBox 
              :searchEngines="searchEngines"
              :currentEngine="currentEngine"
              @select-engine="selectEngine"
              @search="handleSearch"
            />
            <BookmarkPanel 
              v-if="showBookmarks"
              :bookmarks="bookmarks"
              @close="showBookmarks = false"
            />
            <SettingsPanel 
              v-if="showSettings"
              :searchEngines="searchEngines"
              :bookmarks="bookmarks"
              :wallpaperType="wallpaperType"
              @close="showSettings = false"
              @update-engines="updateSearchEngines"
              @update-bookmarks="updateBookmarks"
              @update-wallpaper="updateWallpaper"
            />
            <div id="menu" @click="toggleSettings">
              <i id="icon-menu" class="iconfont" :class="showSettings ? 'icon-home' : 'icon-shezhi'"></i>
            </div>
          </div>
        </div>
        <footer class="foot">
          <div class="power">
            Copyright & Kobayashi&nbsp;&copy;&nbsp;2020 - {{ currentYear }}
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Cookies from 'js-cookie'
import LoadingBox from './components/LoadingBox.vue'
import BackgroundImage from './components/BackgroundImage.vue'
import ToolBar from './components/ToolBar.vue'
import SearchBox from './components/SearchBox.vue'
import BookmarkPanel from './components/BookmarkPanel.vue'
import SettingsPanel from './components/SettingsPanel.vue'

const isLoading = ref(true)
const showBookmarks = ref(false)
const showSettings = ref(false)
const currentTime = ref('')
const currentDate = ref('')
const currentYear = ref(new Date().getFullYear())
const weather = ref({ wea: 'N/A', tem1: 'N/A', tem2: 'N/A' })

const searchEngines = ref(getDefaultSearchEngines())
const bookmarks = ref(getDefaultBookmarks())
const wallpaperType = ref(getWallpaperType())
const currentEngine = ref(getDefaultEngine())

const backgroundUrl = computed(() => {
  const type = wallpaperType.value || '2'
  switch (type) {
    case '1':
      const pics = [
        './img/background1.webp',
        './img/background2.webp',
        './img/background3.webp',
        './img/background4.webp',
        './img/background5.webp',
        './img/background6.webp',
        './img/background7.webp',
        './img/background8.webp',
        './img/background9.webp',
        './img/background10.webp'
      ]
      return pics[Math.floor(Math.random() * 10)]
    case '2':
      return 'https://api.dujin.org/bing/1920.php'
    case '3':
      return 'https://api.ixiaowai.cn/gqapi/gqapi.php'
    case '4':
      return 'https://api.ixiaowai.cn/api/api.php'
    default:
      return 'https://api.dujin.org/bing/1920.php'
  }
})

function getDefaultSearchEngines() {
  const local = Cookies.get('se_list')
  if (local) {
    if (typeof local === 'string') {
      try {
        return JSON.parse(local)
      } catch {
        // JSON parse failed, use default
      }
    } else if (typeof local === 'object') {
      return local
    }
  }
  const defaultEngines = {
    '1': { id: 1, title: '百度', url: 'https://www.baidu.com/s', name: 'wd', icon: 'icon-baidu' },
    '2': { id: 2, title: '必应', url: 'https://cn.bing.com/search', name: 'q', icon: 'icon-bing' },
    '3': { id: 3, title: '谷歌', url: 'https://www.google.com/search', name: 'q', icon: 'icon-google' },
    '4': { id: 4, title: '搜狗', url: 'https://www.sogou.com/web', name: 'query', icon: 'icon-sougousousuo' },
    '5': { id: 5, title: '360', url: 'https://www.so.com/s', name: 'q', icon: 'icon-360sousuo' },
    '6': { id: 6, title: '微博', url: 'https://s.weibo.com/weibo', name: 'q', icon: 'icon-xinlangweibo' },
    '7': { id: 7, title: '知乎', url: 'https://www.zhihu.com/search', name: 'q', icon: 'icon-zhihu' },
    '8': { id: 8, title: 'Github', url: 'https://github.com/search', name: 'q', icon: 'icon-github' },
    '9': { id: 9, title: 'BiliBili', url: 'https://search.bilibili.com/all', name: 'keyword', icon: 'icon-bilibilidonghua' },
    '10': { id: 10, title: '淘宝', url: 'https://s.taobao.com/search', name: 'q', icon: 'icon-taobao' },
    '11': { id: 11, title: '京东', url: 'https://search.jd.com/Search', name: 'keyword', icon: 'icon-jingdong' }
  }
  Cookies.set('se_list', defaultEngines, { expires: 36500 })
  return defaultEngines
}

function getDefaultBookmarks() {
  const local = Cookies.get('quick_list')
  if (local) {
    if (typeof local === 'string') {
      try {
        return JSON.parse(local)
      } catch {
        // JSON parse failed, use default
      }
    } else if (typeof local === 'object') {
      return local
    }
  }
  const defaultBookmarks = {
    '1': { title: 'GitHub', url: 'https://github.com/' },
    '2': { title: 'Vercel', url: 'https://vercel.com/' },
    '3': { title: 'Cloudflare', url: 'https://dash.cloudflare.com/' },
    '4': { title: 'W3school', url: 'https://www.w3school.com.cn/' },
    '5': { title: '腾讯云', url: 'https://console.cloud.tencent.com/' },
    '6': { title: '阿里云', url: 'https://console.aliyun.com/' },
    '7': { title: '百度网盘', url: 'https://pan.baidu.com/' },
    '8': { title: '阿里云盘', url: 'https://www.aliyundrive.com/drive/' },
    '9': { title: 'Office', url: 'https://www.office.com/' },
    '10': { title: 'CSDN', url: 'https://www.csdn.net/' },
    '11': { title: '哔哩哔哩', url: 'https://www.bilibili.com/' },
    '12': { title: 'MD编辑器', url: 'https://write.imsyy.top/' }
  }
  Cookies.set('quick_list', defaultBookmarks, { expires: 36500 })
  return defaultBookmarks
}

function getWallpaperType() {
  const local = Cookies.get('bg_img')
  if (local) {
    if (typeof local === 'string') {
      try {
        return JSON.parse(local).type
      } catch {
        // JSON parse failed, use default
      }
    } else if (typeof local === 'object') {
      return local.type
    }
  }
  Cookies.set('bg_img', { type: '2', path: '' }, { expires: 36500 })
  return '2'
}

function getDefaultEngine() {
  return Cookies.get('se_default') || '1'
}

function onLoadingComplete() {
  isLoading.value = false
}

function updateTime() {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  const mm = now.getMonth() + 1
  const d = now.getDate()
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const day = weekday[now.getDay()]
  currentTime.value = `${h}:${m}`
  currentDate.value = `${mm}月${d}日 ${day}`
}

function fetchWeather() {
  fetch('https://yiketianqi.com/api?unescape=1&version=v6&appid=43986679&appsecret=TksqGZT7')
    .then(res => res.json())
    .then(data => {
      weather.value = {
        wea: data.wea || 'N/A',
        tem1: data.tem1 || 'N/A',
        tem2: data.tem2 || 'N/A'
      }
    })
    .catch(() => {})
}

function selectEngine(id) {
  currentEngine.value = id
  Cookies.set('se_default', id, { expires: 36500 })
}

function handleSearch(keyword) {
  const engine = searchEngines.value[currentEngine.value]
  if (engine && keyword) {
    const url = new URL(engine.url)
    url.searchParams.set(engine.name, keyword)
    window.open(url.toString(), '_blank')
  }
}

function toggleSettings() {
  showSettings.value = !showSettings.value
  if (!showSettings.value) {
    showBookmarks.value = false
  }
}

function updateSearchEngines(engines) {
  searchEngines.value = engines
  Cookies.set('se_list', engines, { expires: 36500 })
}

function updateBookmarks(newBookmarks) {
  bookmarks.value = newBookmarks
  Cookies.set('quick_list', newBookmarks, { expires: 36500 })
}

function updateWallpaper(type) {
  wallpaperType.value = type
  Cookies.set('bg_img', { type, path: '' }, { expires: 36500 })
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  fetchWeather()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style>
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.main-content {
  opacity: 0;
  transition: opacity 1.5s ease;
}

.main-content.loaded {
  opacity: 1;
}

.main-content.loaded #section {
  opacity: 1;
}

.main-content.loaded .cover {
  opacity: 1;
}

.main-content.loaded #bg {
  transform: scale(1);
  filter: blur(0px);
}
</style>
