import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import BlogDetails from './components/BlogDetails/BlogDetails';
import BlogSearch from './components/BlogSearch/BlogSearch';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <GoogleOAuthProvider clientId='866479177555-ecp9rn6q9g9ago5tfeqjj6jghik8hfnj.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/blogs"/>}/>
            <Route path="/blogs" exact component={Home}/>
            <Route path="/blogs/search" exact component={BlogSearch}/>
            <Route path="/blogs/:id" component={BlogDetails}/>
            <Route path="/auth" exact component={() => (!user) ? <Auth/> : <Redirect to="/blogs"/>}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
