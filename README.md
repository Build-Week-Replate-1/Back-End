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
POST | /api/requests/add | You must have a token and you must be a **business** and type of **donor**. requires (food) type, amount, and pickup_time (in Military time YYYY-MM-DD hh:mm) 
