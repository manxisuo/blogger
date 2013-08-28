#!/bin/sh

cd ~/git/blogger
export tmp=`ps -ef |grep jekyll|head -n1|awk '{print $2}'`
kill -9 $tmp
rm -rf _site
jekyll serve &
