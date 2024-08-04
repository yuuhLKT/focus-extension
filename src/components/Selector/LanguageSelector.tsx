import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import BrazilFlag from '../../assets/brazil-flag.svg';
import UsaFlag from '../../assets/usa-flag.svg';
import { getStorage, setStorage } from '../../utils/util';

interface LanguageOption {
    code: 'pt' | 'en';
    label: string;
}

const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'pt' | 'en'>('en');

    useEffect(() => {
        const fetchLanguage = async () => {
            const savedLanguage = await getStorage<'pt' | 'en'>('selectedLanguage');
            if (savedLanguage) {
                setSelectedLanguage(savedLanguage);
                i18n.changeLanguage(savedLanguage);
            }
        };
        fetchLanguage();
    }, []);

    const handleLanguageChange = async (language: 'pt' | 'en') => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        await setStorage('selectedLanguage', language);
        setIsOpen(false);
    };

    const languageOptions: LanguageOption[] = [
        { code: 'pt', label: 'pt-BR' },
        { code: 'en', label: 'en-US' },
    ];

    return (
        <div className="relative inline-block text-left z-10 mt-1 ml-1">
            <div>
                <button
                    type="button"
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedLanguage === 'pt' ? (
                        <img src={BrazilFlag} alt="Brazil Flag" className="w-4 h-auto" />
                    ) : (
                        <img src={UsaFlag} alt="USA Flag" className="w-4 h-auto" />
                    )}
                    <span className="text-xs">{selectedLanguage === 'pt' ? 'pt-BR' : 'en-US'}</span>
                </button>
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-1 w-20 h-16 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    style={{ right: '-30%' }}
                >
                    <div className="py-1" role="none">
                        {languageOptions.map((option) => (
                            <button
                                key={option.code}
                                className="block w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => handleLanguageChange(option.code)}
                                role="menuitem"
                            >
                                <img
                                    src={option.code === 'pt' ? BrazilFlag : UsaFlag}
                                    alt={option.code === 'pt' ? 'Brazil Flag' : 'USA Flag'}
                                    className="w-4 h-auto inline-block mr-1"
                                />
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
