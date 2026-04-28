function PageBanner({ id, title, subtitle }) {
  return (
    <section
      id={id}
      className="mt-14 rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 px-6 py-10 text-center text-white shadow-soft"
    >
      <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-sm text-white/90">{subtitle}</p> : null}
    </section>
  )
}

export default PageBanner
