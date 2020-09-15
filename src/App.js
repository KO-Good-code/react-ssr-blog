import React, { useState, useEffect, useRef } from 'react';
import routerPath from './router';
import { Route, withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import useGlobalHook from './config/store';
import UserInfo from './components/userInfo'
import FooterInfo from './components/footer'
import './assets/scss/markdown.scss'



function App(props) {

  const [state ,setList] = useGlobalHook()

  if(JSON.stringify(props) !== "{}"){
    setList(props.content)
  }
  
  return (
      <div className="app">
        <header className="banner center">
          {/* <p className="p center">
            <i>{title}</i>
            <span className="fouse">_</span>
          </p> */}
        </header>
        <div className="left center w100">
          <UserInfo/>
        </div>
        <main className="center main">
          <div className="container center w100">
            <div className="right center">
              <React.Fragment>
                {
                  routerPath.map( (i, t) => <Route key={t} path={i.path} exact component={ i.component } /> )
                }
              </React.Fragment>
            </div>
            
          </div>
        </main>
        <FooterInfo />
      </div>
  );
}

export default App;
