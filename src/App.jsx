// App.jsx
import React from 'react';
import ResponsiveLayout from './components/Layout/ResponsiveLayout';
import ChatContainer from './components/Chat/ChatContainer';

function App() {
    return (
        <ResponsiveLayout>
            <ChatContainer />
        </ResponsiveLayout>
    );
}

export default App;