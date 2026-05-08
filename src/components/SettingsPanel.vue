<template>
  <div class="set">
    <div class="tabs">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-items"
        :class="{ actives: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
    <div class="contents productss">
      <div v-if="activeTab === 0" class="mainConts selected">
        <div class="set_blocks">
          <div class="set_blocks_content">
            <div class="se_list">
              <div class="se_list_table">
                <div 
                  v-for="(engine, key) in searchEngines" 
                  :key="key"
                  class="se_list_div"
                >
                  <div class="se_list_num">
                    <i v-if="key === currentEngine" class="iconfont icon-home"></i>
                    <span v-else>{{ key }}</span>
                  </div>
                  <div class="se_list_name">{{ engine.title }}</div>
                  <div class="se_list_button">
                    <button class="set_se_default" @click="setDefault(key)">
                      <span class="iconfont icon-home"></span>
                    </button>
                    <button class="edit_se" @click="editEngine(key)">
                      <span class="iconfont icon-xiugai"></span>
                    </button>
                    <button class="delete_se" @click="deleteEngine(key)">
                      <span class="iconfont icon-delete"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="se_add_preinstall">
              <div class="set_se_list_add" @click="addEngine">新增</div>
              <div class="set_se_list_preinstall" @click="resetEngines">重置</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 1" class="mainConts">
        <div class="set_blocks">
          <div class="set_blocks_content">
            <div class="quick_list">
              <div class="quick_list_table">
                <div 
                  v-for="(bookmark, key) in bookmarks" 
                  :key="key"
                  class="quick_list_div"
                >
                  <div class="quick_list_div_num">{{ key }}</div>
                  <div class="quick_list_div_name">{{ bookmark.title }}</div>
                  <div class="quick_list_div_button">
                    <button class="edit_quick" @click="editBookmark(key)">
                      <span class="iconfont icon-xiugai"></span>
                    </button>
                    <button class="delete_quick" @click="deleteBookmark(key)">
                      <span class="iconfont icon-delete"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="se_add_preinstalls">
              <div class="set_quick_list_add" @click="addBookmark">新增</div>
              <div class="set_quick_list_preinstall" @click="resetBookmarks">重置</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 2" class="mainConts">
        <div class="set_blocks">
          <div class="set_tip">
            <span class="set_text">点击下方选项以切换壁纸，刷新页面以生效</span>
          </div>
          <div class="set_blocks_content">
            <div id="wallpaper">
              <div v-for="option in wallpaperOptions" :key="option.value" class="form-radio">
                <input 
                  type="radio" 
                  :id="'radio' + option.value" 
                  class="set-wallpaper"
                  name="wallpaper-type" 
                  :value="option.value"
                  :checked="wallpaperType === option.value"
                  @change="changeWallpaper(option.value)"
                />
                <label class="form-radio-label" :for="'radio' + option.value">
                  {{ option.label }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 3" class="mainConts">
        <div class="set_blocks">
          <div class="set_tip">
            <span class="set_text">点击导出会将本站文件导出至下载目录</span>
            <span class="set_text">点击导入可选择已备份文件进行恢复</span>
          </div>
          <div class="set_button">
            <div class="but-ordinary" id="my_data_out" @click="exportData">导出</div>
            <div class="but-ordinary" id="my_data_in" @click="importData">导入</div>
            <input type="file" id="my_data_file" name="file" style="display: none" @change="handleFileImport" />
          </div>
          <div class="set_version">
            <span class="set_version-text">MADE BY Kobayashi</span>
            <span class="set_version-text2">© Kobayashi v 1.0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Cookies from 'js-cookie'

const props = defineProps({
  searchEngines: {
    type: Object,
    required: true
  },
  bookmarks: {
    type: Object,
    required: true
  },
  wallpaperType: {
    type: String,
    default: '2'
  }
})

const emit = defineEmits(['close', 'update-engines', 'update-bookmarks', 'update-wallpaper'])

const tabs = ['搜索引擎', '快捷方式', '背景图片', '数据备份']
const activeTab = ref(0)

const wallpaperOptions = [
  { value: '1', label: '默认壁纸' },
  { value: '2', label: '每日必应' },
  { value: '3', label: '随机风景' },
  { value: '4', label: '随机二次元' }
]

const currentEngine = ref(Cookies.get('se_default') || '1')

function setDefault(key) {
  currentEngine.value = key
  Cookies.set('se_default', key, { expires: 36500 })
}

function addEngine() {
  const newKey = String(Object.keys(props.searchEngines).length + 1)
  const newEngine = {
    id: parseInt(newKey),
    title: '新搜索引擎',
    url: 'https://www.example.com/search',
    name: 'q',
    icon: 'icon-wangluo'
  }
  const updated = { ...props.searchEngines, [newKey]: newEngine }
  emit('update-engines', updated)
}

function editEngine(key) {
  const engine = props.searchEngines[key]
  if (engine) {
    const title = prompt('请输入搜索引擎名称:', engine.title)
    const url = prompt('请输入搜索引擎URL:', engine.url)
    if (title || url) {
      const updated = { ...props.searchEngines }
      updated[key] = {
        ...engine,
        title: title || engine.title,
        url: url || engine.url
      }
      emit('update-engines', updated)
    }
  }
}

function deleteEngine(key) {
  if (key === currentEngine.value) {
    alert('默认搜索引擎不可删除')
    return
  }
  if (confirm(`确定删除搜索引擎 ${key} 吗?`)) {
    const updated = { ...props.searchEngines }
    delete updated[key]
    emit('update-engines', updated)
  }
}

function resetEngines() {
  if (confirm('确定重置搜索引擎吗？现有数据将被清空')) {
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
    emit('update-engines', defaultEngines)
    Cookies.set('se_default', '1', { expires: 36500 })
    currentEngine.value = '1'
  }
}

function addBookmark() {
  const newKey = String(Object.keys(props.bookmarks).length + 1)
  const title = prompt('请输入网站名称:')
  const url = prompt('请输入网站URL:')
  if (title && url) {
    const updated = { ...props.bookmarks, [newKey]: { title, url } }
    emit('update-bookmarks', updated)
  }
}

function editBookmark(key) {
  const bookmark = props.bookmarks[key]
  if (bookmark) {
    const title = prompt('请输入网站名称:', bookmark.title)
    const url = prompt('请输入网站URL:', bookmark.url)
    if (title || url) {
      const updated = { ...props.bookmarks }
      updated[key] = {
        title: title || bookmark.title,
        url: url || bookmark.url
      }
      emit('update-bookmarks', updated)
    }
  }
}

function deleteBookmark(key) {
  if (confirm(`确定删除快捷方式 ${key} 吗?`)) {
    const updated = { ...props.bookmarks }
    delete updated[key]
    emit('update-bookmarks', updated)
  }
}

function resetBookmarks() {
  if (confirm('确定重置快捷方式吗？现有数据将被清空')) {
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
    emit('update-bookmarks', defaultBookmarks)
  }
}

function changeWallpaper(type) {
  emit('update-wallpaper', type)
}

function exportData() {
  const cookies = Cookies.get()
  const json = JSON.stringify(cookies, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Kobayashi-backup-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importData() {
  document.getElementById('my_data_file').click()
}

function handleFileImport(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (confirm('确定导入数据吗？现有数据将被覆盖')) {
          for (const key in data) {
            Cookies.set(key, data[key], { expires: 36500 })
          }
          window.location.reload()
        }
      } catch {
        alert('数据解析失败')
      }
    }
    reader.readAsText(file)
  }
}
</script>

<style scoped>
.set {
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

.tabs {
  height: 40px;
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tab-items {
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

.tab-items:hover {
  border-bottom-color: #efefef80;
}

.tab-items.actives {
  border-bottom-color: #efefef;
}

.productss {
  width: 100%;
  height: 100%;
}

.mainConts {
  display: none;
  width: 100%;
}

.mainConts.selected {
  display: flex;
}

.set_blocks {
  width: 100%;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.set_blocks_content {
  display: flex;
  margin: 20px;
  height: 430px;
  flex-direction: column;
  justify-content: space-between;
}

.se_list,
.quick_list {
  height: 260px;
  overflow-y: auto;
}

.se_list_table,
.quick_list_table {
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
}

.se_list_div,
.quick_list_div {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  background: #00000040;
  border-radius: 8px;
  transition: 0.3s;
}

.se_list_div:hover,
.quick_list_div:hover {
  background: #acacac60;
}

.se_list_num,
.quick_list_div_num {
  height: 40px;
  width: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000040;
  border-radius: 8px;
  color: #efefef;
}

.se_list_name,
.quick_list_div_name {
  width: 100%;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #efefef;
}

.se_list_button,
.quick_list_div_button {
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.se_list_button button,
.quick_list_div_button button {
  width: 40px;
  height: 100%;
  background: #ffffff40;
  border: 1px solid transparent;
  transition: 0.3s;
  cursor: pointer;
  color: #efefef;
}

.se_list_button button:hover,
.quick_list_div_button button:hover {
  background: #00000030;
}

.se_list_button button:first-child {
  border-radius: 8px 0px 0px 8px;
}

.se_list_button button:last-child,
.quick_list_div_button button:last-child {
  border-radius: 0px 8px 8px 0px;
}

.se_add_preinstall,
.se_add_preinstalls {
  display: flex;
  justify-content: center;
}

.set_se_list_add,
.set_se_list_preinstall,
.set_quick_list_add,
.set_quick_list_preinstall {
  width: 25%;
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: #00000040;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  color: #efefef;
}

.set_se_list_add:hover,
.set_se_list_preinstall:hover,
.set_quick_list_add:hover,
.set_quick_list_preinstall:hover {
  background: #acacac60;
}

.set_tip {
  display: flex;
  margin: 20px;
  background: #00000040;
  padding: 20px;
  border-radius: 8px;
  flex-direction: column;
}

.set_text {
  color: #efefef;
  margin-bottom: 5px;
}

#wallpaper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.form-radio {
  margin: 0px 10px 10px 0px;
}

input[type="radio"] + label {
  cursor: pointer;
  padding: 6px 10px;
  background: #00000040;
  border-radius: 8px;
  transition: 0.3s;
  border: 2px solid transparent;
  color: #efefef;
}

input[type="radio"]:checked + label {
  background: #8a8a8a80;
  border-color: #8a8a8a80;
}

.set_button {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.but-ordinary {
  width: 25%;
  display: flex;
  height: 40px;
  border-radius: 8px;
  background: #00000040;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  color: #efefef;
}

.but-ordinary:hover {
  background: #acacac60;
}

.set_version {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.set_version-text2 {
  font-size: small;
  color: #8a8a8a80;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
