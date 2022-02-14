$(() => {
    console.log("DOM listo!");
    const formulario = $("#formulario");
    const inputID = $("#inputID");
    const superHero = $("#superHero");
    const chartContainer = $("#chartContainer");

    formulario.on("submit", (e) => {
        e.preventDefault();

        //validacion solo numero
        console.log(inputID.val());
        const soloNumerosReg = /^\d+$/;

        //limpiar contenerdores dinamicos
        chartContainer.html("");
        superHero.html("");
        //alertDanger.addclass("d-none");


        if (!soloNumerosReg.test(inputID.val())) {
            alertDanger.removeClass("d-none");
            return console.log("no escribiste solo números");
        }
        /*Inicio de ajax*/
        $.ajax({

            url: `https://www.superheroapi.com/api.php/3525635500807579/${inputID.val()}`,
            type: "GET",
            dataType: "JSON",
            success(data) {
                console.log(data);
                superHero.append(`
            <section class="card mb-3">
            <div class="row g-0">
            <div class="col-md-4">
            <img src="${data.image.url}"
            class="img-fluid rounded-start" alt="...">

            </div>
            <div class="col-md-8">
            <div class="card-body">
            <ul class= "list-group list-group-flush">
            <li class="list-group-item">ID: ${data.id}</li>
            <li class="list-group-item">Name: ${data.name}</li>
            </ul>
            </div>
            </div>
            </div>
            </section>
            
            `);

                const opciones = {

                    animationEnabled: true,
                    title: {
                        text: "grafico de torta porcentajes"
                    },
                    zoomEnabled: true,
                    data: [{
                            type: "pie",
                            showInLegend: true,
                            legendText: "{indexLabel}",
                            dataPoints: [{

                                    y:

                                        data.powerstats.intelligence !== "null"

                                        ?
                                        data.powerstats.intelligence : 0,
                                    indexLabel: "intelligence",
                                },

                                {
                                    y:

                                        data.powerstats.strength !== "null" ?
                                        data.powerstats.strength : 0,
                                    indexLabel: "strenght",
                                },
                                {
                                    y:

                                        data.powerstats.speed !== "null" ?
                                        data.powerstats.speed : 0,
                                    indexLabel: "speed",
                                },
                                {
                                    y:

                                        data.powerstats.durability !== "null" ?
                                        data.powerstats.durability : 0,
                                    indexLabel: "durability",
                                },
                                {
                                    y:

                                        data.powerstats.power !== "null" ?
                                        data.powerstats.power : 0,
                                    indexLabel: "power",
                                },
                                {
                                    y:

                                        data.powerstats.combat !== "null" ?
                                        data.powerstats.strength : 0,
                                    indexLabel: "combat",
                                },

                            ],
                        },

                    ],

                };
                chartContainer.CanvasJSChart(opciones);
            },
            error(e) {
                console.log(e);
            },
        });
    });
});