FROM tomcat:8.5-jre8

EXPOSE 8080

ADD tomcat-users.xml /usr/local/tomcat/conf/

ADD spring-boot-angular-server/target/spring-boot-angular-server-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/service.war
ADD spring-boot-angular-client/dist/app /usr/local/tomcat/webapps/app

#ENV MONGODB_HOSTNAME mongo