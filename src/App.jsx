import { Routes, Route } from "react-router-dom";
import Home from "./components/global/Home";
import PageNotFound from "./components/pages/PageNotFound";
import Tamp1 from "./templates/tamp1";
import Tamp2 from "./templates/temp2";
import Tamp3 from "./templates/tamp3";
import Tamp4 from "./templates/tamp4";
import LiveText from "./components/pages/LiveText";



function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/livetext' element={<LiveText/>}></Route>
      <Route path='/tamp1' element={<Tamp1/>}></Route>
      <Route path='/tamp2' element={<Tamp2/>}></Route>
      <Route path='/tamp3' element={<Tamp3/>}></Route>
      <Route path='/tamp4' element={<Tamp4/>}></Route>

      <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
