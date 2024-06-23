import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { formatDate } from "shared/api/formatDate"
import { useAppSelector } from "shared/api/hooks"
import { Button, CreatedEntity } from "shared/ui"
import { EventModal as Modal } from "entities/events/ui/EventModal"

export const EventsPage = () => {
    const events = useAppSelector(state => state.events.events)
    const [modal, setModal] = useState<boolean>(false)
    const pop = useAppSelector(state => state.shared.pop)
    useEffect(() =>  {document.body.style.overflow = modal ?'hidden' : 'auto'} ,[modal])
    return (
        <div className="flex flex-col w-full">
            {modal && createPortal(<Modal closeModal={() => setModal(!modal)}/>, document.body)}
            {pop && createPortal(<CreatedEntity text="Вы успешно создали мероприятие" />, document.body)}
            <div className="self-end mx-4">
                <Button text={"Создать мероприятие"} onClick={() => setModal(!modal)} />
            </div>
            <h1 className="self-start m-4">Мероприятия</h1>
            <div className="flex flex-row flex-wrap justify-between">
                {events.map((event, i) => {
                    return (
                        <Link className="w-full md:w-auto md:min-w-64 lg:min-w-56 basis-auto grow shrink" key={i} to="/events/$eventId" params={(prev) => ({ ...prev, eventId: `${event.id}` })}>
                            <div 
                                className={`w-full my-4 md:mx-4 p-2.5 justify-between rounded-lg flex flex-col md:w-auto h-40 ${!event.eventImage && 'bg-gray'} text-white`}
                                style={{
                                    backgroundImage: event.eventImage ? `url(http://localhost:3000/api/events/photo/${event.eventImage})` : '',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="self-end">
                                    <p style={{textShadow: '1px 1px 2px gray'}} className="text-lightGray opacity-95">{formatDate(event.date)}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <h2 style={{textShadow: '1px 1px 2px gray'}} className="text-xl">{event.name}</h2>
                                    <p style={{textShadow: '1px 1px 2px gray'}} className="text-lightGray opacity-95">{event.ready}/{event.count}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}