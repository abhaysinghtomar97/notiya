export default function ImportantTopicsSection({ topics }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Important Topics
      </h2>

      <div className="flex flex-wrap gap-3">

        {topics.map((topic, index) => (

          <span
            key={index}
            className="px-4 py-2 rounded-full border bg-muted text-sm font-medium hover:bg-primary hover:text-primary-foreground transition"
          >
            {topic}
          </span>

        ))}

      </div>

    </section>
  );
}