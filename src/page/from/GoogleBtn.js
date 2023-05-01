import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { chat_List, myProfile } from '../../redux/action';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const clientID = '10579317542-0cckno8uppvvst3hbn0k9n4en9e6qvql.apps.googleusercontent.com'
const GoogleBtn = () => {
    const { BaseUrl, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [, setCookies] = useCookies()
    const navigate = useNavigate()
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientID: clientID,
                scope: ''
            })
        }
        gapi.load('client:auth2', start)
    })

    const handleSuccess = (response) => {
        const { googleId, email, imageUrl, name } = response?.profileObj
        const f_name = name.split(' ')[0]
        const l_name = name.split(' ')[1]
        const googleData = {
            password: googleId,
            email: email,
            f_name,
            l_name,
            username: email.split("@")[0],
            profile_image: imageUrl,
        }
        axios.post(`${BaseUrl}/google_auth`, googleData).then((res) => {
            const { username, token } = res?.data
            axios.get(`${BaseUrl}/profile/${username}`, {
                headers: { token: token }
            }).then((result) => {
                dispatch(myProfile(result?.data?.data))
                axios.get(`${BaseUrl}/chatList/${username}`, {
                    headers: { token }
                }).then((res) => {
                    dispatch(chat_List(res?.data?.data))
                    socket.emit('refresh', username)
                    setCookies('auth', {
                        token, username
                    })
                    navigate('/')
                }).catch((error) => {

                })
            }).catch((error) => {
                console.log(error)
            })
        })
    };

    const handleFailure = (response) => {
        console.log('Google authentication failed:', response);
    };

    return (
        <GoogleLogin
            className="field google"
            clientId={clientID}
            buttonText="Sign in with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleBtn;
