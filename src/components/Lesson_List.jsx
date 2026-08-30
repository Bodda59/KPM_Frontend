import React from "react";
import LessonCard from "./Lesson_Card";

function LessonList({ lessons, onOpen }) {
    const grouped = lessons.reduce((acc, lesson) => {
        if (!acc[lesson.department]) acc[lesson.department] = [];
        acc[lesson.department].push(lesson);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(grouped).map((dept) => (
                <div key={dept} style={{ marginBottom: "24px" }}>
                    <h2 style={{ textTransform: "capitalize" }}>{dept}</h2>
                    <div>
                        {grouped[dept].map((lesson) => (
                            <LessonCard key={lesson.id} lesson={lesson} onOpen={onOpen} />
                        ))}
                    </div>
                </div>
            ))}

            {lessons.length === 0 && <p>No lessons match your search.</p>}
        </div>
    );
}

export default LessonList;