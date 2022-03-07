import { BaseModelStatus } from "../../Models/BaseModelStatus";

export class StringToEnumMappers {
    
    static stringToBaseModelStatus(stringStatus?: string): BaseModelStatus {
        switch (stringStatus) {
            case "DRAFT":
                return BaseModelStatus.DRAFT
            case "ACTIVE":
                return BaseModelStatus.ACTIVE
            default:
                return BaseModelStatus.UKENDT
        }
    }


}
