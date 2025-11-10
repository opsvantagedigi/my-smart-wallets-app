import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";

export default withAccountKitUi(
  {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          orbitron: ['"Orbitron"', 'sans-serif'],
          inter: ['"Inter"', 'sans-serif'],
        },
      },
    },
  },
  {
    // OpsVantage Digital Brand Colors (Deep Blue → Deep Green → Deep Yellow gradient)
    colors: {
      // Border colors
      "active": createColorSet("#10B981", "#10B981"), // Deep Green for active state
      "static": createColorSet("#1E3A8A", "#1E40AF"), // Deep Blue for static
      "critical": createColorSet("#DC2626", "#DC2626"), // Red for errors
      
      // Button colors
      "btn-primary": createColorSet("#1E3A8A", "#10B981"), // Blue to Green gradient
      "btn-secondary": createColorSet("#064E3B", "#065F46"), // Deep Green
      "btn-auth": createColorSet("#1E3A8A", "#10B981"), // Blue to Green gradient
      
      // Foreground/Text colors
      "fg-primary": createColorSet("#F9FAFB", "#F9FAFB"), // Light text
      "fg-secondary": createColorSet("#D1D5DB", "#D1D5DB"), // Secondary light text
      "fg-tertiary": createColorSet("#9CA3AF", "#9CA3AF"), // Tertiary text
      "fg-invert": createColorSet("#111827", "#111827"), // Dark text for light backgrounds
      "fg-disabled": createColorSet("#6B7280", "#6B7280"), // Disabled text
      "fg-accent-brand": createColorSet("#10B981", "#FBBF24"), // Green to Yellow gradient
      "fg-critical": createColorSet("#EF4444", "#EF4444"), // Critical red
      
      // Background/Surface colors
      "bg-surface-default": createColorSet("#111827", "#1F2937"), // Dark blue-gray
      "bg-surface-subtle": createColorSet("#1F2937", "#374151"), // Subtle dark
      "bg-surface-inset": createColorSet("#0F172A", "#1E293B"), // Deep inset
      "bg-surface-critical": createColorSet("#7F1D1D", "#7F1D1D"), // Critical red bg
      "bg-surface-error": createColorSet("#991B1B", "#991B1B"), // Error red
      "bg-surface-success": createColorSet("#064E3B", "#065F46"), // Success green
      "bg-surface-warning": createColorSet("#92400E", "#92400E"), // Warning amber
    },
    borderRadius: "md", // 16px border radius for modern look
  },
);
