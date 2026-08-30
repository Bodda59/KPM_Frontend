import React, { useState } from "react";

function Search_Bar({ onApply }) {
    const [lessonQuery, setLessonQuery] = useState("");
    const [department, setDepartment] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleApply = () => {
        if (onApply) {
            onApply({ lessonQuery, department, keyword });
        }
    };

    return (
        <div className="search-bar-box">
            <div className="search-bar-form">
                <input
                    type="text"
                    placeholder="Search for a lesson..."
                    value={lessonQuery}
                    onChange={(e) => setLessonQuery(e.target.value)}
                    className="search-input"
                />

                <select
                    style={{ width: 200 }}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="search-select"
                >
                    <option value="">Department</option>
                    <option value="Software">Software</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Robotics">Robotics</option>
                </select>

                <select
                    style={{ width: 200 }}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="search-select"
                >
                    <option value="">Keyword</option>
                    <option value="Backend">Backend</option>
                    <option value="Current">Current</option>
                    <option value="Robot">Robot</option>
                </select>

                <button className="search-btn" onClick={handleApply}>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Search_Bar;