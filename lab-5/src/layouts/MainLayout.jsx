function MainLayout({ isDark, children }) {
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-hero-glow bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <div className="mx-auto flex min-h-screen flex-col">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
