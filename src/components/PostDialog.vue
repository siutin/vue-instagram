<template>
  <div id="dialog">
    <div class="dialog__image" :style="{ backgroundImage: dialogImage }"></div>
    <div class="dialog__content">
      <div class="profile dialog__content__profile noselect">
        <div class="icon icon-normal" :style="{ backgroundImage: `url(${_.get(model, 'author.icon')})` }"></div>
        <div class="name">{{ _.get(model, "author.name") }}</div>
        <div class="follow"><a href="">follow</a></div>
      </div>
      <div class="dialog__content__messages">
        <div class="messages__item" v-for="(message, j) in _.get(model, 'messages')" :key="j">
          <message-item-profile-section
            :id="`this-post-at-${j}`"
            :name="_.get(message, 'name')"
            :icon="_.get(message, 'icon')"
          >
          </message-item-profile-section>
          <div class="messages__item__second">
            <pre>{{ _.get(message, 'text') }}</pre>
          </div>
          <message-item-bottom-item
          :id="`${j}`"
          :likes="_.get(message,'likes')"
          :replies="_.get(message,'replies')"
          :post-at="_.get(message,'postAt')"
          @click-on-reply-button="() => clickOnReplyButton(j)"
          ></message-item-bottom-item>
          <div class="messages__item__forth noselect">
            <div class="view__replies" @click="clickOnViewReplies(j)" v-if="_.get(message, 'subMessages').length > 0"> {{ canShowReplies(j) ? 'Hide' : 'View' }} Replies </div>
          </div>
          <div class="messages__item__fifth" v-show="canShowReplies(j)">
            <div class="messages__item" v-for="(subMessage, k) in _.get(message, 'subMessages')" :key="`${j}-${k}`">
              <message-item-profile-section
                :id="`profile-post-at-${k}`"
                :name="_.get(subMessage, 'name')"
                :icon="_.get(subMessage, 'icon')"
              >
              </message-item-profile-section>
              <div class="messages__item__second">
                <pre>{{ _.get(subMessage, 'text') }}</pre>
              </div>
              <message-item-bottom-item
              :id="`${j}-${k}`"
              :likes="_.get(subMessage, 'likes')"
              :post-at="_.get(subMessage, 'postAt')"
              @click-on-reply-button="() => clickOnReplyButton(j,k)"
              ></message-item-bottom-item>

            </div>
          </div>
        </div>
      </div>
      <div class="messages__form">
        <form action="" @submit.prevent="onReply">
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
import MessageItemBottomItem from './message_components/BottomItem'
import MessageItemProfileSection from  './message_components/ProfileSection'
import { randRange, genSentence, genName } from './../generator'
import { subSeconds } from 'date-fns'

export default {
  name: 'PostDialog',
  props: {
    id: String
  },
  components: {
    MessageItemBottomItem, MessageItemProfileSection
  },
  data () {
    return {
      dialogImage: '',
      dialogIcon: '',
      inputText: '',
      replyId: -1,
      viewReplies: [],
      model: {}
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
    displayDateTime (x) {

      let different = new Date() - this.randDate(x)

      let unitValues = [31536000, 604800, 86400, 3600, 60, 1] // (year week day hour minute second)
      let units = ['y', 'w', 'd', 'h', 'm', 's']

      let t = different / 1000
      let d = new Array(6).fill(0)

      let result = unitValues.reduce((obj, unitValue, i) => {
        obj.d[i] += Math.round( obj.t / unitValue )
        obj.t = t % unitValue
        return obj
      }, { t, d })

      let s = new Array
      if (result.d[0] > 0) {
       s.push(`${result.d[0]}${units[0]}`) // y
      } else if (result.d[1] > 0) {
       s.push(`${result.d[1]}${units[1]}`) // w
      } else if (result.d[2] > 0) {
       s.push(`${result.d[2]}${units[2]}`) // d
      } else if (result.d[3] > 0) {
       s.push(`${result.d[3]}${units[3]}`) // d
      } else if (result.d[4] > 0) {
       s.push(`${result.d[4]}${units[4]}`) // d
      } else if (result.d[5] > 0) {
       s.push(`${result.d[5]}${units[5]}`) // s
      }

      return s.join(' ')
    },
    randDate (x) {
      return subSeconds(new Date(), this.randRange(3600 * x * x, 3600 * x * x * 2))
    },
    canShowReplies (repliesId) {
      return this.viewReplies.includes(repliesId)
    },
    clickOnViewReplies (repliesId) {
      console.log(`clickOnViewReplies - ${repliesId}`)
      if(this.canShowReplies(repliesId)){
        this.viewReplies = this.viewReplies.filter(id => id !== repliesId)
      } else {
        this.viewReplies.push(repliesId)
      }
    },
    clickOnReplyButton (messageId, subMessageId) {
      console.log(`clickOnReplyButton - ${messageId} - ${subMessageId}`)
      if (typeof messageId !== 'number') {
        return
      }
      let messages = this._.get(this.model, `messages`, {})
      let message = this._.find(messages, message => message.id === messageId)
      let name = ""
      if (typeof subMessageId === 'number') {
        let subMessages = this._.get(message, 'subMessages', {})
        let subMessage = this._.find(subMessages, message => message.id === subMessageId)
        name = this._.get(subMessage, "name", {})
      } else {
        name = this._.get(message, "name", {})
      }
      console.log(`name: ${name}`)
      this.inputText = `@${name} `
      this.replyId = messageId
    },
    onReply () {
      console.log('onReply')

      if (this.replyId == -1) {
        let author = this._.get(this.model, 'author', {})
        let id = this._.get(this.model, 'messages.length', 0)
        this.model.messages.push({
          id,
          name: author.name,
          icon: author.icon,
          text: this.inputText,
          likes: randRange(0, 999),
          replies: 0,
          postAt: this.displayDateTime(this.id + id),
          subMessages: []
        })
      } else {
        let author = this._.get(this.model, 'author', {})
        let messages = this._.get(this.model, `messages`, {})
        let message = this._.find(messages, message => message.id === this.replyId)
        let id = this._.get(message, 'subMessages.length', 0)
        message.subMessages.push({
          id,
          name: author.name,
          icon: author.icon,
          text: this.inputText,
          likes: randRange(0, 999),
          replies: 0,
          postAt: this.displayDateTime(this.id + id)
        })
      }

      this.inputText = ''
      this.replyId = -1
    },
    setup() {
      this.dialogIcon =  `url(${this.getIconImg(this.id % 9 )})`
      this.dialogImage = `url(${this.getBackgroundImage(this.id, 1024)})`

      let author = {
          name: genName(),
          icon: this.getIconImg(this.id % 9 )
      }

      let messages = [...Array(randRange(2, 6)).keys()].map( j => {
      let subMessagesCount = randRange(0, 6)
      return {
          id: j,
          name: j == 0 ? author.name : genName(),
          icon: j == 0 ? author.icon : this.getIconImg( (this.id + j - 1) % 9 ),
          text: genSentence(randRange(1, 3)).join('\r\n'),
          likes: randRange(0, 999),
          replies: subMessagesCount,
          postAt: this.displayDateTime(this.id + j),
          subMessages: [...Array(subMessagesCount).keys()].map(k => ({
            id: k,
            name: genName(),
            icon: this.getIconImg( (this.id + k - 1) % 9 ),
            text: genSentence(randRange(1, 3)).join('\r\n'),
            likes: randRange(0, 999),
            postAt: this.displayDateTime(this.id + j * k),
          }))
      }
      })
      this.model = {
        author: author,
        messages: messages
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter - PostDialog')
    next(vm => (vm.setup.bind(vm))())
  },
   beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate - PostDialog')
    this.setup()
    next()
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
    width:  65vh;
    height: 65vh;
  }
}

@media (orientation: portrait) {
  .dialog__image {
    max-width: 1024px;
    max-height: 1024px;
    width: 65vw;
    height: 65vw;
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
  background-color: #f5f5f5;
}

.dialog__content__messages::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
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
  padding: 0.3em 0.3em 0.3em 0.3em;
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

  cursor: pointer;
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
      width: 55vh;
      height: 55vh;
    }
  }

  @media (orientation: portrait) {
    .dialog__image {
      max-width: 512px;
      max-height: 512px;
      width: 55vw;
      height: 55vw;
    }
  }

  .dialog__content {
    width: 235px;
  }
}

@media (min-width: 481px) and (max-width: 640px) {

  #dialog {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    height: 80%;
  }

  @media (orientation: landscape) {
    .dialog__image {
      /*  */
      width: 55vh;
      height: 55vh;
    }
  }

  @media (orientation: portrait) {
    .dialog__image {
      width: 55vw;
      height: 55vw;
    }
  }

  .dialog__content {
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
