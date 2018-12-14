const notifications = (function () {
    function handleError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0) {
            errorMsg = Messages.networkError;
        }
        if (response.responseJSON && response.responseJSON.description) {
            errorMsg = response.responseJSON.description;
        }
        showError(errorMsg);
    }

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
    return {handleError,showInfo,showError};
})();
