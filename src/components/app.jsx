import React, { useEffect, useState } from "react";
import Header from "./header";
import Note from "./note";
import CreateArea from "./CreateArea";
import firebase from "../firebase";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setNotes(items);
  }

  return (
    <div className="container">
      <Header />
      <CreateArea />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes-grid">
          {(provided) => (
            <div
              className="notes-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notes.map((lanota, index) => (
                <Note
                  index={index}
                  id={lanota.id}
                  title={lanota.title}
                  content={lanota.content}
                  onDelete={deleteNote}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
