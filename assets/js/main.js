jQuery( document ).ready( function( $ ) {
	const json_file = "data.json";

	// Busca os dados
	let json_data = [];
	$.getJSON( json_file, function( json ) {
		json_data = json;
	})
		.done( function(){
			// Valor mínimo e máximo do campo de quantidade de perguntas
			$( "#qtd_perguntas" ).attr( "min", 1 );
			$( "#qtd_perguntas" ).attr( "max", json_data.length );
			$( "#qtd_perguntas" ).val( 1 );
		});

	const btn_gerar = $( "#btn_gerar" );
	const accordion = $( "#accordionMain" );

	// Função principal para gerar as perguntas
	btn_gerar.on( "click", function(){
		let qtd_perguntas = $( "#qtd_perguntas" ).val();

		if ( json_data.length >= qtd_perguntas && qtd_perguntas > 0 ) {
			var arr_selecionados = [];
			let html = '';
			while( arr_selecionados.length < qtd_perguntas ){
				var index = Math.floor( Math.random() * json_data.length );
				if ( !arr_selecionados.includes( json_data[index] ) ) {
					let dificuldade = json_data[index]["dificuldade"];
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

					// Guarda o index para não duplicar depois
					arr_selecionados.push( json_data[index] );

					html += '<div class="accordion-item bg-'+dificuldade+'"><h2 class="accordion-header" id="heading'+json_data[index]["id"]+'"><span class="accordion-button collapsed bg-'+dificuldade+'" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+json_data[index]["id"]+'" aria-expanded="false" aria-controls="collapse'+json_data[index]["id"]+'"><b>'+ json_data[index]["pergunta"] +'</b></span></h2>'+
						'<div id="collapse'+json_data[index]["id"]+'" class="accordion-collapse collapse" aria-labelledby="heading'+json_data[index]["id"]+'" data-bs-parent="#accordionMain"><div class="accordion-body">'+json_data[index]["resposta"]+'</div></div></div>';
				}
			}
			accordion.html( '' );
			accordion.append( html );
		} else {
			// Caso o campo não for preenchido corretamente
			alert( "Mano?? Preenche isso aí corretamente!" );
		}
	});

});