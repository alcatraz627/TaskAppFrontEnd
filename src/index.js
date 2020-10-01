import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App';

import './styles/global.scss';

const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'))

renderApp()

if (module.hot) {
    module.hot.accept('./components/App', () => { renderApp() });
}
// Register the service worker root
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        // .then(registration => {console.log("SW registered!", registration)})
        // .catch(error => {console.log("SW registration error", error)})
    })
}

