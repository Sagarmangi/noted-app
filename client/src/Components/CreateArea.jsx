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

  const submitNote = async e => {
    e.preventDefault();
    props.onAdd(note);

    try {
      const {data} = await axios.post("http://localhost:8080/", {
                ...note
            }, {
                withCredentials: true
            })
    } catch (err) {
      console.log(err);
    }
    
    setNote({
      title: "",
      content: "",
    });
    
  }

  return (
    <div>
      <form onSubmit={(e) => submitNote(e)} className="create-note">
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
          <Fab type="submit">
            <AddCircleOutlineIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
