"use client";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { contact } from "@/resource";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { contactAction } from "@/actions/contact-action";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = contact.placeholders;

export function FormContent({ success }: { success: boolean }) {
  const { pending } = useFormStatus();

  return (
    <>
      <PlaceholdersAndVanishInput
        type="text"
        name="name"
        id="name"
        placeholder="Your name"
        success={success}
        autoComplete="off"
        pending={pending}
      />
      <PlaceholdersAndVanishInput
        name="email"
        id="email"
        placeholder="Your email"
        success={success}
        autoComplete="off"
        pending={pending}
      />
      <PlaceholdersAndVanishInput
        type="textarea"
        name="message"
        id="message"
        success={success}
        placeholders={placeholders}
        isTextArea
        autoComplete="off"
        pending={pending}
      />
      <button className={cn("p-[3px] relative mt-10")} disabled={pending}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg" />
        <div
          className={cn(
            `px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white font-bold hover:bg-transparent ${
              pending && "bg-transparent"
            }`
          )}
        >
          {pending ? (
            <div className="flex items-center justify-center">
              Sending...
              <Icon
                icon="icon-park-outline:to-right"
                className="animate-sending ml-2"
              />
            </div>
          ) : (
            <>Send</>
          )}
        </div>
      </button>
    </>
  );
}

export default function ContactForm() {
  const [initialState, setInitialState] = useState({
    success: false,
    errors: {},
  });

  const [state, formAction] = useFormState(contactAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      const timeOut = setTimeout(() => {
        if (state.success) {
          setInitialState({ success: true, errors: {} });
        }
      }, 2000);

      return () => clearTimeout(timeOut);
    }
    if (state.errors) {
      Object.values(state.errors).forEach((value) => {
        toast({
          duration: 3000,
          title: "Error",
          description: value[0],
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
    }
  }, [state, toast]);

  return (
    <div className="mt-10">
      {initialState.success && (
        <div className="flex justify-center">
          <p
            className={cn(
              "my-20 w-fit opacity-0 animate-fadeIn text-center text-white text-lg font-semibold",
              "rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 p-5 shadow-lg shadow-emerald-300/100 dark:shadow-emerald-500/100"
            )}
          >
            🙏 Thank you for your message . I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      )}
      {!initialState.success && (
        <form
          action={formAction}
          className={`flex flex-col gap-5 p-1 ${
            state.success && "animate-fadeOut"
          }`}
        >
          <FormContent success={state.success} />
        </form>
      )}
    </div>
  );
}
