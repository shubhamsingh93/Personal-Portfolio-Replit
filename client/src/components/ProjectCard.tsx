import { motion } from "framer-motion";
import { ExternalLink, PlayCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectProps {
  title: string;
  description: string;
  type: "app" | "demo";
  url?: string;
  onDemoClick?: () => void;
  icon?: React.ReactNode;
}

export function ProjectCard({ title, description, type, url, onDemoClick, icon }: ProjectProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="p-1 bg-gradient-to-r from-primary/20 to-accent/20 h-2" />
      <div className="p-8 flex flex-col flex-grow">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
          {icon || <Layers className="w-6 h-6" />}
        </div>
        
        <h3 className="text-2xl font-bold mb-3 font-display">{title}</h3>
        <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-border/50">
          {type === "app" && url && (
            <Button 
              className="w-full gap-2 group" 
              onClick={() => window.open(url, '_blank')}
            >
              Launch App
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          
          {type === "demo" && onDemoClick && (
            <Button 
              className="w-full gap-2 group" 
              variant="outline"
              onClick={onDemoClick}
            >
              Try Demo
              <PlayCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
