"use client";

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
import { useRef, useState } from "react";
import CustomeInput from "./_components/CustomeInput";

const page = () => {
  const { toast } = useToast();
  const cookies = useCookies();

  const token = cookies.get("token");

  const [height, setHeight] = useState();
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    fn: "",
    ln: "",
    email: "",
    password: "",
    repassword: "",
  });

  const isLoggedIn = !!token;

  const changeHeight = () => {
    const contentHeight = contentRef.current.scrollHeight + "px";
    setHeight(contentHeight);
  };

  function handleChange(e) {
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

  function validateForm() {
    const errors = {};

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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignup(formData) {
    if (!validateForm()) return;

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

  async function handleLogin(formData) {
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      {isLoggedIn ? (
        <>
          <p className="mb-4 text-lg">You are logged in.</p>
          <Button id="logoutButton" onClick={handleLogout} className="mb-4">
            Logout
          </Button>
        </>
      ) : (
        <Tabs
          defaultValue="signup"
          className="w-[35%] h-[55%] md:w-[50%] sm:w-[90%]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup" onClick={changeHeight}>
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" onClick={changeHeight}>
              Log In
            </TabsTrigger>
          </TabsList>

          <div
            className="mt-2 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out overflow-hidden border-gray-300"
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
                      onClick={() => handleSignup(formData)}
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
                      r
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      id="loginButton"
                      onClick={() => handleLogin(formData)}
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
      )}
    </div>
  );
};

export default page;
