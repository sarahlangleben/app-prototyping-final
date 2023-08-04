<script setup>
defineProps({
  fixture: null,
  date: {
    type: String,
    required: true

  },
  collapseID: {
    type: String,
    required: true
  },
  route: null
})

</script>


<template>
  <b-card class="my-3 mx-3" variant="primary" :to="`/${route}`">
    <b-button variant="outline" class="text-start w-100" block v-b-toggle=collapseID role="tab">
      <div>
        <i-bi-megaphone />
        <b-text class="h5 px-2">{{ fixture.title }}</b-text>
      </div>
      <small>Posted on {{ this.date }}</small>
    </b-button>

    <b-collapse :id=collapseID> <b-card role="tabpanel">
        {{ fixture.description }}
      </b-card>

    </b-collapse>

  </b-card>
</template>

<style scoped>
</style>
