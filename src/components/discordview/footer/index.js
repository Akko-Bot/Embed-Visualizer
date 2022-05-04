import { connect } from 'react-redux'
import { setFooter } from 'constants/actions'
import EmbedFooter from './footer'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.embeds[ownProps.index].footer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, footer) => {
      dispatch(setFooter(index, footer))
    }
  }
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedFooter)

export default FooterContainer
