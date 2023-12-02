"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import customerService from "@/services/customer.service";
import CustomTable from "@/components/custom/CustomTable";
import CodeBlock from "@/components/custom/CodeBlock";

type Customer = {
  firstName: string;
  lastName: string;
  phone: string;
};

const tableHeaders = ["pk", "sk", "firstName", "lastName", "phone"];

const GetCustomersUsingProjection = () => {
  const [customers, setCustomers] = useState<Customer[] | []>([]);

  const getAllCustomers = async () => {
    try {
      const customers = await customerService.getAllCustomersFromDb();
      setCustomers(customers.items);
    } catch (err) {
      toast.error("Please add your AWS credentials in the env file!");
    }
  };

  return (
    <div>
      <CodeBlock>
        <>
          {`
          import { QueryCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new QueryCommand({
            TableName: dbName,
            KeyConditionExpression: "#pk_key = :pk_value",
            ProjectionExpression:
                "#pk_key, #sk_key, #firstName_key, #lastName_key, #phone_key",
            ExpressionAttributeNames: {
                "#pk_key": "pk",
                "#sk_key": "sk",
                "#firstName_key": "firstName",
                "#lastName_key": "lastName",
                "#phone_key": "phone",
            },
            ExpressionAttributeValues: {
                ":pk_value": "CUSTOMERS",
            },
            });

            const dbResponse = await ddbDocClient.send(dbCommand);
        `}
        </>
      </CodeBlock>
      <button
        onClick={getAllCustomers}
        className="my-4 rounded bg-black px-4 py-2 text-white"
      >
        Get All Customers
      </button>

      <CustomTable headers={tableHeaders} tableData={customers} />
    </div>
  );
};

export default GetCustomersUsingProjection;
