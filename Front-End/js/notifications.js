const notifications = (function () {
    function showInfo(message) {
        infoBox.find("span").text(message);
        infoBox.show();
        setTimeout(function () {
            infoBox.fadeOut();
        }, 3000);
    }

    function showError(errorMsg) {
        errorBox.find("span").text("Error: " + errorMsg);
        errorBox.show();
        errorBox.click(function () {
            errorBox.hide();
        });
    }
    return {showInfo,showError};
})();