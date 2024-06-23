import { fetchAddUserToEvent } from "entities/events/model/eventSlice"
import { formatDate } from "shared/api/formatDate"
import { useAppDispatch, useAppSelector } from "shared/api/hooks"
import { Button } from "shared/ui"

export const EventPage = () => {
    const dispatch = useAppDispatch()
    const event = useAppSelector(state => state.events.event)
    if (!event) return
    const isButtonDisabled = event.users?.length ? true : false
    return event.name && (
        <div className="flex flex-col m-auto w-full" style={{ height: 'calc(100vh - 120px)', maxWidth: '600px'}}>
            <div className="text-white h-3/6 p-6 flex flex-col justify-between bg-gray" style={{ backgroundImage: `url(http://localhost:3000/api/events/photo/${event.eventImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="self-start flex flex-row justify-between w-full">
                    <h1 style={{textShadow: '1px 1px 2px gray'}}>{event.name}</h1>
                    <p style={{textShadow: '1px 1px 2px gray'}}>{formatDate(event.date)}</p>
                </div>
                <h1 style={{textShadow: '1px 1px 2px gray'}} className="self-end">{event.ready}/{event.count}</h1>
            </div>
            <div className="text-left p-6">    
                <p className="mb-4">{event.description}</p>
                <Button 
                    disabled={isButtonDisabled} 
                    text={"Записаться на мероприятие"} 
                    onClick={() => dispatch(fetchAddUserToEvent(event.id))} 
                />
            </div>
         </div>
    )
}