export default function NotesList({ notes }) {
  if (!notes) {
    return <p>No notes found.</p>;
  }

  const units = notes.units || [];

  return (
    <div className="space-y-8">
      {units.map((unit) => (
        <div
          key={unit._id}
          className="border rounded-lg p-5"
        >
          <h2 className="text-2xl font-bold">
            Unit {unit.unit}
          </h2>

          <p className="mb-4 text-gray-600">
            {unit.title}
          </p>

          <div className="space-y-2">
            {unit.resources.map((resource) => (
              <div
                key={resource._id}
                className="flex justify-between border rounded p-3"
              >
                <span>{resource.title}</span>

                <a
                  href={resource.driveId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}