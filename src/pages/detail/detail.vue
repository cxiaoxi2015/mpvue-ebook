<!-- 图书详情 -->
<template>
  <div class="detail">
    <DetailBook :book="book" />
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg" />
    <DetailRate
      :rate-value="book.rateValue"
      @onRateChange="onRateChange"
    />
    <DetailContents
      :contents="contents"
      @readBook="readBook"
    />
    <DetailBottom
      :is-in-shelf="isInShelf"
      @handleShelf="handleShelf"
    />
  </div>
</template>
<script>
import DetailBook from '@/components/detail/DetailBook'
import DetailStat from '@/components/detail/DetailStat'
import DetailRate from '@/components/detail/DetailRate'
import DetailContents from '../../components/detail/DetailContents'
import DetailBottom from '../../components/detail/DetailBottom'
import {
  bookDetail,
  bookRankSave,
  bookContents,
  bookIsInShelf,
  bookShelfSave
} from '../../api'
import {getStorageSync} from '../../api/wechat'

export default {
  name: 'detail',
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  props: {},
  data() {
    return {
      book: {},
      contents: [],
      isInShelf: false
    }
  },
  methods: {
    onRateChange(value) {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookRankSave({
        openId,
        fileName,
        rank: value
      }).then(res => {

      })
    },
    getBookDetail() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookDetail({ openId, fileName })
        .then(res => {
          this.book = res.data.data
        })
    },
    getBookContents() {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({
          fileName
        }).then(res => {
          this.contents = res.data.data
        })
      }
    },
    readBook(href) {
      console.log(href)
    },
    bookIsInShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookIsInShelf({
          openId,
          fileName
        }).then(res => {
          const { data } = res.data
          if (!data.length) {
            this.isInShelf = false
          } else {
            this.isInShelf = true
          }
        })
      }
    },
    handleShelf() {
      if (!this.isInShelf) {
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        bookShelfSave({
          openId,
          fileName
        }).then(res => {
          this.bookIsInShelf()
        })
      } else {
        mpvue.showModal({
          title: '提示',
          content: `是否将《${this.book.title}》移除书架？`,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {}
          }
        })
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.getBookDetail()
    this.getBookContents()
    this.bookIsInShelf()
  }
}
</script>

<style lang="scss" scoped>
  .detail {}
</style>
