import useGlobalHook from './Hook'
import OverLoading from '../components/overAni'
const inieialState = typeof window !== 'undefined' &&  window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {
  times: null,
  id: null
}

const over = typeof window !== 'undefined' ? new OverLoading() : null;

if(over) {
  over.config({
    backgroundColor: 'rgba(0,0,0 ,.9)',
    progressBoxCss: {
      display: 'none',
      backgroundColor: '#fff',
      borderRadius: '5px',
      border: '1px solid #ccc'
    }
  })
}

export const loading = over;



const actions = {}

const useGlobal = useGlobalHook(inieialState, actions)

export default useGlobal