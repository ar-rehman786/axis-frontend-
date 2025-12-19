'use client'

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { HealthApi } from '@/utils/apis/HealthApi';

export default function HealthStatus() {
    const [status, setStatus] = useState<'ok' | 'offline' | 'checking'>('checking');

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const health = await HealthApi.checkHealth();
                setStatus(health.status === 'ok' ? 'ok' : 'offline');
            } catch (error) {
                setStatus('offline');
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 60000); // Every minute
        return () => clearInterval(interval);
    }, []);

    const getColor = () => {
        switch (status) {
            case 'ok': return 'bg-green-500';
            case 'offline': return 'bg-red-500';
            default: return 'bg-yellow-500 animate-pulse';
        }
    };

    const getText = () => {
        switch (status) {
            case 'ok': return 'API Online';
            case 'offline': return 'API Offline';
            default: return 'Checking...';
        }
    };

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2A2A] rounded-lg">
            <Activity className="w-4 h-4 text-gray-400" />
            <div className={`w-2 h-2 rounded-full ${getColor()}`} />
            <span className="text-white text-sm">{getText()}</span>
        </div>
    );
}
