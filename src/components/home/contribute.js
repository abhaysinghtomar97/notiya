export default function Contribute() {
  return (
    <section className="py-12">
      <div className="bg-muted border border-border rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Have quality notes?</h2>
        <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
          Help thousands of AKTU students by contributing your notes and study resources to the platform.
        </p>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-2.5 rounded-md transition-colors">
          Contribute Notes
        </button>
      </div>
    </section>
  );
}