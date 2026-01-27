export default function SupabaseNotConfigured() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-8">
      <div className="max-w-2xl rounded-lg border border-destructive bg-card p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-destructive">Supabase Not Configured</h1>
        <p className="mt-4 text-card-foreground">
          Your application is not yet configured to connect to Supabase. To fix this, you need to add your Supabase project's credentials to the environment file.
        </p>
        <div className="mt-6 text-left text-sm">
          <p className="font-semibold">Follow these steps:</p>
          <ol className="ml-5 mt-2 list-decimal space-y-2">
            <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary underline">Supabase project dashboard</a>.</li>
            <li>Navigate to <strong>Project Settings</strong> (the gear icon in the left sidebar).</li>
            <li>Click on the <strong>API</strong> tab.</li>
            <li>You will find your <strong>Project URL</strong> and the <strong><code className="bg-muted px-1 py-0.5 rounded-sm font-mono text-xs">anon</code> public key</strong>.</li>
            <li>Open the <code className="bg-muted px-1 py-0.5 rounded-sm font-mono text-xs">.env</code> file in your project's root directory.</li>
            <li>Replace the placeholder values with your actual credentials:</li>
          </ol>
        </div>
        <pre className="mt-4 w-full overflow-x-auto rounded-md bg-muted p-4 text-left text-sm">
          <code className="font-mono">
            NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
            <br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
          </code>
        </pre>
        <p className="mt-4 text-xs text-muted-foreground">
          After saving the <code className="bg-muted px-1 py-0.5 rounded-sm font-mono text-xs">.env</code> file, your application should automatically update. If it doesn't, please restart the development server.
        </p>
      </div>
    </div>
  );
}
