import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";
import { TipoAeronave } from "../types/enum";
import { TipoPeca } from "../types/enum";
import { StatusPeca } from "../types/enum";

// ===== Tipos base =====
interface Etapa {
  nome: string;
  prazo: string;
  status: string;
}

interface Peca {
  nomePeca: string;
  tipoP: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
}

interface Aeronave {
  id: number;
  modelo: string;
  tipoA: TipoAeronave;
  capacidade: number;
  alcance: number;
  etapas: Etapa[];
  pecas: Peca[];
}

// ===== Relatório =====
interface Relatorio {
  id: number;
  aeronave: Aeronave;
  nomeCliente: string;
  dataEntrega: string;
  conteudo: string;
}

const CardRelatorio: React.FC = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [novoRelatorio, setNovoRelatorio] = useState({
    aeronaveId: "",
    nomeCliente: "",
    dataEntrega: "",
  });
  const [formAberto, setFormAberto] = useState(false);

  // ====== CARREGA AERONAVES ======
  useEffect(() => {
    const storedAeronaves = localStorage.getItem("aeronaves");
    if (storedAeronaves) setAeronaves(JSON.parse(storedAeronaves));
  }, []);

  // ====== SALVA RELATÓRIOS ======
  useEffect(() => {
    localStorage.setItem("relatorios", JSON.stringify(relatorios));
  }, [relatorios]);

  useEffect(() => {
    const storedRel = localStorage.getItem("relatorios");
    if (storedRel) setRelatorios(JSON.parse(storedRel));
  }, []);

  // ====== GERA CONTEÚDO DO RELATÓRIO ======
  const gerarRelatorioTexto = (aeronave: Aeronave, nomeCliente: string, dataEntrega: string) => {
    let texto = `=== Informações da Aeronave ${aeronave.modelo} ===\n`;
    texto += `Tipo: ${aeronave.tipoA}\n`;
    texto += `Capacidade: ${aeronave.capacidade} passageiros\n`;
    texto += `Alcance: ${aeronave.alcance} km\n\n`;

    texto += `== Sobre a Entrega ==\n`;
    texto += `Cliente: ${nomeCliente}\n`;
    texto += `Data de Entrega: ${new Date(dataEntrega).toLocaleDateString()}\n\n`;

    texto += `== Peças utilizadas ==\n`;
    if (aeronave.pecas.length > 0) {
      aeronave.pecas.forEach((p, i) => {
        texto += `${i + 1}. ${p.nomePeca} (${p.tipoP}) - ${p.fornecedor} [${p.status}]\n`;
      });
    } else {
      texto += "Nenhuma peça associada.\n";
    }

    texto += `\n== Etapas ==\n`;
    if (aeronave.etapas.length > 0) {
      aeronave.etapas.forEach((e, i) => {
        texto += `${i + 1}. ${e.nome} - Prazo: ${e.prazo} (${e.status})\n`;
      });
    } else {
      texto += "Nenhuma etapa associada.\n";
    }

    return texto;
  };

  // ====== CRIAR RELATÓRIO ======
  const criarRelatorio = () => {
    if (!novoRelatorio.aeronaveId || !novoRelatorio.nomeCliente || !novoRelatorio.dataEntrega) {
      alert("Preencha todos os campos!");
      return;
    }

    const aeronaveSelecionada = aeronaves.find((a) => a.id === Number(novoRelatorio.aeronaveId));
    if (!aeronaveSelecionada) {
      alert("Aeronave inválida!");
      return;
    }

    const conteudo = gerarRelatorioTexto(
      aeronaveSelecionada,
      novoRelatorio.nomeCliente,
      novoRelatorio.dataEntrega
    );

    const novo = {
      id: Date.now(),
      aeronave: aeronaveSelecionada,
      nomeCliente: novoRelatorio.nomeCliente,
      dataEntrega: novoRelatorio.dataEntrega,
      conteudo,
    };

    setRelatorios([...relatorios, novo]);
    setNovoRelatorio({ aeronaveId: "", nomeCliente: "", dataEntrega: "" });
    setFormAberto(false);
  };

  // ====== BAIXAR RELATÓRIO ======
  const baixarRelatorio = (relatorio: Relatorio) => {
    const blob = new Blob([relatorio.conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${relatorio.aeronave.modelo}_${relatorio.id}.txt`;
    link.click();
  };

  // ====== EXCLUIR RELATÓRIO ======
  const excluirRelatorio = (id: number) => {
    setRelatorios(relatorios.filter((r) => r.id !== id));
  };

  // ====== RENDER ======
  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Relatórios de Aeronaves</h2>
        <button className="botao-criar" onClick={() => setFormAberto(!formAberto)}>
          + Criar
        </button>
      </div>

      {formAberto && (
        <div className="etapa-form">
          <select
            value={novoRelatorio.aeronaveId}
            onChange={(e) => setNovoRelatorio({ ...novoRelatorio, aeronaveId: e.target.value })}
          >
            <option value="">Selecione uma aeronave</option>
            {aeronaves.map((a) => (
              <option key={a.id} value={a.id}>
                {a.modelo} ({a.tipoA})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nome do cliente"
            value={novoRelatorio.nomeCliente}
            onChange={(e) => setNovoRelatorio({ ...novoRelatorio, nomeCliente: e.target.value })}
          />

          <input
            type="date"
            value={novoRelatorio.dataEntrega}
            onChange={(e) => setNovoRelatorio({ ...novoRelatorio, dataEntrega: e.target.value })}
          />

          <button className="botao-criar" onClick={criarRelatorio}>
            Gerar Relatório
          </button>
        </div>
      )}

      <div className="card-container">
        {relatorios.length === 0 ? (
          <p className="sem-etapas">Nenhum relatório criado.</p>
        ) : (
          relatorios.map((r) => (
            <div key={r.id} className="etapa-card">
              <h3>{r.aeronave.modelo}</h3>
              <p><b>Cliente:</b> {r.nomeCliente}</p>
              <p><b>Entrega:</b> {new Date(r.dataEntrega).toLocaleDateString()}</p>
              <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{r.conteudo}</pre>

              <div className="botoes-card">
                <button onClick={() => baixarRelatorio(r)}>Baixar TXT</button>
                <button onClick={() => excluirRelatorio(r.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardRelatorio;
