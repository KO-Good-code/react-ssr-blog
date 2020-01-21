import React from 'react';
import './footer.scss';

function FooterInfo () {

  return (
    <footer className="center">
          <ul className="list-inline">
            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-twitter"></i>
                </span>
              </a>
            </li>

            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-zhihu"></i>
                </span>
              </a>
            </li>

            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-weibo"></i>
                </span>
              </a>
            </li>

            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-facebook"></i>
                </span>
              </a>
            </li>

            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-github"></i>
                </span>
              </a>
            </li>

            <li>
              <a target="_blank" href={void(0)}>
                <span className="fa-stack fa-lg">
                  <i className="iconfont icon-linkedin"></i>
                </span>
              </a>
            </li>
          </ul>
          <p className="center">
            <a href="http://beian.miit.gov.cn">蜀ICP备20002751号-1</a>
          </p>
        </footer>
  )
}

export default FooterInfo;