import { HashRouter } from 'react-router-dom';
import { AnimatedRoute } from '../components/Animations/AnimationRoute';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TimerProvider } from '../contexts/TimerContext';

const App = () => {
    return (
        <TimerProvider>
            <ThemeProvider>
                <HashRouter>
                    <AnimatedRoute />
                </HashRouter>
            </ThemeProvider>
        </TimerProvider>
    );
};

export default App;
