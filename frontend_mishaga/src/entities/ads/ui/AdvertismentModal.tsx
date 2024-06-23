import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "shared/ui"
import close from 'assets/close.png'
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "shared/api/hooks"
import { CreateAd } from "../model/types"
import { createAd } from "../api"
import { fetchAdsByCategory, fetchUpdateAdImage } from "../model/adsSlice"
import camera from 'assets/camera.png'
import { changePop } from "shared/model/sharedSlice"

interface Modal {
    closeModal: () => void
}

const emptyAd: CreateAd = {
    name: "",
    description: "",
    contactData: "",
    category: "seek"
}

const inputClass = 'flex flex-col w-full p-2'
const borderClass = 'border rounded-lg border-solid border-semiLightGray px-3'
    
window.addEventListener("dragover",function(e){
    e.preventDefault(); 
},false);
  window.addEventListener("drop",function(e){
    e.preventDefault();  
},false);

export const AdvertismentModal: React.FC<Modal> = ({ closeModal }) => {

    const dispatch = useAppDispatch()
    const category = useAppSelector(state => state.ads.category)
    const [rawFiles, setRawFiles] = useState<FileList>()
    const [files, setFiles] = useState<[string, string, string, string]>(['','','',''])
    const [selectedButton, setSelectedButton] = useState<CreateAd['category']>('found')

    const buttonsInfo: { text: string, category: CreateAd['category']}[] = [
        {
            text: 'Нашёл',
            category: 'found',
        },
        {
            text: 'Обмен',
            category: 'exchange',
        },
        {
            text: 'Ищу',
            category: 'seek',
        }
    ]

    const {
        register,
        handleSubmit,
        getValues
    } = useForm<CreateAd>()

    const handleSetFiles = async (filesUploaded: FileList) => {
        if (!filesUploaded || !filesUploaded.length) return
        if (filesUploaded.length > 4) {alert('Слишком много файлов. Выберите не более 4'); return}

        const arr: [string, string, string, string] = [...files]

        const readFileAsDataURL = async (file: File) => {
            return new Promise<string>(function(resolve){
                const fr = new FileReader();
                fr.onload = function(){
                    resolve(String(fr.result));
                };
                fr.readAsDataURL(file);
            });
        }

        let i = 0
        let j = 0
        while (i < 4) {
            if (i <= filesUploaded.length - 1) {
                if (!['image/png', 'image/jpeg', 'image/jpg'].includes(filesUploaded[i].type) || filesUploaded[i].size > 1000000) {alert("Перетаскивайте только изображения типа png, jpg, jpeg"); break}
                arr[i] = await readFileAsDataURL(filesUploaded[i])
            } else {
                arr[i] = files[j]
                j++
            }
            i++
        }

        setRawFiles(filesUploaded)
        setFiles(arr)
    }

    const onSubmit: SubmitHandler<CreateAd> = async (data) => {
        const fullData = {...data}
        fullData.category = selectedButton
        const ad = await createAd(fullData)
        if (rawFiles && rawFiles.length) {
            const formData = new FormData()
            for (let i = 0; i < rawFiles.length; i++) {
                formData.append('file', rawFiles[i], rawFiles[i].name)
            }
            const id = ad.id
            await dispatch(fetchUpdateAdImage({id, formData}))
        }
        await dispatch(fetchAdsByCategory(category))
        dispatch(changePop(true))
        closeModal()
    }

    const modalRef = useRef<HTMLFormElement>(null)
    
    const closeIfEmpty = () => {
        const isEmptyValues = Object
            .entries<CreateAd[keyof CreateAd]>(getValues())
            .every(([key, value]) => 
                value === emptyAd[key as keyof CreateAd]
            )
        if (isEmptyValues && files.every(file => file === '')) {closeModal(); return}
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
    }, [modalRef, files]);

    return (
        <div className="absolute w-full h-full bg-lightGray bg-opacity-50 flex place-items-center justify-center">
            <form ref={modalRef} onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white flex flex-col items-center">
                <img className="cursor-pointer self-end w-6 h-6" src={close} alt="" onClick={closeIfEmpty}/>
                <h2>Подача объявления</h2>
                <div className={inputClass}>
                    <label htmlFor={'name'}>Заголовок объявления</label>
                    <input  
                        className={`mt-2 h-8 cursor-pointer ${borderClass}`}
                        type="text" 
                        id="name"
                        {...register('name')}
                    />
                </div>
                <div className={inputClass}>
                    <label htmlFor={'description'}>Описание объявления</label>
                    <textarea
                        className={`w-full h-32 resize-none ${borderClass}`}
                        id="description"
                        {...register('description')} 
                    />
                </div>
                <div className={inputClass}>
                    <label htmlFor="">Выберите категорию</label>
                    <div className="flex flex-row mt-3">
                        {buttonsInfo.map((button, index) => {
                            return (
                                <button 
                                    className={`h-10 w-20 border mx-1 border-lightGray ${selectedButton === button.category ? 'bg-lightGray' : ''}`}
                                    key={index} 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedButton(button.category)
                                    }}
                                >
                                    {button.text}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className={inputClass}>
                    <label htmlFor={'contactData'}>Контактная информация</label>
                    <input  
                        className={`mt-2 h-8 cursor-pointer ${borderClass}`}
                        type="text" 
                        id="contactData"
                        {...register('contactData')}
                    />
                </div>
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={(e) => handleSetFiles(e.dataTransfer.files)} 
                    className='flex flex-col w-full p-2 mb-2'
                >
                    <label htmlFor={'avatar'}>Фотографии</label>
                    <div className="flex flex-row justify-between">
                        <img src={files[0] || camera} alt="" className={`object-center ${!files[0] && 'p-2'} object-cover h-24 w-24 mr-2 my-2 border border-gray`}/>
                        <img src={files[1] || camera} alt="" className={`object-center ${!files[1] && 'p-2'} object-cover h-24 w-24 m-2 border border-gray`}/>
                        <img src={files[2] || camera} alt="" className={`object-center ${!files[2] && 'p-2'} object-cover h-24 w-24 m-2 border border-gray`}/>
                        <img src={files[3] || camera} alt="" className={`object-center ${!files[3] && 'p-2'} object-cover h-24 w-24 ml-2 my-2 border border-gray`}/>
                    </div>
                    <div className="relative cursor-pointer w-full mt-2">
                        <input 
                            accept=".jpg, .png, .jpeg"
                            className=" cursor-pointer opacity-0 z-20 absolute w-full h-full" 
                            type="file" 
                            name="avatar" 
                            id="avatar"
                            multiple
                            onChange={event => event.target.files && handleSetFiles(event.target.files)} 
                        />
                        <button className="w-full text-center h-10 border border-blue text-blue">Перетащите или нажмите на меня</button>
                    </div>
                    
                </div>
                <Button text={"Опубликовать"} submit />
            </form>
        </div>
    )
}