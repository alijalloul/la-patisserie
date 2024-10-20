"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import { cn } from "../../../lib/utils";
import CartSlide from "./CartSlide";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="relative z-10  w-full py-5 flex justify-center items-center hover:bg-gray-50 transition-all ease-in-out duration-700">
      <div className="w-[90%] flex justify-between items-center  ">
        <Link href="/">La Patisserie</Link>
        {isMobile ? (
          <MobileNav>
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/products">Products</MobileNavLink>
            <MobileNavLink href="/contact">Contact Us</MobileNavLink>
            <MobileNavLink href="/auth">Sign Up</MobileNavLink>
          </MobileNav>
        ) : (
          <NormalNav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </NormalNav>
        )}
      </div>
    </header>
  );
};
export default Nav;

export const NormalNav = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <nav className="text-center flex justify-center px-4">{children}</nav>

      <div className="flex justify-center items-center space-x-5">
        <CartSlide />

        <Button variant="outline" asChild>
          <Link href="/auth">Sign Up</Link>
        </Button>
      </div>
    </>
  );
};

export const NavLink = (
  props: Omit<ComponentProps<typeof Link>, "className">
) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-4",
        pathname === props.href && "border-b-2 border-black"
      )}
    />
  );
};

export const MobileNavLink = (
  props: Omit<ComponentProps<typeof Link>, "className">
) => {
  const pathname = usePathname();

  return (
    <SheetClose
      asChild
      className={cn(
        "p-4",
        pathname === props.href && "border-b-2 border-black"
      )}
    >
      <Link {...props} />
    </SheetClose>
  );
};

export const MobileNav = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex space-x-3">
        <CartSlide />

        <Sheet>
          <SheetTrigger className="group -m-2 flex items-center p-2">
            <AlignRight className="w-6 aspect-square flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </SheetTrigger>

          <SheetContent className="flex justify-center items-center sm:w-full ">
            <nav className="text-center flex flex-col justify-center px-4">
              {children}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
