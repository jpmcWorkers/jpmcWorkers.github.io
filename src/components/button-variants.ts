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
      style: {
        // Primary style: solid background with white text
        primary: [
          "border border-transparent",
          "focus-visible:ring-offset-2",
        ],
        // Secondary style: white background with colored border and text
        secondary: [
          "bg-white border",
          "focus-visible:ring-offset-2",
        ],
        // Tertiary style: transparent background with colored text
        tertiary: [
          "bg-transparent border border-transparent",
          "focus-visible:ring-offset-2",
        ],
      },
      color: {
        // JPMC brand colors
        blue: [
          "text-jpmc-blue",
          "focus-visible:ring-jpmc-blue-500",
        ],
        red: [
          "text-jpmc-red", 
          "focus-visible:ring-jpmc-red-500",
        ],
        gold: [
          "text-jpmc-gold",
          "focus-visible:ring-jpmc-gold-500",
        ],
        // Neutral colors
        gray: [
          "text-jpmc-dark",
          "focus-visible:ring-jpmc-gray-500",
        ],
        // Status colors
        destructive: [
          "text-red-600",
          "focus-visible:ring-red-500",
        ],
        success: [
          "text-green-600",
          "focus-visible:ring-green-500",
        ],
        warning: [
          "text-yellow-600",
          "focus-visible:ring-yellow-500",
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
      // Primary style variants
      {
        style: "primary",
        color: "blue",
        class: [
          "bg-jpmc-blue text-white",
          "hover:bg-jpmc-blue-700 hover:border-jpmc-blue-700",
          "active:bg-jpmc-blue-800",
        ],
      },
      {
        style: "primary",
        color: "red",
        class: [
          "bg-jpmc-red text-white",
          "hover:bg-jpmc-red-700 hover:border-jpmc-red-700",
          "active:bg-jpmc-red-800",
        ],
      },
      {
        style: "primary",
        color: "gold",
        class: [
          "bg-jpmc-gold text-white",
          "hover:bg-jpmc-gold-700 hover:border-jpmc-gold-700",
          "active:bg-jpmc-gold-800",
        ],
      },
      {
        style: "primary",
        color: "gray",
        class: [
          "bg-jpmc-gray-800 text-white",
          "hover:bg-jpmc-gray-900 hover:border-jpmc-gray-900",
          "active:bg-jpmc-gray-950",
        ],
      },
      {
        style: "primary",
        color: "destructive",
        class: [
          "bg-red-600 text-white",
          "hover:bg-red-700 hover:border-red-700",
          "active:bg-red-800",
        ],
      },
      {
        style: "primary",
        color: "success",
        class: [
          "bg-green-600 text-white",
          "hover:bg-green-700 hover:border-green-700",
          "active:bg-green-800",
        ],
      },
      {
        style: "primary",
        color: "warning",
        class: [
          "bg-yellow-600 text-white",
          "hover:bg-yellow-700 hover:border-yellow-700",
          "active:bg-yellow-800",
        ],
      },
      // Secondary style variants
      {
        style: "secondary",
        color: "blue",
        class: [
          "border-jpmc-blue text-jpmc-blue",
          "hover:bg-jpmc-blue hover:text-white hover:border-jpmc-blue",
          "active:bg-jpmc-blue-700 active:text-white",
        ],
      },
      {
        style: "secondary",
        color: "red",
        class: [
          "border-jpmc-red text-jpmc-red",
          "hover:bg-jpmc-red hover:text-white hover:border-jpmc-red",
          "active:bg-jpmc-red-700 active:text-white",
        ],
      },
      {
        style: "secondary",
        color: "gold",
        class: [
          "border-jpmc-gold text-jpmc-gold",
          "hover:bg-jpmc-gold hover:text-white hover:border-jpmc-gold",
          "active:bg-jpmc-gold-700 active:text-white",
        ],
      },
      {
        style: "secondary",
        color: "gray",
        class: [
          "border-jpmc-gray-300 text-jpmc-dark",
          "hover:bg-jpmc-gray-50 hover:border-jpmc-gray-400",
          "active:bg-jpmc-gray-100",
        ],
      },
      {
        style: "secondary",
        color: "destructive",
        class: [
          "border-red-600 text-red-600",
          "hover:bg-red-600 hover:text-white hover:border-red-600",
          "active:bg-red-700 active:text-white",
        ],
      },
      {
        style: "secondary",
        color: "success",
        class: [
          "border-green-600 text-green-600",
          "hover:bg-green-600 hover:text-white hover:border-green-600",
          "active:bg-green-700 active:text-white",
        ],
      },
      {
        style: "secondary",
        color: "warning",
        class: [
          "border-yellow-600 text-yellow-600",
          "hover:bg-yellow-600 hover:text-white hover:border-yellow-600",
          "active:bg-yellow-700 active:text-white",
        ],
      },
      // Tertiary style variants
      {
        style: "tertiary",
        color: "blue",
        class: [
          "text-jpmc-blue",
          "hover:bg-jpmc-blue hover:text-white hover:border-jpmc-blue",
          "active:bg-jpmc-blue-700 active:text-white",
        ],
      },
      {
        style: "tertiary",
        color: "red",
        class: [
          "text-jpmc-red",
          "hover:bg-jpmc-red hover:text-white hover:border-jpmc-red",
          "active:bg-jpmc-red-700 active:text-white",
        ],
      },
      {
        style: "tertiary",
        color: "gold",
        class: [
          "text-jpmc-gold",
          "hover:bg-jpmc-gold hover:text-white hover:border-jpmc-gold",
          "active:bg-jpmc-gold-700 active:text-white",
        ],
      },
      {
        style: "tertiary",
        color: "gray",
        class: [
          "text-jpmc-dark",
          "hover:bg-jpmc-gray-100 hover:text-jpmc-dark",
          "active:bg-jpmc-gray-200",
        ],
      },
      {
        style: "tertiary",
        color: "destructive",
        class: [
          "text-red-600",
          "hover:bg-red-600 hover:text-white hover:border-red-600",
          "active:bg-red-700 active:text-white",
        ],
      },
      {
        style: "tertiary",
        color: "success",
        class: [
          "text-green-600",
          "hover:bg-green-600 hover:text-white hover:border-green-600",
          "active:bg-green-700 active:text-white",
        ],
      },
      {
        style: "tertiary",
        color: "warning",
        class: [
          "text-yellow-600",
          "hover:bg-yellow-600 hover:text-white hover:border-yellow-600",
          "active:bg-yellow-700 active:text-white",
        ],
      },
      // Special combinations
      {
        style: "primary",
        size: "lg",
        class: "font-bold",
      },
      {
        style: "secondary", 
        size: "lg",
        class: "font-bold",
      },
      {
        style: "tertiary",
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
      style: "primary",
      color: "blue",
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
  primaryBlue: { style: "primary" as const, color: "blue" as const, size: "md" as const },
  primaryRed: { style: "primary" as const, color: "red" as const, size: "md" as const },
  primaryGold: { style: "primary" as const, color: "gold" as const, size: "md" as const },
  primaryGray: { style: "primary" as const, color: "gray" as const, size: "md" as const },

  // Secondary actions
  secondaryBlue: { style: "secondary" as const, color: "blue" as const, size: "md" as const },
  secondaryRed: { style: "secondary" as const, color: "red" as const, size: "md" as const },
  secondaryGold: { style: "secondary" as const, color: "gold" as const, size: "md" as const },
  secondaryGray: { style: "secondary" as const, color: "gray" as const, size: "md" as const },

  // Tertiary actions
  tertiaryBlue: { style: "tertiary" as const, color: "blue" as const, size: "md" as const },
  tertiaryRed: { style: "tertiary" as const, color: "red" as const, size: "md" as const },
  tertiaryGold: { style: "tertiary" as const, color: "gold" as const, size: "md" as const },
  tertiaryGray: { style: "tertiary" as const, color: "gray" as const, size: "md" as const },

  // Status actions
  destructive: { style: "primary" as const, color: "destructive" as const, size: "md" as const },
  success: { style: "primary" as const, color: "success" as const, size: "md" as const },
  warning: { style: "primary" as const, color: "warning" as const, size: "md" as const },

  // Large variants
  primaryBlueLarge: { style: "primary" as const, color: "blue" as const, size: "lg" as const },
  primaryRedLarge: { style: "primary" as const, color: "red" as const, size: "lg" as const },
  primaryGoldLarge: { style: "primary" as const, color: "gold" as const, size: "lg" as const },

  // Small variants
  primaryBlueSmall: { style: "primary" as const, color: "blue" as const, size: "sm" as const },
  primaryRedSmall: { style: "primary" as const, color: "red" as const, size: "sm" as const },
  primaryGoldSmall: { style: "primary" as const, color: "gold" as const, size: "sm" as const },

  // Full width variants
  primaryBlueFull: { style: "primary" as const, color: "blue" as const, size: "md" as const, fullWidth: true as const },
  primaryRedFull: { style: "primary" as const, color: "red" as const, size: "md" as const, fullWidth: true as const },
  primaryGoldFull: { style: "primary" as const, color: "gold" as const, size: "md" as const, fullWidth: true as const },
} as const;
