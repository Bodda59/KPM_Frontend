import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import lessons from "../assets/Lessons";
import "./Lesson_Details.css";

function Lesson_Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const lesson = lessons.find((l) => String(l.id) === id);

    if (!lesson) {
        return (
            <div className={`lesson-details-container ${theme}-mode`}>
                <div className="lesson-details-inner">
                    <p>Lesson not found.</p>
                    <button className="back-btn" onClick={() => navigate("/lessons")}>
                        ‹ Back to Lessons
                    </button>
                </div>
            </div>
        );
    }

    const initials = lesson.poster
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const fullStars = Math.round(lesson.rating);

    return (
        <div className={`lesson-details-container ${theme}-mode`}>
            <div className="lesson-details-inner">

                <nav className="breadcrumb">
                    <button className="breadcrumb-home-btn" onClick={() => navigate("/")}>
                        Home
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">Lesson Details</span>
                </nav>

                <div className="lesson-details-layout">

                    <div className="lesson-main-card">
                        <div className="lesson-header-block">
                            <span className="department-badge">{lesson.department}</span>
                            <h1 className="lesson-title">{lesson.title}</h1>
                            <p className="lesson-project">Industry: {lesson.industry}</p>
                        </div>

                        <div className="lesson-body-block">
                            <div className="author-row">
                                <div className="author-avatar">{initials}</div>
                                <div className="author-info">
                                    <span className="author-label">Author</span>
                                    <span className="author-name">{lesson.poster}</span>
                                </div>
                                <div className="rating-share-group">
                                    <span className="rating-stars">
                                        {"★".repeat(fullStars)}
                                        {"☆".repeat(5 - fullStars)}
                                    </span>
                                    <span className="rating-text">
                                        {lesson.rating.toFixed(1)} ({lesson.ratingCount} reviews)
                                    </span>
                                    <button className="share-btn">Share</button>
                                </div>
                            </div>

                            <hr className="divider" />

                            <h2 className="section-heading">
                                <span className="heading-bar" />
                                Lesson Summary
                            </h2>
                            <p className="summary-text">{lesson.description}</p>

                            <h2 className="section-heading">
                                <span className="heading-bar" />
                                Description
                            </h2>
                            <p className="description-text">{lesson.description}</p>
                        </div>
                    </div>

                    <div className="lesson-sidebar">
                        {lesson.pdf && (
                            <div className="sidebar-box">
                                <h3 className="sidebar-title">Attachments</h3>
                                <div className="attachment-row">
                                    <div className="attachment-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <path d="M14 2v6h6" />
                                        </svg>
                                    </div>
                                    <div className="attachment-info">
                                        <span className="attachment-name">{lesson.pdf}</span>
                                        <span className="attachment-meta">PDF</span>
                                    </div>
                                    <button className="download-btn" aria-label="Download">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        )}


                        <div className="sidebar-box">
                            <h3 className="sidebar-title">Quick links</h3>
                            <a className="quick-link" href="#">
                                Attachments - Download pdf
                            </a>
                        </div>

                        <div className="sidebar-box">
                            <h3 className="sidebar-title">Quick links</h3>
                            <a className="quick-link" href="#">
                                Internal Wiki - {lesson.department}
                            </a>
                        </div>

                        <div className="sidebar-box">
                            <h3 className="sidebar-title">Keywords</h3>
                            <div className="keyword-tags">
                                <span className="keyword-tag">#{lesson.keyword}</span>
                                <span className="keyword-tag">#{lesson.industry}</span>
                            </div>
                        </div>

                        <div className="cta-box">
                            <h3 className="cta-title">Have a similar lesson?</h3>
                            <p className="cta-text">
                                Sharing your experience helps our engineering community grow stronger.
                            </p>
                            <button className="cta-btn" onClick={() => navigate("/lessons/create")}>
                                + Create Lesson
                            </button>
                        </div>
                    </div>
                </div>

                <button className="back-btn" onClick={() => navigate("/lessons")}>
                    ‹ Back to Lessons
                </button>
            </div>
        </div>
    );
}

export default Lesson_Details;