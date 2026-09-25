console.log("script loaded");

const confirmModal = document.querySelector('#confirm-modal')
const modalForm = document.querySelector('#modal-form')
const modalCancelBtn = document.querySelector('#modal-cancel')

const dangerBtns = document.querySelectorAll('.required-password')

dangerBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        modalForm.action = btn.dataset.action 
        console.log(modalForm.action);
        confirmModal.showModal()
    })
})

modalCancelBtn.addEventListener('click', ()=> {
    confirmModal.close()
})

