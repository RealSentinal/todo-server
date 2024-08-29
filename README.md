# To-Do
+ [x] Auth
  - [x] Login
  - [x] Register
  - [x] IsAuthenticated
+ [ ] Database
  - [ ] Schema
+ [ ] CRUD
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - [ ] Delete
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
#POST /register
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
#POST /login
body: {
  username: ...,
  password: ...,
}
```

## IsAuthenticated
```bash
#POST /login
body:
{
  token: ...
}
```
