import { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import "./App.css";
import BugList from "./components/bugList.jsx";

function App() {
  const [title, titleSet] = useState("");
  const [priority, setPriority] = useState("medium");
  const [bugs, setBugs] = useState([
    {
      id: 1,
      title: "Button does not work",
      priority: "high",
    },
    {
      id: 2,
      title: "Page loads slowly",
      priority: "medium",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    const bug = {
      id: Date.now(),
      title,
      priority,
    };

    setBugs([...bugs, bug]);
    console.log(bug);
  }

  function deleteBug(bugId) {
    setBugs(bugs.filter((bug) => bug.id !== bugId));
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Bug Title"
          value={title}
          onChange={(event) => titleSet(event.target.value)}
          inputProps={{
            minLength: 1,
            maxLength: 100,
          }}
          required
        />

        <Select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>

        <Button type="submit" variant="contained">
          Add Bug
        </Button>
      </form>

      <BugList bugs={bugs} onDelete={deleteBug} />
    </main>
  );
}

export default App;