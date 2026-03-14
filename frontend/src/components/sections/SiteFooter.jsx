export default function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="content-container">
        <div className="flex items-center gap-4 mb-3">
          <img
            src="/logo_devansh.png"
            alt="Devansh Buildsmore Logo - Construction Company in Ghaziabad"
            className="h-28 w-auto"
            style={{ filter: "brightness(1.1)" }}
          />
          <p className="footer-brand" data-testid="footer-brand-name">
            DEVANSH BUILDSMORE
          </p>
        </div>
        <p className="footer-caption" data-testid="footer-caption">
          Construction partner for residential, commercial and multipurpose
          development projects across NCR.
        </p>
      </div>
    </footer>
  );
}
