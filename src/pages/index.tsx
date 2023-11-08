import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import { useState } from "react";

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.empty());
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bia", 22, "2"),
    new Cliente("Carlos", 45, "3"),
    new Cliente("Daniel", 23, "4"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(cliente.nome);
  }

  function novoCliente() {
    setCliente(Cliente.empty())
    setVisivel('form')
  }
  function salvarCliente(cliente: Cliente) {
    console.log(cliente);
    setVisivel('tabela')
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
