import { Minus, TrendingDown, TrendingUp } from "lucide-react";

const KPICard = ({ label, value, change, changeType }: any) => {
    const getChangeColor = () => {
        if (changeType === 'positive') return 'text-green-400';
        if (changeType === 'negative') return 'text-red-400';
        return 'text-gray-400';
    };

    const getIcon = () => {
        if (changeType === 'positive') return <TrendingUp className="w-4 h-4" />;
        if (changeType === 'negative') return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    return (
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6 hover:border-[#00D1D1]/50 transition-all">
            <p className="text-[#9CA3AF] text-sm mb-2">{label}</p>
            <h3 className="text-4xl font-bold text-white mb-2">{value.toLocaleString()}</h3>
            <div className={`flex items-center gap-1 ${getChangeColor()} text-sm font-semibold`}>
                {getIcon()}
                <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
        </div>
    );
};
export default KPICard;