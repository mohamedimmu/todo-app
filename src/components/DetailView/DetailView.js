import "./DetailView.css";
import { useNotes } from "../../context/NotesContext";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { handleDeleteNote, handleStarredNote } from "../../utilis";
import { useState } from "react";
import AddNoteModal from "../AddNoteModal/AddNoteModal";

function DetailView() {
  const { activeCard, filteredNotes, notes, setNotes } = useNotes();
  const detailNote = filteredNotes?.[activeCard];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="detail-view">
      {filteredNotes?.length ? (
        <>
          {/* Header */}
          <div className="detail-view-header">
            <div className="detail-view-header__heading">
              <p className="detail-view-header__heading__title">
                {detailNote.title}
              </p>
              <p className="detail-view-header__heading__date">
                {detailNote?.createdAt}
              </p>
            </div>
            <div className="detail-view-header__heading__icon">
              <IconButton title="Edit" onClick={handleOpen}>
                <EditIcon />
              </IconButton>
              {detailNote?.starred ? (
                <IconButton
                  title="Starred note"
                  onClick={() =>
                    handleStarredNote(detailNote?.id, notes, setNotes)
                  }
                >
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton
                  title="Starred note"
                  onClick={() =>
                    handleStarredNote(detailNote?.id, notes, setNotes)
                  }
                >
                  <StarBorderIcon />
                </IconButton>
              )}
              {detailNote?.delete ? (
                <IconButton
                  title="Restore"
                  onClick={() =>
                    handleDeleteNote(detailNote?.id, notes, setNotes)
                  }
                >
                  <RestoreFromTrashIcon />
                </IconButton>
              ) : (
                <IconButton
                  title="Delete"
                  onClick={() =>
                    handleDeleteNote(detailNote?.id, notes, setNotes)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="detail-view-content">{detailNote?.description}</p>

          <AddNoteModal
            open={open}
            handleClose={handleClose}
            prevTitle={detailNote.title}
            prevDescription={detailNote.description}
            prevStarred={detailNote.starred}
            prevDelete={detailNote.delete}
            prevNoteid={detailNote.id}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DetailView;
