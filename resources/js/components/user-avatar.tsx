import { useCurrentUser } from '@/hooks/use-current-user';
import { cn, getContrastColor, hashCode } from '@/lib/utils';

export const UserAvatar = ({ width = 8, height = 8, className = '' }: { width?: number; height?: number; className?: string }) => {
  const { name, avatar } = useCurrentUser()!;

  if (avatar) {
    return (
      <div
        className="overflow-hidden rounded-full"
        style={{ width: `${width * 0.25}rem`, height: `${height * 0.25}rem`, minWidth: `${width * 0.25}rem` }}
      >
        <img src={avatar} alt={`${name} avatar`} className="h-full w-full object-cover" />
      </div>
    );
  }

  const hue = hashCode(name) % 360;
  const bgColor = `hsl(${hue}, 70%, 50%)`;
  const textColor = getContrastColor(hue, 70, 50);

  return (
    <div
      className="overflow-hidden rounded-full"
      style={{ width: `${width * 0.25}rem`, height: `${height * 0.25}rem`, minWidth: `${width * 0.25}rem` }}
    >
      <div
        className={cn('flex h-full w-full items-center justify-center capitalize', className)}
        style={{ backgroundColor: bgColor, color: textColor }}
        aria-label={`${name} avatar`}
      >
        {name[0]}
      </div>
    </div>
  );
};
