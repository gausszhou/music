<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toDetailSongSheet(item)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont ft_16 icon-play" @click="getMusic(item)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index" @click="toDetailMV(item)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | numbertocount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="mvs contents">
      <h3 class="title">独家放送</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in contents" :key="index">
          <div class="img-wrap">
            <img :src="item.sPicUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'recommend',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 独家放送
      contents: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getBanner();
      this.getPersonalized();
      this.getNewSong();
      this.getNewMV();
      this.getPrivatecontent();
    },
    getBanner() {
      this.$http.getBanner().then(res => {
        this.banners = res.data.banners;
      });
    },
    getPersonalized() {
      let params = {
        limit: 10
      };
      this.$http.getPersonalized(params).then(res => {
        this.list = res.data.result;
      });
    },
    getNewSong() {
      let params = {
        limit: 12
      };
      this.$http.getNewSong(params).then(res => {
        this.songs = res.data.result;
      });
    },
    getNewMV() {
      this.$http.getNewMV().then(res => {
        this.mvs = res.data.result;
      });
    },
    getPrivatecontent() {
      this.$http.getPrivatecontent().then(res => {
        this.contents = res.data.result;
      });
    },
    toDetailSongSheet(item) {
      this.$router.push({
        name: 'detailSongSheet',
        query: {
          id: item.id
        }
      });
    },
    getMusic(item) {
      this.$store.dispatch('getMusic', item);
    },
    toDetailMV(item) {
      this.$router.push({
        name: 'detailMV',
        query: {
          mvid: item.id
        }
      });
    },

  }
}
</script>

<style></style>
