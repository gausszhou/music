<template>
  <!-- 歌曲列表组件，需要传入的参数{itemList: Array} -->
  <!-- id mvid  name  author album picUrl-->
  <ul class="song-list">
    <li v-for="item in itemList" :key="item.id" class="song-item">
      <div class="song-info overEllipsis">
        <div class="overEllipsis">
          <span class="name">{{item.name}}</span>
          <i class="mv-tag" v-if="item.mvid">MV</i>
        </div>
        <span class="album">{{item.author}}-{{ item.albumname }}</span>
      </div>
      <a href="javascript:;" class="iconfont icon-bofang play-button" @click="playMusic(item)"></a>
    </li>
  </ul>
</template>
<script>

export default {
  // 导出名
  name: "songListVue",
  // 导入数据
  props: {
    needSong: {
      type: [Boolean],
      default: true
    },
    itemList: {
      type: [Array, Function],
      default: function () {
        return [{ id: 1, name: '', song: { artists: [{ name: '' }], album: { name: '' } } }];
      }
    },

  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    async playMusic(item) {
      console.log(item);
      let name = item.name;
      let albumname = item.albumname;
      let picUrl = item.picUrl || '';
      let mvUrl = '';
      let audioUrl = '';
      let musicId = item.id;
      let mvId = item.mvid;
      let author = item.author;
      this.$store.commit('setIsPlaying', false);
      await this.$http.getSongUrl({ id: musicId }).then(res => {
        if (res.data.data[0].url) audioUrl = res.data.data[0].url;
      });
      if (mvId) {
        await this.$http.getMvUrl({ id: mvId }).then(res => {
          mvUrl = res.data.data.url;
        });
      }
      if (!picUrl) {
        await this.$http.getSongDetail({ ids: musicId }).then(res => {
          picUrl = res.data.songs[0].al.picUrl;
        });
      }
      let song = { name, albumname, picUrl, mvUrl, audioUrl, author, musicId, mvId };
      this.$store.commit('setSong', song);
      let list = JSON.parse(JSON.stringify(this.$store.state.playList));
      let flag = true;
      list.forEach(item => {
        if (item.musicId == song.musicId) {
          flag = false;
        }
      });
      if (flag) {
        list.push(song);
      }
      this.$store.commit('setPlayList', list);
      this.$store.commit('setIsPlaying', true);
      this.$store.commit('setIsShow', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 108px;
}

.song-item {
  height: 40px;
  padding: 0;
  margin: 8px;
  overflow: hidden;
  display: flex;
  font-family: Helvetica, sans-serif, STHeiTi;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  .song-info {
    flex: 1 1 auto;
    .name {
      font-size: 16px;
    }
    .album {
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.6);
    }
    .mv-tag {
      position: relative;
      top: -5px;
      right: -5px;
      font-size: 12px;
      color: red;
    }
  }
  .play-button {
    font-size: 28px;
    color: #bbb;
    line-height: 40px;
  }

  &:hover {
    .play-button {
      color: #333;
      text-decoration: none;
    }
  }
}
@media screen and(max-width:2160px) {
  .song-item {
    width: 33%;
  }
}
@media screen and(max-width:1350px) {
  .song-item {
    width: 50%;
  }
}
@media screen and(max-width:720px) {
  .song-item {
    width: 100%;
  }
}
</style>