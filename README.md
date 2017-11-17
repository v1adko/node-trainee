# Test node API

### REST Api:

baseURL: `http://localhost:8080/`

##### authentication: 

method| url			            | description                 |
:-----|:------------------------|:----------------------------|
`POST`| `/authentication/register`  		| get "username" and "password" return "token" and status "auth"|
`POST`| `/authentication/login`			| get "username" and "password" return "token" and status "auth"|
`PUT` | `/authentication/changepass`	| get "password" and "newpassword" return "token" and status "auth"|
##### users: 

method| url			            | description                 |
:-----|:------------------------|:----------------------------|
`GET` | `/users`               	| return all users|
`POST` | `/users`               	| return all users|
`GET` | `/users/:id`          	| return user by id |
`PUT` | `/users/:id`          	| update user by id |
`DELETE` | `/users/:id`          	| delete user by id |
`GET` | `/users/get/:username`     	| return user by name |

For all of this methods are required token with permissions, that you can get after authentication.
Token must be sending as a  header: `x-access-token`.
##### geolocation: 

method| url			            | description                 |
:-----|:------------------------|:----------------------------|
`GET` | `/geolocation/:address` | return array of coordinates and full addresses|
`GET` | `/geolocation/:lat/:lon`| return array of coordinates and full addresses|

Moved from [GitLab repo](https://gitlab.com/Artjoker-Training/calendar-backend).
