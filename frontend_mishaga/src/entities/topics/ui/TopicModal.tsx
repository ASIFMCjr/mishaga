import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "shared/ui"
import close from 'assets/close.png'
import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "shared/api/hooks"
import { CreateTopic } from "../model/types"
import { fetchCreateTopic, fetchTopics } from "../model/topicSlice"
import { changePop } from "shared/model/sharedSlice"

interface Modal {
    closeModal: () => void
}

const emptyAd: CreateTopic = {
    name: "",
    category: "Основная"
}

const inputClass = 'flex flex-col w-full p-2'
const borderClass = 'border rounded-lg border-solid border-semiLightGray px-3'

export const TopicModal: React.FC<Modal> = ({ closeModal }) => {

    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.topics.categories)

    const {
        register,
        handleSubmit,
        getValues
    } = useForm<CreateTopic>()

    const onSubmit: SubmitHandler<CreateTopic> = async (data) => {
        try {
            await dispatch(fetchCreateTopic(data))
            await dispatch(fetchTopics())
            dispatch(changePop(true))
        } catch (err) {
            alert("что-то пошло не так")
        }
        
        // await dispatch(fetchAdsByCategory(categories))
        
        closeModal()
    }

    const modalRef = useRef<HTMLFormElement>(null)
    
    const closeIfEmpty = () => {
        const isEmptyValues = Object
            .entries<CreateTopic[keyof CreateTopic]>(getValues())
            .every(([key, value]) => 
                value === emptyAd[key as keyof CreateTopic]
            )
        if (isEmptyValues) {closeModal(); return}
        const closeForm = confirm("Если вы закроете форму, то несохраненные данные сотрутся!");
        if (!closeForm) return

        closeModal()
    }


    useEffect(() => {
        const handleClickClose = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node))  
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
                <h2>Создание обсуждения</h2>
                <div className={inputClass}>
                    <label htmlFor={'name'}>Тема обсуждения</label>
                    <input  
                        className={`mt-2 h-8 cursor-pointer ${borderClass}`}
                        type="text" 
                        id="name"
                        {...register('name')}
                    />
                </div>
                <div className={inputClass}>
                    <label htmlFor="">Категория</label>
                    <div className="flex flex-row my-4">
                        <select className={`mt-2 h-8 cursor-pointer ${borderClass}`} {...register('category')}>
                            {categories.map((value) => {
                                return (
                                    <option key={value} value={value}>{value}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <Button text={"Создать"} submit />
            </form>
        </div>
    )
}