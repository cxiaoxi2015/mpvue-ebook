<!-- list -->
<template>
  <div>
    <SearchTable :data="data" @onClick="onBookClick"></SearchTable>
  </div>
</template>
<script>
import { searchList } from '../../api'
import SearchTable from '../../components/search/SearchTable'
import {setNavigationBarTitle, showToast} from '../../api/wechat'

export default {
  name: 'list',
  components: {
    SearchTable
  },
  props: {},
  data() {
    return {
      data: [],
      page: 1
    }
  },
  methods: {
    getSearchList() {
      const { key, text } = this.$route.query
      const params = {}
      if (key && text) {
        params[key] = text
      }
      params.page = this.page
      searchList(params)
        .then(res => {
          const { data } = res.data
          if (data.length) {
            this.data.push(...data)
          } else {
            showToast('没有更多数据了')
          }
        })
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.getSearchList()
    const { title } = this.$route.query
    setNavigationBarTitle(title)
  },
  onReachBottom() {
    this.page++
    this.getSearchList()
  }
}
</script>

<style lang="scss" scoped>
  .list {}
</style>
