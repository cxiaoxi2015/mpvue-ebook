<!-- Tag -->
<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tag">{{ text }}</div>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  components: {},
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$emit('onClick', this.text)
    }
  },
  watch: {},
  computed: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
  .tag-wrapper {
    display: flex;
    justify-content: center;
    background: #F7F7F9;
    border-radius: 16px;
    padding: 6px 17px;
    width: 100%;
    box-sizing: border-box;
    .tag {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: #272E37;
    }
  }
</style>
