# JDBC-component

## Description

This is our backend component that will be used to connect to the database. Also all the prediction data update data will be stored here. We created this component because we want to use the same database for both the frontend and backend. Also all the api calls will be made from here.

## Purpose

We can view, add, delete, update and query data in a database using JDBC.

## How to run

- ### Install Java
- ### Install eclipse-jee
- ### Install apache-tomcat-8.5.61

- Add the JDBC component to the project and Run the tomcat server check all the Apis in postman.

## Requirements

- ***gson-2.9.0.jar***
- ***javax.servlet-api-3.1.0.jar***
- ***mysql-connector-java-8.0.26.jar***

We can find all the .jar files in the following directory:

`WebContent -> WEB-INF -> lib`

## File Structure

  **Backend - JDBC Servalate - Java**
  - src
    - com.pojo
      -  Analytics.java -> This is the pojo class that will be used to store the getter and setter of Analytic   Data Chart graph. Which we use in frontend analytic view.
      -  Highcharts.java -> This is the pojo class that will be used to store the getter and setter of all the varables.
      
    -  demo.java -> This is the main class that will be used to run the program. All the java classes have specific names to understand the functionality.