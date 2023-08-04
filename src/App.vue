<script setup>
import { RouterView } from 'vue-router'
import { PhCalendar, PhChat, PhHouse } from '@phosphor-icons/vue'
import TabBarIcon from './components/TabBarIcon.vue'
import EventInfoModal from './components/modals/EventInfoModal.vue'
import dummyPosts from "./data/dummy-posts.json";
import moment from 'moment'
</script>

<script>
export default {
  components: {
    EventInfoModal
  },
  data() {
    return {
      userForumPosts: [
        {"content": "This is an example question...", "timestamp":1519129853500, "id":1519129853500},
      ],
      userForumThreads: {
        1519129853500: [{"id": Date.now(), "responseContent": "...and this is an example answer!",
        "timestamp": Date.now() }]
      }
    }
  },
  provide() {
    return {
      /**
       * @param {String} content The content of the forum post
       */
      addUserForumPost: (content) => {
        const timestamp = Date.now();
        this.userForumPosts.push({ content, timestamp, id: timestamp });
      },
      userForumPosts: this.userForumPosts,

      /**
       * @param {String} postId The post ID for the reponse
       * @param {String} responseContent The content of a response in a forum
       */
      addUserForumThreadResponse: (postId, responseContent) => {
        // This defines a new thread for replies if it does not already exist.
        if (!this.userForumThreads[postId])
          this.userForumThreads[postId] = []
        const timestamp = Date.now();
        this.userForumThreads[postId].unshift({ responseContent, timestamp, id: timestamp});
      },
      userForumThreads: this.userForumThreads
    }
  }
}
</script>

<template>
  <div class="content-wrapper">
    <main class="main">
      <RouterView />
      <EventInfoModal ref="eventInfoModal" :event-id="currentEventInfoModalId" />
    </main>
    <nav class="nav-bar fixed-bottom w-100 d-flex p-2 justify-content-around">
      <TabBarIcon to="/" label="Home">
        <PhHouse :size="28" />
      </TabBarIcon>
      <TabBarIcon to="/itinerary" label="Itinerary">
        <PhCalendar :size="28" />
      </TabBarIcon>
      <TabBarIcon to="/forum" label="Forum">
        <PhChat :size="28" />
      </TabBarIcon>
    </nav>
  </div>
</template>

<style scoped>
.content-wrapper {
  --tab-bar-height: 80px;
}

.main {
  min-height: 100vh;
  padding-bottom: var(--tab-bar-height);
}

.nav-bar {
  background-color: var(--vt-c-black-soft);
  color: var(--vt-c-white);
  height: var(--tab-bar-height);
  padding: 0.5em;
}

</style>
