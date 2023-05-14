import React, { useEffect } from 'react'
import { Button, Image, ContextAction } from '../../style'
import { ChatBox, Message, MessageContaienr, ChatDp, Msg, Time, ContextContainer, HiddenInput, MessageOuter, ClipBoard, NoMsgBox, VideoMsg, Video, MsgContant, VideoDesc, VideoTime, ChatImage, AudioMsgBox, AudioTime, AudioDesc } from '../style'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { MdContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { HiReply, HiOutlineCloudDownload } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbArrowForwardUp } from 'react-icons/tb'
import { useRef } from 'react'
import axios from 'axios'
import { recive_message } from '../../redux/action'
import AudioPlayer from './AudioPlayer'

const ChatArea = () => {
    const { userProfile, chatMessage, BaseUrl, curChat, socket } = useSelector(state => state)
    const [conActive, setConActive] = useState(false)
    const innerChatArea = useRef(null)
    const [curMessage, setCurMessage] = useState({
        time: '',
        message: '',
        keys: ''
    })
    const [isReact, setIsReact] = useState(false)
    const [reaction, setReaction] = useState(false)

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
    const hadaleDeleteMsg = async () => {
        axios.post(`${BaseUrl}/delete_message`, { id: curMessage?._id, chatFile: curChat?.chatFile, file: curMessage?.file }).then((res) => {
            axios.post(`${BaseUrl}/get_message`, { chatFile: curChat?.chatFile }).then((res) => {
                const { data } = res?.data
                Dispatch(recive_message(data))
            })
        })
    }

    // copy clipboard 
    const copyMessage = async () => {
        await navigator.clipboard.writeText(curMessage?.message)
        setReaction('copied')
        setIsReact(true)
        setTimeout(() => {
            setIsReact(false)
        }, 1200)
    }

    // download file 
    const downloadFile = () => {
        const url = `${BaseUrl}${curMessage?.file}`;
        fetch(url).then((response) => {
            response.arrayBuffer().then((buffer) => {
                const fileUrl = window.URL.createObjectURL(new Blob([buffer]));
                const fileLink = document.createElement('a');
                fileLink.href = fileUrl;
                fileLink.setAttribute("download", `queryboat-${url.split("/")[3]}-${url.split("/")[4]}`)
                document.body.appendChild(fileLink);
                fileLink.click();

                setReaction('Saved!')
                setIsReact(true)
                setTimeout(() => {
                    setIsReact(false)
                }, 1200)
            });
        })
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
                {
                    curMessage?.message && <ContextAction>
                        <Button onClick={copyMessage}>
                            <MdContentCopy />
                            <span>Copy</span>
                        </Button>
                    </ContextAction>
                }
                {
                    curMessage?.file && <ContextAction>
                        <Button onClick={downloadFile}>
                            <HiOutlineCloudDownload />
                            <span>Download</span>
                        </Button>
                    </ContextAction>
                }

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
            {/* ------------------ */
            }
            {
                chatMessage?.length ? chatMessage?.map((curMsg, keys) => {
                    const { message, sender, time, msgType, file } = curMsg
                    const date = new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                    return (
                        <ChatBox isMe={sender === userProfile?.username} key={keys}>
                            {
                                !(sender === userProfile?.username) && <ChatDp>
                                    <Image src={curChat?.image} />
                                </ChatDp>
                            }

                            <MessageOuter onContextMenu={(event) => {
                                handaleContextMenu(event)
                                handleCurrentMessage({ ...curMsg, keys })
                            }} isMe={sender === userProfile?.username}>
                                {msgType === "text" && <Message isMe={sender === userProfile?.username} >
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
                                                    <source src={`${BaseUrl}${file}`} type="video/mp4" />
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
                                            <ChatImage>
                                                <img src={`${BaseUrl}${file}`} />
                                            </ChatImage>
                                            <MsgContant>
                                                {
                                                    message && <VideoDesc>
                                                        {message}
                                                    </VideoDesc>
                                                }

                                                <VideoTime>
                                                    {date}
                                                </VideoTime>
                                            </MsgContant>
                                        </Msg>
                                    </VideoMsg>
                                }
                                {
                                    msgType === 'audio' && <AudioMsgBox isMe={false} >
                                        <Msg>
                                            <AudioPlayer audioFile={`${BaseUrl}${file}`} />
                                            <MsgContant>
                                                {
                                                    message ? <>
                                                        <AudioDesc>
                                                            {message}
                                                        </AudioDesc>
                                                        <VideoTime>
                                                            {date}
                                                        </VideoTime>
                                                    </> : <AudioTime>{date}</AudioTime>
                                                }


                                            </MsgContant>
                                        </Msg>
                                    </AudioMsgBox>
                                }
                            </MessageOuter>
                            <ClipBoard active={curMessage?.keys === keys && isReact ? true : false}>
                                {reaction}
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
