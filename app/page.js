"use client";

import { useState } from 'react';

const perguntas = [
  "주변에 사람들이 있음에도 불구하고 자주 외롭거나 단절된 느낌을 받습니다.",
  "친밀하고 의미 있는 관계를 맺거나 유지하는 데 어려움을 겪습니다.",
  "누가 함께 있든 상관없이 지속적으로 감정적인 공허함이나 버림받은 느낌이 듭니다.",
  "나의 깊은 생각, 감정 또는 고민을 나눌 사람이 아무도 없다고 느낍니다.",
  "지속적인 외로움으로 인해 나의 자존감과 자신감이 영향을 받습니다.",
  "최근 내 삶이 가치 없다고 느끼거나 나에게 나쁜 일이 일어나도 아무도 신경 쓰지 않을 것이라 생각한 적이 있습니다.", // FLAG
  "거절당하거나 어색할까봐 사회적 상황이나 상호작용 기회를 자주 피합니다.",
  "다른 사람들에게 감정적으로 나를 열거나 신뢰하는 데 상당한 어려움이 있습니다.",
  "외로움을 해소하기 위해 술, 약물 남용, 극단적 고립과 같은 좋지 않은 방법을 찾게 됩니다.",
  "지속적인 외로움의 감정으로 인해 나의 정신적, 신체적, 정서적 건강이 나빠지고 있습니다."
];

export default function TesteSolidao() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("적색");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("녹색");
      else if (soma <= 35) setResultado("황색");
      else setResultado("적색");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">외로움 테스트</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">결과: {resultado}</h2>
          <img
            src={
              resultado === "녹색"
                ? "/images/semaforo-verde.png"
                : resultado === "황색"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`신호등 표시: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "녹색" && (
            <p className="text-center">이 주제에 매우 잘 대처하고 있으며 정서적으로 안정된 상태입니다. 다른 사람들을 도울 수 있는 능력이 있습니다.</p>
          )}
          {resultado === "황색" && (
            <p className="text-center">해결이 필요한 정서적 어려움의 분명한 신호가 있습니다. 의지와 도움을 통해 극복할 수 있습니다.</p>
          )}
          {resultado === "적색" && (
            <p className="text-center">이 주제와 관련된 정서적 문제가 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
    
        </>
      )}
    </div>
  );
}
