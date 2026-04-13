import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";

import {
  contactBriefFieldNames,
  contactBriefSchema,
  defaultContactBriefValues,
  type ContactBriefActionData,
  type ContactBriefValues,
} from "@/lib/contact-brief";

type SubmissionState = {
  visible: boolean;
  tone: "success" | "error";
  message: string;
};

export function useContactBriefForm() {
  const [submittedAt, setSubmittedAt] = useState<number | null>(null);
  const fetcher = useFetcher<ContactBriefActionData>();

  const form = useForm<ContactBriefValues>({
    resolver: zodResolver(contactBriefSchema),
    defaultValues: defaultContactBriefValues,
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("businessName", values.businessName);
    formData.set("corporateEmail", values.corporateEmail);
    formData.set("phoneNumber", values.phoneNumber);
    formData.set("inquiryDetails", values.inquiryDetails);
    formData.set("website", "");

    fetcher.submit(formData, {
      method: "post",
      action: "/contact/strategy-brief",
    });
  });

  useEffect(() => {
    const actionData = fetcher.data;
    if (!actionData) {
      return;
    }

    if (actionData.ok) {
      setSubmittedAt(Date.now());
      form.clearErrors();
      form.reset(defaultContactBriefValues);
      return;
    }

    setSubmittedAt(null);
    form.clearErrors();

    const serverFieldErrors = actionData.fieldErrors;
    if (!serverFieldErrors) {
      return;
    }

    for (const fieldName of contactBriefFieldNames) {
      const message = serverFieldErrors[fieldName];
      if (message) {
        form.setError(fieldName, {
          type: "server",
          message,
        });
      }
    }
  }, [fetcher.data, form]);

  const submissionState = useMemo<SubmissionState>(() => {
    const actionData = fetcher.data;
    if (!actionData) {
      return { visible: false, tone: "success", message: "" };
    }

    if (actionData.ok && submittedAt) {
      return {
        visible: true,
        tone: "success",
        message: actionData.message,
      };
    }

    return {
      visible: true,
      tone: "error",
      message: actionData.message,
    };
  }, [fetcher.data, submittedAt]);

  return {
    ...form,
    onSubmit,
    isPending: fetcher.state !== "idle" || form.formState.isSubmitting,
    submissionState,
  };
}
