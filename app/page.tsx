"use client"

import * as React from "react"
import {
  Bell,
  ChevronDown,
  Folder,
  Info,
  Layers,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react"

import { Specimen } from "@/components/showcase/specimen"
import { SkinSwitcher, SkinStrip } from "@/components/showcase/skin-switcher"
import { ComparePanel } from "@/components/showcase/compare-panel"
import { TokenDeltaPanel } from "@/components/showcase/token-delta-panel"
import { TokenEditor } from "@/components/showcase/token-editor"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// ── Chart: ONE config, shared by every skin. The colors are token slots
//    (var(--chart-N)); each skin sets those tokens, so the chart recolors per
//    skin with zero changes here. This object is per-USAGE, not per-skin. ──
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 264, mobile: 140 },
]
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const NAV = [
  ["buttons", "Buttons"],
  ["badges", "Badges"],
  ["inputs", "Text Fields"],
  ["selection", "Selection"],
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
  ["chart", "Chart"],
] as const

export default function Page() {
  const [progress, setProgress] = React.useState(66)

  return (
    <TooltipProvider delayDuration={150}>
      <div className="app">
        {/* host toolbar — always available, repainted per skin */}
        <header className="app-bar">
          <span className="app-brand">
            <span className="app-brand-mark">
              <Layers className="size-4" />
            </span>
            shadcn/ui · concept skins
          </span>
          <span className="app-bar-controls">
            <label htmlFor="skin">skin</label>
            <SkinSwitcher />
          </span>
        </header>

        {/* the skinned surface */}
        <div className="stage">
          <div className="stage-head">
            <span className="stage-head-title">
              <Layers className="size-4" />
              Component Gallery
            </span>
            <span className="stage-head-buttons">
              <span aria-hidden>_</span>
              <span aria-hidden>▢</span>
              <span aria-hidden>✕</span>
            </span>
          </div>

          <div className="app-main">
            <aside className="app-nav">
              <nav className="app-nav-inner">
                <span className="app-nav-title">Components</span>
                {NAV.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </aside>

            <main className="gallery">
              <section className="hero">
                <div className="hero-kicker">$ shadcn skins — beyond theming</div>
                <h1 className="hero-title">
                  A theme editor recolors components. This re-conceptualizes them.
                </h1>
                <p className="hero-sub">
                  Every component on this page is the unmodified shadcn/ui
                  source. Tokens (tweakcn&apos;s territory) set its colors,
                  radius and fonts — the swappable <code>[data-skin]</code>{" "}
                  overlay adds what tokens never can: bevels, window chrome,
                  glow, press physics. Fifteen complete concepts, one click
                  apart, each with tunable shape knobs:
                </p>
                <SkinStrip />
              </section>

              <TokenDeltaPanel />

              <TokenEditor />

              <ComparePanel />

              <Specimen id="buttons" title="Button" tag="variants · sizes · states" slots={["button"]}>
                <div className="demo-col" style={{ gap: 16 }}>
                  <div className="demo-col">
                    <span className="demo-label">variants</span>
                    <div className="demo-row">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>
                  <div className="demo-col">
                    <span className="demo-label">sizes & icons</span>
                    <div className="demo-row">
                      <Button size="sm">Small</Button>
                      <Button>Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon" aria-label="Settings">
                        <Settings />
                      </Button>
                      <Button>
                        <Search data-icon="inline-start" />
                        Search
                      </Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </div>
                </div>
              </Specimen>

              <Specimen id="badges" title="Badge" tag="status pills" slots={["badge"]}>
                <div className="demo-row">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </Specimen>

              <Specimen id="inputs" title="Text Fields" tag="input · textarea · label" slots={["input", "textarea"]}>
                <div className="demo-grid demo-grid-2">
                  <div className="demo-col">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Ada Lovelace" />
                  </div>
                  <div className="demo-col">
                    <Label htmlFor="disabled">Disabled</Label>
                    <Input id="disabled" placeholder="read only" disabled />
                  </div>
                  <div className="demo-col" style={{ gridColumn: "1 / -1" }}>
                    <Label htmlFor="msg">Message</Label>
                    <Textarea id="msg" placeholder="Type your message…" rows={3} />
                  </div>
                </div>
              </Specimen>

              <Specimen id="selection" title="Selection Controls" tag="checkbox · radio · switch" slots={["checkbox", "radio-group-item", "switch"]}>
                <div className="demo-grid demo-grid-3">
                  <div className="demo-col">
                    <span className="demo-label">checkbox</span>
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> Notifications
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> Auto-update
                    </label>
                  </div>
                  <div className="demo-col">
                    <span className="demo-label">radio</span>
                    <RadioGroup defaultValue="a" className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="a" /> Option A
                      </label>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="b" /> Option B
                      </label>
                    </RadioGroup>
                  </div>
                  <div className="demo-col">
                    <span className="demo-label">switch</span>
                    <label className="flex items-center gap-2">
                      <Switch defaultChecked /> Wi-Fi
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch /> Bluetooth
                    </label>
                  </div>
                </div>
              </Specimen>

              <Specimen id="select" title="Select" tag="dropdown list box" slots={["select-trigger", "select-content", "select-item"]}>
                <div style={{ maxWidth: 260 }}>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a framework…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Meta-frameworks</SelectLabel>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="remix">Remix</SelectItem>
                        <SelectItem value="start">TanStack Start</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Build tools</SelectLabel>
                        <SelectItem value="vite">Vite</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Specimen>

              <Specimen id="card" title="Card" tag="composed surface" slots={["card"]}>
                <Card style={{ maxWidth: 360 }}>
                  <CardHeader>
                    <CardTitle>Project settings</CardTitle>
                    <CardDescription>Manage your deployment.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Builds run on push to <code>main</code>. Preview URLs are
                    generated for every pull request.
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button size="sm">Save</Button>
                    <Button size="sm" variant="secondary">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </Specimen>

              <Specimen id="tabs" title="Tabs" tag="segmented views" slots={["tabs-list", "tabs-trigger"]}>
                <Tabs defaultValue="general" style={{ maxWidth: 440 }} className="gap-0">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="border border-t-0 border-border p-3 text-sm">
                    General workspace preferences.
                  </TabsContent>
                  <TabsContent value="security" className="border border-t-0 border-border p-3 text-sm">
                    Two-factor authentication and sessions.
                  </TabsContent>
                  <TabsContent value="team" className="border border-t-0 border-border p-3 text-sm">
                    Invite and manage collaborators.
                  </TabsContent>
                </Tabs>
              </Specimen>

              <Specimen id="accordion" title="Accordion" tag="collapsible groups" slots={["accordion-trigger", "accordion-content"]}>
                <Accordion type="single" collapsible style={{ maxWidth: 520 }}>
                  <AccordionItem value="a">
                    <AccordionTrigger>What is the skin engine?</AccordionTrigger>
                    <AccordionContent>
                      A CSS overlay, scoped per skin, layered on top of stock
                      shadcn/ui components.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Do the components still work?</AccordionTrigger>
                    <AccordionContent>
                      Yes — only paint changes. Behavior and accessibility are
                      untouched.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Specimen>

              <Specimen id="alert" title="Alert" tag="inline callouts" slots={["alert"]}>
                <div className="demo-col" style={{ gap: 12 }}>
                  <Alert>
                    <Info />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                      Your changes have been saved.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <TriangleAlert />
                    <AlertTitle>Something went wrong</AlertTitle>
                    <AlertDescription>
                      The deployment failed. Check the build logs.
                    </AlertDescription>
                  </Alert>
                </div>
              </Specimen>

              <Specimen id="table" title="Table" tag="data grid" slots={["table", "table-head", "table-cell"]}>
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
                      ["index.tsx", "TypeScript", "2 KB"],
                      ["globals.css", "Stylesheet", "9 KB"],
                      ["logo.svg", "Vector", "4 KB"],
                    ].map(([name, type, size]) => (
                      <TableRow key={name}>
                        <TableCell className="flex items-center gap-2">
                          <Folder className="size-4 opacity-70" />
                          {name}
                        </TableCell>
                        <TableCell>{type}</TableCell>
                        <TableCell className="text-right">{size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Specimen>

              <Specimen id="dialog" title="Dialog" tag="modal window" slots={["dialog-content"]}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog…</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete project?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the project and all of its data.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Specimen>

              <Specimen id="menu" title="Dropdown Menu" tag="context actions" slots={["dropdown-menu-content", "dropdown-menu-item"]}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Actions
                      <ChevronDown data-icon="inline-end" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Project</DropdownMenuLabel>
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
                        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Specimen>

              <Specimen id="overlays" title="Tooltip & Popover" tag="floating info" slots={["tooltip-content", "popover-content"]}>
                <div className="demo-row">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Bell data-icon="inline-start" />
                        Hover me
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>3 unread notifications</TooltipContent>
                  </Tooltip>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="flex flex-col gap-1">
                        <strong className="text-sm">Dimensions</strong>
                        <p className="text-xs text-muted-foreground">
                          Set the width and height of the layer.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </Specimen>

              <Specimen id="ranges" title="Slider & Progress" tag="ranges" slots={["slider-track", "slider-range", "slider-thumb", "progress", "progress-indicator"]}>
                <div className="demo-col" style={{ gap: 22, maxWidth: 440 }}>
                  <div className="demo-col">
                    <span className="demo-label">slider</span>
                    <Slider defaultValue={[40]} max={100} step={1} />
                  </div>
                  <div className="demo-col">
                    <span className="demo-label">progress — {progress}%</span>
                    <Progress value={progress} />
                    <div className="demo-row">
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
              </Specimen>

              <Specimen id="chart" title="Chart" tag="recharts · token-driven" slots={["chart"]}>
                <ChartContainer config={chartConfig} className="max-h-[260px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </Specimen>
            </main>
          </div>
        </div>

        <footer className="app-status">
          <span>{NAV.length} components · stock shadcn/ui · radix base</span>
          <span>6 skins · one component set</span>
          <span>istanbul, 2026</span>
        </footer>
      </div>
    </TooltipProvider>
  )
}
