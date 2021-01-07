<template>
  <div class="music-home">
    <div class="play-list-box">
      <h3 class="title">网友精选碟</h3>
      <ul class="play-list">
        <li class="list-item" v-for="sheet in playList" :key="sheet.id" @click="toDetailSheet(sheet)">
          <i class="list-item-count">
            <i class="iconfont icon-yinyue list-item-count-icon"></i>
            {{sheet.playCount | numbertocount}}
          </i>
          <img class="list-item-img" :src="sheet.picUrl" />
          <span class="list-item-name">{{ sheet.name }}</span>
        </li>
      </ul>
    </div>
    <div class="new-list-box">
      <h3 class="title">推荐新音乐</h3>
      <song-list-vue :itemList="musicList" :needSong="true"></song-list-vue>
    </div>
    <play-list-vue class="mask" v-show="$store.state.menuVisible"></play-list-vue>
  </div>
</template>

<script>
import playListVue from "@/components/playList";
import songListVue from "@/components/songList";
export default {
  name: 'home',
  components: {
    playListVue,
    songListVue
  },
  data() {
    return {
      playList: [],
      musicList: [],
    };
  },
  created() {
    // 获取推荐歌单
    this.$http.getPersonalized().then((res) => {
      this.playList = res.data.result.slice(0, 6);
      console.log(this.playList);
    }).catch(() => { });
  },
  mounted() {
    // 

    // 获取推荐新音乐
    this.$http
      .getNewSong()
      .then((res) => {
        this.musicList = res.data.result.map(item => {
          return {
            id: item.id,
            mvid: item.mvid || '',
            name: item.name,
            author: item.song.artists[0].name,
            albumname: item.song.album.name,
            picUrl: item.picUrl || '',
          };
        });
        console.log(this.musicList[0]);
      }
      )
      .catch(() => { });

  },
  methods: {
    toDetail(item) {
      this.$router.push({
        name: 'detail',
        query: {
          id: item.id
        }
      });
    }
  },
};
</script>

<style  lang="scss" scoped>
.music-home {
  margin-top: 2rem;
  .title {
    margin: 0.625rem 0 0.15625rem;
    padding: 0 0 0 12px;
    font-size: 0.625rem;
    color: #333;
    text-align: left;
    font-family: Helvetica;
    border-left: #d43c33 2px solid;
  }
}
.play-list-box {
  .play-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    .list-item {
      width: 33%;
      list-style: none;
      text-align: left;
      margin-top: 0.375rem;
      position: relative;
      .list-item-count {
        position: absolute;
        top: 0.15625rem;
        right: 0.15625rem;
        font-size: 0.375rem;
        color: #fff;
        .list-item-count-icon {
          font-size: 0.375rem;
        }
      }
      .list-item-img {
        width: 100%;
      }
      .list-item-name {
        margin: 0.15625rem;
        font-size: 0.375rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>