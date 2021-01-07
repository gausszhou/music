<template>
  <div class="search">
    <label>搜索歌曲、歌手、专辑</label>
    <van-field v-model="query" @keyup.enter="searchMusic()"></van-field>
    <div class="hotSearch" v-show="beforeSearch">
      <span
        class="cursor_pointer hotWord"
        v-for="item in hotSearchList"
        :key="item.id"
        @click="clickHot(item.first)"
      >{{ item.first }}</span>
    </div>
    <song-list-vue :itemList="musicList" :needSong="false"></song-list-vue>
  </div>
</template>

<script>
import songListVue from "@/components/songList";
export default {
  name: "search",
  components: {
    songListVue,
  },
  data() {
    return {
      query: "",
      beforeSearch: true,
      hotSearchList: [],
      musicList: [],
    };
  },
  watch: {
    query(newV) {
      if (newV == "") {
        this.beforeSearch = true;
        this.musicList = [];
      }
    },
  },
  created() {
    this.beforeSearch = true;
    // 获取搜索候选
    this.$http
      .getSearchHot()
      .then((res) => {
        this.hotSearchList = res.data.result.hots;
      })
      .catch(() => { });
  },
  methods: {
    searchMusic() {
      this.beforeSearch = false;
      // 获取歌曲列表
      let params = this.query;
      this.$http
        .getSearch({ keywords: params })
        .then((res) => {
          this.musicList = res.data.result.songs.map(item => {
            return {
              id: item.id,
              mvid: item.mvid || '',
              name: item.name,
              author: item.artists[0].name,
              albumname: item.album.name,
              picUrl: item.picUrl || '',
              origin: 'net'
            };
          });
        })
        .catch(() => { });
    },
    clickHot(hotWord) {
      this.query = hotWord;
      this.searchMusic();
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0 2px;
  min-height: 100vh;
  width: 100%;
  .hotSearch {
    .hotWord {
      display: inline-block;
      font-size: 14px;
      padding: 8px 10px;
      margin: 6px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50px;
      &:active {
        background-color: #ccc;
      }
    }
  }
}
.cursor_pointer {
  cursor: pointer;
}
</style>