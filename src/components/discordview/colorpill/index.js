import { connect } from 'react-redux'
import { setColor } from 'constants/actions'
import EmbedColorPill from './colorpill'

const mapStateToProps = (state, ownProps) => {
  const item = state.embeds[ownProps.index];
  console.log(item, ownProps)
  return {
    color: item.color,
    ...ownProps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (index, color) => {
      dispatch(setColor(index, color))
    }
  }
}

const ColorPillContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbedColorPill)

export default ColorPillContainer