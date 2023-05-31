import { createContext, useContext, useEffect, useMemo, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState("All");
  const [activeCard, setActiveCard] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    if (activeNav === "Starred") {
      setFilteredNotes(notes.filter((note) => note.starred));
    } else if (activeNav === "Deleted") {
      setFilteredNotes(notes.filter((note) => note.delete));
    } else {
      setFilteredNotes(notes);
    }
  }, [activeNav, notes, setFilteredNotes]);

  useEffect(() => {
    setActiveCard(0);
  }, [activeNav]);

  useEffect(() => {
    setCount({
      all: notes?.length,
      starred: notes?.filter((note) => note.starred).length,
      delete: notes?.filter((note) => note.delete).length,
    });
  }, [notes]);

  useEffect(() => {
    const storedData = localStorage.getItem('notes');
    console.log(storedData);
    if (storedData) {
      const data = JSON.parse(storedData);
      setNotes(data);
    };

  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const value = useMemo(
    () => ({
      activeNav,
      setActiveNav,
      notes,
      setNotes,
      activeCard,
      setActiveCard,
      searchInput,
      setSearchInput,
      searchResult,
      setSearchResult,
      filteredNotes,
      setFilteredNotes,
      count,
    }),
    [
      activeNav,
      setActiveNav,
      notes,
      setNotes,
      activeCard,
      setActiveCard,
      searchInput,
      setSearchInput,
      searchResult,
      setSearchResult,
      filteredNotes,
      setFilteredNotes,
      count,
    ]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
