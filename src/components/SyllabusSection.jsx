import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SyllabusSection({ syllabus }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Syllabus
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        {[...syllabus]
          .sort((a, b) => a.unit - b.unit)
          .map((unit) => (
            <AccordionItem
              key={unit.unit}
              value={`unit-${unit.unit}`}
            >
              <AccordionTrigger>

                <div className="text-left">

                  <h3 className="font-semibold">
                    Unit {unit.unit}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {unit.title}
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    {unit.topics.length} Topics
                  </p>

                </div>

              </AccordionTrigger>

              <AccordionContent>

                <ul className="list-disc pl-6 space-y-2">

                  {unit.topics.map((topic, index) => (
                    <li key={index}>
                      {topic}
                    </li>
                  ))}

                </ul>

              </AccordionContent>

            </AccordionItem>
          ))}
      </Accordion>

    </section>
  );
}