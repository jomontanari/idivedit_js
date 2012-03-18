describe("JSON Object Builder", function() {

    it("should build a JSON object from an array of objects with a values attribute", function() {
        var objectArray = [
            { values: { first_name: "John", age: "25" } },
            { values: { first_name: "Amy", age: "27" } },
            { values: { first_name: "Bob", age: "29" } }
        ];

        var jsonObject = exports.buildJsonObject(objectArray);

        expect(jsonObject.length).toBe(3);
        expect(jsonObject[0].first_name).toBe("John");
        expect(jsonObject[0].age).toBe("25");
        expect(jsonObject[1].first_name).toBe("Amy");
        expect(jsonObject[1].age).toBe("27");
        expect(jsonObject[2].first_name).toBe("Bob");
        expect(jsonObject[2].age).toBe("29");
    });

});