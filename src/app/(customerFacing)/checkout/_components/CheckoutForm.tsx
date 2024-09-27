// CartSlide.tsx
"use client";
import { CarouselNext } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Map from "../../_components/Map";
import { useState } from "react";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    rePhoneNumber: "",
    email: "",
    address: "",
  });
  const [isFormDataPopulated, setIsFormDataPopulated] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsFormDataPopulated(Object.keys(formData).length > 0);
  }

  function handleClick() {
    return true;
  }

  return (
    <div className="h-[80vh] w-full bg-slate-100 rounded-lg">
      <form className="w-full h-full flex justify-between p-10">
        <div className="flex flex-col w-[45%]">
          <h2 className="text-2xl font-bold mb-5">Client Info</h2>

          <div className="space-y-4 flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-[45%]"
                required
                value={formData.firstName || ""}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="w-[45%]"
                required
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>

            <Input
              type="text"
              placeholder="Phone number"
              name="phoneNumber"
              required
              value={formData.phoneNumber || ""}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Re-Type Phone number"
              name="rePhoneNumber"
              required
              value={formData.rePhoneNumber || ""}
              onChange={handleChange}
            />

            <Input
              type="email"
              placeholder="E-Mail"
              name="email"
              required
              value={formData.email || ""}
              onChange={handleChange}
            />

            <Input
              type="text"
              placeholder="Address, ex: District, City, Street, Apartment"
              name="address"
              required
              value={formData.address || ""}
              onChange={handleChange}
            />

            <div className="bg-slate-200 rounded-lg flex justify-center items-center flex-grow py-5">
              <ul className="list-inside list-disc space-y-4 h-full">
                <li>
                  By making an account, you can have your information
                  auto-inputed
                </li>

                <li>Delivery time ranges from 2 to 3 hours</li>

                <li>
                  DELIVERY IS ONLY AVAILABLE IN BEIRUT AND SURROUNDING AREAS
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-[45%] flex flex-col justify-between items-center">
          <div className="w-full h-[90%]">
            <Map />
          </div>

          <CarouselNext
            size="default"
            text="Continue"
            className="text-center w-full p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 hover:text-white"
            isDisabled={!isFormDataPopulated}
            handleClick={() => handleClick()}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
