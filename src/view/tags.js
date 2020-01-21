import React, { useEffect } from 'react';
import useGlobalHook from '../config/store';

function TagsInfo (props) {

  const [state, setGobalstate] = useGlobalHook();

  useEffect( () => {
    setGobalstate({path: props.match.path})
  }, [])

  return (
    <div></div>
  )
}

export default TagsInfo;