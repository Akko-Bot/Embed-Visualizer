import { fromAkkoToNadekoMessage } from '../../constants/converters/akkotonadekoconverter.js'
import { fromNadekoToAkkoMessage } from '../../constants/converters/nadekotoakkoconverter.js'
import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import Yaml from 'js-yaml'
import CM from 'codemirror'
import 'codemirror/lib/codemirror.css'

// generally you'd want to leave these up to the caller
// but we don't care about generalizing
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/mode/yaml/yaml'

const convertLineEndings = (str) => {
  if (!str) return str
  return str.replace(/\r\n?/g, '\n')
}

const CodeMirror = React.createClass({
  getDefaultProps () {
    return {
      className: 'w-100 code-mirror-wrap',
      options: {
        mode: { name: 'yaml', yaml: true },
        autoCloseBrackets: true,
        matchBrackets: true,
        tabSize: 2,
        extraKeys: {
          // see https://github.com/codemirror/CodeMirror/issues/988
          Tab: function (cm) {
            if (cm.somethingSelected()) {
              cm.indentSelection('add')
              return
            }

            cm.execCommand('insertSoftTab')
          }
        },
        viewportMargin: Infinity,
        theme: 'one-dark'
      },
      preserveScrollPosition: false
    }
  },

  componentDidMount () {
    const textarea = ReactDOM.findDOMNode(this.textarea)
    this.instance = CM.fromTextArea(textarea, this.props.options)
    this.instance.on('change', this.valueChanged)
    this.focus()
  },

  componentWillMount () {
    this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0)
  },

  componentWillUnmount () {
    if (this.instance) this.instance.toTextArea()
  },

  componentWillReceiveProps (next) {
    if (this.instance &&
        next.value !== undefined &&
      convertLineEndings(this.instance.getValue()) !== convertLineEndings(fromNadekoToAkkoMessage(next.value))) {
      if (this.props.preserveScrollPosition) {
        const previous = this.instance.getScrollInfo()
        this.instance.setValue(fromNadekoToAkkoMessage(next.value))
        this.instance.scrollTo(previous.left, previous.top)
      } else {
        // This triggers when the embed is changed
        this.instance.setValue(fromNadekoToAkkoMessage(next.value))
      }
    }

    if (typeof next.options === 'object') {
      Object.keys(next.options).forEach(key => {
        this.instance.setOption(key, next.options[key])
      })
    }

    // silly
    if (next.theme) {
      this.instance.setOption('theme', next.theme)
    }
  },

  // change.origin = 'setValue' when the embedview is edited
  // change.origin = '+input' when the code mirror is edited
  valueChanged (instance, change) {
    const currentValue = this.instance.getValue()
    try {
      const parsed = Yaml.load(fromAkkoToNadekoMessage(currentValue))
      this.props.updateError('')

      // This method only works when the code mirror is edited
      if (this.props.onChange && change.origin !== 'setValue') {
        this.props.onChange(parsed, change)
      }
    } catch (e) {
      this.props.updateError('Invalid YAML!')
    }
  },

  render () {
    return (
      <div className={this.props.className}>
        <textarea readOnly
          ref={(textarea) => this.textarea = textarea}
          value={this.props.value}
          autoComplete="off"
        />
      </div>
    )
  },

  focus () { if (this.instance) this.instance.focus() }

})

export default CodeMirror
