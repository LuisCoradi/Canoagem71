/* Dropdown pesquisa */
//////////////////////////////////////////////////////////////
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
} 

//////////////////////////////////////////////////////////////

//carrosel
//////////////////////////////////////////////////////////////
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 


//adicionar postagem
document.addEventListener("DOMContentLoaded", function () {
  function adicionarPostagem() {
    const postagemTexto = document.getElementById("postagem").value;
    if (postagemTexto.trim() !== "") {
      // Cria o elemento div principal com a classe "post-profile"
      const postagemDiv = document.createElement("div");
      postagemDiv.classList.add("post-profile");

      // Cria o elemento div com a classe "post-left-profile"
      const leftProfileDiv = document.createElement("div");
      leftProfileDiv.classList.add("post-left-profile");

      // Cria o elemento "a" com um link vazio (href)
      const linkElement = document.createElement("a");
      leftProfileDiv.appendChild(linkElement);

      // Cria a imagem com a classe "post-picture-profile" e atributo src
      const imgElement = document.createElement("img");
      imgElement.classList.add("post-picture-profile");
      imgElement.src = "conta1.jpg";
      linkElement.appendChild(imgElement);

      // Cria o elemento div com a classe "post-text-profile"
      const textProfileDiv = document.createElement("div");
      textProfileDiv.classList.add("post-text-profile");

      // Cria o elemento "p" com a classe "profile-bio-profile" e texto da postagem
      const pElement = document.createElement("p");
      pElement.classList.add("profile-bio-profile");
      pElement.textContent = postagemTexto;
      textProfileDiv.appendChild(pElement);

      // Adiciona todos os elementos criados à seção de postagens
      postagemDiv.appendChild(leftProfileDiv);
      postagemDiv.appendChild(textProfileDiv);
      document.querySelector(".postagens").appendChild(postagemDiv);

      document.getElementById("postagem").value = "";
    }
  }

  document.getElementById("postar").addEventListener("click", adicionarPostagem);
});

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.left = "0"; // Alterado para abrir completamente
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.left = "-250px"; // Alterado para fechar completamente
  document.getElementById("main").style.marginLeft = "0";
}