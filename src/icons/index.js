import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('icon-svg', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
