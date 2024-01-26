(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    closeModalBtnSub: document.querySelector("[data-modal-submit]"),
    modal: document.querySelector("[data-modal]"),
    btnBuyNow: document.querySelector("[data-buy-open]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.btnBuyNow.addEventListener("click", toggleModal);
  refs.closeModalBtnSub.addEventListener("click", cleanCart);

  function toggleModal() {
    document.body.classList.toggle("backdrop");
    refs.modal.classList.toggle("is-hidden");
  }

  function cleanCart() {
    refs.modal.classList.toggle("is-hidden");
    localStorage.removeItem("data");
    const numberItemsCart = document.querySelector(".header_cart-number");
    numberItemsCart.innerHTML = " ";
  }
})();
