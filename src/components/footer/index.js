import React, { useState } from 'react'
import { FooterContaienr, FileContainer, ChatTypeContaienr, ChatActionCotainer, SelectButton, SelectFileBox, Chat, Send, FileList, FileIcon, Title } from '../style'
import { BsPlusLg, BsFileEarmarkPdf } from 'react-icons/bs';
import { IoSendSharp, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMusicalNotes } from 'react-icons/io';
import { BiImages } from 'react-icons/bi';
const FooterBody = () => {
    const [showFile, setShowFile] = useState(false)
    const [typeMsg, setTypeMsg] = useState('')
    const typingHandal = (event) => {
        setTypeMsg(event.target.value)
    }
    const sendHandal = (event) => {
        event.preventDefault()
        setTypeMsg('')
        if (typeMsg) {
            console.log(typeMsg)
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
                        <input type="file" id='pdf' name='pdf' />
                        <FileIcon htmlFor='pdf'>
                            <BsFileEarmarkPdf />
                            <Title>PDF</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='picture' name="picture" />
                        <FileIcon htmlFor='picture'>
                            <BiImages />
                            <Title>Image</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='video' name="video" />
                        <FileIcon htmlFor='video'>
                            <IoVideocamOutline />
                            <Title>Video</Title>
                        </FileIcon>
                    </FileList>
                    <FileList show={showFile}>
                        <input type="file" id='music' name="music" />
                        <FileIcon htmlFor='music'>
                            <IoIosMusicalNotes />
                            <Title>Music</Title>
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
                <Send type='submit'>
                    <IoSendSharp />
                </Send>
            </ChatActionCotainer>
        </FooterContaienr>
    )
}

export default FooterBody