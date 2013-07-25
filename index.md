---
layout: page
title: 文章列表
tagline: 乱七八糟
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
        <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span> 
        &raquo; 
        <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
        <div class="post-excerpt">
            {{ post.content | split: '<!-- more -->' | first }}
            <a href="{{ BASE_PATH }}{{ post.url }}">阅读全文...</a>
        </div>
    </li>
  {% endfor %}
</ul>
