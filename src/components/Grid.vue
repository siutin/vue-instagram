<template>
    <div class="grid">
        <template v-for="i in range(1, 18)" >
          <grid-item :model="String(i)" :id="i" :key="i">            
          </grid-item>
        </template>
    </div>
</template>

<script>
import GridItem from './GridItem'
export default {
    components: { GridItem },
    name: 'Grid',
    methods: {
      range (start, count) {
        return Array(count).fill(start).map((x, y) => x + y)
      }
    }
}
</script>

<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
}

.grid > div.item {
  text-align: center;
  font-size: 30px;
  position: relative;
  margin: 10px;
  border: 1px solid #aaaaaa;
  box-sizing: border-box;
}

.grid > div.item:before {
  content: "";
  float: left;
  padding-top: 100%;
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
