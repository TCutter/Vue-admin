# vue-admin

> An Admin Management

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Plugins
- mockjs & axios-mock-adapter
- element-ui
- js-cookie
- normalize.css
- nprogress
- vue-i18n
- svg-sprite-loader
- sass-loader & node-sass

## Tech Stack
- vue-router
    - addRoutes: dynamically add routes
    - router.matcher: 相当于重置 routes
- Svg Sprite:
    1. [symbol](https://juejin.im/post/59bb864b5188257e7a427c09)
    2. 使用component的形式封装 svg 图标
    3. 相比于 `Icon Font` 的优点：更精细更清晰、支持多色渲染，缺点是浏览器支持不够完整，具体对比结果参照[这里](https://css-tricks.com/icon-fonts-vs-svg/)