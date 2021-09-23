import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './components/context'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


