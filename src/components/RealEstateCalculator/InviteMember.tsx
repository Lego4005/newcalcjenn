'use client'

import { useState, useEffect } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Chip,
} from "@nextui-org/react"
import { Users } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

interface InviteMemberProps {
  team: TeamMember[]
  onInvite: (email: string, role: string) => void
}

export function InviteMember({ team, onInvite }: InviteMemberProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("viewer")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInvite = () => {
    onInvite(email, selectedRole)
    setEmail("")
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <Button
        variant="flat"
        onPress={() => setIsOpen(true)}
        startContent={<Users className="w-4 h-4" />}
      >
        Team
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-center flex-col">
                  <AvatarGroup isBordered>
                    {team.map((member) => (
                      <Avatar
                        key={member.id}
                        src={member.avatar}
                        size="sm"
                      />
                    ))}
                  </AvatarGroup>
                  <h4 className="text-large mt-4">Invite Team Member</h4>
                  <p className="text-small text-default-500">
                    Collaborate on property calculations with your team
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Input
                      autoFocus
                      label="Email Address"
                      placeholder="Enter email address"
                      variant="bordered"
                      value={email}
                      onValueChange={setEmail}
                      className="flex-1"
                    />
                    <Dropdown>
                      <DropdownTrigger>
                        <Button 
                          variant="flat"
                          className="capitalize"
                        >
                          {selectedRole}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Select role"
                        onAction={(key) => setSelectedRole(key.toString())}
                      >
                        <DropdownItem key="viewer">Viewer</DropdownItem>
                        <DropdownItem key="editor">Editor</DropdownItem>
                        <DropdownItem key="admin">Admin</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <Divider />

                  <div className="space-y-4">
                    <p className="text-small font-medium">Current Team Members</p>
                    {team.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={member.avatar}
                            size="sm"
                          />
                          <div>
                            <p className="text-small font-medium">{member.name}</p>
                            <p className="text-tiny text-default-500">{member.email}</p>
                          </div>
                        </div>
                        <Chip 
                          size="sm" 
                          variant="flat"
                          color={member.role === "Owner" ? "primary" : member.role === "Editor" ? "secondary" : "default"}
                        >
                          {member.role}
                        </Chip>
                      </div>
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleInvite}
                  isDisabled={!email}
                >
                  Send Invite
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
} 