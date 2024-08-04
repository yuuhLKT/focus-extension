// Show notification to restart browser on installation
export function showRestartBrowserNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '128.png',
        title: 'Restart your browser',
        message: 'Please restart your browser for the extension to work properly.',
        priority: 2,
    });
}

// Show notification on timer finish
export function showTimerFinishNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '128.png',
        title: 'Focus Mode - Time is up!',
        message: 'Time is up! Good job! You can now take a break.',
        priority: 2,
    });
}
