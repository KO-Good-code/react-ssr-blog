import useGlobalHook from './Hook'
const inieialState = typeof window !== 'undefined' &&  window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}

const actions = {}

const useGlobal = useGlobalHook(inieialState, actions)

export default useGlobal