<template>
  <vue100vh :css="{height: '100rvh'}">
    <div id="app">
      <div id="container" v-if="!isMobile || (isMobile && !isShowDialog)">
        <router-view name="page"/>
      </div>
      <div id="dialog-container" class="fade" v-if="isShowDialog">
        <div id="cover" @click="closeDialog" v-if="!isMobile"></div>
        <router-view name="dialog"></router-view>
      </div>
    </div>
  </vue100vh>
</template>

<script>
import vue100vh from 'vue-100vh'

export default {
  name: 'app',
  components: { vue100vh },
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    isMobile () {
      return this.windowWidth <= 480
    },
    isShowDialog () {
      return this.$route.name === "post"
    }
  },
  methods: {
    closeDialog(e) {
      console.log("closeDialog")
      this.$router.push({ name: 'explore' })
    },
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }
}
</script>

<style scoped>
#cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 0.5;

  z-index: 998;
}

#dialog-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content:center;
  flex-direction: column;
}
</style>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

  * {
    margin: 0;
    padding: 0;
  }

  input:focus, textarea:focus {
      outline: 0;
  }

  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 10pt;

    /* retain dialog position */
    height: 100%;
    overflow-y: scroll;
  }

  #container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
  }

   header {
     padding: 0 10px 0 10px;
   }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }

  .profile {
    display: flex;
    align-items: center;
  }

  .profile > .name {
    padding: 0 0.6em 0 0.6em;
  }

  .profile > .follow {
    padding: 0 0.6em 0 0;
  }

  .profile > .follow > a {
    font-size: 0.8em;
    text-decoration: none;
  }

  .icon-normal {
    width: 45px;
    height: 45px;
  }

  .icon-small {
    width: 30px;
    height: 30px;
  }

  .icon {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;

    border: 1px solid #fff;
    box-shadow: 0 0 0 1px #aaa;

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  /*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px
*/
@media (min-width: 768px) {
  .grid > div.item {
    flex-basis: calc(33.333% - 20px);
  }

  .grid > div.item:nth-child(odd) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(even) {
      background-color: #eeeeee;
  }
}

/*
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 481px) and (max-width: 767px) {
  .grid > div.item {
    flex-basis: calc(50% - 20px);
  }

  .grid > div.item:nth-child(2n+1) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(2n+2) {
      background-color: #eeeeee;
  }
}

/*
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (max-width: 480px) {

  .grid > div.item {
    flex-basis: calc(100% - 20px);
  }

  .grid > div.item:nth-child(odd) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(even) {
      background-color: #eeeeee;
  }
}

</style>