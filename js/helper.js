/*
 * helper.js
 * 
 * Helper file, you probably will not need this one.
 * Must be loaded as the very last js file, be careful.
 *
 */
$(document).ready(function(){
	$('#navigation a, #markup a').css({
		"cursor": 'pointer',
		"text-decoration": 'none'
	});
	if (settings.showInfo) {
        $('footer').append("<p id=\"showInfo\" class=\"unimportant\" style=\"text-align:center;\"></p>");
        $("footer p").eq(0).append("<p id=\"githubInfo\" class=\"unimportant\" style=\"text-align:center;\"></p>");
		showInfo();
		setInterval("showInfo()",60000);
	}
    var do_replace_audio = function(element) {
    	var element = $(element);
        element.find('audio').mediaelementplayer({
                plugins:['flash','silverlight'],
                pluginPath:'/js/mediaelement/'
        });
        element.find('video').mediaelementplayer();
    };

    var do_preview_webm = function(element) {
        $(element).find('video').attr('preload', 'metadata')
    };

    var do_add_shorten = function(element) {
    	var element = $(element);
        element.find("div.post.reply div.body").shorten({
            moreText: 'Весь текст',
            lessText: 'Скрыть',
            showChars: (settings.hideLongTextNum),
        });
    };

    do_replace_audio(document);
    if (settings.previewWebm)
        do_preview_webm(document);
    if (settings.hideLongText)
        do_add_shorten(document);
	
	$(document).bind('new_post', function(e, post) {
	//post is implied to a jquery array of elements
        do_replace_audio(post);
        if (settings.hideLongText)
            do_add_shorten(post);
        if (settings.previewWebm)
            do_preview_webm(post);
	});

    if (device_type == "mobile") {
        $("#navigation .fa").addClass("fa-2x");
        $("#navigation .fa").click(function() {
            $("#navigation .fa").addClass("fa-2x");
        });
    }
});

function showInfo() {
    $.ajax({
        type: 'GET',
        url: "/testcount.json",
        dataType: 'json',
        success: function(data){
            ajaxInfo = data;
            $('#showInfo').text("Скорость борды: " + JSON.parse(ajaxInfo.speed) + " п/час | Онлайн: " + JSON.parse(ajaxInfo.online));
        }
    });
    // well thank you Github
    $.ajax({
        type: 'GET',
        url: "https://api.github.com/repos/twiforce/fukuro/contributors?anon=1",
        dataType: 'json',
        success: function(data){
            githubContribInfo = data;
        }
    });
    $.ajax({
        type: 'GET',
        url: "https://api.github.com/repos/twiforce/fukuro/commits",
        dataType: 'json',
        success: function(data){
            githubInfo = data;
            // damn son where did you find this
            var ii = 0;
            var totalCommits = 0;
            while (ii < githubContribInfo.length) {
                totalCommits = totalCommits + githubContribInfo[ii]["contributions"];
                ii++;
            }
            $('#githubInfo').html("Последний коммит #" + totalCommits + " \"<a href=\""
                + githubInfo[0]["html_url"] + "\" target=_blank>" + githubInfo[0]["commit"]["message"]
                + "</a>\" отправил <a href=\"" + githubInfo[0]["author"]["html_url"] +"\"> " + githubInfo[0]["author"]["login"]
                + "</a> " + moment(githubInfo[0]["commit"]["author"]["date"]).fromNow() + ".")
        }
    });
}
