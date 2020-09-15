import React, { useEffect } from 'react';
import useGlobalHook from '../config/store';
import { Link } from 'react-router-dom';
import http from '../config/api';
import dateformat from 'dateformat'
import './tags.scss'

function TagsInfo (props) {

  const [state, setGobalstate] = useGlobalHook();

  const { times } = state;

  const getArchive = async () => {
    
    if(!times) {
      const res = await http.getArchive({});
      setGobalstate({times:res})
    }
    
  }

  useEffect( () => {
    getArchive()
  }, [])

  return (
    times && <div className="tags">
      {
        Object.keys(times).map( i => <div className="" key={i}>
          <h3>{i}</h3>
          {
            times[i].map( t => <Link className="tagsLi a" key={t.id} to={{pathname: `/post`, query: {id: t.id}, search: `?id=${t.id}`}}>
              <div className="tagsItem">
                <span>{dateformat(t.time, 'yyyy-mm-dd')}</span>
                <span className="title">{t.title}</span>
              </div>
            </Link>)
          }
        </div>)
      }
    </div>
  )
}

TagsInfo.loadData = async () => {
  const times = await http.getArchive({});
  return {
    times
  }
}

export default TagsInfo;