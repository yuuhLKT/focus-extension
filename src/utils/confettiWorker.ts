/// <reference lib="webworker" />
importScripts('https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js');

self.onmessage = function (event) {
    const { particleRatio, opts } = event.data;
    confetti(
        Object.assign({}, opts, {
            particleCount: Math.floor(200 * particleRatio),
        })
    );
};
