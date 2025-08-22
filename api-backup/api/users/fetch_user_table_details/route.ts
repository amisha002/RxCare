// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Define interfaces for our data
interface TokenData {
  id: string
  user_id: string
  token: string
  expires_at: Date
  created_at: Date
}

interface UserData {
  id: string
  email: string
  name: string
  age: number
  phone: string
  needs_caregiver: boolean
  created_at: Date
  updated_at: Date
}

interface FamilyMember {
  id: string
  user_id: string
  name: string
  relation: string
  created_at: Date
}

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove "Bearer " prefix

    // Verify token and get user ID
    const client = await pool.connect()
    
    try {
      // Check if token is valid and not expired
      const tokenQuery = `
        SELECT id, user_id, token, expires_at, created_at 
        FROM tokens 
        WHERE token = $1 AND expires_at > NOW()
      `
      const tokenResult = await client.query(tokenQuery, [token])
      
      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }

      const tokenData: TokenData = tokenResult.rows[0]
      const userId = tokenData.user_id

      // Fetch user data
      const userQuery = `
        SELECT id, email, name, age, phone, needs_caregiver, created_at, updated_at
        FROM users 
        WHERE id = $1
      `
      const userResult = await client.query(userQuery, [userId])
      
      if (userResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const userData: UserData = userResult.rows[0]

      // Fetch family members
      const familyQuery = `
        SELECT id, user_id, name, relation, created_at
        FROM family_members 
        WHERE user_id = $1
        ORDER BY created_at ASC
      `
      const familyResult = await client.query(familyQuery, [userId])
      const familyMembers: FamilyMember[] = familyResult.rows

      // Format response to match frontend expectations
      const responseData = {
        email: userData.email,
        name: userData.name,
        age: userData.age.toString(),
        phone: userData.phone,
        needsCaregiver: userData.needs_caregiver,
        familyMembers: familyMembers.map(member => ({
          id: member.id,
          name: member.name,
          relation: member.relation
        }))
      }

      return NextResponse.json(responseData)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const updateData = await request.json()

    // Verify token and get user ID
    const client = await pool.connect()
    
    try {
      // Check if token is valid
      const tokenQuery = `
        SELECT user_id 
        FROM tokens 
        WHERE token = $1 AND expires_at > NOW()
      `
      const tokenResult = await client.query(tokenQuery, [token])
      
      if (tokenResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }

      const userId = tokenResult.rows[0].user_id

      // Update user data
      const updateQuery = `
        UPDATE users 
        SET email = $1, age = $2, phone = $3, needs_caregiver = $4, updated_at = NOW()
        WHERE id = $5
        RETURNING id, email, name, age, phone, needs_caregiver, created_at, updated_at
      `
      const updateResult = await client.query(updateQuery, [
        updateData.email,
        parseInt(updateData.age),
        updateData.phone,
        updateData.needsCaregiver,
        userId
      ])

      if (updateResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 400 }
        )
      }

      // Handle family members updates if provided
      if (updateData.familyMembers) {
        // First, delete existing family members
        await client.query('DELETE FROM family_members WHERE user_id = $1', [userId])
        
        // Then insert new ones
        for (const member of updateData.familyMembers) {
          await client.query(
            'INSERT INTO family_members (user_id, name, relation) VALUES ($1, $2, $3)',
            [userId, member.name, member.relation]
          )
        }
      }

      // Fetch updated user data with family members
      const userQuery = `
        SELECT id, email, name, age, phone, needs_caregiver, created_at, updated_at
        FROM users 
        WHERE id = $1
      `
      const userResult = await client.query(userQuery, [userId])
      const userData: UserData = userResult.rows[0]

      const familyQuery = `
        SELECT id, user_id, name, relation, created_at
        FROM family_members 
        WHERE user_id = $1
        ORDER BY created_at ASC
      `
      const familyResult = await client.query(familyQuery, [userId])
      const familyMembers: FamilyMember[] = familyResult.rows

      // Format response
      const responseData = {
        email: userData.email,
        name: userData.name,
        age: userData.age.toString(),
        phone: userData.phone,
        needsCaregiver: userData.needs_caregiver,
        familyMembers: familyMembers.map(member => ({
          id: member.id,
          name: member.name,
          relation: member.relation
        }))
      }

      return NextResponse.json(responseData)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}