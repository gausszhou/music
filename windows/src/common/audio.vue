<template>
  <div class="audio-box">
    <div class="audio-bar">
      <!-- 左边的歌曲信息 -->
      <div class="song-info">
        <div class="img-box">
          <img class="img" :class="isPlay ? 'running':'paused'" :src="song.picUrl" v-if="song.picUrl" />
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
        </div>
        <div class="progress display-flex">
          <span class="tiem">{{currentTime | stotime}}</span>
          <el-slider class="control-progress" v-model="amount" :show-tooltip="false" @change="changeProgress(amount)"></el-slider>
          <span class="time">{{totalTime | stotime}}</span>
        </div>
      </div>
      <!-- 音量控制和播放列表 -->
      <div class="list-control display-flex">
        <div class="flex_1"></div>

        <i class="iconfont ft_28 icon-volumn"></i>
        <el-slider class="control-volumn" v-model="volumn" :show-tooltip="false" @change="changeVolumn(volumn)"></el-slider>
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
      volumn: 50,
      playSpeed: 1,
      loaded: false,
      orderList: [],
      current: -1,
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
    this.$refs.audio.volumn = this.volumn / 100;
  },
  methods: {
    loadeddata() {
      this.loaded = true;
    },
    swtichMode() {
      this.mode = (this.mode + this.modeList.length + 1) % this.modeList.length;
      console.log(this.mode);
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
    changeProgress(e) {
      this.$refs.audio.currentTime = e * this.totalTime / 100;
    },
    changeVolumn(e) {
      this.$refs.audio.volumn = e / 100;
    },
    onAudioTimeUpdate() {
      if (this.loaded) {
        this.totalTime = this.$refs.audio.duration;
        this.currentTime = this.$refs.audio.currentTime;
        this.amount = 100 * this.currentTime / this.totalTime;
        if (this.amount >= 100) {
          this.switchSong(1);
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
    margin-left: 20px;
    .img {
      display: block;
      height: 70px;
      width: 70px;
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
}

// 音量控制
.list-control {
  .button-menu {
    margin: 0 10px 0 0;
  }
  .control-volumn {
    margin: 0 15px;
    width: 100px;
  }
}
</style>
