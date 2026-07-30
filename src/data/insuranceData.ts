/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InsuranceProduct, ClientPolicy, QuoteProposal } from '../types';

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: 'auto',
    title: 'Seguro Auto',
    shortDesc: 'Proteção completa para o seu veículo, com assistência 24h e coberturas flexíveis.',
    description: 'Viaje com tranquilidade sabendo que seu carro está protegido contra qualquer imprevisto. Nosso seguro automotivo oferece coberturas contra roubo, furto, colisões, incêndios, além de danos materiais e corporais causados a terceiros.',
    iconName: 'Car',
    coverages: [
      'Roubo, furto e incêndio (100% Tabela FIPE)',
      'Colisão e danos parciais ou totais',
      'Responsabilidade Civil Terceiros (RCF-V) até R$ 150.000',
      'Danos materiais e corporais a terceiros',
      'Proteção completa para vidros, faróis, lanternas e retrovisores'
    ],
    benefits: [
      'Guincho com quilometragem ilimitada',
      'Carro reserva por até 15 ou 30 dias',
      'Socorro mecânico e elétrico 24h em todo o Brasil',
      'Chaveiro e troca de pneus no local',
      'Descontos exclusivos em estacionamentos, serviços e peças'
    ],
    basePrice: 120
  },
  {
    id: 'home',
    title: 'Seguro Residencial',
    shortDesc: 'Segurança para o seu lar doce lar, com assistência técnica e cobertura ampla.',
    description: 'Sua casa ou apartamento protegidos contra incêndio, queda de raio, explosão, danos elétricos, vendaval e roubo de bens. Conte ainda com serviços emergenciais para facilitar o seu dia a dia.',
    iconName: 'Home',
    coverages: [
      'Incêndio, queda de raio, explosão e implosão',
      'Danos elétricos (curtos-circuitos em aparelhos)',
      'Roubo e furto qualificado de bens residenciais',
      'Vendaval, granizo e fumaça',
      'Responsabilidade Civil Familiar (danos causados a terceiros por membros da casa)'
    ],
    benefits: [
      'Serviços de chaveiro emergencial 24h',
      'Encanador e eletricista para reparos rápidos',
      'Conserto de eletrodomésticos da linha branca',
      'Desentupimento e vidraceiro',
      'Limpeza de calhas e revisão de telhas'
    ],
    basePrice: 35
  },
  {
    id: 'life',
    title: 'Seguro de Vida',
    shortDesc: 'A garantia de tranquilidade e amparo financeiro para as pessoas que você mais ama.',
    description: 'Proteja o futuro de quem você ama e garanta sua própria estabilidade em casos de imprevistos graves. Um seguro flexível, personalizável e que cabe perfeitamente no seu planejamento financeiro.',
    iconName: 'Heart',
    coverages: [
      'Morte por qualquer causa (indenização aos beneficiários)',
      'Morte acidental em dobro',
      'Invalidez permanente total ou parcial por acidente (IPA)',
      'Invalidez funcional permanente por doença (IFPD)',
      'Cobertura para Doenças Graves (câncer, infarto, AVC, etc.)'
    ],
    benefits: [
      'Assistência funeral individual ou familiar completa',
      'Segunda opinião médica internacional inclusa',
      'Sorteios mensais em dinheiro de até R$ 50.000',
      'Orientação nutricional e fitness online',
      'Telemedicina com médicos especialistas'
    ],
    basePrice: 25
  },
  {
    id: 'enterprise',
    title: 'Seguro Empresarial',
    shortDesc: 'Proteja o patrimônio, os colaboradores e a operação do seu negócio.',
    description: 'Seu negócio não pode parar. Oferecemos soluções completas para proteger a estrutura física da sua empresa, estoques, equipamentos de valor e garantir a proteção financeira em casos de paralisação das atividades.',
    iconName: 'Building2',
    coverages: [
      'Incêndio, queda de raio, explosão e fumaça',
      'Danos elétricos a máquinas, computadores e servidores',
      'Subtração de bens, mercadorias e valores do caixa',
      'Quebra de vidros e anúncios luminosos',
      'Lucros cessantes (perda de receita decorrente de sinistro)'
    ],
    benefits: [
      'Assistência técnica 24h com chaveiro, eletricista e encanador',
      'Reparos de portas e portões automáticos',
      'Descarte ecológico de equipamentos eletrônicos obsoletos',
      'Check-up preventivo predial',
      'Suporte jurídico especializado'
    ],
    basePrice: 150
  },
  {
    id: 'travel',
    title: 'Seguro Viagem',
    shortDesc: 'Assistência completa para viagens nacionais e internacionais, com suporte 24h.',
    description: 'Descubra o mundo sem preocupações. O seguro viagem garante assistência médica por urgência, reembolso em caso de extravio de bagagem, cancelamento de voos e assessoria jurídica em qualquer idioma.',
    iconName: 'Plane',
    coverages: [
      'Despesas Médicas, Hospitalares e Odontológicas (DMHO)',
      'Despesas farmacêuticas prescritas em atendimento médico',
      'Extravio, roubo ou danos à bagagem despachada',
      'Cancelamento ou interrupção de viagem programada',
      'Traslado médico e repatriação sanitária'
    ],
    benefits: [
      'Central de atendimento internacional 24h em português',
      'Orientação em caso de perda de documentos ou passaporte',
      'Hospedagem de acompanhante em internações longas',
      'Adiantamento de fiança judicial no exterior',
      'Seguro de vida por acidentes durante o voo'
    ],
    basePrice: 15
  },
  {
    id: 'equipment',
    title: 'Seguro Equipamentos',
    shortDesc: 'Segurança total para notebooks, celulares, câmeras e outras ferramentas de trabalho.',
    description: 'Sua produtividade não pode parar por causa de um acidente ou roubo. Garanta a proteção de seus dispositivos eletrônicos portáteis fundamentais para o seu trabalho diário ou lazer.',
    iconName: 'Laptop',
    coverages: [
      'Subtração do equipamento sob ameaça (roubo)',
      'Danos físicos por quedas, colisões ou acidentes',
      'Danos elétricos decorrentes de oscilações na rede de energia',
      'Danos causados por água ou infiltração de líquidos',
      'Cobertura internacional (garantia em viagens ao exterior)'
    ],
    benefits: [
      'Envio de técnico autorizado para avaliação rápida',
      'Opção de reposição do mesmo aparelho ou modelo superior',
      'Garantia estendida original opcional',
      'Suporte técnico de configuração online remoto',
      'Processo de sinistro 100% digital e rápido'
    ],
    basePrice: 30
  },
  {
    id: 'motorhome',
    title: 'Seguro de Carga (Caminhão)',
    shortDesc: 'Proteção essencial para o transporte de cargas, cobrindo tombamentos, acidentes e roubo.',
    description: 'Garanta a segurança financeira do transporte das suas mercadorias nas estradas brasileiras. Nosso seguro de carga cobre RCTR-C (Acidentes), RCF-DC (Roubo/Desvio de Carga) e avarias para caminhões próprios, agregados ou frotas.',
    iconName: 'Truck',
    coverages: [
      'RCTR-C: Colisão, tombamento, capotamento e incêndio do caminhão',
      'RCF-DC: Roubo, furto qualificado e desvio de carga nas estradas',
      'Avarias particulares e proteção durante a carga/descarga',
      'Proteção contra intempéries e estragos por água',
      'Responsabilidade civil do transportador rodoviário'
    ],
    benefits: [
      'Guincho pesado e socorro mecânico 24h em todo o Brasil',
      'Liberação rápida de manifesto e averbação simplificada',
      'Suporte para gerenciamento de risco de frota e rastreamento',
      'Assistência ao caminhoneiro no local da ocorrência',
      'Condições especiais para motoristas autônomos e transportadoras'
    ],
    basePrice: 190
  },
  {
    id: 'others',
    title: 'Seguro Fiança & Consórcios',
    shortDesc: 'Alugue imóveis sem fiador com o Seguro Fiança e conquiste bens através de consórcios.',
    description: 'O Seguro Fiança Locatícia é a melhor solução para alugar imóveis residenciais ou comerciais sem necessidade de fiador ou caução. Garante o pagamento do aluguel, encargos e danos ao imóvel, oferecendo agilidade total para o inquilino e segurança máxima para o proprietário.',
    iconName: 'ShieldPlus',
    coverages: [
      'Garantia do aluguel mensal e encargos (IPTU, condomínio, água e luz)',
      'Cobertura contra danos materiais ao imóvel, pintura e estragos estruturais',
      'Multa por rescisão contratual e amparo com custos de ação de despejo',
      'Consórcios Imobiliários, Automotivos e de Serviços',
      'Seguro Bike Premium, Náutico e Responsabilidade Civil'
    ],
    benefits: [
      'Zero necessidade de fiador ou depósito caução em dinheiro',
      'Análise de crédito descomplicada e aprovação ágil da locação',
      'Assistência residencial 24h grátis (chaveiro, encanador, eletricista e reparos)',
      'Garantia de recebimento pontual para o proprietário e imobiliária',
      'Pagamento parcelado e facilitado no próprio boleto do aluguel'
    ],
    basePrice: 40
  }
];

export const mockCarriers = [
  { name: 'Porto Seguro', logo: 'Porto', rating: '9.4' },
  { name: 'Tokio Marine', logo: 'Tokio', rating: '9.2' },
  { name: 'Bradesco Seguros', logo: 'Bradesco', rating: '9.0' },
  { name: 'Allianz Seguros', logo: 'Allianz', rating: '9.1' },
  { name: 'SulAmérica', logo: 'Sulamérica', rating: '8.9' },
  { name: 'Liberty Seguros', logo: 'Liberty', rating: '8.8' },
  { name: 'MAPFRE', logo: 'Mapfre', rating: '8.7' },
  { name: 'Azul Seguros', logo: 'Azul', rating: '8.9' },
  { name: 'HDI Seguros', logo: 'HDI', rating: '8.8' },
  { name: 'Sompo Seguros', logo: 'Sompo', rating: '8.7' },
  { name: 'Zurich Seguros', logo: 'Zurich', rating: '8.9' },
  { name: 'Suhai Seguradora', logo: 'Suhai', rating: '9.1' }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Mariel Miranda',
    city: 'Cliente Verificado',
    quote: 'Excelente atendimento, profissionais muito competentes! Sempre indico aos amigos.',
    rating: 5,
    role: 'Cliente BQ Seguros',
    avatar: ''
  },
  {
    id: '2',
    name: 'Edna Pereira Florentino',
    city: 'Barbacena - MG',
    quote: 'Atendimento extremamente profissional, tanto no caso de um sinistro como para pequenos reparos a assistência é presencial, imediata, ética e principalmente, empática. Recomendo. Edna P. Florentino',
    rating: 5,
    role: 'Cliente de Barbacena - MG',
    avatar: ''
  },
  {
    id: '3',
    name: 'Geovani de Assis Medeiros',
    city: 'Cliente Verificado',
    quote: 'As melhores condições. Há 7 anos não tenho dor de cabeça nenhuma em relação a um veículo, pois tenho o ótimo e particular suporte. Corretores trabalham com várias seguradoras, o que ajuda a gente a escolher os melhores preços e condições. Há um ano bati em outro carro, estava errado e no mesmo dia tudo estava encaminhado para ser resolvido. Zero dor de cabeça !',
    rating: 5,
    role: 'Cliente BQ Seguros',
    avatar: ''
  },
  {
    id: '4',
    name: 'Franciane Maria Pereira',
    city: 'Cliente Verificado',
    quote: 'Já sou cliente alguns anos e super recomendo. Esse ano pela primeira vez precisei utilizar o seguro e assistência prestada foi simplesmente impecável. Corretora nota mil, com certeza a melhor de BQ!!',
    rating: 5,
    role: 'Cliente BQ Seguros',
    avatar: ''
  }
];

export const faqItems = [
  {
    question: 'Por que contratar meu seguro através de uma corretora como a BQ Seguros?',
    answer: 'A BQ Seguros analisa o seu perfil e compara as opções nas maiores seguradoras do país para encontrar a cobertura ideal pelo menor preço. Além disso, no momento de um imprevisto (sinistro), você não precisa lidar com a burocracia sozinho: nós cuidamos de todo o processo de acionamento e indenização junto à seguradora por você.'
  },
  {
    question: 'Como funciona o processo de simulação de seguros?',
    answer: 'É extremamente simples! Você escolhe o tipo de seguro que deseja (Auto, Vida, Residência, etc.), preenche alguns dados básicos para cálculo de risco e nosso sistema calcula instantaneamente as propostas das seguradoras parceiras. Você pode comparar preços e benefícios diretamente no painel e contratar com apenas um clique.'
  },
  {
    question: 'O que é a Franquia (Deductible) de um seguro?',
    answer: 'A franquia é o valor estipulado no contrato que representa a sua participação obrigatória em caso de sinistro de perda parcial (reparos). Por exemplo: se o conserto do carro custar R$ 5.000 e sua franquia for R$ 1.500, você paga os R$ 1.500 na oficina credenciada e a seguradora arca com os R$ 3.500 restantes. Não há cobrança de franquia em caso de perda total, roubo ou furto sem recuperação.'
  },
  {
    question: 'Quanto tempo leva para emitir a minha apólice?',
    answer: 'O tempo varia de acordo com o tipo de seguro. Seguros de Viagem, Equipamentos e Residência costumam ter a emissão imediata após o pagamento. Seguros de Auto e Saúde podem levar de 2 a 10 dias úteis, pois dependem da realização de vistoria prévia ou análise de declaração de saúde.'
  },
  {
    question: 'Como faço para acionar o seguro em caso de sinistro ou urgência?',
    answer: 'Quando acontecer um sinistro de urgência, primeiramente, entre em contato conosco pelo nosso WhatsApp. Assim, nós cuidamos de todo o caso no momento para você! Em segundo lugar, caso estejamos fora de área, você deve ligar para a seguradora no contato que enviamos no seu cartão de seguro ou apólice.'
  }
];

export const defaultClientPolicies: ClientPolicy[] = [
  {
    id: 'POL-AUTO-8812',
    policyNumber: '92.384.8122-0',
    insuranceType: 'auto',
    carrierName: 'Porto Seguro',
    startDate: '2026-01-10',
    endDate: '2027-01-10',
    premiumAmount: 145.80,
    status: 'active',
    coverageLimit: 120000
  },
  {
    id: 'POL-HOME-4401',
    policyNumber: '10.554.4401-9',
    insuranceType: 'home',
    carrierName: 'Tokio Marine',
    startDate: '2026-03-15',
    endDate: '2027-03-15',
    premiumAmount: 42.50,
    status: 'active',
    coverageLimit: 350000
  }
];
