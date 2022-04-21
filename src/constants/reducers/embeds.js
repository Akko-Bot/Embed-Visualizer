import { ADD_EMBED, REMOVE_EMBED, REMOVE_ALL_EMBEDS, SET_EMBED } from '../types';
import {embed, embedInitState} from './embed';

const initState = [embedInitState];

const embeds = (state = initState, action) => {
    const newState = [...state];
    switch (action.type){
        case ADD_EMBED:
            newState.push(embedInitState)
            return newState
        case REMOVE_EMBED:
            newState.splice(action.index, 1)
            return newState
        case SET_EMBED:
            return newState;
        case REMOVE_ALL_EMBEDS:
            return []
        default:
            const item = newState[action.index];
            newState[action.index] = embed(item, action)
            return newState
    }
}

export default embeds;