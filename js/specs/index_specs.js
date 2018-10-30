//describe is a container for tests
describe("Index", function(){
    //it is the test and must be within a describe
    it('should get all of the buttons', () => {
        var buttons = getButtons();

        //toBe uses === and checks for reference equality
        expect(buttons.length).toBe(18);        

        //toContain will check arrays
        expect(buttons).toContain("=");

        //using "not" negates the matcher
        expect(buttons).not.toContain("10");
    });

    //describe can be nested, but not an it
    describe('view model', () => {
        it('should initialize a view model', () => {
            var viewModel = new myViewModel();
    
            //toBeTruthy uses boolean casting testing
            expect(self.buttons()).toBeTruthy();
    
            //toEqual uses === and checks for property equivalency (i.e., primitive types)
            expect(self.result()).toEqual('0');
        });
    
        it('should reset the calculator', () => {
            var viewModel = new myViewModel();
    
            viewModel.result('100');
            viewModel.reset();
            
            expect(viewModel.result()).toBe('0');
        });

        //another describe since still in the context of the view model
        describe("when a key is pressed", function() {
            it('the CE button should reset the calculator', () => {
                var viewModel = new myViewModel();
                
                viewModel.result('100');
    
                viewModel.keyPress('CE');
    
                expect(viewModel.result()).toBe('0');
            });

            it('the = button should calculate', () => {
                var viewModel = new myViewModel();
                
                viewModel.result('10*10');
    
                viewModel.keyPress('=');
    
                expect(viewModel.result()).toBe('100');
            });

            it('the 0 button should ensure the result is 0 instead of 00', () => {
                var viewModel = new myViewModel();
                
                viewModel.result('0');
    
                viewModel.keyPress('0');
    
                expect(viewModel.result()).toBe('0');
            });

            it('any non-zero number button should add to the existing result', () => {
                var viewModel = new myViewModel();
                
                viewModel.result('19');
    
                viewModel.keyPress('1');
    
                expect(viewModel.result()).toBe('191');
            });

            it('any non-number button that is not an = or CE should add to the existing result', () => {
                var viewModel = new myViewModel();
                
                viewModel.result('19');
    
                viewModel.keyPress('*');
    
                expect(viewModel.result()).toBe('19*');
            });
        });        
    });    
});