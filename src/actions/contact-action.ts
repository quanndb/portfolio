"use server";
import { contact } from "@/resource";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function contactAction(state: any, formData: FormData) {
  // Validate using Zod
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors, // return the errors object
    };
  }

  // API request to Formspree
  const response = await fetch(contact.contactAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return {
      success: false,
      errors: ["Something went wrong. Please try again later."],
    };
  }

  return {
    success: true,
  };
}
