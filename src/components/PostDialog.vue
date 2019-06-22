<template>
  <div id="dialog">
    <div class="dialog__image" :style="{ backgroundImage: dialogImage }"></div>
    <div class="dialog__content">
      <div class="profile dialog__content__profile">
        <div class="icon icon-normal" :style="{ backgroundImage: dialogIcon}"></div>
        <div class="name">{{ genName() }}</div>
        <div class="follow"><a href="">follow</a></div>
      </div>
      <div class="dialog__content__messages">
        <div class="messages__item" v-for="j in randRange(2, 6)" :key="j">
          <message-item-profile-post-at-section
            :id="`profile-post-at-${j}`"
            :name="genName()"
            :icon="getIconImg( (id + j - 1) % 9 )"            
          >
          </message-item-profile-post-at-section>
          <div class="messages__item__second">
            <pre>{{ genSentence(randRange(1, 3)).join('\r\n') }}</pre>
          </div>
          <message-item-like-reply-item 
          :id="`like-reply-${j}`"
          :likes="randRange(0, 999)"
          :replies="randRange(0, 10)"
          :post-at="displayDateTime()"
          ></message-item-like-reply-item>
          <div class="messages__item__forth">
            <div class="view__replies"> View Replies </div>            
          </div>          
          <div class="messages__item__fifth">
            <div class="messages__item" v-for="k in randRange(0, 3)" :key="k">
              <message-item-profile-post-at-section
                :id="`profile-post-at-${k}`"
                :name="genName()"
                :icon="getIconImg( (id + k - 1) % 9 )"
                :post-at="displayDateTime()"
              >
              </message-item-profile-post-at-section>
              <div class="messages__item__second">
                <pre>{{ genSentence(randRange(1, 3)).join('\r\n') }}</pre>
              </div>
              <message-item-like-reply-item 
              :id="`like-reply-${k}`"
              :likes="randRange(0, 999)"
              :post-at="displayDateTime()"
              ></message-item-like-reply-item>

            </div>
          </div>
        </div>
      </div>
      <div class="messages__form">
        <form action="">
          <div>
            <input type="text" id="text" name="message[text]" v-model="inputText"/>
          </div>
          <div>
            <input type="submit" value="reply" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MessageItemLikeReplyItem from './message_components/LikeReplyItem'
import MessageItemProfilePostAtSection from  './message_components/ProfilePostAtSection'
import { randRange, genSentence, genName } from './../generator'
import { formatDistance, subSeconds } from 'date-fns'

export default {
  name: 'PostDialog',
  props: {
    id: Number
  },
  components: {
    MessageItemLikeReplyItem, MessageItemProfilePostAtSection
  },
  data () {
    return {
      dialogImage: '',
      dialogIcon: ''
    }
  },
  computed: { },
  methods: {
    range (start, count) {
      return Array(count).fill(start).map((x, y) => x + y)
    },
    randRange (start, length) { return randRange(start, length) },
    genSentence (count) { return genSentence(count) },
    genName(count) { return genName(count) },
    getBackgroundImage (id, width) {
      return `https://picsum.photos/id/${id}/${width}`
    },
    getIconImg (id) {
      return require(`./../assets/icons/${id}.jpeg`)
    },
    displayDateTime () {
      return formatDistance(subSeconds(new Date(), randRange(0, 86400*365)), new Date(), { addSuffix: true })
    }
  },
  mounted () {
    this.dialogIcon =  `url(${this.getIconImg(this.id % 9 )})`
    this.dialogImage = `url(${this.getBackgroundImage(this.id, 1024)})`
  }
}
</script>

<style scoped>

#dialog {
  background-color: #eeeeee;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

@media (orientation: landscape) {
  .dialog__image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vh;
    height: 60vh;
  }
}

@media (orientation: portrait) {
  .dialog__image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vw;
    height: 60vw;
  }
}

.dialog__image {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;
  z-index: 999;
}

.dialog__content {
  width: 335px;
  text-align: left;

  position: relative;
  z-index: 999;
}

.dialog__content__profile {
  padding: 5px;
  height: 50px;

  position: relative;
  top: 0;
  left: 0;
  
  background-color: white;

  border-bottom: 1px solid #eeeeee;
  -webkit-box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  z-index: 999;
}

.dialog__content__messages {
  padding: 0.3em;
  overflow-y: scroll;

  position: absolute;
  width: calc(100% - 0.6em);
  height: calc(100% - 0.6em - (50px + 5px + 5px + 1px) - 30px);
  top: calc(50px + 5px + 5px + 1px);
  left: 0;
  right: 0;
  bottom: calc(30px + 0.3em);

  background-color: white;
}

.dialog__content__messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

.dialog__content__messages::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.dialog__content__messages::-webkit-scrollbar-thumb {
  background-color: #aaaaaa;
}

.messages__item {
  padding: 0.15em;
}

.messages__item > :first-child {
  padding: 0.3em 0.3em 0.3em 0.3em;
}
.messages__item > :nth-child(2) {
  padding: 0.3em 0 0.3em 0;
}
.messages__item > :nth-child(3) {
  padding: 0.3em 0 0.3em 0;
}

.messages__item > :nth-child(4) {
  padding: 0 0 0 2.6em;
}

.messages__item > :nth-child(5) {
  padding: 0 0 0 2.6em;
}

.messages__item pre {
  text-align: left;
  white-space: normal;
  font-size: 8pt;
}

.view__replies {

  padding: 0.6em;

  overflow: hidden;
  text-align: left;
  
  font-size: 7pt;
  color: #444;
}

.view__replies:before {
  background-color: #aaaaaa;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  right: 12.5%;
  vertical-align: middle;
  width: 30%;
}

.messages__form {
  height: 30px;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;

  -webkit-box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
  box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
}

.messages__form > form {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  height: 100%;
  width: 100%;
}

.messages__form > form > :first-child {
  padding: 0 0.3em 0em 0.3em;
  width: 100%;
}
.messages__form > form > :last-child {
  width: 20%;
  border-left: 1px solid #eeeeee;  
}

.messages__form > form > div > * { 
  width: 100%;
  height: 100%;
}

.messages__form > form input {
  border: 0;  
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.messages__form > form * {
  color: #444;
  font-size: 9pt;
  background-color: white;
}

@media (min-width: 641px) and (max-width: 960px) {

  @media (orientation: landscape) {
    .dialog__image {
      max-width: 512px;
      max-height: 512px;
      width: 50vh;
      height: 50vh;
    }
  }

  @media (orientation: portrait) {
    .dialog__image {
      max-width: 512px;
      max-height: 512px;
      width: 50vw;
      height: 50vw;
    }
  }

  .dialog__content {
    width: 235px;
  }
}

@media (min-width: 481px) and (max-width: 640px) {

  #dialog {
    /*  */
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    height: 80%;
  }

  @media (orientation: landscape) {
    .dialog__image {
      /*  */
      width: 50vh;
      height: 50vh;
    }
  }

  @media (orientation: portrait) {
    .dialog__image {
      /*  */
      width: 50vw;
      height: 50vw;
    }
  }

  .dialog__content {
    /*  */
    width: 100%;
    flex: 1;
  }

}

@media (max-width: 480px) {

  #dialog {
    display: initial;
    flex-wrap: initial;
    flex-direction: initial;

    height: 100%;
    width: 100%;
  }

  @media (orientation: landscape) {
    .dialog__image {
      width: 100vh;
      height: 100vh;
    }
  }

  @media (orientation: portrait) {
    .dialog__image {
      width: 100vw;
      height: 100vw;
    }
  }

  .dialog__image {
    position: initial;
  }

  .dialog__content {
    width: 100%;
    position: initial;
  }

  .dialog__content__profile {
    position: initial;
    top: initial;
    left: initial;
  }

  .dialog__content__messages {
    width: calc(100% - 0.6em);
    position: initial;
    height: initial;
    top: initial;
    left: initial;
    right: initial;
    bottom: initial;
  }

  .messages__form {
    position: fixed;
  }
}

</style>
