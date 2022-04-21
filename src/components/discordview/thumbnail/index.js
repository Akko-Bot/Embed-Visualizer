import { connect } from 'react-redux'
import { setThumbnail } from 'constants/actions'
import EmbedThumbnail from './thumbnail'

const mapStateToProps = (state, ownProps) => {
  return { url: state.embeds[ownProps.index].thumbnail }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, url) => {
      dispatch(setThumbnail(index, url))
    }
  }
}

const ThumbnailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedThumbnail)

export default ThumbnailContainer