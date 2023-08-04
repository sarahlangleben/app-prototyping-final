<script>
import dateFormat from 'dateformat';
import { groupEvents, getEventPositionStyle, calculateEndOfEventGroup, areEventsOverlapping, DEFAULT_TIMEBLOCK_HEIGHT } from '../helpers/itinerary-utils';
import TimeBlocks from '../components/TimeBlocks.vue';

const TODAYS_DATE_TIMESTAMP = 1681358400000; // Thursday, April 13th
const OVERLAP_OFFSET = 20;
const TIMEBLOCK_HEIGHT = 70;

export default {
  data() {
    return {
      times: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "Noon", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
      eventGroupsWithStyling: [],
      timeBlockHeight: DEFAULT_TIMEBLOCK_HEIGHT,
      timeLabelOffset: 43,
    };
  },
  inject: ["toggleEventInfoModal"],
  computed: {
    /**
     * @returns {String} Today's date formatted string.
     */
    formattedDateToday() {
      return dateFormat(new Date(TODAYS_DATE_TIMESTAMP), "dddd, mmmm dS");
    }
  },
  created() {
    const eventList = Object.values(this.fixtures.itineraryData);
    const eventGroups = groupEvents(eventList);
    const eventGroupsWithStyling = eventGroups.reduce((prevGroups, curGroup, index) => {
      const endOfGroup = calculateEndOfEventGroup(curGroup);
      const endOfPrevGroup = index > 0 ? calculateEndOfEventGroup(prevGroups[index - 1]) : -1;
      const isOverlapping = areEventsOverlapping({ startTimestamp: curGroup.startTimestamp, endTimestamp: endOfGroup }, { startTimestamp: index > 0 ? prevGroups[index - 1].startTimestamp : -1, endTimestamp: endOfPrevGroup });
      const offset = index > 0 && isOverlapping ? prevGroups[index - 1].offset + 1 : 0;
      prevGroups.push({
        ...curGroup,
        offset,
        groupStyle: {
          paddingLeft: `${offset * OVERLAP_OFFSET}px`,
        },
        events: curGroup.events.map((curEvent, index) => {
          const span = 12 / curGroup.events.length;
          return {
            ...curEvent,
            startFormatted: dateFormat(curEvent.startTimestamp, "h:MM TT"),
            endFormatted: dateFormat(curEvent.endTimestamp, "h:MM TT"),
            style: getEventPositionStyle({
              event: curEvent,
              startOfDayTimestamp: TODAYS_DATE_TIMESTAMP,
              span,
              colStart: span * index,
              colGap: 10,
              timeBlockHeight: TIMEBLOCK_HEIGHT
            }),
          };
        }, []).sort((a, b) => a.startTimestamp - b.startTimestamp)
      });
      return prevGroups;
    }, []);
    this.eventGroupsWithStyling = eventGroupsWithStyling;
  },
  mounted() {
    const firstEvent = this.eventGroupsWithStyling[0].events[0];
    const firstEventRefId = `event-${firstEvent.id}`;
    const offset = 150;
    window.scrollTo({
      behavior: "smooth",
      top: this.$refs[firstEventRefId][0].getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        offset,
    });
  },
  methods: {
    /**
    * @param {{ title: String; startTimestamp: number; endTimestamp: number; }} eventInfo
    */
    handleEventClick(eventInfo) {
      this.toggleEventInfoModal(eventInfo.id);
    },
  },
  components: { TimeBlocks }
}
</script>

<template>
  <div class='content'>
    <div class='title'>
      <h2>Your Itinerary</h2>
      <h4>{{ formattedDateToday }}</h4>
    </div>
    <div class="position-relative">
      <TimeBlocks :time-block-height="timeBlockHeight" :time-label-offset="timeLabelOffset" />
      <div class="events-container"
        :style="`--time-block-height:${timeBlockHeight}px; --time-label-offset:${timeLabelOffset}px`">
        <template v-for='group in eventGroupsWithStyling'>
          <div :style="group.groupStyle">
            <template v-for='event in group.events'>
              <div>
                <div class="position-absolute" :style="event.style" :ref="`event-${event.id}`">
                  <div class='event' :class="{ small: event.style.heightValue < 50 }"
                    v-on:click="handleEventClick(event)">
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 0 1em;
}

.title {
  position: sticky;
  z-index: 99;
  top: 0em;
  padding: 1em 0;
  margin-bottom: 1em;
  background: white;
  background: linear-gradient(180deg, white 0%, white 80%, rgba(255, 255, 255, 0) 100%);

}

.events-container {
  padding-left: calc(var(--time-label-offset) + 1em);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.event {
  scroll-margin-top: 200px;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  border-radius: 0.3em;
  background-color: rgba(255, 0, 0, 0.1);
  border-left: rgba(192, 0, 0, 0.8) 3px solid;
}

.event.small {
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  font-size: 0.7em;
}
</style>
