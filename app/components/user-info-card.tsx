import { useState } from "react";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "../../components/ui/button.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.js";
import { Badge } from "../../components/ui/badge.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip.js";
import { formatAddress } from "../../lib/utils.js";
// This component previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to fetch user info from an API route or server component.
export default function UserInfo() {
  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <strong>User Info:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
    </div>
  );
}
