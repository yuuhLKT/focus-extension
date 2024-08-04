import classNames from 'classnames';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerContext } from '../../contexts/TimerContext';
import { TimerContextType } from '../../types/TimerContextTypes';
import { handleTimerInputChange } from '../../utils/handleInputs';

export default function HoursInput() {
    const context = useContext(TimerContext);
    const { t } = useTranslation();
    const { hours, setHours, isRunning } = context as TimerContextType;

    return (
        <span className="flex flex-col items-center">
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={hours.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTimerInputChange(e, setHours, 47)
                }
                className={classNames(
                    'w-10 text-center text-2xl outline-none border-none bg-inherit',
                    {
                        'text-gothamBlack-400 dark:text-gothamBlack-100': hours === 0,
                    }
                )}
                maxLength={2}
                disabled={isRunning}
            />
            <span
                className={classNames('text-xs', {
                    'text-gothamBlack-400 dark:text-gothamBlack-100': hours === 0,
                })}
            >
                {t('hours')}
            </span>
        </span>
    );
}
