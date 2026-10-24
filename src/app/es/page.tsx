import { HomePage, homeMetadata } from "@/components/pages";

export const metadata = homeMetadata("es");

export default function Page() {
  return <HomePage locale="es" />;
}
