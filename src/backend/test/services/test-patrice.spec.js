const fs = require('fs');
class hello {
    getHello() {
      return 'hello';
    }
}


describe("GET /", function() {

    it("should test some stuff, mock and basic test", function() {
        console.log('test');

        hello=new hello();
        expect(hello.getHello()).toEqual('hello');


        spyOn(hello,"getHello").andReturn('salut');
        expect(hello.getHello()).toEqual('salut');

    });

    it("should test if xxx.jpg exist in upload directory", function(done) {

      let path = require('path');
      let filePathAndName = path.join(__dirname, '..','..','app/upload/57ea7d4988f7ec1506365013.jpg');
      fs.access(filePathAndName, (err) => {
        expect(err).toEqual(null); //the file exist
        done();
      });

    });

});
