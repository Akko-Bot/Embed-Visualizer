import { connect } from 'react-redux'
import { setColor } from 'constants/actions'
import EmbedColorPill from './colorpill'

// const integerToColor = (number) => {
//   return '#' + ('00000' + (number | 0).toString(16)).substr(-6);
// }

// const colorToInteger = (color) => {
//   return parseInt(color.slice(1), 16)
// }

const mapStateToProps = (state, ownProps) => {
  const embed = state.embeds[ownProps.index];
  return {
    color: embed.color,
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