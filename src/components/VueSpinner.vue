<template>
  <div class="loading-cover">
    <spinner size="huge"></spinner>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'

export default {
  name: 'loading-component',
  components: { Spinner },
  data() {
    return {
      color: '#777',
    }
  }
}
</script>