import { createClient } from 'contentful';

const client = createClient({
  space: 'yjw7maktjibt',
  accessToken: 'hfdEXgS4kY6-Xktou9n8FURWVhanDwaR8FAJNLD9obc',
});

export async function getHeroCarousel() {
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
}

export async function getBlogPosts() {
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
}
