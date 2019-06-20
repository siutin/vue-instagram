<template>
  <div class="messages__item__third">
    <div class="messages__item__third__item like">
      <div>{{ likeCount }}</div>
      <div @click="clickOnLike"><img :src="getLikeImg" /></div>
    </div>
    <div class="messages__item__third__item reply">
      <div>{{ replyCount }}</div>
      <div><img :src="require('@/assets/comment-white-oval-bubble.png')" /></div>
    </div>
  </div>
</template>

<script>
import { randRange } from './../../generator'

export default {
  name: 'LikeReplyItem',
  props: {
    id: Number
  },
   data () {
    return {
      isCurrentLiked: false,
      likeCount: 0,
      replyCount: 0
    }
  },
  computed: {
    getLikeImg () {
      return this.isCurrentLiked ? require('@/assets/like_red.png') : require('@/assets/like_blank.png')
    }
  },
  methods: {
    randRange (start, length) { return randRange(start, length) },
    clickOnLike (e) {
      console.log(`clickOnLike - ${this.isCurrentLiked}`)
      this.isCurrentLiked = !this.isCurrentLiked
    }    
  },
  mounted () {
    this.likeCount = randRange(0, 999) 
    this.replyCount = randRange(0, 10) 
  }
}
</script>

<style scoped>

.messages__item__third {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-around;

  cursor: pointer;
}

.messages__item__third div {
  font-size: 0.6em;
}

.messages__item__third .messages__item__third__item {
  font-size: 1.2em;  

  display: flex;
  flex-direction: row;
  align-items: center;
}

.messages__item__third > .messages__item__third__item > div {
  padding: 0 0.3em 0 0.3em;
}

.messages__item__third > .messages__item__third__item img {
  height: 1.4em;
}

.messages__item__third__item.reply img {
  -webkit-filter: contrast(20%);
  filter: contrast(20%);
}

</style>
