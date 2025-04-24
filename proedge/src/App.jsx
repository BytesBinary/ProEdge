import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

// Components 
import Home from './pages/home/Home'
import Products from './pages/products/Product'
import Videos from './pages/videos/Videos'
import TechHelp from './pages/tech-help/TechHelp'
import Contact from './pages/contact/Contact'
import Root from './layouts/Root'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'videos', Component: Videos },
      { path: 'tech-help', Component: TechHelp },
      { path: 'contact', Component: Contact },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
