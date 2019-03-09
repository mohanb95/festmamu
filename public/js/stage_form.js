 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
	$('select').material_select();
	

    $('#cName_col_But').click(function(){
    	$('#address_colapse').click();
    });
    $('#addr_col_But').click(function(){
    	$('#costing_colapse').click();
    });
  });