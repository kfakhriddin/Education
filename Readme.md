# Education

## Installation
Create `.env` file.
Install postgresql, nodejs, ...

```shell
$ npm i
```

Run:
```shell
$ node server.js
```



### Create account
#### Post 
````http://3.122.136.169:8000/v1/users/account````
##### example
```{
    "fullname":"Yourname",
    "email":"youremail@gmail.com",
    "password":"password",
    "role":"student||professor"

}
```
After a user submits a post, an email verification will be sent.
```
    http://3.122.136.169:8000/v1/users/verify/:verify_id
```

### Login account 
### Post 
```http://3.122.136.169:8000/v1/users/login```
#### example 
```{
    "email:"youremail@gmail.com",
    "password":"yourpassword"
}
```

## Lecture
### Lecture create Post

#### example

```http://3.122.136.169:8000/v1/lecture/add```

```
    {
        "title":"Lecture title",
        "startTime":"2023-08-03-09:00",
        "endTime":"2023-08-03-11:00",
        "userId": "userId" #professor account

    }
```

### Lecture Get list 
#### example 

```http://3.122.136.169:8000/v1/lecture/list```


### Lecture Get ById  

#### example

```http://3.122.136.169:8000/v1/lecture/:id```


## Booking

### Booking create Post

#### example 
```http://3.122.136.169:8000/v1/booking/add```

```
    {
        "userId":"userId", # user role student account
        "lectureId":"lectureId",
    }
    
```

### Booking Get list

#### example 
```http://3.122.136.169:8000/v1/booking/list```


### Booking Get ById

#### example

```http://3.122.136.169:8000/v1/booking/:id```

