import { useRef, useState, useEffect } from 'react';
import { CiPlay1 } from 'react-icons/ci'
import { TbPlayerPause } from 'react-icons/tb'
import { BsTrash } from 'react-icons/bs'
import { ActionButton, AudioInput, AudioPreviewBox, PlayButton } from '../style'
function AudioPreview({ audioFile, clearSelectFile }) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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
                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
            </audio>

            {/* <button type='button' onClick={togglePlay}>{isPlaying ? <TbPlayerPause /> : <CiPlay1 />}</button>
                <input type="range" ref={progressRef} onChange={(e) => audioRef.current.currentTime = e.target.value} /> */}
            <AudioPreviewBox>
                <PlayButton type='button' onClick={togglePlay}>
                    {isPlaying ? <TbPlayerPause /> : <CiPlay1 />}
                </PlayButton>
                <AudioInput type="range" ref={progressRef} onChange={(e) => audioRef.current.currentTime = e.target.value} />
                <ActionButton type="button" onClick={clearSelectFile}>
                    <BsTrash />
                </ActionButton>
            </AudioPreviewBox>
        </>
    );
}

export default AudioPreview;
