import Link from "next/link";
import Footer from "@/components/custom/Footer";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import CodeBlock from "@/components/custom/CodeBlock";

export default function chapter_6_4() {
  return (
    <main>
      <PageTitle>6.4: Condition Expressions</PageTitle>
      <Paragraph>
        Condition expressions are available on every operation where you will
        alter an item—PutItem, UpdateItem, DeletetItem, and their batch and
        transactional equivalents.
      </Paragraph>
      <Paragraph>
        They allow you to assert specific statements about the status of the
        item before performing the write operation. If the condition expression
        evaluates to false, the operation will be canceled.
      </Paragraph>
      <Paragraph>
        There are a number of reasons you may want to add condition expressions
        to your write operations, such as:
      </Paragraph>
      <Paragraph>
        1: To avoid overwriting an existing item when using PutItem
      </Paragraph>
      <Paragraph>
        2: To prevent an UpdateItem operation from putting an item in a bad
        state, such as reducing an account balance below 0
      </Paragraph>
      <Paragraph>
        3: To assert that a given user is the owner of an item when calling
        DeleteItem
      </Paragraph>

      <Paragraph className="mt-4">{`The comparison operators include =, <>, <, <=, >, >=`}</Paragraph>
      <Paragraph>There are several functions available too</Paragraph>
      <Paragraph>
        1: <span className="font-semibold">attribute_exists():</span> Used to
        assert that a given attribute exists
      </Paragraph>
      <Paragraph>
        2: <span className="font-semibold">attribute_not_exists()</span>: Just
        the opposite—assert that an attribute does not exist on the item. This
        one is commonly used to prevent overwrites by using it on the partition
        key of the item you’re writing.
      </Paragraph>
      <Paragraph>
        3: <span className="font-semibold">attribute_type()</span>: Used to
        assert that an attribute is of a particular type
      </Paragraph>
      <Paragraph>
        4: <span className="font-semibold">begins_with()</span>: Assert that an
        attribute value begins with a particular substring
      </Paragraph>
      <Paragraph>
        5: <span className="font-semibold">contains()</span>: Assert that a
        string contains a particular substring, or that a set contains a
        particular value.
      </Paragraph>
      <Paragraph>
        6: <span className="font-semibold">size()</span>: Allows you to assert
        various properties about the size of an attribute value. For things like
        strings or binary values, it’s the length of the string or number of
        bytes in the binary value. For things like lists, maps, or sets, it
        returns the number of elements in a set.
      </Paragraph>

      <Paragraph className="mt-4">
        Condition expressions can operate on any attribute on your item, not
        just those in the primary key. This is because condition expressions are
        used with item-based actions where the item in question has already been
        identified.
      </Paragraph>

      <SectionTitle>
        Example 1: Preventing overwrites or checking for uniqueness
      </SectionTitle>

      <Paragraph>
        The PutItem API action will insert an item into your table and
        completely overwrite any existing item with the same primary key. This
        is often undesirable, as you don’t want to blow away existing data.
      </Paragraph>
      <Paragraph>
        Lets take our Customers example, try adding a new customer but with a
        phone number of an existing customer{" "}
        <Link href="/chapter_6">
          <span className="text-blue-500">here</span>
        </Link>
        .
      </Paragraph>
      <Paragraph>
        The system will not allow you to add a new customer, this is because we
        have added a Condition Expression which checks for the uniqueness in
        phone numbers.
      </Paragraph>

      <CodeBlock>
        <>{`
        import { PutCommand } from "@aws-sdk/lib-dynamodb";
        import ddbDocClient from "@/lib/clients/dynamoDBClient";
        import { dbName } from "@/lib/constants";

        const dbCommand = new PutCommand({
          TableName: dbName,
          Item: {
            pk: "CUSTOMERS",
            sk: "CUSTOMER#{parseResult.output.customer.phone}"",
            firstName: parseResult.output.customer.firstName,
            lastName: parseResult.output.customer.lastName,
            phone: parseResult.output.customer.phone,
            email: parseResult.output.customer.email,
            zipcode: parseResult.output.customer.zipcode,
          },
          ConditionExpression: "attribute_not_exists(#phone_key)",
          ExpressionAttributeNames: {
            "#phone_key": "phone"
          }
        });

        const dbResponse = await ddbDocClient.send(dbCommand);
        `}</>
      </CodeBlock>

      <SectionTitle>Example 2: Limiting in-progress items</SectionTitle>

      <Paragraph>
        Lets say we have a set named InProgress in our db. This set simply holds
        the ids of the jobs that are currently executing. We have an update_item
        command which simply adds a new job id into the InProgress set. But its
        advisable to add a condition expression which checks the number of items
        in the set. If there are less than 10 items we can add the new job id
        into the set.
      </Paragraph>

      <CodeBlock>
        <>{`
        import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
        import ddbDocClient from "@/lib/clients/dynamoDBClient";
        import { dbName } from "@/lib/constants";

        const dbCommand = new UpdateCommand({
          TableName: dbName,
          Key: {
            "pk": "WorkQueue"
          },
          ConditionExpression: "size(#inprogress) <= 10",
          UpdateExpression: "Add #inprogress :id",
          ExpressionAttributeNames: {
            "#inprogress": "InProgress"
          },
          ExpressionAttributeValues: {
            ":id": <jobId>
          }
        });

        const dbResponse = await ddbDocClient.send(dbCommand);
        `}</>
      </CodeBlock>

      <SectionTitle>
        Example 3: Asserting user permissions on an item
      </SectionTitle>

      <Paragraph>
        Imagine you have a table that contains billing details for your SaaS
        subscription. Each organization has an item in the table that describes
        the current subscription plan they’re on (SubscriptionType), as well as
        a set of usernames that have the authority to change the subscription
        plan or the payment details (Admins). Before changing the billing
        details, you need to confirm that the user making the request is an
        admin.
      </Paragraph>

      <CodeBlock>
        <>{`
        import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
        import ddbDocClient from "@/lib/clients/dynamoDBClient";
        import { dbName } from "@/lib/constants";

        const dbCommand = new UpdateCommand({
          TableName: dbName,
          Key: {
            "pk": "Amazon"
          },
          ConditionExpression: "contains(#a, :user)",
          UpdateExpression: "Set #st :type",
          ExpressionAttributeNames: {
            "#a": "Admins",
            "#st": "SubscriptionType"
          },
          ExpressionAttributeValues: {
            ":user": "Jeff Bezos",
            ":type": "Pro"
          }
        });

        const dbResponse = await ddbDocClient.send(dbCommand);
        `}</>
      </CodeBlock>

      <SectionTitle>Example 4: Checks across multiple items</SectionTitle>

      <Paragraph>
        A final pattern where you may use condition expressions involves
        checking across multiple entities. This could be an extension of the
        previous example where you need to check if a user is an admin. However,
        there may be some items that are only editable by administrators. Rather
        than storing the permission information in each item, you may store the
        list of administrators in a separate item that may be checked in needed
        requests.
      </Paragraph>
      <Paragraph>
        DynamoDB transactions can help us here. The TransactWriteItem API allows
        you to use up to 100 items in a single request. They can be a
        combination of different write operations—PutItem, UpdateItem, or
        DeleteItem—or they can be ConditionChecks, which simply assert a
        condition about a particular item.
      </Paragraph>

      <CodeBlock>
        <>{`
        import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
        import ddbDocClient from "@/lib/clients/dynamoDBClient";
        import { dbName } from "@/lib/constants";

        const dbNewCommand = new TransactWriteCommand({
            TransactItems: [
              {
                ConditionCheck: {
                  Key: {
                    pk: "Admins#<orgId>"
                  },
                  TableName: "SaasApp",
                  ConditionExpression: "contains(#a, :user)",
                  ExpressionAttributeNames={
                    "#a": "Admins"
                  },
                  ExpressionAttributeValues={
                    ":user": "<username>"
                  }
                }
              },
              {
                Delete: {
                  Key: {
                    pk: "Billing#<orgId>"
                  },
                  TableName: "SaasApp"
                }
              }
            ]
        })

        const dbResponse = await ddbDocClient.send(dbCommand);
        `}</>
      </CodeBlock>

      <Paragraph>
        We have two operations in our TransactWriteItems request. First, there
        is a ConditionCheck on our Admins item for this organization to assert
        that the requesting user is an admin in this account.
      </Paragraph>
      <Paragraph>
        Second, there is a Delete operation to remove the billing record for
        this organization. These operations will succeed or fail together. If
        the condition check fails because the user is not an administrator, the
        billing record will not be deleted.
      </Paragraph>
      <Footer previous="/chapter_6/6.3" next="/chapter_6/6.5" />
    </main>
  );
}
