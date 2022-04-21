import { SET_TITLE } from 'constants/types';

const titleInitState = {
    title: '',
    url: ''
}

const title = (state = titleInitState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {...state, ...action.title}
        default:
            return state
    }
  }
  
  export { titleInitState, title }