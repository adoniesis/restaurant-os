import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            businessName,
            businessType,
            ownerName,
            email,
            password,
            phone,
            address,
            primaryColor,
            secondaryColor,
            operatingHours,
            deliveryRadius,
            plan
        } = body

        if (!email || !password || !businessName) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'El correo ya está registrado' },
                { status: 400 }
            )
        }

        // Generate slug from business name
        const slug = businessName
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')

        const hashedPassword = await bcrypt.hash(password, 10)

        // Create Tenant and Admin User in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: businessName,
                    slug,
                    subdomain: slug, // Defaulting subdomain to slug for now
                    businessType,
                    email,
                    phone,
                    address,
                    primaryColor: primaryColor || '#2563eb',
                    secondaryColor: secondaryColor || '#64748b',
                    operatingHours: operatingHours ? { info: operatingHours } : undefined,
                    deliveryRadius: parseInt(deliveryRadius) || 5,
                    plan: plan || 'basic',
                    status: 'active'
                }
            })

            const user = await tx.user.create({
                data: {
                    email,
                    name: ownerName,
                    passwordHash: hashedPassword,
                    role: 'admin',
                    tenantId: tenant.id
                }
            })

            return { tenant, user }
        })

        return NextResponse.json({
            message: 'Registro exitoso',
            user: { id: result.user.id, email: result.user.email },
            tenant: { id: result.tenant.id, slug: result.tenant.slug }
        })

    } catch (error: any) {
        console.error('Registration API Error:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor', details: error.message },
            { status: 500 }
        )
    }
}
