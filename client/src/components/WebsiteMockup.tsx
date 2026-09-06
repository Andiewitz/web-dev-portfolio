import React from "react";

type WebsiteMockupProps = {
  type: "canvas" | "editor" | "arena";
  url: string;
  urlPath: string;
  badge: string;
};

export default function WebsiteMockup({ type, url, urlPath, badge }: WebsiteMockupProps) {
  return (
    <div className="website-card-frame" aria-label={`Interactive preview of ${url}`}>
      {/* Browser Chrome / Header Bar */}
      <div className="browser-chrome">
        <div className="browser-dots" aria-hidden="true">
          <span className="browser-dot browser-dot--close" />
          <span className="browser-dot browser-dot--min" />
          <span className="browser-dot browser-dot--expand" />
        </div>
        <div className="browser-address-bar">
          <span className="browser-lock" aria-hidden="true">🔒</span>
          <span className="browser-domain">{url}</span>
          <span className="browser-path">{urlPath}</span>
        </div>
        <div className="browser-badge">{badge}</div>
      </div>

      {/* Website Viewport Area */}
      <div className="website-viewport">
        {type === "canvas" && (
          <div className="preview-canvas">
            <div className="preview-canvas__grid" aria-hidden="true" />
            <div className="preview-canvas__toolbar" aria-hidden="true">
              <span className="pv-tool pv-tool--active">✦</span>
              <span className="pv-tool">☵</span>
              <span className="pv-tool">↗</span>
              <span className="pv-tool">▣</span>
            </div>
            <svg className="preview-canvas__wires" viewBox="0 0 280 150" aria-hidden="true">
              <path d="M 75 50 C 115 50, 130 35, 175 35" fill="none" stroke="#FF5F1F" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 75 50 C 115 50, 130 105, 175 105" fill="none" stroke="rgba(168,143,110,0.6)" strokeWidth="1.5" />
            </svg>
            <div className="canvas-node node--gateway" style={{ top: "35px", left: "18px" }}>
              <span className="node-status node-status--active" />
              <div>
                <p className="node-name">API Gateway</p>
                <p className="node-meta">proxy:443 · 0.8ms</p>
              </div>
            </div>
            <div className="canvas-node node--worker" style={{ top: "20px", left: "175px" }}>
              <span className="node-status node-status--green" />
              <div>
                <p className="node-name">Auth Worker</p>
                <p className="node-meta">edge runtime</p>
              </div>
            </div>
            <div className="canvas-node node--db" style={{ top: "90px", left: "175px" }}>
              <span className="node-status node-status--amber" />
              <div>
                <p className="node-name">Postgres Cluster</p>
                <p className="node-meta">pool: active</p>
              </div>
            </div>
            <div className="canvas-fps">
              <span>60 FPS</span>
              <span>·</span>
              <span>100% Zoom</span>
            </div>
          </div>
        )}

        {type === "editor" && (
          <div className="preview-editor">
            <div className="preview-editor__header">
              <span className="pv-doc-icon">¶</span>
              <span className="pv-doc-title">chapter-01_rhythm.md</span>
              <span className="pv-doc-save">Saved locally</span>
            </div>
            <div className="preview-editor__body">
              <h4 className="pv-heading">The architecture of typography.</h4>
              <p className="pv-text">
                Web pages are not static paper sheets. They are fluid layout engines where measure and leading must hold up across viewports.
              </p>
              <div className="pv-selection-box">
                <div className="pv-floating-bar">
                  <span className="pv-bar-btn active">B</span>
                  <span className="pv-bar-btn">I</span>
                  <span className="pv-bar-btn">H2</span>
                  <span className="pv-bar-btn">Link</span>
                </div>
                <p className="pv-selected-line">
                  Good typography makes complex software feel effortless.
                </p>
              </div>
              <div className="pv-editor-footer">
                <span>742 words</span>
                <span>·</span>
                <span>3 min read</span>
                <span className="pv-clean-badge">Zero layout shift</span>
              </div>
            </div>
          </div>
        )}

        {type === "arena" && (
          <div className="preview-arena">
            <div className="preview-arena__top">
              <span className="arena-streak">🔥 14 streak</span>
              <div className="arena-timer">
                <div className="arena-timer__fill" />
              </div>
              <span className="arena-clock">00:08</span>
            </div>
            <div className="preview-arena__quiz">
              <p className="arena-sub">ROUND 4 OF 10 · WEB PERFORMANCE</p>
              <p className="arena-q">Which strategy eliminates Cumulative Layout Shift (CLS)?</p>
              <div className="arena-answers">
                <div className="arena-ans arena-ans--correct">
                  <span className="arena-key">A</span>
                  <span className="arena-val">Explicit aspect-ratio box sizing</span>
                  <span className="arena-check">✓</span>
                </div>
                <div className="arena-ans">
                  <span className="arena-key">B</span>
                  <span className="arena-val">Client DOM recalculation loop</span>
                </div>
              </div>
              <div className="arena-footer">
                <span className="arena-user">Rank #1 Andrei · 4,180 XP</span>
                <span className="arena-ping">● 24ms WebSocket</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
