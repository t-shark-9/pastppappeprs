import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPresence } from '@/lib/supabase-yjs-provider';

interface CollaboratorAvatarsProps {
  users: UserPresence[];
  maxVisible?: number;
}

export function CollaboratorAvatars({ users, maxVisible = 4 }: CollaboratorAvatarsProps) {
  if (users.length === 0) return null;

  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar 
                  className="h-7 w-7 border-2 border-background ring-2 ring-background cursor-default"
                  style={{ backgroundColor: user.color }}
                >
                  <AvatarFallback 
                    className="text-[10px] font-medium text-white"
                    style={{ backgroundColor: user.color }}
                  >
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div 
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500"
                  title="Online"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-7 w-7 border-2 border-background bg-muted cursor-default">
                <AvatarFallback className="text-[10px] font-medium">
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="text-xs space-y-1">
                {users.slice(maxVisible).map((user) => (
                  <p key={user.id}>{user.name}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
