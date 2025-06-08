import lodash from 'lodash'

lodash.templateSettings.interpolate = /{{([\S\s]+?)}}/g

import '@env'
import '@components/cache'

import {Hook} from '@oclif/core'

const hook: Hook.Init = async function () {}

export default hook
