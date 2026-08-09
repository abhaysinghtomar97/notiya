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
  FileCheck2,
} from "lucide-react";

import PdfPreview from "./pdfPreview";

// ------------------------------------------------------
// Resource Icon
// ------------------------------------------------------

function getIcon(type) {
  switch (type) {
    case "notes":
      return <FileText size={18} strokeWidth={1.8} />;

    case "assignment":
      return <BookOpen size={18} strokeWidth={1.8} />;

    case "ppt":
      return <Presentation size={18} strokeWidth={1.8} />;

    case "lab":
      return <FlaskConical size={18} strokeWidth={1.8} />;

    default:
      return <File size={18} strokeWidth={1.8} />;
  }
}

// ------------------------------------------------------
// Download Button
// ------------------------------------------------------

function DownloadButton({ driveId }) {
  return (
    <a
      href={`https://drive.google.com/uc?export=download&id=${driveId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        h-10
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-foreground
        px-3
        text-xs
        font-medium
        text-background
        transition-all
        hover:opacity-90
        active:scale-[0.98]

        sm:w-auto
        sm:px-4
        sm:text-sm
      "
    >
      <Download size={16} />
      Download
    </a>
  );
}

// ------------------------------------------------------
// Main Component
// ------------------------------------------------------

export default function NotesSection({ units }) {
  if (!units || units.length === 0) {
    return (
      <section className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Notes & Resources
          </h2>

          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            No study resources available yet.
          </p>
        </div>
      </section>
    );
  }

  // Sort units
  const sortedUnits = [...units].sort(
    (a, b) => Number(a.unit) - Number(b.unit)
  );

  // Total resources
  const totalResources = sortedUnits.reduce(
    (total, unit) => total + (unit.resources?.length || 0),
    0
  );

  return (
    <section className="w-full">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-5 sm:mb-7">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-amber-100
              text-amber-700
              dark:bg-amber-400/10
              dark:text-amber-400
              sm:h-9
              sm:w-9
            "
          >
            <FileCheck2 size={18} />
          </div>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Notes & Resources
          </h2>
        </div>

        {/* Desktop */}
        <p className="ml-11 mt-1 hidden text-sm text-muted-foreground sm:block">
          Access notes, assignments, presentations and other study resources.
        </p>

        {/* Mobile */}
        <p className="ml-11 mt-1 text-xs text-muted-foreground sm:hidden">
          Study notes, PYQs & other resources
        </p>

        {/* Summary */}
        <div className="ml-11 mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            {sortedUnits.length}{" "}
            {sortedUnits.length === 1 ? "Unit" : "Units"}
          </span>

          <span>•</span>

          <span>
            {totalResources}{" "}
            {totalResources === 1 ? "Resource" : "Resources"}
          </span>
        </div>
      </div>

      {/* ==================================================
          ACCORDION
      ================================================== */}

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2.5 sm:space-y-3"
      >
        {sortedUnits.map((unit) => {
          const resources = unit.resources || [];
          const resourceCount = resources.length;

          return (
            <AccordionItem
              key={unit._id}
              value={unit._id}
              className="
                rounded-xl
                border
                border-border
                bg-background
                px-3
                transition-all
                duration-200

                hover:border-amber-300
                hover:shadow-sm

                data-[state=open]:border-amber-400
                data-[state=open]:bg-amber-50/60

                dark:data-[state=open]:border-amber-400/50
                dark:data-[state=open]:bg-amber-400/5

                sm:rounded-2xl
                sm:px-5
              "
            >
              {/* ==================================================
                  UNIT HEADER
              ================================================== */}

              <AccordionTrigger
                className="
                  py-4
                  hover:no-underline
                  sm:py-5
                "
              >
                <div className="flex min-w-0 items-center gap-3 text-left sm:gap-4">
                  {/* Number */}
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-amber-100
                      text-xs
                      font-bold
                      text-amber-800
                      dark:bg-amber-400/10
                      dark:text-amber-400
                      sm:h-10
                      sm:w-10
                      sm:text-sm
                    "
                  >
                    {String(unit.unit).padStart(2, "0")}
                  </div>

                  {/* Unit Information */}
                  <div className="min-w-0">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-amber-700
                        dark:text-amber-400
                        sm:text-xs
                      "
                    >
                      Unit {unit.unit}
                    </p>

                    <h3
                      className="
                        mt-0.5
                        truncate
                        text-sm
                        font-semibold
                        sm:text-base
                      "
                    >
                      {unit.title}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
                      {resourceCount}{" "}
                      {resourceCount === 1 ? "resource" : "resources"}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              {/* ==================================================
                  CONTENT

                  IMPORTANT:
                  Do NOT put overflow-hidden here.
              ================================================== */}

              <AccordionContent className="pb-4 sm:pb-5">
                <div className="flex flex-col gap-3">
                  {resourceCount === 0 ? (
                    <div
                      className="
                        rounded-xl
                        border
                        border-dashed
                        border-border
                        px-4
                        py-6
                        text-center
                        text-xs
                        text-muted-foreground
                      "
                    >
                      No resources available .Request This Unit <a className="text-blue-700" href="https://docs.google.com/forms/d/e/1FAIpQLSeDO3TLHkGRXh1OzO6fSLOlaTWAlGnU1-Mp4me_mUxs1g7qAA/viewform?usp=preview">Click here</a>.
                    </div>
                  ) : (
                    resources.map((resource) => (
                      <div
                        key={resource._id}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-border
                          bg-background
                          p-3

                          sm:p-4
                        "
                      >
                        {/* ==================================================
                            RESOURCE LAYOUT

                            Mobile:
                            Info
                            Buttons

                            Desktop:
                            Info        Buttons
                        ================================================== */}

                        <div
                          className="
                            grid
                            grid-cols-1
                            gap-3

                            sm:grid-cols-[1fr_auto]
                            sm:items-center
                          "
                        >
                          {/* Resource Information */}
                          <div className="flex min-w-0 items-center gap-3">
                            {/* Icon */}
                            <div
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-amber-100
                                text-amber-700
                                dark:bg-amber-400/10
                                dark:text-amber-400
                                sm:h-10
                                sm:w-10
                              "
                            >
                              {getIcon(resource.type)}
                            </div>

                            {/* Text */}
                            <div className="min-w-0">
                              <h4
                                className="
                                  truncate
                                  text-sm
                                  font-medium
                                "
                              >
                                {resource.title}
                              </h4>

                              <p
                                className="
                                  mt-0.5
                                  text-[10px]
                                  capitalize
                                  text-muted-foreground
                                  sm:text-xs
                                "
                              >
                                {resource.type}
                              </p>
                            </div>
                          </div>

                          {/* ==================================================
                              ACTIONS

                              This is now INSIDE the same grid.
                              It cannot overflow the resource card.
                          ================================================== */}

                          <div
                            className="
                              grid
                              grid-cols-2
                              gap-2

                              sm:flex
                              sm:items-center
                              sm:justify-end
                            "
                          >
                            {/* Preview */}
                            <div className="min-w-0">
                              <div
                                className="
                                  w-full

                                  [&>button]:!flex
                                  [&>button]:!h-10
                                  [&>button]:!w-full
                                  [&>button]:!items-center
                                  [&>button]:!justify-center

                                  sm:[&>button]:!w-auto
                                "
                              >
                                <PdfPreview driveId={resource.driveId} />
                              </div>
                            </div>

                            {/* Download */}
                            <DownloadButton
                              driveId={resource.driveId}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}