import dynamic from "next/dynamic";
import { contact, contactDataType } from "@/resource";
import ContactForm from "@/components/ui/contact-form";
const Grid = dynamic(() => import("@/components/ui/grid-pattern"), {
  ssr: false,
});

export default function Contact() {
  const contactData: contactDataType = contact;

  return (
    <section
      className="container md:mx-auto overflow-hidden mb-40 py-6 md:px-6 flex"
      id="contact"
    >
      <div className="w-full max-w-5xl">
        <div className="relative bg-gradient-to-b dark:from-teal-950 from-neutral-100 dark:to-neutral-950 to-white px-10 pb-10 mt-14 rounded-3xl overflow-hidden shadow-xl ">
          <Grid size={40} />
          <h2 className="text-2xl md:text-4xl font-bold mb-4 mt-14 text-black dark:text-white max-w-4xl">
            {contactData.title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-md md:text-xl max-w-md">
            {contactData.description}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
