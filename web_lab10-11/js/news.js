var useLocalStorage = false;
var allNews = [];

function isOnline() {
    return window.navigator.onLine;
}

if (isOnline() === true) {
        storage.get("news", (news) => {
        if (news) {
            allNews = news;
        }
        sendAllNewsToServer(allNews);
        showAllNews(allNews);
        storage.remove("news");
        allNews = [];
    });
    if (isOnline()) {
        sendAllNewsToServer(allNews);
        storage.remove("news");
        allNews = [];

        let req = new XMLHttpRequest();
        req.open("GET", "/all_news", true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status !== 200) {
                    console.log("Something goes wrong!");
                }
                else {
                    let data = JSON.parse(req.responseText);
                    showAllNews(data);
                }
            }
        };
    }
}

function pasteNew(title, text) {
    const div = document.createElement('div');
    div.className = "col-md-4";
    div.innerHTML = `

                            <img src="imagine/OE_news_1.png" height="250" width="250" alt="imagine">
                            <h1>` + title + `</h1>
                            <p>` + text + `</p>

                            `;
    document.getElementById('addNew').appendChild(div);
}

function showAllNews(allNews) {
    for (let i = 0; i < allNews.length; i++) {
        pasteNew(allNews[i].title, allNews[i].text);
    }
}

function sendNewsToServer(title, text) {
    fetch("/all_news", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({title: title, text: text}),
    })
        .catch(error => console.error("Cannot fetch data:", error));
}

function sendAllNewsToServer(allNews) {
    for (let i = 0; i < allNews.length; i++) {
        sendNewsToServer(allNews[i].title, allNews[i].text)
    }
}