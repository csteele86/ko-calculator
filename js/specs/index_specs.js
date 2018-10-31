describe("Index", function() { 
    beforeAll(function(){
        console.log("Running once before all tests");
    });

    it('should get all of the buttons', function() {
        var buttons = getButtons();

        expect(buttons.length).toBe(18);        

        expect(buttons).toContain("=");

        expect(buttons).not.toContain("10");
    });

    it('should apply the knockout bindings', function() {
        //spyOn allows you to create a test double that will track all calls and arguments
        //to the object and function you provide
        //were doing this because we cannot call applyBindings twice
        //a good roll of thumb is to not mock what you don't own unless it is easy
        var koSpy = spyOn(ko, "applyBindings").and.callFake(function() {});

        //createSpy is a way to create adhoc spy and behaves just like spyOn
        //mainly used when there is not a function to spy on
        var getSpy = jasmine.createSpy("jqGet").and.callFake(function(i) {
            return null;
        });

        //a simple approach to mocking out jquery
        spyOn(window, "$").and.callFake(function(selector) {
            return {
                'get': getSpy //this is the spy we created above
            }
        });

        init();

        //we can check the spies to see how many times they were called
        expect(koSpy).toHaveBeenCalledTimes(1);
        //we can also check to see if a spy was called with certain arguments
        expect(koSpy).toHaveBeenCalledWith(myViewModel, null);

        expect(window.$).toHaveBeenCalledTimes(1);
        //jasmine.any takes a constructor (i.e., Function, Object, Number, etc) or class name
        expect(window.$).toHaveBeenCalledWith(jasmine.any(String));
        
        expect(getSpy).toHaveBeenCalledTimes(1);
        //jasmine.anything will return true as long as the argument was not null or undefined
        expect(getSpy).toHaveBeenCalledWith(jasmine.anything());
    });

    describe('view model', function() {
        beforeEach(function() {
            this.viewModel = new myViewModel();                
        });

        it('should initialize a view model', function() {
            expect(this.viewModel.buttons()).toBeTruthy();
    
            expect(this.viewModel.result()).toEqual('0');
        });
    
        it('should reset the calculator', function() {
            this.viewModel.result('100');
            this.viewModel.reset();
            
            expect(this.viewModel.result()).toBe('0');
        });

        describe("when a key is pressed", function() {            
            it('the CE button should reset the calculator', function() {
                this.viewModel.result('100');
    
                this.viewModel.keyPress('CE');
    
                this.expect = '0';
            });

            it('the = button should calculate', function() {
                this.viewModel.result('10*10');
    
                this.viewModel.keyPress('=');
    
                this.expect = 100;
            });

            it('the 0 button should ensure the result is 0 instead of 00', function() {
                this.viewModel.result('0');
    
                this.viewModel.keyPress('0');
    
                this.expect = '0';
            });

            it('any non-zero number button should add to the existing result', function() {
                this.viewModel.result('19');
    
                this.viewModel.keyPress('1');
    
                this.expect = '191';
            });

            it('any non-number button that is not an = or CE should add to the existing result', function() {
                this.viewModel.result('19');
    
                this.viewModel.keyPress('*');
    
                this.expect = '19*';
            });

            afterEach(function() {
                expect(this.viewModel.result()).toBe(this.expect);                
            });
        });        
    }); 
    
    afterAll(function(){
        console.log("Running once after all tests.");
    });
});