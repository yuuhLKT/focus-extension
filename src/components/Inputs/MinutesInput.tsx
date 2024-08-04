import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerContext } from '../../contexts/TimerContext';
import { TimerContextType } from '../../types/TimerContextTypes';
import { handleTimerInputChange } from '../../utils/handleInputs';

export default function MinutesInput() {
    const context = useContext(TimerContext);
    const { t } = useTranslation();
    if (!context) {
        throw new Error('MinutesInput must be used within a TimerProvider');
    }
    const { minutes, setMinutes, isRunning } = context as TimerContextType;

    return (
        <span className="flex flex-col items-center">
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minutes.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTimerInputChange(e, setMinutes, 59)
                }
                className={classNames(
                    'w-10 text-center text-2xl outline-none border-none bg-inherit',
                    {
                        'text-gothamBlack-400 dark:text-gothamBlack-100': minutes === 0,
                    }
                )}
                maxLength={2}
                disabled={isRunning}
            />
            <span
                className={classNames('text-xs', {
                    'text-gothamBlack-400 dark:text-gothamBlack-100': minutes === 0,
                })}
            >
                {t('minutes')}
            </span>
        </span>
    );
}
