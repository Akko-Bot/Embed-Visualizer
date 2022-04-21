import React from 'react';
import EmbedField from './field'

const EmbedFields = (props)=> {
  return  <div 
  className="embed-fields">
    {props.fields.map((f, i) => 
      <EmbedField 
        key={i}
        index={props.index}
        findex={i}
        onUpdate={props.onUpdateField}
        onRemove={props.onRemoveField} 
        {...f}
      />
    )}
    <div className="embed-field embed-field-inline">
      <button
      onClick={()=>props.onAddField(props.index)}>
        Add field
      </button>
    </div>
  </div> 
}

export default EmbedFields