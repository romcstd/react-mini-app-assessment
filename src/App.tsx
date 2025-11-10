import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  DashboardPage,
  ProjectDetailsPage,
  PageNotFound,
  ProjectNotFound,
} from './pages';
import { Header } from './components/header';
import { Footer } from './components/footer';

export default function App() {
  return (
    <>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1 px-6 py-6 sm:px-12 sm:py-12">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/project/:slug" element={<ProjectDetailsPage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/project-not-found" element={<ProjectNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
