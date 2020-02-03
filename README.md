# Back-End

![Image of API](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cloud-API-Logo.svg/267px-Cloud-API-Logo.svg.png)


**API Guide**

***API === https://replated.herokuapp.com/***

Type | End Point | Description
------------ | ------------ | -------------
POST | /api/volunteer/register | You need a username, password, phone_number, and volunteer_name
POST | /api/volunteer/login | You need a valid username and password will return a token!
POST | /api/business/register | You need a username, password, business_name, business_address, phone_number, and type (must be donor or charity)
POST | /api/business/login | You need a valid username and password will return a token!
