interface BadgeProps {
  label: string;
  tone?: 'default' | 'success' | 'warning';
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
};

const Badge = ({ label, tone = 'default' }: BadgeProps) => {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{label}</span>;
};

export default Badge;
