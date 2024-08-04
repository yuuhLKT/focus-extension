import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowReturnLeft, BsBan } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BlockList from '../components/BlockedList';
import { getStorage, setStorage } from '../utils/util';

export const BlockPopup = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!url) {
            setError(t('nullUrl')); // Error message for empty URL
            return;
        }

        const blockedUrls = (await getStorage<string[]>('blockedUrls')) || [];

        // Normalize URL for duplicate check
        const normalizedUrl = url
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/\/$/, '');

        if (
            !blockedUrls.some(
                (blockedUrl) =>
                    blockedUrl
                        .replace(/^https?:\/\//, '')
                        .replace(/^www\./, '')
                        .replace(/\/$/, '') === normalizedUrl
            )
        ) {
            blockedUrls.push(url);
            await setStorage('blockedUrls', blockedUrls);
            console.log(`Blocked URLs after addition: ${blockedUrls}`);
            setRefresh(!refresh);
            setUrl('');
        } else {
            setError(t('repeatedUrl')); // Error message for duplicate URL
        }
    };

    return (
        <div className="min-w-[360px] h-[320px] max-w-sm mx-auto p-3 font-inter bg-gothamBlack-50 dark:bg-gothamBlack-400 dark:text-white">
            <div className="flex items-center space-x-3 relative">
                <div className="flex items-center space-x-3">
                    <BsArrowReturnLeft onClick={handleBack} className="cursor-pointer" size={22} />
                </div>
                <div className="w-full">
                    <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <BsBan className="w-5 h-5 text-gothamBlack-500" />
                            </div>
                            <input
                                type="text"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="block w-full box-border p-1 ps-10 text-sm text-gothamBlack-900 border border-gothamBlack-300 rounded-lg bg-oceanBlue-50 focus:border-oceanBlue-500 dark:border-gothamBlack-600 dark:placeholder-gothamBlack-300 dark:text-black"
                                placeholder="ex. youtube.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-oceanBlue-600 hover:bg-oceanBlue-700 font-medium rounded-lg text-xs h-8 px-1 dark:bg-oceanBlue-600 dark:hover:bg-oceanBlue-700"
                        >
                            Block
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-500 text-xs mt-2 absolute bottom-[-20px] left-0">
                            {error}
                        </p>
                    )}
                </div>
            </div>
            <div className="overflow-y-auto">
                <BlockList onUpdate={() => setRefresh(!refresh)} />
            </div>
        </div>
    );
};
