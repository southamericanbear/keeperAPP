import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import firebase from "../firebase";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submitNote(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection("notes")
      .add({
        title,
        content,
      })
      .then(() => {
        setTitle("");
        setContent("");
      });
  }

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div className="create-note-container">
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={(e) => setContent(e.currentTarget.value)}
          value={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
