import { redirect } from "react-router";

export async function loader() {
  return redirect("/case-studies/proven-scale");
}

export default function CertificationRoute() {
  return null;
}
