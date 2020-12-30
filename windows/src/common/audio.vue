<template>
  <div class="audio-box">
    <div class="audio-bar">
      <!-- 左边的歌曲信息 -->
      <div class="song-info">
        <div class="img-box">
          <img class="img" :class="isPlay ? 'running':'paused'" :src="song.picUrl" v-if="song.picUrl" />
        </div>
        <div class="name-box">
          <div class="overEllipsis ft_14">{{song.name}}</div>
          <div>
            <span class="overEllipsis ft_14" v-for="(item,index) in song.author" :key="index">{{item.name}}&nbsp;/</span>
          </div>
        </div>
      </div>
      <!-- 播放控制 -->
      <div class="song-control">
        <div class="switch-control">
          <i class="iconfont button-control ft_28 icon-pre" @click="switchSong(-1)"></i>
          <i
            class="iconfont button-control button-toggle ft_28"
            :class="isPlay  ? 'icon-pause':'icon-play'"
            @click="toggleSong()"
          ></i>
          <i class="iconfont button-control ft_28 icon-next" @click="switchSong(1)"></i>
        </div>
        <div class="progress display-flex">
          <span class="tiem">{{current | stotime}}</span>
          <el-slider class="control-progress" v-model="amount" :show-tooltip="false" @change="changeProgress(amount)"></el-slider>
          <span class="time">{{total | stotime}}</span>
        </div>
      </div>
      <!-- 音量控制和播放列表 -->
      <div class="list-control display-flex">
        <div class="flex_1"></div>
        <i class="iconfont ft_28 button-menu icon-menu" @click="openDrawer()"></i>
      </div>
    </div>
    <!-- 真正的audio标签，不显示 -->
    <audio
      v-show="false"
      ref="audio"
      :src="song.audioUrl"
      autoplay
      @timeupdate="onAudioTimeUpdate"
      @loadeddata="loadeddata"
    ></audio>
    <!-- 播放列表组件 -->
    <playList v-if="$store.state.menuVisible"></playList>
  </div>
</template>

<script>
import playList from "./playList";
export default {
  name: "audioVue",
  components: {
    playList
  },
  props: {},
  data() {
    return {
      current: 0,
      total: 0,
      amount: 0,
      volumn: .5,
      playSpeed: 1,
      loaded: false,
    };
  },
  computed: {
    isPlay() {
      return this.$store.state.isPlay;
    },
    song() {
      return this.$store.state.song;
    },
    playList() {
      return this.$store.state.playList;
    }
  },
  watch: {
    song: {
      handler() {
        this.loaded = false;
      },
      deep: true
    }
  },
  mounted() {
    // 设置初始音量
    this.$refs.audio.volumn = .5;
  },
  methods: {
    loadeddata() {
      console.log('load');
      this.loaded = true;
    },
    switchSong(num) {
      let list = this.$store.state.playList;
      if (list.length > 1) {
        this.$refs.audio.pause();
        this.$store.commit('setIsPlay', false);
        let index = this.$store.state.activeIndex;
        index = (index + list.length + num) % list.length;
        let next = list[index];
        this.$store.dispatch('playMusic', next);
        this.$store.commit('setIndex', index);
      }
    },
    toggleSong() {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false);
        this.$refs.audio.pause();
      } else {
        if (this.song.audioUrl) {
          this.$store.commit('setIsPlay', true);
          this.$refs.audio.play();
        }
      }
    },

    changeProgress(e) {
      this.$refs.audio.currentTime = e * this.total / 100;
    },
    onAudioTimeUpdate() {
      if (this.loaded) {
        this.total = this.$refs.audio.duration;
        this.current = this.$refs.audio.currentTime;
        this.amount = 100 * this.current / this.total;
        if (this.amount >= 100) {
          this.next();
        }
      }
    },
    // 打开播放列表
    openDrawer() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible);
    }
  },
};
</script>

<style lang="scss" scoped>
.audio-box {
  z-index: 10;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  min-width: 960px;
  background-color: #f6f6f8;
  border-top: 1px solid #eee;
}
.audio-bar {
  z-index: 10;
  height: 80px;
  display: flex;
  align-items: center;
  .song-info {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .list-control {
    flex: 1;
  }
}
// 信息
.song-info {
  .img-box {
    margin: 10px 0 0 20px;
    .img {
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 1px solid #ccc;
      animation: rotateImg 5s linear infinite running;
      animation-play-state: paused;
    }
    .img.running {
      animation-play-state: running;
    }
    .img.paused {
      animation-play-state: paused;
    }
    @keyframes rotateImg {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .name-box {
    margin: 20px 0 0 20px;
    height: 60px;
    vertical-align: baseline;
  }
}
// 歌曲控制
.song-control {
  .switch-control {
    display: flex;
    justify-content: center;
    .button-control {
      margin: 0 5px;
      padding: 5px;
    }
  }
  .progress {
    .time {
      height: 20px;
    }
  }
  .control-progress {
    margin: 0 20px;
    width: 500px;
  }
  .button-toggle {
    background-color: #ccc;
    border-radius: 40px;
  }
}

// 音量控制
.list-control {
  .button-menu {
    margin: 0 10px 0 0;
  }
}
</style>
