import { ChevronDown } from 'lucide-react'

import { SectionTitle } from '@/components/shared/section-title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faq } from '@/content/home'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page py-12 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col justify-between gap-8">
          <SectionTitle id="faq-title" light={faq.light} strong={faq.strong} className="max-w-[12ch]" />
          <p aria-hidden className="hidden text-[clamp(3rem,6vw,7rem)] font-semibold leading-none text-white lg:block">Питання та<br />відповіді</p>
          <div className="max-w-sm lg:ml-auto lg:max-w-[24rem]">
            <p className="text-sm leading-relaxed text-muted-foreground">{faq.text}</p>
            <Button asChild size="default" className="mt-5">
              <a href="#contacts">{faq.cta}</a>
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
          {faq.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="group rounded-[20px] bg-white transition-colors duration-300 data-[state=open]:bg-blush data-[state=open]:text-white"
            >
              <AccordionTrigger className="px-5 py-4 text-[15px] font-medium sm:px-6 sm:py-5 lg:text-base">
                {item.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blush text-blush-foreground transition-colors group-data-[state=open]:bg-white">
                  <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-sm leading-relaxed sm:px-6 sm:pb-6">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
