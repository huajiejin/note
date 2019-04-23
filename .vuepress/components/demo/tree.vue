<template lang="pug">
  .tree
    span(v-text="data.name")
    tree(v-if="data.child" v-for="(item, i) in data.child" :key="i" :data="item")
</template>

<script>
export default {
  name: 'tree',
  props: {
    data: {
      default: {},
      type: Object,
    }
  }
}
</script>
