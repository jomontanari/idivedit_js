exports.todayAsMySqlDate = function() {
    var today = new Date();
    return today.getFullYear() + "/"
        + (today.getMonth() + 1) + "/"
        + today.getDate() + " "
        + today.getHours() + ":"
        + today.getMinutes() + ":"
        + today.getSeconds();
};