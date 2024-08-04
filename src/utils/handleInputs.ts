export const handleTimerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: number) => void,
    maxValue: number
) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 2);
    const value = input ? parseInt(input, 10) : 0;
    setValue(Math.min(value, maxValue));
};
