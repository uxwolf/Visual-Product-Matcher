// AI/ML utilities for visual similarity matching using Hugging Face Transformers.js

import { pipeline } from '@huggingface/transformers';
import { Product } from '../data/sampleProducts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let featureExtractor: any = null;
let modelInitialized = false;
let initializationPromise: Promise<void> | null = null;

// Cache for pre-computed product embeddings
const productEmbeddingsCache = new Map<number, number[]>();
const embeddingCache = new Map<string, number[]>();

// Initialize the CLIP model for feature extraction with better error handling
export const initializeModel = async (): Promise<void> => {
  if (modelInitialized && featureExtractor) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = new Promise((resolve, reject) => {
    const initModel = async () => {
      try {
        console.log('Initializing CLIP model...');
        
        // Set a timeout for model loading
        const timeoutPromise = new Promise((_, timeoutReject) => {
          setTimeout(() => {
            timeoutReject(new Error('Model initialization timed out after 30 seconds'));
          }, 30000); // 30 second timeout
        });

        const modelPromise = (async () => {
          // Try different model configurations
          const modelConfigs = [
            {
              model: 'Xenova/clip-vit-base-patch32',
              options: { device: 'webgpu' as const }
            },
            {
              model: 'Xenova/clip-vit-base-patch32',
              options: {}
            },
            {
              model: 'Xenova/clip-vit-base-patch16',
              options: {}
            }
          ];

          for (const config of modelConfigs) {
            try {
              console.log(`Trying model: ${config.model} with device: ${config.options?.device || "CPU"}`);
              
              // Use the correct pipeline type for image feature extraction
              featureExtractor = await pipeline(
                'image-feature-extraction',
                config.model,
                config.options
              );
              
              console.log(`✅ CLIP model initialized successfully: ${config.model}`);
              modelInitialized = true;
              return;
            } catch (configError) {
              console.warn(`Failed to initialize with ${config.model}:`, configError);
              continue; // Try next configuration
            }
          }
          
          throw new Error('All model configurations failed to initialize');
        })();

        // Race between timeout and model loading
        await Promise.race([modelPromise, timeoutPromise]);
        
        resolve();
      } catch (error) {
        console.error('Failed to initialize CLIP model:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to initialize AI model.';
        
        if (error instanceof Error) {
          if (error.message.includes('timeout')) {
            errorMessage = 'AI model initialization timed out. Please check your internet connection and try again.';
          } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage = 'Network error during AI model loading. Please check your internet connection.';
          } else if (error.message.includes('memory') || error.message.includes('out of memory')) {
            errorMessage = 'Insufficient memory to load AI model. Please close other applications and try again.';
          } else if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
            errorMessage = 'CORS error during model loading. Please try refreshing the page.';
          } else {
            errorMessage = `AI model initialization failed: ${error.message}`;
          }
        }
        
        reject(new Error(errorMessage));
      } finally {
        initializationPromise = null;
      }
    };

    initModel();
  });

  return initializationPromise;
};

// Extract features from an image with enhanced error handling and caching
export const extractImageFeatures = async (imageUrl: string): Promise<number[]> => {
  // Check cache first
  if (embeddingCache.has(imageUrl)) {
    console.log('Using cached features for:', imageUrl);
    return embeddingCache.get(imageUrl)!;
  }

  if (!featureExtractor) {
    await initializeModel();
  }
  
  try {
    console.log('Extracting features from image:', imageUrl);
    
    // Validate image URL format
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Invalid image URL provided');
    }
    
    // Check if it's a data URL or HTTP URL
    const isDataUrl = imageUrl.startsWith('data:');
    const isHttpUrl = imageUrl.startsWith('http://') || imageUrl.startsWith('https://');
    
    if (!isDataUrl && !isHttpUrl) {
      throw new Error('Invalid image URL format. Please provide a valid HTTP URL or data URL.');
    }
    
    // For HTTP URLs, check if the image is accessible
    if (isHttpUrl) {
      try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Image not accessible: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error('URL does not point to a valid image file');
        }
      } catch (fetchError) {
        console.warn('Failed to validate image URL:', fetchError);
        // Continue anyway, let the AI model handle it
      }
    }
    
    // Use the correct pipeline for image feature extraction
    // The CLIP model expects images, not URLs, so we need to use the image processing pipeline
    const output = await featureExtractor!(imageUrl, { 
      pooling: 'mean', 
      normalize: true 
    });
    
    if (!output || !output.data) {
      throw new Error('AI model returned invalid output');
    }
    
    const features = Array.from(output.data) as number[];
    console.log(`Extracted ${features.length} features from image`);
    
    // Validate features
    if (features.length === 0) {
      throw new Error('No features extracted from image');
    }
    
    // Check for invalid values
    const invalidValues = features.filter(f => typeof f !== 'number' || isNaN(f));
    if (invalidValues.length > 0) {
      console.warn(`Found ${invalidValues.length} invalid feature values`);
    }
    
    // Cache the result
    embeddingCache.set(imageUrl, features);
    
    return features;
  } catch (error) {
    console.error('Error extracting image features:', error);
    
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('pixel_values') || errorMessage.includes('missing inputs')) {
        throw new Error('Image preprocessing failed. Please try with a different image format (JPEG, PNG, or WebP).');
      } else if (errorMessage.includes('cors')) {
        throw new Error('Image cannot be processed due to CORS restrictions. Please use a different image or upload the file directly.');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        throw new Error('Network error while processing image. Please check your connection and try again.');
      } else if (errorMessage.includes('invalid') || errorMessage.includes('format')) {
        throw new Error('Invalid image format. Please use JPEG, PNG, or WebP images.');
      } else if (errorMessage.includes('not accessible') || errorMessage.includes('404')) {
        throw new Error('Image URL is not accessible. Please check the URL or upload the image directly.');
      } else if (errorMessage.includes('timeout')) {
        throw new Error('Image processing timed out. Please try with a smaller image or different URL.');
      } else if (errorMessage.includes('memory') || errorMessage.includes('out of memory')) {
        throw new Error('Image is too large to process. Please try with a smaller image.');
      }
      
      // If it's a specific error we recognize, pass it through
      if (errorMessage.includes('ai model') || errorMessage.includes('feature extractor')) {
        throw new Error(`AI processing error: ${error.message}`);
      }
    }
    
    // Generic error with more context
    throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}. Please try with a different image or check the image URL.`);
  }
};

// Calculate cosine similarity between two feature vectors with validation
export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  if (!vecA || !vecB) {
    throw new Error('Invalid feature vectors provided');
  }
  
  if (vecA.length !== vecB.length) {
    throw new Error(`Vector length mismatch: ${vecA.length} vs ${vecB.length}`);
  }
  
  if (vecA.length === 0) {
    return 0;
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    const a = vecA[i];
    const b = vecB[i];
    
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
      console.warn('Invalid values in feature vectors:', { a, b, index: i });
      continue;
    }
    
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  
  // Ensure similarity is within valid range [-1, 1] and convert to [0, 1]
  const normalizedSimilarity = Math.max(0, Math.min(1, (similarity + 1) / 2));
  
  return normalizedSimilarity;
};

// Pre-compute embeddings for all products (should be done once on app load)
export const precomputeProductEmbeddings = async (products: Product[]): Promise<void> => {
  if (!featureExtractor) {
    await initializeModel();
  }

  console.log('Pre-computing product embeddings...');
  
  // Process products in batches
  const batchSize = 5;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    
    await Promise.allSettled(
      batch.map(async (product) => {
        try {
          if (!productEmbeddingsCache.has(product.id)) {
            const features = await extractImageFeatures(product.imageUrl);
            productEmbeddingsCache.set(product.id, features);
            console.log(`Cached embeddings for product ${product.id}`);
          }
        } catch (error) {
          console.warn(`Failed to pre-compute embeddings for product ${product.id}:`, error);
        }
      })
    );
    
    // Small delay between batches
    if (i + batchSize < products.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log(`Pre-computed embeddings for ${productEmbeddingsCache.size} products`);
};

// Enhanced similarity calculation with category weighting
export const calculateEnhancedSimilarity = (
  vecA: number[], 
  vecB: number[], 
  productCategory: string
): number => {
  const baseSimilarity = cosineSimilarity(vecA, vecB);
  
  // Apply category-based weighting
  let enhancedSimilarity = baseSimilarity;
  
  // Boost similarity for certain categories based on common visual patterns
  const categoryBoosts: Record<string, number> = {
    'Footwear': 0.12,
    'Clothing': 0.10,
    'Accessories': 0.08,
    'Electronics': 0.05
  };
  
  const boost = categoryBoosts[productCategory] || 0;
  enhancedSimilarity = Math.min(1, enhancedSimilarity + boost);
  
  return enhancedSimilarity;
};

// Find similar products based on image features with enhanced processing
export const findSimilarProducts = async (
  imageUrl: string,
  products: Product[],
  minSimilarity: number = 0.1
): Promise<(Product & { similarity: number })[]> => {
  try {
    console.log(`Finding similar products for ${products.length} products...`);
    
    // Ensure model is initialized
    if (!modelInitialized || !featureExtractor) {
      throw new Error('AI model is not initialized. Please refresh the page and try again.');
    }
    
    // Extract features from uploaded image with retry mechanism
    let uploadedFeatures: number[];
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        uploadedFeatures = await extractImageFeatures(imageUrl);
        break; // Success, exit retry loop
      } catch (error) {
        retryCount++;
        console.warn(`Image processing attempt ${retryCount} failed:`, error);
        
        if (retryCount > maxRetries) {
          throw error; // Re-throw the error after all retries exhausted
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
    
    // Ensure we have pre-computed embeddings
    if (productEmbeddingsCache.size === 0) {
      console.log('Pre-computing product embeddings...');
      await precomputeProductEmbeddings(products);
    }
    
    const productsWithSimilarity: (Product & { similarity: number })[] = [];
    let processedCount = 0;
    let failedCount = 0;
    
    // Calculate similarities using pre-computed embeddings
    for (const product of products) {
      try {
        let productFeatures: number[];
        
        // Use cached embeddings if available
        if (productEmbeddingsCache.has(product.id)) {
          productFeatures = productEmbeddingsCache.get(product.id)!;
        } else {
          // Fallback: compute on-demand
          productFeatures = await extractImageFeatures(product.imageUrl);
          productEmbeddingsCache.set(product.id, productFeatures);
        }
        
        // Calculate enhanced similarity with category weighting
        const similarity = calculateEnhancedSimilarity(
          uploadedFeatures, 
          productFeatures, 
          product.category
        );
        
        productsWithSimilarity.push({
          ...product,
          similarity: Math.max(0, similarity)
        });
        
        processedCount++;
      } catch (error) {
        console.warn(`Failed to process product ${product.id}:`, error);
        failedCount++;
        productsWithSimilarity.push({
          ...product,
          similarity: 0
        });
      }
    }
    
    console.log(`Processed ${processedCount} products successfully, ${failedCount} failed`);
    
    // Apply advanced filtering and sorting
    const filteredResults = productsWithSimilarity
      .filter(product => product.similarity >= minSimilarity)
      .sort((a, b) => {
        // Primary sort by similarity
        if (Math.abs(a.similarity - b.similarity) > 0.05) {
          return b.similarity - a.similarity;
        }
        
        // Secondary sort by category relevance
        const categoryOrder = ['Footwear', 'Clothing', 'Accessories', 'Electronics'];
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        
        if (aIndex !== bIndex) {
          return aIndex - bIndex;
        }
        
        // Tertiary sort by price (lower price first)
        const aPrice = parseFloat(a.price?.replace('$', '') || '0');
        const bPrice = parseFloat(b.price?.replace('$', '') || '0');
        return aPrice - bPrice;
      });
    
    console.log(`Found ${filteredResults.length} similar products above threshold ${minSimilarity}`);
    
    return filteredResults;
    
  } catch (error) {
    console.error('Error finding similar products:', error);
    
    if (error instanceof Error) {
      throw new Error(`AI analysis failed: ${error.message}`);
    }
    
    throw new Error('AI analysis failed. Please try again.');
  }
};

// Utility function to test image processing with a known working image
export const testImageProcessing = async (): Promise<boolean> => {
  try {
    console.log('Testing image processing with a sample image...');
    
    // First check if model is initialized
    if (!modelInitialized || !featureExtractor) {
      console.log('Model not initialized, attempting to initialize...');
      await initializeModel();
    }
    
    // Use a simple, reliable test image
    const testImageUrl = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center';
    
    const features = await extractImageFeatures(testImageUrl);
    
    if (features && features.length > 0) {
      console.log('✅ Image processing test successful');
      return true;
    } else {
      console.error('❌ Image processing test failed: No features extracted');
      return false;
    }
  } catch (error) {
    console.error('❌ Image processing test failed:', error);
    return false;
  }
};

// Simple fallback similarity function for when AI is not available
export const createFallbackSimilarity = (products: Product[]): (Product & { similarity: number })[] => {
  console.log('Using fallback similarity calculation');
  
  return products.map(product => ({
    ...product,
    similarity: 0.5 + Math.random() * 0.3 // Random similarity between 0.5 and 0.8
  })).sort((a, b) => b.similarity - a.similarity);
};

// Utility function to check if model is ready
export const isModelReady = (): boolean => {
  return modelInitialized && featureExtractor !== null;
};

// Utility function to get model status
export const getModelStatus = (): { initialized: boolean; hasExtractor: boolean } => {
  return {
    initialized: modelInitialized,
    hasExtractor: featureExtractor !== null
  };
};

// Clear cache (useful for testing or memory management)
export const clearCache = (): void => {
  productEmbeddingsCache.clear();
  embeddingCache.clear();
  console.log('Cleared all embedding caches');
};