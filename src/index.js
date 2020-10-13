import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App';

import './styles/global.scss';

const renderApp = (Root) => ReactDOM.render(<Root />, document.getElementById('root'))

renderApp(App)

if (module.hot) {
    module.hot.accept('./components/App.jsx', () => {
        const Root = require('./components/App').default
        renderApp(Root)
    });
}
// Register the service worker root
// if('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//         // .then(registration => {console.log("SW registered!", registration)})
//         // .catch(error => {console.log("SW registration error", error)})
//     })
// }


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {

        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                console.log('Service Worker Registered');
            })

        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service Worker Ready');
        })
    })
}