import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ControlButtons } from '../components/Buttons/ControlButtons';
import Copyright from '../components/Footer';
import { MainHeader } from '../components/Header';
import { TimerInput } from '../components/Inputs/TimerInput';
import { getStorage, setStorage } from '../utils/util';

export const MainPopup = () => {
    const [showRestartMessage, setShowRestartMessage] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getStorage<boolean>('isFirstOpen').then((isFirstOpen) => {
            if (isFirstOpen === undefined) {
                setStorage('isFirstOpen', false);
                setShowRestartMessage(true);
            }
        });
    }, []);

    return (
        <div className="min-w-[360px] h-[320px] max-w-sm mx-auto p-3 font-inter bg-gothamBlack-50 dark:bg-gothamBlack-400 dark:text-white">
            {showRestartMessage && (
                <div className="p-3 mb-4 text-sm text-yellow-700 bg-yellow-200 rounded">
                    {t('restartMessage')}
                </div>
            )}
            <MainHeader />
            <TimerInput />
            <ControlButtons />
            <Copyright />
        </div>
    );
};
