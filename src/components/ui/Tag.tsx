import { cn } from '../../lib/utils';

interface TagProps {
  type: 'veg' | 'non-veg' | 'egg' | 'bestseller' | 'spicy';
  className?: string;
}

export const Tag = ({ type, className }: TagProps) => {
  const styles = {
    veg: "bg-[#E8F5E9] text-[#2D7A3A]",
    'non-veg': "bg-[#FDE8E8] text-brand-red",
    egg: "bg-[#FFF8E1] text-[#F57F17]",
    bestseller: "bg-brand-yellow-pale text-brand-yellow-deep",
    spicy: "bg-[#FFF3E0] text-[#E65100]"
  };

  const labels = {
    veg: "VEG",
    'non-veg': "NON-VEG",
    egg: "EGG",
    bestseller: "BESTSELLER",
    spicy: "SPICY"
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[12px] font-medium font-mono uppercase whitespace-nowrap", styles[type], className)}>
      {(type === 'veg' || type === 'non-veg' || type === 'egg') && (
        <span className={cn("w-2 h-2 rounded-full", type === 'veg' ? "bg-[#4CAF50]" : type === 'egg' ? "bg-[#F57F17]" : "bg-brand-red")} />
      )}
      {labels[type]}
    </span>
  );
};
