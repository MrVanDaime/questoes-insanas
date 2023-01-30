jQuery( document ).ready( function( $ ) {
	const json_file = "data.json";

	let data_json;
	$.getJSON( json_file, function( json ) {
		data_json = json;
	});

	setTimeout(() => {
		const btn_gerar = $( "#btn_gerar" );
		const accordion = $( "#accordionMain" );
		$( "#qtd_perguntas" ).attr( "min", 1 );
		$( "#qtd_perguntas" ).attr( "max", data_json.length );

		btn_gerar.on( "click", function(){
			let qtd_perguntas = $( "#qtd_perguntas" ).val();

			if ( data_json.length >= qtd_perguntas && qtd_perguntas > 0 ) {
				var arr_selecionados = [];
				let html = '';
				while( arr_selecionados.length < qtd_perguntas ){
					var index = Math.floor( Math.random() * data_json.length );
					if ( !arr_selecionados.includes( data_json[index] ) ) {
						let dificuldade = data_json[index]["dificuldade"];
						switch ( dificuldade ) {
							case 'facil':
								dificuldade = 'success';
							break;
							case 'medio':
								dificuldade = 'warning';
							break;
							case 'dificil':
								dificuldade = 'danger';
							break;
						}

						arr_selecionados.push( data_json[index] );
						html += '<div class="accordion-item bg-'+dificuldade+'"><h2 class="accordion-header" id="heading'+data_json[index]["id"]+'"><button class="accordion-button collapsed bg-'+dificuldade+'" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+data_json[index]["id"]+'" aria-expanded="false" aria-controls="collapse'+data_json[index]["id"]+'"><b>'+ data_json[index]["pergunta"] +'</b></button></h2>'+
							'<div id="collapse'+data_json[index]["id"]+'" class="accordion-collapse collapse" aria-labelledby="heading'+data_json[index]["pergunta"]+'" data-bs-parent="#accordionMain"><div class="accordion-body">'+data_json[index]["resposta"]+'</div></div></div>';
					}
				}
				accordion.html( '' );
				accordion.append( html );
			} else {
				alert( "Mano?? Preenche isso aí corretamente!" );
			}
		});
	}, 500);

});