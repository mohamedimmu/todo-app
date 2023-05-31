import { useState } from "react";
import { useNotes } from "../../context/NotesContext";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../AddNoteModal/AddNoteModal";
import "./Sidebar.css";

function Sidebar() {
  const {activeNav, setActiveNav, count } = useNotes();
  const [open, setOpen] = useState(false);
  

  const navList = [
    {
      id: 1,
      name: "All",
      count: count?.all,
    },
    {
      id: 2,
      name: "Starred",
      count: count?.starred,
    },
    {
      id: 3,
      name: "Deleted",
      count: count?.delete,
    },
  ];

  function handleClick(element){
    setActiveNav(element);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {navList.map((nav) => (
          <li
            className={`sidebar-list__item ${
              activeNav === nav.name ? "sidebar-list__item--active" : ""
            }`}
            onClick={() => { handleClick(nav.name) }}
            key={nav.id}
          >
            <span className="sidebar__item__name">{nav.name}</span>
            <span className="sidebar__item__count">({nav.count})</span>
          </li>
        ))}
      </ul>

      <Button className="sidebar-new" onClick={handleOpen}>
        <AddIcon />
        <p className="sidebar-new__text">New</p>
      </Button>

      <Modal open={open} handleClose={handleClose} />
    </nav>
  );
}

export default Sidebar;
