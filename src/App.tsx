import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import LearnMap from "./pages/LearnMap";
import LessonPlay from "./pages/LessonPlay";
import ParentDashboard from "./pages/ParentDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnMap />} />
        <Route path="/lesson/:id" element={<LessonPlay />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
