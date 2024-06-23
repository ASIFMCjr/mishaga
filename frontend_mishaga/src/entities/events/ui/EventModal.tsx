import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form"
import { Button } from "shared/ui"
import { CreateEvent } from "../model/types"
import close from 'assets/close.png'
import { fetchEvents, fetchUpdateEventImage } from "../model/eventSlice"
import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "shared/api/hooks"
import { createEvent } from "../api"
import { changePop } from "shared/model/sharedSlice"

interface Modal {
    closeModal: () => void
}

const emptyEvent: CreateEvent = {
    name: "",
    date: "",
    description: "",
    ready: '0',
    count: '0'
}

const eventLabels = {
    name: "Название мероприятия",
    date: "Дата проведения",
    description: "Описание",
    ready: "Уже готов человек",
    count: "Максимальное количество человек",
    eventImage: 'Фото для мероприятия'
}

interface ProfileInputProps {
    id: keyof CreateEvent
    text: string
    type: string
    register: UseFormRegister<CreateEvent>
    defaultValue: CreateEvent[keyof CreateEvent]
}

const ProfileInput: React.FC<ProfileInputProps> = ({ id, text, type, register, defaultValue}) => {
    
    const profileInputClass = 'flex flex-col w-full p-2'
    const borderClass = 'border rounded-lg border-solid border-semiLightGray px-3'
    return (
        <div className={profileInputClass}>
            <label htmlFor={id}>{text}</label>
            <input 
                    autoComplete="new-password" 
                    defaultValue={String(defaultValue)} 
                    {...register(id)} 
                    className={`mt-2 h-8 ${borderClass}`} 
                    id={id} 
                    type={type} 
                />
        </div>
    )
}

export const EventModal: React.FC<Modal> = ({ closeModal }) => {

    const dispatch = useAppDispatch()

    const [file, setFile] = useState<React.ChangeEvent<HTMLInputElement>>()

    const {
        register,
        handleSubmit,
        getValues
    } = useForm<CreateEvent>()

    const handlePhoto = async (id: number) => {
        if (!file || !file.target.files?.length || file.target.files[0].size > 1000000) return
        const fileTarget = file.target.files[0]
        try {
            const formData = new FormData();
            formData.append( "file", fileTarget, fileTarget.name);
            await dispatch(fetchUpdateEventImage({id, formData}))
        } catch (err) { console.log(err) }
    }

    const onSubmit: SubmitHandler<CreateEvent> = async (data) => {
        data.count = data.count ? +data.count : 0
        data.ready = data.ready ? +data.ready : 0
        data.date = await new Date(data.date).toISOString()
        const event = await createEvent(data)
        await handlePhoto(event.id)
        await dispatch(fetchEvents())
        dispatch(changePop(true))
        closeModal()
    }

    const modalRef = useRef<HTMLFormElement>(null)
    
    const closeIfEmpty = () => {
        const isEmptyValues = Object
            .entries<CreateEvent[keyof CreateEvent]>(getValues())
            .every(([key, value]) => 
                value === emptyEvent[key as keyof CreateEvent]
            )
        if (isEmptyValues && !file) {closeModal(); return}
        const closeForm = confirm("Если вы закроете форму, то несохраненные данные сотрутся!");
        if (!closeForm) return

        closeModal()
    }

    useEffect(() => {
        const handleClickClose = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target))  
            closeIfEmpty()
        }
        document.addEventListener("mousedown", handleClickClose);
        return () => { document.removeEventListener("mousedown", handleClickClose) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalRef]);
    
    return (
        <div className="absolute w-full h-full bg-lightGray bg-opacity-50 flex place-items-center justify-center">
            <form ref={modalRef} onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white flex flex-col items-center">
                <img className="cursor-pointer self-end w-6 h-6" src={close} alt="" onClick={closeIfEmpty}/>
                <h2>Создать мероприятие</h2>
                {Object.entries(emptyEvent).map(([key, value], index) => {
                    return (
                        <ProfileInput 
                            key={index} 
                            defaultValue={value as CreateEvent[keyof CreateEvent]} 
                            id={key as keyof CreateEvent} 
                            text={eventLabels[key as keyof CreateEvent]} 
                            type={key === 'date' ? 'datetime-local' : typeof value} 
                            register={register}/>
                    )
                })}
                <div className='flex flex-col w-full p-2 mb-2'>
                    <label htmlFor={'avatar'}>Изображение</label>
                    <input 
                        accept=".jpg, .png, .jpeg"
                        className="mt-2 h-8 cursor-pointer" 
                        type="file" 
                        name="avatar" 
                        id="avatar"
                        onChange={event => setFile(event)} 
                    />
                </div>
                <Button text={"Создать"} submit />
            </form>
        </div>
    )
}