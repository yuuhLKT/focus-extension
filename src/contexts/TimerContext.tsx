import React, { createContext, useEffect, useState } from 'react';
import { TimerContextType } from '../types/TimerContextTypes';
import { getStorage, setStorage } from '../utils/util';

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isRunning: false,
        isPaused: false,
        isFinished: false,
    });

    // Load state from storage
    useEffect(() => {
        const loadState = async () => {
            try {
                const savedState = await getStorage('timer');
                if (savedState && typeof savedState.hours === 'number') {
                    setTimer({
                        hours: savedState.hours ?? 0,
                        minutes: savedState.minutes ?? 0,
                        seconds: savedState.seconds ?? 0,
                        isRunning: savedState.isRunning ?? false,
                        isPaused: savedState.isPaused ?? false,
                        isFinished: savedState.isFinished ?? false,
                    });
                }
            } catch (error) {
                console.error('Failed to load timer state:', error);
            }
        };
        loadState();
    }, []);

    // Save state to storage
    useEffect(() => {
        const saveState = async () => {
            try {
                await setStorage('timer', timer);
            } catch (error) {
                console.error('Failed to save timer state:', error);
            }
        };
        saveState();
    }, [timer]);

    // Update timer every second if running
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timer.isRunning) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    let { hours, minutes, seconds } = prev;
                    if (seconds > 0) {
                        seconds -= 1;
                    } else if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(interval);
                        return { ...prev, isRunning: false, isFinished: true };
                    }
                    return { ...prev, hours, minutes, seconds };
                });
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer.isRunning]);

    const startTimer = async () => {
        try {
            await setStorage('timer', {
                ...timer,
                isRunning: true,
                isPaused: false,
                isFinished: false,
            });
            setTimer((prev) => ({ ...prev, isRunning: true, isPaused: false, isFinished: false }));
            chrome.runtime.sendMessage({ action: 'start' });
        } catch (error) {
            console.error('Failed to start timer:', error);
        }
    };

    const pauseTimer = async () => {
        try {
            await setStorage('timer', { ...timer, isRunning: false, isPaused: true });
            setTimer((prev) => ({ ...prev, isRunning: false, isPaused: true }));
            chrome.runtime.sendMessage({ action: 'pause' });
        } catch (error) {
            console.error('Failed to pause timer:', error);
        }
    };

    const resetTimer = async () => {
        try {
            await setStorage('timer', {
                hours: 0,
                minutes: 0,
                seconds: 0,
                isRunning: false,
                isPaused: false,
                isFinished: false,
            });
            setTimer({
                hours: 0,
                minutes: 0,
                seconds: 0,
                isRunning: false,
                isPaused: false,
                isFinished: false,
            });
            chrome.runtime.sendMessage({ action: 'reset' });
        } catch (error) {
            console.error('Failed to reset timer:', error);
        }
    };

    return (
        <TimerContext.Provider
            value={{
                ...timer,
                startTimer,
                pauseTimer,
                resetTimer,
                setHours: (hours) => setTimer((prev) => ({ ...prev, hours })),
                setMinutes: (minutes) => setTimer((prev) => ({ ...prev, minutes })),
                setSeconds: (seconds) => setTimer((prev) => ({ ...prev, seconds })),
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};
