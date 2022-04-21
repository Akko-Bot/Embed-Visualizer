import { SET_COLOR } from 'constants/types';

const colorInitState = '#00d084';
const color = (state = colorInitState, action) => {
    switch (action.type) {
      case SET_COLOR:
        return action.color
      default:
        return state
    }
  }
  
  export { color, colorInitState }