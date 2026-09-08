import React from "react";
import { ExternalLink, Maximize2, Sparkles, ArrowRight } from "lucide-react";
import type { ProjectModalData } from "./ProjectLightboxModal";

interface ProjectCardProps {
  project: ProjectModalData;
  isFlagship?: boolean;
  onOpenLightbox: (project: ProjectModalData) => void;
}

export default function ProjectCard({
  project,
  isFlagship = false,
  onOpenLightbox,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card-modern ${
        isFlagship ? "project-card-modern--flagship" : ""
      } group`}
    >
      {/* Browser Chrome Container */}
      <div className="project-browser-frame">
        {/* Browser Topbar */}
        <div className="browser-topbar">
          <div className="browser-dots" aria-hidden="true">
            <span className="browser-dot browser-dot--close" />
            <span className="browser-dot browser-dot--min" />
            <span className="browser-dot browser-dot--expand" />
          </div>

          <div className="browser-url-pill">
            <span className="browser-lock" aria-hidden="true">🔒</span>
            <span className="browser-url-domain">{project.url}</span>
            <span className="browser-url-path">{project.urlPath || ""}</span>
          </div>

          <div className="browser-status-group">
            <span className="browser-live-badge">
              <span className="live-dot" />
              <span>{project.badge}</span>
            </span>

            <button
              type="button"
              className="browser-expand-btn"
              onClick={() => onOpenLightbox(project)}
              aria-label={`Enlarge preview for ${project.title}`}
              title="Inspect high-res preview"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* Browser Viewport with Screenshot */}
        <div
          className="browser-viewport"
          onClick={() => onOpenLightbox(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenLightbox(project);
            }
          }}
          aria-label={`Click to open full preview of ${project.title}`}
        >
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            loading="lazy"
            className="browser-viewport-img"
          />
          <div className="viewport-overlay">
            <span className="viewport-inspect-pill">
              <Maximize2 size={14} />
              <span>Inspect Full Resolution</span>
            </span>
          </div>
        </div>
      </div>

      {/* Project Narrative & Details */}
      <div className="project-card-details">
        <div className="project-card-header">
          <div className="project-meta-top">
            <span className="project-number">{project.number} // 05</span>
            <span className="project-category-pill">{project.category}</span>
            <span className="project-date-badge">{project.date}</span>
          </div>

          <h3
            className="project-title"
            style={{ fontFamily: project.titleFont || "var(--font-display)" }}
          >
            {project.title}
          </h3>

          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        <p className="project-desc">{project.description}</p>

        {project.highlight && (
          <div className="project-highlight-badge">
            <Sparkles size={14} className="highlight-icon" />
            <span>{project.highlight}</span>
          </div>
        )}

        <div className="project-tags-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card-footer">
          <button
            type="button"
            className="project-primary-btn"
            onClick={() => onOpenLightbox(project)}
          >
            <span>View Case Study &amp; Preview</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            className="project-secondary-link"
            onClick={() => onOpenLightbox(project)}
          >
            <span>Inspect Mockup</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
