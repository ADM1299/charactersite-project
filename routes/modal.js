function openModal() {
    document.querySelector('.modal-container').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.modal-container').style.display = 'none';
}

document.querySelector('#characterDetailsModal .close').addEventListener('click', closeModal);

var currentFavoriteIndex = 0;

function showNextFavorite() {
    var request = new XMLHttpRequest();
    request.open('GET', '/favorites/' + currentFavoriteIndex, true);
    request.onload = function () {
        if (request.status == "200") {
            var character = JSON.parse(request.responseText);
            if (!character) return;

            var modal = document.getElementById('characterDetailsModal');
            modal.querySelector('#characterName').textContent = character.name;
            modal.querySelector('#characterImage').src = character.fullSizeImage;
            modal.querySelector('#characterDescription').textContent = character.summary.replace(/\\n/g, '\n');

            currentFavoriteIndex++;
        } else {
            console.error("Request failed with status: " + request.status);
        }
    }
    request.send(null);
}

document.querySelector('#characterDetailsModal .btn-next-favorite').addEventListener('click', showNextFavorite)