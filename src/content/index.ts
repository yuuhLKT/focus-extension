let blockedUrls: string[] = [];

function getStorage<V = any>(key: string): Promise<V | undefined> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key]);
            }
        });
    });
}

async function initialize() {
    try {
        const [storedBlockedUrls, timer] = await Promise.all([
            getStorage<string[]>('blockedUrls'),
            getStorage<{ isRunning: boolean }>('timer'),
        ]);

        blockedUrls = storedBlockedUrls || [];

        if (timer?.isRunning) {
            checkFocusPage();
        }

        notifyBackgroundToUpdateTabs();
    } catch (error) {
        console.error('Error initializing content script:', error);
    }
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.blockedUrls) blockedUrls = changes.blockedUrls.newValue || [];

    if (changes.timer) {
        const isRunning = changes.timer.newValue?.isRunning;
        if (isRunning) {
            checkFocusPage();
        } else {
            removeFocusPage();
        }
    }
});

function checkFocusPage() {
    removeFocusPage();
    checkUrl();
}

function checkUrl() {
    const currentUrl = window.location.href;

    for (let url of blockedUrls) {
        if (currentUrl.includes(url)) {
            addFocusPage();
            return;
        }
    }
}

function addFocusPage() {
    const body = document.querySelector('body');
    const focusPage = document.createElement('div');
    focusPage.id = 'focus-content-root';
    focusPage.innerHTML = `
        <div class=focus-content-container>
            <h1>Focus Mode</h1>
            <p>Focus on your work and don't give up.</p>
        </div>
    `;

    if (body) body.appendChild(focusPage);
}

function removeFocusPage() {
    const focusPage = document.querySelector('#focus-content-root');
    if (focusPage) focusPage.remove();
}

// Notify background script to update all tabs
function notifyBackgroundToUpdateTabs() {
    chrome.runtime.sendMessage({ action: 'updateTabs' });
}

initialize();
