import React, { ReactNode } from "react"
import { authFieldsType } from ".."
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

interface AuthFormProps { fieldsArray: authFieldsType, children?: ReactNode, onSubmit: SubmitHandler<{fieldsArray: authFieldsType}> }

export const AuthForm: React.FC<AuthFormProps> = ({ fieldsArray, children, onSubmit }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<{fieldsArray: authFieldsType}>({
            defaultValues: { fieldsArray: fieldsArray }
        });
    const { fields } = useFieldArray({
        control,
        name: 'fieldsArray',
    });

    return (
        <form className="flex flex-col w-4/5 mt-8 mx-auto p-10 rounded-sm border-lightGray border-dashed border-4" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => {
                const { type, placeholder, required, id } = field
            return (
                    <input 
                        key={id}
                        type={type || 'text'} 
                        placeholder={placeholder}
                        {...register(`fieldsArray.${index}.value` as const, {
                            required: required
                        })}
                        className={`${errors?.fieldsArray?.[index]?.value ? "error" : ""} mb-4 h-14 p-6 text-gray bg-lightGray`}
                    />
            );
            })}
            { children }
        </form>
    )
}
