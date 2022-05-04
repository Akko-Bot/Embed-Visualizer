import Yaml from 'js-yaml'
import { removeEmptyProps } from './objectcleaner.js'

const fromNadekoToAkkoEmbed = (embed) => {
  const result = {
    color: '',
    header: {
      thumbnail_url: '',
      author: {
        text: '',
        url: '',
        image_url: ''
      }
    },
    body: {
      description: '',
      image_url: '',
      title: {
        text: '',
        url: ''
      }
    },
    footer: {
      text: '',
      image_url: ''
    },
    fields: []
  }

  // Add properties
  if (embed.color) { result.color = embed.color }

  if (embed.thumbnail) { result.header.thumbnail_url = embed.thumbnail }

  if (embed.author) {
    if (embed.author.name) { result.header.author.text = embed.author.name }

    if (embed.author.url) { result.header.author.url = embed.author.url }

    if (embed.author.icon_url) { result.header.author.image_url = embed.author.icon_url }
  }

  if (embed.description) { result.body.description = embed.description }

  if (embed.image) { result.body.image_url = embed.image }

  if (embed.title) { result.body.title.text = embed.title }

  if (embed.url) { result.body.title.url = embed.url }

  if (embed.footer) {
    if (embed.footer.text) { result.footer.text = embed.footer.text }

    if (embed.footer.icon_url) { result.footer.image_url = embed.footer.icon_url }
  }

  if (embed.fields && embed.fields.length !== 0) {
    for (let index = 0; index < embed.fields.length; index++) {
      const akkoEmbed = {
        title: embed.fields[index].name,
        text: embed.fields[index].value,
        inline: embed.fields[index].inline
      }

      result.fields.push(akkoEmbed)
    }
  }

  // Remove unused properties
  removeEmptyProps(result)

  return result
}

const fromNadekoToAkkoMessage = (str) => {
  const message = Yaml.load(str)
  const result = { content: message.content }

  if (message.embeds) {
    result.embeds = []
    for (let index = 0; index < message.embeds.length; index++) {
      result.embeds.push(fromNadekoToAkkoEmbed(message.embeds[index]))
    }
  }

  return Yaml.dump(result)
}

export { fromNadekoToAkkoMessage }
