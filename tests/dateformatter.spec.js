describe("dateformatter", function() {

    it("should format a date correctly for MySQL", function() {

        var regex = /[0-9]{4}[\/][0-9]{1,2}[\/][0-9]{1,2}[\s][0-9]{1,2}[:][0-9]{1,2}[:][0-9]{1,2}/;

        expect(exports.todayAsMySqlDate()).toMatch(regex);
    });
});