  <?php
    include("config.php");
    ?>
  <div class="app-view">
    <div class="app-container">
        <form action="?page=salvar-item" method="POST" class="form-col">
          <input type="hidden" name="acao" value="cadastrar" />
          <input type="hidden" name="owner_id" value="<?php echo $_SESSION['id']; ?>" />
          <div class="row-categ-cad">
              <h3 class=" ">
                <svg xmlns="http://www.w3.org/2000/svg" style="margin: 4px 0 -4px 0;" width="19" height="21" viewBox="0 0 19 21" fill="none">
                    <path d="M13.5135 9.95946C13.5135 9.51168 13.1505 9.14865 12.7027 9.14865C12.2549 9.14865 11.8919 9.51168 11.8919 9.95946H13.5135ZM7.02703 9.95946C7.02703 9.51168 6.66401 9.14865 6.21622 9.14865C5.76842 9.14865 5.40541 9.51168 5.40541 9.95946H7.02703ZM18.1081 5.63514H18.9189C18.9189 5.50927 18.8896 5.38511 18.8333 5.27253L18.1081 5.63514ZM15.9459 1.31081L16.6711 0.948205C16.5338 0.673514 16.2531 0.5 15.9459 0.5V1.31081ZM2.97297 1.31081V0.5C2.66586 0.5 2.3851 0.673514 2.24776 0.948205L2.97297 1.31081ZM0.810811 5.63514L0.0855999 5.27253C0.0293083 5.38511 0 5.50927 0 5.63514H0.810811ZM9.45946 4.82432C9.01168 4.82432 8.64865 5.18734 8.64865 5.63514C8.64865 6.08293 9.01168 6.44595 9.45946 6.44595V4.82432ZM17.2973 12.1216C17.2973 12.5694 17.6603 12.9324 18.1081 12.9324C18.5559 12.9324 18.9189 12.5694 18.9189 12.1216H17.2973ZM18.9189 17.527C18.9189 17.0792 18.5559 16.7162 18.1081 16.7162C17.6603 16.7162 17.2973 17.0792 17.2973 17.527H18.9189ZM4.05405 6.44595C4.50185 6.44595 4.86487 6.08293 4.86487 5.63514C4.86487 5.18734 4.50185 4.82432 4.05405 4.82432V6.44595ZM11.8919 9.95946C11.8919 11.3028 10.8028 12.3919 9.45946 12.3919V14.0135C11.6985 14.0135 13.5135 12.1985 13.5135 9.95946H11.8919ZM9.45946 12.3919C8.11611 12.3919 7.02703 11.3028 7.02703 9.95946H5.40541C5.40541 12.1985 7.22047 14.0135 9.45946 14.0135V12.3919ZM18.8333 5.27253L16.6711 0.948205L15.2208 1.67342L17.3829 5.99774L18.8333 5.27253ZM15.9459 0.5H2.97297V2.12162H15.9459V0.5ZM2.24776 0.948205L0.0855999 5.27253L1.53602 5.99774L3.69818 1.67342L2.24776 0.948205ZM9.45946 6.44595H18.1081V4.82432H9.45946V6.44595ZM17.2973 5.63514V12.1216H18.9189V5.63514H17.2973ZM15.9459 18.8784H2.97297V20.5H15.9459V18.8784ZM1.62162 17.527V5.63514H0V17.527H1.62162ZM2.97297 18.8784C2.22664 18.8784 1.62162 18.2734 1.62162 17.527H0C0 19.169 1.33105 20.5 2.97297 20.5V18.8784ZM17.2973 17.527C17.2973 18.2734 16.6923 18.8784 15.9459 18.8784V20.5C17.5879 20.5 18.9189 19.169 18.9189 17.527H17.2973ZM0.810811 6.44595H4.05405V4.82432H0.810811V6.44595Z" fill="#4739A3"/>
                </svg>
                Coleção
              </h3>
              <div id="categ-flag">
                <p>selecione uma coleção</p>
              </div>
          </div>
          <div class="steps" id="steps">
              <div class="step">
                <h2 class="normal">À qual <b>coleção</b> pertence o seu item?</h2>
                <br />
                <div class="categ-form">
                    <?php
                      $sql = "SELECT collections.*, categorias.emoji_cat 
                              FROM collections
                              INNER JOIN categorias ON collections.categoria = categorias.cat_id";
                      
                      $result = $mysqli->query($sql);
                      
                      if ($result->num_rows > 0) {
                      while ($row = $result->fetch_assoc()) {
                      echo '<input class="boxed-check-input" type="radio" name="col_id" value="' . $row['id'] . '" id="' . $row['id'] . '" />';
                      echo '<label class="input" for="'. $row['id'] . '">' . $row['emoji_cat'] . " " . $row['col_name'] . '</label>';
                      echo '<br>';
                      }
                      } else {
                      echo "Nenhuma coleção foi encontrada.";
                      }
                      ?>
                    <p>
                      Nenhuma das opções são compatíveis com seu item? Crie uma nova coleção.
                    </p>
                    <a class="label" href="">Criar nova Coleção</a>
                </div>
              </div>
              <div class="step">
                <h2 class="normal">Qual o nome do item que vamos cadastrar?</h2>
                <br />
                <input type="text" placeholder="'20 TOYOTA GR SUPRA" name="item_name" id="item_name"/>
              </div>
              <div class="step">
                <h2 class="normal" id="item_name_fill">Qual a série do item que vamos cadastrar?</h2>
                <br />
                <input type="text" placeholder="NIGHTBURNERZ" name="item_series" id="item_series"/>
              </div>
              <div class="step">
                <h2 class="normal" id="item_series_y">E de qual ano é essa série?</h2>
                <br />
                <input type="number" min="1900" max="2099" step="1" value="2023" name="item_series_year" id="item_series_year"/>
              </div>
              <div class="step">
                <h2 class="normal" id="item_img_text">Vamos adicionar uma imagem para esse item!</h2>
                <br />
                <label for="item_img" class="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 13V17C21 18.1046 20.1046 19 19 19H9M5 19C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7H7.5C8.05228 7 8.5 6.55228 8.5 6C8.5 5.44772 8.94772 5 9.5 5H14.5C15.0523 5 15.5 5.44772 15.5 6C15.5 6.55228 15.9477 7 16.5 7H19C20.1046 7 21 7.89543 21 9M9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
</svg>Adicione uma imagem</label>
                <input type="file" style="display: none;" name="item_img" id="item_img" accept="image/*" />
                <br>
                <img src="#" id="item_img_fill">
              </div>
              <input type="hidden" name="item_img_url" id="item_img_url" value="" />
              <div class="step">
                <h2 class="normal" id="valorCampoB">Crie uma descrição para o seu novo item!</h2>
                <input type="text" name="item_desc" />
                <input type="submit" value="Enviar" />
              </div>
        </form>
        </div>
        <div class="go-back">
          <a class="fake-button" id="botaoVoltar" style="opacity:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 12L4 12L10 18M7 9L10 6" stroke="#001A72" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Voltar
          </a>
          <a class="fake-button" id="botaoAvancar">
              Avançar 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L20 12L14.0001 18M17 9L14 6" stroke="#001A72" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </a>
        </div>
    </div>
    
  </div>
  <script>
        item_img.onchange = evt => {
  const [file] = item_img.files
  if (file) {
    item_img_fill.src = URL.createObjectURL(file)
  }
}
  </script>
  <script>
    // ... (seu código JavaScript existente) ...
    
    // Obtém o elemento do campo de upload de imagem
    const itemImgUpload = document.getElementById('item_img');
    // Campos ocultos para armazenar URLs de imagens
    const itemImgUrl = document.getElementById('item_img_url');
    const itemImgUrl2 = document.getElementById('item_img_url_2');
    const itemImgUrl3 = document.getElementById('item_img_url_3');
    
    // Adiciona um ouvinte de evento ao campo de upload de imagem
    itemImgUpload.addEventListener('change', async function() {
    const formData = new FormData();
    formData.append('image', itemImgUpload.files[0]);
    
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?expiration=0&key=7f0aa7ff20e5bb5f6124a1ee4765d7a9', {
        method: 'POST',
        body: formData
      });
    
      const data = await response.json();
      if (data.data && data.data.url) {
        itemImgUrl.value = data.data.url;
        console.log('URL da imagem:', data.data.url);
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
    });
    
    // ... (seu código JavaScript existente) ...
    
  </script>
  <script>
    // Obtém o elemento de input de arquivo e o elemento de div para as prévias de imagem
    const itemImgInput = document.getElementById('item_img_input');
    const itemImgPreviews = document.getElementById('item_img_previews');
    
    // Adiciona um ouvinte de evento ao input de arquivo
    itemImgInput.addEventListener('change', function(event) {
        itemImgPreviews.innerHTML = ''; // Limpa as prévias existentes
    
        const files = event.target.files; // Obtém os arquivos selecionados
    
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                // Cria um objeto URL para a prévia da imagem
                const imageURL = URL.createObjectURL(file);
    
                // Cria um elemento de imagem para exibir a prévia
                const imgElement = document.createElement('img');
                imgElement.src = imageURL;
                imgElement.alt = 'Preview';
                imgElement.classList.add('preview-image');
    
                // Adiciona o elemento de imagem à div de prévias
                itemImgPreviews.appendChild(imgElement);
            }
        }
    });
    
  </script>
  <script>
    // Obtém o elemento do campo de entrada e o elemento de parágrafo onde exibiremos o valor
    const itemName = document.getElementById('item_name');
    const itemSeries = document.getElementById('item_series');
    const valorCampoName = document.getElementById('item_name_fill');
    const valorCampoY = document.getElementById('item_series_y');
    
    // Adiciona um ouvinte de evento ao campo de entrada
    itemName.addEventListener('input', function() {
    const valor = itemName.value; // Obtém o valor do campo de entrada
    valorCampoName.textContent = `E qual a série de ${valor}?`; // Atualiza o elemento de parágrafo
    });
    
    itemSeries.addEventListener('input', function(){
    const serie = itemSeries.value; //Obtem a serie do item
    valorCampoY.textContent = `E qual é o ano de ${serie}?`; // Atualiza o elemento de parágrafo
    });
    
  </script>
  <script>
    // Obtém a div com a classe "steps"
    const stepsDiv = document.getElementById('steps');
    // Obtém o botão de voltar
    const botaoVoltar = document.getElementById('botaoVoltar');
    const botaoAvancar = document.getElementById('botaoAvancar');
    
    // Função para avançar o scroll da div
    function avancarScroll() {
      // stepsDiv.style.transform = "translateX(100%)";
      stepsDiv.scrollLeft += stepsDiv.clientWidth; // Avança o scroll em 100% da largura visível
    
    }
    
    // Função para retroceder o scroll da div
    function retrocederScroll() {
      stepsDiv.scrollLeft -= stepsDiv.clientWidth; // Retrocede o scroll em 100% da largura visível
    }
    
    // Função para verificar e ajustar a visibilidade do botão de voltar
    function verificarVisibilidadeBotao() {
      if (stepsDiv.scrollLeft > 100) {
        botaoVoltar.style.opacity = '1';
      } else {
        botaoVoltar.style.opacity = '0';
      }
    }
    
    function verificarVisiAvan(){
        if (stepsDiv.scrollLeft > 1800) {
            botaoAvancar.style.opacity = '0';
        } else {
        botaoAvancar.style.opacity = '1';
      }
    }
    
    
    // Adiciona evento de scroll à div steps
    stepsDiv.addEventListener('scroll', verificarVisibilidadeBotao);
    stepsDiv.addEventListener('scroll', verificarVisiAvan);
    
    // Exemplo de evento que chama a função de avançar o scroll
    document.getElementById('botaoAvancar').addEventListener('click', function() {
      avancarScroll();
    });
    
    // Exemplo de evento que chama a função de retroceder o scroll
    document.getElementById('botaoVoltar').addEventListener('click', function() {
      retrocederScroll();
    });
    
  </script>
  <script>
    // Obtém todos os elementos dos inputs de radio
    const inputsRadio = document.querySelectorAll('.boxed-check-input');
    
    // Obtém o elemento onde você deseja mostrar os dados selecionados
    const categFlag = document.getElementById('categ-flag');
    
    // Adiciona um ouvinte de evento para cada input de radio
    inputsRadio.forEach(input => {
      input.addEventListener('change', function() {
        // Encontra o label correspondente ao input selecionado
        const labelSelecionado = document.querySelector(`label[for="${input.id}"]`);
    
        // Obtém o valor e o texto do label selecionado
        const textoSelecionado = labelSelecionado.textContent;
    
        // Atualiza o conteúdo da div categ-flag com os dados selecionados
        categFlag.innerHTML = `<p>${textoSelecionado}</p>`;
      });
    });
    
  </script>