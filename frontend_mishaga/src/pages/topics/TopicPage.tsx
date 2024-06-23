import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector, useChat } from 'shared/api/hooks'
import send from 'assets/send.svg'
import { changeCountTopic } from 'entities/topics/api'
import { fetchTopic } from 'entities/topics/model/topicSlice'

export const TopicPage = () => {
  const dispatch = useAppDispatch()
  const topic = useAppSelector(state => state.topics.topic)
  const user = useAppSelector(state => state.user.entities)
  const {socket, messages} = useChat(topic?.room, 'topicsChat')
  const input = useRef<HTMLInputElement>(null)
  const isActive = topic && user && topic.users.some((u) => u.id === user.id)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [showUsers, setShowUsers] = useState<boolean>(false)
  useEffect(() => {
      if (!socket) return
      socket.emit('getTopicsMessages')
  },[socket])
  const handleSendmessages = () => {
      socket && socket.emit( 'topicsChat', input.current?.value)
      if (input && input.current) input.current.value = ''
  }
  const updateJoin = async (sign: '+' | '-') => {
    if (!topic) return
    setIsPressed(true)
    await changeCountTopic({sign: sign, id: topic.id})
    await dispatch(fetchTopic(topic.id))
    setIsPressed(false)
  }
  return topic && (
    <div className='w-full h-full'>
      
      <div className='px-6 flex flex-col h-full w-full justify-between relative'>
        <div className='absolute'>
            {isActive
                ? <button className='bg-yellow p-2 w-16' disabled={isPressed} onClick={() => updateJoin('-')}>Выйти</button> 
                : <button className='bg-yellow p-2 w-16' disabled={isPressed} onClick={() => updateJoin('+')}>Войти</button>
            }
        </div>
                <h1 className='mb-2'>{topic.name}</h1>
                <div className='flex flex-col justify-between w-full h-full mt-4'>
                    <div className='overflow-y-scroll flex flex-col-reverse' style={{height: 'calc(100vh - 250px)'}}>
                        {user && messages.length ? messages.map((message, index) => {
                            return (
                                <div className={`text-left ${user.id === message.userId ? 'self-end' : 'self-start'} max-w-48 w-max m-2 p-2 bg-yellow rounded-xl`} key={index}>
                                    <div className='text-sm'>{message.userName}</div>
                                    <div className='p-1 bg-lightYellow'>
                                        {message.text}
                                    </div>
                                </div>
                            )
                        }) : <></>}
                    </div>
                    {isActive && !showUsers && <button onClick={() => setShowUsers(true)} className='absolute right-0 top-0 py-2 flex w-24 justify-center items-center bg-white rounded-xl flex-col border border-gray overflow-y-scroll max-h-96'>
                        участники
                    </button>}
                    {isActive && showUsers && <div onClick={() => setShowUsers(false)} className='absolute cursor-pointer right-0 top-0 py-2 flex w-96 bg-white rounded-xl flex-col border border-gray overflow-y-scroll max-h-96'>
                        {
                            topic.users.map((user) => <p key={user.id}>{user.fio}</p>)
                        }
                    </div>}
                    <div className='justify-self-end flex flex-col justify-start'>
                        <div className='flex flex-row w-full mt-4'>
                            <input disabled={!isActive} ref={input} onKeyDown={(e) => e.key === 'Enter' && handleSendmessages()} type="text" className='border border-gray rounded-lg pl-2 w-full'/>
                            <button onClick={() => handleSendmessages()} className='bg-yellow rounded-full w-8 h-8 flex items-center justify-end p-1.5 ml-2'><img src={send} alt='send message' className='w-5 h-5'/></button>
                        </div>
                            {/* <div className='text-left text-sm mt-2 flex flex-row'>
                                <input type="checkbox" name="" id="" className='mr-2'/>
                                <p>Анонимно</p>
                            </div> */}
                    </div>
                </div>
                
            </div>
    </div>
  )
}
