import React, { useState } from 'react'
import { FooterContaienr, FileContainer, ChatTypeContaienr, ChatActionCotainer, Label, SelectButton, SelectFileBox, Chat, Send, FileList, FileIcon, Title } from '../style'
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoSendSharp, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_chat, store_message } from '../../redux/action';
import Ring from './ring01.mp3'
import axios from 'axios';
const FooterBody = () => {
    const { socket, curChat, userProfile, BaseUrl } = useSelector(state => state)
    const dispatch = useDispatch()
    const [showFile, setShowFile] = useState(false)
    const [typeMsg, setTypeMsg] = useState('')
    const typingHandal = event => {
        setTypeMsg(event.target.value)
    }

    const handalImageSend = event => {
        console.log(event.target.files[0])
    }

    // video handler 
    const [msgType, setMsgType] = useState('text')
    const [File, setFile] = useState()
    const handleFileChange = event => {
        const file = event.target.files[0]
        setMsgType(file?.type.split('/')[0])
        setFile(file)
        setShowFile(false)
    }

    const sendFilehandler = async (payload) => {
        const fileData = new FormData()
        fileData.append("send_file", payload)

        const res = await axios.post(`${BaseUrl}/upload_file`, fileData)
        return await res?.data?.fileUrl
    }

    const sendHandal = async (event) => {
        event.preventDefault()
        const fileLink = File ? await sendFilehandler(File) : ''
        setTypeMsg('')
        setMsgType('text')
        setFile()
        if (typeMsg || fileLink) {
            const data = {
                message: typeMsg,
                file: fileLink,
                msgType: msgType,
                time: new Date(),
                sender: {
                    image: userProfile?.profile_image,
                    username: userProfile?.username,
                    chatID: socket.id
                },
                receiver: {
                    username: curChat?.contact,
                    chatID: curChat?.chatID,
                },
            }
            socket.emit('Send Message', data)
            const chat = {
                message: typeMsg,
                msgType: msgType,
                file: fileLink,
                time: new Date(),
                isMe: true,
            }
            dispatch(store_message(curChat?.contact, chat))
            dispatch(fetch_chat(curChat?.contact))
            new Audio(Ring).play()
        }
    }


    return (
        <FooterContaienr onSubmit={sendHandal}>
            {/* left  */}
            <FileContainer>
                <SelectButton type='button' x={showFile ? 45 : 0} onClick={() => setShowFile(!showFile)}>
                    <BsPlusLg />
                </SelectButton>
                <SelectFileBox show={showFile ? 'visible' : 'hidden'}>
                    <FileList show={showFile}>
                        <input type="file" id='pdf' name='pdf' accept='application/pdf' />
                        <FileIcon>
                            <BsFileEarmarkPdf />
                            <Label htmlFor='pdf'></Label>
                            <Title htmlFor='pdf'>PDF</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='picture' name="picture" accept='image/*' onChange={handleFileChange} />
                        <FileIcon>
                            <BiImages />
                            <Label htmlFor='picture'></Label>
                            <Title htmlFor='picture'>Image</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='video' name="video" accept='video/*' onChange={handleFileChange} />
                        <FileIcon>
                            <IoVideocamOutline />
                            <Label htmlFor='video'></Label>
                            <Title htmlFor='video'>Video</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='music' name="music" accept=".mp3" />
                        <FileIcon>
                            <IoIosMusicalNotes />
                            <Label htmlFor='music'></Label>
                            <Title htmlFor='music'>Music</Title>
                        </FileIcon>
                    </FileList>
                </SelectFileBox>
            </FileContainer>
            {/* middle  */}
            <ChatTypeContaienr>
                <Chat placeholder="type" value={typeMsg} onChange={typingHandal} />
            </ChatTypeContaienr>
            {/* right  */}
            <ChatActionCotainer>
                <Send type='submit' >
                    <IoSendSharp />
                </Send>
            </ChatActionCotainer>
        </FooterContaienr>
    )
}

export default FooterBody