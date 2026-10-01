function BugList({ bugs, onDelete }) {
    return (
        <div className="bug-list">
            <h2>Incomplete Bug List</h2>

            {bugs.map((bug) => (
                <div key={bug.id} className="bug-item">
                    <h3>{bug.title}</h3>
                    <p>Priority: {bug.priority}</p>

                    <button onClick={() => onDelete(bug.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default BugList;
