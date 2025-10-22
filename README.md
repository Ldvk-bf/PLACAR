
# 🥋 Karate Scoreboard (PLACAR)

> Sistema de placar digital para campeonatos de Karatê — desenvolvido por **Ludivik de Paula** em parceria com **Jorge**.
> O projeto já foi utilizado em **dois campeonatos internos da Unicamp** e em um **Campeonato Panamericano de Karatê**.

---

## 📖 Sobre o projeto

O **Karate Scoreboard** é um sistema de **placar digital completo** para campeonatos de Karatê, cobrindo as modalidades **Kumite (luta)**, **Kata (demonstração em individuais/equipe)** e **Kata Individual (Para finais)**.

O sistema foi projetado para funcionar **totalmente offline**, de forma **local** e **sincronizada em tempo real** entre as telas de operação e exibição pública.
Essa comunicação acontece via [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel), dispensando qualquer tipo de servidor ou internet — ideal para uso em eventos esportivos.

---

## ⚙️ Estrutura do sistema

```
📂 PLACAR/
│
├── 📄 index.html                  → Menu principal do sistema
│
├── 📁 Assets/                     → Recursos visuais e estáticos
│   └── jks.webp
│
├── 📁 css/                        → Estilos das diferentes telas
│   ├── style.css
│   ├── style_kata_individual.css
│   └── style_winner.css
│
├── 📁 js/                         → Scripts principais do sistema
│   ├── kata_operator.js
│   ├── kata_public.js
│   ├── kumite_operator.js
│   ├── kumite_public.js
│   ├── presenting_to_public.js
│   └── show_to_public.js
│
├── 📁 Operator/                   → Telas de controle do operador
│   ├── kata_operator.html
│   ├── kata_individual_operator.html
│   └── kumite_operator.html
│
├── 📁 Public/                     → Telas mostradas ao público (telão)
│   ├── kata.html
│   ├── kata_individual.html
│   ├── kumite.html
│   └── presenting_to_public.html
│
└── 📁 Winner/                     → Telas de exibição de vitória
    ├── vitoria-aka.html
    └── vitoria-ao.html
```

---

## 🧭 Como funciona

### 🏠 **index.html**

A tela inicial serve como **menu central**.
O operador seleciona qual modo deseja operar:

* 🟥 **Kumite (Luta)**
* 🟦 **Kata (Demonstração)**
* 🟩 **Kata Individual**

---

### 🧑‍💻 **Telas de Operador**

* **`kumite_operator.html`**
  Controla o placar, tempo e pontuação de Aka (vermelho) e Ao (azul).
  Sincroniza em tempo real com a tela pública `Public/kumite.html`.

* **`kata_operator.html`**
  Permite selecionar a categoria e o nome do Kata executado, atualizando automaticamente a tela `Public/kata.html`.

* **`kata_individual_operator.html`**
  Versão adaptada para competições individuais de Kata.

Cada tela de operador possui um botão **“Show to public”**, que envia o modo atual (Kumite, Kata ou Kata Individual) para a tela de exibição principal `Public/presenting_to_public.html`.

---

### 🖥️ **Tela pública (`presenting_to_public.html`)**

Essa é a tela utilizada no **telão ou projetor**.
Ela escuta comandos do operador e exibe automaticamente a modalidade ativa:

* 🟥 **Kumite:** placar e cronômetro
* 🟦 **Kata:** nomes e categorias dos katas feitos
* 🟩 **Kata Individual:** versão individual do mesmo formato

A troca é instantânea

---

## 🔄 Comunicação em tempo real

A sincronização ocorre através de **canais BroadcastChannel** no navegador:

| Canal              | Função principal                                            |
| ------------------ | ----------------------------------------------------------- |
| `placarKumite`     | Envia e atualiza pontuação e tempo do Kumite                |
| `placarKata`       | Envia o nome e categoria do Kata selecionado                |
| `modoApresentacao` | Controla qual tela o público está vendo (Kumite, Kata etc.) |

Cada módulo de operador envia mensagens para o canal correspondente, e as telas públicas se atualizam automaticamente.

---

## 💾 Persistência local

Mesmo após atualizar ou fechar a aba, o sistema **mantém o último estado salvo** (placar, tempo, nomes etc.) usando a **API `localStorage`**.

Assim, se o operador recarregar a página durante uma partida, o placar será restaurado e reenviado ao público automaticamente.

---

## 🧩 Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**
* **BroadcastChannel API**
* **LocalStorage API**

Sem dependências externas — tudo roda direto no navegador.
Compatível com: **Chrome**, **Edge**, **Firefox**, **Safari** e **Brave**.

---

## 🚀 Como usar

1. **Baixe ou clone o repositório:**

   ```bash
   git clone https://github.com/Ldvk-bf/PLACAR.git
   cd PLACAR
   ```

2. **Abra o arquivo `index.html`** no navegador (não precisa de servidor).

3. **Escolha o modo de operação:**

   * Kumite
   * Kata
   * Kata Individual

4. **Abra a tela pública:**
   `Public/presenting_to_public.html`
   (em outra aba, navegador, ou tela estendida)

5. O sistema se atualiza **instantaneamente**, **sem internet**, **sem servidor** ⚡

---

## 🏆 Eventos Participados

✅ **1 Campeonatos Internos da Unicamp**
✅ **1 Campeonatos Internos da Unicamp - JKS SP**
✅ **1 Campeonato Panamericano de Karatê - JKS**

Utilizado em contextos reais de competição, com excelente estabilidade e desempenho.

---

## 👥 Autores

* 🧑‍💻 **Ludivik de Paula** — Idealizador & Desenvolvedor principal
* 👨‍💼 **Jorge** — Idealizador & Desenvolvedor
* 👨‍💼 **Sensei Thiago Frosi** — Idealizador

---

## 📝 Licença

Este projeto é de uso livre para fins **educacionais e esportivos**.
Créditos obrigatórios ao utilizar publicamente:

> *PLACAR – desenvolvido por Ludivik de Paula & Jorge.*
