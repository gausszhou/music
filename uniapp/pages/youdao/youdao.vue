<template>
  <div>
    <audio :src="audioUrl" autoplay></audio>
    <button class=" button-random" @click="random">Random</button>
    <img class="language-pic" :src="type == 1 ? UKUrl : USUrl" @click="toggle" />
    <div class="input-box">
      <label>模糊搜索</label>
      <input class="input-search" v-model="search"></input>
    </div>
    <div class="container candidate">
      <div class="word-card-box" v-for="(item, index) in list" :key="index" @click="play(item)">
        <card class="word-card">
          <div>
            <div>
              <div class="title">{{ item.word }}</div>
              <div class="subhead">{{ item.explain }}</div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="word-card-box" v-for="(item, index) in wordList" :key="index" @click="play(item)">
        <card class="word-card">
          <div>
            <div>
              <div class="title">{{ item.word }}</div>
              <div class="subhead">{{ item.explain }}</div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordList: [],
      wordListCache: [],
      audioUrl: '',
      search: '',
      type: 1,
      UKUrl: require('../../static/images/UK.png'),
      USUrl: require('../../static/images/US.png')
    };
  },
  created() {
    this.getWordList();
  },
  computed: {
    list() {
      let arr = [];
      if (this.search.length) {
        arr = this.wordListCache.filter(item => {
          return item.word.toLowerCase().includes(this.search.toLowerCase());
        });
        arr = arr.slice(0, 10);
      } else {
        arr = [];
      }
      return arr;
    }
  },
  methods: {
    getWordList() {
      this.$http.getWordList().then(res => {
        console.log(res);
        this.wordListCache = JSON.parse(res.data).data;
        this.random();
      });
    },
    toggle() {
      this.type = Number(!this.type);
    },
    random() {
      let arr = this.wordListCache;
      let len = arr.length;
      while (len) {
        let idx = parseInt(Math.random() * len);
        [arr[len - 1], arr[idx]] = [arr[idx], arr[len - 1]];
        len--;
      }
      console.log(this.wordListCache);
      this.wordList = this.wordListCache.splice(0, 100);
    },
    play(item) {
      this.audioUrl = `http://dict.youdao.com/dictvoice?type=${this.type}&audio=` + item.word;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.candidate {
  background-color: #666;
  margin: 10px 10px 0;
}
.word-card-box {
  flex: 1;
  margin: 5px;
  * {
    padding: 0 5px;
  }
  .word-card {
    margin: 0;
    padding: 0;
    cursor: pointer;
    .div {
      margin-bottom: 5px;
    }
    .title {
      margin: 0;
      margin-top: 0;
      font-size: 16px;
    }
    .subhead {
      white-space: nowrap;
    }
    &:hover {
      animation: breath 2s ease-in-out infinite;
    }
  }
}

@keyframes breath {
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
}
.button-random,
.language-pic {
  color: #fff;
  position: fixed;
  top: 10px;
  z-index: 10;
  height: 36px;
}
.button-random {
  margin: 0;
  left: 10px;
  width: 80px;
}

.language-pic {
  left: 120px;
  background-color: #fff;
  border: none;
  border-radius: 0;
  cursor: pointer;
}
</style>
