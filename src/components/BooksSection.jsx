import { BookOpen } from "lucide-react";

export default function BooksSection({ books }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Recommended Books
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

      {(books ?? []).map((book, index) => (

          <div
            key={index}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >

            <div className="flex items-center gap-3 mb-4">

              <BookOpen
                size={24}
                className="text-primary"
              />

              <h3 className="font-semibold text-lg">
                {book.title}
              </h3>

            </div>

            <p className="text-muted-foreground">
              {book.author}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}