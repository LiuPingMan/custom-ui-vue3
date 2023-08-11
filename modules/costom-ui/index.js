import CusTransfer from './Transfer'
import CusHorizontalCalendar from './HorizontalCalendar'
export { CusTransfer, CusHorizontalCalendar }

import './style.css'
const components = {
  CusTransfer,
  CusHorizontalCalendar,
}

export default {
  install(app) {
    for (let component in components) {
      app.component(component, components[component])
    }
  },
}
