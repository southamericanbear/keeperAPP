import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Draggable } from "react-beautiful-dnd";

function Note(props) {
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
          <button>
            <EditIcon />
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default Note;
