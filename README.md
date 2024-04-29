# SocialNetworkAPI

This project is an implementation of a social network API using Express.js, MongoDB, and Mongoose ODM. The API allows users to share thoughts, react to friends' thoughts, and manage friend lists.

## Table of Contents

## User Story
## Acceptance Criteria
## Getting Started
## API Routes
## Grading Requirements

## User Story

As a social media startup, I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

## Acceptance Criteria

When the application is invoked, the server starts, and Mongoose models are synced to the MongoDB database.
API GET routes in Insomnia for users and thoughts display data for each route in formatted JSON.
API POST, PUT, and DELETE routes in Insomnia allow successful creation, update, and deletion of users and thoughts in the database.
API POST and DELETE routes in Insomnia allow successful creation and deletion of reactions to thoughts and management of a user’s friend list.
Mock-Up

The project includes animations demonstrating the functionality of the API routes tested in Insomnia.

## Getting Started

To set up the project, follow these guidelines:

Models
User:
username: String, Unique, Required, Trimmed
email: String, Required, Unique (must match a valid email address)
thoughts: Array of _id values referencing the Thought model
friends: Array of _id values referencing the User model (self-reference)
Schema Settings
Create a virtual called friendCount to retrieve the length of the user's friends array field on query.

Thought:
thoughtText: String, Required (1-280 characters)
createdAt: Date, Default value is the current timestamp
username (The user that created this thought): String
reactions (Like replies): Array of nested documents created with the reactionSchema
Schema Settings
Create a virtual called reactionCount to retrieve the length of the thought's reactions array field on query.

Reaction: (SCHEMA ONLY)
reactionId: Mongoose's ObjectId data type, Default value is a new ObjectId
reactionBody: String, Required (280 character maximum)
username: String, Required
createdAt: Date, Default value is the current timestamp
Schema Settings
This is not a model but will be used as the reaction field's subdocument schema in the Thought model.

## API Routes
/api/users
GET all users
GET a single user by its _id and populated thought and friend data
POST a new user
PUT to update a user by its _id
DELETE to remove user by its _id
/api/users/:userId/friends/:friendId
POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list
/api/thoughts
GET to get all thoughts
GET to get a single thought by its _id
POST to create a new thought
PUT to update a thought by its _id
DELETE to remove a thought by its _id
/api/thoughts/:thoughtId/reactions
POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's reactionId value