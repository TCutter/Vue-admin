<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
// 组件切换
import { isExternal } from '@/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps (url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      console.log(url)
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
