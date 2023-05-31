import Sidebar from "../Sidebar/Sidebar";
import NotesList from "../NotesList/NotesList";
import DetailView from "../DetailView/DetailView";
import "./Notes.css";
import { useNotes } from "../../context/NotesContext";


function Notes() {
  const { notes, filteredNotes } = useNotes();
  return (
    <div className={`notes-container ${notes?.length === 0 || filteredNotes?.length === 0  ? "notes-container--flex" : ""}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Notes List */}
      <NotesList />

      {/* Detail View */}
      <DetailView />
    </div>
  )
}

export default Notes;
