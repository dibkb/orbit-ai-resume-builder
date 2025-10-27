export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black font-sans">
      <div className="flex flex-col items-center justify-center gap-4 max-w-2xl">
        <h3 className="text-5xl font-semibold">Transform Your Resume with</h3>
        <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Powered Insights
        </h1>

        <p className="text-center text-gray-500 font-medium mt-8">
          Upload your resume PDF and instantly generate a professionally
          formatted template. Our advanced AI analyzes your content and provides
          actionable improvements to make your resume stand out in today&apos;s
          competitive job market.
        </p>
      </div>
    </div>
  );
}
