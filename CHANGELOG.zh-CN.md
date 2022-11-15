## 更新日志（所有版本目前基于element2.15.9）

### 1.0.26

*2022-11-15*

#### fix 修改
- 将所有文件中别名使用`element-ui`替换成`web-vue2-front-end-lib`
- 修改按钮样式权重为root级

### 1.0.24

*2022-11-15*

#### feat 新增功能
- 项目增加了`ip-sidebar`侧边栏组件

#### fix 修改
- 移除`ip-tapbar`path属性，改用activeMenu代替，并在销毁阶段移除了resize事件
- 移除了组件库每次加载验证element域名的代码

### 1.0.23

*2022-11-11*

#### feat 新增功能
- 项目增加了`ip-tapbar`头部组件

### 1.0.22

*2022-11-11*

#### feat 新增功能
- 项目增加了`ip-more`更多组件

#### fix 修改
- 移除了ip-message的`setWidth`方法，后期放在ip-topbar中暴露
- 移除了ip-file-download的`exportModule`和`exportModule_`配置项，因为内部不存在这两个参数的处理，外部直接带入请求即可

### 1.0.20

*2022-11-10*

#### feat 新增功能
- 项目增加了`websocket`支持
- 增加了`websocket`消息盒子组件

### 1.0.19

*2022-11-08*

#### feat 新增功能
- 增加了业务css文件 在`theme-chalk/src/public`文件夹下 其中public.scss为核心样式修改文件

#### fix 修改
- 修复了ipharmacare业务分页器组件 由于使用jsx=>template修改后 watch在mounted之前执行导致的第一次末页disable状态异常

### 1.0.17

*2022-11-08*

#### feat 新增功能
- 增加`ip-file-download`导出下载组件
- 增加了业务系统中的iconfont图标

### 1.0.15

*2022-11-03*

#### fix 修改
- 修正由于webpack中scss未配置style-loader导致的打包后丢失样式的问题

### 1.0.7

*2022-11-02*

#### feat 新增功能
- `ip-search-container`带展开的搜索
- 打包支持在vue中直接书写scss

#### fix 修改
- `ip-pagination`重写


### 1.0.1

*2022-11-01*

#### feat 新增功能
- 增加ipharmacare业务分页器组件
