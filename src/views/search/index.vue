<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{keywords}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <h4>双击歌曲播放</h4>
        <el-table :lazy="true" :data="songList" style="width: 100%" class="songs-table" @row-dblclick="playMusic">
          <el-table-column prop="name" label="音乐标题">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <span v-if="scope.row.mvid" class="iconfont mv-tag icon-mv">MV</span>
            </template>
          </el-table-column>
          <el-table-column prop="artists[0].name" label="歌手"></el-table-column>
          <el-table-column prop="album.name" label="专辑" width="250"></el-table-column>
          <el-table-column prop="duration" label="时长" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.duration | mstotime}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in playList" :key="index" @click="toSongSheetDetail(item)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount | numbertocount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mvs">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvList" :key="index" @click="playMV(item)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | numbertocount}}</div>
              </div>
              <span class="time">{{item.duration | mstotime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      activeIndex: 'songs',
      keywords: '',
      type: 1,
      songList: [],
      playList: [],
      mvList: [],
      count: '',
    };
  },
  watch: {
    '$store.state.query': {
      handler() {
        this.search();
      }
    },
    activeIndex: {
      handler(newV) {
        switch (newV) {
          case 'songs':
            this.type = 1;
            break;
          case 'lists':
            this.type = 1000;
            break;
          case 'mvs':
            this.type = 1004;
            break;
          default:
            break;
        }
        this.search();
      }
    }
  },
  created() {
    this.keywords = this.$route.query.keywords;
    this.search();
  },
  methods: {
    search() {
      let type = this.type;
      if (this.keywords) {
        let params = {
          keywords: this.keywords,
          type
        };
        this.$http.getSearch(params).then(res => {
          switch (type) {
            case 1:
              this.songList = res.data.result.songs;
              this.count = res.data.result.songCount;
              break;
            case 1000:
              this.playList = res.data.result.playlists;
              this.count = res.data.result.playlistCount;
              break;
            case 1004:
              this.mvList = res.data.result.mvs;
              this.count = res.data.result.mvCount;
              break;
            default:
              break;
          }
        });
      }
    },
    playMusic(row) {
      this.$store.dispatch('getMusicUrl', row.id);
    },
    toSongSheetDetail(item) {
      this.$router.push({
        name: 'detailSongSheet',
        query: {
          id: item.id
        }
      });
    },
    playMV(item) {
      this.$router.push({
        name: 'detailMV',
        query: {
          mvid: item.id
        }
      });
    }
  },
};
</script>

<style scoped>
.song-table {
  user-select: none;
}
.mv-tag {
  color: red;
}
</style>
