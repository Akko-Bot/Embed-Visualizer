import React from 'react'

import AuthorContainer from '../author'
import TitleContainer from '../title'
import ColorpillContainer from '../colorpill'
import DescriptionContainer from '../description'
import FieldsContainer from '../fields'
import FooterContainer from '../footer'
import ImageContainer from '../image'
import ThumbnailContainer from '../thumbnail'

const Embed = (props) => {
  return <div className="accessory"
        style={{ marginBottom: '0.5em' }}>
        <ColorpillContainer index={props.index} />
        <div className="embed embed-rich">
            <AuthorContainer index={props.index} />
            <TitleContainer index={props.index} />
            <DescriptionContainer index={props.index} />
            <FieldsContainer index={props.index} />
            <ImageContainer index={props.index} />
            <FooterContainer index={props.index} />
        </div>
        <ThumbnailContainer index={props.index} />
        <button
            className='eb-delete'
            onClick={() => props.onRemove(props.index)}>
                Remove
        </button>
    </div>
}

export default Embed
