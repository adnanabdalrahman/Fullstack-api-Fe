import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage ';
import MainLayout from "./components/MainLayout";
import PostDetailsPage from './components/PostDetailsPage';
import CreatePostPage from './components/CreatePostPage';

const App = () => {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;