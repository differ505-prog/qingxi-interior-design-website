import { createClient } from 'contentful';

const contentfulSpaceId = import.meta.env.CONTENTFUL_SPACE_ID;
const contentfulAccessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN;

const client =
  contentfulSpaceId && contentfulAccessToken
    ? createClient({
        space: contentfulSpaceId,
        accessToken: contentfulAccessToken,
      })
    : null;

export const DEFAULT_RENOVATION_ESTIMATOR_CONFIG = {
  qualityLevels: {
    basic: { min: 4, max: 6 },
    standard: { min: 6, max: 10 },
    premium: { min: 10, max: 15 },
    luxury: { min: 15, max: 20 },
  },
  projectTypeMultipliers: {
    full: 1,
    partial: 0.6,
    'design-only': 0.15,
  },
  designFeePerPing: {
    min: 3,
    max: 5,
  },
  disclaimer:
    '此為粗略估算，實際費用需依據現場丈量、設計需求及選材而定',
};

const QUALITY_LEVEL_KEYS = ['basic', 'standard', 'premium', 'luxury'];
const PROJECT_TYPE_KEYS = ['full', 'partial', 'design-only'];

function toFiniteNumber(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function normalizeEstimatorConfig(fields = {}) {
  return {
    qualityLevels: {
      basic: {
        min: toFiniteNumber(
          fields.basicMin,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.basic.min,
        ),
        max: toFiniteNumber(
          fields.basicMax,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.basic.max,
        ),
      },
      standard: {
        min: toFiniteNumber(
          fields.standardMin,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.standard.min,
        ),
        max: toFiniteNumber(
          fields.standardMax,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.standard.max,
        ),
      },
      premium: {
        min: toFiniteNumber(
          fields.premiumMin,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.premium.min,
        ),
        max: toFiniteNumber(
          fields.premiumMax,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.premium.max,
        ),
      },
      luxury: {
        min: toFiniteNumber(
          fields.luxuryMin,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.luxury.min,
        ),
        max: toFiniteNumber(
          fields.luxuryMax,
          DEFAULT_RENOVATION_ESTIMATOR_CONFIG.qualityLevels.luxury.max,
        ),
      },
    },
    projectTypeMultipliers: {
      full: toFiniteNumber(
        fields.fullMultiplier,
        DEFAULT_RENOVATION_ESTIMATOR_CONFIG.projectTypeMultipliers.full,
      ),
      partial: toFiniteNumber(
        fields.partialMultiplier,
        DEFAULT_RENOVATION_ESTIMATOR_CONFIG.projectTypeMultipliers.partial,
      ),
      'design-only': toFiniteNumber(
        fields.designOnlyMultiplier,
        DEFAULT_RENOVATION_ESTIMATOR_CONFIG.projectTypeMultipliers['design-only'],
      ),
    },
    designFeePerPing: {
      min: toFiniteNumber(
        fields.designFeeMin,
        DEFAULT_RENOVATION_ESTIMATOR_CONFIG.designFeePerPing.min,
      ),
      max: toFiniteNumber(
        fields.designFeeMax,
        DEFAULT_RENOVATION_ESTIMATOR_CONFIG.designFeePerPing.max,
      ),
    },
    disclaimer:
      typeof fields.disclaimer === 'string' && fields.disclaimer.trim()
        ? fields.disclaimer.trim()
        : DEFAULT_RENOVATION_ESTIMATOR_CONFIG.disclaimer,
  };
}

function validateEstimatorConfig(config) {
  const normalizedConfig = structuredClone(config);

  for (const key of QUALITY_LEVEL_KEYS) {
    const range = normalizedConfig.qualityLevels[key];
    if (range.min > range.max) {
      [range.min, range.max] = [range.max, range.min];
    }
  }

  for (const key of PROJECT_TYPE_KEYS) {
    normalizedConfig.projectTypeMultipliers[key] = Math.max(
      0,
      normalizedConfig.projectTypeMultipliers[key],
    );
  }

  const { designFeePerPing } = normalizedConfig;
  if (designFeePerPing.min > designFeePerPing.max) {
    [designFeePerPing.min, designFeePerPing.max] = [
      designFeePerPing.max,
      designFeePerPing.min,
    ];
  }

  return normalizedConfig;
}

export async function getHeroCarousel() {
  try {
    if (!client) {
      console.warn('Contentful credentials are missing. Hero carousel fallback is used.');
      return [];
    }

    const entries = await client.getEntries({
      content_type: 'heroCarousel',
      order: 'fields.order',
    });
    
    return entries.items.map(item => ({
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.image?.fields?.file?.url,
      animationEffect: item.fields.animationEffect,
      order: item.fields.order,
    }));
  } catch (error) {
    console.error('Error fetching hero carousel:', error);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    if (!client) {
      console.warn('Contentful credentials are missing. Blog posts fallback is used.');
      return [];
    }

    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    });
    
    return entries.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      coverImage: item.fields.coverImage?.fields?.file?.url,
      author: item.fields.author,
      publishDate: item.fields.publishDate,
      tags: item.fields.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getRenovationEstimatorConfig() {
  try {
    if (!client) {
      console.warn(
        'Contentful credentials are missing. Renovation estimator default config is used.',
      );
      return DEFAULT_RENOVATION_ESTIMATOR_CONFIG;
    }

    const entries = await client.getEntries({
      content_type: 'renovationEstimatorConfig',
      limit: 1,
    });

    if (!entries.items.length) {
      return DEFAULT_RENOVATION_ESTIMATOR_CONFIG;
    }

    return validateEstimatorConfig(normalizeEstimatorConfig(entries.items[0].fields));
  } catch (error) {
    console.error('Error fetching renovation estimator config:', error);
    return DEFAULT_RENOVATION_ESTIMATOR_CONFIG;
  }
}
