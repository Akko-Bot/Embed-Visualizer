import { connect } from 'react-redux'
import { setField, addField, removeField } from 'constants/actions'
import { parseEmbedTitle, parseAllowLinks } from 'lib/markdown'
import EmbedFields from './fields'


const mapStateToProps = (state, ownProps) => {
  return {
    fields: state.embeds[ownProps.index].fields.map((field, findex)=>{
      return {
        ...field,
        index: ownProps.index,
        findex,
        parsedName: parseEmbedTitle(field.name),
        parsedValue: parseAllowLinks(field.value)
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateField: (index, field, findex) => {
      dispatch(setField(index, field, findex))
    },
    onAddField: (index) => {
      dispatch(addField(index))
    },
    onRemoveField: (index, findex) => {
      dispatch(removeField(index, findex))
    }
  }
}

const FieldsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedFields)

export default FieldsContainer