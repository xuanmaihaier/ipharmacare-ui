
## Install
```shell
npm config set registry http://10.1.1.161:4837/
npm i web-vue2-front-end-lib -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'web-vue2-front-end-lib'

Vue.use(Element)

// or
import {
  Select,
  Button
  // ...
} from 'web-vue2-front-end-lib'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
For more information, please refer to [Quick Start](http://element.eleme.io/#/en-US/component/quickstart) in our documentation.

