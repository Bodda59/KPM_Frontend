import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Search_Bar from "../components/Search_Bar";
import Lesson_Card from "../components/Lesson_Card";
import allLessons from "../assets/Lessons";
import "./Lesson_Learned.css";

const PAGE_SIZE = 6;

function PaginatedLessons({ lessons, onOpen }) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(lessons.length / PAGE_SIZE);
    const start = (page - 1) * PAGE_SIZE;
    const visibleLessons = lessons.slice(start, start + PAGE_SIZE);

    return (
        <>
            <div className="lessons-grid">
                {visibleLessons.map((lesson) => (
                    <Lesson_Card key={lesson.id} lesson={lesson} onOpen={onOpen} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-row">
                    <button
                        className="pagination-arrow"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            className={`pagination-number ${num === page ? "active" : ""}`}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        className="pagination-arrow"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}

function Lesson_Learned() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [filteredLessons, setFilteredLessons] = useState(allLessons);
    const [groupByDept, setGroupByDept] = useState(false);

    const handleApply = ({ lessonQuery, department, keyword }) => {
        const result = allLessons.filter((lesson) => {
            const matchesQuery = lesson.title
                .toLowerCase()
                .includes((lessonQuery || "").toLowerCase());
            const matchesDept = department ? lesson.department === department : true;
            const matchesKeyword = keyword ? lesson.keyword === keyword : true;
            return matchesQuery && matchesDept && matchesKeyword;
        });
        setFilteredLessons(result);
    };

    const handleOpenLesson = (lesson) => {
        navigate(`/lessons/${lesson.id}`);
    };

    const grouped = filteredLessons.reduce((acc, lesson) => {
        if (!acc[lesson.department]) acc[lesson.department] = [];
        acc[lesson.department].push(lesson);
        return acc;
    }, {});

    return (
        <div className={`lesson-page-container ${theme}-mode`}>
            <div className="lesson-page-inner">

                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <button className="breadcrumb-home-btn" onClick={() => navigate("/")}>
                        Home
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">Lessons Learned</span>
                </nav>

                {/* Header */}
                <header className="lesson-page-header">
                    <div className="header-sub-row">
                        <div>
                            <h1 className="page-title">Lessons Learned</h1>
                            <p className="page-description">
                                A dedicated space for automation engineers to reflect,
                                share, and grow - documenting key learnings, <br /> challenges,
                                and solutions discovered during project lifecycles.
                            </p>
                        </div>
                        <button
                            className="create-lesson-btn"
                            onClick={() => navigate("/lessons/create")}
                        >
                            + Create Lesson
                        </button>
                    </div>
                </header>

                {/* Search */}
                <Search_Bar onApply={handleApply} />

                {/* Group toggle */}
                <div className="group-toggle-row">
                    <button
                        className="group-toggle-btn"
                        onClick={() => setGroupByDept((prev) => !prev)}
                    >
                        👥 {groupByDept ? "Ungroup" : "Group by Department"}
                    </button>
                </div>

                {/* Lessons */}
                <div className="lessons-content-area">
                    {groupByDept ? (
                        Object.keys(grouped).map((dept) => (
                            <div key={dept} className="department-section">
                                <h2 className="department-title">{dept}</h2>
                                <PaginatedLessons
                                    lessons={grouped[dept]}
                                    onOpen={handleOpenLesson}
                                />
                            </div>
                        ))
                    ) : (
                        <PaginatedLessons
                            lessons={filteredLessons}
                            onOpen={handleOpenLesson}
                        />
                    )}

                    {filteredLessons.length === 0 && (
                        <p className="no-lessons-msg">No lessons match your search.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Lesson_Learned;