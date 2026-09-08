import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Sparkles, Layers, Calendar, CheckCircle2 } from "lucide-react";

export interface ProjectModalData {
  id: string;
  number: string;
  title: string;
  titleFont?: string;
  subtitle: string;
  category: string;
  url: string;
  urlPath?: string;
  badge: string;
  date: string;
  description: string;
  longDescription?: string;
  highlight?: string;
  tags: string[];
  image: string;
  accentColor?: string;
}

interface ProjectLightboxModalProps {
  project: ProjectModalData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectLightboxModal({
  project,
  open,
  onOpenChange,
}: ProjectLightboxModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 bg-[#F8F5EE] border border-[#A88F6E]/40 text-[#201D17] rounded-2xl shadow-2xl">
        {/* Browser-style Topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#EBE4D2] border-b border-[#A88F6E]/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
            <div className="ml-3 px-3 py-1 bg-[#F5EFE1] rounded-full text-xs font-mono text-[#584E40] flex items-center gap-1.5 border border-[#A88F6E]/30 shadow-inner">
              <span className="text-emerald-600">●</span>
              <span className="font-semibold text-[#201D17]">{project.url}</span>
              <span className="text-[#776957]">{project.urlPath || "/"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#201D17] text-[#F8F3E8]">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Header Row */}
          <DialogHeader className="space-y-2 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#FF5F1F]">
                Project {project.number} // {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#776957]">
                <Calendar size={13} /> {project.date}
              </span>
            </div>
            <DialogTitle
              className="text-3xl sm:text-4xl font-normal tracking-tight text-[#201D17]"
              style={{ fontFamily: project.titleFont || "var(--font-display)" }}
            >
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-base font-medium text-[#584E40]">
              {project.subtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Screenshot Showcase Frame */}
          <div className="relative rounded-xl overflow-hidden border border-[#A88F6E]/40 bg-[#15140F] shadow-xl group">
            <img
              src={project.image}
              alt={`${project.title} full interface preview`}
              className="w-full h-auto object-cover max-h-[600px] object-top transition-transform duration-500"
            />
          </div>

          {/* Detailed Narrative & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#776957] flex items-center gap-2">
                <Layers size={14} className="text-[#FF5F1F]" /> Architecture &amp; Engineering Focus
              </h4>
              <p className="text-base text-[#584E40] leading-relaxed">
                {project.longDescription || project.description}
              </p>
              {project.highlight && (
                <div className="p-4 rounded-xl bg-[#EFE9DC] border border-[#A88F6E]/30 flex items-start gap-3">
                  <Sparkles size={18} className="text-[#FF5F1F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#201D17]">
                      Engineering Highlight
                    </span>
                    <p className="text-sm text-[#584E40] mt-0.5">{project.highlight}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Specs & Tech Stack */}
            <div className="space-y-4 md:border-l md:border-[#A88F6E]/30 md:pl-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#776957]">
                Technologies &amp; Architecture
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-[#E8E1CF] border border-[#A88F6E]/35 text-[#201D17]"
                  >
                    <CheckCircle2 size={11} className="text-[#FF5F1F]" /> {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#A88F6E]/25">
                <a
                  href="mailto:hello@visionfx.studio"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#201D17] hover:bg-[#FF5F1F] text-[#F8F3E8] text-sm font-medium transition-colors duration-200"
                >
                  <span>Discuss Similar Project</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
