import React from "react";
// import video from '../../../../assets/ram.mp4'
import { ChatBox, ChatDp, Video, VideoMsg, MassageOuter, Msg, MsgContant, VideoDesc, HiddenInput, VideoTime } from "../../style";
import { Image } from "../../../style";
const VideoPlayer = () => {
    return (
        <ChatBox isMe={false} >
            <ChatDp>
                <Image src='https://lh3.googleusercontent.com/a/AGNmyxZIk_3DjTWcUXXLNHmjj1Q30BsmRleDi9JQFiWo=s96-c' />
            </ChatDp>
            <MassageOuter isMe={false}>
                <VideoMsg isMe={false} >
                    <Msg>
                        <Video>
                            <video controls>
                                <source src='https://www.youtube.com/watch?v=dQw4w9WgXcQ' type="video/mp4" />
                            </video>
                        </Video >
                        <MsgContant>
                            <VideoDesc>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus tempore explicabo laudantium omnis odio, dolores fuga vel. A voluptatem nostrum nulla, asperiores quae provident aperiam suscipit sequi. Cupiditate, ea mollitia.
                            </VideoDesc>
                            <VideoTime>
                                12:10
                            </VideoTime>
                            <HiddenInput id={0} />
                        </MsgContant>
                    </Msg>
                </VideoMsg>
            </MassageOuter>
        </ChatBox>
    );
};

export default VideoPlayer;
