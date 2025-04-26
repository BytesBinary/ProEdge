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
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ResetPass from './pages/auth/ResetPass'
import Root from './layouts/Root'
// import Auth from './layouts/Auth'
import CartPage from './pages/cart/Cart'
import checkout from './pages/checkout/Checkout'
import WishList from './pages/wishlist/WishList'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'videos', Component: Videos },
      { path: 'tech-help', Component: TechHelp },
      { path: 'contact-us', Component: Contact },
      { path: 'cart', Component: CartPage },
      { path: 'cart/checkout', Component: checkout },
      { path: 'wish-list', Component: WishList }  
    ],
  },
  {
    path:'/auth',
    // Component: Auth,
    children: [
      { path: 'signin' , Component: SignIn },
      { path: 'signup' , Component: SignUp },
      { path: 'forgot-password', Component: ResetPass }    
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
