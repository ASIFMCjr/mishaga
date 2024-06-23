import { authFieldsType } from "entities/forms"
import { authObjectFieldsType } from "entities/forms/auth"
import { axiosInstance } from "shared/api/interceptor"
import { Tokens } from "shared/model"

export type SerializedFields = Record<authObjectFieldsType['identifier'], authObjectFieldsType[keyof authObjectFieldsType]>

const emptyObj: SerializedFields = {
}
export const serializeFields = (fields: authFieldsType) => {
    fields.every((field) => emptyObj[field.identifier] = field.value)
    if (emptyObj.room) emptyObj.room = Number(emptyObj.room)
    return emptyObj
}

export const login = async (newFields: SerializedFields): Promise<Tokens> => {
    return (await axiosInstance.post('auth/login', newFields )).data
}

export const signUp = async (newFields: SerializedFields): Promise<Tokens> => {
    return (await axiosInstance.post('auth/signUp', newFields )).data
}