import Yaml from 'js-yaml'
import { removeEmptyProps } from './objectcleaner.js'

const fromAkkoToNadekoEmbed = (embed) => {
    const result = {
        title: '',
        url: '',
        description: '',
        author: {
            name: '',
            url: '',
            icon_url: '',
        },
        color: '',
        footer: {
            text: '',
            icon_url: ''
        },
        thumbnail: '',
        image: '',
        fields: []
    }

    // Add properties
    if (embed.color)
        result.color = embed.color

    if (embed.header) {
        if (embed.header.thumbnail_url)
            result.thumbnail = embed.header.thumbnail_url

        if (embed.header.author) {
            if (embed.header.author.text)
                result.author.name = embed.header.author.text

            if (embed.header.author.url)
                result.author.url = embed.header.author.url

            if (embed.header.author.image_url)
                result.author.icon_url = embed.header.author.image_url
        }
    }

    if (embed.body) {
        if (embed.body.description)
            result.description = embed.body.description

        if (embed.body.image_url)
            result.image = embed.body.image_url

        if (embed.body.title) {
            if (embed.body.title.text)
                result.title = embed.body.title.text

            if (embed.body.title.url)
                result.url = embed.body.title.url
        }
    }

    if (embed.footer) {
        if (embed.footer.text)
            result.footer.text = embed.footer.text

        if (embed.footer.image_url)
            result.footer.icon_url = embed.footer.image_url
    }

    if (embed.fields && embed.fields.length !== 0) {
        for (let index = 0; index < embed.fields.length; index++) {
            const nadekoEmbed = {
                name: embed.fields[index].title,
                value: embed.fields[index].text,
                inline: embed.fields[index].inline
            }

            result.fields.push(nadekoEmbed)
        }
    }

    // Remove unused properties
    removeEmptyProps(result)

    return result
}

const fromAkkoToNadekoMessage = (str) => {
    const message = Yaml.load(str)
    const result = { content: message.content }

    if (message.embeds) {
        result.embeds = []
        for (let index = 0; index < message.embeds.length; index++) {
            result.embeds.push(fromAkkoToNadekoEmbed(message.embeds[index]))
        }
    }

    return Yaml.dump(result)
}

export { fromAkkoToNadekoMessage }