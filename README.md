# To-Do
+ [x] Auth
  - [x] Login
  - [x] Register
  - [x] IsAuthenticated
+ [x] Database
  - [x] User Schema
  - [x] Task Schema
  - [x] Role schema
+ [x] CRUD
  - [x] Create
  - [x] Read
  - [x] Update
  - [x] Delete
+ [ ] Roles
  - [ ] Administrator
  - [ ] User
+ [ ] Teams
  - [ ] Add User
  - [ ] Remove User
+ [ ] Search
  - [ ] List
  - [ ] Filter

# Getting Started
```bash
git clone https://github.com/RealSentinal/todo-server.git
cd todo-server
npm run start
```

# Request

## Register
```bash
# POST /register
body:
{
  username: ...,
  password: ...,
  email: ...,
  birthday: ...,
}
```

## Login
```bash
# POST /login
body: {
  username: ...,
  password: ...,
}
```

## IsAuthenticated
```bash
# POST /login
body:
{
  token: ...
}
```

## Crud
## Create
```bash
# POST /create
body: {
  token: ...,
  description: ...,
  completed: ...,
  user_id: ...
}
```

## Read
```bash
# GET /read
body: {
  token: ...
}
```

## Read By Filters
```bash
# GET /read/filter
body: {
  token: ...,
  filter: ...
}
```

## Update
```bash
# PUT /update
body: {
  token: ...,
  id: ...,
  description: ...,
  title: ...
}
```

## Delete
```bash
# DELETE /delete
body: {
  token: ...,
  id: ...
}
```

## Teams
## Create
```bash
# POST /teams/create
body: {
  token: ...,
  name: ...
}
```