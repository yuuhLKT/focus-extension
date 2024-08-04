import { ControlButtons } from '../components/Buttons/ControlButtons';
import Copyright from '../components/Footer';
import { MainHeader } from '../components/Header';
import { TimerInput } from '../components/Inputs/TimerInput';

export const MainPopup = () => {
    return (
        <div className="min-w-[360px] h-[320px] max-w-sm mx-auto p-3 font-inter bg-gothamBlack-50 dark:bg-gothamBlack-400 dark:text-white">
            <MainHeader />
            <TimerInput />
            <ControlButtons />
            <Copyright />
        </div>
    );
};
