import React from "react";
import BookItem from "./BookItem";

function BookList({ books, removeBook, setEditingBook }) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          removeBook={removeBook}
          setEditingBook={setEditingBook}
        />
      ))}
    </div>
  );
}

export default BookList;