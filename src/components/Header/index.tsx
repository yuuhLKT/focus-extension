import { NavigateBlock } from '../Buttons/NavigateBlock';
import LanguageSelector from '../Selector/LanguageSelector';
import { PopupOptions } from './PopupOptions';

export const MainHeader = () => {
    return (
        <>
            <LanguageSelector />
            <div className="flex justify-center items-center -mt-4">
                <div className="text-3xl font-bold">Focus Mode</div>
            </div>
            <div className="flex items-center justify-center mt-4">
                <NavigateBlock />
            </div>
            <PopupOptions />
        </>
    );
};
