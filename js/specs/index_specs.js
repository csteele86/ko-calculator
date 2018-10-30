describe("Index", function() { 
    //beforeAll will run once before all tests
    //use this to help reduce expensive test setup
    //recommended to have a corresponding afterAll to redo what was done here
    beforeAll(function(){
        console.log("Running once before all tests");
    });

    it('should get all of the buttons', function() {
        var buttons = getButtons();

        expect(buttons.length).toBe(18);        

        expect(buttons).toContain("=");

        expect(buttons).not.toContain("10");
    });

    xit('should apply the knockout bindings', function() {
        //we will revisit this later
    });

    describe('view model', function() {
        //beforeEach will run before each test within a describe
        //helps you to write DRY (don't repeat yourself) code
        //using this shaved 6 lines of code
        beforeEach(function() {
            //think of 'this' as the test context. 
            //it is only availabe within a beforeEach and afterEach 
            //note that 'this' cannot be passed to arrow functions (i.e., () => )
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
                //take note that we are in a different describe and we are still accessing 'this'
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

            //aferEach will run after each test within a descirbe
            afterEach(function() {
                expect(this.viewModel.result()).toBe(this.expect);                
            });
        });        
    }); 
    
    //afterAll will run once after all tests
    //use this to undo changes done in beforeAll
    afterAll(function(){
        console.log("Running once after all tests.");
    });
});