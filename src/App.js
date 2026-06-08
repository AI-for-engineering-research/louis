import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Home from './pages/Home';
import Usage from './pages/Usage';
import './App.css';
function App() {
    const [page, setPage] = useState('home');
    return (_jsxs("div", { className: "app", children: [_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "nav-container", children: [_jsx("h1", { className: "logo", children: "Louis Robion" }), _jsxs("ul", { className: "nav-links", children: [_jsx("li", { children: _jsx("button", { className: page === 'home' ? 'active' : '', onClick: () => setPage('home'), children: "Home" }) }), _jsx("li", { children: _jsx("button", { className: page === 'usage' ? 'active' : '', onClick: () => setPage('usage'), children: "AI Usage Log" }) })] })] }) }), _jsxs("main", { className: "main-content", children: [page === 'home' && _jsx(Home, {}), page === 'usage' && _jsx(Usage, {})] }), _jsx("footer", { className: "footer", children: _jsx("p", { children: "\u00A9 2026 Louis Robion. MIT LAE." }) })] }));
}
export default App;
