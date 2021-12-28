# Instaling package
`npm i @kvalitetsit/hjemmebehandling`

# Publishing to npm;
1. Change versionnumber in package.json
1. `npm login` and login with your credentials 
1. Make sure you are included in the kvalitetsit-organization in npm https://www.npmjs.com/settings/kvalitetsit/members
1. Publish to npm using command `npm run-script publish`

# Included in package
## BaseLayer
Usually we have a Service-layer, API-layer and the frontend layer. This folder stores classes that contains methods that could (and should) be used in all specifications of a given service or api-class.
## Charts
In this project we only need one type of graph, and therefore we store that here.
## Errorhandling

### Errortypes
All applications that uses this package should handle errors the same way. The idea is to convert all errors from external services to the errortype BaseApiError. This will make sure that all errors can be handled, and displayed for the user. BaseApiError should be understandable for the developer.

When an BaseApiError is thrown from the API-layer, it should be catched in the service-layer, and be converted to a BaseServiceError. This error should be understandable for any user, and should, in longterm, be the only errors to be displayed for users.

### General errorhandling
To catch and handle errors from the DOM, best practise is to use ErrorBoundaries. ErrorBoundaries do have alot of limitations. It can only handle errors that happens in the DOM. This means that if a error happens while we are fetching data asyncrounus, before rendering the page the error will not be caught by an ErrorBoundary. A  hack is to use `this.setState(()=>{throw error})` in a try-catch-clause around the async fetching. This will throw an error using the state, and this will be caught in the ErrorBoundary.

Often in the frontend we will be met with "This value is possibly undefined". To make it easier we have created an IsEmptyCard. This can take a list, or and object and display whatever you want if the list, or object is empty, null or undefined. If you have DOM that expects the list, or object to have a value, you can set that DOM as a child of the IsEmptyCard. And this part will only be rendered if the list, or object is not null, empty or undefined.

## Models
Since it is the same domain-models that are used across all systems, all the domain models are stored here.


