<template>
  <div>
    <div class="container-fluid" id="mainTabs">
      <div class="row">
        <div class="col-md-8">
          <div id="diagramContent">
            <bar-chart :data = "chartData" height = "85vh ":curve="true"></bar-chart>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row">
            <h5>Фильтры</h5>
          </div>
          <div class="row">
            <h6>Выберите критерии для сравнения</h6>
          </div>
          <div class="container-fluid"id="criterionsContainer">
            <transition-group
              enter-active-class="animated slideInLeft"
              mode = "out-in">
              <div v-for="(item, index) in criterionsList.features" :key="index">
                <input type="checkbox" class="checkbox"
                       :value="item.feature_name"
                       :key="index"
                       v-model="filters.features">{{item.feature_name}}
              </div>
            </transition-group>
          </div>
          <div class="row">
            <h6>Выберите регион</h6>
          </div>
          <div  class="container-fluid" id="regionsContainer">
            <transition-group
              enter-active-class="animated slideInLeft"
              mode = "out-in">
              <div v-for="(item, index) in regions.area" :key="index">
                <input type="checkbox" class="checkbox"
                       :value="item.area_name"
                       :key="index"
                       v-model="localityRegion"
                       @change= "loadLocality">{{item.area_name}}
              </div>
            </transition-group>
          </div>
          <div class="row">
            <h6>Укажите город</h6>
          </div>
            <transition
              enter-active-class="animated slideInLeft"
              leave-active-class="animated fadeOut"
              mode = "out-in">
              <div class="container-fluid" id="localityContainer">
                <transition-group
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated fadeOutDown">
                  <div v-for="(object, index) in localities" :key="index">
                    <div v-for="(item, index) in object.locality" :key="index">
                      <input type="checkbox" class="checkbox"
                             :value = "item.locality_name"
                             :key="index"
                             v-model="filters.city">{{item.locality_name}}
                    </div>
                  </div>
                </transition-group>

              </div>
            </transition>
          <hr>
            <div class="row">
              <div class="col-md-6">
                <button type="button" class = "btn btn-secondary btn-purple btn-block" @click = "updateDiagram">Показать</button>
              </div>
              <div class="col-md-6">
                <button type="submit" class = "btn btn-default btn-block" @click = "getReport">Отчет</button>
              </div>
            </div>
            <div class="row  justify-content-center">
              <form action="http://127.0.0.1:5000/get_report" method="post">
                <transition
                  enter-active-class="animated slideInUp"
                  leave-active-class="animated fadeOutDown"
                  mode = "out-in">
                    <button type="submit" class="btn btn-primary" v-if="report">Скачать отчет</button>
                </transition>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "Diagrams",
      data: function () {
        return {
          criterionsList: [],
          filters : {
            features : [],
            city : [],
          },
          regions : [],
          localities : [],
          localityRegion : [],
          chartData: [
            {name: '1', data: {'2017-01-01': 3, '2017-01-02': 4}},
            {name: '2', data: {'2017-01-01': 5, '2017-01-02': 3}}
          ],
          report : false
        }
      },
      methods : {
        loadLocality(){
              this.localities =[];
              let arr = {
                "area_name" : ""
              };
              if (this.localityRegion.length !== 0){
                for (let n in this.localityRegion) {
                  arr.area_name = this.localityRegion[n];
                  this.$http.post('get_locality', arr).then(response => {
                    arr = response.body;
                    this.localities.push(arr)
                  });
                }
              }
        },
        updateDiagram(){
          this.$http.post('get_feature_locality', this.filters).then(response => {
            this.chartData = response.body
          })
        },
        getReport(){
          this.report = !this.report
          this.$http.post('prepare_report', this.chartData).then(response => {
            console.log(response)
          })
        }
      },
      created(){
        this.$http.get('get_feature').then(response => {
          this.criterionsList = response.body;
        });
        this.$http.post('get_area').then(response => {
          this.regions = response.body;
        })
      }
    }
</script>

<style scoped>
  #mainTabs{
    margin-top: 20px;
  }
  #diagramContent{
    height: 85vh;
  }
  h5, h6{
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
  }
  #criterionsContainer,#regionsContainer,#localityContainer{
    height: 18vh;
    overflow-y: scroll;
  }
  #wantCity + label{
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
  }
  #wantCity{
    left: 20vh;
    margin-top: 3.5px;
  }
  /*****************************/
  .checkbox {
    position: relative;
    margin: 0 1rem 0 0;
    cursor: pointer;
  }

  .checkbox:before {
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    content: "";
    position: absolute;
    left: 0;
    z-index: 1;
    width: 1rem;
    height: 1rem;
    border: 2px solid purple;
  }

  .checkbox:checked:before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    height: .5rem;
    border-color: purple;
    border-top-style: none;
    border-right-style: none;
  }

  .checkbox:after {
    content: "";
    position: absolute;
    top: -0.125rem;
    left: 0;
    width: 1.1rem;
    height: 1.1rem;
    background: #fff;
    cursor: pointer;
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: purple;
  }
</style>
