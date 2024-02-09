"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import customerService from "@/services/customer.service";
import Link from "next/link";
import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";

type Customer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipcode: string;
};

export default function Chapter_9_1() {
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
    <main>
      <PageTitle>
        9.1: Separate application attributes from your indexing attributes
      </PageTitle>
      <Paragraph>
        In Chapter 3, we first discussed the concept of overloading the primary
        key and secondary indexes in your DynamoDB table. To overload your
        primary key, you use generic names like PK and SK for your primary key
        attributes. The values for these generic attributes are specifically
        designed to create the proper item collections and ordering to handle
        your queries.
      </Paragraph>

      <Paragraph>{`If you click the "Get All Customers" button, you'll see the stringified data from your DynamoDb table. Notice that each object has multiple properties including "pk" and "sk".`}</Paragraph>

      <p className="mt-8">
        You can add new customers{" "}
        <Link href="/chapter_6" className="text-blue-500">
          here
        </Link>
      </p>
      <button
        onClick={getAllCustomers}
        className="my-4 rounded bg-black px-4 py-2 text-white"
      >
        Get All Customers
      </button>

      <CodeBlock>
        <div className="h-28">{JSON.stringify(customers)}</div>
      </CodeBlock>

      <Paragraph>{`"pk" and "sk" are related to the DynamoDb data model but have no meaning in the application business logic. These as 'indexing attributes', as they’re only there for indexing your data in DynamoDB.`}</Paragraph>

      <Paragraph>
        I advise you to keep a separation between these two kinds of attributes.
        Your application attributes will often inform parts of your indexing
        attributes. Here, the phone attribute is used to fill in sk template.
      </Paragraph>

      <Paragraph>
        Don’t remove the phone attribute from your item since it’s already
        encoded into your SK. It adds complexity and risks data loss if you
        change your data model and indexing attributes in the future. It will
        result in slightly larger item sizes due to duplicated data, but I think
        it’s worth it.
      </Paragraph>
      <Footer previous="/chapter_9" next="/chapter_9/9.2" />
    </main>
  );
}
