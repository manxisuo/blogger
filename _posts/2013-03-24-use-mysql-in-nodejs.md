---
layout: post
title: 在Node.js中使用MySQL
tagline: ""
tags : [nodejs]
---
{% include JB/setup %}

1. 用npm安装sql模块。在终端执行：

{% highlight bash linenos %}
    npm install mysql
{% endhighlight %}

2. 简单的查询：

<!-- more -->

{% highlight javascript linenos %}
    var mysql = require('mysql');  
      
    var conn = mysql.createConnection(  
        {  
            host: 'localhost',  
            user: 'root',  
            password: 'root',  
            database: 'test'  
        }  
    );  
      
    conn.connect();  
      
    var queryString = 'SELECT * FROM Person';  
      
    conn.query(queryString, function(err, rows, fields) {  
        if (err) throw err;  
          
        for (var i in rows) {  
            console.log(i, rows[i]);  
        }  
          
        for (var i in fields) {  
            // console.log(i, fields[i]);  
        }  
    });  
      
    conn.end();
{% endhighlight %}

结果如下：

![结果](http://dl2.iteye.com/upload/attachment/0082/1106/a5d4224f-74d4-3cb3-a189-322b26a3e03b.png '结果')

当然，Connection的选项也可以这样写：

{% highlight javascript linenos %}
    var conn = mysql.createConnection('mysql://root:root@localhost/test');
{% endhighlight %}

上面这种方式，是等到查询得到所有行之后，才回调的。如果表的行数很大，你想每查到一行就执行相应的动作时，可以这样写：

{% highlight javascript linenos %}
    var mysql = require('mysql');  
      
    var conn = mysql.createConnection('mysql://root:root@localhost/test');  
      
    conn.connect();  
      
    var query = conn.query('SELECT * FROM Person');  
      
    query.on('error', function(err) {  
        throw err;  
    });  
      
    query.on('fields', function(fields) {  
        console.log(fields);  
    });  
      
    query.on('result', function(row) {  
        console.log(row);  
    });  
      
    conn.end();  
{% endhighlight %}

需要注意的是，只要某一行数据到来时，就会相应的调用回调函数。如果由于某种原因，你想在处理完某一行之前不希望得到下一行，那么你需要暂停查询，等到处理完这一行后再恢复查询。但是要小心，由于某些错误，可能会导致结果的不一致性。

{% highlight javascript linenos %}
    query.on('result', function(row) {  
        conn.pause();  
        console.log(row);  
        conn.resume();  
    });  
{% endhighlight %}
