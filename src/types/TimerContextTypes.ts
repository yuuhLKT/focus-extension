export interface TimerContextType {
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
    isPaused: boolean;
    isFinished: boolean;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setHours: (hours: number) => void;
    setMinutes: (minutes: number) => void;
    setSeconds: (seconds: number) => void;
}
