<template>
  <div class="audio-box">
    <div class="audio-bar" @mouseup="mouseup">
      <!-- 左边的歌曲信息 -->
      <div class="song-info">
        <div class="img-box" @click="toggleSongDrawer()" :class="{show:song.picUrl,open:songDrawerVisible}">
          <i class="iconfont arrow arrow-left icon-arrow-left-bottom"></i>
          <i class="iconfont arrow arrow-right icon-arrow-right-top"></i>
          <img class="img" :class="{ 'running':isPlay&&(!songDrawerVisible) }" :src="song.picUrl" />
        </div>
        <div class="name-box">
          <div class="overEllipsis song-name ft_16">{{song.name}}</div>
          <div>
            <span
              class="overEllipsis song-author ft_14"
              v-for="(item,index) in song.author"
              :key="index"
            >{{item.name}}&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
      <!-- 播放控制 -->
      <div class="song-control">
        <div class="switch-control">
          <i class="iconfont ft_28 button-control" @click="swtichMode" :class="modeList[mode].class"></i>
          <i class="iconfont button-control ft_28 icon-pre" @click="switchSong(-1)"></i>
          <i
            class="iconfont button-control button-toggle ft_28"
            :class="isPlay  ? 'icon-pause':'icon-play'"
            @click="toggleSong()"
          ></i>
          <i class="iconfont button-control ft_28 icon-next" @click="switchSong(1)"></i>
          <i class="button-control ft_20 button-lyric" @click="toggleLyric">词</i>
        </div>
        <div class="progress display-flex">
          <span class="tiem">{{currentTime | stotime}}</span>
          <el-slider class="control-progress" v-model="amount" :show-tooltip="false" @change="changeProgress"></el-slider>
          <span class="time">{{totalTime | stotime}}</span>
        </div>
      </div>
      <!-- 音量控制和播放列表 -->
      <div class="list-control display-flex">
        <div class="flex_1"></div>
        <i class="iconfont ft_28 icon-volume"></i>
        <el-slider class="control-volume" v-model="volume" :show-tooltip="false" @change="changevolume(volume)"></el-slider>
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
    <transition-group name="fade">
      <playList key="playList" v-if="$store.state.menuVisible"></playList>
      <lyric key="lyric" v-if="lyricVisible" :time="currentTime"></lyric>
    </transition-group>
    <transition name="drawer">
      <songDrawer key="songDrawer" v-if="songDrawerVisible" @change="closeSongDrawer()"></songDrawer>
    </transition>
  </div>
</template>

<script>
import playList from "@/components/playList.vue";
import lyric from "@/components/lyric.vue";
import songDrawer from "@/components/songDrawer.vue";
export default {
  name: "audioVue",
  components: {
    playList,
    lyric,
    songDrawer
  },
  props: {},
  data() {
    return {
      mode: 0,
      modeList: [
        {
          mode: 0, // 列表循环
          class: 'icon-mode-loop',
          label: '列表循环'
        },
        {
          mode: 1, // 单曲循环
          class: 'icon-mode-single',
          label: '单曲循环'
        },
        {
          mode: 2,// 顺序播放，最后一首播放完毕，暂停
          class: 'icon-mode-order',
          label: '顺序播放'
        },
        {
          mode: 3, // 数字三意味着混沌，所以用3来代表随机播放
          class: 'icon-mode-random',
          label: '随机播放'
        }
      ],
      currentTime: 0,
      totalTime: 0,
      amount: 0,
      volume: 50,
      playSpeed: 1,
      loaded: false,
      orderList: [],
      current: -1,
      lyricVisible: false,
      isSlider: false,
      songDrawerVisible: false
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
    this.$refs.audio.volume = this.volume / 100;
  },
  methods: {
    loadeddata() {
      this.loaded = true;
    },
    swtichMode() {
      this.mode = (this.mode + this.modeList.length + 1) % this.modeList.length;
    },
    switchSong(num) {
      let number = 0;
      switch (this.mode) {
        case 0:
          number = num;
          this.setSong(number);
          break;
        case 1:
          number = 0;
          this.setSong(number);
          break;
        case 2:
          if (this.$store.state.activeIndex < this.$store.state.playList.length - 1) {
            number = 1;
            this.setSong(number);
          }
          break;
        case 3:
          number = Math.floor(Math.random() * this.$store.state.playList.length);
          if (num == -1) {
            this.current == this.current - 1;
            number = this.orderList[this.current] || -1;
            this.setSong(number);
          } else {
            this.orderList.push(number);
            this.current++;
            this.setSong(number);
          }
          break;
        default:
          break;
      }
    },
    setSong(number) {
      let list = this.$store.state.playList;
      let index = this.$store.state.activeIndex;
      if (list.length > 1) {
        this.$refs.audio.pause();
        this.$store.commit('setIsPlay', false);
        index = (index + list.length + number) % list.length;
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
    toggleLyric() {
      if (this.song.audioUrl && this.$store.state.lyric.length) {
        this.lyricVisible = !this.lyricVisible;
      }
    },
    mouseup() {
      setTimeout(() => {
        this.isSlider = false;
      }, 100);
    },
    changeProgress(e) {
      this.isSlider = true;
      this.$refs.audio.currentTime = e * this.totalTime / 100;
      this.amount = e;
    },
    changevolume(e) {
      this.$refs.audio.volume = e / 100;
    },
    onAudioTimeUpdate() {
      // 防止NaN
      if (this.loaded) {
        this.totalTime = this.$refs.audio.duration;
        this.currentTime = this.$refs.audio.currentTime;
        if (!this.isSlider) this.amount = 100 * this.currentTime / this.totalTime;
        if (this.amount >= 100) {
          this.switchSong(1);
        }
      }
    },
    // 打开播放列表
    openDrawer() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible);
    },
    // 打开歌曲详情
    toggleSongDrawer() {
      this.songDrawerVisible = !this.songDrawerVisible;
    },
    closeSongDrawer() {
      this.songDrawerVisible = false;
    },

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
  min-width: 1024px;
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
    margin-left: 20px;
    position: relative;
    cursor: pointer;
    visibility: hidden;
    .arrow {
      display: block;
      z-index: 11;
      position: absolute;
      font-size: 20px;
      color: rgba(0, 0, 0, 0);
    }
    .arrow-left {
      left: 10px;
      bottom: 10px;
    }
    .arrow-right {
      right: 10px;
      top: 10px;
    }
    .img {
      display: block;
      height: 70px;
      width: 70px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }
    .img.running {
      border-radius: 50%;
      animation: rotateImg 5s linear infinite running;
    }
    @keyframes rotateImg {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    &:hover {
      &.open {
        .arrow {
          transform: rotate(180deg);
        }
      }
      .arrow {
        color: rgba(255, 255, 255, 0.7);
      }
      .img {
        filter: blur(2px);
      }
    }
    &.show {
      visibility: visible;
    }
  }
  .name-box {
    margin: 20px 0 0 20px;
    height: 60px;
    line-height: 25px;
    .song-name {
      font-weight: 700;
    }
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
  .button-lyric {
    line-height: 28px;
    cursor: pointer;
  }
}

// 音量控制
.list-control {
  .button-menu {
    margin: 0 10px 0 0;
  }
  .control-volume {
    margin: 0 15px;
    width: 100px;
  }
}
// 过渡
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.5s; // 不能用all
  transform-origin: left bottom;
  transform: scaleX(1) scaleY(1);
}
.drawer-enter, .drawer-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: transform 0.5s;
  transform-origin: left bottom;
  transform: scaleX(0) scaleY(0);
}
</style>
