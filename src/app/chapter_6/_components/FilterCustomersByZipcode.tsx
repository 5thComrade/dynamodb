"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import customerService from "@/services/customer.service";
import CustomTable from "@/components/custom/CustomTable";
import CodeBlock from "@/components/custom/CodeBlock";
import { Paragraph } from "@/components/custom/Typography";
import { zipcodeRegex } from "@/lib/constants";

type Inputs = {
  zipcode: string;
};

type Customer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipcode: string;
};

const tableHeaders = [
  "pk",
  "sk",
  "firstName",
  "lastName",
  "phone",
  "email",
  "zipcode",
];

const FilterCustomersByZipcode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[] | []>([]);

  const handleSearchCustomers: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisableButton(true);
      const dbResponse = await customerService.getCustomersByZipcode(
        data.zipcode
      );
      if (dbResponse.count > 0) {
        setCustomers(dbResponse.items);
      } else {
        toast.error("No customers found with that zipcode!");
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
            KeyConditionExpression: "#pk_key = :pk_value",
            FilterExpression: "#zip_key = :zip_value",
            ExpressionAttributeNames: {
                "#pk_key": "pk",
                "#zip_key": "zipcode",
            },
            ExpressionAttributeValues: {
                ":pk_value": "CUSTOMERS",
                ":zip_value": "{parsedZipcode.output}",
            },
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
        </>
      </CodeBlock>
      <form
        onSubmit={handleSubmit(handleSearchCustomers)}
        className="my-8 flex flex-col items-start border bg-gray-100 p-2"
      >
        <p className="text-sm">{`Enter the zipcode and click the "Filter customers" button. All the customers with the zipcode will be fetched from your DynamoDB table.`}</p>
        <p className="text-sm">
          You can add a new customer{" "}
          <Link href="/chapter_6">
            <span className="text-blue-500">here</span>
          </Link>
          .
        </p>
        <input
          type="text"
          placeholder="Zipcode"
          className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-black md:w-1/2"
          {...register("zipcode", { required: true, pattern: zipcodeRegex })}
        />
        {errors.zipcode && (
          <span className="text-xs text-red-500">
            Please enter a valid zipcode!
          </span>
        )}

        <button
          type="submit"
          className="my-2 mr-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          disabled={disableButton}
        >
          Filter Customers
        </button>
      </form>

      <CustomTable headers={tableHeaders} tableData={customers} />

      <Paragraph className="my-4">
        {`Filter expressions can use the same comparators, functions, and logical
        operators as a key condition expression. In addition, filter expressions can use the not-equals operator (<>), the OR operator, the CONTAINS operator, the IN operator, the BEGINS_WITH operator, the BETWEEN operator, the EXISTS operator, and the SIZE operator.`}
      </Paragraph>
    </>
  );
};

export default FilterCustomersByZipcode;
