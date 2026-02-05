const UsageBar = ({ totalBotChats=0, planMaxMessages=0 }) => {
    // Calculate percentage and cap it at 100%
    const percentage = Math.min((totalBotChats / planMaxMessages) * 100, 100);

    return (
        <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
                <span>Usage</span>
                <span>{totalBotChats} / {planMaxMessages}</span>
            </div>

            {/* Outer Track */}
            <div className="h-1 bg-gray-300 rounded mt-2 overflow-hidden">
                {/* Inner Fill */}
                <div
                    className="h-1 bg-black rounded transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};


export default UsageBar