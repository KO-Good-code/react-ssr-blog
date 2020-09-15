import Home from '../view/home';
import Tags from '../view/tags';
import Post from '../view/post';
const routerPath = [
  {
    path: "/",
    exact: true,
    component: Home,
    loadData: Home.loadData
  },
  {
    path: "/tags",
    exact: true,
    component: Tags,
    loadData: Tags.loadData
  },
  {
    path: "/post",
    exact: true,
    component: Post,
    loadData: Post.loadData
  }
]

export default routerPath
