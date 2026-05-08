<template>
  <div class="bg-all">
    <img 
      id="bg" 
      :src="src" 
      @error="handleError"
      :class="{ error: hasError }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: {
    type: String,
    required: true
  }
})

const hasError = ref(false)

function handleError() {
  hasError.value = true
}
</script>

<style scoped>
.bg-all {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .25s;
}

#bg {
  transform: scale(1.10);
  filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

img.error {
  display: none;
}
</style>
