'use client';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-white dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">FolioAI</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Create your account</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 p-8 shadow-lg">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-xl font-bold mb-2">Clerk Not Configured</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              To enable sign-up, configure your Clerk credentials:
            </p>
            <ol className="text-left text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>1. Create a Clerk account at <a href="https://clerk.com" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">clerk.com</a></li>
              <li>2. Copy your Publishable Key</li>
              <li>3. Set <code className="bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> in .env.local</li>
              <li>4. Restart the development server</li>
            </ol>
            <a 
              href="/"
              className="inline-block px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
