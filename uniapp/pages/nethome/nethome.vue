<template>
  <div>
    <div class="play-list-box">
      <h3 class="title">网友精选碟</h3>
      <ul class="play-list">
        <li class="list-item" v-for="sheet in playList" :key="sheet.id">
          <img class="list-item-img" :src="sheet.picUrl" />
          <span class="list-item-name">{{ sheet.name }}</span>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="title">推荐新音乐</h3>
      <song-list-vue :itemList="musicList" :needSong="true"></song-list-vue>
    </div>
  </div>
</template>

<script>
import songListVue from '../../components/songList';
import audioVue from "../../components/audio.vue"
export default {
  name: 'home',
  components: {
    songListVue,
    audioVue
  },
  data() {
    return {
      playList: [],
      musicList: []
    };
  },
  onNavigationBarButtonTap(val) {
    console.log(val.route);
    uni.switchTab({
      url:"youdao"
    })
  },
  // onNavigationBarSearchInputChanged(val) {
  //   console.log(val);
  // },
  created() {
    // 获取推荐歌单
    this.$http
      .getPersonalized()
      .then(res => {
        this.playList = JSON.parse(res.data).result.slice(0, 6);
      })
      .catch(e => {
        console.log(e);
      });
  },
  mounted() {
    // 获取推荐新音乐
    this.$http
      .getNewSong()
      .then(res => {
        this.musicList = JSON.parse(res.data).result.map(item => {
          return {
            id: item.id,
            mvid: item.mvid || '',
            name: item.name,
            author: item.song.artists[0].name,
            albumname: item.song.album.name,
            picUrl: item.picUrl || ''
          };
        });
      })
      .catch(() => {});
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
  padding: 0 0 0 12px;
  color: #333;
  text-align: left;
  font-family: Helvetica;
  border-left: #d43c33 2px solid;
}

.play-list-box {
  .play-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    .list-item {
      max-width: 100px;
      margin: 0 1px;
      list-style: none;
      text-align: left;
      margin-top: 12px;
      .list-item-img {
        width: 100%;
      }
      .list-item-name {
        font-size: 12px;
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
