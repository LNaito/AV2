import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";

type TipoPeca = "Nacional" | "Importada";
type StatusPeca = "Pendente" | "Andamento";

interface Peca {
  id: number;
  nomePeca: string;
  tipoP: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
}

const CardPeca: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [nova, setNova] = useState<Peca>({
    id: 0,
    nomePeca: "",
    tipoP: "Nacional",
    fornecedor: "",
    status: "Pendente",
  });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pecas");
    if (saved) setPecas(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pecas", JSON.stringify(pecas));
  }, [pecas]);

  const salvar = () => {
    if (!nova.nomePeca || !nova.fornecedor) return alert("Preencha todos os campos!");
    if (editando !== null) {
      setPecas(pecas.map((p, i) => (i === editando ? nova : p)));
      setEditando(null);
    } else {
      setPecas([...pecas, { ...nova, id: Date.now() }]);
    }
    setNova({ id: 0, nomePeca: "", tipoP: "Nacional", fornecedor: "", status: "Pendente" });
    setMostrarForm(false);
  };

  const editar = (i: number) => {
    setNova(pecas[i]);
    setEditando(i);
    setMostrarForm(true);
  };

  const deletar = (i: number) => setPecas(pecas.filter((_, idx) => idx !== i));

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Peças</h2>
        <button className="botao-criar" onClick={() => setMostrarForm(!mostrarForm)}>
          + Criar
        </button>
      </div>

      {mostrarForm && (
        <div className="etapa-form">
          <input placeholder="Nome da Peça" value={nova.nomePeca} onChange={(e) => setNova({ ...nova, nomePeca: e.target.value })} />
          <select value={nova.tipoP} onChange={(e) => setNova({ ...nova, tipoP: e.target.value as TipoPeca })}>
            <option value="Nacional">Nacional</option>
            <option value="Importada">Importada</option>
          </select>
          <input placeholder="Fornecedor" value={nova.fornecedor} onChange={(e) => setNova({ ...nova, fornecedor: e.target.value })} />
          <select value={nova.status} onChange={(e) => setNova({ ...nova, status: e.target.value as StatusPeca })}>
            <option value="Pendente">Pendente</option>
            <option value="Andamento">Andamento</option>
          </select>
          <button className="botao-criar" onClick={salvar}>
            Salvar
          </button>
        </div>
      )}

      <div className="card-container">
        {pecas.length === 0 ? (
          <p className="sem-etapas">Nenhuma peça cadastrada.</p>
        ) : (
          pecas.map((p, i) => (
            <div key={p.id} className="etapa-card">
              <h3>{p.nomePeca}</h3>
              <p>Tipo: {p.tipoP}</p>
              <p>Fornecedor: {p.fornecedor}</p>
              <p>Status: {p.status}</p>
              <div className="botoes-card">
                <button onClick={() => editar(i)}>Editar</button>
                <button onClick={() => deletar(i)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardPeca;
