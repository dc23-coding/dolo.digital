import { supabase } from '@/lib/supabase';

export async function addDoloUser(email, fullName, phoneNumber) {
  const { data, error } = await supabase
    .from('dolo_users')
    .insert([{ email, full_name: fullName, phone_number: phoneNumber }]);
  if (error) throw error;
  return data;
}
