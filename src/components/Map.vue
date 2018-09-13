<template>
  <div>
    <div class="container-fluid" id="mapContainer">
      <l-map ref="map" style="height: 100%;" :zoom="zoom" :center="center" :options = "mapOptions">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <div v-for="item in list">
          <l-circle :lat-lng = "item.cord" :radius = "2500">
              <l-popup :content="item.name + ' ' + item.data[year]"></l-popup>
          </l-circle>
        </div>
      </l-map>
      <div class="left-bottom-block">
        <div class="row" style = "background-color: whitesmoke; opacity: 1; border-radius: 3px;">
          <div class="col-md-1">
            <label for="yearSlider" id = "minYr">2010</label>
          </div>
          <div class="col-md-3">
            <div class="row">
              <input type="range" id="yearSlider" min = "2010" max = "2015" value = "2000" step="1" v-model="year">
            </div>
          </div>
          <div class="col-md-1">
            <label for="yearSlider">2017</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LCircle, LMarker, LPopup} from 'vue2-leaflet';
    export default {
        name: "Map",
      components:{
        LMap,
        LTileLayer,
        LCircle,
        LPopup
      },
      data(){
          return{
            c:{},
            list : [],
            content: '',
            year : '',
            zoom:4,
            mapOptions: { zoomControl: true},
            center: L.latLng(66.4166656, 94.2324906),
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }
      },
      methods:{
          contentPopup(data){
            this.content = 'Fuck'
          }
      },
      mounted() {
        setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
      },
      created(){
          this.list = this.$store.state.listFeatures;
          for (let el in this.list){
            let cord = [this.list[el].lat, this.list[el].lng];
            this.list[el].cord = cord
          }
      }
    }
</script>

<style scoped>
  #mapContainer{
    height: 90vh;
    padding: 0;
  }
  .left-bottom-block {
    position: absolute;
    bottom: 8px;
    padding-left: 5px;
    margin-left: 5px;
    left: 10px;
    z-index: 9999;
    height: 32px;
    width: 50%;
  }
  #yearSlider{
    margin-top: 20px;
  }
  #lblYear{
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
  }
  label[for = 'yearSlider']{
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;

  }
  /*Ссаненький слайдер*/
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 1.8px;
    cursor: pointer;
    box-shadow: 4.8px 4.8px 5.5px rgba(4, 0, 0, 0), 0px 0px 4.8px rgba(30, 0, 0, 0);
    background: rgba(33, 33, 33, 0.78);
    border-radius: 1px;
    border: 1.5px solid rgba(0, 0, 0, 0);
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #212121, 0px 0px 0px #2e2e2e;
    border: 1.8px solid #212121;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #9933cc;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10.6px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: rgba(36, 36, 36, 0.78);
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 1.8px;
    cursor: pointer;
    box-shadow: 4.8px 4.8px 5.5px rgba(4, 0, 0, 0), 0px 0px 4.8px rgba(30, 0, 0, 0);
    background: rgba(33, 33, 33, 0.78);
    border-radius: 1px;
    border: 1.5px solid rgba(0, 0, 0, 0);
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #212121, 0px 0px 0px #2e2e2e;
    border: 1.8px solid #212121;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #9933cc;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 1.8px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: rgba(30, 30, 30, 0.78);
    border: 1.5px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    box-shadow: 4.8px 4.8px 5.5px rgba(4, 0, 0, 0), 0px 0px 4.8px rgba(30, 0, 0, 0);
  }
  input[type=range]::-ms-fill-upper {
    background: rgba(33, 33, 33, 0.78);
    border: 1.5px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    box-shadow: 4.8px 4.8px 5.5px rgba(4, 0, 0, 0), 0px 0px 4.8px rgba(30, 0, 0, 0);
  }
  input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #212121, 0px 0px 0px #2e2e2e;
    border: 1.8px solid #212121;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: #9933cc;
    cursor: pointer;
    height: 1.8px;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: rgba(33, 33, 33, 0.78);
  }
  input[type=range]:focus::-ms-fill-upper {
    background: rgba(36, 36, 36, 0.78);
  }
  /* Popup container */
  .popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
</style>
