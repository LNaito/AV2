import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";

interface Aeronave {
  id: number;
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
}

const CardAeronave: React.FC = () => {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [nova, setNova] = useState<Aeronave>({
    id: 0,
    codigo: "",
    modelo: "",
    tipo: "",
    capacidade: 0,
    alcance: 0,
  });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("aeronaves");
    if (saved) setAeronaves(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("aeronaves", JSON.stringify(aeronaves));
  }, [aeronaves]);

  const salvar = () => {
    if (!nova.codigo || !nova.modelo || !nova.tipo) return alert("Preencha todos os campos!");
    if (editando !== null) {
      setAeronaves(aeronaves.map((a, i) => (i === editando ? nova : a)));
      setEditando(null);
    } else {
      setAeronaves([...aeronaves, { ...nova, id: Date.now() }]);
    }
    setNova({ id: 0, codigo: "", modelo: "", tipo: "", capacidade: 0, alcance: 0 });
    setMostrarForm(false);
  };

  const editar = (i: number) => {
    setNova(aeronaves[i]);
    setEditando(i);
    setMostrarForm(true);
  };

  const deletar = (i: number) => setAeronaves(aeronaves.filter((_, idx) => idx !== i));

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Aeronaves</h2>
        <button className="botao-criar" onClick={() => setMostrarForm(!mostrarForm)}>
          + Criar
        </button>
      </div>

      {mostrarForm && (
        <div className="etapa-form">
          <input placeholder="Código" value={nova.codigo} onChange={(e) => setNova({ ...nova, codigo: e.target.value })} />
          <input placeholder="Modelo" value={nova.modelo} onChange={(e) => setNova({ ...nova, modelo: e.target.value })} />
          <input placeholder="Tipo" value={nova.tipo} onChange={(e) => setNova({ ...nova, tipo: e.target.value })} />
          <input type="number" placeholder="Capacidade" value={nova.capacidade} onChange={(e) => setNova({ ...nova, capacidade: Number(e.target.value) })} />
          <input type="number" placeholder="Alcance" value={nova.alcance} onChange={(e) => setNova({ ...nova, alcance: Number(e.target.value) })} />
          <button className="botao-criar" onClick={salvar}>
            Salvar
          </button>
        </div>
      )}

      <div className="card-container">
        {aeronaves.length === 0 ? (
          <p className="sem-etapas">Nenhuma aeronave cadastrada.</p>
        ) : (
          aeronaves.map((a, i) => (
            <div key={a.id} className="etapa-card">
              <h3>{a.modelo}</h3>
              <p>Código: {a.codigo}</p>
              <p>Tipo: {a.tipo}</p>
              <p>Capacidade: {a.capacidade}</p>
              <p>Alcance: {a.alcance} km</p>
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

export default CardAeronave;
