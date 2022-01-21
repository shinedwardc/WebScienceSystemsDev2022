var array = [];
var i = 0;
var counter = 0;


function createArticle(article){
    var li = document.createElement('li');
    var str = "";
    str += '<div class = "card text-white bg-info mb-3 border-dark mb-3">'
    str += '<div class = "card-header bg-success text-white">';
    str += array[i].Title;
    //console.log("array[" + i + "] title: " + array[i].Title);
    str += '</div';
    str += '<hr>'
    str += '<div class = "card-body"></br><a href = ';
    str += array[i].Link;
    //console.log("array[" + i + "] link: " + array[i].Link);
    str += ' class = "btn btn-primary">'
    str += 'Article Link';
    str += '</a>';
    str += '<p class = "card-text">';
    str += array[i].Date;
    //console.log("array[" + i + "] date: " + array[i].Date);
    str += '</p>';
    str += '<p class = "card-text">';
    str += array[i].Description;
    //console.log("array[" + i + "] Des: " + array[i].Description);
    str += '</p>';
    str += '</div>';
    str += '</div>';
    //console.log("i: " + i);
    li.innerHTML = str;
    return li;
}


function Interval(){
    var articles = document.getElementById('articles');
    if (i >= array.length){
        i = 0;
    }
    var newArticle = createArticle(array[i]);
    i++;
    articles.appendChild(newArticle);
    var top = articles.children[0];
    $(top).hide("slow",function() {
        $(top).remove();
    })
}

$(document).ready(function(){
    $.getJSON('articles.json', function(data) {
        $.each(data,function(i,article){
            //console.log(article.title);
            //console.log(article.link);
            //console.log(article);
            //console.log(article.description);
            array.push({
                "Title" : article.title,
                "Link" : article.link,
                "Date" : article.pubDate,
                "Description" : article.description 
            });
            /*array.push({
                "Title" : article.title,
                "Link" : article.link,
                "Date" : article.pubDate,
                "Description" : article.description 
            });*/
            //array.new(article.title, article.link, article.pubDate, article.description);
        });
        console.log("counter: " + counter);
        var list = document.getElementById('articles');
        for (var index = 0; index < 5; index++){
            var element = createArticle(array[index]);
            list.appendChild(element);
            i++;
        }
        window.setInterval(Interval, 3000);
    });
});


/*function Article(title, link, date, description){
    this.title = title;
    this.link = link;
    this.date = date;
    this.description = description;
}*/

/*class Article{
    constructor(title, link, date, description){
        this.title = title;
        this.link = link;
        this.date = date;
        this.description = description;
    }
    get title(){
        return this.title;
    }
    get link(){
        return this.link;
    }
    get date(){
        return this.date;
    }
    get description(){
        return this.description;
    }
}

class Articles{
    constructor(){
        this.articles = []
    }
    new(title, link, date, description){
        let p = new Article(title, link, date, description);
        this.articles.push(p);
        //return p;
    }
    get allArticles(){
        return this.articles;
    }
    get NumberofArticles(){
        return this.articles.length;
    }
}*/




