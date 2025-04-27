import { Outlet } from 'react-router-dom'
import NavHeader from '../components/common/header/NavHeader'
import MainNav from '../components/common/header/MainNav'
import Footer from '../components/common/partials/Footer'

const Root = () => {
  return (
    <body className='antialiased'>
    <NavHeader />
    <MainNav />
      <main>
        <Outlet />
      </main>
    <Footer />
    </body>
  )
}

export default Root
