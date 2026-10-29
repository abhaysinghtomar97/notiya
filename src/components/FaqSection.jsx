
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HelpCircle, MessageCircleQuestion } from "lucide-react";

export default function FaqSection({ faqs = [] }) {
  const validFaqs = faqs.filter(
    (faq) =>
      faq &&
      typeof faq.question === "string" &&
      faq.question.trim() &&
      typeof faq.answer === "string" &&
      faq.answer.trim()
  );

  if (validFaqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="w-full scroll-mt-24">
      {/* Section heading */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
          <HelpCircle size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Find answers to common questions about this subject and its
            study resources.
          </p>
        </div>

        <span className="hidden shrink-0 rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium sm:inline-flex">
          {validFaqs.length} {validFaqs.length === 1 ? "question" : "questions"}
        </span>
      </div>

      {/* FAQ accordion */}
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3"
      >
        {validFaqs.map((faq, index) => (
          <AccordionItem
            key={faq._id || `faq-${index}`}
            value={`faq-${index}`}
            className="rounded-xl border border-border bg-card px-4 transition-colors duration-200 hover:border-amber-400/70 data-[state=open]:border-amber-400 sm:rounded-2xl sm:px-5"
          >
            <AccordionTrigger className="gap-4 py-4 text-left text-sm font-semibold leading-6 hover:no-underline sm:py-5 sm:text-base [&[data-state=open]>svg]:text-amber-600">
              <span className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{faq.question.trim()}</span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex items-start gap-3 pb-2">
                <MessageCircleQuestion
                  size={18}
                  className="mt-1 shrink-0 text-amber-600 dark:text-amber-400"
                />

                <p className="min-w-0 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                  {faq.answer.trim()}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Helpful note */}
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        For exam preparation, verify syllabus-specific details against the
        latest official university syllabus and examination notices.
      </p>
    </section>
  );
}
