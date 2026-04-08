# Adventure Game Tauri App

A desktop adventure game prototype built with Tauri, React, and Rust. The intended interaction loop is simple: the player types an action, the Rust backend decides whether that action is valid in the current world state, and the UI renders the result as part of a terminal-style game log.

The project already contains the beginnings of that backend model in Rust, plus a styled frontend shell for the game screen. The full gameplay loop is not wired together yet.

## Stack

- Tauri 2
- Rust
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/radix UI primitives

## Current State

The app currently has two major pieces:

1. A React UI shell in [`src/App.tsx`](/home/samsepi0l/dev/adventure-game/tauri-app/src/App.tsx)
2. A Rust domain model in [`src-tauri/src/entities`](/home/samsepi0l/dev/adventure-game/tauri-app/src-tauri/src/entities) and [`src-tauri/src/enums`](/home/samsepi0l/dev/adventure-game/tauri-app/src-tauri/src/enums)

What exists today:

- A terminal-inspired layout with an output log, command input, inventory dialog, and map dialog
- Styled but static example content in the UI
- A Rust data model for rooms, actions, map projection, scenario state, and intent/result enums
- A basic Tauri command setup with only the template `greet` command currently registered

What does not exist yet:

- No freeform command parser
- No gameplay engine that mutates `GameState`
- No Tauri command API that executes player actions
- No frontend integration with backend game state
- No real inventory, map, or history data flowing from Rust to React

## Intended Architecture

The intended design is backend-driven gameplay with a thin UI layer:

- The player types a command such as `open door`, `use key`, or `go north`
- Rust interprets that text into a player intent
- Rust validates whether the move or action is allowed in the current room and current state
- Rust updates flags, inventory, room visits, and position when appropriate
- React renders the resulting text log, current location, visible map nodes, and inventory

This keeps the game rules in Rust and the presentation layer in React.

## Rust Domain Model

The core gameplay structures are in [`src-tauri/src/entities`](/home/samsepi0l/dev/adventure-game/tauri-app/src-tauri/src/entities):

- `Action`: a data-driven interaction with verbs, targets, room/item/flag requirements, state mutations, and response messages
- `GameState`: current room, visited rooms, completed flags, and inventory
- `Room`: room identity, description, map coordinates, exits, and danger-zone marker
- `Scenario`: aggregate world object containing state, rooms, and available actions
- `MapNode`: UI-oriented room projection for map rendering
- `RoomStatus`: map rendering status for a room (`Current`, `Explored`, `Unexplored`, `Danger`)

Intent and result enums live in [`src-tauri/src/enums`](/home/samsepi0l/dev/adventure-game/tauri-app/src-tauri/src/enums):

- `PlayerIntent`: distinguishes actions, movement, system commands, and unknown input
- `ActionResult`: models action execution outcomes such as success, missing requirements, wrong room, or not found
- `MoveResult`: models movement success or failed exits

The important design direction here is that actions are meant to be data-driven rather than hardcoded room-by-room. `Action` already encodes required flags, required items, room restrictions, and post-action state changes.

## Frontend

The current React app in [`src/App.tsx`](/home/samsepi0l/dev/adventure-game/tauri-app/src/App.tsx) is a visual prototype of the game interface:

- Left sidebar for inventory and map
- Main panel for action history
- Bottom command input for typed interaction

The UI currently renders mock/example values only. It does not invoke Rust commands yet.

Shared UI primitives live under [`src/components/ui`](/home/samsepi0l/dev/adventure-game/tauri-app/src/components/ui), and global styling is in [`src/index.css`](/home/samsepi0l/dev/adventure-game/tauri-app/src/index.css).

## Tauri Boundary

The Tauri entrypoint is [`src-tauri/src/lib.rs`](/home/samsepi0l/dev/adventure-game/tauri-app/src-tauri/src/lib.rs).

Right now it:

- exposes the template `greet` command
- registers modules for `entities` and `enums`
- starts the Tauri app and opener plugin

The expected next step for gameplay is to replace or extend the template command layer with commands that:

- accept player input text
- resolve that input to `PlayerIntent`
- mutate `Scenario`/`GameState`
- return structured state plus displayable messages to the frontend

## Development

Install dependencies:

```bash
npm install
```

Run the frontend only:

```bash
npm run dev
```

Run the Tauri app:

```bash
npm run tauri dev
```

Build the frontend:

```bash
npm run build
```

Check the Rust backend:

```bash
cd src-tauri
cargo check
```

## Verification Notes

Observed status from the current codebase:

- `cargo check` passes
- `npm run build` currently fails because the TypeScript project-reference setup conflicts with `noEmit` in the TS config

That frontend build issue is separate from the game architecture itself, but it should be fixed before relying on production builds.

## Recommended Next Steps

- Add a real Tauri command for submitting player text
- Implement text parsing into `PlayerIntent`
- Add movement and action execution against `Scenario` and `GameState`
- Return serializable state snapshots for the map, inventory, and history log
- Replace static React placeholders with backend-driven data
