<!-- 搜索 -->
<template>
  <div class="search">
    <SearchBar
      :focus="searchFocus"
      @onChange="onChange"
    />
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearch"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearch.length && !showList" />
    <TagGroup
      header-text="历史搜索"
      tn-text="清空"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchKeyWord"
      v-if="historySearch.length && !showList" />
    <SearchList
      :data="searchList"
      v-if="showList"
    ></SearchList>
  </div>
</template>
<script>
  import SearchList from '../../components/search/SearchList'
  import SearchBar from '../../components/home/SearchBar'
  import TagGroup from '../../components/base/TagGroup'
  import { getStorageSync } from '../../api/wechat'
  import { search } from '../../api'

  export default {
    name: 'search',
    components: {
      SearchList,
      SearchBar,
      TagGroup
    },
    props: {},
    data() {
      return {
        hotSearch: [],
        historySearch: [],
        searchList: {},
        searchFocus: true,
        openId: ''
      }
    },
    methods: {
      changeHotSearch() {
        console.log('change hot search')
      },
      showBookDetail() {
        console.log('show book detail')
      },
      clearHistorySearch() {},
      searchKeyWord() {},
      onChange(keyword) {
        if (!keyword || keyword.trim().length === 0) {
          return
        }
        this.onSearch(keyword)
      },
      onSearch(keyword) {
        console.log('onSearch')
        search({
          keyword, openId: this.openId
        }).then(res => {
          this.searchList = res.data.data
          console.log(this.searchList)
        })
      }
    },
    watch: {},
    computed: {
      data() {
        return {
          item: this.item,
          list: this.list
        }
      },
      showList() {
        const keys = Object.keys(this.searchList)
        return keys.length > 0
      }
    },
    mounted() {
      this.openId = getStorageSync('openId')
    }
  }
</script>

<style lang="scss" scoped>
  .search {
  }
</style>
