var useLocalStorage = false;
var allAppeals = [];

function isOnline() {
    return window.navigator.onLine;
}

window.addEventListener('online', function (event) {
    storage.get("appeals", (appeals) => {
        if (appeals) {
            allAppeals = appeals;
        }
        sendAllNewsToServer(allNews);
        showAllNews(allNews);
        storage.remove("news");
        allNews = [];
    });
    if (isOnline()) {
        sendAllAppealsToServer(allAppeals);
        storage.remove("appeals");
        allAppeals = [];

        let req = new XMLHttpRequest();
        req.open("GET", "/all_appeals", true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status !== 200) {
                    console.log("Something goes wrong!");
                } else {
                    let data = JSON.parse(req.responseText);
                    showAllAppeals(data);
                }
            }
        };
    }
});

document.getElementById('addComment').onclick = function () {
    var comment = document.getElementById('commentBody');
    var author = currentName();
    var time = currentTime();
    var date = currentDate();

    if (useLocalStorage === true) {
        if (isOnline() === false) {
            if (localStorage.getItem('appeal') === null) {
                array = [comment.value, author, time, date];
                console.log(array);
                localStorage.setItem('appeal', JSON.stringify([array]));
            } else {
                array = JSON.parse(localStorage.getItem('appeal'));
                array.push([comment.value, author, time, date]);
                localStorage.removeItem('appeal');
                localStorage.setItem('appeal', JSON.stringify(array));
            }
        }
    }
    if (useLocalStorage === false) {
        if (isOnline() === false) {
            allAppeals.push({author: author, comment: comment.value, date: date, time: time});
            storage.add("appeals", allAppeals);
            alert("Збережено в IndexedDb");
        }
    }
    if (isOnline()) {
        sendAppealToServer(author, comment.value, date, time);
        pasteAppeal(author, comment.value, date, time);
        alert("Successfully sent to server");
    }
};

function pasteAppeal(author, comment, date, time) {
    const div = document.createElement('div');
    div.innerHTML = `
                        <br>
                        <div class="row justify-content-center">
                            <div class="border border-dark rounded" style="margin: 0 7% 4% 0; height: 5%">
                                <p>` + author + ` <br> ` + date + ` <br>` + time + `</p>
                                <p></p>
                                <p></p>
                            </div>
                                <div class="border border-dark rounded col-xs-12 col-sm-12 col-md-8 col-lg-8" style="margin: 0 1% 0 1%">
                                <p>` + comment + `</p>
                            </div>
                        </div>
                        <br>
                        <hr>
                    `;
    document.getElementById('container').append(div);
}

function showAllAppeals(allAppeals) {
    for (let i = 0; i < allAppeals.length; i++) {
        pasteAppeal(allAppeals[i].author, allAppeals[i].comment, allAppeals[i].date, allAppeals[i].time)
    }
}

function sendAppealToServer(author, comment, date, time) {
    fetch("/all_appeals", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({author: author, comment: comment.value, date: date, time: time}),
    })
        .catch(error => console.error("Cannot fetch data:", error));
}

function sendAllAppealsToServer(allAppeals) {
    for (let i = 0; i < allAppeals.length; i++) {
        sendAppealToServer(allAppeals[i].author, allAppeals[i].comment, allAppeals[i].date, allAppeals[i].time)
    }
}

function currentName() {
    return prompt("Введіть своє ім'я:");
}

function currentTime() {
    let now = new Date();
    console.log(now.getHours() + ":" + now.getMinutes());
    return now.getHours() + ":" + now.getMinutes();
}

function currentDate() {
    let now = new Date();
    console.log(now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear());
    return now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
}