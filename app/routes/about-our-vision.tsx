import { Suspense, lazy } from "react";

import { RoutePageLoader } from "@/components/common/route-page-loader";
import { buildSeoMeta } from "@/lib/seo";

const AboutOurVisionPage = lazy(() =>
  import("@/pages/about-our-vision").then((module) => ({
    default: module.AboutOurVisionPage,
  }))
);

export function meta() {
  return buildSeoMeta({
    title: "About | RASA Our Vision",
    description:
      "RASA's narrative and vision for standardizing excellence across global hospitality ecosystems.",
    path: "/about/our-vision",
    image: "/roof.png",
  });
}

export default function AboutOurVisionRoute() {
  return (
    <Suspense fallback={<RoutePageLoader label="Loading vision" />}>
      <AboutOurVisionPage />
    </Suspense>
  );
}
