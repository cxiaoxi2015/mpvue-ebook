<!-- 搜索框 -->
<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <van-icon
        class="search"
        name="search"
        size="16px"
        color="#858C96"></van-icon>
      <input
        class="search-bar-input"
        v-model="searchWord"
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="!hotSearch.length ? '搜索' : hotSearch"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
        placeholder-style="color: #ADB4BE;font-size: 15px;"
      />
      <van-icon
        class="clear"
        name="clear"
        size="16px"
        color="#ccc"
        @click="onClearClick"
        v-if="searchWord.length"
      ></van-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  components: {},
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick() {
      this.$emit('onClick')
    },
    onClearClick() {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange(e) {
      const { value } = e.mp.detail
      this.$emit('onChange', value)
    },
    onConfirm(e) {
      const { value } = e.mp.detail
      this.$emit('onConfirm', value)
    },
    setValue(v) {
      this.searchWord = v
    },
    getValue(v) {
      return this.searchWord
    }
  },
  watch: {},
  computed: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
  .search-bar {
    padding: 15px 15.5px;
    .search-bar-wrapper {
      display: flex;
      align-items: center;
      height: 40px;
      background: #F5F7F9;
      border-radius: 20px;
      padding: 12px 16.5px;
      box-sizing: border-box;
      .search-bar-input {
        flex: 1;
        margin: 0 8px;
      }
      .search,
      .clear {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
