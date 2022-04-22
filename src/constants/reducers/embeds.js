import { ADD_EMBED, REMOVE_EMBED, REMOVE_ALL_EMBEDS } from '../types';
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
        case REMOVE_ALL_EMBEDS:
            return []
        default:
            let embedState = embed(newState[action.index], action)
            if(typeof embedState === 'undefined')
                return state;

            newState[action.index] = embedState;
            return newState;
    }
}

export default embeds;