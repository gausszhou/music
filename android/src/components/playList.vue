<template>
  <div class="mask" @click.self="handlerClose">
    <ul class="play-list-vue">
      <li v-for="item in $store.state.playList" :key="item.id" class="song-item">
        <div class="song-info overEllipsis">
          <div class="overEllipsis">
            <span class="name">{{item.name}}</span>
            <i class="mv-tag" v-if="item.mvid">MV</i>
            <span class="album">{{item.author}}</span>
          </div>
        </div>
        <a href="javascript:;" class="iconfont icon-bofang play-button" @click="playMusic(item)"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    async playMusic(item) {
      console.log(item);
      let name = item.name;
      let albumname = item.albumname;
      let picUrl = item.picUrl || '';
      let mvUrl = item.mvUrl || '';
      let audioUrl = item.audioUrl || '';
      let musicId = item.musicId || item.id;
      let mvId = item.mvid;
      let author = item.author;
      this.$store.commit('setIsPlaying', false);
      await this.$http.getNetAudioUrl({ id: musicId }).then(res => {
        if (res.data.data[0].url) audioUrl = res.data.data[0].url;
      });
      if (mvId) {
        await this.$http.getNetMvUrl({ id: mvId }).then(res => {
          mvUrl = res.data.data.url;
        });
      }
      if (!picUrl) {
        await this.$http.getNetDetail({ ids: musicId }).then(res => {
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
    handlerClose() {
      this.$store.commit('setMenuVisible', false);
    }
  },
}
</script>

<style lang="scss" scoped>
.mask {
  z-index: 20;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.play-list-vue {
  z-index: 50;
  position: fixed;
  bottom: 118px;
  left: 50%;
  transform: translate(-50%);
  width: 95%;
  height: 50vh;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
}

.song-item {
  width: 100%;
  height: 30px;
  padding: 0;
  margin: 8px;
  overflow: hidden;
  display: flex;
  font-family: Helvetica, sans-serif, STHeiTi;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  .song-info {
    flex: 1 1 auto;
    overflow: hidden;
    .name {
      font-size: 16px;
    }
    .album {
      font-size: 12px;
      color: #666;
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
    width: 40px;
    font-size: 28px;
    color: #999;
    line-height: 30px;
  }

  &:hover {
    .play-button {
      color: #333;
      text-decoration: none;
    }
  }
}
</style>