"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const icons = [
  {
    id: "shopping-cart",
    name: "Cart",
    url: "/icons/shopping-cart.svg"
  },
  {
    id: "star",
    name: "Star",
    url: "/icons/star.svg"
  },
  {
    id: "heart",
    name: "Heart",
    url: "/icons/heart.svg"
  },
  {
    id: "cog",
    name: "Settings",
    url: "/icons/cog.svg"
  },
  {
    id: "user",
    name: "User",
    url: "/icons/user.svg"
  }
];

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function IconSelector({ value, onChange, className }: IconSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selectedIcon = icons.find(icon => icon.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            {selectedIcon && (
              <img 
                src={selectedIcon.url} 
                alt={selectedIcon.name}
                className="h-4 w-4"
              />
            )}
            <span>{selectedIcon?.name || "Select icon..."}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="grid grid-cols-2 gap-2">
          {icons.map((icon) => (
            <Button
              key={icon.id}
              variant="ghost"
              className={cn(
                "flex items-center gap-2 justify-start",
                value === icon.id && "bg-accent"
              )}
              onClick={() => {
                onChange(icon.id);
                setOpen(false);
              }}
            >
              <img 
                src={icon.url} 
                alt={icon.name}
                className="h-4 w-4" 
              />
              <span className="text-sm">{icon.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
