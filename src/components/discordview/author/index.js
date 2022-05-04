import { connect } from 'react-redux'
import { setAuthor } from 'constants/actions'
import EmbedAuthor from './author'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.embeds[ownProps.index].author
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, authorContent) => {
      dispatch(setAuthor(index, authorContent))
    }
  }
}

const AuthorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedAuthor)

export default AuthorContainer
