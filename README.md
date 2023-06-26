here use two db 1. first_database and 2. secound_database 

use microservice method -
- means two more database , more url ,more server and more table and link between them also 
insert data into fist db and  user table and get also 
Server 1 listening on port 3000...

insert data into secound db and product table and get details 
make 3 api for get both db and table data into single response means command api work both and link between them 
Server 2 listening on port 4000...


both server is run into single file  
node app.js ---------------

MAKE CRUD operation in user table first_database 

update ------
both table using single url- http://localhost:3000/update1  , method - put
req- {
        "id": 1,
        "username": "ram",
        "address": "naibazar",
        "name": "Product",
        "price": 10
    }