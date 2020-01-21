import React, { useEffect } from 'react';
import http from '../config/api';
import { Link } from 'react-router-dom';
import useGlobalHook from '../config/store';
import dateformat from 'dateformat'
import './home.scss'

//拉取帖子列表
const getBlogList = async (pageSize = 1) => {
  try {
    let params = {
      pageSize: pageSize
    }
    const res = await http.getBlogList({params})
    return {homeList: res}
  } catch (error) {
    console.log(error)
  }
}

function Home(props) { 

  const [state, setGobalstate] = useGlobalHook()

  const { homeList } = state

  

  useEffect(() => {
    setGobalstate({path: props.match.path})
    if(!homeList){
      getBlogList().then(data => {
        setGobalstate(data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[])

  return (
    <div className="index">
      {
        homeList && homeList.map( (i, t) => 
        <div className="historyCord center" key={t}>
          <div className="post-time">
            {dateformat(i.time, 'yyyy-mm-dd')}
          </div>
          <div className="post-info">
            <Link to={{pathname: '/post', state: {id: i.id}}}>
              <h3>{i.title}</h3>
            </Link>
            <div className="post-tags">
              {
                i.tags.map((item, e) => <span className="a" key={e}>{item}</span>)
              }
            </div>
          </div>
        </div>
        )
      }
      <ul className="center paging">
        <li className="center">
          <button data-text="← Newer Posts" className="but but-pri">
            <Link to="">← Newer Posts</Link>
          </button> 
        </li>
        <li className="center">
          <button data-text="Older Posts →" className="but but-next">
            <Link to="">Older Posts →</Link>
          </button>
        </li>
      </ul>
    </div>
    
  )
 }

 Home.loadData = () => getBlogList();


export default Home;