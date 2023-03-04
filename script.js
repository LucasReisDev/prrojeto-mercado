const products = [
  { name: "Produto 1", category: "Categoria 1", price: 10.00, quantity:5 },
  { name: "Produto 2", category: "Categoria 2", price: 20.00, quantity:5 },
  { name: "Produto 3", category: "Categoria 1", price: 15.00, quantity:5 }
];

const productContainer = document.querySelector('.product-container');
const productList = document.querySelector('.product-list');
const addProductButton = document.querySelector('.add-product');
const modalContainer = document.querySelector('.modal-container');
const modalForm = document.querySelector('.modal-form');
const modalNameInput = document.querySelector('#modal-name'); 
const modalCategoryInput = document.querySelector('#modal-category');
const modalPriceInput = document.querySelector('#modal-price');
const closeModalButton = document.querySelector('.close-modal');

let deleteProductButtons;

// Função para renderizar a lista de produtos
function renderProductList() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - ${product.category} - R$ ${product.price} - ${product.quantity}
      <button class="delete-product" data-index="${index}">Excluir</button>`;
    productList.appendChild(li);
  });
  addDeleteProductEventListener();
} 

// Função para adicionar o evento de excluir produto
function addDeleteProductEventListener() {
  deleteProductButtons = document.querySelectorAll('.delete-product');
  deleteProductButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      products.splice(index, 1);
      renderProductList();
    });
  });
}


// Função para abrir o modal de cadastro de produto
function openModal() {
  modalContainer.classList.add('open');
}

// Função para fechar o modal de cadastro de produto
function closeModal() {
  modalContainer.classList.remove('open');
}

// Adiciona evento de clique no botão "Cadastrar Produto"
addProductButton.addEventListener('click', () => {
  openModal();
});

// Adiciona evento de clique no botão "Cancelar" do modal
closeModalButton.addEventListener('click', () => {
  closeModal();
});

// Adiciona evento de submit no formulário do modal
modalForm.addEventListener('submit', (event) => {
  event.preventDefault(); // previne o comportamento padrão de recarregar a página
  const name = modalNameInput.value;
  const category = modalCategoryInput.value;
  const price = parseFloat(modalPriceInput.value);
  const newProduct = { name, category, price };
  products.push(newProduct);
  closeModal();
  renderProductList();
});

function buscarProduto() {
  var input = document.getElementById("buscar-produto");
  var filter = input.value.toUpperCase();
  var table = document.getElementsByTagName("table")[0];
  var tr = table.getElementsByTagName("tr");
  
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

renderProductList();
