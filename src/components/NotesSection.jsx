"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  
  Download,
  FileText,
  Presentation,
  BookOpen,
  FlaskConical,
  File,
} from "lucide-react";


import PdfPreview from "./pdfPreview";

function getIcon(type) {
  switch (type) {
    case "notes":
      return <FileText size={18} />;

    case "assignment":
      return <BookOpen size={18} />;

    case "ppt":
      return <Presentation size={18} />;

    case "lab":
      return <FlaskConical size={18} />;

    default:
      return <File size={18} />;
  }
}

export default function NotesSection({ units }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Notes & Resources
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
      >

        {[...units]
          .sort((a, b) => a.unit - b.unit)
          .map((unit) => (

            <AccordionItem
              key={unit._id}
              value={unit._id}
            >

              <AccordionTrigger>

                <div className="text-left">

                  <h3 className="font-semibold">
                    Unit {unit.unit}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {unit.title}
                  </p>

                </div>

              </AccordionTrigger>

              <AccordionContent>

                <div className="space-y-4">

                  {unit.resources.map((resource) => (

                    <div
                      key={resource._id}
                      className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                      <div className="flex items-center gap-3">

                        {getIcon(resource.type)}

                        <div>

                          <h4 className="font-medium">
                            {resource.title}
                          </h4>

                          <p className="text-xs text-muted-foreground capitalize">
                            {resource.type}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-2">

                        {/* Preview */}

                       <PdfPreview driveId={resource.driveId} />

                        {/* Download */}

                        <a
                          href={`https://drive.google.com/uc?export=download&id=${resource.driveId}`}
                          target="_blank"
                          className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2"
                        >

                          <Download size={18} />

                          Download

                        </a>

                      </div>

                    </div>

                  ))}

                </div>

              </AccordionContent>

            </AccordionItem>

          ))}

      </Accordion>

    </section>
  );
}