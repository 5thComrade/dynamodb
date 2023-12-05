"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { phoneRegex, emailRegex } from "@/lib/constants";
import customerService from "@/services/customer.service";

type Inputs = {
  phone: string;
  email: string;
};

const UpdateCustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleCustomerUpdate: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisableButton(true);
      await customerService.updateCustomer(data.phone, {
        email: data.email,
      });
      reset();
      setDisableButton(false);
    } catch (err) {
      toast.error(
        "Customer not updated, please check your AWS credentials in the env file!"
      );
      reset();
      setDisableButton(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCustomerUpdate)}
      className="my-8 flex flex-col items-start border bg-gray-100 p-2"
    >
      <p className="text-sm">{`Fill in the details and click the "Update Customer Email" button. The customers email will get updated in your DynamoDB table.`}</p>

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

      <button
        type="submit"
        className="my-2 mr-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
        disabled={disableButton}
      >
        Update Customer Email
      </button>
    </form>
  );
};

export default UpdateCustomerForm;
