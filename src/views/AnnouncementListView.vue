
<script>
import moment from 'moment';
import Announcement from '@/components/Announcement.vue';
export default {
  data() {

  },
  methods: {
    formattedDate(d) {
      return moment(new Date(d)).format('lll')
    },
    formatID(id) {
      return "my-collapse" + id
    }

  }
}
</script>

<template>
  <div class='title'>
    <h2>Announcements</h2>
  </div>
  <!--
    <div v-for="(fixture, route) in this.fixtures.annData">
      <b-container fluid class="mx-3">
        <b-row class="my-3  w-100">
          <b-card :title="`${fixture.title}`" variant="primary" :to="`/${route}`">
            :footer="`${this.formattedDate(fixture.time)}`"
            <b-card-text>{{ fixture.description }}</b-card-text>
            <small>Posted on {{ this.formattedDate(fixture.time) }}</small>

          </b-card>

        </b-row>
      </b-container>

    </div> -->


  <div class="accordian" role="tablist" v-for="(fixture, route) in this.fixtures.annData">
    <Announcement :fixture=fixture :date=this.formattedDate(fixture.time) :collapseID=formatID(fixture.id) :route=route>
    </Announcement>
  </div>
</template>

<style>
.title {
  margin: 1em 1em 1em 1em;
}
</style>
