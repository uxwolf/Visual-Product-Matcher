# Visual Product Matcher

An AI-powered web application that finds visually similar products using advanced computer vision technology. Upload any product image and discover matching items with intelligent similarity analysis.

## Project Links

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/uxwolf/Visual-Product-Matcher)
[![Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-black?logo=vercel)](https://visual-product-matcher-26vi.vercel.app/)


## Features

- **AI-Powered Visual Search**: Uses CLIP model for intelligent image similarity matching
- **Real-time Processing**: Fast image analysis with pre-computed embeddings
- **Smart Filtering**: Adjustable similarity thresholds for precise results
- **Category Weighting**: Enhanced accuracy with category-based similarity boosting
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **AI/ML**: Hugging Face Transformers, ONNX Runtime
- **Styling**: Tailwind CSS, Radix UI Components
- **Image Processing**: CLIP model for feature extraction
- **Deployment**: Vercel-ready configuration

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd visual-product-matcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

### Building for Production

```bash
npm run build
npm run preview
```

## How It Works

### 1. Image Upload
- Drag & drop or paste image URLs
- Supports JPEG, PNG, and WebP formats
- Automatic image validation and processing

### 2. AI Analysis
- CLIP model extracts visual features
- Pre-computed product embeddings for speed
- Category-weighted similarity calculation

### 3. Smart Matching
- Multi-level sorting by similarity percentage
- Category relevance boosting
- Price-based secondary sorting

### 4. Results Display
- Grid layout with similarity scores
- Interactive similarity threshold filter
- Responsive design for all devices

## Project Structure

```
visual-product-matcher/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── ImageUploader.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SimilarityFilter.tsx
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   │   ├── imageUtils.ts
│   │   └── similarityUtils.ts
│   ├── data/               # Sample data
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── dist/                   # Build output
└── package.json
```

## Key Components

### ImageUploader
Handles image upload with drag & drop support and URL input.

### ProductGrid
Displays search results in a responsive grid with similarity scores.

### SimilarityFilter
Provides interactive threshold control for filtering results.

### similarityUtils
Core AI functionality including:
- CLIP model integration
- Feature extraction
- Similarity calculation
- Caching system

## Configuration

### Environment Variables
Create a `.env` file for custom configuration:

```env
VITE_API_URL=your_api_url
VITE_MODEL_PATH=path_to_clip_model
```

### AI Model Settings
The application uses the CLIP model for visual similarity. Model files are automatically downloaded on first use.

## Performance Optimizations

- **Pre-computed Embeddings**: Product features cached for faster searches
- **Batch Processing**: Efficient handling of multiple images
- **Lazy Loading**: Images load on demand
- **Memory Management**: Automatic cache cleanup

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

**AI Model Not Loading**
- Check internet connection
- Refresh the page
- Clear browser cache

**Slow Performance**
- Ensure sufficient RAM (4GB+ recommended)
- Close other browser tabs
- Check for browser extensions interfering

**Image Upload Issues**
- Verify image format (JPEG, PNG, WebP)
- Check image size (max 10MB)
- Ensure image URL is accessible

### Development Issues

**Build Errors**
```bash
npm run lint:fix
npm run type-check
```

**Dependency Issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hugging Face for the CLIP model
- ONNX Runtime for efficient inference
- Radix UI for accessible components
- Tailwind CSS for styling

---

**Built with modern web technologies**
