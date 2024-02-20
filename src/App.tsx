import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import Navbar from './Users/Components/Navbar/Navbar';

function App() {

  return (
    <>
   <Router>

<Routes>
  <Route path='/*' element={<UserRoutes/>}/>
  {/* <Route path='/admin/*' element={<AdminRoutes/>}/> */}
</Routes>
</Router>
    </>
  )
}

export default App
