import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BlockPopup } from '../../popup/BlockPopup';
import { MainPopup } from '../../popup/MainPopup';

const pageVariants = {
    blockToFocus: {
        initial: {
            opacity: 0,
            x: '100vw',
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: '-100vw',
        },
    },
    focusToBlock: {
        initial: {
            opacity: 0,
            x: '-100vw',
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: '100vw',
        },
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.6,
};

export const AnimatedRoute = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/focus" />} />
                <Route
                    path="/block"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants.focusToBlock}
                            transition={pageTransition}
                        >
                            <BlockPopup />
                        </motion.div>
                    }
                />
                <Route
                    path="/focus"
                    element={
                        location.pathname === '/block' ? (
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants.blockToFocus}
                                transition={pageTransition}
                            >
                                <MainPopup />
                            </motion.div>
                        ) : (
                            <MainPopup />
                        )
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};
