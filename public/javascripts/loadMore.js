$(window).scroll(() => {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        $.ajax({
            url: '/getNext',
            type: 'POST',
            success: (output) => {
                output['posts'].forEach((item) => {
                    $('.container').append(getData(item));
                    $('#loading').show();
                })
            },
            error: (err) => {
                console.log('Σφάλμα κατά την λήψη δεδομένων', "Παρακαλώ δοκιμάστε αργότερα.", 'error');
            }
        });
    }
});

getData = (item) => {
    // Read more doesn't work with next batch of posts if its not placed here
    $(document).ready(function () {
        $(".read-more").shorten({
            "showChars": 1100,
            "moreText": "Περισσότερα",
            "lessText": "Λιγότερα"
        });
    });
    let date = new Date(item.thread.published);
    return '<div class="col-md-6 col-md-offset-6 blogShort">' +
        '<a class="hover_style" href="' + item.thread.url + '" target="_blank">' +
        '<h1>' + item.thread.title_full + '</h1>' +
        '<div class="center-cropped">' +
        '<img src="' + item.thread.main_image + '" alt="post img"' +
        'class="img-responsive img-thumbnail"' +
        'onError="this.onerror=null;this.src=\'https://users.it.teithe.gr/~it144252/photo-not-available.png\';">' +
        '</div>' +
        '</a>' +
        '<article class="article-body">' +
        '<p class="read-more">' + item.text + '</p>' +
        '</article>' +
        '<em class="pull-left">' +
        'Πηγή: ' +
        '<a href="http://' + item.thread.site_full + '>" target="_blank">' + item.thread.site_full + '</a>' +
        '</em>' +
        '<em class="pull-right">' + date.toLocaleString() + '</em>' +
        '</div>'
};