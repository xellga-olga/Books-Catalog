import React from 'react'
import './modal.css'

const Modal = ({ 
  handleDelete,
  closeDeleteModal,
  selectedBookId
}) => {
  return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this book?</p>
          <div className="modal-btn">
            <button onClick={() => { handleDelete(selectedBookId); closeDeleteModal(); }}>
              Confirm
            </button>
            <button onClick={closeDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  )
}

export default Modal