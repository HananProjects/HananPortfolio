import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[oklch(0.11_0.01_220)] text-[oklch(0.90_0.02_220)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Window chrome */}
        <div className="rounded-lg border border-[oklch(0.22_0.02_220)] overflow-hidden bg-[oklch(0.12_0.01_220)]">
          <div className="flex items-center px-4 py-2.5 border-b border-[oklch(0.22_0.02_220)] bg-[oklch(0.10_0.01_220)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.20_25)]" />
              <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.18_85)]" />
              <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.18_150)]" />
            </div>
            <span className="text-xs text-[oklch(0.48_0.03_220)] font-mono ml-3">404.py</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-1">
            <p><span className="text-[#ff7b72]">raise</span><span className="text-[#e6edf3]"> </span><span className="text-[#ffa657]">FileNotFoundError</span><span className="text-[#e6edf3]">(</span></p>
            <p className="pl-4"><span className="text-[#a5d6ff]">&quot;the page you&apos;re looking for doesn&apos;t exist&quot;</span></p>
            <p><span className="text-[#e6edf3]">)</span></p>
          </div>

          <div className="px-6 pb-6 border-t border-[oklch(0.22_0.02_220)]/40 pt-5 bg-[oklch(0.09_0.01_220)]">
            <p className="text-xs text-[oklch(0.35_0.02_220)] font-mono mb-1">&gt; traceback</p>
            <p className="text-xs font-mono" style={{ color: "#ff7b72" }}>
              FileNotFoundError: 404 — page not found
            </p>
            <p className="text-xs text-[oklch(0.48_0.03_220)] font-mono mt-3 mb-5">
              Process exited with code 1
            </p>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-[oklch(0.35_0.02_220)] bg-[oklch(0.14_0.01_220)] text-[oklch(0.90_0.02_220)] hover:border-[oklch(0.65_0.18_220)] hover:bg-[oklch(0.17_0.02_220)] transition-all duration-150 text-sm font-mono w-fit"
            >
              <span>←</span>
              <span>back to portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
