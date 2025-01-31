import { Avatar, AvatarGroup, Tooltip } from "@heroui/react";
import { motion } from 'framer-motion';
import type { CollaboratorPresence } from '@/hooks/useCollaboration';

interface CollaboratorIndicatorProps {
  collaborators: CollaboratorPresence[];
  className?: string;
}

export default function CollaboratorIndicator({ 
  collaborators,
  className = ""
}: CollaboratorIndicatorProps) {
  if (!collaborators.length) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AvatarGroup>
        {collaborators.map((collaborator) => (
          <Tooltip
            key={collaborator.user_id}
            content={`${collaborator.user_details.email}${
              collaborator.current_field 
                ? ` - Editing ${collaborator.current_field}`
                : ''
            }`}
          >
            <Avatar
              name={collaborator.user_details.email}
              src={collaborator.user_details.avatar_url}
              className="w-8 h-8 transition-all"
              classNames={{
                base: "border-2 border-background",
                icon: "text-tiny"
              }}
            />
          </Tooltip>
        ))}
      </AvatarGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-default-500"
      >
        {collaborators.length === 1 
          ? '1 person editing'
          : `${collaborators.length} people editing`}
      </motion.div>
    </div>
  );
}