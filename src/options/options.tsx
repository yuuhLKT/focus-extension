import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoImage from '../assets/focus-outline.png';
import Copyright from '../components/Footer';
import LanguageSelector from '../components/Selector/LanguageSelector';
import Switch from '../components/SwitchToggle';
import { useTheme } from '../contexts/ThemeContext';
import { getStorage, setStorage } from '../utils/util';

const Options: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [playAudio, setPlayAudio] = useState<boolean>(false);
    const [isConfettiEnabled, setConfettiEnabled] = useState<boolean>(false);
    const [isNotificationEnabled, setNotificationEnabled] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const savedAudio = await getStorage<boolean>('audioEnabled');
                const savedConfetti = await getStorage<boolean>('confettiEnabled');
                const savedNotification = await getStorage<boolean>('notificationEnabled');

                setPlayAudio(savedAudio !== undefined ? savedAudio : false);
                setNotificationEnabled(savedNotification !== undefined ? savedNotification : false);
                setConfettiEnabled(savedConfetti !== undefined ? savedConfetti : false);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                await setStorage('audioEnabled', playAudio);
                await setStorage('confettiEnabled', isConfettiEnabled);
                await setStorage('notificationEnabled', isNotificationEnabled);
            } catch (error) {
                console.error('Error saving settings:', error);
            }
        };

        saveSettings();
    }, [playAudio, isConfettiEnabled, isNotificationEnabled]);

    const darkModeText = theme === 'dark' ? t('disableDarkMode') : t('enableDarkMode');

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gothamBlack-50 dark:bg-gothamBlack-600 font-inter">
            <div className="flex flex-col w-full max-w-3xl space-y-4 rounded-2xl bg-gothamBlack-100 p-8 text-lg text-black dark:bg-gothamBlack-300">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img src={logoImage} alt="Logo" className="h-10 w-10 mr-4" />
                        <h1 className="text-2xl font-bold dark:text-white">
                            {t('optionsPageTitle')}
                        </h1>
                    </div>
                    <LanguageSelector />
                </div>
                <div className="font-bold dark:text-white">
                    <Switch
                        checked={theme === 'dark'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTheme(e.target.checked ? 'dark' : 'light')
                        }
                        label={`${darkModeText} ${theme === 'dark' ? '☀️' : '🌙'}`}
                        size={24}
                    />
                    <Switch
                        checked={playAudio}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPlayAudio(e.target.checked)
                        }
                        label={`${t('audioOptions')} ${playAudio ? '🔊' : '🔇'}`}
                        size={24}
                    />
                    <Switch
                        checked={isConfettiEnabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfettiEnabled(e.target.checked)
                        }
                        label={`${t('confettiEnabled')} ${isConfettiEnabled ? '🎉' : ''}`}
                        size={24}
                    />
                    <Switch
                        checked={isNotificationEnabled}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNotificationEnabled(e.target.checked)
                        }
                        label={t('notifications')}
                        size={24}
                    />
                    <div className="flex items-center justify-center">
                        <Copyright />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;
