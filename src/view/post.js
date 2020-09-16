import React, { useEffect } from 'react';
import http from '../config/api';
import useGlobalHook, { loading } from '../config/store';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';

import './post.scss';


function Post(props) {

  const [state, setGobalstate] = useGlobalHook();

  const { post = null, id } = state;

  const getBlogPost = async id => {
    let params = {
      post_id: id
    }
    const res = await http.getBlogPost({params});
    return {post: res, id: id}
  }


  useEffect(() => {
    const ids = props.location.query ? props.location.query.id : null;
    if(!post || (ids && id !== ids)) {
      loading.actived();
      const idt = ids;
      getBlogPost(idt)
      .then( data => {
        setGobalstate(data);
        Prism.highlightAll();
        loading.load(['https://image.mini1.cn/b/20200316/68bb14da94dcc6f648713bcbe77c3d2e.png'])
      })
    }else {
      Prism.highlightAll();
    }
  },[])

  return (
    post && 
    <div className="Post">
      <span className="goback a" onClick={() => props.history.goBack()}>
        <svg className="icon" t="1591512659737" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1140" width="30" height="30"><path d="M480 0C217.6 0 0 217.6 0 480 0 742.4 217.6 960 480 960c262.4 0 480-217.6 480-480C960 217.6 742.4 0 480 0zM480 896C249.6 896 64 710.4 64 480S249.6 64 480 64 896 249.6 896 480 710.4 896 480 896z" p-id="1141"></path><path d="M320 448 428.8 352 384 300.8 192 480 377.6 672 422.4 627.2 313.6 512 768 512 768 448Z" p-id="1142"></path></svg>
      </span>
      <h1>{post.title}</h1>
      <ReactMarkdown source={post.contant} />
    </div>
  )
} 

Post.loadData = async id => {
  let params = {
    post_id: id
  }
  const res = await http.getBlogPost({params});
  let context = {
    title: res.title,
    keywords: res.title,
    description: res.title
  };
  return {post: res, id: id, ...context}
}

export default Post;