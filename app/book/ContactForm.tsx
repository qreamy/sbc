"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Kunde inte läsa svar från servern. Kontrollera din internetanslutning.");
      }

      if (!response.ok) {
        throw new Error(data.error || `Serverfel: ${response.status}`);
      }

      setSubmitStatus({
        type: "success",
        message: data.message || "Tack! Din förfrågan har skickats.",
      });

      // Rensa formuläret
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ett fel uppstod. Försök igen senare.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur p-8 md:p-10 grid gap-6 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.18)]"
    >
      <label className="text-sm font-medium text-neutral-900">
        Namn <span className="text-red-500">*</span>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
          placeholder="Ditt namn"
          autoComplete="name"
          disabled={isSubmitting}
        />
      </label>

      <label className="text-sm font-medium text-neutral-900">
        E-post <span className="text-red-500">*</span>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
          placeholder="du@foretag.se"
          autoComplete="email"
          disabled={isSubmitting}
        />
      </label>

      <label className="text-sm font-medium text-neutral-900">
        Företag
        <input
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
          placeholder="Företagsnamn"
          autoComplete="organization"
          disabled={isSubmitting}
        />
      </label>

      <label className="text-sm font-medium text-neutral-900">
        Vad vill ni uppnå? <span className="text-red-500">*</span>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          className="mt-2 min-h-[120px] w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50 resize-none"
          placeholder="Beskriv dina mål och vad ni försöker uppnå..."
          disabled={isSubmitting}
        />
      </label>

      {submitStatus.type && (
        <div
          className={`rounded-lg p-4 ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <p className="text-sm font-medium">{submitStatus.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-[rgb(var(--accent))] px-6 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--accent))]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Skickar...
          </>
        ) : (
          "Skicka förfrågan"
        )}
      </button>
    </form>
  );
}

