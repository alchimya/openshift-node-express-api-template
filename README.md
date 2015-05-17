# openshift-node-express-api-template
An OpenShift template to implement REST API with basic auth and extendible routing

# What is this?
Recently I had to implement REST API webservices with Node and Express on OpenShift (https://www.openshift.com):
 an amazing service that allow you to have a lots of free web services to deploy your web apps.
<br/>
Although the OpenShift documentation is good, I decided to develop a minimalist template to implement an extendible REST API project
ready to be deployed on OpenShift.
<br/>
By default template is configured with basic auth on each request.
<br/>
You can try/test this template, by using some pre-configured api modules (home.js, apimodule1.js and apimodule2.js).
<br/>
- http://localhost:8080 (GET on home.js module)
- http://localhost:8080/apimodule1 (GET on apimodule1.js module)
- http://localhost:8080/apimodule1/11111 (GET on apimodule1.js module)
- http://localhost:8080/login (POST on apimodule2.js module)


# Instalaltion

- cd openshift-node-express-api-template
- sudo npm install

# How to use

- setup source code on your  IDE
- open server.js and change uid and pwd on basicAuthCredentials var
- add your routing on app/api/index.js
- create your custom REST resources on app/api
- create your custom error codes on app/modules/error-codes.js
- create your custom error domains on app/modules/error-domain.js
