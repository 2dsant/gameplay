import React from 'react';

function operacaoLenta() {
  let c;
  for (let i = 0; i < 100000000; i++) {
    c = i
  }
  return c;
}

const App = () => {
  const [contar, setContar] = React.useState(0);

  const t1 = performance.now();
  const valor = React.useMemo(() => operacaoLenta(), []);
  console.log(valor);
  console.log(performance.now() - t1);

  return <button onClick={() => setContar(contar + 1)}>{contar}</button>;

};