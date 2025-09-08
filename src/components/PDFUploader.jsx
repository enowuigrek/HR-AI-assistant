// src/components/PDFUploader.jsx
import React, { useState } from 'react';

const PDFUploader = () => {
    const [status, setStatus] = useState(null);

    const loadDefaultKnowledge = () => {
        setStatus({
            success: true,
            message: 'Wbudowana baza wiedzy HR załadowana'
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Baza Wiedzy HR</h3>

            <button
                onClick={loadDefaultKnowledge}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
                Załaduj bazę wiedzy HR
            </button>

            {status && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                        {status.message}
                    </p>
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <p>Zawiera wiedzę o:</p>
                <ul className="list-disc list-inside mt-1">
                    <li>Kodeks Pracy</li>
                    <li>RODO w HR</li>
                    <li>Rekrutacja</li>
                    <li>Urlopy i czas pracy</li>
                </ul>
            </div>
        </div>
    );
};

export default PDFUploader;