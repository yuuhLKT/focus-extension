import { useTranslation } from 'react-i18next';

export default function Copyright() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <div className="flex justify-center items-end mt-4 text-gothamBlack-400 dark:text-gothamBlack-50 text-xs">
            <div className="flex flex-row items-center justfiy-between gap-1 ">
                <span>&copy; {currentYear} Yuri Luiz</span>
                <span className="w-1 h-4 border-l border-gothamBlack-200 dark:border-gothamBlack-100"></span>
                <a
                    className="text-oceanBlue-500 dark:text-oceanBlue-300 hover:text-oceanBlue-400 dark:hover:text-oceanBlue-200"
                    href="https://github.com/yuuhlkt"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                &bull;
                <a
                    className="text-oceanBlue-500 dark:text-oceanBlue-300 hover:text-oceanBlue-400 dark:hover:text-oceanBlue-200"
                    href="https://www.pixme.bio/yuuhlkt"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('donate')}
                </a>
                &bull;
                <button
                    className="text-oceanBlue-500 dark:text-oceanBlue-300 hover:text-oceanBlue-400 dark:hover:text-oceanBlue-200"
                    onClick={() => chrome.runtime.openOptionsPage()}
                >
                    {t('optionsPage')}
                </button>
                &bull;
                <a
                    className="text-oceanBlue-500 dark:text-oceanBlue-300 hover:text-oceanBlue-400 dark:hover:text-oceanBlue-200"
                    href="https://focus-website-rust.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Website
                </a>
            </div>
        </div>
    );
}
