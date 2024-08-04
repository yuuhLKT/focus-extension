import { injectScriptOnActiveTab } from '../utils/injectScript';
import {
    showRestartBrowserNotification,
    showTimerFinishNotification,
} from '../utils/notifications';
import { getStorage, setStorage } from '../utils/util';

const TIMER_ALARM_NAME = 'focus-alarm';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Background service worker installed.');
    setStorage('timer', { isRunning: false, hours: 0, minutes: 0, seconds: 0 }).catch(
        console.error
    );
    showRestartBrowserNotification();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === TIMER_ALARM_NAME) {
        const { hours, minutes, seconds } = (await getStorage<{
            hours: number;
            minutes: number;
            seconds: number;
        }>('timer')) ?? { hours: 0, minutes: 0, seconds: 0 };
        const audioEnabled = await getStorage<boolean>('audioEnabled');
        const confettiEnabled = await getStorage<boolean>('confettiEnabled');
        const notificationEnabled = await getStorage<boolean>('notificationEnabled');
        if (hours === 0 && minutes === 0 && seconds === 0) {
            if (notificationEnabled) {
                showTimerFinishNotification();
            }

            await setStorage('timer', { isRunning: false, isPaused: false, isFinished: true });
            chrome.alarms.clear(TIMER_ALARM_NAME);

            // Run the playAudio script if audio is enabled
            if (audioEnabled) {
                injectScriptOnActiveTab('audio_script.js');
            }

            // Run the throwConfetti script if confetti is enabled
            if (confettiEnabled) {
                injectScriptOnActiveTab('confetti_script.js');
            }
        } else {
            let newHours = hours;
            let newMinutes = minutes;
            let newSeconds = seconds - 1;
            if (newSeconds < 0) {
                newSeconds = 59;
                newMinutes -= 1;
            }
            if (newMinutes < 0) {
                newMinutes = 59;
                newHours -= 1;
            }
            await setStorage('timer', {
                hours: newHours,
                minutes: newMinutes,
                seconds: newSeconds,
                isRunning: true,
                isPaused: false,
            });
        }
    }
});

chrome.runtime.onMessage.addListener(async (message) => {
    switch (message.action) {
        case 'start':
            try {
                await setStorage('timer', { isRunning: true, isPaused: false });
                chrome.alarms.create(TIMER_ALARM_NAME, { periodInMinutes: 1 / 60 });
                // Notify content scripts to update content
                chrome.tabs.query({}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id!, { action: 'updateContent' });
                    });
                });
            } catch (error) {
                console.error('Error starting timer:', error);
            }
            break;
        case 'pause':
            try {
                await setStorage('timer', { isRunning: false, isPaused: true });
                chrome.alarms.clear(TIMER_ALARM_NAME);
            } catch (error) {
                console.error('Error pausing timer:', error);
            }
            break;
        case 'reset':
            try {
                await setStorage('timer', {
                    isRunning: false,
                    isPaused: false,
                    isFinished: false,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                chrome.alarms.clear(TIMER_ALARM_NAME);
                // Notify content scripts to update content
                chrome.tabs.query({}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id!, { action: 'updateContent' });
                    });
                });
            } catch (error) {
                console.error('Error resetting timer:', error);
            }
            break;
        case 'updateTabs':
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs.sendMessage(tab.id!, { action: 'updateContent' });
                });
            });
            break;
        case 'updateContent':
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs.sendMessage(tab.id!, { action: 'updateContent' });
                });
            });
            break;
        default:
            console.error('Unknown action:', message.action);
    }
});
