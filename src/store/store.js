import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    listFeatures : []
  },
  mutations:{
    toMap(state,list){
      state.listFeatures = list
    }
  }
});
