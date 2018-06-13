# spring-boot-angular-demo
The purpose of this project is to demonstrate the use of [Angular](https://angular.io/), [Spring Boot](https://spring.io/projects/spring-boot), [MongoDB](https://www.mongodb.com/) and [JWT](https://jwt.io/).
I have create a Single Page Application (SPA) and a RESTful Web Service.

The SPA shows how easy it is to create a web app with Angular. Spring Boot shows how easy it is to create back-end services. 
I implemented a level of security using JWT. It allows the web service to be stateless, so we don't need to worry about sessions and it make things very simple for the SPA or any other clients to authenticate and cosume the services.
I chose MongoDB for its simplicity. With Spring Data, you can quickly and easyly create a presistence layer.

## Build
1. Install [Angular CLI](https://cli.angular.io/) globaly: `npm install -g @angular/cli`.
2. Enter `spring-boot-angular-demo/spring-boot-angular-client` and run `npm install` to install all the dependencies.
3. Build the app by running `ng build --prod --base-href=/app/ --output-path=dist/app`. (Assuming we'll be serving this app from the specified `/app/` context)
4. Enter `spring-boot-angular-demo/spring-boot-angular-server` and run `mvn package` to build the .WAR file.

## Running with Docker
That's the quickest way to test the application. Follow these steps:
1. To have a MongoDB container running on Docker, simply execute `docker run -p 27017:27017 --expose 27017 mongo:3.6.5`.
2. Enter `spring-boot-angular-demo/` and build the image with `docker build -t tomcat .`.
3. To run the image execute `docker run -p 8080:8080 -e MONGODB_HOSTNAME=<mongo container ip> tomcat`. This will deploy both the SPA and back-end services to the tomcat instance within the container.
Note: I would recommend `--hostname mongo` so you wouldn't need to use docker's ip address but this aparently doesn't work across all platforms.

## Running without Docker
If you want to check if the installation went OK, you can run `ng serve`. Angular CLI will start an HTTP server and deploy the webapp. If all went ok, you will see a login screen if you open `http://localhost:4200` in your browser.

In order to use the SPA, you will need to deploy the .WAR file on a server of your choice. Just make sure to set the `MONGODB_HOSTNAME` environment variable with the hostname of a MongoDB server before.

###Proxying
To access both the SPA and the services via the same hostname, I recommend using Apache 2 as a proxy.
To do add, add the following configuration to the httpd.conf:
```
ProxyPass /app http://localhost:4200/app
ProxyPassReverse /app http://localhost:4200/app

ProxyPass /service http://localhost:8080/spring-boot-angular-server
ProxyPassReverse /service http://localhost:8080/spring-boot-angular-server
```
----

Feel free to open an issue if you run into any problems or have any suggestions.
