<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:37
 */


// src/Controller/LuckyController.php
namespace App\Controller\Client;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;

class ClientController
{

    /**
     * @Route("/")
     */
    public function number()
    {

        return new Response(
            '<html><body><h1>Client</h1></body></html>'
        );
    }
}