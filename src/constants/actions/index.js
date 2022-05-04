import {
  SET_MESSAGE_BODY,

  ADD_EMBED,
  REMOVE_EMBED,
  SET_EMBED,
  REMOVE_ALL_EMBEDS,

  SET_TITLE,
  SET_AUTHOR,
  SET_DESCRIPTION,
  SET_IMAGE,
  SET_THUMBNAIL,
  SET_COLOR,
  SET_FOOTER,
  SET_FIELD,
  ADD_FIELD,
  REMOVE_FIELD,
  REMOVE_ALL_FIELDS
} from 'constants/types'

export const setMessageBody = messageBody => {
  return {
    type: SET_MESSAGE_BODY,
    messageBody
  }
}

export const setTitle = (index, title) => {
  return {
    type: SET_TITLE,
    title,
    index
  }
}

export const setAuthor = (index, author) => {
  return {
    type: SET_AUTHOR,
    author,
    index
  }
}

export const setDescription = (index, description) => {
  return {
    type: SET_DESCRIPTION,
    description,
    index
  }
}

export const setImage = (index, image) => {
  return {
    type: SET_IMAGE,
    image,
    index
  }
}

export const setThumbnail = (index, thumbnail) => {
  return {
    type: SET_THUMBNAIL,
    thumbnail,
    index
  }
}

export const setColor = (index, color) => {
  return {
    type: SET_COLOR,
    color,
    index
  }
}

export const setFooter = (index, footer) => {
  return {
    type: SET_FOOTER,
    footer,
    index
  }
}

export const setField = (index, field, findex) => {
  return {
    type: SET_FIELD,
    field,
    index,
    findex
  }
}

export const addField = index => {
  return {
    type: ADD_FIELD,
    index
  }
}

export const removeField = (index, findex) => {
  return {
    type: REMOVE_FIELD,
    index,
    findex
  }
}

export const removeAllFields = index => {
  return {
    type: REMOVE_ALL_FIELDS,
    index
  }
}

export const setEmbed = (index, embed) => {
  return {
    type: SET_EMBED,
    embed,
    index
  }
}

export const addEmbed = () => {
  return {
    type: ADD_EMBED
  }
}

export const removeEmbed = (index) => {
  return {
    type: REMOVE_EMBED,
    index
  }
}

export const removeAllEmbeds = () => {
  return {
    type: REMOVE_ALL_EMBEDS
  }
}
