<script setup>
import { PhCaretRight, PhCurrencyCircleDollar, PhFile } from '@phosphor-icons/vue';
import dateFormat from 'dateformat';
</script>

<script>
const TODAYS_DATE_TIMESTAMP = 1681401600000; // Thursday, April 13th, 12:00 PM
export default {
  computed: {
    nearestEvent() {
      const eventList = Object.values(this.fixtures.itineraryData);
      const nearestEvent = eventList.map((event) => {
        return { ...event, distanceToToday: event.startTimestamp - TODAYS_DATE_TIMESTAMP };
      }).reduce((previousClosestEvent, currentEvent) => {
        if (!!previousClosestEvent)
          return currentEvent;
        if (currentEvent.distanceToToday < previousClosestEvent.distanceToToday)
          return currentEvent;
        return previousClosestEvent;
      });
      return nearestEvent;
    },
    nearestAnnouncement() {
      const announcementList = Object.values(this.fixtures.annData);
      const nearestAnnouncement = announcementList.map((announcement) => {
        return {
          ...announcement,
          distanceToToday: announcement.time - TODAYS_DATE_TIMESTAMP
        };
      }).reduce((previousClosestAnnouncement, currentAnnouncement) => {
        if (!!previousClosestAnnouncement)
          return currentAnnouncement;
        if (currentAnnouncement.distanceToToday < previousClosestAnnouncement.distanceToToday)
          return currentAnnouncement;
        return previousClosestAnn;
      });
      return nearestAnnouncement;
    }
  },
  components: { PhCaretRight, PhCurrencyCircleDollar, PhFile }
}
</script>

<template>
  <main>
    <h1>Welcome, Kylie!</h1>
    <h5>To PhD Visit Day 2024</h5>
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <h3>Upcoming Events</h3>
        <router-link to="/itinerary">
          <b-text>
            More
            <PhCaretRight :size="16" weight="bold" />
          </b-text>
        </router-link>
      </div>
      <b-card variant="primary" class="shadow">
        <b-card-body :title="nearestEvent.title">
          <b-card-text>
            {{ nearestEvent.description }}
          </b-card-text>
          <small>From {{ dateFormat(nearestEvent.startTimestamp, 'h:MM TT, dddd, mmmm dS') }} to {{
            dateFormat(nearestEvent.endTimestamp, 'h:MM TT, dddd, mmmm dS') }}</small>
        </b-card-body>
      </b-card>
    </div>
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <h3>Announcements</h3>
        <router-link to="/announcements">
          <b-text>
            More
            <PhCaretRight :size="16" weight="bold" />
          </b-text>
        </router-link>
      </div>
      <b-card variant="primary" class="shadow">
        <b-card-body :title="nearestAnnouncement.title">
          <b-card-text>
            {{ nearestAnnouncement.description }}
          </b-card-text>
          <small>{{ dateFormat(nearestAnnouncement.time, 'h:MM TT, dddd, mmmm dS') }}</small>
        </b-card-body>
      </b-card>
    </div>
    <h3>Quick Links</h3>
    <div class="d-flex flex-wrap gap-3">
      <b-card class="text-center flex-grow-1">
        <PhCurrencyCircleDollar :size="40" />
        <b-card-text>
          Reimbursement
        </b-card-text>
      </b-card>
      <b-card class="text-center flex-grow-1">
        <img src="/images/ithaca-transit.png" alt="Card image">
        <b-card-text>
          Ithaca Transit
        </b-card-text>
      </b-card>
      <b-card class="text-center flex-grow-1">
        <PhFile :size="40" />
        <b-card-text>
          Schedule pdf
        </b-card-text>
      </b-card>
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin-top: 20px;
}

main {
  margin: 10px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.images {
  display: flex;
  flex-direction: row;
}

button {
  margin-left: 20px;
  border: none;
  background-color: white;
  text-decoration: underline;
}

.button {
  margin-left: 20px;
}
</style>
