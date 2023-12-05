import CodeBlock from "@/components/custom/CodeBlock";
import Footer from "@/components/custom/Footer";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import UpdateCustomerForm from "../_components/UpdateCustomerForm";

export default function chapter_6_5() {
  return (
    <main>
      <PageTitle>6.5: Update Expressions</PageTitle>
      <Paragraph>
        The final type of expression is the update expression. Like a condition
        expression, it is for a write-based action.
      </Paragraph>
      <Paragraph>
        Note that when using the UpdateItem API, you will only alter the
        properties you specify. If the item already exists in the table, the
        attributes that you don’t specify will remain the same as before the
        update operation. If you don’t want this behavior, you should use the
        PutItem API, which will completely overwrite the item with only the
        properties you give it.
      </Paragraph>

      <Paragraph className="mt-3">
        In an update expression, you need to state the changes you want to make.
        There are four verbs for stating these changes:
      </Paragraph>

      <Paragraph className="mt-2">
        1: <span className="font-semibold">SET: </span>Used for adding or
        overwriting an attribute on an item. Can also be used to add or subtract
        from a number attribute
      </Paragraph>
      <Paragraph>
        2: <span className="font-semibold">REMOVE: </span>Used for deleting an
        attribute from an item or deleting nested properties from a list or map
      </Paragraph>
      <Paragraph>
        3: <span className="font-semibold">ADD: </span>Used for adding to a
        number attribute or inserting an element into a set attribute
      </Paragraph>
      <Paragraph>
        4: <span className="font-semibold">DELETE: </span>Used for removing an
        element from a set attribute
      </Paragraph>

      <Paragraph className="mt-4">
        You may use any combination of these four verbs in a single update
        statement, and you may use multiple operations for a single verb.
      </Paragraph>

      <Paragraph>
        If you have multiple operations for a single verb, you only state the
        verb once and use commas to separate the clauses, as shown below:
      </Paragraph>

      <CodeBlock>
        {`UpdateExpression="SET Name = :name, UpdatedAt = :updatedAt"`}
      </CodeBlock>

      <Paragraph>
        If you want to include multiple verbs in the same update expression, you
        don’t need anything to separate the verb clauses. The presence of
        reserved verb words will be enough. For example:
      </Paragraph>

      <CodeBlock>
        {`UpdateExpression="SET Name = :name, UpdatedAt = :updatedAt REMOVE InProgress"`}
      </CodeBlock>

      <Paragraph>Lets go over some examples</Paragraph>

      <SectionTitle>
        Example 1: Updating or setting an attribute on an item
      </SectionTitle>

      <Paragraph>
        The most common example of update expression is to set the value of an
        attribute. This may mean overwriting an existing attribute or setting a
        brand new attribute. Let us go back to our example and try updating the
        email id of a customer. Enter the phone number of the customer(which is
        a unique id for the customer) and then enter the updated email id of
        this customer.
      </Paragraph>

      <UpdateCustomerForm />

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          // dynamically generating an update expression based on the request body

          const updateExpression = Object.entries(
                parseResult.output.customer.updates
              ).reduce(
                        (prevValue, [key, value]) => {
                          if (value) {
                            return {
                              UpdateExpression:
                                prevValue.UpdateExpression + " #{key} = :{key},",
                              ExpressionAttributeNames: {
                                ...prevValue.ExpressionAttributeNames,
                                ["#{key}"]: key,
                              },
                              ExpressionAttributeValues: {
                                ...prevValue.ExpressionAttributeValues,
                                [":{key}"]: value,
                              },
                            };
                          } else {
                            return prevValue;
                          }
                        },
                        {
                          UpdateExpression: "SET",
                          ExpressionAttributeNames: {
                            "#sk_key": "sk",
                          },
                          ExpressionAttributeValues: {},
                        }
                      );

          updateExpression.UpdateExpression =
            updateExpression.UpdateExpression.slice(0, -1);

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  pk: "CUSTOMERS",
                  sk: "CUSTOMER#{parseResult.output.customer.phone}",
              },
              ConditionExpression: "attribute_exists(#sk_key)", // update only when a customer with the phone number exists
              ...updateExpression,
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <SectionTitle>Example 2: Deleting an attribute from an item</SectionTitle>

      <Paragraph>
        The opposite of setting an item is useful too—sometimes you want to
        delete an attribute for an item.
      </Paragraph>

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  pk: "CUSTOMERS",
                  sk: "CUSTOMER#{parseResult.output.customer.phone}",
              },
              ConditionExpression: "attribute_exists(#sk_key)", // perform operation only when a customer with the phone number exists
              UpdateExpression="REMOVE #picture",
              ExpressionAttributeNames={
                "#picture": "ProfilePictureUrl"
              }
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <Paragraph>
        In the example above, if the user deletes the picture from their user
        profile, we want to delete it from their item.
      </Paragraph>
      <Paragraph>
        Another reason to remove attributes is more DynamoDB-specific. Imagine
        you’re using a global secondary index with a sparse pattern where only
        items with a given attribute are in the sparse index. If you no longer
        want your item to appear in that index, you could delete the attribute
        from the item.
      </Paragraph>

      <SectionTitle>Example 3: Incrementing a numeric value</SectionTitle>

      <Paragraph>
        You can use update expressions to increment or decrement the existing
        value by a given number, as shown below:
      </Paragraph>

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  "Page": "ContactUsPage"
              },
              UpdateExpression="SET #views = #views + :inc",
              ExpressionAttributeNames={
                  "#views": "PageViews"
              },
              ExpressionAttributeValues={
                ":inc": 1
              }
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <Paragraph>
        In this example, we are recording a page view on the ContactUsPage item.
        Note that we’re setting the new value equal to the existing value plus
        1.
      </Paragraph>

      <SectionTitle>Example 4: Adding a nested property</SectionTitle>
      <Paragraph>
        The document attribute types—lists and maps—are powerful for expressing
        complex objects in your items. DynamoDB also allows you to act directly
        on nested properties within these document types.
      </Paragraph>

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  "Customer": "SomeCustomer"
              },
              UpdateExpression="SET #phone.#mobile :cell",
              ExpressionAttributeNames={
                  "#phone": "PhoneNumbers",
                  "#mobile": "MobileNumber"
              },
              ExpressionAttributeValues={
                ":cell": "+1-555-555-5555"
              }
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <Paragraph>
        Imagine we had a map property of PhoneNumbers on our user profile items.
        The PhoneNumbers property stores a flexible number of named phone
        numbers—Home, Business, Mobile, etc. A user may have all or none of
        these numbers set on their profile.
      </Paragraph>
      <Paragraph>
        Using the SET verb, you can operate directly on a nested property in
        your map attribute. In our example, we’re setting the
        PhoneNumber.MobileNumber property in our update.
      </Paragraph>

      <SectionTitle>Example 5: Adding and removing from a set</SectionTitle>

      <Paragraph>
        Lets see how we can add and remove administrators from that set
        attribute.
      </Paragraph>

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  "pk": "Admins#<orgId>"
              },
              UpdateExpression="ADD #a :user",
              ExpressionAttributeNames={
                  "#a": "Admins",
              },
              ExpressionAttributeValues={
                ":user": ["John Cruz"]
              }
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <Paragraph>
        The nice thing about using sets is that this is an idempotent
        operation—you could run it five times in a row, and it will end with the
        same result. If the given string already exists in the set, DynamoDB
        won’t throw an error.
      </Paragraph>

      <Paragraph>
        Similarly, you could remove elements from the set with the REMOVE verb:
      </Paragraph>

      <CodeBlock>
        {`
          import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new UpdateCommand({
              TableName: dbName,
              Key: {
                  "pk": "Admins#<orgId>"
              },
              UpdateExpression="REMOVE #a :user",
              ExpressionAttributeNames={
                  "#a": "Admins",
              },
              ExpressionAttributeValues={
                ":user": ["John Cruz"]
              }
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
      </CodeBlock>

      <Paragraph>
        Note that you can add and remove multiple elements to a set in a single
        request. Simply update your expression attribute value to contain
        multiple items.
      </Paragraph>
      <Footer previous="/chapter_6/6.4" next="/chapter_7" />
    </main>
  );
}
