import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import {
  Abertura,
  CampoCidade,
  Clientes,
  Encerramento,
  Estrutura,
  Metodo,
  Monitoramento,
  Numeros,
  Obra,
  OrcaRede,
  Pilar,
  Pilares,
  QuemSomos,
} from "./Scenes";

export const TRANSITION = 15;
const t = linearTiming({ durationInFrames: TRANSITION });

export const Portfolio: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries name="Cenas">
      <TransitionSeries.Sequence name="Abertura" durationInFrames={5 * fps}>
        <Abertura />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Quem somos" durationInFrames={6 * fps}>
        <QuemSomos />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Números" durationInFrames={5.5 * fps}>
        <Numeros />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Estrutura" durationInFrames={6 * fps}>
        <Estrutura />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Campo e cidade" durationInFrames={5 * fps}>
        <CampoCidade />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Pilares" durationInFrames={6 * fps}>
        <Pilares />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Pilar 01" durationInFrames={6 * fps}>
        <Pilar
          numero="01"
          titulo="Obras Fotovoltaicas"
          texto="Sistemas completos para indústrias, comércios, residências e agronegócio, da análise de consumo à homologação."
          foto="img/18.jpg"
          itens={[
            "Sistemas On Grid",
            "Sistemas Off Grid",
            "Sistemas Híbridos",
            "Sistemas BESS",
            "Estações de Carregamento",
            "APE — Autoprodutor de Energia",
            "Retrofit Fotovoltaico",
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Pilar 02" durationInFrames={6 * fps}>
        <Pilar
          numero="02"
          titulo="Obras Elétricas"
          texto="Redes, subestações e instalações em média e baixa tensão, entregues energizadas, no prazo e nas normas."
          foto="img/21.jpg"
          itens={[
            "Redes de Distribuição Urbanas",
            "Redes de Distribuição Rurais",
            "Medições Agrupadas",
            "Subestações de Energia",
            "Medições em Média Tensão",
            "Instalações em Média e Baixa Tensão",
            "Retrofit Elétrico e Iluminação",
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Pilar 03" durationInFrames={6 * fps}>
        <Pilar
          numero="03"
          titulo="Consultoria em Eficiência Energética"
          texto="Medições, inspeções e análise técnica para reduzir custos e manter as instalações em conformidade."
          foto="img/33.jpg"
          itens={[
            "Auditoria Energética",
            "Consultorias e Laudos Técnicos",
            "Adequações a Normativas",
            "Gerenciamento de Faturas",
            "Migração para o Mercado Livre",
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Pilar 04" durationInFrames={6 * fps}>
        <Pilar
          numero="04"
          titulo="O&M Elétrico e Fotovoltaico"
          texto="Operação e manutenção para o máximo desempenho e o mínimo de paradas, de residências a grandes usinas."
          foto="img/15.jpg"
          itens={[
            "Planos de Manutenção",
            "Manutenção Preventiva e Corretiva",
            "Monitoramento de Grandezas",
            "Limpeza de Módulos",
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Monitoramento" durationInFrames={5.5 * fps}>
        <Monitoramento />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Método" durationInFrames={7 * fps}>
        <Metodo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="OrçaRede" durationInFrames={6.5 * fps}>
        <OrcaRede />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Obra 01" durationInFrames={5 * fps}>
        <Obra
          numero="01"
          cliente="Irick Wengrat"
          local="Santa Bárbara do Sul/RS · Irrigação"
          descricao="6 km de rede rural e 600 kVA instalados para alimentação do pivô de irrigação."
          foto="img/47.jpg"
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Obra 02" durationInFrames={5 * fps}>
        <Obra
          numero="02"
          cliente="Weber Cidades Inteligentes"
          local="Guaíba/RS · Loteamento urbano"
          descricao="Rede completa para loteamento de 450 lotes, com postes e iluminação."
          foto="img/48.jpg"
          position="center 60%"
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Obra 03" durationInFrames={5 * fps}>
        <Obra
          numero="03"
          cliente="Compacta Sul · Pedreira"
          local="Lagoa dos Três Cantos/RS · Medição MT · TR 500 kVA"
          descricao="Medição em média tensão e transformador de 500 kVA para a pedreira."
          foto="img/49.jpg"
          position="center 30%"
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Clientes" durationInFrames={5.5 * fps}>
        <Clientes />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Encerramento" durationInFrames={8 * fps}>
        <Encerramento />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
