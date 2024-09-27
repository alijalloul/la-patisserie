"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sendContactEmail } from "./_actions";

const ContactPage = () => {
  const { toast, dismiss } = useToast();
  var toastId = "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const result = await sendContactEmail(
        formData
      );
      if (result.success) {
        toastId = toast({
          title: "Success",
          description:
            "Your message has been sent successfully!",
        }).id;

        setTimeout(() => {
          dismiss(toastId);
        }, 1000);

        setFormData({
          name: "",
          email: "",
          message: "",
        }); // Reset form fields
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toastId = toast({
        title: "Error",
        description:
          "There was an error sending your message.",
      }).id;

      setTimeout(() => {
        dismiss(toastId);
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-1"
          >
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-1"
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
