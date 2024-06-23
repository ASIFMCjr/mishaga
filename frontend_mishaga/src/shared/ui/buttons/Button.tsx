import React from "react"

type ButtonProps = {
    submit?: boolean
    text: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ submit, text, onClick, disabled }) => {
    return submit 
        ? <input className="bg-yellow text-black shadow-black-100 shadow-lg p-2.5 px-4 cursor-pointer" type="submit" value={text}/>
        : <button disabled={disabled} className={`${!disabled ? 'bg-yellow' : 'bg-lightYellow'} z-0 text-black shadow-black-100 shadow-lg p-2.5 px-4`} onClick={onClick}>{text}</button>
}