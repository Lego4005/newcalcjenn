'use client'

import { useEffect, useState, useCallback } from "react"
import {
  Modal,
  ModalContent,
  Button,
  Input,
  ScrollShadow,
  ListboxItem,
  Listbox,
  Kbd,
} from "@nextui-org/react"
import { Command } from "lucide-react"
import { Icon } from "@iconify/react"

interface CommandAction {
  id: string
  title: string
  category: string
  icon: string
  shortcut?: string[]
}

interface CommandMenuProps {
  onAction: (action: string) => void
}

const actions: CommandAction[] = [
  {
    id: "generate-pdf",
    title: "Generate PDF Report",
    category: "Documents",
    icon: "solar:file-text-linear",
    shortcut: ["⌘", "P"],
  },
  {
    id: "share-calc",
    title: "Share Calculator",
    category: "Share",
    icon: "solar:share-linear",
    shortcut: ["⌘", "S"],
  },
  {
    id: "invite-member",
    title: "Invite Team Member",
    category: "Team",
    icon: "solar:users-group-rounded-linear",
    shortcut: ["⌘", "I"],
  },
  {
    id: "export-data",
    title: "Export Data",
    category: "Documents",
    icon: "solar:file-download-linear",
    shortcut: ["⌘", "E"],
  },
  {
    id: "market-analysis",
    title: "View Market Analysis",
    category: "Analysis",
    icon: "solar:chart-linear",
    shortcut: ["⌘", "M"],
  },
]

const categories = Array.from(new Set(actions.map(a => a.category)))

export function CommandMenu({ onAction }: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredActions, setFilteredActions] = useState(actions)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen])

  const handleSearch = (value: string) => {
    setSearch(value)
    if (!value) {
      setFilteredActions(selectedCategory ? actions.filter(a => a.category === selectedCategory) : actions)
      return
    }

    const filtered = actions.filter(
      (action) =>
        (selectedCategory ? action.category === selectedCategory : true) &&
        (action.title.toLowerCase().includes(value.toLowerCase()) ||
        action.category.toLowerCase().includes(value.toLowerCase()))
    )
    setFilteredActions(filtered)
  }

  const handleAction = (actionId: string) => {
    onAction(actionId)
    setIsOpen(false)
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    setFilteredActions(
      category 
        ? actions.filter(a => a.category === category)
        : actions
    )
  }

  return (
    <>
      <Button
        variant="flat"
        onPress={() => setIsOpen(true)}
        className="w-full h-10 bg-background/80 dark:bg-black/90 backdrop-blur-xl border border-divider px-4"
        startContent={<Command className="w-4 h-4 text-default-500" />}
        endContent={
          <div className="hidden sm:flex items-center text-small">
            <Kbd keys={["command"]}>K</Kbd>
          </div>
        }
      >
        <span className="text-default-500">Quick Actions...</span>
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        size="lg"
        classNames={{
          base: "max-h-[85vh] bg-background dark:bg-content1",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="p-4 border-b border-divider">
                <Input
                  autoFocus
                  placeholder="Search actions..."
                  value={search}
                  onValueChange={handleSearch}
                  startContent={<Command className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    input: "ml-2",
                  }}
                />
              </div>
              <div className="flex gap-2 p-2 border-b border-divider">
                <Button
                  size="sm"
                  variant={selectedCategory === null ? "solid" : "flat"}
                  onPress={() => handleCategorySelect(null)}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "solid" : "flat"}
                    onPress={() => handleCategorySelect(category)}
                    startContent={
                      <Icon 
                        icon={actions.find(a => a.category === category)?.icon || ""} 
                        className="w-4 h-4"
                      />
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollShadow className="max-h-[60vh]">
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => handleAction(key.toString())}
                  className="p-0 gap-0 divide-y divide-divider"
                >
                  {filteredActions.map((action) => (
                    <ListboxItem
                      key={action.id}
                      startContent={
                        <Icon 
                          icon={action.icon} 
                          className="w-4 h-4 text-default-400"
                        />
                      }
                      endContent={
                        action.shortcut && (
                          <div className="hidden sm:flex items-center gap-1">
                            {action.shortcut.map((key, i) => (
                              <Kbd key={i} keys={[key]} />
                            ))}
                          </div>
                        )
                      }
                      description={action.category}
                    >
                      {action.title}
                    </ListboxItem>
                  ))}
                </Listbox>
              </ScrollShadow>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
} 