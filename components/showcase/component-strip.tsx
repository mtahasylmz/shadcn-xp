"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** A compact set of (non-portal) components, reused by the /embed route so the
 *  stock-vs-skinned compare can render the SAME markup in two iframes. */
export function ComponentStrip() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Delete</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="strip-input">Email</Label>
        <Input id="strip-input" placeholder="ada@example.com" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Subscribe
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Switch defaultChecked /> Notifications
        </label>
      </div>

      <Tabs defaultValue="a" className="gap-0">
        <TabsList>
          <TabsTrigger value="a">Account</TabsTrigger>
          <TabsTrigger value="b">Billing</TabsTrigger>
        </TabsList>
        <TabsContent
          value="a"
          className="border border-t-0 border-border p-3 text-sm"
        >
          Account settings.
        </TabsContent>
        <TabsContent
          value="b"
          className="border border-t-0 border-border p-3 text-sm"
        >
          Billing details.
        </TabsContent>
      </Tabs>

      <Progress value={62} />

      <Card>
        <CardHeader>
          <CardTitle>Upgrade plan</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          Unlock unlimited projects and priority support.
        </CardContent>
        <CardFooter>
          <Button size="sm">Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
