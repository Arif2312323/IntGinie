import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProblemsPage  from "./pages/ProblemsPage"
import ProblemPage from "./pages/ProblemPage"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element = {<ProblemsPage/>}/>
      <Route path="/problem/:id" element = {<ProblemPage/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
    </Routes>
  )
}

export default App
