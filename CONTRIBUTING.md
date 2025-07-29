# Contribuindo para o CryptoDash

Obrigado por considerar contribuir para o CryptoDash! Este documento fornece diretrizes para contribuições.

## 🚀 Como Contribuir

### 1. Fork e Clone
\`\`\`bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/crypto-dashboard.git
cd crypto-dashboard
\`\`\`

### 2. Configuração do Ambiente
\`\`\`bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# Execute o projeto
npm run dev
\`\`\`

### 3. Crie uma Branch
\`\`\`bash
# Crie uma branch para sua feature/fix
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
\`\`\`

## 📋 Diretrizes de Desenvolvimento

### Estrutura de Commits
Use commits semânticos seguindo o padrão:
\`\`\`
tipo(escopo): descrição

feat(search): adiciona busca por categoria
fix(api): corrige timeout na requisição
docs(readme): atualiza instruções de instalação
style(ui): melhora responsividade da tabela
refactor(hooks): otimiza hook useCoins
test(api): adiciona testes para coinService
\`\`\`

### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, UI/UX
- `refactor`: Refatoração de código
- `test`: Testes
- `chore`: Tarefas de manutenção

### Padrões de Código

#### TypeScript
- Use tipos explícitos sempre que possível
- Prefira interfaces para objetos
- Use enums para constantes relacionadas

#### React
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Use `useCallback` e `useMemo` quando apropriado

#### Styling
- Tailwind CSS para estilização
- Componentes shadcn/ui quando disponíveis
- Classes responsivas (mobile-first)

#### Naming Conventions
\`\`\`typescript
// Componentes: PascalCase
export function CoinTable() {}

// Hooks: camelCase com prefixo 'use'
export function useCoins() {}

// Utilitários: camelCase
export function formatCurrency() {}

// Constantes: UPPER_SNAKE_CASE
export const API_BASE_URL = ''

// Tipos/Interfaces: PascalCase
interface CoinData {}
type ApiResponse<T> = {}
\`\`\`

## 🧪 Testes

### Executar Testes
\`\`\`bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Coverage
npm run test:coverage
\`\`\`

### Escrever Testes
- Teste componentes críticos
- Mock APIs externas
- Teste casos de erro
- Mantenha cobertura > 80%

## 📝 Pull Requests

### Antes de Submeter
- [ ] Código segue os padrões estabelecidos
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem warnings do ESLint
- [ ] Build funcionando

### Template de PR
\`\`\`markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passos para reproduzir
2. Comportamento esperado

## Screenshots (se aplicável)
Adicione screenshots das mudanças visuais

## Checklist
- [ ] Código testado localmente
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
\`\`\`

## 🐛 Reportar Bugs

### Template de Issue
\`\`\`markdown
**Descrição do Bug**
Descrição clara e concisa do bug

**Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável, adicione screenshots

**Ambiente:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Versão: [e.g. 22]
\`\`\`

## 💡 Sugerir Funcionalidades

### Template de Feature Request
\`\`\`markdown
**Funcionalidade Relacionada a um Problema?**
Descrição clara do problema

**Solução Desejada**
Descrição clara da solução

**Alternativas Consideradas**
Outras soluções consideradas

**Contexto Adicional**
Qualquer contexto adicional
\`\`\`

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
\`\`\`
src/
├── app/                 # App Router (Next.js 15)
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn)
│   ├── coins/          # Componentes específicos de moedas
│   └── charts/         # Componentes de gráficos
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
├── services/           # Serviços de API
├── store/              # Estado global (Zustand)
└── types/              # Definições de tipos
\`\`\`

### Tecnologias Principais
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Query** - Gerenciamento de estado servidor
- **Zustand** - Estado global cliente

## 📞 Contato

- Abra uma issue para discussões
- Use discussions para perguntas gerais
- Siga o código de conduta

## 🙏 Reconhecimentos

Obrigado a todos os contribuidores que ajudam a melhorar o CryptoDash!

---

**Lembre-se:** Pequenas contribuições são tão valiosas quanto grandes features. Toda ajuda é bem-vinda! 🚀
\`\`\`

E vou criar um arquivo CODE_OF_CONDUCT.md:

