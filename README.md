# Plum Assignment

This server was implemented as a part of hiring challenge given by plum.

## Run the server

Run the following commands in the terminal to start the server.

Install Dependencies

```shell
npm install
```

Start the server

```shell
npm run dev
```

## Initialize the database

This project uses [knex.js](https://knexjs.org) to interact with the database.

Postgres is being used as the default database here.

### Connect to the database

A `.env` is supplied in the main directory

In this set variable `DB_CONNECTION_STRING` to the connection string of a running instance of postgres(You can run one in docker).

That is it. This will connect the backend to the database

### Migrations

This project supports database migrations. So Initial tables can be created using following command

```shell
npm run knex:migrate
```

if database is correctly connected this will create the tables
`organisations` and `employees` in the database

## APIs

If running locally we will have our baseURL as `http://localhost:8080`

### Create Organisations

**Request**

```js
POST {baseURL}/api/organisations

body = {
   name: string; (required)
   description: string; (not required)
   primary_contact_email: string; (required)
}

```

**Response**

```js
{
    "data": {org_id:number}[]
}

```

Example response

```json
{ "data": [{ "org_id": 3 }] }
```

### Upload Employee Details

**Request**

```js

POST {baseURL}/api/organisations/{orgId}/members/upload

body = {
    csv : string (required)
}

```

#### Format of csv string

**Example CSV String**

"Employee ID,First Name,Middle Name,Last Name,Email ID,Date of Birth,Gender\n3,Richard-3,,Hendricks,richard.h@gmail.com,01/09/1998,Male"


Format is - comma separating the columns and /n separating the rows.

*Note-Even though this example shows only one row, more than one row can be passed in the string*


**Response**

Example Success Response

```json
{
    "data": {
        "successfulInserts": [
            {
                "employee_id": 3
            }
        ],
        "failedInserts": []
    }
}
```

Example Failed Response

```json
{
    "data": {
        "successfulInserts": [],
        "failedInserts": [
            {
                "employee_id": 3,
                "reason": "Employee Id Not Unique"
            }
        ]
    }
}
```


### Get Paginated Organisations List

**Request**

```js

GET {baseURL}/api/organisations?page=0&size=10

```

**Response**

Example Response

```json
{
    "data": [
        {
            "org_id": 1,
            "name": "Plum",
            "description": "Healthcare Insurance",
            "primary_contact_email": "admin@plum.com",
            "created_at": "2022-11-08T05:35:38.814Z",
            "updated_at": "2022-11-08T05:35:38.814Z"
        }
    ]
}
```

### Get Paginated Employees List 

**Request**
```js
GET {baseURL}/api/organisations/{orgId}/members?page=0&size=10
```

**Example Response**

```json
{
    "data": [
        {
            "employee_id": 1,
            "org_id": 1,
            "first_name": "Richard",
            "middle_name": "",
            "last_name": "Hendricks",
            "email_id": "richard.h@gmail.com",
            "date_of_birth": "01/09/1998",
            "gender": "Male",
            "created_at": "2022-11-08T08:06:38.097Z",
            "updated_at": "2022-11-08T08:06:38.097Z"
        },
        {
            "employee_id": 2,
            "org_id": 1,
            "first_name": "Richard",
            "middle_name": "",
            "last_name": "Hendricks",
            "email_id": "richard.h@gmail.com",
            "date_of_birth": "01/09/1998",
            "gender": "Male",
            "created_at": "2022-11-08T09:00:48.761Z",
            "updated_at": "2022-11-08T09:00:48.761Z"
        },
        {
            "employee_id": 3,
            "org_id": 1,
            "first_name": "Richard-3",
            "middle_name": "",
            "last_name": "Hendricks",
            "email_id": "richard.h@gmail.com",
            "date_of_birth": "01/09/1998",
            "gender": "Male",
            "created_at": "2022-11-08T09:01:11.720Z",
            "updated_at": "2022-11-08T09:01:11.720Z"
        }
    ]
}
```