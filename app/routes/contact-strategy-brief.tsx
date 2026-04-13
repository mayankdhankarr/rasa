import { Suspense, lazy } from "react";
import type { Route } from "./+types/contact-strategy-brief";

import { RoutePageLoader } from "@/components/common/route-page-loader";
import {
  contactBriefFieldNames,
  contactBriefSchema,
  type ContactBriefActionData,
} from "@/lib/contact-brief";
import { buildSeoMeta } from "@/lib/seo";

const ContactStrategyBriefPage = lazy(() =>
  import("@/pages/contact-strategy-brief").then((module) => ({
    default: module.ContactStrategyBriefPage,
  }))
);

const successMessage = "Inquiry received. A consultant will respond within one business day.";

function readFormInput(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unavailable";
  }

  return request.headers.get("x-real-ip") || "unavailable";
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const honeypotValue = readFormInput(formData, "website").trim();

  if (honeypotValue) {
    return Response.json({
      ok: true,
      message: successMessage,
    } satisfies ContactBriefActionData);
  }

  const submission = {
    name: readFormInput(formData, "name"),
    businessName: readFormInput(formData, "businessName"),
    corporateEmail: readFormInput(formData, "corporateEmail"),
    phoneNumber: readFormInput(formData, "phoneNumber"),
    inquiryDetails: readFormInput(formData, "inquiryDetails"),
  };

  const parsed = contactBriefSchema.safeParse(submission);
  if (!parsed.success) {
    const flattenedErrors = parsed.error.flatten().fieldErrors;
    const fieldErrors: ContactBriefActionData["fieldErrors"] = {};

    for (const fieldName of contactBriefFieldNames) {
      const message = flattenedErrors[fieldName]?.[0];
      if (message) {
        fieldErrors[fieldName] = message;
      }
    }

    return Response.json(
      {
        ok: false,
        message: "Please review the highlighted fields and try again.",
        fieldErrors,
      } satisfies ContactBriefActionData,
      { status: 400 }
    );
  }

  const requestUrl = new URL(request.url);

  try {
    const { sendContactBriefEmail } = await import("~/lib/contact-brief-mailer.server");
    await sendContactBriefEmail({
      ...parsed.data,
      submittedAtIso: new Date().toISOString(),
      requestOrigin: requestUrl.origin,
      requestPath: requestUrl.pathname,
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent") || "unavailable",
    });
  } catch (error) {
    console.error("Failed to process contact brief submission.", error);
    return Response.json(
      {
        ok: false,
        message: "Your request could not be sent right now. Please try again shortly.",
      } satisfies ContactBriefActionData,
      { status: 500 }
    );
  }

  return Response.json({
    ok: true,
    message: successMessage,
  } satisfies ContactBriefActionData);
}

export function meta({}: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Contact | RASA Strategy Brief",
    description:
      "Initiate a strategic inquiry with RASA consultants to architect scalable hospitality operations.",
    path: "/contact/strategy-brief",
    image: "/logo.png",
  });
}

export default function ContactStrategyBriefRoute() {
  return (
    <Suspense fallback={<RoutePageLoader label="Loading contact" />}>
      <ContactStrategyBriefPage />
    </Suspense>
  );
}
