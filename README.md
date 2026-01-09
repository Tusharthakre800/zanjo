# ZANJO Digital Studio

ZANJO is a modern digital studio website showcasing web design capabilities. This project leverages cutting-edge web technologies to deliver a visually appealing and interactive user experience.

## Features
- **Responsive Design**: Ensures compatibility across devices.
- **Smooth Scrolling**: Powered by Locomotive Scroll for a seamless navigation experience.
- **3D Graphics**: Utilizes Three.js for rendering interactive 3D elements.
- **Custom Shaders**: Implements GLSL shaders for advanced visual effects.
- **Tailwind CSS**: Provides utility-first CSS for rapid UI development.
- **Vite**: A fast build tool for modern web projects.

## Project Structure
```
ZANJO/
├── index.html          # Main HTML file
├── main.js             # JavaScript entry point
├── package.json        # Project metadata and dependencies
├── postcss.config.js   # PostCSS configuration
├── style.css           # Global styles
├── tailwind.config.js  # Tailwind CSS configuration
├── vercel.json         # Vercel deployment configuration
├── vite.config.js      # Vite configuration
├── public/             # Static assets
│   ├── *.avif          # Images
│   └── localhost.html  # Example HTML file
└── shaders/            # GLSL shader files
    ├── fragmentShader.glsl
    └── vertexShader.glsl
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd ZANJO
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development
To start the development server:
```bash
npm run dev
```

## Deployment
This project is configured for deployment on Vercel. The `vercel.json` file includes rewrite rules for routing.

## Technologies Used
- **[Three.js](https://threejs.org/):** For 3D rendering.
- **[GSAP](https://greensock.com/gsap/):** For animations.
- **[Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/):** For smooth scrolling.
- **[Tailwind CSS](https://tailwindcss.com/):** For styling.
- **[Vite](https://vitejs.dev/):** For development and build tooling.

## License
This project is licensed under the MIT License.