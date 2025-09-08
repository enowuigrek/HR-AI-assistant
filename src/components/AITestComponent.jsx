// src/components/AITestComponent.jsx
import React, { useState } from 'react';

const AITestComponent = () => {
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTest = async () => {
        setIsLoading(true);
        setTestResult(null);

        try {
            // Sprawdź czy klucz API istnieje
            const hasKey = !!process.env.REACT_APP_OPENAI_API_KEY;
            const keyLength = process.env.REACT_APP_OPENAI_API_KEY?.length || 0;

            if (!hasKey) {
                setTestResult({
                    success: false,
                    error: 'Brak klucza API w zmiennych środowiskowych'
                });
                return;
            }

            setTestResult({
                success: true,
                message: `Klucz API załadowany poprawnie (${keyLength} znaków)`,
                model: 'test-mode'
            });

        } catch (error) {
            setTestResult({
                success: false,
                error: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Test klucza OpenAI</h3>

            <button
                onClick={handleTest}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? 'Testowanie...' : 'Testuj klucz'}
            </button>

            {testResult && (
                <div className={`mt-4 p-3 rounded-lg ${
                    testResult.success
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                }`}>
                    <p className={`text-sm font-medium ${
                        testResult.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                        {testResult.success ? 'Sukces!' : 'Błąd'}
                    </p>
                    <p className={`text-xs mt-1 ${
                        testResult.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {testResult.message || testResult.error}
                    </p>
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <p>Debug info:</p>
                <p>Klucz API: { import.meta.env.VITE_OPENAI_API_KEY ? '✅ Załadowany' : '❌ Brak'}</p>
                <p>Długość: { import.meta.env.VITE_OPENAI_API_KEY?.length || 0} znaków</p>
            </div>
        </div>
    );
};

export default AITestComponent;