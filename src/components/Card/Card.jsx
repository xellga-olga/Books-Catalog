import React, { useState } from "react";
import "./card.css";
import {RiDeleteBin5Line, RiEdit2Line} from 'react-icons/ri'
import Modal from '../Modal/Modal'
import AddEditModal from "../Modal/AddEditModal";


function Card() {
  const [listData, setListData] = useState([
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      year: 1949,
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
    },
    {
      id: 4,
      title: "Moby-Dick",
      author: "Herman Melville",
      year: 1851,
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
    },
    {
      id: 7,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
    },
    {
      id: 8,
      title: "Brave New World",
      author: "Aldous Huxley",
      year: 1932,
    },
    {
      id: 9,
      title: "Wuthering Heights",
      author: "Emily Brontë",
      year: 1847,
    },
    {
      id: 10,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      year: 1847,
    },
  ]);

  
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedBookId, setSelectedBookId] = useState(null);

const handleDelete = (bookId) => {
  const newListData = listData.filter(book => book.id !== bookId);
  setListData(newListData);
}

const openDeleteModal = (bookId) => {
  setSelectedBookId(bookId);
  setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setSelectedBookId(null);
  setIsDeleteModalOpen(false);
};

//AddEditModal
const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
const [editingBook, setEditingBook] = useState(null);

const openAddEditModal = (book) => {
  setEditingBook(book);
  setIsAddEditModalOpen(true);
};

const closeAddEditModal = () => {
  setEditingBook(null);
  setIsAddEditModalOpen(false);
};

const handleAddEdit = (book) => {
  if (book.id) {
    const newListData = listData.map(item => item.id === book.id ? book : item);
    setListData(newListData);
  } else {
    const newBook = { ...book, id: Date.now() };
    setListData([...listData, newBook]);
  }
  closeAddEditModal();
};

const [sortType, setSortType] = useState(null);
const [filterQuery, setFilterQuery] = useState("");

const sortedAndFilteredBooks = listData
  .filter(book => book.title.toLowerCase().includes(filterQuery.toLowerCase()))
  .sort((a, b) => {
    if (sortType === "year") {
      return a.year - b.year;
    }
    if (sortType === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
});

return (
  <>
    <button className="btn" onClick={() => openAddEditModal({})}>Add new book</button>
    {isAddEditModalOpen && <AddEditModal 
      book={editingBook} 
      handleAddEdit={handleAddEdit}
      closeModal={closeAddEditModal} 
    />}

    <div className="controls-wrapper">
      <div>
        <label>Sort by: </label>
        <select value={sortType} onChange={e => setSortType(e.target.value)}>
            <option value={null}>Default</option>
            <option value="year">Year</option>
            <option value="title">Title</option>
        </select>
      </div>

      <div>
        <label>Filter by Author: </label>
        <input 
            type="text" 
            value={filterQuery} 
            onChange={e => setFilterQuery(e.target.value)} 
            placeholder="Enter author's name" 
        />
      </div>
    </div>

    <div className="cards">
      {sortedAndFilteredBooks.map(book => (
        <div key={book.id} className="card">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <p>{book.year}</p>
          <button className="btn_del" onClick={() => openDeleteModal(book.id)}>
            <RiDeleteBin5Line/>
          </button>
          <button className="btn_edit" onClick={() => openAddEditModal(book)}>
            <RiEdit2Line />
          </button>
        </div>
      ))}
    </div>

    {isDeleteModalOpen && <Modal 
      handleDelete={handleDelete}
      closeDeleteModal={closeDeleteModal}
      selectedBookId={selectedBookId} 
    />}
  </>
);
}

export default Card;