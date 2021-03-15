import { Container } from "./styles";

export function TransactionsTable() {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de websites</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>25/01/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdrow">-R$1.100</td>
            <td>Casa</td>
            <td>19/01/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}