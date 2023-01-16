## How the Endpoints work
- [x] `(POST) /v1/readable-codes`

This is a single endpoint that can process the Readable Code creation.

Take a look at the Postman collection to see the available parameters and response examples.

- `originalTransactionId` - The transaction ID itself.
  - It will be related to the code that will be created.
  - Is required.

<br>

- [x] `(GET) /v1/readable-codes`

Listing endpoint that accepts the same parameter that the creating endpoint, with the same rules.

🚩 Each returned record points the Transaction ID that is related to the code.

#### Database

Table migrations may are not easy to understand. But this project use it to create the table `transaction-readable-codes`.

Also, there is the factory and the seeder for the Readable Code entity, but it isn't used yet.

Path to migration files:

- `/src/database/migrations`

## Business rules

#### Readable Codes
- [x] A request is not allowed to create an orfan readable code. So it is required to point a Original Transaction ID.
- [x] It isn't possible to override, or create duplicated readable codes due the validations made during the request. Also, it is protected by the database table structure.
- [x] The generated code should have a length of 7 alphanumeric characters. So the system have a universe of +300 million of codes to be generated, when this achieve the limit the system will log a error but will continue to generating codes with 8 length. In this case, you should update the environment variable to prevent unnecessary recursive calls at the command layer.
