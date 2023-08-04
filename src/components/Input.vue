<template>
    <div>
      <input type="text" v-model="userInput" />
    </div>
  </template>

  <script>
  export default {
    inject: ['userInput', 'setUserInput']
  }
  </script>
