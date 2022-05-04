import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import visualApp from 'constants/reducers'
import CodeMirrorContainer from 'components/codemirror'
import ClipboardContainer from 'components/clipboard'
import DiscordView from 'components/discordview/discordview'

const store = createStore(visualApp)

const App = React.createClass({

  getInitialState () {
    return {
      webhookMode: false,
      compactMode: false,
      darkTheme: true,
      error: null
    }
  },

  componentWillMount () {
    // this.validateInput(this.state.input, this.state.webhookMode);
  },

  onCodeChange (value, change) {
    // for some reason this fires without the value changing...?
    /* if (value !== this.state.input) {
      this.validateInput(value, this.state.webhookMode);
    } */
  },

  toggleWebhookMode () {
    // this.validateInput(this.state.input, !this.state.webhookMode);
  },

  toggleTheme () {
    this.setState({ darkTheme: !this.state.darkTheme })
  },

  toggleCompactMode () {
    this.setState({ compactMode: !this.state.compactMode })
  },

  updateError (err) {
    this.setState({ error: err })
  },

  render () {
    return (
      <Provider store={store}>
        <main className="vh-100-l bg-blurple whitney ">

          <div className="h-100 flex flex-column">
            <section className="flex-l flex-auto">
              <div className="vh-100 h-auto-l w-100 w-50-l pa4 pr3-l pb0-l">
                <DiscordView
                  error={this.state.error}
                  webhookMode={this.state.webhookMode}
                  darkTheme={this.state.darkTheme}
                  compactMode={this.state.compactMode}
                />
              </div>
              <div className="clipboard w-100 w-50-l pa4 pl3-l pb0">
                <ClipboardContainer />
                <CodeMirrorContainer
                  theme={'one-dark'}
                  updateError={this.updateError}
                />
              </div>
            </section>
            <footer className="w-100 pa3 tc white">
            </footer>
          </div>
        </main>
      </Provider>
    )
  }
})

export default App
