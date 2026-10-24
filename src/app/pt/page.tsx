import { HomePage, homeMetadata } from "@/components/pages";

export const metadata = homeMetadata("pt");

export default function Page() {
  return <HomePage locale="pt" />;
}
