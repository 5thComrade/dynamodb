# Project Setup

## DynamoDB

- Create a dynamodb table and name the table "learn-dynamodb"
- Set the Partition key as "pk" and set the Sort key as "sk"
- Leave the default settings as is and go ahead with the table creation.

## IAM

- Create a new IAM Policy
- Select DynamoDB as the service
- Under Actions allowed select "All DynamoDB actions"
- Under Resources choose specific and add the table ARN. You will get the table ARN(Amazon Resource Name) from the table overview of the recently created table.
- Click next and add the policy name as "learn-dynamodb-policy"
- Then create the policy
- Now lets create a new IAM User
- Enter the user name as "learn-dynamodb-user"
- DO NOT SELECT "Provide user access to the AWS Management Console - optional"
- In the Set Permissions page, choose Attach policies directly and choose "learn-dynamodb-policy" (the policy we just created)
- In the next page, review the details and create the user.
- Now lets create the users access key
- Select the user and click on "Create access key"
- Select "Third-party service" from the use-cases options
- Keep the access key and secret key safely and add this to this application .env.local file
