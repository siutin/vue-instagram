<template>
    <div class="grid">
        <template v-for="i in range(1, 18)" >
          <grid-item :model="String(i)" :key="i">            
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
    margin: 0;
    text-align: center;
    font-size: 30px;
    
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
    width: calc(33.3%);  
  }

  .grid > div.item:nth-child(odd) {
      background-color: #ffff11;
  }

  .grid > div.item:nth-child(even) {
      background-color: #ff11ff;
  }  
}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {
  .grid > div.item {
      width: calc(50%);
  }

  .grid > div.item:nth-child(2n+1) {
      background-color: #ffff11;
  }

  .grid > div.item:nth-child(2n+2) {
      background-color: #ff11ff;
  }  
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (max-width: 480px) {
  .grid > div.item {
      width: calc(100%);
      
  }

  .grid > div.item:nth-child(odd) {
      background-color: #ffff11;
  }

  .grid > div.item:nth-child(even) {
      background-color: #ff11ff;
  }  
}

</style>
