import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/firebase/db/ColecaoCliente";
import { useEffect, useState } from "react";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.empty());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  // const clientes = [
  //   new Cliente("Ana", 34, "1"),
  //   new Cliente("Bia", 22, "2"),
  //   new Cliente("Carlos", 45, "3"),
  //   new Cliente("Daniel", 23, "4"),
  // ];

  useEffect(obterTodos, [])

  function obterTodos(){
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')
    } )
  
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Cliente) {
   await repo.excluir(cliente);
   obterTodos()
  }

  function novoCliente() {
    setCliente(Cliente.empty())
    setVisivel('form')
  }
  async function salvarCliente(cliente: Cliente) {
   await repo.salvar(cliente) 
    obterTodos()
  }


  return (
    <div
      className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-500 to-purple-500
    `}
    >
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end">
              <Botao
                onClick={novoCliente}
                cor="green"
                className="mb-4"
              >
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </div>
  );
}
