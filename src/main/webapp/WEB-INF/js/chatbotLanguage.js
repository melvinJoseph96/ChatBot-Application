function getFullLang(lang) {

    $.ajaxSetup({
        async: false
    });

    var toReturn = lang;
    $.getJSON('js/langcodes.json', function (json) {
        for (var i in json) {
            if (lang === json[i].code) {
                toReturn = json[i].name;
            }
        }
    });

    $.ajaxSetup({
        async: true
    });

    return toReturn;
}

function getLangCode(lang) {

    $.ajaxSetup({
        async: false
    });

    var toReturn = "notfound";
    $.getJSON('js/langcodes.json', function (json) {
        for (var i in json) {
            if (lang === json[i].name.trim().toLowerCase()) {
                toReturn = json[i].code;
            }
        }
    });

    $.ajaxSetup({
        async: true
    });

    return toReturn;
}

function translate(query, source, target) {
    var toReturn = query;
    $.ajaxSetup({
        async: false
    });
    var data = [query,source,target];
    $.ajax({
        type: "POST",
        url: "/translate",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            console.log("ajax code was successful: /translate connection therefore successful");
            toReturn = response;
            console.log("outcome - value of 'toReturn': " + toReturn);
        },
        error: function(){
            console.log("ERROR: failed to connect to /translate");
        }
    });
    $.ajaxSetup({
        async: true
    });
    return toReturn;
}