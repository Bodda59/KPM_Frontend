import React from "react";

function LessonCard({ lesson, onOpen }) {
    const fullStars = Math.round(lesson.rating);
    const initials = lesson.poster.slice(0, 2).toUpperCase();

    return (
        <div className="lesson-card">
            <img
                src={lesson.image}
                alt={lesson.title}
                className="lesson-card-img"
            />

            <h3 className="lesson-card-title">{lesson.title}</h3>



            <div className="lesson-card-poster-row">
                <div className="lesson-card-avatar">{initials}</div>
                <p className="lesson-card-poster">{lesson.poster}</p>
            </div>
            <p className="lesson-card-rating">
                {"★".repeat(fullStars)}
                {"☆".repeat(5 - fullStars)}{" "}
                <span className="lesson-card-rating-count">
                    ({lesson.rating.toFixed(1)}, {lesson.ratingCount} ratings)
                </span>
            </p>

            <p className="lesson-card-description">{lesson.description}</p>



            <button className="lesson-card-btn" onClick={() => onOpen(lesson)}>
                Open lesson
            </button>
        </div>
    );
}

export default LessonCard;