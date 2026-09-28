import {  Gem, Gift, House, Landmark, Package, Search, Shirt, Sparkles } from "lucide-react";

type IconName = "package" | "landmark" | "shirt" | "gem" | "gift" | "house" | "sparkles" | "search";
const icons = { package: Package, landmark: Landmark, shirt: Shirt, gem: Gem, gift: Gift, house: House, sparkles: Sparkles, search: Search } as const;

export function CategoryIcon({ name, size = 22 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} aria-hidden="true" />;
}