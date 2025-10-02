import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/certificates' element={<Certificates />} />
          </Routes>
      </Router>
  )
}

export default App
