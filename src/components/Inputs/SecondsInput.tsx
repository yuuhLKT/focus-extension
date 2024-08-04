import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerContext } from '../../contexts/TimerContext';
import { TimerContextType } from '../../types/TimerContextTypes';
import { handleTimerInputChange } from '../../utils/handleInputs';

export default function SecondsInput() {
    const context = useContext(TimerContext);
    const { t } = useTranslation();
    if (!context) {
        throw new Error('SecondsInput must be used within a TimerProvider');
    }
    const { seconds, setSeconds, isRunning } = context as TimerContextType;

    return (
        <span className="flex flex-col items-center">
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={seconds.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTimerInputChange(e, setSeconds, 59)
                }
                className={classNames(
                    'w-10 text-center text-2xl outline-none border-none bg-inherit',
                    {
                        'text-gothamBlack-400 dark:text-gothamBlack-100': seconds === 0,
                    }
                )}
                maxLength={2}
                disabled={isRunning}
            />
            <span
                className={classNames('text-xs', {
                    'text-gothamBlack-400 dark:text-gothamBlack-100': seconds === 0,
                })}
            >
                {t('seconds')}
            </span>
        </span>
    );
}
