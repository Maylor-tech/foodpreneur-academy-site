# FoodPreneur Academy Style Guide

## Brand Colors

### Primary Colors
- Dark Blue/Grey: `#2c3e50` (Headers, Footer)
- Orange: `#f39c12` (CTAs, Accents)
- White: `#ffffff` (Background)

### Secondary Colors
- Light Grey: `#555555` (Body Text)
- Lighter Grey: `#e0e0e0` (Borders)
- Off-White: `#f9f9f9` (Card Backgrounds)
- Hover Orange: `#e67e22` (CTA Hover)

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
  Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
```

### Font Sizes
- Hero Heading: 3em
- Page Headers: 2.5em
- Section Headers: 1.8em
- Course Titles: 1.4em
- Body Text: 1em
- Small Text: 0.9em

### Font Weights
- Regular: 400
- Semi-bold: 600
- Bold: 700

## Layout

### Container
- Max Width: 1140px
- Padding: 0 20px
- Centered with auto margins

### Spacing
- Section Padding: 40px 0
- Component Margin: 20px
- Text Block Margin: 15px
- List Item Spacing: 25px

### Grid System
- Course Cards: Auto-fit grid
- Minimum Column Width: 300px
- Gap: 30px

## Components

### Buttons
```css
.cta-button {
  padding: 12px 30px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
```

### Cards
```css
.course-item {
  padding: 25px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}
```

### Navigation
```css
nav ul li {
  display: inline-block;
  margin-left: 25px;
}
```

## Responsive Breakpoints

### Desktop (Default)
- Container: 1140px max-width
- Full navigation menu
- Grid: 3-4 columns

### Tablet (≤ 768px)
- Stacked navigation
- Grid: 2 columns
- Reduced font sizes
- Hero heading: 2.2em
- Page headers: 2em

### Mobile (≤ 480px)
- Single column layout
- Further reduced typography
- Hero heading: 1.8em
- Adjusted button padding
- Full-width components

## Animation

### Transitions
- Button Hover: 0.3s ease
- Card Hover: 0.3s ease
- Navigation Links: 0.3s ease

### Hover States
- Buttons: Color shift
- Cards: Shadow effect
- Links: Color change

## Images

### Requirements
- Format: WebP with JPG fallback
- Max Width: 1500px
- Optimization: Compressed
- Alt Text: Required
- Lazy Loading: Enabled

### Aspect Ratios
- Hero Images: 16:9
- Course Thumbnails: 3:2
- Icons: 1:1

## Accessibility

### Color Contrast
- Text on White: 4.5:1 minimum
- Large Text: 3:1 minimum
- Interactive Elements: Visible focus states

### Interactive Elements
- Focus Indicators: Visible
- Touch Targets: Minimum 44x44px
- Hover States: Clear feedback

## Code Standards

### CSS Organization
- BEM Naming Convention
- Component-based Structure
- Mobile-first Media Queries
- CSS Custom Properties for Theming

### HTML Structure
- Semantic Elements
- Proper Heading Hierarchy
- ARIA Labels where needed
- Valid HTML5 