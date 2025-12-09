import { ExternalLink, Copy } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { formatAddress } from "../lib/utils";

export default function UserInfo() {
  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <strong>User Info:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
    </div>
  );
}
