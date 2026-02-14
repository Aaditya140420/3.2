import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingBook, setEditingBook] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books"));
    if (savedBooks) {
      setBooks(savedBooks);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addOrUpdateBook = (book) => {
    if (editingBook) {
      setBooks(
        books.map((b) => (b.id === editingBook.id ? { ...book, id: b.id } : b))
      );
      setEditingBook(null);
    } else {
      setBooks([...books, { ...book, id: Date.now() }]);
    }
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || book.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === "available").length;
  const issuedBooks = books.filter((b) => b.status === "issued").length;

  return (
    <div className="container">
      <h1>Library Management System</h1>

      <div className="stats">
        <p>Total: {totalBooks}</p>
        <p>Available: {availableBooks}</p>
        <p>Issued: {issuedBooks}</p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="available">Available</option>
        <option value="issued">Issued</option>
      </select>

      <AddBookForm
        addOrUpdateBook={addOrUpdateBook}
        editingBook={editingBook}
      />

      <BookList
        books={filteredBooks}
        removeBook={removeBook}
        setEditingBook={setEditingBook}
      />
    </div>
  );
}

export default App;