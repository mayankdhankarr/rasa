import { Suspense, lazy } from "react";
import type { Route } from "./+types/services";

import { RoutePageLoader } from "@/components/common/route-page-loader";
import { buildSeoMeta } from "@/lib/seo";

const ContactStrategyBriefPage = lazy(() =>
  import("@/pages/contact-strategy-brief").then((module) => ({
    default: module.ContactStrategyBriefPage,
  }))
);

export function meta({}: Route.MetaArgs) {
  return buildSeoMeta({
    title: "Services | RASA Strategy Brief",
    description:
      "Explore RASA consulting services and start your strategic inquiry to scale hospitality operations.",
    path: "/services",
    image: "/logo.png",
  });
}

export default function ServicesRoute() {
  return (
    <Suspense fallback={<RoutePageLoader label="Loading services" />}>
      <ContactStrategyBriefPage />
    </Suspense>
  );
}
