'use server'
import getUser from '@/app/components/utils/getUser'
import getUserProfile from '@/app/components/utils/getUserProfile'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabase = createServerComponentClient({ cookies })

const fetchUserAndOrganization = async () => {
  const userProfile = await getUserProfile()
  if (!userProfile) return null

  const user = await getUser()
  const { data: organizations, error } = await supabase
    .from('organizations')
    .select('id, current_project, theme')
    .eq('user_id', user.id)
    .single();

  if (error || !organizations) {
    console.error('Error fetching organization data:', error)
    return null;
  }

  return { user, organizations }
}

export const updateAppTheme = async (selectedTheme) => {
  const { organizations } = await fetchUserAndOrganization()
  if (!organizations) return;

  const { error } = await supabase
    .from('organizations')
    .update({ theme: selectedTheme })
    .eq('id', organizations.id);

  if (error) return error
}

export const getAppTheme = async () => {
  const { organizations } = await fetchUserAndOrganization()
  return organizations ? organizations.theme : null
}

export const getProjects = async () => {
  const { organizations } = await fetchUserAndOrganization()
  if (!organizations) return [];

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizations.id);

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects || []
}

export const insertProjectPlusTable = async (projectData, { id }) => {
  const { error } = await supabase
    .from('projects_plus')
    .insert([{ project_id: id, ...projectData }]);

  if (error) {
    console.error('Error inserting project plus data:', error)
    return error
  }
  return true
}

export const updateCurrentProject = async (currentProjectId) => {
  const { organizations } = await fetchUserAndOrganization()
  if (!organizations) return;

  const { error } = await supabase
    .from('organizations')
    .update({ current_project: currentProjectId })
    .eq('id', organizations.id);

  if (error) return error
}

export const fetchCurrentProjectId = async () => {
  const { organizations } = await fetchUserAndOrganization()
  return organizations ? organizations.current_project : null
}
