import React from "react";
import { Button, Chip } from "@mui/material";

export default function BugList({ bugs, onDelete }) {
  if (!bugs || bugs.length === 0) {
    return <p style={{ color: "#64748b", textAlign: "center" }}>No bugs found!</p>;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Chip
              label={bug.priority.toUpperCase()}
              size="small"
              color={getPriorityColor(bug.priority)}
            />
            <span>{bug.title}</span>
          </div>

          <Button
            size="small"
            color="error"
            onClick={() => onDelete(bug.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}