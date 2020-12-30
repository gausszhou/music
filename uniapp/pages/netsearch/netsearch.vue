<template>
  <div class="search-page">
    <div class="search-box">
      <input v-model="query" placeholder="搜索歌曲、歌手、专辑" @keyup.enter="searchMusic()" />
    </div>
    <div class="hotSearch" v-show="beforeSearch">
      <span
        class="cursor_pointer hotWord"
        v-for="item in hotSearchList"
        :key="item.id"
        @click="clickHot(item.first)"
      >{{ item.first }}</span>
    </div>
    <song-list-vue :itemList="musicList" :needSong="false"></song-list-vue>
    <audio-vue v-if="$route.path.includes('netsearch')&&$store.state.isShow" class="vue-audio"></audio-vue>
  </div>
</template>

<script>
import songListVue from "../../components/songList";
import audioVue from "../../components/audio.vue";
export default {
  name: "search",
  components: {
    songListVue,
    audioVue
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
      } else {
        this.searchMusic();
      }
    },
  },
  created() {
    this.beforeSearch = true;
    // 获取搜索候选
    this.$http
      .getNetSearchHot()
      .then((res) => {
        this.hotSearchList = JSON.parse(res.data).result.hots;
      })
      .catch(() => { });
  },
  methods: {
    searchMusic() {
      this.beforeSearch = false;
      // 获取歌曲列表
      let params = this.query;
      this.$http
        .getNetSearchMusic({ keywords: params })
        .then((res) => {
          this.musicList = JSON.parse(res.data).result.songs.map(item => {
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
.search-page {
  padding: 0 2px;
  min-height: 100vh;
  width: 100%;
  .search-box {
    margin: 10px;
    input {
      border-bottom: 1px solid #ccc;
    }
    input:active {
      border-bottom: 1px solid #000;
      & ~ label {
        font-size: 12px;
      }
    }
  }
  .hotSearch {
    .hotWord {
      display: inline-block;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      padding: 0 6px;
      margin: 6px;
      box-shadow: 1px 1px 1px 1px #eee;
    }
  }
}
.cursor_pointer {
  cursor: pointer;
}
</style>