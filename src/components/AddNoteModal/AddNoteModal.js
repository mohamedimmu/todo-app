import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuidv4 } from "uuid";
import "./AddNoteModal.css";
import { getTheDateandTime } from "../../utilis";
import { useNotes } from "../../context/NotesContext";

function AddNoteModal({
  open,
  handleClose,
  prevTitle,
  prevDescription,
  prevStarred,
  prevDelete,
  prevNoteid,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setNotes } = useNotes();

  function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      id: uuidv4(),
      title,
      description,
      starred: prevTitle && prevDescription ? prevStarred : false,
      delete: prevTitle && prevDescription ? prevDelete : false,
      createdAt: getTheDateandTime(),
    };
    setTitle("");
    setDescription("");

    if (prevTitle && prevDescription) {
      setNotes((prevNotes) => {
       return (prevNotes?.map((note) => {
        if (note.id === prevNoteid) {
          return { ...newNote };
        } else {
          return note;
        }
      }));
      });
    } else {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
    handleClose();
  }
  useEffect(() => {
    if (prevTitle && prevDescription) {
      setTitle(prevTitle);
      setDescription(prevDescription);
    }
  }, [prevTitle, prevDescription]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="add-new-modal"
    >
      <form className="add-new-modal__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="add-new-modal__form__title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Take a note..."
          cols="30"
          rows="10"
          className="add-new-modal__form__description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <Button
          variant="contained"
          className="add-new-modal__form__button"
          type="submit"
        >
          <SaveIcon />
          Save
        </Button>
      </form>
    </Modal>
  );
}

export default AddNoteModal;
