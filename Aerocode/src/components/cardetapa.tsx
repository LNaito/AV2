import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";

export enum StatusEtapa {
  PENDENTE = "Pendente",
  ANDAMENTO = "Andamento",
}

interface EtapaData {
  id: number;
  nome: string;
  prazo: string;
  status: StatusEtapa;
}

const CardEtapa: React.FC = () => {
  const [etapas, setEtapas] = useState<EtapaData[]>([]);
  const [novaEtapa, setNovaEtapa] = useState({
    id: 0,
    nome: "",
    prazo: "",
    status: StatusEtapa.PENDENTE,
  });
  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  // 🔹 Carrega do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("etapas");
    if (saved) setEtapas(JSON.parse(saved));
  }, []);

  // 🔹 Salva no localStorage
  useEffect(() => {
    localStorage.setItem("etapas", JSON.stringify(etapas));
  }, [etapas]);

  // 🔹 Cria ou edita etapa
  const salvarEtapa = () => {
    if (!novaEtapa.nome || !novaEtapa.prazo) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editando !== null) {
      setEtapas(etapas.map((e, i) => (i === editando ? novaEtapa : e)));
      setEditando(null);
    } else {
      setEtapas([...etapas, { ...novaEtapa, id: Date.now() }]);
    }

    setNovaEtapa({ id: 0, nome: "", prazo: "", status: StatusEtapa.PENDENTE });
    setFormAberto(false);
  };

  // 🔹 Editar etapa
  const editarEtapa = (index: number) => {
    setNovaEtapa(etapas[index]);
    setEditando(index);
    setFormAberto(true);
  };

  // 🔹 Excluir etapa
  const excluirEtapa = (index: number) => {
    setEtapas(etapas.filter((_, i) => i !== index));
  };

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Etapas</h2>
        <button className="botao-criar" onClick={() => setFormAberto(!formAberto)}>
          + Criar
        </button>
      </div>

      {formAberto && (
        <div className="etapa-form">
          <input
            type="text"
            placeholder="Nome"
            value={novaEtapa.nome}
            onChange={(e) => setNovaEtapa({ ...novaEtapa, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Prazo"
            value={novaEtapa.prazo}
            onChange={(e) => setNovaEtapa({ ...novaEtapa, prazo: e.target.value })}
          />
          <select
            value={novaEtapa.status}
            onChange={(e) => setNovaEtapa({ ...novaEtapa, status: e.target.value as StatusEtapa })}
          >
            <option value={StatusEtapa.PENDENTE}>Pendente</option>
            <option value={StatusEtapa.ANDAMENTO}>Em andamento</option>
          </select>
          <button className="botao-criar" onClick={salvarEtapa}>
            Salvar
          </button>
        </div>
      )}

      <div className="card-container">
        {etapas.length === 0 ? (
          <p className="sem-etapas">Nenhuma etapa cadastrada.</p>
        ) : (
          etapas.map((etapa, index) => (
            <div key={etapa.id} className="etapa-card">
              <h3>{etapa.nome}</h3>
              <p>Prazo: {etapa.prazo}</p>
              <p>Status: {etapa.status}</p>
              <div className="botoes-card">
                <button onClick={() => editarEtapa(index)}>Editar</button>
                <button onClick={() => excluirEtapa(index)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardEtapa;
