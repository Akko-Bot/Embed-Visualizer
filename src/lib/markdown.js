import REACT_ELEMENT_TYPE from 'react/lib/ReactElementSymbol'
import SimpleMarkdown from 'simple-markdown'
import hljs from 'highlight.js'
import Twemoji from 'twemoji'
import Emoji from '../constants/emoji'

// this is mostly translated from discord's client,
// although it's not 1:1 since the client js is minified
// and also is transformed into some tricky code

// names are weird and sometimes missing, as i'm not sure
// what all of these are doing exactly.

// this function seems to be duplicated quite a bit in the original source...
function createReactElement (type, props, key, ...children) {
  const defaultProps = type && type.defaultProps

  if (props && defaultProps) {
    for (const prop in defaultProps) {
      if (props[prop] === undefined) {
        props[prop] = defaultProps[prop]
      }
    }
  } else if (!props) {
    props = defaultProps || {}
  }

  props.children = children[0]
  if (children.length > 1) {
    props.children = children
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key: key == null ? null : `${key}`,
    ref: null,
    props,
    _owner: null
  }
}

function flattenAst (node, parent) {
  if (Array.isArray(node)) {
    for (let n = 0; n < node.length; n++) {
      node[n] = flattenAst(node[n], parent)
    }

    return node
  }

  if (node.content != null) {
    node.content = flattenAst(node.content, node)
  }

  if (parent != null && node.type === parent.type) {
    return node.content
  }

  return node
}

function astToString (node) {
  function inner (node, result = []) {
    if (Array.isArray(node)) {
      node.forEach(subNode => astToString(subNode, result))
    } else if (typeof node.content === 'string') {
      result.push(node.content)
    } else if (node.content != null) {
      astToString(node.content, result)
    }

    return result
  }

  return inner(node).join('')
}

function recurse (node, recurseOutput, state) {
  if (typeof node.content === 'string') {
    return node.content
  }

  return recurseOutput(node.content, state)
}

function makeClassName (...parameters) {
  const result = []

  for (const parameter of parameters) {
    if (parameter) {
      if (typeof parameter === 'string' || typeof parameter === 'number') {
        result.push(parameter)
      } else if (typeof parameter === 'object') {
        for (const key in parameter) {
          if (Object.prototype.hasOwnProperty.call(parameter, key) && parameter[key]) {
            result.push(key)
          }
        }
      }
    }
  }

  return result.join(' ')
}

function parserFor (rules, returnAst) {
  const parser = SimpleMarkdown.parserFor(rules)
  const renderer = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))
  return function (input = '', inline = true, state = {}, transform = null) {
    if (!inline) {
      input += '\n\n'
    }

    let ast = parser(input, { inline, ...state })
    ast = flattenAst(ast)
    if (transform) {
      ast = transform(ast)
    }

    if (returnAst) {
      return ast
    }

    return renderer(ast)
  }
}

function omit (object, excluded) {
  return Object.keys(object).reduce((result, key) => {
    if (excluded.indexOf(key) === -1) {
      result[key] = object[key]
    }

    return result
  }, {})
}

// emoji stuff

const getEmoteURL = (emote) => `${location.protocol}//cdn.discordapp.com/emojis/${emote.id}.png`

function getEmojiURL (surrogate) {
  if (['???', '??', '??'].indexOf(surrogate) > -1) {
    return ''
  }

  try {
    // we could link to discord's cdn, but there's a lot of these
    // and i'd like to minimize the amount of data we need directly from them
    return `https://twemoji.maxcdn.com/2/svg/${Twemoji.convert.toCodePoint(surrogate)}.svg`
  } catch (error) {
    return ''
  }
}

// emoji lookup tables

const DIVERSITY_SURROGATES = ['????', '????', '????', '????', '????']
const NAME_TO_EMOJI = {}
const EMOJI_TO_NAME = {}

Object.keys(Emoji).forEach(category => {
  Emoji[category].forEach(emoji => {
    EMOJI_TO_NAME[emoji.surrogates] = emoji.names[0] || ''

    emoji.names.forEach(name => {
      NAME_TO_EMOJI[name] = emoji.surrogates

      DIVERSITY_SURROGATES.forEach((d, i) => {
        NAME_TO_EMOJI[`${name}::skin-tone-${i + 1}`] = emoji.surrogates.concat(d)
      })
    })

    DIVERSITY_SURROGATES.forEach((d, i) => {
      const surrogates = emoji.surrogates.concat(d)
      const name = emoji.names[0] || ''

      EMOJI_TO_NAME[surrogates] = `${name}::skin-tone-${i + 1}`
    })
  })
})

const EMOJI_NAME_AND_DIVERSITY_RE = /^:([^\s:]+?(?:::skin\-tone\-\d)?):/

function convertNameToSurrogate (name, t = '') {
  // what is t for?
  return Object.prototype.hasOwnProperty.call(NAME_TO_EMOJI, name) ? NAME_TO_EMOJI[name] : t
}

function convertSurrogateToName (surrogate, colons = true, n = '') {
  // what is n for?
  let a = n

  if (Object.prototype.hasOwnProperty.call(EMOJI_TO_NAME, surrogate)) {
    a = EMOJI_TO_NAME[surrogate]
  }

  return colons ? `:${a}:` : a
}

const escape = (str) => str.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

const replacer = (function () {
  const surrogates = Object.keys(EMOJI_TO_NAME)
    .sort(surrogate => -surrogate.length)
    .map(surrogate => escape(surrogate))
    .join('|')

  return new RegExp('(' + surrogates + ')', 'g')
})()

function translateSurrogatesToInlineEmoji (surrogates) {
  return surrogates.replace(replacer, (_, match) => convertSurrogateToName(match))
}

// i am not sure why are these rules split like this.

const baseRules = {
  newline: SimpleMarkdown.defaultRules.newline,
  paragraph: SimpleMarkdown.defaultRules.paragraph,
  escape: SimpleMarkdown.defaultRules.escape,
  link: SimpleMarkdown.defaultRules.link,
  autolink: {
    ...SimpleMarkdown.defaultRules.autolink,
    match: SimpleMarkdown.inlineRegex(/^<(https?:\/\/[^ >]+)>/)
  },
  url: SimpleMarkdown.defaultRules.url,
  strong: SimpleMarkdown.defaultRules.strong,
  em: SimpleMarkdown.defaultRules.em,
  u: SimpleMarkdown.defaultRules.u,
  br: SimpleMarkdown.defaultRules.br,
  inlineCode: SimpleMarkdown.defaultRules.inlineCode,
  emoticon: {
    order: SimpleMarkdown.defaultRules.text.order,
    match: function (source) {
      return /^(??\\_\(???\)_\/??)/.exec(source)
    },
    parse: function (capture) {
      return { type: 'text', content: capture[1] }
    }
  },
  codeBlock: {
    order: SimpleMarkdown.defaultRules.codeBlock.order,
    match (source) {
      return /^```(([A-z0-9\-]+?)\n+)?\n*([^]+?)\n*```/.exec(source)
    },
    parse (capture) {
      return { lang: (capture[2] || '').trim(), content: capture[3] || '' }
    }
  },
  emoji: {
    order: SimpleMarkdown.defaultRules.text.order,
    match (source) {
      return EMOJI_NAME_AND_DIVERSITY_RE.exec(source)
    },
    parse (capture) {
      const match = capture[0]
      const name = capture[1]
      const surrogate = convertNameToSurrogate(name)
      return surrogate
        ? {
            name: `:${name}:`,
            surrogate,
            src: getEmojiURL(surrogate)
          }
        : {
            type: 'text',
            content: match
          }
    },
    react (node, recurseOutput, state) {
      return node.src
        ? createReactElement('img', {
          draggable: false,
          className: makeClassName('emoji', { jumboable: node.jumboable }),
          alt: node.surrogate,
          title: node.name,
          src: node.src
        })
        : createReactElement('span', {}, state.key, node.surrogate)
    }
  },
  customEmoji: {
    order: SimpleMarkdown.defaultRules.text.order,
    match (source) {
      return /^<:(\w+):(\d+)>/.exec(source)
    },
    parse (capture) {
      const name = capture[1]
      const id = capture[2]
      return {
        emojiId: id,
        // NOTE: we never actually try to fetch the emote
        // so checking if colons are required (for 'name') is not
        // something we can do to begin with
        name,
        src: getEmoteURL({
          id
        })
      }
    },
    react (node, recurseOutput, state) {
      return createReactElement('img', {
        draggable: false,
        className: makeClassName('emoji', { jumboable: node.jumboable }),
        alt: `<:${node.name}:${node.id}>`,
        title: node.name,
        src: node.src
      })
    }
  },
  text: {
    ...SimpleMarkdown.defaultRules.text,
    parse (capture, recurseParse, state) {
      return state.nested
        ? {
            content: capture[0]
          }
        : recurseParse(translateSurrogatesToInlineEmoji(capture[0]), {
          ...state,
          nested: true
        })
    }
  },
  s: {
    order: SimpleMarkdown.defaultRules.u.order,
    match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
    parse: SimpleMarkdown.defaultRules.u.parse
  }
}

function createRules (r) {
  const paragraph = r.paragraph
  const url = r.url
  const link = r.link
  const codeBlock = r.codeBlock
  const inlineCode = r.inlineCode

  return {
    // rules we don't care about:
    //  mention
    //  channel
    //  highlight

    // what is highlight?

    ...r,
    s: {
      order: r.u.order,
      match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
      parse: r.u.parse,
      react (node, recurseOutput, state) {
        return createReactElement('s', {}, state.key, recurseOutput(node.content, state))
      }
    },
    paragraph: {
      ...paragraph,
      react (node, recurseOutput, state) {
        return createReactElement('p', {}, state.key, recurseOutput(node.content, state))
      }
    },
    url: {
      ...url,
      match: SimpleMarkdown.inlineRegex(/^((https?|steam):\/\/[^\s<]+[^<.,:;"')\]\s])/)
    },
    link: {
      ...link,
      react (node, recurseOutput, state) {
        // this contains some special casing for invites (?)
        // or something like that.
        // we don't really bother here
        const children = recurseOutput(node.content, state)
        const title = node.title || astToString(node.content)
        return createReactElement('a', {
          title,
          href: SimpleMarkdown.sanitizeUrl(node.target),
          target: '_blank',
          rel: 'noreferrer'
        }, state.key, children)
      }
    },
    inlineCode: {
      ...inlineCode,
      react (node, recurseOutput, state) {
        return createReactElement('code', {
          className: 'inline'
        }, state.key, recurse(node, recurseOutput, state))
      }
    },
    codeBlock: {
      ...codeBlock,
      react (node, recurseOutput, state) {
        if (node.lang && hljs.getLanguage(node.lang) != null) {
          const highlightedBlock = hljs.highlight(node.lang, node.content, true)
          return createReactElement('pre', {}, state.key,
            createReactElement('code', {
              className: 'hljs ' + highlightedBlock.language,
              dangerouslySetInnerHTML: {
                __html: highlightedBlock.value
              }
            })
          )
        }

        return createReactElement('pre', {}, state.key,
          createReactElement('code', {
            className: 'hljs'
          }, undefined, recurse(node, recurseOutput, state))
        )
      }
    }
  }
}

const rulesWithoutMaskedLinks = createRules({
  ...baseRules,
  link: {
    ...baseRules.link,
    match () {
      return null
    }
  }
})

// used in:
//  message content (non-webhook mode)
const parse = parserFor(rulesWithoutMaskedLinks)

// used in:
//  message content (webhook mode)
//  embed description
//  embed field values
const parseAllowLinks = parserFor(createRules(baseRules))

// used in:
//  embed title (obviously)
//  embed field names
const parseEmbedTitle = parserFor(
  omit(rulesWithoutMaskedLinks, ['codeBlock', 'br', 'mention', 'channel', 'roleMention'])
)

// used in:
//  message content
function jumboify (ast) {
  const nonEmojiNodes = ast.some(node => (
    node.type !== 'emoji' &&
    node.type !== 'customEmoji' &&
    (typeof node.content !== 'string' || node.content.trim() !== '')
  ))

  if (nonEmojiNodes) {
    return ast
  }

  const maximum = 27
  let count = 0

  ast.forEach(node => {
    if (node.type === 'emoji' || node.type === 'customEmoji') {
      count += 1
    }

    if (count > maximum) {
      return false
    }
  })

  if (count < maximum) {
    ast.forEach(node => (node.jumboable = true))
  }

  return ast
}

export { parse, parseAllowLinks, parseEmbedTitle, jumboify }
