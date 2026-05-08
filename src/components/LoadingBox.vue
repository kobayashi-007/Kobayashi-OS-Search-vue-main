<template>
  <div id="loading-box">
    <div class="loading-left-bg"></div>
    <div class="loading-right-bg"></div>
    <div class="spinner-box">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
      <div class="loading-word">
        <p class="loading-title">Kobayashi</p>
        <span id="loading-text">{{ loadingText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['complete'])

const loadingText = ref('加载中')

const texts = ['加载中', '初始化...', '准备就绪']

onMounted(() => {
  let index = 0
  const interval = setInterval(() => {
    index++
    if (index < texts.length) {
      loadingText.value = texts[index]
    } else {
      clearInterval(interval)
      setTimeout(() => {
        document.getElementById('loading-box')?.classList.add('loaded')
        setTimeout(() => {
          emit('complete')
        }, 700)
      }, 500)
    }
  }, 600)
})
</script>

<style scoped>
#loading-box .loading-left-bg,
#loading-box .loading-right-bg {
  position: fixed;
  z-index: 999998;
  width: 50%;
  height: 100%;
  background-color: rgb(81 81 81 / 80%);
  transition: all 0.7s cubic-bezier(0.42, 0, 0, 1.01);
  backdrop-filter: blur(10px);
}

#loading-box .loading-right-bg {
  right: 0;
}

#loading-box > .spinner-box {
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#loading-box .spinner-box .loading-word {
  position: absolute;
  color: #ffffff;
  font-size: 0.95rem;
  transform: translateY(64px);
  text-align: center;
}

p.loading-title {
  font-size: 1.25rem;
  margin: 20px 10px 4px 10px;
}

div.loaded div.loading-left-bg {
  transform: translate(-100%, 0);
}

div.loaded div.loading-right-bg {
  transform: translate(100%, 0);
}

div.loaded div.spinner-box {
  display: none !important;
}

.loader {
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
  transition: all 0.7s cubic-bezier(0.42, 0, 0, 1.01);
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #EFEFFA;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #EFEFFA;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #EFEFFA;
}

@keyframes rotate-one {
  0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
  100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
}

@keyframes rotate-two {
  0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
  100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
}

@keyframes rotate-three {
  0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
  100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
}
</style>
