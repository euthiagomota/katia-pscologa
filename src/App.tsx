import { useEffect, useRef, useState, type ReactNode } from "react";

const config = {
  instagram: "https://www.instagram.com/katiavielpsicologa",
  whatsapp: "", // Inserir o link oficial apenas após confirmação.
};
const nav = [
  ["Início", "inicio"],
  ["Sobre mim", "sobre"],
  ["Psicoterapia", "psicoterapia"],
  ["Como funciona", "como-funciona"],
  ["Livro e publicações", "livro"],
  ["Contato", "contato"],
];

function Icon({ name = "arrow", size = 22 }: { name?: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    leaf: (
      <>
        <path d="M5 21c1-8 5-13 13-17M5 16C0 7 9 2 21 3c0 12-5 18-14 14M9 12l1-5M13 9l5 1" />
      </>
    ),
    heart: <path d="M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
    chat: <path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-7a9 9 0 1 1 18-4Z" />,
    waves: (
      <>
        <path d="M2 6c4-5 6 5 10 0s6 5 10 0M2 12c4-5 6 5 10 0s6 5 10 0M2 18c4-5 6 5 10 0s6 5 10 0" />
      </>
    ),
    change: (
      <>
        <path d="M4 8a8 8 0 0 1 14-3l3 3M21 2v6h-6M20 16a8 8 0 0 1-14 3l-3-3M3 22v-6h6" />
      </>
    ),
    people: (
      <>
        <circle cx="8" cy="7" r="3" />
        <path d="M1 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 5 6" />
      </>
    ),
    spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />,
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    down: <path d="M12 3v17m-6-6 6 6 6-6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.leaf}
    </svg>
  );
}

function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg className={`botanical ${className}`} viewBox="0 0 260 420" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M112 415C101 324 168 202 173 37M136 313C76 294 43 257 43 214c55 7 89 45 93 99ZM150 260c48-13 81-45 83-83-46 3-76 40-83 83ZM162 205C109 182 89 147 96 112c43 17 65 49 66 93ZM170 146c42-19 63-48 58-80-38 10-57 39-58 80ZM173 83c-29-18-40-44-29-73 26 15 34 41 29 73ZM119 364c-42-4-75-27-87-57 44-2 74 18 87 57Z" />
      </g>
    </svg>
  );
}

function Button({
  children,
  href = "#contato",
  secondary = false,
  external = false,
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      className={`button magnetic ${secondary ? "secondary" : ""}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={(e) => {
        if (matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.045}px ${(e.clientY - r.top - r.height / 2) * 0.07}px`;
        }
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.translate = "0px 0px";
      }}
    >
      {children}
      <Icon size={17} />
    </a>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const situations = [
  [
    "chat",
    "Preocupações frequentes",
    "Quando os pensamentos parecem ocupar mais espaço do que você gostaria.",
  ],
  [
    "waves",
    "Sobrecarga emocional",
    "Quando lidar com tantas demandas começa a pesar no dia a dia.",
  ],
  ["change", "Dificuldades com mudanças", "Quando novos caminhos trazem dúvidas e inseguranças."],
  [
    "people",
    "Questões nos relacionamentos",
    "Quando estar com o outro também convida a olhar para si.",
  ],
  [
    "spark",
    "Autocrítica excessiva",
    "Quando a forma de se cobrar deixa pouco espaço para se acolher.",
  ],
  ["heart", "Compreender suas emoções", "Quando encontrar palavras para o que sente é um desafio."],
];
const faq = [
  [
    "Como funciona a primeira sessão de psicoterapia?",
    "De forma geral, a primeira sessão é um momento de escuta para conversar sobre o que levou você a buscar psicoterapia, suas necessidades e expectativas. O formato específico do atendimento da Kátia será confirmado com a profissional.",
  ],
  [
    "O que é a Terapia Cognitivo-Comportamental?",
    "A TCC é uma abordagem psicológica que considera a influência recíproca entre pensamentos, emoções e comportamentos. O trabalho é colaborativo e utiliza estratégias fundamentadas em conhecimento científico, considerando o contexto de cada pessoa.",
  ],
  [
    "Como posso entrar em contato para agendar?",
    "Informação provisória: o WhatsApp e o e-mail profissional ainda serão inseridos após confirmação. Por enquanto, você pode conhecer o perfil profissional @katiavielpsicologa no Instagram. Este protótipo não realiza agendamentos.",
  ],
  [
    "O atendimento é presencial ou online?",
    "Informação a confirmar com a Kátia: modalidades de atendimento, público atendido e localização. Não há uma modalidade definida neste protótipo.",
  ],
  [
    "Quanto tempo dura uma sessão?",
    "Informação a confirmar com a profissional. A duração, a frequência e as condições do acompanhamento serão esclarecidas antes do início do atendimento.",
  ],
  [
    "Como funciona o sigilo profissional?",
    "O sigilo é um dever ético na Psicologia e protege a intimidade das pessoas atendidas. Seus limites e as exceções previstas nas normas profissionais e na legislação são esclarecidos pela psicóloga durante o atendimento.",
  ],
];
const concepts = [
  [
    "Pensamentos",
    "A maneira como interpretamos as situações influencia o que sentimos e como agimos.",
  ],
  [
    "Emoções",
    "Nossas emoções oferecem informações sobre a experiência vivida e se relacionam com pensamentos e ações.",
  ],
  [
    "Comportamentos",
    "Nossas ações também influenciam emoções e pensamentos. Na terapia, novas possibilidades podem ser construídas.",
  ],
];
const photos = ["/reflexao-natureza.jpg", "/reflexao-pausa.jpg", "/reflexao-cuidado.jpg"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [concept, setConcept] = useState(0);
  const [privacy, setPrivacy] = useState(false);
  const book = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal, .timeline").forEach((el) => observer.observe(el));
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 35);
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
          document.documentElement.style.setProperty(
            "--parallax",
            `${Math.min(window.scrollY * 0.045, 45)}px`,
          );
          const timeline = document.querySelector(".timeline");
          if (timeline) {
            const r = timeline.getBoundingClientRect();
            (timeline as HTMLElement).style.setProperty(
              "--progress",
              `${Math.max(0, Math.min(1, (innerHeight * 0.9 - r.top) / (innerHeight * 0.55)))}`,
            );
          }
        }
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (privacy) dialog.current?.showModal();
    else dialog.current?.close();
  }, [privacy]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={scrolled || menu ? "header scrolled" : "header"}>
        <div className="header-inner">
          <a href="#inicio" className="brand" aria-label="Kátia Viel, início">
            <Icon name="leaf" size={38} />
            <span>
              Kátia Viel<small>PSICÓLOGA</small>
            </span>
          </a>
          <nav
            aria-label="Navegação principal"
            className={menu ? "nav is-open" : "nav"}
            id="main-navigation"
          >
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contato" className="header-cta">
            Agendar atendimento
            <Icon size={15} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="main-navigation"
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span className={menu ? "cross" : ""} />
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-grain" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-enter">
                <Eyebrow>PSICOTERAPIA · ACOLHIMENTO · AUTOCONHECIMENTO</Eyebrow>
              </div>
              <h1>
                <span className="hero-line">Um espaço para </span>
                <span className="hero-line">compreender suas </span>
                <span className="hero-line">
                  <em>emoções</em> e cuidar{" "}
                </span>
                <span className="hero-line">de você.</span>
              </h1>
              <p className="hero-description hero-enter">
                Conheça o trabalho da psicóloga Kátia Viel e a Terapia Cognitivo-Comportamental como
                uma possibilidade de cuidado, reflexão e desenvolvimento pessoal.
              </p>
              <div className="hero-actions hero-enter">
                <Button>Agendar atendimento</Button>
                <a className="text-link" href="#sobre">
                  Conheça a Kátia
                  <Icon size={17} />
                </a>
              </div>
              <a className="scroll-cue hero-enter" href="#acolhimento">
                <span>
                  <Icon name="down" size={16} />
                </span>
                UM PRIMEIRO PASSO, NO SEU TEMPO
              </a>
            </div>
            <div className="hero-visual">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <Botanical className="hero-botanical" />
              <div className="portrait-arch">
                <div className="portrait-light" />
                <img
                  src="/katia-viel.webp"
                  alt="Psicóloga Kátia Viel"
                  fetchPriority="high"
                  width="1122"
                  height="1402"
                />
              </div>
              <div className="portrait-caption">
                <span className="caption-line" />
                <div>
                  Kátia Viel<small>ESCUTA QUE ACOLHE. CUIDADO QUE RESPEITA.</small>
                </div>
              </div>
              <span className="vertical-note">UM ENCONTRO COM VOCÊ MESMA. COM VOCÊ MESMO.</span>
              <div className="hero-seal">
                <Icon name="leaf" size={23} />
                <span>
                  CIÊNCIA &<br />
                  ACOLHIMENTO
                </span>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>UM ESPAÇO DE ESCUTA, RESPEITO E POSSIBILIDADES</span>
            <span>
              PSICOLOGIA COM SENSIBILIDADE <span className="gold-dot">◆</span>
            </span>
          </div>
        </section>

        <section id="acolhimento" className="welcome section">
          <Botanical className="welcome-botanical" />
          <div className="container narrow center">
            <Reveal>
              <Eyebrow>CUIDAR COMEÇA COM ACOLHER</Eyebrow>
              <h2>
                Você não precisa compreender
                <br className="desktop-break" /> tudo o que sente <em>de uma só vez.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="section-description">
                Em alguns momentos, preocupações, dúvidas e emoções podem parecer difíceis de
                organizar. A psicoterapia oferece um espaço de escuta, reflexão e construção de
                novas formas de lidar com os desafios da vida.
              </p>
            </Reveal>
            <div className="values">
              {[
                ["chat", "Escuta profissional"],
                ["leaf", "Respeito à individualidade"],
                ["shield", "Cuidado com embasamento científico"],
              ].map(([icon, text], i) => (
                <Reveal delay={i * 120} key={text}>
                  <Icon name={icon} size={25} />
                  <span>{text}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="about section">
          <div className="container split">
            <Reveal className="about-photo">
              <div className="about-photo-inner">
                <Botanical />
                <img
                  src="/katia-viel.webp"
                  alt="Retrato de Kátia Viel, psicóloga"
                  width="1122"
                  height="1402"
                  loading="lazy"
                />
              </div>
              <div className="photo-label">
                <span>UM OLHAR ATENTO.</span>
                <em>Uma escuta presente.</em>
              </div>
              <span className="photo-outline" />
            </Reveal>
            <div className="about-copy">
              <Reveal>
                <Eyebrow>SOBRE MIM</Eyebrow>
                <h2>
                  Prazer, sou
                  <br />
                  <em>Kátia Viel.</em>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  Sou psicóloga e trabalho com a abordagem da Terapia Cognitivo-Comportamental,
                  buscando oferecer um espaço profissional de escuta, acolhimento e compreensão das
                  experiências de cada pessoa.
                </p>
                <p>
                  Minha atuação é orientada pelo conhecimento científico, pelo respeito à
                  individualidade e pela importância de construir um processo terapêutico
                  significativo.
                </p>
                <p className="prototype-note">
                  Apresentação provisória, sujeita à revisão e aprovação da profissional.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="education">
                  <Icon name="leaf" size={28} />
                  <div>
                    <strong>Conhecimento que sustenta o cuidado</strong>
                    <span>Psicologia · Terapia Cognitivo-Comportamental</span>
                    <p>
                      Formação informada: especialização pelo IPq — Instituto de Psiquiatria do
                      Hospital das Clínicas da USP.
                    </p>
                    <small>Titulação e nomenclatura exatas a confirmar.</small>
                  </div>
                </div>
                <Button secondary href="#abordagem">
                  Conheça minha abordagem
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="psicoterapia" className="situations section">
          <div className="container">
            <Reveal className="section-heading">
              <Eyebrow>QUANDO PROCURAR PSICOTERAPIA?</Eyebrow>
              <h2>
                Às vezes, cuidar de si começa
                <br className="desktop-break" /> por reconhecer <em>o que estamos vivendo.</em>
              </h2>
              <p>
                Buscar acompanhamento psicológico pode ser uma possibilidade em diferentes momentos
                da vida.
              </p>
            </Reveal>
            <div className="situations-grid">
              {situations.map(([icon, title, text], i) => (
                <Reveal key={title} delay={(i % 3) * 90}>
                  <article className="situation-card" tabIndex={0}>
                    <div className="card-top">
                      <Icon name={icon} size={31} />
                      <span>0{i + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="educational-note">
              Situações apresentadas como exemplos educativos. Não constituem diagnósticos ou uma
              lista de especialidades da profissional.
            </p>
          </div>
        </section>

        <section id="abordagem" className="approach section">
          <div className="container split">
            <Reveal>
              <Eyebrow>CIÊNCIA E SENSIBILIDADE</Eyebrow>
              <h2>
                Compreender seus pensamentos também é uma forma de <em>cuidar de você.</em>
              </h2>
              <p>
                A Terapia Cognitivo-Comportamental (TCC) é uma abordagem psicológica que trabalha a
                relação entre pensamentos, emoções e comportamentos, utilizando estratégias
                fundamentadas em conhecimento científico.
              </p>
              <p className="approach-note">
                <span />
                Um olhar para as conexões que fazem parte de você.
              </p>
            </Reveal>
            <Reveal className="diagram-wrap">
              <div
                className="diagram"
                role="group"
                aria-label="Relação recíproca entre pensamentos, emoções e comportamentos"
              >
                <svg className="diagram-lines" viewBox="0 0 440 340" aria-hidden="true">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="7"
                      markerHeight="7"
                      refX="5"
                      refY="3.5"
                      orient="auto-start-reverse"
                    >
                      <path d="m1 1 4 2.5L1 6" fill="none" stroke="currentColor" />
                    </marker>
                  </defs>
                  <path
                    d="M189 94 109 219M252 95l81 124M149 263h142"
                    markerStart="url(#arrowhead)"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
                {concepts.map(([label], i) => (
                  <button
                    key={label}
                    className={`concept concept-${i} ${concept === i ? "active" : ""}`}
                    onClick={() => setConcept(i)}
                    aria-pressed={concept === i}
                  >
                    <Icon name={["spark", "heart", "leaf"][i]} size={24} />
                    {label}
                  </button>
                ))}
                <span className="diagram-center">
                  TUDO SE
                  <br />
                  CONECTA
                </span>
              </div>
              <div className="concept-description" aria-live="polite">
                <strong>{concepts[concept][0]}</strong>
                <p>{concepts[concept][1]}</p>
              </div>
              <span className="diagram-hint">SELECIONE UM ELEMENTO PARA EXPLORAR</span>
            </Reveal>
          </div>
        </section>

        <section id="como-funciona" className="process section">
          <div className="container">
            <Reveal className="center">
              <Eyebrow>COMO FUNCIONA</Eyebrow>
              <h2>
                Um processo único,
                <br />
                <em>no seu tempo.</em>
              </h2>
            </Reveal>
            <div className="timeline">
              {[
                [
                  "Primeiro contato",
                  "Entre em contato para conhecer as informações sobre o atendimento e esclarecer dúvidas iniciais.",
                ],
                [
                  "Sessão inicial",
                  "Um primeiro momento de escuta para compreender suas necessidades e conhecer a proposta de acompanhamento.",
                ],
                [
                  "Processo terapêutico",
                  "O acompanhamento é construído considerando suas demandas, objetivos e individualidade.",
                ],
              ].map(([title, text], i) => (
                <Reveal key={title} delay={i * 160} className="timeline-step">
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="center">
              <Button href="#contato">
                Vamos conversar?
                <Icon name="chat" size={18} />
              </Button>
            </Reveal>
          </div>
        </section>

        <section id="livro" className="book-section section">
          <div className="container split">
            <Reveal className="book-stage">
              <Botanical />
              <div className="book-shadow" />
              <div
                ref={book}
                className="book"
                onPointerMove={(e) => {
                  if (
                    !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
                      .matches
                  )
                    return;
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${-13 + (e.clientX - r.left - r.width / 2) * 0.045}deg) rotateX(${-(e.clientY - r.top - r.height / 2) * 0.025}deg)`;
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                <div className="book-spine" />
                <div className="book-cover">
                  <span>PROJETO EDITORIAL · PROTÓTIPO</span>
                  <div className="book-cover-title">
                    Um espaço
                    <br />
                    para as
                    <br />
                    <em>palavras.</em>
                    <small>[TÍTULO A CONFIRMAR]</small>
                  </div>
                  <Botanical />
                  <div className="cover-placeholder">[CAPA OFICIAL A INSERIR]</div>
                  <div className="book-cover-bottom">
                    AUTORIA A CONFIRMAR<span>—</span>
                  </div>
                </div>
                <div className="book-pages" />
              </div>
              <span className="book-caption">ESTUDO VISUAL DE CAPA · NÃO É UM LANÇAMENTO</span>
            </Reveal>
            <div className="book-copy">
              <Reveal>
                <Eyebrow>LIVRO E PUBLICAÇÕES</Eyebrow>
                <span className="status-tag">UM ESPAÇO PARA O QUE PODE FLORESCER</span>
                <h2>
                  Palavras que acolhem.
                  <br />
                  Conhecimento
                  <br />
                  <em>que aproxima.</em>
                </h2>
                <p>
                  Um espaço reservado para apresentar as publicações e projetos editoriais de Kátia
                  Viel.
                </p>
                <div className="book-details">
                  <span>[SINOPSE A CONFIRMAR]</span>
                  <span>[INFORMAÇÕES A CONFIRMAR]</span>
                </div>
                <p className="prototype-note">
                  Existe a possibilidade de uma publicação sobre ansiedade. Autoria, título, capa e
                  estágio de desenvolvimento ainda dependem de validação. Nenhuma publicação ou
                  venda é anunciada neste protótipo.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="conteudos" className="articles section">
          <div className="container">
            <Reveal className="articles-heading">
              <div>
                <Eyebrow>CONTEÚDOS E REFLEXÕES</Eyebrow>
                <h2>
                  Um espaço para
                  <br />
                  <em>aprender e refletir.</em>
                </h2>
              </div>
              <a
                className="text-link"
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size={18} />
                Acompanhe no Instagram
                <Icon size={16} />
              </a>
            </Reveal>
            <div className="articles-grid">
              {[
                "Entendendo melhor a ansiedade.",
                "O que é a Terapia Cognitivo-Comportamental?",
                "Por que cuidar da saúde emocional?",
              ].map((title, i) => (
                <Reveal key={title} delay={i * 100}>
                  <article className="article-card">
                    <div className="article-image">
                      <img
                        src={photos[i]}
                        alt={
                          [
                            "Composição natural com vaso e luz suave",
                            "Ramo em vaso em composição minimalista",
                            "Plantas e espelho em ambiente acolhedor",
                          ][i]
                        }
                        loading="lazy"
                        width="800"
                        height="600"
                      />
                      <span>CONTEÚDO PROVISÓRIO</span>
                    </div>
                    <div className="article-meta">
                      PARA REFLETIR<span>0{i + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>Espaço editorial reservado. Conteúdo ainda não publicado.</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section section" id="duvidas">
          <div className="container faq-grid">
            <Reveal>
              <Eyebrow>DÚVIDAS FREQUENTES</Eyebrow>
              <h2>
                Talvez você <br />
                ainda tenha
                <br />
                <em>algumas dúvidas.</em>
              </h2>
              <p>
                Conhecer o processo também
                <br />
                faz parte do primeiro passo.
              </p>
              <Botanical />
            </Reveal>
            <div className="faq-list">
              {faq.map(([q, a], i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={q}>
                  <h3>
                    <button
                      id={`faq-button-${i}`}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{q}</span>
                      <span className="plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    inert={openFaq !== i}
                  >
                    <div>
                      <p>{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="contact section">
          <Botanical className="contact-leaves" />
          <div className="container center">
            <Reveal>
              <Eyebrow>O PRIMEIRO PASSO PODE SER UMA CONVERSA</Eyebrow>
              <h2>
                Talvez este seja um bom momento
                <br className="desktop-break" /> para <em>olhar para você.</em>
              </h2>
              <p>
                Se deseja conhecer melhor o acompanhamento psicológico
                <br className="desktop-break" /> e esclarecer suas dúvidas, entre em contato.
              </p>
              <div className="contact-actions">
                {config.whatsapp ? (
                  <Button href={config.whatsapp} external>
                    Entrar em contato
                  </Button>
                ) : (
                  <Button href="#dados-contato">Entrar em contato</Button>
                )}
                <Button href={config.instagram} external secondary>
                  Conhecer o Instagram
                </Button>
              </div>
            </Reveal>
            <div className="contact-pending" id="dados-contato">
              <Icon name="chat" size={20} />
              <div>
                <strong>Contato profissional em breve</strong>
                <p>[INSERIR WHATSAPP / E-MAIL PROFISSIONAL]</p>
                <small>
                  Dados aguardando confirmação. Este protótipo não realiza agendamentos.
                </small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-main reveal">
            <div>
              <a className="brand" href="#inicio">
                <Icon name="leaf" size={37} />
                <span>
                  Kátia Viel<small>PSICÓLOGA</small>
                </span>
              </a>
              <p>
                Um espaço de acolhimento,
                <br />
                clareza e possibilidades.
              </p>
              <a
                className="footer-instagram"
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" size={17} />
                @katiavielpsicologa
              </a>
            </div>
            <div className="footer-nav">
              <span>NAVEGUE COM CALMA</span>
              {nav
                .filter(([, id]) => id !== "como-funciona")
                .map(([label, id]) => (
                  <a href={`#${id}`} key={id}>
                    {label}
                  </a>
                ))}
            </div>
            <div className="footer-details">
              <span>INFORMAÇÕES PROFISSIONAIS</span>
              <p>
                Nome completo: [A CONFIRMAR]
                <br />
                CRP: [INSERIR REGISTRO PROFISSIONAL]
              </p>
              <p>
                Contato: [INSERIR WHATSAPP/E-MAIL]
                <br />
                Localização: [CONFIRMAR]
              </p>
              <small>
                Informações profissionais devem ser validadas
                <br />
                antes da publicação deste site.
              </small>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Kátia Viel · Protótipo para aprovação</span>
            <span>Feito com cuidado, em cada detalhe.</span>
            <button onClick={() => setPrivacy(true)}>Política de Privacidade</button>
          </div>
        </div>
      </footer>
      <dialog ref={dialog} onClose={() => setPrivacy(false)} className="privacy-dialog">
        <div>
          <Eyebrow>TRANSPARÊNCIA</Eyebrow>
          <h2>
            Privacidade
            <br />
            <em>neste protótipo.</em>
          </h2>
          <p>
            Esta página demonstrativa não possui formulários, cadastro, agendamento ou ferramentas
            de análise instaladas pelo site e não solicita dados de saúde.
          </p>
          <p>
            As fotografias e fontes são servidas junto com esta página, sem requisições a bancos de
            imagens ou provedores de fontes. O link do Instagram leva a um serviço externo, sujeito
            à sua própria política de privacidade.
          </p>
          <p>
            A política definitiva, os dados do responsável e os canais para exercício de direitos
            deverão ser definidos e revisados antes da publicação. Este aviso não substitui a
            política final.
          </p>
          <button className="button" onClick={() => setPrivacy(false)}>
            Fechar
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
