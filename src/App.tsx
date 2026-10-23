import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import EditNotePage from "./pages/EditNotePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/notes/:id/edit" element={<EditNotePage />} />
        <Route path="*" element={<NotesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
