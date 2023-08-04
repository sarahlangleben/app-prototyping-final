<script>
import { RouterLink } from 'vue-router';
export default {
  props: {
    label: String,
    to: String,
  },
  computed: {
    isFocused() {
      return this.to == this.$route.path;
    }
  }
}
</script>

<template>
  <RouterLink :to="to" class="route-link">
    <div class="square-button d-flex flex-column align-items-center justify-content-center rounded"
      :class="{ focused: isFocused }">
      <slot />
      <span class="label">{{ label }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.square-button {
  height: 100%;
  aspect-ratio: 1/1;
}

.route-link {
  color: inherit;
}

.label {
  font-weight: bold;
  font-size: 0.8em;
}

.focused {
  background-color: var(--vt-c-indigo);
}
</style>
