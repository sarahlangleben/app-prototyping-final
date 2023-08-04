<script setup>
import dateFormat from 'dateformat';
</script>

<script>
export default {
  data() {
    return {
      reply: ''
      }
  },
  inject: ["userForumThreads", "addUserForumThreadResponse", "userForumPosts"],
  computed: {
    post() {
      return this.userForumPosts.find((e => e.id == this.$route.params.forum_id))
    }
  },
  methods: {
    handleOnSubmit(){
        this.addUserForumThreadResponse(this.$route.params.forum_id, this.reply);
        console.log(this.userForumThreads);
    }
  },
}
</script>

<template>

  <div class="body">
    <div class="back-button">
      <b-button to="/forum" variant="primary">Back to Forum</b-button>
    </div>
    <div class="post-content">
      <h5>{{ post.content }}</h5>
      <p>{{ dateFormat(new Date(Number.parseInt(post.timestamp)), "dddd, mmmm dS, h:MM TT") }}</p>
    </div>
    <b-form class="reply-form" @submit.prevent="handleOnSubmit">
      <b-input-group id="question-input">
        <b-form-input v-model="reply" name="reply"></b-form-input>
        <b-button type="submit">Reply</b-button>
      </b-input-group>
    </b-form>

    <h4>Replies</h4>
    <hr>

    <div class="reply-card" v-for="reply in userForumThreads[$route.params.forum_id]" :key="reply.id">
      <div class="reply-content">
        <p class="reply-text">{{ reply.responseContent }}</p>
        <p class="reply-timestamp">{{ dateFormat(new Date(reply.timestamp), "dddd, mmmm dS, h:MM TT") }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.body{
  margin: 24px;
}
.back-button{
  margin-bottom: 24px;
}
.post-content{
  margin-bottom: 24px;
}
.reply-form{
  margin-bottom: 12px;
}
.reply-content{
  margin-bottom: 12px;
}
.reply-content p{
  margin-bottom: 0px;
}
.reply-text{
  font-weight: bold;
}
</style>
