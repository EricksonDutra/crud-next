import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/firebase/db/ColecaoCliente";
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function UseClientes() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const { tabelaVisivel, exibirFormulario, exibirTabela } =
    useTabelaOuForm();

  const [cliente, setCliente] = useState<Cliente>(Cliente.empty());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      exibirTabela()
    });
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario()
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente);
    obterTodos();
  }

  function novoCliente() {
    setCliente(Cliente.empty());
    exibirFormulario()
  }
  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente);
    obterTodos();
  }

  return {
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente: clienteExcluido,
    selecionarCliente: clienteSelecionado,
    tabelaVisivel,
    exibirTabela
  };
}
