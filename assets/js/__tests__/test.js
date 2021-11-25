const matchers = {
    toNotBePrime: () => {
        return {
            compare: function(actual) {
                if(actual <= 1){
                    return {pass: false, message: actual + " est inférieur a 1"}
                }
                if(typeof actual !== "number"){
                    return {pass: false, message: actual + " n'est pas un nombre entier"}
                }
                else{
                    let diviseur = null;
                    for(let i = 2; i <= actual - 1 ; i++){
                        console.log(`${actual} % ${i} = ${actual%i}`);
                        if(actual % i === 0){
                            diviseur = i;
                            console.log(`${actual} est divisible par ${i}`);
                        }
                    }
                    if(diviseur === null){
                        return {pass: false, message: actual + " est un nombre premier"}
                    }
                    return {pass: true, message: actual + " n'est un nombre premier"}
                }
            }
        }
    }
}

describe("test", function(){

    beforeEach(function() {
        jasmine.addMatchers(matchers);
    })

    it("le nombre est un nombre premier", function(){
        for(let index = 0; index < 30; index++){
            expect(index).toNotBePrime();
        }
    })
})