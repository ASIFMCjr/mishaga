import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector, useChat } from 'shared/api/hooks'
import camera from 'assets/camera.jpeg'
import messagesImg from 'assets/messages.svg'
import send from 'assets/send.svg'
import { formatDate } from 'shared/api/formatDate'

export const AdvertismentPage = () => {
    const ad = useAppSelector(state => state.ads.ad)
    const user = useAppSelector(state => state.user.entities)
    const [selectedPhoto, setSelectedPhoto] = useState<string>('')
    const [modal, setModal] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const {socket, messages} = useChat(ad?.room, 'chat')
    useEffect(() => { ad && ad.photos && ad.photos.length && setSelectedPhoto(ad?.photos[0])},[ad])
    useEffect(() => {
        if (!socket) return
        socket.emit('getMessages')
    },[socket])
    const handleSendmessages = () => {
        socket && socket.emit( 'chat', input.current?.value)
        if (input && input.current) input.current.value = ''
    }
    const changePhoto = (direction: 'increment' | 'decrement'): void => {
        if (!ad || !ad.photos) return
        const photoIndex = ad.photos.findIndex((element) => element === selectedPhoto)
        let nextPhotoIndex = 0
        switch (direction) {
            case 'increment':
                nextPhotoIndex = photoIndex === ad.photos.length - 1 ? 0 : photoIndex + 1
                break;
            case 'decrement':
                nextPhotoIndex = photoIndex === 0 ? ad.photos.length - 1 : photoIndex - 1
        }
        setSelectedPhoto(ad.photos[nextPhotoIndex])
    }
    return ad && (
        <div className='flex flex-row w-full' style={{height: 'calc(100vh - 2.5rem - 80px)'}}>    
            <div className='lg:w-2/3 w-full overflow-y-scroll flex flex-col lg:border-r-2 px-6 lg:border-r-lightGray'>
                <h1>{ad.name}</h1>
                <div className='flex flex-col mt-6'>
                    <div className='w-full h-80 relative'>
                        <div onClick={() => changePhoto('decrement')} className='absolute left-0 top-0 flex flex-col justify-center w-16 h-full cursor-pointer text-xl'>{'<'}</div>
                        <img draggable='false' className="w-full object-center object-contain h-80" src={selectedPhoto ? `http://localhost:3000/api/ads/photo/${selectedPhoto}` : camera} alt="" />
                        <div onClick={() => changePhoto('increment')} className='absolute right-0 top-0 flex flex-col justify-center w-16 h-full cursor-pointer text-xl'>{'>'}</div>
                    </div>
                    {ad.photos && ad.photos.length && (
                        <div className='flex flex-row justify-evenly h-24 my-4'>
                            {ad.photos.map((photo, index) => {
                                return (
                                    <img 
                                        key={index}
                                        className="w-24 h-full object-center object-cover p-2" 
                                        src={`http://localhost:3000/api/ads/photo/${photo}`} 
                                        alt=""
                                        onClick={() => ad.photos && setSelectedPhoto(ad.photos[index])} 
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
                
                <div className='text-left mt-6'>
                    <b>Описание:</b>
                    <p className='pl-4'>{ad.description}</p>
                </div>
                <div className='flex flex-row justify-between mt-2'>
                    <div className='flex flex-col text-left'>
                        <b>Данные для связи</b>
                        <p>{ad.contactData}</p>
                    </div>
                    <div className='flex flex-col text-right'>
                        <b>Дата создания</b>
                        <p>{formatDate(ad.createdAt).split(' ').reverse().join(' ')}</p>
                    </div>
                </div>
            </div>
            <div className='lg:w-1/3 hidden px-6 lg:flex flex-col h-full justify-between'>
                <h1>Обсуждение</h1>
                <div className='flex flex-col justify-between mt-6' style={{height: 'calc(100% - 60px)'}}>
                    <div className='overflow-y-scroll flex flex-col-reverse' style={{height: 'calc(100% - 50px)'}}>
                        {user && messages.length ? messages.map((message, index) => {
                            return (
                                <div className={`text-left ${user.id === message.userId ? 'self-end' : 'self-start'} max-w-48 w-max m-2 p-2 bg-yellow rounded-xl`} key={index}>
                                    <div>{message.userName}</div>
                                    <div className='p-1 bg-lightYellow'>
                                        {message.text} {message.id}
                                    </div>
                                </div>
                            )
                        }) : <></>}
                    </div>
                    <div className='justify-self-end'>
                        <div className='flex flex-row w-full'>
                            <input ref={input} onKeyDown={(e) => e.key === 'Enter' && handleSendmessages()} type="text" className='border border-gray rounded-lg pl-2 w-full'/>
                            <button onClick={() => handleSendmessages()} className='bg-yellow rounded-full w-8 h-8 flex items-center justify-end p-1.5 ml-2'><img src={send} alt='send message' className='w-5 h-5'/></button>
                        </div>
                        {/* <div>
                            Анонимно
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={`bg-white border-2 border-lightGray overflow-hidden w-full sm:w-3/4 md:w-1/2 z-20 right-0 top-20 lg:hidden absolute ${modal ? 'translate-x-0' : 'translate-x-[100vw]'} transition-all ease-in-out duration-500`} style={{height: 'calc(100% - 80px)'}}>
                <div className='w-full px-6 lg:flex flex-col h-full justify-between relative'>
                    <button onClick={() => setModal((prev) => !prev)} className='absolute left-10 top-2'>{'<-'}</button>
                    <h1 className='mt-4'>Обсуждение</h1>
                    <div className='flex flex-col justify-between mt-6' style={{height: 'calc(100% - 85px)'}}>
                        <div className='overflow-y-scroll flex flex-col-reverse' style={{height: 'calc(100% - 50px)'}}>
                            {user && messages.length ? messages.map((message, index) => {
                                return (
                                    <div className={`text-left ${user.id === message.userId ? 'self-end' : 'self-start'} max-w-48 w-max m-2 p-2 bg-yellow rounded-xl`} key={index}>
                                        <div>{message.userName}</div>
                                        <div className='p-1 bg-lightYellow'>
                                            {message.text} {message.id}
                                        </div>
                                    </div>
                                )
                            }) : <></>}
                        </div>
                        <div className='justify-self-end'>
                            <div className='flex flex-row w-full'>
                                <input ref={input} onKeyDown={(e) => e.key === 'Enter' && handleSendmessages()} type="text" className='border border-gray rounded-lg pl-2 w-full'/>
                                <button onClick={() => handleSendmessages()} className='bg-yellow rounded-full w-8 h-8 flex items-center justify-end p-1.5 ml-2'><img src={send} alt='send message' className='w-5 h-5'/></button>
                            </div>
                            {/* <div>
                                Анонимно
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => setModal((prev) => !prev)} className='z-10 absolute lg:hidden inline-flex w-14 justify-center items-center h-14 rounded-full bg-yellow hover:bg-lightYellow transition-colors top-24 right-24'>
                <img src={messagesImg} alt="chat" className='w-8 h-8'/>
            </button>
        </div>
    )
}
