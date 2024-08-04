import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { getStorage, setStorage } from '../../utils/util';

interface BlockListProps {
    onUpdate: () => void;
}

export const BlockList = ({ onUpdate }: BlockListProps) => {
    const [urls, setUrls] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const storedUrls = await getStorage<string[]>('blockedUrls');
                if (storedUrls) {
                    setUrls(storedUrls);
                }
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchUrls();
    }, [onUpdate]);

    const handleDelete = async (url: string) => {
        const updatedUrls = urls.filter((item) => item !== url);
        try {
            await setStorage('blockedUrls', updatedUrls);
            setUrls(updatedUrls);
            console.log('Deleted URL:', url);
            console.log('Updated URLs:', updatedUrls);
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    return (
        <div className="mt-2 max-h-64 max-w-[320px]">
            {urls.length > 0 ? (
                <ul className="list-none mt-4">
                    {urls.map((url, index) => (
                        <li
                            key={index}
                            className="flex items-center p-2 border-b border-gothamBlack-300 dark:border-gothamBlack-100"
                        >
                            <span className="flex-grow truncate text-base">{url}</span>
                            <BsFillTrash3Fill
                                className="text-red-500 cursor-pointer ml-2 flex-shrink-0"
                                size={16}
                                onClick={() => handleDelete(url)}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-200 text-center mt-24">
                    {t('emptyList')}
                </p>
            )}
        </div>
    );
};

export default BlockList;
