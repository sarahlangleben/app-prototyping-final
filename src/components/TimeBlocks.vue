<script>
export default {
  props: {
    timeBlockHeight: Number,
    timeLabelOffset: Number
  },
  data() {
    return {
      times: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 'Noon', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    }
  }
}
</script>

<template>
  <template v-for='time in times'>
    <div class='time-block' :style="`--time-block-height:${timeBlockHeight}px; --time-label-offset:${timeLabelOffset}px`">
      <div class="position-absolute top time-block-label w-100 d-flex align-items-center">
        <span class="time-label position-absolute">{{ time }}</span>
        <div class="separator flex-grow-1 border-bottom" />
      </div>
    </div>
  </template>
  <div class='last-time-block'
    :style="`--time-block-height:${timeBlockHeight}px; --time-label-offset:${timeLabelOffset}px`">
    <div class="position-absolute top time-block-label w-100 d-flex align-items-center">
      <span class="time-label position-absolute">12 AM</span>
      <div class="separator flex-grow-1 border-bottom" />
    </div>
  </div>
</template>

<style scoped>
.time-block {
  height: var(--time-block-height);
}

.last-time-block {
  height: 15px;
}

.time-label {
  width: var(--time-label-offset);
  text-align: right;
}

.separator {
  margin-left: calc(var(--time-label-offset) + 1em);
}
</style>
