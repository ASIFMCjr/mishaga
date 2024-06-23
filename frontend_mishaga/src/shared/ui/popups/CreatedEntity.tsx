import React, { useEffect, useState } from 'react'
import './style.css'
import { useAppDispatch } from 'shared/api/hooks'
import { changePop } from 'shared/model/sharedSlice'
import close from 'assets/close.png'

export const CreatedEntity: React.FC<{text: string}> = ({ text }) => {
    const [visible, setVisible] = useState(true)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const timeout = setTimeout(() => {setVisible(false); dispatch(changePop(false))}, 5000)
        return () => {clearTimeout(timeout)}
    },[])
  return visible && (
    <div id={text} className=' flex flex-col created-entity__popup rounded-xl absolute right-10 top-10 w-48 h-24 text-center bg-lightGreen'>
        <img onClick={() => dispatch(changePop(false))} className='cursor-pointer inline-block self-end mt-2 mr-2 w-4' src={close} alt="" />
        <p>{text}</p>
    </div>
  )
}
