export function handleStarredNote(id, notes, setNotes) {
  setNotes(
    notes.map((note) => {
      if (note.id === id) {
        return { ...note, starred: !note.starred };
      }
      return note;
    })
  );
};


export function handleDeleteNote(id, notes, setNotes) {
  setNotes(
    notes.map((note) => {
      if (note.id === id) {
        return { ...note, delete: !note.delete };
      }
      return note;
    })
  );
};

export function getTheDateandTime(){
  const date = new Date();

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${month} ${day} ${year} ${hours}:${minutes.toString().padStart(2, '0')}:00`
  return formattedDate;
}