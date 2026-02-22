# Phase 6 - IA Vision: Identificação Automática de Items

## Resumo

Implementação de identificação automática de items usando Google Vision API via Vercel AI Gateway. O usuário pode agora tirar uma foto ou enviar uma imagem, e a IA preencherá automaticamente os dados do item.

## Arquivos Criados

### Backend
- `lib/services/vision.ts` - Serviço de integração com Google Vision
- `app/api/vision/identify/route.ts` - API endpoint para identificação

### Frontend
- `components/items/VisionCapture.tsx` - Componente de captura/seleção de imagem
- `app/items/create/page.tsx` - Nova página de fluxo de criação com IA

### Atualizações
- `app/items/page.tsx` - Adicionado botão "Novo Item com IA"

## Funcionalidades Implementadas

### 1. Serviço de Vision (`lib/services/vision.ts`)
- Integração com Google Gemini 2.0 Flash
- Análise automática de imagens
- Extração de dados estruturados (nome, marca, modelo, cor, série, ano, condição)
- Score de confiança (0-1) para validação da identificação

**Tipos de item suportados:**
- Hot Wheels (principal)
- Ação figures
- Colecionáveis diversos

### 2. API Vision (`app/api/vision/identify/route.ts`)
- POST `/api/vision/identify`
- Requer autenticação
- Aceita imagem em base64
- Retorna dados de identificação estruturados

**Request:**
```json
{
  "image": "base64-encoded-image",
  "mimeType": "image/jpeg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Hot Wheels Fast Felony",
    "brand": "Hot Wheels",
    "model": "Fast Felony",
    "color": "Red",
    "series": "2024 New Models",
    "year": 2024,
    "condition": "mint",
    "confidence": 0.92,
    "notes": "Excellent condition, pristine packaging"
  }
}
```

### 3. Componente VisionCapture (`components/items/VisionCapture.tsx`)
- Interface de captura com câmera ou galeria
- Preview da imagem selecionada
- Exibição de score de confiança
- Validação com aviso para baixa confiança (<60%)
- Feedback visual do processo

**Features:**
- Botão "Tirar Foto" - aciona câmera do dispositivo
- Botão "Galeria" - seleciona arquivo
- Preview em tempo real
- Indicador de confiança com cores
- Opção de tentar outra imagem

### 4. Fluxo de Criação (`app/items/create/page.tsx`)
- Página intermediária com duas opções:
  1. **Identificar com IA** - fluxo automático
  2. **Preenchimento Manual** - entrada manual

**Fluxo de IA:**
1. Usuário seleciona imagem (câmera ou galeria)
2. IA analisa automaticamente
3. Dados pré-preenchidos no formulário
4. Usuário pode revisar/editar dados
5. Salva o item

## Como Usar

### Para Usuários Finais

1. Na página de Items, clique em "Novo Item com IA"
2. Escolha "Identificar com IA"
3. Clique em "Tirar Foto" ou "Galeria"
4. A IA analisará a imagem
5. Revise os dados identificados
6. Clique em "Salvar"

### Para Desenvolvedores

```typescript
// Chamar API diretamente
const response = await fetch('/api/vision/identify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: base64Image,
    mimeType: 'image/jpeg'
  })
})

const { data } = await response.json()
// data contém ItemIdentification
```

## Configuração Necessária

### Variáveis de Ambiente
Todas já estão configuradas automaticamente através do Vercel AI Gateway:
- Nenhuma chave de API extra necessária
- Usa a infraestrutura do Vercel

### Dependências
```json
{
  "ai": "^6.0.0",
  "@ai-sdk/google": "^1.0.0"
}
```

## Limites e Considerações

### Confiança de Identificação
- **≥ 90%:** Excelente - pode confiar na identificação
- **70-89%:** Bom - revisar antes de salvar
- **60-69%:** Mediano - revisar com atenção
- **< 60%:** Baixa - alerta ao usuário

### Tipos de Item Melhores Reconhecidos
1. Hot Wheels (principal suporte)
2. Diecast models em geral
3. Action figures
4. Colecionáveis com detalhes claros

### Limitações
- Imagens muito borradas podem ter baixa confiança
- Itens muito danificados podem ser mal identificados
- Sem treinamento específico para itens raros/antigos
- Requer internet para funcionamento

## Melhorias Futuras

- [ ] Suporte a múltiplas imagens do mesmo item
- [ ] Fine-tuning para Hot Wheels específico
- [ ] Busca por similaridade (Phase 2)
- [ ] Retenção de histórico de identificações
- [ ] Relatórios de acurácia
- [ ] Suporte a OCR para texto em itens
- [ ] Modo offline com cache

## Troubleshooting

### Erro: "Erro ao processar imagem"
- Verifique o tamanho da imagem (máx ~10MB)
- Tente com uma imagem mais clara

### Baixa confiança de identificação
- Tire a foto em melhor iluminação
- Posicione o item melhor na câmera
- Tente remover fundos confusos

### Não aparece o botão "Tirar Foto"
- Verifique permissões de câmera do navegador
- Use HTTPS (obrigatório para câmera)

## Testing

Para testar localmente:

1. Certifique-se de ter `.env.local` configurado
2. Rode `npm run dev`
3. Navegue para `/items/create`
4. Teste com imagens de Hot Wheels

## Performance

- API response time: ~2-3 segundos (Google Vision)
- Upload time: Depende do tamanho da imagem
- Total flow: ~3-5 segundos

## Segurança

- ✅ Autenticação obrigatória
- ✅ Validação de entrada (base64)
- ✅ HTTPS obrigatório em produção
- ✅ Sem armazenamento de imagens cruas
- ✅ Rate limiting recomendado para produção

## Próximos Passos

- **Phase 7:** Link Público e Compartilhamento
- **Phase 8:** Dashboard e Polish Final

---

**Status:** ✅ COMPLETO
**Última Atualização:** 2026-02-22
