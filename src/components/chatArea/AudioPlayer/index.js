import { useState, useRef } from 'react';
import {  AudioInput, AudioMessage, PlayButton } from '../../style';
import { TbPlayerPause } from 'react-icons/tb'
import { CiPlay1 } from 'react-icons/ci'
import { useEffect } from 'react';
function AudioPlayer({ audioFile }) {
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
    const handleTimeUpdate = () => {
        progressRef.current.value = audioRef.current.currentTime;
    };

    const handleLoadedMetadata = () => {
        progressRef.current.max = audioRef.current.duration;
    };
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [audioFile]);
    return (
        <>
            <audio ref={audioRef} style={{ display: 'none' }}>
                <source src={audioFile} />
            </audio>
            <AudioMessage>
                <PlayButton type='button' onClick={togglePlay}>
                    {isPlaying ? <TbPlayerPause /> : <CiPlay1 />}
                </PlayButton>
                <AudioInput type="range" ref={progressRef} onChange={(e) => audioRef.current.currentTime = e.target.value} />
            </AudioMessage>
        </>
    );
}

export default AudioPlayer;
