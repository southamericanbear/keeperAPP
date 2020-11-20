import React, { useEffect, useState } from "react";
import Header from "./header";
import Note from "./note";
import CreateArea from "./CreateArea";
import firebase from "../firebase";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((snapshot) => {
        const newN = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(newN);
      });
  }, []);

  const deleteNote = (id) => {
    const db = firebase.firestore();
    db.collection("notes").doc(id).delete();
  };

  return (
    <div className="container">
      <Header />
      <CreateArea />
      <div className="notes-grid">
        {notes.map((lanota, index) => (
          <Note
            id={lanota.id}
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
