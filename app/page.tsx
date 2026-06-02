"use client"

import * as React from "react"
import {
  Bell,
  ChevronDown,
  Folder,
  Info,
  Monitor,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react"

import { XPWindow, XPPanel, XPDemoRow } from "@/components/xp/chrome"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const NAV = [
  ["buttons", "Buttons"],
  ["badges", "Badges"],
  ["inputs", "Text Fields"],
  ["selection", "Selection Controls"],
  ["select", "Select"],
  ["card", "Card"],
  ["tabs", "Tabs"],
  ["accordion", "Accordion"],
  ["alert", "Alerts"],
  ["table", "Table"],
  ["dialog", "Dialog"],
  ["menu", "Dropdown Menu"],
  ["overlays", "Tooltip & Popover"],
  ["ranges", "Slider & Progress"],
] as const

export default function Page() {
  const [progress, setProgress] = React.useState(66)

  return (
    <TooltipProvider delayDuration={150}>
      <main className="mx-auto w-full max-w-[1040px] px-3 py-6 sm:py-10">
        <XPWindow
          title="shadcn/ui — Windows XP Edition"
          icon={<Monitor className="size-4 text-white" />}
        >
          {/* menubar */}
          <nav className="xp-menubar">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Favorites</span>
            <span>Help</span>
          </nav>

          <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-[180px_1fr]">
            {/* left explorer nav */}
            <aside className="hidden md:block">
              <div className="xp-panel sticky top-4">
                <div className="xp-panel-header">
                  <span>Components</span>
                </div>
                <div className="xp-panel-body !p-1.5">
                  <nav className="xp-nav">
                    {NAV.map(([id, label]) => (
                      <a key={id} href={`#${id}`}>
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* content */}
            <div className="flex flex-col gap-2">
              {/* hero terminal */}
              <div className="xp-terminal">
                <div className="xp-terminal-slogan">
                  C:\&gt; shadcn add --theme windows-xp
                </div>
                <p>
                  Every shadcn/ui component, reskinned in the Windows XP “Luna”
                  theme — beveled controls, putty greys, and that unmistakable
                  blue title bar.
                </p>
              </div>

              {/* BUTTONS */}
              <XPPanel id="buttons" title="Button" tag="variants · sizes · states">
                <div className="flex flex-col gap-4">
                  <XPDemoRow label="variants">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </XPDemoRow>
                  <XPDemoRow label="sizes">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" aria-label="Settings">
                      <Settings />
                    </Button>
                  </XPDemoRow>
                  <XPDemoRow label="with icon / disabled">
                    <Button>
                      <Search data-icon="inline-start" />
                      Search
                    </Button>
                    <Button disabled>Disabled</Button>
                  </XPDemoRow>
                </div>
              </XPPanel>

              {/* BADGES */}
              <XPPanel id="badges" title="Badge" tag="status pills">
                <XPDemoRow>
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </XPDemoRow>
              </XPPanel>

              {/* INPUTS */}
              <XPPanel id="inputs" title="Text Fields" tag="input · textarea · label">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">File name</Label>
                    <Input id="name" placeholder="untitled.txt" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="disabled">Disabled</Label>
                    <Input id="disabled" placeholder="read only" disabled />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label htmlFor="msg">Message</Label>
                    <Textarea id="msg" placeholder="Type your message…" rows={3} />
                  </div>
                </div>
              </XPPanel>

              {/* SELECTION CONTROLS */}
              <XPPanel
                id="selection"
                title="Selection Controls"
                tag="checkbox · radio · switch"
              >
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      checkbox
                    </span>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> Show hidden files
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Read-only
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      radio
                    </span>
                    <RadioGroup defaultValue="tiles" className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="tiles" /> Tiles
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="icons" /> Icons
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="list" /> List
                      </label>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      switch
                    </span>
                    <label className="flex items-center gap-2">
                      <Switch defaultChecked /> Wi-Fi
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch /> Bluetooth
                    </label>
                  </div>
                </div>
              </XPPanel>

              {/* SELECT */}
              <XPPanel id="select" title="Select" tag="dropdown list box">
                <div className="max-w-xs">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a drive…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Local Disks</SelectLabel>
                        <SelectItem value="c">(C:) Local Disk</SelectItem>
                        <SelectItem value="d">(D:) Data</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Removable</SelectLabel>
                        <SelectItem value="a">(A:) Floppy</SelectItem>
                        <SelectItem value="e">(E:) CD-ROM</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </XPPanel>

              {/* CARD */}
              <XPPanel id="card" title="Card" tag="composed surface">
                <Card className="max-w-sm">
                  <CardHeader>
                    <CardTitle>System Properties</CardTitle>
                    <CardDescription>
                      Microsoft Windows XP Professional
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-[13px]">
                    Registered to: Bosphorify. Service Pack 3. 512 MB of RAM.
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm">OK</Button>
                    <Button size="sm" variant="secondary">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </XPPanel>

              {/* TABS */}
              <XPPanel id="tabs" title="Tabs" tag="property sheet">
                <Tabs defaultValue="general" className="max-w-md gap-0">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="sharing">Sharing</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="general"
                    className="border border-t-0 border-[#808080] bg-[#ece9d8] p-3 text-[13px]"
                  >
                    General settings for this volume.
                  </TabsContent>
                  <TabsContent
                    value="tools"
                    className="border border-t-0 border-[#808080] bg-[#ece9d8] p-3 text-[13px]"
                  >
                    Error-checking and defragmentation tools.
                  </TabsContent>
                  <TabsContent
                    value="sharing"
                    className="border border-t-0 border-[#808080] bg-[#ece9d8] p-3 text-[13px]"
                  >
                    Share this folder on the network.
                  </TabsContent>
                </Tabs>
              </XPPanel>

              {/* ACCORDION */}
              <XPPanel id="accordion" title="Accordion" tag="collapsible groups">
                <Accordion type="single" collapsible className="max-w-lg">
                  <AccordionItem value="a">
                    <AccordionTrigger>What is this?</AccordionTrigger>
                    <AccordionContent>
                      A faithful Windows XP reskin of the shadcn/ui component
                      library.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes — it keeps Radix primitives, only the paint changes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </XPPanel>

              {/* ALERTS */}
              <XPPanel id="alert" title="Alert" tag="inline callouts">
                <div className="flex flex-col gap-3">
                  <Alert>
                    <Info />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                      Your settings have been saved successfully.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <TriangleAlert />
                    <AlertTitle>Low disk space</AlertTitle>
                    <AlertDescription>
                      Drive (C:) is running out of space.
                    </AlertDescription>
                  </Alert>
                </div>
              </XPPanel>

              {/* TABLE */}
              <XPPanel id="table" title="Table" tag="details view" bodyClassName="!p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["readme.txt", "Text Document", "2 KB"],
                      ["setup.exe", "Application", "4.1 MB"],
                      ["photo.bmp", "Bitmap Image", "900 KB"],
                    ].map(([name, type, size]) => (
                      <TableRow key={name}>
                        <TableCell className="flex items-center gap-2">
                          <Folder className="size-4 text-[#d8a400]" />
                          {name}
                        </TableCell>
                        <TableCell>{type}</TableCell>
                        <TableCell className="text-right">{size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </XPPanel>

              {/* DIALOG */}
              <XPPanel id="dialog" title="Dialog" tag="modal window">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog…</Button>
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    <div className="xp-titlebar">
                      <span className="xp-titlebar-title">
                        <Bell className="size-4" /> Confirm
                      </span>
                      <span className="xp-titlebar-buttons">
                        <DialogClose
                          className="xp-caption-btn xp-caption-btn--close"
                          aria-label="Close"
                        >
                          ✕
                        </DialogClose>
                      </span>
                    </div>
                    <div className="p-4">
                      <DialogHeader>
                        <DialogTitle>Delete this file?</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to move “setup.exe” to the Recycle
                          Bin?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4 gap-2">
                        <DialogClose asChild>
                          <Button size="sm">Yes</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button size="sm" variant="secondary">
                            No
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </XPPanel>

              {/* DROPDOWN MENU */}
              <XPPanel id="menu" title="Dropdown Menu" tag="context actions">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Actions
                      <ChevronDown data-icon="inline-end" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>File</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Open
                        <DropdownMenuShortcut>↵</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Rename
                        <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
                        <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </XPPanel>

              {/* TOOLTIP + POPOVER */}
              <XPPanel id="overlays" title="Tooltip & Popover" tag="floating info">
                <XPDemoRow>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Bell data-icon="inline-start" />
                        Hover me
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications: 3 unread</TooltipContent>
                  </Tooltip>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="flex flex-col gap-1">
                        <strong className="text-[13px]">Display Properties</strong>
                        <p className="text-[12px] text-muted-foreground">
                          Adjust your screen resolution and color quality here.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </XPDemoRow>
              </XPPanel>

              {/* SLIDER + PROGRESS */}
              <XPPanel id="ranges" title="Slider & Progress" tag="ranges">
                <div className="flex max-w-md flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      slider
                    </span>
                    <Slider defaultValue={[40]} max={100} step={1} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      progress — copying files… {progress}%
                    </span>
                    <Progress value={progress} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setProgress((p) => Math.max(0, p - 10))}
                      >
                        −10%
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setProgress((p) => Math.min(100, p + 10))}
                      >
                        +10%
                      </Button>
                    </div>
                  </div>
                </div>
              </XPPanel>

              <Separator className="my-1 bg-[#808080]" />
            </div>
          </div>

          {/* statusbar */}
          <div className="xp-statusbar">
            <span>{NAV.length} components · shadcn/ui · radix base</span>
            <span>Luna theme</span>
            <span>istanbul, 2026</span>
          </div>
        </XPWindow>
      </main>
    </TooltipProvider>
  )
}
