var Twitter = require('twitter');
var DateDiff = require('date-diff');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var startDate = new Date(2017,2,29);
var endDate = new Date(2019,2,29);
var today = new Date();

var diff = new DateDiff(endDate,today);
var daysleft = Math.floor(diff.days());
var total = new DateDiff(endDate,startDate);
var daysTotal = Math.ceil(total.days());
var done = daysTotal - daysleft;

var progressBar = make_bar(done/daysTotal,'⣀⣄⣆⣇⣧⣷⣿',40,40);

client.post('statuses/update', {status: daysleft + ' days until Article 50 deadline #Article50 #Brexit ' + progressBar.str}, function(error, tweet, response) {
  if(error){
      console.log(error);
  }
});

function make_bar(p, bar_style, min_size, max_size) {
    var d, full, m, middle, r, rest, x,
        min_delta = Number.POSITIVE_INFINITY,
        full_symbol = bar_style[bar_style.length-1],
        n = bar_style.length - 1;
    if(p == 100) return {str: repeat(full_symbol, 10), delta: 0};
    for(var i=max_size; i>=min_size; i--) {
        x = p * i;
        full = Math.floor(x);
        rest = x - full;
        middle = Math.floor(rest * n);
        if(p != 0 && full == 0 && middle == 0) middle = 1;
        d = Math.abs(p - (full+middle/n)/i) * 100;
        if(d < min_delta) {
            min_delta = d;
            m = bar_style[middle];
            if(full == i) m = '';
            r = repeat(full_symbol, full) + m + repeat(bar_style[0], i-full-1);
        }
    }
    return {str: r, delta: min_delta};
}

function repeat(s, i) {
    var r = '';
    for(var j=0; j<i; j++) r += s;
    return r;
}