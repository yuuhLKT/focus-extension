import PauseButton from './PauseButton';
import ResetButton from './ResetButton';
import StartButton from './StartButton';

export const ControlButtons = () => {
    return (
        <div className="flex items-center justify-center gap-3 w-full mt-3">
            <StartButton />
            <PauseButton />
            <ResetButton />
        </div>
    );
};
