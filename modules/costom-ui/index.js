import CusTransfer from "./Transfer"
export { CusTransfer as Transfer }

import "./style.css"
const components = {
  CusTransfer,
}

export default {
  install(app) {
    for (let component in components) {
      app.component(component, components[component])
    }
  },
}
