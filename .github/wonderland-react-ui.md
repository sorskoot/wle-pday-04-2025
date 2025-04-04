# Instructions for Using Components to Create a UI with Wonderland React-UI

**Important:** The root UI component rendered by your Wonderland Engine component must extend `ReactUiBase` (or be rendered by a class that extends it). This class provides the bridge between React and Wonderland Engine.

## 0. Prerequisites

- `@wonderlandengine/react-ui` is required in the package.json to use the React-UI library
- Layout is using Yoga internally
- In essense this is React, but the renderer is custom, so NO REACT-DOM is used. Everything is rendered using Wonderland Engine directly into the WebGL Canvas.

## 1. Structure with Layout Components

- Use `<Container>`, `<Row>`, and `<Column>` to define the layout structure.
  - `<Row>` arranges children horizontally.
  - `<Column>` arranges children vertically.
  - `<Container>` is a general-purpose layout block.

## 2. Add Visual Elements

- **Panels:**
  - Use `<Panel>` for rectangular backgrounds or borders.
  - Use `<Panel9Slice>` for scalable panels using a 9-slice texture.
- **Images:**
  - Use `<Image>` to display textures with the `src` prop.
- **Text:**
  - Use `<Text>` to display text content. Customize with `color`, `fontSize`, etc.
  - prefer to write text in the 'text' property like `text={`Score: ${score}`}`
- **Buttons:**
  - Use `<Button>` for interactive elements. Customize `hovered` and `active` states.
- **Progress Bars:**
  - Use `<ProgressBar>` to display progress with the `value` prop (0 to 1).

## 3. Apply Materials and Themes

- Wrap your UI in `MaterialContext.Provider` to provide default materials.
- Wrap your UI in `ThemeContext.Provider` to provide default theme colors.
- Override defaults by passing props directly to components.
- **Color Type:** Colors can be specified as:
  - Hex strings (e.g., `\'#FF0000\'`, `\'#f00\`, `\'#FF00FF80\'` for RGBA).
  - A `Float32Array` of length 4 (RGBA, values 0.0-1.0).
  - A single number representing packed RGBA (e.g., `0xFF0000FF` for opaque red).
- The properties `textMaterial`, `panelMaterial`and `panelMaterialTextured` are provided by the base class `ReactUiBase`

## 4. Nesting

- Combine components by nesting them. For example, place `<Text>` inside a `<Button>` or arrange multiple `<Panel>` components within a `<Row>` or `<Column>`.

## 5. Layout Properties (Yoga)

These properties can be applied to layout components (`<Container>`, `<Row>`, `<Column>`) and most visual elements to control their size, position, and flexbox behavior within the layout.

- **Dimensions:**
  - `height`, `width`: Sets the height/width (number, string: 'auto', or string: 'X%').
  - `minHeight`, `minWidth`: Sets the minimum height/width (number or string: 'X%').
  - `maxHeight`, `maxWidth`: Sets the maximum height/width (number or string: 'X%').
  - `aspectRatio`: Sets the aspect ratio (number).
- **Flexbox Container (`<Container>`, `<Row>`, `<Column>`):**
  - `flexDirection`: Sets the direction of the main axis (enum: `FlexDirection.Row`, `FlexDirection.Column`, `FlexDirection.RowReverse`, `FlexDirection.ColumnReverse`). Default: `FlexDirection.Column` for `<Container>`, `<Column>`; `FlexDirection.Row` for `<Row>`.
  - `alignItems`: Aligns children along the cross axis (enum: `Align.FlexStart`, `Align.Center`, `Align.FlexEnd`, `Align.Stretch`, `Align.Baseline`). Default: `Align.Stretch`.
  - `alignContent`: Aligns lines within the container when there's extra space on the cross axis (enum: `Align.FlexStart`, `Align.Center`, `Align.FlexEnd`, `Align.Stretch`, `Align.SpaceBetween`, `Align.SpaceAround`). Default: `Align.FlexStart`.
  - `justifyContent`: Aligns children along the main axis (enum: `Justify.FlexStart`, `Justify.Center`, `Justify.FlexEnd`, `Justify.SpaceBetween`, `Justify.SpaceAround`, `Justify.SpaceEvenly`). Default: `Justify.FlexStart`.
  - `flexWrap`: Controls whether children wrap (enum: `Wrap.NoWrap`, `Wrap.Wrap`, `Wrap.WrapReverse`). Default: `Wrap.NoWrap`.
  - `gap`, `rowGap`, `columnGap`: Sets the gap between children (number).
- **Flexbox Item (Children of Flex Containers):**
  - `flex`: Shorthand for `flexGrow`, `flexShrink`, `flexBasis` (number).
  - `flexGrow`: How much an item should grow (number).
  - `flexShrink`: How much an item should shrink (number).
  - `flexBasis`: The default size of an item before distributing space (number, string: 'auto', or string: 'X%').
  - `alignSelf`: Overrides the container's `alignItems` for a single item (enum: `Align.Auto`, `Align.FlexStart`, `Align.Center`, `Align.FlexEnd`, `Align.Stretch`, `Align.Baseline`). Default: `Align.Auto`.
- **Spacing:**
  - `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`: Sets outer spacing (number, string: 'auto', or string: 'X%').
  - `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`: Sets inner spacing (number or string: 'X%').
- **Border:**
  - `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight`: Sets border width (number). *Note: Visual border appearance is controlled by `<Panel>` props like `borderColor`, `borderSize`.*
  - `rounding` is used to round the borders. This defaults to 20. To have sharp corners set this value to 0.
- **Positioning:**
  - `position`: Sets the positioning type (enum: `PositionType.Relative`, `PositionType.Absolute`). Default: `PositionType.Relative`.
  - `top`, `left`, `right`, `bottom`: Sets the offset for `absolute` positioned items (number or string: 'X%').
- **Other:**
  - `display`: Controls if the element is rendered (enum: `Display.Flex`, `Display.None`). Default: `Display.Flex`.
  - `overflow`: How content overflowing the element's bounds is handled (enum: `Overflow.Visible`, `Overflow.Hidden`, `Overflow.Scroll`). Default: `Overflow.Hidden`.
  - `isReferenceBaseline`: (boolean)
  - `z`: Relative z-index offset (number). Be careful with this property. In perspective view the objects come closer to the camera with a higher Z

## Example

```tsx
import React from 'react';
import { Texture } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
// Use package imports
import { Column, Button, Text, MaterialContext, ThemeContext } from '@wonderlandengine/react-ui/components';
// Import the necessary enums and the base class
import { Align, Justify, ReactUiBase } from '@wonderlandengine/react-ui';

// Define your UI structure as a functional or class component
function MyUI() {
    const theme = {
        colors: {
            // Use hex color strings
            primary: '#0000FF', // blue
            text: '#FFFFFF',    // white
            background: '#333333' // dark grey
        }
    };

    // Assuming materials are provided by the WLE component via MaterialContext
    return (
        <ThemeContext.Provider value={theme}>
            <Column
                width={200}
                height={100}
                padding={10}
                backgroundColor={theme.colors.background}
                alignItems={Align.Center}
                justifyContent={Justify.SpaceAround}
            >
                <Text fontSize={18} text={'Welcome!'}></Text>
                <Button
                    padding={8}
                    backgroundColor={theme.colors.primary}
                    // Use hex color strings
                    hovered={{ backgroundColor: '#ADD8E6' }} // lightblue
                    active={{ backgroundColor: '#00008B' }}  // darkblue
                    rounding={5}
                >
                    <Text color={theme.colors.text} text={'Click Me'}></Text>
                </Button>
            </Column>
        </ThemeContext.Provider>
    );
}

// Create a Wonderland Engine component that extends ReactUiBase
export class MyReactUIComponent extends ReactUiBase {
    static TypeName = 'my-react-ui-component';

    // Define properties for materials, etc., accessible in the editor
    @property.material({required: true})
    textMaterial!: Material;

    @property.material({required: true})
    panelMaterial!: Material;

    @property.material({required: true})
    panelMaterialTextured!: Material;

    // The render method returns the React element to display
    render() {
        // Provide materials to the UI via context
        const materials = {
            panelMaterial: this.panelMaterial,
            panelMaterialTextured: this.panelMaterialTextured,
            textMaterial: this.textMaterial,
        };

        return (
            <MaterialContext.Provider value={materials}>
                <MyUI />
            </MaterialContext.Provider>
        );
    }
}
```
