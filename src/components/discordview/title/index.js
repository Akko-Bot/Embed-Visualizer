import { connect } from 'react-redux'
import { setTitle } from 'constants/actions'
import { parseEmbedTitle } from 'lib/markdown'
import EmbedTitle from './title'

const mapStateToProps = (state, ownProps) => {
  const e = state.embeds[ownProps.index];
  console.log(e)
  return {
    parsedTitle: parseEmbedTitle(e.title.title),
    title: e.title.title,
    url: e.title.url
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