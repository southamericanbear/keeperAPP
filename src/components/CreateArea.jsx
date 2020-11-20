import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import firebase from "../firebase";
import { SettingsOutlined } from "@material-ui/icons";

// firebase.firestore().collection("notes").add({
//   title: "",
//   content: "",
// });

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div className="create-note-container">
      <form className="create-note" onSubmit={onSubmit}>
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
          <Fab>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
