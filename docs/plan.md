# Project Day Automation Game Plan (6-Hour Jam)

**Goal:** Create a playable prototype demonstrating the core loop: resource extraction -> transport -> processing -> delivery -> unlock.

## Phase 1: Core Loop Foundation (2 hours)

1. **Grid & Placement (30 mins):**
    * Implement basic grid placement. Simple grid using planes or lines.
    * `GridManagerComponent`: World-to-grid coordinate conversion.
    * `PlayerInputComponent`: Handle mouse clicks to identify grid cells.
2. **Resource Spawning & Mining (30 mins):**
    * Create a single resource node type (e.g., Wood).
    * `ResourceNodeVisualComponent`: Display a simple tree model.
    * `MinerComponent`: Placeable on the resource node. Hardcode mining time.
    * `MinerSystem`: Basic logic to "extract" a resource after a delay. No inventory yet, just a flag.
3. **Basic Belt Transport (45 mins):**
    * Implement straight belts only.
    * `BeltVisualComponent`: Simple rectangular mesh.
    * `BeltComponent`: Direction property.
    * `BeltSystem`: Move a single resource "item" from the Miner's output to the belt's "end". No actual item entities yet, just a visual representation moving along the belt.
4. **Hub & Delivery (15 mins):**
    * `HubComponent`: Requires 10 Wood.
    * `HubSystem`: Detect when a resource reaches the Hub "input". Increment the count. Win condition if the count is met.
    * `UiManagerComponent`: Display the Hub's requirement (text only).

**Goal:** At the end of Phase 1, be able to place a miner, have it extract a resource, see it visually move along a belt, and register at the Hub, triggering a win.

## Phase 2: Core Loop Polish & Tier 1 (2 hours)

1. **Resource Items as Entities (30 mins):**
    * Create `ResourceItemComponent` and `ItemVisualComponent`.
    * `MinerSystem` creates a `ResourceItem` entity when mining is complete.
    * `BeltSystem` moves the `ResourceItem` entity along the belt, updating its position.
    * `HubSystem` detects the `ResourceItem` entity arriving.
2. **Sawmill & Basic Processing (45 mins):**
    * Implement the Sawmill.
    * `ProcessorComponent`: Recipe (Wood -> Plank), processing time.
    * `ProcessorSystem`: Take Wood from input, process, output Plank.
    * Connect Miner -> Belt -> Sawmill -> Belt -> Hub.
3. **Tier 1 Unlock (30 mins):**
    * Add Stone resource and Miner.
    * Tier 1 Goal: 10 Planks + 10 Stone.
    * Unlock Belts after Tier 0, Sawmill after Tier 1.

**Goal:** A functional Tier 1 loop with two resources, basic processing, and unlocking.

## Phase 3: Visuals & UI (1.5 hours)

1. **Improve Machine Visuals (30 mins):**
    * Replace primitive machine shapes with slightly more detailed (but still simple) models.
    * Add simple visual feedback for processing (e.g., a progress bar or color change).
2. **UI Polish (45 mins):**
    * Use React-UI for the Hub display. Show required items and current counts.
    * Add a simple building selection UI (buttons for Miner, Belt, Sawmill).
    * `UiManagerComponent` extends `ReactUiBase`.
3. **Environment Polish (15 mins):**
    * Add distinct colored patches for resource nodes.

**Goal:** A visually appealing and understandable game with a basic UI.

## Phase 4: Bug Fixes & Polish (30 mins)

* Address any critical bugs.
* Add a simple "You Win!" message using React-UI.
* Tweak values for balance.

**Contingency Plan:**

* If running short on time, skip the UI polish and focus on getting Tier 1 fully functional.
* If *really* short on time, remove the Sawmill and just have the Hub require raw resources.

**Key Principles:**

* **Iterate rapidly:** Test after each small step.
* **Hardcode values:** Don't waste time on complex data structures unless absolutely necessary.
* **Focus on the core:** Don't get distracted by non-essential features.
* **Cut scope ruthlessly:** Be prepared to remove features if you're running behind.
