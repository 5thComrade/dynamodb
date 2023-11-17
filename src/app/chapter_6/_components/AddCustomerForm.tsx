"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { phoneRegex, emailRegex, zipcodeRegex } from "@/lib/constants";
import customerService from "@/services/customer.service";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipcode: string;
};

const AddCustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleAddCustomer: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisableButton(true);
      await customerService.addCustomerToDb(data);
      reset();
      setDisableButton(false);
    } catch (err) {
      toast.error("Please add your AWS credentials in the env file!");
      reset();
      setDisableButton(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddCustomer)}
      className="my-8 flex flex-col items-start border bg-gray-100 p-2"
    >
      <p className="text-sm">{`Fill in the details and click the "Add Customer" button. The customer will get saved in your DynamoDB table.`}</p>
      <p className="text-sm">
        For the message to get saved in your table, you must complete the steps
        in{" "}
        <Link href="/requirements">
          <span className="text-blue-500">requirements</span>
        </Link>{" "}
        chapter.
      </p>

      {/* First Name */}
      <input
        type="text"
        placeholder="First name"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && (
        <span className="text-xs text-red-500">
          Please enter your first name!
        </span>
      )}

      {/* Last Name */}
      <input
        type="text"
        placeholder="Last name"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && (
        <span className="text-xs text-red-500">
          Please enter your last name!
        </span>
      )}

      {/* Phone */}
      <input
        type="text"
        placeholder="Phone number"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("phone", { required: true, pattern: phoneRegex })}
      />
      {errors.phone && (
        <span className="text-xs text-red-500">
          Please enter a valid phone number that is 10 digits long!
        </span>
      )}

      {/* Email */}
      <input
        type="text"
        placeholder="Email ID"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("email", { required: true, pattern: emailRegex })}
      />
      {errors.email && (
        <span className="text-xs text-red-500">
          Please enter a valid email id!
        </span>
      )}

      {/* Zipcode */}
      <input
        type="text"
        placeholder="Zipcode"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("zipcode", { required: true, pattern: zipcodeRegex })}
      />
      {errors.zipcode && (
        <span className="text-xs text-red-500">
          Please enter a valid zipcode that is 6 digits long!
        </span>
      )}

      <button
        type="submit"
        className="my-2 mr-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
        disabled={disableButton}
      >
        Add Customer
      </button>
    </form>
  );
};

export default AddCustomerForm;
