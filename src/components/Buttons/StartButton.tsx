import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillPlayFill } from 'react-icons/bs';
import { TimerContext } from '../../contexts/TimerContext';
import { TimerContextType } from '../../types/TimerContextTypes';

export default function StartButton() {
    const { t } = useTranslation();
    const context = useContext(TimerContext);

    const { startTimer, isRunning, isPaused } = context as TimerContextType;

    return (
        <button
            onClick={startTimer}
            disabled={isRunning && !isPaused}
            className={classNames(
                'flex flex-row items-center gap-1 border-2 duration-200 font-semibold rounded-md px-2 py-1 text-lg ',
                {
                    'border-solid border-emeraldGreen-800 bg-emeraldGreen-500 text-black hover:bg-emeraldGreen-200 dark:bg-emeraldGreen-700 dark:border-emeraldGreen-800 dark:hover:bg-emeraldGreen-600 dark:hover:border-emeraldGreen-700':
                        !isRunning || isPaused,
                    'border-simplyRed-600 bg-simplyRed-50 text-gothamBlack-200 cursor-not-allowed dark:bg-simplyRed-100':
                        isRunning && !isPaused,
                }
            )}
        >
            <BsFillPlayFill className="w-5 h-5" />
            <div className="-mt-0.5">{t('run')}</div>
        </button>
    );
}
