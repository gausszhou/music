<template>
  <div class="audio-control-box">
    <div class="mv-container" v-show="mvPlaying">
      <video class="video" ref="video" :src="song.mvUrl" controls></video>
    </div>
    <div class="audio-control-bar">
      <div class="audio_bar display-flex">
        <img class="img" :class="isPlaying  ? 'running':'paused'" :src="song.picUrl" v-if="song.picUrl" />
        <p class="flex_1 overEllipsis ft_14">
          {{song.author}}{{song?'-':''}}{{song.name}}
          <span v-if="song.name">/专辑:</span>
          {{song.albumname}}
        </p>
        <i
          class="icon-MV copy iconfont ft_28"
          v-if="song.mvUrl"
          :class="mvPlaying? 'active':''"
          @click="copy(song.mvUrl,'mv')"
        ></i>
        <i class="icon-gequdan copy iconfont ft_28" v-if="song.audioUrl" @click="copy(song.audioUrl,'au')"></i>
        <i class="iconfont ft_28" :class="isPlaying  ? 'icon-zanting':'icon-bofang_huaban'" @click="toggle()"></i>
        <i class="iconfont ft_28 icon-caidan" @click="openDrawer()"></i>
      </div>
      <md-progress-bar class="md-accent" md-mode="determinate" :md-value="amount"></md-progress-bar>
    </div>
    <audio v-show="false" ref="audio" :src="song.audioUrl" autoplay @timeupdate="onAudioTimeUpdate"></audio>
  </div>
</template>

<script>


export default {
  name: "audioVue",
  props: {},
  data() {
    return {
      mvPlaying: false,
      amount: 0,
    };
  },
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    song() {
      return this.$store.state.song;
    }
  },
  watch: {
    song: {
      handler() {
        this.mvPlaying = false;
      },
      deep: true
    }
  },
  mounted() {
    // 设置初始音量
    this.$refs.audio.volumn = 1;
  },
  methods: {
    toggle() {
      if (this.isPlaying) {
        this.$store.commit('setIsPlaying', false);
        this.$refs.audio.pause();
      } else {
        this.mvPlaying = false;
        this.$refs.video.pause();
        this.$store.commit('setIsPlaying', true);
        this.$refs.audio.play();
      }
    },
    onAudioTimeUpdate() {
      let total = this.$refs.audio.duration;
      let current = this.$refs.audio.currentTime;
      this.amount = 100 * current / total;
      if (this.amount >= 100) {
        this.$refs.audio.pause();
        this.$store.commit('setIsPlaying', false);
      }
    },
    copy(params, type) {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.value = params;
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      if (type == 'mv') {
        this.$refs.audio.pause();
        this.$store.commit('setIsPlaying', false);
        this.mvPlaying = !this.mvPlaying;
        if (this.mvPlaying) {
          this.$refs.video.play();
        } else {
          this.$refs.video.pause();
        }
      }
    },
    openDrawer() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible);
    }
  },
};
</script>

<style lang="scss" scoped>
.audio-control-box {
  position: absolute;
  bottom: 60px;
  width: 100%;
  .mv-container {
    position: relative;
    width: 100vw;
    height: 56.25vw;
    max-height: 50vh;
    background-color: #000;
    .video {
      width: 100%;
      height: 100%;
    }
  }
  .audio-control-bar {
    height: 48px;
    border-radius: 48px;
  }
  .audio_bar {
    position: relative;
    width: 100%;
    height: 48px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.06),
      0 -2px 4px -1px rgba(0, 0, 0, 0.08), 0 -4px 5px 0 rgba(0, 0, 0, 0.07);
    .img {
      display: block;
      height: 40px;
      width: 40px;
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
    .iconfont {
      margin: 0 5px;
      color: #666;
      &.icon-zanting {
        color: #f56c6c;
      }
    }
    .copy {
      color: #666;
      &:active {
        color: #f56c6c;
      }
      &.active {
        color: #f56c6c;
      }
    }
  }
}
</style>
