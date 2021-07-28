import Card from '@/components/card'
import CountUp from '@/components/countup/index'
import MapOverlaySwitches from '@/components/v-map/map-overlay-switches'
const sourceUse = (app) => {
  app.component('card', Card)
  app.component('count-up', CountUp)
  app.component('map-overlay-switches', MapOverlaySwitches)
}

export default sourceUse
