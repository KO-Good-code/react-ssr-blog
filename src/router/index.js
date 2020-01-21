import Home from '../view/home';
import Tags from '../view/tags';
const routerPath = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/tags",
    exact: true,
    component: Tags
  }
]

export default routerPath
