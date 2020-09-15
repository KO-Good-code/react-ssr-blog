import React, { useEffect, useState } from 'react';
import http from '../config/api';
import { Link } from 'react-router-dom';
import useGlobalHook, { loading } from '../config/store';
import dateformat from 'dateformat'
import './home.scss'

//拉取帖子列表
const getBlogList = async (pageSize = 1, type = 'all') => {
  try {
    let params = {
      pageSize: 10,
      page: pageSize,
      type: type
    }
    const res = await http.getBlogList({params})
    return res;
  } catch (error) {
    console.log(error)
  }
}

const getBolgTags = async () => {
  try {
    const res = await http.getTags({});
    let tag = Object.keys(res)
    tag.unshift('all')
    return tag;
  } catch (error) {
    console.log(error);
  }
}

function Home(props) { 

  const [state, setGobalstate] = useGlobalHook();

  const [pageSize, setPageSize] = useState(1);

  const [active, setActive] = useState(0);

  const { homeList, tags } = state;

  const actived = i => ( i === active ? "a active" : "a")
  
  useEffect(() => {
    if(!homeList){
      loading.actived();
      getBlogList().then(homeList => {
        setGobalstate({homeList});
        loading.load(['https://image.mini1.cn/b/20200316/68bb14da94dcc6f648713bcbe77c3d2e.png'])
      })
      .catch(err => {
        console.log(err)
      })
    }
    if(!tags) {
      getBolgTags()
      .then(tags => {
        setGobalstate({tags})
      })
    }
    
  },[])

  useEffect(() => {
    getBlogList(pageSize, tags ? tags[active] : 'all')
    .then( homeList => {
      setGobalstate({homeList});
    })
  }, [pageSize, active])

  return (
    <div className="home center w100">
      <div className="post-tags w100">
        {
          tags && tags.map( (i, t) => <span key={t} className={actived(t)} onClick={() => setActive(t)}>{i}</span>)
        }
      </div>
      <div className="index center w100">
        {
          homeList && homeList.map( (i, t) => 
          <Link className="historyCord center a" key={t} to={{pathname: `/post`, query: {id: i.id}, search: `?id=${i.id}`}}>
            <div className="post-img w100">
              <img src={null} alit={i.title} />
            </div>
            <div className="post-info w100">
              <h3>{i.title}</h3>
              <div className="post-tags">
                <span className="a">{i.tags}</span>
              </div>
              <div className="post-time">
                {dateformat(i.time, 'yyyy-mm-dd')}
              </div>
            </div>
          </Link>
          )
        }
      </div>
      
      {/* <ul className="center paging">
        <li className="center">
          <button data-text="← Newer Posts" className="but but-pri" onClick={() => setPageSize(pageSize - 1)}>
            <Link to="">← Newer Posts</Link>
          </button> 
        </li>
        <li className="center">
          <button data-text="Older Posts →" className="but but-next" onClick={() => setPageSize(pageSize + 1)}>
            <Link to="">Older Posts →</Link>
          </button>
        </li>
      </ul> */}
    </div>
    
  )
 }

 Home.loadData = async () => {
  const homeList =  await getBlogList();
  const tags = await getBolgTags();
  let context = {
    title: 'WIN个人博客',
    keywords: 'WIN',
    description: 'WIN个人博客'
  };
  return { homeList, tags, ...context  }
 };


export default Home;