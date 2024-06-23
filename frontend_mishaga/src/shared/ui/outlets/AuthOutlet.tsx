import React, { ReactNode } from "react";
import { AuthFormsType } from "shared/model";

interface AuthOutletType extends AuthFormsType {
    text: string,
    children: ReactNode,
    heading: string
}

export const AuthOutlet: React.FC<AuthOutletType>  = ({ text, children, onChangeForm, heading }) => {
    return (
        <div className="h-full flex flex-col justify-center relative w-96 m-auto">
            <h1>{heading}</h1>
            {children}
            <p className="cursor-pointer text-gray justify-self-end absolute bottom-4 w-full text-center" onClick={onChangeForm}>{text}</p>
        </div>
    )
}