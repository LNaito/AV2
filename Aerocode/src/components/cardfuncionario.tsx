import React, { useEffect, useState } from "react";
import "../styles/CardSection.css";

export enum NivelPermissao {
  ADMIN = "Administrador",
  OPERADOR = "Operador",
  ENGENHEIRO = "Engenheiro",
}

interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;
}

const CardFuncionario: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => {
    try {
      const raw = localStorage.getItem("funcionarios");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [formAberto, setFormAberto] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Funcionario>({
    id: "",
    nome: "",
    telefone: "",
    endereco: "",
    usuario: "",
    senha: "",
    nivelPermissao: NivelPermissao.ENGENHEIRO,
  });

  // 🔹 Persistência automática no localStorage
  useEffect(() => {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  }, [funcionarios]);

  // 🔹 Abrir formulário novo
  const abrirNovo = () => {
    setForm({
      id: "",
      nome: "",
      telefone: "",
      endereco: "",
      usuario: "",
      senha: "",
      nivelPermissao: NivelPermissao.ENGENHEIRO,
    });
    setEditId(null);
    setFormAberto(true);
  };

  // 🔹 Salvar (novo ou edição)
  const salvar = () => {
    const camposVazios = Object.values(form).some((v) => v === "");
    if (camposVazios) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    if (editId !== null) {
      setFuncionarios(
        funcionarios.map((f) =>
          f.id === editId ? { ...form, id: editId } : f
        )
      );
    } else {
      setFuncionarios([...funcionarios, { ...form, id: Date.now().toString() }]);
    }

    setFormAberto(false);
    setEditId(null);
  };

  // 🔹 Editar
  const editar = (id: string) => {
    const f = funcionarios.find((x) => x.id === id);
    if (!f) return;
    setForm(f);
    setEditId(id);
    setFormAberto(true);
  };

  // 🔹 Excluir
  const excluir = (id: string) => {
    if (!window.confirm("Deseja realmente excluir este funcionário?")) return;
    setFuncionarios(funcionarios.filter((f) => f.id !== id));
  };

  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Funcionários</h2>
        <button className="botao-criar" onClick={abrirNovo}>
          + Criar
        </button>
      </div>

      {/* Formulário: aparece somente se clicado em Criar ou Editar */}
      {formAberto && (
        <div className="etapa-form">
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          />
          <input
            type="text"
            placeholder="Usuário"
            value={form.usuario}
            onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />
          <select
            value={form.nivelPermissao}
            onChange={(e) =>
              setForm({
                ...form,
                nivelPermissao: e.target.value as NivelPermissao,
              })
            }
          >
            <option value={NivelPermissao.ADMIN}>Administrador</option>
            <option value={NivelPermissao.OPERADOR}>Operador</option>
            <option value={NivelPermissao.ENGENHEIRO}>Engenheiro</option>
          </select>

          <button className="botao-criar" onClick={salvar}>
            {editId ? "Salvar alterações" : "Salvar"}
          </button>
        </div>
      )}

      {/* Cards */}
      <div className="card-container">
        {funcionarios.length === 0 ? (
          <p className="sem-etapas">Nenhum funcionário cadastrado.</p>
        ) : (
          funcionarios.map((f) => (
            <div key={f.id} className="etapa-card">
              <h3>{f.nome}</h3>
              <p>Telefone: {f.telefone}</p>
              <p>Endereço: {f.endereco}</p>
              <p>Usuário: {f.usuario}</p>
              <p>Permissão: {f.nivelPermissao}</p>
              <div className="botoes-card">
                <button onClick={() => editar(f.id)}>Editar</button>
                <button onClick={() => excluir(f.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CardFuncionario;
