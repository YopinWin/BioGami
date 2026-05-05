<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    description: "Dokumentasi API untuk platform BioGami",
    title: "BioGami API Documentation"
)]
abstract class Controller
{
    #[OA\Get(
        path: '/api/example',
        summary: 'Contoh endpoint API',
        responses: [
            new OA\Response(response: 200, description: 'Berhasil')
        ]
    )]
    public function example()
    {
        //
    }
}
