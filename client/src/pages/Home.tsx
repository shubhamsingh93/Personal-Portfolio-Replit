import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Github, 
  Linkedin, 
  Mail, 
  TrendingUp, 
  Terminal, 
  Database, 
  Figma, 
  BarChart3,
  Brain,
  MessageSquare,
  Globe,
  Award,
  FileDown
} from "lucide-react";

import { useContact } from "@/hooks/use-contact";
import { api, type ContactInput } from "@shared/routes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ChatDemo } from "@/components/ChatDemo";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const contactMutation = useContact();

  const form = useForm<ContactInput>({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactInput) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="font-display font-bold text-xl tracking-tight text-primary">SS.</span>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="text-muted-foreground hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('skills')} className="text-muted-foreground hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="text-muted-foreground hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-primary transition-colors">Contact</button>
            </div>
            <Button onClick={() => scrollToSection('contact')} size="sm" className="rounded-full">Get in Touch</Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* HERO SECTION */}
        <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 text-center md:text-left"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Open to new opportunities
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                  Building products that <span className="text-primary">solve problems.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-4 font-medium">
                  Hi, I'm <span className="text-foreground">Shubham Singh</span>.
                </p>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                  Product Manager with 3+ years of experience in SaaS & enterprise platforms.
                  <br className="hidden md:block"/>
                  🎯 Strategic and data-driven Product Consultant skilled in reducing friction and driving adoption.
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" onClick={() => scrollToSection('projects')}>
                    View Work
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base gap-2" asChild>
                    <a href="https://github.com/shubhamsingh93/" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" /> GitHub
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <a href="https://www.linkedin.com/in/shubham-singh-pm/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base gap-2" asChild>
                    <a href="/Shubham_Singh_Resume.pdf" download="Shubham_Singh_Resume.pdf">
                      <FileDown className="w-5 h-5" /> Resume
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              {/* Avatar Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10">
                  {/* Dynamic image: user provided avatar */}
                  <img 
                    src="/images/avatar.png" 
                    alt="Shubham Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 -right-4 bg-white p-3 rounded-2xl shadow-lg z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute bottom-10 -left-4 bg-white p-3 rounded-2xl shadow-lg z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10 scale-110"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 bg-secondary/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Experience" 
              subtitle="My professional journey across product, strategy, and engineering."
            />
            
            <div className="relative mt-12 space-y-8 md:space-y-0">
              <ExperienceCard 
                index={0}
                role="Product Manager"
                company="Infosys Limited"
                period="Jul 2022 - Present"
                location="Bangalore"
                achievements={[
                  "Led transformation of L&D system serving 250k+ learners, achieving 75% adoption rate.",
                  "Owned GenAI chatbot (Llama 3 8B), driving 28% completion rate increase.",
                  "Launched certification platform resulting in 64% user growth.",
                  "Conducted A/B testing leading to a 20% increase in conversions."
                ]}
              />
              <ExperienceCard 
                index={1}
                role="Senior Associate Consultant"
                company="Infosys Limited"
                period="May 2019 - Jul 2022"
                location="Bangalore"
                achievements={[
                  "Implemented CI/CD pipelines reducing deployment time by 40%.",
                  "Managed monitoring stacks ensuring 99.9% system uptime.",
                  "Automated server maintenance saving 365+ man-hours annually."
                ]}
              />
              <ExperienceCard 
                index={2}
                role="Technical Solutions Representative II"
                company="HP PPS Services India Pvt. Ltd."
                period="Jan 2016 - May 2019"
                location="Bangalore"
                achievements={[
                  "Maintained 95% on-time version control delivery.",
                  "Ensured 99.8% service uptime for critical enterprise clients."
                ]}
              />
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Skills & Expertise" 
              subtitle="A blend of strategic vision and technical execution."
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  category: "Strategy",
                  icon: <TrendingUp className="w-5 h-5" />,
                  skills: ["Product Strategy", "Roadmapping", "A/B Testing", "Growth Metrics", "User Research"]
                },
                {
                  category: "Analytics",
                  icon: <BarChart3 className="w-5 h-5" />,
                  skills: ["SQL", "Mixpanel", "Google Analytics", "Tableau", "Data Visualization"]
                },
                {
                  category: "Technical",
                  icon: <Terminal className="w-5 h-5" />,
                  skills: ["RESTful APIs", "Python", "CI/CD", "GenAI/LLMs", "Agile/Scrum"]
                },
                {
                  category: "Design",
                  icon: <Figma className="w-5 h-5" />,
                  skills: ["Figma", "Wireframing", "Prototyping", "User Experience", "Design Systems"]
                }
              ].map((group, i) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {group.icon}
                    </div>
                    <h3 className="font-bold text-lg">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="font-medium text-muted-foreground bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-primary/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Featured Projects" 
              subtitle="Ideas turned into reality through code and design."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
              <ProjectCard 
                title="TrueWorth" 
                description="A no-nonsense financial health tracker that helps users visualize net worth, track expenses, and set realistic savings goals."
                type="app"
                url="https://trueworth.lovable.app"
                icon={<TrendingUp className="w-8 h-8" />}
              />
              
              <ProjectCard 
                title="Learning Assistant AI" 
                description="An interactive mockup of an AI upskilling assistant powered by Llama 3. Provides personalized course recommendations and progress tracking."
                type="demo"
                onDemoClick={() => setChatOpen(true)}
                icon={<Brain className="w-8 h-8" />}
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Get in Touch" 
              subtitle="Have an interesting opportunity or just want to say hi? My inbox is always open."
              centered
            />
            
            <Card className="shadow-2xl border-border/50 overflow-hidden">
              <CardContent className="p-0 grid md:grid-cols-5">
                {/* Contact Info Sidebar */}
                <div className="bg-primary text-primary-foreground p-8 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-6">Contact Info</h3>
                    <p className="opacity-90 mb-8 text-sm leading-relaxed">
                      I'm currently available for freelance projects and full-time opportunities.
                    </p>
                    
                    <div className="space-y-4">
                      <a href="mailto:shubhamsingh842@outlook.com" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                        <Mail className="w-4 h-4" /> shubhamsingh842@outlook.com
                      </a>
                      <a href="https://linkedin.com/in/shubham-singh-pm" target="_blank" rel="noopener" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                        <Linkedin className="w-4 h-4" /> LinkedIn Profile
                      </a>
                      <a href="https://github.com/shubhamsingh93" target="_blank" rel="noopener" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                        <Github className="w-4 h-4" /> GitHub Profile
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-12 md:mt-0">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                {/* Form Area */}
                <div className="p-8 md:col-span-3 bg-card">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-muted/30 border-border/60 focus:bg-background transition-colors" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} className="bg-muted/30 border-border/60 focus:bg-background transition-colors" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Hi Shubham, I'd like to discuss..." 
                                className="min-h-[120px] bg-muted/30 border-border/60 focus:bg-background transition-colors resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-foreground text-background py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="font-display font-bold text-lg mb-1">Shubham Singh</p>
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-6">
               <a href="https://www.linkedin.com/in/shubham-singh-pm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/shubhamsingh93/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:shubhamsingh842@outlook.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Interactive Chat Demo Modal */}
      <ChatDemo isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
