"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import CustomeInput from "./_components/CustomeInput";

// Define form data and errors types
interface FormData {
  fn: string;
  ln: string;
  email: string;
  password: string;
  repassword: string;
}

interface FormErrors {
  fn: string;
  ln: string;
  email: string;
  password: string;
  repassword: string;
}

const Page = () => {
  const { toast } = useToast();
  const cookies = useCookies();
  const { data: session } = useSession();

  const token = cookies.get("token");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormData>({
    fn: "",
    ln: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    fn: "",
    ln: "",
    email: "",
    password: "",
    repassword: "",
  });

  const isLoggedIn = !!token;

  const changeHeight = () => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight + "px";
      setHeight(contentHeight);
    }
  };

  useEffect(() => {
    changeHeight();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  }

  function clearFormData() {
    setFormData({ fn: "", ln: "", email: "", password: "", repassword: "" });
    setFormErrors({ fn: "", ln: "", email: "", password: "", repassword: "" });
  }

  function validateSignUpForm() {
    const errors: Partial<FormErrors> = {};

    if (!formData.fn) {
      errors.fn = "First name is required";
    }
    if (!formData.ln) {
      errors.ln = "Last name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.repassword) {
      errors.repassword = "Re-password is required";
    } else if (formData.password !== formData.repassword) {
      errors.repassword = "Passwords do not match";
    }

    setFormErrors(errors as FormErrors);
    return Object.keys(errors).length === 0;
  }

  function validateLogInForm() {
    const errors: Partial<FormErrors> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors as FormErrors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignup() {
    if (!validateSignUpForm()) {
      setInterval(() => {
        changeHeight();
      }, 100);

      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          dataId: "signupsuccess",
          className: "bg-green-500 text-white",
          title: "Sign Up successful!",
        });

        clearFormData();
      } else {
        const data = await response.json();
        toast({
          dataId: "signuperror",
          variant: "destructive",
          title: data.error,
        });
      }
    } catch (error) {
      toast({
        dataId: "signupfailed",
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  async function handleLogin() {
    if (!validateLogInForm()) {
      setInterval(() => {
        changeHeight();
      }, 100);

      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          dataId: "loginsuccess",
          className: "bg-green-500 text-white",
          title: "Log In successful!",
        });

        clearFormData();
      } else {
        const data = await response.json();
        toast({
          dataId: "loginerror",
          variant: "destructive",
          title: data.error,
        });
      }
    } catch (error) {
      toast({
        dataId: "loginfailed",
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  function handleLogout() {
    cookies.remove("token");
    signOut();

    toast({
      dataId: "logoutsuccess",
      className: "bg-green-500 text-white",
      title: "Logged out successfully!",
    });

    setInterval(() => {
      changeHeight();
    }, 100);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      {isLoggedIn || session ? (
        <>
          <p className="mb-4 text-lg">You are logged in.</p>
          <Button id="logoutButton" onClick={handleLogout} className="mb-4">
            Logout
          </Button>
        </>
      ) : (
        <div className="w-[35%] sm:w-full">
          <Tabs defaultValue="signup" className="w-full ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup" onClick={changeHeight}>
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="login" onClick={changeHeight}>
                Log In
              </TabsTrigger>
            </TabsList>

            <div
              className="mt-2 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out overflow-hidden border-gray-300 h-0"
              style={{ height }}
            >
              <div ref={contentRef}>
                <TabsContent value="signup">
                  <Card className="border-none">
                    <CardHeader>
                      <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center w-full">
                        <CustomeInput
                          htmlFor="fn"
                          text="First Name"
                          isPassword={false}
                          id="fn"
                          placeholder="Joe"
                          onChange={handleChange}
                          value={formData.fn}
                          error={formErrors.fn}
                          className="w-[45%]"
                        />

                        <CustomeInput
                          htmlFor="ln"
                          text="Last Name"
                          isPassword={false}
                          id="ln"
                          placeholder="Doe"
                          onChange={handleChange}
                          value={formData.ln}
                          error={formErrors.ln}
                          className="w-[45%]"
                        />
                      </div>

                      <CustomeInput
                        htmlFor="email"
                        text="E-Mail"
                        isPassword={false}
                        id="email"
                        placeholder="la.patisserie@gmail.com"
                        onChange={handleChange}
                        value={formData.email}
                        error={formErrors.email}
                      />

                      <CustomeInput
                        htmlFor="password"
                        text="Password"
                        isPassword={true}
                        id="password"
                        placeholder="12345"
                        onChange={handleChange}
                        value={formData.password}
                        error={formErrors.password}
                      />

                      <CustomeInput
                        htmlFor="repassword"
                        text="Re-Password"
                        isPassword={true}
                        id="repassword"
                        placeholder="12345"
                        onChange={handleChange}
                        value={formData.repassword}
                        error={formErrors.repassword}
                      />
                    </CardContent>

                    <CardFooter>
                      <Button
                        id="signupButton"
                        onClick={handleSignup}
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="login">
                  <Card className="border-none">
                    <CardHeader>
                      <CardTitle>Log In</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <CustomeInput
                        htmlFor="email"
                        text="E-Mail"
                        isPassword={false}
                        id="email"
                        placeholder="la.patisserie@gmail.com"
                        onChange={handleChange}
                        value={formData.email}
                        error={formErrors.email}
                      />

                      <CustomeInput
                        htmlFor="password"
                        text="Password"
                        isPassword={true}
                        id="password"
                        placeholder="12345"
                        onChange={handleChange}
                        value={formData.password}
                        error={formErrors.password}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button
                        id="loginButton"
                        onClick={handleLogin}
                        type="submit"
                      >
                        Log In
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
          <div className="relative w-full flex justify-center items-center">
            <div className="absolute top-1/2 w-full border "></div>
            <span className="bg-white relative z-10 px-2">or</span>
          </div>
          <div className="w-full ">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-gray-400 rounded-lg focus:shadow-outline hover:bg-slate-200"
            >
              <Image
                src="/images/google.png"
                alt="Google Logo"
                width={20}
                height={20}
              />
              <span className="ml-4">Continue with Google</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
