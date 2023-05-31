import React from "react";
import "./Header.css";
import { useNotes } from "../../context/NotesContext";

function Header() {

  const { searchInput, setSearchInput } = useNotes();

  function handleSearch(e){
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="header">
      {/* Logo */}
      <h1 className="header__heading">Notes</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="header__search-box"
        placeholder="Search by title"
        onChange={handleSearch}
        value={searchInput}
      />

      {/* Welcome message */}
      <p className="header__welcome-message">Welcome <span>Priya</span></p>
    </div>
  );
}

export default Header;
