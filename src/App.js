import React, { useState, useEffect, useRef } from 'react';
import routerPath from './router';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import useGlobalHook from './config/store';
import UserInfo from './components/userInfo'
import FooterInfo from './components/footer'
import './assets/scss/markdown.scss'



function App(props) {

  const [title, setTitle] = useState('')

  const [banner, setBanner] = useState(null)
  

  const headInfo = [
    {
      backgroundImage: `url(https://i.loli.net/2019/11/17/GAYyzeKsiWjP5qO.jpg)`
    },
    {
      backgroundImage: `url(${require("./assets/images/post.jpg")})`
    },
  ]

  const intervalRef = useRef();

  const [state ,setList] = useGlobalHook()

  const start = () => {
    const path = state.path
    let index = 0;
    const img = path === "/" ? headInfo[0] : headInfo[1];
    setBanner(img)
    const string = path === "/" ? 'sometimes code，sometimes design' : '';
    intervalRef.current = setInterval( () => {
      if(index === string.length ) {
        end()
      }
      index++;
      setTitle(string.slice(0,index))
    },100)
  }

  const end = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null
  }

  useEffect(() => {
    start()
    return () => {
      clearInterval(intervalRef.current);
    }
  },[state.path])

  if(JSON.stringify(props) !== "{}"){
    setList(props.content)
  }
  
  return (
      <div className="App">
        <header className="banner center" style={banner}>
          <p className="p center">
            <i>{title}</i>
            <span className="fouse">_</span>
          </p>
        </header>
        <div className="left center">
          <UserInfo/>
        </div>
        <main className="center">
          <div className="container center w100">
            <div className="right">
              <React.Fragment>
                {
                  routerPath.map( (i, t) => <Route key={t} path={i.path} exact component={i.component} /> )
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
