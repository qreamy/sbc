"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="sv">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">
              Något gick fel
            </h2>
            <p className="mb-6 text-neutral-600">
              Ett kritiskt fel uppstod. Försök igen eller kontakta support om problemet kvarstår.
            </p>
            <button
              onClick={reset}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Försök igen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}


