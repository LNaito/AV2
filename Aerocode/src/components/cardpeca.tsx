import React, { useEffect, useState } from "react";
import "../styles/CardSection.css";

export enum TipoPeca {
  NACIONAL = "Nacional",
  IMPORTADA = "Importada",
}

export enum StatusPeca {
  EM_PRODUCAO = "Em produção",
  EM_TRANSPORTE = "Em transporte",
  PRONTA = "Pronta",
}

interface Peca {
  id: number;
  nomePeca: string;
  tipoP: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
}

const CardPeca: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>(() => {
    try {
      const raw = localStorage.getItem("pecas");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [formAberto, setFormAberto] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<Peca>({
    id: 0,
    nomePeca: "",
    tipoP: TipoPeca.NACIONAL,
    fornecedor: "",
    status: StatusPeca.EM_PRODUCAO,
  });

  // salvar no storage sempre que pecas mudar
  useEffect(() => {
    localStorage.setItem("pecas", JSON.stringify(pecas));
  }, [pecas]);

  const abrirNovo = () => {
    setForm({
      id: 0,
      nomePeca: "",
      tipoP: TipoPeca.NACIONAL,
      fornecedor: "",
      status: StatusPeca.EM_PRODUCAO,
    });
    setEditId(null);
    setFormAberto(true);
  };

  const salvar = () => {
    if (!form.nomePeca.trim() || !form.fornecedor.trim()) {
      alert("Preencha o nome e fornecedor da peça.");
      return;
    }

    if (editId !== null) {
      setPecas(pecas.map((p) => (p.id === editId ? { ...form, id: editId } : p)));
    } else {
      setPecas([...pecas, { ...form, id: Date.now() }]);
    }

    setForm({
      id: 0,
      nomePeca: "",
      tipoP: TipoPeca.NACIONAL,
      fornecedor: "",
      status: StatusPeca.EM_PRODUCAO,
    });
    setEditId(null);
    setFormAberto(false);
  };

  const editar = (id: number) => {
    const p = pecas.find((x) => x.id === id);
    if (!p) return;
    setForm(p);
    setEditId(id);
    setFormAberto(true);
  };

  const excluir = (id: number) => {
    if (!window.confirm("Confirma exclusão desta peça?")) return;
    setPecas(pecas.filter((p) => p.id !== id));
  };

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Peças</h2>
        <button className="botao-criar" onClick={abrirNovo}>
          + Criar
        </button>
      </div>

      {formAberto && (
        <div className="etapa-form">
          <input
            placeholder="Nome da peça"
            value={form.nomePeca}
            onChange={(e) => setForm({ ...form, nomePeca: e.target.value })}
          />
          <select
            value={form.tipoP}
            onChange={(e) => setForm({ ...form, tipoP: e.target.value as TipoPeca })}
          >
            <option value={TipoPeca.NACIONAL}>Nacional</option>
            <option value={TipoPeca.IMPORTADA}>Importada</option>
          </select>
          <input
            placeholder="Fornecedor"
            value={form.fornecedor}
            onChange={(e) => setForm({ ...form, fornecedor: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as StatusPeca })}
          >
            <option value={StatusPeca.EM_PRODUCAO}>Em produção</option>
            <option value={StatusPeca.EM_TRANSPORTE}>Em transporte</option>
            <option value={StatusPeca.PRONTA}>Pronta</option>
          </select>
          <button className="botao-criar" onClick={salvar}>
            {editId !== null ? "Salvar alterações" : "Salvar"}
          </button>
        </div>
      )}

      <div className="card-container">
        {pecas.length === 0 ? (
          <p className="sem-etapas">Nenhuma peça cadastrada.</p>
        ) : (
          pecas.map((p) => (
            <div key={p.id} className="etapa-card">
              <h3>{p.nomePeca}</h3>
              <p>Tipo: {p.tipoP}</p>
              <p>Fornecedor: {p.fornecedor}</p>
              <p>Status: {p.status}</p>
              <div className="botoes-card">
                <button onClick={() => editar(p.id)}>Editar</button>
                <button onClick={() => excluir(p.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardPeca;
