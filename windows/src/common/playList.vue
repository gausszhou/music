<template>
  <div class="play-list">
    <div class="play-list-title">播放列表</div>
    <div class="play-list-control">
      <div class="total">总{{$store.state.playList.length}}首</div>
      <div class="subscribe">
        <i></i>
        收藏全部
      </div>
      <div class="clearall">
        <i></i>
        清空全部
      </div>
    </div>
    <ul class="play-list-box">
      <li class="song-item overEllipsis" v-for="(item,index) in $store.state.playList" :key="item.id">
        <span class="name overEllipsis">{{item.name}}</span>
        <span class="mv-tag" v-if="item.mvid">MV</span>
        <span class="author" v-for="(author,index) in item.author" :key="index">{{author.name}}.</span>
        <span class="album overEllipsis">{{item.albumname}}</span>
        <a
          href="javascript:;"
          class="iconfont play-button"
          :class="index == $store.state.activeIndex?'icon-pause-mobile':'icon-play-mobile'"
          @click="playMusic(item,index)"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    playMusic(item, index) {
      this.$store.dispatch('playMusic', item);
      this.$store.commit('setIndex', index);
    },
  },
}
</script>

<style lang="scss" scoped>
.play-list {
  z-index: 50;
  position: fixed;
  right: 0;
  bottom: 80px;
  width: 420px;
  height: calc(100vh - 120px);
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  .play-list-title {
    height: 40px;
    line-height: 40px;
    width: 210px;
    margin: 20px auto;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 40px;
    font-size: 20px;
  }
  .play-list-control {
    display: flex;
    margin: 10px 5px 5px 5px;
    padding: 0 0 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    .total {
      width: 180px;
    }
    .subscribe {
      flex: 1;
    }
    .clearall {
      flex: 1;
    }
  }
}

.song-item {
  width: 100%;
  height: 30px;
  padding: 0;
  margin: 8px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;

  .name {
    font-size: 16px;
    width: 180px;
  }
  .author {
    font-size: 14px;
  }
  .album {
    font-size: 12px;
    color: #666;
    flex: 1;
    text-align: center;
  }
  .mv-tag {
    position: relative;
    top: -5px;
    right: -5px;
    font-size: 12px;
    color: red;
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