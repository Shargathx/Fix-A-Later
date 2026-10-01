import { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import BugList from "./components/bugList.jsx";
import { getAllItems, addItem, deleteItem } from "../../server/app.js";

function App() {
  const [title, titleSet] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filterHigh, setFilterHigh] = useState(false);
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const loadBugs = async () => {
      try {
        const data = await getAllItems();
        setBugs(data);
      } catch (error) {
        console.error("Failed to load bugs:", error);
      }
    };

    loadBugs();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const bug = { title, priority };

    try {
      const createdBug = await addItem(bug);

      setBugs((currentBugs) => [
        ...currentBugs,
        ...createdBug,
      ]);

      titleSet("");
      setPriority("medium");
    } catch (error) {
      console.error("Failed to add bug:", error);
    }
  }

  async function deleteBug(bugId) {
    try {
      await deleteItem(bugId);

      setBugs((currentBugs) =>
        currentBugs.filter((bug) => bug.id !== bugId)
      );
    } catch (error) {
      console.error("Failed to delete bug:", error);
    }
  }

  const displayedBugs = filterHigh
    ? bugs.filter((bug) => bug.priority === "high")
    : bugs;

  return (
    <main>
      <h1>Fix-A-Later</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Bug Title"
          value={title}
          onChange={(event) => titleSet(event.target.value)}
          slotProps={{
            htmlInput: {
              minLength: 1,
              maxLength: 100,
            },
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

      <div style={{ margin: "1rem 0" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterHigh}
              onChange={(e) => setFilterHigh(e.target.checked)}
            />
          }
          label="Show High-Priority Bugs Only"
        />
      </div>

      <BugList
        bugs={displayedBugs}
        onDelete={deleteBug}
      />
    </main>
  );
}

export default App;