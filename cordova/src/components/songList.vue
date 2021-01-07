<template>
  <!-- 歌曲列表组件，需要传入的参数{itemList: Array} -->
  <!-- id mvid  name  author album picUrl-->
  <ul class="song-list">
    <li v-for="item in itemList" :key="item.id" class="song-item">
      <div class="song-info overEllipsis">
        <div class="overEllipsis">
          <span class="name">{{item.name}}</span>
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
    playMusic(item) {
      this.$store.dispatch('getMusic', item);
    }
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3.375rem;
}

.song-item {
  width: 100%;
  padding: 0;
  margin: 0.25rem;
  overflow: hidden;
  display: flex;
  font-family: Helvetica, sans-serif, STHeiTi;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  .song-info {
    flex: 1 1 auto;
    .name {
      font-size: 0.5rem;
    }
    .album {
      font-size: 0.375rem;
      color: rgba($color: #000000, $alpha: 0.6);
    }
    .mv-tag {
      position: relative;
      top: -0.15625rem;
      right: -0.15625rem;
      font-size: 0.375rem;
      color: red;
    }
  }
  .play-button {
    font-size: 28px;
    color: #bbb;
    line-height: 40px;
  }

  &:hover {
    .play-button {
      color: #333;
      text-decoration: none;
    }
  }
}
</style>