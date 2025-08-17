import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// Define button variants using CVA
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-jpmc-blue text-white border border-transparent",
          "hover:bg-jpmc-blue-700 hover:border-jpmc-blue-700",
          "focus-visible:ring-jpmc-blue-500",
          "active:bg-jpmc-blue-800",
        ],
        secondary: [
          "bg-jpmc-red text-white border border-transparent",
          "hover:bg-jpmc-red-700 hover:border-jpmc-red-700",
          "focus-visible:ring-jpmc-red-500",
          "active:bg-jpmc-red-800",
        ],
        accent: [
          "bg-jpmc-gold text-white border border-transparent",
          "hover:bg-jpmc-gold-700 hover:border-jpmc-gold-700",
          "focus-visible:ring-jpmc-gold-500",
          "active:bg-jpmc-gold-800",
        ],
        // White buttons with colored borders (secondary style)
        primaryOutline: [
          "bg-white text-jpmc-blue border border-jpmc-blue",
          "hover:bg-jpmc-blue hover:text-white hover:border-jpmc-blue",
          "focus-visible:ring-jpmc-blue-500",
          "active:bg-jpmc-blue-700 active:text-white",
        ],
        secondaryOutline: [
          "bg-white text-jpmc-red border border-jpmc-red",
          "hover:bg-jpmc-red hover:text-white hover:border-jpmc-red",
          "focus-visible:ring-jpmc-red-500",
          "active:bg-jpmc-red-700 active:text-white",
        ],
        accentOutline: [
          "bg-white text-jpmc-gold border border-jpmc-gold",
          "hover:bg-jpmc-gold hover:text-white hover:border-jpmc-gold",
          "focus-visible:ring-jpmc-gold-500",
          "active:bg-jpmc-gold-700 active:text-white",
        ],
        // Transparent buttons with no borders (tertiary style)
        primaryGhost: [
          "bg-transparent text-jpmc-blue border border-transparent",
          "hover:bg-jpmc-blue hover:text-white hover:border-jpmc-blue",
          "focus-visible:ring-jpmc-blue-500",
          "active:bg-jpmc-blue-700 active:text-white",
        ],
        secondaryGhost: [
          "bg-transparent text-jpmc-red border border-transparent",
          "hover:bg-jpmc-red hover:text-white hover:border-jpmc-red",
          "focus-visible:ring-jpmc-red-500",
          "active:bg-jpmc-red-700 active:text-white",
        ],
        accentGhost: [
          "bg-transparent text-jpmc-gold border border-transparent",
          "hover:bg-jpmc-gold hover:text-white hover:border-jpmc-gold",
          "focus-visible:ring-jpmc-gold-500",
          "active:bg-jpmc-gold-700 active:text-white",
        ],
        outline: [
          "bg-transparent text-jpmc-dark border border-jpmc-gray-300",
          "hover:bg-jpmc-gray-50 hover:border-jpmc-gray-400",
          "focus-visible:ring-jpmc-blue-500",
          "active:bg-jpmc-gray-100",
        ],
        ghost: [
          "bg-transparent text-jpmc-dark border border-transparent",
          "hover:bg-jpmc-gray-100 hover:text-jpmc-dark",
          "focus-visible:ring-jpmc-blue-500",
          "active:bg-jpmc-gray-200",
        ],
        destructive: [
          "bg-red-600 text-white border border-transparent",
          "hover:bg-red-700 hover:border-red-700",
          "focus-visible:ring-red-500",
          "active:bg-red-800",
        ],
        success: [
          "bg-green-600 text-white border border-transparent",
          "hover:bg-green-700 hover:border-green-700",
          "focus-visible:ring-green-500",
          "active:bg-green-800",
        ],
        warning: [
          "bg-yellow-600 text-white border border-transparent",
          "hover:bg-yellow-700 hover:border-yellow-700",
          "focus-visible:ring-yellow-500",
          "active:bg-yellow-800",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        "2xl": "h-16 px-10 text-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      loading: {
        true: "pointer-events-none opacity-75",
        false: "",
      },
    },
    compoundVariants: [
      // Special combinations
      {
        intent: "primary",
        size: "lg",
        class: "font-bold",
      },
      {
        intent: "secondary",
        size: "lg",
        class: "font-bold",
      },
      {
        intent: "accent",
        size: "lg",
        class: "font-bold",
      },
      // Loading state with spinner
      {
        loading: true,
        class: "relative",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
    },
  }
);

// Extract variant types
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// Utility function to generate button classes with twMerge
export const getButtonClasses = (variants: ButtonVariantProps, className?: string) => {
  return twMerge(buttonVariants(variants), className);
};

// Pre-defined button configurations for common use cases
export const buttonConfigs = {
  // Primary actions
  primary: { intent: "primary" as const, size: "md" as const },
  primaryLarge: { intent: "primary" as const, size: "lg" as const },
  primarySmall: { intent: "primary" as const, size: "sm" as const },
  
  // Secondary actions
  secondary: { intent: "secondary" as const, size: "md" as const },
  secondaryLarge: { intent: "secondary" as const, size: "lg" as const },
  secondarySmall: { intent: "secondary" as const, size: "sm" as const },
  
  // Accent actions
  accent: { intent: "accent" as const, size: "md" as const },
  accentLarge: { intent: "accent" as const, size: "lg" as const },
  accentSmall: { intent: "accent" as const, size: "sm" as const },
  
  // Outline variants (white with colored borders)
  primaryOutline: { intent: "primaryOutline" as const, size: "md" as const },
  secondaryOutline: { intent: "secondaryOutline" as const, size: "md" as const },
  accentOutline: { intent: "accentOutline" as const, size: "md" as const },
  
  // Ghost variants (transparent with colored text)
  primaryGhost: { intent: "primaryGhost" as const, size: "md" as const },
  secondaryGhost: { intent: "secondaryGhost" as const, size: "md" as const },
  accentGhost: { intent: "accentGhost" as const, size: "md" as const },
  
  // Subtle actions
  outline: { intent: "outline" as const, size: "md" as const },
  ghost: { intent: "ghost" as const, size: "md" as const },
  
  // Status actions
  destructive: { intent: "destructive" as const, size: "md" as const },
  success: { intent: "success" as const, size: "md" as const },
  warning: { intent: "warning" as const, size: "md" as const },
  
  // Full width variants
  primaryFull: { intent: "primary" as const, size: "md" as const, fullWidth: true as const },
  secondaryFull: { intent: "secondary" as const, size: "md" as const, fullWidth: true as const },
  accentFull: { intent: "accent" as const, size: "md" as const, fullWidth: true as const },
} as const;
