import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const AuthScreen: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    if (isLoginView) {
        return <LoginScreen onSwitchToSignUp={() => setIsLoginView(false)} />;
    } else {
        return <SignUpScreen onSwitchToLogin={() => setIsLoginView(true)} />;
    }
};

export default AuthScreen;