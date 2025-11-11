"use client";
import React from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  // Report error to Sentry
  try {
    Sentry.captureException(error);
  } catch (e) {
    // ignore
  }

  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(error?.message ?? error)}</pre>
          <button onClick={() => reset?.()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
