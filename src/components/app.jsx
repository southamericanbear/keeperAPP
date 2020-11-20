import React, { useState } from "react";
import Header from "./header";
import Note from "./note";
import CreateArea from "./CreateArea";

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((lanota, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div className="container">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-grid">
        {notes.map((lanota, index) => (
          <Note
            key={index}
            id={index}
            title={lanota.title}
            content={lanota.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
