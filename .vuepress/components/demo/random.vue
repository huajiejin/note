<template lang="pug">
  .random
    .head
      .item(v-for="(item, i) in list" :key="i" v-text="item")
    .footer
      button(@click="handleSelect") 选一个
</template>

<script>
export default {
  name: 'random',
  data () {
    return {
      list: ['']
    }
  },
  method: {
    handleSelect () {
      
    }
  }
}
</script>
