import { useTranslation } from 'react-i18next';
import HoursInput from './HoursInput';
import MinutesInput from './MinutesInput';
import SecondsInput from './SecondsInput';

export const TimerInput = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-1 w-full text-center mt-6">
            <label htmlFor="time" className="text-sm font-semibold">
                {t('question')}
            </label>
            <div className="flex flex-row items-center justify-center gap-4 border-gothamBlack-200 dark:border-gothamBlack-100 border w-full rounded-md p-2 text-lg font-semibold">
                <HoursInput />
                <MinutesInput />
                <SecondsInput />
            </div>
        </div>
    );
};
