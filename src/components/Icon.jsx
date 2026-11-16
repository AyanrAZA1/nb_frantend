import {
  Award, Bug, Building2, Calendar, Cloud, Crosshair, Globe, Infinity as InfinityIcon,
  Laptop, Layers, MonitorPlay, Network, RefreshCw, Route, Server, ShieldCheck, Sparkles, Target,
  Terminal, UserCheck, Users, Video,
} from "lucide-react";

// Data files reference icons by name; map them here so imports stay tree-shakeable.
const MAP = {
  Award, Bug, Building2, Calendar, Cloud, Crosshair, Globe, Infinity: InfinityIcon,
  Laptop, Layers, MonitorPlay, Network, RefreshCw, Route, Server, ShieldCheck, Sparkles, Target,
  Terminal, UserCheck, Users, Video,
};

export default function Icon({ name, ...props }) {
  const C = MAP[name] ?? Sparkles;
  return <C aria-hidden="true" {...props} />;
}
