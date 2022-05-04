import { connect } from 'react-redux'
import { setDescription } from 'constants/actions'
import EmbedDescription from './description'
import { parseAllowLinks } from 'lib/markdown'

const mapStateToProps = (state, ownProps) => {
  const desc = state.embeds[ownProps.index].description
  return {
    parsedContent: parseAllowLinks(desc),
    content: desc,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, content) => {
      dispatch(setDescription(index, content))
    }
  }
}

const DescriptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedDescription)

export default DescriptionContainer
