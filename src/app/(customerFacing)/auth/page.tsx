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
import { useState } from "react";
import CustomeInput from "./_components/CustomeInput"; // Adjust the import path according to your file structure

const Authentication = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleSignup({
    email,
    password,
    repassword,
  }: {
    email: string;
    password: string;
    repassword: string;
  }) {
    if (password !== repassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Signup successful. Please check your email for verification.");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed.");
    }
  }

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Login successful.");
      } else {
        alert("Invalid credentials or email not verified.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed.");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CustomeInput
                htmlFor="email"
                text="E-Mail"
                isPassword={false}
                id="email"
                placeholder="la.patisserie@gmail.com"
                onChange={handleChange}
              />

              <CustomeInput
                htmlFor="password"
                text="Password"
                isPassword={true}
                id="password"
                placeholder="12345"
                onChange={handleChange}
              />

              <CustomeInput
                htmlFor="repassword"
                text="Re-Password"
                isPassword={true}
                id="repassword"
                placeholder="12345"
                onChange={handleChange}
              />
            </CardContent>

            <CardFooter>
              <Button onClick={() => handleSignup(formData)} type="submit">
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CustomeInput
                htmlFor="email"
                text="E-Mail"
                isPassword={false}
                id="email"
                placeholder="la.patisserie@gmail.com"
                onChange={handleChange}
              />

              <CustomeInput
                htmlFor="password"
                text="Password"
                isPassword={true}
                id="password"
                placeholder="12345"
                onChange={handleChange}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleLogin(formData)} type="submit">
                Log In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
