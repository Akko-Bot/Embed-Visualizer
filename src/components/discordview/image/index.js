import { connect } from 'react-redux'
import { setImage } from 'constants/actions'
import EmbedImage from './image'

const mapStateToProps = (state, ownProps) => {
  return { url: state.embeds[ownProps.index].image }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, url) => {
      dispatch(setImage(index, url))
    }
  }
}

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedImage)

export default ImageContainer
