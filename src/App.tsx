import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home'
import Search from "./pages/Search/Search";
import Hotel from "./pages/Hotel/Hotel";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Success/Success";


function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/checkout" element={< Checkout />} />
        <Route path="/success" element={< Success />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
