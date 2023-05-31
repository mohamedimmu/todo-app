import { useNotes } from "../../context/NotesContext";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import "./NotesList.css";
import { useEffect } from "react";
import { handleDeleteNote, handleStarredNote } from "../../utilis";

function NotesList() {
  const {
    activeNav,
    filteredNotes,
    activeCard,
    setActiveCard,
    searchInput,
    searchResult,
    setSearchResult,
    setNotes,
    notes,
  } = useNotes();

  function handleClick(item) {
    setActiveCard(item);
  }

  useEffect(() => {
    if (searchInput !== "") {
      setSearchResult(
        filteredNotes.filter((filterNote) =>
          filterNote.title.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      );
    } else {
      setSearchResult("");
    }
  }, [filteredNotes, searchInput, setSearchResult]);

  return (
    <div className="notes">
      <h2 className="notes__category">{activeNav} Notes</h2>
      {notes?.length === 0 || filteredNotes?.length === 0 ? (
        <div className="notes-empty">
          <LightbulbOutlinedIcon />
          <p className="notes-empty__text">{`Notes you ${
            activeNav === "Add" ? "add" : activeNav.toLowerCase()
          } appear here`}</p>
        </div>
      ) : searchResult?.length === 0 && searchInput !== "" ? (
        <p className="notes__search-text">No matching results</p>
      ) : (
        <div className="notes-list">
          {(searchResult !== "" ? searchResult : filteredNotes)?.map(
            (note, index) => (
              <div
                className={`notes-item ${
                  index === activeCard ? "notes-item--active" : ""
                }`}
                onClick={() => handleClick(index)}
                key={note.id}
              >
                <div className="notes-item__header">
                  <p className="notes-item__header__title">
                    {note.title}
                    {note.delete ? (
                      <span className="notes-item__header--delete">
                        Deleted
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <span className="notes-item__header__icon-container">
                    {note.starred ? (
                      <IconButton
                        title="Starred note"
                        onClick={() =>
                          handleStarredNote(note.id, notes, setNotes)
                        }
                      >
                        <StarIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        title="Starred note"
                        onClick={() =>
                          handleStarredNote(note.id, notes, setNotes)
                        }
                      >
                        <StarBorderIcon />
                      </IconButton>
                    )}
                    {note.delete ? (
                      <IconButton
                        title="Restore"
                        onClick={() =>
                          handleDeleteNote(note.id, notes, setNotes)
                        }
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        title="Delete"
                        onClick={() =>
                          handleDeleteNote(note.id, notes, setNotes)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </span>
                </div>

                <p className="notes-item__description">{note.description}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default NotesList;
