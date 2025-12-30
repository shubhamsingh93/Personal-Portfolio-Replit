import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface ExperienceProps {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  index: number;
}

export function ExperienceCard({ role, company, period, location, achievements, index }: ExperienceProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline Line (Mobile: left, Desktop: center logic handled in parent) */}
      <div className="md:grid md:grid-cols-12 md:gap-8 items-start group">
        
        {/* Date/Location Column (Left on Desktop) */}
        <div className="hidden md:block md:col-span-3 text-right pt-1">
          <p className="font-semibold text-primary">{period}</p>
          <p className="text-sm text-muted-foreground flex items-center justify-end gap-1 mt-1">
            {location} <MapPin className="w-3 h-3" />
          </p>
        </div>

        {/* Timeline Dot & Line */}
        <div className="hidden md:flex md:col-span-1 flex-col items-center h-full">
          <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10 group-hover:scale-110 transition-transform duration-300" />
          <div className="w-0.5 h-full bg-border -mt-2" />
        </div>

        {/* Content Column (Right on Desktop) */}
        <div className="md:col-span-8 pb-12">
          {/* Mobile Header */}
          <div className="md:hidden mb-2">
            <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold mb-2">
              {period}
            </span>
          </div>

          <div className="bg-card hover:bg-card/80 border border-border/50 hover:border-primary/20 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
            <h3 className="text-xl font-bold text-foreground mb-1">{role}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">{company}</span>
              <span className="md:hidden mx-1">•</span>
              <span className="md:hidden text-sm">{location}</span>
            </div>
            
            <ul className="space-y-3">
              {achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Mobile Timeline decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border md:hidden">
        <div className="absolute top-2 -left-[5px] w-3 h-3 rounded-full bg-primary" />
      </div>
    </motion.div>
  );
}
