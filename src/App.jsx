import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Lesson_Learned from "./pages/Lesson_Learned";
import Create_Lesson from "./pages/Create_Lesson";
import Lesson_Details from "./pages/Lesson_Details";
import Chatbot from "./pages/Chatbot";
import FloatingChatbot from "./components/FloatingChatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <div className="app-layout">
                    <Navbar />
                    <FloatingChatbot />

                    <main className="app-content">
                        <Routes>
                            <Route path="/lessons" element={<Lesson_Learned />} />
                            <Route path="/lessons/create" element={<Create_Lesson />} />
                            <Route path="/lessons/:id" element={<Lesson_Details />} />
                            <Route path="/chatbot" element={<Chatbot />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
