import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';
import DetailTodo from './pages/DetailTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:id" element={<DetailTodo />} />
      </Routes>
    </Router>
  );
}

export default App;