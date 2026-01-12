import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the user from the token
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Admin access restricted to specific emails
    const ADMIN_EMAILS = [
      'mail@tjark-osterloh.de',
      'simon@brandguys.se',
      'osamet67@gmail.com'
    ]
    if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Admin access denied' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action, userId } = await req.json()

    if (action === 'list') {
      // Fetch all users with their profiles and roles
      const { data: profiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('id, full_name, school_name, created_at')
        .order('created_at', { ascending: false })

      if (profilesError) throw profilesError

      // Fetch roles for all users
      const { data: roles, error: rolesError } = await supabaseClient
        .from('user_roles')
        .select('user_id, role')

      if (rolesError) throw rolesError

      // Get auth users to get email
      const { data: { users: authUsers }, error: authError } = await supabaseClient.auth.admin.listUsers()
      
      if (authError) throw authError

      // Combine the data
      const usersWithDetails = profiles.map(profile => {
        const authUser = authUsers.find(u => u.id === profile.id)
        const userRoles = roles.filter(r => r.user_id === profile.id).map(r => r.role)
        
        return {
          id: profile.id,
          email: authUser?.email || 'N/A',
          full_name: profile.full_name,
          school_name: profile.school_name,
          roles: userRoles,
          created_at: profile.created_at,
          last_sign_in: authUser?.last_sign_in_at
        }
      })

      return new Response(
        JSON.stringify({ users: usersWithDetails }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'delete' && userId) {
      // Prevent self-deletion
      if (userId === user.id) {
        return new Response(
          JSON.stringify({ error: 'Cannot delete your own account' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Delete the user
      const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(userId)

      if (deleteError) throw deleteError

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})