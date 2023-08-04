<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'
import dateFormat from 'dateformat';
// import blob from '../forum-fixtures.json'
</script>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  inject: ["userForumPosts", "addUserForumPost", "userForumThreads"],
  methods: {
    handleOnSubmit() {
      this.addUserForumPost(this.message);
    }
  }
}
</script>
<template>
  <b-form class="form" @submit.prevent="handleOnSubmit">

    <h1>Forum</h1>
    <h4>New Question</h4>
    <b-input-group id="question-input">
      <b-form-input v-model="message" name="message"></b-form-input>
      <b-button type="submit">Post</b-button>
    </b-input-group>
  </b-form>
  <router-link
    v-for="post in userForumPosts" :key="post.id"
    :to="`/forum-thread/${post.id}`">
    <div class="post-card" >
      <div class="post-content">
        <h5>{{ post.content }}</h5>
        <p class="post-timestamp">{{ dateFormat(new Date(post.timestamp), "dddd, mmmm dS, h:MM TT") }}</p>
        <p class="post-replied">{{ userForumThreads[post.id]?.length  || 0 }} replies</p>
      </div>
      <div class="chevron">
        <b-button variant="link">
          <PhCaretRight :size="18" color="black"/>
        </b-button>
      </div>
    </div>
  </router-link>

</template>
<style scoped>

.post-card{
  background-color: white;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 6px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgb(221, 221, 221);
  margin: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black
}
.form{
  margin: 24px;
}
.post-timestamp{
  color: rgb(105, 105, 105);
  margin-bottom: 8px;
}
.chevron{
  margin-left: auto;
  margin-right: 0;
}
p{
  margin: 0px;
  padding: 0px;
}
</style>
