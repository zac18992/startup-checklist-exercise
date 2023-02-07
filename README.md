# Startup Checklist

This repo contains code implementing a basic startup checklist, as per the assignment.

## Requirements Tracker

```
Every startup goes through several stages. In every stage, there are necessary steps to be
accomplished.

Create a simple application that documents this progress.
```
Back-end
- [x] Implement a GraphQL API using Node.js
- [x] Every phase can have an unlimited amount of tasks
- [x] Tasks cannot be marked as completed unless all tasks in the previous phase were
completed
- [x] Propose and implement a solution how to reopen (undo) a task
- [x] Implement in TypeScript
- [x] Store the progress in memory (not the database)
- [x] Design a database schema to store the data (no need to implement)

Front-end (Optional)
- [x] Implement in React
- [x] Store the progress in local storage
- [x] Implement in TypeScript
- [ ] When all phases are completed, display a random fact from
https://uselessfacts.jsph.pl/random.json

## Approach
- Apollo Server: as a graphql server
- GraphQL Nexus: to define and generate the graphql schema and types from code
- A set of services on the API, using dependency injection for re-usability & testability
- Mocked DB: is passed through the Apollo Server context, to act abstractly and replicate a real database
- React Query: to query data from the API and cache it in local storage
- GraphQL Code Generator: to automatically understand types from the API, and generate react-query hooks
- Concurrently: to automatically watch for schema updates when running the front-end
- DBML: Database Markup Language to create a schema for the database (see the db-schema directory)
- Extremely basic User Interface for testing

## Notes
- (Undo) When unchecking a task, and then rechecking it, the following logic applies:
  1. User completed phase 1, and then phase 2
  2. User has to go back and re-do a task in phase 1, so phase 2 becomes disabled
  3. User re-completes phase 1, and their completed tasks from phase 2 are restored
- I felt this was a more natural: having to redo one item in phase 1 would not necessarily mean all item in phase 2 were wasted

## DB Schema

## Viewing DBML
If you would like to view the DBML database schemas in a more visual way, you can visit https://dbdiagram.io/d and paste the contents of a dbml file there, to get the visual diagram.

I created varying levels of DB structure to represent different requirements:

### 1. Basic
`db-schema/1_basic.dbml` represents just the relationship between plans, phases and items, without any specific user authorization. This represents this coding exercise approximately as it is implemented in this repo.

### 2. Multiple Plans Per User
`db-schema/2_multiple_users.dbml` represents a situation where we have the concept of different users, and a user can create multiple different plans. Only one user can access any one plan.

### 3. Multiple Plans With Multiple Users
`db-schema/3_multiple_users_per_startup_plan.dbml` represents a situation where different users can potentially access and the same plan. They might have different permission levels, eg ownership, read or write.

## Improvements
I had to spend some time refreshing my understanding of GraphQL. For that reason, I did not have much time to write tests for this example. This would be the immediate next task. In a real-life scenario with more time, I would of course implement the tests. Some other examples:

Features
- Ability to re-order phases and to do items
- User authentication and per user storage of phases/items
- Ensure locked phases cannot be updated at the API level

Back-end
- Standardised response structure and error handling
- Create multiple plans, and update the plan title
- Implement Dataloader if we used an actual DB and calls became complex

Front-end
- Optimistic updates & caching, instead of invalidating all queries on each mutation
- Query batching if the app became complex

## Installation & Usage

First, open a terminal window and clone the repo. Then setup and run the back-end:

```bash
cd [install_location]/back-end; // Navigate to the back end folder
yarn install; // Install the dependencies
yarn start; // Start the server
```

Now, if you wish, you can navigate to `http://localhost:4000` and test out the graphql server.

Secondly, open another terminal window. Then setup and run the front-end:

```bash
cd [install_location]/front-end; // Navigate to the front end folder
yarn install; // Install the dependencies
yarn start; // Start the server
```

Now, you can navigate to `http://localhost:3000` and test out the UI.

## License

[MIT](https://choosealicense.com/licenses/mit/)