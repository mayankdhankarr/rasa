import { z } from "zod";

export const contactBriefFieldNames = [
  "name",
  "businessName",
  "corporateEmail",
  "phoneNumber",
  "inquiryDetails",
] as const;

export type ContactBriefFieldName = (typeof contactBriefFieldNames)[number];

export const contactBriefSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
  businessName: z
    .string()
    .trim()
    .min(2, "Business name is required")
    .max(160, "Business name is too long"),
  corporateEmail: z
    .string()
    .trim()
    .email("Enter a valid corporate email")
    .max(254, "Email address is too long"),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Phone number is required")
    .max(32, "Phone number is too long"),
  inquiryDetails: z
    .string()
    .trim()
    .min(24, "Please provide a brief challenge summary")
    .max(2000, "Please keep your brief under 2000 characters"),
});

export type ContactBriefValues = z.infer<typeof contactBriefSchema>;

export const defaultContactBriefValues: ContactBriefValues = {
  name: "",
  businessName: "",
  corporateEmail: "",
  phoneNumber: "",
  inquiryDetails: "",
};

export type ContactBriefActionData = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<ContactBriefFieldName, string>>;
};
