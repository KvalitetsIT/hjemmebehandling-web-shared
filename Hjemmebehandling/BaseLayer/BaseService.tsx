import { BaseApiError } from "../Errorhandling/BaseApiError";
import { BaseServiceError } from "../Errorhandling/BaseServiceError";
import { BadRequestError } from "../Errorhandling/ServiceErrors/BadRequestError";
import { InvalidInputError, InvalidInputModel } from "../Errorhandling/ServiceErrors/InvalidInputError";
import { NotCorrectRightsError } from "../Errorhandling/ServiceErrors/NotCorrectRightsError";
import { NotFoundError } from "../Errorhandling/ServiceErrors/NotFoundError";
import { UnknownServiceError } from "../Errorhandling/ServiceErrors/UnknownServiceError";


export default class BaseService {
    ValidatePagination(page : number, pageSize : number) : void {
        let errors : InvalidInputModel[] = [];
        if(page <= 0)
            errors.push(new InvalidInputModel("page","Sidenummer skal være større end 0"))

        if(pageSize <= 0)
            errors.push(new InvalidInputModel("pageSize","Sidestørrelse skal være større end 0"))
        
        if(errors.length > 0)
            throw new InvalidInputError(errors);
    }

    HandleError(error : any) : any {
        console.debug("Transforming error to ApplicationError")
        console.log(error)
        let errorIsApiError = error instanceof BaseApiError
        let errorIsServiceError = error instanceof BaseServiceError
        if(errorIsApiError)
            throw this.FromApiToServiceError(error) //Make this error to Service-error
            
        if(errorIsServiceError)
            throw error; //The error is ok and can be displayed nicely
    
        throw new UnknownServiceError(error)
    }

    private FromApiToServiceError(apiError : BaseApiError) : BaseServiceError {
        if(apiError && apiError.response){
            switch(apiError.response.status) {
                case 400:
                    return new BadRequestError(apiError.errorMessage ?? "")
                case 401 : 
                    return new NotCorrectRightsError();
                case 403 : 
                    return new NotCorrectRightsError();
                case 404 : 
                    return new NotFoundError();
            }
        }

        return apiError
       
    }
}
  