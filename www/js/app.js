// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {	
    /* ---------------------------------- Local Variables ---------------------------------- */
	var slider = new PageSlider($('body'));
	
	HomeView.prototype.template = Handlebars.compile($('#home-tpl').html());
	EmployeeListView.prototype.template = Handlebars.compile($('#employee-list-tpl').html());
	EmployeeView.prototype.template = Handlebars.compile($('#employee-tpl').html());
	
    var service = new EmployeeService();
    service.initialize().done(function () {
		router.addRoute('', function() {
			try {
				slider.slidePage(new HomeView(service).render().$el);
			} catch (e) {
				alert(JSON.stringify(e));
			}
		});
		
		router.addRoute('employees/:id', function(id) {
			service.findById(parseInt(id)).done(function(employee) {
				try {
					slider.slidePage(new EmployeeView(employee).render().$el);				
				} catch (e) {
					alert(JSON.stringify(e));
				}	
			});			
		});
		
		router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
	document.addEventListener('deviceready', function() {
		if (navigator.notification) {
			window.alert = function (message) {
				navigator.notification.alert(
					message, 	// message 
					null, 		// callback 
					'Workshop', // title 
					'OK' 		// buttonName
				);
			};
		}
		
		alert('Device: ' + device.platform + '\nModel: ' + device.model + '\nVersion: ' + device.version + '\nuuid: ' + device.uuid);
	}, false);
	FastClick.attach(document.body);
    
    /* ---------------------------------- Local Functions ---------------------------------- */
    
}());