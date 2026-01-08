import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  DashboardPage,
  ProjectsPage,
  ProjectDetailsPage,
  PageNotFound,
  ProjectNotFound,
  PostsPage,
  ProductsPage,
} from './pages';
import { Header } from './components/header';
import { Footer } from './components/footer';

export default function App() {
  return (
    <>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main
            id="main"
            className="flex flex-1 flex-col px-6 py-6 sm:px-12 sm:py-12"
          >
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:slug" element={<ProjectDetailsPage />} />
              <Route path="/project-not-found" element={<ProjectNotFound />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
