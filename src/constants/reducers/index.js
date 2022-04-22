import { combineReducers } from 'redux'
import messageBody from './messagebody'
import embeds from './embeds'

const visualApp = combineReducers({
  messageBody,
  embeds
})

export default visualApp