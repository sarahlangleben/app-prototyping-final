<script>
export default {
    data(){
        return{
            reply: ''
        }
    },
    inject: ["userResponsePosts", "addUserResponse"],
    methods: {
        handleOnSubmit() {
            this.addUserResponse(this.reply);
        }
    }
}
</script>

<template>
    <h1>Respond to Forum Question</h1>
    <form @submit.prevent>
        <label>Reply</label>
        <input v-model="reply">
        <button @click="handleOnSubmit">Reply</button>
    </form>

</template>
