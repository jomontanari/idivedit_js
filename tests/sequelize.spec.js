describe("sequelize", function() {

    it("should add a single query to the query chain", function() {

        var chainer = getMockQueryChainer();
        spyOn(chainer, "add");

        var query1 = {queryname: "query1"};
        var queries = [query1];

        exports.multipleQueries(chainer, queries);

        expect(chainer.add).toHaveBeenCalledWith(query1);
        expect(chainer.add.callCount).toBe(1);

    });

    it("should add multiple queries to the query chain", function() {

        var chainer = getMockQueryChainer();
        console.log(chainer)

        spyOn(chainer, "add");

        var query1 = {queryname: "query1"};
        var query2 = {queryname: "query2"};
        var query3 = {queryname: "query3"};
        var queries = [query1, query2, query3];

        exports.multipleQueries(chainer, queries);

        expect(chainer.add).toHaveBeenCalledWith(query1);
        expect(chainer.add).toHaveBeenCalledWith(query2);
        expect(chainer.add).toHaveBeenCalledWith(query3);
        expect(chainer.add.callCount).toBe(3);

    });

    it("should run the queries in the chain", function() {

        var chainer = getMockQueryChainer();
        spyOn(chainer, "run").andReturn(chainer);
        var query1 = {queryname: "query1"};
        var queries = [query1];

        exports.multipleQueries(chainer, queries);
        expect(chainer.run).toHaveBeenCalled();

    });

    it("should call the success function for success", function() {

        var chainer = getMockQueryChainer();
        spyOn(chainer, "success").andReturn(chainer);

        var query1 = {queryname: "query1"};
        var queries = [query1];

        var successFn = function() { console.log("Success!"); };

        exports.multipleQueries(chainer, queries, successFn);

        expect(chainer.success).toHaveBeenCalledWith(successFn);

    });

    it("should call the error function on error", function() {

        var chainer = getMockQueryChainer();
        spyOn(chainer, "error");

        var query1 = {queryname: "query1"};
        var queries = [query1];

        var errorFn = function() { console.log("Error!"); };

        exports.multipleQueries(chainer, queries, null, errorFn);

        expect(chainer.error).toHaveBeenCalledWith(errorFn);

    });

});