"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import testDbConnectionService from "@/services/testDbConnection.service";

type Inputs = {
  message: string;
};

const InputMessage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleAddMessage: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisableButton(true);
      await testDbConnectionService.addMessageToDb(data.message);
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
      onSubmit={handleSubmit(handleAddMessage)}
      className="my-8 flex flex-col items-start border bg-gray-100 p-2"
    >
      <p className="text-sm">{`Enter any message and click the "Add Message" button. This message will get saved in your DyanmoDB table.`}</p>
      <p className="text-sm">
        For the message to get saved in your table, you must complete the steps
        in{" "}
        <Link href="/requirements">
          <span className="text-blue-500">requirements</span>
        </Link>{" "}
        folder.
      </p>
      <input
        type="text"
        placeholder="Your message"
        className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
        {...register("message", { required: true })}
      />
      {errors.message && (
        <span className="text-xs text-red-500">Please enter a message!</span>
      )}

      <button
        type="submit"
        className="my-2 mr-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
        disabled={disableButton}
      >
        Add Message
      </button>
    </form>
  );
};

export default InputMessage;
