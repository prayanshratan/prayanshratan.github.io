# Portfolio Website

A modern, responsive, and enterprise-grade portfolio website for a Product Manager, built with React, Vite, and Framer Motion.

## Features

- **Modern Design**: Clean, minimal aesthetics using proper typography (Inter) and whitespace.
- **Theme Support**: seamless Light and Dark mode toggle.
- **Responsive**: Fully responsive design for Mobile, Tablet, and Desktop.
- **Animations**: Subtle, premium animations using Framer Motion.
- **Performance**: High performance with Vite and optimized assets.

## Project Structure

```
├── src
│   ├── components
│   │   ├── Navbar.jsx      # Navigation with mobile support
│   │   ├── Hero.jsx        # Landing section
│   │   ├── Experience.jsx  # Work history
│   │   ├── Projects.jsx    # Case studies
│   │   ├── Skills.jsx      # Categorized skills
│   │   ├── Contact.jsx     # Contact section
│   │   └── Footer.jsx      # Footer
│   ├── App.jsx             # Main layout & Theme logic
│   ├── main.jsx            # Entry point
│   └── index.css           # Design system & Global styles
```

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Customization

-   **Content**: Edit the arrays in the component files (e.g., `experiences` array in `src/components/Experience.jsx`) to update your personal information.
-   **Colors**: Modify the CSS variables in `src/index.css` to change the color scheme.
