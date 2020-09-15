import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './userInfo.scss'

function UserInfo (props){

  const navRef = useRef()

  const activeIndex = index => {
    navRef.current.style.setProperty("--active-index", index);
  }

  const cssInfo = () => {
    let children = navRef.current.children;
    for( let i = 0; i < children.length; i++) {
      let reg = /active/ig;
      let flag = reg.test(children[i].children[0].className);
      if(flag){
        activeIndex(i)
        return false;
      }
    }
  }

  useEffect( () => {
    cssInfo()
  })

  return (
    <div className="center userInfo">
      <div className="avatar-name">
        {/* <div className="avatar"> */}
          {/* <img src="../assets/images/5.jpg" /> */}
        {/* </div> */}
        <div className="name center">
          <i>WIN blog</i>
        </div>
      </div>
      <nav className="nav center">
        {/* <button>
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
          <span className="btn-bar"></span>
        </button> */}
        <ul ref={navRef} className="nav-content center">
          <li className="center">
            <NavLink exact to="/" onClick={() => activeIndex(0)} className="center">
              <i className="iconfont icon-shouye1"></i>
              <span>主页</span>
            </NavLink>
          </li>
          {/* <li className="center">
            <NavLink exact to="/tags" onClick={() => activeIndex(1)} className="center">
              <i className="iconfont icon-biaoqian1"></i>
              <span>标签</span>
            </NavLink>
          </li> */}
          <li className="center">
            <NavLink exact to="/tags" onClick={() => activeIndex(1)} className="center">
              <i className="iconfont icon-guidang2"></i>
              <span>存档</span>
            </NavLink>
          </li>
          {/* <li className="center">
            <NavLink exact to="about" onClick={() => activeIndex(2)} className="center">
              <i className="iconfont icon-guanyu2"></i>
              <span>关于</span>
            </NavLink>
          </li> */}
          {/* <li className="center">
            <NavLink exact to="about" onClick={() => activeIndex(4)} className="center">
              <i className="iconfont icon-sousuo1"></i>
              <span>搜索</span>
            </NavLink>
          </li> */}
      </ul>
    </nav>
    
  </div>
  );
}

export default UserInfo;