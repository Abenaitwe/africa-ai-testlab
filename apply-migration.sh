#!/bin/bash

SUPABASE_URL="https://zemacbxlbsydzhmcumbr.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbWFjYnhsYnN5ZHpobWN1bWJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTkwNjYyNCwiZXhwIjoyMDc3NDgyNjI0fQ.OfaE51f9HNAqEsDgh-IZxx6edYE89L750Se78Srzxl4"

echo "🚀 Applying database migrations..."
echo ""

# Use Supabase CLI if available, otherwise provide instructions
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI found, running migration..."
    cd /workspace
    supabase db push
else
    echo "⚠️  Supabase CLI not found"
    echo ""
    echo "📋 MANUAL STEPS REQUIRED:"
    echo ""
    echo "1. Go to: https://supabase.com/dashboard/project/zemacbxlbsydzhmcumbr/editor"
    echo "2. Click 'SQL Editor' in the left sidebar"
    echo "3. Click 'New Query'"
    echo "4. Copy the entire content from:"
    echo "   /workspace/supabase/migrations/20251105000000_storage_and_user_type_update.sql"
    echo "5. Paste it into the SQL editor"
    echo "6. Click 'Run' button"
    echo ""
    echo "✨ The storage bucket 'project-images' has already been created!"
    echo ""
fi
