'use client'

import { Card, CardBody, Avatar, Input, Button, ScrollShadow } from "@nextui-org/react"

interface Message {
  id: number
  text: string
  timestamp: string
  isUser: boolean
}

export function ChatPanel() {
  const messages: Message[] = [
    {
      id: 1,
      text: "Good Morning!",
      timestamp: "10:55",
      isUser: false
    },
    {
      id: 2,
      text: "New document.doc",
      timestamp: "10:56",
      isUser: false
    },
    {
      id: 3,
      text: "If you have several children and at least one of them was born in the period from 01.01.2018 to 31.12.2022 inclusive, or you have a child with a category 'disabled child' born no later than 31.12.2022.",
      timestamp: "11:01",
      isUser: false
    }
  ]

  return (
    <Card className="h-[calc(100vh-6rem)] w-80">
      <CardBody className="p-0">
        <div className="flex h-full flex-col">
          <div className="border-b p-3">
            <div className="flex items-center gap-3">
              <Avatar
                isBordered
                color="primary"
                size="sm"
                src="https://i.pravatar.cc/150?u=assistant"
              />
              <div>
                <p className="text-small font-semibold">Assistant</p>
                <p className="text-tiny text-default-400">Online</p>
              </div>
            </div>
          </div>

          <ScrollShadow className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isUser ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar
                    className="flex-shrink-0"
                    size="sm"
                    src={message.isUser ? "https://i.pravatar.cc/150" : "https://i.pravatar.cc/150?u=assistant"}
                  />
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.isUser
                        ? 'bg-primary-500 text-white'
                        : 'bg-default-100'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-tiny mt-1 ${
                      message.isUser ? 'text-white/80' : 'text-default-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollShadow>

          <div className="border-t p-3">
            <div className="flex gap-2">
              <Input
                className="flex-grow"
                placeholder="Write a message..."
                size="sm"
                startContent={
                  <span className="text-default-400">💬</span>
                }
              />
              <Button
                isIconOnly
                color="primary"
                size="sm"
                aria-label="Send message"
              >
                📤
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
} 