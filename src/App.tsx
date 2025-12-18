import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QuickAdd from './pages/QuickAdd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quick-add" element={<QuickAdd />} />
        <Route path="/" element={<Navigate to="/quick-add" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
