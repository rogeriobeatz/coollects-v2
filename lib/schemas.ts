import { z } from 'zod'

// Auth schemas
export const SignUpSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Item schemas
export const ItemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().optional(),
  series: z.string().optional(),
  condition: z.enum(['mint', 'near-mint', 'excellent', 'good', 'fair', 'poor']).optional(),
  value: z.number().positive().optional(),
})

export type ItemInput = z.infer<typeof ItemSchema>

// Collection schemas
export const CollectionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
})

export type CollectionInput = z.infer<typeof CollectionSchema>
