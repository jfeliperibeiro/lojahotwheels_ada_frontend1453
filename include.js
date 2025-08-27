// Função para incluir cabeçalho e rodapé
function incluirCabecalhoRodape() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      } else {
        console.warn('Elemento #header-placeholder não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar header.html:', error));

  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      } else {
        console.warn('Elemento #footer-placeholder não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar footer.html:', error));
}

// Função para configurar os listeners específicos do formulário de cadastro
function setupCadastroFormListeners() {
  // --- Código do CEP ---
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('blur', function () {
      const cep = this.value.replace(/\D/g, '');

      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              const rua = document.getElementById('rua');
              const bairro = document.getElementById('bairro');
              const cidade = document.getElementById('cidade');
              const estado = document.getElementById('estado');

              if (rua) rua.value = data.logradouro;
              else console.warn('Campo #rua não encontrado no cadastro.html.');

              if (bairro) bairro.value = data.bairro;
              else console.warn('Campo #bairro não encontrado no cadastro.html.');

              if (cidade) cidade.value = data.localidade;
              else console.warn('Campo #cidade não encontrado no cadastro.html.');

              if (estado) estado.value = data.uf;
              else console.warn('Campo #estado não encontrado no cadastro.html.');

            } else {
              alert('CEP não encontrado.');
            }
          })
          .catch(() => {
            alert('Erro ao buscar o CEP. Verifique sua conexão ou o CEP digitado.');
          });
      } else {
        alert('CEP inválido. Deve conter 8 dígitos.');
      }
    });
  } else {
    // Este aviso agora indica que o campo CEP não foi encontrado *após* carregar cadastro.html
    console.warn('Campo #cep não encontrado no DOM APÓS CARREGAMENTO de cadastro.html. Verifique o HTML de cadastro.html.');
  }

  // --- Código do Formulário/WhatsApp ---
  const formulario = document.getElementById("formulario");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault(); // evita envio tradicional

      const getInputValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : '';
      };

      const nome = getInputValue("nome");
      const cpf = getInputValue("cpf");
      const email = getInputValue("email");
      const senha = '###########'; // getInputValue("senha");
      const telefone = getInputValue("telefone");
      const dt_nasc = getInputValue("dt_nasc");
      const rua = getInputValue("rua");
      const nr = getInputValue("numero");
      const complemento = getInputValue("complemento");
      const bairro = getInputValue("bairro");
      const cidade = getInputValue("cidade");
      const estado = getInputValue("estado");

      const generoSelecionado = document.querySelector('input[name="genero"]:checked')?.value || "";

      console.log("Gênero selecionado:", generoSelecionado);

      const textoCru = `Olá! Eu tenho interesse em me cadastrar na loja.\n\n` +
        `Meu nome é ${nome}\n` +
        `CPF: ${cpf}\n` +
        `Email: ${email}\n` +
        `Senha: ${senha}\n` +
        `Gênero: ${generoSelecionado}\n` +
        `Telefone: ${telefone}\n` +
        `Data de Nascimento: ${dt_nasc}\n` +
        `Rua: ${rua}\n` +
        `Número: ${nr}\n` +
        `Complemento: ${complemento}\n` +
        `Bairro: ${bairro}\n` +
        `Cidade: ${cidade}\n` +
        `Estado: ${estado}`;

      const textoFormatadoParaURL = encodeURIComponent(textoCru);

      const numero = "5511976561347";

      const link = `https://wa.me/${numero}?text=${textoFormatadoParaURL}`;
      window.open(link, "_blank");
    });
  } else {
    console.warn('Formulário #formulario não encontrado no DOM APÓS CARREGAMENTO de cadastro.html. Verifique o HTML de cadastro.html.');
  }
}

// Função para carregar páginas dinamicamente
function carregarPagina(pagina) {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      const conteudoElement = document.getElementById('conteudo');
      if (conteudoElement) {
        conteudoElement.innerHTML = html;
        // MUITO IMPORTANTE: Se a página carregada for 'cadastro.html', configure os listeners
        if (pagina === 'cadastro.html') {
          setupCadastroFormListeners();
        }
      } else {
        console.warn('Elemento #conteudo não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar página:', error));
}

// DOMContentLoaded é para o conteúdo INICIAL da página (index.html)
document.addEventListener('DOMContentLoaded', function () {
  // Carrega cabeçalho e rodapé imediatamente
  incluirCabecalhoRodape();

  // Carrega o catálogo como página inicial, já que removemos o onload do body
  carregarPagina('catalogo.html');
});



// Array global para armazenar os itens do carrinho
let cartItems = []; // Cada item será um objeto { id, name, price, quantity }

// Função para incluir cabeçalho e rodapé
function incluirCabecalhoRodape() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      } else {
        console.warn('Elemento #header-placeholder não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar header.html:', error));

  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      } else {
        console.warn('Elemento #footer-placeholder não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar footer.html:', error));
}

// ===========================================
// FUNÇÕES DO FORMULÁRIO DE CADASTRO (CEP/WhatsApp) - Mantidas do exemplo anterior
// ===========================================
function setupCadastroFormListeners() {
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('blur', function () {
      const cep = this.value.replace(/\D/g, '');

      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              const rua = document.getElementById('rua');
              const bairro = document.getElementById('bairro');
              const cidade = document.getElementById('cidade');
              const estado = document.getElementById('estado');

              if (rua) rua.value = data.logradouro;
              else console.warn('Campo #rua não encontrado no cadastro.html.');
              if (bairro) bairro.value = data.bairro;
              else console.warn('Campo #bairro não encontrado no cadastro.html.');
              if (cidade) cidade.value = data.localidade;
              else console.warn('Campo #cidade não encontrado no cadastro.html.');
              if (estado) estado.value = data.uf;
              else console.warn('Campo #estado não encontrado no cadastro.html.');
            } else {
              alert('CEP não encontrado.');
            }
          })
          .catch(() => {
            alert('Erro ao buscar o CEP. Verifique sua conexão ou o CEP digitado.');
          });
      } else {
        alert('CEP inválido. Deve conter 8 dígitos.');
      }
    });
  } else {
    console.warn('Campo #cep não encontrado no DOM APÓS CARREGAMENTO de cadastro.html. Verifique o HTML de cadastro.html.');
  }

  const formulario = document.getElementById("formulario");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      const getInputValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : '';
      };

      const nome = getInputValue("nome");
      const cpf = getInputValue("cpf");
      const email = getInputValue("email");
      const senha = getInputValue("senha");
      const telefone = getInputValue("telefone");
      const dt_nasc = getInputValue("dt_nasc");
      const rua = getInputValue("rua");
      const nr = getInputValue("numero");
      const complemento = getInputValue("complemento");
      const bairro = getInputValue("bairro");
      const cidade = getInputValue("cidade");
      const estado = getInputValue("estado");

      const generoSelecionado = document.querySelector('input[name="genero"]:checked')?.value || "";

      console.log("Gênero selecionado:", generoSelecionado);

      const textoCru = `Olá! Eu tenho interesse em me cadastrar na loja.\n\n` +
        `Meu nome é ${nome}\n` +
        `CPF: ${cpf}\n` +
        `Email: ${email}\n` +
        `Senha: ${senha}\n` +
        `Gênero: ${generoSelecionado}\n` +
        `Telefone: ${telefone}\n` +
        `Data de Nascimento: ${dt_nasc}\n` +
        `Rua: ${rua}\n` +
        `Número: ${nr}\n` +
        `Complemento: ${complemento}\n` +
        `Bairro: ${bairro}\n` +
        `Cidade: ${cidade}\n` +
        `Estado: ${estado}`;

      const textoFormatadoParaURL = encodeURIComponent(textoCru);

      const numero = "5511976561347";

      const link = `https://wa.me/${numero}?text=${textoFormatadoParaURL}`;
      window.open(link, "_blank");
    });
  } else {
    console.warn('Formulário #formulario não encontrado no DOM APÓS CARREGAMENTO de cadastro.html. Verifique o HTML de cadastro.html.');
  }
}

// ===========================================
// NOVAS FUNÇÕES PARA O CATÁLOGO E CARRINHO
// ===========================================

// Função para adicionar item ao carrinho
function addToCart(id, name, price) {
  const existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id: id, name: name, price: parseFloat(price), quantity: 1 });
  }
  alert(`${name} adicionado ao carrinho!`);
  // Opcional: Atualizar um contador de itens no carrinho aqui
  // console.log("Carrinho atual:", cartItems);
}

// Função para renderizar a tabela do carrinho
function renderCartTable() {
  const tableBody = document.getElementById('cart-table-body');
  const cartTotalDisplay = document.getElementById('cart-total');
  const emptyMessage = document.getElementById('empty-cart-message');

  if (!tableBody || !cartTotalDisplay) {
    console.warn("Elementos do carrinho não encontrados. Certifique-se de estar na página carrinho.html.");
    return;
  }

  tableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

  let total = 0;

  if (cartItems.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Seu carrinho está vazio.</td></tr>`;
    cartTotalDisplay.textContent = 'Total: R$ 0,00';
    return;
  }

  cartItems.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = tableBody.insertRow();
    row.innerHTML = `
      <td data-label="Item">${item.name}</td>
      <td data-label="Preço Unitário">R$ ${item.price.toFixed(2).replace('.', ',')}</td>
      <td data-label="Quantidade">
        <div class="quantity-controls">
          <button data-action="decrease" data-item-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-item-id="${item.id}">+</button>
        </div>
      </td>
      <td data-label="Subtotal">R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
      <td data-label="Ações">
        <button class="remove-item-btn" data-item-id="${item.id}">Remover</button>
      </td>
    `;
  });

  cartTotalDisplay.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

  // Adiciona event listeners aos botões de quantidade e remover
  tableBody.querySelectorAll('.quantity-controls button').forEach(button => {
    button.addEventListener('click', (event) => {
      const itemId = event.target.dataset.itemId;
      const action = event.target.dataset.action;
      if (action === 'increase') {
        changeQuantity(itemId, 1);
      } else if (action === 'decrease') {
        changeQuantity(itemId, -1);
      }
    });
  });

  tableBody.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const itemId = event.target.dataset.itemId;
      removeItem(itemId);
    });
  });
}

// Função para mudar a quantidade de um item no carrinho
function changeQuantity(id, delta) {
  const item = cartItems.find(item => item.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeItem(id); // Remove o item se a quantidade for 0 ou menos
    } else {
      renderCartTable(); // Renderiza novamente se a quantidade for válida
    }
  }
}

// Função para remover item do carrinho
function removeItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  renderCartTable();
}

// Função para limpar o carrinho
function clearCart() {
  if (confirm('Tem certeza que deseja limpar o carrinho?')) {
    cartItems = [];
    renderCartTable();
  }
}

// Função para enviar o pedido via WhatsApp
function sendOrderViaWhatsApp() {
  if (cartItems.length === 0) {
    alert('Seu carrinho está vazio. Adicione itens antes de enviar o pedido.');
    return;
  }

  let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
  let total = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `${index + 1}. ${item.name} (R$ ${item.price.toFixed(2).replace('.', ',')}) x ${item.quantity} = R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
  });

  message += `\nTotal do Pedido: R$ ${total.toFixed(2).replace('.', ',')}\n`;
  message += "\nAguardo o contato para finalizar a compra. Obrigado!";

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "5511976561347"; // Seu número de WhatsApp com DDI e DDD

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappLink, '_blank');
}

// Função para configurar os event listeners da página de catálogo
function setupCatalogPage() {
  const catalogContainer = document.getElementById('catalog-container');
  if (catalogContainer) {
    // Usando delegação de eventos para botões de adicionar ao carrinho
    catalogContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart-btn')) {
        const button = event.target;
        const id = button.dataset.itemId;
        const name = button.dataset.itemName;
        const price = button.dataset.itemPrice;
        addToCart(id, name, price);
      }
    });
  } else {
    console.warn('Contêiner de catálogo #catalog-container não encontrado.');
  }
}

// Função para configurar os event listeners da página do carrinho
function setupCartPage() {
  renderCartTable(); // Garante que a tabela do carrinho seja renderizada ao carregar a página

  const clearCartButton = document.getElementById('clear-cart-btn');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  const sendWhatsappButton = document.getElementById('send-whatsapp-btn');
  if (sendWhatsappButton) {
    sendWhatsappButton.addEventListener('click', sendOrderViaWhatsApp);
  }
}


// Função para carregar páginas dinamicamente
function carregarPagina(pagina) {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      const conteudoElement = document.getElementById('conteudo');
      if (conteudoElement) {
        conteudoElement.innerHTML = html;

        // Chamadas de setup específicas para cada página carregada
        if (pagina === 'cadastro.html') {
          setupCadastroFormListeners();
        } else if (pagina === 'catalogo.html') {
          setupCatalogPage();
        } else if (pagina === 'carrinho.html') {
          setupCartPage();
        }
        // Adicione outras páginas e suas funções de setup aqui, se houver
      } else {
        console.warn('Elemento #conteudo não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar página:', error));
}

// DOMContentLoaded é para o conteúdo INICIAL da página (index.html)
document.addEventListener('DOMContentLoaded', function () {
  // Carrega cabeçalho e rodapé imediatamente
  incluirCabecalhoRodape();

  // Carrega o catálogo como página inicial
  carregarPagina('catalogo.html');
});


// ===========================================
// NOVAS FUNÇÕES PARA O FORMULÁRIO DE AVALIAÇÃO DO PROJETO FINAL
// ===========================================

function setupProjectEvaluationForm() {
  const form = document.getElementById('project-evaluation-form');
  if (!form) {
    console.warn('Formulário de avaliação do projeto final não encontrado.');
    return;
  }

  const scoreInputs = form.querySelectorAll('input[type="range"]');
  const scoreOutputs = form.querySelectorAll('.score-value');
  const finalAverageScoreDisplay = document.getElementById('final-average-score');

  // Função para atualizar o valor exibido ao lado da régua
  function updateScoreDisplay(input, output) {
    output.textContent = input.value;
    calculateFinalAverage();
  }

  // Função para calcular e exibir a média final
  function calculateFinalAverage() {
    let totalScore = 0;
    scoreInputs.forEach(input => {
      totalScore += parseInt(input.value);
    });
    const average = scoreInputs.length > 0 ? (totalScore / scoreInputs.length).toFixed(2) : '0.00';
    finalAverageScoreDisplay.textContent = average;
  }

  // Adiciona event listeners para cada régua de pontuação
  scoreInputs.forEach((input, index) => {
    // Atualiza o display ao mover a régua
    input.addEventListener('input', () => updateScoreDisplay(input, scoreOutputs[index]));
    // Atualiza o display e a média ao carregar (se houver valores pré-definidos)
    updateScoreDisplay(input, scoreOutputs[index]); // Para exibir o valor inicial (0)
  });

  // Event listener para o envio do formulário (WhatsApp)
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    let message = "Avaliação do Projeto Final:\n\n";
    let totalScoreForWhatsapp = 0;

    const criteria = [
      "1. Título e Descrição da Página",
      "2. Estrutura dos Produtos (Imagem, Nome, Descrição)",
      "3. Uso de HTML Semântico e Navegação",
      "4. Tabela de Preços ou Funcionalidade Equivalente",
      "5. Formulário de Cadastro",
      "6. Otimização para SEO e Acessibilidade",
      "7. Estilização e Responsividade",
      "8. Qualidade e Estrutura do Código"
    ];

    scoreInputs.forEach((input, index) => {
      const score = input.value;
      const commentId = input.id.replace('_score', '_comment');
      const commentElement = document.getElementById(commentId);
      const comment = commentElement ? commentElement.value.trim() : "Nenhum comentário.";

      totalScoreForWhatsapp += parseInt(score);

      message += `${criteria[index]}:\n`;
      message += `   Pontuação: ${score}/100\n`;
      message += `   Comentários: ${comment || "Nenhum."}\n\n`; // Adiciona "Nenhum" se o comentário estiver vazio
    });

    const finalAverage = (totalScoreForWhatsapp / criteria.length).toFixed(2);
    message += `Média Final do Projeto: ${finalAverage}\n\n`;
    message += "Avaliação enviada via formulário digital.";

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5511976561347"; // **Mude para o seu número de WhatsApp**

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  });

  // Event listener para o botão de limpar formulário
  form.addEventListener('reset', function () {
    // Delay para permitir que o reset padrão do input[type="range"] ocorra
    setTimeout(() => {
      scoreInputs.forEach((input, index) => {
        updateScoreDisplay(input, scoreOutputs[index]);
      });
      calculateFinalAverage();
    }, 50); // Pequeno atraso para garantir que os valores padrão sejam carregados antes de recalcular
  });

  // Calcula a média inicial ao carregar o formulário
  calculateFinalAverage();
}

// ... (Resto do seu include.js, incluindo carregarPagina e DOMContentLoaded) ...

// **Atualize a função carregarPagina()**
// Adicione a nova condição para o formulário de avaliação do projeto final
function carregarPagina(pagina) {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      const conteudoElement = document.getElementById('conteudo');
      if (conteudoElement) {
        conteudoElement.innerHTML = html;

        // Chamadas de setup específicas para cada página carregada
        if (pagina === 'cadastro.html') {
          setupCadastroFormListeners();
        } else if (pagina === 'catalogo.html') {
          setupCatalogPage();
        } else if (pagina === 'carrinho.html') {
          setupCartPage();
        } else if (pagina === 'avaliacao.html') { // <--- Adicione esta linha
          setupProjectEvaluationForm(); // <--- E esta linha
        }
        // Adicione outras páginas e suas funções de setup aqui, se houver
      } else {
        console.warn('Elemento #conteudo não encontrado.');
      }
    })
    .catch(error => console.error('Erro ao carregar página:', error));
}
