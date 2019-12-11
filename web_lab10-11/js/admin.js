var useLocalStorage = false;
var allNews = [];

function isOnline() {
    return window.navigator.onLine;
}

document.getElementById('addNews').onclick = function () {
    var title = document.getElementById('titleBody');
    var text = document.getElementById('textBody');

    title.style.border = '1px solid black';
    text.style.border = '1px solid black';

    if (title.value === '' && text.value === '') {
        title.style.border = '2px solid red';
        text.style.border = '2px solid red';
        alert('Напишіть заголовок та текст до новини!');
        return false;
    } else if (title.value === '' && text.value !== '') {
        title.style.border = '2px solid red';
        text.style.border = '1px solid green';
        alert('Напишіть заголовок до новини!');
        return false;
    } else if (title.value !== '' && text.value === '') {
        title.style.border = '1px solid green';
        text.style.border = '2px solid red';
        alert('Напишіть текст до новини!');
        return false;
    } else {
        title.style.border = '1px solid green';
        text.style.border = '1px solid green';
        if(isOnline() === true) {
            storage.get("news", (news) => {
                if (news) {
                    allNews = news;
                }
                sendAllNewsToServer(allNews);
                storage.remove("news");
                allNews = [];
            });
            if (isOnline()) {
                alert("Successfully sent to server");
                sendNewsToServer(title.value, text.value);
            }
        }
    }
};

function sendNewsToServer(title, body) {
    fetch("/all_news", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({title: title, body: body}),
    })
        .catch(error => console.error("Cannot fetch data:", error));
}

function sendAllNewsToServer(allNews) {
    for (let i = 0; i < allNews.length; i++) {
        sendNewsToServer(allNews[i].imgSrc, allNews[i].title, allNews[i].body)
    }
}

var loadFile = function (event) {
    var img = document.getElementById('output');
    img.src = URL.createObjectURL(event.target.files[0]);
};


