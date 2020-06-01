<template>
  <div>
    <div class="home" v-if="isAuth">
      <search-bar
        disabled
        @onClick="onSearchBarClick"
        :hot-search="hotSearch"
      />
      <HomeCard
        :data="homeCard"
        @onBookClick="onHomeBookClick" />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="mpvue2.0实战多端小程序上线啦"
        subTitle="立即体验"
        @onClick="onBannerClick"/>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          btnText="换一批"
          mode="col"
          @onHomeBookClick="onHomeBookClick"
          @onMoreClick="recommendChange('recommend')"/>
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          btnText="换一批"
          mode="row"
          @onHomeBookClick="onHomeBookClick"
          @onMoreClick="recommendChange('freeRead')"/>
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          btnText="换一批"
          mode="col"
          @onHomeBookClick="onHomeBookClick"
          @onMoreClick="recommendChange('hotBook')"/>
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="分类"
          :row="2"
          :col="2"
          :data="category"
          btnText="查看全部"
          mode="category"
          @onHomeBookClick="onHomeBookClick"
          @onMoreClick="onCategoryMoreClick"/>
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init" />
  </div>
</template>

<script>
  import SearchBar from '@/components/home/SearchBar'
  import HomeCard from '@/components/home/HomeCard'
  import HomeBanner from '@/components/home/HomeBanner'
  import HomeBook from '@/components/home/HomeBook'
  import Auth from '@/components/base/Auth'
  import {
    getHomeData,
    recommend,
    freeRead,
    hotBook,
    register
  } from '../../api'
  import {
    getSetting,
    getUserInfo,
    setStorageSync,
    getStorageSync,
    getUserOpenId,
    showLoading,
    hideLoading
  } from '../../api/wechat'

  export default {
    data() {
      return {
        hotSearch: '',
        homeCard: {},
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: [],
        isAuth: false
      }
    },
    components: {
      SearchBar,
      HomeCard,
      HomeBanner,
      HomeBook,
      Auth
    },
    methods: {
      recommendChange(key) {
        switch (key) {
          case 'recommend':
            recommend()
              .then(res => {
                this.recommend = res.data.data
              })
            break
          case 'freeRead':
            freeRead()
              .then(res => {
                this.freeRead = res.data.data
              })
            break
          case 'hotBook':
            hotBook()
              .then(res => {
                this.hotBook = res.data.data
              })
            break
        }
      },
      onSearchBarClick() {
        this.$router.push({
          path: '/pages/search/main',
          query: {
            hotSearch: this.hotSearch
          }
        })
      },
      onBannerClick() {
        console.log('banner click...')
      },
      onHomeBookClick(book) {
        console.log(book)
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName: book.fileName
          }
        })
      },
      onMoreClick() {
        console.log('more click...')
      },
      getHomeData(openId, userInfo) {
        getHomeData({ openId }).then(res => {
          const {
            data: {
              hotSearch: {
                keyword
              },
              shelf,
              banner,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            }
          } = res.data
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          }
          hideLoading()
        }).catch(e => {
          console.log('捕获异常', e)
          hideLoading()
        })
      },
      onCategoryMoreClick() {},
      getUserInfo() {
        const onOpenIdComplete = (openId, userInfo) => {
          this.getHomeData(openId, userInfo)
          register(openId, userInfo)
        }
        getUserInfo(
          (userInfo) => {
            console.log(userInfo)
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openId')
            if (!openId || !openId.length) {
              getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
            } else {
              onOpenIdComplete(openId, userInfo)
            }
          },
          () => {
            console.log('failed......')
          }
        )
      },
      getSetting() {
        getSetting('userInfo', () => {
          this.isAuth = true
          showLoading('正在加载')
          this.getUserInfo()
        }, () => {
          this.isAuth = false
        })
      },
      init() {
        this.getSetting()
      }
    },
    created() {
      // let app = getApp()
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>

</style>
