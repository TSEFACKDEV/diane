export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-burgundy-700 text-2xl">
            Heritage & Expertise
          </h1>
          <div className="gold-divider mx-auto mt-2" />
        </div>
        {children}
      </div>
    </div>
  )
}