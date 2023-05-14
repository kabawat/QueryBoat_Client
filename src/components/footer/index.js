import React, { useState } from 'react'
import { FooterContaienr, FileContainer, ChatTypeContaienr, ChatActionCotainer, Label, SelectButton, SelectFileBox, Chat, Send, FileList, FileIcon, Title, ImagePreview, SelectedFileAction, SelectedInner, ActionButton, AudioPreviewBox, } from '../style'
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoSendSharp, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { recive_message } from '../../redux/action';
import Ring from './ring01.mp3'
import { BsTrash } from 'react-icons/bs'
import axios from 'axios';
import VideoPreview from './video-preview';
import AudioPreview from './audio-preview';
const FooterBody = () => {
    const { socket, curChat, userProfile, BaseUrl, chatUrl } = useSelector(state => state)
    const dispatch = useDispatch()
    const [showFile, setShowFile] = useState(false)
    const [typeMsg, setTypeMsg] = useState('')
    const typingHandal = event => {
        setTypeMsg(event.target.value)
    }
    // video handler 
    const [msgType, setMsgType] = useState('text')
    const [fileLink, setFileLink] = useState()
    const [sendFile, setSendFile] = useState()
    const handleFileChange = event => {
        const file = event.target.files[0];
        setSendFile(file);

        const reader = new FileReader();
        setMsgType(file?.type.split('/')[0]);

        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result;
                setFileLink(base64String);
            };
        }
        setShowFile(false);

        // Reset the value of the file input field
        event.target.value = '';
    };

    const sendHandal = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("message", typeMsg)
        formData.append("msgType", msgType)
        formData.append("time", new Date())
        formData.append("sender", userProfile?.username)
        formData.append("receiver", curChat?.contact)
        formData.append("chatFile", curChat?.chatFile)

        if (typeMsg || sendFile) {
            if (sendFile) {
                formData.append("file", sendFile)
            }
            axios.post(`${BaseUrl}/send_message`, formData).then((res) => {
                const data = {
                    chatID: res?.data?.chatID,
                    chatFile: curChat?.chatFile,
                    sender: {
                        username: userProfile?.username,
                        chatID: socket.id
                    },
                }
                axios.post(`${BaseUrl}/get_message`, { chatFile: curChat?.chatFile }).then((res) => {
                    const { data } = res?.data
                    dispatch(recive_message(data))
                })
                socket.emit('Send Message', data)
            })
            new Audio(Ring).play()
        }
        setTypeMsg('')
        setMsgType('text')
        setFileLink()
        setSendFile('')
    }

    const clearSelectFile = () => {
        setFileLink('')
        setSendFile('')
    }
    return (
        <FooterContaienr onSubmit={sendHandal}>
            {
                sendFile && msgType === "audio" && <AudioPreview audioFile={sendFile} clearSelectFile={clearSelectFile} />
            }
            {sendFile && <ImagePreview>
                <SelectedInner>
                    {
                        msgType === "image" && <img src={fileLink} />
                    }
                    {
                        msgType === "video" && <VideoPreview videoFile={sendFile} />
                    }

                    <SelectedFileAction>
                        <ActionButton type="button" onClick={clearSelectFile}>
                            <BsTrash />
                        </ActionButton>
                    </SelectedFileAction>
                </SelectedInner>
            </ImagePreview>}

            {/* left  */}
            <FileContainer>
                <SelectButton type='button' x={showFile ? 45 : 0} onClick={() => setShowFile(!showFile)}>
                    <BsPlusLg />
                </SelectButton>
                <SelectFileBox show={showFile ? 'visible' : 'hidden'}>
                    <FileList type='button' show={showFile}>
                        <input type="file" id='pdf' name='pdf' accept='application/pdf' disabled />
                        <FileIcon>
                            <BsFileEarmarkPdf />
                            <Label htmlFor='pdf'></Label>
                            <Title htmlFor='pdf'>PDF</Title>
                        </FileIcon>
                    </FileList>
                    <FileList type='button' show={showFile}>
                        <input type="file" id='picture' name="picture" accept='image/*' onChange={handleFileChange} />
                        <FileIcon>
                            <BiImages />
                            <Label htmlFor='picture'></Label>
                            <Title htmlFor='picture'>Image</Title>
                        </FileIcon>
                    </FileList>
                    <FileList type='button' show={showFile}>
                        <input type="file" id='video' name="video" accept='video/*' onChange={handleFileChange} />
                        <FileIcon>
                            <IoVideocamOutline />
                            <Label htmlFor='video'></Label>
                            <Title htmlFor='video'>Video</Title>
                        </FileIcon>
                    </FileList>
                    <FileList type='button' show={showFile}>
                        <input type="file" id='music' name="audio" accept=".mp3" onChange={handleFileChange} />
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