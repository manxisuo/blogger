$(function() {
    // $('input#search').val(loadKeyword());

    $('input#search').on('keydown', function(e) {
        if (13 == e.keyCode) {
            var val = $(this).val();
            // saveKeyword(val);
            if ($.trim(val) == '') {
                $('.content-0').show();
                $('.content-1').hide();
            }
            else {
                /**
                var keyword = encodeURI(val + ' site:http://manxisuo.tk');
                addScriptTag('http://ajax.googleapis.com/ajax/services/search/web'
                    + '?v=1.0&q=' + keyword + '&callback=result');
                **/
                var keyword = encodeURI(val);
                addScriptTag('https://www.googleapis.com/customsearch/v1'
                    + '?q=' + keyword
                    + '&key=AIzaSyBL9SgxQLA1uhrlSY-putK83P7aJSWE-bo'
                    + '&cx=007317282522277699878:rmxbp5s6gam'
                    + '&callback=result');
            }
        }
    });
});

function addScriptTag(src){
    var script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.setAttribute("class", "tmp-script");
    script.src = src;
    document.body.appendChild(script);
}

function result(data) {
    $('.content-0').hide();
    var searchContent = $('.content-1');
    searchContent.html('');
    searchContent.show();
    
    var results = data.items;
    var length = results ? results.length : 0;
    
    // 头部
    var header = $('<div class="page-header" />');
    var h2 = $('<h1 />')
        .append('搜索结果: ')
        .append($('<small />').text(length + '条'));
        
    header.append(h2);
    searchContent.append(header);
    
    // 结果列表
    var ul = $('<ul class="posts" />');
    
    for (i in results) {
        var result = results[i];
        var title = result.title;
        var content = result.snippet;
        var url = result.link;
        
        // 每条结果
        var li = $('<li />');
        var a = $('<a />').attr('href', url).html(title);
        li.append(a);;
        var p = $('<div class="post-excerpt" />').html(content);
        
        ul.append(li).append(p);
    }
    
    searchContent.append(ul);
    
    $('.tmp-script').remove();
}

/**
function result(data) {
    $('.content-0').hide();
    var searchContent = $('.content-1');
    searchContent.html('');
    searchContent.show();
    
    var resp = data.responseData;
    var results = resp.results;
    
    // 头部
    var header = $('<div class="page-header" />');
    var h2 = $('<h1 />')
        .append('搜索结果: ')
        .append($('<small />').text(results.length + '条'));
        
    header.append(h2);
    searchContent.append(header);
    
    // 结果列表
    var ul = $('<ul class="posts" />');
    
    for (i in results) {
        var result = results[i];
        var title = result.title;
        var content = result.content;
        var url = result.url;
        
        // 每条结果
        var li = $('<li />');
        var a = $('<a />').attr('href', url).html(title);
        li.append(a);;
        var p = $('<div class="post-excerpt" />').html(content);
        
        ul.append(li).append(p);
    }
    
    searchContent.append(ul);
    
    $('.tmp-script').remove();
}
**/

function saveKeyword(keyword) {
    if (localStorage) {
        localStorage['keyword'] = keyword;
    }
}

function loadKeyword() {
    if (localStorage) {
        return localStorage['keyword'];
    }
    return "";
}







