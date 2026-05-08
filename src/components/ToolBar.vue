<template>
  <div class="tool-all" @click="handleClick">
    <div class="time">
      <span id="time_text">{{ time }}</span>
      <span id="day">{{ date }}</span>
    </div>
    <div class="weather">
      <span id="wea_text">{{ weather.wea }}</span>&nbsp;
      <span id="tem2">{{ weather.tem2 }}</span>°C&nbsp;~&nbsp;
      <span id="tem1">{{ weather.tem1 }}</span>°C
    </div>
  </div>
</template>

<script setup>
defineProps({
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  weather: {
    type: Object,
    default: () => ({ wea: 'N/A', tem1: 'N/A', tem2: 'N/A' })
  }
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.tool-all {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-120%);
  z-index: 1;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.time {
  color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#time_text {
  font-size: 3rem;
  margin: 6px 0px;
  text-shadow: 0px 0px 8px #00000066;
  transition: 0.2s;
}

#time_text:hover {
  transform: scale(1.08);
}

#time_text:active {
  opacity: 0.6;
  transform: scale(1.02);
}

#day {
  font-size: 1.15rem;
  opacity: 0.8;
  margin: 4px 0px;
  text-shadow: 0px 0px 8px #00000066;
}

.weather {
  color: #efefef;
  opacity: 0.8;
  font-size: 1.10rem;
  text-shadow: 0px 0px 8px #00000066;
}

.onsearch .tool-all {
  transform: translateY(-140%) !important;
}
</style>
