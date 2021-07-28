import { createStore } from 'vuex'
import map from './map'
const modules = {
  map: map
}
export default createStore({
  modules
})
