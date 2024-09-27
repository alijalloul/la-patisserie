import Nav from "./_components/Nav";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />

      <div className=" mx-10 lg:mx-20 flex-grow">{children}</div>
      <Toaster />
    </>
  );
}
