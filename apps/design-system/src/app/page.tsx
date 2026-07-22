'use client'

import { useState } from 'react'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarFallback,
} from '@msgsync/ui'
import {
  Moon,
  Sun,
} from 'lucide-react'

export default function Home() {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">MsgSync DS</h1>
              <Badge variant="secondary">v0.1.0</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-12">
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Design System</h2>
            <p className="text-muted-foreground mb-8">
              Reusable components built with Radix UI primitives and Tailwind CSS.
            </p>

            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="space-y-12">

                {/* Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Button</CardTitle>
                    <CardDescription>
                      Variants: default, destructive, outline, secondary, ghost, link
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Disabled</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Badge</CardTitle>
                    <CardDescription>
                      Variants: default, secondary, destructive, outline
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </CardContent>
                </Card>

                {/* Input */}
                <Card>
                  <CardHeader>
                    <CardTitle>Input</CardTitle>
                    <CardDescription>
                      Text input with focus ring and disabled state
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 max-w-sm">
                    <Input placeholder="Default input" />
                    <Input placeholder="Disabled" disabled />
                  </CardContent>
                </Card>

                {/* Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Card</CardTitle>
                    <CardDescription>
                      Content container with header, body, and footer slots
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Card content goes here. Cards are the primary content
                      container across the app.
                    </p>
                  </CardContent>
                </Card>

                {/* Switch */}
                <Card>
                  <CardHeader>
                    <CardTitle>Switch</CardTitle>
                    <CardDescription>Toggle control</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Switch />
                    <Switch defaultChecked />
                    <Switch disabled />
                  </CardContent>
                </Card>

                {/* Tabs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tabs</CardTitle>
                    <CardDescription>
                      Tabbed content regions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
                        Content for tab 1
                      </TabsContent>
                      <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
                        Content for tab 2
                      </TabsContent>
                      <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
                        Content for tab 3
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Avatar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Avatar</CardTitle>
                    <CardDescription>User avatar with fallback</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </CardContent>
                </Card>

              </TabsContent>
              <TabsContent value="code">
                <Card>
                  <CardContent className="p-6">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`import { Button, Badge, Card, Input, Switch, Tabs, Avatar } from '@msgsync/ui'

// Usage examples:
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Badge>New</Badge>
<Input placeholder="Type here..." />
<Switch />
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
  <TabsContent value="tab2">Content</TabsContent>
</Tabs>
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}
