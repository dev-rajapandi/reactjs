## **JSON Example**

```json
{
  "version": 5,
  "dataForRoots": [...],
  "timelineData": [...]
}
```

- **`version`:**

  - Value: `5`
  - Indicates the React Profiler format version. This ensures compatibility with tools analyzing the data.

- **`dataForRoots`:**

  - An array containing profiling data for each React root. In this case, it includes data for the root component `App`.

- **`timelineData`:**
  - Contains detailed timeline data for performance visualization. Includes information on rendering batches, component measures, React scheduling events, etc.

---

### **Data for Root Components**

```json
"dataForRoots": [
  {
    "commitData": [...],
    "displayName": "App",
    "initialTreeBaseDurations": [...],
    "operations": [...],
    "rootID": 1,
    "snapshots": [...]
  }
]
```

#### **Fields:**

1. **`commitData`:**

   ```json
   "commitData": [
     {
       "changeDescriptions": [...],
       "duration": 2014.2,
       "effectDuration": null,
       "fiberActualDurations": [...],
       "fiberSelfDurations": [...],
       "passiveEffectDuration": null,
       "priorityLevel": "Normal",
       "timestamp": 3776.2,
       "updaters": [...]
     }
   ]
   ```

   - **`changeDescriptions`:**

     - Provides details on what changed in components during the commit.  
       Example:
       ```json
       [
         [
           4,
           {
             "context": false,
             "didHooksChange": false,
             "isFirstMount": false,
             "props": [],
             "state": null,
             "hooks": null
           }
         ],
         [
           3,
           {
             "context": false,
             "didHooksChange": true,
             "isFirstMount": false,
             "props": [],
             "state": null,
             "hooks": [0]
           }
         ]
       ]
       ```
       - `4`: Changes for the component with ID 4 (`ExpensiveComponent`).
       - `3`: Changes for the component with ID 3 (`PauseWorkSimulation`).
       - Indicates `didHooksChange` is `true` for `PauseWorkSimulation`, meaning its hooks changed in this commit.

   - **`duration`:**

     - Total time spent rendering this commit: `2014.2 ms`.

   - **`effectDuration`:**

     - `null`, meaning no layout effects (`useLayoutEffect`) were applied.

   - **`fiberActualDurations`:**

     - Actual render durations for each component:
       ```json
       [
         [4, 2012.5],
         [3, 2014.2]
       ]
       ```
       - Component ID `4` (`ExpensiveComponent`) rendered in `2012.5 ms`.
       - Component ID `3` (`PauseWorkSimulation`) rendered in `2014.2 ms`.

   - **`fiberSelfDurations`:**

     - Time spent by each component excluding its children:
       ```json
       [
         [4, 2012.5],
         [3, 1.2]
       ]
       ```
       - `ExpensiveComponent` (`ID 4`) took `2012.5 ms` on its own.
       - `PauseWorkSimulation` (`ID 3`) only contributed `1.2 ms` directly.

   - **`passiveEffectDuration`:**

     - `null`, meaning no passive effects (`useEffect`) were applied.

   - **`priorityLevel`:**

     - Value: `"Normal"`
       - Indicates the render had normal priority, not user-blocking or high priority.

   - **`timestamp`:**

     - Value: `3776.2 ms`
       - When this commit started relative to profiling start.

   - **`updaters`:**
     - Components triggering the update:
       ```json
       [
         {
           "displayName": "PauseWorkSimulation",
           "id": 3,
           "key": null,
           "type": 5,
           "hocDisplayNames": null,
           "compiledWithForget": false
         }
       ]
       ```
       - `PauseWorkSimulation` (`ID 3`) triggered the update.

---

2. **`displayName`:**
   - Value: `"App"`
   - Root component's name is `App`.

---

3. **`initialTreeBaseDurations`:**
   ```json
   [
     [1, 2075.3],
     [2, 2073.5],
     [3, 2071.8],
     [4, 2070.9]
   ]
   ```
   - Base render durations during the initial render:
     - Root component (`ID 1`): `2075.3 ms`.
     - Component `App` (`ID 2`): `2073.5 ms`.
     - `PauseWorkSimulation` (`ID 3`): `2071.8 ms`.
     - `ExpensiveComponent` (`ID 4`): `2070.9 ms`.

---

4. **`operations`:**
   ```json
   [[1, 1, 0, 4, 4, 2012500, 4, 3, 2014199, 4, 2, 2015899, 4, 1, 2017699]]
   ```
   - Encoded operations for tree updates (used internally by React DevTools).

---

5. **`rootID`:**
   - Value: `1`
   - Unique identifier for this root.

---

6. **`snapshots`:**
   ```json
   [
     [1, { "id": 1, "children": [2], "displayName": null, "type": 11 }],
     [2, { "id": 2, "children": [3], "displayName": "App", "type": 5 }],
     [
       3,
       {
         "id": 3,
         "children": [4],
         "displayName": "PauseWorkSimulation",
         "type": 5
       }
     ],
     [
       4,
       {
         "id": 4,
         "children": [],
         "displayName": "ExpensiveComponent",
         "type": 5
       }
     ]
   ]
   ```
   - A hierarchical representation of the tree structure:
     - `ID 1`: Root component with child `App` (`ID 2`).
     - `ID 2`: `App` has a child `PauseWorkSimulation` (`ID 3`).
     - `ID 3`: `PauseWorkSimulation` has a child `ExpensiveComponent` (`ID 4`).

---

### **Timeline Data**

```json
"timelineData": [
  {
    "batchUIDToMeasuresKeyValueArray": [...],
    "componentMeasures": [...],
    "duration": 2037.1,
    "laneToLabelKeyValueArray": [...],
    "reactVersion": "19.0.0",
    "schedulingEvents": [...],
    "startTime": 23754.5
  }
]
```

#### **Fields:**

1. **`batchUIDToMeasuresKeyValueArray`:**

   - Details about render batches and their measurements.

2. **`componentMeasures`:**

   ```json
   [
     {
       "componentName": "PauseWorkSimulation",
       "duration": 0.9,
       "timestamp": 11.4
     },
     {
       "componentName": "ExpensiveComponent",
       "duration": 2012.5,
       "timestamp": 13
     }
   ]
   ```

   - `PauseWorkSimulation`: Rendered in `0.9 ms` at `11.4 ms`.
   - `ExpensiveComponent`: Rendered in `2012.5 ms` at `13 ms`.

3. **`duration`:**

   - Total timeline duration: `2037.1 ms`.

4. **`laneToLabelKeyValueArray`:**

   ```json
   [[1, "SyncHydrationLane"], [2, "Sync"], ...]
   ```

   - Maps React "lanes" (priority levels) to labels.

5. **`reactVersion`:**

   - Version of React used: `"19.0.0"`.

6. **`schedulingEvents`:**

   ```json
   [
     {
       "componentName": "PauseWorkSimulation",
       "lanes": [2],
       "timestamp": 10,
       "type": "schedule-state-update"
     }
   ]
   ```

   - `PauseWorkSimulation` scheduled a state update at `10 ms`.

7. **`startTime`:**
   - Profiling started at `23754.5 ms`.

---
