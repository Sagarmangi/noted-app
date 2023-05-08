import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Zoom from "@mui/material/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [noteExpand, setNoteExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  function expandNote() {
    setNoteExpand(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
    event.preventDefault();
  }

  function submitNote(event) {
    props.onAdd(note);
    axios.post("http://localhost:8080/", note);
    window.location = "/";
    setNote({
      title: "",
      content: "",
    });
    
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {noteExpand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expandNote}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={noteExpand ? 3 : 1}
        />
        <Zoom in={noteExpand}>
          <Fab type="button" onClick={submitNote}>
            <AddCircleOutlineIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
