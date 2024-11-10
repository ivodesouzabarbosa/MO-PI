const modal = document.querySelector('.modal-container')

function openModal(){
    modal.classList.add('active')
    document.querySelector('.btnOpenModal').style.display = 'none';
}

function closeModal() {
    modal.classList.remove('active')
    document.querySelector('.btnOpenModal').style.display = 'block';
}