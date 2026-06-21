import { NextResponse } from "next/server";
import ConnectDb from "@/dbConfig/dbConfig";
import Subject from "@/models/Subject";

// GET All Books
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();

    const subject = await Subject.findById(id).select("books");

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      books: subject.books,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// Update Books
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { books } = await request.json();

    await ConnectDb();

    if (!Array.isArray(books)) {
      return NextResponse.json(
        {
          success: false,
          message: "Books must be an array",
        },
        { status: 400 }
      );
    }

    // Remove duplicate books by title
    const uniqueBooks = [];
    const seen = new Set();

    for (const book of books) {
      const title = book.title?.trim().toLowerCase();

      if (!title || seen.has(title)) continue;

      seen.add(title);

      uniqueBooks.push({
        title: book.title.trim(),
        author: book.author?.trim() || "",
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      {
        $set: {
          books: uniqueBooks,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("books");

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Books updated successfully",
      books: subject.books,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}