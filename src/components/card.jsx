import React, { useState } from 'react'

const card = ({ name, jop, className }) => {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    function handleClick() {
        if (!title.trim()) return;
        setList([...list, { title, description, done: false }]);
        setTitle("");
        setDescription("");
    }

    function handleMarkAsDone(index) {
        setList(list.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        ));
    }

    function handleEdit(index) {
        setEditingIndex(index);
        setEditTitle(list[index].title);
        setEditDescription(list[index].description);
    }

    function handleSaveEdit(index) {
        setList(list.map((task, i) =>
            i === index ? { ...task, title: editTitle, description: editDescription } : task
        ));
        setEditingIndex(null);
    }

    function handleCancelEdit() {
        setEditingIndex(null);
    }

    function handleDelete(index) {
        setList(list.filter((_, i) => i !== index));
        if (editingIndex === index) setEditingIndex(null);
    }

    const openCount = list.filter(t => !t.done).length;

    return (
        <div className="page">
            <p className="eyebrow">React basics</p>
            <h1 className="page-title">Todo Board</h1>
            <p className="page-subtitle">{openCount} open · {list.length} total</p>

            <div className="box">
                <h2>Add a todo</h2>
                <div className="input">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Review React props"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Note (optional)</label>
                    <textarea
                        placeholder="A short reminder"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <button className="add-btn" onClick={handleClick}>Add todo</button>
                </div>
            </div>

            <div className="list">
                {list.map((task, index) => (
                    <div key={index} className="list-item">
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    style={{ marginBottom: 8, width: "100%", boxSizing: "border-box" }}
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    style={{ marginBottom: 8, width: "100%", boxSizing: "border-box" }}
                                />
                                <div className="btn-group">
                                    <button className="btn-done" onClick={() => handleSaveEdit(index)}>Save</button>
                                    <button className="btn-edit" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="list-item-header">
                                    <h3>{task.title}</h3>
                                    <span className="badge">{task.done ? "Done" : "Open"}</span>
                                </div>
                                <p>{task.description}</p>
                                <div className="btn-group">
                                    <button className="btn-done" onClick={() => handleMarkAsDone(index)}>
                                        {task.done ? "Mark open" : "Mark done"}
                                    </button>
                                    <button className="btn-edit" onClick={() => handleEdit(index)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default card