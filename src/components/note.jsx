import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Fab from "@material-ui/core/Fab";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    border: "none",
    borderColor: "transparent",
    borderRadius: 15,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

function Note(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitNote = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("notes")
      .doc(props.id)
      .update({ title, content })
      .then(() => {
        setTitle("");
        setContent("");
        handleClose();
      });
  };

  const handleClick = () => {
    props.onDelete(props.id);
  };

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className="note"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
          <div>
            <button onClick={handleOpen}>
              <EditIcon />
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <form className="update-note create-note">
                  <input
                    className="input-edit-note"
                    name="title"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    value={title}
                    placeholder="Edit Title"
                  />

                  <textarea
                    name="content"
                    onChange={(e) => setContent(e.currentTarget.value)}
                    value={content}
                    placeholder="Edit note..."
                  />
                  <Fab onClick={submitNote}>
                    <AddCircleIcon />
                  </Fab>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Note;
