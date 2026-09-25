// ======================================================
// Supabase 연결
// ======================================================

const SUPABASE_URL = "https://ienlvkfgctbaajatrdhc.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_8zbS60yCd1w_Ov8XQQ3ALA_Or1KCdNs";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
