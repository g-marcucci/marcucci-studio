import { CasePage, caseMetadata } from "@/components/pages";

export const metadata = caseMetadata("en");

export default function Page() {
  return <CasePage locale="en" />;
}
