import { useCurrentUser } from '@/hooks/use-current-user';
import { getContrastColor, hashCode } from '@/lib/utils';

export const UserAvatar = () => {
  const { name, avatar } = useCurrentUser()!;

  // Generate consistent color from name
  const hue = hashCode(name) % 360;
  const bgColor = `hsl(${hue}, 70%, 50%)`;

  // Determine text color based on background luminance
  const textColor = getContrastColor(hue, 70, 50);

  return (
    <div className="h-8 w-8 min-w-8 overflow-hidden rounded-full">
      {avatar ? (
        <img src={avatar} alt={`${name} avatar`} className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center capitalize"
          style={{ backgroundColor: bgColor, color: textColor }}
          aria-label={`${name} avatar`}
        >
          {name[0]}
        </div>
      )}
    </div>
  );
};
