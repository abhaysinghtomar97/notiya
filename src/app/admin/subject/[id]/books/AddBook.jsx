"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddBook({ subjectId, books }) {
  const router = useRouter();

  const [bookList, setBookList] = useState(books || []);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const [loading, setLoading] = useState(false);

  // --------------------------
  // Reset Form
  // --------------------------

  function resetForm() {
    setTitle("");
    setAuthor("");
    setEditingIndex(null);
  }

  // --------------------------
  // Add / Update Book
  // --------------------------

  function handleAddBook() {
    if (!title.trim()) {
      return toast.error("Book title is required.");
    }

    if (!author.trim()) {
      return toast.error("Author name is required.");
    }

    // Duplicate title check
    const alreadyExists = bookList.some(
      (book, index) =>
        book.title.trim().toLowerCase() ===
          title.trim().toLowerCase() &&
        index !== editingIndex
    );

    if (alreadyExists) {
      return toast.error("Book already exists.");
    }

    const newBook = {
      title: title.trim(),
      author: author.trim(),
    };

    if (editingIndex !== null) {
      const updatedBooks = [...bookList];
      updatedBooks[editingIndex] = newBook;
      setBookList(updatedBooks);

      toast.success("Book updated.");
    } else {
      setBookList((prev) => [...prev, newBook]);

      toast.success("Book added.");
    }

    resetForm();
  }

  // --------------------------
  // Edit Book
  // --------------------------

  function handleEdit(index) {
    const book = bookList[index];

    setTitle(book.title);
    setAuthor(book.author);

    setEditingIndex(index);
  }

  // --------------------------
  // Delete Book
  // --------------------------

  function handleDelete(index) {
    const updated = [...bookList];

    updated.splice(index, 1);

    setBookList(updated);

    if (editingIndex === index) {
      resetForm();
    }

    toast.success("Book removed.");
  }

  // --------------------------
  // Save to Database
  // --------------------------

  async function handleSave() {
    try {
      setLoading(true);

      const res = await axios.put(
        `/api/admin/subject/${subjectId}/books`,
        {
          books: bookList,
        }
      );

      if (res.data.success) {
        toast.success("Books saved successfully.");

        router.refresh();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to save books."
      );
    } finally {
      setLoading(false);
    }
  }

    return (
    <div className="space-y-8">

      {/* Form */}

      <div className="border rounded-xl p-6 bg-main space-y-4">

        <h2 className="text-xl font-semibold">
          {editingIndex !== null ? "Edit Book" : "Add New Book"}
        </h2>

        <Input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <div className="flex gap-3">

          <Button
            type="button"
            onClick={handleAddBook}
          >
            {editingIndex !== null ? "Update Book" : "Add Book"}
          </Button>

          {editingIndex !== null && (
            <Button
              variant="outline"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}

        </div>

      </div>

      {/* Book List */}

      <div className="space-y-4">

        <h2 className="text-xl font-semibold">
          Recommended Books
        </h2>

        {bookList.length === 0 ? (

          <div className="border rounded-xl p-6 text-center text-gray-500">
            No books added yet.
          </div>

        ) : (

          bookList.map((book, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 bg-main flex items-center justify-between"
            >

              <div>

                <h3 className="font-semibold text-lg">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {book.author}
                </p>

              </div>

              <div className="flex gap-2">

                <Button
                  variant="outline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <Button
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}