# Back-End

![Image of API](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cloud-API-Logo.svg/267px-Cloud-API-Logo.svg.png)


**API Guide**

***API === https://replated.herokuapp.com/***

Type | End Point | Description
------------ | ------------ | -------------
POST | /api/volunteer/register | Volunteer Registration: You need a username, password, phone_number, and volunteer_name
POST | /api/volunteer/login | Volunteer Login: You need a valid username and password will return a token!
POST | /api/business/register | Business Registration: You need a username, password, business_name, business_address, phone_number, and type (must be donor or charity)
POST | /api/business/login | Business Login: You need a valid username and password will return a token!
GET | /api/requests/pending | You must have a token! Returns all pending food requests 
GET | /api/requests/all | You must have a token! Returns all food requests
GET | /api/requests/:id | You must have a token! Returns the food request associated with the id supplied in the address (:id).
GET | /api/requests/business/me | You must have a token! Returns all food requests created for signed in business user 
GET | /api/requests/volunteer/me | You must have a token! Returns all food requests accepted by signed in volunteer user (volunteer_id on food request matches that of user signed in)
POST | /api/requests/add | You must have a token and you must be a **business** and type of **donor**. requires (food) type, amount, and pickup_time (in Military time YYYY-MM-DD hh:mm) 
PUT | /api/requests/update/:id | You must have a token! Updates the food request associated with the id supplied in the address (:id). You can change any part of the object but would be most useful in adding the user Id of volunteer or changing the status of the request.
DELETE | /api/requests/delete/:id | You must have a token! Deletes the food request associated with the id supplied in the address (:id).
