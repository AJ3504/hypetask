import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing in environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateEmailSettings() {
  const { data, error } = await supabase
    .from("project_settings")
    .update({ email_rate_limit: 200 })
    .eq("id", "pqpkkqfpyvcbuhowcqaf");

  if (error) {
    console.error("Error updating email settings:", error.message);
  } else {
    console.log("Email settings updated:", data);
  }
}

updateEmailSettings();
