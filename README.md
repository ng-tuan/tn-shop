# E-commerce Shop

A modern e-commerce product page built with React, Vite, and Tailwind CSS. This project features a clean, minimalist design with a responsive product grid layout.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Product Grid**: 4-column layout showcasing products with images, names, prices, and action buttons
- **Navigation**: Clean header with navigation links, search bar, and shopping cart
- **Modern UI**: Clean, minimalist design with hover effects and smooth transitions
- **Tailwind CSS**: Utility-first CSS framework for rapid development

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
shop/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles with Tailwind directives
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies and scripts
```

## Customization

- **Products**: Edit the `products` array in `App.jsx` to add, remove, or modify products
- **Styling**: Modify `src/index.css` to customize component styles
- **Layout**: Adjust the grid layout by modifying the `grid-cols-*` classes in the product grid
- **Colors**: Update the color scheme by modifying Tailwind classes throughout the components

## License

This project is open source and available under the MIT License.
