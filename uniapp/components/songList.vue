<template>
    <!-- 歌曲列表组件，需要传入的参数{itemList: Array} -->
    <!-- id mvid  name  author album picUrl-->
    <ul class="song-list">
      <li v-for="item in itemList" :key="item.id" class="song-item">
        <img :src="item.picUrl" class="song-pic" />
        <div class="song-info overEllipsis">
          <div class="overEllipsis">
            <span class="song-name">{{item.name}}</span>
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
      let name = item.name;
      let albumname = item.albumname;
      let picUrl = item.picUrl || '';
      let mvUrl = '';
      let audioUrl = '';
      let musicId = item.id;
      let mvId = item.mvid;
      let author = item.author
      this.$store.commit('setIsPlaying', false);
      await this.$http.getNetAudioUrl({ id: musicId }).then(res => {
        if (JSON.parse(res.data).data[0].url) audioUrl =  JSON.parse(res.data).data[0].url;
      });
      if (mvId) {
        await this.$http.getNetMvUrl({ id: mvId }).then(res => {
          mvUrl = JSON.parse(res.data).data.url;
        });
      }
      if (!picUrl) {
        await this.$http.getNetDetail({ ids: musicId }).then(res => {
          picUrl = JSON.parse(res.data).songs[0].al.picUrl;
        });
      }
      this.$store.commit('setSong', { name, albumname, picUrl, mvUrl, audioUrl,author });
      this.$store.commit('setIsPlaying', true);
      this.$store.commit('setIsShow', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list{
  width: 750rpx;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 108px;
}

.song-item {
  display: flex;
  height: 40px;
  padding: 0 5px;
  margin: 5px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  .song-pic {
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .song-info {
    flex: 1;
    .song-name {
      font-size: 14px;
    }
    .album {
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.6);
    }
    .mv-tag {
      color: red;
    }
  }
  .play-button {
    margin: 0 10px 0 0 ;
    font-size: 28px;
    color: #999;
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
  .song-item{
    width: 33%;
  } 
}
@media screen and(max-width:1350px) {
  .song-item{
    width: 50%;
  } 
}
@media screen and(max-width:720px) {
  .song-item{
    width: 100%;
  } 
}




</style>