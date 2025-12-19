import React from 'react';

// Props type define
type StepProps = {
    number: string;       // step number, e.g., "1", "2"
    title: string;        // title of the step
    description: string;  // description text
    icon: string;         // emoji or icon character
}

function Step({ number, title, description, icon }: StepProps) {
    return (
        <div className="step flex flex-col items-center bg-gray-100 rounded-lg p-6 shadow-md text-center space-y-3 hover:shadow-xl transition-shadow duration-300">
            <div className="step-icon text-4xl">{icon}</div>
            <h3 className="text-xl font-semibold">{number}. {title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default function page() {
    return (
        <section className="how-it-works py-12 bg-[#0a0f1a] text-white">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
                <div className="steps grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Step number="1" title="Upload CSV" description="Drop your mortgage data file (any vendor format)" icon="📤" />
                    <Step number="2" title="AI Processes" description="Auto-calculates LTV, equity, APS scores, tiers" icon="⚙️" />
                    <Step number="3" title="Get Reports" description="7-page PDF + live dashboard in 60 seconds" icon="📊" />
                </div>
            </div>
        </section>
    );
}
