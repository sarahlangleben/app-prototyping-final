<script setup>
import swipeModal from '@takuma-ru/vue-swipe-modal'
import { PhMapPin } from '@phosphor-icons/vue';
import dateFormat from 'dateformat';
</script>

<script>
export default {
  props: {
    eventId: String,
  },
  data() {
    return {
      showEventInfoModal: false,
    }
  },
  computed: {
    eventInfo() {
      return this.fixtures.itineraryData[this.eventId];
    },
    dayFormatted() {
      return dateFormat(new Date(this.eventInfo.startTimestamp), 'dddd, mmm dS, yyyy')
    },
    timeRangeFormatted() {
      const startTime = dateFormat(new Date(this.eventInfo.startTimestamp), 'h:MM TT');
      const endTime = dateFormat(new Date(this.eventInfo.endTimestamp), 'h:MM TT');
      return `from ${startTime} to ${endTime}`
    }
  },
  methods: {
    toggleModal() {
      this.showEventInfoModal = !this.showEventInfoModal;
    }
  },
  expose: ['toggleModal']
}
</script>

<template>
  <swipe-modal v-model="showEventInfoModal" contents-height="60vh" border-top-radius="16px">
    <div class="pt-1 px-3">
      <h2 class="font-weight-bold">{{ eventInfo.title }}</h2>
      <div class="d-flex gap-1 align-items-center mb-2">
        <ph-map-pin :size="18" />
        <p class="mb-0">{{ eventInfo.location }}</p>
      </div>
      <div class="d-flex flex-column mb-2">
        <p class="m-0 text-gray">{{ dayFormatted }}</p>
        <p class="m-0 text-gray">{{ timeRangeFormatted }}</p>
      </div>
      <p>{{ eventInfo.description }}</p>
    </div>
  </swipe-modal>
</template>

<style>
.text-gray {
  color: rgb(89, 89, 89);
}
</style>
