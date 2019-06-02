// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function requestStockData() {
    var ticker = document.getElementById("ticker").value;
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=BPPF6571SFFRYKSA" + "&symbol=" + ticker;
    $.ajax({
      url: url,
      type: "GET",
      success: function(data) {
        var keys = data["Time Series (5min)"];
        document.getElementById("stock_data").innerText = "Most recent stock price for " + ticker + ": " + keys[Object.keys(keys)[0]]["4. close"];
      }
    });
  }

  var app = new Vue({
    el: '#table_root',
    data: {
      message: {
        stocks: []
      }
    },
    methods: {
      getStockIndicators: function (ticker) {
        var indicators = [
          {
            function: 'TIME_SERIES_INTRADAY',
            symbol: ticker.name,
            interval: '5min',
            keyName: 'Time Series (5min)',
            keyValue: '4. close'
          },
          {
            function: 'SMA',
            symbol: ticker.name,
            interval: '5min',
            time_period: '200',
            series_type: 'close',
            keyName: 'Technical Analysis: SMA',
            keyValue: 'SMA'
          },
          {
            function: 'RSI',
            symbol: ticker.name,
            interval: '5min',
            time_period: '14',
            series_type: 'close',
            keyName: 'Technical Analysis: RSI',
            keyValue: 'RSI'
          },
          {
            function: 'MACD',
            symbol: ticker.name,
            interval: '5min',
            series_type: 'close',
            keyName: 'Technical Analysis: MACD',
            keyValue: 'MACD'
          },
          {
            function: 'ADX',
            symbol: ticker.name,
            interval: '5min',
            time_period: '14',
            keyName: 'Technical Analysis: ADX',
            keyValue: 'ADX'
          }
        ];
        for(var i = 0; i < indicators.length; i++){
          var time_period = indicators[i].time_period != null ? "&time_period=" + indicators[i].time_period : '';
          var series_type = indicators[i].series_type != null ? "&series_type=" + indicators[i].series_type : '';
          var url = "https://www.alphavantage.co/query?" + "function=" + indicators[i].function + "&interval=" + indicators[i].interval + time_period + series_type + "&apikey=BPPF6571SFFRYKSA" + "&symbol=" + ticker.name;
          $.ajax({
            url: url,
            type: "GET",
            success: function(data) {
              var keys = [
                {
                  keyName: 'Time Series (5min)',
                  keyValue: '4. close'
                },
                {
                  keyName: 'Technical Analysis: SMA',
                  keyValue: 'SMA'
                },
                {
                  keyName: 'Technical Analysis: RSI',
                  keyValue: 'RSI'
                },
                {
                  keyName: 'Technical Analysis: MACD',
                  keyValue: 'MACD'
                },
                {
                  keyName: 'Technical Analysis: ADX',
                  keyValue: 'ADX'
                }
              ];
              for(var i = 0; i < keys.length; i++){
                if(data[keys[i].keyName] != null) {
                  var obj = data[keys[i].keyName.toString()];
                  var mostRecentObj = obj[Object.keys(obj)[0]]; 
                  if(mostRecentObj["4. close"] != null) {
                    ticker.price = "$" + mostRecentObj["4. close"];
                  }
                  else if(mostRecentObj["RSI"] != null) {
                    ticker.rsi = mostRecentObj["RSI"];
                  }
                  else if(mostRecentObj["SMA"] != null) {
                    ticker.twoHundredDay = "$" + mostRecentObj["SMA"];
                  }
                  else if(mostRecentObj["ADX"] != null) {
                    ticker.adx = mostRecentObj["ADX"];
                  }
                  else if(mostRecentObj["MACD"] != null) {
                    ticker.macd = mostRecentObj["MACD"];
                  }
                }
              }
            }
          });
        }
      }
    },
    beforeMount() {
      var self = this;
      var url = "/Home/GetStocks";
      // "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=BPPF6571SFFRYKSA" + "&symbol=tsla";
      $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
          var tickers = [];
          for(var i = 0; i < data.length; i++) {
            var jsonObj = {
              name: data[i].ticker,
              price: '',
              twoHundredDay: '',
              rsi: '',
              macd: '',
              adx: '',
              trend: ''
            };
            tickers.push(data[i].ticker);
            app.message.stocks.push(jsonObj);
          }
        }
      });
    }
  });