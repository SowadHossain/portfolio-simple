import { useMemo, useState } from "react"
import Alert from "../components/Alert"
import Button from "../components/Button"
import ContactForm from "../components/ContactForm"
import PageBanner from "../components/PageBanner"
import ProjectCard from "../components/ProjectCard"
import Section from "../components/Section"
import profileImg from "../assets/profile.jpeg"
import {
  contactLinks,
  currentBuilds,
  faqs,
  heroFocuses,
  liveProjects,
  passions,
  processSteps,
  projectShowcase,
  quotes,
  services,
  techStack,
  whyWorkList,
} from "../data/portfolioData"

const initialTags = ["SaaS", "Dashboards", "Automation", "Clean UX"]

function Home() {
  const [alert, setAlert] = useState(null)
  const [focusIndex, setFocusIndex] = useState(0)
  const [availability, setAvailability] = useState("Open to new projects")
  const [focusTags, setFocusTags] = useState(initialTags)
  const [newTag, setNewTag] = useState("")
  const [projectCards, setProjectCards] = useState(projectShowcase)
  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [visible, setVisible] = useState({
    about: true,
    services: true,
    projects: true,
    contact: true,
    faq: true,
  })

  const heroFocus = useMemo(
    () => heroFocuses[focusIndex % heroFocuses.length],
    [focusIndex]
  )

  const handleCycleFocus = () => {
    setFocusIndex((prev) => prev + 1)
  }

  const handleToggleAvailability = () => {
    setAvailability((prev) =>
      prev === "Open to new projects"
        ? "Booked until mid May"
        : "Open to new projects"
    )
    setAlert({
      type: "info",
      title: "Availability updated",
      message: "Status refreshed based on your click.",
    })
  }

  const handleAddTag = () => {
    const trimmed = newTag.trim()
    if (!trimmed || focusTags.includes(trimmed)) {
      return
    }
    setFocusTags((prev) => [...prev, trimmed])
    setNewTag("")
  }

  const handleRemoveTag = (tag) => {
    setFocusTags((prev) => prev.filter((item) => item !== tag))
  }

  const handleAddProject = () => {
    const trimmed = newProjectTitle.trim()
    if (!trimmed) {
      return
    }
    const newProject = {
      id: trimmed.toLowerCase().replace(/\s+/g, "-"),
      title: trimmed,
      type: "Custom Build",
      link: "#contact",
      summary:
        "New project added from the quick list. Provide details after discovery.",
      features: ["Scope discovery", "UX planning", "Delivery roadmap"],
    }
    setProjectCards((prev) => [newProject, ...prev])
    setNewProjectTitle("")
  }

  const handleRemoveProject = (id) => {
    setProjectCards((prev) => prev.filter((project) => project.id !== id))
  }

  const toggleSection = (section) => {
    setVisible((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20">
      <section id="home" className="pt-12">
        <div className="content-section animate-fade-in">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">
                Full Stack Developer
              </p>
              <h1 className="mt-2 text-4xl font-semibold md:text-5xl">
                Sowad Hossain
              </h1>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-200">
                I build {heroFocus} with a bias toward simplicity, automation,
                and maintainable code. Based in Dhaka. Working with clients
                worldwide.
              </p>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
                Status: <span className="font-semibold">{availability}</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#contact">Hire Me</Button>
                <Button href="#projects" variant="outline">
                  See Live Projects
                </Button>
                <Button
                  href="https://sowadh.me/"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                >
                  Visit Portfolio
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="ghost" type="button" onClick={handleCycleFocus}>
                  Switch Focus
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={handleToggleAvailability}
                >
                  Toggle Availability
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mx-auto flex max-w-sm flex-col items-center rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
                <img
                  src={profileImg}
                  alt="Sowad Hossain"
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-soft transition hover:-rotate-3 hover:scale-105 dark:border-slate-800"
                />
                <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
                  "If it works, ship it. If it breaks, learn fast and fix
                  faster."
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {focusTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="tag"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <span className="text-xs">x</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex w-full gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                    placeholder="Add focus tag"
                    className="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Click a tag to remove it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {alert ? (
        <div className="mt-6">
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      ) : null}

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold">Quick View Controls</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Show or hide sections instantly using React state.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { key: "about", label: "About" },
              { key: "services", label: "Services" },
              { key: "projects", label: "Projects" },
              { key: "contact", label: "Contact" },
              { key: "faq", label: "FAQ" },
            ].map((item) => (
              <Button
                key={item.key}
                type="button"
                variant="ghost"
                onClick={() => toggleSection(item.key)}
              >
                {visible[item.key] ? `Hide ${item.label}` : `Show ${item.label}`}
              </Button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold">Live Text Update</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Current focus: <span className="font-semibold">{heroFocus}</span>
          </p>
          <Button type="button" variant="outline" onClick={handleCycleFocus}>
            Update Focus Text
          </Button>
        </div>
      </section>

      <section className="mt-10 grid gap-8">
        <Section
          id="intro"
          title="What I Do"
          subtitle="Turning ideas into shipped digital products"
        >
          <p className="text-base text-slate-600 dark:text-slate-200">
            I turn ideas into working digital products. I have shipped fitness
            trackers, e-commerce stores, property dashboards, AI tools, and SaaS
            growth platforms. You work directly with the builder: fast
            communication, honest timelines, and code you can own.
          </p>
          <div className="mt-4">
            <Button href="#about" variant="outline">
              More About Me
            </Button>
          </div>
        </Section>

        <Section
          title="Selected Live Projects"
          subtitle="Real products, all live and accessible"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">What it is</th>
                  <th className="px-4 py-3">Live link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {liveProjects.map((project) => (
                  <tr key={project.name} className="hover:bg-primary-50/50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      {project.name}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                      {project.description}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-primary-600 hover:underline"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Why Work With Me?">
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
            {whyWorkList.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Currently Building">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">What it does</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {currentBuilds.map((build) => (
                  <tr key={build.product} className="hover:bg-primary-50/50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                      {build.product}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                      {build.description}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        {build.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={build.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-primary-600 hover:underline"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <section className="rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 px-6 py-10 text-center text-white shadow-soft">
          <h2 className="text-3xl font-semibold text-white">Let's Build Something Great</h2>
          <p className="mt-3 text-sm text-white/90">
            "I don't want to live in a world where someone else makes the world a
            better place better than we do." - Gavin Belson
          </p>
          <p className="mt-4 text-sm text-white/90">
            Got a project in mind? I am currently open to new freelance work.
          </p>
          <div className="mt-5">
            <Button
              href="#contact"
              variant="ghost"
              className="bg-white text-primary-700 hover:bg-white/90"
            >
              Start a Conversation
            </Button>
          </div>
        </section>
      </section>

      {visible.about ? (
        <div id="about" className="mt-16 space-y-8">
          <PageBanner
            title="About Me"
            subtitle="Friendly by default. Creative at heart. Obsessed with smooth UX."
          />

          <Section title="Who I Am">
            <div className="flex flex-col gap-6 lg:flex-row">
              <img
                src={profileImg}
                alt="Sowad Hossain"
                className="h-48 w-40 rounded-2xl object-cover shadow-soft"
              />
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-200">
                <p>
                  I am a full stack developer who turns caffeine into scalable
                  SaaS products and sleek dashboards. I build clean interfaces
                  and maintainable code that teams can trust.
                </p>
                <p>
                  I am currently building Bugination and Wardrobe while learning
                  deeper system design and DevOps workflows.
                </p>
                <p>My philosophy: if it is not maintainable, it is not done.</p>
              </div>
            </div>
          </Section>

          <Section title="Find Me Online">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {contactLinks.map((item) => {
                    const isExternal = item.href.startsWith("http")
                    return (
                      <tr key={item.platform}>
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                          {item.platform}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={item.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            className="text-sm font-semibold text-primary-600 hover:underline"
                          >
                            {item.value}
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Tech Stack">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Technologies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {techStack.map((item) => (
                    <tr key={item.label}>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-100">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="What I Care About">
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
              {passions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Quotes I Live By">
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div
                  key={quote.author}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 shadow-soft dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
                >
                  <p className="italic">"{quote.quote}"</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    - {quote.author}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      ) : null}

      {visible.services ? (
        <div id="services" className="mt-16 space-y-8">
          <PageBanner
            title="Services"
            subtitle="Everything I build - websites, apps, SaaS, and custom software."
          />

          <Section title="What I Build For You">
            <p className="text-sm text-slate-600 dark:text-slate-200">
              I offer end-to-end development, from landing pages to multi-tenant
              SaaS platforms. Every project is handled personally: design,
              development, testing, deployment, and post-launch support.
            </p>
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Section key={service.title} title={service.title}>
                <p className="text-sm text-slate-600 dark:text-slate-200">
                  {service.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-300">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {service.pricing ? (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[360px] text-left text-xs">
                      <thead className="bg-slate-900 text-white">
                        <tr>
                          <th className="px-3 py-2">Package</th>
                          <th className="px-3 py-2">Scope</th>
                          <th className="px-3 py-2">From</th>
                          <th className="px-3 py-2">Delivery</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {service.pricing.map((tier) => (
                          <tr key={tier.tier}>
                            <td className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-100">
                              {tier.tier}
                            </td>
                            <td className="px-3 py-2 text-slate-500 dark:text-slate-300">
                              {tier.scope}
                            </td>
                            <td className="px-3 py-2">
                              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-800">
                                {tier.price}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-slate-500 dark:text-slate-300">
                              {tier.delivery}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </Section>
            ))}
          </div>

          <Section title="My Process">
            <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
              {processSteps.map((step) => (
                <li key={step} className="flex gap-2">
                  <span className="text-primary-500">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      ) : null}

      {visible.projects ? (
        <div id="projects" className="mt-16 space-y-8">
          <PageBanner title="My Projects" subtitle="Real products. All live. All built by me." />

          <Section
            title="Quick Add Project"
            subtitle="Add or remove project cards using state arrays."
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newProjectTitle}
                onChange={(event) => setNewProjectTitle(event.target.value)}
                placeholder="New project name"
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
              />
              <Button type="button" variant="outline" onClick={handleAddProject}>
                Add Project
              </Button>
            </div>
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            {projectCards.map((project) => (
              <div key={project.id} className="relative">
                <ProjectCard project={project} />
                <button
                  type="button"
                  onClick={() => handleRemoveProject(project.id)}
                  className="absolute right-4 top-4 rounded-full bg-white/80 px-2 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-rose-100 hover:text-rose-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {visible.contact ? (
        <div id="contact" className="mt-16 space-y-8">
          <PageBanner
            title="Contact Me"
            subtitle="Got a project in mind? Let's talk. I respond within 24 hours."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Section title="Let's Build Together">
              <p className="text-sm text-slate-600 dark:text-slate-200">
                Whether you have a defined brief or just a rough idea, I can
                help you shape it into a working product. I offer a free 30
                minute discovery call for all new projects.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[360px] text-left text-sm">
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        Email
                      </th>
                      <td className="px-4 py-3 text-sm font-semibold text-primary-600">
                        <a href="mailto:contact@sowadh.me">contact@sowadh.me</a>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        LinkedIn
                      </th>
                      <td className="px-4 py-3 text-sm font-semibold text-primary-600">
                        <a
                          href="https://www.linkedin.com/in/sowad-hossain"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Profile
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        GitHub
                      </th>
                      <td className="px-4 py-3 text-sm font-semibold text-primary-600">
                        <a
                          href="https://github.com/SowadHossain"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Repositories
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        Location
                      </th>
                      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-300">
                        Dhaka, Bangladesh (Remote globally)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Send Me a Message">
              <p className="text-sm text-slate-600 dark:text-slate-200">
                Fill in the form below and I will get back to you within 24
                hours.
              </p>
              <div className="mt-4">
                <ContactForm onAlert={setAlert} />
              </div>
            </Section>
          </div>

          {visible.faq ? (
            <Section title="Common Questions">
              <div className="grid gap-4 md:grid-cols-2">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 shadow-soft dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
                    <p className="font-semibold text-ink-900 dark:text-white">
                      {faq.question}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}
        </div>
      ) : null}

      <footer className="mt-16 border-t border-primary-600/60 bg-slate-950 px-6 py-10 text-center text-white">
        <p className="text-lg font-semibold">Sowad Hossain - Full Stack Developer</p>
        <p className="mt-3 text-sm text-white/70">
          <a
            href="mailto:contact@sowadh.me"
            className="mx-2 hover:text-white"
          >
            contact@sowadh.me
          </a>
          <span className="text-white/40">|</span>
          <a
            href="https://sowadh.me/"
            target="_blank"
            rel="noreferrer"
            className="mx-2 hover:text-white"
          >
            sowadh.me
          </a>
          <span className="text-white/40">|</span>
          <a
            href="https://github.com/SowadHossain"
            target="_blank"
            rel="noreferrer"
            className="mx-2 hover:text-white"
          >
            GitHub
          </a>
          <span className="text-white/40">|</span>
          <a
            href="https://www.linkedin.com/in/sowad-hossain"
            target="_blank"
            rel="noreferrer"
            className="mx-2 hover:text-white"
          >
            LinkedIn
          </a>
        </p>
        <p className="mt-4 text-xs text-white/40">
          (c) 2026 Sowad Hossain. All rights reserved.
        </p>
      </footer>
    </main>
  )
}

export default Home
