<template>
  <div class="audio-control-box">
    <div class="mv-container" v-show="mvPlaying"><video class="video" ref="video" :src="song.mvUrl" controls></video></div>
    <div class="audio-control-bar">
      <div class="audio_bar display-flex">
        <img class="img" :class="isPlaying ? 'running' : 'paused'" :src="song.picUrl" v-if="song.picUrl" />
        <p class="flex_1 overEllipsis ft_14">
          {{ song.author }}-{{ song.name }}
          <span v-if="song.name">/专辑:</span>
          {{ song.albumname }}
        </p>
        <i class="icon-MV copy iconfont ft_28" v-if="song.mvUrl" :class="mvPlaying ? 'active' : ''" @click="copy(song.mvUrl, 'mv')"></i>
        <i class="icon-gequdan copy iconfont ft_28" v-if="song.audioUrl" @click="copy(song.audioUrl, 'au')"></i>
        <i v-else>资源消失了</i>
        <i class="iconfont ft_28" :class="isPlaying ? 'icon-zanting' : 'icon-bofang_huaban'" @click="toggle()"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'audioVue',
  props: {},
  data() {
    return {
      mvPlaying: false,
      amount: 0,
      innerAudioContext: {}
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
      handler(newV) {
        this.mvPlaying = false;
         this.innerAudioContext.src = newV.audioUrl
      },
      deep: true
    }
  },
  mounted() {
    // 设置初始音量
    this.innerAudioContext = uni.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.src = this.song.audioUrl;
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放');
    });
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  methods: {
    toggle() {
      if (this.isPlaying) {
        this.$store.commit('setIsPlaying', false);
        // this.$refs.audio.pause();
      } else {
        this.mvPlaying = false;
        // this.$refs.video.pause();
        this.$store.commit('setIsPlaying', true);
        // this.$refs.audio.play();
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
    }
  }
};
</script>

<style lang="scss" scoped>
.audio-control-box {
  position: fixed;
  bottom: 48px;
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
    box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.06), 0 -2px 4px -1px rgba(0, 0, 0, 0.08), 0 -4px 5px 0 rgba(0, 0, 0, 0.07);
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
        color: #409eff;
      }
    }
    .copy {
      color: #666;
      &:active {
        color: #409eff;
      }
      &.active {
        color: #409eff;
      }
    }
  }
}
</style>
