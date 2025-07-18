import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Admin from "./pages/Admin";
import CarPage from "./pages/CarPage.jsx";


function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/car/:id" element={<CarPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
