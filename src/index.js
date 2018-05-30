import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import client from './graphql'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

ReactDOM.render(
  <ApolloProvider client={client} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
