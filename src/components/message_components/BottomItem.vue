<template>
  <div class="messages__item__third noselect">
    <div class="messages__item__third__item post-at">
      <div>{{ postAt }}</div>
    </div>
    <div class="messages__item__third__item like">
      <div>{{ getLikes }}</div>
      <div @click="clickOnLike"><img v-lazy="getLikeImg" class="fade-img" :key="`${id}-${isCurrentLiked}`" /></div>
    </div>
    <div class="messages__item__third__item reply" @click="$emit('click-on-reply-button', id)">
      <div v-if="isShowReplyCount" >{{ this.replies }}</div>
      <div><img v-lazy="require('@/assets/comment-white-oval-bubble.png')" class="fade-img" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomItem',
  props: {
    id: String,
    likes: Number,
    replies: Number,
    postAt: String,
    clickOnReplyButton: Function
  },
   data () {
    return {
      isCurrentLiked: false
    }
  },
  computed: {
    isShowReplyCount() {
      return this.replies !== undefined && this.replies !== null
    },
    getLikeImg () {
      return this.isCurrentLiked ? require('@/assets/like_red.png') : require('@/assets/like_blank.png')
    },
    getLikes () {
      return this.likes + (this.isCurrentLiked ? 1 : 0)
    }
  },
  methods: {
    clickOnLike () {
      console.log(`clickOnLike - ${this.isCurrentLiked}`)
      this.isCurrentLiked = !this.isCurrentLiked
    }
  },
  mounted () {
    this.isCurrentLiked = Math.round(Math.random()) == 1
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

.messages__item__third__item.like img {
  /* this prevent the weird quality of like button during the animation */
  -webkit-filter: contrast(100%);
  filter: contrast(100%);
}

.messages__item__third__item.reply img {
  -webkit-filter: contrast(20%);
  filter: contrast(20%);
}

.post-at {
  text-align: right;
  white-space: normal;

  font-size: 7pt;
  color: #444;
}

</style>
