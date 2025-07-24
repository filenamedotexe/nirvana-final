import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    short: z.string(),
    price: z.string(),
    duration: z.string(),
  }),
});

const testimonials = defineCollection({
  schema: z.object({
    author: z.string(),
    rating: z.number().min(1).max(5),
    date: z.date(),
  }),
});

export const collections = { services, testimonials };