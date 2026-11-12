import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  BG,
  BLUE,
  Content,
  Corner,
  Counter,
  H1,
  Kicker,
  LIGHT,
  NAVY,
  P,
  PhotoBg,
  Reveal,
  Scene,
} from "./ui";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/* 1. Abertura ------------------------------------------------------------ */
export const Abertura: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <PhotoBg
        name="Fundo abertura"
        src="img/11.jpg"
        position="center 30%"
        shade={`radial-gradient(circle at center, ${NAVY}d0 0%, ${BG}f5 75%)`}
      />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", gap: 40 }}
      >
        <Img
          name="Logo ON"
          src={staticFile("img/01.jpg")}
          style={{
            width: 520,
            borderRadius: 24,
            opacity: interpolate(frame, [5, 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [5, 40], [0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
              output: "perceptual-scale",
            }),
          }}
        />
        <Reveal
          name="Slogan"
          delay={35}
          style={{ ...H1, fontSize: 76, textAlign: "center" }}
        >
          Soluções Elétricas Personalizadas.
        </Reveal>
        <Reveal
          name="Sub-slogan"
          delay={50}
          style={{ ...P, fontSize: 44, color: BLUE, fontWeight: 600 }}
        >
          Do projeto à energização.
        </Reveal>
      </AbsoluteFill>
    </Scene>
  );
};

/* 2. Quem somos ---------------------------------------------------------- */
export const QuemSomos: React.FC = () => (
  <Scene>
    <PhotoBg name="Engenheiro" src="img/02.jpg" position="70% center" />
    <Content width={1050}>
      <Kicker>Quem somos</Kicker>
      <Reveal name="Título quem somos" delay={8} style={H1}>
        Energia segura e eficiente, sob medida.
      </Reveal>
      <Reveal name="Texto quem somos" delay={22} style={P}>
        Há mais de 16 anos atendemos o{" "}
        <b style={{ color: "white" }}>agronegócio</b>,{" "}
        <b style={{ color: "white" }}>indústrias</b> e{" "}
        <b style={{ color: "white" }}>loteamentos urbanos</b>, cuidando de
        todas as etapas: projeto, aprovação, execução e energização.
      </Reveal>
    </Content>
    <Corner />
  </Scene>
);

/* 3. Números ------------------------------------------------------------- */
const Stat: React.FC<{
  readonly name: string;
  readonly delay: number;
  readonly big: React.ReactNode;
  readonly label: string;
}> = ({ name, delay, big, label }) => (
  <Reveal
    name={name}
    delay={delay}
    style={{
      flex: 1,
      padding: "56px 40px",
      borderTop: `6px solid ${BLUE}`,
      backgroundColor: "#ffffff0d",
      borderRadius: 12,
    }}
  >
    <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, whiteSpace: "nowrap" }}>
      {big}
    </div>
    <div style={{ ...P, marginTop: 20, fontSize: 36 }}>{label}</div>
  </Reveal>
);

export const Numeros: React.FC = () => (
  <Scene>
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, ${BG} 100%)`,
      }}
    />
    <AbsoluteFill
      style={{ padding: "0 140px", justifyContent: "center", gap: 70 }}
    >
      <Kicker>Nossa trajetória</Kicker>
      <div style={{ display: "flex", gap: 36 }}>
        <Stat
          name="Anos"
          delay={6}
          big={<Counter prefix="+" value={16} delay={6} />}
          label="anos de experiência"
        />
        <Stat
          name="Projetos"
          delay={14}
          big={<Counter value={2415} delay={14} />}
          label="projetos concluídos"
        />
        <Stat
          name="Por ano"
          delay={22}
          big={<Counter prefix="+" value={100} delay={22} />}
          label="projetos por ano"
        />
        <Stat
          name="Resolvidos"
          delay={30}
          big={<Counter value={100} suffix="%" delay={30} />}
          label="casos resolvidos"
        />
      </div>
    </AbsoluteFill>
    <Corner />
  </Scene>
);

/* 4. Sede e frota -------------------------------------------------------- */
export const Estrutura: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <PhotoBg name="Frota munck" src="img/05.jpg" />
      <Content width={980}>
        <Kicker>Nossa estrutura</Kicker>
        <Reveal name="Título estrutura" delay={8} style={H1}>
          Frota, equipe e almoxarifado próprios.
        </Reveal>
        <Reveal name="Texto estrutura" delay={22} style={P}>
          Caminhões munck com cesto aéreo e veículos de apoio, a partir da
          nossa sede em <b style={{ color: "white" }}>Ibirubá/RS</b>.
        </Reveal>
        <Reveal
          name="Estados"
          delay={36}
          style={{ display: "flex", gap: 20, marginTop: 10 }}
        >
          {["RS", "SC", "PR"].map((uf, i) => (
            <div
              key={uf}
              style={{
                fontSize: 44,
                fontWeight: 800,
                padding: "14px 34px",
                borderRadius: 999,
                backgroundColor: BLUE,
                color: BG,
                scale: interpolate(frame, [40 + i * 6, 56 + i * 6], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.back(2)),
                }),
              }}
            >
              {uf}
            </div>
          ))}
          <div style={{ ...P, alignSelf: "center", marginLeft: 10 }}>
            atendemos todo o Sul
          </div>
        </Reveal>
      </Content>
      <Corner />
    </Scene>
  );
};

/* 5. Campo e cidade ------------------------------------------------------ */
export const CampoCidade: React.FC = () => (
  <Scene>
    <PhotoBg
      name="Painéis solares"
      src="img/10.jpg"
      shade={`linear-gradient(0deg, ${BG}f5 0%, ${BG}90 45%, ${BG}20 100%)`}
    />
    <AbsoluteFill
      style={{ padding: "120px 140px", justifyContent: "flex-end" }}
    >
      <Reveal
        name="Título campo e cidade"
        delay={6}
        style={{ ...H1, fontSize: 130 }}
      >
        Energia no <span style={{ color: BLUE }}>Campo</span>
        <br />e na <span style={{ color: BLUE }}>Cidade</span>
      </Reveal>
      <Reveal
        name="Texto campo e cidade"
        delay={22}
        style={{ ...P, maxWidth: 1300, marginTop: 30 }}
      >
        Do pivô de irrigação ao loteamento urbano, da residência à grande usina
        solar.
      </Reveal>
    </AbsoluteFill>
  </Scene>
);

/* 6. Quatro pilares ------------------------------------------------------ */
const pilares = [
  "Obras Fotovoltaicas",
  "Obras Elétricas",
  "Consultoria em Qualidade e Eficiência Energética",
  "O&M de Sistemas Elétricos e Fotovoltaicos",
];

export const Pilares: React.FC = () => (
  <Scene>
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${NAVY} 0%, ${BG} 100%)`,
      }}
    />
    <AbsoluteFill
      style={{ padding: "0 140px", justifyContent: "center", gap: 50 }}
    >
      <Kicker>Nossas soluções</Kicker>
      <Reveal name="Título pilares" delay={6} style={H1}>
        Quatro pilares, do projeto à operação.
      </Reveal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 10,
        }}
      >
        {pilares.map((p, i) => (
          <Reveal
            key={p}
            name={`Pilar ${i + 1}`}
            delay={18 + i * 8}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              padding: "34px 40px",
              backgroundColor: "#ffffff0d",
              borderLeft: `6px solid ${BLUE}`,
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 800, color: BLUE }}>
              0{i + 1}
            </div>
            <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.2 }}>
              {p}
            </div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </Scene>
);

/* 7. Cena de pilar (reutilizada 4x) -------------------------------------- */
export const Pilar: React.FC<{
  readonly numero: string;
  readonly titulo: string;
  readonly texto: string;
  readonly foto: string;
  readonly itens: string[];
  readonly position?: string;
}> = ({ numero, titulo, texto, foto, itens, position }) => (
  <Scene>
    <PhotoBg name={`Foto pilar ${numero}`} src={foto} position={position} />
    <AbsoluteFill
      style={{
        padding: "110px 140px",
        flexDirection: "row",
        alignItems: "center",
        gap: 80,
      }}
    >
      <div
        style={{ width: 900, display: "flex", flexDirection: "column", gap: 26 }}
      >
        <Kicker>{`Pilar ${numero}`}</Kicker>
        <Reveal name="Título pilar" delay={8} style={{ ...H1, fontSize: 84 }}>
          {titulo}
        </Reveal>
        <Reveal name="Texto pilar" delay={20} style={{ ...P, fontSize: 36 }}>
          {texto}
        </Reveal>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {itens.map((it, i) => (
          <Reveal
            key={it}
            name={`Item ${i + 1}`}
            delay={26 + i * 5}
            distance={0}
            style={{
              fontSize: 30,
              fontWeight: 600,
              padding: "14px 26px",
              backgroundColor: `${BG}d9`,
              borderLeft: `4px solid ${BLUE}`,
              borderRadius: 8,
            }}
          >
            {it}
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </Scene>
);

/* 8. Monitoramento ------------------------------------------------------- */
export const Monitoramento: React.FC = () => (
  <Scene>
    <PhotoBg
      name="Painel de monitoramento"
      src="img/41.jpg"
      shade={`linear-gradient(0deg, ${BG}fa 0%, ${BG}e8 60%, ${BG}b0 100%)`}
    />
    <AbsoluteFill
      style={{ padding: "0 140px", justifyContent: "center", gap: 60 }}
    >
      <Kicker>Monitoramento de usinas</Kicker>
      <Reveal name="Título monitoramento" delay={6} style={H1}>
        Agimos antes que a perda aconteça.
      </Reveal>
      <div style={{ display: "flex", gap: 36 }}>
        <Stat
          name="Usinas"
          delay={16}
          big={<Counter value={103} delay={16} />}
          label="usinas monitoradas"
        />
        <Stat
          name="Economia"
          delay={24}
          big={
            <Counter prefix="R$ " value={1.9} decimals={1} suffix=" mi" delay={24} />
          }
          label="de economia aos clientes"
        />
        <Stat
          name="CO2"
          delay={32}
          big={<Counter value={94} suffix=" t" delay={32} />}
          label="de CO₂ evitadas"
        />
      </div>
    </AbsoluteFill>
  </Scene>
);

/* 9. Como trabalhamos ---------------------------------------------------- */
const etapas = [
  ["Visita técnica", "Levantamento no local"],
  ["Projeto e orçamento", "Via plataforma OrçaRede"],
  ["Aprovação", "Junto à concessionária"],
  ["Execução", "Equipe e frota próprias"],
  ["Energização", "Acompanhamento até o fim"],
];

export const Metodo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, ${BG} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{ padding: "0 140px", justifyContent: "center", gap: 90 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <Kicker>Nosso método</Kicker>
          <Reveal name="Título método" delay={6} style={H1}>
            Um único responsável, do início ao fim.
          </Reveal>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 38,
              left: 38,
              height: 6,
              backgroundColor: BLUE,
              width: interpolate(frame, [20, 80], [0, 1560], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.inOut(Easing.cubic),
              }),
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {etapas.map(([t, s], i) => (
              <Reveal
                key={t}
                name={`Etapa ${i + 1}`}
                delay={20 + i * 14}
                style={{ width: 300 }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: 999,
                    backgroundColor: BLUE,
                    color: BG,
                    fontSize: 40,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ fontSize: 38, fontWeight: 700, marginTop: 30 }}>
                  {t}
                </div>
                <div style={{ ...P, fontSize: 30, marginTop: 8 }}>{s}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <Corner />
    </Scene>
  );
};

/* 10. OrçaRede ----------------------------------------------------------- */
export const OrcaRede: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, ${BG} 100%)`,
        }}
      />
      <Content width={700}>
        <Kicker>Diferencial</Kicker>
        <Reveal name="Título OrçaRede" delay={6} style={H1}>
          Plataforma <span style={{ color: BLUE }}>OrçaRede</span>
        </Reveal>
        <Reveal name="Texto OrçaRede" delay={18} style={{ ...P, fontSize: 36 }}>
          Orçamento, insumos e acompanhamento da obra em um só lugar, com
          projeto georreferenciado. Cada cliente recebe um link exclusivo para
          acompanhar sua obra em tempo real.
        </Reveal>
      </Content>
      <div
        style={{
          position: "absolute",
          right: -140,
          top: 170,
          width: 1040,
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [10, 45], ["160px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <Img
          name="Tela OrçaRede"
          src={staticFile("img/44.jpg")}
          style={{
            width: "100%",
            borderRadius: 18,
            boxShadow: "0 40px 100px #0009",
            border: `2px solid ${BLUE}55`,
          }}
        />
        <Img
          name="Tela orçamento"
          src={staticFile("img/45.jpg")}
          style={{
            position: "absolute",
            left: -40,
            top: 400,
            width: 600,
            borderRadius: 14,
            boxShadow: "0 30px 80px #000a",
            border: `2px solid ${BLUE}55`,
            translate: interpolate(frame, [25, 60], ["0px 120px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            }),
          }}
        />
      </div>
    </Scene>
  );
};

/* 11. Obra em destaque (reutilizada 3x) ---------------------------------- */
export const Obra: React.FC<{
  readonly numero: string;
  readonly cliente: string;
  readonly local: string;
  readonly descricao: string;
  readonly foto: string;
  readonly position?: string;
}> = ({ numero, cliente, local, descricao, foto, position }) => (
  <Scene>
    <PhotoBg
      name={`Foto obra ${numero}`}
      src={foto}
      position={position}
      from={1.0}
      to={1.12}
      shade={`linear-gradient(0deg, ${BG}f5 0%, ${BG}80 40%, ${BG}00 75%)`}
    />
    <AbsoluteFill
      style={{ padding: "110px 140px", justifyContent: "flex-end", gap: 18 }}
    >
      <Kicker>{`Obra em destaque · ${numero}`}</Kicker>
      <Reveal name="Cliente" delay={8} style={{ ...H1, fontSize: 96 }}>
        {cliente}
      </Reveal>
      <Reveal
        name="Local"
        delay={16}
        style={{ fontSize: 38, fontWeight: 600, color: BLUE }}
      >
        {local}
      </Reveal>
      <Reveal name="Descrição" delay={24} style={{ ...P, maxWidth: 1400 }}>
        {descricao}
      </Reveal>
    </AbsoluteFill>
  </Scene>
);

/* 12. Clientes ----------------------------------------------------------- */
const logos = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];

export const Clientes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene>
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, ${BG} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          padding: "0 140px",
          justifyContent: "center",
          gap: 50,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Kicker>Quem confia na ON</Kicker>
          <Reveal name="Título clientes" delay={6} style={{ ...H1, fontSize: 84 }}>
            Nossos clientes
          </Reveal>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 24,
          }}
        >
          {logos.map((n, i) => (
            <div
              key={n}
              style={{
                height: 190,
                backgroundColor: "white",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 22,
                opacity: interpolate(frame, [14 + i * 3, 26 + i * 3], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: interpolate(frame, [14 + i * 3, 30 + i * 3], [0.85, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                }),
              }}
            >
              <Img
                name={`Logo cliente ${i + 1}`}
                src={staticFile(`clientes/${n}.png`)}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 13. Encerramento ------------------------------------------------------- */
const contatos = [
  ["WhatsApp", "(54) 9 9976-6465"],
  ["Instagram", "@on_engenharia_"],
  ["Site", "onengenhariaeletrica.com.br"],
  ["E-mail", "contato@onengenhariaeletrica.com.br"],
];

export const Encerramento: React.FC = () => (
  <Scene>
    <PhotoBg
      name="Fundo encerramento"
      src="img/48.jpg"
      position="center 70%"
      shade={`linear-gradient(90deg, ${BG}f8 0%, ${BG}e6 55%, ${BG}90 100%)`}
    />
    <AbsoluteFill
      style={{
        padding: "0 140px",
        flexDirection: "row",
        alignItems: "center",
        gap: 110,
      }}
    >
      <Reveal name="Logo final" delay={4} distance={0}>
        <Img
          name="Logo ON final"
          src={staticFile("img/01.jpg")}
          style={{ width: 520, borderRadius: 24 }}
        />
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Reveal name="CTA" delay={10} style={{ ...H1, fontSize: 84 }}>
          Solicite seu orçamento
        </Reveal>
        {contatos.map(([k, v], i) => (
          <Reveal
            key={k}
            name={`Contato ${k}`}
            delay={22 + i * 6}
            style={{ display: "flex", gap: 24, alignItems: "baseline" }}
          >
            <span
              style={{
                width: 210,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: BLUE,
              }}
            >
              {k}
            </span>
            <span style={{ fontSize: 42, fontWeight: 600, color: LIGHT }}>
              {v}
            </span>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  </Scene>
);
