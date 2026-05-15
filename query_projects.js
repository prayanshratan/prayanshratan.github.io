const { createClient } = require('@supabase/supabase-js');
const rootUrl = "https://cbsuyxfqyjftmkcfaddm.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNic3V5eGZxeWpmdG1rY2ZhZGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjE0MjAsImV4cCI6MjA4NzU5NzQyMH0.V5DYUIsupYbcJlcV3VVR4-T585kqgC9N_hj6KEjnn_o";
const supabase = createClient(rootUrl, anonKey);
async function run() {
  const { data, error } = await supabase.from('projects').select('*');
  console.log(JSON.stringify({data, error}, null, 2));
}
run();
