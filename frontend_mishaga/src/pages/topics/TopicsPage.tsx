import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'shared/api/hooks'
import { Button, CreatedEntity } from 'shared/ui'
import { TopicModal as Modal } from 'entities/topics/ui/TopicModal'
import { Link } from '@tanstack/react-router'
import { formatDate } from 'shared/api/formatDate'
import { fetchTopics } from 'entities/topics/model/topicSlice'

export const TopicsPage = () => {
  const topics = useAppSelector(state => state.topics.topics)
  const pop = useAppSelector(state => state.shared.pop)
  const [modal, setModal] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const intervalId = setInterval(() => {dispatch(fetchTopics())}, 15000)
    return () => clearInterval(intervalId)
  },[])
  return (
    <div className='w-full'>
      <div>
        <div className="grid" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>       
          {modal && createPortal(<Modal closeModal={() => setModal(!modal)}/>, document.body)}
          {pop && createPortal(<CreatedEntity text="Вы успешно создали обсуждение" />, document.body)}
          <div></div>
          <div></div>
          <div className="justify-self-end">
              <Button text={"Новая тема"} onClick={() => setModal(!modal)} />
          </div>
        </div>
      </div>
      <div>
        {topics.map(({category, topics}) => {
          return (
            <div className='flex flex-col mt-6' key={category}>
              <div className='flex flex-row w-full justify-between'>
                <div className='w-full flex flex-row items-center
                before:content-[""] before:inline-flex before:w-6 before:h-6 before:rounded-full before:bg-yellow before:justify-self-start
                after:contenr-[""] after:inline-flex after:w-full after:h-1 after:rounded-full after:bg-yellow after:ml-4
                '></div>
                <h2 className='justify-self-end w-32 text-right pr-2'>{category}</h2>
              </div>
              <div className='pl-4'>
                {topics.map((topic, index) => {
                  return (
                    <Link className='mt-4 flex flex-row justify-between h-16 w-full bg-lightGray rounded-lg px-4 items-center' key={index} to="/topics/$topicId" params={(prev) => ({ ...prev, topicId: `${topic.id}` })}>
                      <div>
                        <p>{topic.name}</p>
                        <p>участников: {topic.usersCount}</p>
                        </div>
                      <div>
                        <p>Сообщений:</p>
                        <p>{topic.messagesCount}</p>
                      </div>
                      <div>
                        <p>Последнее обновление</p>
                        <p>{formatDate(topic.updatedAt).split(' ').reverse().join(' ')}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            
          )
        })}
      </div>
    </div>
  )
}
