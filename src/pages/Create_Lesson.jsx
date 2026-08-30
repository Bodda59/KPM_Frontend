import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import allLessons, { addLesson } from "../assets/Lessons";
import "./Create_Lesson.css";

function Create_Lesson() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [lessonTitle, setLessonTitle] = useState("");
    const [projectName, setProjectName] = useState("");
    const [industry, setIndustry] = useState("");
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!lessonTitle || !projectName || !industry || !department || !description) {
            alert("Please fill in all required fields.");
            return;
        }
        addLesson({
            title: lessonTitle,
            poster: "You",
            industry,
            department,
            keyword: "project",
            description,
        });
        navigate("/lessons");
    };

    const handleDiscard = () => {
        navigate("/lessons");
    };

    return (
        <div className={`create-lesson-container ${theme}-mode`}>
            <div className="create-lesson-inner">

                <nav className="breadcrumb">
                    <button className="breadcrumb-home-btn" onClick={() => navigate("/")}>
                        Home
                    </button>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">Create Lesson</span>
                </nav>

                <div className="page-title-row">
                    <div className="page-title-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="page-title">Create Lesson</h1>
                        <p className="page-subtitle">Fill in the details below to create a new knowledge base lesson.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="create-lesson-layout">
                    <div className="create-lesson-main">

                        <section className="form-box">
                            <h2 className="section-title">
                                <span className="section-dot" />
                                Basic Information
                            </h2>

                            <div className="form-row">
                                <div className="form-field">
                                    <label>Lesson Title *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter lesson title"
                                        value={lessonTitle}
                                        onChange={(e) => setLessonTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Project Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-field">
                                    <label>Industry *</label>
                                    <select
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                    >
                                        <option value="">Select industry</option>
                                        <option value="Advansys">Advansys</option>
                                        <option value="Intro Technology">Intro Technology</option>
                                        <option value="HR">HR</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label>Department *</label>
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <option value="">Select department</option>
                                        <option value="Software">Software</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="Robotics">Robotics</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="form-box">
                            <h2 className="section-title">
                                <span className="section-dot" />
                                Lesson Content
                            </h2>

                            <div className="form-field full-width">
                                <label>Description *</label>
                                <textarea
                                    placeholder="Write the full description of the lesson..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                />
                            </div>
                        </section>

                        <section className="form-box">
                            <h2 className="section-title">
                                <span className="section-dot" />
                                Attachments
                            </h2>

                            <div className="attachments-row">
                                <div className="attachment-dropzone">
                                    <p>Click to upload or drag and drop</p>
                                    <p className="attachment-hint">SVG, PNG, JPG or GIF (max 5MB)</p>
                                </div>
                                <div className="attachment-dropzone">
                                    <p>Click to upload or drag and drop</p>
                                    <p className="attachment-hint">PDF, DOCX, or PPTX (max 5MB)</p>
                                </div>
                            </div>
                            <p className="no-files-text">No files attached yet</p>
                        </section>

                        <div className="form-actions">
                            <button type="button" className="discard-btn" onClick={handleDiscard}>
                                Discard
                            </button>
                            <div className="form-actions-right">
                                <button type="button" className="draft-btn">
                                    Save as Draft
                                </button>
                                <button type="submit" className="submit-btn">
                                    Submit Lesson →
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="review-summary">
                        <h2 className="section-title">
                            <span className="section-dot" />
                            Review Summary
                        </h2>

                        <p className="summary-group-label">Basic information</p>
                        <div className="summary-row">
                            <span>Lesson Title</span>
                            <span className="summary-value">{lessonTitle || "Not provided"}</span>
                        </div>
                        <div className="summary-row">
                            <span>Project Name</span>
                            <span className="summary-value">{projectName || "Not provided"}</span>
                        </div>
                        <div className="summary-row">
                            <span>Industry</span>
                            <span className="summary-value">{industry || "Not provided"}</span>
                        </div>
                        <div className="summary-row">
                            <span>Department</span>
                            <span className="summary-value">{department || "Not provided"}</span>
                        </div>

                        <p className="summary-group-label">Lesson content</p>
                        <div className="summary-row">
                            <span>Description</span>
                            <span className="summary-value">{description ? "Provided" : "Not provided"}</span>
                        </div>

                        <p className="summary-group-label">Attachments</p>
                        <div className="summary-row">
                            <span>Files</span>
                            <span className="summary-value">0 items</span>
                        </div>

                        <div className="summary-note">
                            All changes are saved as you type. You can save draft or submit when ready.
                        </div>
                    </aside>
                </form>
            </div>
        </div>
    );
}

export default Create_Lesson;