<!-- SearchList -->
<template>
  <div class="search-list-wrapper">
    <SearchItem
      icon="apps-o"
      :title="category"
      sub-title="Category"
      @onClick="showList(category.title, 'category')"
      v-if="category" />
    <SearchItem
      icon="user-o"
      :title="author"
      :sub-title="Author"
      @onClick="showList(author.title, 'author')"
      v-if="author"/>
    <SearchItem
      :icon="publisher.icon"
      :title="publisher"
      sub-title="publisher"
      @onClick="showList(publisher.title, 'publisher')"
      v-if="publisher" />
    <SearchTable
      :data="data.book"
      @onClick="onBookClick" />
  </div>
</template>
<script>
  import SearchItem from './SearchItem'
  import SearchTable from './SearchTable'

  export default {
    name: 'SearchList',
    components: {SearchTable, SearchItem},
    props: {
      data: Object
    },
    data() {
      return {}
    },
    methods: {
      showList(text, key) {
        console.log(text, key)
      },
      onBookClick(book) {
        console.log(book)
      }
    },
    watch: {},
    computed: {
      category() {
        if (this.data && this.data.category && this.data.category.length) {
          return this.data.category[0].categoryText
        } else {
          return null
        }
      },
      author() {
        if (this.data && this.data.author && this.data.author.length) {
          return this.data.author[0].author
        } else {
          return null
        }
      },
      publisher() {
        if (this.data && this.data.publisher && this.data.publisher.length) {
          return this.data.publisher[0].publisher
        } else {
          return null
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .SearchList {
  }
</style>
