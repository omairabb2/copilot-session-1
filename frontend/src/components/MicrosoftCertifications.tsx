const certifications = [
  {
    code: "AZ-900",
    name: "Azure Fundamentals",
    level: "Principiante",
    levelBg: "#ECFDF5",
    levelColor: "#065F46",
    description:
      "Valida conocimientos fundamentales de la nube: servicios principales de Azure, gestión y gobernanza.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-fundamentals/",
    icon: "☁️",
    product: "Azure",
  },
  {
    code: "AI-900",
    name: "Azure AI Fundamentals",
    level: "Principiante",
    levelBg: "#ECFDF5",
    levelColor: "#065F46",
    description:
      "Demuestra conocimientos básicos de IA y servicios de Azure AI como Machine Learning, visión y lenguaje.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/",
    icon: "🤖",
    product: "Azure AI",
  },
  {
    code: "SC-900",
    name: "Security, Compliance & Identity Fundamentals",
    level: "Principiante",
    levelBg: "#ECFDF5",
    levelColor: "#065F46",
    description:
      "Conocimientos básicos de seguridad, cumplimiento e identidad en soluciones cloud de Microsoft.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/",
    icon: "🔒",
    product: "Azure / M365",
  },
  {
    code: "AZ-104",
    name: "Azure Administrator Associate",
    level: "Intermedio",
    levelBg: "#EFF6FF",
    levelColor: "#1E40AF",
    description:
      "Implementa, gestiona y monitoriza el entorno Azure de una organización, incluyendo identidades, redes y almacenamiento.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-administrator/",
    icon: "⚙️",
    product: "Azure",
  },
  {
    code: "AI-102",
    name: "Azure AI Engineer Associate",
    level: "Intermedio",
    levelBg: "#EFF6FF",
    levelColor: "#1E40AF",
    description:
      "Diseña e implementa soluciones de IA con Azure AI Services, Azure AI Search y Azure OpenAI.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-engineer/",
    icon: "🧠",
    product: "Azure AI",
  },
  {
    code: "SC-500",
    name: "Cloud and AI Security Engineer Associate",
    level: "Intermedio",
    levelBg: "#EFF6FF",
    levelColor: "#1E40AF",
    description:
      "Nueva certificación 2026 que reemplaza a AZ-500. Cubre seguridad en la nube e IA con Microsoft Defender y Sentinel.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/cloud-ai-security-engineer/",
    icon: "🛡️",
    product: "Seguridad",
    isNew: true,
  },
  {
    code: "AZ-305",
    name: "Azure Solutions Architect Expert",
    level: "Experto",
    levelBg: "#FDF4FF",
    levelColor: "#6B21A8",
    description:
      "Diseña soluciones de infraestructura de Azure que incluyen cómputo, redes, almacenamiento e identidad a escala empresarial.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-solutions-architect/",
    icon: "🏗️",
    product: "Azure",
  },
  {
    code: "MS-900",
    name: "Microsoft 365 Fundamentals",
    level: "Principiante",
    levelBg: "#ECFDF5",
    levelColor: "#065F46",
    description:
      "Conocimientos básicos de productividad en la nube, dispositivos, seguridad y conformidad con Microsoft 365.",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/microsoft-365-fundamentals/",
    icon: "📋",
    product: "Microsoft 365",
  },
];

const cardShadow =
  "rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px";

export default function MicrosoftCertifications() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "#111827", letterSpacing: "0.35px" }}
          >
            Certificaciones Microsoft 2026
          </p>
          <p className="text-xs font-light" style={{ color: "#6B7280" }}>
            Fuente: Microsoft Learn · learn.microsoft.com
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <a
            key={cert.code}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-card p-px transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.01) 100%)",
              textDecoration: "none",
            }}
          >
            <div
              className="rounded-card bg-neutral p-5"
              style={{ boxShadow: cardShadow }}
            >
              {/* Header row */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl leading-none">{cert.icon}</span>
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: "#6B7280" }}
                  >
                    {cert.code}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {cert.isNew && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: "#FFEDD5", color: "#9A3412" }}
                    >
                      Nuevo
                    </span>
                  )}
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      background: cert.levelBg,
                      color: cert.levelColor,
                    }}
                  >
                    {cert.level}
                  </span>
                </div>
              </div>

              {/* Name */}
              <p
                className="mb-1.5 text-sm font-medium leading-snug"
                style={{ color: "#111827" }}
              >
                {cert.name}
              </p>

              {/* Product tag */}
              <p
                className="mb-2 text-xs font-light"
                style={{ color: "#6B7280" }}
              >
                {cert.product}
              </p>

              {/* Description */}
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {cert.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
