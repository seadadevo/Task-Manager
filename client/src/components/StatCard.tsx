interface IStatCardProps {
    label: string;
    count: number;
    icon: React.ElementType;
    color: string;
}

const StatCard = ({ label, count, icon: Icon, color }: IStatCardProps) => (
    <div className="rounded-2xl border bg-card p-5 flex items-center gap-4 shadow-sm">
        <div className={`rounded-xl p-3 ${color}`}>
            <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
            <p className="text-2xl font-bold text-foreground">{count}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    </div>
);

export default StatCard;
