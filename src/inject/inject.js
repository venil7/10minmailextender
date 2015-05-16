chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);
      var $extendLink = jQuery("#leftpart").find("a[href*='resetSessionLife']").get(0),
        expirationTime = parseInt($("#expirationTime").text().match(/\d+/)[0], 10);
        refreshInMinutes = expirationTime > 2 ? expirationTime - 1 : 0,
        numMessages = jQuery("#emailTable>tbody>tr").length;

      setTimeout($extendLink.click.bind($extendLink), refreshInMinutes * 60000);
      setInterval(function () {
        var tmp = jQuery("#emailTable>tbody>tr").length;
        if (tmp !== numMessages) {
          if (tmp > numMessages) {
            new Notification("10-minute-mail-plus", {
              body: "New email arrived!"
            });
          }
          numMessages = tmp;
        }
      }, 1000);
  	}
	}, 10);
});
