import { SET_COLOR, SET_DESCRIPTION } from 'constants/types';
import { ADD_FIELD, REMOVE_ALL_FIELDS, REMOVE_FIELD, SET_AUTHOR, SET_FIELD, SET_FOOTER, SET_IMAGE, SET_THUMBNAIL, SET_TITLE } from '../types';
import { colorInitState } from './color'
import { titleInitState } from './title';
import {fields} from './fields'

const embedInitState =  {
    title: titleInitState,
    url: '',
    description: '',
    author: {
      name: '',
      url: '',
      icon_url: '',          
    },
    color: colorInitState,
    footer: {
      text: '',
      icon_url: ''
    },
    thumbnail: '',
    image: '',
    fields: []
  };

const embed = (state = embedInitState, action) => {
    switch (action.type) {
        case SET_DESCRIPTION:
            return {
              ...state,
              description: action.description
            }
        case SET_COLOR:
            return {
              ...state,
              color: action.color
            }
        case SET_TITLE:
            return {
              ...state,
              title: {
                ...state.title,
                ...action.title
              }
            }
        case SET_FOOTER:
            return {
              ...state,
              footer: {
                ...state.footer,
                ...action.footer
              }
            }
        case SET_THUMBNAIL:
          return {
            ...state,
            thumbnail: action.thumbnail
          }
        case SET_AUTHOR:
          return {
            ...state,
            author: {
              ...state.author,
              ...action.author
            }
          }
        case SET_IMAGE:
          return {
            ...state,
            image: action.image
          }
        case ADD_FIELD:
        case SET_FIELD:
        case REMOVE_FIELD:
        case REMOVE_ALL_FIELDS:
          return {
            ...state,
            fields: fields(state.fields, {
              type: action.type,
              field: action.field,
              index: action.findex
            })
          }
        default:
            return state;
    }
  }
  
export { embedInitState, embed }