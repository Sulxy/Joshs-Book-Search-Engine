// Import the necessary modules
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// Create a new Apollo client and pass it to the ApolloProvider
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Create the App component that will render the pages
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' component={SignupForm} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
