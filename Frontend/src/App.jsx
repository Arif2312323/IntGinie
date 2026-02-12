import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProblemsPage  from "./pages/ProblemsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element = {<ProblemsPage/>}/>
    </Routes>
  )
}

export default App
