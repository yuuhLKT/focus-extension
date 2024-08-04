// Function to inject script on the active tab
export function injectScriptOnActiveTab(scriptName: string) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id! },
                    files: [scriptName],
                },
                () => {
                    console.log(`${scriptName} injected in the active tab.`);
                }
            );
        }
    });
}
