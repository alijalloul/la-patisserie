import { Toaster } from "@/components/ui/toaster";
import Nav from "./_components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex justify-center flex-1 my-5">
        <div className=" w-[90%] ">{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
