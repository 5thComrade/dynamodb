"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import customerService from "@/services/customer.service";
import CustomTable from "@/components/custom/CustomTable";
import CodeBlock from "@/components/custom/CodeBlock";
import { Paragraph } from "@/components/custom/Typography";
import { phoneRegex } from "@/lib/constants";
import { type CustomerSchemaType } from "@/lib/schemas";

type Inputs = {
  phone: string;
};

const tableHeaders = [
  "pk",
  "sk",
  "firstName",
  "lastName",
  "phone",
  "email",
  "zipcode",
  "shippingAddresses",
];

const GetCustomerFromPhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [customer, setCustomer] = useState<CustomerSchemaType[] | []>([]);

  const handleSearchCustomer: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisableButton(true);
      const dbResponse = await customerService.getCustomerFromDb(data.phone);
      if (dbResponse.count > 0) {
        setCustomer(dbResponse.items);
      } else {
        toast.error("No customer found!");
      }

      reset();
      setDisableButton(false);
    } catch (err) {
      toast.error("Please add your AWS credentials in the env file!");
      reset();
      setDisableButton(false);
    }
  };

  return (
    <>
      <CodeBlock>
        <>
          {`
          import { QueryCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new QueryCommand({
                TableName: dbName,
                KeyConditionExpression: "#pk_key = :pk_value AND #sk_key = :sk_value",
                ExpressionAttributeNames: {
                    "#pk_key": "pk",
                    "#sk_key": "sk",
                },
                ExpressionAttributeValues: {
                    ":pk_value": "CUSTOMERS",
                    ":sk_value": "CUSTOMER#{parsedPhone.output}",
                },
            });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
        </>
      </CodeBlock>
      <form
        onSubmit={handleSubmit(handleSearchCustomer)}
        className="my-8 flex flex-col items-start border bg-gray-100 p-2"
      >
        <p className="text-sm">{`Enter phone number and click the "Search Customer" button. The customer details will be fetched from your DynamoDB table.`}</p>
        <p className="text-sm">
          You can add a new customer{" "}
          <Link href="/chapter_6">
            <span className="text-blue-500">here</span>
          </Link>
          .
        </p>
        <input
          type="text"
          placeholder="Phone number"
          className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
          {...register("phone", { required: true, pattern: phoneRegex })}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">
            Please enter a valid phone number!
          </span>
        )}

        <button
          type="submit"
          className="my-2 mr-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          disabled={disableButton}
        >
          Search Customer
        </button>
      </form>
      <CustomTable headers={tableHeaders} tableData={customer} />

      <Paragraph className="my-4">
        The sort key condition must use one of the following comparison
        operators:
      </Paragraph>
      <Paragraph>
        {`1: a = b — true if the attribute a is equal to the value b`}
      </Paragraph>
      <Paragraph>{`2: a < b — true if a is less than b`}</Paragraph>
      <Paragraph>{`3: a <= b — true if a is less than or equal to b`}</Paragraph>
      <Paragraph>{`4: a > b — true if a is greater than b`}</Paragraph>
      <Paragraph>{`5: a >= b — true if a is greater than or equal to b`}</Paragraph>
      <Paragraph>{`6: a BETWEEN b AND c — true if a is greater than or equal to b, and less than or equal to c.`}</Paragraph>
      <Paragraph>{`7: begins_with (a, substr)— true if the value of attribute a begins with a particular substring.`}</Paragraph>

      <Paragraph className="mt-4">
        A typical example of using the key condition on the sort key is when
        your sort key is a timestamp. You can use the sort key condition to
        select all items that occurred before, after, or during a specific time
        range.
      </Paragraph>

      <Paragraph className="mt-4">
        While you can use greater than, less than, equal to, or begins_with, one
        little secret is that every condition on the sort key can be expressed
        with the BETWEEN operator. Because of that, I almost always use it in my
        expressions.
      </Paragraph>
    </>
  );
};

export default GetCustomerFromPhone;
