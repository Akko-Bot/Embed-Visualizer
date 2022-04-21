import React from 'react';
import Embed from './embed';


const Embeds = (props) => {
    return <div
    >{props.embeds.map((embed, i) => {
        return <Embed
            key={i}
            onUpdate={props.onUpdateEmbed}
            onRemove={props.onRemoveEmbed}
            {...embed}
        />
    })}
        {props.embeds.length < 10 && <button
            onClick={() => props.onAddEmbed()}>
                + Add embed
        </button>}
    </div>;
}

export default Embeds;