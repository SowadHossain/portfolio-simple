import { useMemo, useState } from "react"
import Button from "./Button"

const initialState = {
  fullName: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  preference: "email",
  consent: false,
}

function ContactForm({ onAlert }) {
  const [formData, setFormData] = useState(initialState)
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => validate(formData), [formData])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({
      fullName: true,
      email: true,
      service: true,
      budget: true,
      message: true,
      consent: true,
    })

    const currentErrors = validate(formData)
    if (Object.keys(currentErrors).length > 0) {
      onAlert?.({
        type: "error",
        title: "Fix the highlighted fields",
        message: "Please fill in the required fields before sending.",
      })
      return
    }

    onAlert?.({
      type: "success",
      title: "Message sent",
      message: "Thanks! I will reply within 24 hours.",
    })
    setFormData(initialState)
    setTouched({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your full name"
          required
          error={touched.fullName && errors.fullName}
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          required
          error={touched.email && errors.email}
        />
      </div>

      <Field
        label="Company (optional)"
        name="company"
        value={formData.company}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Your company name"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Select
          label="Service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.service && errors.service}
          options={[
            "Website",
            "Web App / SaaS",
            "Mobile App",
            "Custom Software",
            "Automation",
            "Other",
          ]}
        />
        <Select
          label="Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          error={touched.budget && errors.budget}
          options={[
            "Under $150",
            "$150 - $500",
            "$500 - $1,200",
            "$1,200 - $3,000",
            "$3,000+",
            "Let's discuss",
          ]}
        />
        <Select
          label="Deadline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          onBlur={handleBlur}
          options={["ASAP", "Within 2 weeks", "Within 1 month", "Flexible"]}
        />
      </div>

      <TextArea
        label="Tell Me About Your Project"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Describe your project, the problem you want to solve, and any key features."
        required
        error={touched.message && errors.message}
      />

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
          Communication Preference
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-200">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="preference"
              value="email"
              checked={formData.preference === "email"}
              onChange={handleChange}
            />
            Email response
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="preference"
              value="call"
              checked={formData.preference === "call"}
              onChange={handleChange}
            />
            30-min discovery call
          </label>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-200">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1"
          required
        />
        <span>
          I agree to be contacted regarding this enquiry.
          {touched.consent && errors.consent ? (
            <span className="block text-xs text-rose-500">{errors.consent}</span>
          ) : null}
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit">Send Enquiry</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData(initialState)
            setTouched({})
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-200">
      <span className="mb-2 block">
        {label}
        {props.name !== "company" ? " *" : ""}
      </span>
      <input
        {...props}
        className={`w-full rounded-2xl border px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white ${
          error ? "border-rose-300" : "border-slate-200"
        }`}
      />
      {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
    </label>
  )
}

function Select({ label, error, options, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-200">
      <span className="mb-2 block">
        {label}
        {props.name !== "timeline" ? " *" : ""}
      </span>
      <select
        {...props}
        className={`w-full rounded-2xl border px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white ${
          error ? "border-rose-300" : "border-slate-200"
        }`}
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
    </label>
  )
}

function TextArea({ label, error, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-200">
      <span className="mb-2 block">{label} *</span>
      <textarea
        {...props}
        rows={5}
        className={`w-full rounded-2xl border px-3 py-2 text-sm shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white ${
          error ? "border-rose-300" : "border-slate-200"
        }`}
      />
      {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
    </label>
  )
}

function validate(values) {
  const nextErrors = {}

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Full name is required."
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = "Enter a valid email address."
  }

  if (!values.service) {
    nextErrors.service = "Select a service type."
  }

  if (!values.budget) {
    nextErrors.budget = "Select a budget range."
  }

  if (!values.message.trim()) {
    nextErrors.message = "Please describe your project."
  }

  if (!values.consent) {
    nextErrors.consent = "Consent is required."
  }

  return nextErrors
}

export default ContactForm
