import {BrowserRouter,Route,Routes} from 'react-router-dom'
import{Signup} from '../pages/Signup'

const Home = () => {
  return <div className="bg-slate-300 h-screen flex justify-center">Hello</div>
}

function App() {

  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      {/* <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/send" element={<SendMoney/>} /> */}

      
    </Routes>

    </BrowserRouter>
   </>
  )
}

export default App
