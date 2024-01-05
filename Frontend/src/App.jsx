import {Routes, Route} from 'react-router-dom'
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
       <div className='h-full'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/edit/:id' element={<EditPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
