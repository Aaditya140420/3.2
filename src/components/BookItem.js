import React from "react";

function BookItem({ book, removeBook, setEditingBook }) {
  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Status: {book.status}</p>
      </div>

      <div className="book-actions">
        <button onClick={() => setEditingBook(book)}>Edit</button>
        <button onClick={() => removeBook(book.id)}>Remove</button>
      </div>
    </div>
  );
}

export default BookItem;