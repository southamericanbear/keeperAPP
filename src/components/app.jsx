import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import notes from "../note";
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
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <Footer />
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
  );
};

export default App;
