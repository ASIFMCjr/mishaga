import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from 'app/store'
import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { Message } from 'shared/model/types'
import { refreshTokens } from './tokens'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useChat = (roomId: string | undefined, chat: string) => {
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<Array<Message>>([])
    useEffect(() => {
            if (!roomId) return
            const socketInstance = io(`http://localhost:3001/chat`, {
                query: { room: roomId },
                extraHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })

            socketInstance.on(chat, (messages) => {
                setMessages(oldMessages => {
                    const newArr = [...oldMessages]
                    newArr.unshift(messages)
                    return newArr
                })
            })

            socketInstance.on('exception', () => {
                socketInstance.disconnect()
                refreshTokens()
                socketInstance.connect()
            })
            setSocket(socketInstance)
            return () => {setMessages([])}
            
    },[chat, roomId])
    return {socket, messages}
}