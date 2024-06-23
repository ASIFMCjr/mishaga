import { Link } from "@tanstack/react-router"
import { fetchAdsByCategory, setCategory } from "entities/ads/model/adsSlice"
import { MyAd } from "entities/ads/model/types"
import { useState } from "react"
import { createPortal } from "react-dom"
import { useAppDispatch, useAppSelector } from "shared/api/hooks"
import { Button, CreatedEntity } from "shared/ui"
import camera from 'assets/camera.png'
import { AdvertismentModal as Modal } from "entities/ads/ui/AdvertismentModal"

export const AdvertismentsPage = () => {
    const dispatch = useAppDispatch()
    const ads = useAppSelector(state => state.ads.ads)
    const pop = useAppSelector(state => state.shared.pop)
    const [modal, setModal] = useState<boolean>(false)
    const selectedButton = useAppSelector(state => state.ads.category)
    const buttonsInfo: { text: string, category: MyAd['category']}[] = [
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
    return (
        <div className="flex flex-col w-full">
            <div className="mx-4 grid" style={{gridTemplateColumns: '1fr 2fr 1fr'}}>
                <div></div>
                <div>
                    {buttonsInfo.map((button, index) => {
                        return (
                            <button 
                                className={`h-10 w-20 border mx-1 hover:bg-lightGray transition-colors border-lightGray ${selectedButton === button.category ? 'bg-lightGray' : ''}`}
                                key={index} 
                                onClick={() => {
                                    dispatch(setCategory(button.category))
                                    dispatch(fetchAdsByCategory(button.category))
                                }}
                            >
                                {button.text}
                            </button>
                        )
                    })}
                </div>
                {modal && createPortal(<Modal closeModal={() => setModal(!modal)}/>, document.body)}
                {pop && createPortal(<CreatedEntity text="Вы успешно создали объявление" />, document.body)}
                <div className="justify-self-end">
                    <Button text={"Подать объявление"} onClick={() => setModal(!modal)} />
                </div>
            </div>
            <div className="flex flex-col p-4 my-4">
                {ads.map((ad, index) => {
                    return (
                        <div key={index} className="mt-6 p-2 flex flex-row w-full justify-between bg-lightGray h-32 items-center rounded-lg">
                                <div className="w-36 h-full">
                                    <img className="w-full h-full object-center object-cover" src={ad.photos?.length ? `http://localhost:3000/api/ads/photo/${ad.photos[0]}` : camera} alt="" />
                                </div>
                                <div className="text-left pl-4" style={{width: 'calc(100% - 18rem)'}}>
                                    <h2>{ad.name}</h2>
                                    <p>{ad.description}</p>
                                </div>
                                <div className="w-36">
                                    <Link to="/advertisments/$advId" params={(prev) => ({ ...prev, advId: `${ad.id}` })}>
                                        <Button text={"Подробнее"}/>
                                    </Link>
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}