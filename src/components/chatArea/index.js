import React, { useEffect } from 'react'
import { Button, Image, ContextAction } from '../../style'
import { ChatBox, Message, MessageContaienr, ChatDp, Msg, Time, ContextContainer, HiddenInput, MessageOuter, ClipBoard, NoMsgBox, VideoMsg, Video, MsgContant, VideoDesc, VideoTime } from '../style'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { MdContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { HiReply } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbArrowForwardUp } from 'react-icons/tb'
import { delete_Current_Message } from '../../redux/action'
import { useRef } from 'react'
import VideoPlayer from './VideoPlayer'

const ChatArea = () => {
    const { chatMessage, userProfile, BaseUrl, curChat } = useSelector(state => state)
    const [conActive, setConActive] = useState(false)
    const innerChatArea = useRef(null)
    const [curMessage, setCurMessage] = useState({
        time: '',
        message: '',
        keys: ''
    })
    const [isReact, setIsReact] = useState(false)
    const Dispatch = useDispatch()
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0
    })


    const handleCurrentMessage = (payload) => {
        setCurMessage({
            ...payload
        })
    }
    const handaleContextMenu = (event) => {
        event.preventDefault()
        setIsReact(false)
        const innerSize = innerChatArea.current.clientWidth
        if ((event.pageX - 400) + 190 > innerSize) {
            setMouse({
                x: event.pageX - 190,
                y: event.pageY
            })
        } else {
            setMouse({
                x: event.pageX,
                y: event.pageY
            })
        }
        setConActive(false)
        setTimeout(() => {
            setConActive(true)
        }, 100)

    }

    window.addEventListener('click', () => {
        setConActive(false)
    })

    // handle delete individual message 
    const hadaleDeleteMsg = () => {
        Dispatch(delete_Current_Message(curMessage?.time))
    }

    // copy clipboard 
    const copyMessage = async () => {
        await navigator.clipboard.writeText(curMessage?.message)
        setIsReact(true)
        setTimeout(() => {
            setIsReact(false)
        }, 1200)
    }
    // scroll 
    const scroll = useRef(null)
    useEffect(() => {
        scroll.current.scrollIntoView()
    }, [chatMessage])

    return (
        <MessageContaienr ref={innerChatArea}>
            <ContextContainer active={conActive} left={mouse.x} top={mouse.y}>
                <ContextAction>
                    <Button>
                        <HiReply />
                        <span>Reply</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button onClick={copyMessage}>
                        <MdContentCopy />
                        <span>Copy</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <MdOutlineAddReaction />
                        <span>React to message</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <TbArrowForwardUp />
                        <span>Forword</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <AiOutlineStar />
                        <span>Star</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button onClick={hadaleDeleteMsg}>
                        <RiDeleteBinLine />
                        <span>Delate</span>
                    </Button>
                </ContextAction>
            </ContextContainer>
            {/* ------------------ */}
            {
                chatMessage?.length ? chatMessage?.map((curMsg, keys) => {
                    const { message, isMe, time, msgType, file } = curMsg
                    const image = isMe ? `${BaseUrl}${userProfile?.profile_image}` : curChat?.image
                    const date = new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                    return (
                        <ChatBox isMe={isMe} key={keys}>
                            {
                                !isMe && <ChatDp>
                                    <Image src={image} />
                                </ChatDp>
                            }

                            <MessageOuter onContextMenu={(event) => {
                                handaleContextMenu(event)
                                handleCurrentMessage({ ...curMsg, keys })
                            }} isMe={isMe}>
                                {msgType === "text" && <Message isMe={isMe} >
                                    <Msg>
                                        {message}
                                    </Msg>
                                    <Time>
                                        {date}
                                    </Time>
                                </Message>}
                                {
                                    msgType === 'video' && <VideoMsg isMe={false} >
                                        <Msg>
                                            <Video>
                                                <video controls>
                                                    <source src={file} type="video/mp4" />
                                                </video>
                                            </Video >
                                            <MsgContant>
                                                <VideoDesc>
                                                    {message}
                                                </VideoDesc>
                                                <VideoTime>
                                                    {date}
                                                </VideoTime>
                                            </MsgContant>
                                        </Msg>
                                    </VideoMsg>
                                }
                                {
                                    msgType === 'image' && <VideoMsg isMe={false} >
                                        <Msg>
                                            <div>
                                                <img src={file} width="100%" height="100%"/>
                                            </div>
                                            <MsgContant>
                                                <VideoDesc>
                                                    {message}
                                                </VideoDesc>
                                                <VideoTime>
                                                    {date}
                                                </VideoTime>
                                            </MsgContant>
                                        </Msg>
                                    </VideoMsg>
                                }
                                {/* <HiddenInput /> */}
                            </MessageOuter>
                            <ClipBoard active={curMessage?.keys === keys && isReact ? true : false}>
                                copied
                            </ClipBoard>
                        </ChatBox>
                    )
                }) : <NoMsgBox>
                    No Message
                </NoMsgBox>
            }
            {/* <VideoPlayer /> */}
            {/* ------------------ */}
            <div ref={scroll} id="scroll"></div>
        </MessageContaienr>
    )
}

export default ChatArea
