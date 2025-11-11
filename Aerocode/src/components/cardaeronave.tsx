import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";

interface Aeronave {
  id: number;
  modelo: string;
  tipoA: "Comercial" | "Militar";
  capacidade: number;
  alcance: number;
  etapas: string[];
  pecas: string[];
}

const CardAeronave: React.FC = () => {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(() => {
    const saved = localStorage.getItem("aeronaves");
    return saved ? JSON.parse(saved) : [];
  });

  const [novaAeronave, setNovaAeronave] = useState<Aeronave>({
    id: 0,
    modelo: "",
    tipoA: "Comercial",
    capacidade: 0,
    alcance: 0,
    etapas: [],
    pecas: [],
  });

  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("aeronaves", JSON.stringify(aeronaves));
  }, [aeronaves]);

  const salvarAeronave = () => {
    if (!novaAeronave.modelo || novaAeronave.capacidade <= 0 || novaAeronave.alcance <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (editando !== null) {
      setAeronaves(aeronaves.map((a, i) => (i === editando ? novaAeronave : a)));
      setEditando(null);
    } else {
      setAeronaves([...aeronaves, { ...novaAeronave, id: Date.now() }]);
    }

    setNovaAeronave({
      id: 0,
      modelo: "",
      tipoA: "Comercial",
      capacidade: 0,
      alcance: 0,
      etapas: [],
      pecas: [],
    });
    setFormAberto(false);
  };

  const editarAeronave = (index: number) => {
    setNovaAeronave(aeronaves[index]);
    setEditando(index);
    setFormAberto(true);
  };

  const excluirAeronave = (index: number) => {
    setAeronaves(aeronaves.filter((_, i) => i !== index));
  };

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Aeronaves</h2>
        <button onClick={() => setFormAberto(!formAberto)}>+ Criar</button>
      </div>

      {formAberto && (
        <div className="etapa-form">
          <input
            type="text"
            placeholder="Modelo"
            value={novaAeronave.modelo}
            onChange={(e) => setNovaAeronave({ ...novaAeronave, modelo: e.target.value })}
          />
          <select
            value={novaAeronave.tipoA}
            onChange={(e) => setNovaAeronave({ ...novaAeronave, tipoA: e.target.value as "Comercial" | "Militar" })}
          >
            <option value="Comercial">Comercial</option>
            <option value="Militar">Militar</option>
          </select>
          <input
            type="number"
            placeholder="Capacidade"
            value={novaAeronave.capacidade}
            onChange={(e) => setNovaAeronave({ ...novaAeronave, capacidade: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Alcance (km)"
            value={novaAeronave.alcance}
            onChange={(e) => setNovaAeronave({ ...novaAeronave, alcance: Number(e.target.value) })}
          />
          <button onClick={salvarAeronave}>Salvar</button>
        </div>
      )}

      <div className="card-container">
        {aeronaves.length === 0 ? (
          <p>Nenhuma aeronave cadastrada.</p>
        ) : (
          aeronaves.map((aeronave, index) => (
            <div key={aeronave.id} className="etapa-card">
              <h3>{aeronave.modelo}</h3>
              <p>Tipo: {aeronave.tipoA}</p>
              <p>Capacidade: {aeronave.capacidade}</p>
              <p>Alcance: {aeronave.alcance} km</p>
              <div className="botoes-card">
                <button onClick={() => editarAeronave(index)}>Editar</button>
                <button onClick={() => excluirAeronave(index)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardAeronave;
