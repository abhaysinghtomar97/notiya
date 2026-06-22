import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection({ faqs }) {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-6">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
      >

        {faqs.map((faq, index) => (

          <AccordionItem
            key={index}
            value={`faq-${index}`}
          >

            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent>
              <p className="leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </AccordionContent>

          </AccordionItem>

        ))}

      </Accordion>

    </section>
  );
}