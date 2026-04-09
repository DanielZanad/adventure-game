import type { LucideIcon } from "lucide-react"

export type InventoryItem = {
  label: string
  icon: LucideIcon
}

export type HistoryEntryData = {
  command?: string
  result: string
  tone?: "primary" | "secondary"
}

export type MapNodeData = {
  id: string
  label?: string
  variant: "unexplored" | "explored" | "danger" | "current"
  x: number
  y: number
}

export type BackendRoomStatus = "Current" | "Explored" | "Unexplored" | "Danger"

export type BackendMapNode = {
  id: string
  name: string
  x: number
  y: number
  status: BackendRoomStatus
  exits: string[]
}

export type GameSnapshot = {
  current_room_name: string
  current_room_description: string
  inventory: string[]
  inventory_weight_label: string
  map_nodes: BackendMapNode[]
}

export type GameInitResponse = {
  intro_text: string
  snapshot: GameSnapshot
}

export type CommandResponse = {
  messages: string[]
  snapshot: GameSnapshot
}
