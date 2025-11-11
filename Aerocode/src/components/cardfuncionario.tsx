import React, { useState, useEffect } from "react";
import "../styles/CardSection.css";

export enum NivelPermissao {
  ADMIN = "Administrador",
  GERENTE = "Gerente",
  FUNCIONARIO = "Funcionário",
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
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);

  const [formData, setFormData] = useState<Funcionario>({
    id: "",
    nome: "",
    telefone: "",
    endereco: "",
    usuario: "",
    senha: "",
    nivelPermissao: NivelPermissao.FUNCIONARIO,
  });

  // ===== Carrega do localStorage =====
  useEffect(() => {
    const stored = localStorage.getItem("funcionarios");
    if (stored) setFuncionarios(JSON.parse(stored));
  }, []);

  // ===== Salva no localStorage =====
  useEffect(() => {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  }, [funcionarios]);

  // ===== Criar ou Editar =====
  const salvarFuncionario = () => {
    if (
      !formData.nome ||
      !formData.telefone ||
      !formData.usuario ||
      !formData.senha
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (editando) {
      // Edição
      const atualizados = funcionarios.map((f) =>
        f.id === editando ? { ...formData, id: editando } : f
      );
      setFuncionarios(atualizados);
      setEditando(null);
    } else {
      // Novo cadastro
      const novo: Funcionario = { ...formData, id: Date.now().toString() };
      setFuncionarios([...funcionarios, novo]);
    }

    setFormData({
      id: "",
      nome: "",
      telefone: "",
      endereco: "",
      usuario: "",
      senha: "",
      nivelPermissao: NivelPermissao.FUNCIONARIO,
    });
    setFormAberto(false);
  };

  // ===== Editar =====
  const editarFuncionario = (id: string) => {
    const f = funcionarios.find((f) => f.id === id);
    if (!f) return;
    setFormData(f);
    setEditando(id);
    setFormAberto(true);
  };

  // ===== Excluir =====
  const excluirFuncionario = (id: string) => {
    if (window.confirm("Deseja realmente excluir este funcionário?")) {
      setFuncionarios(funcionarios.filter((f) => f.id !== id));
    }
  };

  // ===== Render =====
  return (
    <section className="card-section">
      <div className="card-header">
        <h2>Gerenciar Funcionários</h2>
        <button className="botao-criar" onClick={() => setFormAberto(!formAberto)}>
          {formAberto ? "Cancelar" : "+ Criar"}
        </button>
      </div>

      {formAberto && (
        <div className="etapa-form">
          <input
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) =>
              setFormData({ ...formData, telefone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={(e) =>
              setFormData({ ...formData, endereco: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Usuário"
            value={formData.usuario}
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Senha"
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
          />
          <select
            value={formData.nivelPermissao}
            onChange={(e) =>
              setFormData({
                ...formData,
                nivelPermissao: e.target.value as NivelPermissao,
              })
            }
          >
            <option value={NivelPermissao.ADMIN}>Administrador</option>
            <option value={NivelPermissao.GERENTE}>Gerente</option>
            <option value={NivelPermissao.FUNCIONARIO}>Funcionário</option>
          </select>

          <button className="botao-criar" onClick={salvarFuncionario}>
            {editando ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </div>
      )}

      {/* ===== Tabela ===== */}
      <div className="card-container" style={{ overflowX: "auto" }}>
        {funcionarios.length === 0 ? (
          <p className="sem-etapas">Nenhum funcionário cadastrado.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={{ padding: "0.8rem" }}>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Usuário</th>
                <th>Permissão</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id}>
                  <td style={{ padding: "0.8rem" }}>{f.nome}</td>
                  <td>{f.telefone}</td>
                  <td>{f.endereco}</td>
                  <td>{f.usuario}</td>
                  <td>{f.nivelPermissao}</td>
                  <td>
                    <div className="botoes-card" style={{ gap: "0.4rem" }}>
                      <button onClick={() => editarFuncionario(f.id)}>
                        Editar
                      </button>
                      <button onClick={() => excluirFuncionario(f.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default CardFuncionario;
