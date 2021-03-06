## The Communication and monitoring project (KoMo)
Image a person called Jens. Jens has a condition. His condition makes it nessecary to have his health monitored. He does not need to be monitored 24/7, he just needs to answer and send a questionnaire a couple times a week to the doctor, so the doctor can tell if his condition is getting worse.

> Jens will have to send theese questionnaires somewhere, and this is where [patient-web](https://github.com/KvalitetsIT/hjemmebehandling-patient-web) comes ind. Here Jens will log in, and get an overview of his condition, how it evolves, and also give him the ability to tell the doctor how it goes, using a questionnaire. The patient-web will also provide Jens with contact-details for the hospital, at relevant and urgent times.

> The doctor will recieve the questionnaire using the [medarbejder-web](https://github.com/KvalitetsIT/hjemmebehandling-medarbejder-web) where he will be able to quickly see whether Jens' health is going the right or the wrong way. If Jens is getting worse, a form of communication will be performed, either on Jens' initiative or the doctors. 

# Instaling package
`npm i @kvalitetsit/hjemmebehandling`

# Publishing to npm;
1. Change versionnumber in package.json `1.9 => 1.10 => 1.11 ... `
3. `npm login` and login with your credentials 
4. Make sure you are included in the kvalitetsit-organization in npm https://www.npmjs.com/settings/kvalitetsit/members'
5. Make sure you are the right place `cd Hjemmebehandling`
6. Publish to npm using command `npm run-script publish`

# Technologies in use
## General
### REACT
> Build encapsulated components that manage their own state, then compose them to make complex UIs.
> https://reactjs.org/
### NEXT.js
>Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
> https://nextjs.org/
### Typescript
>TypeScript is JavaScript with syntax for types.
>https://www.typescriptlang.org/

## Packages) Worthy mentions 
1. Material UI (MUI)
1. react-chartjs-2

## Recommended IDE
1. Visual Studio Code


# Structuring for projects using shared
When standing in the root-folder of a project that is using the shared project, there are a few folders that are more important than others.

## Components-folder
In the components folder we store all of our components. Usually we have split the components into categories based on their root-component. Many times fx we use the MUI-component `card` as our root. And when that is the case we put it in the `Cards`-folder.

Furthermore we always have a `layout`-folder which contains components used to setup the basic layoutting. We usually have a `layout.tsx` which uses Router and Switch, and other components to compose the general layout of the page. It is also here where we store elements that are used general across the application, such as loading-components and such.

## Pages-folder
The page-folder contains all the actual pages, where we use components to compose the entire page. Theese pages should not be the longest of files, and should not be much more than 200 lines. If the file is more than 200 lines, it could indicate the need of refactoring code into more componenents.

The pages are named after the path that are used to get to them. So fx :

`{url}` => `{filePlacement}` \
`www.mydomain.com/create` => `pages/create.tsx` \
`www.mydomain.com/patients/2` => `pages/patients/[pagenr].tsx` \
`www.mydomain.com/2/patients` => `pages/[pagenr]/patients.tsx`

This is convention in Next, and will make the properties in `[]` available in the property-object on the related page.

## Services-folder
The services-folder contains all of the interfaces for our services, and their implementation. It also contains all the project-specific serviceerrors which can be thrown in the service-layer.


## Apis-folder
The api-folder contains all of the interfaces for our apis, and their implementations (one "real" that calls the actual api, and one "fake" which mocks the entire connection). It also contains all the project-specific apierrors which can be thrown in the api-layer.

## Compose-folder
In the projects we have a docker-compose setup that can be run, and that setup is stored here.

# Structuring for shared-project

## Charts
In this project we use one type of graph, the line chart. So to make it easy to use the same graph across both projects, all we need to create that graph is placed in this folder.

## Helpers
In the Helpers-folder we have placed different kinds of helpers, from a Date-extension-method, to a collection-helper and also a datehelper. The dateHelper should be used every time a date is rendered in the UI. This is to make sure, that we show dates the samme way across every project. 

## Errorhandling
### Errortypes
All applications that uses this package should handle errors the same way. The idea is to convert all errors from external services to the errortype BaseApiError. This will make sure that all errors can be handled, and displayed for the user. BaseApiError should be understandable for the developer.

When an BaseApiError is thrown from the API-layer, it should be catched in the service-layer, and be converted to a BaseServiceError. This error should be understandable for any user, and should, in longterm, be the only errors to be displayed for users.

### General errorhandling
To catch and handle errors from the DOM, best practise is to use ErrorBoundaries. ErrorBoundaries do have alot of limitations. It can only handle errors that happens in the DOM. This means that if a error happens while we are fetching data asyncrounus, before rendering the page the error will not be caught by an ErrorBoundary. A  hack is to use `this.setState(()=>{throw error})` in a try-catch-clause around the async fetching. This will throw an error using the state, and this will be caught in the ErrorBoundary.

Often in the frontend we will be met with "This value is possibly undefined". To make it easier we have created an IsEmptyCard. This can take a list, or and object and display whatever you want if the list, or object is empty, null or undefined. If you have DOM that expects the list, or object to have a value, you can set that DOM as a child of the IsEmptyCard. And this part will only be rendered if the list, or object is not null, empty or undefined.

## Models
Since all projects using this package are attached to same project, we are all in the same domain. The models in this domain are therefor in this shared project.

## BaseLayer
Usually we have a Service-layer, API-layer and the frontend layer. This folder stores classes that contains methods that could (and should) be used in all specifications of a given service or api-class.

For API -and servicelayer we have created two base-clases, which all service-implementations should inherit from. This will make common methods, such as HandleError(...) accessable.

### API-layer
> Any classes in the api-layer should inherit from the baseclass BaseApi
#### Responsibility
The api-layer performs all the actual http-calls, and maps back and forth between the internal models, that we use in the applications, and the external models that we recieve from the BFF.
#### Errorhandling
The api-layer should always only throw errors of type BaseApiError. All errors that are not of this type will later be shown as UnknownError to the user. 

To make this easy to live up to, a method called HandleError has been created. This will ensure that errors are converted to the correct apiError, so it can be handled in the service-layer. All methods in the api layer should be wrapped in try-catch-clause like;
```
try{
    ...
} catch(error){
    return this.HandleError(error)
}
```
Usually the error catched is of type 'Response'. If the error is of this type, the HandleError-method will convert this to a regular BaseApiError, which contains statuscode and such.
### Service-layer
> Any classes in the service-layer should inherit from the baseclass BaseService
#### Responsibility
The service layer is where all of the business logic exists. We dont want alot of calculations in the frontend, so to avoid this being a problem, we put as much logic in here as we posibly can.

#### Errorhandling
The service-layer should always only throw errors of type BaseServiceError. If an error is not of this type the frontend cannot handle it, and will may result in weird outcomes (blinkonitis). 

To make this easy to live up to, a method called HandleError has been created. This will ensure that errors are converted to the correct serviceError, so it can be handled in the frontend-layer. All methods in the service layer should be wrapped in try-catch-clause like;
```
try{
    ...
} catch(error){
    return this.HandleError(error)
}
```
Usually the error being catched is of type BaseApiError. The HandleError method in BaseService, has a predefined mapping from statusCode to a BaseServiceError. And this mapping can be modified using the AddStatusCodeToErrorMap(..) if you want to specify your own errors, with own errorSettings and such. 

### Frontend-layer
#### Responsibility
The frontend needs to show the necessary components. And has the responsibility of storing shortterm state in the react-components, so we can render it correctly.

#### Errorhandling
In the frontend layer all of the async-methods, event-handlers and such needs to be wrapped in try-catch-clauses, where the state is set to the catched error. Like;
```
try{
    ...
} catch(error){
    this.setState( () => {throw error})
}
```
This will trigger the ErrorBoundary-component which will show the error in a pretty way. The ErrorBoundary is created to handle only ServiceError's. Read more on errorboundaries here https://reactjs.org/docs/error-boundaries.html

# Technical decisions

## OpenApi generated API
To make it easier for the web-projects to stay in sync with the backend api we generate an backend-client using openApi. So when we make changes to the backendApi, we will export the openApi definition and put it in the web-project `/ressources/bff.json` when running `npm install` the bff.json is then used to generate an api-client. Theese generated classes are not added to git, since they are generated when running the github-action aswell.

## Internal/external models
We should have two types of models; external and internal. The external models are defined as models generated using the openApi-definition (classes in `/generated`). The external models should never be used in the service- or frontend layer. And the only reason they should be used in the api-layer is to map them to the internal-model.

We want to do it like this, to avoid having to change multiple layers because the api has changed.

## Program to an interface
> https://medium.com/javarevisited/oop-good-practices-coding-to-the-interface-baea84fd60d3

In our applications we wish to specify our dependencies one place. We also want the ability to change our implementation without the need to change multiple layers. 
When we run in development mode we dont want to use an actual backend-api that we call using http and stuff, that would require more setup and more complexity - we just want some data to make sure our frontend is looking good. Thats why we always have two implementations of each interface in the API-layer. 

We have one "real" implementation, and then we have a "fake" implementation. The real one will be used in production/stage/test environment, and the fake one is used duing local development. Default should be the real implementation - And using env-variables we should be able to tell the application that we wish to use the "fake" implementation.

## Class over functional components 
> https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/
> https://dev.to/mehmehmehlol/class-components-vs-functional-components-in-react-4hd3

After reading a bit about classes vs functional components it sounds like people are more excited about functional components. As my understanding goes the functional-component has evolved so much in the last couple of years, and are able to do the same things as class-components.

 And thats great! But for our team, comming from a world of backend, classes is more familier and therfore easier to understand and read to the team. 

For now we have decided to always use class-components, even though it might be going against the mainstream. We believe that it is easier for us.

>If you have the key-argument for us to change to functional-components please let us know!
