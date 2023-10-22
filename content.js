var targetDomain = "alicey.dev";
// var domainPattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
var domainPattern = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;

window.addEventListener("load", function () {
    var links = document.querySelectorAll("a");
    // console.log(links);
    var domains = Array.from(links).map(function (link) {
        var domain = link.href.match(domainPattern);
        return domain ? domain[1] : null;
        // return link.href;
    });
    domains = domains.filter((item) => item !== null); // nullを除外
    domains = [...new Set(domains)]; // 重複を除外
    console.log(domains);

    let res = getUnresolvedDomains(domains);
    console.log(res);

    // links.forEach(function (link) {
    //     if (link.href.includes(targetDomain)) {
    //         link.removeAttribute("href");
    //     }
    // });
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // すべてのa要素を取得
//     var links = document.querySelectorAll("a");
//     console.log("links");
//     console.log(links);

//     if (request.action == "removeHref") {
//         var links = document.querySelectorAll('a[href^="alicey.dev"]');
//         links.forEach(function (link) {
//             link.removeAttribute("href");
//         });
//     }
// });

function getUnresolvedDomains(domains) {
    fetch("http://no-dnsname-chechker.alicey:52412/resolve-dns", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(domains),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response from server:", data);
            // サーバーから返されたJSONを配列に変換
            const receivedArray = Array.isArray(data) ? data : [];
            console.log("Received array:", receivedArray);
        })
        .catch((error) => console.error("Error:", error));
    return receivedArray;
}
