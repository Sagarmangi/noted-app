import React, { useState } from 'react'
import Header from '../Header';
import Footer from '../Footer';
import CreateArea from '../CreateArea';
import Note from '../Note';


export default function MainPage() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                _id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        <Footer />
    </div>
  )
}
