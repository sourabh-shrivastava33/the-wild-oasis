import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cvvhrdajxhdxguwidoiw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dmhyZGFqeGhkeGd1d2lkb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MTk4MjMsImV4cCI6MjAwODk5NTgyM30.eHr1awDqhGo-pnMIJzr-SJhX-lT5jhrnI2wD-jNs778";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
