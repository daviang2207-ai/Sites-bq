/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, BlogCategory } from '../types';
import pedroMascotImg from '../assets/images/pedro_bq_mascot_1784731525933.jpg';

export const blogCategories: BlogCategory[] = [
  { id: 'all', name: 'Todos os Artigos', slug: 'todos', iconName: 'Layers' },
  { id: 'tips', name: 'Dicas & Educação', slug: 'dicas-de-seguros', description: 'Conceitos fundamentais e guias práticos para escolher com segurança', iconName: 'HelpCircle' },
  { id: 'auto', name: 'Seguro Auto', slug: 'seguro-auto', description: 'Proteção, coberturas, assistências e orientações para motoristas', iconName: 'Car' },
  { id: 'life', name: 'Seguro de Vida', slug: 'seguro-de-vida', description: 'Proteção financeira pessoal, familiar e sucessão patrimonial', iconName: 'Heart' },
  { id: 'enterprise', name: 'Seguro Empresarial', slug: 'seguro-empresarial', description: 'Gestão de riscos patrimoniais, operacionais e responsabilidade civil', iconName: 'Building2' },
  { id: 'cargo', name: 'Seguro de Carga', slug: 'seguro-de-carga', description: 'Transporte rodoviário, embarcadores e responsabilidade civil do transportador', iconName: 'Truck' },
  { id: 'home', name: 'Seguro Residencial', slug: 'seguro-residencial', description: 'Segurança contra danos estruturais, elétricos e serviços emergenciais', iconName: 'Home' },
  { id: 'travel', name: 'Seguro Viagem', slug: 'seguro-viagem', description: 'Assistência médica, extravio de bagagem e emergências em viagens', iconName: 'Plane' },
  { id: 'equipment', name: 'Equipamentos & Instrumentos', slug: 'equipamentos-instrumentos', description: 'Celulares, notebooks, câmeras e instrumentos musicais', iconName: 'Laptop' }
];

export const defaultBlogPosts: BlogPost[] = [
  // 1. ARTIGO: POR QUE CONTRATAR UM SEGURO?
  {
    id: 'post-por-que-contratar-um-seguro',
    slug: 'por-que-contratar-um-seguro',
    title: 'Por que contratar um seguro? Entenda como funciona a proteção financeira',
    summary: 'Compreenda o conceito de seguro, como funciona a transferência de riscos e os pontos essenciais que a SUSEP orienta avaliar antes de escolher uma apólice.',
    category: 'Dicas & Educação',
    categoryId: 'tips',
    featured: true,
    popular: true,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Consultoria de seguros e planejamento financeiro com segurança e transparência',
    tags: ['Educação Financeira', 'SUSEP', 'Como Escolher Seguro', 'Coberturas', 'Franquia'],
    relatedInsuranceId: 'auto',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Com mais de 38 anos de atuação no mercado securitário e registro SUSEP nº 232150826, nosso time produz conteúdos educativos pautados nas normas regulatórias oficiais.'
    },
    sources: [
      {
        title: 'SUSEP — Como escolher um seguro: Informações Importantes',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/informacoes-importantes'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, carências, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros autorizado pela SUSEP.',
    seo: {
      title: 'Por que contratar um seguro? Guia Completo | BQ Seguros',
      description: 'Entenda o que é um seguro, como funciona a proteção financeira contra imprevistos e o que a SUSEP recomenda avaliar antes de contratar.',
      keywords: ['por que contratar seguro', 'como funciona seguro', 'SUSEP como escolher seguro', 'cobertura franquia carencia']
    },
    content: `
No dia a dia, imprevistos de saúde, acidentes de trânsito, danos ao patrimônio ou incidentes em empresas podem gerar despesas financeiras elevadas e inesperadas. É exatamente para lidar com essas situações que existe o **seguro**.

Mas o que é um seguro na prática, como ele funciona e por que pessoas e empresas com perfis diferentes precisam de soluções distintas?

Neste guia educativo, explicamos os conceitos fundamentais com base nas diretrizes oficiais da **Superintendência de Seguros Privados (SUSEP)**.

---

### O que é um seguro e por que ele existe?

Em termos simples, o seguro é um **contrato formal** no qual você transfere para uma seguradora autorizada a responsabilidade financeira por determinados riscos imprevistos que possam acontecer com você, sua família, seu veículo ou seu patrimônio.

Ao contratar o seguro, o segurado paga um valor chamado **prêmio**. Em contrapartida, caso ocorra um evento previsto no contrato (o **sinistro**), a seguradora paga uma **indenização** ou presta a assistência combinada, conforme os limites e condições estabelecidos na apólice.

> **O objetivo principal do seguro não é gerar lucro, mas sim garantir estabilidade financeira e previsibilidade orçamentária diante de imprevistos.**

---

### Por que as necessidades de seguro variam para cada pessoa?

Não existe uma apólice única que sirva para todas as pessoas ou empresas. Cada segurado possui realidades e prioridades diferentes:

* **Quem utiliza o carro diariamente para trabalhar** costuma priorizar coberturas contra colisão, roubo e danos causados a terceiros.
* **Quem é o principal provedor financeiro de uma família** frequentemente busca proteção em seguro de vida e invalidez para resguardar dependentes.
* **Proprietários de imóveis ou comerciantes** focam na proteção contra incêndio, danos elétricos e desastres naturais.

Por isso, a contratação consciente começa com a identificação clara dos riscos que você deseja proteger.

---

### O que você deve avaliar ao escolher um seguro (Orientações da SUSEP)

A SUSEP orienta que todo consumidor deve analisar cuidadosamente os seguintes pontos antes de assinar qualquer proposta:

#### 1. Coberturas contratadas
A cobertura define exatamente quais situações estão protegidas. Cada seguro possui uma **cobertura básica** (obrigatória do produto) e pode oferecer **coberturas adicionais** opcionais que podem ser contratadas conforme a sua necessidade.

#### 2. Riscos excluídos
Toda apólice de seguro possui uma lista de eventos que **não são cobertos** (chamados de riscos excluídos). Conhecer os riscos excluídos antes da contratação é essencial para não ter surpresas na hora de um sinistro.

#### 3. Franquia (quando aplicável)
Em seguros patrimoniais e de automóveis, a franquia é a participação financeira obrigatória do segurado em casos de sinistro parcial (por exemplo, conserto do próprio veículo após uma colisão). Em casos de perda total ou roubo sem recuperação, geralmente não há cobrança de franquia, dependendo das condições do contrato.

#### 4. Prazos de Carência (quando aplicáveis)
Em determinadas modalidades de seguro (como certos seguros de pessoas ou coberturas específicas), pode haver um período inicial no qual o segurado ainda não tem direito à indenização para determinados eventos.

#### 5. Limite Máximo de Garantia (LMG)
É o valor financeiro máximo que a seguradora indenizará para cada cobertura contratada.

#### 6. Condições Gerais e Particulares
Sempre leia com atenção a proposta e as condições contratuais. Verifique se todas as informações prestadas no formulário de contratação estão corretas, pois declarações imprecisas podem comprometer a cobertura.

---

### Em resumo

* Seguro é um mecanismo de **proteção financeira e transferência de risco**.
* A contratação não deve ser motivada por medo, mas sim por **planejamento e análise de risco consciente**.
* Avalie sempre: **coberturas, riscos excluídos, franquias, limites de indenização e condições contratuais**.
* Certifique-se sempre de que a corretora e a seguradora são devidamente autorizadas e registradas na **SUSEP**.

---

### Perguntas frequentes

**O seguro é obrigatório para todas as pessoas?**  
Não. No Brasil, a grande maioria dos seguros para pessoas físicas (como seguro auto, seguro residencial e seguro de vida) é facultativa, contratada por livre escolha para proteção do patrimônio e da família. Existem apenas modalidades específicas com obrigatoriedade legal em determinados setores, como no transporte de cargas.

**Posso mudar de seguradora na renovação?**  
Sim. Na época da renovação da sua apólice, você pode cotar com diferentes seguradoras autorizadas pela SUSEP para comparar coberturas e preços antes de decidir renovar.
`
  },

  // 2. ARTIGO: TIPOS DE SEGUROS DA BQ SEGUROS
  {
    id: 'post-tipos-de-seguros-bq',
    slug: 'tipos-de-seguros-que-voce-encontra-na-bq-seguros',
    title: 'Tipos de seguros que você encontra na BQ Seguros',
    summary: 'Conheça as modalidades de seguros comercializadas pela BQ Seguros, organizadas de acordo com as necessidades reais de proteção para você, sua família e sua empresa.',
    category: 'Dicas & Educação',
    categoryId: 'tips',
    featured: false,
    popular: true,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Diferentes formas de proteção patrimonial e familiar',
    tags: ['Produtos BQ', 'Seguros', 'Auto', 'Residencial', 'Vida', 'Empresarial', 'Carga'],
    relatedInsuranceId: 'auto',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Corretora de seguros atuante desde 1988, devidamente registrada na SUSEP sob o nº 232150826.'
    },
    sources: [
      {
        title: 'SUSEP — Como escolher um seguro: Informações Importantes',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/informacoes-importantes'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros.',
    seo: {
      title: 'Tipos de Seguros Comercializados | BQ Seguros',
      description: 'Confira os principais tipos de seguros oferecidos pela BQ Seguros: Auto, Residencial, Vida, Empresarial, Viagem, Carga e Equipamentos.',
      keywords: ['tipos de seguros', 'seguros BQ', 'seguro auto vida residencial empresarial']
    },
    content: `
A escolha do seguro ideal começa pela identificação exata daquilo que você deseja proteger. Na **BQ Seguros**, trabalhamos em parceria com as principais seguradoras autorizadas pela SUSEP para oferecer soluções completas e transparentes.

Abaixo, apresentamos as principais modalidades de seguros que comercializamos, organizadas de acordo com as necessidades práticas de cada cliente:

---

### 1. Proteção para seu veículo
* **Seguro Automóvel:** Coberturas para colisão, roubo, furto, incêndio, desastres naturais, danos a terceiros (RCF-V) e serviços de assistência 24 horas (como guincho e chaveiro, conforme apólice).
* **Seguro para Caminhões e Utilitários:** Proteção desenvolvida para as particularidades de veículos de carga e transporte.

### 2. Proteção para sua residência
* **Seguro Residencial:** Cobertura para casas e apartamentos (próprios ou alugados) contra incêndio, queda de raio, explosão, danos elétricos, vendavais e roubo de bens, além de assistências emergenciais como encanador e eletricista.

### 3. Proteção para você e sua família
* **Seguro de Vida e Acidentes Pessoais:** Amparo financeiro para o segurado em vida (em casos de invalidez ou doenças graves, conforme apólice) e indenização aos beneficiários em caso de falecimento.
* **Planos de Saúde e Odontológico:** Acesso a consultas, exames, internações e procedimentos médicos e odontológicos conforme as condições do plano contratado.

### 4. Proteção para sua empresa
* **Seguro Empresarial:** Proteção patrimonial para estabelecimentos comerciais, escritórios, consultórios e indústrias contra incêndio, danos elétricos, vendavais e interrupção de atividades.
* **Responsabilidade Civil Geral e Operações:** Resguardo financeiro contra eventuais prejuízos involuntários causados a terceiros durante a atividade empresarial.

### 5. Proteção para sua viagem
* **Seguro Viagem Nacional e Internacional:** Assistência médica e odontológica de emergência, cobertura para extravio de bagagem e despesas de repatriação em viagens de turismo ou trabalho.

### 6. Proteção para o transporte de cargas
* **Seguro de Transporte de Cargas e Responsabilidade Civil do Transportador:** Soluções específicas para embarcadores e transportadores rodoviários, em total conformidade com as normas vigentes da SUSEP e da ANTT.

### 7. Proteção para equipamentos e instrumentos
* **Equipamentos Portáteis:** Proteção para notebooks, smartphones, câmeras fotográficas e instrumentos musicais profissionais contra danos físicos acidentais, roubo e furto qualificado.

---

### Em resumo

* A BQ Seguros comercializa soluções para diferentes momentos de vida e atividades empresariais.
* Todas as coberturas e valores são personalizados com base na necessidade do cliente e nas condições gerais das seguradoras autorizadas.
`
  },

  // 3. ARTIGO: SEGURO DE VIDA INDIVIDUAL X COLETIVO
  {
    id: 'post-vida-individual-x-coletivo',
    slug: 'seguro-de-vida-individual-x-coletivo-qual-e-a-diferenca',
    title: 'Seguro de Vida Individual x Coletivo: qual é a diferença?',
    summary: 'Entenda a distinção técnica entre a contratação individual e o seguro de pessoas em grupo (coletivo), como funciona o papel do estipulante e o que a SUSEP determina.',
    category: 'Seguro de Vida',
    categoryId: 'life',
    featured: false,
    popular: true,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Família reunida com tranquilidade e bem-estar',
    tags: ['Seguro de Vida', 'SUSEP', 'Vida Individual', 'Vida Coletivo', 'Estipulante', 'Beneficiários'],
    relatedInsuranceId: 'life',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Consultoria com mais de 38 anos de atuação e registro SUSEP nº 232150826.'
    },
    sources: [
      {
        title: 'SUSEP — Seguro de Pessoas',
        url: 'https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-de-pessoas'
      },
      {
        title: 'SUSEP — Seguro de Vida e Acidentes Pessoais',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-vida-e-acidentes-pessoais'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros.',
    seo: {
      title: 'Seguro de Vida Individual x Coletivo: Qual a Diferença? | BQ Seguros',
      description: 'Descubra a diferença técnica entre seguro de vida individual e seguro coletivo (em grupo), o papel do estipulante e regras oficiais da SUSEP.',
      keywords: ['seguro de vida individual x coletivo', 'diferenca seguro vida individual em grupo', 'SUSEP seguro de pessoas', 'estipulante']
    },
    content: `
Ao pesquisar sobre proteção financeira pessoal e familiar, muitas pessoas se deparam com termos como **Seguro de Vida Individual** e **Seguro de Vida Coletivo** (ou em grupo).

Ambos pertencem à categoria de **Seguros de Pessoas** regulamentada pela SUSEP, mas existem diferenças estruturais importantes sobre como eles são contratados e mantidos.

---

### O que é o Seguro de Vida Individual?

No **Seguro de Vida Individual**, a contratação é realizada diretamente entre a pessoa física (o segurado) e a sociedade seguradora, com a intermediação de um corretor de seguros.

* **Personalização:** O próprio segurado escolhe o valor do capital segurado, as coberturas que deseja incluir e os beneficiários de sua preferência.
* **Autonomia na manutenção:** A apólice permanece ativa enquanto o segurado mantiver os pagamentos e desejar continuar com a proteção, independentemente de onde ele trabalhe ou de vínculos com entidades.

---

### O que é o Seguro de Vida Coletivo?

No **Seguro de Vida Coletivo**, a apólice é contratada por uma pessoa jurídica ou entidade intermediária — denominada legalmente pela SUSEP como **estipulante** (por exemplo, uma empresa empregadora, um sindicato, associação ou clube) — em benefício de um determinado grupo de pessoas vinculadas a ela.

* **Regras do grupo:** As coberturas, capitais segurados e condições gerais são negociadas e definidas pelo estipulante com a seguradora para todo o grupo.
* **Vínculo:** A permanência no seguro coletivo normalmente está atrelada à manutenção do vínculo com o estipulante (por exemplo, ser funcionário ativo da empresa contratante).

---

### Tabela comparativa: Individual x Coletivo

A tabela abaixo resume as principais características de cada modalidade:

| Característica | Seguro de Vida Individual | Seguro de Vida Coletivo |
| :--- | :--- | :--- |
| **Forma de contratação** | Contratado diretamente pelo próprio segurado com a seguradora | Contratado por um estipulante (empresa, associação, sindicato) em favor de um grupo |
| **Quem participa** | A pessoa segurada e seus beneficiários livremente indicados | Integrantes que mantêm vínculo formal com o estipulante |
| **Definição de coberturas** | Escolhidas e ajustadas individualmente conforme a necessidade | Padronizadas pelo estipulante para os membros do grupo |
| **Vigência e continuidade** | Mantido pelo segurado pelo tempo que ele desejar | Vinculado ao contrato coletivo e ao vínculo com o estipulante |
| **Condições e custos** | Varia conforme idade, perfil de saúde e coberturas contratadas | Varia conforme a média do grupo e o acordo do estipulante |

---

### Um é necessariamente melhor do que o outro?

Não. Não se pode afirmar categoricamente que o individual é melhor ou que o coletivo é pior. São estruturas que atendem a situações diferentes:

* Muitas pessoas contam com o **seguro de vida coletivo oferecido como benefício pelo empregador** e, ao mesmo tempo, contratam uma **apólice individual complementar** para garantir capitais maiores e independência de vínculo profissional.
* As condições, capitais e valores dependem estritamente do contrato formulado com a seguradora.

---

### Em resumo

* No seguro individual, o contrato é direto entre segurado e seguradora.
* No seguro coletivo, há a figura do estipulante que contrata a apólice para o grupo.
* Verifique sempre quais coberturas estão presentes na apólice (morte, invalidez, doenças graves, etc.) e quem são os beneficiários indicados.
`
  },

  // 4. ARTIGO: SEGURO DE CARGA X SEGURO DO CAMINHÃO
  {
    id: 'post-seguro-carga-x-seguro-caminhao',
    slug: 'seguro-de-carga-x-seguro-do-caminhao-qual-e-a-diferenca',
    title: 'Seguro de Carga x Seguro do Caminhão: qual é a diferença?',
    summary: 'Entenda a diferença técnica entre Seguro de Transportes, Seguro Automóvel e Seguro de Responsabilidade Civil do Transportador com base nas normas mais recentes da SUSEP.',
    category: 'Seguro de Carga',
    categoryId: 'cargo',
    featured: false,
    popular: true,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Caminhão de transporte de cargas em rodovia',
    tags: ['Seguro de Carga', 'Seguro de Caminhão', 'Transporte Rodoviário', 'SUSEP', 'RC-V', 'RCTR-C', 'Responsabilidade Civil'],
    relatedInsuranceId: 'cargo',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Assessoria técnica especializada em frotas e logística de transporte rodoviário. Registro SUSEP nº 232150826.'
    },
    sources: [
      {
        title: 'SUSEP — Seguro de Transportes',
        url: 'https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-de-transportes'
      },
      {
        title: 'SUSEP — Seguro de Automóveis',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-automoveis'
      },
      {
        title: 'SUSEP — Normas sobre Seguros de Responsabilidade Civil dos Transportadores de Carga',
        url: 'https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2024/setembro/publicada-nova-norma-sobre-seguros-de-responsabilidade-civil-dos-transportadores-de-carga'
      },
      {
        title: 'SUSEP — Seguro de Responsabilidade Civil de Veículo (RC-V)',
        url: 'https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2024/dezembro/publicada-norma-sobre-o-seguro-de-responsabilidade-civil-de-veiculo-rc-v-do-transportador-de-cargas'
      },
      {
        title: 'SUSEP / CNSP — Atualizações Normativas sobre Seguro Obrigatório de Transporte Rodoviário de Cargas',
        url: 'https://www.gov.br/susep/pt-br/central-de-conteudos/noticias/2026/marco/cnsps-altera-norma-sobre-seguro-obrigatorio-de-responsabilidade-civil-para-transporte-rodoviario-de-cargas'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. As regras de transporte rodoviário de cargas seguem a legislação federal e normas vigentes da SUSEP e ANTT. Consulte sempre um corretor especializado.',
    seo: {
      title: 'Seguro de Carga x Seguro do Caminhão: Diferenças e Regras | BQ Seguros',
      description: 'Descubra a diferença técnica entre o seguro do caminhão (veículo), o seguro de transporte (carga) e a responsabilidade civil do transportador.',
      keywords: ['seguro de carga x seguro caminhao', 'diferenca seguro carga seguro veiculo', 'SUSEP seguro transportes', 'RC-V RCTR-C']
    },
    content: `
No setor de logística e transporte rodoviário, uma dúvida muito frequente é: **se o caminhão tem seguro, a carga automaticamente está protegida?**

A resposta técnica é **não**. O seguro do caminhão e os seguros relacionados à carga e ao transporte são modalidades contratuais distintas, que protegem bens e responsabilidades diferentes.

Abaixo, explicamos detalhadamente o papel de cada seguro com base nas normas oficiais da SUSEP.

---

### 1. Seguro Automóvel (Seguro do Caminhão)

O **Seguro Automóvel** tem como objeto segurado o **veículo físico** (o caminhão, o cavalo mecânico, o chassi e, quando contratados especificamente, os implementos/carrocerias).

* **O que cobre:** Colisão, capotamento, roubo ou furto do caminhão, incêndio no veículo e danos causados a terceiros pelo caminhão (conforme coberturas contratadas na apólice).
* **O que NÃO cobre:** As mercadorias transportadas na carroceria. Se o caminhão tombar e as mercadorias forem danificadas, o seguro do caminhão indeniza os danos no veículo, mas não cobre o valor da carga pertencente a terceiros ou ao embarcador.

---

### 2. Seguro de Transportes (Seguro da Carga / Embarcador)

O **Seguro de Transportes** (geralmente contratado pelo proprietário das mercadorias, o embarcador) protege **os bens e mercadorias** durante seus deslocamentos terrestres, aquaviários ou aéreos.

* **O que cobre:** Perdas e danos materiais causados às mercadorias transportadas em decorrência de acidentes com o veículo transportador, desastres, e outras coberturas adicionais como roubo de carga (conforme as condições contratadas).
* **O que NÃO cobre:** Os danos mecânicos ou estruturais do caminhão que estava realizando o transporte.

---

### 3. Seguros de Responsabilidade Civil do Transportador de Cargas

Esta modalidade resguarda a **responsabilidade civil legal do transportador rodoviário** durante a prestação do serviço de frete.

As normas da SUSEP e do Conselho Nacional de Seguros Privados (CNSP), juntamente com a legislação federal aplicável ao transporte rodoviário de cargas, estabelecem os seguros obrigatórios para transportadores inscritos no RNTRC/ANTT:

* **RCTR-C:** Seguro de Responsabilidade Civil do Transportador Rodoviário de Carga (cobre danos causados à carga decorrentes de acidentes de trânsito como colisão, capotamento e tombamento).
* **RC-DC:** Responsabilidade Civil por Desaparecimento de Carga (cobre perdas decorrentes de roubo ou apropriação indébita durante o transporte).
* **RC-V:** Responsabilidade Civil de Veículo do Transportador de Carga (seguro voltado a danos corporais e materiais causados a terceiros pelo veículo utilizado no transporte).

> **Atenção:** A regulamentação sobre a obrigatoriedade e operabilidade dos seguros de transporte de cargas é periodicamente atualizada pela SUSEP e pelo CNSP. Consulte sempre um corretor especialista para verificar as apólices adequadas à sua operação.

---

### Tabela comparativa

| Modalidade | Objeto protegido | Quem costuma contratar | O que protege |
| :--- | :--- | :--- | :--- |
| **Seguro do Caminhão (Auto)** | O veículo / caminhão | Proprietário do caminhão ou transportadora | Danos ao veículo físico, colisão, roubo do caminhão e terceiros |
| **Seguro de Transportes** | As mercadorias / carga | Embarcador (dono dos produtos) | Danos e perdas sofridas pelas mercadorias durante a viagem |
| **Responsabilidade Civil do Transportador** | A responsabilidade legal do transportador | Transportador rodoviário (pessoa jurídica ou autônomo) | Obrigações legais perante a carga transportada e terceiros |

---

### Em resumo

* O seguro do caminhão protege o **veículo**.
* O seguro de transportes protege a **mercadoria**.
* Os seguros de responsabilidade civil do transportador garantem as **obrigações legais da prestação do serviço de frete**.
* As modalidades são complementares e coexistem para garantir segurança jurídica e operacional completa.
`
  },

  // 5. ARTIGO: SEGURO EMPRESARIAL
  {
    id: 'post-por-que-empresa-deve-considerar-seguro-empresarial',
    slug: 'por-que-sua-empresa-deveria-considerar-um-seguro-empresarial',
    title: 'Por que sua empresa deveria considerar um seguro empresarial?',
    summary: 'Compreenda os principais riscos patrimoniais e operacionais enfrentados por empresas de diferentes portes e como estruturar uma proteção personalizada.',
    category: 'Seguro Empresarial',
    categoryId: 'enterprise',
    featured: false,
    popular: false,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Ambiente corporativo moderno e estruturado',
    tags: ['Seguro Empresarial', 'Gestão de Riscos', 'Patrimônio', 'Responsabilidade Civil', 'SUSEP', 'Empresas'],
    relatedInsuranceId: 'enterprise',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Mais de 38 anos de experiência na análise de riscos patrimoniais corporativos. Registro SUSEP nº 232150826.'
    },
    sources: [
      {
        title: 'SUSEP — Como escolher um seguro: Informações Importantes',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/informacoes-importantes'
      },
      {
        title: 'SUSEP — Seguro de Responsabilidade Civil',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-responsabilidade-civil'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros.',
    seo: {
      title: 'Por que Contratar um Seguro Empresarial? | BQ Seguros',
      description: 'Entenda como o seguro empresarial protege o patrimônio, equipamentos, estoques e a responsabilidade civil da sua empresa contra imprevistos.',
      keywords: ['seguro empresarial porque contratar', 'seguro compreensivo empresa', 'SUSEP seguro empresarial', 'danos eletricos incendio empresa']
    },
    content: `
Gerenciar uma empresa envolve lidar com planejamento financeiro, equipe, fornecedores e clientes. No entanto, eventos imprevisíveis — como um curto-circuito que danifique máquinas essenciais, um vendaval ou um vazamento em instalações — podem comprometer o fluxo de caixa de um negócio.

O **Seguro Empresarial** (também conhecido como seguro compreensivo patrimonial) existe para oferecer resguardo financeiro contra esses eventos, permitindo que a atividade continue sem desestabilização.

---

### Quais riscos podem ser considerados em um seguro empresarial?

Cada negócio tem características operacionais próprias. As apólices empresariais são modulares, permitindo a contratação de coberturas específicas conforme a atividade:

* **Cobertura Básica (Incêndio, Queda de Raio e Explosão):** Protege a estrutura física do imóvel (prédio) e o conteúdo interno (maquinários, móveis e estoques).
* **Danos Elétricos:** Cobre avarias em computadores, motores, servidores, refrigeradores e instalações causadas por variações na rede elétrica ou descargas atmosféricas.
* **Vendaval, Ciclone e Granizo:** Resguarda o imóvel e bens internos contra danos provocados por eventos climáticos severos.
* **Subtração de Bens e Valores:** Indenização por perdas resultantes de roubo ou furto qualificado de mercadorias, equipamentos e valores no local.
* **Responsabilidade Civil Operações:** Resguardo financeiro caso terceiros (clientes, fornecedores ou visitantes) sofram danos involuntários dentro do estabelecimento da empresa.
* **Despesas Fixas e Lucros Cessantes:** Cobertura que auxilia na manutenção das despesas fixas ou reposição do lucro líquido caso a empresa precise suspender temporariamente suas atividades em decorrência de um sinistro coberto.

---

### Como é feita a análise do seguro para uma empresa?

Para estruturar uma apólice adequada, a corretora de seguros avalia juntamente com a empresa:

1. **Ramo de atividade (CNAE):** Indústrias, comércios, escritórios de tecnologia e clínicas de saúde possuem riscos distintos.
2. **Localização e vizinhança:** Condições do imóvel e entorno.
3. **Valor em risco:** Levantamento do valor de reposição das instalações, máquinas e estoques.
4. **Sistemas de proteção existentes:** Extintores, alarmes, brigadas de incêndio e vigilância.

---

### Em resumo

* O seguro empresarial é uma ferramenta estratégica para garantir a continuidade operacional.
* As coberturas devem ser desenhadas sob medida para a realidade de cada negócio.
* A correta declaração de valores e bens no momento da cotação é fundamental para garantir uma indenização precisa em caso de sinistro.
`
  },

  // 6. ARTIGO: ASSISTÊNCIA VEICULAR X SEGURO AUTO
  {
    id: 'post-assistencia-veicular-x-seguro-auto',
    slug: 'assistencia-veicular-e-a-mesma-coisa-que-seguro-de-automovel',
    title: 'Assistência veicular é a mesma coisa que seguro de automóvel?',
    summary: 'Entenda por que guincho e socorro mecânico 24 horas são serviços de assistência e como eles se diferenciam da proteção securitária regulamentada pela SUSEP.',
    category: 'Seguro Auto',
    categoryId: 'auto',
    featured: false,
    popular: true,
    publishedAt: '19 de Agosto de 2026',
    updatedAt: '19 de Agosto de 2026',
    readingTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Serviço de reboque e suporte a automóvel em estrada',
    tags: ['Seguro Auto', 'Assistência 24h', 'Guincho', 'SUSEP', 'Sinistro', 'Dicas BQ'],
    relatedInsuranceId: 'auto',
    author: {
      name: 'Equipe Técnica BQ Seguros',
      role: 'Consultoria Especializada em Seguros',
      avatar: pedroMascotImg,
      bio: 'Equipe técnica da BQ Seguros com mais de 38 anos de experiência. Registro SUSEP nº 232150826.'
    },
    sources: [
      {
        title: 'SUSEP — Seguro de Automóveis',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-automoveis'
      },
      {
        title: 'SUSEP — Como escolher um seguro: Informações Importantes',
        url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/informacoes-importantes'
      }
    ],
    disclaimer: 'As informações deste artigo têm caráter educativo e geral. As coberturas, condições, limites, franquias, exclusões e demais características dos seguros podem variar conforme o produto, a seguradora e o contrato. Para uma análise adequada ao seu caso, consulte um corretor de seguros.',
    seo: {
      title: 'Assistência Veicular x Seguro de Automóvel: É a Mesma Coisa? | BQ Seguros',
      description: 'Descubra a diferença prática entre assistência 24h (guincho, chaveiro) e o seguro de automóvel com indenização regulado pela SUSEP.',
      keywords: ['assistencia veicular e seguro diferenca', 'guincho 24 horas seguro auto', 'SUSEP seguro automovel assistencia']
    },
    content: `
É muito comum ouvir pessoas dizendo: *"Eu tenho seguro, tenho guincho 24 horas"*. Mas você sabia que **assistência veicular** e **seguro de automóvel** são conceitos diferentes?

Compreender essa distinção evita surpresas desagradáveis em momentos delicados, como após uma colisão grave ou um roubo.

---

### O que é a Assistência Veicular 24 Horas?

A assistência veicular é uma **prestação de serviços emergenciais e pontuais** para situações operacionais de pane ou pequenos imprevistos cotidianos com o veículo:

* Reboque (guincho) em caso de pane mecânica ou elétrica, até o limite de quilometragem contratado;
* Socorro para troca de pneu furado;
* Chaveiro em caso de perda ou trancamento das chaves no interior do carro;
* Auxílio em caso de pane seca (falta de combustível) ou carga de bateria.

> A assistência veicular resolve o **problema operacional imediato** de locomoção, mas não cobre o custo do reparo estrutural de batidas graves nem indeniza o valor do carro em caso de perda total.

---

### O que é o Seguro de Automóvel?

O **Seguro de Automóvel** é um contrato formal de garantia financeira regulamentado pela SUSEP, emitido por uma seguradora autorizada.

Ele oferece **cobertura financeira e indenizatória** para prejuízos de grande porte:

* **Indenização Integral (Perda Total):** Pagamento do valor do veículo (conforme a Tabela FIPE ou valor determinado na apólice) em caso de roubo/furto sem recuperação ou colisão com danos que ultrapassem o limite estipulado em contrato (geralmente 75% do valor do bem);
* **Sinistro Parcial:** Reparo do veículo danificado em oficinas credenciadas, mediante o pagamento da franquia;
* **Danos a Terceiros (RCF-V):** Indenização para cobrir prejuízos materiais, corporais ou médicos causados involuntariamente a outros carros ou pessoas.

---

### Tabela comparativa

| Característica | Assistência Veicular 24h | Seguro de Automóvel |
| :--- | :--- | :--- |
| **Finalidade principal** | Resolver emergências pontuais de socorro e transporte | Garantir proteção financeira contra grandes prejuízos e perdas |
| **Indenização por roubo ou perda total** | Não indeniza o valor do veículo | Indeniza o valor segurado conforme a apólice |
| **Danos causados a outros veículos (terceiros)** | Não oferece cobertura | Indeniza danos a terceiros conforme o limite contratado |
| **Regulamentação e reservas financeiras** | Prestação de serviço | Regulamentado e fiscalizado pela SUSEP |

---

### Como os dois funcionam juntos?

A maioria das apólices de seguro automóvel comercializadas pelas seguradoras já **inclui um pacote de assistência 24 horas** como serviço complementar. 

Portanto, ao contratar um seguro de automóvel completo, você conta tanto com a **assistência emergencial (guincho, chaveiro)** quanto com a **garantia securitária (indenização por colisão, roubo e terceiros)**.

---

### Em resumo

* Assistência 24h é um **serviço de socorro imediato**.
* Seguro auto é uma **garantia financeira e indenizatória**.
* Verifique sempre na sua apólice qual é o raio de atendimento do guincho (km) e quais coberturas estão contratadas.
`
  }
];

const LOCAL_STORAGE_KEY = 'bq_seguros_blog_posts_v5';

export function getSavedBlogPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('bq_seguros_blog_posts_v4');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure any technical team posts use Pedro mascot image
        return parsed.map((p: BlogPost) => {
          if (!p.author?.avatar || p.author.avatar.includes('photo-1560250097-0b93528c311a') || p.author.name.includes('Equipe Técnica')) {
            return {
              ...p,
              author: {
                ...p.author,
                avatar: pedroMascotImg
              }
            };
          }
          return p;
        });
      }
    }
  } catch (err) {
    console.error('Error loading blog posts from storage', err);
  }
  return defaultBlogPosts;
}

export function saveBlogPost(post: BlogPost): BlogPost[] {
  const current = getSavedBlogPosts();
  const index = current.findIndex(p => p.id === post.id);
  let updated: BlogPost[];
  
  if (index >= 0) {
    updated = [...current];
    updated[index] = {
      ...post,
      updatedAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    };
  } else {
    updated = [post, ...current];
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving blog posts', err);
  }

  return updated;
}

export function deleteBlogPost(id: string): BlogPost[] {
  const current = getSavedBlogPosts();
  const updated = current.filter(p => p.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting blog post', err);
  }
  return updated;
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function resetBlogPosts(): BlogPost[] {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultBlogPosts));
  } catch (err) {
    console.error('Error resetting blog posts', err);
  }
  return defaultBlogPosts;
}

export const resetBlogPostsToDefault = resetBlogPosts;
