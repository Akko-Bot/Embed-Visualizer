import { connect } from 'react-redux'
import { setTitle } from 'constants/actions'
import { parseEmbedTitle } from 'lib/markdown'
import EmbedTitle from './title'

const mapStateToProps = (state, ownProps) => {
  const e = state.embeds[ownProps.index];
  return {
    parsedTitle: parseEmbedTitle(e.title),
    title: e.title,
    url: e.url,
    index: ownProps.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, titleContent) => {
      dispatch(setTitle(index, titleContent))
    },
  }
}

const TitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedTitle)

export default TitleContainer