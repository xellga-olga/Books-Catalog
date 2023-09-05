import React, { useState } from "react";
import './addModal.css'

function AddEditModal({ book, handleAddEdit, closeModal }) {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [year, setYear] = useState(book.year || '');

  const [error, setError] = useState(null);


  const handleSubmit = () => {
    if (book.year > new Date().getFullYear()) {
      setError("The year can't be in the future.");
      return;
    } 

    if (parseInt(year) > new Date().getFullYear()) {
      setError("The year can't be in the future.");
      return;
    }

    handleAddEdit({ id: book.id, title, author, year });
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <h2>{book.id ? "Edit Book" : "Add Book"}</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <button className="add-btn" onClick={handleSubmit}>{book.id ? "Update" : "Add"}</button>
        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default AddEditModal;
