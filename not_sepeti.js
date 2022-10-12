const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSilTamamla);
document.addEventListener("DOMContentLoaded", localStorageOku);

function gorevSilTamamla(e) {
  const tiklanilanEleman = e.target;

  if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
    tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
  }
  if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {
    if (confirm("Emin misiniz")) {
      tiklanilanEleman.parentElement.classList.toggle("kaybol");
      const silinicekGorev =
        tiklanilanEleman.parentElement.children[0].innerText;
      localStorageSil(silinicekGorev);

      tiklanilanEleman.parentElement.addEventListener(
        "transitionend",
        function () {
          tiklanilanEleman.parentElement.remove();
        }
      );
    }
  }
}

function gorevEkle(e) {
  e.preventDefault();

  if (yeniGorev.value.length > 1) {
    gorevItemOlustur(yeniGorev.value);
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = "";
  } else {
    alert("Boş girilmez !");
  }
}

function localStorageKaydet(yeniGorev) {
  let gorevler = localStorageArrayDonustur();

  gorevler.push(yeniGorev);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStorageOku() {
  let gorevler = localStorageArrayDonustur();

  gorevler.forEach(function (gorev) {
    gorevItemOlustur(gorev);
  });
}

function gorevItemOlustur(gorev) {
  //div olusturma
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  //li oluşturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");
  gorevLi.innerHTML = gorev;
  gorevDiv.appendChild(gorevLi);

  //var olan ul ye div ekleme
  gorevListesi.appendChild(gorevDiv);

  //tamalandi butonu ekle
  const gorevTamamBtn = document.createElement("button");
  gorevTamamBtn.classList.add("gorev-btn");
  gorevTamamBtn.classList.add("gorev-btn-tamamlandi");
  gorevTamamBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  gorevDiv.appendChild(gorevTamamBtn);

  //sil butonu ekle
  const gorevSilBtn = document.createElement("button");
  gorevSilBtn.classList.add("gorev-btn");
  gorevSilBtn.classList.add("gorev-btn-sil");
  gorevSilBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  gorevDiv.appendChild(gorevSilBtn);
}

function localStorageSil(gorev) {
  let gorevler = localStorageArrayDonustur();

  const silinecekElemanIndex = gorevler.indexOf(gorev);
  gorevler.splice(silinecekElemanIndex, 1);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStorageArrayDonustur() {
  let gorevler;
  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }
  return gorevler;
}
