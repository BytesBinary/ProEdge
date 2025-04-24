import { Outlet } from 'react-router-dom'
import Header from '../components/common/partials/Header'
import Footer from '../components/common/partials/Footer'

const Root = () => {
  return (
    <>
    <Header />
      <main>
        <Outlet />
      </main>
    <Footer />
    </>
  )
}

export default Root
