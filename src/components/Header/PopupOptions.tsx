import { useEffect, useState } from 'react';
import {
    BsFillMoonFill,
    BsFillSunFill,
    BsFillVolumeDownFill,
    BsFillVolumeMuteFill,
} from 'react-icons/bs';
import { TbConfetti, TbConfettiOff } from 'react-icons/tb';
import { useTheme } from '../../contexts/ThemeContext';
import { getStorage, setStorage } from '../../utils/util';

export const PopupOptions: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [confettiEnabled, setConfettiEnabled] = useState<boolean>(false);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const savedConfetti = await getStorage<boolean>('confettiEnabled');
                const savedAudio = await getStorage<boolean>('audioEnabled');

                setConfettiEnabled(savedConfetti !== undefined ? savedConfetti : false);
                setAudioEnabled(savedAudio !== undefined ? savedAudio : false);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleConfetti = async () => {
        const newConfettiState = !confettiEnabled;
        setConfettiEnabled(newConfettiState);
        try {
            await setStorage('confettiEnabled', newConfettiState);
        } catch (error) {
            console.error('Error saving confetti setting:', error);
        }
    };

    const toggleAudio = async () => {
        const newAudioState = !audioEnabled;
        setAudioEnabled(newAudioState);
        try {
            await setStorage('audioEnabled', newAudioState);
        } catch (error) {
            console.error('Error saving audio setting:', error);
        }
    };

    return (
        <div className="flex items-end flex-col mr-4 -mt-24 space-y-2">
            <div
                onClick={toggleAudio}
                className="flex items-center justify-center w-7 h-7 cursor-pointer"
            >
                {audioEnabled ? (
                    <BsFillVolumeDownFill className="w-6 h-6" />
                ) : (
                    <BsFillVolumeMuteFill className="w-6 h-6" />
                )}
            </div>
            <div
                onClick={toggleTheme}
                className="flex items-center justify-center w-7 h-7 cursor-pointer"
            >
                {theme === 'light' ? (
                    <BsFillSunFill className="w-6 h-6" />
                ) : (
                    <BsFillMoonFill className="w-5 h-5" />
                )}
            </div>
            <div
                onClick={toggleConfetti}
                className="flex items-center justify-center w-7 h-7 cursor-pointer"
            >
                {confettiEnabled ? (
                    <TbConfetti className="w-6 h-6" />
                ) : (
                    <TbConfettiOff className="w-6 h-6" />
                )}
            </div>
        </div>
    );
};
