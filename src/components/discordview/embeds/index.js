import { connect } from 'react-redux'
import { setEmbed, addEmbed, removeEmbed } from 'constants/actions'
import Embeds from './embeds'

const mapStateToProps = (state) => {
  return {
    embeds: state.embeds.map((embed, index) => {
      return {
        ...embed,
        index
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateEmbed: (index, embed) => {
      dispatch(setEmbed(index, embed))
    },
    onAddEmbed: () => {
      dispatch(addEmbed())
    },
    onRemoveEmbed: index => {
      dispatch(removeEmbed(index))
    }
  }
}

const EmbedsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Embeds)

export default EmbedsContainer
